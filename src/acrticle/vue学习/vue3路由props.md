---
title: vue3路由props
icon: fa-brands fa-vuejs
order: 30
category:
  - vue学习
tag:
  - vue学习
---






一个是路由规则(index.ts)在path哪里定义了参数应该在url的那个位置，一个是跳转链接(一般是当前组件)这里传递参数，一个是目标组件，决定传递过来的参数如何使用。

路径和查询参数是没有区别的，只是路径参数只是简单的逻辑(一般就是直接使用你传过来的)，查询参数一般比路径参数的逻辑复杂。

**对象写法**是传递参数(静态参数)，不是传递路径或者查询参数。

**布尔值写法**是路径参数 (`params`) 直接作为 `props` 传递给组件。布尔值写法是 Vue Router 提供的简化方法，可以自动将路由路径中的动态参数传递给组件的 `props`。

**函数写法**在 Vue Router 中将查询参数或路径参数自定义地传递给组件。函数写法让你能够根据路由对象的内容灵活地定义传递给组件的 `props`，例如可以通过 URL 查询参数 (`query`) 来传递数据。



------



### Vue 3 项目示例：使用对象写法传递 `props`

在这个项目中，我们将创建一个简单的 Vue 3 应用，重点展示如何通过**对象写法**在路由中传递静态 `props` 给组件。我们会从项目初始化、组件定义、路由配置和项目运行等步骤详细讲解。

### 项目结构
```
vue-props-object-demo/
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

### 1. 初始化项目

使用 Vite 初始化 Vue 3 项目并安装依赖。

```bash
npm init vite@latest vue-props-object-demo -- --template vue-ts
cd vue-props-object-demo
npm install
```

此命令会生成一个基本的 Vue 3 + TypeScript 项目，Vite 用于快速开发。

### 2. 创建 `Detail.vue` 组件

在 `src/components/Detail.vue` 中创建目标组件，该组件将接收并展示通过路由对象传递的 `props`。

```vue
<template>
  <div>
    <h2>对象写法</h2>
    <p>a: {{ a }}</p>
    <p>b: {{ b }}</p>
    <p>c: {{ c }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  a: Number,
  b: Number,
  c: Number
})
</script>
```

#### 解释：
- **模板部分**：展示接收到的 `a`、`b` 和 `c` 这三个静态 `props`。
  - `<p>a: {{ a }}</p>`：展示 `a` 的值。
  - `<p>b: {{ b }}</p>`：展示 `b` 的值。
  - `<p>c: {{ c }}</p>`：展示 `c` 的值。
- **脚本部分**：使用 `defineProps()` 来声明组件的 `props`，并定义 `a`、`b` 和 `c` 的类型为 `Number`。

### 3. 配置路由

接着，在 `src/router/index.ts` 中配置路由，使用**对象写法**将静态 `props` 传递给 `Detail.vue` 组件。

```ts
import { createRouter, createWebHistory } from 'vue-router'
import Detail from '../components/Detail.vue'

const routes = [
  {
    name: 'detail',
    path: '/detail/:id/:title/:content',
    component: Detail,
    props: { a: 1, b: 2, c: 3 } // 静态传递 props
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### 解释：
- `path: '/detail/:id/:title/:content'`：定义了一个路径 `'/detail/:id/:title/:content'`，其中的 `:id`、`:title` 和 `:content` 是动态路由参数，但在这个例子中，它们不会影响 `Detail.vue` 组件接收到的 `props`。
- `props: { a: 1, b: 2, c: 3 }`：通过对象写法，将固定的 `props` `{ a: 1, b: 2, c: 3 }` 传递给 `Detail.vue` 组件。无论路径中的参数如何变化，组件始终接收这些固定的 `props`。

### 4. 设置 `App.vue`

在 `src/App.vue` 中，我们提供一个导航链接，点击后跳转到 `Detail` 组件，触发对象写法传递的 `props`。

```vue
<template>
  <div>
    <h1>Vue Router Props Demo - 对象写法</h1>
    <nav>
      <ul>
        <li><router-link :to="{ name: 'detail', params: { id: '123', title: 'My Title', content: 'My Content' } }">Go to Detail</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
</script>
```

#### 解释：
- `router-link`：生成一个链接，点击后跳转到 `/detail/123/My Title/My Content`，虽然参数变化了，但 `Detail` 组件接收的 `props` 依旧是 `{ a: 1, b: 2, c: 3 }`。
- `router-view`：占位符，用于展示当前匹配路由的组件。

### 5. 设置 `main.ts`

在 `src/main.ts` 中导入路由并启动应用。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

#### 解释：
- `createApp(App)`：创建 Vue 应用实例。
- `app.use(router)`：挂载路由系统。
- `app.mount('#app')`：将应用挂载到 `#app` DOM 元素。

### 6. 运行项目

在项目目录中，使用以下命令启动开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000`，你将看到主页面，点击 "Go to Detail" 链接后，浏览器地址栏会跳转到 `/detail/123/My Title/My Content`，页面将展示如下内容：

```
对象写法
a: 1
b: 2
c: 3
```

### 7. 运行效果

- 无论 URL 中的 `id`、`title` 和 `content` 是什么，组件接收的 `props` 始终是通过路由配置中定义的 `a: 1`，`b: 2`，`c: 3`。
- 这就是对象写法的特点：你可以传递静态的 `props` 值，它们不会随 URL 参数的变化而改变。

### 总结

通过这个项目，我们展示了如何使用对象写法通过路由将静态 `props` 传递给组件。在 Vue 3 中，这种写法特别适用于需要传递固定数据的场景，而不依赖于路由参数的变化。这种方式可以让你的组件保持逻辑简单，并且清晰地知道会收到哪些 `props`。

你可以根据项目需求选择这种静态 `props` 传递方式，特别是当路由参数与组件 `props` 并没有直接关联时。



------



### Vue 3 项目示例：使用布尔值写法传递路径参数

在这个项目中，我们将展示如何通过路由的**布尔值写法**将路径参数 (`params`) 直接作为 `props` 传递给组件。布尔值写法是 Vue Router 提供的简化方法，可以自动将路由路径中的动态参数传递给组件的 `props`。

### 项目结构
```
vue-props-boolean-demo/
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

### 1. 初始化项目

使用 Vite 初始化 Vue 3 项目并安装依赖。

```bash
npm init vite@latest vue-props-boolean-demo -- --template vue-ts
cd vue-props-boolean-demo
npm install
```

此命令会生成一个基本的 Vue 3 + TypeScript 项目，Vite 用于快速开发。

### 2. 创建 `Detail.vue` 组件

在 `src/components/Detail.vue` 中创建 `Detail` 组件，它将接收通过路径参数自动传递的 `props`。

```vue
<template>
  <div>
    <h2>布尔值写法</h2>
    <p>ID: {{ id }}</p>
    <p>Title: {{ title }}</p>
    <p>Content: {{ content }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  id: String,
  title: String,
  content: String
})
</script>
```

#### 解释：
- **模板部分**：组件展示从路径参数自动传递过来的 `id`、`title` 和 `content`。
  - `<p>ID: {{ id }}</p>`：展示路由路径中的 `id` 参数。
  - `<p>Title: {{ title }}</p>`：展示路由路径中的 `title` 参数。
  - `<p>Content: {{ content }}</p>`：展示路由路径中的 `content` 参数。
- **脚本部分**：通过 `defineProps()` 来声明组件的 `props`，`id`、`title` 和 `content` 都是从路由路径参数中自动传递过来的。

### 3. 配置路由

接着，在 `src/router/index.ts` 中配置路由，使用**布尔值写法**，将路径参数 (`params`) 自动作为 `props` 传递给 `Detail.vue` 组件。

```ts
import { createRouter, createWebHistory } from 'vue-router'
import Detail from '../components/Detail.vue'

const routes = [
  {
    name: 'detail',
    path: '/detail/:id/:title/:content',
    component: Detail,
    props: true // 布尔值写法，自动将路径参数作为 props 传递
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### 解释：
- `path: '/detail/:id/:title/:content'`：定义了一个路径 `'/detail/:id/:title/:content'`，其中的 `:id`、`:title` 和 `:content` 是动态路由参数。
- `props: true`：这是**布尔值写法**，当 `props` 被设置为 `true` 时，Vue Router 会自动将路径中的动态参数 (`params`) 传递为组件的 `props`。因此，`id`、`title` 和 `content` 会自动作为 `props` 传递给 `Detail` 组件。

### 4. 设置 `App.vue`

在 `src/App.vue` 中，添加一些链接，可以跳转到 `Detail` 组件，并传递不同的路径参数进行测试。

```vue
<template>
  <div>
    <h1>Vue Router Props Demo - 布尔值写法</h1>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'detail', params: { id: '1', title: 'My First Title', content: 'This is the first content' } }">
            Go to Detail 1
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'detail', params: { id: '2', title: 'My Second Title', content: 'This is the second content' } }">
            Go to Detail 2
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
</script>
```

#### 解释：
- `router-link`：生成链接，点击后可以跳转到 `/detail/1/My First Title/This is the first content` 或 `/detail/2/My Second Title/This is the second content`，并将路径中的参数 `id`、`title` 和 `content` 自动传递为 `Detail.vue` 组件的 `props`。
- `router-view`：用于渲染当前路由匹配的组件。

### 5. 设置 `main.ts`

在 `src/main.ts` 中导入路由并启动应用。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

#### 解释：
- `createApp(App)`：创建 Vue 应用实例。
- `app.use(router)`：注册路由系统。
- `app.mount('#app')`：将应用挂载到 DOM 中的 `#app` 元素。

### 6. 运行项目

使用以下命令启动开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000`，你将看到主页面，点击 "Go to Detail 1" 或 "Go to Detail 2" 链接，浏览器地址栏会跳转到 `/detail/1/My First Title/This is the first content` 或 `/detail/2/My Second Title/This is the second content`，并显示相应的内容。

### 7. 运行效果

- 当点击 "Go to Detail 1" 时，页面显示如下内容：

```
布尔值写法
ID: 1
Title: My First Title
Content: This is the first content
```

- 当点击 "Go to Detail 2" 时，页面显示如下内容：

```
布尔值写法
ID: 2
Title: My Second Title
Content: This is the second content
```

- 路径中的 `id`、`title` 和 `content` 动态改变，且自动作为 `props` 传递到 `Detail.vue` 组件中。

### 总结

在这个项目中，我们展示了如何使用 Vue Router 的**布尔值写法**，将路径参数 (`params`) 自动传递为组件的 `props`。这种写法非常简洁，适用于你需要直接将路径中的动态参数传递给组件的场景。

与对象写法不同，布尔值写法可以让你避免手动定义 `props`，Vue Router 会根据路径参数自动传递它们。你只需要在组件中通过 `props` 接收这些参数即可，代码更加简洁和清晰。



------



### Vue 3 项目示例：使用函数写法传递查询参数

在这个项目中，我们将展示如何通过**函数写法**在 Vue Router 中将查询参数或路径参数自定义地传递给组件。函数写法让你能够根据路由对象的内容灵活地定义传递给组件的 `props`，例如可以通过 URL 查询参数 (`query`) 来传递数据。

### 项目结构
```
vue-props-function-demo/
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

### 1. 初始化项目

首先使用 Vite 初始化 Vue 3 项目并安装依赖。

```bash
npm init vite@latest vue-props-function-demo -- --template vue-ts
cd vue-props-function-demo
npm install
```

此命令会生成一个基本的 Vue 3 + TypeScript 项目，Vite 用于快速开发。

### 2. 创建 `Detail.vue` 组件

在 `src/components/Detail.vue` 中创建目标组件，该组件将接收通过函数写法传递的 `props`。

```vue
<template>
  <div>
    <h2>函数写法</h2>
    <p>ID: {{ id }}</p>
    <p>Title: {{ title }}</p>
    <p>Foo: {{ foo }}</p>
    <p>Baz: {{ baz }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  id: String,
  title: String,
  foo: String,
  baz: String
})
</script>
```

#### 解释：
- **模板部分**：展示通过路由函数写法传递的 `id`、`title`（来自路径参数）以及 `foo`、`baz`（来自查询参数）。
  - `<p>ID: {{ id }}</p>`：展示路径参数 `id`。
  - `<p>Title: {{ title }}</p>`：展示路径参数 `title`。
  - `<p>Foo: {{ foo }}</p>` 和 `<p>Baz: {{ baz }}</p>`：展示查询参数 `foo` 和 `baz`。
- **脚本部分**：使用 `defineProps()` 来声明组件的 `props`，定义 `id`、`title`（从路径参数传递）和 `foo`、`baz`（从查询参数传递）的类型。

### 3. 配置路由

接着，在 `src/router/index.ts` 中配置路由，使用**函数写法**传递 `props`，根据路由的查询参数和路径参数传递自定义的 `props`。

```ts
import { createRouter, createWebHistory } from 'vue-router'
import Detail from '../components/Detail.vue'

const routes = [
  {
    name: 'detail',
    path: '/detail/:id/:title',
    component: Detail,
    props: (route) => ({
      id: route.params.id,
      title: route.params.title,
      foo: route.query.foo,
      baz: route.query.baz
    }) // 函数写法，根据路径和查询参数传递 props
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### 解释：
- `path: '/detail/:id/:title'`：定义了一个路径 `'/detail/:id/:title'`，其中 `:id` 和 `:title` 是动态路径参数。
- `props: (route) => ({ id: route.params.id, title: route.params.title, foo: route.query.foo, baz: route.query.baz })`：
  - **函数写法**允许我们根据路由对象自定义 `props`，在这里我们从路径参数中提取 `id` 和 `title`，从查询参数中提取 `foo` 和 `baz`。
  - 例如，访问 `/detail/123/hello?foo=bar&baz=qux` 时，`id` 会是 `123`，`title` 是 `hello`，`foo` 是 `bar`，`baz` 是 `qux`。

### 4. 设置 `App.vue`

在 `src/App.vue` 中，添加一些链接，允许用户点击以传递不同的路径参数和查询参数进行测试。

```vue
<template>
  <div>
    <h1>Vue Router Props Demo - 函数写法</h1>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'detail', params: { id: '1', title: 'Title 1' }, query: { foo: 'foo1', baz: 'baz1' } }">
            Go to Detail 1
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'detail', params: { id: '2', title: 'Title 2' }, query: { foo: 'foo2', baz: 'baz2' } }">
            Go to Detail 2
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
</script>
```

#### 解释：
- `router-link`：生成链接，点击后跳转到 `/detail/1/Title%201?foo=foo1&baz=baz1` 或 `/detail/2/Title%202?foo=foo2&baz=baz2`，并将这些路径和查询参数传递为 `Detail.vue` 组件的 `props`。
- `router-view`：用于展示当前路由匹配的组件。

### 5. 设置 `main.ts`

在 `src/main.ts` 中导入路由并启动应用。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

#### 解释：
- `createApp(App)`：创建 Vue 应用实例。
- `app.use(router)`：将路由系统注入到应用中。
- `app.mount('#app')`：将应用挂载到 DOM 中的 `#app` 元素。

### 6. 运行项目

使用以下命令启动开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000`，你将看到主页面，点击 "Go to Detail 1" 或 "Go to Detail 2" 链接，浏览器地址栏会跳转到相应的路径，并显示参数传递的结果。

### 7. 运行效果

- 当点击 "Go to Detail 1" 时，页面显示如下内容：

```
函数写法
ID: 1
Title: Title 1
Foo: foo1
Baz: baz1
```

- 当点击 "Go to Detail 2" 时，页面显示如下内容：

```
函数写法
ID: 2
Title: Title 2
Foo: foo2
Baz: baz2
```

- 路径中的 `id` 和 `title`，以及查询参数中的 `foo` 和 `baz` 动态改变，并作为 `props` 传递到 `Detail.vue` 组件中。

### 总结

在这个项目中，我们展示了如何使用 Vue Router 的**函数写法**，根据路由对象中的路径参数和查询参数灵活地传递 `props`。这种写法非常适合需要动态处理路径参数和查询参数的场景，尤其是在需要对参数进行某些处理或转换时。

与布尔值写法和对象写法不同，函数写法给了你完全的控制权，你可以根据路由对象的不同属性自定义传递的 `props`。