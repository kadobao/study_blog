---
title: 在vue3项目里面使用windicss和icon图标
icon: 
order: 
category:
  - vue学习
tag:
  - vue学习
---

### 使用 WindiCSS 修改登录页面
首先，我们将 WindiCSS 安装并配置到项目中。WindiCSS 是一个用于快速开发的实用工具类库，它与 Tailwind CSS 类似，但速度更快。

#### 第一步：安装 WindiCSS
1. 通过 npm 安装 WindiCSS 和相应的 Vite 插件。
      
      ```
      npm install -D windicss vite-plugin-windicss
      ```
      
      


2. 安装完成后，在项目根目录创建一个 windi.config.ts 配置文件。该文件用于配置 WindiCSS 的一些选项：
      
   ```
   import { defineConfig } from 'windicss/helpers'
   
   export default defineConfig({
     /* 你可以在这里添加自定义配置 */
   })
   ```
   
   
   

#### 第二步：配置 Vite 使用 WindiCSS
打开 vite.config.ts 文件，添加 WindiCSS 插件。

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(), // 加入 WindiCSS 插件
  ],
})
```

现在你就可以随意使用windicss了，而不是每次要自己弄。
![屏幕截图-2024-10-16-230459](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20241016/屏幕截图-2024-10-16-230459.pfbw0x6b8.jpg)

### 使用Element Plus 的图标

```
npm install @element-plus/icons-vue
```











#### 在App.vue里面加入这个

```
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

之后直接使用插槽就行。



------

### 依旧是登录页面作为示例

```
<template>
  <div class="login-container">


    <!-- el-card 是 Element Plus 提供的一个卡片组件，通常用于展示内容块或信息面板。el-card 组件的主要作用是将内容以卡片的形式展示，具有视觉上的分离感，适合用来展示数据、列表、表单等内容。 -->
    <el-card class="login-card">


      <!-- 在 Vue 和 Element Plus 中，`<template>` 标签通常用于 **具名插槽** (named slots)，用于自定义组件内部某些特定部分的内容。这里的 `template #header` 是 Element Plus 中的一个 **具名插槽**，用于自定义 `el-card` 组件的头部内容。 -->
      <template #header>
        <h2 class="text-2xl font-bold text-center">登录</h2>
      </template>

      <!-- 组件里面有v-bind和v-model绑定，一个是单向的，一个是双向的。
      ref 用在普通 DOM 标签上，获取的是 DOM 节点；ref 用在组件标签上，获取的是组件实例对象。 -->


      <!-- el-form 是表单的整体容器，负责管理整个表单的数据绑定、验证规则和提交等功能。


      常用属性：

      model：用于绑定表单数据的对象，所有的 el-form-item 将从这里获取具体字段的数据。
      rules：表单验证规则，通常是一个对象，包含每个表单字段的验证规则。
      validate：提供方法手动触发表单验证。
      label-position：标签的位置，决定 el-form-item 中的标签显示位置（如 left、right、top）。 -->

      <el-form ref="loginFormRef" :rules="rules" :model="loginForm">



        <!-- el-form-item 是表单中的一个具体表单项，它负责包装单个输入组件（如 el-input）并提供验证、标签显示等功能。

        prop：表示与 el-form 的 model 对象中的哪个字段相关联，通常用于验证和数据绑定。
        label：为当前表单项设置标签名。
        rules：单独为此表单项定义验证规则（可覆盖 el-form 中定义的全局规则）。

        prop="username" 使得当前的 el-form-item 与 el-form 上定义的验证规则（rules）绑定在一起。这样当 el-form 验证表单时，会根据 prop="username" 找到对应的验证规则，并对当前输入框中的内容进行验证。 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名">

            <!-- 使用 template 标签定义前缀图标，并使用 slot 属性指定插槽名称。 -->
            <template #prefix>
              <el-icon><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password>

            <!-- 使用 template 标签定义前缀图标，并使用 slot 属性指定插槽名称。 -->
            <template #prefix>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElForm } from 'element-plus'

// 路由对象，用于页面跳转
const router = useRouter()

// 按钮加载状态
const loading = ref(false)

// 表单引用，用于获取表单实例
const loginFormRef = ref<InstanceType<typeof ElForm> | null>(null)  // 类型断言，表明 loginFormRef 是 ElForm 的实例或 null

// 表单数据模型，使用 reactive 创建响应式数据
const loginForm = reactive({
  username: '',  // 用户名字段
  password: ''   // 密码字段
})

// 登录处理函数
const handleLogin = () => {
  // 确保 loginFormRef 不为 null
  if (loginFormRef.value) {
    // 调用表单的 validate 方法进行验证，`loginFormRef` 是通过 `ref()` 创建的，它是一个响应式的引用对象，`loginFormRef.value` 才是指向实际的 `el-form` 组件实例（也就是 `ElForm` 实例）。
    loginFormRef.value.validate((valid: boolean) => {
      if (!valid) {
        // 如果验证失败，显示错误信息
        ElMessage.error('请填写完整的表单')
        return
      }
      
      loading.value = true  // 开始加载状态

      // 模拟登录请求（这里使用 setTimeout 模拟异步请求）
      setTimeout(() => {
        // 检查用户名和密码是否正确
        if (loginForm.username === 'admin' && loginForm.password === 'password') {
          // 将登录状态存储在 localStorage 中
          localStorage.setItem('isLoggedIn', 'true')
          // 跳转到首页
          router.push('/')
          // 显示登录成功提示弹窗
          ElMessage.success('登录成功')
        } else {
          // 如果用户名或密码错误，显示错误提示弹窗
          ElMessage.error('用户名或密码错误')
        }
        loading.value = false  // 请求结束，取消加载状态
      }, 1000)
    })
  }
}


// validate 方法的执行流程：
// 当你调用 loginFormRef.value.validate() 时，它会根据你在 rules 属性中定义的规则（rules 对象）逐个验证每个表单项。
// 验证完成后，validate 方法会调用回调函数，并传入一个 valid 参数。
// 如果所有表单项都符合规则，valid 会是 true。
// 如果有任何表单项不符合规则，valid 会是 false。

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }  // 用户名必填，并且在失去焦点时验证
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }  // 密码必填，并且在失去焦点时验证
  ]
}
</script>


  
<style scoped>
  .login-container {
  @apply flex justify-center items-center h-screen bg-gray-100;
  }
  .login-card {
  @apply w-[350px];
  }
</style>
```

