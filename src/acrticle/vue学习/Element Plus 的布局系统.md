---
title: Element Plus 的布局系统
icon: 
order: 
category:
  - vue学习
tag:
  - vue学习
---






`Element Plus` 布局组件（`<el-container>`、`<el-aside>`、`<el-header>` 和 `<el-main>`），还有一些其它的布局组件和工具，可以帮助构建更复杂的布局结构。下面是完整的 `Element Plus` 布局组件及其使用方式的讲解：

### 1. **`<el-container>`**
   - **作用**：这是最基础的布局容器组件，用来包裹整个布局的其他子组件。它可以用来垂直或水平排列内容。
   - **特性**：当只有一个子元素时，子元素会填满容器；如果有多个子元素，它们会使用 `flex` 布局进行排列。
   - **典型使用场景**：作为应用的外层容器，包裹 `<el-header>`、`<el-aside>` 和 `<el-main>` 等子布局组件。

### 2. **`<el-header>`**
   - **作用**：页面的顶部区域，用于放置页面的标题、导航菜单、或其他顶部内容。
   - **特性**：默认宽度为 100%，可以设置高度。一般位于 `<el-container>` 的顶部。
   - **典型使用场景**：放置 Logo、导航菜单、全局操作按钮（如全屏、通知等）。

### 3. **`<el-aside>`**
   - **作用**：侧边栏，用于放置导航栏、菜单或工具栏。
   - **特性**：可以设置固定宽度（通过 `width` 属性），一般用于布局的左侧或右侧。
   - **典型使用场景**：放置侧边栏菜单、导航、或工具栏。

### 4. **`<el-main>`**
   - **作用**：页面的主要内容区域，通常是布局中的主要内容块。
   - **特性**：默认宽度和高度是自适应的，用于放置页面内容。
   - **典型使用场景**：放置具体的页面内容，如表格、表单等。

---

### 5. **`<el-footer>`**
   - **作用**：页面的底部区域，用于放置页面的页脚内容。
   - **特性**：默认宽度为 100%，可以通过 `height` 属性调整高度。通常位于 `<el-container>` 的最底部。
   - **典型使用场景**：放置版权信息、页脚导航等。
   - **使用示例**：
     ```vue
     <el-footer height="60px">
       页脚内容
     </el-footer>
     ```

---

### 布局组件的结构示例

通过组合这些组件，可以实现更加复杂的页面布局，例如包含顶部导航、侧边栏、主内容区域和底部的布局：


::: details 点击展开项目代码

```vue
<template>
  <!-- 外部容器 -->
  <el-container>
    <!-- 顶部导航栏 -->
    <el-header>
      <h1>这是头部</h1>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        侧边栏内容
      </el-aside>

      <!-- 主内容区域 -->
      <el-main>
        这是主要内容区域
      </el-main>
    </el-container>

    <!-- 页脚 -->
    <el-footer height="60px">
      页脚内容
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
</script>

<style scoped>
/* 可根据需要调整布局的样式 */
</style>
```

:::

在这个示例中，我们构建了一个常见的页面布局：
- **顶部**：使用 `<el-header>` 放置导航栏。
- **中部**：`<el-container>` 包裹 `<el-aside>` 和 `<el-main>`，实现侧边栏和主内容的左右布局。
- **底部**：使用 `<el-footer>` 放置页面的页脚。

---

### 6. `Element Plus` 布局的弹性盒子特性
- **`<el-container>` 和其子组件采用 `flexbox` 布局**：`<el-container>` 和其子组件（如 `<el-header>`、`<el-aside>` 和 `<el-main>` 等）都默认使用 `flex` 布局，这意味着它们可以根据页面大小自适应调整布局。
  
- **`flex-direction`**：当只有 `el-header` 和 `el-main` 时，内容是垂直排列的；当有 `el-aside`、`el-main` 等水平内容时，它们是水平排列的。

---

### 常见布局示例

#### 1. **典型的顶部导航+侧边栏+内容布局**

::: details 点击展开项目代码

```vue
<template>
  <el-container>
    <!-- 顶部导航 -->
    <el-header>Header 区域</el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">Aside 区域</el-aside>

      <!-- 主内容 -->
      <el-main>Main 内容</el-main>
    </el-container>
  </el-container>
</template>
```

:::

- 这个布局最常见，顶部是导航栏，左侧是侧边栏，右侧是主内容区域。

#### 2. **顶部+内容+底部布局**

::: details 点击展开项目代码

```vue
<template>
  <el-container>
    <!-- 顶部 -->
    <el-header>Header 区域</el-header>

    <!-- 主内容区域 -->
    <el-main>Main 内容</el-main>

    <!-- 底部 -->
    <el-footer>Footer 区域</el-footer>
  </el-container>
</template>
```

:::

- 这个布局适用于一些简单页面，顶部放置导航，底部有页脚，中间是主要内容。

#### 3. **嵌套布局：顶部+侧边栏+主内容+页脚**

::: details 点击展开项目代码

```vue
<template>
  <el-container>
    <el-header>Header 区域</el-header>

    <el-container>
      <el-aside width="200px">Aside 区域</el-aside>

      <el-main>Main 内容</el-main>
    </el-container>

    <el-footer>Footer 区域</el-footer>
  </el-container>
</template>
```

:::

- 这个是最完整的嵌套布局，适合大型后台管理系统，既有顶部导航、侧边栏，也有底部页脚。

---

### 总结

`Element Plus` 提供的布局组件（`<el-container>`、`<el-header>`、`<el-aside>`、`<el-main>`、`<el-footer>`）是基于 `flexbox` 的强大布局工具，能够帮助开发者快速构建响应式、现代化的布局结构。

- **`el-container`**：包裹其他布局元素的外层容器。
- **`el-header`**：页面的头部区域。
- **`el-aside`**：页面的侧边栏，通常用于导航。
- **`el-main`**：页面的主内容区域。
- **`el-footer`**：页面的底部区域，用于放置页脚。

通过这些布局组件，可以快速创建具有弹性和响应能力的页面布局，非常适合后台管理系统和仪表板等应用场景。















------





除了 **Element Plus** 的布局组件（`el-container` 系列），Element Plus 还提供了大量其他功能性的 UI 组件。这些组件帮助你构建页面中的具体功能，比如表格、按钮、表单、对话框等。

以下是 **Element Plus** 提供的一些常用组件的分类和列举：

### 1. **基础组件**
这些组件是构建用户界面常用的基础元素。

- **`el-button`**：按钮组件，用于触发操作。
- **`el-link`**：文字链接组件，类似于 `<a>` 标签。
- **`el-icon`**：图标组件，可以使用内置的或自定义的图标。

### 2. **布局组件**
除了基础的 `el-container` 系列布局组件，Element Plus 还提供了一些其他布局相关的组件：

- **`el-row`**：布局中的行容器，用于栅格布局。
- **`el-col`**：布局中的列容器，配合 `el-row` 使用，基于 24 栅格系统。
  
### 3. **表单组件**
这些组件用于构建表单，包含输入、选择和提交操作等。

- **`el-form`**：表单容器，用于管理表单数据和验证。
- **`el-form-item`**：表单项，用于包裹每个表单组件，并提供标签、校验等功能。
- **`el-input`**：输入框组件，用于文本输入。
- **`el-select`**：下拉选择框，用于选择一项或多项数据。
- **`el-checkbox`**：复选框，用于多选操作。
- **`el-radio`**：单选框，用于单选操作。
- **`el-switch`**：开关组件，提供切换操作。
- **`el-slider`**：滑块输入组件，允许用户通过拖动滑块选择值。

### 4. **数据展示组件**
用于展示数据内容，如表格、标签等。

- **`el-table`**：表格组件，用于展示数据列表。
- **`el-table-column`**：表格的列组件，定义每一列的内容。
- **`el-tag`**：标签组件，用于标记和分类内容。
- **`el-progress`**：进度条组件，显示任务完成的进度。
- **`el-badge`**：标记组件，用于给按钮、图标等显示消息数量或状态。
- **`el-card`**：卡片组件，用于展示信息块。

### 5. **通知与消息组件**
用于提供反馈或提示用户操作。

- **`el-alert`**：警告提示，显示重要提示信息。
- **`el-message`**：消息通知，短暂显示全局消息。
- **`el-message-box`**：消息弹框，用于确认、提示、警告等。
- **`el-notification`**：通知组件，在右上角显示通知信息。
- **`el-loading`**：加载状态组件，显示加载中的状态。

### 6. **导航组件**
用于导航和组织页面。

- **`el-menu`**：菜单组件，用于导航栏、侧边栏。
- **`el-tabs`**：标签页组件，用于多个内容的切换。
- **`el-breadcrumb`**：面包屑组件，显示用户的当前位置。
- **`el-pagination`**：分页组件，用于数据的分页展示。
- **`el-dropdown`**：下拉菜单组件，用于操作列表。

### 7. **对话框和弹出层组件**
用于显示额外信息或操作。

- **`el-dialog`**：对话框，用于显示模态窗口，常用于表单、消息提示等。
- **`el-popover`**：气泡框，用于展示额外信息。
- **`el-tooltip`**：提示工具，用于鼠标悬停时显示提示信息。

### 8. **反馈组件**
用于反馈用户的操作状态。

- **`el-loading`**：全局或局部的加载状态指示器。
- **`el-progress`**：进度条，展示任务或操作的进度。
- **`el-skeleton`**：骨架屏，用于加载中的占位展示。

### 9. **文件上传与下载**
用于上传或下载文件的操作。

- **`el-upload`**：文件上传组件。
- **`el-download`**：文件下载组件。

### 10. **其他组件**
一些功能型的辅助组件。

- **`el-calendar`**：日历组件，显示日历信息。
- **`el-date-picker`**：日期选择器。
- **`el-time-picker`**：时间选择器。
- **`el-divider`**：分割线组件，用于分割不同内容块。
- **`el-image`**：图片组件，支持懒加载、缩放等功能。
- **`el-avatar`**：头像组件，显示用户头像。
- **`el-collapse`**：折叠面板，用于内容的展示和隐藏。
- **`el-carousel`**：轮播图组件，展示多个内容的轮播。

---

### 总结

**Element Plus** 提供了非常丰富的组件库，涵盖了大多数开发过程中需要的 UI 组件，从基础的布局组件到高级的交互组件，它都提供了相应的解决方案。以下是一些常用的组件类别：

1. **基础组件**：`el-button`、`el-link`、`el-icon` 等。
2. **布局组件**：`el-row`、`el-col`、`el-container` 系列。
3. **表单组件**：`el-form`、`el-input`、`el-select`、`el-checkbox` 等。
4. **数据展示组件**：`el-table`、`el-tag`、`el-card` 等。
5. **通知与消息组件**：`el-message`、`el-alert`、`el-notification` 等。
6. **导航组件**：`el-menu`、`el-tabs`、`el-breadcrumb` 等。
7. **对话框和弹出层组件**：`el-dialog`、`el-tooltip`、`el-popover` 等。
8. **反馈组件**：`el-loading`、`el-progress`、`el-skeleton` 等。

可以根据具体需求，选择适合的组件来快速构建功能齐全的 UI 界面。