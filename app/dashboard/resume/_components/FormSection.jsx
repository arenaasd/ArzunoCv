'use client'
import React, { useState, useEffect } from 'react'
import PersonalDetails from './Form/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import SummaryDetails from './Form/SummaryDetails'
import ExperienceDetails from './Form/ExperienceDetails'
import EducationDetails from './Form/EducationDetails'
import SkillDetails from './Form/SkillDetails'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import ThemeColor from '@/app/dashboard/resume/_components/ThemeColor'

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const router = useRouter()
  const params = useParams()
  
  // Handle redirection when reaching step 6
  useEffect(() => {
    if (activeFormIndex === 6) {
      router.push('/my-resume/' + params.resumeId + '/view')
    }
  }, [activeFormIndex, params.resumeId, router])

  // Handle next button click
  const handleNext = () => {
    setActiveFormIndex(activeFormIndex + 1)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link href={"/"}>       
            <Button><Home /></Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)} className=""><ArrowLeft /></Button>}
          <Button 
            className="flex gap-2"
            disabled={!enableNext || activeFormIndex > 5}
            onClick={handleNext}
            size="sm">Next <ArrowRight />
          </Button>
        </div>
      </div>
      {activeFormIndex === 1 && <PersonalDetails enableNext={(e) => setEnableNext(e)} />}
      {activeFormIndex === 2 && <SummaryDetails enableNext={(e) => setEnableNext(e)} />}
      {activeFormIndex === 3 && <ExperienceDetails enableNext={(e) => setEnableNext(e)} />}
      {activeFormIndex === 4 && <EducationDetails enableNext={(e) => setEnableNext(e)} />}
      {activeFormIndex === 5 && <SkillDetails enableNext={(e) => setEnableNext(e)} />}
    </div>
  )
}

export default FormSection