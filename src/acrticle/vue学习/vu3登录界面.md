---
title: vue3登录界面
icon: 
order: 11
category:
  - vue3学习
tag:
  - vue3学习
---




### vue3登录界面


::: details 点击展开项目代码

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
            <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password></el-input>
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
    // 这里应该调用实际的登录 API
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

:::


```
          <el-form-item>
            <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password></el-input>
          </el-form-item>
```

`placeholder="密码" `是占位符，

使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框