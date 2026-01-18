# Create New Vercel Project for Instrumentation Shell API

Since `instrumentation-shell-api` is in a subdirectory, you need to create a **separate Vercel project** with a custom root directory.

---

## 🚀 Steps to Create New Project in Vercel Dashboard

### Step 1: Go to Vercel Dashboard

1. Visit: https://vercel.com/dashboard
2. Sign in to your account (fractiais-projects)

### Step 2: Create New Project

1. Click **"Add New..."** → **"Project"** (top right)
2. OR click **"Import Project"** button

### Step 3: Select Repository

1. **Select Repository:** Choose `Syntheverse_PoC_Contributer_UI_Vercel_Stripe`
   - The same repository as your main project, but we'll configure it differently

### Step 4: Configure Project Settings ⚠️ IMPORTANT

**Project Name:**
```
instrumentation-shell-api
```
or
```
syntheverse-instrumentation-api
```

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** ⚠️ **THIS IS CRITICAL**
```
instrumentation-shell-api
```
- Click "Edit" next to Root Directory
- Enter: `instrumentation-shell-api`
- This tells Vercel to treat this subdirectory as the project root

**Build and Output Settings:**
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

### Step 5: Environment Variables

**Before deploying**, add environment variables:

1. In the project configuration screen, click **"Environment Variables"**
2. Add:

```
INSTRUMENTATION_API_KEY = <generate-secure-key>
NODE_ENV = production
```

**Generate API Key:**
```bash
# Run this in terminal to generate a secure key:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Optional Variables:**
```
AUTHORIZED_CALLER_ORIGINS = https://syntheverse-poc.vercel.app
ENABLE_ORIGIN_CHECK = false
```

### Step 6: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Deployment URL will be: `https://instrumentation-shell-api-[hash].vercel.app`

---

## ✅ Verify It Worked

After deployment completes:

**1. Check Status Endpoint:**
```bash
curl https://your-deployment-url.vercel.app/api/instrumentation/status
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

**2. Check Protected Endpoint (with API key):**
```bash
curl -X POST https://your-deployment-url.vercel.app/api/instrumentation/score \
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

## 📋 Important Notes

1. **Same Repository, Different Root:** This creates a new project using the same repository but pointing to `instrumentation-shell-api/` subdirectory

2. **Separate from Main Project:** This will be a completely separate Vercel project with its own:
   - Deployment URL
   - Environment variables
   - Build settings
   - Deployment history

3. **Custom Domain (Optional):** You can add a custom domain later in Project Settings → Domains

---

## 🔗 After Deployment

1. **Save the Deployment URL** - You'll need this to update your main application
2. **Save the API Key** - Store it securely for integration
3. **Update Main Repository** - Configure the main app to call this new API

---

**Need Help?** If you don't see the "Root Directory" option, make sure you're on the project configuration screen before clicking "Deploy".
