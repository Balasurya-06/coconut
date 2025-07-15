"use client"

import { Button, Input, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { Bell, Search, Menu, User, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button isIconOnly variant="light" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>

          <Input placeholder="Search..." startContent={<Search className="w-4 h-4 text-gray-400" />} className="w-64" />
        </div>

        <div className="flex items-center space-x-4">
          <Button isIconOnly variant="light" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          <Dropdown>
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="primary"
                name={user?.name || "Admin"}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownItem key="profile" startContent={<User className="w-4 h-4" />}>
                Profile
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Settings className="w-4 h-4" />}>
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" startContent={<LogOut className="w-4 h-4" />} onClick={signOut}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
