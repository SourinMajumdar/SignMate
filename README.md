# SignMate ✍️

A modern, free email signature generator built with React. No signup, no backend, no fuss — just open it and build.

---

## Features

- **5 Signature Templates** — Classic, Compact, Minimal, Inline, Card
- **Live Preview** — see your signature update in real time as you type
- **Brand Color Picker** — 8 presets + custom hex input + native color picker
- **HTML Export** — copy clean, email-client-ready HTML in one click
- **View Raw HTML** — toggle between preview and source code
- **Dynamic Theme** — color picker on the homepage updates the entire site's accent color
- **Template Gallery** — browse all templates before jumping into the builder
- **Docs Page** — step-by-step guide with scrollspy sidebar navigation
- **Skeleton Loading** — builder page loads with an animated skeleton screen
- **Zero dependencies on a backend** — everything runs in the browser

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | [React](https://react.dev) + [Vite](https://vitejs.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Routing | [React Router v6](https://reactrouter.com) |
| Icons | [Lucide React](https://lucide.dev) |
| AI-assisted | [Kombai](https://kombai.com) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Floating pill navigation bar
│   ├── HeroSection.jsx      # Landing hero with theme color switcher
│   ├── WhatItDoes.jsx       # Animated builder demo section
│   ├── FeatureSection.jsx   # Feature highlights grid
│   ├── TemplateCarousel.jsx # Auto-playing template slideshow
│   ├── CTABanner.jsx        # Call-to-action banner
│   ├── Footer.jsx           # Site footer
│   ├── SignatureBuilder.jsx # Core builder UI (color, template, form, export)
│   ├── SignatureForm.jsx     # Input form for user details
│   ├── SignaturePreview.jsx  # Renders live signature preview
│   ├── BuilderSkeleton.jsx  # Skeleton loader for builder page
│   └── ...
├── pages/
│   ├── LandingPage.jsx
│   ├── BuilderPage.jsx
│   ├── TemplatesPage.jsx
│   └── DocsPage.jsx
├── utils/
│   └── generateSignatureHTML.js  # Generates table-based email HTML
├── index.css                # Tailwind v4 theme + global styles
└── App.jsx                  # Route definitions
```

---

## Templates

| Name | Description |
|---|---|
| **Classic** | Traditional layout with name, title, company, and contacts on separate rows |
| **Compact** | Name and title on one line, contacts on the next |
| **Minimal** | Just the essentials — name, role, email, and website |
| **Inline** | Everything on a single horizontal line |
| **Card** | Bordered table card that stands out in any inbox |

---

## Email Client Compatibility

The generated HTML uses a **table-based layout** which is compatible with:

- ✅ Gmail
- ✅ Outlook
- ✅ Apple Mail
- ✅ Most other email clients

> **Tip:** Use **Ctrl+Shift+V** (Paste as Plain Text) when pasting into Gmail or Outlook to avoid double-formatting.

---

## Built with

- ⚛️ **React** — UI framework
- 🤖 **Kombai** — AI-assisted frontend development

---

## License

MIT — free to use, modify, and distribute.
