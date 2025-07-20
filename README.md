# 个人学习记录博客

基于 VuePress 和 vuepress-theme-hope 构建的个人学习笔记博客，记录 C#、Vue、PLC编程等技术学习内容。

## 🚀 快速开始

### 环境要求

- Node.js 版本 >= 18
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <你的仓库地址>
   cd <项目目录名>
   ```

2. **配置 npm 镜像源（推荐）**
   ```bash
   npm config set registry https://registry.npmmirror.com
   ```

3. **安装依赖**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **启动开发服务器**
   ```bash
   npm run docs:dev
   ```

5. **访问项目**
   
   打开浏览器访问：`http://localhost:8080`

## 📝 可用命令

```bash
# 开发模式启动
npm run docs:dev

# 构建生产版本
npm run docs:build

# 清除缓存并启动开发模式
npm run docs:clean-dev

# 更新依赖包
npm run docs:update-package
```

## 🛠️ 常见问题

### Node.js 版本过低

如果提示 Node.js 版本过低，请：

1. 下载并安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. 下载 `nvm-setup.exe` 并安装
3. 使用 nvm 安装最新版本的 Node.js：
   ```bash
   nvm install latest
   nvm use latest
   ```

### 依赖安装失败

如果遇到依赖安装问题，请尝试：

```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install --legacy-peer-deps
```
