"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Clock, FileText, Home, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  admin?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: Clock,
  },
  {
    title: "Leave Management",
    href: "/leaves",
    icon: Calendar,
  },
  {
    title: "Leave Balance",
    href: "/leave-balance",
    icon: BarChart3,
  },
  {
    title: "Documents",
    href: "/account/documents",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/account",
    icon: Settings,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
    admin: true,
  },
  {
    title: "Leave Approvals",
    href: "/admin/leave-approvals",
    icon: Calendar,
    admin: true,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  // In a real app, you would check if the user is an admin
  const isAdmin = true

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64">
      <ScrollArea className="h-screen py-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Main Menu</h2>
          <div className="space-y-1">
            {navItems
              .filter((item) => !item.admin || isAdmin)
              .map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
          </div>
          {isAdmin && (
            <>
              <h2 className="mt-6 mb-2 px-4 text-lg font-semibold tracking-tight">Admin</h2>
              <div className="space-y-1">
                {navItems
                  .filter((item) => item.admin)
                  .map((item) => (
                    <Button
                      key={item.href}
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      size="sm"
                      className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  ))}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
