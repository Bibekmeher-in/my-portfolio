# Quick Deployment Guide

## Deploy to Vercel (Recommended - Free & Fast)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **bibek-portfolio** (or press Enter)
- Directory? **./** (press Enter)
- Override settings? **N**

You'll get a URL like: `https://bibek-portfolio-xyz.vercel.app`

### Step 4: Add Environment Variables
After deployment, add your environment variables:

```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
vercel env add NEXT_PUBLIC_API_URL
```

Then redeploy:
```bash
vercel --prod
```

---

## Option 2: Temporary Tunnel with ngrok (Instant - For Demo Only)

### Step 1: Install ngrok
Download from: https://ngrok.com/download

### Step 2: Start Your Dev Server
```bash
npm run dev
```

### Step 3: In Another Terminal, Run ngrok
```bash
ngrok http 3000
```

You'll get a temporary URL like: `https://abc123.ngrok.io`

**Note:** This URL expires when you close ngrok. Good for quick demos only.

---

## Option 3: Deploy Backend Separately

Your backend needs to be deployed separately. Options:

1. **Railway** (Free tier): https://railway.app
2. **Render** (Free tier): https://render.com
3. **Heroku** (Paid): https://heroku.com

After deploying backend, update `NEXT_PUBLIC_API_URL` in Vercel environment variables.

---

## Important Notes

⚠️ **Backend Server**: Your Express server (`server/index.js`) won't run on Vercel's free tier. You need to:
- Deploy backend separately (Railway/Render)
- Or convert backend routes to Next.js API routes

⚠️ **Environment Variables**: Never commit `.env` file. Add them in Vercel dashboard.

⚠️ **MongoDB**: Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0) for production.

---

## Quick Commands Reference

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```
