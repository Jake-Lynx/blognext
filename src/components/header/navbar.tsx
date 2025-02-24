'use client'

// react & next
import { useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"

// Icons
import { CircleUserRound, Menu, Moon, Sun } from "lucide-react"

// Components
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { navLinks } from "@/app/content/nav-links"
import { Logo } from "./logo"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-sm font-medium hover:text-teal-500 dark:text-white"
          >
            {item.label}
          </Link>
        ))}
        <SignedOut>
          <SignInButton>
            <span className="rounded-full cursor-pointer hover:bg-orange-300">
              <CircleUserRound strokeWidth={0.9} />
            </span>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
        >
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Changer le mode</span>
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center gap-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>
                {/* <span className="text-xl font-bold text-teal-500">🪱 Bookworm</span> */}
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-lg font-medium hover:text-teal-500"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
              >
                <Sun
                  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span className="sr-only">Changer le mode</span>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
