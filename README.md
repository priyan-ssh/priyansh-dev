# 🟩 Terminal Portfolio

> "Wake up, Neo..."

A high-performance, immersive **Terminal Portfolio** website inspired by *The Matrix*. Built with modern web technologies to deliver a nostalgic yet premium command-line experience.

![Terminal Demo](file:///home/priyansh/.gemini/antigravity/brain/1860e13d-154e-44d2-ba6b-f981b85b068a/portfolio_demo_retry_1763910658554.webp)

# Terminal Portfolio

A developer portfolio website featuring a fully interactive terminal interface, built with React, TypeScript, and Vite.

## Features

- **Interactive Terminal**: Full command-line interface with history, autocomplete, and typing animations.
- **View System**: Seamless navigation between Home, About, Projects, and Contact views using `cd` commands.
- **Project Details**: Deep dive into projects with `cd projects/<id>`, featuring simulated data loading and terminal-style rendering.
- **Nested Navigation**: Support for direct path navigation (e.g., `cd projects/chat-app`).
- **Custom Theming**: CRT effects, matrix rain boot sequence, and strict terminal aesthetics.
- **Responsive Design**: Optimized for both desktop and mobile terminal experiences.

## Tech Stack

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: Wouter (simulated via state)
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
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
