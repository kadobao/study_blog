---
title: vue3的slot插槽
icon: 
order: 22
category:
  - vue学习
tag:
  - vue学习
---






写在组件标签里面的标签都是要插入子组件的标签，只是不同插槽的区别。



------

**默认插槽**、**具名插槽** 和 **作用域插槽** 是 Vue 3 中用于父组件向子组件传递内容和数据的三种不同插槽类型。它们的区别主要在于内容的插入方式、是否有名字标识，以及数据的传递机制。以下是详细区别：

### 1. **默认插槽**
- **定义**：如果没有指定插槽名称，父组件的内容将自动插入到子组件中 `<slot></slot>` 所定义的默认位置。这就是 **默认插槽**。
- **特点**：
  - 只支持一个默认插槽。
  - 父组件插入的内容会显示在子组件的默认插槽位置。
  - 不带名字，简单灵活。

**示例**：

**子组件（ChildComponent.vue）**:
```vue
<template>
  <div>
    <slot></slot> <!-- 默认插槽 -->
  </div>
</template>
```

**父组件（ParentComponent.vue）**:
```vue
<template>
  <ChildComponent>
    <p>这是默认插槽中的内容。</p> <!-- 自动插入到默认插槽中 -->
  </ChildComponent>
</template>
```

**结果**：父组件的 `<p>` 标签内容将显示在 `<slot></slot>` 所在的地方。

---

### 2. **具名插槽**
- **定义**：具名插槽允许为多个插槽设置不同的名称，父组件可以通过名称将内容插入到指定的插槽中。
- **特点**：
  - 子组件可以有多个具名插槽，通过 `name` 属性区分。
  - 父组件必须使用 `v-slot:name` 或 `v-slot="name"` 来指定内容插入的位置。
  - 更加灵活，适用于复杂布局。

**示例**：

**子组件（ChildComponent.vue）**:
```vue
<template>
  <div>
    <slot name="header"></slot>  <!-- 具名插槽 header -->
    <slot></slot>                <!-- 默认插槽 -->
    <slot name="footer"></slot>  <!-- 具名插槽 footer -->
  </div>
</template>
```

**父组件（ParentComponent.vue）**:
```vue
<template>
  <ChildComponent>
    <template v-slot:header>
      <h1>这是 Header 插槽的内容。</h1>
    </template>
    
    <p>这是默认插槽的内容。</p>

    <template v-slot:footer>
      <p>这是 Footer 插槽的内容。</p>
    </template>
  </ChildComponent>
</template>
```

**结果**：父组件通过 `v-slot:header` 和 `v-slot:footer`，将内容插入到子组件的对应具名插槽。

---

### 3. **作用域插槽**
- **定义**：作用域插槽允许子组件向父组件传递数据，父组件可以接收这些数据并根据自己的逻辑进行渲染。
- **特点**：
  - 子组件通过插槽绑定数据（例如 `:user="userData"`），父组件可以访问这些数据。
  - 适用于父组件需要根据子组件的状态或数据动态渲染内容的场景。
  - 使用 `v-slot` 的语法传递数据。

**示例**：

**子组件（ChildComponent.vue）**:
```vue
<template>
  <div>
    <slot :user="userData"></slot> <!-- 作用域插槽，向父组件传递数据 -->
  </div>
</template>

<script lang="ts" setup>
const userData = {
  name: 'John Doe',
  age: 30,
  job: 'Developer'
};
</script>
```

**父组件（ParentComponent.vue）**:
```vue
<template>
  <ChildComponent>
    <!-- 获取子组件传递的 userData 数据 -->
    <template v-slot:default="slotProps">
      <p>用户信息：</p>
      <p>姓名：{{ slotProps.user.name }}</p>
      <p>年龄：{{ slotProps.user.age }}</p>
      <p>职业：{{ slotProps.user.job }}</p>
    </template>
  </ChildComponent>
</template>
```

**结果**：父组件通过 `slotProps` 访问子组件传递的数据 `userData`，并动态显示这些数据。

---

### 总结

| 插槽类型       | 特点                                                         | 用途                                               |
| -------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| **默认插槽**   | 不带名称，父组件内容会自动插入到子组件中的默认位置。         | 适用于简单的内容插入。                             |
| **具名插槽**   | 使用 `name` 属性标识多个插槽，父组件内容插入到特定位置。     | 适合需要在多个位置插入内容的子组件。               |
| **作用域插槽** | 子组件将数据传递给父组件，父组件接收并使用这些数据渲染内容。 | 适合需要从子组件传递数据给父组件并动态处理的场景。 |

每种插槽类型都有其独特的用途，默认插槽用于简单场景，具名插槽用于复杂布局，作用域插槽则用于数据交互。



------



### Vue 3 slot  插槽示例

在这个项目中，我们将演示 **默认插槽**、**具名插槽** 和 **作用域插槽** 的用法。

### 1. 项目命令

首先，通过 Vite 创建项目并运行：

```bash
# 创建项目
npm init vite@latest vue-slot-example -- --template vue-ts

# 进入项目目录
cd vue-slot-example

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

---

### 2. 完整项目结构

```
vue-slot-example/
│
├── node_modules/            # 项目依赖
├── public/                  # 静态资源文件
├── src/                     # 源代码目录
│   ├── assets/              # 资源文件夹（图片、图标等）
│   ├── components/          # Vue 组件文件夹
│   │   ├── ChildComponent.vue   # 包含插槽的子组件
│   │   └── ParentComponent.vue  # 负责传递插槽内容的父组件
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口文件
│
├── index.html               # 项目入口 HTML 文件
├── package.json             # 项目配置信息和依赖
├── tsconfig.json            # TypeScript 配置文件
└── vite.config.ts           # Vite 配置文件
```

---

### 3. 代码详细说明

---

#### **ChildComponent.vue**（子组件）

```vue
<template>
  <div class="child">
    <h2>子组件的内容</h2>

    <!-- 默认插槽 -->
    <slot></slot>

    <!-- 具名插槽 -->
    <div class="named-slots">
      <slot name="header"></slot>
      <slot name="footer"></slot>
    </div>

    <!-- 作用域插槽，动态传递数据 -->
    <slot name="content" :user="userData"></slot>
  </div>
</template>

<script lang="ts" setup>
const userData = {
  name: 'John Doe',
  age: 30,
  job: 'Developer'
};
</script>

<style scoped>
.child {
  border: 1px solid #ccc;
  padding: 16px;
}
</style>
```

**解释**：

- **默认插槽**：允许父组件插入默认内容。
- **具名插槽**：通过 `name` 属性，父组件可以插入 `header` 和 `footer` 部分的内容。
- **作用域插槽**：通过 `:user="userData"`，将子组件的数据 `userData` 传递给父组件。

---

#### **ParentComponent.vue**（父组件）

```vue
<template>
  <div class="parent">
    <h1>父组件的内容</h1>

    <!-- 向子组件传递插槽内容 -->
    <ChildComponent>
      <!-- 默认插槽内容 -->
      <p>这是默认插槽中的内容。</p>

      <!-- 具名插槽内容 -->
      <template v-slot:header>
        <h3>这是插入到 Header 具名插槽的内容。</h3>
      </template>

      <template v-slot:footer>
        <h3>这是插入到 Footer 具名插槽的内容。</h3>
      </template>

      <!-- 作用域插槽内容，获取子组件传递的数据 -->
      <template v-slot:content="slotProps">
        <div>
          <p>用户信息来自作用域插槽：</p>
          <p>姓名：{{ slotProps.user.name }}</p>
          <p>年龄：{{ slotProps.user.age }}</p>
          <p>职业：{{ slotProps.user.job }}</p>
        </div>
      </template>
    </ChildComponent>
  </div>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue';
</script>

<style scoped>
.parent {
  margin: 16px;
  padding: 16px;
  border: 2px solid #000;
}
</style>
```

**解释**：

1. **默认插槽**：使用 `<p>` 插入到子组件的默认插槽。
2. **具名插槽**：通过 `<template v-slot:header>` 和 `<template v-slot:footer>`，将内容插入到子组件的具名插槽。
3. **作用域插槽**：使用 `<template v-slot:content="slotProps">`，接收子组件传递的 `userData` 数据并渲染。

---

#### **App.vue**（根组件）

```vue
<template>
  <div>
    <ParentComponent />
  </div>
</template>

<script lang="ts" setup>
import ParentComponent from './components/ParentComponent.vue';
</script>
```

**解释**：`App.vue` 是项目的根组件，加载 `ParentComponent.vue` 作为主显示内容。

---

### 4. 总结

- **默认插槽**：用于在子组件中插入普通内容。
- **具名插槽**：允许父组件将内容插入到特定的插槽位置（如 `header` 和 `footer`）。
- **作用域插槽**：可以从子组件中接收数据并传递给父组件，以便父组件可以在作用域中操作这些数据。

---

### 5. 运行结果

- **默认插槽**：在子组件的默认位置显示“这是默认插槽中的内容”。
- **具名插槽**：`Header` 和 `Footer` 的内容插入到指定位置。
- **作用域插槽**：通过 `userData` 显示子组件的用户信息。
