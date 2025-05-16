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
        '#2C3E50', '#3C3C3C', '#191970', '#800020', '#2E8B57',
        '#4B0082', '#004D40', '#2F4F4F', '#333333', '#212121',
        '#37474F', '#283593', '#1B2631', '#0B5345', '#512E5F'
    ]
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || '')
    const [customColor, setCustomColor] = useState(resumeInfo?.themeColor || '')
    const [manualColor, setManualColor] = useState('')
    const { resumeId } = useParams()

    const updateThemeColor = (color) => {
        setSelectedColor(color)
        setResumeInfo({ ...resumeInfo, themeColor: color })

        const data = {
            data: {
                themeColor: color
            }
        }

        GlobalApi.UpdateResumeDetails(resumeId, data).then(() => {
            toast('Theme color updated successfully')
        })
    }

    const isValidHex = (hex) => /^#[0-9A-Fa-f]{6}$/.test(hex)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    Theme
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-56 bg-white text-black dark:bg-zinc-900 dark:text-white border border-gray-200 dark:border-zinc-700">
                <h2 className="mb-3 text-sm font-semibold">Select theme color</h2>

                {/* Predefined Colors */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                    {colors.map((color, index) => (
                        <button
                            onClick={() => updateThemeColor(color)}
                            key={index}
                            className={`h-6 w-6 rounded-full border ${
                                selectedColor === color ? 'border-black dark:border-white' : 'border-gray-300 dark:border-zinc-600'
                            } hover:scale-110 cursor-pointer transition-transform`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>

                {/* Color Picker */}
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-8 h-8 p-0 border-none cursor-pointer bg-transparent"
                    />
                    <span className="text-sm">Custom Picker</span>
                </div>

                {customColor !== selectedColor && (
                    <Button
                        size="sm"
                        onClick={() => updateThemeColor(customColor)}
                        className="w-full mb-2"
                    >
                        Use this color
                    </Button>
                )}

                {/* Manual Hex Input */}
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="text"
                        placeholder="#ffffff"
                        value={manualColor}
                        onChange={(e) => setManualColor(e.target.value)}
                        className="text-sm px-2 py-1 rounded w-full bg-transparent border border-gray-300 dark:border-zinc-600"
                    />
                </div>
                <Button
                    size="sm"
                    onClick={() => updateThemeColor(manualColor)}
                    className="w-full"
                    disabled={!isValidHex(manualColor)}
                >
                    Use this hex
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeColor
