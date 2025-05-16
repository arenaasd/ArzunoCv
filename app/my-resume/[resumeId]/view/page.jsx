'use client';
import { Button } from '@/components/ui/button';
import ResumeInfoContext from '@/Context/ResumeInfoContext';
import GlobalApi from '@/Service/GlobalApi';
import { useParams, notFound } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import PreviewSection from '../../../dashboard/resume/_components/PreviewSection';
import MinimalistResume from "../../../dashboard/resume/_components/templetes/MinimalistResume"
import ShareModal from '@/components/ShareModel';

// Import any other template components you have
// For example:
// import MinimalistTemplate from '../../../dashboard/resume/_components/MinimalistTemplate';
// import ModernTemplate from '../../../dashboard/resume/_components/ModernTemplate';

const fetcher = (id) => GlobalApi.GetResumeById(id).then(res => res.data.data);

// Function to get the appropriate template component based on ID
const getTemplateComponent = (templateId) => {
  switch (templateId) {
    case 1:
      return <PreviewSection />;
    case 2:
      return <MinimalistResume />

      // return <ModernTemplate />;
      // Otherwise, fallback to default template:
    default:
      return <PreviewSection />;
  }
};

const Page = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [resumeInfo, setResumeInfo] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 1,
    title: 'Default',
    image: "/templates/templateDefault.pdf",
    description: "This is the default template. It is simple and clean."
  });
  const params = useParams();

  const { data, error } = useSWR(params.resumeId, fetcher);

  useEffect(() => {
    console.log(selectedTemplate);
    if (data) {
      setResumeInfo(data);
    }
  }, [data]);

  useEffect(() => {
    // Load selected template from localStorage
    const storedTemplate = localStorage.getItem('selectedTemplate');
    if (storedTemplate) {
      try {
        setSelectedTemplate(JSON.parse(storedTemplate));
      } catch (error) {
        console.error('Error parsing stored template:', error);
      }
    } else {
      // Default template if nothing is stored
      setSelectedTemplate({
        id: 1,
        title: 'Default',
        image: "/templates/templateDefault.pdf",
        description: "This is the default template. It is simple and clean."
      });
    }
  }, []);

  if (error) notFound();
  if (!resumeInfo) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 rounded-full animate-loader-gradient"></div>
    </div>
  );

  const HandleDownload = () => {
    window.print();
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = 'Check out my resume!';

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo, selectedTemplate, setSelectedTemplate }}>
      <div id="no-print" className="my-10 mx-5 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-medium">Your Resume is ready to download and share!</h2>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:px-44 my-10">
          <Button onClick={HandleDownload} className="w-full sm:w-auto">Download</Button>
          <Button onClick={() => setIsShareOpen(true)} className="w-full sm:w-auto">Share</Button>
        </div>
      </div>

      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        {getTemplateComponent(selectedTemplate?.id)}
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareUrl={shareUrl}
        title={shareTitle}
      />
    </ResumeInfoContext.Provider>
  );
};

export default Page;