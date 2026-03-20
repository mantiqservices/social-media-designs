# MANTIQ Content Planner

Social media content planner for MANTIQ — 50 posts across 5 systems with Arabic & English captions.

## 🚀 Deploy to Vercel (3 steps)

### 1. Upload to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mantiq-planner.git
git push -u origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework: **Vite**
4. Click **Deploy** ✅

### 3. Done!
Vercel auto-detects Vite and deploys. Your site will be live at `https://mantiq-planner.vercel.app`

---

## 💻 Run Locally
```bash
npm install
npm run dev
```
Open: http://localhost:3000

## 📁 Project Structure
```
mantiq-planner/
├── index.html          # Entry point
├── vite.config.js      # Vite config
├── vercel.json         # Vercel routing
├── package.json
├── public/
│   ├── imagess/         # 50 post PNGs (1080×1080)
│   └── favicon.svg
└── src/
    ├── main.js         # Entry
    ├── ui.js           # HTML template
    ├── app.js          # All logic & filters
    ├── posts.js        # Post data (50 posts)
    └── style.css       # Full stylesheet
```

## ✨ Features
- **Grid view** — all 50 posts with preview & edit
- **Content Plan** — table with Arabic & English captions + copy button
- **Week view** — organized by week (10 weeks)
- **Filters** — by system, type, week
- **Search** — full-text search across all captions
- **Edit** — edit any post's caption, schedule, platform (saves to localStorage)
- **Download** — download any/all visible posts as PNG
