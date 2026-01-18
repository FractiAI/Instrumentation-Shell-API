# Quick Deploy Guide - Instrumentation Shell API

## 🚀 Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/new
   - Sign in with your account

2. **Import Project:**
   - Click "Import Git Repository"
   - Select the repository containing `instrumentation-shell-api`
   - OR drag and drop the `instrumentation-shell-api` folder

3. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `instrumentation-shell-api` (if in monorepo)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

4. **Set Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Add:
     ```
     INSTRUMENTATION_API_KEY=your-secret-api-key-here
     NODE_ENV=production
     ```
   - (Optional) Add:
     ```
     AUTHORIZED_CALLER_ORIGINS=https://your-main-app.vercel.app
     ENABLE_ORIGIN_CHECK=false
     ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)

---

### Option 2: Via Vercel CLI

1. **Login to Vercel:**
   ```bash
   cd instrumentation-shell-api
   vercel login
   ```

2. **Link Project:**
   ```bash
   vercel link
   ```
   - Select your Vercel account/team
   - Create new project or link to existing

3. **Set Environment Variables:**
   ```bash
   vercel env add INSTRUMENTATION_API_KEY production
   # Paste your API key when prompted
   
   vercel env add NODE_ENV production
   # Enter: production
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

---

## ✅ Verify Deployment

After deployment, test the API:

**1. Status Endpoint (Public):**
```bash
curl https://your-project.vercel.app/api/instrumentation/status
```

**Expected Response:**
```json
{
  "success": true,
  "status": "active",
  "version": "1.0.0",
  "octave": "instrumentation-core"
}
```

**2. Protected Endpoint (Requires API Key):**
```bash
curl -X POST https://your-project.vercel.app/api/instrumentation/score \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "novelty": 2000,
    "density": 2500,
    "coherence": 3000,
    "alignment": 2500
  }'
```

---

## 🔐 Generate API Key

If you need to generate a secure API key:

```bash
# Generate a secure random key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use any secure random string generator. Store this key securely and add it to Vercel environment variables.

---

## 📝 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set environment variables
3. ✅ Test endpoints
4. ✅ Update main application to use new API URL
5. ✅ Configure API client in main repository

---

**Deployment URL will be:** `https://your-project-name.vercel.app`
