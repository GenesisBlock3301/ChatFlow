interface MenuDividerProps {
  className?: string
}

export const MenuDivider: React.FC<MenuDividerProps> = ({ className = "border-gray-200 my-1" }) => {
  return <hr className={className} />
}