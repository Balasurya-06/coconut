"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardBody, CardHeader, Input, Button, Tabs, Tab, Link } from "@nextui-org/react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await signIn(email, password)
      if (user?.isAdmin) {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signUp(email, password, { name, phone })
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign up error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen coconut-gradient flex items-center justify-center p-4 coconut-pattern">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-6">
          <Link href="/" className="flex items-center text-white hover:text-green-100 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="glass-effect shadow-2xl">
          <CardHeader className="flex flex-col items-center pb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              className="text-6xl mb-4"
            >
              🥥
            </motion.div>
            <h1 className="text-2xl font-bold text-white">Surya Coconuts</h1>
            <p className="text-green-100">Farm to Consumer Platform</p>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="Login options" className="w-full">
              <Tab key="signin" title="Sign In">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    classNames={{
                      input: "text-white",
                      label: "text-green-100",
                    }}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    classNames={{
                      input: "text-white",
                      label: "text-green-100",
                    }}
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-green-100 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    }
                  />
                  <Button type="submit" className="w-full bg-white text-green-600 font-semibold" isLoading={loading}>
                    Sign In
                  </Button>
                </form>
              </Tab>
              <Tab key="signup" title="Sign Up">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <Input
                    type="text"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    classNames={{
                      input: "text-white",
                      label: "text-green-100",
                    }}
                  />
                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    classNames={{
                      input: "text-white",
                      label: "text-green-100",
                    }}
                  />
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    classNames={{
                      input: "text-white",
                      label: "text-green-100",
                    }}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    classNames={{
                      input: "text-white",
                      label: "text-green-100",
                    }}
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-green-100 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    }
                  />
                  <Button type="submit" className="w-full bg-white text-green-600 font-semibold" isLoading={loading}>
                    Create Account
                  </Button>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}
