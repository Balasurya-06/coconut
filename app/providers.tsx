"use client"

import type React from "react"

import { NextUIProvider } from "@nextui-org/react"
import { AuthProvider } from "@/components/providers/auth-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>{children}</AuthProvider>
    </NextUIProvider>
  )
}
