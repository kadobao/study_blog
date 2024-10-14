使用defineProps明确声明它将接收哪些属性。这些声明的属性称为声明为 props 的属性。

------



### 使用 `useAttrs` 的简单 Vue 3 项目演示

使用 `useAttrs()` 来处理传递给组件的非 props 属性（例如 HTML 的原生属性和自定义 `data-*` 属性）。以下是整个项目的创建步骤、项目结构和代码实现。

### 1. 创建项目

使用 Vite 和 TypeScript 创建 Vue 3 项目，运行以下命令：

```bash
# 使用 Vite 创建 Vue 3 项目，带有 TypeScript 支持
npm init vite@latest use-attrs-demo -- --template vue-ts

# 进入项目目录
cd use-attrs-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 项目结构

```
use-attrs-demo/
│
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChildComponent.vue    # 子组件，使用 useAttrs
│   │   └── ParentComponent.vue   # 父组件，传递 HTML 原生属性
│   ├── App.vue                   # 根组件
│   ├── main.ts                   # 项目主入口
│   └── style.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

### 3. 代码实现

#### 1. `ChildComponent.vue` - 子组件

在子组件中，使用 `useAttrs()` 获取父组件传递的所有非 props 属性，并通过 `v-bind` 将这些属性动态绑定到根元素。

```vue
<script lang="ts" setup>
import { useAttrs } from 'vue';

// 使用 useAttrs 获取所有父组件传递的非 props 的特性
const attrs = useAttrs();  
</script>

<template>
  <!-- 将获取到的特性通过 v-bind 动态绑定到根元素 -->
  <div v-bind="attrs">
    <h2>我是子组件</h2>
    <p>这些属性通过 useAttrs 传递并绑定到这里。</p>

    <!-- 遍历 attrs 对象，显示每个传递的属性 -->
    <div>
      <h3>接收到的非 props 属性:</h3>
      <ul>
        <li v-for="(value, key) in attrs" :key="key">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

#### 2. `ParentComponent.vue` - 父组件

父组件向子组件传递一些 HTML 原生属性（如 `id`、`class` 和 `data-*`），这些属性会通过 `useAttrs()` 在子组件中捕获并应用。

```vue
<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue';
</script>

<template>
  <div>
    <h1>我是父组件</h1>

    <!-- 向子组件传递非 props 属性 -->
    <child-component id="child-id" class="child-class" data-info="Hello, Vue 3 with useAttrs!" />
  </div>
</template>
```

#### 3. `App.vue` - 根组件

`App.vue` 中只需要挂载 `ParentComponent.vue`。

```vue
<script lang="ts" setup>
import ParentComponent from './components/ParentComponent.vue';
</script>

<template>
  <parent-component />
</template>
```

#### 4. `main.ts` - 入口文件

`main.ts` 是项目的主入口，将 Vue 应用挂载到页面的 `#app` 容器中。

```ts
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App).mount('#app');
```

### 4. 启动项目

完成代码编写后，运行以下命令启动项目：

```bash
npm run dev
```

### 5. 总结

- **useAttrs()**：用于获取组件传递的所有非 props 属性，并返回一个包含这些属性的对象。
- **v-bind="attrs"**：将通过 `useAttrs()` 捕获的属性动态绑定到元素上，使父组件传递的属性能灵活应用到子组件中。
