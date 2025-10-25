---
title: vue3的props通信
icon: fa-brands fa-vuejs
order: 20
index: false
category:
  - vue学习
tag:
  - vue学习
---




父传子：在父组件中，通过绑定 props 的方式，将数据传递给子组件。子组件通过 defineProps 接收从父组件传递的 props，并且可以在模板中使用这些数据。


子传父：父组件需要先定义一个函数，用来处理子组件传递的数据。父组件通过 props 将这个函数传递给子组件。在子组件中，可以在某些事件（比如按钮点击）中调用父组件传来的回调函数，将数据作为参数传递给父组件。

绑定 props，指的是在父组件的模板中使用 v-bind 或者 : 语法，将父组件的数据（例如状态、方法等）作为 props 传递给子组件。



------



### 使用 `props` 进行父子组件通信的 Vue 3 项目

在 Vue 3 中，`props` 是父子组件之间通信的主要方式，特别是父组件向子组件传递数据时。`props` 的数据流向是单向的：从父组件传递到子组件。如果子组件需要与父组件通信（比如事件触发），通常通过父组件传递的函数（回调）进行子组件到父组件的通信。

这个项目将展示：
1. **父组件传递数据给子组件**（非函数的 `props`）。
2. **子组件通过函数 `props` 向父组件发送数据**。

### 项目结构
```
vue-props-demo/
├── public/
├── src/
│   ├── components/
│   │   └── Child.vue  # 子组件
│   ├── App.vue         # 父组件
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 1. 初始化项目

首先，使用 Vite 创建 Vue 3 项目：

```bash
npm init vite@latest vue-props-demo -- --template vue-ts
cd vue-props-demo
npm install
```

### 2. 创建子组件 Child.vue

在 `src/components/Child.vue` 中创建一个简单的子组件。这个组件会接收父组件传递的 `message`，并且通过点击按钮将消息传递给父组件。

```vue
<template>
  <div>
    <h3>子组件</h3>
    <p>从父组件接收到的消息：{{ message }}</p>
    <button @click="sendMessageToParent">给父组件发送消息</button>
  </div>
</template>

<script lang="ts" setup>
// 接收父组件传来的 props
const props = defineProps<{
  message: string;
  sendMessage: (msg: string) => void;
}>()

// 子组件通过调用父组件传来的函数，向父组件发送消息
function sendMessageToParent() {
  props.sendMessage('这是来自子组件的消息！')
}
</script>
```

#### 说明：
- `message` 是从父组件传递过来的非函数 `props`。
- `sendMessage` 是一个从父组件传递过来的函数 `props`，子组件通过调用这个函数来向父组件发送消息。

### 3. 创建父组件 App.vue

接下来，在 `src/App.vue` 中创建父组件。父组件将 `message` 传递给子组件，同时定义 `sendMessage` 函数，子组件调用这个函数时会将消息传递回父组件。

```vue
<template>
  <div>
    <h1>父组件</h1>
    <p>父组件的消息：{{ parentMessage }}</p>
    
    <!-- 向子组件传递消息和函数 -->
    <Child :message="parentMessage" :sendMessage="receiveMessageFromChild" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

// 父组件中的消息
const parentMessage = ref('Hello from Parent')

// 父组件中接收子组件消息的函数
function receiveMessageFromChild(message: string) {
  alert(`收到来自子组件的消息：${message}`)
}
</script>
```

#### 说明：
- `parentMessage` 是父组件的状态，通过 `props` 传递给子组件。
- `receiveMessageFromChild` 是父组件的方法，传递给子组件。当子组件调用这个方法时，父组件会收到来自子组件的消息并弹出一个 `alert` 框。

### 4. 设置 main.ts

在 `src/main.ts` 中初始化 Vue 应用。

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 5. 运行项目

启动项目进行测试：

```bash
npm run dev
```

### 6. 运行效果
1. 父组件会向子组件传递一条消息 "Hello from Parent"。
2. 子组件会显示这条消息。
3. 当用户点击子组件中的按钮时，子组件通过 `props` 中的函数 `sendMessage` 将一条消息发送给父组件。
4. 父组件接收到这条消息，并会弹出一个 `alert` 提示框显示子组件发送的内容。

### 总结

这个简单的 Vue 3 项目演示了如何使用 `props` 在父子组件之间进行通信：
1. 父组件通过 `props` 向子组件传递非函数的属性（如 `message`）。
2. 父组件通过 `props` 向子组件传递函数属性，子组件通过调用这个函数来传递数据回父组件。

这种方式使得父组件可以控制和管理子组件的行为，同时保持子组件的独立性。