import { createFileRoute } from '@tanstack/react-router'
import ChatView from '../components/limo-chat/ChatView'

export const Route = createFileRoute('/limo-chat')({
  component: ChatView,
})
