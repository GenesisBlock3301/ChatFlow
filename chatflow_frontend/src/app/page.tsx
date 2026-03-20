'use client'

import { Sidebar } from '@/features/sidebar'
import { ChatArea } from '@/features/chat'

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ChatArea />
    </div>
  )
}