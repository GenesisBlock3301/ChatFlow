import { Moon, Zap, Code, Sparkles, Bug, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

interface MoreSubmenuItem {
  id: string
  icon?: React.ElementType
  label?: string
  divider?: boolean
  onClick?: () => void
}

interface MoreSubmenuProps {
  isOpen: boolean
  onClose: () => void
  onItemClick: (item: string) => void
  anchorRect?: DOMRect | null
}

export function MoreSubmenu({ isOpen, onClose, onItemClick, anchorRect }: Readonly<MoreSubmenuProps>) {
  const { theme, setTheme } = useTheme()
  const mountedRef = useRef(false)

  // Flip the ref to true once after the first paint.
  // No setState → no extra render → no ESLint warning.
  useEffect(() => {
    mountedRef.current = true
  }, [])

  if (!isOpen) return null

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const moreMenuItems: MoreSubmenuItem[] = [
    {
      id: 'dark-mode',
      icon: mountedRef.current && theme === 'dark' ? Sun : Moon,
      label: mountedRef.current && theme === 'dark' ? 'Disable Dark Mode' : 'Enable Dark Mode',
      onClick: toggleDarkMode,
    },
    { id: 'animations', icon: Zap, label: 'Disable Animations' },
    { id: 'divider-1', divider: true },
    { id: 'switch-version', icon: Code, label: 'Switch to A version' },
    { id: 'features', icon: Sparkles, label: 'Telegram Features' },
    { id: 'report-bug', icon: Bug, label: 'Report Bug' },
  ]

  const handleItemClick = (item: MoreSubmenuItem) => {
    item.onClick?.()
    if (item.label) onItemClick(item.label)
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
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition-colors"
            onClick={() => handleItemClick(item)}
          >
            {IconComponent && <IconComponent className="w-5 h-5 mr-3 text-gray-600" />}
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}