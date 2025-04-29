import * as React from 'react'
import { Plus, Pill, X } from 'lucide-react'
import { MedicationModal } from './MedicationModal'



import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { readMedications, writeMedications } from '../../../api/medications'

export function MedicationsTab() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const { data: medications = [] } = useQuery({
    queryKey: ['medications'],
    queryFn: readMedications
  })

  const { mutate: addMedication } = useMutation({
    mutationFn: async (medicationData: { name: string; dosage: string; frequency: string; startDate: string; endDate: string; notes: string }) => {
      const newMedication = {
        ...medicationData,
        id: `med${Date.now()}`
      }
      await writeMedications([...medications, newMedication])
      return newMedication
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] })
      setIsModalOpen(false)
    }
  })

  const { mutate: deleteMedication } = useMutation({
    mutationFn: async (medication: { id: string }) => {
      const updatedMedications = medications.filter((m: { id: string }) => m.id !== medication.id)
      await writeMedications(updatedMedications)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] })
    }
  })

  const sortedMedications = [...medications].sort((a, b) => {
    const dateA = new Date(a.startDate)
    const dateB = new Date(b.startDate)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Medication Schedule</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Medication
        </button>
      </div>

      <div className="grid gap-4">
        {sortedMedications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No medications scheduled
          </div>
        ) : (
          sortedMedications.map((medication) => (
            <div
              key={medication.id}
              className="flex items-start gap-4 p-6 bg-white rounded-lg border shadow-sm relative"
            >
              <button
                onClick={() => deleteMedication(medication)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete medication"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="p-2 bg-blue-100 rounded-full">
                <Pill className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="space-y-3 w-full pr-8">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {medication.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {medication.dosage} - {medication.frequency}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Start: {new Date(medication.startDate).toLocaleDateString()}</p>
                    {medication.endDate && (
                      <p>End: {new Date(medication.endDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                {medication.notes && (
                  <p className="mt-2 text-sm text-gray-600">{medication.notes}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <MedicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addMedication}
      />
    </div>
  )
}
