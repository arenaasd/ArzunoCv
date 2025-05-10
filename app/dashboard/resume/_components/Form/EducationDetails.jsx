'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import GlobalApi from '@/Service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const emptyEducation = {
  universityOrCollegeName: '',
  startDate: '',
  endDate: '',
  degree: '',
  major: '',
  description: ''
};

const EducationDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationList, setEducationList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const params = useParams();

  // Initial load from context
  useEffect(() => {
    if (!initialized && resumeInfo) {
      if (resumeInfo.education && resumeInfo.education.length > 0) {
        // Sanitize existing education data
        const sanitized = resumeInfo.education.map(edu => ({
          ...edu,
          description: edu.description || ''
        }));
        setEducationList(sanitized);
      } else {
        // Set default empty field if no education exists
        setEducationList([emptyEducation]);
      }
      setInitialized(true);
      if (enableNext) enableNext(true);
    }
  }, [resumeInfo, initialized, enableNext]);

  // Sync educationList to resumeInfo when it changes
  useEffect(() => {
    if (initialized && educationList.length > 0) {
      // Use callback form to ensure we're working with latest resumeInfo
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        education: educationList
      }));
    }
  }, [educationList, setResumeInfo, initialized]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setEducationList(prevList => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const addNewEducation = () => {
    setEducationList(prevList => [...prevList, { ...emptyEducation }]);
  };

  const removeEducation = (index) => {
    if (educationList.length > 1) {
      setEducationList(prevList => 
        prevList.filter((_, i) => i !== index)
      );
    } else {
      toast.error("You must have at least one education entry");
    }
  };

  const onSave = async () => {
    if (!educationList || educationList.length === 0) {
      toast.error('No education data to save.');
      return;
    }
  
    const isValid = educationList.every((edu) =>
      edu.universityOrCollegeName && edu.degree && edu.startDate
    );
    
    if (!isValid) {
      toast.error('Please fill all required fields.');
      return;
    }
  
    setSaving(true);
    try {
      // Remove any Strapi IDs before sending to API
      const cleanEducation = educationList.map(({ id, ...rest }) => rest);
      
      const data = {
        data: {
          education: cleanEducation
        }
      };
      
      await GlobalApi.UpdateResumeDetails(params.resumeId, data);
      toast.success('Education details updated successfully.');
    } catch (err) {
      console.error('Error updating education details:', err.response?.data || err.message);
      toast.error('Failed to update education details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-8">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your education details</p>
        <div>
          {educationList.map((item, index) => (
            <div key={index} className="border p-3 my-5 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-sm my-1">University/College Name<span className="text-red-500">*</span></label>
                  <Input 
                    value={item.universityOrCollegeName || ''} 
                    name="universityOrCollegeName" 
                    onChange={(e) => handleChange(e, index)} 
                  />
                </div>
                <div>
                  <label className="text-sm my-1">Degree<span className="text-red-500">*</span></label>
                  <Input 
                    value={item.degree || ''} 
                    name="degree" 
                    onChange={(e) => handleChange(e, index)} 
                  />
                </div>
                <div>
                  <label className="text-sm my-1">Major</label>
                  <Input 
                    value={item.major || ''} 
                    name="major" 
                    onChange={(e) => handleChange(e, index)} 
                  />
                </div>
                <div>
                  <label className="text-sm my-1">Start Date<span className="text-red-500">*</span></label>
                  <Input 
                    value={item.startDate || ''} 
                    type="date"  
                    name="startDate" 
                    onChange={(e) => handleChange(e, index)} 
                  />
                </div>
                <div>
                  <label className="text-sm my-1">End Date</label>
                  <Input 
                    value={item.endDate || ''} 
                    type="date" 
                    name="endDate" 
                    onChange={(e) => handleChange(e, index)} 
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm my-1">Description</label>
                  <Textarea 
                    value={item.description || ''} 
                    name="description" 
                    onChange={(e) => handleChange(e, index)} 
                    placeholder="Describe your education, achievements, etc."
                  />
                </div>
              </div>
              {educationList.length > 1 && (
                <div className="mt-2 text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeEducation(index)} 
                    className="bg-red-500 text-white"
                  >
                    Remove This Entry
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex mt-3 justify-between">
          <div className="flex gap-2">
            <Button onClick={addNewEducation}>+ Add More Education</Button>
            <Button 
              variant="outline" 
              onClick={() => removeEducation(educationList.length - 1)} 
              className="bg-red-500 text-white"
              disabled={educationList.length <= 1}
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

export default EducationDetails;