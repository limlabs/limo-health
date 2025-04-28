import { DocumentUpload } from "../upload/DocumentUpload"

const records = [
  {
    title: "Blood Test Results",
    doctor: "Dr. Sarah Johnson",
    date: "April 15, 2025"
  },
  {
    title: "Chest X-Ray Report",
    doctor: "Dr. Michael Chen",
    date: "March 22, 2025"
  },
  {
    title: "Vaccination Record",
    doctor: "Dr. Emily Rodriguez",
    date: "February 10, 2025"
  }
]

export function RecordsTab() {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Medical Records</h2>
        <p className="text-sm text-gray-500">Your recent medical documents.</p>
      </div>
      <div className="space-y-4 p-6 pt-0">
        {records.map((record) => (
          <div key={record.title} className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{record.title}</p>
              <p className="text-sm text-gray-500">{record.doctor}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{record.date}</p>
              <button className="text-sm text-blue-600 hover:underline">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-6">
        <DocumentUpload />
      </div>
    </div>
  )
}
