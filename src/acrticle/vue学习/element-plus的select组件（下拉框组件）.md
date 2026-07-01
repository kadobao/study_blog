---
title: element-plus的select组件（下拉框组件）
icon: fa-brands fa-vuejs
order: 44
category:
  - vue3学习
tag:
  - vue3学习
  - element-plus
  - select组件
  - 下拉框组件
---

# Element Plus Select 组件详解

## 一、基本使用步骤

### 1.1 定义选项数组

#### 方式一：简单字符串数组

```js
const floorTypes = ['二楼', '六楼']
```

#### 方式二：对象数组（推荐）

```js
const skillLevelOptions = [
  { label: '学习', value: 0 },
  { label: '可操机', value: 1 },
  { label: '熟练', value: 2 }
]
```

> **说明**：`label` 用于显示给用户，`value` 是实际存储的值。

---

### 1.2 编写模板结构

```vue
<template>
  <el-select v-model="formData.skillLevel" placeholder="请选择技能等级">
    <el-option
      v-for="item in skillLevelOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
```

### 1.2.1 模板结构说明

在模板层（`template`）创建一个结构：

```vue
<el-select>
  <el-option />
</el-select>
```

- `el-select` 使用 `v-model` 绑定一个变量
- `el-option` 使用 `v-for` 循环遍历选项数组，一般 `key` 值和 `value` 值相同；并且 `:key`、`:label`、`:value` 的含义分别是选项的唯一标识、显示文本和实际值


```vue
v-for="item in skillLevelOptions"
  :key="item.value"
  :label="item.label"
  :value="item.value"
```

> **核心原理**：当你点击某个选项时，该选项的 `value` 属性值会自动赋值给 `el-select` 的 `v-model` 绑定的变量。

### 1.2.2 重要说明

- `el-select` 是绑定表单元素里面的属性（`el-form` 绑定的 `model` 数据是一个对象（字典））
- `el-select` 绑定的 `model` 数据是一个数组（用于存储下拉选项列表）

---

### 1.3 完整示例

```vue
<template>
  <el-form :model="formData" label-width="100px">
    <el-form-item label="技能等级">
      <el-select v-model="formData.skillLevel" placeholder="请选择技能等级">
        <el-option
          v-for="item in skillLevelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'

// 定义选项
const skillLevelOptions = [
  { label: '学习', value: 0 },
  { label: '可操机', value: 1 },
  { label: '熟练', value: 2 }
]

// 绑定数据
const formData = reactive({
  skillLevel: null
})
</script>
```

---

## 二、关键要点

| 序号 | 要点 | 说明 |
|:---:|:---|:---|
| 1 | 选项数组 | 将选项定义为数组，便于维护和扩展 |
| 2 | v-model 绑定 | 使用 `v-model` 绑定到表单数据 |
| 3 | v-for 循环 | 使用 `v-for` 循环遍历选项数组，渲染 `el-option` 组件 |
| 4 | key 属性 | 为每个 option 设置唯一的 `key` 属性；一般 `key` 值和 `value` 值相同 |
| 5 | label 和 value | `label` 显示给用户，`value` 是实际存储的值 |
| 6 | 自动赋值 | 当选择某个 `el-option` 时，该选项的 `value` 属性值会自动赋值给 `el-select` 的 `v-model` 绑定的变量 |

---

## 三、注意事项

1. **`key` 值的唯一性**：确保每个 `el-option` 的 `key` 值唯一，避免渲染错误
2. **`v-model` 的初始值**：提前在 `data` 或 `reactive` 中定义好绑定的变量
3. **数据类型一致**：`value` 的类型应与 `v-model` 绑定的变量类型一致（如都是字符串或都是数字）
