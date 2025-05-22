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
import SleekResume from '../../../dashboard/resume/_components/templetes/SleekResume'
import ShareModal from '@/components/ShareModel'


const fetcher = (id) => GlobalApi.GetResumeById(id).then(res => res.data.data)

const getTemplateComponent = (templateId) => {
  switch (templateId) {
    case 1:
      return <PreviewSection />
    case 2:
      return <MinimalistResume />
    case 3:
      return <ProfessionalResume />
      case 4:
        return <SleekResume />
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
      // Get saved data from localStorage
      const localSelectedWorkType = localStorage.getItem('selectedWorkType')
      const localSelectedExtraSections = localStorage.getItem('selectedExtraSections')
      
      let parsedExtraSections = []
      if (localSelectedExtraSections) {
        try {
          parsedExtraSections = JSON.parse(localSelectedExtraSections)
        } catch (error) {
          console.error('Error parsing stored extra sections:', error)
        }
      }

      // Merge all data together
      const resumeWithWorkType = {
        ...data,
        selectedWorkType: localSelectedWorkType || data.selectedWorkType || 'experience',
        selectedExtraSections: parsedExtraSections.length > 0 ? parsedExtraSections : (data.selectedExtraSections || [])
      }

      console.log('Resume data with extra sections:', resumeWithWorkType)
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
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin delay-[0.5s]"></div>
        </div>
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
      <div id="no-print" className="my-10 mx-5 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-medium">Your Resume is ready to download and share!</h2>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:px-44 my-10">
          <Button onClick={HandleDownload} className="w-full sm:w-auto">Download</Button>
          <Button onClick={() => setIsShareOpen(true)} className="w-full sm:w-auto">Share</Button>
        </div>
      </div>

      <div className="bg-white rounded-md p-5">
        <div id="resume-container" className="mx-auto max-w-[1000px]">
          {getTemplateComponent(selectedTemplate?.id)}
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