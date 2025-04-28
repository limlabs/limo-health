import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/Header'
import { StatsGrid } from '../components/health-dashboard/stats/StatsGrid'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-1 flex-col gap-4 md:gap-8">
          <StatsGrid />
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
})
