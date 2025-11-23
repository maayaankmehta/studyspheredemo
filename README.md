# StudySphere Demo

[![GitHub stars](https://img.shields.io/github/stars/your-username/studyspheredemo?style=flat)](https://github.com/your-username/studyspheredemo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

**StudySphere** is a modern, feature‑rich learning‑management‑system (LMS) demo built with **Next.js 16**, **React 19**, and a suite of UI components from **Radix UI**, **Lucide**, and **Tailwind CSS**.  It showcases a clean architecture, responsive design, and best‑practice tooling for rapid development of educational platforms.

> **Note:** This repository is a demo / starter kit.  It contains the front‑end implementation and a minimal back‑end scaffold (see the `backend/` folder) that can be extended for real‑world use.

## Features

- **Dynamic routing** with Next.js App Router
- **Dark / Light theme** support via `next-themes`
- **Accessible UI components** (accordions, dialogs, dropdowns, etc.) powered by Radix UI
- **Form handling & validation** using `react-hook-form` and `zod`
- **State‑of‑the‑art animations** with `tailwindcss-animate` and `sonner` toast notifications
- **Responsive layout** built with CSS Grid & Flexbox, fully mobile‑first
- **Analytics** integration via `@vercel/analytics`
- **Testing hooks** ready for Jest / React Testing Library (not included yet)

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (React 19) |
| **Styling** | Tailwind CSS 4, Tailwind‑merge, CSS‑in‑JS utilities |
| **UI Components** | Radix UI, Lucide‑React |
| **Form & Validation** | React Hook Form, Zod |
| **State Management** | React Context + Hooks |
| **Animations** | tailwindcss‑animate, sonner |
| **Date handling** | date‑fns |
| **HTTP** | Axios |
| **Build Tools** | Vite (via Next), ESLint, Prettier |
| **Package Manager** | npm (lockfile `package-lock.json`) |

## Getting Started

### Prerequisites

- **Node.js** (v20 or later) – [download](https://nodejs.org/)
- **npm** (comes with Node) or **pnpm** if you prefer

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/studyspheredemo.git
cd studyspheredemo

# Install dependencies
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.  The server supports hot‑reloading; any changes you make will be reflected instantly.

### Building for Production

```bash
npm run build   # Compile the app
npm start       # Start the production server
```

### Linting & Formatting

```bash
npm run lint    # Run ESLint
npm run format  # (If configured) Run Prettier
```

## Project Structure

```
studyspheredemo/
├─ app/                # Next.js App Router pages & layout files
├─ backend/            # Minimal Express/Koa back‑end scaffold (extend as needed)
├─ components/         # Re‑usable UI components (Radix, custom)
├─ hooks/              # Custom React hooks
├─ lib/                # Utility libraries (e.g., API client)
├─ public/             # Static assets (favicon, images)
├─ styles/             # Global CSS / Tailwind config
├─ next.config.mjs     # Next.js configuration
├─ package.json        # Project metadata & scripts
└─ README.md           # This file
```

## Scripts Overview

| Script | Description |
|---|---|
| `dev` | Starts the Next.js development server |
| `build` | Generates an optimized production build |
| `start` | Runs the production build |
| `lint` | Executes ESLint to catch code issues |
| `test` | (Placeholder) Run unit/integration tests |

## Contributing

Contributions are welcome!  Follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/awesome-feature`)
3. Commit your changes with clear messages
4. Open a Pull Request describing the changes

Please ensure your code adheres to the existing linting rules and includes appropriate tests where applicable.

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

## Contact & Support

- **Author:** Your Name (<your.email@example.com>)
- **GitHub:** https://github.com/your-username/studyspheredemo

Feel free to open an issue for bugs, feature requests, or general questions.
