import React, { useEffect, useState } from 'react'
import AddResume from './_component/AddResume'
import GlobalApi from '@/Service/GlobalApi'
import { useUser } from '@clerk/nextjs'
import ResumeCardItem from './_component/ResumeCardItem'
import SkeletonCard from './_component/SkeletonCard'

const Dashboard = () => {
  const { user } = useUser();
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

  return (
    <div className="p-4 sm:p-5 md:p-6">
      <h1 className='font-bold text-xl sm:text-2xl'>My Resume</h1>
      <p className="text-gray-400 mb-3 text-sm sm:text-base">Make resume & explore resumes</p>

      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 sm:gap-[5px] md:gap-[10px] items-center sm:items-stretch">
        <div className="w-full max-w-[250px] sm:max-w-none mb-3 sm:mb-0">
          <AddResume />
        </div>

        {loading ? (
          // Show 3–6 skeletons depending on how many you want
          Array(6).fill(0).map((_, index) => (
            <div key={index} className="w-full max-w-[250px] sm:max-w-none mb-3 sm:mb-0">
              <SkeletonCard />
            </div>
          ))
        ) : (
          resumeList.map((resume, index) => (
            <div key={index} className="w-full max-w-[250px] sm:max-w-none mb-3 sm:mb-0">
              <ResumeCardItem resume={resume} refreshData={getResumeList} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
