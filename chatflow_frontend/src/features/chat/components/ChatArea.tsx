'use client'

import { useChatStore } from '@/lib/store'
import { ChatHeader, MessageList, MessageInput, EmptyChatState, useChatMessages } from '../index'

export default function ChatArea() {
  const { currentContact, messages } = useChatStore()
  const { messageText, setMessageText, handleSendMessage, handleKeyDown } = useChatMessages()

  if (!currentContact) {
    return <EmptyChatState />
  }

  const currentMessages = messages.get(currentContact.id) || []

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader contact={currentContact} />
      <MessageList messages={currentMessages} />
      <MessageInput
        value={messageText}
        onChange={setMessageText}
        onKeyDown={handleKeyDown}
        onSend={handleSendMessage}
      />
    </div>
  )
}