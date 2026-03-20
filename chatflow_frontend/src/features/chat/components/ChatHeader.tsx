interface Contact {
  id: string
  name: string
  avatar: string
  online: boolean
}

import { DefaultAvatar } from '@/features/sidebar/components/DefaultAvatar'

interface ChatHeaderProps {
  contact: Contact
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => {
  const statusText = contact.online ? 'Online' : 'Offline'

  return (
    <header className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <DefaultAvatar name={contact.name} size="sm" />
        <div>
          <h2 className="font-semibold text-gray-900">{contact.name}</h2>
          <p className="text-sm text-gray-500">
            {statusText}
          </p>
        </div>
      </div>
    </header>
  )
}