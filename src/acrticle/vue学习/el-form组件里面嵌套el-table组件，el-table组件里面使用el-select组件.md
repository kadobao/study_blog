---
title: el-form组件里面嵌套el-table组件，el-table组件里面使用el-select组件
icon: fa-brands fa-vuejs
order: 45
category:
  - vue3学习
tag:
  - vue3学习
  - element-plus
  - select组件
  - table组件
  - form组件
  - 下拉框组件
  - 表单组件
  - 表格组件
---

## 一、基础概念

在 Element Plus 中，我们可以将 `el-table` 组件嵌套在 `el-form-item` 组件中，并在表格的列中使用 `el-select` 等表单组件。这种方式常用于需要批量编辑数据的场景。

## 二、实现步骤

### 2.1 第一步：el-form-item 组件里面包裹 el-table 组件


```vue
<el-form-item>
  <el-table :data="tableData" style="width: 100%">
  </el-table>
</el-form-item>
```




`el-table` 组件按照之前的正常写就行，只是在 `el-table` 外面嵌套 `el-form-item` 组件。

**示例代码：**

```vue
<el-form-item label-position="top">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="skillLevel" label="等级">
      <template #default="{ row }">
        <el-select v-model="row.skillLevel" style="width: 100%">
          <el-option
            v-for="item in levelPresets"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
  </el-table>
</el-form-item>
```

### 2.2 第二步：el-table-column 里面包裹 el-select 的写法

在 `el-table-column` 中使用 `el-select` 组件，需要使用 `<template #default="{ row }">` 来包裹。

**示例代码：**

```vue
<el-table-column prop="skillLevel" label="等级">
  <template #default="{ row }">
    <el-select v-model="row.skillLevel" style="width: 100%">
      <el-option
        v-for="item in levelPresets"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </template>
</el-table-column>
```

## 三、核心要点说明

### 3.1 template 模板的作用

```vue
<template #default="{ row }">
</template>
```



- `<template #default="{ row }">` 用于包裹 `el-select` 组件
- `#default="{ row }"` 代表当前行的数据对象
- `v-model` 绑定的值需要改成 `row.属性名` 的形式

### 3.2 数据绑定方式

在 `el-table-column` 中使用表单组件时：

- **普通用法**：`v-model="formData.name"`
- **表格中用法**：`v-model="row.name"`（使用 `row` 代表当前行数据）

## 四、完整示例

### 4.1 示例一：技能等级表格

```vue
<template>
  <el-form :model="formData" label-width="120px">
    <el-form-item label="技能列表" label-position="top">
      <el-table :data="formData.skills" border style="width: 100%">

        <!-- 技能等级列 -->
        <el-table-column prop="level" label="技能等级">
          <template #default="{ row }">
            <el-select v-model="row.level" placeholder="请选择等级" style="width: 100%">
              <el-option label="初级" value="junior" />
              <el-option label="中级" value="middle" />
              <el-option label="高级" value="senior" />
            </el-select>
          </template>
        </el-table-column>

      </el-table>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  skills: [
    { name: 'Vue.js', level: 'senior' },
    { name: 'React', level: 'middle' }
  ]
})
</script>
```

## 五、常见问题

### 5.1 为什么需要使用 template 包裹？

`<template #default="{ row }">` 是 Vue 的插槽语法，用于访问表格当前行的数据。如果不使用模板包裹，`v-model` 无法正确绑定到当前行的数据。

### 5.2 如何获取当前行的索引？

除了 `{ row }`，还可以使用 `{ $index }` 获取当前行的索引：

```vue
<template #default="{ row, $index }">
  <el-button @click="handleEdit(row, $index)">编辑</el-button>
</template>
```

## 六、总结

1. **嵌套结构**：`el-form` → `el-form-item` → `el-table` → `el-table-column` → `template` → `el-select`
2. **数据绑定**：在表格中使用 `row.属性名` 来绑定当前行的数据
3. **模板语法**：使用 `<template #default="{ row }">` 访问当前行数据
4. **适用场景**：批量编辑、动态表格、可编辑表格等