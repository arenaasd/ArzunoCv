'use client'
import { Button } from '@/components/ui/button'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import GlobalApi from '@/Service/GlobalApi'
import { useParams, notFound } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import PreviewSection from '../../../dashboard/resume/_components/PreviewSection'
import MinimalistResume from "../../../dashboard/resume/_components/templetes/MinimalistResume"
import ProfessionalResume from "../../../dashboard/resume/_components/templetes/ProfessionalResume"
import ShareModal from '@/components/ShareModel'

const fetcher = (id) => GlobalApi.GetResumeById(id).then(res => res.data.data)

const getTemplateComponent = (templateId, resumeInfo) => {
  switch (templateId) {
    case 1:
      return <MinimalistResume resumeInfo={resumeInfo} />
    case 2:
      return <ProfessionalResume resumeInfo={resumeInfo} />
    case 3:
      return <MinimalistResume resumeInfo={resumeInfo} /> // Fallback or third template
    default:
      return <MinimalistResume resumeInfo={resumeInfo} /> // Default template
  }
}

const Page = () => {
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [resumeInfo, setResumeInfo] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 1,
    title: 'Default',
    image: "/templates/templateDefault.pdf",
    description: "This is the default template. It is simple and clean."
  })

  const params = useParams()
  const { data, error } = useSWR(params.resumeId, fetcher)

  useEffect(() => {
    if (data) {
      // Try to get saved selectedWorkType from localStorage
      const localSelectedWorkType = localStorage.getItem('selectedWorkType')
      
      // Try to get saved selectedExtraSections from localStorage
      let extraSections = []
      try {
        const storedSections = localStorage.getItem('selectedExtraSections')
        if (storedSections) {
          extraSections = JSON.parse(storedSections)
        }
      } catch (error) {
        console.error('Error parsing stored extra sections', error)
      }
      
      // Inject selectedWorkType and selectedExtraSections from localStorage or use the data values if present,
      // or fallback to defaults as a last resort
      const resumeWithSettings = {
        ...data,
        selectedWorkType: localSelectedWorkType || data.selectedWorkType || 'experience',
        selectedExtraSections: extraSections.length > 0 ? extraSections : (data.selectedExtraSections || [])
      }

      console.log("Resume with settings:", resumeWithSettings)
      setResumeInfo(resumeWithSettings)
    }
  }, [data])

  useEffect(() => {
    const storedTemplate = localStorage.getItem('selectedTemplate')
    if (storedTemplate) {
      try {
        setSelectedTemplate(JSON.parse(storedTemplate))
      } catch (error) {
        console.error('Error parsing stored template:', error)
      }
    }
  }, [])

  if (error) notFound()
  if (!resumeInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading resume...</p>
      </div>
    )
  }

  const HandleDownload = () => {
    window.print()
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = 'Check out my resume!'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Your Resume is ready to download and share!</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={HandleDownload} className="w-full sm:w-auto">Download</Button>
          <Button onClick={() => setIsShareOpen(true)} className="w-full sm:w-auto">Share</Button>
        </div>
      </div>

      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div id="resume-preview" className="bg-white shadow-lg rounded-lg p-6 mb-8">
          {getTemplateComponent(selectedTemplate?.id, resumeInfo)}
        </div>
      </ResumeInfoContext.Provider>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)}
        shareUrl={shareUrl}
        title={shareTitle}
      />
    </div>
  )
}

export default Page