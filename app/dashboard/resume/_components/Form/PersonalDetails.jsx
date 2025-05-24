'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import GlobalApi from '@/Service/GlobalApi'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { LoaderCircle, Upload } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import axios from 'axios'

const uploadImageToStrapi = async (imageFile) => {
  console.log('Uploading file:', imageFile); // Debug
  const formData = new FormData();
  formData.append('files', imageFile);
  try {
    const res = await axios.post(
      'https://arzunocv-strapi-backend-production.up.railway.app/api/upload',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log('Strapi upload response:', res.data); // Debug
    return res.data[0];
  } catch (error) {
    console.error('Strapi upload error:', error.response?.data || error.message);
    throw error;
  }
};

const PersonalDetails = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo, selectedTemplate = { id: null } } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log('selectedTemplate:', selectedTemplate); // Debug
    console.log('resumeInfo:', resumeInfo); // Debug
    if (resumeInfo) {
      const initData = {
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || '',
        Image: resumeInfo.Image || null
      };
      setFormData(initData);
      if (resumeInfo.Image?.url) {
        const completeUrl = resumeInfo.Image.url.startsWith('http')
          ? resumeInfo.Image.url
          : `https://arzunocv-strapi-backend-production.up.railway.app${resumeInfo.Image.url}`;
        console.log('Constructed previewUrl:', completeUrl); // Debug
        setPreviewUrl(completeUrl);
      }
      if (isFormValid(initData)) {
        setIsSaved(true);
      }
    } else {
      // Initialize formData if resumeInfo is null
      setFormData({
        firstName: '',
        lastName: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: '',
        Image: null
      });
    }
  }, [resumeInfo]);

  const isFormValid = (data) => {
    const requiredFields = ['firstName', 'lastName', 'jobTitle', 'address', 'phone', 'email'];
    if (selectedTemplate?.id === 2) {
      return requiredFields.every(field => data[field]) && data.Image;
    }
    return requiredFields.every(field => data[field]);
  };

  useEffect(() => {
    if (formData && isFormValid(formData) && isSaved) {
      enableNext(true);
    } else {
      enableNext(false);
    }
  }, [formData, isSaved, selectedTemplate]);

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);
    setResumeInfo(prev => ({
      ...prev,
      ...updatedFormData
    }));
    setIsSaved(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file); // Debug
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsSaved(false);
      console.log('Image state updated:', file, 'Preview URL:', url); // Debug
    } else {
      console.log('No file selected'); // Debug
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageData = null;
      if ((selectedTemplate?.id === 2 || selectedTemplate?.id === 5) && image) {
        imageData = await uploadImageToStrapi(image);
        console.log('Uploaded image data:', imageData);
      }
      const dataToSave = {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          jobTitle: formData.jobTitle,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          ...(imageData && { Image: imageData.id })
        }
      };
      console.log('Data to save:', JSON.stringify(dataToSave, null, 2));
      await GlobalApi.UpdateResumeDetails(params?.resumeId, dataToSave);
      setResumeInfo({
        ...resumeInfo,
        ...formData,
        Image: imageData ? imageData : resumeInfo.Image
      });
      setIsSaved(true);
      toast("Details Updated Successfully.");
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
      toast.error("Failed to update details.");
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    const cleared = {
      firstName: '',
      lastName: '',
      jobTitle: '',
      address: '',
      phone: '',
      email: '',
      Image: null
    };
    setFormData(cleared);
    setResumeInfo(cleared);
    setImage(null);
    setPreviewUrl(null);
    setIsSaved(false);
  };

  if (!isMounted || !formData) return null;

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-8">
        <h2 className="font-bold text-lg">Personal Details</h2>
        <p>Get started with the basic information</p>
        <form onSubmit={onSave}>
          <div className="grid grid-cols-2 mt-5 gap-3">
            {['firstName', 'lastName', 'jobTitle', 'address', 'phone', 'email'].map((field) => (
              <div key={field} className={field === 'jobTitle' || field === 'address' ? 'col-span-2' : ''}>
                <label className="text-sm capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <Input
                  name={field}
                  value={formData[field]}
                  required
                  onChange={HandleInputChange}
                />
              </div>
            ))}
          </div>

          {selectedTemplate?.id === 2 || selectedTemplate?.id === 5 ? (
            <div className="mt-4">
              <label className="text-sm">Profile Image</label>
              <label
                htmlFor="file-upload"
                className="mt-2 flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              >
                {previewUrl ? (
                  <div className="mb-4">
                    <Image
                      src={previewUrl}
                      width={128}
                      height={128}
                      alt="Profile preview"
                      className="w-32 h-32 object-cover object-top rounded-full"
                      onError={() => console.log('Image failed to load:', previewUrl)}
                    />
                  </div>
                ) : (
                  <div className="mb-4 w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="text-gray-400" />
                  </div>
                )}
                <div className="flex text-sm leading-6 text-gray-600">
                  <span className="relative rounded-md bg-white font-semibold text-blue-600 hover:text-blue-500">
                    Upload a profile image
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </label>
            </div>
          ) : null}

          <div className="mt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClear}
              disabled={loading}
            >
              Clear
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;