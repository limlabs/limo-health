import { Link, Outlet } from '@tanstack/react-router'

export default function HealthDashboard() {
  return (
    <div className="space-y-4">
      <div className="flex border-b">
        <Link
          to="/appointments"
          className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          activeProps={{ className: 'px-4 py-2 border-b-2 border-blue-500 text-blue-600' }}
        >
          Appointments
        </Link>
        <Link
          to="/medications"
          className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          activeProps={{ className: 'px-4 py-2 border-b-2 border-blue-500 text-blue-600' }}
        >
          Medications
        </Link>
        <Link
          to="/medical-records"
          className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          activeProps={{ className: 'px-4 py-2 border-b-2 border-blue-500 text-blue-600' }}
        >
          Medical Records
        </Link>
      </div>
      <div className="space-y-4">
        <Outlet />
      </div>
    </div>
  )
}
