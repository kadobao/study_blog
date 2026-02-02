---
title: 安装使用TailWindCSS
icon: fa-brands fa-vuejs
order: 36
category:
  - vue3学习
tag:
  - vue3学习
  - TailWindCSS
---

## 一、永久设置淘宝镜像

```bash
npm config set registry https://registry.npmmirror.com
```

### 验证镜像设置

```bash
npm config get registry
```

## 二、安装 TailWindCSS

```bash
npm install -D tailwindcss @tailwindcss/vite
```

## 三、配置 TailWindCSS

### 1. 创建样式文件

创建 `src/style.css` 文件，然后添加以下内容：

```css
@import "tailwindcss";
```

### 2. 配置 Vite

在 `vite.config.js` 里面添加：

```js
import tailwindcss from '@tailwindcss/vite'
```

并在 `plugins` 数组中添加 `tailwindcss()`：

```js
plugins: [vue(), tailwindcss()]
```

### 3. 引入样式文件

在 `main.js` 里面添加：

```js
import './style.css'
```