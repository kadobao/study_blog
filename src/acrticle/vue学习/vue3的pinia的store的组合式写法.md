---
title: vue3的pinia的store的组合式写法
icon: 
order: 
category:
  - vue学习
tag:
  - vue学习
---







[details="省流"]
## 组合式 API 的规则与结构

使用组合式 API 定义 Pinia store 的核心在于：

- **状态** (`state`) 使用 `ref` 或 `reactive` 来定义。
- **计算属性** (`getters`) 使用 `computed` 来定义。
- **操作** (`actions`) 定义为普通的函数。
- 最后，所有的状态、计算属性和方法都需要通过 `return` 返回，这样它们可以在组件中使用。
[/details]


<br><br>

----





下面是使用 **组合式 API** 定义 `Pinia store` 的完整项目示例。

### 使用组合式 API 定义 Pinia Store 的 Vue 3 项目

**项目结构**

```
vue-composition-api-pinia-demo/
├── public/
├── src/
│   ├── components/
│   │   └── Counter.vue
│   ├── store/
│   │   └── counterStore.ts  # 使用组合式 API 定义 store
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 1. 初始化项目

使用 Vite 创建 Vue 3 + TypeScript 项目，并安装 Pinia：

```bash
npm init vite@latest vue-composition-api-pinia-demo -- --template vue-ts
cd vue-composition-api-pinia-demo
npm install
npm install pinia
```

### 2. 使用组合式 API 定义 Pinia Store

在 `src/store/counterStore.ts` 中定义一个简单的 Pinia store：

```ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {

  // 定义状态 (state)
  const count = ref(0)

  // 定义方法 (actions)
  const increment = () => {
    count.value++
  }

  // 定义方法 (actions)
  const decrement = () => {
    count.value--
  }

  // 定义计算属性 (getters)
  const doubleCount = computed(() => count.value * 2)

  // 返回状态和方法
  return {
    count,
    increment,
    decrement,
    doubleCount
  }
})
```

#### 解释：

- **状态 (`count`)**：使用 `ref` 定义计数器状态。
- **动作 (`increment`, `decrement`)**：定义用于修改状态的函数。
- **计算属性 (`doubleCount`)**：通过 `computed` 创建派生状态，返回 `count` 的两倍。

### 3. 创建 Counter 组件

在 `src/components/Counter.vue` 中创建一个计数器组件：

```vue
<template>
<div>
    <h2>Composition API Store Counter</h2>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
</div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '../store/counterStore'
import { storeToRefs } from 'pinia'

// 获取 store
const counterStore = useCounterStore()

// 使用 storeToRefs 解构 store 中的响应式属性
const { count, doubleCount } = storeToRefs(counterStore)


// 增加计数
function increment() {
  counterStore.increment()
}

// 减少计数
function decrement() {
  counterStore.decrement()
}

</script>
```

#### 说明：

- 我们通过 `useCounterStore` 获取到 store，并将其绑定到模板中的 `count` 和 `doubleCount`，按钮操作触发 `increment` 和 `decrement` 方法。

### 4. 设置 App.vue

在 `src/App.vue` 中渲染 `Counter` 组件：

```vue
<template>
  <div>
    <h1>Pinia Composition API Store Demo</h1>
    <Counter />
  </div>
</template>

<script lang="ts" setup>
import Counter from './components/Counter.vue'
</script>
```

### 5. 设置 main.ts

在 `src/main.ts` 中初始化 Pinia 并挂载应用：

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

### 运行效果

- 页面会显示一个计数器，展示当前的 `count` 和 `doubleCount`。
- 点击按钮可以增加或减少 `count`，并自动更新 `doubleCount`。

### 总结

这个项目展示了如何使用 Vue 3 组合式 API 和 Pinia 进行状态管理，代码更加模块化和灵活，适合中大型项目中的逻辑分离。