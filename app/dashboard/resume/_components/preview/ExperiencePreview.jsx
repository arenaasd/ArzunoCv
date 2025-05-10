import React from 'react';

const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
      <h2 
        className="text-center font-bold text-sm tracking-wide mb-1" 
        style={{color: resumeInfo?.themeColor}}
      >
        Experience
      </h2>
      
      <hr 
        className="border-[1px]" 
        style={{borderColor: resumeInfo?.themeColor}} 
      />
      
      {resumeInfo?.experience?.map((experience, index) => (
        <div className="my-4" key={index}>
          <h2 className="text-sm font-bold tracking-wide">
            {experience?.title}
          </h2>
          
          <div className="text-xs font-medium flex flex-wrap my-1 justify-between">
            <div>
              {[
                experience?.companyName,
                experience?.city,
                experience?.state
              ]
                .filter(Boolean)
                .join(', ')}
            </div>
            
            <div className="text-xs font-medium whitespace-nowrap ml-2">
              {experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}
            </div>
          </div>
          
          {/* Add explicit styling for bullet points and lists */}
          <div 
            dangerouslySetInnerHTML={{__html: experience?.summary}} 
            className="text-xs mt-1 leading-relaxed experience-summary"
          />
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;