---
title: vue3中具体通信的例子
icon: fa-brands fa-vuejs
order: 35
category:
  - vue3学习
tag:
  - vue3学习
---

# Vue 3 组件通信方式详解

## 1. 父组件向子组件传值（Props）

父组件在模版html里面使用v-bind绑定定义好的数据，v-bind是单向绑定（父 → 子）。

子组件通过 defineProps 接收从父组件传递的 props，并且可以在模板中使用这些数据。

### 示例代码

#### 父组件 Parent.vue
```vue
<template>
  <Child :msg="parentMsg" :user="userInfo" />
</template>

<script setup>
import Child from './Child.vue';
const parentMsg = '来自父组件的消息';
const userInfo = { id: 1, name: '通用用户' }; // 脱敏占位符
</script>
```

#### 子组件 Child.vue
```vue
<template>
  <div>{{ msg }}</div>
  <div>{{ user.name }}</div>
</template>

<script setup>
// 基础接收
const props = defineProps(['msg', 'user']);
</script>
```

---

## 2. 子组件向父组件传值（自定义事件）

在 Vue 3 中，子组件向父组件传递数据是通过自定义事件机制实现的。

### 基本原理

1. **子组件**：通过 `defineEmits` 声明可以触发的事件，然后使用 `emit` 函数触发事件并传递数据
2. **父组件**：通过 `v-on` 或 `@` 监听子组件声明的事件，并在事件处理函数中接收数据

### 示例代码

#### 子组件部分 (`Child.vue`)
```vue
<template>
  <button @click="handleSend">向父组件传值</button>
</template>

<script setup>
// 声明组件可以触发的事件
const emit = defineEmits(['send-data']);

const handleSend = () => {
  // 触发'send-data'事件，并传递两个参数
  emit('send-data', '子组件数据', { status: 'success' });
};
</script>
```

- `defineEmits`：用于声明组件可以触发的事件列表
- `emit`：触发事件的方法，第一个参数是事件名，后面的参数是要传递的数据

#### 父组件部分 (`Parent.vue`)
```vue
<template>
  <Child @send-data="handleReceive" />
</template>

<script setup>
const handleReceive = (data, extra) => {
  console.log('接收子组件数据：', data, extra);
  // 输出：接收子组件数据： 子组件数据 {status: 'success'}
};
</script>
```

- `@send-data`：监听子组件触发的 `send-data` 事件
- `handleReceive`：事件处理函数，参数与子组件 `emit` 传递的参数一一对应

---

## 3. Provide/Inject 祖孙通信

### 基本概念

Provide/Inject 是 Vue 提供的一种跨层级组件通信方式，特别适合解决组件深层嵌套时的数据传递问题。

- **Provide (提供)**：在祖先组件中提供数据
- **Inject (注入)**：在任意后代组件中注入这些数据

### 完整用法示例

#### 祖先组件 (提供数据)
```vue
<!-- Ancestor.vue -->
<script setup>
import { provide, ref } from 'vue'

// 提供静态数据
provide('message', 'Hello from ancestor!')

// 提供响应式数据
const count = ref(0)
provide('count', count)

// 提供方法
const updateCount = () => {
  count.value++
  console.log('Count updated:', count.value)
}
provide('updateCount', updateCount)

// 提供整个对象
const user = ref({
  name: 'Alice',
  age: 25
})
provide('user', user)
</script>

<template>
  <div>
    <h2>祖先组件</h2>
    <p>当前计数: {{ count }}</p>
    <button @click="updateCount">祖先中增加计数</button>
    <ChildComponent />
  </div>
</template>
```

#### 后代组件 (注入和使用数据)
```vue
<!-- Descendant.vue -->
<script setup>
import { inject } from 'vue'

// 注入数据
const message = inject('message')
const count = inject('count')
const updateCount = inject('updateCount')
const user = inject('user')

// 打印注入的数据
console.log('注入的消息:', message)
console.log('注入的计数:', count.value)
console.log('注入的用户:', user.value)

// 调用注入的方法
const localUpdate = () => {
  updateCount()
  console.log('调用后计数:', count.value)
}

// 修改响应式数据
const updateUser = () => {
  user.value.age++
  console.log('更新后的用户:', user.value)
}
</script>

<template>
  <div>
    <h3>后代组件</h3>
    <p>来自祖先的消息: {{ message }}</p>
    <p>当前计数: {{ count }}</p>
    <p>用户信息: {{ user.name }} - {{ user.age }}岁</p>
    
    <button @click="localUpdate">后代中增加计数</button>
    <button @click="updateUser">增加用户年龄</button>
  </div>
</template>
```

---

## 4. v-model 双向绑定

### 父组件（ParentComponent.vue）
```vue
<template>
  <ChildComponent v-model="message" />
  <p>父组件接收的值: {{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const message = ref('Hello Vue!')
</script>
```

### 子组件（ChildComponent.vue）使用 defineModel()
```vue
<template>
  <input v-model="message" />
</template>

<script setup>
// 自动处理了 prop 和 emit
const message = defineModel()
</script>
```

---

## 5. 数据流总结

Vue 默认的数据流是单向的：

- **JS → 模板**：自动的、默认的（响应式系统）
- **模板 → JS**：需要手动处理（通过 v-model 或事件）

### 通信方式选择指南

- **父子单向**：Props/Emits
- **父子双向**：v-model
- **祖孙**：Provide/Inject
- **其他场景**：Pinia