# Agentra

## 📖 Project Description
Agentra is a robust identity portal and authentication system built for modern web applications. The project provides a secure, production-ready environment featuring comprehensive Supabase-based authentication, including email and Google OAuth integration. 

Designed with security and user experience in mind, Agentra implements server-side SSR middleware for strict route protection, a secure demo bypass mode for presentations, and a highly polished UI that delivers a seamless onboarding and login experience. It was developed to meet professional standards and is optimized for hackathon submissions.

## 🚀 Setup Instructions

Follow these steps to run the Agentra application locally:

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd Agentra
   ```

2. **Install dependencies:**
   Ensure you have Node.js (v18+) installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📦 Dependencies

The project is built on a modern, high-performance tech stack:
- **Core Framework:** Next.js (v13.5) with App Router, React (v18), TypeScript
- **Authentication & Backend:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **Styling & UI:** Tailwind CSS, Radix UI Primitives, `shadcn/ui`, Framer Motion (for animations)
- **Forms & Validation:** React Hook Form, Zod, `@hookform/resolvers`
- **Data Visualization:** Recharts
- **Utilities:** date-fns, sonner (for toast notifications), lucide-react (icons)

## 🏗️ Architecture Overview

Agentra employs a modern Next.js server-rendered architecture:
- **Frontend Layer:** Utilizes Next.js App Router for optimized routing and layout management. The UI is component-driven, leveraging Tailwind CSS for utility-first styling and Framer Motion for fluid animations.
- **Authentication Flow:** Deeply integrated with Supabase. It uses both client-side and server-side rendering (SSR) techniques to handle sessions. Email/Password and Google OAuth are supported natively.
- **Middleware Security:** Next.js Middleware acts as a gatekeeper, verifying Supabase authentication tokens on the edge before rendering protected routes, ensuring data security and preventing unauthorized access.
- **State & Forms:** Client-side interactions and complex forms are handled by React Hook Form with Zod schema validation to ensure robust data integrity before making API requests.

## 🤖 AI Tools Used

This project was developed with the assistance of advanced AI coding tools:
- **Antigravity (Gemini 3.1 Pro):** Acted as an autonomous coding assistant to implement complex Supabase SSR authentication workflows, resolve Google OAuth callback configuration errors, set up secure middleware route protection, and architect the overall identity lifecycle.

## 👥 Team Member Details

| Name | Role | Responsibilities |
| :--- | :--- | :--- |
| **[Your Name]** | Lead Engineer | Next.js architecture, Supabase integration, SSR middleware security, and UI/UX implementation. |
| **[Member 2 Name]** | [Role] | [Brief description of responsibilities] |
| **[Member 3 Name]** | [Role] | [Brief description of responsibilities] |

*(Please update the table above with your actual team member names and specific roles before your hackathon submission.)*
