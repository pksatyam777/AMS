import type React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NotificationCenter } from "@/components/notification-center"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 pt-16">
          <div className="container mx-auto">{children}</div>
        </main>
        <NotificationCenter />
      </div>
    </div>
  )
}
