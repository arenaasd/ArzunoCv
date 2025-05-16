'use client';
import React, { useEffect, useState } from 'react';
import FormSection from '../../_components/FormSection';
import ResumeInfoContext from '@/Context/ResumeInfoContext';
import { useParams, notFound } from 'next/navigation';
import GlobalApi from '@/Service/GlobalApi';
import PreviewSection from '../../_components/PreviewSection';
import MinimalistResumePreview from '../../_components/templetes/MinimalistResume';
import ProfessionalResume from '../../_components/templetes/ProfessionalResume';

const templates = [
  {
    id: 1,
    title: 'Default',
    image: "/templates/templateDefault.pdf",
    description: "This is the default template. It is simple and clean.",
    component: PreviewSection
  },
  {
    id: 2,
    title: 'Minimalist',
    image: "/templates/Minimalist.jpg",
    description: "This is the minimalist template. It is clean and simple.",
    component: MinimalistResumePreview
  },
  {
    id: 3,
    title: 'Professional',
    image: "/templates/Professional.jpg",
    description: "Professional template for formal resumes.",
    component: ProfessionalResume
  }
];

const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin delay-[0.5s]"></div>
    </div>
  </div>
);

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await GlobalApi.GetResumeById(params.resumeId);
        if (!res.data.data) notFound();
        setResumeInfo(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [params.resumeId]);

  useEffect(() => {
    const storedTemplate = localStorage.getItem('selectedTemplate');
    if (storedTemplate) {
      try {
        const parsed = JSON.parse(storedTemplate);
        const found = templates.find(t => t.id === parsed.id);
        if (found) {
          setSelectedTemplate(found);
        }
      } catch (error) {
        console.error('Error parsing stored template:', error);
      }
    }
  }, []);

  if (loading) return <Loader />;

  const SelectedComponent = selectedTemplate?.component;

  return (
    <ResumeInfoContext.Provider value={{
      resumeInfo,
      setResumeInfo,
      selectedTemplate,
      setSelectedTemplate
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        <FormSection />
        {SelectedComponent && <SelectedComponent />}
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
