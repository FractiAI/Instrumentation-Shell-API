# IMMEDIATE DEPLOYMENT INSTRUCTIONS

## 🔴 Critical Issue Summary

**Problem**: Vercel is building from old commit with `seed: false` (before commit `e704032`)  
**Current Code**: Latest commit `234a052` has `seed: null` ✅ CORRECT  
**Solution**: Deploy from latest commit with build cache cleared

---

## ✅ VERIFIED: Code is Ready

```bash
# Current state confirmed:
git log -1 --oneline
# 234a052 Add auto-deploy troubleshooting tools and documentation

# Line 85 is correct:
sed -n '85p' src/app/api/instrumentation/measure/route.ts
# seed: null, // Type: number | null (NOT boolean)
```

---

## 🚀 OPTION 1: Vercel Dashboard (RECOMMENDED - 2 minutes)

### Step-by-Step:

1. **Open Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Find project: `instrumentation-shell-api`

2. **Go to Deployments Tab**
   - Click on "Deployments" in the top navigation

3. **Redeploy Latest**
   - Find the most recent deployment
   - Click the **"..."** menu (three dots)
   - Select **"Redeploy"**

4. **CRITICAL: Clear Build Cache**
   - In the redeploy dialog:
   - **UNCHECK** "Use existing Build Cache" ❌
   - Select commit: `234a052` (or latest)
   - Click **"Redeploy"**

5. **Monitor Build**
   - Watch build logs
   - Should complete in ~2-3 minutes
   - Build should succeed without TypeScript errors

6. **Enable Auto-Deploy**
   - Go to: Settings → Git
   - Verify:
     - Repository: `FractiAI/Instrumentation-Shell-API`
     - Branch: `main`
     - Auto-deploy: **ENABLED** ✓
   - If not enabled, toggle it on and save

---

## 🚀 OPTION 2: Vercel CLI (Requires Authentication)

If you have Vercel access configured:

```bash
# Authenticate (browser will open)
vercel login

# Link project
vercel link

# Deploy to production (force clears cache)
vercel --prod --force
```

---

## 🚀 OPTION 3: Create New Deployment

If redeploying doesn't work:

1. **Vercel Dashboard → Deployments**
2. Click **"Create Deployment"** button
3. Configure:
   - **Source**: GitHub
   - **Branch**: `main`
   - **Commit**: `234a052` (latest)
   - **Build Cache**: OFF (unchecked)
4. Click **"Deploy"**

---

## ✅ Verification After Deployment

### 1. Check Deployment Commit

In Vercel Dashboard → Deployments → Latest:
- Commit SHA should be: `234a052` or later
- NOT before `e704032`

### 2. Check Build Logs

Should NOT see error:
```
Type error: Type 'boolean' is not assignable to type 'number'.
> 85 |       seed: false,
```

Should see successful build.

### 3. Test API

```bash
# Test status endpoint (should work)
curl https://your-deployment-url.vercel.app/api/instrumentation/status

# Expected response:
{
  "success": true,
  "status": "active",
  "version": "1.0.0",
  "octave": "instrumentation-core"
}
```

---

## 📋 Quick Checklist

- [ ] Open Vercel Dashboard
- [ ] Navigate to project `instrumentation-shell-api`
- [ ] Go to Deployments tab
- [ ] Click "Redeploy" on latest deployment
- [ ] **UNCHECK** "Use existing Build Cache"
- [ ] Confirm commit is `234a052` or later
- [ ] Click "Redeploy"
- [ ] Wait for build to complete (~2-3 min)
- [ ] Verify build succeeded
- [ ] Test API endpoint
- [ ] Enable auto-deploy in Settings → Git

---

## 🔧 Why This Happened

**Root Cause**: Vercel was building from a commit before the fix (before `e704032`).

**Timeline**:
- ❌ Commits before `e704032`: had `seed: false`
- ✅ Commit `e704032`: fixed to `seed: null`
- ✅ Commits `336a00d`, `68bbc63`, `fa65d6c`, `234a052`: all have `seed: null`

**Why Cache Matters**: Build cache might contain the old TypeScript compilation. Clearing it ensures a fresh build from the correct source code.

---

## 🆘 If Still Failing

If the deployment still shows the same error after redeploying:

1. **Double-check the commit SHA in Vercel**
   - It MUST be `234a052` or later
   - If showing older commit, manually select the latest commit

2. **Verify in Vercel Dashboard → Settings → Git**
   - Production branch must be `main`
   - Repository must be `FractiAI/Instrumentation-Shell-API`

3. **Create fresh deployment** (not redeploy)
   - Use Option 3 above

4. **Last resort: Disconnect and reconnect**
   - Settings → Git → Disconnect
   - Then reconnect to `FractiAI/Instrumentation-Shell-API`
   - Deploy fresh

---

**ACTION REQUIRED**: Deploy from Vercel Dashboard with build cache cleared

**Expected Result**: Build succeeds, API is live, auto-deploy enabled for future commits
