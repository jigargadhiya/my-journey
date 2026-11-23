# Jigar Gadhiya - Interactive Professional Journey & Architectural Resume

An interactive, modern, web-based presentation of **Jigar Gadhiya's** 12+ year engineering journey, architectural case studies, technical competencies, and executive resume.

Designed to be hosted directly on **GitHub Pages**.

---

## 🚀 Key Features & New Form of Presentation

1. **Dual-Perspective Lens Switcher (`Arch` vs `Lead`)**:
   - **Architecture & Deep Tech Lens**: Tailored for Principal Engineers & CTOs, highlighting decoupled microservices, Catena-X/EDC, Keycloak SPI plugins, Kafka streaming, and OpenSearch.
   - **Leadership & Impact Lens**: Tailored for VPs of Engineering and Recruiters, highlighting delivery predictability, team leadership, legacy risk mitigation, and international onsite delivery (Malaysia).
2. **Interactive 12-Year Chronology**:
   - Visual timeline tracing SmartSense Solutions, Encora Inc., Kunj Services, Yugtia Technologies, Sterlite Tech, and Gujarat Technological University.
   - Includes tags, tech stacks, and highlighted milestones.
3. **Architectural Deep Dives (Case Studies)**:
   - *Catena-X Automotive Dataspace & SSI Integration* (EDC, Gaia-X, Verifiable Credentials, DID-web, Keycloak).
   - *High-Throughput OpenSearch & Dynamic Ingestion* (Sub-80ms search, Redis caching, multi-index autocomplete).
   - *Legacy Struts/EJB to Cloud-Native Microservices* (Strangler Fig pattern, zero downtime).
   - *AI-Augmented Development & Autonomous Workflows* (Antigravity, Claude Code, n8n automation).
4. **Interactive Skills Matrix**:
   - Filterable categories (Backend, Cloud/DevOps, Security/IAM, Frontend, Data/Search, AI/Automation).
   - Real-time search query box.
5. **Interactive View Modes**:
   - **Story & Journey Mode**: Immersive interactive presentation.
   - **Executive ATS Resume Mode**: Clean, printable 1-2 page format with browser print stylesheet optimization.
6. **Command Palette / Terminal Drawer (`Cmd+K` / `Ctrl+K`)**:
   - Quick search and jumping across sections via keyboard or terminal suggestions.
7. **Zero Heavy Build Dependencies**:
   - Built with pure modern semantic HTML5, CSS custom properties, and vanilla ES6 JavaScript.
   - No complex node build failure risks on GitHub Pages; loads instantly in milliseconds.

---

## 🛠️ Project Structure

```
jigar-journey/
├── index.html                   # Main presentation & ATS resume template
├── css/
│   └── styles.css               # Design system, themes (Dark/Light), animations, print styles
├── js/
│   └── app.js                   # Interactive controls, canvas animation, lenses, search
├── assets/
│   └── Jigar_Gadhiya_Resume.pdf # Downloadable PDF resume
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages deployment workflow
└── README.md                    # Documentation & setup guide
```

---

## 💻 Local Testing & Preview

You can preview the page locally using Python's built-in HTTP server:

```bash
cd /workspace/jigar-journey
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

---

## 🌐 Publishing to GitHub Pages

### Option A: As Your Primary User Page (`https://jigargadhiya.github.io/`)
1. Create a repository on GitHub named:
   ```
   jigargadhiya.github.io
   ```
2. Push this project to the `main` branch:
   ```bash
   cd /workspace/jigar-journey
   git init -b main
   git add .
   git commit -m "feat: initial interactive professional journey and resume presentation"
   git remote add origin https://github.com/jigargadhiya/jigargadhiya.github.io.git
   git push -u origin main
   ```
3. GitHub Pages will automatically deploy your site via the included `.github/workflows/deploy.yml` workflow!

### Option B: As a Dedicated Project Page (`https://jigargadhiya.github.io/about_me/`)
1. Create a repository on GitHub named `about_me` (or `portfolio`).
2. Push this code to that repository:
   ```bash
   cd /workspace/jigar-journey
   git init -b main
   git add .
   git commit -m "feat: initial interactive professional journey and resume presentation"
   git remote add origin https://github.com/jigargadhiya/about_me.git
   git push -u origin main
   ```
3. In repository **Settings** > **Pages**, ensure source is set to **GitHub Actions** (or `main` branch `/root`).
