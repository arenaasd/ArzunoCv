'use client'
import React, { useContext } from 'react'
import ResumeInfoContext from '@/Context/ResumeInfoContext'

const LanguagePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext)
  const languages = resumeInfo?.languages || []

  if (!languages.length) return null

  return (
    <div className='my-6'>
      <h2 
        className="text-center font-bold text-sm tracking-wide mb-1" 
        style={{ color: resumeInfo?.themeColor }}
      >
        Languages
      </h2>

      <hr 
        className="border-[1px]" 
        style={{ borderColor: resumeInfo?.themeColor }} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {languages.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-xs font-medium">{lang.title}</span>
            <span 
              className="text-[10px] px-2 py-[2px] rounded-full border" 
              style={{
                borderColor: resumeInfo?.themeColor,
                color: resumeInfo?.themeColor
              }}
            >
              {lang.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LanguagePreview
