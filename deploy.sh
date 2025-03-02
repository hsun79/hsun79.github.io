#!/bin/bash
set -e

# Build the project
echo "Building the project..."
pnpm run build

# Ensure .nojekyll exists in the dist folder
echo "Creating .nojekyll file..."
touch dist/.nojekyll

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx gh-pages -d dist 