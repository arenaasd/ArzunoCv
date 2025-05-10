import React from 'react'

const SkillPreview = ({ resumeInfo }) => {
  return (
    <div className='my-6'>
      <h2 
        className="text-center font-bold text-sm tracking-wide mb-1" 
        style={{color: resumeInfo?.themeColor}}
      >
        Skills 
      </h2>
      
      <hr 
        className="border-[1px]" 
        style={{borderColor: resumeInfo?.themeColor}} 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center space-x-3">
            <h2 className="text-xs font-medium">{skill?.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px] rounded-sm ml-auto">
              <div 
                className="h-2 rounded-sm" 
                style={{
                  width: skill?.rating * 20 + '%',
                  backgroundColor: resumeInfo?.themeColor
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillPreview