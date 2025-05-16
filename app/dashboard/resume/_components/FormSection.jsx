'use client'
import React, { useState, useEffect, useContext } from 'react'
import PersonalDetails from './Form/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, Loader2, Check } from 'lucide-react'
import SummaryDetails from './Form/SummaryDetails'
import ExperienceDetails from './Form/ExperienceDetails'
import EducationDetails from './Form/EducationDetails'
import SkillDetails from './Form/SkillDetails'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import XScroll from '@/components/ui/x-scroll'
import ThemeColor from '@/app/dashboard/resume/_components/ThemeColor'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import PreviewSection from './PreviewSection'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs' 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import MinimalistResumePreview from './templetes/MinimalistResume'
import ProfessionalResume from './templetes/ProfessionalResume'

const templetes = [
  {
    id: 1,
    title: 'Default',
    image: '/templates/templateDefault.jpg',
    isPro: false,
    description: 'This is the default template. It is simple and clean.',
    component: PreviewSection, // Reference, not JSX
  },
  {
    id: 2,
    title: 'Minimalist',
    isPro: false,
    image: '/templates/Minimalist.jpg',
    description: 'This is the minimalist template. It is simple and clean.',
    component: MinimalistResumePreview, // Reference, not JSX
  },
  {
    id: 3,
    title: 'Professional',
    isPro: true,
    image: '/templates/Professional.jpg',
    description: 'This is the professional template. It is simple and clean.',
    component: ProfessionalResume,
  }
]

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const [dialogOPen, setDialogOPen] = useState(false)
  const [tempTemplate, setTempTemplate] = useState(null)
  const [loading, setLoading] = useState(false)
  const { selectedTemplate, setSelectedTemplate } = useContext(ResumeInfoContext)
  const router = useRouter()
   const params = useParams()
   const { user } = useUser()                     

   const userPlan = user?.publicMetadata?.plan || 'basic'


  useEffect(() => {
    if (activeFormIndex === 6) {
      router.push('/my-resume/' + params.resumeId + '/view')
    }
  }, [activeFormIndex, params.resumeId, router])

  useEffect(() => {
    const stored = localStorage.getItem('selectedTemplate')
    if (stored) {
      setSelectedTemplate(JSON.parse(stored))
    }
  }, [setSelectedTemplate])

  useEffect(() => {
    if (selectedTemplate) {
      const { component, ...serializableTemplate } = selectedTemplate
      localStorage.setItem('selectedTemplate', JSON.stringify(serializableTemplate))
    }
  }, [selectedTemplate])

  useEffect(() => {
    const stored = localStorage.getItem('selectedTemplate')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const fullTemplate = templetes.find((t) => t.id === parsed.id)
        if (fullTemplate) {
          setSelectedTemplate(fullTemplate)
        }
      } catch (error) {
        console.error('Error parsing stored template', error)
      }
    }
  }, [setSelectedTemplate])

  const handleNext = () => {
    setActiveFormIndex(activeFormIndex + 1)
  }

  const handleTemplateSelect = (template) => {
    setTempTemplate(template)
    setDialogOPen(true)
    // DON'T store here yet
  }
  
  const handleConfirmSelection = () => {
    if (tempTemplate?.isPro && userPlan === 'basic') {
      setDialogOPen(false)
      router.push('/upgrade')
      return
    }
    setSelectedTemplate(tempTemplate)
    // Store in localStorage only after confirmation
    const { component, ...serializableTemplate } = tempTemplate
    localStorage.setItem('selectedTemplate', JSON.stringify(serializableTemplate))
    setDialogOPen(false)
  }
  

  // Get the component to render; fallback to PreviewSection if none selected
  const SelectedComponent = selectedTemplate?.component || PreviewSection

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link href={'/'}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2"
            disabled={!enableNext || activeFormIndex > 5}
            onClick={handleNext}
            size="sm"
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 && (
        <XScroll>
          <div className="flex gap-4 mt-8">
            {templetes.map((template) => {
              const isSelected = selectedTemplate?.id === template.id
              return (
                <div
                  key={template.id}
                  className="relative group w-40 h-28 cursor-pointer shrink-0 overflow-hidden rounded-md shadow-md"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <Image
                    src={template.image}
                    alt={template.title}
                    width={160}
                    height={122}
                    className="rounded-md object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="text-center bg-gradient-to-b from-[#5A4192] to-[#da984e] bg-clip-text text-transparent text-2xl font-bold typing-effect">
                      {template.title}
                    </h1>
                  </div>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1 shadow">
                      <Check size={16} />
                    </div>
                  )}
                  {template.isPro && (
                    <div className="absolute bottom-1 right-1 w-6 h-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        className="w-full h-full"
                      >
                        <path d="M5 16L3 6l5 5 4-6 4 6 5-5-2 10H5zm14 2H5v2h14v-2z" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </XScroll>
      )}

      <Dialog open={dialogOPen} onOpenChange={setDialogOPen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{tempTemplate?.title}</DialogTitle>
            <DialogDescription className="text-sm mt-1">{tempTemplate?.description}</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Image
              src={tempTemplate?.image}
              alt={tempTemplate?.title}
              width={500}
              height={300}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOPen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleConfirmSelection();
              }}
              className="flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Select'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {activeFormIndex === 1 && <PersonalDetails enableNext={(e) => setEnableNext(e)} />}
      {activeFormIndex === 2 && <SummaryDetails enableNext={(e) => setEnableNext(e)} />}
      {activeFormIndex === 3 && <ExperienceDetails enableNext={(e) => setEnableNext(e)} />}
      {activeFormIndex === 4 && <EducationDetails enableNext={(e) => setEnableNext(e)} />}
      {activeFormIndex === 5 && <SkillDetails enableNext={(e) => setEnableNext(e)} />}
    </div>
  )
}

export default FormSection
