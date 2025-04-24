"use client"

import { useState } from "react"
import { Eye, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LeaveApplication {
  id: string
  type: string
  from: string
  to: string
  days: number
  reason: string
  status: "approved" | "pending" | "rejected"
  appliedOn: string
}

const leaveApplications: LeaveApplication[] = [
  {
    id: "LA001",
    type: "Casual Leave",
    from: "2023-05-15",
    to: "2023-05-18",
    days: 4,
    reason: "Family vacation",
    status: "approved",
    appliedOn: "2023-05-01",
  },
  {
    id: "LA002",
    type: "Sick Leave",
    from: "2023-04-10",
    to: "2023-04-11",
    days: 2,
    reason: "Fever and cold",
    status: "approved",
    appliedOn: "2023-04-09",
  },
  {
    id: "LA003",
    type: "Casual Leave",
    from: "2023-06-05",
    to: "2023-06-05",
    days: 1,
    reason: "Personal work",
    status: "pending",
    appliedOn: "2023-05-25",
  },
  {
    id: "LA004",
    type: "Earned Leave",
    from: "2023-07-10",
    to: "2023-07-14",
    days: 5,
    reason: "Family function",
    status: "rejected",
    appliedOn: "2023-06-20",
  },
]

export function LeaveHistory() {
  const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const viewLeaveDetails = (leave: LeaveApplication) => {
    setSelectedLeave(leave)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveApplications.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell className="font-medium">{leave.id}</TableCell>
              <TableCell>{leave.type}</TableCell>
              <TableCell>{new Date(leave.from).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(leave.to).toLocaleDateString()}</TableCell>
              <TableCell>{leave.days}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    leave.status === "approved" ? "default" : leave.status === "pending" ? "outline" : "destructive"
                  }
                >
                  {leave.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(leave.appliedOn).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => viewLeaveDetails(leave)}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedLeave && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Leave Application Details</DialogTitle>
              <DialogDescription>Application ID: {selectedLeave.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Leave Type</p>
                  <p className="text-sm text-muted-foreground">{selectedLeave.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge
                    variant={
                      selectedLeave.status === "approved"
                        ? "default"
                        : selectedLeave.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {selectedLeave.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">From Date</p>
                  <p className="text-sm text-muted-foreground">{new Date(selectedLeave.from).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">To Date</p>
                  <p className="text-sm text-muted-foreground">{new Date(selectedLeave.to).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Days</p>
                  <p className="text-sm text-muted-foreground">{selectedLeave.days}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Reason</p>
                <p className="text-sm text-muted-foreground">{selectedLeave.reason}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Applied On</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedLeave.appliedOn).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                Download PDF
              </Button>
              {selectedLeave.status === "pending" && (
                <Button variant="destructive" size="sm">
                  Cancel Application
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
