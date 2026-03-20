# 📁 Project Structure Guide

This project follows a **feature-based** folder structure that promotes scalability, maintainability, and clear separation of concerns. This structure is ideal for large Next.js applications.

## 🏗️ Folder Structure Overview

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Shared, reusable components
│   ├── layout/            # Layout-specific components
│   │   └── providers.tsx  # App-wide providers
│   └── index.ts           # Barrel exports
├── features/              # Feature-based modules
│   ├── sidebar/           # Sidebar feature
│   │   ├── components/    # Sidebar-specific components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── ContactList.tsx
│   │   │   └── index.ts   # Feature barrel exports
│   │   ├── hooks/         # Sidebar-specific hooks
│   │   │   └── useClickOutside.ts
│   │   └── index.ts       # Feature barrel exports
│   └── chat/              # Chat feature
│       ├── components/    # Chat-specific components
│       │   ├── ChatArea.tsx
│       │   └── index.ts   # Feature barrel exports
│       └── index.ts       # Feature barrel exports
├── lib/                   # Shared libraries and utilities
│   └── store.ts           # Global state management
├── hooks/                 # Shared, reusable hooks
├── utils/                 # Shared utility functions
└── types/                 # Global TypeScript types
```

## 📋 Directory Purposes

### 📁 `app/`
**Purpose**: Next.js App Router pages and layouts
- Contains all route segments
- Each folder represents a route
- `layout.tsx` files define shared layouts
- `page.tsx` files define route content

### 📁 `components/`
**Purpose**: Shared, reusable UI components
- **Rule**: Only put components used by multiple features
- **Examples**: Buttons, Cards, Modals, Layout components
- **Sub-folders**:
  - `layout/`: Components that affect page layout
  - `common/`: Generic UI components
  - `forms/`: Form-specific components

### 📁 `features/`
**Purpose**: Feature-based modules (core of the architecture)
- **Rule**: Each feature is self-contained
- **Benefits**:
  - Easy to find related code
  - Simple to maintain and test
  - Clear feature boundaries
  - Easy to remove features

**Each feature contains**:
- `components/`: Feature-specific components
- `hooks/`: Feature-specific hooks
- `types/`: Feature-specific types
- `utils/`: Feature-specific utilities
- `api/`: Feature-specific API calls
- `index.ts`: Barrel exports for the feature

### 📁 `lib/`
**Purpose**: Shared libraries and configurations
- Global state management (Zustand, Redux, etc.)
- Database configurations
- API client configurations
- Third-party integrations

### 📁 `hooks/`
**Purpose**: Shared, reusable custom hooks
- Hooks used across multiple features
- Generic utility hooks
- **Examples**: `useLocalStorage`, `useDebounce`, `useMediaQuery`

### 📁 `utils/`
**Purpose**: Shared utility functions
- Pure functions used across the app
- **Examples**: `formatDate`, `validateEmail`, `cn` (className utility)

### 📁 `types/`
**Purpose**: Global TypeScript type definitions
- Shared interfaces and types
- Generic type utilities
- Third-party type declarations

## 🚀 Best Practices

### 1. **Feature-First Organization**
```typescript
// ✅ Good: Feature-based import
import { Sidebar } from '@/features/sidebar'

// ❌ Avoid: Deep component imports
import Sidebar from '@/features/sidebar/components/Sidebar'
```

### 2. **Barrel Exports**
Each feature has an `index.ts` file for clean imports:
```typescript
// features/sidebar/index.ts
export { Sidebar } from './components'
export { SearchBar } from './components'
export { useClickOutside } from './hooks'
```

### 3. **Component Co-location**
Keep related files together:
```
components/
├── SearchBar.tsx        # Component
├── SearchBar.test.tsx   # Tests
├── SearchBar.stories.tsx # Stories
└── SearchBar.types.ts   # Types
```

### 4. **Hook Organization**
```typescript
// Feature-specific hooks
features/sidebar/hooks/useSidebar.ts

// Shared hooks
hooks/useLocalStorage.ts
hooks/useMediaQuery.ts
```

### 5. **Type Safety**
```typescript
// Feature-specific types
features/sidebar/types/sidebar.types.ts

// Global types
types/api.types.ts
types/models.types.ts
```

## 🔄 Migration Strategy

When adding new features:
1. Create a new folder in `features/`
2. Follow the standard structure
3. Use barrel exports
4. Keep feature-specific code isolated

When refactoring existing code:
1. Identify feature boundaries
2. Move related files together
3. Update imports to use barrel exports
4. Test thoroughly

## 📊 Benefits of This Structure

### ✅ **Scalability**
- Easy to add new features
- Clear boundaries prevent conflicts
- Team can work on different features simultaneously

### ✅ **Maintainability**
- Related code is co-located
- Easy to understand feature scope
- Simple to refactor or remove features

### ✅ **Developer Experience**
- Clean import paths
- Consistent structure across features
- Easy to navigate and understand

### ✅ **Testing**
- Feature-specific tests are co-located
- Easy to test in isolation
- Clear test boundaries

## 🎯 Example Usage

```typescript
// Using features in pages
import { Sidebar } from '@/features/sidebar'
import { ChatArea } from '@/features/chat'
import { Button } from '@/components/common'

// Using shared utilities
import { formatDate } from '@/utils/date'
import { useLocalStorage } from '@/hooks'
```

This structure scales from small projects to enterprise applications and is used by many large Next.js applications in production.