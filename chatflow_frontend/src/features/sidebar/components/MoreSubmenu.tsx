import { Moon, Zap, Code, Sparkles, Bug } from 'lucide-react'

interface MoreSubmenuItem {
  id: string
  icon?: React.ElementType
  label?: string
  divider?: boolean
}

interface MoreSubmenuProps {
  isOpen: boolean
  onClose: () => void
  onItemClick: (item: string) => void
  anchorRect?: DOMRect | null
}

const moreMenuItems: MoreSubmenuItem[] = [
  { id: 'dark-mode', icon: Moon, label: 'Disable Dark Mode' },
  { id: 'animations', icon: Zap, label: 'Disable Animations' },
  { id: 'divider-1', divider: true },
  { id: 'switch-version', icon: Code, label: 'Switch to A version' },
  { id: 'features', icon: Sparkles, label: 'Telegram Features' },
  { id: 'report-bug', icon: Bug, label: 'Report Bug' },
]

export function MoreSubmenu({ isOpen, onClose, onItemClick, anchorRect }: Readonly<MoreSubmenuProps>) {
  if (!isOpen) return null

  const handleItemClick = (label: string) => {
    onItemClick(label)
    onClose()
  }

  return (
    <nav className="absolute left-full ml-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-60" style={{ position: 'absolute', left: '100%', marginLeft: '8px', top: anchorRect ? `${anchorRect.top}px` : '0px' }}>
      {moreMenuItems.map((item) => {
        if (item.divider) {
          return <hr key={item.id} className="border-gray-200 my-1" />
        }

        const IconComponent = item.icon
        return (
          <button
            key={item.id}
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100"
            onClick={() => handleItemClick(item.label!)}
          >
            {IconComponent && <IconComponent className="w-5 h-5 mr-3 text-gray-600" />}
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}