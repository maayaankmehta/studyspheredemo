"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { AuthProvider } from "@/lib/auth-context"

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProviderInner({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      // Default to dark mode
      setIsDark(true)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const htmlElement = document.documentElement
    if (isDark) {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }

    // Save preference to localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark, mounted])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {mounted ? children : null}
    </ThemeContext.Provider>
  )
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </AuthProvider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
