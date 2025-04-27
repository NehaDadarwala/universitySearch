"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ReactNode } from "react"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  actions?: ReactNode
}

export function Header({ title, showBackButton = false, actions }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {actions}
        {showBackButton && (
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  )
} 