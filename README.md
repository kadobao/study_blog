# 个人学习记录博客

基于 VuePress 和 vuepress-theme-hope 构建的个人学习笔记博客，记录 C#、Vue、PLC编程等技术学习内容。

## 🚀 快速开始

### 环境要求

- Node.js 版本 >= 18
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/kadobao/study_blog.git
   cd study_blog
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


## ✍️ 写作指南

### 添加新的文章分类

1. 在 `src/acrticle/` 下新建文件夹（如：`新分类/`）
2. 在新文件夹下创建 `README.md` 文件作为分类首页.
3. 在 `src/.vuepress/sidebar.ts` 中添加侧边栏配置：
   ```typescript
   {
     text: "新分类",
     icon: "图标名称",
     prefix: "acrticle/新分类",
     link: "acrticle/新分类/",
     children: "structure",
     collapsible: true
   }
   ```

### 在现有分类中添加文章

直接在对应的文件夹中创建 `.md` 文件即可，文件会自动出现在侧边栏中。

### 文章格式规范

每篇文章开头需要添加 frontmatter 配置：

```yaml
---
title: 文章标题
icon: 图标名称
order: 排序号
category:
  - 分类名称
tag:
  - 标签1
  - 标签2
---
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

### 端口被占用

如果 8080 端口被占用，可以指定其他端口：

```bash
npm run docs:dev -- --port 3000
```

## 🎯 功能特性

- 📚 支持多分类文章管理
- 🎨 美观的主题界面
- 📱 响应式设计，支持移动端
- 🔍 全文搜索功能
- 📊 代码高亮和图表支持
- 🚀 自动部署到 GitHub Pages

## 🚀 部署

项目配置了 GitHub Actions 自动部署，推送到 `main` 分支后会自动构建并部署到 GitHub Pages。

手动部署：
```bash
npm run docs:build
```
