@echo off
echo ========================================================
echo   AVNIVO - Push Repository to GitHub
echo   Target: https://github.com/rishabhpal549-web/avnivo.git
echo ========================================================
echo.
echo Checking Git status...
git status
if %errorlevel% neq 0 (
    echo Git CLI is not found on your Windows PATH.
    echo Please use Antigravity IDE built-in Source Control:
    echo 1. Press Ctrl + Shift + G in this IDE.
    echo 2. Click "Publish Branch to GitHub".
    pause
    exit /b
)

echo.
echo Pushing branch 'main' to GitHub origin...
git push -u origin main
echo.
echo Done! Visit https://github.com/rishabhpal549-web/avnivo to verify.
pause

