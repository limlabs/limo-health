import { createFileRoute } from '@tanstack/react-router'
import { AppointmentsTab } from '../components/health-dashboard/appointments/AppointmentsTab'

export const Route = createFileRoute('/appointments')({
  component: AppointmentsTab,
})
