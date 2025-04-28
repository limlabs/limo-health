import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-4 flex gap-4 bg-white text-black justify-between shadow-sm">
      <nav className="flex flex-row items-center gap-6">
        <div className="font-bold text-blue-600">
          <Link to="/">Limo EMR</Link>
        </div>
        <div className="flex gap-4">
          <Link 
            to="/medications"
            className="text-gray-600 hover:text-blue-600 transition-colors"
            activeProps={{ className: 'text-blue-600 font-medium' }}
          >
            Medications
          </Link>
          <Link 
            to="/appointments"
            className="text-gray-600 hover:text-blue-600 transition-colors"
            activeProps={{ className: 'text-blue-600 font-medium' }}
          >
            Appointments
          </Link>
          <Link 
            to="/medical-records"
            className="text-gray-600 hover:text-blue-600 transition-colors"
            activeProps={{ className: 'text-blue-600 font-medium' }}
          >
            Medical Records
          </Link>
        </div>
      </nav>
    </header>
  )
}
