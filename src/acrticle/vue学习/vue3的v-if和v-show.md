---
title: vue3的v-if和v-show
icon: 
order: 
category:
  - vue学习
tag:
  - vue学习
---



`v-if` 控制元素是否渲染到 DOM中。
`v-show` 通过 CSS 控制元素是否可见，但不影响其在 DOM 中的存在。

------



### Vue 3 项目讲解：`v-if` 和 `v-show`

在这个示例项目中，我们会通过简单的 Vue 3 代码，展示如何使用 `v-if` 和 `v-show` 控制元素的显示与隐藏。

### 1. 创建 Vue 3 项目

我们将使用 Vite 创建一个 Vue 3 项目。

#### 项目创建命令：
```bash
# 创建项目
npm init vite@latest vue3-v-if-v-show-demo -- --template vue-ts

# 进入项目目录
cd vue3-v-if-v-show-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 项目结构

执行完上述命令后，项目结构大致如下：

```
vue3-v-if-v-show-demo/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.vue        # 主应用文件
│   ├── main.ts        # 项目入口文件
│   └── vite-env.d.ts
├── index.html         # 项目模板
├── package.json
├── tsconfig.json
└── vite.config.ts     # Vite 配置文件
```

我们会在 `App.vue` 文件中编写 `v-if` 和 `v-show` 的示例。

### 3. 修改 `App.vue` 文件

```vue
<script lang="ts" setup>
import { ref } from 'vue'

// 创建两个响应式变量用于控制元素显示和隐藏
const showIf = ref(false)  // 控制 v-if
const showShow = ref(false)  // 控制 v-show

// 切换函数
const toggleIf = () => {
  showIf.value = !showIf.value
}

const toggleShow = () => {
  showShow.value = !showShow.value
}
</script>

<template>
  <div class="container">
    <h1>Vue 3 中 v-if 和 v-show 示例</h1>
    
    <!-- v-if 示例 -->
    <div>
      <button @click="toggleIf">切换 v-if</button>
      <p v-if="showIf">这是 v-if 控制的段落</p>
    </div>

    <!-- v-show 示例 -->
    <div>
      <button @click="toggleShow">切换 v-show</button>
      <p v-show="showShow">这是 v-show 控制的段落</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

button {
  margin-bottom: 10px;
}
</style>
```

### 4. 代码讲解

- **`v-if`**：
  - 当 `showIf` 为 `true` 时，段落 `<p>` 会被渲染到 DOM 中。如果 `showIf` 为 `false`，该段落将**完全从 DOM 中移除**。
  
- **`v-show`**：
  - 当 `showShow` 为 `true` 时，段落 `<p>` 会通过 CSS `display: block` 显示出来。如果 `showShow` 为 `false`，段落不会被移除，但会被设置为 `display: none`，即仍然存在于 DOM 中但不可见。

- **切换逻辑**：
  - 通过点击不同的按钮，可以分别切换 `v-if` 和 `v-show` 的状态，并观察它们在页面上控制元素显示与隐藏的效果。

### 5. 启动项目

运行以下命令启动项目：

```bash
npm run dev
```

然后打开浏览器，访问项目地址（通常是 `http://localhost:5173/`），你会看到两个按钮和两个段落。点击按钮可以分别切换 `v-if` 和 `v-show` 控制的段落。

### 6. 总结

- **`v-if`**：当条件为 `false` 时，元素会从 DOM 中移除。当条件为 `true` 时，元素会被重新渲染。
- **`v-show`**：元素始终存在于 DOM 中，只是通过 CSS `display` 属性控制可见性。

这两者的主要区别在于：`v-if` 适合频繁显示和移除元素，`v-show` 适合频繁显示和隐藏元素（不重新渲染 DOM）。