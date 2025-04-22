Write-Host "=== Rainbow Clinic Deployment ===" -ForegroundColor Cyan
Write-Host "Logging in to Firebase..." -ForegroundColor Yellow

# Login to Firebase (uncomment if not already logged in)
# firebase login

Write-Host "Deploying to Firebase Hosting at rainbow-clinic.web.app..." -ForegroundColor Yellow
firebase deploy --only hosting

Write-Host "=== Deployment Complete ===" -ForegroundColor Cyan
Write-Host "Your website is now live at: https://rainbow-clinic.web.app" -ForegroundColor Green 