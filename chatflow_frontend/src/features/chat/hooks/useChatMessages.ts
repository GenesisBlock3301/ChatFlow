import { useState, useCallback } from 'react'
import { useChatStore } from '@/lib/store'

export function useChatMessages() {
  const { currentContact, addMessage } = useChatStore()
  const [messageText, setMessageText] = useState('')

  const handleSendMessage = useCallback(() => {
    if (!messageText.trim() || !currentContact) return

    const newMessage = {
      id: Date.now().toString(),
      text: messageText,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as const
    }

    addMessage(currentContact.id, newMessage)
    setMessageText('')
  }, [messageText, currentContact, addMessage])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  return {
    messageText,
    setMessageText,
    handleSendMessage,
    handleKeyDown
  }
}