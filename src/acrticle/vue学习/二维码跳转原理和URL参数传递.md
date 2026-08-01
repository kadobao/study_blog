---
title: 二维码跳转原理和URL参数传递
icon: fa-brands fa-vuejs
order: 48
category:
  - vue3学习
tag:
  - vue3学习
  - 二维码跳转
  - URL参数传递
---

## MES 二维码原理

```text
用户扫码 ──→ /scan?qrid=RW001 (Scan.vue 中转页)
                    │（获取参数：qrid，向后端查询，获取这个二维码ID的详细信息）
                    ▼
           GET /api/qrcode/RW001 → 后端查询数据库（得到需要跳转的URL）
                    │
                    ▼
           判断跳转优先级：
           ① customUrl（自定义URL，最高优先级）
           ② targetUrl（类型自动生成的URL）
                    │
                    ▼
          执行跳转
            - 相对路径 → router.push（SPA内部跳转）
            - 绝对URL → window.location.href（整页跳转）
                    ▼
           router.push 到目标页面

管理端 ──→ /qrcode-manage-new (QrCodeManageNew.vue)
               │
               ▼
        el-table 展示列表 + el-drawer 新增/编辑
        支持：搜索、筛选、排序、分页、单个创建、批量创建、导出二维码图片
```

## 中间跳转页面

还需要一个中间跳转页面，这个页面解析 URL 的参数，然后向后端发送请求，获取到需要跳转的 URL。

::: tip 跳转逻辑

- 如果是**相对路径**，用 `router.push` 进行 SPA 内部跳转
- 如果是**绝对 URL**，直接用 `window.location.href` 跳转

:::

```javascript
// 如果是相对路径，用 router.push
// 绝对URL，直接跳转

if (qrData.targetUrl.startsWith('/')) {
  // 解析路径和查询参数
  // 第1步：用 new URL() 把字符串解析成 URL 对象
  // targetUrl = "/rework?qrid=ABC123"（相对路径）
  // window.location.origin = "http://localhost:5173"（只是当 base 用，结果中不保留）
  const url = new URL(qrData.targetUrl, window.location.origin)
  // 解析后：
  //   url.pathname     = "/rework"
  //   url.searchParams = { qrid: "ABC123" }

  // 第2步：创建空对象，准备存放查询参数
  const query = {}

  // 第3步：遍历 searchParams，把所有参数键值对转移到 query 对象
  // URLSearchParams.forEach 的回调参数顺序是 (value, key)
  // 这里会把 { qrid: "ABC123" } 逐一拷贝到 query 里
  url.searchParams.forEach((value, key) => {
    query[key] = value
  })

  // 第4步：用 Vue Router 做 SPA 内部跳转（不刷新页面）
  // path = "/rework"，query = { qrid: "ABC123" }
  // 最终效果等同于访问 /rework?qrid=ABC123
  router.push({ path: url.pathname, query })
} else {
  // 绝对URL，直接跳转
  window.location.href = qrData.targetUrl
}
```

## Query 参数传递（SPA 内部跳转）

### 示例场景

```javascript
// customUrl或targetUrl的值："/rework?qrid=RW001&action=view"
if (url.startsWith('/')) {
  const url = new URL(qrData.targetUrl, window.location.origin)
  const query = {}
  url.searchParams.forEach((value, key) => {
    query[key] = value
  })
  // 结果：path = "/rework", query = { qrid: "RW001", action: "view" }
  router.push({ path: url.pathname, query })
}
```

### 目标页面获取参数

```javascript
// Rework.vue 页面中
const route = useRoute()
const qrId = route.query.qrid      // 获取: "RW001"
const action = route.query.action  // 获取: "view"
```

## Route 路由参数传递（SPA 内部跳转）

### 路由配置（Route 参数传递配置）

```javascript
// router/index.js
{
  path: '/device/:deviceId',        // 定义 Route 参数
  name: 'DeviceDetail',
  component: () => import('../views/DeviceDetail.vue')
}
```

### 跳转方式（Route 参数传递）

```javascript
// 使用 params 传递 deviceId 作为 Route 参数
router.push({
  name: 'DeviceDetail',
  params: { deviceId: qrData.deviceId }  // deviceId 成为 URL 的一部分
})
// 最终 URL: /device/DEV001
```

### 目标页面获取参数

```javascript
// DeviceDetail.vue 页面中
const route = useRoute()
const deviceId = route.params.deviceId  // 获取: "DEV001"
```

## URL 参数传递总结

| 对比项 | URL Query 参数传递 | Route Params 路由参数传递 |
| :--- | :--- | :--- |
| **传递方式** | `router.push({ path: url.pathname, query })` | `router.push({ name: 'DeviceDetail', params: { deviceId: qrData.deviceId } })` |
| **获取方式** | `route.query.qrid` | `route.params.deviceId` |
| **URL 形式** | `/rework?qrid=ABC123` | `/device/DEV001` |
| **适用场景** | 可选参数、多个参数 | 必需参数、单个资源标识 |
