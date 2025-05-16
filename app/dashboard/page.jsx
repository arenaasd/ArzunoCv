'use client'
import React, { useEffect, useState } from 'react'
import AddResume from './_component/AddResume'
import GlobalApi from '@/Service/GlobalApi'
import { useUser } from '@clerk/nextjs'
import ResumeCardItem from './_component/ResumeCardItem'
import SkeletonCard from './_component/SkeletonCard'

const Dashboard = () => {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) getResumeList()
  }, [user])

  const getResumeList = () => {
    setLoading(true)
    GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress).then((res) => {
      setResumeList(res.data.data)
    }).finally(() => {
      setLoading(false)
    })
  }

  const renderContent = () => {
    if (loading) {
      const skeletonCount = resumeList.length || 2 // fallback if data not yet arrived
      return Array(skeletonCount).fill(0).map((_, i) => (
        <div className="w-full max-w-[250px] sm:max-w-none mb-3 sm:mb-0" key={i}>
          <SkeletonCard />
        </div>
      ))
    }

    return resumeList.map((resume, index) => (
      <div className="w-full max-w-[250px] sm:max-w-none mb-3 sm:mb-0" key={index}>
        <ResumeCardItem resume={resume} refreshData={getResumeList} />
      </div>
    ))
  }

  return (
    <div className="p-8 sm:p-5 md:p-6">
      <h1 className='font-bold text-xl sm:text-2xl'>My Resume</h1>
      <p className="text-gray-400 mb-3 text-sm sm:text-base">Make resume & explore resumes</p>

      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 sm:gap-[5px] md:gap-[10px] items-center sm:items-stretch">
        <div className="w-full max-w-[250px] sm:max-w-none mb-3 sm:mb-0">
          <AddResume />
        </div>

        {renderContent()}
      </div>
    </div>
  )
}

export default Dashboard
