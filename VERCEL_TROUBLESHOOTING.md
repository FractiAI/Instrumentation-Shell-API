# Vercel Build Troubleshooting

## 🔴 Issue: Type Error `seed: false` on Line 85

**Error Message:**
```
Type error: Type 'boolean' is not assignable to type 'number'.
> 85 |       seed: false,
```

## ✅ Root Cause

Vercel is building from an **old commit** that has `seed: false` on line 85.

**Timeline:**
- ❌ **Before commit `e704032`**: Line 85 had `seed: false` (WRONG)
- ✅ **After commit `e704032`**: Line 85 has `seed: null` (CORRECT)
- ✅ **Latest commit `68bbc63`**: Line 85 has `seed: null` (CORRECT)

## 🔍 Verification

Run this to verify your code is correct:
```bash
./verify-build.sh
```

Or manually check:
```bash
# Check current file
sed -n '85p' src/app/api/instrumentation/measure/route.ts

# Should show: seed: null, // Type: number | null (NOT boolean)

# Check what's in latest commit
git show HEAD:src/app/api/instrumentation/measure/route.ts | sed -n '85p'

# Should show: seed: null, // Type: number | null (NOT boolean)
```

## 🚀 Solutions

### Solution 1: Force Redeploy in Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project: `instrumentation-shell-api`
3. Go to **Deployments** tab
4. Find the latest deployment
5. Click **"..."** menu → **"Redeploy"**
6. **IMPORTANT**: Make sure to:
   - Select **"Use existing Build Cache"** = ❌ **OFF**
   - Verify it's deploying from commit: `68bbc63` or later
7. Click **"Redeploy"**

### Solution 2: Verify Git Integration

1. Go to Vercel Dashboard → Project → **Settings** → **Git**
2. Verify:
   - ✅ Repository is connected: `FractiAI/Instrumentation-Shell-API`
   - ✅ Production Branch is: `main`
   - ✅ Auto-deploy is **enabled**
3. If not connected, connect the repository

### Solution 3: Use Vercel CLI (If Authenticated)

```bash
# Login first
vercel login

# Force deployment from latest commit
vercel --prod --force

# Or deploy specific commit
git checkout main
vercel --prod
```

### Solution 4: Check Build Settings

1. Vercel Dashboard → Project → **Settings** → **General**
2. Verify:
   - **Root Directory**: Should be `./` (not a subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Solution 5: Clear Build Cache

1. Vercel Dashboard → Project → **Settings** → **General**
2. Scroll to **"Build & Development Settings"**
3. Look for cache settings or **"Clear Build Cache"**
4. Redeploy after clearing

## ✅ Verification Steps

After redeploying, verify the fix:

1. **Check deployment commit**:
   - In Vercel Dashboard → Deployments → Latest deployment
   - Should show commit: `68bbc63` or later
   - Should NOT show: `e704032^` or earlier

2. **Check build logs**:
   - In Vercel Dashboard → Deployments → Latest deployment → Build Logs
   - Should NOT show TypeScript error about `seed: false`
   - Build should succeed

3. **Test the API**:
   ```bash
   curl https://your-project.vercel.app/api/instrumentation/status
   ```
   Should return: `{"success":true,"status":"active",...}`

## 📋 Quick Checklist

- [ ] Verified code has `seed: null` on line 85
- [ ] Verified latest commit is `68bbc63` or later
- [ ] Redeployed in Vercel Dashboard (with cache OFF)
- [ ] Verified deployment shows correct commit SHA
- [ ] Build completed without TypeScript errors
- [ ] Tested API endpoint

## 🆘 Still Not Working?

If Vercel still shows the error after redeploying:

1. **Double-check the commit SHA**:
   ```bash
   git log -1 --oneline
   # Should be: 68bbc63 Force Vercel deployment...
   ```

2. **Verify what's actually in that commit**:
   ```bash
   git show 68bbc63:src/app/api/instrumentation/measure/route.ts | sed -n '85p'
   # Should show: seed: null
   ```

3. **Check if there are uncommitted changes**:
   ```bash
   git status
   # Should show: "nothing to commit, working tree clean"
   ```

4. **Contact Vercel Support** with:
   - Repository URL: `https://github.com/FractiAI/Instrumentation-Shell-API`
   - Expected commit: `68bbc63`
   - Error showing old code from before `e704032`

---

**Status**: ✅ Code is correct in repository - Vercel needs to rebuild from latest commit
