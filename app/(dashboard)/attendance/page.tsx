import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AttendanceLog } from "@/components/attendance-log"
import { AttendanceCalendar } from "@/components/attendance-calendar"
import { CheckInOut } from "@/components/check-in-out"

export default function AttendancePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Present</div>
            <p className="text-xs text-muted-foreground">Checked in at 09:05 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Working Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.5 hrs</div>
            <p className="text-xs text-muted-foreground">Today (so far)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18/22</div>
            <p className="text-xs text-muted-foreground">Present days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
            <CardDescription>Your attendance for the current month</CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceCalendar />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check In/Out</CardTitle>
            <CardDescription>Record your attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckInOut />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Log</CardTitle>
          <CardDescription>Your attendance history</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="space-y-4">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="space-y-4">
              <AttendanceLog />
            </TabsContent>
            <TabsContent value="weekly" className="space-y-4">
              <AttendanceLog />
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4">
              <AttendanceLog />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
