# Jekyll 本地测试服务器一键启动脚本 (PowerShell)
# 编码: UTF-8

$ErrorActionPreference = "Stop"

# 设置控制台编码为 UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Jekyll 本地测试服务器启动器" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Ruby 是否安装
try {
    $rubyVersion = ruby -v 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Ruby not found"
    }
    Write-Host "[✓] Ruby 已安装" -ForegroundColor Green
    Write-Host $rubyVersion
    Write-Host ""
} catch {
    Write-Host "[错误] 未检测到 Ruby！" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先安装 Ruby："
    Write-Host "1. 访问 https://rubyinstaller.org/"
    Write-Host "2. 下载并安装 Ruby+Devkit"
    Write-Host "3. 安装完成后重新运行此脚本"
    Write-Host ""
    Read-Host "按 Enter 键退出"
    exit 1
}

# 检查 Bundler 是否安装
try {
    $bundleVersion = bundle -v 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Bundler not found"
    }
    Write-Host "[✓] Bundler 已安装" -ForegroundColor Green
    Write-Host $bundleVersion
    Write-Host ""
} catch {
    Write-Host "[提示] 正在安装 Bundler..." -ForegroundColor Yellow
    gem install bundler
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[错误] Bundler 安装失败！" -ForegroundColor Red
        Read-Host "按 Enter 键退出"
        exit 1
    }
    Write-Host "[✓] Bundler 安装成功" -ForegroundColor Green
    Write-Host ""
}

# 检查并安装依赖
if (-not (Test-Path "Gemfile.lock")) {
    Write-Host "[提示] 首次运行，正在安装依赖包..." -ForegroundColor Yellow
    Write-Host "这可能需要几分钟时间，请耐心等待..." -ForegroundColor Yellow
    Write-Host "[提示] 正在下载和安装 gem 包，请稍候..." -ForegroundColor Yellow
    Write-Host ""
    bundle install
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "[错误] 依赖安装失败！" -ForegroundColor Red
        Write-Host "请检查网络连接或手动运行: bundle install" -ForegroundColor Red
        Read-Host "按 Enter 键退出"
        exit 1
    }
    Write-Host ""
    Write-Host "[✓] 依赖安装完成" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[提示] 检查依赖更新..." -ForegroundColor Yellow
    bundle check
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[提示] 检测到依赖缺失，正在安装..." -ForegroundColor Yellow
        Write-Host "[提示] 这可能需要几分钟时间，请耐心等待..." -ForegroundColor Yellow
        Write-Host ""
        bundle install
        if ($LASTEXITCODE -ne 0) {
            Write-Host ""
            Write-Host "[错误] 依赖安装失败！" -ForegroundColor Red
            Read-Host "按 Enter 键退出"
            exit 1
        }
        Write-Host ""
        Write-Host "[✓] 依赖安装完成" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "[✓] 所有依赖已就绪" -ForegroundColor Green
        Write-Host ""
    }
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  正在启动 Jekyll 服务器..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Yellow
Write-Host "  服务器启动后，请在浏览器中访问：" -ForegroundColor Yellow
Write-Host ""
Write-Host "  " -NoNewline
Write-Host "http://127.0.0.1:4000/JNU2304/" -ForegroundColor Green -BackgroundColor Black
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Yellow
Write-Host ""
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Yellow
Write-Host ""
Write-Host ""

# 启动 Jekyll 服务器
try {
    bundle exec jekyll s -l -H 127.0.0.1
} catch {
    Write-Host ""
    Write-Host "[错误] 服务器启动失败！" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Read-Host "按 Enter 键退出"
    exit 1
}

# 如果服务器意外退出，显示提示
Write-Host ""
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Yellow
Write-Host "  服务器已停止" -ForegroundColor Yellow
Write-Host "  访问地址: " -NoNewline -ForegroundColor Yellow
Write-Host "http://127.0.0.1:4000/JNU2304/" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Yellow

