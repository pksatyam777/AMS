"use client"

import { useState } from "react"
import { Calendar, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AttendanceRecord {
  date: string
  checkIn: string
  checkOut: string
  workingHours: string
  status: "present" | "absent" | "half-day" | "weekend" | "holiday"
}

const attendanceRecords: AttendanceRecord[] = [
  {
    date: "2023-05-22",
    checkIn: "09:05 AM",
    checkOut: "06:15 PM",
    workingHours: "9 hrs 10 mins",
    status: "present",
  },
  {
    date: "2023-05-21",
    checkIn: "",
    checkOut: "",
    workingHours: "0 hrs 0 mins",
    status: "weekend",
  },
  {
    date: "2023-05-20",
    checkIn: "",
    checkOut: "",
    workingHours: "0 hrs 0 mins",
    status: "weekend",
  },
  {
    date: "2023-05-19",
    checkIn: "09:10 AM",
    checkOut: "06:05 PM",
    workingHours: "8 hrs 55 mins",
    status: "present",
  },
  {
    date: "2023-05-18",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    workingHours: "9 hrs 0 mins",
    status: "present",
  },
  {
    date: "2023-05-17",
    checkIn: "09:15 AM",
    checkOut: "02:30 PM",
    workingHours: "5 hrs 15 mins",
    status: "half-day",
  },
  {
    date: "2023-05-16",
    checkIn: "",
    checkOut: "",
    workingHours: "0 hrs 0 mins",
    status: "absent",
  },
  {
    date: "2023-05-15",
    checkIn: "",
    checkOut: "",
    workingHours: "0 hrs 0 mins",
    status: "holiday",
  },
]

export function AttendanceLog() {
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = attendanceRecords.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(attendanceRecords.length / recordsPerPage)

  const getStatusBadgeClass = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "absent":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "half-day":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      case "weekend":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"
      case "holiday":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Button variant="outline" size="sm" className="gap-1">
          <Calendar className="h-4 w-4" />
          Select Date Range
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Working Hours</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(record.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {record.checkIn ? (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {record.checkIn}
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {record.checkOut ? (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {record.checkOut}
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{record.workingHours}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, attendanceRecords.length)} of{" "}
          {attendanceRecords.length} records
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
