---
title: 修改pinia数据的三个方式
icon: fa-brands fa-vuejs
order: 6
category:
  - vue学习
tag:
  - vue学习
---



在 Pinia 中修改数据主要有三个方式，分别是：`直接修改`、`使用 Actions 修改`、`使用 $patch 批量修改`。

## 1. 直接修改

在组件中可以直接通过 store 实例修改 state：

```javascript
// 引入 store
import { useCounterStore } from '@/stores/counter'

// 获取 store 实例
const store = useCounterStore()

// 直接修改 state
store.count++ // 修改基本类型
store.user.name = '张三' // 修改对象属性
store.items.push(newItem) // 修改数组
```

## 2. 使用 Actions 修改（推荐）

在 store 中定义 actions 来修改 state：

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    user: { name: '', age: 0 },
    items: []
  }),
  
  actions: {
    // 基本修改
    increment() {
      this.count++
    },
    
    // 带参数的修改
    incrementBy(amount) {
      this.count += amount
    },
    
    // 修改对象
    updateUser(userInfo) {
      this.user = { ...this.user, ...userInfo }
    },
    
    // 修改数组
    addItem(item) {
      this.items.push(item)
    },
    
    // 异步修改
    async fetchUser() {
      const user = await api.getUser()
      this.user = user
    },
    
    // 批量修改
    reset() {
      this.$patch({
        count: 0,
        user: { name: '', age: 0 },
        items: []
      })
    }
  }
})
```

在组件中使用 actions：

```vue
<template>
  <div>
    <p>Count: {{ store.count }}</p>
    <button @click="store.increment">+1</button>
    <button @click="store.incrementBy(5)">+5</button>
    <button @click="updateUser">更新用户</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

const updateUser = () => {
  store.updateUser({ name: '李四', age: 25 })
}
</script>
```

## 3. 使用 $patch 批量修改

```javascript
// 对象形式 - 部分更新
store.$patch({
  count: store.count + 1,
  'user.name': '新名字'
})

// 函数形式 - 基于当前状态更新
store.$patch((state) => {
  state.count += 1
  state.items.push(newItem)
  state.user.age = 30
})
```


## 最佳实践建议

1. **推荐使用 Actions**：封装修改逻辑，便于维护和测试
2. **复杂修改使用 $patch**：批量更新，性能更好
3. **避免直接修改**：在大型项目中建议使用 actions 保持数据流清晰