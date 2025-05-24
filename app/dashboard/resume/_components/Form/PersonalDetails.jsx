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
  const formData = new FormData()
  formData.append('files', imageFile)

  const res = await axios.post(
    'https://arzunocv-strapi-backend-production.up.railway.app/api/upload',
    formData,
    {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  // Fix here: access upload data correctly
  if (res.data && res.data.data && res.data.data.length > 0) {
    const uploadedFile = res.data.data[0]
    return {
      id: uploadedFile.id,
      url: uploadedFile.attributes.url,
      // add other attributes if needed
    }
  } else {
    throw new Error('No upload data returned from Strapi')
  }
}

const PersonalDetails = ({ enableNext }) => {
  const params = useParams()
  const { resumeInfo, setResumeInfo, selectedTemplate } = useContext(ResumeInfoContext)
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (resumeInfo) {
      const initData = {
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || '',
        Image: resumeInfo.Image || null,
      }
      setFormData(initData)

      if (resumeInfo.Image?.url) {
        const completeUrl = resumeInfo.Image.url.startsWith('http')
          ? resumeInfo.Image.url
          : `https://arzunocv-strapi-backend-production.up.railway.app${resumeInfo.Image.url}`
        setPreviewUrl(completeUrl)
      }

      if (isFormValid(initData)) {
        setIsSaved(true)
      }
    }
  }, [resumeInfo])

  const isFormValid = (data) => {
    const requiredFields = ['firstName', 'lastName', 'jobTitle', 'address', 'phone', 'email']
    if (selectedTemplate?.id === 2) {
      return requiredFields.every(field => data[field]) && data.Image
    }
    return requiredFields.every(field => data[field])
  }

  useEffect(() => {
    if (formData && isFormValid(formData) && isSaved) {
      enableNext(true)
    } else {
      enableNext(false)
    }
  }, [formData, isSaved, selectedTemplate])

  const HandleInputChange = (e) => {
    const { name, value } = e.target
    const updatedFormData = {
      ...formData,
      [name]: value,
    }

    setFormData(updatedFormData)
    setResumeInfo(prev => ({
      ...prev,
      ...updatedFormData,
    }))
    setIsSaved(false)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setIsSaved(false)
    }
  }

  const onSave = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageData = null

      if (selectedTemplate?.id === 2 && image) {
        imageData = await uploadImageToStrapi(image)
      }

      const dataToSave = {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          jobTitle: formData.jobTitle,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          ...(imageData && { Image: imageData.id }),
        },
      }

      await GlobalApi.UpdateResumeDetails(params?.resumeId, dataToSave)

      setResumeInfo({
        ...resumeInfo,
        ...formData,
        Image: imageData
          ? {
              id: imageData.id,
              url: imageData.url,
            }
          : resumeInfo.Image,
      })

      setIsSaved(true)
      toast('Details Updated Successfully.')
    } catch (err) {
      console.error(err)
      toast.error('Failed to update details.')
    } finally {
      setLoading(false)
    }
  }

  const onClear = () => {
    const cleared = {
      firstName: '',
      lastName: '',
      jobTitle: '',
      address: '',
      phone: '',
      email: '',
      Image: null,
    }
    setFormData(cleared)
    setResumeInfo(cleared)
    setImage(null)
    setPreviewUrl(null)
    setIsSaved(false)
  }

  if (!formData) return null

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-8">
        <h2 className="font-bold text-lg">Personal Details</h2>
        <p>Get started with the basic information</p>
        <form onSubmit={onSave}>
          <div className="grid grid-cols-2 mt-5 gap-3">
            {['firstName', 'lastName', 'jobTitle', 'address', 'phone', 'email'].map(field => (
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

          {(selectedTemplate?.id === 2 || selectedTemplate?.id === 4) && (
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
                      width={102}
                      height={102}
                      alt="Profile preview"
                      className="w-32 h-32 object-cover object-top rounded-full"
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
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
              </label>
            </div>
          )}

          <div className="mt-3 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClear} disabled={loading}>
              Clear
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalDetails
