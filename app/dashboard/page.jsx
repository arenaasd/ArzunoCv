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
    <div className="p-4 sm:p-6 sm:px-16">
      <h1 className='font-bold text-2xl'>My Resume</h1>
      <p className="text-gray-400 mb-4">Make resume & explore resumes</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
        <AddResume />
        {resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={getResumeList} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard