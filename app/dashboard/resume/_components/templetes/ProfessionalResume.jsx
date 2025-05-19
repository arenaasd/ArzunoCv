'use client';
import React, { useContext, useEffect } from 'react';
import ResumeInfoContext from "@/Context/ResumeInfoContext";

const ResumeUI = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const themeColor = resumeInfo?.themeColor || '#1D4ED8';

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

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="shadow-lg h-full p-4 md:p-8 lg:p-14 font-sans">
            <div className="border-b border-gray-300 pb-4 mb-6">
                <h1 className="text-3xl font-bold">
                    {resumeInfo?.firstName} {resumeInfo?.lastName}
                </h1>
                <div className="text-sm mt-1 space-y-1">
                    <p>📧 {resumeInfo?.email}</p>
                    <p>📱 {resumeInfo?.phone}</p>
                    {resumeInfo?.website && (
                        <p>
                            🌐 <a href={resumeInfo.website} className="text-blue-600">{resumeInfo.website}</a>
                        </p>
                    )}
                </div>
                <p className="mt-2 font-medium" style={{ color: themeColor }}>
                    {resumeInfo?.jobTitle}
                </p>
            </div>

            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Skills */}
                    {resumeInfo?.skills?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>TECHNICAL SKILLS</h2>
                            <div className="space-y-4">
                                {resumeInfo.skills.map(skill => (
                                    <div key={skill.id}>
                                        <p className="text-sm font-medium mb-1">{skill.name}</p>
                                        <div className="w-full bg-gray-300 h-2 rounded-full">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${skill.rating * 20}%`,
                                                    backgroundColor: themeColor,
                                                    WebkitPrintColorAdjust: 'exact',
                                                    printColorAdjust: 'exact',
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {resumeInfo?.education?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>EDUCATION</h2>
                            {resumeInfo.education.map((edu) => (
                                <div key={edu.id} className="my-4">
                                    {/* Top line: Degree, Major, University — Date on the right */}
                                    <div className="flex justify-between items-center text-sm font-semibold">
                                        <div className="flex-1">
                                            {edu.degree} in {edu.major} – {edu.universityOrCollegeName}
                                        </div>
                                        <div className="ml-4 whitespace-nowrap text-xs font-medium" style={{ color: themeColor }}>
                                            {formatDate(edu.startDate)} – {!edu.endDate ? 'Present' : formatDate(edu.endDate)}
                                        </div>
                                    </div>

                                    {/* Optional description below */}
                                    {edu.description && (
                                        <div className="text-sm mt-1 leading-relaxed">
                                            {edu.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Summary */}
                    {resumeInfo?.summary && (
                        <div>
                            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>SUMMARY</h2>
                            <p className="text-sm leading-relaxed">{resumeInfo.summary}</p>
                        </div>
                    )}

                    {/* Experience OR Projects based on currentWorkType */}
                    {(
                        currentWorkType === 'experience' ? 
                        resumeInfo?.experience?.length > 0 : 
                        resumeInfo?.projects?.length > 0
                    ) && (
                        <div>
                            <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>
                                {currentWorkType === 'projects' ? 'PROJECTS' : 'EXPERIENCE'}
                            </h2>

                            {currentWorkType === 'projects' ? (
                                // Projects rendering
                                resumeInfo?.projects?.map((project, index) => (
                                    <div key={index} className="my-4">
                                        <h2 className="text-sm font-bold tracking-wide">{project.title}</h2>
                                        
                                        {project.link && (
                                            <div className="text-xs my-1">
                                                <a href={project.link} className="text-blue-600 font-medium" target="_blank" rel="noopener noreferrer">
                                                    {project.link}
                                                </a>
                                            </div>
                                        )}
                                        
                                        <p className="text-sm mt-1 leading-relaxed">{project.description}</p>
                                        
                                        {project.techs && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {project.techs.split(',').map((tech, idx) => (
                                                    <span 
                                                        key={idx} 
                                                        className="px-2 py-0.5 text-xs rounded-md text-white" 
                                                        style={{ backgroundColor: themeColor }}
                                                    >
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                // Experience rendering
                                resumeInfo?.experience?.map((exp, index) => (
                                    <div key={index} className="my-4">
                                        <h2 className="text-sm font-bold tracking-wide">{exp.title}</h2>

                                        <div className="text-xs font-medium flex flex-wrap my-1 justify-between">
                                            <div>
                                                {[exp.companyName, exp.city, exp.state].filter(Boolean).join(', ')}
                                            </div>
                                            <div className="text-xs font-medium whitespace-nowrap ml-2" style={{ color: themeColor }}>
                                                {formatDate(exp.startDate)} – {!exp.endDate ? "Present" : formatDate(exp.endDate)}
                                            </div>
                                        </div>

                                        <div
                                            className="text-sm mt-1 leading-relaxed experience-summary"
                                            dangerouslySetInnerHTML={{ __html: exp?.summary }}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeUI;