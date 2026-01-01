import { Link } from '@tanstack/react-router'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { LucideSquareArrowOutUpRight, Menu, SettingsIcon } from 'lucide-react'
import { useState } from 'react'

const title = 'Glance WYSIWIG Editor'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [groupedExpanded, setGroupedExpanded] = useState<
    Record<string, boolean>
  >({})

  return (
    <>
      <header className="p-4 z-10 h-16 flex items-center fixed w-full bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 gap-2 flex items-center justify-center text-xl font-semibold">
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/glanceapp/glance/6c5b7a3f4cc409e31739b2914bb6636d08299126/docs/logo.png"
              alt="Glance Logo"
              className="h-10"
            />
          </Link>
          <span className="pointer-events-none">{title}</span>
        </h1>
        <div className="ml-auto ">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <LucideSquareArrowOutUpRight />
              </button>
            </TooltipTrigger>
            <TooltipContent>export</TooltipContent>
          </Tooltip>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <SettingsIcon />
          </button>
        </div>
      </header>
    </>
  )
}
