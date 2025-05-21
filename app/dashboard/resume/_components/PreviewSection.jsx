'use client'
import React, { useContext, useEffect } from 'react'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'
import ProjectsPreview from './preview/ProjectsPreview'
import CertificatePreview from './preview/CertificatePreview'
import LanguagePreview from './preview/LanguagePreview'
import HobbiesPreview from './preview/HobbiePreview' 

const PreviewSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  // Load from localStorage on component mount
  useEffect(() => {
    const savedWorkType = localStorage.getItem('selectedWorkType')
    if (savedWorkType && resumeInfo && resumeInfo.selectedWorkType !== savedWorkType) {
      setResumeInfo(prev => ({
        ...prev,
        selectedWorkType: savedWorkType
      }))
    }

    // Load selectedExtraSections from localStorage
    const storedSections = localStorage.getItem('selectedExtraSections')
    if (storedSections && resumeInfo) {
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

  // Also save to localStorage whenever it changes
  useEffect(() => {
    if (resumeInfo?.selectedWorkType) {
      localStorage.setItem('selectedWorkType', resumeInfo.selectedWorkType)
    }
  }, [resumeInfo?.selectedWorkType])

  // Use fallback if selectedWorkType isn't set
  const currentWorkType = resumeInfo?.selectedWorkType || 'experience'
  
  // Get the selected extra sections
  const selectedExtraSections = resumeInfo?.selectedExtraSections || []

  // Helper function to render extra section components
  const renderExtraSections = () => {
    return selectedExtraSections.map((section, index) => {
      switch(section) {
        case 'certifications': 
          return <CertificatePreview key={`cert-${index}`} resumeInfo={resumeInfo} />
        case 'languages':
          return <LanguagePreview key={`lang-${index}`} resumeInfo={resumeInfo} />
        case 'hobbies':
          return <HobbiesPreview key={`hobby-${index}`} resumeInfo={resumeInfo} />
        default:
          return null
      }
    })
  }

  // Only render components if resumeInfo is available
  if (!resumeInfo) {
    return <div>Loading resume information...</div>
  }

  console.log("Selected extra sections:", selectedExtraSections);

  return (
    <div className="preview-section">
      <PersonalDetailsPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
      
 
      {currentWorkType === 'projects' ? (
        <ProjectsPreview resumeInfo={resumeInfo} />
      ) : (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}

      <EducationalPreview resumeInfo={resumeInfo} />
      <SkillPreview resumeInfo={resumeInfo} />
      
      {/* Render all extra sections based on selectedExtraSections */}
      {renderExtraSections()}
    </div>
  )
}

export default PreviewSection