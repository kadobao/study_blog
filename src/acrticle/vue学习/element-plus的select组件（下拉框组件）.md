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

---

## 四、常用属性速查表

| 属性 | 作用 | 说明 |
|:---|:---|:---|
| `filterable` | 可搜索 | 输入关键字时**在本地过滤**已有选项，不发请求 |
| `allow-create` | 可创建新条目 | 下拉列表中没有的值，可以直接输入并回车作为新值（必须配合 `filterable`） |
| `default-first-option` | 回车选第一项 | 输入筛选关键字或新建值后，按回车直接选中第一个匹配项 |
| `clearable` | 可清空 | 在选中框上显示清空按钮，一键清空 `v-model` |
| `remote` + `:remote-method` | 远程搜索 | 输入关键字时调用后端接口搜索选项（见第七节） |
| `:teleported` | 下拉面板传送 | 下拉面板默认传送到 `body`，移动端弹窗/抽屉内建议设为 `false` |
| `size` | 尺寸 | `large` / `default` / `small` |
| `placeholder` | 占位提示 | 提示用户选择 |

---

## 五、本地筛选（filterable）

开启后可以在输入框中直接输入关键字，**前端本地过滤**选项列表，不需要请求后端：

```vue
<el-select v-model="form.status" placeholder="请选择" filterable clearable>
  <el-option
    v-for="item in statusOptions"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  />
</el-select>
```

> **适用场景**：选项数量不多（几十个以内）且已经一次性加载到前端的列表。

---

## 六、可选可输可新建（allow-create）

`allow-create` 是让下拉框变成"**下拉可选 + 手动可输入**"混合模式的关键属性：

```vue
<el-select
  v-model="createForm.productCategory"
  placeholder="选择或输入产品分类"
  filterable allow-create default-first-option clearable
  style="width: 100%"
>
  <el-option v-for="v in productCategories" :key="v" :label="v" :value="v" />
</el-select>
```

三个属性通常**成套出现**：

- `filterable`：允许输入关键字过滤
- `allow-create`：过滤不到时，允许把输入的内容作为新值创建
- `default-first-option`：按回车直接确认第一个匹配项（新建值时按回车即确认）

> **真实项目例子**（产品分类选择器）：
>
> ```vue
> <el-form-item label="产品分类">
>   <el-select v-model="createForm.productCategory" placeholder="选择或输入产品分类"
>     filterable allow-create default-first-option clearable
>     style="width: 100%" size="large" :teleported="!isMobile">
>     <el-option v-for="v in filterOptions.productCategories" :key="v" :label="v" :value="v" />
>   </el-select>
> </el-form-item>
> ```
>
> - 产品分类不是固定枚举，用户既可以选历史分类，也可以随时输入创建新分类
> - `:label` 和 `:value` 都用同一个值 `v`（纯字符串列表，显示文本和存储值相同）
> - 新分类保存进数据库后，下次加载选项时就会自动出现在下拉里

---

## 七、远程搜索（remote）

前面说的 `filterable` 是**本地过滤**；如果选项很多（成百上千），就应该用**远程搜索**——每次输入都调用后端接口查询：

```vue
<el-select
  v-model="form.userId"
  placeholder="输入姓名搜索"
  remote
  :remote-method="searchUsers"
  :loading="searching"
  filterable
>
  <el-option
    v-for="item in userOptions"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  />
</el-select>
```

```js
import { ref } from 'vue'
import axios from 'axios'

const userOptions = ref([])
const searching = ref(false)

async function searchUsers(keyword) {
  if (!keyword) return
  searching.value = true
  try {
    const res = await axios.get('/api/users/search', { params: { keyword } })
    userOptions.value = res.data.map(u => ({ label: u.name, value: u.id }))
  } finally {
    searching.value = false
  }
}
```

> **对比总结**：
>
> | 写法 | 搜索位置 | 适用场景 |
> |:---|:---|:---|
> | `filterable` | 前端本地过滤 | 选项少、已一次性加载 |
> | `remote` + `:remote-method` | 调后端接口搜索 | 选项多、需要实时查询数据库 |

---

## 八、teleported 与移动端适配

`:teleported` 控制下拉面板是否"传送"（挂载）到 `body` 上：

- **默认 `true`**：面板挂到 `body`，不会被父级 `overflow: hidden` 裁剪，桌面端推荐
- **设为 `false`**：面板留在组件原位置，适合**移动端弹窗/抽屉内**，避免面板定位错乱

移动端项目常见的写法：

```vue
<el-select v-model="form.x" :teleported="!isMobile">
  <el-option v-for="v in options" :key="v" :label="v" :value="v" />
</el-select>
```

```js
const isMobile = ref(window.innerWidth < 768)
```

> **作用**：桌面端正常传送，移动端（弹窗/抽屉内）不传送，保证滚动时下拉面板跟随定位。

---

## 九、选项从后端动态加载（DISTINCT 聚合模式）

选项不是写死的枚举，而是**从数据库历史记录里动态聚合出来**的，这是后台管理系统非常常见的模式。

### 9.1 完整链路

```
页面 onMounted
  └─> 调用后端接口 GET /api/xxx/filter-options
        └─> 后端对表字段做 DISTINCT 去重查询
              └─> 返回字符串数组 ──> 存入 filterOptions ──> v-for 渲染
```

### 9.2 前端实现

```vue
<el-select v-model="filterProductCategory" clearable placeholder="全部">
  <el-option v-for="v in filterOptions.productCategories" :key="v" :label="v" :value="v" />
</el-select>
```

```js
import { ref, onMounted } from 'vue'
import { api } from '@/api'

// 筛选选项集合（各字段去重值）
const filterOptions = ref({
  shiftTypes: [], productCategories: [], craftPriorities: [],
  processRoutes: [], productTypes: [], craftDifficulties: []
})

async function loadFilterOptions() {
  const res = await api.getFilterOptions()
  filterOptions.value = res
}

onMounted(() => loadFilterOptions())
```

### 9.3 后端实现（C# / EF Core 示例）

```csharp
public async Task<Dictionary<string, List<string>>> GetFilterOptionsAsync()
{
    var dbContext = ...;

    return new Dictionary<string, List<string>>
    {
        // 过滤空值 + 去重 + 排序
        ["productCategories"] = await dbContext.Libraries
            .Where(e => e.ProductCategory != null && e.ProductCategory != "")
            .Select(e => e.ProductCategory).Distinct().OrderBy(v => v).ToListAsync(),
        ["productTypes"] = await dbContext.Libraries
            .Where(e => e.ProductType != null && e.ProductType != "")
            .Select(e => e.ProductType).Distinct().OrderBy(v => v).ToListAsync()
    };
}
```

### 9.4 关键要点

1. **选项随数据生长**：用户通过 `allow-create` 输入的新值保存进表后，重新加载选项时就会自动出现在下拉里
2. **新增/编辑成功后要刷新选项**：保存成功后重新调用 `loadFilterOptions()`，让新分类立即出现在下拉中
3. **数据量小才用这个模式**：DISTINCT 全表聚合，字段值种类有限（如分类、班别、优先级）时才合适；种类过多应改用远程搜索
4. **label 和 value 相同**：纯字符串列表直接 `:label="v" :value="v"`，无需对象数组
