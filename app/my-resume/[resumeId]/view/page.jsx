'use client'
import { Button } from '@/components/ui/button'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import GlobalApi from '@/Service/GlobalApi'
import { useParams, notFound } from 'next/navigation'
import React, { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'
import PreviewSection from '../../../dashboard/resume/_components/PreviewSection'
import MinimalistResume from "../../../dashboard/resume/_components/templetes/MinimalistResume"
import ProfessionalResume from "../../../dashboard/resume/_components/templetes/ProfessionalResume"
import ShareModal from '@/components/ShareModel'

const fetcher = (id) => GlobalApi.GetResumeById(id).then(res => res.data.data)

const getTemplateComponent = (templateId, resumeInfo) => {
  switch (templateId) {
    case 1:
      return <PreviewSection />
    case 2:
      return <MinimalistResume resumeInfo={resumeInfo} />
    case 3:
      return <ProfessionalResume resumeInfo={resumeInfo} />
    default:
      return <PreviewSection />
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
      
      // Inject selectedWorkType from localStorage or use the data value if present,
      // or fallback to 'experience' as a last resort
      const resumeWithWorkType = {
        ...data,
        selectedWorkType: localSelectedWorkType || data.selectedWorkType || 'experience'
      }

      setResumeInfo(resumeWithWorkType)
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const HandleDownload = () => {
    window.print()
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = 'Check out my resume!'

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo, selectedTemplate, setSelectedTemplate }}>
      <div className="container mx-auto py-5 print:hidden">
        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold mb-2">Your Resume is ready to download and share!</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
          <Button onClick={HandleDownload} className="w-full sm:w-auto">Download</Button>
          <Button onClick={() => setIsShareOpen(true)} className="w-full sm:w-auto">Share</Button>
        </div>
      </div>

      <div className="bg-white rounded-md p-5">
        <div id="resume-container" className="mx-auto max-w-[1000px]">
          {getTemplateComponent(selectedTemplate?.id, resumeInfo)}
        </div>
      </div>

      <ShareModal 
        isOpen={isShareOpen} 
        closeModal={() => setIsShareOpen(false)}
        shareUrl={shareUrl}
        title={shareTitle}
      />
    </ResumeInfoContext.Provider>
  )
}

export default Page