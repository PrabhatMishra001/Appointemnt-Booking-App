# Vercel Deployment - Appointment Booking App (Progress)

## Status: Frontend Deploy In Progress

### Core Steps (Frontend)
- [x] **Plan approved by user**
- [x] **Created/Updated TODO.md**
- [x] **Git Setup**: Added config.js, TODO.md, vercel.json; committed & pushed to origin/blackboxai/doctor-registration-edu-exp
- [x] **Update config.js**: BASE_URL now uses `import.meta.env.VITE_BASE_URL || localhost`
- [x] **Create vercel.json**: Static build + API rewrites configured
- [ ] **Install Vercel CLI**: Already installed (v53.1.1)
- [ ] **Deploy Frontend**: `cd frontend && vercel --prod`
  - Get deployment URL (e.g., https://appoint-app-xyz.vercel.app)
  - Set Vercel Project Env: `VITE_BASE_URL` = backend URL (TBD after backend deploy)
- [ ] **Verify Frontend**: Load site, check static assets/home page.

### Backend Deploy (Render.com - Recommended)
- [ ] **Prepare**: 
  - Ensure GitHub repo has backend1/ (push if needed: `git add . && git commit -m 'backend ready' && git push`)
  - Create `backend1/.env.example` with vars.
- [ ] **Deploy**:
  1. Go to render.com, New > Web Service, connect GitHub repo.
  2. Root: `/backend1`, Build: `npm install`, Start: `npm start`.
  3. Env vars: `MONGO_URI` (Atlas), `JWT_SECRET_key`, `STRIPE_SECRET_KEY`.
- [ ] **Get Backend URL** (e.g., https://appoint-backend-abc.onrender.com/api/v1)

### Final Steps
- [ ] Update Frontend Env `VITE_BASE_URL=https://backend.onrender.com/api/v1` & redeploy `vercel --prod`.
- [ ] Test Full Stack: Auth, Doctors list, Booking flow.

### Commands Ready
```
# Frontend (from project root)
cd frontend && vercel --prod

# Backend Git (if needed)
git add backend1/ && git commit -m 'prepare backend deploy' && git push origin blackboxai/doctor-registration-edu-exp
```

**Next Action**: Run frontend deploy command, share Vercel URL + login (if GitHub linked). Then backend env vars?
