import * as React from 'react'
import { Plus, Calendar } from 'lucide-react'
import { AppointmentModal } from './AppointmentModal'

interface Appointment {
  id: string
  doctorName: string
  specialty: string
  date: string
  time: string
  notes: string
}

const initialAppointments: Omit<Appointment, 'id'>[] = [
  {
    doctorName: 'Sarah Johnson',
    specialty: 'General Checkup',
    date: '2025-05-10',
    time: '10:00',
    notes: 'Annual physical examination'
  },
  {
    doctorName: 'Michael Chen',
    specialty: 'Cardiology',
    date: '2025-05-15',
    time: '14:00',
    notes: 'Follow-up consultation'
  },
  {
    doctorName: 'Emily Rodriguez',
    specialty: 'Dental Cleaning',
    date: '2025-05-28',
    time: '09:00',
    notes: ''
  }
]

export function AppointmentsTab() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [appointments, setAppointments] = React.useState<Appointment[]>(
    initialAppointments.map((apt: Omit<Appointment, 'id'>) => ({
      ...apt,
      id: Math.random().toString(36).substring(7),
    }))
  )

  const handleAddAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Math.random().toString(36).substring(7),
    }
    setAppointments([...appointments, newAppointment])
  }

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`)
    const dateB = new Date(`${b.date} ${b.time}`)
    return dateA.getTime() - dateB.getTime()
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
              className="flex items-start gap-4 p-4 bg-white rounded-lg border shadow-sm"
            >
              <div className="p-2 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Dr. {appointment.doctorName}
                    </h3>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
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
