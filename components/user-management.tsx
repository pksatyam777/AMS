"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Search, Trash2, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  department: string
  role: string
  status: "active" | "inactive"
  joinedDate: string
}

const users: User[] = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
    role: "Senior Developer",
    status: "active",
    joinedDate: "2020-01-15",
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Marketing",
    role: "Marketing Manager",
    status: "active",
    joinedDate: "2020-03-10",
  },
  {
    id: "USR003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    department: "Sales",
    role: "Sales Executive",
    status: "active",
    joinedDate: "2021-05-20",
  },
  {
    id: "USR004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Human Resources",
    role: "HR Specialist",
    status: "active",
    joinedDate: "2021-08-15",
  },
  {
    id: "USR005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    department: "Finance",
    role: "Financial Analyst",
    status: "inactive",
    joinedDate: "2022-02-10",
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStatusChange = (id: string, newStatus: "active" | "inactive") => {
    toast({
      title: "User status updated",
      description: `User ${id} status changed to ${newStatus}`,
    })
  }

  const handleDeleteUser = (id: string) => {
    toast({
      title: "User deleted",
      description: `User ${id} has been deleted`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="gap-1">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                </TableCell>
                <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(user.id, user.status === "active" ? "inactive" : "active")}
                      >
                        <Badge className="h-4 w-4 mr-2" variant={user.status === "active" ? "secondary" : "default"} />
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
