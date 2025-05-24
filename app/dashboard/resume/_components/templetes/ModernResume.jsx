'use client';
import React, { useContext } from 'react';
import ResumeInfoContext from "@/Context/ResumeInfoContext";
import Image from 'next/image';
import { 
  User, Globe, MapPin, Phone, Mail, GraduationCap, Briefcase, Music, Book, Pen, Plane, Info, Award, MessageSquare, Heart, Palette, Camera, Gamepad, Utensils, Code,
  Bike, Dumbbell, Mountain, Soccer, Guitar, Film, Paintbrush, Chess, Fish, Sprout, Headphones, Mic, Palette as Art, Sailboat, ShoppingBag, Smartphone, Watch
} from 'lucide-react';

// Map hobby titles to icons for dynamic rendering
const hobbyIcons = {
  Music: Music,
  Reading: Book,
  Writing: Pen,
  Travel: Plane,
  Painting: Palette,
  Photography: Camera,
  Gaming: Gamepad,
  Cooking: Utensils,
  Coding: Code,
  Biking: Bike,
  Fitness: Dumbbell,
  Hiking: Mountain,
  Soccer: Soccer,
  Guitar: Guitar,
  Movies: Film,
  Drawing: Paintbrush,
  Chess: Chess,
  Fishing: Fish,
  Gardening: Sprout,
  Listening: Headphones,
  Singing: Mic,
  Art: Art,
  Sailing: Sailboat,
  Shopping: ShoppingBag,
  Technology: Smartphone,
  Watches: Watch,
  Default: Heart // Fallback icon
};

// Main App component for the resume template
function ModernResume() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const themeColor = resumeInfo?.themeColor || '#1A374D'; // Fallback color

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

  const currentWorkType = resumeInfo?.selectedWorkType || 'experience';

  // Function to get hobby icon based on title
  const getHobbyIcon = (hobbyTitle) => {
    const normalizedTitle = hobbyTitle?.toLowerCase().trim();
    for (const [key, Icon] of Object.entries(hobbyIcons)) {
      if (normalizedTitle === key.toLowerCase()) {
        return Icon;
      }
    }
    return hobbyIcons.Default; // Fallback to Heart icon
  };

  return (
    // Overall container for the resume, centering it on the screen
    <div className="h-full font-['Inter']">
      {/* Main resume card container with shadow and rounded corners */}
      <div className="flex flex-col lg:flex-row w-full mx-auto max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">

        {/* Left Sidebar - Dark Blue Section */}
        <div className="w-full lg:w-1/3 bg-[#1A374D] text-white p-6 sm:p-8 flex flex-col items-center relative">
          {/* Profile Picture Placeholder */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white flex items-center justify-center text-gray-400 text-5xl sm:text-6xl mb-4 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Profile"
                width={112}
                height={112}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <User size={60} />
            )}
          </div>

          {/* Name and Tagline */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider">{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
            <p className="text-sm text-gray-300 mt-0.5" style={{ color: themeColor }}>{resumeInfo?.jobTitle}</p>
          </div>

          {/* About Me Section */}
          {resumeInfo?.summary && (
            <div className="w-full mb-6 sm:mb-8">
              <h2 style={{ color: themeColor }} className="text-sm font-semibold uppercase border-b border-gray-600 pb-2 mb-3 text-center flex items-center justify-center tracking-wider">
                <Info size={16} className="mr-2 text-[#9bd0ff]" /> ABOUT ME
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 text-center leading-relaxed">
                {resumeInfo?.summary}
              </p>
            </div>
          )}

          {/* Contact Section */}
          {(resumeInfo?.phone || resumeInfo?.email || resumeInfo?.address) && (
            <div className="w-full mb-6 sm:mb-8">
              <h2 className="text-sm font-semibold uppercase border-b border-gray-600 pb-2 mb-3 text-center flex items-center justify-center tracking-wider">
                <Phone size={16} className="mr-2 text-[#9bd0ff]" /> CONTACT
              </h2>
              <div className="flex flex-col items-start space-y-2 text-xs sm:text-sm text-gray-300">
                {resumeInfo?.address && (
                  <div className="flex items-center w-full">
                    <MapPin size={12} className="mr-1.5 text-[#9bd0ff]" /> {resumeInfo?.address}
                  </div>
                )}
                {resumeInfo?.phone && (
                  <div className="flex items-center w-full">
                    <Phone size={12} className="mr-1.5 text-[#9bd0ff]" /> {resumeInfo?.phone}
                  </div>
                )}
                {resumeInfo?.email && (
                  <div className="flex items-center w-full">
                    <Mail size={12} className="mr-1.5 text-[#9bd0ff]" /> {resumeInfo?.email}
                  </div>
                )}
                {resumeInfo?.website && (
                  <div className="flex items-center w-full">
                    <Globe size={12} className="mr-1.5 text-[#9bd0ff]" /> {resumeInfo?.website}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Professional Skills Section */}
          {resumeInfo?.skills?.length > 0 && (
            <div className="w-full mb-6 sm:mb-8">
              <h2 style={{ color: themeColor }} className="text-sm font-semibold uppercase border-b border-gray-600 pb-2 mb-3 text-center flex items-center justify-center tracking-wider">
                <Award size={16} className="mr-2 text-[#9bd0ff]" /> PROFESSIONAL SKILLS
              </h2>
              <div className="space-y-3">
                {resumeInfo?.skills?.map((skill) => (
                  <div key={skill.id} className="flex flex-col items-start">
                    <span className="text-xs sm:text-sm mb-1 text-gray-200">{skill.name}</span>
                    <div className="w-full bg-gray-600 rounded-full h-1.5">
                      <div className={`bg-[#4A7C9B] h-1.5 rounded-full transition-all duration-500 ease-in-out`} style={{ width: `${skill.rating * 20}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Language Section */}
          {resumeInfo?.selectedExtraSections?.includes('languages') && resumeInfo?.languages?.length > 0 && (
            <div className="w-full mb-6 sm:mb-8">
              <h2 style={{ color: themeColor }} className="text-sm font-semibold uppercase border-b border-gray-600 pb-2 mb-3 text-center flex items-center justify-center tracking-wider">
                <MessageSquare size={16} className="mr-2 text-[#9bd0ff]" /> LANGUAGE
              </h2>
              <div className="space-y-3">
                {resumeInfo?.languages?.map((lang, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <span className="text-xs sm:text-sm mb-1 text-gray-200">{lang.title}</span>
                    <span
                      className="text-xs px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content - White Section */}
        <div className="w-full lg:w-2/3 p-6 sm:p-8 bg-white overflow-y-auto">
          {/* Formal Education Section */}
          {resumeInfo?.education?.length > 0 && (
            <>
              <h2 style={{ color: themeColor }} className="text-xl sm:text-2xl font-bold uppercase text-[#1A374D] mb-6 sm:mb-8 flex items-center justify-start tracking-wider">
                <GraduationCap size={18} className="mr-2 text-[#1A374D]" /> <span className="align-middle">FORMAL EDUCATION</span>
              </h2>
              <div className="relative border-l-2 border-gray-300 pl-6 sm:pl-8">
                {resumeInfo?.education?.map((edu) => (
                  <div key={edu.id} className="mb-6 relative p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="absolute left-[-0.875rem] sm:left-[-1.25rem] top-[-0.75rem] w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                      <GraduationCap size={14} className="text-white" />
                    </div>
                    <p className="font-bold text-xs sm:text-sm mb-1" style={{ color: themeColor }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    <div>
                      <h3 className="text-base font-semibold text-[#1A374D] inline">{edu.degree}</h3>
                      <span className="text-base text-gray-700"> in </span>
                      <span className="text-base font-medium text-gray-700">{edu.major}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{edu.universityOrCollegeName}</p>
                    {edu.description && (
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Professional Experience Section */}
          {(currentWorkType === 'experience' && resumeInfo?.experience?.length > 0) && (
            <>
              <h2 style={{ color: themeColor }} className="text-xl sm:text-2xl font-bold uppercase text-[#1A374D] mb-6 sm:mb-8 mt-4 flex items-center justify-start tracking-wider">
                <Briefcase size={18} className="mr-2 text-[#1A374D]" /> <span className="align-middle">PROFESSIONAL EXPERIENCE</span>
              </h2>
              <div className="relative border-l-2 border-gray-300 pl-6 sm:pl-8">
                {resumeInfo?.experience?.map((exp) => (
                  <div key={exp.id} className="mb-6 relative p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="absolute left-[-0.875rem] sm:left-[-1.25rem] top-[-0.75rem] w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                      <Briefcase size={14} className="text-white" />
                    </div>
                    <p className="font-bold text-xs sm:text-sm mb-1" style={{ color: themeColor }}>
                      {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                    </p>
                    <h3 className="text-base font-semibold text-[#1A374D] mb-0.5">{exp.title}</h3>
                    <p className="text-xs text-gray-600 mb-1">{exp.companyName}, {exp.city}, {exp.state}</p>
                    {exp?.summary && (
                      <div
                        className="text-xs text-gray-500 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: exp?.summary }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Projects Section */}
          {(currentWorkType === 'projects' && resumeInfo?.projects?.length > 0) && (
            <>
              <h2 style={{ color: themeColor }} className="text-xl sm:text-2xl font-bold uppercase text-[#1A374D] mb-6 sm:mb-8 mt-4 flex items-center justify-start tracking-wider">
                <Briefcase size={18} className="mr-2 text-[#1A374D]" /> <span className="align-middle">PROJECTS</span>
              </h2>
              <div className="relative border-l-2 border-gray-300 pl-6 sm:pl-8">
                {resumeInfo?.projects?.map((project) => (
                  <div key={project.id} className="mb-6 relative p-4 rounded-lg bg-gray-50 border border-gray-200 ">
                    <div className="absolute left-[-0.875rem] sm:left-[-1.25rem] top-[-0.75rem] w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                      <Briefcase size={14} className="text-white" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-[#1A374D] mb-0.5">{project.title}</h3>
                      {project?.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 underline mt-0.5 inline-block"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">{project.description}</p>
                    {project.techs && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.techs.split(',').map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-[0.7rem] rounded-md text-white"
                            style={{ backgroundColor: resumeInfo?.themeColor }}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Certificates Section */}
          {resumeInfo?.selectedExtraSections?.includes('certificates') && resumeInfo?.certificates?.length > 0 && (
            <div>
              <h2 style={{ color: themeColor }} className="text-xl sm:text-2xl font-bold uppercase text-[#1A374D] mb-6 sm:mb-8 mt-6 flex items-center justify-start tracking-wider">
                <Award size={18} className="mr-2 text-[#1A374D]" /> <span className="align-middle">CERTIFICATIONS</span>
              </h2>
              <div className="relative border-l-2 border-gray-300 pl-6 sm:pl-8">
                {resumeInfo?.certificates?.map((cert, index) => (
                  <div key={index} className="mb-6 relative p-4 rounded-lg bg-gray-50 border border-gray-200 ">
                    <div className="absolute left-[-0.875rem] sm:left-[-1.25rem] top-[-0.75rem] w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                      <Award size={14} className="text-white" />
                    </div>
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-xs sm:text-sm mb-0.5">{cert?.title}</p>
                      {cert?.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 underline mt-0.5 inline-block"
                        >
                          View Certificate
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-gray-600" style={{ color: themeColor }}>{cert?.issuer} - {formatDate(cert?.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies Section */}
          {resumeInfo?.selectedExtraSections?.includes('hobbies') && resumeInfo?.hobbies?.length > 0 && (
            <div className="mt-6">
              <h2 style={{ color: themeColor }} className="text-xl sm:text-2xl font-bold uppercase text-[#1A374D] mb-6 flex items-center justify-start tracking-wider">
                <Heart size={18} className="mr-2 text-[#1A374D]" /> <span className="align-middle">HOBBIES</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeInfo?.hobbies?.map((hobby) => {
                  const HobbyIcon = getHobbyIcon(hobby.title);
                  return (
                    <div
                      key={hobby.id}
                      className="flex items-start p-4 rounded-lg bg-gray-50  border border-gray-200"
                    >
                      <HobbyIcon
                        size={20}
                        className="mr-3 text-[#1A374D] flex-shrink-0"
                        style={{ color: themeColor }}
                      />
                      <div>
                        <h6 className="text-sm font-semibold text-[#1A374D] mb-1">{hobby.title}</h6>
                        {hobby.description && (
                          <p className="text-xs text-gray-600 leading-relaxed">{hobby.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ModernResume;