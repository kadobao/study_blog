---
title: vue3的mitt
icon: 
order: 
category:
  - vue学习
tag:
  - vue学习
---






在使用 mitt 实现两个组件之间的通信时，两个组件需要分别执行以下步骤：

1. 子组件 A（发布事件的组件）
导入 emitter：将 mitt 创建的事件总线（emitter）引入到组件中：
emitter.emit('message-from-A', message.value) 这行代码定义并触发了一个名为 message-from-A 的事件。

​	触发事件：在合适的时机使用 emit 方法触发事件，并通过事件传递数据：抽象为一个函数，然后绑定点击事件。


2. 子组件 B（监听事件的组件）
导入 emitter：同样引入 emitter。
监听事件：使用 on 方法监听事件，并在事件触发时接收数据：emitter.on('message-from-A', handleMessage) 的作用是监听一个名为 message-from-A 的事件，当这个事件被触发时，执行指定的回调函数 handleMessage。

​	移除监听（可选）：当组件卸载时，可以通过 off 方法移除事件监听，防止内存泄漏。





------





### 使用 `mitt` 实现组件间通信的完整示例

这个例子展示了如何通过 `mitt` 实现 Vue 3 组件间的通信。项目结构如下：

```
mitt-vue3-demo/
├── src/
│   ├── components/
│   │   ├── ComponentA.vue  # 事件发布者组件
│   │   ├── ComponentB.vue  # 事件监听者组件
│   ├── utils/
│   │   └── emitter.ts      # mitt 实例
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
```

### 1. `emitter.ts` - 事件总线的创建

在 `src/utils/emitter.ts` 中创建并导出 `mitt` 实例，同时定义事件类型：

```ts
// src/utils/emitter.ts
import mitt from 'mitt'

// 定义事件类型接口
type Events = {
  'message-from-A': string // 'message-from-A' 事件传递的数据类型是 string
}

// 创建 mitt 实例并指定事件类型
const emitter = mitt<Events>()

// 导出 emitter 实例
export default emitter
```

### 2. `ComponentA.vue` - 发布事件的组件

这个组件包含一个输入框和按钮，用户输入消息后点击按钮，触发 `message-from-A` 事件，将消息发送到其他组件。

```vue
<template>
  <div>
    <h2>组件 A</h2>
    <input v-model="message" placeholder="输入消息" />
    <button @click="sendMessage">发送消息到组件 B</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import emitter from '../utils/emitter'  // 引入 emitter

// 定义输入的消息
const message = ref('')

// 触发事件，将数据发送给其他组件
function sendMessage() {
  emitter.emit('message-from-A', message.value)  // 触发 'message-from-A' 事件，发送数据
}
</script>
```

### 3. `ComponentB.vue` - 监听事件的组件

这个组件监听 `message-from-A` 事件，并显示从 `ComponentA` 接收到的消息。

```vue
<template>
  <div>
    <h2>组件 B</h2>
    <p>接收到的消息：{{ receivedMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import emitter from '../utils/emitter'  // 引入 emitter

// 定义接收到的消息
const receivedMessage = ref('')

// 监听事件
function handleMessage(message: string) {
  receivedMessage.value = message
}

// 在组件挂载时监听事件，并在组件卸载时移除监听
onMounted(() => {
  emitter.on('message-from-A', handleMessage)  // 监听 'message-from-A' 事件
})

onUnmounted(() => {
  emitter.off('message-from-A', handleMessage)  // 卸载时移除事件监听
})
</script>
```

### 4. `App.vue` - 渲染两个组件

`App.vue` 用于渲染 `ComponentA` 和 `ComponentB`，让它们可以进行事件通信。

```vue
<template>
  <div>
    <h1>Mitt 事件通信示例</h1>
    <ComponentA />
    <ComponentB />
  </div>
</template>

<script lang="ts" setup>
import ComponentA from './components/ComponentA.vue'
import ComponentB from './components/ComponentB.vue'
</script>
```

### 5. `main.ts` - 入口文件

在 `src/main.ts` 中，初始化 Vue 应用并挂载到 DOM。

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 运行步骤：
1. 初始化项目并安装 `mitt`：
   ```bash
   npm init vite@latest mitt-vue3-demo -- --template vue-ts
   cd mitt-vue3-demo
   npm install
   npm install mitt
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

### 结果：
- 在 `ComponentA` 中输入消息，点击 "发送消息到组件 B" 按钮。
- `ComponentB` 将显示从 `ComponentA` 发送过来的消息，实现了组件之间的通信。
