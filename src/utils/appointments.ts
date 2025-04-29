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

function generateUniqueId(existingIds: string[]): string {
  const timestamp = Date.now()
  let id = `apt${timestamp}`
  let counter = 1
  
  while (existingIds.includes(id)) {
    id = `apt${timestamp}_${counter}`
    counter++
  }
  
  return id
}

export function useCreateAppointment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (appointment: Omit<Appointment, 'id'>) => {
      const currentAppointments = await readAppointments()
      const existingIds = currentAppointments.map((apt: Appointment) => apt.id)
      const newAppointment = {
        ...appointment,
        id: generateUniqueId(existingIds)
      }
      await writeAppointments([...currentAppointments, newAppointment])
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
      // Remove all duplicates and then filter out the appointment to delete
      const uniqueAppointments = appointments.reduce((acc: Appointment[], curr: Appointment) => {
        if (!acc.some(apt => apt.id === curr.id)) {
          acc.push(curr)
        }
        return acc
      }, [])
      const updatedAppointments = uniqueAppointments.filter((apt: Appointment) => apt.id !== id)
      await writeAppointments(updatedAppointments)
      return id // Return the deleted ID
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    }
  })
}
