"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function CheckInOut() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isCheckedIn, setIsCheckedIn] = useState(true)
  const [checkInTime, setCheckInTime] = useState<Date | null>(new Date(new Date().setHours(9, 5)))
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleCheckInOut = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (isCheckedIn) {
        setIsCheckedIn(false)
        toast({
          title: "Checked out",
          description: `You have checked out at ${formatTime(currentTime)}`,
        })
      } else {
        setIsCheckedIn(true)
        setCheckInTime(new Date())
        toast({
          title: "Checked in",
          description: `You have checked in at ${formatTime(currentTime)}`,
        })
      }

      setIsLoading(false)
    }, 1000)
  }

  const calculateWorkingHours = () => {
    if (!checkInTime || !isCheckedIn) return "0 hrs 0 mins"

    const diffMs = currentTime.getTime() - checkInTime.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${diffHrs} hrs ${diffMins} mins`
  }

  return (
    <div className="space-y-4">
      <Card className="bg-muted/50">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Clock className="h-5 w-5" />
            {formatTime(currentTime)}
          </div>
          <p className="text-sm text-muted-foreground">
            {currentTime.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium">Status</p>
          <div className={`flex items-center gap-2 ${isCheckedIn ? "text-green-500" : "text-muted-foreground"}`}>
            <span
              className={`h-2 w-2 rounded-full ${isCheckedIn ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`}
            ></span>
            <span className="font-medium">{isCheckedIn ? "Checked In" : "Checked Out"}</span>
          </div>
        </div>

        {isCheckedIn && checkInTime && (
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium">Check In Time</p>
            <p className="font-medium">{formatTime(checkInTime)}</p>
          </div>
        )}

        {isCheckedIn && checkInTime && (
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium">Working Hours</p>
            <p className="font-medium">{calculateWorkingHours()}</p>
          </div>
        )}

        <Button
          className="w-full"
          variant={isCheckedIn ? "destructive" : "default"}
          onClick={handleCheckInOut}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : isCheckedIn ? "Check Out" : "Check In"}
        </Button>
      </div>
    </div>
  )
}
