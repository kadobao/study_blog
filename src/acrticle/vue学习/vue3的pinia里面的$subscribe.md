---
title: vue3的pinia里面的$subscribe
icon: fa-brands fa-vuejs
order: 19
category:
  - vue学习
tag:
  - vue学习
---






### 使用 `$subscribe` 的 Vue 3 + Pinia 项目示例

**项目结构**
```
pinia-subscribe-demo/
├── public/
├── src/
│   ├── components/
│   │   └── Counter.vue
│   ├── store/
│   │   └── counterStore.ts
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 1. 初始化项目
首先，使用 Vite 创建一个 Vue 3 + TypeScript 项目：

```bash
npm init vite@latest pinia-subscribe-demo -- --template vue-ts
cd pinia-subscribe-demo
npm install
npm install pinia
```

### 2. 创建 Pinia Store
在 `src/store/counterStore.ts` 中定义一个简单的 Pinia store。

```ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
```

这个 store 包含了一个简单的 `count` 状态，以及 `increment` 和 `decrement` 方法。

### 3. 在组件中使用 $subscribe
接下来，我们将在组件内使用 `$subscribe` 监听 store 的状态变化，并在状态变化时将其持久化到 `localStorage` 中。

在 `src/components/Counter.vue` 中：

```vue
<template>
    <div>
      <h2>Counter: {{ counterStore.count }}</h2>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
    </div>
  </template>
  
<script lang="ts" setup>
import { useCounterStore } from '../store/counterStore'

// 获取 store
const counterStore = useCounterStore()

// 增加计数
function increment() {
  counterStore.increment()
}

// 减少计数
function decrement() {
  counterStore.decrement()
}

// 在组件内使用 $subscribe 监听 store 的状态变化
counterStore.$subscribe((mutation, state) => {
    console.log('State changed:', mutation)
    localStorage.setItem('count', JSON.stringify(state.count))
  })

// 初始化时从 localStorage 读取 count 状态
const storedCount = localStorage.getItem('count')
if (storedCount) {
  counterStore.count = JSON.parse(storedCount)
}
</script>
```

#### 关键点：
1. **$subscribe**：监听 store 状态的变化，每当 `count` 发生变化时，就会执行回调函数，将新的状态值存储到 `localStorage`。
2. **localStorage 初始化**：组件加载时会从 `localStorage` 读取之前保存的状态，并更新 `counterStore` 中的 `count`。

回调函数 (mutation, state)：

$subscribe 接受一个回调函数，该回调函数有两个参数：
mutation：一个包含状态变化详细信息的对象，告诉你状态是如何被改变的（比如是哪个 action 触发的变化，哪个 store 发生了变化等）。
state(数据)：当前 store 的状态（变化后的新状态），通过它你可以访问 store 中最新的数据。

### 4. 设置 App.vue
在 `src/App.vue` 中渲染 `Counter` 组件。

```vue
<template>
  <div>
    <h1>Pinia $subscribe Demo</h1>
    <Counter />
  </div>
</template>

<script lang="ts" setup>
import Counter from './components/Counter.vue'
</script>
```

### 5. 设置 main.ts
在 `src/main.ts` 中初始化 Pinia 并挂载应用。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

### 6. 运行项目
启动项目进行测试：

```bash
npm run dev
```

### 7. 运行效果
- 每次点击按钮改变 `count`，Pinia store 状态会通过 `$subscribe` 持久化到 `localStorage`。
- 页面刷新后，`count` 状态会从 `localStorage` 读取并保持不变。

### 总结
通过这个示例展示了如何在组件内使用 Pinia 的 `$subscribe` 方法监听 store 的变化。 `$subscribe` 适合在组件内处理状态变化，常用于将状态持久化或在状态变化时触发特定的逻辑。