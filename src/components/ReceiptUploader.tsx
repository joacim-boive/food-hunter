"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ReceiptUploader() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("receipt", file)

    try {
      const response = await fetch("/api/upload-receipt", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        // Handle successful upload
        console.log("Receipt uploaded successfully")
      } else {
        // Handle error
        console.error("Failed to upload receipt")
      }
    } catch (error) {
      console.error("Error uploading receipt:", error)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file}>
        Upload Receipt
      </Button>
    </div>
  )
}
