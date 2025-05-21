'use client'
import ResumeInfoContext from "@/Context/ResumeInfoContext";
import { useEffect, useContext } from "react";
import Image from 'next/image';

export default function MinimalistTemplate() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const imageUrl = resumeInfo?.Image?.url
    ? `https://arzunocv-strapi-backend-production.up.railway.app${resumeInfo.Image.url}`
    : null;

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };
  
  // Load from localStorage on component mount
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

  // Use fallback if selectedWorkType isn't set
  const currentWorkType = resumeInfo?.selectedWorkType || 'experience';

  return (
    <div className="shadow-lg h-full p-4 md:p-8 lg:p-14 font-sans">
      <main className="max-w-4xl mx-auto bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left column */}
          <div className="md:col-span-4 text-white p-6" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}>
            {/* Profile image */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Profile"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-500">
                      {resumeInfo?.firstName?.[0]}{resumeInfo?.lastName?.[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* PERSONAL INFORMATION */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute -left-6 -right-6 bg-white clip-path-skills">
                  <h2 className="font-bold py-2 px-4 text-xl tracking-wider" style={{ color: resumeInfo?.themeColor || '#375672' }}>PERSONAL DETAILS</h2>
                </div>
                <div className="h-10"></div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex flex-col items-center">
                  <p className="font-bold text-lg">{resumeInfo?.jobTitle}</p>
                  <p className="text-sm mt-1">{resumeInfo?.address}</p>
                  <p className="text-sm mt-1">{resumeInfo?.phone}</p>
                  <p className="text-sm mt-1">{resumeInfo?.email}</p>
                </div>
              </div>
            </div>

            {/* SKILLS */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute -left-6 -right-6 bg-white clip-path-skills">
                  <h2 className="font-bold py-2 px-4 text-xl tracking-wider" style={{ color: resumeInfo?.themeColor || '#375672' }}>SKILLS</h2>
                </div>
                <div className="h-10"></div>
              </div>

              <div className="space-y-4 mt-6">
                {resumeInfo?.skills?.map((skill) => (
                  <div key={skill.id}>
                    <p className="mb-2">{skill.name}</p>
                    <div className="w-full bg-gray-300 print:block h-2 rounded-full">
                      <div className="h-2 rounded-full"
                        style={{
                          width: skill?.rating * 20 + '%',
                          backgroundColor: "#ffffff",
                          WebkitPrintColorAdjust: 'exact',
                          printColorAdjust: 'exact'
                        }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LANGUAGES */}
            {resumeInfo?.selectedExtraSections?.includes('languages') && resumeInfo?.languages?.length > 0 && (
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute -left-6 -right-6 bg-white clip-path-skills">
                    <h2 className="font-bold py-2 px-4 text-xl tracking-wider" style={{ color: resumeInfo?.themeColor || '#375672' }}>LANGUAGES</h2>
                  </div>
                  <div className="h-10"></div>
                </div>
                <div className="mt-6 space-y-2">
                  {resumeInfo?.languages?.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs font-medium">{lang.title}</span>
                      <span 
                        className="text-[10px] px-2 py-[2px] rounded-full border" 
                        style={{
                          borderColor: resumeInfo?.themeColor || '#375672',
                          color: resumeInfo?.themeColor || '#375672'
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

          {/* Right column */}
          <div className="md:col-span-8 bg-white p-3 relative">
            <div className="text-white py-4 px-6 relative -mx-6 clip-path-slant mb-12" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}>
              <h1 className="text-3xl font-bold tracking-wider">{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
              <p className="mt-2 text-lg font-medium">{resumeInfo?.jobTitle}</p>
            </div>

            {/* Summary */}
            <div className="mb-10">
              <div className="text-white py-2 px-4 relative -mx-6 clip-path-slant" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}>
                <h2 className="text-xl font-bold tracking-wider">PROFESSIONAL SUMMARY</h2>
              </div>
              <div className="mt-6">
                <p className="text-sm text-black leading-relaxed">
                  {resumeInfo?.summary}
                </p>
              </div>
            </div>

            {/* Experience OR Projects */}
            <div className="mb-10">
              <div className="text-white py-2 px-4 relative -mx-6 clip-path-slant" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}>
                <h2 className="text-xl font-bold tracking-wider">
                  {currentWorkType === 'projects' ? 'PROJECTS' : 'WORK EXPERIENCE'}
                </h2>
              </div>
              <div className="mt-6 space-y-6">
                {currentWorkType === 'projects' ? (
                  resumeInfo?.projects?.map((project) => (
                    <div key={project.id} className="pl-6 relative">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}></div>
                      <div>
                        <h3 className="text-lg text-black font-semibold">{project.title}</h3>
                        {project.link && (
                          <p className="text-sm text-blue-600 font-medium">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              {project.link}
                            </a>
                          </p>
                        )}
                        <p className="text-sm mt-1 leading-relaxed text-black">{project.description}</p>
                        {project.techs && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.techs.split(',').map((tech, index) => (
                              <span 
                                key={index} 
                                className="px-2 py-1 text-xs rounded-md text-white" 
                                style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  resumeInfo?.experience?.map((exp) => (
                    <div key={exp.id} className="pl-6 relative">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}></div>
                      <div>
                        <h3 className="text-lg text-black font-semibold">{exp.title}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <p>{exp.companyName} | {exp.city}, {exp.state}</p>
                          <p>{formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}</p>
                        </div>
                        <div
                          className="text-sm mt-1 leading-relaxed experience-summary"
                          dangerouslySetInnerHTML={{ __html: exp?.summary }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Education */}
            <div className="mb-10">
              <div className="text-white py-2 px-4 relative -mx-6 clip-path-slant" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}>
                <h2 className="text-xl font-bold tracking-wider">EDUCATION</h2>
              </div>
              <div className="mt-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="border text-black border-gray-300 py-2 px-2 text-left bg-gray-50">Institution</th>
                      <th className="border text-black border-gray-300 py-2 px-2 text-left bg-gray-50">Period</th>
                      <th className="border border-gray-300 text-black py-2 px-2 text-left bg-gray-50">Degree</th>
                      <th className="border border-gray-300 py-2 px-2 text-black text-left bg-gray-50">Major</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumeInfo?.education?.map((edu) => (
                      <tr key={edu.id}>
                        <td className="border text-black border-gray-300 py-2 px-2 font-medium">{edu.universityOrCollegeName}</td>
                        <td className="border border-gray-300 text-black py-2 px-2">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</td>
                        <td className="border text-black border-gray-300 py-2 px-2">{edu.degree}</td>
                        <td className="border text-black border-gray-300 py-2 px-2">{edu.major}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 space-y-4">
                  {resumeInfo?.education?.map((edu) => (
                    <div key={`${edu.id}-desc`} className="pl-6 relative">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}></div>
                      <div>
                        <h3 className="text-md text-black font-semibold">{edu.universityOrCollegeName}</h3>
                        <p className="mt-1 text-black text-sm">{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EXTRA SECTIONS: Certificates and Hobbies */}
            {resumeInfo?.selectedExtraSections?.includes('certificates') && resumeInfo?.certificates?.length > 0 && (
              <div className="my-6">
                <h2 
                  className="text-center font-bold text-sm tracking-wide mb-1" 
                  style={{ color: resumeInfo?.themeColor || '#375672' }}
                >
                  Certifications
                </h2>
                <hr 
                  className="border-[1px]" 
                  style={{ borderColor: resumeInfo?.themeColor || '#375672' }} 
                />
                {resumeInfo?.certificates?.map((cert, index) => (
                  <div className="my-4" key={index}>
                    <h2 className="text-sm font-bold tracking-wide">
                      {cert?.title}
                    </h2>
                    <div className="text-xs font-medium flex flex-wrap my-1 justify-between">
                      <div>{cert?.issuer}</div>
                      <div className="text-xs font-medium whitespace-nowrap ml-2">
                        {formatDate(cert?.date)}
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
            )}

            {resumeInfo?.selectedExtraSections?.includes('hobbies') && resumeInfo?.hobbies?.length > 0 && (
              <div className="my-6">
                <h2 
                  className="text-center font-bold text-sm tracking-wide mb-1" 
                  style={{ color: resumeInfo?.themeColor || '#375672' }}
                >
                  Hobbies
                </h2>
                <hr 
                  className="border-[1px]" 
                  style={{ borderColor: resumeInfo?.themeColor || '#375672' }} 
                />
                <div className="mt-4 space-y-4">
                  {resumeInfo?.hobbies?.map((hobby, index) => (
                    <div className="my-4" key={index}>
                      <h2 className="text-sm font-bold tracking-wide">{hobby.title}</h2>
                      <p className="text-xs mt-1">{hobby.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Custom styles */}
      <style jsx global>{`
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
        }
        .clip-path-skills {
          clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}