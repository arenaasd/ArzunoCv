'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import GlobalApi from '@/Service/GlobalApi'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const emptyLanguage = {
  title: '',
  level: ''
};

const LanguageDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [languageList, setLanguageList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const params = useParams();

  // Proficiency level options
  const proficiencyLevels = ['Native', 'Fluent', 'Intermediate', 'Basic'];

  useEffect(() => {
    if (!initialized && resumeInfo) {
      // Use languages from resumeInfo if available and non-empty, otherwise default to single empty language
      const initialLanguages = Array.isArray(resumeInfo?.languages) && resumeInfo.languages.length > 0
        ? resumeInfo.languages
        : [emptyLanguage];
      setLanguageList(initialLanguages);
      setInitialized(true);
      if (enableNext) enableNext(true);
    }
  }, [resumeInfo, initialized, enableNext]);

  useEffect(() => {
    if (initialized) {
      setResumeInfo(prev => ({
        ...prev,
        languages: languageList
      }));
    }
  }, [languageList, initialized, setResumeInfo]);

  const handleChange = (index, field, value) => {
    setLanguageList(prevList => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addNewLanguage = () => {
    setLanguageList(prevList => [...prevList, { ...emptyLanguage }]);
  };

  const removeLanguage = (index) => {
    if (languageList.length > 1) {
      setLanguageList(prevList => prevList.filter((_, i) => i !== index));
    } else {
      toast.error("You must have at least one language.");
    }
  };

  const onSave = async () => {
    if (!languageList || languageList.length === 0) {
      toast.error('No language data to save.');
      return;
    }

    const isValid = languageList.every(lang => lang.title && lang.level);
    if (!isValid) {
      toast.error('Please fill all required fields (Title and Level).');
      return;
    }

    setSaving(true);
    try {
      const cleanLanguages = languageList.map(({ id, ...rest }) => rest);
      const data = {
        data: {
          languages: cleanLanguages
        }
      };

      await GlobalApi.UpdateResumeDetails(params.resumeId, data);
      toast.success('Languages updated successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update languages.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-3 sm:p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-6 sm:mt-8">
        <h2 className="font-bold text-lg">Languages</h2>
        <p className="text-sm text-gray-600">Add your languages and proficiency levels</p>

        {languageList.map((item, index) => (
          <div key={index} className="border p-3 my-5 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs sm:text-sm block">
                  Language Title<span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  value={item.title || ''}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="text-sm"
                  placeholder="e.g., Spanish"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm block">
                  Proficiency Level<span className="text-red-500">*</span>
                </label>
                <Select
                  value={item.level || ''}
                  onValueChange={(value) => handleChange(index, 'level', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {languageList.length > 1 && (
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeLanguage(index)}
                  className="bg-red-500 text-white text-xs"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-4">
          <div className="flex flex-col xs:flex-row gap-2">
            <Button
              onClick={addNewLanguage}
              className="text-xs sm:text-sm w-full xs:w-auto"
              size="sm"
            >
              + Add Language
            </Button>
            <Button
              variant="outline"
              onClick={() => removeLanguage(languageList.length - 1)}
              className="bg-red-500 text-white text-xs sm:text-sm w-full xs:w-auto"
              disabled={languageList.length <= 1}
              size="sm"
            >
              Delete Last Entry
            </Button>
          </div>
          <Button
            onClick={onSave}
            disabled={saving}
            className="w-32 mt-2 sm:mt-0"
            size="sm"
          >
            {saving && <LoaderCircle className="animate-spin mr-2" size={16} />}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageDetails;