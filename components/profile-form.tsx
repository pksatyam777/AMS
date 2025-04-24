"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder-user.jpg" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            Change Avatar
          </Button>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" defaultValue="Doe" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select defaultValue="engineering">
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Select defaultValue="senior-developer">
            <SelectTrigger id="designation">
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="senior-developer">Senior Developer</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="team-lead">Team Lead</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="director">Director</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself"
          defaultValue="Senior Developer with 5+ years of experience in web application development."
          className="min-h-[120px]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="joining-date">Joining Date</Label>
          <Input id="joining-date" type="date" defaultValue="2020-01-15" disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employee-id">Employee ID</Label>
          <Input id="employee-id" defaultValue="EMP001" disabled />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
