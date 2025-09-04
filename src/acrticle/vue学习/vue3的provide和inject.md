---
title: vue3的provide和inject
icon: 
order: 21
category:
  - vue学习
tag:
  - vue学习
---



父组件需要做的事：

创建计数器状态并通过 provide 提供。

定义逻辑处理，如增加计数，并通过按钮触发。

provide('sharedCounter', counter)



孙组件需要做的事：

使用 inject 获取父组件提供的状态。

渲染接收到的计数值。
```
const injectedCounter = inject<number>('sharedCounter', 0)
```



父组件负责提供状态，并控制业务逻辑（如计数增加），provide(注入名, 默认值)

孙组件只负责显示从父组件提供的状态，而不涉及逻辑处理，const value = inject(注入名, 默认值)



------



### Vue 3 `provide` 和 `inject` 计数器示例

通过 `provide` 和 `inject` 实现父组件向孙组件传递计数器数据。

### 1. 初始化项目

使用 Vite 创建一个新的 Vue 3 + TypeScript 项目：

```bash
# 创建新的 Vue 3 项目
npm init vite@latest vue-provide-inject-counter -- --template vue-ts

# 进入项目目录
cd vue-provide-inject-counter

# 安装依赖
npm install
```

### 2. 创建组件文件

在 `src/components/` 目录下创建三个组件文件：`Parent.vue` (父组件), `Child.vue` (子组件), `GrandChild.vue` (孙组件)。

项目结构如下：

```
vue-provide-inject-counter/
├── public/
├── src/
│   ├── components/
│   │   ├── Parent.vue        # 父组件
│   │   ├── Child.vue         # 子组件
│   │   └── GrandChild.vue    # 孙组件
│   ├── App.vue               # 根组件
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 3. 编写组件代码

#### 父组件 `Parent.vue`

`Parent.vue` 作为父组件，包含计数器状态，并通过 `provide` 将计数数据传递给孙组件。

```vue
<template>
  <div>
    <h1>父组件</h1>
    <p>当前计数：{{ counter }}</p>
    <button @click="incrementCounter">点击增加计数</button>
    <Child />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import Child from './Child.vue'

// 父组件的计数状态
const counter = ref(0)

// 使用 provide 提供计数状态给子组件和孙组件
provide('sharedCounter', counter)

// 函数：点击按钮时递增计数
function incrementCounter() {
  counter.value++
}
</script>
```

#### 子组件 `Child.vue`

`Child.vue` 不处理任何逻辑，只负责渲染孙组件 `GrandChild.vue`。

```vue
<template>
  <div>
    <h2>子组件</h2>
    <GrandChild />
  </div>
</template>

<script lang="ts" setup>
import GrandChild from './GrandChild.vue'
</script>
```

#### 孙组件 `GrandChild.vue`

`GrandChild.vue` 通过 `inject` 获取父组件提供的计数器数据，并在页面上展示。

```vue
<template>
  <div>
    <h3>孙组件</h3>
    <p>孙组件接收到的计数：{{ injectedCounter }}</p>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

// 使用 inject 获取父组件通过 provide 提供的计数状态
const injectedCounter = inject<number>('sharedCounter', 0)
</script>
```

#### 根组件 `App.vue`

根组件只负责渲染父组件 `Parent.vue`。

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

### 4. 设置 `main.ts`

在 `src/main.ts` 中初始化 Vue 应用并挂载到 DOM。

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 5. 运行项目

在终端中运行以下命令，启动开发服务器：

```bash
npm run dev
```

然后打开浏览器，访问 [http://localhost:5173](http://localhost:5173) 查看项目效果。

### 项目效果

1. **父组件 (`Parent.vue`)** 通过按钮增加计数，并通过 `provide` 提供计数数据。
2. **孙组件 (`GrandChild.vue`)** 通过 `inject` 获取计数数据并显示。
3. 每次点击按钮，父组件和孙组件都会更新计数显示。

通过该示例，可以直观理解 `provide` 和 `inject` 的使用场景，特别是在多层级组件数据传递中的优势。