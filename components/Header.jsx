'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const Header = () => {
  const { user, isSignedIn } = useUser()
  const { theme, setTheme } = useTheme()

  return (
    <div id="no-print" className='flex justify-between items-center h-16 shadow-md  p-4'>
      <Link href="/">
      <Image src="/main.png" alt="logo" width={70} height={70} />
      </Link>
      <div className="flex gap-3 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="dark:bg-white dark:text-black hover:bg-accent dark:hover:bg-gray-200"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        {isSignedIn ? (
          <>
            <Link href='/dashboard'>
              <Button
                className="dark:bg-white dark:text-black hover:bg-accent dark:hover:bg-gray-200"
              >Dashboard</Button>
            </Link>
            <UserButton />
          </>
        ) : (
          <Link href='/auth/sign-in'>
            <Button>Get started</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
