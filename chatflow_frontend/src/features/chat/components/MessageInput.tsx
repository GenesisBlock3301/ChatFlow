import { Paperclip, Smile, Send } from 'lucide-react'

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onSend: () => void
}

export const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onKeyDown, onSend }) => {
  const canSend = value.trim().length > 0

  const handleAttachClick = () => {
    console.log('Attach file clicked')
  }

  const handleEmojiClick = () => {
    console.log('Emoji picker clicked')
  }

  const handleSendClick = () => {
    if (canSend) {
      onSend()
    }
  }

  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <button
          onClick={handleAttachClick}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:ring-offset-2 rounded-full"
          aria-label="Attach file"
          type="button"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#0088cc] text-gray-900 placeholder-gray-500"
            aria-label="Message input"
          />
        </div>
        <button
          onClick={handleEmojiClick}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:ring-offset-2 rounded-full"
          aria-label="Add emoji"
          type="button"
        >
          <Smile className="w-5 h-5" />
        </button>
        <button
          onClick={handleSendClick}
          disabled={!canSend}
          className="p-2 bg-[#0088cc] text-white rounded-full hover:bg-[#006ba1] disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:ring-offset-2"
          aria-label="Send message"
          type="button"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}