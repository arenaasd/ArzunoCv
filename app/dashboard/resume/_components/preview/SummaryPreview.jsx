import React from 'react'

const SummaryPreview = ({ resumeInfo }) => {
  return (
    <div className="my-3">
      <h2 
        className="text-center font-bold text-medium tracking-wide"
        style={{color: resumeInfo?.themeColor}}
      >
        Summary
      </h2>
      
      <hr 
        className="border-[1px] mt-1" 
        style={{ borderColor: resumeInfo?.themeColor }} 
      />
      
      <p className='text-xs mt-3 leading-relaxed text-justify'>
        {resumeInfo?.summary}
      </p>
    </div>
  )
}

export default SummaryPreview