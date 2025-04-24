"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function DocumentUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fileName) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate API call
    setTimeout(() => {
      setIsUploading(false)
      setFileName(null)
      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded successfully",
      })

      // Reset the file input
      const fileInput = document.getElementById("document-file") as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="document-type">Document Type</Label>
        <Select required>
          <SelectTrigger id="document-type">
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id-proof">ID Proof</SelectItem>
            <SelectItem value="address-proof">Address Proof</SelectItem>
            <SelectItem value="education">Educational Certificate</SelectItem>
            <SelectItem value="employment">Employment Proof</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="document-name">Document Name</Label>
        <Input id="document-name" placeholder="e.g., Passport, Driver's License" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="document-file">Upload File</Label>
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 bg-muted/50">
          <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
          <p className="text-xs text-muted-foreground mb-4">Supported formats: PDF, JPG, PNG (Max size: 5MB)</p>
          <Input
            id="document-file"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <Button type="button" variant="outline" onClick={() => document.getElementById("document-file")?.click()}>
            Browse Files
          </Button>
          {fileName && <p className="mt-2 text-sm font-medium">Selected: {fileName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="document-description">Description (Optional)</Label>
        <Input id="document-description" placeholder="Add a brief description of the document" />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading || !fileName} className="gap-2">
          {isUploading ? (
            <>Uploading...</>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload Document
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
