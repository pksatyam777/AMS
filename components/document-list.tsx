"use client"

import { useState } from "react"
import { Download, Eye, FileText, MoreHorizontal, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: string
  name: string
  type: string
  uploadDate: string
  status: "verified" | "pending" | "rejected"
  fileSize: string
  fileType: string
}

const documents: Document[] = [
  {
    id: "DOC001",
    name: "Passport",
    type: "ID Proof",
    uploadDate: "2023-05-10",
    status: "verified",
    fileSize: "2.4 MB",
    fileType: "PDF",
  },
  {
    id: "DOC002",
    name: "Utility Bill",
    type: "Address Proof",
    uploadDate: "2023-05-12",
    status: "verified",
    fileSize: "1.8 MB",
    fileType: "PDF",
  },
  {
    id: "DOC003",
    name: "Bachelor's Degree",
    type: "Educational Certificate",
    uploadDate: "2023-05-15",
    status: "pending",
    fileSize: "3.2 MB",
    fileType: "PDF",
  },
  {
    id: "DOC004",
    name: "Previous Company Letter",
    type: "Employment Proof",
    uploadDate: "2023-05-18",
    status: "rejected",
    fileSize: "1.5 MB",
    fileType: "PDF",
  },
]

export function DocumentList() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const viewDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsDialogOpen(true)
  }

  const deleteDocument = (id: string) => {
    toast({
      title: "Document deleted",
      description: `Document ${id} has been deleted successfully`,
    })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {doc.name}
              </TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={doc.status === "verified" ? "default" : doc.status === "pending" ? "outline" : "destructive"}
                >
                  {doc.status}
                </Badge>
              </TableCell>
              <TableCell>{doc.fileSize}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => viewDocument(doc)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => deleteDocument(doc.id)} className="text-destructive">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedDocument && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Document Details</DialogTitle>
              <DialogDescription>
                {selectedDocument.name} ({selectedDocument.id})
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Document Type</p>
                  <p className="text-sm text-muted-foreground">{selectedDocument.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge
                    variant={
                      selectedDocument.status === "verified"
                        ? "default"
                        : selectedDocument.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {selectedDocument.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Upload Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedDocument.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">File Details</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedDocument.fileType}, {selectedDocument.fileSize}
                  </p>
                </div>
              </div>

              <div className="flex justify-center p-4 bg-muted rounded-md">
                <FileText className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="destructive" size="sm" className="gap-1">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
