"use client"

import { useState } from "react"
import { Check, Eye, MoreHorizontal, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  department: string
  leaveType: string
  from: string
  to: string
  days: number
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedOn: string
}

const leaveRequests: LeaveRequest[] = [
  {
    id: "LR001",
    employeeId: "EMP001",
    employeeName: "John Doe",
    department: "Engineering",
    leaveType: "Casual Leave",
    from: "2023-06-10",
    to: "2023-06-12",
    days: 3,
    reason: "Family function",
    status: "pending",
    appliedOn: "2023-06-01",
  },
  {
    id: "LR002",
    employeeId: "EMP002",
    employeeName: "Jane Smith",
    department: "Marketing",
    leaveType: "Sick Leave",
    from: "2023-06-15",
    to: "2023-06-16",
    days: 2,
    reason: "Not feeling well",
    status: "pending",
    appliedOn: "2023-06-05",
  },
  {
    id: "LR003",
    employeeId: "EMP003",
    employeeName: "Robert Johnson",
    department: "Sales",
    leaveType: "Casual Leave",
    from: "2023-06-20",
    to: "2023-06-20",
    days: 1,
    reason: "Personal work",
    status: "pending",
    appliedOn: "2023-06-08",
  },
  {
    id: "LR004",
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    department: "Human Resources",
    leaveType: "Earned Leave",
    from: "2023-07-01",
    to: "2023-07-05",
    days: 5,
    reason: "Vacation",
    status: "approved",
    appliedOn: "2023-06-10",
  },
  {
    id: "LR005",
    employeeId: "EMP005",
    employeeName: "Michael Wilson",
    department: "Finance",
    leaveType: "Sick Leave",
    from: "2023-06-08",
    to: "2023-06-09",
    days: 2,
    reason: "Fever",
    status: "rejected",
    appliedOn: "2023-06-07",
  },
]

export function LeaveApprovalList() {
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  const filteredLeaves = leaveRequests.filter((leave) => activeTab === "all" || leave.status === activeTab)

  const viewLeaveDetails = (leave: LeaveRequest) => {
    setSelectedLeave(leave)
    setIsDialogOpen(true)
    setComment("")
  }

  const handleApprove = () => {
    if (!selectedLeave) return

    toast({
      title: "Leave approved",
      description: `Leave request ${selectedLeave.id} has been approved`,
    })

    setIsDialogOpen(false)
  }

  const handleReject = () => {
    if (!selectedLeave) return

    toast({
      title: "Leave rejected",
      description: `Leave request ${selectedLeave.id} has been rejected`,
    })

    setIsDialogOpen(false)
  }

  return (
    <>
      <Tabs defaultValue="pending" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt={leave.employeeName} />
                        <AvatarFallback>{leave.employeeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{leave.employeeName}</span>
                        <span className="text-xs text-muted-foreground">{leave.department}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewLeaveDetails(leave)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {leave.status === "pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedLeave(leave)
                                handleApprove()
                              }}
                            >
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedLeave(leave)
                                handleReject()
                              }}
                            >
                              <X className="h-4 w-4 mr-2 text-red-500" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedLeave && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Leave Request Details</DialogTitle>
              <DialogDescription>Request ID: {selectedLeave.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt={selectedLeave.employeeName} />
                  <AvatarFallback>{selectedLeave.employeeName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedLeave.employeeName}</p>
                  <p className="text-sm text-muted-foreground">{selectedLeave.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Leave Type</p>
                  <p className="text-sm text-muted-foreground">{selectedLeave.leaveType}</p>
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

              {selectedLeave.status === "pending" && (
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment (Optional)</Label>
                  <Textarea
                    id="comment"
                    placeholder="Add a comment for this leave request"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              )}
            </div>

            {selectedLeave.status === "pending" && (
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="destructive" onClick={handleReject}>
                  Reject
                </Button>
                <Button onClick={handleApprove}>Approve</Button>
              </DialogFooter>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
