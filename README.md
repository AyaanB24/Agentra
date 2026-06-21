# Agentra

## 📖 Project Description
Agentra is a centralized AI Security Operating System designed to secure, monitor, and govern autonomous AI systems. It provides a comprehensive identity portal and security infrastructure built for modern web applications. The project enables proactive security audits, threat detection, trust evaluation, and policy enforcement for AI agents, ensuring they operate safely and reliably within organizational boundaries.

## 🚨 Problem Statement

As AI agents become increasingly autonomous, they introduce new security risks such as prompt injection attacks, data leakage, unauthorized tool usage, identity spoofing, and policy violations.

Organizations currently lack a unified platform to continuously monitor, test, validate, and govern AI agents throughout their lifecycle. Existing security solutions provide limited visibility into agent behavior and trustworthiness.

Agentra addresses this challenge by providing a centralized AI Security Operating System that enables proactive security audits, threat detection, trust evaluation, and policy enforcement for autonomous AI systems.

## 🚀 Setup Instructions

Follow these steps to run the Agentra application locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AyaanB24/Agentra.git
   cd Agentra
   ```

2. **Install dependencies:**
   Ensure you have Node.js (v18+) installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add your necessary environment variables, including Supabase credentials:
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

## 📦 Major Dependencies

**Frontend**
- React 19
- TypeScript
- TanStack Start
- TanStack Router
- Tailwind CSS
- Radix UI
- Lucide React

**State Management**
- TanStack Query
- React Hook Form
- Zod

**Database**
- SQLite
- LibSQL

**Utilities**
- jsPDF
- html2canvas
- date-fns

**Developer Tools**
- ESLint
- Prettier

## 🏗️ Architecture Overview

Agentra follows a multi-agent security architecture designed specifically for securing autonomous AI systems.

### Core Workflow

```text
User
↓
Agentra Dashboard
↓
Security Audit Engine
↓
Red Team Agent
↓
Judge Agent
↓
Blue Team Agent
↓
Trust Engine
↓
Security Reports & Logs
```

### Key Modules

- **Dashboard Overview:** Centralized monitoring of all connected agents.
- **Agent Registry:** Secure onboarding and identity management for autonomous entities.
- **Threat Center:** Real-time threat detection and alerting.
- **Security Lab:** Sandboxed environment for running adversarial simulations.
- **Policy Engine:** Enforcement of behavioral rules and access controls.
- **Behavioral DNA:** Continuous profiling of agent behavior to detect anomalies.
- **Audit Logs:** Immutable records of agent actions and decisions.
- **Trust Engine:** Dynamic risk scoring and trust evaluation models.

## 🤖 AI Integration & Tools Used

Agentra leverages AI-driven security workflows to evaluate and govern autonomous agents.

### AI Components

- **Red Team Agent**
  - Simulates adversarial attacks
  - Generates prompt injection scenarios
  - Tests agent resilience

- **Judge Agent**
  - Evaluates attack outcomes
  - Performs risk analysis
  - Produces explainable security reasoning

- **Blue Team Agent**
  - Applies defensive controls
  - Detects policy violations
  - Monitors tool usage

- **Trust Engine**
  - Calculates dynamic trust scores
  - Tracks behavioral drift
  - Generates security recommendations

### AI Technologies

- Microsoft Azure AI
- Azure OpenAI Service
- Prompt Engineering
- Multi-Agent Architecture
- Behavioral Analysis
- Trust Scoring Models
- Security Audit Simulation

## 👥 Team Members & Roles

### Ayaan Bargir
**Role:**
- Project Lead
- Full Stack Development
- System Architecture
- AI Workflow Design
- Security Lab Development

### Asiya
**Role:**
- UI/UX Design
- Research & Documentation
- Testing & Validation
- Presentation Design

**Team Name:** TEAM AGENTRA  
*Built for Microsoft Build AI Hackathon 2026.*

## 🚀 Future Scope

- Enterprise AI Governance
- Multi-Agent Security Monitoring
- Automated Compliance Audits
- SIEM Integration
- Cross-Agent Trust Networks
- Self-Healing Security Policies
- Advanced Threat Intelligence
