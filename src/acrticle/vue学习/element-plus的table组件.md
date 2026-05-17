---
title: element-plus的table组件
icon: fa-brands fa-vuejs
order: 43
category:
  - vue3学习
tag:
  - vue3学习
  - element-plus
  - table组件
---

## 概述

当 `el-table` 元素中注入 `data` 对象数组后，在 `el-table-column` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。可以使用 `width` 属性来定义列宽。

## 基本用法

### 1. 导入组件

```javascript
import { ElTable, ElTableColumn } from 'element-plus'
```

### 2. 基本调用

```vue
<el-table :data="tableData">
  <el-table-column prop="name" label="姓名" />
  <el-table-column prop="age" label="年龄" />
  <el-table-column prop="address" label="地址" />
</el-table>
```

## ElTable 属性

### data - 表格数据

当 `el-table` 元素中注入 `data` 对象数组后，在 `el-table-column` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。可以使用 `width` 属性来定义列宽。

**使用步骤：**

**第一步：准备表格数据数组**

定义一个响应式数组，数组中的每个对象代表表格的一行数据。对象的键名将作为列的字段名，键值将作为该列的单元格内容。

```javascript
const tableData = ref([
  { name: '张三', age: 25, address: '北京市' },
  { name: '李四', age: 30, address: '上海市' }
])
```

**第二步：在 el-table 标签上使用 `:data` 属性绑定数据**

使用 Vue 的动态绑定语法（`:data`），将准备好的数据数组绑定到表格组件上。

```vue
<el-table :data="tableData">
  <!-- 列定义 -->
</el-table>
```

**第三步：在 el-table-column 标签上定义每列的显示内容**

使用 `prop` 属性指定该列对应的数据字段（对应数组对象中的键名），使用 `label` 属性定义列的标题名称。可选使用 `width` 属性设置列宽。

```vue
<el-table :data="tableData">
  <el-table-column prop="name" label="姓名" />
  <el-table-column prop="age" label="年龄" />
  <el-table-column prop="address" label="地址" />
</el-table>
```

### border - 边框

是否显示竖向边框，也就是每列都有一个分隔线。

只要在 `el-table` 标签上面添加 `border` 属性，就可以显示竖向边框。

```vue
<el-table :data="tableData" border>
  <el-table-column prop="name" label="姓名" />
  <el-table-column prop="age" label="年龄" />
</el-table>
```

### span-method - 合并行或列

给 table 传入 `span-method` 方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行 `row`、当前列 `column`、当前行号 `rowIndex`、当前列号 `columnIndex` 四个属性。

该函数可以返回一个包含两个元素的数组，第一个元素代表 `rowspan`，第二个元素代表 `colspan`。也可以返回一个键名为 `rowspan` 和 `colspan` 的对象，表示该单元格占据的行数和列数。

**使用步骤：**

1. 定义合并行或者列的函数
2. 在 `el-table` 标签上面使用 `:span-method` 绑定合并行或者列的函数

**示例：合并姓名列的行**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, address: '北京市' },
  { name: '李四', age: 30, address: '上海市' },
  { name: '王五', age: 28, address: '广州市' },
  { name: '赵六', age: 35, address: '深圳市' }
])

const objectSpanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    if (rowIndex === 0) {
      return { rowspan: 2, colspan: 1 }
    } else {
      return { rowspan: 0, colspan: 0 }
    }
  }
}
</script>

<template>
  <el-table :data="tableData" :span-method="objectSpanMethod" border>
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>
```

### :index - 自定义索引

自定义索引的作用是将原来的索引进行加工处理，定义规则，变成自定义的序号显示（例如：将索引乘以2）。

**使用步骤：**

1. 定义自定义索引的函数
2. 在 `el-table-column` 标签上面添加 `type="index"`，并使用 `:index` 绑定自定义索引的函数

```vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" :index="indexMethod" />
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup>
const indexMethod = (index) => {
  return index * 2
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>
```

## 前端筛选

使用 **搜索词 和 Select 选择器** 响应式变量 + **Computed 计算属性** 实现前端筛选，具有自动响应、实时更新的特点（Computed监听到了响应式变量变化了就触发函数，更新结果）。

`tableData` 使用 `computed` 实时计算（搜索词和 Select 选择器的变化会触发函数，更新结果）。

```vue
<template>
  <div class="search-table-container">
    <el-card>
      <template #header>
        <div class="header-actions">
          <el-input
            v-model="searchQuery"
            placeholder="搜索名称、ID..."
            class="search-input"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          
          <el-select 
            v-model="filterCategory" 
            placeholder="分类" 
            class="filter-select"
            clearable
          >
            <el-option label="全部" value="" />
            <el-option 
              v-for="cat in categories" 
              :key="cat" 
              :label="cat" 
              :value="cat" 
            />
          </el-select>
          
          <el-select 
            v-model="filterStatus" 
            placeholder="状态" 
            class="filter-select"
            clearable
          >
            <el-option label="全部" value="" />
            <el-option label="启用" value="active" />
            <el-option label="禁用" value="inactive" />
          </el-select>
          
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="primary">新增</el-button>
        </div>
      </template>
      
      <div class="data-info">
        共 {{ filteredData.length }} 条数据
      </div>
      
      <el-table 
        :data="filteredData" 
        border 
        stripe
        v-loading="loading"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'

const loading = ref(false)
const originalData = ref([])

const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')

const categories = ['电子产品', '服装', '食品', '图书']

const filteredData = computed(() => {
  let result = originalData.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    )
  }
  
  if (filterCategory.value) {
    result = result.filter(item => 
      item.category === filterCategory.value
    )
  }
  
  if (filterStatus.value) {
    result = result.filter(item => 
      item.status === filterStatus.value
    )
  }
  
  return result
})

function resetSearch() {
  searchQuery.value = ''
  filterCategory.value = ''
  filterStatus.value = ''
}

async function loadData() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    originalData.value = [
      { id: '001', name: '商品A', category: '电子产品', status: 'active', createdAt: '2024-01-01' },
      { id: '002', name: '商品B', category: '服装', status: 'inactive', createdAt: '2024-01-02' },
      { id: '003', name: '商品C', category: '食品', status: 'active', createdAt: '2024-01-03' },
    ]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.search-table-container {
  padding: 20px;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.search-input {
  width: 280px;
}

.filter-select {
  width: 140px;
}

.data-info {
  padding: 12px 0;
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input,
  .filter-select {
    width: 100%;
  }
}
</style>
```

## 后端筛选和分页

### 实现思路

这里只更新排序状态，不直接调用 `fetchUsers()`，由 `watch` 监听变化后统一触发。

先定义搜索词响应变量，由 `watch` 监听变化后统一触发，变化了就调用 `fetchUsers()`；分页组件有专有的事件，道理也是一样的，事件被触发，改变响应式变量，然后调用 `fetchUsers()`。

先定义参数模型，然后分页结果模型（后端最终返回结果），定义一个方法，查询 SQL 并且加上筛选，然后将最终结果返回。

### 第一步：创建分页模型类

在 `Models` 目录下创建查询参数和响应模型：

#### 1.1 查询参数模型

以 `XxxQueryParams.cs` 命名（替换 `Xxx` 为你的实体名称，如 `ScanHistoryQueryParams`）。

```csharp
namespace Test_Jwt.Models
{
    public class XxxQueryParams
    {
        // 分页参数
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        
        // 搜索参数（可选）
        public string? SearchKeyword { get; set; }
        
        // 过滤参数（根据实际需求添加）
        public string? SomeFilterField { get; set; }
        
        // 时间范围参数（可选）
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        // 排序参数
        public string? SortField { get; set; } = "默认排序字段";
        public string? SortOrder { get; set; } = "ascending";
    }
}
```

#### 1.2 分页结果模型

通用模型，可复用。

```csharp
namespace Test_Jwt.Models
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = new();
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    }
}
```

**提示**：`PagedResult<T>` 是通用模型，只需创建一次，所有分页接口都可复用。

---

### 第二步：修改 DatabaseService.cs

在 `Services/DatabaseService.cs` 中添加分页查询方法：

```csharp
public async Task<PagedResult<YourEntity>> GetYourEntityPagedAsync(YourEntityQueryParams queryParams)
{
    using var scope = _scopeFactory.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<QrScanDbContext>();

    IQueryable<YourEntity> query = dbContext.YourEntities;

    // 1. 关键词搜索（模糊匹配多个字段）
    if (!string.IsNullOrEmpty(queryParams.SearchKeyword))
    {
        var keyword = queryParams.SearchKeyword.ToLower();
        query = query.Where(e => 
            e.Field1.ToLower().Contains(keyword) ||
            (e.Field2 != null && e.Field2.ToLower().Contains(keyword)) ||
            (e.Field3 != null && e.Field3.ToLower().Contains(keyword))
        );
    }

    // 2. 下拉过滤（精确匹配）
    if (!string.IsNullOrEmpty(queryParams.SomeFilterField))
    {
        query = query.Where(e => e.SomeFilterField == queryParams.SomeFilterField);
    }

    // 3. 时间范围查询
    if (queryParams.StartDate.HasValue)
    {
        query = query.Where(e => e.TimeField >= queryParams.StartDate.Value);
    }
    
    if (queryParams.EndDate.HasValue)
    {
        query = query.Where(e => e.TimeField <= queryParams.EndDate.Value);
    }

    // 4. 获取总数（必须在排序和分页之前）
    var totalCount = await query.CountAsync();

    // 5. 动态排序
    query = queryParams.SortField?.ToLower() switch
    {
        "field1" => queryParams.SortOrder == "ascending" 
            ? query.OrderBy(e => e.Field1) 
            : query.OrderByDescending(e => e.Field1),
        
        "field2" => queryParams.SortOrder == "ascending" 
            ? query.OrderBy(e => e.Field2) 
            : query.OrderByDescending(e => e.Field2),
        
        "field3" => queryParams.SortOrder == "ascending" 
            ? query.OrderBy(e => e.Field3) 
            : query.OrderByDescending(e => e.Field3),
        
        _ => queryParams.SortOrder == "ascending"
            ? query.OrderBy(e => e.DefaultField) 
            : query.OrderByDescending(e => e.DefaultField),
    };

    // 6. 分页（Skip + Take）
    var items = await query
        .Skip((queryParams.PageNumber - 1) * queryParams.PageSize)
        .Take(queryParams.PageSize)
        .ToListAsync();

    // 7. 返回分页结果
    return new PagedResult<YourEntity>
    {
        Items = items,
        TotalCount = totalCount,
        PageNumber = queryParams.PageNumber,
        PageSize = queryParams.PageSize
    };
}
```

**参数说明：**

- `YourEntity`：替换为你的实体类名（如 `ScanHistory`、`QrBinding`）
- `YourEntityQueryParams`：替换为对应的查询参数类
- `dbContext.YourEntities`：替换为实际的 DbSet 名称
- `e.TimeField`：替换为实际的时间字段（如 `ScanTime`、`BindTime`）
- 根据实际需求增删过滤条件和排序字段

---

### 第三步：修改 Controller

在 Controller 中修改现有的列表接口：

```csharp
[Authorize]
[HttpGet("list")]
public async Task<IActionResult> GetList([FromQuery] YourEntityQueryParams queryParams)
{
    var result = await _databaseService.GetYourEntityPagedAsync(queryParams);

    return Ok(new
    {
        items = result.Items,
        totalCount = result.TotalCount,
        pageNumber = result.PageNumber,
        pageSize = result.PageSize,
        totalPages = result.TotalPages
    });
}
```

**关键改动：**

- 添加 `[FromQuery] YourEntityQueryParams queryParams` 参数
- 调用新的分页查询方法
- 返回结构化的分页响应（而非直接返回数组）

**注意事项：**

- 记得在文件顶部添加 `using Test_Jwt.Models;`
- 如果原接口不需要认证，移除 `[Authorize]` 特性

---

### 第四步：改造前端 API 层

在 `src/api/index.js` 中修改对应的 API 方法：

```javascript
export const xxxApi = {
  getList(params) {
    return request.get('/api/your-endpoint', { params })
  },
}
```

**改动点：**

- `getList()` 方法添加 `params` 参数
- 使用 Axios 的 `{ params }` 配置自动序列化为 URL 查询字符串

---

### 第五步：改造前端 Store（Pinia）

如果使用了 Pinia store 管理数据，需要修改 `fetchList` 方法：

```javascript
async function fetchList(params) {
  loading.value = true
  error.value = null
  try {
    const response = await xxxApi.getList(params)
    
    if (params && (params.pageNumber || params.pageSize)) {
      return response
    }
    
    listData.value = response.items || response
    
  } catch (err) {
    error.value = '获取数据失败'
    console.error('获取数据失败:', err)
  } finally {
    loading.value = false
  }
}
```

**设计思路：**

- 支持向后兼容（无参数调用时仍正常工作）
- 有分页参数时返回完整响应，由 Vue 组件决定如何处理

---

### 第六步：改造前端 Vue 组件

#### 6.1 添加必要的 ref 变量

```javascript
import { ref, computed, watch, onMounted } from 'vue'

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalCountFromServer = ref(0)

// 搜索和过滤
const searchQuery = ref('')
const filterSomeField = ref('')

// 时间范围
const dateRange = ref([])

// 排序
const sortColumn = ref('defaultField')
const sortOrder = ref('ascending')
```

#### 6.2 创建数据获取函数

```javascript
async function fetchData() {
  try {
    const params = {
      pageNumber: currentPage.value,
      pageSize: pageSize.value,
      searchKeyword: searchQuery.value || undefined,
      someFilterField: filterSomeField.value || undefined,
      sortField: sortColumn.value,
      sortOrder: sortOrder.value
    }
    
    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = formatDateTime(dateRange.value[0], 'start')
      params.endDate = formatDateTime(dateRange.value[1], 'end')
    }
    
    const response = await xxxApi.getList(params)
    
    tableData.value = response.items
    totalCountFromServer.value = response.totalCount
    
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}
```

#### 6.3 使用 watch 监听筛选条件变化

```javascript
watch([searchQuery, filterSomeField, dateRange], () => {
  currentPage.value = 1
  fetchData()
})

watch([currentPage, pageSize], () => {
  fetchData()
})
```

#### 6.4 表格排序事件处理

```vue
<el-table
  :data="tableData"
  @sort-change="handleSortChange"
>
  <el-table-column
    prop="field1"
    label="字段1"
    sortable="custom"
  />
</el-table>
```

```javascript
function handleSortChange({ prop, order }) {
  sortColumn.value = prop
  sortOrder.value = order === 'ascending' ? 'ascending' : 'descending'
  fetchData()
}
```

#### 6.5 分页组件

```vue
<el-pagination
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :total="totalCountFromServer"
  :page-sizes="[10, 20, 50, 100]"
  layout="total, sizes, prev, pager, next, jumper"
  @size-change="fetchData"
  @current-change="fetchData"
/>
```
