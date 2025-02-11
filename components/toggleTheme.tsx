"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <>
        {theme === 'light' ?
            <Button variant="ghost" size="icon" onClick={() => setTheme('dark')} aria-label="Switch to light mode">
                <Moon className="h-5 w-5" />
            </Button>
            :
            <Button variant="ghost" size="icon" onClick={() => setTheme('light')} aria-label="Switch to dark mode">
                <Sun className="h-5 w-5" />
            </Button>
        }
        </>
    )
}