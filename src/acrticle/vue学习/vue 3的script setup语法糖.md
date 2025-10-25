---
title: vue 3的script setup语法糖
icon: fa-brands fa-vuejs
order: 13
index: false
category:
  - vue学习
tag:
  - vue学习
---







### Vue 3 `script setup` 语法糖解析

`script setup` 是 Vue 3 中的一种语法糖，简化了组合式 API 的使用，同时提高了代码的可读性和运行性能。下面是其主要特点：

1. **无需 `return`：** 在 `script setup` 中，定义的属性和方法不需要显式地通过 `return` 返回，它们会自动暴露给模板。

   ```vue
   <script lang="ts" setup>
   const message = '你好，Vue 3！'
   const greet = () => console.log(message)
   </script>

   <template>
     <button @click="greet">{{ message }}</button>
   </template>
   ```

   在上面的例子中，`message` 和 `greet` 可以直接在模板中使用，无需返回。

2. **组件自动注册：** 在 `script setup` 中导入的组件会自动注册，无需手动在 `components` 中注册。

   ```vue
   <script lang="ts" setup>
   import MyButton from './MyButton.vue'
   </script>

   <template>
     <MyButton />
   </template>
   ```

3. **使用 `defineProps` 接收父组件传递的值：** 可以使用 `defineProps` 直接声明和接收父组件传递的 props。

   ```vue
   <script lang="ts" setup>
   const props = defineProps<{ msg: string }>()
   </script>

   <template>
     <p>{{ props.msg }}</p>
   </template>
   ```

   在这个例子中，`defineProps` 声明了 `msg` 属性，供模板中使用。

4. **获取属性和插槽：** Vue 3 提供了两个实用函数：
   - `useAttrs` 用于获取非 prop 的属性。
   - `useSlots` 用于获取命名或默认插槽。

   ```vue
   <script lang="ts" setup>
   const attrs = useAttrs()
   const slots = useSlots()
   </script>
   
   <template>
     <div v-bind="attrs">{{ slots.default?.() }}</div>
   </template>
   ```

5. **`defineEmits` 用于在 Vue 3 中**声明事件**：** 使用 `defineEmits` 声明自定义事件。

   ```vue
   <script lang="ts" setup>
   const emit = defineEmits<['update']>()
   const updateValue = () => emit('update')
   </script>

   <template>
     <button @click="updateValue">更新</button>
   </template>
   ```

6. **使用 `defineExpose` 公开属性和方法：** 默认情况下，`script setup` 中的属性和方法不会对外暴露。如果需要对外暴露，可以使用 `defineExpose`。

   ```vue
   <script lang="ts" setup>
   const internalFunction = () => { /* ... */ }
   defineExpose({ internalFunction })
   </script>
   ```

这种语法糖的使用在性能上更优，因为它跳过了一些 Vue 内部处理的包裹过程，特别适合大项目，提高了开发效率。





------



###  Vue 2 完整示例


::: details 点击展开项目代码

```vue
<template>
  <div>
    <!-- 通过 Vue 2 中的 props 接收父组件传递的 msg -->
    <p>{{ msg }}</p>
    
    <!-- 绑定按钮的点击事件，调用 methods 中的 greet 方法 -->
    <button @click="greet">{{ message }}</button>

    <!-- 计算属性 doubleNum 的值会随着 num 的变化自动更新 -->
    <p>Double of num: {{ doubleNum }}</p>

    <!-- 用户输入改变 num -->
    <input v-model="num" type="number" />
  </div>
</template>

<script>
export default {
  // 使用 props 接收来自父组件的数据
  props: {
    msg: {
      type: String, // 定义 msg 为字符串类型
      required: true // 确保 msg 是必填项
    }
  },

  // 使用 data 函数返回组件的内部状态
  data() {
    return {
      message: '你好，Vue 2！', // message 是组件内部的数据
      num: 1 // 用于计算的数值
    };
  },

  // 使用 computed 定义计算属性
  computed: {
    // doubleNum 会基于 num 的变化自动计算
    doubleNum() {
      return this.num * 2; // 显式返回 num 的两倍
    }
  },

  // 使用 methods 定义组件的函数
  methods: {
    greet() {
      console.log(this.message); // 在控制台输出 message
    }
  }
};
</script>

<style scoped>
/* 样式只作用于当前组件 */
p {
  font-size: 18px;
}
button {
  margin-top: 10px;
}
</style>
```

:::
