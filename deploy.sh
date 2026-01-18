#!/bin/bash

# Instrumentation Shell API - Vercel Deployment Script
# This script creates a new Vercel project and deploys it

set -e

echo "🚀 Deploying Instrumentation Shell API to Vercel..."
echo ""

# Navigate to project directory
cd "$(dirname "$0")"
PROJECT_DIR=$(pwd)

echo "📁 Project Directory: $PROJECT_DIR"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Not logged in to Vercel. Please login..."
    echo "   This will open a browser window for authentication."
    vercel login
fi

echo ""
echo "✅ Logged in to Vercel"
echo ""

# Generate API key if not provided
if [ -z "$INSTRUMENTATION_API_KEY" ]; then
    echo "🔑 Generating secure API key..."
    INSTRUMENTATION_API_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    echo "   Generated: $INSTRUMENTATION_API_KEY"
    echo "   ⚠️  Save this key securely!"
    echo ""
fi

# Create new project or link existing
echo "🔗 Linking/Creating Vercel project..."
echo "   Project Name: instrumentation-shell-api"
echo "   Root Directory: instrumentation-shell-api (from parent repo)"
echo ""

# Try to link project
if [ ! -d ".vercel" ]; then
    echo "📝 Creating new Vercel project..."
    vercel link --yes --name instrumentation-shell-api 2>&1 || {
        echo "⚠️  Project linking requires interaction. Running interactive link..."
        vercel link
    }
fi

echo ""
echo "📦 Setting environment variables..."

# Set environment variables
echo "   Setting INSTRUMENTATION_API_KEY..."
echo "$INSTRUMENTATION_API_KEY" | vercel env add INSTRUMENTATION_API_KEY production

echo "   Setting NODE_ENV..."
echo "production" | vercel env add NODE_ENV production

echo ""
echo "🚀 Deploying to production..."
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Get your deployment URL from the output above"
echo "   2. Test the status endpoint: curl https://your-url.vercel.app/api/instrumentation/status"
echo "   3. Save your API key: $INSTRUMENTATION_API_KEY"
echo ""
