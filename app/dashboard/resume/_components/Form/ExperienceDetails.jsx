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
    setExperienceList(prevList => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], summary: value };
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
      // Remove any Strapi IDs before sending to API
      const cleanExperience = experienceList.map(({ id, ...rest }) => rest);
      
      const data = {
        data: {
          experience: cleanExperience
        }
      };
      
      console.log('Sending data to API:', data);
      await GlobalApi.UpdateResumeDetails(params.resumeId, data);
      toast.success('Experience updated successfully.');
    } catch (err) {
      console.error('Error updating resume:', err.response?.data || err.message);
      toast.error('Failed to update experience. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-8">
        <h2 className="font-bold text-lg">Experience</h2>
        <p>Add your previous job experience</p>

        {experienceList.map((item, index) => (
          <div key={index} className="border p-3 my-5 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className='text-sm my-1'>Position Title<span className="text-red-500">*</span></label>
                <Input 
                  value={item.title || ''}
                  name="title" 
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className='text-sm my-1'>Company Name<span className="text-red-500">*</span></label>
                <Input
                  value={item.companyName || ''}
                  name="companyName"
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
              <div>
                <label className='text-sm my-1'>City<span className="text-red-500">*</span></label>
                <Input 
                  value={item.city || ''}
                  name="city" 
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
              <div>
                <label className='text-sm my-1'>State<span className="text-red-500">*</span></label>
                <Input 
                  value={item.state || ''}
                  name="state"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className='text-sm my-1'>Start Date<span className="text-red-500">*</span></label>
                <Input 
                  value={item.startDate || ''} 
                  type="date"
                  name="startDate" 
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
              <div>
                <label className='text-sm my-1'>End Date</label>
                <Input 
                  value={item.endDate || ''} 
                  type="date" 
                  name="endDate" 
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  value={item.summary || ''}
                  onChange={(value) => handleTextEditorChange(value, index)}
                  title={item.title || 'Experience Summary'} 
                />
              </div>
            </div>
            {experienceList.length > 1 && (
              <div className="mt-2 text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeExperience(index)} 
                  className="bg-red-500 text-white"
                >
                  Remove This Entry
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="flex mt-3 justify-between">
          <div className="flex gap-2">
            <Button onClick={addExperience}>+ Add More Experience</Button>
            <Button 
              variant="outline" 
              onClick={() => removeExperience(experienceList.length - 1)} 
              className="bg-red-500 text-white"
              disabled={experienceList.length <= 1}
            >
              Delete Last Entry
            </Button>
          </div>
          <Button type="button" onClick={onSave} disabled={saving}>
            {saving ? <LoaderCircle className="animate-spin mr-2" size={16} /> : null}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;