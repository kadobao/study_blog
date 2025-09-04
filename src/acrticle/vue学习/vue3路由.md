---
title: vue3路由
icon: 
order: 29
category:
  - vue学习
tag:
  - vue学习
---



一个是路由规则(index.ts)在path哪里定义了参数应该在url的那个位置，一个是跳转链接(一般是当前组件)这里传递参数，一个是目标组件，决定传递过来的参数如何使用。

路由模式：Vue Router 提供两种主要的路由模式：

- **Hash 模式**：使用 URL 的哈希值（`#`）进行路由，地址栏看起来像 `http://example.com/#/about`。
- **History 模式**：利用 HTML5 的 History API，URL 看起来更“干净”，如 `http://example.com/about`，没有 `#` 符号。

### 动态绑定与路由传参

对象写法需要动态绑定 JavaScript 表达式，因此必须使用 `v-bind`，也就是简写形式 `:to`。
`:to` 语法用于将属性动态绑定到表达式，而不是简单的字符串，适用于传递动态参数，如不同的 `name`。

```javascript
{
  name: 'zhuye',  // 路由名字
  path: '/home',  // 路由路径
  component: Home // 目标 Vue 组件
}
```

### 定义动态路径参数

使用 `:` 定义路径中的动态参数。例如，`/user/:id` 中的 `:id` 表示 `id` 是一个动态参数：
- 例如 `/user/123` 和 `/user/456` 都会匹配该路由，并将 `123` 或 `456` 作为 `id` 的值传递给目标组件。

### 区别：路径参数与查询参数

- **路径参数（params）**：用于标识资源，直接影响页面显示。例如 `/news/1` 表示 ID 为 1 的新闻。
- **查询参数（query）**：用于筛选或排序，决定页面的逻辑操作。例如 `/user?id=1&filter=active`。
  

路由传参本身不会自动引起页面内容变化，组件如何处理这些参数决定页面变化。例如，路径参数常用于标识唯一资源，查询参数则用于复杂逻辑处理。

路径和查询参数是没有区别的，只是路径参数只是简单的逻辑(一般就是直接使用你传过来的)，查询参数一般比路径参数的逻辑复杂。

路径参数是显示页面，查询参数是有逻辑，目标组件写的逻辑代码决定如何处理查询参数，如何引起页面变化。

### 使用 `router.push` 传递路径参数并接收

在 Vue 3 中，路径参数通过 `router.push` 传递，在目标组件中使用 `useRoute` 钩子接收。

#### 1. 传递路径参数

```typescript
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToUserDetails = (id: number) => {
  router.push({ name: 'UserDetails', params: { id } });
};
</script>
```

#### 2. 接收路径参数

```typescript
<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const userId = route.params.id;

const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 22 },
];
const user = users.find(u => u.id === Number(userId));
</script>

<template>
  <div>
    <h1>User Details</h1>
    <div v-if="user">
      <p>User ID: {{ user.id }}</p>
      <p>Name: {{ user.name }}</p>
      <p>Age: {{ user.age }}</p>
    </div>
    <div v-else>
      <p>User not found!</p>
    </div>
  </div>
</template>
```

### Vue 3 项目示例：路径参数与查询参数

该项目展示了如何使用路径参数和查询参数。

#### 项目结构

```
src/
  components/
    UserDetails.vue
  views/
    Home.vue
    User.vue
  router/
    index.ts
  App.vue
  main.ts
```

#### 1. 配置 Vue Router

```typescript
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/User.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/user/:id', name: 'User', component: User }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

#### 2. 用户详情页组件

```vue
<template>
  <div>
    <h1>User Details for User ID: {{ userId }}</h1>
    <p>Filter applied: {{ filter }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const userId = route.params.id;
const filter = route.query.filter || 'No filter applied';
</script>
```

#### 3. 主页面组件

```vue
<template>
  <div>
    <h1>Home Page</h1>
    <p>Navigate to a user page:</p>
    <ul>
      <li><router-link :to="{ name: 'User', params: { id: 1 }, query: { filter: 'active' } }">User 1 (Active)</router-link></li>
      <li><router-link :to="{ name: 'User', params: { id: 2 }, query: { filter: 'inactive' } }">User 2 (Inactive)</router-link></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
</script>
```

#### 4. 主组件 `App.vue`

```vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
```

#### 5. 入口文件 `main.ts`

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

### 总结

- 路径参数：如 `/user/:id` 用于展示特定用户页面。
- 查询参数：如 `?filter=active` 用于筛选或逻辑处理。

+++