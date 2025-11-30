'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      variant="outline"
      className="border-border/40 bg-primary focus-visible:ring-primary/20 relative flex h-10 w-15 items-center justify-center gap-2 overflow-hidden rounded-full border text-white transition-all hover:text-white focus:border-0 sm:w-10"
    >
      <Sun
        className={`absolute h-[1.3rem] w-[1.3rem] transition-all duration-300 ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-90 opacity-0'
        }`}
      />
      <Moon
        className={`absolute h-[1.3rem] w-[1.3rem] transition-all duration-300 ${
          isDark
            ? 'scale-0 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
      />
    </Button>
  )
}
