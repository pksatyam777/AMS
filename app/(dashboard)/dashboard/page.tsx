import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard-stats"
import { AttendanceCalendar } from "@/components/attendance-calendar"
import { RecentActivity } from "@/components/recent-activity"
import { LeaveBalanceChart } from "@/components/leave-balance-chart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <DashboardStats />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Attendance Calendar</CardTitle>
                <CardDescription>Your attendance for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceCalendar />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Leave Balance</CardTitle>
                <CardDescription>Your remaining leave balance for the year</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveBalanceChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent attendance and leave activities</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics of your attendance and leave patterns</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Analytics content will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and download attendance and leave reports</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Reports content will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
