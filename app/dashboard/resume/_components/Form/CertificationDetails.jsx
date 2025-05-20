'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import GlobalApi from '@/Service/GlobalApi'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const emptyCertification = {
  title: '',
  issuer: '',
  date: '',
  url: ''
}; 

const CertificationDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [certificationList, setCertificationList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (!initialized && resumeInfo) {
      // Use certifications from resumeInfo if available and non-empty, otherwise default to single empty certification
      const initialCertifications = Array.isArray(resumeInfo?.certificates) && resumeInfo.certificates.length > 0
        ? resumeInfo.certificates
        : [emptyCertification];
      setCertificationList(initialCertifications);
      setInitialized(true);
      if (enableNext) enableNext(true);
    }
  }, [resumeInfo, initialized, enableNext]);

  useEffect(() => {
    if (initialized) {
      setResumeInfo(prev => ({
        ...prev,
        certifications: certificationList
      }));
    }
  }, [certificationList, initialized, setResumeInfo]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setCertificationList(prevList => {
      const updated = [...prevList];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const addNewCertification = () => {
    setCertificationList(prevList => [...prevList, { ...emptyCertification }]);
  };

  const removeCertification = (index) => {
    if (certificationList.length > 1) {
      setCertificationList(prevList => prevList.filter((_, i) => i !== index));
    } else {
      toast.error("You must have at least one certification.");
    }
  };

  const onSave = async () => {
    if (!certificationList || certificationList.length === 0) {
      toast.error('No certification data to save.');
      return;
    }

    const isValid = certificationList.every(cert => cert.title);
    if (!isValid) {
      toast.error('Please fill all required fields (Title).');
      return;
    }

    setSaving(true);
    try {
      const cleanCertifications = certificationList.map(({ id, ...rest }) => rest);
      const data = {
        data: {
          certificates: cleanCertifications
        }
      };

      await GlobalApi.UpdateResumeDetails(params.resumeId, data);
      toast.success('Certifications updated successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update certifications.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-3 sm:p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-6 sm:mt-8">
        <h2 className="font-bold text-lg">Certifications</h2>
        <p className="text-sm text-gray-600">Add your certifications</p>

        {certificationList.map((item, index) => (
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
                  placeholder="Certificate Title"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm block">Issuer</label>
                <Input
                  name="issuer"
                  value={item.issuer || ''}
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                  placeholder="Issuer/Organization"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm block">Date</label>
                <Input
                  type="month"
                  name="date"
                  value={item.date || ''}
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm block">URL</label>
                <Input
                  type="url"
                  name="url"
                  value={item.url || ''}
                  onChange={(e) => handleChange(e, index)}
                  className="text-sm"
                  placeholder="Certificate URL"
                />
              </div>
            </div>

            {certificationList.length > 1 && (
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCertification(index)}
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
              onClick={addNewCertification}
              className="text-xs sm:text-sm w-full xs:w-auto"
              size="sm"
            >
              + Add Certification
            </Button>
            <Button
              variant="outline"
              onClick={() => removeCertification(certificationList.length - 1)}
              className="bg-red-500 text-white text-xs sm:text-sm w-full xs:w-auto"
              disabled={certificationList.length <= 1}
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

export default CertificationDetails;