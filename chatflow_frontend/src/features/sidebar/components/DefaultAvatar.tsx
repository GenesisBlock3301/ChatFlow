import React from "react";

interface DefaultAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-xl'
}

export const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ name, size = 'md' }) => {
  const initial = name.charAt(0).toUpperCase()
  
  // Generate a consistent gradient based on name
  const getGradient = (name: string) => {
    const colors = [
      ['from-purple-400', 'to-pink-400'],
      ['from-blue-400', 'to-cyan-400'],
      ['from-green-400', 'to-teal-400'],
      ['from-yellow-400', 'to-orange-400'],
      ['from-red-400', 'to-pink-400'],
      ['from-indigo-400', 'to-purple-400'],
    ]
    
    const index = name.codePointAt(0)! % colors.length
    return colors[index]
  }
  
  const [fromColor, toColor] = getGradient(name)
  
  return (
    <div 
      className={`${sizeClasses[size]} bg-gradient-to-br ${fromColor} ${toColor} rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}
      aria-label={`Avatar for ${name}`}
    >
      {initial}
    </div>
  )
}