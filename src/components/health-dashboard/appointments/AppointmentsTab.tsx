import * as React from 'react'
import { Plus, Calendar, X } from 'lucide-react'
import { AppointmentModal } from './AppointmentModal'

import type { Appointment } from '../../../utils/appointments'
import { useAppointments, useCreateAppointment, useDeleteAppointment } from '../../../utils/appointments'

export function AppointmentsTab() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)


  const { data: appointments = [] } = useAppointments()
  const { mutate: addAppointment } = useCreateAppointment()
  const { mutate: removeAppointment } = useDeleteAppointment()

  const handleAddAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    addAppointment(appointmentData)
    setIsModalOpen(false)
  }

  const handleDeleteAppointment = (id: string) => {
    removeAppointment(id)
  }

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`)
    const dateB = new Date(`${b.date} ${b.time}`)
    return dateA.getTime() - dateB.getTime()
  })

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Upcoming Appointments</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Schedule Appointment
        </button>
      </div>

      <div className="grid gap-4">
        {sortedAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No upcoming appointments
          </div>
        ) : (
          sortedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start gap-4 p-4 bg-white rounded-lg border shadow-sm">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Dr. {appointment.doctorName}
                      </h3>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-right">
                        <p className="font-medium">
                          {new Date(appointment.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="p-1.5 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete appointment"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="mt-2 text-sm text-gray-600">{appointment.notes}</p>
                  )}
                </div>
            </div>
          ))
        )}
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAppointment}
      />
    </div>
  )
}
