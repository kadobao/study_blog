---
title: vue3中<router-view>的使用
icon: fa-brands fa-vuejs
order: 33
category:
  - vue3学习
tag:
  - vue3学习
---



::: details 点击展开项目代码
````
## 文件夹结构
```
├── .gitignore
├── .vscode/
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── public/
├── src/
│   ├── App.vue
│   ├── assets/
│   │   └── vue.svg
│   ├── components/
│   ├── main.ts
│   ├── router/
│   │   └── index.ts
│   ├── style.css
│   ├── views/
│   │   ├── About.vue
│   │   └── Home.vue
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vue-router-example汇总源码.md
```

====================== vue-router-example\.gitignore ======================
## vue-router-example\.gitignore
```  # 内容未读取（排除）
```

====================== vue-router-example\index.html ======================
## vue-router-example\index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>

```

====================== vue-router-example\package-lock.json ======================
## vue-router-example\package-lock.json
```  # 内容未读取（排除）
```

====================== vue-router-example\package.json ======================
## vue-router-example\package.json
```json
{
  "name": "vue-router-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.10",
    "vue-router": "^4.4.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.1.4",
    "typescript": "^5.5.3",
    "vite": "^5.4.8",
    "vue-tsc": "^2.1.6"
  }
}

```

====================== vue-router-example\tsconfig.app.json ======================
## vue-router-example\tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}

```

====================== vue-router-example\tsconfig.json ======================
## vue-router-example\tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

====================== vue-router-example\tsconfig.node.json ======================
## vue-router-example\tsconfig.node.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

====================== vue-router-example\vite.config.ts ======================
## vue-router-example\vite.config.ts
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})

```

====================== vue-router-example\vue-router-example汇总源码.md ======================
## vue-router-example\vue-router-example汇总源码.md
```  # 内容未读取（排除）
```

====================== vue-router-example\src\App.vue ======================
## vue-router-example\src\App.vue
```vue
<script lang="ts" setup>
</script>

<template>
  <!-- 根据当前路由，渲染对应的组件 -->
  <router-view></router-view>
</template>


<style>
nav {
  margin-bottom: 20px;
}
</style>

```

====================== vue-router-example\src\main.ts ======================
## vue-router-example\src\main.ts
```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

```

====================== vue-router-example\src\style.css ======================
## vue-router-example\src\style.css
```  # 内容未读取（排除）
```

====================== vue-router-example\src\vite-env.d.ts ======================
## vue-router-example\src\vite-env.d.ts
```ts
/// <reference types="vite/client" />

```

====================== vue-router-example\src\assets\vue.svg ======================
## vue-router-example\src\assets\vue.svg
```  # 内容未读取（排除）
```

====================== vue-router-example\src\router\index.ts ======================
## vue-router-example\src\router\index.ts
```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

```

====================== vue-router-example\src\views\About.vue ======================
## vue-router-example\src\views\About.vue
```vue
<template>
    <div>
      <h1>关于我们</h1>
      <p>这是关于页面。</p>
    </div>
  </template>
  
```

====================== vue-router-example\src\views\Home.vue ======================
## vue-router-example\src\views\Home.vue
```vue
<template>
    <div>
      <h1>首页</h1>
      <p>欢迎来到首页！</p>
    </div>
  </template>
  
```
````
:::









### 生成项目和启动命令：
```
npm create vite@latest vue-router-example -- --template vue-ts
cd vue-router-example
npm install
npm install vue-router
npm run dev
```





<br><br>


------


### 解释：

`<router-view>`:作用是渲染当前路由对应的组件。它是一个占位符，Vue Router 会根据当前路由自动替换它，渲染出对应的组件。


之所以没有用`<router-link>`就是怕误导，认为`<router-view>`要配合`<router-link>`才能生效。

你输入`http://localhost:5173/`和`http://localhost:5173/about`就能看到不同的页面了。