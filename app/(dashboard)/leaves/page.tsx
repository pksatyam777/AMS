import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeaveApplicationForm } from "@/components/leave-application-form"
import { LeaveHistory } from "@/components/leave-history"

export default function LeavesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
        <Button>Apply for Leave</Button>
      </div>

      <Tabs defaultValue="apply" className="space-y-4">
        <TabsList>
          <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
          <TabsTrigger value="balance">Leave Balance</TabsTrigger>
        </TabsList>

        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Application</CardTitle>
              <CardDescription>Fill out the form below to apply for leave</CardDescription>
            </CardHeader>
            <CardContent>
              <LeaveApplicationForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave History</CardTitle>
              <CardDescription>View your leave application history</CardDescription>
            </CardHeader>
            <CardContent>
              <LeaveHistory />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balance</CardTitle>
              <CardDescription>Your current leave balance for the year</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Casual Leave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8/12</div>
                    <p className="text-xs text-muted-foreground">4 days used</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8/10</div>
                    <p className="text-xs text-muted-foreground">2 days used</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Earned Leave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15/15</div>
                    <p className="text-xs text-muted-foreground">0 days used</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Comp Off</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4/5</div>
                    <p className="text-xs text-muted-foreground">1 day used</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
