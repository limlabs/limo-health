import { createFileRoute } from '@tanstack/react-router'
import { RecordsTab } from '../components/health-dashboard/records/RecordsTab'

export const Route = createFileRoute('/medical-records')({
  component: RecordsTab,
})
