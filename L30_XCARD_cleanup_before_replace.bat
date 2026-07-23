@echo off
chcp 65001 >nul
setlocal EnableExtensions

rem ============================================================
rem LUMINA-30 X Card cleanup batch
rem Deletes ONLY the 10 current replacement-target HTML/JPG files.
rem It does NOT delete other existing X cards.
rem ============================================================

set "BASE=%~dp0"

rem Case 1: batch is placed next to the Lumi30-Index folder.
if exist "%BASE%Lumi30-Index\" (
    set "ROOT=%BASE%Lumi30-Index"
    goto :FOUND
)

rem Case 2: batch is placed inside the Lumi30-Index folder.
if exist "%BASE%assets\social\" (
    set "ROOT=%BASE:~0,-1%"
    goto :FOUND
)

echo.
echo [ERROR] Lumi30-Index folder could not be located.
echo Place this BAT either:
echo   1) next to the Lumi30-Index folder, or
echo   2) inside the Lumi30-Index folder.
echo.
pause
exit /b 1

:FOUND
echo.
echo Target root:
echo   %ROOT%
echo.
echo The following 10 HTML and 10 JPG files will be deleted if present.
echo Other files will NOT be deleted.
echo.

call :DELFILE "%ROOT%\ai-self-recreation-en.html"
call :DELFILE "%ROOT%\keep-power-to-stop-en.html"
call :DELFILE "%ROOT%\go-further-en.html"
call :DELFILE "%ROOT%\no-brakes-en.html"
call :DELFILE "%ROOT%\before-ai-redesign-en.html"
call :DELFILE "%ROOT%\future-still-ours-en.html"
call :DELFILE "%ROOT%\approve-progress-en.html"
call :DELFILE "%ROOT%\ai-self-recreation-ja.html"
call :DELFILE "%ROOT%\go-further-ja.html"
call :DELFILE "%ROOT%\no-brakes-ja.html"

call :DELFILE "%ROOT%\assets\social\ai-self-recreation-en.jpg"
call :DELFILE "%ROOT%\assets\social\keep-power-to-stop-en.jpg"
call :DELFILE "%ROOT%\assets\social\go-further-en.jpg"
call :DELFILE "%ROOT%\assets\social\no-brakes-en.jpg"
call :DELFILE "%ROOT%\assets\social\before-ai-redesign-en.jpg"
call :DELFILE "%ROOT%\assets\social\future-still-ours-en.jpg"
call :DELFILE "%ROOT%\assets\social\approve-progress-en.jpg"
call :DELFILE "%ROOT%\assets\social\ai-self-recreation-ja.jpg"
call :DELFILE "%ROOT%\assets\social\go-further-ja.jpg"
call :DELFILE "%ROOT%\assets\social\no-brakes-ja.jpg"

echo.
echo Cleanup complete.
echo Only the exact target files above were processed.
echo.
pause
exit /b 0

:DELFILE
if exist "%~1" (
    del /f /q "%~1"
    if exist "%~1" (
        echo [FAILED] %~1
    ) else (
        echo [DELETED] %~1
    )
) else (
    echo [SKIP]    %~1
)
exit /b 0
