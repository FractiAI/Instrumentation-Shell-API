# GitHub → Vercel Auto-Deploy Setup Guide

## 🔴 Problem: Auto-Deploy Not Working

New commits to GitHub are not automatically triggering Vercel deployments.

## ✅ Solution: Check and Fix Auto-Deploy Configuration

### Step 1: Check Current Status

Run the diagnostic script:
```bash
./check-auto-deploy.sh
```

Or manually check:
```bash
# Verify latest commit
git log -1 --oneline

# Verify code is correct
git show HEAD:src/app/api/instrumentation/measure/route.ts | sed -n '85p'
# Should show: seed: null
```

---

## 🔧 Fix Auto-Deploy in Vercel Dashboard

### Option 1: Verify Git Integration (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Navigate to project: `instrumentation-shell-api`

2. **Check Git Settings:**
   - Go to: **Settings** → **Git**
   - Verify:
     - ✅ **Connected Repository**: `FractiAI/Instrumentation-Shell-API`
     - ✅ **Production Branch**: `main`
     - ✅ **Auto-deploy on push**: **ENABLED** ✓
     - ✅ **Pull Request Previews**: Enabled (optional)

3. **If Auto-deploy is OFF:**
   - Toggle **"Auto-deploy on push"** to **ON**
   - Click **"Save"**

4. **If Repository is NOT connected:**
   - Click **"Connect Git Repository"**
   - Select: `FractiAI/Instrumentation-Shell-API`
   - Select branch: `main`
   - Enable **"Auto-deploy on push"**
   - Click **"Save"**

---

### Option 2: Check GitHub Webhook

1. **Go to GitHub Repository:**
   - Visit: https://github.com/FractiAI/Instrumentation-Shell-API
   - Go to: **Settings** → **Webhooks**

2. **Verify Vercel Webhook Exists:**
   - Should see a webhook with URL: `https://api.vercel.com/v1/integrations/deploy/...`
   - Status: **Active** ✓
   - Events: **push**, **pull_request**
   - Last delivery: Recent (within last few minutes)

3. **If Webhook is Missing:**
   - This means the repository isn't properly connected to Vercel
   - Go back to Vercel Dashboard → Settings → Git
   - Reconnect the repository (see Option 1)

4. **If Webhook Failed:**
   - Click on the webhook
   - Check **"Recent Deliveries"**
   - Look for failed deliveries
   - If all failed, try reconnecting in Vercel

---

### Option 3: Manual Deployment (Temporary Fix)

If auto-deploy isn't working, manually deploy:

1. **Vercel Dashboard → Deployments:**
   - Click **"Create Deployment"** (top right)
   - Or click **"Redeploy"** on latest deployment

2. **Configure Deployment:**
   - **Git Branch**: `main`
   - **Commit**: Latest commit (or select specific commit)
   - **Use existing Build Cache**: ❌ **UNCHECK** (to clear cache)
   - Click **"Deploy"**

3. **Verify Deployment:**
   - Check build logs for errors
   - Verify commit SHA matches your latest commit
   - Build should succeed with `seed: null` on line 85

---

### Option 4: Use Vercel CLI (Alternative)

If you have Vercel CLI access:

```bash
# 1. Authenticate
vercel login

# 2. Link project (if not already linked)
vercel link

# 3. Deploy with cache cleared
vercel --prod --force

# This will deploy from latest commit and clear cache
```

---

## 🧪 Test Auto-Deploy

After fixing the configuration:

1. **Make a small change:**
   ```bash
   git commit --allow-empty -m "Test auto-deploy"
   git push
   ```

2. **Check Vercel Dashboard:**
   - Go to: **Deployments** tab
   - Should see a new deployment starting within 1-2 minutes
   - Deployment should show the test commit

3. **If deployment starts:**
   - ✅ Auto-deploy is working!
   - You can delete the test commit later

4. **If deployment doesn't start:**
   - Check webhook deliveries in GitHub (Settings → Webhooks)
   - Check Vercel project logs
   - Reconnect the repository if needed

---

## 📋 Checklist

- [ ] Vercel Dashboard → Settings → Git → Auto-deploy is **ENABLED**
- [ ] Production branch is set to `main`
- [ ] Repository is connected: `FractiAI/Instrumentation-Shell-API`
- [ ] GitHub webhook exists and is active
- [ ] Latest commit is pushed to `main`
- [ ] Code has correct fix: `seed: null` on line 85
- [ ] Manual deployment works (if auto-deploy doesn't)

---

## 🚨 Common Issues

### Issue 1: "Auto-deploy is disabled"
**Fix**: Vercel Dashboard → Settings → Git → Enable "Auto-deploy on push"

### Issue 2: "Repository not connected"
**Fix**: Vercel Dashboard → Settings → Git → Connect Git Repository

### Issue 3: "Webhook not found"
**Fix**: Reconnect repository in Vercel (this creates the webhook)

### Issue 4: "Webhook failing"
**Fix**: Check webhook deliveries in GitHub, may need to reconnect

### Issue 5: "Building from wrong commit"
**Fix**: Redeploy manually, select correct commit, clear cache

---

## 📞 Still Not Working?

If auto-deploy still doesn't work after these steps:

1. **Check Vercel project logs:**
   - Vercel Dashboard → Project → Logs
   - Look for errors or warnings

2. **Check GitHub permissions:**
   - Verify Vercel has access to the repository
   - GitHub Settings → Applications → Authorized OAuth Apps → Vercel

3. **Manual workaround:**
   - Use manual deployment for now
   - Deploy after each commit using Vercel Dashboard
   - Or use `vercel --prod --force` via CLI

---

**Status**: Repository is ready ✅ - Auto-deploy needs to be enabled in Vercel Dashboard
