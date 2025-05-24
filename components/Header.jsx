'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Rocket } from 'lucide-react'

const Header = () => {
  const { user, isSignedIn } = useUser()
  const { theme, setTheme } = useTheme()

  const currentPlan = user?.publicMetadata?.plan || 'basic' // Default to basic if undefined

  return (
    <div
      id="no-print"
      className="flex flex-wrap sm:flex-nowrap justify-between items-center h-auto sm:h-16 shadow-md p-2 sm:p-4 gap-2 sm:gap-4"
    >
      <Link href="/">
        <img
          src="/main.png"
          alt="logo"
          className="w-20 h-20 sm:w-16 sm:h-16 xs:w-12 xs:h-12"
        />
      </Link>


      <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 items-center">
        {/* UPGRADE Button */}
        {currentPlan === 'basic' ? (
          <Link
            href="/upgrade"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-[2px] transition-transform hover:scale-105 focus:outline-none"
            title="Upgrade to Pro"
          >
            <span className="relative animated-upgrade-button flex items-center gap-2">
              <Rocket className="size-4" />
              Upgrade
            </span>
          </Link>
        ) : (
          <Link
            href="/upgrade"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-[2px] transition-transform hover:scale-105 focus:outline-none"
            title="You are Pro"
          >
            <span className="relative animated-upgrade-button flex items-center gap-2">
              <Rocket className="size-4" />
              Pro
            </span>
          </Link>
        )}

        {/* Theme Toggle */}
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
            <Link href="/dashboard">
              <Button
                className="dark:bg-white dark:text-black hover:bg-accent dark:hover:bg-gray-200 text-xs px-2 py-1 sm:text-base sm:px-4 sm:py-2"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </>
        ) : (
          <Link href="/auth/sign-in">
            <Button className="text-xs px-2 py-1 sm:text-base sm:px-4 sm:py-2">
              Get started
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header