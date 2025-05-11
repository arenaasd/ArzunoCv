'use client'
import React, { useEffect, useState } from 'react'
import AddResume from './_component/AddResume'
import GlobalApi from '@/Service/GlobalApi'
import { useUser } from '@clerk/nextjs'
import ResumeCardItem from './_component/ResumeCardItem'

const Dashboard = () => {
  const {user} = useUser();
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    user&&getResumeList()
  }, [user])
  
  const getResumeList = () => {
    GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress).then((res)=>{
      console.log(res.data.data);
      setResumeList(res.data.data)
    })
  }
  
  return (
    <div className="p-3 sm:p-5 md:p-6">
      <h1 className='font-bold text-xl sm:text-2xl'>My Resume</h1>
      <p className="text-gray-400 mb-3 text-sm sm:text-base">Make resume & explore resumes</p>
      
      {/* Single column mobile (centered), exact 5px gap on desktop */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 sm:gap-[5px] items-center sm:items-stretch">
        {/* Centered AddResume card with max-width on mobile */}
        <div className="w-full max-w-[250px] sm:max-w-none mb-3 sm:mb-0">
          <AddResume />
        </div>
        
        {/* Resume Cards - centered on mobile */}
        {resumeList.map((resume,index)=>(
          <div className="w-full max-w-[250px] sm:max-w-none mb-3 sm:mb-0" key={index}>
            <ResumeCardItem resume={resume} refreshData={getResumeList} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard