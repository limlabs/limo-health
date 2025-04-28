import { useState } from "react"
import { FileUp, Loader2, Upload, X } from "lucide-react"

export function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [documentType, setDocumentType] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setUploadProgress(0)
      setUploadSuccess(false)
    }
  }

  const handleUpload = () => {
    if (!selectedFile || !documentType) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadSuccess(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    setUploadSuccess(false)
    setDocumentType("")
  }

  return (
    <div className="w-full">
      <div className="pb-2">
        <h3 className="text-base font-semibold">Upload New Document</h3>
      </div>
      <div>
        {uploadSuccess ? (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-2">
              <FileUp className="h-4 w-4 text-blue-600" />
              <p className="text-blue-800">
                Document uploaded successfully! It will be reviewed by your healthcare provider.
              </p>
            </div>
            <button
              className="mt-2 rounded-md border border-blue-200 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100"
              onClick={resetUpload}
            >
              Upload Another
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="document-type" className="text-sm font-medium">
                Document Type
              </label>
              <select
                id="document-type"
                className="w-full rounded-md border bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                disabled={isUploading}
              >
                <option value="">Select document type</option>
                <option value="lab-results">Lab Results</option>
                <option value="imaging">Imaging Reports</option>
                <option value="prescription">Prescription</option>
                <option value="discharge">Discharge Summary</option>
                <option value="other">Other Medical Document</option>
              </select>
            </div>

            {selectedFile ? (
              <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileUp className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">{selectedFile.name}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(selectedFile.size / 1024)} KB)
                    </span>
                  </div>
                  {!isUploading && (
                    <button
                      className="rounded-full p-1 hover:bg-blue-100"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {isUploading && (
                  <div className="mt-2 space-y-2">
                    <div className="h-2 w-full overflow-hidden rounded bg-blue-100">
                      <div
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-600">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-blue-300 bg-blue-50 p-6">
                <Upload className="mb-2 h-8 w-8 text-blue-500" />
                <p className="mb-1 text-sm font-medium">Drag and drop your file here</p>
                <p className="mb-4 text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Select File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
            )}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading || !documentType}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FileUp className="h-4 w-4" />
                  Upload Document
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
