import { MessageBubble } from './MessageBubble'

interface MessageListProps {
  messages: Array<{
    id: string
    text: string
    sent: boolean
    time: string
    status: 'pending' | 'sent' | 'delivered' | 'read'
  }>
}

export function MessageList({ messages }: Readonly<MessageListProps>) {
  return (
    <div 
      className="flex-1 overflow-y-auto p-4 space-y-4"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e5ddd5'/%3E%3Cpath d='M0,50 Q25,40 50,50 T100,50 L100,100 L0,100 Z' fill='%23d7ccc8' opacity='0.3'/%3E%3C/svg%3E")`,
        backgroundSize: '400px'
      }}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  )
}