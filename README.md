# inkflow — Warm Editorial Personal Finance Ledger

Crafted by **Jiddan Ibnu Ali** ([@4jeeh](https://github.com/4jeeh)).

**inkflow** is a personal finance web application designed around a **Warm Editorial Fintech with Hand-Drawn Doodles & Abstract Shapes** aesthetic. Moving away from sterile neon-purple templates, inkflow treats personal bookkeeping like a tactile editorial notebook—combining crisp typography, deep ink lines, hand-drawn SVG annotations, and real-time `localStorage` persistence.

## Visual & Design Philosophy

- **Canvas & Ink Palette**:
  - **Warm Cream / Paper Canvas**: `#FAF8F5`
  - **Deep Ink Borders & Typography**: `#1E1E24`
  - **Editorial Accents**: Tangerine (`#FB923C`), Cobalt (`#3B82F6`), and Sage (`#84CC16`)
- **Hand-Drawn Doodle Ornaments**:
  - Irregular hand-drawn highlight rings on key figures
  - Wavy ink underline beneath primary balance titles
  - Hand-sketched directional arrows and tilted sticky notes for personal financial memos
- **Typography**:
  - **UI & Numerical Ledger**: `Plus Jakarta Sans` & `Inter` (tabular figures)
  - **Handwritten Annotations**: `Caveat` & `Architects Daughter`

## Key Features

1. **Interactive Editorial Dashboard (`/`)**:
   - Real-time Net Balance, Monthly Cash Inflow, Outflow, and Savings Rate with hand-drawn doodle highlights and sticky-note reminders.
   - **High-Contrast Ink Cash Flow Chart**: Thick ink-stroke visualization comparing monthly income vs. expenses with interactive period filters and handwritten peak annotations.
   - **Interactive Transaction Ledger**: Add new income/expense transactions, filter by category or type, search entries, and persist everything in `localStorage`.
2. **Abstract Doodle Wallets (`/wallet`)**:
   - Multi-wallet cards featuring bespoke abstract geometric & hand-drawn SVG art (Main Checking, Creative Studio Vault, Daily Pocket).
   - Quick inter-wallet balance transfer and per-wallet transaction breakdown.
3. **Saving Goals & Sticky Targets (`/savings`)**:
   - Track personal saving milestones with ink-bordered progress bars, sticky-note motivations, instant fund top-ups, and custom goal creation stored in `localStorage`.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
