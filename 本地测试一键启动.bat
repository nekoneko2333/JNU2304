@echo off
chcp 65001 >nul
title Jekyll 本地服务器启动器

echo ========================================
echo   Jekyll 本地测试服务器启动器
echo ========================================
echo.

:: 检查 Ruby 是否安装
where ruby >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Ruby！
    echo.
    echo 请先安装 Ruby：
    echo 1. 访问 https://rubyinstaller.org/
    echo 2. 下载并安装 Ruby+Devkit
    echo 3. 安装完成后重新运行此脚本
    echo.
    pause
    exit /b 1
)

echo [✓] Ruby 已安装
ruby -v
echo.

:: 检查 Bundler 是否安装
where bundle >nul 2>&1
if %errorlevel% neq 0 (
    echo [提示] 正在安装 Bundler...
    gem install bundler
    if %errorlevel% neq 0 (
        echo [错误] Bundler 安装失败！
        pause
        exit /b 1
    )
    echo [✓] Bundler 安装成功
    echo.
)

echo [✓] Bundler 已安装
bundle -v
echo.

:: 检查 Gemfile.lock 是否存在，如果不存在则安装依赖
if not exist "Gemfile.lock" (
    echo [提示] 首次运行，正在安装依赖包...
    echo 这可能需要几分钟时间，请耐心等待...
    echo [提示] 正在下载和安装 gem 包，请稍候...
    echo.
    bundle install
    if %errorlevel% neq 0 (
        echo.
        echo [错误] 依赖安装失败！
        echo 请检查网络连接或手动运行: bundle install
        pause
        exit /b 1
    )
    echo.
    echo [✓] 依赖安装完成
    echo.
) else (
    echo [提示] 检查依赖更新...
    bundle check
    if %errorlevel% neq 0 (
        echo [提示] 检测到依赖缺失，正在安装...
        echo [提示] 这可能需要几分钟时间，请耐心等待...
        echo.
        bundle install
        if %errorlevel% neq 0 (
            echo.
            echo [错误] 依赖安装失败！
            pause
            exit /b 1
        )
        echo.
        echo [✓] 依赖安装完成
        echo.
    ) else (
        echo [✓] 所有依赖已就绪
        echo.
    )
)

echo ========================================
echo   正在启动 Jekyll 服务器...
echo ========================================
echo.
echo.
echo ════════════════════════════════════════
echo   服务器启动后，请在浏览器中访问：
echo.
echo   http://127.0.0.1:4000/JNU2304/
echo.
echo ════════════════════════════════════════
echo.
echo 按 Ctrl+C 停止服务器
echo.
echo.

:: 启动 Jekyll 服务器
bundle exec jekyll s -l -H 127.0.0.1

:: 如果服务器意外退出，显示提示
echo.
echo.
echo ════════════════════════════════════════
echo   服务器已停止
echo   访问地址: http://127.0.0.1:4000/JNU2304/
echo ════════════════════════════════════════

pause

