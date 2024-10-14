---
title: 修改pinia数据的三个方式
icon: 
order: 
category:
  - vue学习
tag:
  - vue学习
---




```vue
counterStore.$patch({
  count: 7
})
```

这段代码的意思是：

- 使用 `$patch()` 方法批量更新 Pinia Store 中的 `state`。
- 这里的 `count: 7` 表示将 `counterStore` 中的 `count` 属性更新为 `7`。

Pinia 会根据传入的对象中的属性和值去对应地修改 Store 中的 `state`。

批量修改（通过$patch）。



创建一个 Vue 3 项目，并使用 Pinia 管理状态，展示三种修改数据的方式。以下是完整的步骤，包括项目初始化、组件创建和状态管理。

---

## Vue 3 项目：使用 Pinia 修改数据的三种方式

本项目通过一个简单的计数器来展示 **Pinia** 的状态管理，并通过三种方式修改计数器的值：直接修改、批量修改（通过$patch）、通过 `action` 修改。

### 项目结构

```
vue-pinia-demo/
│
├── public/
├── src/
│   ├── components/
│   │   └── Counter.vue        # 计数器组件
│   ├── stores/
│   │   └── counter.ts         # Pinia store
│   ├── App.vue                # 主应用组件
│   ├── main.ts                # 应用入口文件
├── tsconfig.json              # TypeScript 配置
├── package.json               # 项目信息和依赖
└── vite.config.ts             # Vite 配置
```

---

## 1. 创建项目

首先，使用 Vite 创建一个 Vue 3 + TypeScript 项目。

```bash
npm init vite@latest vue-pinia-demo -- --template vue-ts
```

进入项目目录并安装依赖：

```bash
cd vue-pinia-demo
npm install
```

### 安装 Pinia

接下来安装 Pinia：

```bash
npm install pinia
```

---

## 2. 配置 Pinia

确保在 `main.ts` 文件中初始化并注册 Pinia。

### `src/main.ts`

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

这段代码将 Pinia 作为全局状态管理工具注册到 Vue 应用中。

---

## 3. 创建 Pinia Store

在 `src/stores/` 目录下创建一个 Pinia Store 文件 `counter.ts`，用于管理计数器的状态和提供修改状态的方法。

### `src/stores/counter.ts`

```ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    // 第三种方式：通过 Action 修改状态
    incrementBy(value: number) {
      if (this.count < 10) {
        this.count += value
      }
    }
  }
})
```

#### 说明：
- `state`：定义一个计数器变量 `count`，初始值为 `0`。
- `incrementBy(value: number)`：定义一个 `action`，当 `count` 小于 10 时，增加传入的值 `value`。

---

## 4. 创建计数器组件

在 `src/components/` 目录下创建 `Counter.vue` 组件，展示如何通过三种方式修改计数器的值。

### `src/components/Counter.vue`

```vue
<template>
  <div>
    <h2>当前计数：{{ counterStore.count }}</h2>

    <div class="button-container">
      <!-- 第一种方式：直接修改 -->
      <button @click="modifyDirectly">
        直接修改 - 设置为 5
      </button>

      <!-- 第二种方式：批量修改 -->
      <button @click="modifyBatch">
        批量修改 - 设置为 7
      </button>

      <!-- 第三种方式：通过 Action 修改 -->
      <button @click="incrementBy(2)">
        逻辑修改 - 增加 2
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '../stores/counter'

// 获取 store 实例
const counterStore = useCounterStore()

// 第一种方式：直接修改
function modifyDirectly() {
  counterStore.count = 5
}

// 第二种方式：批量修改
function modifyBatch() {
  counterStore.$patch({
    count: 7
  })
}

// 第三种方式：通过 Action 修改
function incrementBy(value: number) {
  counterStore.incrementBy(value)
}
</script>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 10px;
  cursor: pointer;
}
</style>
```

#### 说明：
- **直接修改**：通过 `modifyDirectly()`，直接将 `count` 设置为 `5`。
- **批量修改**：通过 `modifyBatch()`，使用 `$patch()` 批量修改 `count`，将其设置为 `7`。
- **通过 `action` 修改**：调用 `incrementBy()` 方法，使用业务逻辑检查当前 `count` 是否小于 `10`，如果是，则增加 `2`。

---

## 5. 主应用组件

在 `src/App.vue` 中导入并使用 `Counter.vue` 组件。

### `src/App.vue`

```vue
<template>
  <div>
    <h1>Pinia 计数器示例</h1>
    <Counter />
  </div>
</template>

<script lang="ts" setup>
import Counter from './components/Counter.vue'
</script>
```

---

## 6. 运行项目

执行以下命令启动项目：

```bash
npm run dev
```

浏览器中访问 `http://localhost:3000`，你将看到一个计数器页面，并且可以通过以下三种方式修改计数器的值：

1. **直接修改**：点击按钮后，计数器的值将直接设置为 `5`。
2. **批量修改**：点击按钮后，计数器的值将批量修改为 `7`。
3. **通过 `action` 修改**：点击按钮后，计数器的值将根据逻辑增加 `2`，但不会超过 `10`。

---

## 总结

1. **直接修改状态**：直接在组件中通过 `counterStore.count = 5` 修改 Pinia Store 中的状态。
2. **批量修改状态**：通过 `$patch()` 同时修改多个状态变量，适合需要更新多个属性的情况。
3. **通过 `action` 修改状态**：在 `action` 中可以加入业务逻辑，确保状态的修改符合特定条件。

这个简化的项目展示了 Pinia 的三种常见数据修改方式，非常适合初学者快速上手 Pinia 状态管理。