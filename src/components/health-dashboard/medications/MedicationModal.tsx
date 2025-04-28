import * as React from 'react'
import { X } from 'lucide-react'

interface MedicationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (medication: {
    name: string
    dosage: string
    frequency: string
    startDate: string
    endDate: string
    notes: string
  }) => void
}

export function MedicationModal({
  isOpen,
  onClose,
  onSubmit,
}: MedicationModalProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: '',
      notes: '',
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Add Medication</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Medication Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-blue-400 bg-blue-50 ring-1 ring-gray-200 shadow-sm focus:border-blue-200 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dosage"
              className="block text-sm font-medium text-gray-900"
            >
              Dosage
            </label>
            <input
              type="text"
              id="dosage"
              value={formData.dosage}
              onChange={(e) =>
                setFormData({ ...formData, dosage: e.target.value })
              }
              placeholder="e.g., 50mg"
              className="mt-1 block w-full rounded-md border-blue-400 bg-blue-50 ring-1 ring-gray-200 shadow-sm focus:border-blue-200 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="frequency"
              className="block text-sm font-medium text-gray-900"
            >
              Frequency
            </label>
            <input
              type="text"
              id="frequency"
              value={formData.frequency}
              onChange={(e) =>
                setFormData({ ...formData, frequency: e.target.value })
              }
              placeholder="e.g., Twice daily"
              className="mt-1 block w-full rounded-md border-blue-400 bg-blue-50 ring-1 ring-gray-200 shadow-sm focus:border-blue-200 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-900"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
              className="mt-1 block w-full rounded-md border border-blue-400 bg-blue-50 ring-1 ring-gray-200 px-3 py-2 text-sm focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-900"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
              className="mt-1 block w-full rounded-md border border-blue-400 bg-blue-50 ring-1 ring-gray-200 px-3 py-2 text-sm focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-900"
            >
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

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
