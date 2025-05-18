'use client';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ResumeInfoContext from '@/Context/ResumeInfoContext';
import GlobalApi from '@/Service/GlobalApi';
import { LoaderCircle } from 'lucide-react';

const emptyProject = {
  title: '',
  description: '',
  techs: '',
  link: '',
};

const ProjectsDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [projects, setProjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const params = useParams();

  useEffect(() => {
    // Initialize component and enable Next button
    if (!initialized && resumeInfo) {
      if (resumeInfo.projects?.length > 0) {
        setProjects(resumeInfo.projects);
      } else {
        setProjects([emptyProject]);
      }
      setInitialized(true);
      enableNext(true); // Enable the Next button in parent component
    }
  }, [resumeInfo, initialized, enableNext]);

  useEffect(() => {
    if (initialized) {
      setResumeInfo(prev => ({
        ...prev,
        projects,
      }));
    }
  }, [projects, initialized, setResumeInfo]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...projects];
    updated[index][name] = value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects(prev => [...prev, { ...emptyProject }]); // new object
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects(prev => prev.filter((_, i) => i !== index));
    } else {
      toast.info('At least one project is required.');
    }
  };

  const onSave = async () => {
    const isValid = projects.every(
      proj => proj.title && proj.description && proj.link
    );
    if (!isValid) {
      toast.error('Please fill all required fields.');
      return;
    }

    setSaving(true);
    try {
      // Completely remove id properties, as they're causing the validation error
      const cleanProjects = projects.map(({ id, ...rest }) => {
        // Return only the project data without any id field
        return { ...rest };
      });

      const data = {
        data: {
          projects: cleanProjects
        }
      };
      
      await GlobalApi.UpdateResumeDetails(params.resumeId, data);
      toast.success('Projects updated successfully.');
    } catch (error) {
      console.error('Error saving projects:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      
      toast.error('Failed to save projects.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-3 sm:p-5 shadow-lg rounded-lg border-t-4 mt-6 sm:mt-8" style={{
      borderColor: resumeInfo?.themeColor
    }}>
      <h2 className="font-bold text-lg">Projects</h2>
      <p className="text-sm sm:text-base text-gray-600">Add your personal or professional projects</p>

      {projects.map((proj, index) => (
        <div key={index} className="border p-3 my-5 rounded-lg">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs sm:text-sm mb-1 block">Project Title<span className="text-red-500">*</span></label>
              <Input
                name="title"
                value={proj.title || ''}
                onChange={(e) => handleChange(e, index)}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm mb-1 block">Link<span className="text-red-500">*</span></label>
              <Input
                name="link"
                value={proj.link || ''}
                onChange={(e) => handleChange(e, index)}
                className="text-sm"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs sm:text-sm mb-1 block">Description<span className="text-red-500">*</span></label>
            <Input
              name="description"
              value={proj.description || ''}
              onChange={(e) => handleChange(e, index)}
              className="text-sm"
              placeholder="Brief overview of the project"
            />
          </div>
          <div className="mt-3">
            <label className="text-xs sm:text-sm mb-1 block">Technologies</label>
            <Input
              name="techs"
              value={proj.techs || ''}
              onChange={(e) => handleChange(e, index)}
              className="text-sm"
              placeholder="e.g., React, Node.js, Tailwind"
            />
          </div>

          <div className="mt-4 flex justify-end">
            {projects.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                className="bg-red-500 text-white text-xs"
                onClick={() => removeProject(index)}
              >
                Remove Project
              </Button>
            )}
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
        <div className="flex gap-2">
          <Button onClick={addProject} size="sm" className="text-xs sm:text-sm">
            + Add Project
          </Button>
        </div>
        <Button
          onClick={onSave}
          disabled={saving}
          size="sm"
          className="w-32"
        >
          {saving && <LoaderCircle className="animate-spin mr-2" size={16} />}
          Save
        </Button>
      </div>
    </div>
  );
};

export default ProjectsDetails;