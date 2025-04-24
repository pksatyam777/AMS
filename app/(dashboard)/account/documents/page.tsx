import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentUploader } from "@/components/document-uploader"
import { DocumentList } from "@/components/document-list"

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <Button>Upload New Document</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Upload your personal and professional documents</CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUploader />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>Documents required for your employment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">ID Proof</h3>
                  <p className="text-sm text-muted-foreground">
                    Government issued ID card, passport, or driver's license
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Address Proof</h3>
                  <p className="text-sm text-muted-foreground">Utility bill, bank statement, or rental agreement</p>
                </div>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Educational Certificates</h3>
                  <p className="text-sm text-muted-foreground">Degree certificates and mark sheets</p>
                </div>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Previous Employment Proof</h3>
                  <p className="text-sm text-muted-foreground">Experience letters and relieving letters</p>
                </div>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>View and manage your uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentList />
        </CardContent>
      </Card>
    </div>
  )
}
