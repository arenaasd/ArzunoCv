'use client'
import ResumeInfoContext from "@/Context/ResumeInfoContext";
import { useEffect, useContext } from "react";
import Image from 'next/image';

export default function JeremyTorresResume() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const imageUrl = resumeInfo?.Image?.url
        ? `https://arzunocv-strapi-backend-production.up.railway.app${resumeInfo.Image.url}`
        : "https://via.placeholder.com/100";

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
    const currentWorkType = resumeInfo?.selectedWorkType ? resumeInfo.selectedWorkType : 'experience';

    return (
        <div className="shadow-lg h-full p-4 md:p-8 lg:p-14 font-arial">
            <div className="max-w-4xl mx-auto shadow-lg text-white" style={{ backgroundColor: '#2b2b2b' }}>        <div className="w-full flex items-center mb-5">
                <Image
                    src={imageUrl}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full mr-5"
                />
                <div className="flex-grow">
                    <h1 className="m-0 text-2xl" style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.jobTitle.toUpperCase()}</h1>
                    <h1 className="m-0 text-2xl" style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.firstName.toUpperCase()} {resumeInfo?.lastName.toUpperCase()}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-black py-1 px-3 rounded-full text-sm" style={{ backgroundColor: resumeInfo?.themeColor }}>{resumeInfo?.phone}</span>
                        <span className="text-black py-1 px-3 rounded-full text-sm" style={{ backgroundColor: resumeInfo?.themeColor }}>{resumeInfo?.email}</span>
                        <span className="text-black py-1 px-3 rounded-full text-sm" style={{ backgroundColor: resumeInfo?.themeColor }}>{resumeInfo?.address}</span>
                    </div>
                    <p className="mt-2 text-sm">{resumeInfo?.summary}</p>
                </div>
            </div>

                <div className="flex-1 min-w-[300px]">
                    <div className="text-lg border-b-2 mb-3" style={{ color: resumeInfo?.themeColor, borderColor: resumeInfo?.themeColor }}>WORK EXPERIENCE</div>
                    <div className="mb-5">
                        <h3 className="m-0 text-base">{resumeInfo?.experience[0]?.companyName} • {resumeInfo?.experience[0]?.title}</h3>
                        <p className="m-1 text-sm" style={{ color: resumeInfo?.themeColor }}>{formatDate(resumeInfo?.experience[0]?.startDate)} - {formatDate(resumeInfo?.experience[0]?.endDate)} | {resumeInfo?.experience[0]?.city}</p>
                        <div dangerouslySetInnerHTML={{ __html: resumeInfo?.experience[0]?.summary }} />
                    </div>
                    <div className="mb-5">
                        <h3 className="m-0 text-base">{resumeInfo?.experience[1]?.companyName} • {resumeInfo?.experience[1]?.title}</h3>
                        <p className="m-1 text-sm" style={{ color: resumeInfo?.themeColor }}>{formatDate(resumeInfo?.experience[1]?.startDate)} - {formatDate(resumeInfo?.experience[1]?.endDate)} | {resumeInfo?.experience[1]?.city}</p>
                        <div dangerouslySetInnerHTML={{ __html: resumeInfo?.experience[1]?.summary }} />
                    </div>
                    <div className="mb-5">
                        <h3 className="m-0 text-base">{resumeInfo?.experience[2]?.companyName} • {resumeInfo?.experience[2]?.title}</h3>
                        <p className="m-1 text-sm" style={{ color: resumeInfo?.themeColor }}>{formatDate(resumeInfo?.experience[2]?.startDate)} - {formatDate(resumeInfo?.experience[2]?.endDate)} | {resumeInfo?.experience[2]?.city}</p>
                        <div dangerouslySetInnerHTML={{ __html: resumeInfo?.experience[2]?.summary }} />
                    </div>
                    <div className="mb-5">
                        <h3 className="m-0 text-base">{resumeInfo?.experience[3]?.companyName} • {resumeInfo?.experience[3]?.title}</h3>
                        <p className="m-1 text-sm" style={{ color: resumeInfo?.themeColor }}>{formatDate(resumeInfo?.experience[3]?.startDate)} - {formatDate(resumeInfo?.experience[3]?.endDate)} | {resumeInfo?.experience[3]?.city}</p>
                        <div dangerouslySetInnerHTML={{ __html: resumeInfo?.experience[3]?.summary }} />
                    </div>
                </div>

                <div className="flex-1 min-w-[300px]">
                    <div className="text-lg border-b-2 mb-3" style={{ color: resumeInfo?.themeColor, borderColor: resumeInfo?.themeColor }}>EDUCATION</div>
                    <div className="mb-5">
                        <h3 className="m-0 text-base">{resumeInfo?.education[0]?.universityOrCollegeName}</h3>
                        <p className="m-1 text-sm" style={{ color: resumeInfo?.themeColor }}>{formatDate(resumeInfo?.education[0]?.startDate)} - {formatDate(resumeInfo?.education[0]?.endDate)}</p>
                        <p className="m-1 text-sm text-gray-400">Major: {resumeInfo?.education[0]?.major}</p>
                        <p className="m-1 text-sm text-gray-400">{resumeInfo?.education[0]?.description}</p>
                    </div>

                    <div className="text-lg border-b-2 mb-3" style={{ color: resumeInfo?.themeColor, borderColor: resumeInfo?.themeColor }}>SKILLS</div>
                    <div className="mb-5">
                        <p className="m-1 text-sm">{resumeInfo?.skills[0]?.name}</p>
                        <p className="m-1 text-sm">{resumeInfo?.skills[1]?.name}</p>
                    </div>

                    <div className="text-lg border-b-2 mb-3" style={{ color: resumeInfo?.themeColor, borderColor: resumeInfo?.themeColor }}>HOBBIES AND HABITS</div>
                    <div className="mb-5">
                        <p className="m-1 text-sm">{resumeInfo?.hobbies[0]?.title}: {resumeInfo?.hobbies[0]?.description}</p>
                        <p className="m-1 text-sm">{resumeInfo?.hobbies[1]?.title}: {resumeInfo?.hobbies[1]?.description}</p>
                    </div>
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