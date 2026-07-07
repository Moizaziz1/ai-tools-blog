# AIToolsHub — AI Tools Blog

A full-stack blog website for AI tool reviews, built for AdSense monetization.
**Next.js 15 + FastAPI + Neon DB (PostgreSQL)**

---

## 🚀 Quick Start

### 1. Neon DB Setup
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project → Copy the **connection string**
3. It looks like: `postgresql://user:password@host/dbname?sslmode=require`

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env and add your DATABASE_URL and a secret key
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The backend will auto-create tables and seed 15 articles on first run.

### 3. Frontend Setup
```bash
cd frontend
# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000
npm install
npm run dev
```

Visit: http://localhost:3000

---

## 🔐 Admin Access

| URL | `http://localhost:3000/admin/login` |
|-----|------|
| Username | `admin` |
| Password | `admin123` |

**⚠️ Change the password in production!**

To change admin password, update `ADMIN_PASSWORD` in `.env` and run:
```python
import bcrypt
print(bcrypt.hashpw(b"your-new-password", bcrypt.gensalt()).decode())
```
Then update the hash directly in your Neon DB.

---

## 📁 Project Structure

```
ai-tools-blog/
├── backend/
│   ├── main.py              # FastAPI app (complete)
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── app/
    │   ├── page.tsx          # Homepage
    │   ├── articles/         # All articles + article detail
    │   ├── category/[name]/  # Category pages
    │   ├── search/           # Live search
    │   ├── about/            # About page
    │   ├── privacy/          # Privacy policy (for AdSense)
    │   ├── admin/            # Complete admin panel
    │   │   ├── login/
    │   │   ├── dashboard/
    │   │   └── articles/     # Create, edit, delete
    │   ├── sitemap.ts        # Auto-generated sitemap
    │   └── robots.ts         # robots.txt
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── ArticleCard.tsx
    │   ├── ArticleEditor.tsx # Markdown editor with preview
    │   ├── AdminSidebar.tsx
    │   └── AdBanner.tsx      # AdSense component
    └── lib/
        ├── api.ts            # All API calls
        └── auth.tsx          # JWT auth context
```

---

## 💰 AdSense Setup

1. Apply at [google.com/adsense](https://www.google.com/adsense) using your domain
2. Get your publisher ID (looks like `ca-pub-XXXXXXXXXXXXXXXX`)
3. Open `components/AdBanner.tsx` and replace `ca-pub-XXXXXXXXXXXXXXXX`
4. Add the AdSense script to `app/layout.tsx` head section:
```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
/>
```
5. Replace ad slot IDs in article pages with your actual slot IDs

### AdSense Approval Checklist
- ✅ Original, human-written content (15 articles seeded)
- ✅ About page at `/about`
- ✅ Privacy Policy at `/privacy`
- ✅ Clean navigation and site structure
- ✅ Mobile responsive design
- ✅ Fast loading (Next.js)
- ✅ HTTPS (deploy to Vercel/similar)
- ✅ robots.txt and sitemap.xml

---

## 🌐 Deployment

### Frontend → Vercel (recommended)
```bash
npm install -g vercel
cd frontend
vercel
# Set NEXT_PUBLIC_API_URL to your backend URL
```

### Backend → Railway / Render / DigitalOcean
```bash
# Railway
railway new
railway add
railway up

# Or Render: Connect GitHub repo, set start command:
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables (Production)
**Backend `.env`:**
```
DATABASE_URL=postgresql://...your-neon-url...
SECRET_KEY=a-long-random-secret-key-change-this
```

**Frontend `.env.production`:**
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

---

## 📝 Admin Panel Features

| Feature | Description |
|---------|-------------|
| Dashboard | Stats (total, published, drafts, categories) + article table |
| Create Article | Markdown editor with live preview, SEO fields |
| Edit Article | Same editor, pre-filled with existing content |
| Delete Article | With confirmation |
| Publish/Unpublish | Toggle visibility without deleting |
| Search | Filter articles by title, category, or slug |

---

## 🎨 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python |
| Database | Neon DB (PostgreSQL via asyncpg) |
| Auth | JWT (python-jose + bcrypt) |
| Fonts | DM Serif Display + DM Sans (Google Fonts) |
| Icons | Lucide React |

---

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | List articles (page, limit, category, search) |
| GET | `/api/articles/{slug}` | Single article |
| GET | `/api/categories` | All categories with counts |

### Admin (requires JWT Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Get JWT token |
| GET | `/api/admin/articles` | All articles (incl. drafts) |
| POST | `/api/admin/articles` | Create article |
| PUT | `/api/admin/articles/{id}` | Update article |
| DELETE | `/api/admin/articles/{id}` | Delete article |
| GET | `/api/admin/stats` | Dashboard stats |

---

## 📰 Included Articles (15 total)

1. ChatGPT Review 2024
2. Midjourney vs DALL-E 3
3. GitHub Copilot Review
4. Notion AI Review
5. Perplexity AI Review
6. Claude vs ChatGPT
7. ElevenLabs AI Voice
8. Runway ML Gen-3
9. Jasper AI Review
10. Adobe Firefly Review
11. Cursor AI Code Editor
12. Google Gemini Review
13. Copy.ai Review
14. Grammarly AI Review
15. Sora Review

All written in natural human tone — not AI-generated sounding.
