@echo off
chcp 65001 >nul
setlocal EnableExtensions

rem ============================================================
rem LUMINA-30 X Card cleanup batch - FIXED
rem Deletes ONLY the 10 replacement-target HTML/JPG files.
rem Safe to rerun: missing files are skipped.
rem No subroutine labels are used.
rem ============================================================

set "BASE=%~dp0"

if exist "%BASE%assets\social\" (
    set "ROOT=%BASE:~0,-1%"
    goto FOUND
)

if exist "%BASE%Lumi30-Index\assets\social\" (
    set "ROOT=%BASE%Lumi30-Index"
    goto FOUND
)

echo.
echo [ERROR] Lumi30-Index folder could not be located.
echo Place this BAT either inside Lumi30-Index or next to it.
echo.
pause
exit /b 1

:FOUND
echo.
echo Target root:
echo   %ROOT%
echo.

for %%F in (
"ai-self-recreation-en.html"
"keep-power-to-stop-en.html"
"go-further-en.html"
"no-brakes-en.html"
"before-ai-redesign-en.html"
"future-still-ours-en.html"
"approve-progress-en.html"
"ai-self-recreation-ja.html"
"go-further-ja.html"
"no-brakes-ja.html"
) do (
    if exist "%ROOT%\%%~F" (
        del /f /q "%ROOT%\%%~F"
        if exist "%ROOT%\%%~F" (
            echo [FAILED] HTML %%~F
        ) else (
            echo [DELETED] HTML %%~F
        )
    ) else (
        echo [SKIP] HTML %%~F
    )
)

for %%F in (
"ai-self-recreation-en.jpg"
"keep-power-to-stop-en.jpg"
"go-further-en.jpg"
"no-brakes-en.jpg"
"before-ai-redesign-en.jpg"
"future-still-ours-en.jpg"
"approve-progress-en.jpg"
"ai-self-recreation-ja.jpg"
"go-further-ja.jpg"
"no-brakes-ja.jpg"
) do (
    if exist "%ROOT%\assets\social\%%~F" (
        del /f /q "%ROOT%\assets\social\%%~F"
        if exist "%ROOT%\assets\social\%%~F" (
            echo [FAILED] JPG  %%~F
        ) else (
            echo [DELETED] JPG  %%~F
        )
    ) else (
        echo [SKIP] JPG  %%~F
    )
)

echo.
echo Cleanup complete.
echo.
pause
