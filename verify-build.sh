#!/bin/bash
# Verification script to check what Vercel should be building

echo "🔍 Vercel Build Troubleshooting"
echo "================================"
echo ""

echo "📌 Current Repository State:"
echo "Latest commit: $(git log -1 --oneline)"
echo ""

echo "✅ Line 85 in current file:"
sed -n '85p' src/app/api/instrumentation/measure/route.ts
echo ""

echo "✅ Line 85 in HEAD commit:"
git show HEAD:src/app/api/instrumentation/measure/route.ts | sed -n '85p'
echo ""

echo "📋 Recent commits with seed fix:"
git log --oneline --all --grep="seed\|type" -5
echo ""

echo "❌ Commit BEFORE fix (has seed: false):"
git show e704032^:src/app/api/instrumentation/measure/route.ts | sed -n '85p'
echo ""

echo "✅ Commit AFTER fix (has seed: null):"
git show e704032:src/app/api/instrumentation/measure/route.ts | sed -n '85p'
echo ""

echo "🔍 Checking for any 'seed: false' in codebase:"
if grep -r "seed:\s*false" src/ 2>/dev/null; then
    echo "❌ FOUND seed: false in codebase!"
else
    echo "✅ No 'seed: false' found - code is correct"
fi
echo ""

echo "📝 Recommendation:"
echo "Vercel is building from a commit BEFORE e704032."
echo "Vercel should build from commit: $(git log -1 --oneline)"
echo ""
echo "Next steps:"
echo "1. Go to Vercel Dashboard → Deployments"
echo "2. Click 'Redeploy' on the latest deployment"
echo "3. Make sure it deploys from commit: $(git rev-parse HEAD)"
echo "4. Or use: vercel --prod --force"
