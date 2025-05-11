'use client'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import GlobalApi from '@/Service/GlobalApi'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

const emptySkill = {
  name: '',
  rating: 0
};

const SkillDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const params = useParams();

  // Initial load from context
  useEffect(() => {
    if (!initialized && resumeInfo) {
      if (resumeInfo.skills && resumeInfo.skills.length > 0) {
        // Sanitize existing skills data
        const sanitized = resumeInfo.skills.map(skill => ({
          ...skill,
          name: skill.name || '',
          rating: skill.rating || 0
        }));
        setSkillsList(sanitized);
      } else {
        // Set default empty skill if no skills exist
        setSkillsList([{ ...emptySkill }]);
      }
      setInitialized(true);
      if (enableNext) enableNext(true);
    }
  }, [resumeInfo, initialized, enableNext]);

  // Sync skillsList to resumeInfo when it changes
  useEffect(() => {
    if (initialized && skillsList.length > 0) {
      // Use callback form to ensure we're working with latest resumeInfo
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        skills: skillsList
      }));
    }
  }, [skillsList, setResumeInfo, initialized]);

  const handleChange = (index, name, value) => {
    setSkillsList(prevList => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const addNewSkill = () => {
    setSkillsList(prevList => [...prevList, { ...emptySkill }]);
  };

  const removeSkill = (index) => {
    if (skillsList.length > 1) {
      setSkillsList(prevList => 
        prevList.filter((_, i) => i !== index)
      );
    } else {
      toast.error("You must have at least one skill entry");
    }
  };

  const onSave = async () => {
    if (!skillsList || skillsList.length === 0) {
      toast.error('No skill data to save.');
      return;
    }
  
    const isValid = skillsList.every((skill) => skill.name.trim());
    
    if (!isValid) {
      toast.error('Please fill all skill names.');
      return;
    }
  
    setSaving(true);
    try {
      // Remove any Strapi IDs before sending to API
      const cleanSkills = skillsList.map(({ id, ...rest }) => rest);
      
      const data = {
        data: {
          skills: cleanSkills
        }
      };
      
      await GlobalApi.UpdateResumeDetails(params.resumeId, data);
      toast.success('Skills updated successfully.');
    } catch (err) {
      console.error('Error updating skills:', err.response?.data || err.message);
      toast.error('Failed to update skills. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-3 sm:p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-6 sm:mt-8">
        <h2 className="font-bold text-lg">Skills</h2>
        <p className="text-sm sm:text-base text-gray-600">Add your top skills</p>
        <div>
          {skillsList.map((skill, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 mb-2 border rounded-lg">
              <div className="w-full sm:w-2/3 mb-2 sm:mb-0 sm:mr-4">
                <label className="text-xs sm:text-sm block my-1">Skill Name<span className="text-red-500">*</span></label>
                <Input 
                  value={skill.name || ''} 
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="e.g. JavaScript, Project Management, etc."
                  className="text-sm"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="text-xs sm:text-sm block mb-1">Skill Level</label>
                <Rating 
                  style={{ maxWidth: 120 }} 
                  value={skill.rating || 0} 
                  onChange={(value) => handleChange(index, "rating", value)} 
                />
              </div>
              {skillsList.length > 1 && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => removeSkill(index)} 
                  className="bg-red-500 text-white ml-auto mt-2 sm:mt-0 sm:ml-2"
                  aria-label="Remove skill"
                >
                  ×
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-4">
          <div className="flex flex-col xs:flex-row gap-2">
            <Button 
              onClick={addNewSkill}
              className="text-xs sm:text-sm w-full xs:w-auto whitespace-nowrap"
              size="sm"
            >
              + Add More Skill
            </Button>
            <Button 
              variant="outline" 
              onClick={() => removeSkill(skillsList.length - 1)} 
              className="bg-red-500 text-white text-xs sm:text-sm w-full xs:w-auto whitespace-nowrap"
              disabled={skillsList.length <= 1}
              size="sm"
            >
              Delete Last Skill
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

export default SkillDetails;