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
      className="flex flex-wrap sm:flex-nowrap justify-between items-center h-auto sm:h-12 shadow-md p-3 gap-3"
    >
      <Link href="/">
        <img src="/main.png" alt="logo" width={60} height={60} />
      </Link>

      <div className="flex flex-wrap justify-center sm:justify-end gap-3 items-center">
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
                className="dark:bg-white dark:text-black hover:bg-accent dark:hover:bg-gray-200 text-sm px-3 py-1"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </>
        ) : (
          <Link href="/auth/sign-in">
            <Button className="text-sm px-3 py-1">Get started</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header