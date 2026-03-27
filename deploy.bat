@echo off
setlocal enabledelayedexpansion

echo.
echo ==========================================
echo   GuestGuard  ^|  GitHub Deploy Script
echo ==========================================
echo.

:: -- Change to project root --
cd /d "C:\Users\Rob\Desktop\final"

:: -- Verify git repo exists --
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Not a git repository.
    echo.
    echo Run these commands ONCE to set up GitHub:
    echo   git init
    echo   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo   git branch -M main
    echo.
    pause
    exit /b 1
)

:: -- Check remote is configured --
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: No git remote named 'origin' found.
    echo.
    echo Run this once to add your GitHub remote:
    echo   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo.
    pause
    exit /b 1
)

:: -- Stage all changes --
echo [1/3] Staging changes...
git add .
if %errorlevel% neq 0 (
    echo ERROR: git add failed.
    pause
    exit /b 1
)

:: -- Check if there is anything to commit --
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo        Nothing new to commit. Already up to date.
    goto push
)

:: -- Commit with timestamp --
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set TODAY=%%c-%%a-%%b
for /f "tokens=1-2 delims=: " %%a in ("%time%") do set NOW=%%a:%%b
echo [2/3] Committing...
git commit -m "Deploy %TODAY% %NOW%"
if %errorlevel% neq 0 (
    echo ERROR: git commit failed.
    pause
    exit /b 1
)

:push
:: -- Push to GitHub --
echo [3/3] Pushing to GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ERROR: git push failed.
    echo If this is your first push, make sure you ran:
    echo   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   SUCCESS! Pushed to GitHub.
echo.
echo   Railway  : auto-deploys from backend/
echo   Netlify  : auto-deploys from REACT frontends/template-react1/
echo.
echo   Both services should update in ~2 minutes.
echo ==========================================
echo.
pause
