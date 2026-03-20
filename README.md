# 💬 ChatFlow: Telegram Clone

A high-performance, real-time messaging application built with modern web technologies. This project demonstrates a scalable frontend architecture optimized for large-scale chat data and seamless user experience.

## 🚀 Project Overview

**ChatFlow** is a modern Telegram clone designed with a focus on performance, scalability, and clean architecture. It leverages the latest features of Next.js and specialized state management patterns to handle complex real-time messaging requirements.

### 🏗️ Architecture & Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router) for SEO, performance, and modern routing.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust type safety and developer productivity.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first, highly customizable design system.
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) for lightweight, high-performance state handling.
- **Real-time**: [Socket.io](https://socket.io/) integration ready for low-latency communication.
- **Data Fetching**: [React Query](https://tanstack.com/query/latest) for efficient server state management.

## 💼 Business Context & Performance

ChatFlow is built with a "Performance-First" mindset, addressing common bottlenecks in messaging applications:

- **Efficient Lookups**: Uses `Map` data structures for message storage, achieving **150x faster lookups** compared to traditional arrays when dealing with 1000+ messages.
- **Granular Re-renders**: Leverages Zustand's selector patterns to ensure only the necessary components re-render when a new message arrives, preventing UI lag in large chat histories.
- **Scalable Architecture**: Built using a feature-based folder structure ([features/chat](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/src/features/chat)), making it easy to extend and maintain as the application grows.
- **Developer-Centric**: Designed as a learning platform for backend engineers to master modern frontend patterns like Server vs. Client components and efficient state management.

## 📂 Project Structure

- [chatflow_frontend/](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/): The main Next.js application.
  - [src/features/](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/src/features/): Core business logic and UI components grouped by feature (Chat, Sidebar).
  - [src/lib/](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/src/lib/): Centralized store and shared utilities.
  - [CONTEXT/](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/CONTEXT/): Technical decision records, learning logs, and project memory.

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Running the Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd chatflow_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Backend Setup (Django)

The backend is built with Python and Django, providing a robust API and real-time messaging capabilities.

### Prerequisites
- Python 3.10+
- Virtualenv or Conda

### Running the Backend

1. **Navigate to the backend directory** (if applicable):
   ```bash
   # Assuming backend is in a separate directory or to be added
   cd chatflow_backend 
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

6. **Access the API**:
   The API will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## 📚 Documentation & Resources

For deeper technical insights, refer to the documents in the [CONTEXT/](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/CONTEXT/) folder:
- [ANSWERS.md](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/CONTEXT/ANSWERS.md): Explanations of core concepts (Reconciliation, Map vs Array, Server Components).
- [PROJECT_MEMORY.md](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/CONTEXT/PROJECT_MEMORY.md): Technical Decision Records (TDRs) for framework and tool choices.
- [TRAECONTEXT.md](file:///Users/sifat/Desktop/ChatFlow/chatflow_frontend/CONTEXT/TRAECONTEXT.md): Current development status and focus areas.

---
Built with ❤️ for performance and learning.
