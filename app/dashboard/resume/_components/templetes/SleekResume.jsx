'use client'
import { useContext } from "react";
import Image from 'next/image';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';

export default function JeremyTorresResume() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  const {
    firstName,
    lastName,
    jobTitle,
    phone,
    email,
    address,
    summary,
    experience,
    education,
    skills,
    projects,
    themeColor,
    currentWorkType,
    certificates,
    languages,
    hobbies,
    selectedExtraSections
  } = resumeInfo;

  return (
    <div className="shadow-lg h-full p-4 md:p-8 lg:p-14 font-arial">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-5 text-white" style={{ backgroundColor: '#2b2b2b' }}>
        <div className="w-full flex items-center mb-5">
          <Image
            src="https://via.placeholder.com/100"
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full mr-5"
          />
          <div className="flex-grow">
            <h1 className="m-0 text-2xl" style={{ color: themeColor }}>{`${firstName} ${lastName}`}</h1>
            <h2 className="m-0 text-lg text-gray-300">{jobTitle}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="py-1 px-3 rounded-full text-sm" style={{ backgroundColor: themeColor, color: 'black' }}>{phone}</span>
              <span className="py-1 px-3 rounded-full text-sm" style={{ backgroundColor: themeColor, color: 'black' }}>{email}</span>
              <span className="py-1 px-3 rounded-full text-sm" style={{ backgroundColor: themeColor, color: 'black' }}>{address}</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className="text-sm mb-5"><span className="font-bold" style={{ color: themeColor }}>SUMMARY:</span> {summary}</p>
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="text-lg border-b-2 mb-3 font-bold" style={{ color: themeColor, borderColor: themeColor }}>{currentWorkType === 'projects' ? 'PROJECTS' : 'WORK EXPERIENCE'}</div>
          {(currentWorkType === 'projects' ? projects : experience).map((item, idx) => (
            <div className="mb-5" key={idx}>
              <h3 className="m-0 text-base font-semibold">{item.companyName || item.title} • {item.title}</h3>
              <p className="m-1 text-sm" style={{ color: themeColor }}>{item.startDate} - {item.endDate} | {item.city}, {item.state}</p>
              <p className="m-1 pl-5 text-sm text-gray-300">{item.summary}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="text-lg border-b-2 mb-3 font-bold" style={{ color: themeColor, borderColor: themeColor }}>EDUCATION</div>
          {education.map((edu, idx) => (
            <div className="mb-5" key={idx}>
              <h3 className="m-0 text-base font-semibold">{edu.universityOrCollegeName}</h3>
              <p className="m-1 text-sm" style={{ color: themeColor }}>{edu.startDate} - {edu.endDate}</p>
              <p className="m-1 text-sm text-gray-400">Major: {edu.major}</p>
              <p className="m-1 text-sm text-gray-400">{edu.description}</p>
            </div>
          ))}

          <div className="text-lg border-b-2 mb-3 font-bold" style={{ color: themeColor, borderColor: themeColor }}>SKILLS</div>
          <div className="mb-5 flex flex-wrap gap-2">
            {skills.map(skill => (
              <span className="bg-gray-800 px-3 py-1 rounded-full text-sm" key={skill.id}>{skill.name}</span>
            ))}
          </div>

          {selectedExtraSections?.includes('certificates') && certificates?.length > 0 && (
            <>
              <div className="text-lg border-b-2 mb-3 font-bold" style={{ color: themeColor, borderColor: themeColor }}>CERTIFICATES</div>
              {certificates.map((cert, idx) => (
                <div className="mb-5" key={idx}>
                  <h3 className="m-0 text-base font-semibold">{cert.title}</h3>
                  <p className="m-1 text-sm" style={{ color: themeColor }}>{cert.date}</p>
                  <p className="m-1 text-sm text-gray-400">{cert.issuer}</p>
                </div>
              ))}
            </>
          )}

          {selectedExtraSections?.includes('languages') && languages?.length > 0 && (
            <>
              <div className="text-lg border-b-2 mb-3 font-bold" style={{ color: themeColor, borderColor: themeColor }}>LANGUAGES</div>
              {languages.map((lang, idx) => (
                <p className="m-1 text-sm" key={idx}>{lang.language}</p>
              ))}
            </>
          )}

          {selectedExtraSections?.includes('hobbies') && hobbies?.length > 0 && (
            <>
              <div className="text-lg border-b-2 mb-3 font-bold" style={{ color: themeColor, borderColor: themeColor }}>HOBBIES</div>
              {hobbies.map((hobby, idx) => (
                <p className="m-1 text-sm" key={idx}>{hobby.hobby}</p>
              ))}
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        .font-arial {
          font-family: Arial, sans-serif;
        }
        body {
          background-color: #2b2b2b;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
