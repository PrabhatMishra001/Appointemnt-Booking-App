# Vercel Deployment - Appointment Booking App

## Status: In Progress

### Core Steps (Frontend First)
- [x] **Plan approved by user**
- [x] **Created TODO.md**
- [ ] **Git Setup**: `git init`, add all (git add .), commit, create GitHub repo, push main.
  Command: `git init && git add . && git commit -m "Initial commit"`
- [ ] **Update config.js**: Make BASE_URL use Vite env var.
- [ ] **Create vercel.json**: In frontend/ for API rewrites.
- [ ] **Install Vercel CLI**: `npm i -g vercel`
- [ ] **Deploy Frontend**: `cd frontend && vercel login && vercel --prod` (sets root=frontend, build=npm run build, output=dist)
- [ ] **Set Env Vars** (Vercel dashboard):
  - `VITE_BASE_URL`: Backend URL (initially localhost fallback)

### Backend Serverless (Phase 2)
- [ ] Copy backend routes to `frontend/api/v1/*/route.js`
- [ ] Add env vars: MONGO_URI, JWT_SECRET_key, STRIPE_SECRET_KEY, CLIENT_SITE_URL
- [ ] Deploy/update.

### Required User Inputs
- MongoDB Atlas URI (with user/pass)
- Stripe secret key
- JWT secret
- GitHub username/repo for push (or new repo)

Next: Git setup.

