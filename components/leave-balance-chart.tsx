"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface LeaveType {
  type: string
  used: number
  total: number
  color: string
}

const leaveTypes: LeaveType[] = [
  {
    type: "Casual Leave",
    used: 4,
    total: 12,
    color: "bg-blue-500",
  },
  {
    type: "Sick Leave",
    used: 2,
    total: 10,
    color: "bg-red-500",
  },
  {
    type: "Earned Leave",
    used: 0,
    total: 15,
    color: "bg-green-500",
  },
  {
    type: "Comp Off",
    used: 1,
    total: 5,
    color: "bg-purple-500",
  },
]

export function LeaveBalanceChart() {
  return (
    <div className="space-y-4">
      {leaveTypes.map((leave) => (
        <div key={leave.type} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${leave.color}`}></div>
              <span className="text-sm font-medium">{leave.type}</span>
            </div>
            <span className="text-sm font-medium">
              {leave.used}/{leave.total} days
            </span>
          </div>
          <Progress value={(leave.used / leave.total) * 100} className="h-2" />
        </div>
      ))}

      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Leave Balance</span>
            <span className="text-lg font-bold">30 days</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
