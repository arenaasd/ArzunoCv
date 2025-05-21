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

  useEffect(() => {
    const savedWorkType = localStorage.getItem('selectedWorkType')
    if (savedWorkType && resumeInfo && resumeInfo.selectedWorkType !== savedWorkType) {
      setResumeInfo(prev => ({
        ...prev,
        selectedWorkType: savedWorkType
      }))
    }

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
  }, [setResumeInfo, resumeInfo])

  useEffect(() => {
    if (resumeInfo?.selectedWorkType) {
      localStorage.setItem('selectedWorkType', resumeInfo.selectedWorkType)
    }
  }, [resumeInfo?.selectedWorkType])

  if (!resumeInfo) {
    return <div>Loading resume information...</div>
  }

  const currentWorkType = resumeInfo.selectedWorkType || 'experience'
  const selectedExtraSections = resumeInfo.selectedExtraSections || []

  return (
    <div>
      <PersonalDetailsPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />

      {currentWorkType === 'projects' ? (
        <ProjectsPreview resumeInfo={resumeInfo} />
      ) : (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}

      <EducationalPreview resumeInfo={resumeInfo} />
      <SkillPreview resumeInfo={resumeInfo} />

      {selectedExtraSections.map((section, index) => {
        switch (section) {
          case 'certifications':
            return <CertificatePreview key={`cert-${index}`} resumeInfo={resumeInfo} />
          case 'languages':
            return <LanguagePreview key={`lang-${index}`} resumeInfo={resumeInfo} />
          case 'hobbies':
            return <HobbiesPreview key={`hobby-${index}`} resumeInfo={resumeInfo} />
          default:
            return null
        }
      })}
    </div>
  )
}

export default PreviewSection
