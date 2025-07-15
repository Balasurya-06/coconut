"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@nextui-org/react"
import { LayoutDashboard, TreePine, Users, FileText, TrendingUp, Settings, LogOut, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Farm Management", href: "/admin/farm", icon: TreePine },
  { name: "Customer Orders", href: "/admin/customers", icon: Users },
  { name: "Invoice Management", href: "/admin/bills", icon: FileText },
  { name: "Market Prices", href: "/admin/market-price", icon: TrendingUp },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const { signOut } = useAuth()

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                className="text-2xl"
              >
                🥥
              </motion.span>
              <div>
                <h1 className="text-lg font-bold">Surya Coconuts</h1>
                <p className="text-xs text-gray-400">Admin Portal</p>
              </div>
            </div>
            <Button isIconOnly variant="light" className="lg:hidden text-white" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-green-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-gray-800">
            <Button
              onClick={signOut}
              variant="light"
              className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
              startContent={<LogOut className="w-5 h-5" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
