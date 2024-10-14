`<el-row>`：用来创建一行，可以包裹多个列（<el-col>）。`

`<el-col>·`：用来创建列，表示行中的一个块，通过 span 属性控制列的宽度。



```html
<el-menu
  default-active="1"
  class="el-menu-vertical-demo"
  @open="handleOpen"
  @close="handleClose"
>
```

表示有菜单栏，并且是激活第一个菜单


el-menu：是整个菜单的容器。通过 default-active="1" 设置了第一个菜单项（首页）为默认激活状态。@open 和 @close 事件用来监听子菜单的展开与关闭。



el-menu-item-group：将多个菜单项分组。
el-menu-item-group 是菜单项的分组组件，允许我们将多个 el-menu-item 进行分类，在视觉上和逻辑上形成一个组。

作用：当需要将子菜单进一步分组时使用，通常用于对一系列菜单项进行分类（例如用户设置和系统设置）。
特点：分组的菜单项通常属于同一类别。组的标题由 title 属性指定。只能包含 el-menu-item，不能包含其他 el-sub-menu。



el-menu-item-group 通常是包含在 el-sub-menu 内部的，用于对 el-sub-menu 里的多个 el-menu-item 进行逻辑分组和分类展示。

在实际使用中，el-sub-menu 是一个可以展开和折叠的父菜单项，而 el-menu-item-group 则为该子菜单项中的内容提供了进一步的组织方式，将相关的菜单项归为一组，并以标题区分。



------



### Vue 3 + Element Plus 简单菜单栏项目

下面我们来搭建一个简单的 Vue 3 项目，使用 Element Plus 提供的菜单组件，并包含构建命令与项目结构。

### 项目结构
```
my-vue-menu-app/
├── node_modules/          # Node.js 依赖
├── public/                # 静态文件
│   └── index.html         # 入口 HTML 文件
├── src/                   # 项目源码
│   ├── assets/            # 静态资源文件
│   ├── components/        # 组件目录
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── router/            # 路由文件夹 (可选)
├── package.json           # 项目配置和依赖
└── vite.config.ts         # Vite 配置文件
```

### 1. 初始化项目

#### 使用 Vite 创建项目：
```bash
npm create vite@latest my-vue-menu-app -- --template vue-ts
cd my-vue-menu-app
npm install
```

#### 安装 Element Plus 依赖：
```bash
npm install element-plus
```

### 2. 目录结构说明
- **`App.vue`**：主组件，包含 Element Plus 菜单栏。
- **`main.ts`**：入口文件，用来挂载 Vue 实例并引入 Element Plus。

### 3. 项目文件

#### `src/main.ts`
入口文件，用于引入 Element Plus 和挂载 Vue 实例。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

#### `src/App.vue`
主组件，包含导航菜单。

```vue
<template>
  <el-row>
    <el-col :span="12">
      <h5>导航菜单示例</h5>
      <!-- 垂直菜单 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- 菜单项 -->
        <el-menu-item index="1">
          <el-icon><location /></el-icon>
          <span>首页</span>
        </el-menu-item>

        <!-- 子菜单 -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>设置</span>
          </template>
          <el-menu-item-group title="用户设置">
            <el-menu-item index="2-1">个人信息</el-menu-item>
            <el-menu-item index="2-2">安全设置</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="系统设置">
            <el-menu-item index="2-3">主题</el-menu-item>
            <el-menu-item index="2-4">通知</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!-- 禁用的菜单项 -->
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>文档</span>
        </el-menu-item>

        <!-- 普通菜单项 -->
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>帮助</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Location, Menu as IconMenu, Document, Setting } from '@element-plus/icons-vue'

// 打开子菜单的处理方法
const handleOpen = (key: string, keyPath: string[]) => {
  console.log('菜单展开：', key, keyPath)
}

// 关闭子菜单的处理方法
const handleClose = (key: string, keyPath: string[]) => {
  console.log('菜单关闭：', key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo {
  width: 200px;
  border-right: 1px solid #d3dce6;
}
</style>
```

### 4. 运行项目

#### 运行开发服务器：
```bash
npm run dev
```

#### 构建生产环境：
```bash
npm run build
```

#### 预览构建结果：
```bash
npm run preview
```

### 5. 项目说明

- **`el-menu`**: 使用 Element Plus 的菜单组件，支持垂直布局。`default-active="1"` 表示默认选中第一个菜单项。
- **`el-menu-item`**: 表示菜单项，`index` 用于标识唯一性。
- **`el-sub-menu`**: 创建带有子菜单的项，`#title` 插槽用于自定义标题。
- **`el-menu-item-group`**: 对菜单项进行分组，比如将“用户设置”和“系统设置”分为不同的部分。
- **`handleOpen` 和 `handleClose`**: 分别处理菜单展开和关闭时的事件。

### 6. 构建工具

该项目使用 **Vite** 作为构建工具，具有快速的启动和构建性能。





------

为了让菜单栏既包含侧边栏导航，又有顶部导航，你可以通过在 **Element Plus** 中使用水平菜单实现顶部导航，垂直菜单实现侧边栏导航。以下是一个修改后的完整 Vue 3 项目代码示例，其中顶部有导航菜单，左侧也有垂直的侧边栏导航。

### 修改后的 `App.vue`：

```vue
<template>
  <el-container>
    <!-- 顶部导航 -->
    <el-header>
      <el-menu
        mode="horizontal"
        default-active="1"
        @open="handleOpen"
        @close="handleClose"
        class="el-menu-demo"
      >
        <el-menu-item index="1">
          <el-icon><location /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>关于我们</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><setting /></el-icon>
          <span>联系我们</span>
        </el-menu-item>
      </el-menu>
    </el-header>

    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <!-- 菜单项 -->
          <el-menu-item index="1">
            <el-icon><location /></el-icon>
            <span>首页</span>
          </el-menu-item>

          <!-- 子菜单 -->
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>设置</span>
            </template>
            <el-menu-item-group title="用户设置">
              <el-menu-item index="2-1">个人信息</el-menu-item>
              <el-menu-item index="2-2">安全设置</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="系统设置">
              <el-menu-item index="2-3">主题</el-menu-item>
              <el-menu-item index="2-4">通知</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <!-- 禁用的菜单项 -->
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>文档</span>
          </el-menu-item>

          <!-- 普通菜单项 -->
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>帮助</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-main>
        <h2>欢迎访问我们的页面！</h2>
        <p>在这里您可以看到顶部和侧边栏的导航菜单。</p>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Location, Menu as IconMenu, Document, Setting } from '@element-plus/icons-vue'

// 打开子菜单的处理方法
const handleOpen = (key: string, keyPath: string[]) => {
  console.log('菜单展开：', key, keyPath)
}

// 关闭子菜单的处理方法
const handleClose = (key: string, keyPath: string[]) => {
  console.log('菜单关闭：', key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo {
  height: 100%;
  border-right: 1px solid #d3dce6;
}
.el-menu-demo {
  background-color: #545c64;
  color: #fff;
}
</style>
```

### 主要修改说明：

1. **顶部导航（`el-header` 部分）**：
   - 使用了 `el-menu`，并设置了 `mode="horizontal"`，表示菜单是水平排列的。
   - 顶部的菜单项有“首页”、“关于我们”、“联系我们”。
   - 同样使用了 `el-icon` 为每个菜单项加上图标。

2. **侧边栏导航（`el-aside` 部分）**：
   - `el-aside` 宽度设定为 `200px`，并放置了一个垂直的 `el-menu`。
   - 与之前的垂直导航一样，子菜单包含“用户设置”和“系统设置”等分组。

3. **主体内容（`el-main` 部分）**：
   - `el-main` 作为主要内容区，放置了一些文本作为示例。

### 效果：
- **顶部导航**：在页面顶部，用户可以点击导航到“首页”、“关于我们”、“联系我们”。
- **侧边栏导航**：在页面左侧，侧边栏提供了更详细的导航选项，包含“设置”子菜单和其子项。
- **主体内容**：右侧显示主内容区域，顶部导航和侧边栏导航可以协同工作。

### 运行项目：

1. 进入项目目录：
   ```bash
   cd my-vue-menu-app
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行项目：
   ```bash
   npm run dev
   ```

这样，你就可以在浏览器中看到一个包含顶部导航和侧边栏导航的页面布局。

------

### 完整的 Vue 3 + Element Plus 项目，带导航栏

这是一个包含顶部和侧边栏导航的 Vue 3 项目。点击菜单项时，URL 会变化，内容区域也会相应更新。下面是详细的项目结构、所有相关代码和构建、运行项目的命令。

### 项目结构

```
my-vue-menu-app/
├── node_modules/            # Node.js 依赖
├── public/                  # 静态文件
│   └── index.html           # 入口 HTML 文件
├── src/                     # 源代码
│   ├── assets/              # 静态资源文件
│   ├── components/          # 可重用的组件
│   ├── views/               # 各页面组件
│   │   ├── HomeView.vue     # 首页
│   │   ├── AboutView.vue    # 关于我们
│   │   ├── ContactView.vue  # 联系我们
│   │   ├── ProfileView.vue  # 个人信息
│   │   ├── SecurityView.vue # 安全设置
│   │   ├── ThemeView.vue    # 主题设置
│   │   ├── NotificationsView.vue # 通知设置
│   │   ├── HelpView.vue     # 帮助页面
│   ├── App.vue              # 主组件
│   ├── main.ts              # 入口文件
│   ├── router/              # 路由配置
│   │   └── index.ts
├── package.json             # 项目配置和依赖
└── vite.config.ts           # Vite 配置文件
```

### 1. 初始化项目

首先，使用 **Vite** 来初始化项目：

```bash
npm create vite@latest my-vue-menu-app -- --template vue-ts
cd my-vue-menu-app
npm install
```

安装完成后，进入项目目录并安装 **Element Plus** 和 **Vue Router**：

```bash
npm install element-plus @element-plus/icons-vue vue-router
```

### 2. `src/main.ts` - 入口文件

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)  // 使用 Vue Router
app.mount('#app')
```

### 3. `src/router/index.ts` - 路由配置

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ProfileView from '../views/ProfileView.vue'
import SecurityView from '../views/SecurityView.vue'
import ThemeView from '../views/ThemeView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import HelpView from '../views/HelpView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/settings/profile', name: 'Profile', component: ProfileView },
  { path: '/settings/security', name: 'Security', component: SecurityView },
  { path: '/settings/theme', name: 'Theme', component: ThemeView },
  { path: '/settings/notifications', name: 'Notifications', component: NotificationsView },
  { path: '/help', name: 'Help', component: HelpView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 4. `src/App.vue` - 主组件

```vue
<template>
  <el-container>
    <!-- 顶部导航 -->
    <el-header>
      <el-menu
        mode="horizontal"
        default-active="1"
        router
        class="el-menu-demo"
      >
        <el-menu-item index="/">
          <el-icon><location /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon><icon-menu /></el-icon>
          <span>关于我们</span>
        </el-menu-item>
        <el-menu-item index="/contact">
          <el-icon><setting /></el-icon>
          <span>联系我们</span>
        </el-menu-item>
      </el-menu>
    </el-header>

    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/">
            <el-icon><location /></el-icon>
            <span>首页</span>
          </el-menu-item>

          <!-- 子菜单 -->
          <el-sub-menu index="settings">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>设置</span>
            </template>
            <el-menu-item-group title="用户设置">
              <el-menu-item index="/settings/profile">个人信息</el-menu-item>
              <el-menu-item index="/settings/security">安全设置</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="系统设置">
              <el-menu-item index="/settings/theme">主题</el-menu-item>
              <el-menu-item index="/settings/notifications">通知</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-menu-item index="/help">
            <el-icon><setting /></el-icon>
            <span>帮助</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Location, Menu as IconMenu, Setting } from '@element-plus/icons-vue'
</script>

<style>
.el-menu-vertical-demo {
  height: 100%;
  border-right: 1px solid #d3dce6;
}
.el-menu-demo {
  background-color: #545c64;
  color: #fff;
}
</style>
```

### 5. 创建视图组件

#### `src/views/HomeView.vue`

```vue
<template>
  <div>
    <h1>首页</h1>
    <p>欢迎访问我们的首页！</p>
  </div>
</template>
```

#### `src/views/AboutView.vue`

```vue
<template>
  <div>
    <h1>关于我们</h1>
    <p>这里是关于我们的页面。</p>
  </div>
</template>
```

#### `src/views/ContactView.vue`

```vue
<template>
  <div>
    <h1>联系我们</h1>
    <p>这里是联系我们的页面。</p>
  </div>
</template>
```

#### `src/views/ProfileView.vue`

```vue
<template>
  <div>
    <h1>个人信息</h1>
    <p>这里是用户的个人信息设置页面。</p>
  </div>
</template>
```

#### `src/views/SecurityView.vue`

```vue
<template>
  <div>
    <h1>安全设置</h1>
    <p>这里是用户的安全设置页面。</p>
  </div>
</template>
```

#### `src/views/ThemeView.vue`

```vue
<template>
  <div>
    <h1>主题设置</h1>
    <p>这里是用户的主题设置页面。</p>
  </div>
</template>
```

#### `src/views/NotificationsView.vue`

```vue
<template>
  <div>
    <h1>通知设置</h1>
    <p>这里是用户的通知设置页面。</p>
  </div>
</template>
```

#### `src/views/HelpView.vue`

```vue
<template>
  <div>
    <h1>帮助页面</h1>
    <p>这里是帮助页面。</p>
  </div>
</template>
```

### 6. 启动项目

执行以下命令启动项目：

```bash
npm run dev
```

### 运行效果

- 顶部导航栏和侧边栏会根据点击跳转不同的页面。
- URL 会随导航变化，并且主体内容区会根据路由更新显示相应的页面内容。

### 构建项目

当你准备部署时，可以运行以下命令构建项目：

```bash
npm run build
```

这将会生成一个 `dist` 目录，包含生产环境可用的文件。





------



### 完整的 Vue 3 + Element Plus 项目结构，包含登录功能

这个项目实现了登录页面、侧边栏和顶部导航栏。在用户登录成功后，导航栏和页面内容会显示；否则，会强制用户访问登录页面。

### 项目结构

```
my-vue-menu-app/
├── node_modules/            # Node.js 依赖
├── public/                  # 静态文件
│   └── index.html           # 入口 HTML 文件
├── src/                     # 源代码
│   ├── assets/              # 静态资源文件
│   ├── components/          # 可重用的组件
│   ├── views/               # 各页面组件
│   │   ├── HomeView.vue     # 首页
│   │   ├── AboutView.vue    # 关于我们
│   │   ├── ContactView.vue  # 联系我们
│   │   ├── ProfileView.vue  # 个人信息
│   │   ├── SecurityView.vue # 安全设置
│   │   ├── ThemeView.vue    # 主题设置
│   │   ├── NotificationsView.vue # 通知设置
│   │   ├── HelpView.vue     # 帮助页面
│   │   └── LoginView.vue    # 登录页面
│   ├── App.vue              # 主组件
│   ├── main.ts              # 入口文件
│   ├── router/              # 路由配置
│   │   └── index.ts         # 路由逻辑
├── package.json             # 项目配置和依赖
└── vite.config.ts           # Vite 配置文件
```

### 1. 初始化项目

使用 **Vite** 创建 Vue 3 项目：

```bash
npm create vite@latest my-vue-menu-app -- --template vue-ts
cd my-vue-menu-app
npm install
```

接下来安装 **Element Plus** 和 **Vue Router**：

```bash
npm install element-plus @element-plus/icons-vue vue-router
```

### 2. `src/main.ts` - 入口文件

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
```

### 3. `src/router/index.ts` - 路由配置

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ProfileView from '../views/ProfileView.vue'
import SecurityView from '../views/SecurityView.vue'
import ThemeView from '../views/ThemeView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import HelpView from '../views/HelpView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/settings/profile', name: 'Profile', component: ProfileView },
  { path: '/settings/security', name: 'Security', component: SecurityView },
  { path: '/settings/theme', name: 'Theme', component: ThemeView },
  { path: '/settings/notifications', name: 'Notifications', component: NotificationsView },
  { path: '/help', name: 'Help', component: HelpView },
  { path: '/login', name: 'Login', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，检查用户是否登录
router.beforeEach((to, _from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (to.name !== 'Login' && !isLoggedIn) next({ name: 'Login' })
  else next()
})

export default router
```

### 4. `src/App.vue` - 主组件

```vue
<template>
  <div>
    <el-container v-if="isLoggedIn">
      <!-- 顶部导航 -->
      <el-header>
        <el-menu
          mode="horizontal"
          default-active="1"
          router
          class="el-menu-demo"
        >
          <el-menu-item index="/">
            <el-icon><location /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><icon-menu /></el-icon>
            <span>关于我们</span>
          </el-menu-item>
          <el-menu-item index="/contact">
            <el-icon><setting /></el-icon>
            <span>联系我们</span>
          </el-menu-item>
          <el-menu-item index="/logout" @click="logout">
            <el-icon><icon-exit /></el-icon>
            <span>登出</span>
          </el-menu-item>
        </el-menu>
      </el-header>

      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item index="/">
              <el-icon><location /></el-icon>
              <span>首页</span>
            </el-menu-item>

            <!-- 子菜单 -->
            <el-sub-menu index="settings">
              <template #title>
                <el-icon><icon-menu /></el-icon>
                <span>设置</span>
              </template>
              <el-menu-item-group title="用户设置">
                <el-menu-item index="/settings/profile">个人信息</el-menu-item>
                <el-menu-item index="/settings/security">安全设置</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="系统设置">
                <el-menu-item index="/settings/theme">主题</el-menu-item>
                <el-menu-item index="/settings/notifications">通知</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item index="/help">
              <el-icon><setting /></el-icon>
              <span>帮助</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主体内容 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>

    <router-view v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Location, Menu as IconMenu, Setting, CircleClose as IconExit } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')

// 监听路由变化，如果从登录页面跳转出来，刷新 isLoggedIn 的状态
watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  }
)

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  isLoggedIn.value = false
  router.push('/login')
}
</script>

<style>
.el-menu-vertical-demo {
  height: 100%;
  border-right: 1px solid #d3dce6;
}
.el-menu-demo {
  background-color: #545c64;
  color: #fff;
}
</style>
```

### 5. 创建视图组件

#### `src/views/LoginView.vue`

```vue
<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2>登录</h2>
      </template>
      <el-form :model="loginForm" @submit.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loading = ref(false)
const loginForm = reactive({
  username: '',
  password: ''
})

const handleLogin = () => {
  loading.value = true
  setTimeout(() => {
    if (loginForm.username === 'admin' && loginForm.password === 'password') {
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/')
      ElMessage.success('登录成功')
    } else {
      ElMessage.error('用户名或密码错误')
    }
    loading.value = false
  }, 1000)
}


</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.login-card {
  width: 350px;
}
</style>
```

#### 其余视图组件如 `HomeView.vue`、`AboutView.vue` 等你可以直接参考之前的模板。

### 6. 启动项目

执行以下命令启动项目：

```bash
npm run dev
```

### 项目构建

执行以下命令生成生产环境构建：

```bash
npm run build
```

构建完成后，生成的文件会存放在 `dist/` 目录中。

------

直接在view文件里面增加404页面，然后在路由文件夹里面增加一个路由就行



当然，我们可以添加一个 404 页面来处理未匹配的路由。以下是修改后的代码：

1. 首先，创建一个新的 `NotFoundView.vue` 文件：

在 `src/views/` 目录下创建 `NotFoundView.vue`：

```vue
<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>页面不存在</h2>
    <el-button type="primary" @click="goHome">返回首页</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  font-size: 72px;
  margin-bottom: 0;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
}
</style>
```

2. 然后，修改 `src/router/index.ts` 文件，添加 404 路由：

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ProfileView from '../views/ProfileView.vue'
import SecurityView from '../views/SecurityView.vue'
import ThemeView from '../views/ThemeView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import HelpView from '../views/HelpView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'  // 新增

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/settings/profile', name: 'Profile', component: ProfileView },
  { path: '/settings/security', name: 'Security', component: SecurityView },
  { path: '/settings/theme', name: 'Theme', component: ThemeView },
  { path: '/settings/notifications', name: 'Notifications', component: NotificationsView },
  { path: '/help', name: 'Help', component: HelpView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }  // 新增，放在最后
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，检查用户是否登录
router.beforeEach((to, _from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (to.name !== 'Login' && to.name !== 'NotFound' && !isLoggedIn) next({ name: 'Login' })
  else next()
})

export default router
```

这里的主要变化是：

1. 导入了新创建的 `NotFoundView` 组件。
2. 在路由配置数组的最后添加了一个通配符路由，它会匹配所有未被其他路由匹配的路径。
3. 在路由守卫中，我们允许未登录用户访问 `NotFound` 页面。

现在，当用户访问一个不存在的路由时，他们将被重定向到 404 页面。这个页面会显示一个简单的错误消息和一个返回首页的按钮。

这样，你的 Vue 3 + Element Plus 项目就增加了一个 404 页面，提供了更好的用户体验。