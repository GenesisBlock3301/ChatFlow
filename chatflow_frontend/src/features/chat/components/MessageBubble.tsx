interface MessageBubbleProps {
  message: {
    id: string
    text: string
    sent: boolean
    time: string
    status: 'pending' | 'sent' | 'delivered' | 'read'
  }
}

export function MessageBubble({ message }: Readonly<MessageBubbleProps>) {
  const bubbleStyle = message.sent
    ? 'bg-[#dcf8c6] rounded-br-sm ml-auto'
    : 'bg-white rounded-bl-sm shadow-sm mr-auto'

  const textColor = message.sent ? 'text-gray-500' : 'text-gray-400'

  return (
    <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[60%] px-4 py-2 rounded-2xl ${bubbleStyle}`}>
        <p className="text-sm text-gray-900">{message.text}</p>
        <p className={`text-xs mt-1 ${textColor}`}>
          {message.time}
        </p>
      </div>
    </div>
  )
}