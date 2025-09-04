---
title: pinia
icon: 
order: 10
category:
  - vue学习
tag:
  - vue学习
---



多个组件去共享数据才考虑使用pinia，所谓状态就是数据。

跨组件通信：如果两个不相关的组件需要共享数据或通过事件相互通信，Pinia可以通过全局存储简化这一过程。


Pinia 的确是一种将数据（状态）、方法（动作）、和一些逻辑（例如计算属性）集中管理的工具，它在 Vue 3 中主要用于全局状态管理。


Store是一个保存：状态、业务逻辑 的实体，每个组件都可以读取、写入它。

它有三个概念：state、getter、action，相当于组件中的： data、 computed 和 methods。



------





# main.ts

在 `main.ts` 文件中添加以下代码：

```typescript
import { createPinia } from 'pinia'

const pinia = createPinia()

app.use(pinia)
```

`createPinia()` 创建一个 Pinia 实例，`app.use(pinia)` 将 Pinia 注册到 Vue 应用中，确保组件能够访问 Pinia store。

# stores/counter.ts

创建 `stores` 文件夹，并在其中创建一个 `counter.ts` 文件。这个文件的命名明确体现了它的用途：管理计数器状态。在这个文件中，我们存放了希望共享给其他组件的 `count` 状态以及修改状态的方法 `increment` 和 `decrement`。

```typescript
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

# Counter.vue

在 `Counter.vue` 组件中创建 store 实例，并从 store 实例中导出数据和方法。方法最好抽象为函数，这样代码更加清晰。

```vue
<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'

// 获取 store 实例
const counterStore = useCounterStore()

// 定义增加和减少计数器的函数
function increment() {
  counterStore.increment()
}

function decrement() {
  counterStore.decrement()
}
</script>
```

通过 store 实例来导出数据和方法，可以确保这些状态和方法在组件中是响应式的，并且抽象出 `increment` 和 `decrement` 函数让代码更清晰易读。









------



### Vue 3 项目结构：使用 Pinia 管理状态（带样式）

在这个项目中，我们会展示如何使用 **Pinia** 进行全局状态管理，并为组件添加样式。项目包括计数器组件 `Counter.vue`，通过点击按钮增加或减少计数，所有组件共享同一个 Pinia Store 的状态。

---

### 项目结构

```
vue-pinia-style/
│
├── public/
├── src/
│   ├── assets/              
│   ├── components/
│   │   └── Counter.vue          # 计数器组件
│   ├── stores/
│   │   └── counter.ts           # Pinia store
│   ├── App.vue                  # 主应用组件
│   ├── main.ts                  # 应用入口文件
│   ├── style.css                # 全局样式
├── tsconfig.json                # TypeScript 配置
├── package.json                 # 项目信息和依赖
└── vite.config.ts               # Vite 配置
```

---

### 1. `main.ts` - 配置 Pinia

确保在 `src/main.ts` 中将 Pinia 注册到 Vue 实例中：

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'  // 导入全局样式

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

- **`createPinia()`**：创建 Pinia 实例并通过 `app.use()` 注册。

---

### 2. `counter.ts` - Pinia Store

在 `src/stores/counter.ts` 中定义 Pinia Store，用于管理全局计数器的状态。

```ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
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

- **`state`**：定义一个初始值为 `0` 的 `count`。
- **`getters`**：用于计算 `count` 的两倍。
- **`actions`**：定义 `increment()` 和 `decrement()` 方法，分别增加和减少 `count`。

---

### 3. `Counter.vue` - 计数器组件

在 `src/components/Counter.vue` 中创建一个带有样式的计数器组件。通过 Pinia store 来获取状态和执行操作。

Pinia 的 actions 方法和 state 属性应该在使用时直接通过 store 实例 获取，而不是提前解构。

```vue
<!-- src/components/Counter.vue -->
<template>
  <div class="counter-container">
    <h2>Pinia 计数器</h2>
    <p class="count-display">当前计数：{{ counterStore.count }}</p>
    <p>计数的两倍：{{ counterStore.doubleCount }}</p>
    <div class="button-container">
      <button @click="increment" class="btn btn-increment">增加</button>
      <button @click="decrement" class="btn btn-decrement">减少</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '../stores/counter'

// 获取 store 实例
const counterStore = useCounterStore()

// 定义增加和减少计数器的函数
function increment() {
  counterStore.increment()
}

function decrement() {
  counterStore.decrement()
}
</script>

<style scoped>
.counter-container {
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 300px;
  margin: 20px auto;
  background-color: #f9f9f9;
}

.count-display {
  font-size: 24px;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: space-around;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-increment {
  background-color: #4caf50;
  color: white;
}

.btn-decrement {
  background-color: #f44336;
  color: white;
}
</style>
```

- **动态获取状态和方法**：`counterStore` 实例用于获取 `count` 和 `doubleCount`，点击按钮时直接调用 `increment()` 和 `decrement()`。
- **样式**：组件通过 `scoped` 样式为按钮和显示区域添加了基本的样式。

**注意**：在这里，我们将计数器的增加和减少功能抽象成了 `increment` 和 `decrement` 函数。这样代码更加清晰。

---

### 4. `App.vue` - 主应用组件

在 `src/App.vue` 中包含两个 `Counter.vue` 组件，验证跨组件的状态共享。

在项目中挂载两个 `Counter` 组件的目的是演示 Pinia 的状态管理功能，特别是跨组件的状态共享。由于两个组件实例共享同一个 Pinia Store，当一个组件更新状态（比如增加或减少计数）时，另一个组件能够实时同步显示更新后的状态。

```vue
<template>
  <div>
    <h1>Pinia 状态管理示例</h1>
    <div class="counters">
      <Counter />
      <Counter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Counter from './components/Counter.vue'
</script>

<style scoped>
.counters {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}
</style>
```

- **共享状态**：两个 `Counter` 组件共享同一个 `Pinia` store 实例，更新一个组件时，另一个也会自动更新。

---

### 5. `style.css` - 全局样式

在 `src/style.css` 中添加全局样式：

```css
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  color: #333;
  margin-top: 40px;
}
```

---

### 6. `tsconfig.json` - TypeScript 配置

`tsconfig.json` 中确保包含 `.vue` 文件的处理：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

---

### 7. 运行项目

在项目根目录下，运行以下命令启动开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000`，你将看到页面上有两个 `Counter` 组件，点击任意一个组件的按钮，两个组件的计数都会同步更新，展示了 Pinia 的全局状态共享能力。

---

### 总结

- **Pinia 状态管理**：通过 `state` 存储全局状态，`getters` 用于派生计算值，`actions` 用于修改状态。
- **响应式状态**：多个组件可以共享同一个 `Pinia` store 实例，实现跨组件的状态管理。
- **组件样式**：为组件添加了基础样式，提升视觉效果。
-  **组件复用与共享状态**：两个 `Counter` 组件共享同一个 Pinia store，因此状态会实时同步。
- **按钮事件**：将按钮点击事件绑定到独立的函数中，便于管理和扩展功能。







------





### 抽象的概念

在编程中，**抽象**是指将复杂的实现细节隐藏起来，仅暴露出用于交互的简单接口或功能。通过抽象，开发者可以专注于**核心功能**，而无需关注底层的实现。抽象可以提高代码的**复用性**、**可读性**和**维护性**。

#### 举个例子

假设你在 Vue 组件中编写了一个计数器功能。我们可以把增加和减少计数的具体逻辑封装在一个方法中，这就是一种抽象。

### 具体实例：Vue 中的抽象

#### 没有抽象的代码：
```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
    <button @click="count--">Decrement</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```
在上面的代码中，`count++` 和 `count--` 直接出现在 `@click` 事件中，这些是操作计数的具体实现。

#### 抽象后的代码：
```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)

// 抽象增加和减少计数的功能
function increment() {
  count.value++
}

function decrement() {
  count.value--
}
</script>
```

### 抽象的好处：
1. **可读性提升**：通过将 `increment` 和 `decrement` 抽象成独立的方法，代码更加清晰。
2. **复用性增强**：如果在多个地方需要用到相同的增加或减少计数的功能，你可以复用这些抽象后的方法。
3. **易于维护**：如果将来需要修改计数的逻辑，只需修改方法内部的实现，不影响其他使用该方法的部分。