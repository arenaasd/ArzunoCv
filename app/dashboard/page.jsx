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
    <div className="p-3 sm:p-5 md:p-6 md:px-16">
      <h1 className='font-bold text-xl sm:text-2xl'>My Resume</h1>
      <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Make resume & explore resumes</p>
      
      {/* Fixed 2 columns on mobile, increasing for larger screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        <div className="w-full">
          <AddResume />
        </div>
        {resumeList.map((resume,index)=>(
          <div className="w-full" key={index}>
            <ResumeCardItem resume={resume} refreshData={getResumeList} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard