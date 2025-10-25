---
title: vue3的v-model
icon: fa-brands fa-vuejs
order: 27
index: false
category:
  - vue学习
tag:
  - vue学习
---






v-model在html标签:
在script定义数据，然后在模板哪里使用v-model绑定就行。



v-model在组件标签:
父组件：在script定义数据，然后在模板哪里使用v-model将父组件的变量和子组件内部的属性进行双向绑定；
子组件：使用 defineModel() 宏来接收从父组件传递过来的数据，并直接在模板中通过 v-model 绑定到html标签上。

------

### Vue 3.4 中 `defineModel()` 与 `v-model` 使用示例

在 Vue 3.4 中，推荐使用 `defineModel()` 来取代传统的 `v-model`，处理父子组件间的双向数据绑定。这大大简化了数据传递过程，不需要手动处理 `props` 和 `emit`。

本项目展示如何在 **父组件** 中使用 `v-model`，以及在 **子组件** 中使用 `defineModel()` 来实现双向绑定。

------

v-model在html标签:

格式：v-model="dataProperty"，这里的 `dataProperty` 是组件内部的数据属性。在 HTML 标签 或 基础表单元素 上使用 v-model 进行双向数据绑定的常规方式，比如在 `<input>`, `<textarea>`, `<select>` 等元素上。



v-model在父组件与子组件之间的双向数据绑定

格式：v-model:customProperty="dataProperty"，这里 customProperty 是自定义组件的内部属性，dataProperty 是父组件中的数据属性。这是在 自定义组件 上使用 v-model 的方式，主要用于父组件与子组件之间的双向数据绑定。自定义的修饰符（如 first-name）用于区分不同的绑定目标。

---

### 1. 项目命令

#### 创建并运行项目：

1. 使用 Vite 创建 Vue 3 + TypeScript 项目：

```bash
# 创建 Vue 3 + TypeScript 项目
npm init vite@latest vue-model-example -- --template vue-ts

# 进入项目目录
cd vue-model-example

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

---

### 2. 项目结构

```
vue-model-example/
│
├── node_modules/            # 项目依赖
├── public/                  # 静态资源文件
├── src/                     # 源代码目录
│   ├── components/          # Vue 组件文件夹
│   │   └── UserName.vue     # 子组件
│   ├── App.vue              # 父组件
│   └── main.ts              # 应用入口文件
│
├── index.html               # 项目入口 HTML 文件
├── package.json             # 项目配置信息和依赖
├── tsconfig.json            # TypeScript 配置文件
└── vite.config.ts           # Vite 配置文件
```

---

### 3. 代码详细说明

#### 3.1 **父组件（App.vue）**

父组件声明 `first` 和 `last` 两个数据，通过 `v-model` 绑定到子组件的 `first-name` 和 `last-name` 属性，子组件使用这些数据。

```vue
<script setup lang="ts">
import { ref } from 'vue';
import UserName from './components/UserName.vue';  // 引入子组件

// 定义父组件的数据
const first = ref('John');
const last = ref('Doe');
</script>

<template>
  <h1>{{ first }} {{ last }}</h1>  <!-- 实时显示用户输入的 first 和 last 值 -->

  <!-- 通过 v-model 将父组件数据传递给子组件 -->
  <UserName
    v-model:first-name="first"
    v-model:last-name="last"
  />
</template>
```

- **`first` 和 `last`** 是父组件定义的响应式数据，用于存储用户的名字和姓氏。
- **`v-model:first-name="first"`** 和 **`v-model:last-name="last"`** 用于双向绑定父组件和子组件的数据。

---

#### 3.2 **子组件（UserName.vue）**

子组件使用 `defineModel()` 接收从父组件传递的数据，并在模板中通过 `v-model` 绑定到输入框中。子组件不需要手动处理 `props` 或 `emit`，`defineModel()` 自动完成这些逻辑。

```vue
<script setup lang="ts">
// 使用 defineModel 宏接收父组件传递的数据
const firstName = defineModel('firstName');
const lastName = defineModel('lastName');
</script>

<template>
  <!-- 输入框通过 v-model 绑定数据，实时更新父组件 -->
  <input type="text" v-model="firstName" placeholder="First Name" />
  <input type="text" v-model="lastName" placeholder="Last Name" />
</template>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 14px;
  width: 200px;
}
</style>
```

- **`defineModel('firstName')`** 和 **`defineModel('lastName')`** 自动处理双向绑定，无需手动声明 `props` 或 `emit`。
- 子组件的输入框绑定 `v-model="firstName"` 和 `v-model="lastName"`，实现父组件与子组件之间的数据同步。

---

### 4. 运行结果

- 在浏览器中运行项目后，父组件展示当前的 `first` 和 `last` 值。
- 当用户在子组件的输入框中输入名字或姓氏时，父组件中绑定的 `first` 和 `last` 数据将自动更新。
- 同时，父组件中的数据显示也会立即反映在页面上，实现双向绑定。

---

### 5. 总结

- **`defineModel()`** 是 Vue 3.4 中的新功能，用于处理组件间的双向数据绑定，简化了子组件的 `props` 和 `emit` 逻辑。
- **父组件** 使用 `v-model` 将数据传递给子组件，**子组件** 使用 `defineModel()` 自动接收数据并进行双向绑定。
- 通过 `defineModel()`，您无需手动监听输入事件并 `emit` 数据，简化了开发流程，代码更加简洁。



示例是官方的，URL:

```
https://play.vuejs.org/#eNqFkstuwjAQRX/F8iZUAqKKHQpIfbAoUmnVx86bKEzANLEt26FUkf+9Y4MDSAg2UWbu9fjckVv6oNRw2wAd08wUmitLDNhGTZngtZLakpZoKIkjpZY1SdCadNK3Ab3IazhowzQ2/ES0MVFIYSwpucbvxA/qJXO5FsldlKr8qDxL8EKW7kEQAQsLtapyC1gRkq3vp217mOccwf8wwLksRSlYIoMvCNkOarmEahyODAT2J4yGgtFzhx8UDf5/r6c4NEs7CNqnpxkvbO0kcVjNhCyh5AJe/SW9pBPOV3DJGvu3dsKFaiyxf8qTW9gheQwVs4Z90BDm5oF47cF/Ht4aZC75argxUmD61g9ktJC14hXoN2U5ZmJ0TILitbyq5O889KxuoB/7xRqKnwv9jdn5HqPvGnDVWwTpNJvrFSCul2efi4DeiRigqdB9RfwAI6vGM+5tj41YIvaJL9C+hOfNxerLzHYWhImhPKh3uuBnFJ/A05XoR9zRcBTOMeGo+wcs+yse
```

