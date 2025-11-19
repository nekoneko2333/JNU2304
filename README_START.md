# 🚀 本地测试一键启动指南

本项目提供了便捷的一键启动脚本，帮助您快速启动 Jekyll 本地测试服务器。

## 📋 前置要求

在运行启动脚本之前，请确保已安装以下软件：

### 1. Ruby
- **下载地址**: https://rubyinstaller.org/
- **推荐版本**: Ruby+Devkit 3.1.x 或更高版本
- **安装说明**: 
  1. 下载 Ruby+Devkit 安装包
  2. 运行安装程序，勾选 "Add Ruby executables to your PATH"
  3. 安装完成后，在终端运行 `ruby -v` 验证安装

### 2. Git（可选，但推荐）
- 用于版本控制
- 下载地址: https://git-scm.com/

## 🎯 使用方法

### Windows 用户

#### 方法一：使用批处理脚本（推荐）
1. 双击运行 `本地测试一键启动.bat`
2. 脚本会自动检查环境、安装依赖并启动服务器
3. 在浏览器中访问 `http://127.0.0.1:4000/JNU2304/`

#### 方法二：使用 PowerShell 脚本
1. 右键点击 `本地测试一键启动.ps1`
2. 选择"使用 PowerShell 运行"
3. 如果遇到执行策略限制，请在 PowerShell 中运行：
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
4. 然后再次运行脚本

### Linux/Mac 用户

使用现有的 shell 脚本：
```bash
bash tools/run.sh
```

## 📝 脚本功能说明

启动脚本会自动完成以下操作：

1. ✅ **环境检查**
   - 检查 Ruby 是否已安装
   - 检查 Bundler 是否已安装（未安装则自动安装）

2. ✅ **依赖管理**
   - 首次运行自动安装所有依赖包（`bundle install`）
   - 后续运行自动检查并更新依赖

3. ✅ **启动服务器**
   - 启动 Jekyll 开发服务器
   - 启用实时重载（Live Reload）
   - 绑定到本地地址 `127.0.0.1:4000`

## 🌐 访问地址

启动成功后，在浏览器中访问：

- **本地访问**: http://127.0.0.1:4000/JNU2304/
- **局域网访问**: http://[你的IP地址]:4000/JNU2304/

## ⚠️ 常见问题

### 1. 提示"未检测到 Ruby"
- 确保已安装 Ruby 并添加到系统 PATH
- 重新打开命令行窗口后再运行脚本
- Windows 用户可能需要重启电脑

### 2. 依赖安装失败
- 检查网络连接
- 尝试使用国内镜像源：
  ```bash
  bundle config mirror.https://rubygems.org https://gems.ruby-china.com
  ```

### 3. 端口被占用
- Jekyll 默认使用 4000 端口
- 如果端口被占用，可以手动指定其他端口：
  ```bash
  bundle exec jekyll s -l -H 127.0.0.1 -P 4001
  ```

### 4. 页面显示异常
- 清除浏览器缓存
- 检查 `_config.yml` 中的 `baseurl` 配置是否正确
- 确保访问地址包含正确的 baseurl（如 `/JNU2304/`）

## 🛑 停止服务器

在运行脚本的终端窗口中按 `Ctrl + C` 即可停止服务器。

## 📚 更多信息

- Jekyll 官方文档: https://jekyllrb.com/
- Chirpy 主题文档: https://chirpy.cotes.page/
- 项目 README: 查看项目根目录的 `README.md`

---

**提示**: 首次运行可能需要较长时间来安装依赖，请耐心等待。后续运行会更快。

