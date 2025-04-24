"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
}

export function NotificationSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "email-leave",
      title: "Leave Updates",
      description: "Receive email notifications for leave approvals and rejections",
      enabled: true,
    },
    {
      id: "email-attendance",
      title: "Attendance Reminders",
      description: "Receive email reminders for missing check-ins or check-outs",
      enabled: true,
    },
    {
      id: "email-documents",
      title: "Document Updates",
      description: "Receive email notifications for document verification status",
      enabled: false,
    },
    {
      id: "push-leave",
      title: "Leave Updates",
      description: "Receive push notifications for leave approvals and rejections",
      enabled: true,
    },
    {
      id: "push-attendance",
      title: "Attendance Reminders",
      description: "Receive push reminders for missing check-ins or check-outs",
      enabled: false,
    },
    {
      id: "push-documents",
      title: "Document Updates",
      description: "Receive push notifications for document verification status",
      enabled: false,
    },
  ])

  const toggleSetting = (id: string) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved",
      })
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          {settings
            .filter((setting) => setting.id.startsWith("email-"))
            .map((setting) => (
              <div key={setting.id} className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor={setting.id} className="text-base">
                    {setting.title}
                  </Label>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Push Notifications</h3>
        <div className="space-y-4">
          {settings
            .filter((setting) => setting.id.startsWith("push-"))
            .map((setting) => (
              <div key={setting.id} className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor={setting.id} className="text-base">
                    {setting.title}
                  </Label>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Reset to Defaults
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
