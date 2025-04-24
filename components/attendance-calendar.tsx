"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CalendarDay = {
  date: number
  status?: "present" | "absent" | "leave" | "weekend" | "holiday"
  isCurrentMonth: boolean
}

export function AttendanceCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Generate calendar days for the current month view
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()

    const startingDayOfWeek = firstDayOfMonth.getDay()
    const daysFromPrevMonth = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1

    const prevMonthLastDay = new Date(year, month, 0).getDate()

    const days: CalendarDay[] = []

    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
      })
    }

    // Current month days with mock attendance data
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(year, month, i).getDay()
      let status: CalendarDay["status"] = undefined

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        status = "weekend"
      } else {
        // Mock data - in a real app this would come from an API
        const random = Math.random()
        if (random < 0.7) {
          status = "present"
        } else if (random < 0.8) {
          status = "absent"
        } else if (random < 0.9) {
          status = "leave"
        } else {
          status = "holiday"
        }
      }

      days.push({
        date: i,
        status,
        isCurrentMonth: true,
      })
    }

    // Next month days to fill the calendar
    const totalDaysToShow = 42 // 6 rows of 7 days
    const remainingDays = totalDaysToShow - days.length

    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
      })
    }

    return days
  }

  const days = generateCalendarDays()
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">
          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square flex items-center justify-center rounded-md text-sm",
              !day.isCurrentMonth && "text-muted-foreground opacity-50",
              day.isCurrentMonth && "font-medium",
              day.status === "present" && "bg-green-100 dark:bg-green-900/20",
              day.status === "absent" && "bg-red-100 dark:bg-red-900/20",
              day.status === "leave" && "bg-amber-100 dark:bg-amber-900/20",
              day.status === "holiday" && "bg-blue-100 dark:bg-blue-900/20",
              day.status === "weekend" && "bg-gray-100 dark:bg-gray-800/50",
            )}
          >
            {day.date}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
          <span>Leave</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span>Holiday</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-gray-500"></div>
          <span>Weekend</span>
        </div>
      </div>
    </div>
  )
}
