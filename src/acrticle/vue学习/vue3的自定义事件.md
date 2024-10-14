### 自定义事件：父组件和子组件分别需要做的事情

#### 1. **子组件**：

- **声明自定义事件**：使用 `defineEmits` 声明子组件要触发的自定义事件。
- **触发自定义事件**：使用 `emit` 函数来触发自定义事件，并将数据发送到父组件。

#### 2. **父组件**：

- **监听自定义事件**：在父组件中使用 `@自定义事件名="回调函数"` 绑定自定义事件。
- **处理事件数据**：父组件定义回调函数来处理子组件传递的数据。



回调函数 ：是函数，但是被作为参数传递给另一个函数或者被事件调用。

emit('customEvent', 'message')：事件的名称（customEvent），表示要触发的自定义事件； 'message'这是事件的参数或数据。在这种情况下，message 是一个字符串，

------



### Vue 3 自定义事件子传父：`emit` 和 `defineEmits` 项目示例

在 Vue 3 中，**自定义事件**是子组件向父组件传递数据的一种方式。通过在子组件中使用 `defineEmits` 声明自定义事件，然后通过 `emit` 触发事件，可以将数据从子组件传递给父组件。推荐的命名方式是使用 `kebab-case`，这是一种规范的命名方式，符合 HTML 属性的命名习惯。

### 项目结构：
```
vue-custom-event-demo/
├── public/
├── src/
│   ├── components/
│   │   └── Child.vue   # 子组件
│   ├── App.vue         # 父组件
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 1. 初始化项目

使用 Vite 创建一个 Vue 3 项目：

```bash
npm init vite@latest vue-custom-event-demo -- --template vue-ts
cd vue-custom-event-demo
npm install
```

### 2. 父组件 `App.vue`

在父组件中，我们会定义一个自定义事件 `send-message`，子组件将通过触发这个事件来传递消息给父组件。

```vue
<template>
  <div>
    <h1>父组件</h1>
    <p>父组件接收到的消息：{{ parentMessage }}</p>

    <!-- 在模板中绑定子组件的自定义事件 -->
    <Child @send-message="receiveMessage" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

// 父组件中接收子组件消息的状态
const parentMessage = ref('')

// 父组件中定义的函数，用来接收子组件触发的自定义事件
function receiveMessage(message: string) {
  parentMessage.value = message
}
</script>
```

#### 说明：
- **绑定自定义事件**：父组件通过 `@send-message="receiveMessage"` 绑定自定义事件 `send-message`，当子组件触发这个事件时，父组件会调用 `receiveMessage` 函数。
- **`receiveMessage` 函数**：这是父组件中定义的函数，用于接收来自子组件的消息，并将消息存储到 `parentMessage` 中。

### 3. 子组件 `Child.vue`

在子组件中，我们使用 `defineEmits` 来声明自定义事件 `send-message`，并通过 `emit` 函数触发这个事件，将数据发送到父组件。

```vue
<template>
  <div>
    <h3>子组件</h3>
    <input v-model="message" placeholder="输入要发送的消息" />
    <button @click="sendMessageToParent">发送消息给父组件</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 定义一个自定义事件 send-message
const emit = defineEmits(['send-message'])

// 子组件中的消息
const message = ref('')

// 子组件触发自定义事件，向父组件发送消息
function sendMessageToParent() {
  emit('send-message', message.value)  // 触发自定义事件并传递数据
}
</script>
```

#### 说明：
- **`defineEmits`**：使用 `defineEmits` 定义子组件要触发的自定义事件，事件名称为 `send-message`。
- **`emit('send-message', message.value)`**：当用户点击按钮时，调用 `emit` 函数触发 `send-message` 事件，并将 `message` 作为参数传递给父组件。

### 4. 设置 `main.ts`

在 `src/main.ts` 中初始化 Vue 应用并挂载到 DOM：

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 5. 运行项目

启动项目：

```bash
npm run dev
```

### 6. 项目效果

1. 父组件绑定了子组件的自定义事件 `@send-message`，并定义了 `receiveMessage` 函数。
2. 子组件通过 `emit` 触发自定义事件 `send-message`，并将输入框中的内容传递给父组件。
3. 父组件接收到来自子组件的消息，并将其显示在页面上。

### 完整代码示例

#### **父组件 `App.vue`**

```vue
<template>
  <div>
    <h1>父组件</h1>
    <p>父组件接收到的消息：{{ parentMessage }}</p>

    <!-- 通过 @send-message 绑定子组件的自定义事件 -->
    <Child @send-message="receiveMessage" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

// 父组件中接收子组件消息的状态
const parentMessage = ref('')

// 父组件中定义的函数，用来接收子组件触发的自定义事件
function receiveMessage(message: string) {
  parentMessage.value = message
}
</script>
```

#### **子组件 `Child.vue`**

```vue
<template>
  <div>
    <h3>子组件</h3>
    <input v-model="message" placeholder="输入要发送的消息" />
    <button @click="sendMessageToParent">发送消息给父组件</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 定义一个自定义事件 send-message
const emit = defineEmits(['send-message'])

// 子组件中的消息
const message = ref('')

// 子组件触发自定义事件，向父组件发送消息
function sendMessageToParent() {
  emit('send-message', message.value)  // 触发自定义事件并传递数据
}
</script>
```

### 总结：
1. **定义自定义事件**：使用 `defineEmits` 在子组件中定义自定义事件。事件名称推荐使用 **`kebab-case`** 命名方式。
2. **触发自定义事件**：通过 `emit` 函数触发自定义事件，并传递数据给父组件。
3. **父组件绑定事件**：父组件通过 `@自定义事件名="回调函数"` 的方式绑定自定义事件，当事件触发时，父组件的回调函数被调用。

这种方式实现了 **子组件向父组件** 传递数据，是 Vue 组件间通信的重要机制之一。