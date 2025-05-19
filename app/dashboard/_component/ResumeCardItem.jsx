'use client'
import { MoreVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import GlobalApi from '@/Service/GlobalApi'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


const ResumeCardItem = ({ resume, refreshData }) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleMenuClick = (e, url) => {
    e.stopPropagation()
    router.push(url)
  }

  const onDelete = () => {
    setLoading(true)
    GlobalApi.DeleteResumeById(resume.documentId).then((res) => {
      toast('Resume deleted successfully')
      refreshData()
    }).finally(() => {
      setLoading(false)
      setOpenAlert(false) // Also close alert after delete
    })
  }


  return (
    <div className="h-[320px] mt-4 w-[210px] rounded-2xl flex flex-col justify-between items-center border-t-4 border-t-[#2C497F] hover:scale-105 shadow-md transition-all bg-[linear-gradient(135deg,#2C497F,#222222,#383961)] hover:shadow-lg hover:shadow-[#2C497F] group cursor-pointer">

      {/* Header with dropdown in top right */}
      <div className="w-full flex justify-end px-2 pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-1 rounded-full hover:bg-gray-700/30">
              <MoreVertical className='cursor-pointer h-6 w-6 text-gray-200' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='cursor-pointer' onClick={(e) => handleMenuClick(e, '/dashboard/resume/' + resume.documentId + '/edit')}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={(e) => handleMenuClick(e, '/my-resume/' + resume.documentId + '/view')}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={(e) => handleMenuClick(e, '/my-resume/' + resume.documentId + '/view')}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={(e) => {
              e.stopPropagation()
              setOpenAlert(true)
            }}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Image center (wrapped in Link) */}
      <Link href={'/dashboard/resume/' + resume.documentId + '/edit'} className='flex flex-grow justify-center items-center w-full'>
        <Image src="/cv.png" alt="cv icon" width={95} height={95} priority />
      </Link>

      {/* Title at bottom */}
      <h2 className="w-[210px] h-[35px] flex justify-center items-center text-[15px] font-semibold text-white bg-gradient-to-r from-[#3A5CA0] via-[#444444] to-[#4B4C7A] rounded-b-2xl group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#2C497F] transition-all">
        {resume.title}
      </h2>
    </div>
  )
}

export default ResumeCardItem