# Sourav Suman — Full-Stack & AI/ML Engineer Portfolio

A premium, high-performance developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Framer Motion 12**.

Features an **Apple-inspired 3D Interactive Project Deck** with finger touch drag/swipe gestures, a **`Cmd + K` Command Palette**, step-by-step **System Architecture Pipeline** breakdowns, a **7-Axis Tech Stack Radar Mesh**, direct **Resume PDF** download integration, and 1-click **Copy Email** glassmorphism notifications.

---

## ✨ Key Features

- **🍏 Apple-Inspired 3D Interactive Project Deck**:
  - **Single Focused Deck Layout**: Focuses 100% of space on a single active project card at a time with generous Apple-style whitespace.
  - **Touch Drag & Finger Swipe Gestures**: Mobile swipe support (`drag="x"`) allowing visitors to swipe left/right with their finger to transition projects smoothly.
  - **3D Cursor Tilt & Y-Axis Rotation Flip**: Real-time cursor-based 3D tilt using Framer Motion springs (`useMotionValue`, `useTransform`) and 3D 180° card flip revealing system architecture flows and key engineering solves.
  - **Multi-View Build Log**: Instant view toggle between **3D Deck Mode** (default), **Side Scroller Carousel**, and **PCB Trace Timeline**.

- **⌨️ `Cmd + K` Interactive Command Palette**:
  - Accessible via `Cmd + K` / `Ctrl + K` or the floating command trigger pill (`$ Command Palette ⌘K`).
  - Real-time search across site navigation routes (`/projects`, `/stack`, `/about`, `/contact`), actions (Copy Email, View Resume, GitHub, LinkedIn), and versioned project logs (`v1.0`–`v1.6`).

- **📜 Versioned Project Log (`v1.0` ➔ `v1.6`)**:
  - **`v1.0` ROADSoS** (SIH 2025 Internal Cleared · PWA · Emergency Response · Live Demo)
  - **`v1.1` FraudShield** (ML Anomaly Detection Platform · Real-Time Inference <25ms)
  - **`v1.2` NLP Text Classification Pipeline** (End-to-End MLOps Pipeline v1)
  - **`v1.3` Ledgerline** (Personal Finance Manager · Next.js + Recharts)
  - **`v1.4` CRM CSV Importer** (Applied LLM · Anthropic Structured JSON Extraction · Live Demo)
  - **`v1.5` ModelSentry API** (Production ML Inference Gateway · JWT Guard & Prometheus Telemetry)
  - **`v1.6` RailTrack Pro** (Indian Railways Track Fittings Management · Flask + React · SIH 2025 R2 · 30+ REST APIs · ~75%+ Test Coverage)

- **⚡ Terminal Hero & Squircle Frame**:
  - `$ whoami` terminal prompt paired with an oval-squircle photo frame, glowing ambient copper halo, active status pill (`Available for roles`), and quick action buttons for **view the log**, **Resume PDF**, and **GitHub**.

- **🕸️ 7-Axis Tech Stack Radar Mesh**:
  - Interactive SVG spider web graph providing domain filtering across: *Languages*, *Frontend*, *Backend*, *Database*, *System Design*, *DevOps & Tools*, and *Applied AI/ML*.

- **📄 Resume PDF & Copy Email Toast**:
  - Integrated 1-click **Resume PDF** download across Header Nav, Hero, Contact, and Command Palette.
  - Interactive **Copy Email** button with floating glassmorphism toast notification (`✓ Email Copied to Clipboard!`).

- **🌓 Light / Dark Mode Toggle**:
  - Top-right navigation theme toggle with `localStorage` state persistence and smooth 0.3s CSS variable color transitions.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: `JetBrains Mono` & `Inter` via `next/font/google`
- **Language**: TypeScript

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/LEVELING2108/Sourav_Portfolio.git
cd Sourav_Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📁 Repository Structure

```
Sourav_Portfolio/
├── app/
│   ├── components/
│   │   ├── Nav.tsx               # Sticky header + Light/Dark mode toggle + Resume PDF link
│   │   ├── Hero.tsx              # Terminal hero intro + Squircle avatar + Action buttons
│   │   ├── Projects.tsx          # Build Log container + View Mode toggle (Deck/Carousel/Timeline)
│   │   ├── ProjectDeck.tsx       # Single active card deck manager + keyboard & gesture events
│   │   ├── ProjectCard.tsx       # Apple-inspired 3D card with cursor tilt & Y-axis flip
│   │   ├── ProjectPreview.tsx    # Responsive high-res project image preview frame
│   │   ├── DeckControls.tsx     # Prev / Next deck navigation buttons
│   │   ├── ProgressIndicator.tsx # Deck progress pill counter & interactive indicator dots
│   │   ├── ProjectFlashcard.tsx  # Timeline card view + architecture steps
│   │   ├── TraceLine.tsx         # Animated vertical PCB copper trace line
│   │   ├── Skills.tsx            # Stack section with domain filters
│   │   ├── SkillsRadar.tsx       # 7-Axis SVG spider web radar graph
│   │   ├── SkillTile.tsx         # Monochromatic 3D skill tile
│   │   ├── About.tsx             # Bio & dual degree education cards (ECE + IIT Madras Data Science)
│   │   ├── Contact.tsx           # Contact section + 1-click Copy Email toast + LinkedIn link
│   │   ├── CommandPalette.tsx    # Cmd+K interactive terminal command palette modal
│   │   └── Footer.tsx            # Minimal footer
│   ├── data.ts                   # Centralized profile, education, stats & project data
│   ├── globals.css               # CSS variables & Tailwind v4 design tokens
│   ├── layout.tsx                # Root layout, Google Fonts & hydration suppress guard
│   └── page.tsx                  # Main single-page application entry
├── public/
│   ├── projects/                 # Custom AI-generated high-res project UI graphics
│   ├── resume.pdf                # Resume PDF file
│   └── sourav.jpeg               # Personal portrait avatar
├── package.json
└── README.md
```

---

## 🌐 Deployment

Import this repository on [Vercel](https://vercel.com) for zero-config automatic deployment:

1. Push your repository to GitHub.
2. Go to Vercel and click **New Project**.
3. Import `LEVELING2108/Sourav_Portfolio` and click **Deploy**.

---

## 📄 License

MIT © [Sourav Suman](https://github.com/LEVELING2108)
