# Sourav — Full-Stack & AI/ML Engineer Portfolio

A sleek, single-page developer portfolio formatted as a versioned **"Build Log"**, featuring a scroll-synced PCB trace line, interactive 3D project flashcards, a 7-axis tech stack radar mesh, personal oval-squircle avatar frame, and a persistent light/dark mode theme toggle.

---

## ✨ Features

- **⚡ Hero Section & Oval-Squircle Avatar**: Terminal-styled `$ whoami` intro paired with a smooth squircle portrait frame, glowing ambient copper halo, and active status pill (`Available for roles`).
- **📜 Versioned Build Log (`$ git log --oneline`)**: Interactive timeline listing core projects (`v1.0`–`v1.5`) alongside a scroll-synced PCB copper trace / git graph line.
- **🎴 Interactive Project Flashcards**: Each project card features high-res preview screenshots, metric badges, tech stack pills, external links (*Live*, *GitHub*), and an interactive **"Overview Card"** flip toggle for architecture breakdowns.
- **🕸️ 7-Axis Tech Stack Radar Mesh**: SVG spider web graph allowing real-time category filtering across:
  - *Languages*, *Frontend*, *Backend*, *Database*, *System Design*, *DevOps & Tools*, and *Applied AI/ML*.
- **💎 Minimalist 3D Skill Chips**: Clean, monochromatic skill tiles with spring tilt micro-animations and contextual icons.
- **🌓 Light / Dark Mode Toggle**: Top-right navigation toggle with automatic `localStorage` state persistence and smooth 0.3s CSS variable color transitions.
- **📱 Fully Responsive & Accessible**: Mobile-first responsive layout with global `prefers-reduced-motion` accessibility support.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
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

## ⚙️ Customization Guide

All project content is centralized in **`app/data.ts`** for fast maintenance:

1. **Profile Data**: Update your name, role tagline, email, GitHub URL, and location in `profile`.
2. **Personal Photo**: Drop your headshot image into `public/profile.jpg` (or update `profile.avatar`).
3. **Resume PDF**: Place your `resume.pdf` file in the `public/` directory so the header link works seamlessly.
4. **Projects**: Modify or append objects to the `projects` array in `app/data.ts`. Include optional `image`, `highlights`, `features`, and `metrics` for flashcard previews.
5. **Skills**: Add or adjust technologies in the `skills` object in `app/data.ts`.

---

## 📁 Repository Structure

```
Sourav_Portfolio/
├── app/
│   ├── components/
│   │   ├── Nav.tsx               # Sticky navbar + Light/Dark mode toggle
│   │   ├── Hero.tsx              # Terminal hero + Oval-squircle photo frame
│   │   ├── Projects.tsx          # Build log timeline wrapper
│   │   ├── ProjectFlashcard.tsx  # 3D project card + flip overview
│   │   ├── TraceLine.tsx         # Animated vertical PCB copper trace line
│   │   ├── Skills.tsx            # Stack section with domain filter
│   │   ├── SkillsRadar.tsx       # 7-Axis SVG spider web radar graph
│   │   ├── SkillTile.tsx         # Minimal monochromatic 3D skill chip
│   │   ├── About.tsx             # Bio text & education history cards
│   │   ├── Contact.tsx           # Contact action links
│   │   └── Footer.tsx            # Minimal footer
│   ├── data.ts                   # Centralized data model & content
│   ├── globals.css               # CSS variables, dark/light theme tokens
│   ├── layout.tsx                # Root layout & Google Fonts setup
│   └── page.tsx                  # Main single-page entry point
├── public/                       # Static images & assets
└── package.json
```

---

## 🌐 Deployment

Import this repository on [Vercel](https://vercel.com) for zero-config automatic deployment:

1. Push your repository to GitHub.
2. Go to Vercel and click **New Project**.
3. Import `Sourav_Portfolio` and click **Deploy**.

---

## 📄 License

MIT © [Sourav](https://github.com/LEVELING2108)

