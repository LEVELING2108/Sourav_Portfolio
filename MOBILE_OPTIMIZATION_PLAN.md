# Mobile & Tablet Optimization Plan (Sketchbook Theme)

Saved roadmap for optimizing the **v2 · creative Sketchbook Portfolio** across mobile (`360px–640px`) and tablet (`640px–1024px`) devices.

---

## 1. Compact Mobile/Tablet Navbar (`components/sketch/SketchNav.tsx`)
- **Problem**: All 5 page links (`work`, `open source`, `tech stack`, `about`, `contact`) plus 4 action buttons (`resume ↓`, `♪ off`, `☾ blueprint`, `✦ classic`) currently wrap into 3–4 rows on phone screens (~180px tall header).
- **Implementation**:
  - Keep a single compact top bar on `< 1024px` (`lg:hidden`):
    - Left: `sourav.` star logo.
    - Right: `ThemeToggle`, `ClassicToggle`, and a hand-drawn **`☰ menu`** (`sk-box`) button.
  - When **`☰ menu`** is tapped, animate a notebook-paper dropdown/drawer (`sk-box hatch bg-card`) containing the 5 navigation links, `SoundToggle`, and `PaperPlaneResume`.

---

## 2. Convert Hover-Only Interactions to Touch & Viewport Triggers
Phones and tablets do not trigger `:hover` (`onMouseEnter`) while scrolling, leaving several signature interactions hidden on touch screens.

1. **Self-Drawing Portrait (`components/sketch/SelfDrawingPortrait.tsx`)**
   - Add `onClick={() => setHover((prev) => !prev)}` to the polaroid container so tapping toggles between the developed photo and the 62-path SVG sketch.
   - Update caption note to show `(tap to see the sketch)` on touch screens (`@media (hover: none)`).

2. **Self-Sketching Architecture Diagrams**
   - **Files**:
     - `components/sketch/features.tsx` (`SketchFlow`)
     - `components/projects/SketchCaseStudy.tsx` (`02 — How it works`)
     - `components/stack/SketchStack.tsx` (`The shape of a typical build`)
   - Add `onViewportEnter` (via Framer Motion `whileInView` or `IntersectionObserver` on `(hover: none)`) and `onClick` so architecture boxes and arrows automatically sketch themselves in when scrolled into view or tapped on mobile/tablet.

3. **Project Card Screenshots (`components/home/SketchHome.tsx`, `components/projects/SketchProjects.tsx`)**
   - Transition project card screenshots from `grayscale` to full colour when the card scrolls into the center of the viewport on touch devices (or when tapped).

4. **Red-Pen Margin Notes (`components/sketch/features.tsx` — `RedPenNote`)**
   - Add `onClick={() => setOn((prev) => !prev)}` so tapping a metric reveals/hides the teacher's red-pen note on touch screens.
   - Clamp horizontal positioning on mobile (`max-sm:left-2 max-sm:right-auto max-sm:whitespace-normal`) so notes never overflow the right edge of narrow viewports.

---

## 3. Responsive Architecture Flow Layouts
- **Problem**:
  - `SketchFlow` (`components/sketch/features.tsx`) places 4 boxes + 3 arrows in a single non-wrapping horizontal row (`flex items-stretch gap-1`), squeezing each box to ~65px wide on 375px screens.
- **Implementation**:
  - Switch `SketchFlow` `<ol>` on `< 640px` to a **2×2 grid** (`grid grid-cols-2 gap-2 sm:flex sm:items-stretch sm:gap-1`) and hide the tiny horizontal connector arrows on `< 640px` (`hidden sm:block`) or replace them with step numbers (`01` → `04`).
  - In `SketchCaseStudy.tsx` (`02 — How it works`) and `SketchStack.tsx` (`The shape of a typical build`), stack the 4–5 architecture boxes vertically on `< 640px` (`max-sm:flex-col`) and rotate the SVG connector arrows `90deg` downward (`max-sm:rotate-90 max-sm:self-center`).

---

## 4. Mascot Speech Bubble & Sizing on Narrow Screens (`components/sketch/Mascot.tsx`)
- **Problem**:
  - Speech bubbles use `right-[70%]` or `left-[55%]` with `whitespace-nowrap`, which can clip off-screen when the mascot sits near the left or right viewport edge on `< 640px`.
- **Implementation**:
  - On `< 640px`, center the speech bubble above the mascot (`max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 max-sm:text-[20px]`).
  - Scale the mascot image slightly on phones (`max-sm:w-[110px] max-sm:h-[110px]`).

---

## 5. Tech Stack Inspector Placement on Mobile/Tablet (`components/stack/SketchStack.tsx`)
- **Problem**:
  - On `< 1024px`, the yellow sticky inspector card (`selected tool` + `shipped in N places`) wraps below all 7 tool category cards. Tapping a tool chip at the top of the page updates the yellow card far below the fold.
- **Implementation**:
  - Place the yellow inspector card **above** the tool grid on `< 1024px` (`order-first lg:order-last`) or dock it as a compact sticky bar at the top/bottom of the viewport on mobile so tapping any tool chip gives immediate visual feedback.

---

## 6. Mobile Spacing, Typography & Timeline Gutters
- **Vertical Section Padding**:
  - Scale down large desktop top/bottom paddings on mobile across `SketchHome.tsx`, `SketchProjects.tsx`, `SketchCaseStudy.tsx`, `SketchOSS.tsx`, `SketchStack.tsx`, `SketchAbout.tsx`, and `SketchContact.tsx` (e.g., `pt-12 sm:pt-[72px]`, `pt-14 sm:pt-24`, `pb-12 sm:pb-20`).
- **Timeline Indentation**:
  - In `SketchOSS.tsx`: reduce the commit timeline left padding from `pl-[52px]` to `pl-9 sm:pl-[52px]` (and dot offset `-left-9 sm:-left-[52px]`) so PR cards have 16px more width on phones.
  - In `SketchAbout.tsx`: stack the year badge above each timeline item on `< 480px` or keep a tighter left gutter so the title and body text have full reading width.
- **Footer CLI (`components/sketch/features.tsx` — `CommandLine`)**:
  - Make the command input responsive (`w-full sm:w-[230px]`) so the footer command box stretches cleanly across mobile screens without overflowing.
