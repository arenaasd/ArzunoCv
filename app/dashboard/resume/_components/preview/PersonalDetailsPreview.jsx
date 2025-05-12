import React from 'react'

const PersonalDetailsPreview = ({ resumeInfo }) => {
  return (
    <div className="mb-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>

      <div className="text-md md:text-lg mb-2" style={{
        color: resumeInfo?.themeColor,
      }}>
        {resumeInfo?.jobTitle}
      </div>

      <div className="mb-2">
        {resumeInfo?.address}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {resumeInfo?.phone && (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span style={{
              color: resumeInfo?.themeColor,
            }}>{resumeInfo?.phone}</span>
          </div>
        )}

        {resumeInfo?.email && (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="break-all" style={{
              color: resumeInfo?.themeColor,
            }}>{resumeInfo?.email}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonalDetailsPreview