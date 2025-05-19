'use client'
import React, { useContext, useEffect } from 'react'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'
import ProjectsPreview from './preview/ProjectsPreview'

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
  }, [resumeInfo, setResumeInfo])

  // Also save to localStorage whenever it changes
  useEffect(() => {
    if (resumeInfo?.selectedWorkType) {
      localStorage.setItem('selectedWorkType', resumeInfo.selectedWorkType)
    }
  }, [resumeInfo?.selectedWorkType])

  // Use fallback if selectedWorkType isn't set
  const currentWorkType = resumeInfo?.selectedWorkType || 'experience'

  return (
    <div
      className='shadow-lg h-full p-4 md:p-8 lg:p-14 border-t-[12px]'
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <PersonalDetailsPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
 
      {currentWorkType === 'projects' ? (
        <ProjectsPreview resumeInfo={resumeInfo} />
      ) : (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}

      <EducationalPreview resumeInfo={resumeInfo} />
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default PreviewSection