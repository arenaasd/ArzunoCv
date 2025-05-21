'use client'

import React, { useContext, useEffect, useState } from 'react'
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
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (!resumeInfo) return

    const savedWorkType = localStorage.getItem('selectedWorkType')
    const storedSections = localStorage.getItem('selectedExtraSections')

    setResumeInfo(prev => {
      let updated = { ...prev }

      if (savedWorkType && savedWorkType !== prev.selectedWorkType) {
        updated.selectedWorkType = savedWorkType
      }

      if (storedSections) {
        try {
          updated.selectedExtraSections = JSON.parse(storedSections)
        } catch (error) {
          console.error('Error parsing extra sections:', error)
        }
      }

      return updated
    })

    setHasLoaded(true)
  }, [resumeInfo, setResumeInfo])

  useEffect(() => {
    if (resumeInfo?.selectedWorkType) {
      localStorage.setItem('selectedWorkType', resumeInfo.selectedWorkType)
    }

    if (resumeInfo?.selectedExtraSections) {
      localStorage.setItem(
        'selectedExtraSections',
        JSON.stringify(resumeInfo.selectedExtraSections)
      )
    }
  }, [resumeInfo?.selectedWorkType, resumeInfo?.selectedExtraSections])

  if (!resumeInfo || !hasLoaded) {
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
