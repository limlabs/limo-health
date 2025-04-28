"use client"

import { Heart, MessageSquare, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-blue-600" />
        <span className="text-lg font-semibold"> Limo HealthCare</span>
      </div>
      <nav className="ml-auto flex items-center gap-4 md:gap-6">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50">
          <PlusCircle className="h-5 w-5" />
          <span className="sr-only">New</span>
        </Button>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  )
}
