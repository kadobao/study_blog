---
title: vue3里面的pinia里面的storeToRefs
icon: 
order: 28
category:
  - vue学习
tag:
  - vue学习
---





**Pinia 提供的 `storeToRefs` 只会将 Pinia `store` 中的** **状态（`state`）** **属性转化为 `ref` 对象**，而 **Vue 的 `toRefs` 会将整个 `store` 中的所有数据（包括`state`、`getters` 和 `actions`）都转换为 `ref`**，因此它们的行为有细微的区别。

### 理解 `storeToRefs` 和 `toRefs`

#### 1. **`storeToRefs`** (Pinia 提供的)

- **作用**：只将 Pinia Store 中的 **`state`**（即状态数据）转为 Vue 的 `ref`。
- **特点**：它只针对 `state` 进行操作，忽略 `actions` 和 `getters`。

#### 2. **`toRefs`** (Vue 提供的)

- **作用**：将一个响应式对象（通常是 `reactive` 的对象）中的所有属性转换为 `ref`。
- **特点**：它会尝试将 `store` 中所有的数据（包括 `state`、`getters`、甚至 `actions`）都转换为 `ref`，但这样会导致 `actions` 这样的非状态属性变成 `ref`，这是不符合预期的。

StoreToRef只会关注store里面的数据，不会对其方法进行包裹，如果使用ToRef就会对其方法也进行包裹







------





### 理解 `storeToRefs`

`storeToRefs` 是 **Pinia** 提供的一个帮助函数，用于将 **Pinia Store** 中的 **状态（state）** 转换为 **Vue 的 `ref`** 对象，从而在模板中更方便地使用。它的主要用途是确保状态在解构时保持响应式，同时避免丢失响应性。

#### 问题背景

当我们在 Vue 组件中从 Pinia Store 中直接解构状态时，如果不使用 `storeToRefs`，解构操作可能会丢失响应性。因此，使用 `storeToRefs` 可以确保解构后的状态保持响应式特性。

---

### 使用场景

假设我们有一个 Pinia Store 定义如下：

```ts
// src/stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Vue Store'
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

#### 不使用 `storeToRefs` 的问题

当我们在组件中解构 `store` 的状态时，如果直接解构 `count`，这会导致解构后的 `count` 不是响应式的。

```vue
<template>
  <div>
    <p>计数: {{ count }}</p> <!-- count 可能不再响应式 -->
    <p>名字: {{ name }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()

// 解构 store 中的状态
const { count, name } = counterStore

// 直接调用 actions
function increment() {
  counterStore.increment()
}
</script>
```

这里的 `count` 和 `name` 失去了响应性，因为它们在解构时不再是响应式的 `ref` 对象。

---

#### 解决方案：使用 `storeToRefs`

使用 `storeToRefs` 可以将 `store` 中的状态转换为 `ref` 对象，保持响应性。

```vue
<template>
  <div>
    <p>计数: {{ count }}</p> <!-- 现在 count 是响应式的 -->
    <p>名字: {{ name }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '../stores/counter'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()

// 使用 storeToRefs 将 store 的状态转为 ref 对象
const { count, name } = storeToRefs(counterStore)

// 直接调用 actions
function increment() {
  counterStore.increment()
}
</script>
```

#### 说明：

- **`storeToRefs(counterStore)`**：将 `counterStore` 中的状态（`count` 和 `name`）转换为 **响应式的 `ref`** 对象。这样在模板中引用 `count` 和 `name` 时，它们保持响应式，任何修改都会自动反映在视图中。

- **使用 `storeToRefs` 的必要性**：当你需要解构 Store 中的状态时，如果不使用 `storeToRefs`，解构后的值将丧失响应性，因此你无法实时地看到它们的变化。