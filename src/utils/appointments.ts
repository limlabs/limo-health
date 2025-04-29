import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { readAppointments, writeAppointments } from '../api/appointments'

export interface Appointment {
  id: string
  doctorName: string
  specialty: string
  date: string
  time: string
  notes: string
}

export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: readAppointments
  })
}

export function useCreateAppointment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (appointment: Omit<Appointment, 'id'>) => {
      const newAppointment = {
        ...appointment,
        id: `apt${Date.now()}`
      }
      await writeAppointments([newAppointment])
      return newAppointment
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    }
  })
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const appointments = await readAppointments()
      const updatedAppointments = appointments.filter((apt: Appointment) => apt.id !== id)
      await writeAppointments(updatedAppointments)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    }
  })
}
