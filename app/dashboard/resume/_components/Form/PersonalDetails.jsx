'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import GlobalApi from '@/Service/GlobalApi'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const PersonalDetails = ({ enableNext }) => {
    const params = useParams()
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    // Initialize formData from resumeInfo
// Initialize formData from resumeInfo
useEffect(() => {
    if (resumeInfo) {
        const initData = {
            firstName: resumeInfo.firstName || '',
            lastName: resumeInfo.lastName || '',
            jobTitle: resumeInfo.jobTitle || '',
            address: resumeInfo.address || '',
            phone: resumeInfo.phone || '',
            email: resumeInfo.email || ''
        }
        setFormData(initData)
        // If resumeInfo has all fields filled, consider it "saved"
        if (isFormValid(initData)) {
            setIsSaved(true)
        }
    }
}, [resumeInfo])


    // Helper to check if all fields are filled
    const isFormValid = (data) => {
        return data.firstName && data.lastName && data.jobTitle && data.address && data.phone && data.email
    }

    // Enable/disable Next button based on form validity + save status
    useEffect(() => {
        if (formData && isFormValid(formData) && isSaved) {
            enableNext(true)
        } else {
            enableNext(false)
        }
    }, [formData, isSaved])

    const HandleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setIsSaved(false)
    }

    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = { data: formData }

        GlobalApi.UpdateResumeDetails(params?.resumeId, data).then((res) => {
            console.log('API Success:', res)
            setResumeInfo({ ...resumeInfo, ...formData }) // Sync context too
            setIsSaved(true)
            toast("Details Updated Successfully.")
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const onClear = () => {
        const cleared = {
            firstName: '',
            lastName: '',
            jobTitle: '',
            address: '',
            phone: '',
            email: ''
        }
        setFormData(cleared)
        setResumeInfo(cleared)
        setIsSaved(false)
    }

    // Don’t render form until formData is ready (prevents error)
    if (!formData) return null

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-8">
                <h2 className="font-bold text-lg">Personal Details</h2>
                <p>Get started with the basic information</p>
                <form onSubmit={onSave}>
                    <div className='grid grid-cols-2 mt-5 gap-3'>
                        {['firstName', 'lastName', 'jobTitle', 'address', 'phone', 'email'].map((field) => (
                            <div key={field} className={field === 'jobTitle' || field === 'address' ? 'col-span-2' : ''}>
                                <label className='text-sm capitalize'>{field.replace(/([A-Z])/g, ' $1')}</label>
                                <Input
                                    name={field}
                                    value={formData[field]}
                                    required
                                    onChange={HandleInputChange}
                                />
                            </div>
                        ))}
                    </div>

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
                            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PersonalDetails
