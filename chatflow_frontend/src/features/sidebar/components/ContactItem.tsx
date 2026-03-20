import React from "react";
import { DefaultAvatar } from './DefaultAvatar';

interface ContactItemProps {
  contact: {
    id: string
    name: string
    avatar: string
    lastMessage: string
    lastMessageTime: string
    online: boolean
  }
  onClick: () => void
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 text-left focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:ring-offset-2 transition-colors duration-200"
      aria-label={`Open chat with ${contact.name}`}
    >
      <div className="relative w-12 h-12 mr-3">
        <DefaultAvatar name={contact.name} size="md" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
          <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
      </div>
      {contact.online && (
        <div className="w-2 h-2 bg-green-500 rounded-full ml-2" aria-hidden="true" />
      )}
    </button>
  )
}