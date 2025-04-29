import * as React from 'react'
import { X } from 'lucide-react'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (appointment: {
    doctorName: string
    specialty: string
    date: string
    time: string
    notes: string
  }) => void
}

export function AppointmentModal({ isOpen, onClose, onSubmit }: AppointmentModalProps) {
  const [formData, setFormData] = React.useState({
    doctorName: '',
    specialty: '',
    date: '',
    time: '',
    notes: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      doctorName: '',
      specialty: '',
      date: '',
      time: '',
      notes: '',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Schedule New Appointment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">
              Doctor Name
            </label>
            <input
              type="text"
              id="doctorName"
              value={formData.doctorName}
              onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
              className="mt-1 block w-full rounded-md border-blue-400 bg-blue-50 ring-1 ring-gray-200 shadow-sm focus:border-blue-200 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
              Specialty
            </label>
            <input
              type="text"
              id="specialty"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="mt-1 block w-full rounded-md border-blue-400 bg-blue-50 ring-1 ring-gray-200 shadow-sm focus:border-blue-200 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-blue-400 bg-blue-50 ring-1 ring-gray-200 shadow-sm focus:border-blue-200 focus:ring-blue-200 cursor-pointer"
              required
              onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="mt-1 block w-full rounded-md border-blue-400 bg-blue-50 ring-1 ring-gray-200 shadow-sm focus:border-blue-200 focus:ring-blue-200 cursor-pointer"
              required
              onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-blue-400 bg-blue-50 ring-1 ring-gray-200 shadow-sm focus:border-blue-200 focus:ring-blue-200"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
