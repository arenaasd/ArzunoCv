'use client'
import React, { useState, useEffect, useContext } from 'react'
import PersonalDetails from './Form/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, Loader2, Check, Plus, Trash2 } from 'lucide-react'
import SummaryDetails from './Form/SummaryDetails'
import ExperienceDetails from './Form/ExperienceDetails'
import EducationDetails from './Form/EducationDetails'
import SkillDetails from './Form/SkillDetails'
import HobbyDetails from './Form/HobbiesDetails'
import LanguageDetails from './Form/LanguageDetails'
import CertificationDetails from './Form/CertificationDetails'
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
  DialogFooter,
} from '@/components/ui/dialog'
import MinimalistResumePreview from './templetes/MinimalistResume'
import ProfessionalResume from './templetes/ProfessionalResume'
import ProjectsDetails from './Form/ProjectsDetails'

const templates = [
  {
    id: 1,
    title: 'Default',
    image: '/templates/templateDefault.jpg',
    isPro: false,
    description: 'This is the default template. It is simple and clean.',
    component: PreviewSection,
  },
  {
    id: 2,
    title: 'Minimalist',
    isPro: false,
    image: '/templates/Minimalist.jpg',
    description: 'This is the minimalist template. It is simple and clean.',
    component: MinimalistResumePreview,
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
  const [dialogOpen, setDialogOpen] = useState(false)
  const [fieldDialogOpen, setFieldDialogOpen] = useState(false)
  const [tempTemplate, setTempTemplate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isShowingProjects, setIsShowingProjects] = useState(false)

  const { selectedTemplate, setSelectedTemplate, resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const router = useRouter()
  const params = useParams()
  const { user } = useUser()
  const userPlan = user?.publicMetadata?.plan || 'basic'

  // Get the selected extra sections from the context
  const selectedExtraSections = resumeInfo?.selectedExtraSections || []
  
  const availableSections = ['hobbies', 'languages', 'certifications']

  // Load template from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('selectedTemplate')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const fullTemplate = templates.find((t) => t.id === parsed.id)
        if (fullTemplate) {
          setSelectedTemplate(fullTemplate)
        }
      } catch (error) {
        console.error('Error parsing stored template', error)
      }
    }
  }, [setSelectedTemplate])

  // Save template to localStorage when it changes
  useEffect(() => {
    if (selectedTemplate) {
      const { component, ...serializableTemplate } = selectedTemplate
      localStorage.setItem('selectedTemplate', JSON.stringify(serializableTemplate))
    }
  }, [selectedTemplate])

  // Load work type and extra sections from localStorage on mount
  useEffect(() => {
    // Load work type
    const savedWorkType = localStorage.getItem('selectedWorkType')
    if (savedWorkType) {
      setIsShowingProjects(savedWorkType === 'projects')
      setResumeInfo(prev => ({
        ...prev,
        selectedWorkType: savedWorkType
      }))
    }
    
    // Load extra sections
    const storedSections = localStorage.getItem('selectedExtraSections')
    if (storedSections) {
      try {
        const parsedSections = JSON.parse(storedSections)
        setResumeInfo(prev => ({
          ...prev,
          selectedExtraSections: parsedSections
        }))
      } catch (error) {
        console.error('Error parsing stored extra sections', error)
      }
    }
  }, [setResumeInfo])

  const handleNext = () => {
    // Fixed navigation logic
    const baseFormCount = 5 // Personal, Summary, Experience, Education, Skills
    
    if (activeFormIndex < baseFormCount) {
      // If still in base forms, just go to next form
      setActiveFormIndex(prev => prev + 1)
    } 
    else if (activeFormIndex === baseFormCount) {
      // From Skills (index 5) to either first extra section or view page
      if (selectedExtraSections.length > 0) {
        setActiveFormIndex(6)
      } else {
        router.push('/my-resume/' + params.resumeId + '/view')
      }
    }
    else if (activeFormIndex === 6) {
      // From first extra section to either second extra section or view page
      if (selectedExtraSections.length > 1) {
        setActiveFormIndex(7)
      } else {
        router.push('/my-resume/' + params.resumeId + '/view')
      }
    }
    else if (activeFormIndex === 7) {
      // From second extra section to either third extra section or view page
      if (selectedExtraSections.length > 2) {
        setActiveFormIndex(8)
      } else {
        router.push('/my-resume/' + params.resumeId + '/view')
      }
    }
    else {
      // From third extra section to view page
      router.push('/my-resume/' + params.resumeId + '/view')
    }
  }

  const handleRemoveField = (index) => {
    const sectionIndex = index - 6 // Maps activeFormIndex (6,7,8) to selectedExtraSections index (0,1,2)
    const removedSection = selectedExtraSections[sectionIndex]
    
    // Create updated sections array without the removed section
    const updatedSections = selectedExtraSections.filter((_, i) => i !== sectionIndex)
    
    // Update context with new sections array
    setResumeInfo(prev => ({
      ...prev,
      selectedExtraSections: updatedSections,
      // Clear the removed section's data
      [removedSection]: []
    }))
    
    // Also update localStorage
    localStorage.setItem('selectedExtraSections', JSON.stringify(updatedSections))
    
    // Handle navigation after removing a section
    if (index > 5 + updatedSections.length) {
      if (updatedSections.length === 0) {
        router.push('/my-resume/' + params.resumeId + '/view')
      } else {
        setActiveFormIndex(5 + updatedSections.length)
      }
    }
  }

  const handleTemplateSelect = (template) => {
    setTempTemplate(template)
    setDialogOpen(true)
  }

  const handleConfirmSelection = () => {
    if (tempTemplate?.isPro && userPlan === 'basic') {
      setDialogOpen(false)
      router.push('/upgrade')
      return
    }
    setSelectedTemplate(tempTemplate)
    const { component, ...serializableTemplate } = tempTemplate
    localStorage.setItem('selectedTemplate', JSON.stringify(serializableTemplate))
    setDialogOpen(false)
  }

  const AddProjects = () => {
    const newVal = !isShowingProjects
    const newWorkType = newVal ? 'projects' : 'experience'
    
    // Update state
    setIsShowingProjects(newVal)
    
    // Update context
    setResumeInfo(prev => ({
      ...prev,
      selectedWorkType: newWorkType,
    }))
    
    // Update localStorage
    localStorage.setItem('selectedWorkType', newWorkType)
  }

  const handleSelectExtraSection = (section) => {
    // Only add the section if it's not already included
    if (!selectedExtraSections.includes(section)) {
      const updatedSections = [...selectedExtraSections, section]
      
      // Update context
      setResumeInfo(prev => ({
        ...prev,
        selectedExtraSections: updatedSections
      }))
      
      // Update localStorage
      localStorage.setItem('selectedExtraSections', JSON.stringify(updatedSections))
    }
    
    setFieldDialogOpen(false)
  }

  const handleSkipForNow = () => {
    router.push('/my-resume/' + params.resumeId + '/view')
  }

  const getRemainingExtraSections = () => {
    return availableSections.filter(section => !selectedExtraSections.includes(section))
  }

  // Function to check if we should show the "Add Extra Section" button
  const shouldShowAddSectionButton = () => {
    // Only show if user is Pro and there are remaining sections to add
    if (userPlan !== 'pro' || getRemainingExtraSections().length === 0) {
      return false
    }

    // Show on the Skills page (5) if no extra sections are added yet
    if (activeFormIndex === 5 && selectedExtraSections.length === 0) {
      return true
    }
    
    // Show on the last extra section page if there are more sections available to add
    // and we haven't reached the maximum of 3 extra sections
    if (activeFormIndex >= 6 && 
        activeFormIndex === 5 + selectedExtraSections.length && 
        selectedExtraSections.length < 3) {
      return true
    }

    return false
  }

  const extraSectionIcons = {
    hobbies: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    languages: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8l6 6" />
        <path d="M4 14h12" />
        <rect x="2" y="6" width="16" height="12" rx="2" />
        <path d="M22 10v8a2 2 0 01-2 2h-8" />
        <path d="M18 12h-.01" />
      </svg>
    ),
    certifications: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h.01" />
        <path d="M7 12h10" />
        <path d="M7 17h10" />
      </svg>
    )
  }

  return (
    <div className="pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link href={'/'}>
            <Button size="sm" className="h-9"><Home size={18} /></Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex items-center gap-2 w-full justify-end">
          {activeFormIndex > 1 && (
            <Button size="sm" className="h-9" onClick={() => setActiveFormIndex(prev => prev - 1)}>
              <ArrowLeft size={18} />
            </Button>
          )}
          {activeFormIndex === 3 && (
            <Button onClick={AddProjects} variant="outline" size="sm" className="h-9">
              {isShowingProjects ? 'Back to Experience' : 'No Experience? Add Projects'}
            </Button>
          )}
          {shouldShowAddSectionButton() && (
            <Button 
              onClick={() => setFieldDialogOpen(true)} 
              variant="outline" 
              size="sm" 
              className="h-9"
            >
              <Plus size={16} className="mr-1" /> Add Extra Section
            </Button>
          )}
          <Button
            className="flex gap-2 h-9"
            disabled={!enableNext}
            onClick={handleNext}
            size="sm"
          >
            Next <ArrowRight size={18} />
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 && (
        <>
          <XScroll>
            <div className="flex gap-4 mt-8">
              {templates.map((template) => {
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
                      <h1 className="text-center bg-gradient-to-b from-[#5A4192] to-[#da984e] bg-clip-text text-transparent text-2xl font-bold">
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" className="w-full h-full">
                          <path d="M5 16L3 6l5 5 4-6 4 6 5-5-2 10H5zm14 2H5v2h14v-2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </XScroll>
          <div className="text-center mt-4 mb-6">
            <p className="text-sm text-gray-500 font-medium italic">More templates coming soon...</p>
          </div>
        </>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{tempTemplate?.title}</DialogTitle>
            <DialogDescription>{tempTemplate?.description}</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Image src={tempTemplate?.image} alt={tempTemplate?.title} width={500} height={300} className="w-full h-auto rounded-md object-cover" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmSelection}>
              {loading ? <Loader2 className="animate-spin" /> : 'Select'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={fieldDialogOpen} onOpenChange={setFieldDialogOpen}>
        <DialogContent className="max-w-md rounded-lg overflow-hidden border border-purple-100 shadow-xl">
          <DialogHeader className="bg-gradient-to-r from-purple-50 to-orange-50 px-6 py-4">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Add Extra Section
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Enhance your resume with additional information
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-4">
            {getRemainingExtraSections().map((field) => (
              <div
                key={field}
                onClick={() => handleSelectExtraSection(field)}
                className="flex items-center gap-3 border border-gray-200 hover:border-purple-300 rounded-lg px-4 py-3 cursor-pointer transition hover:bg-purple-50 group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center">
                  {extraSectionIcons[field]}
                </div>
                <div className="flex-1">
                  <h3 className="capitalize font-medium text-gray-800 group-hover:text-purple-600">
                    {field}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {field === 'hobbies' && "Show your personality through activities you enjoy"}
                    {field === 'languages' && "Highlight languages you speak and proficiency levels"}
                    {field === 'certifications' && "Showcase your professional certifications and badges"}
                  </p>
                </div>
                <div className="w-6 h-6 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400 group-hover:text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            ))}
            {getRemainingExtraSections().length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No more sections available to add.</p>
              </div>
            )}
          </div>

          <DialogFooter className="px-6 py-4 bg-gray-50 border-t">
            <Button
              variant="outline"
              onClick={() => setFieldDialogOpen(false)}
              className="mr-2 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSkipForNow}
              className="border-gray-300"
            >
              Skip to View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {(activeFormIndex === 6 || activeFormIndex === 7 || activeFormIndex === 8) && selectedExtraSections[activeFormIndex - 6] && (
        <div className="flex justify-end mb-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleRemoveField(activeFormIndex)}
            className="h-9"
          >
            <Trash2 size={16} className="mr-2" />
            Remove Field
          </Button>
        </div>
      )}

      {activeFormIndex === 1 && <PersonalDetails enableNext={setEnableNext} />}
      {activeFormIndex === 2 && <SummaryDetails enableNext={setEnableNext} />}
      {activeFormIndex === 3 && (isShowingProjects ? <ProjectsDetails enableNext={setEnableNext} /> : <ExperienceDetails enableNext={setEnableNext} />)}
      {activeFormIndex === 4 && <EducationDetails enableNext={setEnableNext} />}
      {activeFormIndex === 5 && <SkillDetails enableNext={setEnableNext} />}

      {activeFormIndex === 6 && selectedExtraSections[0] && (
        <>
          {selectedExtraSections[0] === 'hobbies' && <HobbyDetails enableNext={setEnableNext} />}
          {selectedExtraSections[0] === 'languages' && <LanguageDetails enableNext={setEnableNext} />}
          {selectedExtraSections[0] === 'certifications' && <CertificationDetails enableNext={setEnableNext} />}
        </>
      )}
      
      {activeFormIndex === 7 && selectedExtraSections[1] && (
        <>
          {selectedExtraSections[1] === 'hobbies' && <HobbyDetails enableNext={setEnableNext} />}
          {selectedExtraSections[1] === 'languages' && <LanguageDetails enableNext={setEnableNext} />}
          {selectedExtraSections[1] === 'certifications' && <CertificationDetails enableNext={setEnableNext} />}
        </>
      )}
      
      {activeFormIndex === 8 && selectedExtraSections[2] && (
        <>
          {selectedExtraSections[2] === 'hobbies' && <HobbyDetails enableNext={setEnableNext} />}
          {selectedExtraSections[2] === 'languages' && <LanguageDetails enableNext={setEnableNext} />}
          {selectedExtraSections[2] === 'certifications' && <CertificationDetails enableNext={setEnableNext} />}
        </>
      )}
    </div>
  )
}

export default FormSection