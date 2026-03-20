import { Settings, User, Bookmark, BookOpen, Users, MoreHorizontal, Plus } from 'lucide-react'

export interface MenuItemConfig {
  id: string
  icon?: React.ElementType
  label?: string
  avatar?: boolean
  divider?: boolean
  submenu?: boolean
}

export const menuItems: MenuItemConfig[] = [
  { id: 'genesis-block', icon: User, label: 'GenesisBlock', avatar: true },
  { id: 'add-account', icon: Plus, label: 'Add Account' },
  { id: 'divider-1', divider: true },
  { id: 'saved-messages', icon: Bookmark, label: 'Saved Messages' },
  { id: 'my-stories', icon: BookOpen, label: 'My Stories' },
  { id: 'contacts', icon: Users, label: 'Contacts' },
  { id: 'divider-2', divider: true },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'more', icon: MoreHorizontal, label: 'More', submenu: true }
]