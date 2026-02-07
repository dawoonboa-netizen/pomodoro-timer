@echo off
echo ==============================================
echo [T1 Oner Timer] Deployment Sequence Initiated
echo ==============================================

:: 1. Move to Project Directory
cd /d "C:\Users\dawoo\.gemini\antigravity\scratch\pomodoro-timer"
echo [1/5] Moved to Project Directory (Check!)

:: 2. Configure Git Identity
git config user.email "dawoonboa-netizen@users.noreply.github.com"
git config user.name "dawoonboa-netizen"
echo [2/5] Configured Git Identity (Check!)

:: 3. Initialize and Commit
git init
git remote remove origin
git remote add origin https://github.com/dawoonboa-netizen/pomodoro-timer.git
git add .
git commit -m "T1 Oner Timer Launch: T1 Fighting!"
echo [3/5] Code Committed (Check!)

:: 4. Push to GitHub
echo [4/5] Pushing to GitHub... (Log in if prompted!)
git branch -M main
git push -u origin main --force

:: 5. Deploy to gh-pages
echo [5/5] Deploying to GitHub Pages...
call npm run deploy

echo ==============================================
echo [SUCCESS] Deployment Sequence Completed!
echo Visit: https://dawoonboa-netizen.github.io/pomodoro-timer
echo ==============================================
pause
