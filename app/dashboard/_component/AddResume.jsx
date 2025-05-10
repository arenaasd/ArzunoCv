'use client'
import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/Service/GlobalApi';
import { useRouter } from 'next/navigation';

const addResume = () => {

  const [resumeTitle, setResumeTitle] = useState()
  const [dialogOPen, setDialogOPen] = useState(false);
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const router = useRouter();
  const onCreate = () => {
    setLoading(true)
    const uuid = uuidv4();

    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      }
    }
    GlobalApi.CreateNewResume(data).then((res) => {
      console.log(res)
      if (res) {
        setLoading(false)
        router.push('/dashboard/resume/' + res.data.data.documentId + '/edit')
      }
    }, (err) => {
      setLoading(false)

    })

  }

  return (
    <div>
      <div onClick={() => setDialogOPen(true)} className="h-[320px] mt-4 w-[210px] rounded-2xl flex justify-center  items-center border-4 border-[#222222] hover:scale-105 shadow-md cursor-pointer transition-all 
      hover:shadow-lg hover:shadow-[#222222] group">
        <PlusSquare />
      </div>
      <Dialog open={dialogOPen} onOpenChange={setDialogOPen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create you Resume</DialogTitle>
            <div className="">
              <DialogDescription className='text-sm'>Add a title for your new resume</DialogDescription>
              <Input onChange={(e) => setResumeTitle(e.target.value)} type="text" placeholder='eg. Full stack resume' className='w-full mt-4' />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button variant='outline' onClick={() => setDialogOPen(false)}>Cencel</Button>
              <Button className="flex items-center justify-center"
                disabled={!resumeTitle || resumeTitle.length < 3 || loading} onClick={() => onCreate()}>
                {loading ? <Loader2 className='animate-spin ' /> : "Create"}</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default addResume