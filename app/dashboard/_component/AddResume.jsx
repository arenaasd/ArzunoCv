'use client'
import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/Service/GlobalApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

const addResume = () => {
  const [resumeTitle, setResumeTitle] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const onCreate = async () => {
    if (!user) {
      toast.error('User not authenticated.')
      setDialogOpen(false)
      return
    }

    setLoading(true)
    try {
      // Check the number of existing resumes
      const response = await GlobalApi.getUserResumes(user.primaryEmailAddress.emailAddress)
      const resumeCount = response.data.data.length

      if (resumeCount >= 2) {
        toast.error('You can only make 2 resumes, delete one to continue.')
        router.push('/upgrade')
        setDialogOpen(false)
        setLoading(false)
        return
      }

      // Proceed with creating a new resume
      const uuid = uuidv4()
      const data = {
        data: {
          title: resumeTitle,
          resumeId: uuid,
          userEmail: user.primaryEmailAddress.emailAddress,
          userName: user.fullName,
        }
      }

      const res = await GlobalApi.CreateNewResume(data)
      if (res.data.data.documentId) {
        toast.success('Resume created successfully!')
        router.push('/dashboard/resume/' + res.data.data.documentId + '/edit')
      } else {
        toast.error('Failed to create resume.')
      }
    } catch (err) {
      console.error(err)
      toast.error('An error occurred while creating the resume.')
    } finally {
      setLoading(false)
      setDialogOpen(false)
    }
  }

  return (
    <div>
      <div
        onClick={() => setDialogOpen(true)}
        className="h-[320px] mt-4 w-[210px] rounded-2xl flex justify-center items-center border-4 border-[#222222] hover:scale-105 shadow-md cursor-pointer transition-all hover:shadow-lg hover:shadow-[#222222] group"
      >
        <PlusSquare />
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your Resume</DialogTitle>
            <div>
              <DialogDescription className="text-sm">
                Add a title for your new resume
              </DialogDescription>
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                type="text"
                placeholder="e.g., Full Stack Resume"
                className="w-full mt-4"
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex items-center justify-center"
                disabled={!resumeTitle || resumeTitle.length < 3 || loading}
                onClick={onCreate}
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default addResume