---
title: vue3项目里面使用axios
icon: fa-brands fa-vuejs
order: 32
index: false
category:
  - vue3学习
tag:
  - vue3学习
---









先安装npm install axios，再创建一个axios实例（axios.ts），之后要使用，就引入这个实例，再写一个vite.config.ts，配置别名和配置代理

------



### 创建 `axios.ts` 实例，并配置 Vite 别名和代理

#### 1. **安装 Axios**
首先，安装 `axios`：
```bash
npm install axios
```

#### 2. **创建 Axios 实例 (`axios.ts`)**

在 `src/axios.ts` 文件中创建一个 Axios 实例，代码如下：

```ts
// src/axios.ts
import axios from 'axios'

// 创建 Axios 实例
const service = axios.create({
  baseURL: '/api', // 基础请求地址，所有的请求都从 /api 开始
  timeout: 5000,   // 请求超时，单位为毫秒
  headers: {
    'Content-Type': 'application/json',  // 默认的请求头
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送前进行处理，添加认证 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`  // 设置 Authorization 头部
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理，这行代码的作用是提取 response 中的 data 字段，并将它作为最终结果返回。
    return response.data
  },
  (error) => {
    // 处理响应错误
    console.error('请求失败', error)
    return Promise.reject(error)
  }
)

export default service
```

#### 3. **如何使用 Axios 实例**

在其他文件中引入并使用这个 `axios.ts` 实例：

```ts
// 引入 axios 实例
import axiosInstance from '@/axios'

axiosInstance.get('/users')
  .then(response => {
    console.log('用户列表', response)
  })
  .catch(error => {
    console.error('请求失败', error)
  })
```

#### 4. **配置 Vite 别名和代理 (`vite.config.ts`)**

现在创建 `vite.config.ts` 文件，配置路径别名和 API 代理。别名让你可以使用 `@` 直接引用 `src` 目录下的文件，而代理可以让你在开发环境中处理 API 请求的跨域问题。

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // '@' 别名，指向 src 目录
      '~': path.resolve(__dirname, 'src'),  // '~' 别名，指向 src 目录
    }
  },
  server: {
    proxy: {
      // 配置代理，将以 /api 开头的请求代理到目标服务器
      '/api': {
        target: 'http://your-api-server.com',  // 目标服务器地址
        changeOrigin: true,                    // 更改请求源
        rewrite: (path) => path.replace(/^\/api/, '')  // 重写路径，移除 /api 前缀
      }
    }
  },
  plugins: [vue()]
})
```

#### 5. **解释**：
- **Axios 实例 (`axios.ts`)**：
  - 创建了一个 Axios 实例，并设置了基础路径（`/api`）和默认超时时间。
  - **请求拦截器**：在请求发出前自动添加 `Authorization` 头部，携带从 `localStorage` 中获取的 `token`。
  - **响应拦截器**：处理响应数据，如果响应错误，也会自动捕获并处理。

- **Vite 配置文件 (`vite.config.ts`)**：
  - **别名配置**：配置了 `@` 和 `~` 两个别名，指向项目的 `src` 目录。你可以在项目中通过 `@` 或 `~` 来简化引用路径。
  - **代理配置**：所有以 `/api` 开头的请求会代理到 `http://your-api-server.com`，并且 `/api` 前缀会在请求中被移除，以匹配后端实际的 API 路径。

#### 6. **总结**：
- **`axios.ts`** 提供了一个全局的 Axios 实例，可以用来发送 HTTP 请求，并且自动处理 `token` 认证和响应。
- **`vite.config.ts`** 中配置了路径别名和代理，简化路径引用的同时处理开发环境的跨域请求。

你可以在项目中通过引入 `axios.ts` 实例，结合 `vite.config.ts` 配置的代理，轻松发起 API 请求并处理认证。