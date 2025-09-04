---
title: vue3的useslots
icon: 
order: 24
category:
  - vue学习
tag:
  - vue学习
---




`useSlots` 是 Composition API 中的一个功能，它可以让你在组合式 API 中访问父组件提供的插槽内容。



它与 Options API 中的 `this.$slots` 类似。(Vue 3 减少了对 `$` 符号的使用，Vue 3 提供了 **Composition API**，使得不需要通过 `this` 和 `$` 前缀来访问这些功能。这使代码更直观、模块化，且更易于重构与测试；之所以还提供主要为了兼容使用 Options API 的代码)



------

Vue 3 提供了一种更简洁的语法，`v-slot` 可以缩写为 #。

`#footer`是 `v-slot:footer` 的缩写形式。



`v-if` 控制元素是否渲染到 DOM中。

`v-if="slots.footer" `的意思是：它检查 `slots.footer` 是否存在。

------



- ### Vue 3 项目使用 `useSlots` 讲解

  ### 1. 项目创建步骤

  首先，创建项目并安装依赖：

  ```bash
  # 使用 npm 创建 Vue 3 项目
  npm init vite@latest use-slots-demo -- --template vue-ts
  
  # 进入项目目录
  cd use-slots-demo
  
  # 安装依赖
  npm install
  
  # 启动开发服务器
  npm run dev
  ```

  ### 2. 项目结构

  在项目中，我们会有以下目录结构：

  ```
  use-slots-demo/
  │
  ├── public/
  │   └── index.html
  ├── src/
  │   ├── components/
  │   │   ├── ChildComponent.vue    # 子组件
  │   │   └── ParentComponent.vue   # 父组件
  │   ├── App.vue                   # 根组件
  │   ├── main.ts                   # 主入口
  │   └── style.css
  ├── package.json
  ├── tsconfig.json
  ├── vite.config.ts
  └── index.html
  ```

  ### 3. 代码实现

  #### 1. `ChildComponent.vue` - 子组件

  使用 `useSlots` 获取插槽内容，接受默认插槽和具名插槽。

  ```vue
  <script lang="ts" setup>
  // 从 vue 包中导入 useSlots
  import { useSlots } from 'vue';
  
  const slots = useSlots(); // 使用 useSlots
  </script>
  
  <template>
    <div>
      <h2>我是子组件</h2>
      <!-- 渲染默认插槽内容 -->
      <!-- 这里使用了slots -->
      <div v-if="slots.default">
        <h3>默认插槽内容:</h3>
        <slot></slot>
      </div>
      
      <!-- 渲染具名插槽内容 -->
      <div v-if="slots.footer">
        <h3>具名插槽 (footer):</h3>
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  ```

  #### 2. `ParentComponent.vue` - 父组件

  这是父组件，将插槽内容传递给 `ChildComponent.vue`。

  ```vue
  <script lang="ts" setup>
  import ChildComponent from './ChildComponent.vue'; // 引入子组件
  </script>
  
  <template>
    <div>
      <h1>我是父组件</h1>
  
      <!-- 使用子组件并传递插槽 -->
      <child-component>
        <!-- 默认插槽 -->
        <template #default>
          <p>这是传递给默认插槽的内容。</p>
        </template>
  
        <!-- footer 具名插槽 -->
        <template #footer>
          <p>这是传递给 footer 插槽的内容。</p>
        </template>
      </child-component>
    </div>
  </template>
  ```

  #### 3. `App.vue` - 根组件

  `App.vue` 将 `ParentComponent.vue` 挂载到根组件中。

  ```vue
  <script lang="ts" setup>
  import ParentComponent from './components/ParentComponent.vue'; // 引入父组件
  </script>
  
  <template>
    <div>
      <parent-component />
    </div>
  </template>
  ```

  #### 4. `main.ts` - 入口文件

  在 `main.ts` 中将根组件挂载到 `#app`。

  ```ts
  import { createApp } from 'vue';
  import App from './App.vue';
  import './style.css';
  
  createApp(App).mount('#app');
  ```

  #### 5. `index.html` - 基本HTML

  项目的 `index.html` 文件结构如下：

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>useSlots Demo</title>
    </head>
    <body>
      <div id="app"></div>
      <script type="module" src="/src/main.ts"></script>
    </body>
  </html>
  ```

  ### 4. 启动项目

  完成代码编写后，运行以下命令启动项目：

  ```bash
  npm run dev
  ```