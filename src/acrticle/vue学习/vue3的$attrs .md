---
title: vue3的$attrs 
icon: 
order: 15
category:
  - vue学习
tag:
  - vue学习
---






父组件只要接收就行，子组件使用v-bind="$attrs"将父组件传递的属性传递给孙组件，孙组件使用defineProps接收之后就可以直接使用了



------



### 组件职责划分

在这个 Vue 3 示例中，父组件（`Parent.vue`）、中间组件（`Middle.vue`）和孙组件（`Child.vue`）有各自明确的职责。通过使用 `$attrs`，简化了属性的传递，特别是在不需要中间层组件处理属性的情况下。

#### 1. 父组件（`Parent.vue`）职责
**父组件的主要职责** 是定义数据和方法，并将这些数据和方法作为 `props` 传递给子组件（中间组件）。父组件负责控制和管理这些数据的逻辑和更新。

**需要做的事情：**
- 定义数据属性，例如 `message`、`count` 和 `isActive`。
- 定义方法，例如 `updateCount`，用于更新数据（如 `count`）。
- 通过 `props` 将数据和方法传递给中间组件。

**父组件的代码职责：**
```vue
<template>
  <div class="parent">
    <h3>父组件</h3>
    <!-- 传递多个属性给中间组件 -->
    <Middle :msg="message" :count="count" :isActive="isActive" :updateCount="updateCount" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Middle from './Middle.vue'

// 定义父组件的数据
const message = ref('这是从父组件传递的消息')
const count = ref(5)
const isActive = ref(true)

// 定义一个方法，用于更新 count 的值
function updateCount(newCount: number) {
  count.value = newCount
}
</script>
```

#### 2. 中间组件（`Middle.vue`）职责
**中间组件的主要职责** 是作为数据的中转站，不需要显式声明 `props`。通过 `$attrs`，它将从父组件传递的所有数据（未声明的 `props`）直接传递给孙组件。

**需要做的事情：**
- 接收父组件传递的所有属性，不显式声明 `props`。
- 使用 `$attrs`，通过 `v-bind="$attrs"` 将这些属性直接传递给孙组件。

**中间组件的代码职责：**
```vue
<template>
  <div class="middle">
    <h3>中间组件</h3>
    <!-- 使用 $attrs 将父组件传递的属性传递给孙组件 -->
    <Child v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
import Child from './Child.vue'
</script>
```

#### 3. 孙组件（`Child.vue`）职责
**孙组件的主要职责** 是接收从父组件传递的属性（通过中间组件的 `$attrs`），展示数据并执行传递的方法（例如更新父组件中的数据）。

**需要做的事情：**
- 使用 `defineProps` 接收从中间组件传递的所有属性，包括数据（`msg`、`count`、`isActive`）和方法（`updateCount`）。
- 展示传递的数据。
- 使用传递的方法 `updateCount` 更新父组件的 `count`。

**孙组件的代码职责：**
```vue
<template>
  <div class="child">
    <h3>孙组件</h3>
    <!-- 展示从父组件传递过来的属性 -->
    <p>消息：{{ msg }}</p>
    <p>计数：{{ count }}</p>
    <p>是否激活：{{ isActive ? '是' : '否' }}</p>

    <!-- 使用按钮调用传递的方法，更新计数 -->
    <button @click="updateCount(count + 1)">增加计数</button>
  </div>
</template>

<script lang="ts" setup>
// 使用 defineProps 接收从中间组件传递过来的所有属性
const { msg, count, isActive, updateCount } = defineProps<{
  msg: string
  count: number
  isActive: boolean
  updateCount: (newCount: number) => void
}>()
</script>

<style scoped>
.child {
  border: 1px solid green;
  padding: 10px;
}
</style>
```

### 组件职责总结

- **父组件 (`Parent.vue`)：**
  - 定义和管理数据（如 `message`、`count`）。
  - 定义更新数据的方法（如 `updateCount`）。
  - 将数据和方法传递给中间组件。
  
- **中间组件 (`Middle.vue`)：**
  - 不处理任何数据，仅通过 `$attrs` 直接将父组件的所有属性传递给孙组件。
  - 简化中间层的逻辑，减少显式声明 `props` 的必要。

- **孙组件 (`Child.vue`)：**
  - 接收并展示从父组件传递的数据（通过中间组件）。
  - 执行传递的更新方法（如 `updateCount`），影响父组件的数据。

### 通过 `$attrs` 的优势
- **简化属性传递**：无需中间组件逐一处理和声明 `props`，直接使用 `$attrs` 传递到下一级组件，降低了代码的复杂性。
- **适用于多层嵌套**：当数据需要跨越多个组件传递时，$attrs 可以很好地简化中间层的传递逻辑。



------



### 使用 `$attrs` 实现 Vue 3 组件间的多数据属性传递

在这个扩展示例中，我们将演示如何通过 `$attrs` 传递多个属性，包括字符串、数字和方法，从父组件传递到孙组件，并在孙组件中使用这些数据和方法。

#### 1. 项目结构
```
vue3-multi-attrs-demo/
├── src/
│   ├── components/
│   │   ├── Parent.vue        # 父组件
│   │   ├── Middle.vue        # 中间组件
│   │   └── Child.vue         # 孙组件
│   ├── App.vue               # 根组件
│   └── main.ts               # 入口文件
```

#### 2. `Parent.vue` - 父组件
父组件定义了多个数据属性和方法，并将它们传递给中间组件。

```vue
<template>
  <div class="parent">
    <h3>父组件</h3>
    <!-- 向中间组件传递多个属性：msg, count, isActive 以及方法 updateCount -->
    <Middle :msg="message" :count="count" :isActive="isActive" :updateCount="updateCount" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Middle from './Middle.vue'

// 定义父组件的数据
const message = ref('这是从父组件传递的消息')
const count = ref(5)
const isActive = ref(true)

// 定义一个方法，用于更新 count 的值
function updateCount(newCount: number) {
  count.value = newCount
}
</script>

<style scoped>
.parent {
  border: 1px solid black;
  padding: 10px;
}
</style>
```

**解释：**
- 父组件定义了多个数据属性：`message`、`count` 和 `isActive`。
- 父组件还定义了一个 `updateCount` 方法用于更新 `count`，并将这些属性和方法传递给中间组件。

#### 3. `Middle.vue` - 中间组件
中间组件不处理这些属性，而是通过 `$attrs` 将它们直接传递给孙组件。

```vue
<template>
  <div class="middle">
    <h3>中间组件</h3>
    <!-- 使用 $attrs 将所有属性传递给孙组件 -->
    <Child v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
import Child from './Child.vue'
</script>

<style scoped>
.middle {
  border: 1px solid blue;
  padding: 10px;
}
</style>
```

**解释：**
- 中间组件通过 `$attrs` 接收所有来自父组件的属性，并使用 `v-bind="$attrs"` 将它们传递给孙组件。
- 中间组件无需显式声明 `props`，仅作为属性的中转站。

#### 4. `Child.vue` - 孙组件
孙组件接收所有传递的属性并展示，同时使用传递的方法更新父组件的数据。

```vue
<template>
  <div class="child">
    <h3>孙组件</h3>
    <!-- 展示从父组件传递过来的属性 -->
    <p>消息：{{ msg }}</p>
    <p>计数：{{ count }}</p>
    <p>是否激活：{{ isActive ? '是' : '否' }}</p>

    <!-- 使用按钮调用传递的方法，更新计数 -->
    <button @click="updateCount(count + 1)">增加计数</button>
  </div>
</template>

<script lang="ts" setup>
// 使用 defineProps 接收从中间组件传递过来的所有属性
const { msg, count, isActive, updateCount } = defineProps<{
  msg: string
  count: number
  isActive: boolean
  updateCount: (newCount: number) => void
}>()
</script>

<style scoped>
.child {
  border: 1px solid green;
  padding: 10px;
}
</style>
```

**解释：**
- 孙组件使用 `defineProps` 明确声明接收的多个属性，包括字符串、数字、布尔值和方法。
- 通过模板展示这些属性，并通过按钮调用 `updateCount` 方法更新 `count` 的值。

#### 5. `App.vue` - 根组件
根组件渲染父组件。

```vue
<template>
  <div>
    <Parent />
  </div>
</template>

<script lang="ts" setup>
import Parent from './components/Parent.vue'
</script>
```

#### 6. `main.ts` - 入口文件
初始化并挂载 Vue 应用。

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 运行步骤
1. 初始化项目并安装依赖：
   ```bash
   npm init vite@latest vue3-multi-attrs-demo -- --template vue-ts
   cd vue3-multi-attrs-demo
   npm install
   ```

2. 启动项目：
   ```bash
   npm run dev
   ```

### 总结
- **父组件 (`Parent.vue`)**：定义多个数据和方法，并将它们作为 `props` 传递给中间组件。
- **中间组件 (`Middle.vue`)**：通过 `$attrs` 将未声明为 `props` 的属性传递给孙组件。
- **孙组件 (`Child.vue`)**：接收传递的所有属性并展示，同时调用传递的 `updateCount` 方法更新父组件的数据。

这个示例展示了如何传递多种类型的属性（字符串、数字、布尔值和方法）并通过 `$attrs` 简化中间层组件的处理。