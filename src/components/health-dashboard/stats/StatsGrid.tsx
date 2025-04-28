import { Heart, Stethoscope, Clock, User } from "lucide-react"

const stats = [
  {
    title: "Heart Rate",
    value: "72 BPM",
    description: "Normal range",
    progress: 72,
    icon: Heart,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-200"
  },
  {
    title: "Blood Pressure",
    value: "120/80",
    description: "Normal range",
    progress: 80,
    icon: Stethoscope,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-200"
  },
  {
    title: "Sleep",
    value: "7.5 hrs",
    description: "Last night",
    progress: 75,
    icon: Clock,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100"
  },
  {
    title: "Steps",
    value: "8,243",
    description: "Today",
    progress: 68,
    icon: User,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-50"
  }
]

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.title} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium">{stat.title}</h3>
              <Icon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded bg-blue-100">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
