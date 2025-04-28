import { createFileRoute } from '@tanstack/react-router'
import { MedicationsTab } from '../components/health-dashboard/medications/MedicationsTab'

export const Route = createFileRoute('/medications')({
  component: MedicationsTab,
})
