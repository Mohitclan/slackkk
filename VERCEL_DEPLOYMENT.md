# Vercel Deployment Guide

## Frontend Deployment

### Step 1: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `Mohitclan/slackkk`
4. **Important Settings:**
   - **Root Directory:** Set to `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (should be auto-detected)
   - **Output Directory:** `dist` (should be auto-detected)

### Step 2: Set Environment Variables in Vercel

Go to your project settings → Environment Variables and add:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_STREAM_API_KEY=your_stream_api_key_here
VITE_SENTRY_DSN=your_sentry_dsn_here (optional)
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
```

**Important:** Replace `VITE_API_BASE_URL` with your actual backend URL after deploying the backend.

### Step 3: Deploy

Click "Deploy" and wait for the build to complete.

---

## Backend Deployment

### Step 1: Deploy Backend to Vercel

1. Create a **separate** Vercel project for the backend
2. Import the same GitHub repository: `Mohitclan/slackkk`
3. **Important Settings:**
   - **Root Directory:** Set to `backend`
   - **Framework Preset:** Other
   - **Build Command:** Leave empty (or `npm install`)
   - **Output Directory:** Leave empty

### Step 2: Set Environment Variables in Vercel

Go to your backend project settings → Environment Variables and add:

```
PORT=5001
MONGO_URI=your_mongo_uri_here
NODE_ENV=production
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
STREAM_API_KEY=your_stream_api_key_here
STREAM_API_SECRET=your_stream_api_secret_here
SENTRY_DSN=your_sentry_dsn_here (optional)
INNGEST_EVENT_KEY=your_inngest_event_key_here (optional)
INNGEST_SIGNING_KEY=your_inngest_signing_key_here (optional)
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Important:** 
- Replace `CLIENT_URL` with your actual frontend Vercel URL
- After backend is deployed, update frontend's `VITE_API_BASE_URL` to point to backend URL

### Step 3: Deploy

Click "Deploy" and wait for the build to complete.

---

## Troubleshooting 404 Errors

If you see a 404 error:

1. **Check Root Directory:** Make sure it's set to `frontend` for frontend project
2. **Check Build Output:** Should be `dist` for Vite projects
3. **Check Rewrites:** The `vercel.json` should have the rewrite rule (already configured)
4. **Check Environment Variables:** Make sure all required variables are set
5. **Check Build Logs:** Look for any build errors in Vercel dashboard

---

## After Deployment

1. Update frontend's `VITE_API_BASE_URL` to your backend URL
2. Update backend's `CLIENT_URL` to your frontend URL
3. Redeploy both projects
4. Test the application

