#!/bin/bash
# Script to check GitHub → Vercel auto-deploy configuration

echo "🔍 Checking GitHub → Vercel Auto-Deploy Configuration"
echo "======================================================"
echo ""

echo "📌 Repository Information:"
echo "Repository: $(git remote get-url origin)"
echo "Branch: $(git branch --show-current)"
echo "Latest commit: $(git log -1 --oneline)"
echo ""

echo "📋 Recent Commits (should trigger auto-deploy):"
git log --oneline -5 --decorate
echo ""

echo "✅ Verification: Latest commit has correct code"
echo "Line 85 should have: seed: null"
git show HEAD:src/app/api/instrumentation/measure/route.ts | sed -n '85p'
echo ""

echo "🔗 Remote Status:"
git remote -v
echo ""

echo "📤 Push Status:"
git status -sb
echo ""

echo "🚀 Auto-Deploy Check Recommendations:"
echo ""
echo "1. Vercel Dashboard → Project → Settings → Git"
echo "   ✓ Repository connected: https://github.com/FractiAI/Instrumentation-Shell-API"
echo "   ✓ Production Branch: main"
echo "   ✓ Auto-deploy: ENABLED"
echo ""
echo "2. GitHub Repository → Settings → Webhooks"
echo "   ✓ Should have Vercel webhook: https://api.vercel.com/v1/integrations/deploy/..."
echo "   ✓ Events: push, pull_request"
echo "   ✓ Active: ✓"
echo ""
echo "3. Vercel Dashboard → Deployments"
echo "   ✓ Latest deployment should be from commit: $(git rev-parse HEAD)"
echo "   ✓ Status should show: Ready or Building"
echo ""
echo "🔧 To Fix Auto-Deploy:"
echo ""
echo "Option 1: Reconnect Repository in Vercel"
echo "  1. Vercel Dashboard → Project → Settings → Git"
echo "  2. Click 'Disconnect' then 'Connect Git Repository'"
echo "  3. Select: FractiAI/Instrumentation-Shell-API"
echo "  4. Branch: main"
echo "  5. Enable Auto-deploy"
echo ""
echo "Option 2: Manually Trigger Deployment"
echo "  1. Vercel Dashboard → Deployments"
echo "  2. Click 'Create Deployment' or 'Redeploy'"
echo "  3. Select commit: $(git rev-parse HEAD)"
echo "  4. Uncheck 'Use existing Build Cache'"
echo "  5. Deploy"
echo ""
echo "Option 3: Use Vercel CLI (if authenticated)"
echo "  vercel login"
echo "  vercel --prod --force"
