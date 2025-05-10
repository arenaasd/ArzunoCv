'use client'
import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../../../../components/ui/button'
import { LayoutGrid } from 'lucide-react'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import GlobalApi from '@/Service/GlobalApi'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

const ThemeColor = () => {
    const colors = [
        '#2C3E50',
        '#3C3C3C',
        '#191970',
        '#800020',
        '#2E8B57',
        '#4B0082',
        '#004D40',
        '#2F4F4F',
        '#333333',
        '#212121',
        '#37474F',
        '#283593',
        '#1B2631',
        '#0B5345',
        '#512E5F'
    ]
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [selectedColor, setSelectedColor] = useState()
    const {resumeId} = useParams()

    const OnColorSelect = (color) => {
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })

        const data={
            data:{
                themeColor: color
            }
        }

        GlobalApi.UpdateResumeDetails(resumeId,data).then((res)=> {
            toast('Theme color updated successfully')
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
                <h2 className="mb-3 text-sm font-semibold">Select theme color</h2>
                <div className="grid grid-cols-5 gap-2">
                    {colors.map((color, index) => (
                        <button
                            onClick={() => OnColorSelect(color)}
                            key={index}
                            className={`h-6 w-6 rounded-full border border-gray-300 hover:scale-110 cursor-pointer hover:border-black transition-transform ${selectedColor === color&&'border border-black'}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeColor
