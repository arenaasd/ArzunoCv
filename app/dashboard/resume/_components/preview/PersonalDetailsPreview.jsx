import React from 'react'

const PersonalDetailsPreview = ({resumeInfo}) => {
  return (
    <div className="mb-2">
      <h2 
        className='font-bold text-xl text-center tracking-wide'
        style={{color: resumeInfo?.themeColor}}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      
      <h2 className="text-center text-sm font-medium tracking-wide mt-1">
        {resumeInfo?.jobTitle}
      </h2>
      
      <h2 
        className="text-center font-medium text-xs mt-1" 
        style={{color: resumeInfo?.themeColor}}
      >
        {resumeInfo?.address}
      </h2>
      
      <div className="flex justify-between items-center mt-3 px-1">
        <div 
          className="font-medium text-xs" 
          style={{color: resumeInfo?.themeColor}}
        >
          {resumeInfo?.phone && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {resumeInfo?.phone}
            </span>
          )}
        </div>
        
        <div 
          className="font-medium text-xs" 
          style={{color: resumeInfo?.themeColor}}
        >
          {resumeInfo?.email && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {resumeInfo?.email}
            </span>
          )}
        </div>
      </div>
      
      <hr 
        className='border-[1.5px] my-2 mt-3' 
        style={{borderColor: resumeInfo?.themeColor}} 
      />
    </div>
  )
}

export default PersonalDetailsPreview