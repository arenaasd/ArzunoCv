'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import GlobalApi from '@/Service/GlobalApi'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const emptyHobby = {
  title: '',
  description: ''
};

const HobbiesDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [hobbyList, setHobbyList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (!initialized && resumeInfo) {
      // Use hobbies from resumeInfo if available and non-empty, otherwise default to single empty hobby
      const initialHobbies = Array.isArray(resumeInfo?.hobbies) && resumeInfo.hobbies.length > 0
        ? resumeInfo.hobbies
        : [emptyHobby];
      setHobbyList(initialHobbies);
      setInitialized(true);
      if (enableNext) enableNext(true);
    }
  }, [resumeInfo, initialized, enableNext]);

  useEffect(() => {
    if (initialized) {
      setResumeInfo(prev => ({
        ...prev,
        hobbies: hobbyList
      }));
    }
  }, [hobbyList, initialized, setResumeInfo]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setHobbyList(prevList => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const addNewHobby = () => {
    setHobbyList(prevList => [...prevList, { ...emptyHobby }]);
  };

  const removeHobby = (index) => {
    if (hobbyList.length > 1) {
      setHobbyList(prevList => prevList.filter((_, i) => i !== index));
    } else {
      toast.error("You must have at least one hobby.");
    }
  };

  const onSave = async () => {
    if (!hobbyList || hobbyList.length === 0) {
      toast.error('No hobby data to save.');
      return;
    }

    const isValid = hobbyList.every(hobby => hobby.title);
    if (!isValid) {
      toast.error('Please fill all required fields.');
      return;
    }

    setSaving(true);
    try {
      const cleanHobbies = hobbyList.map(({ id, ...rest }) => rest);
      const data = {
        data: {
          hobbies: cleanHobbies
        }
      };

      await GlobalApi.UpdateResumeDetails(params.resumeId, data);
      toast.success('Hobbies updated successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update hobbies.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-3 sm:p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-6 sm:mt-8">
        <h2 className="font-bold text-lg">Hobbies</h2>
        <p className="text-sm text-gray-600">Add your hobbies</p>

        {hobbyList.map((item, index) => (
          <div key={index} className="border p-3 my-5 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs sm:text-sm block">
                  Title<span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  value={item.title || ''}
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm block">Description</label>
                <Textarea
                  name="description"
                  value={item.description || ''}
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                  rows={3}
                />
              </div>
            </div>

            {hobbyList.length > 1 && (
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeHobby(index)}
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
              onClick={addNewHobby}
              className="text-xs sm:text-sm w-full xs:w-auto"
              size="sm"
            >
              + Add Hobby
            </Button>
            <Button
              variant="outline"
              onClick={() => removeHobby(hobbyList.length - 1)}
              className="bg-red-500 text-white text-xs sm:text-sm w-full xs:w-auto"
              disabled={hobbyList.length <= 1}
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

export default HobbiesDetails;