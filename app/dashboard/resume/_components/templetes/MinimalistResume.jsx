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
            </div>
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
                      <div className="mt-2 text-black" dangerouslySetInnerHTML={{ __html: edu.description }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EXTRA SECTIONS: only if selected */}
            {resumeInfo?.selectedExtraSections?.includes('hobbies') && (
              <div className="mb-10">
                <div className="text-white py-2 px-4 relative -mx-6 clip-path-slant" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}>
                  <h2 className="text-xl font-bold tracking-wider">HOBBIES</h2>
                </div>
                <div className="mt-6 space-y-3 text-black">
                  {resumeInfo?.hobbies?.map((hobby) => (
                    <div key={hobby.id}>
                      <h3 className="font-semibold">{hobby.title}</h3>
                      <p>{hobby.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resumeInfo?.selectedExtraSections?.includes('certificates') && (
              <div className="mb-10">
                <div className="text-white py-2 px-4 relative -mx-6 clip-path-slant" style={{ backgroundColor: resumeInfo?.themeColor || '#375672' }}>
                  <h2 className="text-xl font-bold tracking-wider">CERTIFICATES</h2>
                </div>
                <div className="mt-6 space-y-3 text-black">
                  {resumeInfo?.certificates?.map((cert) => (
                    <div key={cert.id}>
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p>Issuer: {cert.issuer}</p>
                      <p>Date: {formatDate(cert.date)}</p>
                      {cert.url && (
                        <p>
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Certificate
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
