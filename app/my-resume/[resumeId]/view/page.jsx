'use client';
import { Button } from '@/components/ui/button';
import ResumeInfoContext from '@/Context/ResumeInfoContext';
import GlobalApi from '@/Service/GlobalApi';
import { useParams, notFound } from 'next/navigation';
import React, { useState } from 'react';
import useSWR from 'swr';
import PreviewSection from '../../../dashboard/resume/_components/PreviewSection';
import ShareModal from '@/components/ShareModel';

const fetcher = (id) => GlobalApi.GetResumeById(id).then(res => res.data.data);

const Page = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const params = useParams();

  const { data: resumeInfo, error } = useSWR(params.resumeId, fetcher);

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
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo: () => {} }}>
      <div id="no-print" className="my-10 mx-5 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-medium">Your Resume is ready to download and share!</h2>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:px-44 my-10">
          <Button onClick={HandleDownload} className="w-full sm:w-auto">Download</Button>
          <Button onClick={() => setIsShareOpen(true)} className="w-full sm:w-auto">Share</Button>
        </div>
      </div>

      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <PreviewSection />
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
