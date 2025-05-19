import React from 'react'

const EducationalPreview = ({ resumeInfo }) => {
  return (
    <div className='my-6'>
      <h2 
        className="text-center font-bold text-sm tracking-wide mb-1" 
        style={{color: resumeInfo?.themeColor}}
      >
        Education
      </h2>
      
      <hr 
        className="border-[1px]" 
        style={{borderColor: resumeInfo?.themeColor}} 
      />
      
      {resumeInfo?.education?.map((education, index) => (
        <div className="my-4" key={index}>
          <h2 className="text-sm font-bold tracking-wide">
            {education?.universityOrCollegeName}
          </h2>
          
          <div className="text-xs font-medium flex flex-wrap my-1 justify-between">
            <div>
              {education?.degree} in {education?.major}
            </div>
            
            <div className="text-xs font-medium whitespace-nowrap ml-2">
              {education?.startDate} - {education?.endDate}
            </div>
          </div>
          
          <p className="text-xs mt-1 leading-relaxed">
            {education?.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default EducationalPreview