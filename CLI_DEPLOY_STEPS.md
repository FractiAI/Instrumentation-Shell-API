# CLI Deployment Steps - Run These Commands

## Step-by-Step CLI Deployment

Run these commands in your terminal:

### 1. Navigate to Directory
```bash
cd instrumentation-shell-api
```

### 2. Login to Vercel (Interactive - will open browser)
```bash
vercel login
```
- Select your authentication method (GitHub recommended)
- Complete authentication in browser

### 3. Create New Project
```bash
vercel link
```
When prompted:
- **Set up and develop?** → Type `Y` and press Enter
- **Which scope?** → Select your team (use arrow keys, press Enter)
- **Link to existing project?** → Type `N` (create new)
- **What's your project's name?** → Type `instrumentation-shell-api` and press Enter
- **In which directory is your code located?** → Press Enter (use `./`)

### 4. Generate and Set API Key
```bash
# Generate API key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated key, then:
```bash
# Set environment variable (paste the key when prompted)
echo "YOUR_GENERATED_KEY_HERE" | vercel env add INSTRUMENTATION_API_KEY production

# Set NODE_ENV
echo "production" | vercel env add NODE_ENV production
```

### 5. Deploy
```bash
vercel --prod
```

---

## ⚠️ Important: Set Root Directory

After deployment, you MUST configure the root directory:

1. Go to: https://vercel.com/dashboard
2. Click on `instrumentation-shell-api` project
3. Go to **Settings** → **General**
4. Find **Root Directory** setting
5. Set it to: `instrumentation-shell-api`
6. Click **Save**
7. Redeploy: `vercel --prod`

---

## Alternative: Use Vercel Token (Non-Interactive)

If you have a Vercel token:

```bash
export VERCEL_TOKEN="your-token-here"
vercel link --token=$VERCEL_TOKEN --name instrumentation-shell-api
vercel env add INSTRUMENTATION_API_KEY production --token=$VERCEL_TOKEN
vercel --prod --token=$VERCEL_TOKEN
```

---

## Quick Test After Deployment

```bash
# Get your deployment URL from vercel output, then:
curl https://your-project.vercel.app/api/instrumentation/status
```
