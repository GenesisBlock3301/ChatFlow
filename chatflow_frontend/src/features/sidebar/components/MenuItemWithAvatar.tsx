interface MenuItemWithAvatarProps {
  label: string
  onClick: () => void
}

export const MenuItemWithAvatar: React.FC<MenuItemWithAvatarProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition-colors duration-200"
    >
      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mr-3 flex items-center justify-center">
        <span className="text-white text-xs font-semibold">G</span>
      </div>
      <span className="flex-1 text-left">{label}</span>
    </button>
  )
}