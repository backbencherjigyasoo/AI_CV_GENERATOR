# 🤖 AI CV Generator

A **client-side** AI-powered CV builder built with **React + Vite** and **Groq** (Llama 3.3 70B). The app interviews you through a chat interface, collects your professional details, and renders a live, polished résumé preview that you can download as a PDF.

---

## ✨ Features

| Feature                  | Description                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| 💬 **Conversational AI** | Chat-based interview that collects name, contact, summary, experience, skills, education & achievements |
| 📄 **Live CV Preview**   | Real-time résumé preview updates as you answer questions                                                |
| 📥 **PDF Export**        | One-click download of a clean, A4-formatted PDF via `html2pdf.js`                                       |
| 🔒 **Secure API Key**    | Groq API key stored in browser `localStorage` — no backend needed                                       |
| 🛡️ **Guardrails**        | AI only answers career-related questions; off-topic queries are politely refused                        |
| ⚡ **Lightning Fast**    | Powered by Groq's ultra-low-latency inference engine                                                    |
| 🎨 **Modern UI**         | Dark-mode, glassmorphism, smooth animations                                                             |

---

## 🛠️ Tech Stack

- **Framework:** React 19 (Vite)
- **Styling:** Vanilla CSS (dark mode, glassmorphism)
- **Icons:** Lucide React
- **PDF:** html2pdf.js
- **AI:** Groq API — Llama 3.3 70B Versatile

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/backbencherjigyasoo/AI_CV_GENERATOR.git
cd AI_CV_GENERATOR
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Add your Groq API Key

- A **Settings modal** will appear on first launch.
- Get a free API key from [console.groq.com/keys](https://console.groq.com/keys).
- Paste and save — the key is stored securely in your browser's `localStorage`.

### 5. Build your CV!

- Answer the AI's questions in the chat panel (left side).
- Watch the CV preview update in real-time (right side).
- Click **Download PDF** when you're done.

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Main orchestrator (state + layout)
├── index.css                # Global styles & design tokens
├── components/
│   ├── ChatPanel.jsx        # Chat interface (messages, input)
│   ├── ConfigModal.jsx      # API key configuration modal
│   └── CvPreview.jsx        # Live CV preview + PDF download
└── services/
    └── api.js               # System prompt + Groq API logic
```

---

## 🌐 Deployment

The app is fully static — deploy anywhere:

```bash
npm run build
# Deploy the dist/ folder to Vercel, Netlify, GitHub Pages, etc.
```

---

## 📝 CV Sections Supported

- **Header:** Name, Title, Email, Phone, Location, Links
- **Professional Summary**
- **Skills** (categorized — e.g., Frontend, Languages, Tools)
- **Experience** (with bullet-point highlights)
- **Key Achievements**
- **Education**

---

## 🤝 Contributing

Feel free to open issues or PRs. Improvements to UI, additional CV templates, or better LLM integrations are welcome!

---

_Built by [Gaurav Srivastava](https://linkedin.com/in/gaurav-srivastava-dev) — a showcase project for AI-driven résumé generation._
