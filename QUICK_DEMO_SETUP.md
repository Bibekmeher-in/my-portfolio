# 🚀 Quick Demo Setup (2 Minutes)

## Fastest Way: Use ngrok for Temporary Demo

### 1. Download ngrok
Go to: https://ngrok.com/download
- Sign up (free)
- Download for Windows
- Extract the zip file

### 2. Start Your Project
Open terminal in your project folder:
```bash
npm run dev
```

Keep this terminal running!

### 3. Open Another Terminal and Run ngrok
Navigate to where you extracted ngrok, then:
```bash
ngrok http 3000
```

### 4. Share the Link
You'll see something like:
```
Forwarding    https://abc123.ngrok-free.app -> http://localhost:3000
```

**Share this URL with your client:** `https://abc123.ngrok-free.app`

⚠️ **Important Notes:**
- Keep both terminals running during the demo
- The link expires when you close ngrok
- Free tier shows ngrok warning page (click "Visit Site")
- Your backend must also be running: `npm run server:dev`

---

## Alternative: Vercel (Permanent Link - 5 Minutes)

### Quick Vercel Deploy:
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Get production URL
vercel --prod
```

You'll get a permanent URL like: `https://bibek-portfolio.vercel.app`

---

## ⚠️ Backend Issue

Your Express backend won't work on Vercel free tier. For full functionality:

1. **For Demo**: Run backend locally + use ngrok
2. **For Production**: Deploy backend to Railway/Render (free)

### Deploy Backend to Railway (Free):
1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables from `.env`
6. Get your backend URL
7. Update `NEXT_PUBLIC_API_URL` in frontend

---

## What Works Where?

| Feature | ngrok (Local) | Vercel (Frontend Only) |
|---------|---------------|------------------------|
| Frontend | ✅ | ✅ |
| Backend API | ✅ (if running locally) | ❌ (needs separate deploy) |
| Database | ✅ | ✅ (MongoDB Atlas) |
| File Upload | ✅ | ❌ (needs cloud storage) |

---

## Recommended for Client Demo:

**Option A: Full Local Demo (ngrok)**
```bash
# Terminal 1
npm run server:dev

# Terminal 2  
npm run dev

# Terminal 3
ngrok http 3000
```
Share the ngrok URL ✅

**Option B: Frontend Only (Vercel)**
```bash
vercel --prod
```
Share the Vercel URL (limited functionality) ⚠️
