import { useState, useRef } from 'react'
import { MoreSubmenu } from './MoreSubmenu'
import { MenuItem } from './MenuItem'
import { MenuItemWithAvatar } from './MenuItemWithAvatar'
import { MenuDivider } from './MenuDivider'
import { menuItems } from '../constants/menuItems'

interface DropdownMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose }) => {
  const [isMoreSubmenuOpen, setIsMoreSubmenuOpen] = useState(false)
  const [moreButtonRect, setMoreButtonRect] = useState<DOMRect | null>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)

  if (!isOpen) return null

  const handleMoreClick = () => {
    if (moreButtonRef.current) {
      setMoreButtonRect(moreButtonRef.current.getBoundingClientRect())
    }
    setIsMoreSubmenuOpen(!isMoreSubmenuOpen)
  }

  const handleMoreItemClick = (item: string) => {
    console.log(`Clicked on: ${item}`)
    setIsMoreSubmenuOpen(false)
    onClose()
  }

  const renderMenuItem = (item: typeof menuItems[0]) => {
    if (item.divider) {
      return <MenuDivider key={item.id} />
    }

    if (item.avatar && item.label) {
      return (
        <MenuItemWithAvatar
          key={item.id}
          label={item.label}
          onClick={() => onClose()}
        />
      )
    }

    if (item.icon && item.label) {
      return (
        <MenuItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          hasSubmenu={item.submenu}
          onClick={item.submenu ? handleMoreClick : () => onClose()}
          ref={item.submenu ? moreButtonRef : undefined}
        />
      )
    }

    return null
  }

  return (
    <nav className="absolute left-0 top-full mt-2 z-50">
      <div className="w-64 bg-white rounded-lg shadow-lg border border-gray-200">
        {menuItems.map(renderMenuItem)}
      </div>
      <MoreSubmenu
        isOpen={isMoreSubmenuOpen}
        onClose={() => setIsMoreSubmenuOpen(false)}
        onItemClick={handleMoreItemClick}
        anchorRect={moreButtonRect}
      />
    </nav>
  )
}