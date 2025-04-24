import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: string
  type: "check-in" | "check-out" | "leave-applied" | "leave-approved" | "document-uploaded"
  description: string
  time: string
  status?: "success" | "warning" | "error" | "info"
}

const activities: Activity[] = [
  {
    id: "1",
    type: "check-in",
    description: "Checked in at 09:05 AM",
    time: "Today, 09:05 AM",
    status: "success",
  },
  {
    id: "2",
    type: "leave-applied",
    description: "Applied for casual leave",
    time: "Today, 08:30 AM",
    status: "info",
  },
  {
    id: "3",
    type: "check-out",
    description: "Checked out at 06:15 PM",
    time: "Yesterday, 06:15 PM",
    status: "success",
  },
  {
    id: "4",
    type: "leave-approved",
    description: "Your leave request has been approved",
    time: "Yesterday, 02:45 PM",
    status: "success",
  },
  {
    id: "5",
    type: "document-uploaded",
    description: "Uploaded ID proof document",
    time: "May 10, 11:30 AM",
    status: "info",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{activity.description}</p>
              <Badge
                variant={
                  activity.status === "success"
                    ? "default"
                    : activity.status === "warning"
                      ? "warning"
                      : activity.status === "error"
                        ? "destructive"
                        : "secondary"
                }
                className="ml-2"
              >
                {activity.type.split("-").join(" ")}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
