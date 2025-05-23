'use client'
import { useEffect, useContext } from "react";
import Image from 'next/image';
import ResumeInfoContext from "@/Context/ResumeInfoContext";

export default function JeremyTorresResume() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const imageUrl = resumeInfo?.Image?.url
    ? `https://arzunocv-strapi-backend-production.up.railway.app${resumeInfo.Image.url}`
    : null;
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  useEffect(() => {
    const savedWorkType = localStorage.getItem('selectedWorkType');
    if (savedWorkType && resumeInfo && resumeInfo.selectedWorkType !== savedWorkType) {
      setResumeInfo(prev => ({
        ...prev,
        selectedWorkType: savedWorkType
      }));
    }
  }, [resumeInfo, setResumeInfo]);

  // Also save to localStorage whenever it changes
  useEffect(() => {
    if (resumeInfo?.selectedWorkType) {
      localStorage.setItem('selectedWorkType', resumeInfo.selectedWorkType);
    }
  }, [resumeInfo?.selectedWorkType]);


  const currentWorkType = resumeInfo?.selectedWorkType || 'experience';

  return (
    <div className="max-w-[900px] mx-auto shadow-lg p-6 md:p-10 lg:p-14 text-white" style={{ backgroundColor: '#2b2b2b' }}>
      <div>
        <div className="w-full flex items-center mb-5">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full mr-5"
            />
          )}
          <div className="flex-grow">
            <p className="font-bold text-lg">{resumeInfo?.jobTitle}</p>
            <span className="text-3xl font-bold">
              {resumeInfo?.firstName} {resumeInfo?.lastName}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-white py-1 px-3 rounded-full text-sm" style={{
                backgroundColor: resumeInfo?.themeColor
              }}>{resumeInfo?.phone}</span>
              <span className=" text-white py-1 px-3 rounded-full text-sm" style={{
                backgroundColor: resumeInfo?.themeColor
              }}>{resumeInfo?.email}</span>
              <span className=" text-white py-1 px-3 rounded-full text-sm" style={{
                backgroundColor: resumeInfo?.themeColor
              }}>{resumeInfo?.address}</span>
            </div>
            <p className="mt-2 text-sm">
              SUMMARY: {resumeInfo?.summary}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="text-lg border-b-2  mb-3" style={{
            borderColor: resumeInfo?.themeColor,
            color: resumeInfo?.themeColor
          }}>
            {currentWorkType === 'projects' ? 'PROJECTS' : 'WORK EXPERIENCE'}
          </div>
          {currentWorkType === 'projects' ? (
            resumeInfo?.projects?.map((project) => (
              <div key={project.id} className="mb-5">
                <div className="flex items-center justify-between">
                  <h3 className="m-0 text-base">{project.title}</h3>
                  {project?.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline mt-1 inline-block"
                    >
                      View Project
                    </a>
                  )}
                </div>
                {project.techs && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techs.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-md text-white"
                        style={{ backgroundColor: resumeInfo?.themeColor }}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-sm mt-1 leading-relaxed experience-summary">
                  {project.description}
                </div>
              </div>
            ))
          ) : (
            resumeInfo?.experience?.map((exp) => (
              <div key={exp.id} className="mb-5">
                <h3 className="m-0 text-base">{exp.companyName} • {exp.title}</h3>
                <p className="m-1 text-sm" style={{
                  color: resumeInfo?.themeColor,
                }}>{formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)} | {exp.city} | {exp.state}</p>
                <div
                  className="text-sm mt-1 leading-relaxed experience-summary"
                  dangerouslySetInnerHTML={{ __html: exp?.summary }}
                />
              </div>
            ))
          )}
          {resumeInfo?.selectedExtraSections?.includes('languages') && resumeInfo?.languages?.length > 0 && (
            <div className="mb-5">
              <div className="relative">
                <div className="text-lg border-b-2" style={{
                  borderColor: resumeInfo?.themeColor,
                  color: resumeInfo?.themeColor
                }}>
                  LANGUAGES
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {resumeInfo?.languages?.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs font-medium">{lang.title}</span>
                    <span
                      className="text-[10px] px-2 py-[2px] rounded-full border text-center inline-block"
                      style={{
                        minWidth: '60px', // You can tweak this width
                        borderColor: '#ffffff',
                        color: resumeInfo?.themeColor
                      }}
                    >
                      {lang.level}
                    </span>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className=" text-lg border-b-2 mb-3" style={{
            color: resumeInfo?.themeColor,
            borderColor: resumeInfo?.themeColor
          }}>EDUCATION</div>
          {resumeInfo?.education?.map((edu) => (
            <div key={edu.id} className="mb-5">
              <h3 className="m-0 text-base">{edu.universityOrCollegeName}</h3>
              <p className="m-1 text-sm" style={{
                color: resumeInfo?.themeColor
              }}>
                {formatDate(edu.startDate)} - {edu.currentlyWorking ? 'Present' : formatDate(edu.endDate)}
              </p>
              <p className="m-1 flex flex-wrap gap-4 text-sm text-white">
                <span className=" px-2 py-1 rounded-full">
                  <strong>Major:</strong> {edu.major}
                </span>
                <span className=" px-2 py-1 rounded-full">
                  <strong>Degree:</strong> {edu.degree}
                </span>
              </p>
              <p className="m-1 text-sm text-white">{edu.description}</p>
            </div>
          ))}

          <div className=" text-lg border-b-2 mb-3" style={{
            color: resumeInfo?.themeColor,
            borderColor: resumeInfo?.themeColor
          }}>SKILLS</div>
          <div className="grid grid-cols-2 gap-4">
            {resumeInfo?.skills?.map((skill) => (
              <div key={skill.id}>
                <p className="mb-2">{skill.name}</p>
                <div className="w-full bg-gray-300 print:block h-2 rounded-full">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: skill?.rating * 20 + '%',
                      backgroundColor: resumeInfo?.themeColor,
                      WebkitPrintColorAdjust: 'exact',
                      printColorAdjust: 'exact'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>


          {resumeInfo?.selectedExtraSections?.includes('hobbies') && resumeInfo?.hobbies?.length > 0 && (
            <div className="mt-4">
              <div className=" text-lg border-b-2  mb-3" style={{
                color: resumeInfo?.themeColor,
                borderColor: resumeInfo?.themeColor
              }}>HOBBIES</div>
              {resumeInfo?.hobbies?.map((hobby, index) => (
                <div key={index} className="mb-5">
                  <p className="m-1 text-sm">{hobby.title}</p>
                  <p className="m-1 text-sm">{hobby.description}</p>
                </div>
              ))}
            </div>
          )}


          {resumeInfo?.selectedExtraSections?.includes('certificates') && resumeInfo?.certificates?.length > 0 && (
            <div className="mt-4">
              <div className="text-lg border-b-2 mb-3" style={{
                color: resumeInfo?.themeColor,
                borderColor: resumeInfo?.themeColor
              }}>
                CERTIFICATES
              </div>
              {resumeInfo.certificates.map((cert) => (
                <div key={cert.id} className="mb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">{cert.title}</h3>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 underline hover:text-blue-300"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                  <p className="text-sm flex flex-wrap items-center gap-2">
                    <span>
                      Issued by: <span style={{ color: resumeInfo?.themeColor, fontWeight: '600' }}>{cert.issuer}</span>
                    </span>
                    <span className="text-white">•</span>
                    <span className="text-white">{cert.date}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .font-arial {
          font-family: Arial, sans-serif;
        }
      `}</style>
    </div >
  );
}