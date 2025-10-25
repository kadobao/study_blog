---
title: 使用 useRoute 和 useRouter 实现编程式导航
icon: fa-brands fa-vuejs
order: 4
index: false
category:
  - vue学习
tag:
  - vue学习
---






### Vue 3 项目示例：使用 `useRoute` 和 `useRouter` 实现编程式导航

在这个项目中，我们将演示如何使用 Vue Router 的 `useRoute()` 和 `useRouter()` `hooks`，并结合 Vue 3 的 Composition API 进行编程式导航。我们将创建一个简单的项目，展示如何从路由中获取参数并执行导航操作。

### 项目结构
::: details 点击展开项目代码
```
vue-router-hooks-demo/
│
├── public/
├── src/
│   ├── components/
│   │   └── Detail.vue
│   ├── router/
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

:::

### 1. 初始化项目

首先使用 Vite 初始化 Vue 3 项目并安装依赖。

```bash
npm init vite@latest vue-router-hooks-demo -- --template vue-ts
cd vue-router-hooks-demo
npm install
```

这个命令会生成一个 Vue 3 + TypeScript 项目，Vite 用于快速开发。

### 2. 创建 `Detail.vue` 组件

在 `src/components/Detail.vue` 中创建一个 `Detail` 组件，它将展示从路由参数中获取的信息，并提供返回和跳转的按钮。

::: details 点击展开项目代码
```vue
<template>
  <div>
    <h2>当前详情页面</h2>
    <p>ID: {{ route.params.id }}</p>
    <p>Title: {{ route.params.title }}</p>
    <button @click="goBack">返回上一页</button>
    <button @click="goNextDetail">跳转到下一个详情页</button>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()  // 获取当前路由信息
const router = useRouter() // 获取路由实例，用于导航

// 返回上一页
const goBack = () => {
  router.back()
}

// 跳转到下一个详情页面
const goNextDetail = () => {
  const nextId = parseInt(route.params.id) + 1
  router.push({ name: 'detail', params: { id: nextId, title: `标题${nextId}` } })
}
</script>
```
:::

#### 解释：
- **`useRoute()`**：获取当前路由信息，如路径参数、查询参数等。在这个例子中，我们通过 `route.params.id` 和 `route.params.title` 获取路由参数。
- **`useRouter()`**：用于导航操作。`goBack()` 使用 `router.back()` 返回上一页，`goNextDetail()` 使用 `router.push()` 跳转到下一个详情页，并传递新的 `id` 和 `title` 参数。

### 3. 配置路由

在 `src/router/index.ts` 中配置路由，并为 `Detail.vue` 设置动态路径参数。


::: details 点击展开项目代码
```ts
import { createRouter, createWebHistory } from 'vue-router'
import Detail from '../components/Detail.vue'

const routes = [
  {
    name: 'detail',
    path: '/detail/:id/:title',
    component: Detail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```
:::

#### 解释：
- **`path: '/detail/:id/:title'`**：定义动态路由参数 `id` 和 `title`，这些参数会传递给 `Detail.vue` 组件。
- **`name: 'detail'`**：设置路由名称，以便在编程式导航中使用。

### 4. 设置 `App.vue`

在 `src/App.vue` 中，提供一个导航链接跳转到不同的详情页面，同时使用 `router-view` 渲染匹配的路由组件。


::: details 点击展开项目代码

```vue
<template>
  <div>
    <h1>Vue Router Hooks 示例</h1>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'detail', params: { id: '1', title: '第一个详情页' } }">
            跳转到详情页 1
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'detail', params: { id: '2', title: '第二个详情页' } }">
            跳转到详情页 2
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
// 这里无需额外逻辑
</script>
```

:::


#### 解释：
- `router-link`：用于导航，点击链接时将跳转到不同的详情页面，传递路由参数 `id` 和 `title`。
- `router-view`：显示当前匹配的路由组件。在这个例子中，点击链接后，`Detail.vue` 组件会根据路由被渲染。

### 5. 设置 `main.ts`

在 `src/main.ts` 中挂载应用，并引入路由系统。


::: details 点击展开项目代码

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

:::

#### 解释：
- **`createApp(App)`**：创建 Vue 应用实例。
- **`app.use(router)`**：将路由系统注入到应用中。
- **`app.mount('#app')`**：将应用挂载到 DOM 元素 `#app` 上。

### 6. 运行项目

使用以下命令启动开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000`，你将看到主页面，点击 "跳转到详情页 1" 或 "跳转到详情页 2" 链接，浏览器地址栏会跳转到相应的详情页面。

### 7. 运行效果

- 当点击 "跳转到详情页 1" 时，页面会显示：
  ```
  当前详情页面
  ID: 1
  Title: 第一个详情页
  ```
  点击“跳转到下一个详情页”会跳转到 `/detail/2/标题2` 页面，内容如下：
  ```
  当前详情页面
  ID: 2
  Title: 标题2
  ```
  
- 点击 "返回上一页" 按钮时，会返回到上一个页面。

### 总结

通过这个项目，我们演示了如何使用 Vue Router 的 `useRoute()` 和 `useRouter()` `hooks` 进行编程式导航：

- **`useRoute()`**：获取当前路由信息，比如路径参数和查询参数。
- **`useRouter()`**：提供导航方法，比如 `push()`、`back()` 等，可以进行页面跳转和返回。

这些 `hooks` 与 Vue 3 的 Composition API 完美结合，使得管理路由更加灵活，代码结构更加清晰简洁。