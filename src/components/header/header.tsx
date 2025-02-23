"use client"

// components
import { Logo } from "./logo"
import Navbar from "./navbar"

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-white dark:bg-gray-900 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <Navbar />
        </div>
      </div>
    </header>
  )
}