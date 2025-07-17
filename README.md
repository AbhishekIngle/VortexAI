# VortexAI
This is a ChatBot created using ReactJS.
Gemini Chat App

Overview:
A ReactJS-based conversational AI chat app with OTP login, chatroom management, and features like image uploads, infinite scroll, dark mode, and responsive design.

Live Demo: [Vercel/Netlify URL]

Tech Stack:
    Framework: React 18
    State Management: Zustand
    Styling: Tailwind CSS
    Form Validation: React Hook Form + Zod
    Routing: react-router-dom
    Deployment: Vercel

Setup:
    Clone the repo: git clone <repo-url>
    Navigate to the project: cd gemini-chat-app
    Install dependencies: npm install
    Run the app: npm run dev

Open http://localhost:5173

Features:
    OTP-based authentication with country code selection (restcountries.com API)
    Chatroom creation/deletion with toast notifications
    Chat UI with AI responses, image uploads, reverse infinite scroll, and copy-to-clipboard
    Responsive design with dark mode toggle
    Debounced search for chatrooms
    Keyboard accessibility and loading skeletons

Implementation Details:
    Throttling: lodash.throttle limits AI responses to every 2 seconds.
    Pagination: Client-side pagination with 20 messages per page.
    Infinite Scroll: Intersection Observer for loading older messages.
    Form Validation: Zod schemas for phone number and OTP.
    localStorage: Persists auth, chatrooms, and messages.

