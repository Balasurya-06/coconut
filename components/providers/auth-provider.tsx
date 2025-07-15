"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface User {
  id: string
  email: string
  name?: string
  phone?: string
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<User | null>
  signUp: (email: string, password: string, userData: { name: string; phone: string }) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
        const userData = userDoc.data()

        // Check if user is admin based on email
        const isAdmin = firebaseUser.email === "admin@suryacoconuts.com" || userData?.isAdmin || false

        const userProfile: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: userData?.name || "",
          phone: userData?.phone || "",
          isAdmin,
        }

        setUser(userProfile)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
      const userData = userDoc.data()

      // Check if user is admin
      const isAdmin = email === "admin@suryacoconuts.com" || userData?.isAdmin || false

      const userProfile: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: userData?.name || "",
        phone: userData?.phone || "",
        isAdmin,
      }

      return userProfile
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, userData: { name: string; phone: string }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Check if this should be an admin user
      const isAdmin = email === "admin@suryacoconuts.com"

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: userData.name,
        phone: userData.phone,
        email: email,
        isAdmin,
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    isAdmin: user?.isAdmin || false,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
