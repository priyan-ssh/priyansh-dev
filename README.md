# 🟩 Terminal Portfolio

> "Wake up, Neo..."

A high-performance, immersive **Terminal Portfolio** website inspired by *The Matrix*. Built with modern web technologies to deliver a nostalgic yet premium command-line experience.

![Terminal Demo](file:///home/priyansh/.gemini/antigravity/brain/1860e13d-154e-44d2-ba6b-f981b85b068a/portfolio_demo_retry_1763910658554.webp)

## ✨ Features

- **🖥️ Command Line Interface**: Navigate the site by typing commands like `help`, `about`, `projects`, and `contact`.
- **🟩 Matrix Aesthetic**: Authentic CRT scanlines, flicker effects, and a custom "Matrix Green" color palette.
- **⌨️ Autocomplete**: Press `Tab` to auto-complete commands for a true terminal feel.
- **📝 Interactive Forms**: A CLI-style step-by-step contact form.
- **🎨 ASCII Art**: Retro ASCII borders and tables for displaying content.
- **🚀 High Performance**: Built with Vite and React 19 for instant load times.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- pnpm (recommended) or npm/yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/priyan-ssh/Shell_Portfolio.git
    cd Shell_Portfolio
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Start the development server:
    ```bash
    pnpm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 Deployment

### GitHub Pages with Custom Domain

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

**Configuration Files:**
- **Workflow**: `.github/workflows/deploy.yml` (Builds and deploys on push to `main`)
- **Domain**: `public/CNAME` (Contains your custom domain `priyanssh.dev`)

### DNS Configuration (Porkbun)

To point your domain `priyanssh.dev` to this portfolio:

1.  **A Records** (Host: `@`):
    *   `185.199.108.153`
    *   `185.199.109.153`
    *   `185.199.110.153`
    *   `185.199.111.153`
2.  **CNAME Record** (Host: `www`):
    *   Target: `priyan-ssh.github.io`

*Note: DNS propagation can take up to 24 hours.*

## 📄 License

MIT © [Priyansh Soniya](https://priyanssh.dev)
