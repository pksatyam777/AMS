import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeaveBalanceChart } from "@/components/leave-balance-chart"
import { LeaveHistory } from "@/components/leave-history"

export default function LeaveBalancePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Leave Balance</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30 days</div>
            <p className="text-xs text-muted-foreground">Across all leave types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Used Leaves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 days</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Leaves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 days</div>
            <p className="text-xs text-muted-foreground">Approved future leaves</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Balance Details</CardTitle>
          <CardDescription>Your current leave balance by type</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart" className="space-y-4">
            <TabsList>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="details">Detailed View</TabsTrigger>
            </TabsList>

            <TabsContent value="chart">
              <LeaveBalanceChart />
            </TabsContent>

            <TabsContent value="details">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Casual Leave</h3>
                      <p className="text-sm text-muted-foreground">For personal matters and emergencies</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">8/12 days</p>
                      <p className="text-sm text-muted-foreground">4 days used</p>
                    </div>
                  </div>
                  <Progress value={33.33} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Sick Leave</h3>
                      <p className="text-sm text-muted-foreground">For health-related absences</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">8/10 days</p>
                      <p className="text-sm text-muted-foreground">2 days used</p>
                    </div>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Earned Leave</h3>
                      <p className="text-sm text-muted-foreground">Accumulated based on service</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">15/15 days</p>
                      <p className="text-sm text-muted-foreground">0 days used</p>
                    </div>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Comp Off</h3>
                      <p className="text-sm text-muted-foreground">For working on holidays or weekends</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">4/5 days</p>
                      <p className="text-sm text-muted-foreground">1 day used</p>
                    </div>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
          <CardDescription>Your leave application history</CardDescription>
        </CardHeader>
        <CardContent>
          <LeaveHistory />
        </CardContent>
      </Card>
    </div>
  )
}
