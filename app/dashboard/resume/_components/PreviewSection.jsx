'use client'
import React, { useContext } from 'react'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'


const PreviewSection = () => {

  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[12px]' style={{
      borderColor:resumeInfo?.themeColor
    }}>
      <PersonalDetailsPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
      <ExperiencePreview resumeInfo={resumeInfo} />
      <EducationalPreview resumeInfo={resumeInfo} />
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default PreviewSection