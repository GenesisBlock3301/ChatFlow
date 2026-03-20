
import { ContactItem } from './ContactItem'
import React from "react";

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  online: boolean
}

interface ContactListProps {
  contacts: Contact[]
  onContactClick: (contact: Contact) => void
}

export const ContactList: React.FC<ContactListProps> = ({ contacts, onContactClick }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClick={() => onContactClick(contact)}
        />
      ))}
    </div>
  )
}