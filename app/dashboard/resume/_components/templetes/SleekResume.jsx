'use client'
import { useEffect, useContext } from "react";
import Image from 'next/image';
import ResumeInfoContext from "@/Context/ResumeInfoContext";

export default function JeremyTorresResume() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const imageUrl = resumeInfo?.Image?.url
    ? `https://arzunocv-strapi-backend-production.up.railway.app${resumeInfo.Image.url}`
    : null;

    const currentWorkType = resumeInfo?.selectedWorkType || 'experience';

  return (
    <div className="shadow-lg bg-[#2b2b2b] h-full p-4 md:p-8 lg:p-14 font-arial">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-5 text-white" style={{ backgroundColor: '#2b2b2b' }}>
        <div className="w-full flex items-center mb-5">
          <Image
            src={imageUrl}
            alt="Dummy Profile Picture"
            width={100}
            height={100}
            className="rounded-full mr-5"
          />
          <div className="flex-grow">
            <p className="font-bold text-lg">{resumeInfo?.jobTitle}</p>
            <span className="text-3xl font-bold text-gray-500">
              {resumeInfo?.firstName?.[0]}{resumeInfo?.lastName?.[0]}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-black py-1 px-3 rounded-full text-sm" style={{
                color: resumeInfo?.themeColor
              }}>{resumeInfo?.phone}</span>
              <span className=" text-black py-1 px-3 rounded-full text-sm" style={{
                color: resumeInfo?.themeColor
              }}>{resumeInfo?.email}</span>
              <span className=" text-black py-1 px-3 rounded-full text-sm" style={{
                color: resumeInfo?.themeColor
              }}>{resumeInfo?.address}</span>
            </div>
            <p className="mt-2 text-sm">
              SUMMARY: {resumeInfo?.summary}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="text-lg border-b-2 border-green-500 mb-3" style={{
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
                }}>{exp.startDate} - {exp.endDate} | {exp.city} | {exp.state}</p>
                <div
                  className="text-sm mt-1 leading-relaxed experience-summary"
                  dangerouslySetInnerHTML={{ __html: exp?.summary }}
                />
              </div>
            ))
          )}
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="text-green-500 text-lg border-b-2 border-green-500 mb-3">EDUCATION</div>
          {resumeInfo?.education?.map((edu)=> (
          <div className="mb-5">
            <h3 className="m-0 text-base">{edu.universityOrCollegeName}</h3>
            <p className="m-1 text-sm" style={{
                color: resumeInfo?.themeColor
              }}>{edu.startDate} - {edu.endDate}</p>
            <p className="m-1 text-sm text-gray-400">Major: {edu.major}</p>
            <p className="m-1 text-sm text-gray-400">Degree - {edu.degree}</p>
            <p className="mt-1 text-black text-sm">{edu.description}</p>
          </div>
          ))}

          <div className="text-green-500 text-lg border-b-2 border-green-500 mb-3">SKILLS</div>
          <div className="mb-5">
            <p className="m-1 text-sm">Advanced skill: Planning, Presentation</p>
            <p className="m-1 text-sm">Tools: Microsoft Office, Photoshop</p>
          </div>

          <div className="text-green-500 text-lg border-b-2 border-green-500 mb-3">HOBBIES</div>
          <div className="mb-5">
            <p className="m-1 text-sm">Habit: Morning reading</p>
            <p className="m-1 text-sm">Hobbies: Badminton, Traveling</p>
          </div>
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