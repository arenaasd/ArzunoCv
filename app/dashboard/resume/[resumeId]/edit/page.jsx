'use client';
import React, { useEffect, useState } from 'react';
import FormSection from '../../_components/FormSection';
import PreviewSection from '../../_components/PreviewSection';
import ResumeInfoContext from '@/Context/ResumeInfoContext';
import { useParams, notFound } from 'next/navigation';
import GlobalApi from '@/Service/GlobalApi';

// Loader component
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin delay-[0.5s]"></div>
      </div>
    </div>
  );
};

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = async () => {
    try {
      const res = await GlobalApi.GetResumeById(params.resumeId);
      if (!res.data.data) {
        notFound();
      }
      setResumeInfo(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        <FormSection />
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
