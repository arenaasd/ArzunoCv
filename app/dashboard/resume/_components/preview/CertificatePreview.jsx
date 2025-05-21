import ResumeInfoContext from '@/Context/ResumeInfoContext';
import React, { useContext } from 'react';

const CertificatePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext)
    const hobbies = resumeInfo?.hobbies || []
  return (
    <div className='my-6'>
      <h2 
        className="text-center font-bold text-sm tracking-wide mb-1" 
        style={{ color: resumeInfo?.themeColor }}
      >
        Certifications
      </h2>

      <hr 
        className="border-[1px]" 
        style={{ borderColor: resumeInfo?.themeColor }} 
      />

      {resumeInfo?.certifications?.map((cert, index) => (
        <div className="my-4" key={index}>
          <h2 className="text-sm font-bold tracking-wide">
            {cert?.title}
          </h2>

          <div className="text-xs font-medium flex flex-wrap my-1 justify-between">
            <div>{cert?.issuer}</div>
            <div className="text-xs font-medium whitespace-nowrap ml-2">
              {cert?.date}
            </div>
          </div>

          {cert?.url && (
            <a 
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-blue-600 underline mt-1 inline-block"
            >
              View Certificate
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default CertificatePreview;
