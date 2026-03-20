import { create } from 'zustand'

// Types
export interface Contact {
    id: string
    name: string
    avatar: string
    lastMessage: string
    lastMessageTime: string
    online: boolean
}

export interface Message {
    id: string
    text: string
    sent: boolean
    time: string
    status: 'pending' | 'sent' | 'delivered' | 'read'
}

export interface ChatState {
    contacts: Contact[]
    currentContact: Contact | null
    messages: Map<string, Message[]>
    isTyping: boolean
    searchTerm: string
    setCurrentContact: (contact: Contact | null) => void
    addMessage: (contactId: string, message: Message) => void
    setTyping: (typing: boolean) => void
    setSearchTerm: (term: string) => void
}

// Store
export const useChatStore = create<ChatState>((set) => ({
    contacts: [
        {
            id: '1',
            name: 'Alice Johnson',
            avatar: 'https://via.placeholder.com/50/FF6B6B/FFFFFF?text=A',
            lastMessage: 'Hey! How are you doing?',
            lastMessageTime: '10:30 AM',
            online: true
        },
        {
            id: '2',
            name: 'Bob Smith',
            avatar: 'https://via.placeholder.com/50/4ECDC4/FFFFFF?text=B',
            lastMessage: 'See you tomorrow!',
            lastMessageTime: 'Yesterday',
            online: false
        },
        {
            id: '3',
            name: 'Carol Davis',
            avatar: 'https://via.placeholder.com/50/45B7D1/FFFFFF?text=C',
            lastMessage: 'Thanks for the help 👍',
            lastMessageTime: '2 days ago',
            online: true
        }
    ],
    currentContact: null,
    messages: new Map([
        ['1', [
            { id: '1', text: 'Hey! How are you doing?', sent: false, time: '10:30 AM', status: 'read' },
            { id: '2', text: 'I\'m doing great! Just working on this project.', sent: true, time: '10:32 AM', status: 'read' },
            { id: '3', text: 'That sounds interesting! What kind of project?', sent: false, time: '10:35 AM', status: 'read' }
        ]],
        ['2', [
            { id: '4', text: 'See you tomorrow!', sent: false, time: 'Yesterday', status: 'read' },
            { id: '5', text: 'Looking forward to it!', sent: true, time: 'Yesterday', status: 'read' }
        ]]
    ]),
    isTyping: false,
    searchTerm: '',

    setCurrentContact: (contact) => set({ currentContact: contact }),
    addMessage: (contactId, message) => set((state) => {
        const newMessages = new Map(state.messages)
        const contactMessages = newMessages.get(contactId) || []
        newMessages.set(contactId, [...contactMessages, message])
        return { messages: newMessages }
    }),
    setTyping: (typing) => set({ isTyping: typing }),
    setSearchTerm: (term) => set({ searchTerm: term })
}))