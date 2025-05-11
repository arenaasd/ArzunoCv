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
    <div className="p-2 sm:p-4 md:p-6">
      <h1 className='font-bold text-xl sm:text-2xl'>My Resume</h1>
      <p className="text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">Make resume & explore resumes</p>
      
      {/* Tighter grid with minimal gaps and container to prevent overflow */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2 md:gap-3">
        {/* AddResume Card */}
        <div className="p-0.5">
          <AddResume />
        </div>
        
        {/* Resume Cards */}
        {resumeList.map((resume,index)=>(
          <div className="p-0.5" key={index}>
            <ResumeCardItem resume={resume} refreshData={getResumeList} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard