---
name: "nextjs-typescript-patterns"
description: "Provides modern Next.js TypeScript patterns, component architecture, and coding standards. Invoke when user needs TypeScript best practices, component patterns, or code quality improvements."
---

# Next.js TypeScript Patterns & Standards

## 🎯 Component Architecture Patterns

### Props Interface Standards
```typescript
// ✅ CORRECT: Explicit, readonly interfaces
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}

// ❌ AVOID: Using 'any' or too generic types
interface Props {
  data: any     // No type safety
  onUpdate: any // Unclear contract
}
```

### Component Function Patterns
```typescript
// ✅ CORRECT: Arrow functions with explicit return types
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false,
  variant = 'primary',
  className = ''
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn-${variant} ${className}`}
    >
      {label}
    </button>
  )
}

// ❌ AVOID: Implicit types, missing exports
function Button(props) { // No type safety
  return <button {...props} />
}
```

## 🔄 State Management Patterns

### Zustand Store Patterns
```typescript
// ✅ CORRECT: Typed store with selectors
interface AppState {
  user: User | null
  messages: Message[]
  isLoading: boolean
  
  // Actions
  setUser: (user: User | null) => void
  addMessage: (message: Message) => void
  clearMessages: () => void
}

export const useAppStore = create<AppState>()(
  (set, get) => ({
    user: null,
    messages: [],
    isLoading: false,
    
    setUser: (user) => set({ user }),
    addMessage: (message) => set((state) => ({
      messages: [...state.messages, message]
    })),
    clearMessages: () => set({ messages: [] })
  })
)

// Usage with selective subscription
const user = useAppStore(state => state.user)
const addMessage = useAppStore(state => state.addMessage)
```

### Local State Patterns
```typescript
// ✅ CORRECT: Proper typing for useState
const [count, setCount] = useState<number>(0)
const [user, setUser] = useState<User | null>(null)
const [messages, setMessages] = useState<Message[]>([])

// ❌ AVOID: Implicit any types
const [data, setData] = useState() // Becomes any[]
const [loading, setLoading] = useState(false) // Should be boolean
```

## 🖥️ Server vs Client Component Patterns

### Server Components (Default)
```typescript
// app/page.tsx - Server Component
export default async function HomePage() {
  // ✅ Can fetch data directly
  const data = await fetch('/api/data')
  const posts = await data.json()
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### Client Components (With 'use client')
```typescript
// components/InteractiveButton.tsx
'use client'

import { useState } from 'react'

interface InteractiveButtonProps {
  initialCount: number
  onCountChange: (count: number) => void
}

export default function InteractiveButton({ 
  initialCount, 
  onCountChange 
}: InteractiveButtonProps) {
  const [count, setCount] = useState(initialCount)
  
  const handleClick = () => {
    const newCount = count + 1
    setCount(newCount)
    onCountChange(newCount)
  }
  
  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  )
}
```

## 📊 Data Fetching Patterns

### Server-Side Data Fetching
```typescript
// app/products/[id]/page.tsx
interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // ✅ Fetch data in server component
  const product = await getProduct(params.id)
  
  if (!product) {
    notFound()
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <ProductDetails product={product} />
    </div>
  )
}
```

### Client-Side Data Fetching with React Query
```typescript
// hooks/useProducts.ts
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// components/ProductList.tsx
'use client'

export function ProductList() {
  const { data: products, isLoading, error } = useProducts()
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

## 🎨 Styling Patterns (Tailwind)

### Component Styling
```typescript
// ✅ CORRECT: Conditional classes with clsx/tailwind-merge
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'highlighted'
  className?: string
}

export function Card({ children, variant = 'default', className }: CardProps) {
  const baseClasses = 'rounded-lg border p-6 shadow-sm'
  const variantClasses = {
    default: 'bg-white border-gray-200',
    highlighted: 'bg-blue-50 border-blue-200'
  }
  
  return (
    <div className={twMerge(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  )
}
```

## 🖼️ Image Optimization Patterns

### Next.js Image Component
```typescript
// ✅ CORRECT: Use Next.js Image for automatic optimization
import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  size?: number
}

export function Avatar({ src, alt, size = 40 }: AvatarProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-full object-cover"
        sizes={`${size}px`}
        priority={false} // Set to true for above-the-fold images
      />
    </div>
  )
}

// ❌ AVOID: Using regular img tags
// <img src="/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
```

### Image Loading Strategies
```typescript
// ✅ CORRECT: Lazy loading for below-the-fold images
export function ProductGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((src, index) => (
        <div key={index} className="relative aspect-square">
          <Image
            src={src}
            alt={`Product image ${index + 1}`}
            fill
            className="object-cover rounded-lg"
            loading={index < 3 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  )
}
```

## ♿ Accessibility Patterns

### Keyboard Navigation
```typescript
// ✅ CORRECT: Keyboard accessible buttons
export function IconButton({ 
  onClick, 
  icon: Icon, 
  label,
  disabled = false 
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <Icon className="w-5 h-5" />
    </button>
  )
}
```

### ARIA Labels and Roles
```typescript
// ✅ CORRECT: Proper ARIA attributes
export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div
      className={`max-w-[60%] px-4 py-2 rounded-2xl ${
        isOwn ? 'bg-blue-500 ml-auto' : 'bg-gray-200'
      }`}
      role="article"
      aria-label={`Message from ${message.sender} at ${message.time}`}
    >
      <p className="text-sm">{message.text}</p>
      <time className="text-xs opacity-75" dateTime={message.timestamp}>
        {message.time}
      </time>
    </div>
  )
}
```

### Form Accessibility
```typescript
// ✅ CORRECT: Accessible form inputs
export function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
          }
        }}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        aria-label="Message input"
        aria-describedby="message-help"
      />
      <button
        onClick={onSend}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Send message"
        disabled={!value.trim()}
      >
        Send
      </button>
    </div>
  )
}
```

## 📁 File Structure Standards

### Component File Organization
```
components/
├── ui/           # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── features/     # Feature-specific components
│   ├── chat/
│   │   ├── ChatArea.tsx
│   │   ├── MessageBubble.tsx
│   │   └── TypingIndicator.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       └── UserProfile.tsx
└── layouts/      # Layout components
    ├── Header.tsx
    ├── Footer.tsx
    └── Navigation.tsx
```

### Type Definitions
```typescript
// types/index.ts
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  online: boolean
}

export interface Message {
  id: string
  text: string
  senderId: string
  timestamp: Date
  status: 'pending' | 'sent' | 'delivered' | 'read'
}

export type MessageStatus = Message['status']
```

## 🚀 Performance Patterns

### Code Splitting
```typescript
// components/LazyComponent.tsx
const HeavyComponent = dynamic(
  () => import('./HeavyComponent').then(mod => mod.HeavyComponent),
  {
    loading: () => <LoadingSpinner />,
    ssr: false // Disable SSR if component uses browser APIs
  }
)

export function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <HeavyComponent />
      </Suspense>
    </div>
  )
}
```

### Memoization Patterns
```typescript
// ✅ CORRECT: Use React.memo for expensive components
const ExpensiveList = React.memo(function ExpensiveList({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map(item => (
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </div>
  )
})

// ✅ CORRECT: Use useMemo for expensive calculations
function Component({ data }: { data: Data[] }) {
  const processedData = useMemo(() => {
    return data
      .filter(item => item.active)
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [data])
  
  return <DataTable data={processedData} />
}
```

## 📋 Code Quality Checklist

### Before Committing
- [ ] All TypeScript errors resolved
- [ ] Props have explicit types (no `any`)
- [ ] Components are properly exported
- [ ] Error boundaries implemented where needed
- [ ] Loading states handled
- [ ] Accessibility attributes included
- [ ] Performance optimizations applied (memo, useMemo)
- [ ] Console logs removed
- [ ] Code follows project conventions

### Component Review
- [ ] Props are read-only (not mutated)
- [ ] State updates use functional updates when needed
- [ ] Effects have proper dependency arrays
- [ ] Event handlers are properly typed
- [ ] Conditional rendering is clear and efficient
- [ ] Styling follows Tailwind best practices
- [ ] Error states are handled gracefully
- [ ] Next.js Image component used instead of img tags
- [ ] Keyboard navigation supported for interactive elements
- [ ] ARIA labels and roles properly implemented

---

**Remember**: These patterns ensure type safety, performance, accessibility, and maintainability in your Next.js applications. Always prefer explicit types over `any`, and follow the principle of least surprise in your component APIs.