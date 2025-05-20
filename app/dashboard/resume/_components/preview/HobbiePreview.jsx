'use client'
import React, { useContext } from 'react'
import ResumeInfoContext from '@/Context/ResumeInfoContext'

const HobbiePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext)
  const hobbies = resumeInfo?.hobbies || []

  return (
    <div className='my-6'>
      <h2 
        className="text-center font-bold text-sm tracking-wide mb-1" 
        style={{ color: resumeInfo?.themeColor }}
      >
        Hobbies
      </h2>

      <hr 
        className="border-[1px]" 
        style={{ borderColor: resumeInfo?.themeColor }} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {hobbies.map((hobby, index) => (
          <div key={index}>
            <h3 className="text-xs font-semibold">{hobby.title}</h3>
            {hobby.description && (
              <p className="text-[10px] text-gray-600 mt-1">{hobby.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HobbiePreview
