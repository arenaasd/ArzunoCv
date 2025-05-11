'use client';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ResumeInfoContext from '@/Context/ResumeInfoContext';
import GlobalApi from '@/Service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const emptyField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  summary: ''
};

const ExperienceDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const params = useParams();

  // Load existing experience on mount
  useEffect(() => {
    if (!initialized && resumeInfo) {
      // Initial load from context
      if (resumeInfo.experience && resumeInfo.experience.length > 0) {
        const sanitized = resumeInfo.experience.map((exp) => ({
          ...exp,
          summary: exp.summary || ''
        }));
        setExperienceList(sanitized);
      } else {
        // Set default empty field if no experience exists
        setExperienceList([emptyField]);
      }
      setInitialized(true);
      enableNext(true);
    }
  }, [resumeInfo, initialized, enableNext]);

  // Sync experienceList to resumeInfo only when it changes due to user actions
  useEffect(() => {
    if (initialized && experienceList.length > 0) {
      // Use callback form to ensure we're working with latest resumeInfo
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        experience: experienceList
      }));
    }
  }, [experienceList, setResumeInfo, initialized]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setExperienceList(prevList => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleTextEditorChange = (value, index) => {
    // Ensure value is not null or undefined
    const sanitizedValue = value || '';
    
    setExperienceList(prevList => {
      const updated = [...prevList];
      updated[index] = { 
        ...updated[index], 
        summary: sanitizedValue 
      };
      return updated;
    });
  };

  const addExperience = () => {
    setExperienceList(prevList => [...prevList, { ...emptyField }]);
  };

  const removeExperience = (index) => {
    if (experienceList.length > 1) {
      setExperienceList(prevList => 
        prevList.filter((_, i) => i !== index)
      );
    } else {
      toast.error("You must have at least one experience entry");
    }
  };

  const onSave = async () => {
    if (!experienceList || experienceList.length === 0) {
      toast.error('No experience data to save.');
      return;
    }
  
    const isValid = experienceList.every((exp) =>
      exp.title && exp.companyName && exp.city && exp.state && exp.startDate
    );
    
    if (!isValid) {
      toast.error('Please fill all required fields.');
      return;
    }
  
    setSaving(true);
    try {
      // Ensure all experience items have a valid summary
      const cleanExperience = experienceList.map(({ id, ...rest }) => {
        return {
          ...rest,
          summary: rest.summary || '' // Ensure summary is never null or undefined
        };
      });
      
      const data = {
        data: {
          experience: cleanExperience
        }
      };
      
      await GlobalApi.UpdateResumeDetails(params.resumeId, data);
      toast.success('Experience updated successfully.');
    } catch (err) {
      console.error('Error updating resume:', err);
      
      // More detailed error logging
      if (err.response) {
        console.error('Response data:', err.response.data);
      }
      
      toast.error('Failed to update experience. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-3 sm:p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-6 sm:mt-8">
        <h2 className="font-bold text-lg">Experience</h2>
        <p className="text-sm sm:text-base text-gray-600">Add your previous job experience</p>

        {experienceList.map((item, index) => (
          <div key={index} className="border p-2 sm:p-3 my-4 sm:my-5 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className='text-xs sm:text-sm my-1 block'>Position Title<span className="text-red-500">*</span></label>
                <Input 
                  value={item.title || ''}
                  name="title" 
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className='text-xs sm:text-sm my-1 block'>Company Name<span className="text-red-500">*</span></label>
                <Input
                  value={item.companyName || ''}
                  name="companyName"
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className='text-xs sm:text-sm my-1 block'>City<span className="text-red-500">*</span></label>
                <Input 
                  value={item.city || ''}
                  name="city" 
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className='text-xs sm:text-sm my-1 block'>State<span className="text-red-500">*</span></label>
                <Input 
                  value={item.state || ''}
                  name="state"
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className='text-xs sm:text-sm my-1 block'>Start Date<span className="text-red-500">*</span></label>
                <Input 
                  value={item.startDate || ''} 
                  type="date"
                  name="startDate" 
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className='text-xs sm:text-sm my-1 block'>End Date</label>
                <Input 
                  value={item.endDate || ''} 
                  type="date" 
                  name="endDate" 
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 mt-2">
                <RichTextEditor
                  value={item.summary || ''}
                  onChange={(value) => handleTextEditorChange(value, index)}
                  title={item.title || 'Experience Summary'}
                />
              </div>
            </div>
            {experienceList.length > 1 && (
              <div className="mt-3 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeExperience(index)} 
                  className="bg-red-500 text-white text-xs sm:text-sm"
                >
                  Remove This Entry
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-4">
          <div className="flex flex-col xs:flex-row gap-2">
            <Button 
              onClick={addExperience} 
              className="text-xs sm:text-sm w-full xs:w-auto whitespace-nowrap"
              size="sm"
            >
              + Add More Experience
            </Button>
            <Button 
              variant="outline" 
              onClick={() => removeExperience(experienceList.length - 1)} 
              className="bg-red-500 text-white text-xs sm:text-sm w-full xs:w-auto whitespace-nowrap"
              disabled={experienceList.length <= 1}
              size="sm"
            >
              Delete Last Entry
            </Button>
          </div>
          <Button 
            type="button" 
            onClick={onSave} 
            disabled={saving}
            className="w-full xs:w-auto mt-2 sm:mt-0"
            size="sm"
          >
            {saving ? <LoaderCircle className="animate-spin mr-2" size={16} /> : null}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;