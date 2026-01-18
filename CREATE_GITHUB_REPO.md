# Create GitHub Repository for Instrumentation Shell API

## Option 1: Using GitHub CLI (gh)

```bash
cd instrumentation-shell-api

# Create repository and push
gh repo create Syntheverse-Instrumentation-Shell-API \
  --public \
  --description "Instrument-grade measurement and verification API - NSPFRP Compliant" \
  --source=. \
  --remote=origin \
  --push
```

## Option 2: Using GitHub Web Interface

1. **Go to GitHub:**
   - Visit: https://github.com/new
   - Sign in to your account

2. **Create Repository:**
   - **Repository name:** `Syntheverse-Instrumentation-Shell-API`
   - **Description:** `Instrument-grade measurement and verification API - NSPFRP Compliant`
   - **Visibility:** Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click **"Create repository"**

3. **Push Existing Code:**
   ```bash
   cd instrumentation-shell-api
   git remote add origin https://github.com/FractiAI/Syntheverse-Instrumentation-Shell-API.git
   git branch -M main
   git push -u origin main
   ```

## Option 3: Using GitHub API (if you have a token)

```bash
# Set your GitHub token
export GITHUB_TOKEN="your-github-token"

# Create repository via API
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "Syntheverse-Instrumentation-Shell-API",
    "description": "Instrument-grade measurement and verification API - NSPFRP Compliant",
    "private": false
  }'

# Then push
cd instrumentation-shell-api
git remote add origin https://github.com/FractiAI/Syntheverse-Instrumentation-Shell-API.git
git branch -M main
git push -u origin main
```

---

## After Creating Repository

Once the repository is created and pushed:

1. **Connect to Vercel:**
   - Go to Vercel Dashboard
   - Import the new GitHub repository
   - Root Directory: `./` (default - this will be a standalone repo)

2. **Deploy:**
   - Environment variables are already set
   - Just trigger a deployment

---

**Repository will be:** `https://github.com/FractiAI/Syntheverse-Instrumentation-Shell-API`
