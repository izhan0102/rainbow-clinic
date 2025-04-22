#!/bin/bash

echo "=== Rainbow Clinic Deployment ==="
echo "Logging in to Firebase..."

# Login to Firebase (uncomment if not already logged in)
# firebase login

echo "Deploying to Firebase Hosting at rainbow-clinic.web.app..."
firebase deploy --only hosting

echo "=== Deployment Complete ==="
echo "Your website is now live at: https://rainbow-clinic.web.app" 