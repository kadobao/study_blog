---
title: Vue3 Axios封装和API模块定义实现指南
icon: fa-brands fa-vuejs
order: 40
category:
  - vue3学习
tag:
  - vue3学习
  - Axios
  - API
---

# Vue3 Axios 封装和 API 模块定义

本技能提供 Vue3 项目中 Axios 的二次封装和 API 接口定义的完整实现方案。

---

## 目录

- [一、Vite 代理配置](#一vite-代理配置)
- [二、Request.js 请求封装](#二requestjs-请求封装)
- [三、API 模块定义](#三api-模块定义)
- [四、在组件中使用 API](#四在组件中使用-api)
- [五、扩展配置](#五扩展配置)
- [六、最佳实践](#六最佳实践)

---

## 一、Vite 代理配置

在项目根目录的 `vite.config.js` 中配置 API 代理，解决跨域问题：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 后端API服务器地址
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 1.1 配置说明

| 配置项 | 说明 | 示例值 |
|:------|:-----|:-------|
| `/api` | 请求路径前缀 | `/api` |
| `target` | 后端服务器地址 | `http://localhost:5000` |
| `changeOrigin` | 是否修改请求头中的 Origin | `true` |
| `secure` | 是否开启 SSL 验证 | `false` |
| `rewrite` | 路径重写规则 | 移除 `/api` 前缀 |

### 1.2 工作原理

1. 前端请求 `/api/user/list`
2. Vite 代理将请求转发到 `http://localhost:5000/user/list`
3. 后端返回响应，代理再将响应返回给前端

### 1.3 注意事项

- **开发环境**：使用代理解决跨域
- **生产环境**：需要配置 Nginx 反向代理或使用后端 CORS
- **target 地址**：根据实际后端服务地址修改

---

## 二、Request.js 请求封装

在 `src/utils/request.js` 中创建 Axios 封装：

```javascript
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'

const service = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const { response } = error

    if (response) {
      const errorMap = {
        401: '登录已过期，请重新登录',
        403: '没有权限访问该资源',
        404: '请求的资源不存在',
        500: '服务器内部错误',
        502: '网关错误，请检查服务状态',
        503: '服务不可用',
        504: '网关超时'
      }

      if (response.status === 403) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        ElMessage.error('账号已被封禁，请联系管理员')
        router.push('/login')
      } else {
        const message = errorMap[response.status] || `请求失败: ${response.status}`
        ElMessage.error(message)

        if (response.status === 401) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user')
          router.push('/login')
        }
      }
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请检查网络连接')
    } else {
      ElMessage.error('网络异常，请检查网络连接或服务是否启动')
    }

    return Promise.reject(error)
  }
)

export default service
```

### 2.1 核心功能说明

| 功能 | 说明 |
|:----|:-----|
| `baseURL` | API 基础 URL，配置为 `/api` |
| `timeout` | 请求超时时间 15 秒 |
| Token 注入 | 自动从 localStorage 读取 access_token 并添加到 Authorization 头 |
| 401 处理 | 登录过期自动跳转登录页 |
| 403 处理 | 账号封禁提示并跳转登录页 |
| 统一错误提示 | 根据 HTTP 状态码返回对应中文错误信息 |

---

## 三、API 模块定义（负责请求后端 API）

> **核心职责**：该层负责调用后端 API 接口，是前端与后端数据交互的桥梁

```javascript
import request from '../utils/request'

// ==================== 认证接口 ====================
export const authApi = {
  login(data) {
    return request.post('/auth/login', data)
  },
  logout() {
    return Promise.resolve()
  },
  checkAuth() {
    return request.get('/auth/check')
  }
}

// ==================== 二维码管理接口 ====================
export const qrApi = {
  getList(params) {
    return request.get('/qr/list', { params })
  },
  getDetail(qrId) {
    return request.get(`/qr/${qrId}`)
  },
  bind(data) {
    return request.post('/qr/bind', data)
  },
  unbind(qrId) {
    return request.post('/qr/unbind', { qrId: qrId })
  },
  rebind(data) {
    return request.post('/qr/rebind', data)
  },
  batchCreate(data) {
    return request.post('/qr/batch-create', data)
  }
}

// ==================== 设备管理接口 ====================
export const deviceApi = {
  getDetail(deviceId) {
    return request.get(`/device/${deviceId}`)
  },
  scan(qrId) {
    return request.post('/scan', { qrId: qrId })
  },
  recordScan(qrId) {
    return request.post('/scan/record', { qrId: qrId })
  }
}

// ==================== 统计数据接口 ====================
export const statsApi = {
  getStats() {
    return request.get('/stats')
  },
  getScanHistory(params) {
    return request.get('/stats/scan-history', { params })
  }
}

// ==================== 用户管理接口 ====================
export const userApi = {
  getList(params) {
    return request.get('/user/list', { params })
  },
  add(data) {
    return request.post('/user/add', data)
  },
  update(userId, data) {
    return request.put(`/user/update/${userId}`, data)
  },
  ban(userId, isBanned) {
    return request.put(`/user/ban/${userId}`, { isBanned })
  },
  batchAdd(users) {
    return request.post('/user/batch-add', users)
  }
}

// ==================== 考勤打卡接口 ====================
export const clockApi = {
  clockIn(data) {
    return request.post('/clock/clock-in', data)
  },
  clockOut(data) {
    return request.post('/clock/clock-out', data)
  },
  getRecords(params) {
    return request.get('/clock/records', { params })
  },
  getToday() {
    return request.get('/clock/today')
  }
}

// ==================== 排单管理接口 ====================
export const schedulingApi = {
  getOriginalPlannedOrderDetails() {
    return request.get('/scheduling/GetOriginalPlannedOrderDetails')
  },
  updateOrderStatus(params) {
    return request.post('/scheduling/UpdateOrderStatus', params)
  }
}
```

---

## 四、在组件中使用 API

```javascript
import { authApi, qrApi, userApi } from '@/api'

// 登录
const handleLogin = async () => {
  try {
    const res = await authApi.login({ username: 'xxx', password: 'xxx' })
    // 处理成功响应
  } catch (error) {
    // 错误已在拦截器中统一处理
  }
}

// 获取列表
const fetchList = async () => {
  const res = await qrApi.getList({ page: 1, pageSize: 10 })
  return res
}
```

---

## 五、扩展配置

### 5.1 添加新的 API 模块

在 `src/api/index.js` 中添加：

```javascript
export const newModuleApi = {
  getData(params) {
    return request.get('/new-module/data', { params })
  },
  create(data) {
    return request.post('/new-module/create', data)
  },
  update(id, data) {
    return request.put(`/new-module/update/${id}`, data)
  },
  delete(id) {
    return request.delete(`/new-module/delete/${id}`)
  }
}
```

### 5.2 自定义请求头

如果需要添加自定义请求头：

```javascript
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 添加自定义header
    config.headers['X-Custom-Header'] = 'custom-value'
    return config
  },
  (error) => Promise.reject(error)
)
```

### 5.3 文件上传配置

```javascript
export const uploadApi = {
  upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    return request.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
```

---

## 六、最佳实践

| 序号 | 原则 | 说明 |
|:----|:-----|:-----|
| 1 | 模块化拆分 | 按业务功能模块划分 API 接口 |
| 2 | 统一错误处理 | 在拦截器中处理所有 HTTP 错误 |
| 3 | Token 管理 | 使用 localStorage 存储 Token，拦截器自动注入 |
| 4 | 类型支持 | 如使用 TypeScript，建议为 API 接口添加类型定义 |
| 5 | 请求取消 | 可使用 Axios 的 CancelToken 取消重复请求 |

---

## 七、架构分层说明

```
┌─────────────────────────────────────────────────────────┐
│                     前端开发分层                         │
├─────────────────────────────────────────────────────────┤
│  第一层：axios 二次封装 ( request.js )                    │
│         - 统一配置、请求拦截器、响应拦截器                 │
│                                                         │
│  第二层：API 接口定义 ( api/index.js )                  │
│         ⚡ 定义前端函数，负责请求后端 API，与后端数据交互 ⚡             │
│                                                         │
│  第三层：组件中调用 API                                  │
│         - 导入 API 模块、调用接口函数                    │
└─────────────────────────────────────────────────────────┘
```

### 7.1 开发流程

1. **定义 API**：在 `api/index.js` 中添加接口函数
2. **组件调用**：在组件中导入并调用 API 函数
3. **UI 绑定**：通过 UI 组件的 click 属性绑定模板中定义的函数

---

之后的前端操作：

```
对 axios 进行第二次封装 `request.js`，然后定义前端 api

一个成熟的后台管理系统，之后只需：
- 定义 api
- 增加一些组件

增加组件之类的可以让 AI 来做，人只负责 API。

还有就是需要了解组件如何调用定义好的函数，因为函数负责调用前端 API。

基本是 UI 的 click 属性绑定模板 js 里面定义的函数。
```
