---
title: Vue3 + ASP.NET Core 搜索筛选全栈实现
icon: fa-brands fa-vuejs
order: 47
category:
  - vue3学习
tag:
  - vue3学习
  - element-plus
  - 搜索筛选
  - ASP.NET Core
---

# Vue3 + ASP.NET Core 搜索筛选全栈实现

## 核心概念

将搜索框留在 header 中（`watch` 自动触发查询），筛选条件收纳到 `el-popover` 弹出面板中（手动点「查询」确认），后端通过 `[FromQuery]` 绑定参数 + EF Core `IQueryable` 链式 `Where` 实现数据库层面过滤。

**设计要点**：
- 搜索框在面板外，输入即搜索（`watch` 自动触发）
- 筛选条件在面板内，手动点「查询」按钮确认
- `el-badge` 徽标只统计面板内条件数量
- 空值传 `undefined`，后端可空类型 `null` 跳过筛选
- 后端先 `Count` 总数，再 `Skip/Take` 分页

## 数据流

```text
搜索框(watch自动) ─┐
                   ├→ fetchUsers() → userApi.getList(params) → GET /api/xxx/list?params
筛选面板(手动查询) ─┘                                                        │
                                                                            ▼
排序(watch自动) ────────────────────────────────────── Controller [FromQuery] QueryParams
                                                                            │
                                                                            ▼
                                                            DatabaseService.GetPagedAsync()
                                                            IQueryable 链式 Where + OrderBy
                                                            Count → Skip/Take → PagedResult<T>
```

## 前端实现

### 1. 状态变量

```javascript
// 搜索框（header 中，不在面板内）
const searchQuery = ref('')

// 面板内筛选条件
const filterFieldA = ref('')       // 下拉筛选（空字符串=全部）
const filterBoolField = ref('')    // 布尔筛选（''/'true'/'false'）
const dateRange = ref([])          // 日期范围 [开始, 结束]

// 面板控制
const filterPopoverVisible = ref(false)

// 分页与排序
const currentPage = ref(1)
const pageSize = ref(10)
const totalCountFromServer = ref(0)
const sortColumn = ref('id')
const sortOrder = ref('ascending')
```

### 2. 徽标计数（仅面板内条件）

```javascript
const activeFilterCount = computed(() => {
  let count = 0
  if (filterFieldA.value) count++
  if (filterBoolField.value !== '') count++
  if (dateRange.value && dateRange.value.length === 2) count++
  return count
})
```

### 3. 核心请求函数 —— 组装参数

```javascript
async function fetchData() {
  loading.value = true
  try {
    const params = {
      pageNumber: currentPage.value,
      pageSize: pageSize.value,
      searchKeyword: searchQuery.value || undefined,  // 空值传 undefined
      sortField: sortColumn.value,
      sortOrder: sortOrder.value
    }

    // 日期范围
    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = formatDateTime(dateRange.value[0], 'start')  // 2024-01-01 00:00:00
      params.endDate = formatDateTime(dateRange.value[1], 'end')      // 2024-01-31 23:59:59
    }

    // 布尔值筛选：字符串转布尔
    if (filterBoolField.value !== '') {
      params.isBanned = filterBoolField.value === 'true'
    }

    // 数值筛选
    if (filterFieldA.value !== '') {
      params.level = Number(filterFieldA.value)
    }

    const res = await api.getList(params)
    tableData.value = res.items
    totalCountFromServer.value = res.totalCount
  } catch (err) {
    ElMessage.error('查询失败')
  } finally {
    loading.value = false
  }
}
```

### 4. 三种触发方式

```javascript
// ① 搜索框：watch 自动触发
watch(searchQuery, () => {
  currentPage.value = 1
  fetchData()
})

// ② 面板内查询按钮：手动触发
function handleFilter() {
  currentPage.value = 1
  fetchData()
  filterPopoverVisible.value = false  // 查询后关闭面板
}

// ③ 排序变化：watch 自动触发
watch([sortColumn, sortOrder], () => {
  currentPage.value = 1
  fetchData()
})

// 重置筛选
function handleReset() {
  filterFieldA.value = ''
  filterBoolField.value = ''
  dateRange.value = []
  currentPage.value = 1
  fetchData()
}
```

### 5. 模板结构

```vue
<div class="header-actions">
  <!-- 搜索框（留在 header） -->
  <el-input v-model="searchQuery" placeholder="搜索..." clearable class="search-input">
    <template #prefix><el-icon><Search /></el-icon></template>
  </el-input>

  <!-- 筛选面板 -->
  <el-popover v-model:visible="filterPopoverVisible" placement="bottom-end" :width="520" trigger="click">
    <template #reference>
      <el-badge :value="activeFilterCount" :hidden="activeFilterCount === 0" type="primary">
        <el-button type="primary">
          <el-icon style="margin-right: 5px"><Filter /></el-icon>筛选
        </el-button>
      </el-badge>
    </template>

    <div class="filter-panel">
      <div class="filter-panel-title">筛选条件</div>
      <el-form label-width="80px">
        <!-- 日期范围：必须 :teleported="false" -->
        <el-form-item label="创建时间">
          <el-date-picker v-model="dateRange" type="daterange"
            value-format="YYYY-MM-DD HH:mm:ss" :teleported="false" clearable style="width: 100%" />
        </el-form-item>
        <!-- 下拉筛选：必须 :teleported="false" -->
        <el-form-item label="状态">
          <el-select v-model="filterBoolField" :teleported="false" clearable style="width: 100%">
            <el-option label="全部" value="" />
            <el-option label="正常" value="false" />
            <el-option label="已封禁" value="true" />
          </el-select>
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item>
          <div class="filter-actions">
            <el-button @click="handleReset"><el-icon><Refresh /></el-icon>重置</el-button>
            <el-button type="primary" @click="handleFilter"><el-icon><Search /></el-icon>查询</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-popover>
</div>
```

### 6. API 层

```javascript
// src/api/index.js
export const xxxApi = {
  getList(params) {
    return request.get('/xxx/list', { params })  // params 对象自动序列化为 Query String
  }
}
```

## 后端实现

### 1. 查询参数模型

```csharp
public class XxxQueryParams
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;

    public string? SearchKeyword { get; set; }     // 搜索关键词（模糊匹配）
    public string? Status { get; set; }             // 精确匹配
    public bool? IsBanned { get; set; }             // 布尔筛选
    public int? Level { get; set; }                 // 数值筛选
    public DateTime? StartDate { get; set; }        // 日期起
    public DateTime? EndDate { get; set; }          // 日期止

    public string? SortField { get; set; } = "id";
    public string? SortOrder { get; set; } = "ascending";
}
```

> 所有筛选字段用**可空类型**（`?`），前端不传时为 `null`，后端跳过 `Where`。

### 2. Controller

```csharp
[ApiController]
[Route("api/[controller]")]
public class XxxController : ControllerBase
{
    [HttpGet("list")]
    public async Task<IActionResult> GetList([FromQuery] XxxQueryParams queryParams)
    {
        var result = await _databaseService.GetPagedAsync(queryParams);

        return Ok(new {
            items = result.Items.Select(x => new { /* 映射字段 */ }),
            totalCount = result.TotalCount,
            pageNumber = result.PageNumber,
            pageSize = result.PageSize
        });
    }
}
```

### 3. DatabaseService —— EF Core 链式查询

```csharp
public async Task<PagedResult<Xxx>> GetPagedAsync(XxxQueryParams queryParams)
{
    using var scope = _scopeFactory.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();

    IQueryable<Xxx> query = dbContext.Xxxs;

    // ① 搜索关键词：模糊匹配多个字段（OR）
    if (!string.IsNullOrEmpty(queryParams.SearchKeyword))
    {
        var keyword = queryParams.SearchKeyword.ToLower();
        query = query.Where(x =>
            x.Name.ToLower().Contains(keyword) ||
            x.Code.ToLower().Contains(keyword)
        );
    }

    // ② 精确匹配筛选（null 则跳过）
    if (!string.IsNullOrEmpty(queryParams.Status))
        query = query.Where(x => x.Status == queryParams.Status);

    if (queryParams.IsBanned.HasValue)
        query = query.Where(x => x.IsBanned == queryParams.IsBanned.Value);

    if (queryParams.Level.HasValue)
        query = query.Where(x => x.Level == queryParams.Level.Value);

    // ③ 日期范围
    if (queryParams.StartDate.HasValue)
        query = query.Where(x => x.CreatedTime >= queryParams.StartDate.Value);
    if (queryParams.EndDate.HasValue)
        query = query.Where(x => x.CreatedTime <= queryParams.EndDate.Value);

    // ④ 先 Count（分页前）
    var totalCount = await query.CountAsync();

    // ⑤ 动态排序（switch 表达式 + or _ 兜底）
    query = queryParams.SortField?.ToLower() switch
    {
        "id"   => queryParams.SortOrder == "ascending"
                   ? query.OrderBy(x => x.Id) : query.OrderByDescending(x => x.Id),
        "name" => queryParams.SortOrder == "ascending"
                   ? query.OrderBy(x => x.Name) : query.OrderByDescending(x => x.Name),
        _      => queryParams.SortOrder == "ascending"
                   ? query.OrderBy(x => x.CreatedTime) : query.OrderByDescending(x => x.CreatedTime),
    };

    // ⑥ 分页
    var items = await query
        .Skip((queryParams.PageNumber - 1) * queryParams.PageSize)
        .Take(queryParams.PageSize)
        .ToListAsync();

    return new PagedResult<Xxx> { Items = items, TotalCount = totalCount,
        PageNumber = queryParams.PageNumber, PageSize = queryParams.PageSize };
}
```

### 4. 通用分页模型

```csharp
public class PagedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}
```

## 关键避坑点

| 问题 | 解决方案 |
|------|----------|
| 面板内选下拉框后面板关闭 | `el-select`/`el-date-picker` 添加 `:teleported="false"` |
| 空字符串发到后端导致异常 | 前端 `searchQuery.value \|\| undefined`，空值不发送 |
| 布尔值类型不匹配 | 前端下拉用字符串 `'true'`/`'false'`，请求时 `=== 'true'` 转布尔 |
| totalCount 只返回当前页数量 | `CountAsync()` 必须在 `Skip/Take` **之前**调用 |
| 未知排序字段报错 | `switch` 用 `or _` 兜底默认排序 |
| 跨域问题 | Vite `proxy` 代理 `/api` 到后端 |

## 复用清单

复制到新页面时修改以下内容：

| 修改项 | 位置 | 说明 |
|--------|------|------|
| 筛选条件变量 | `<script setup>` | 根据业务定义 `filterXxx` |
| `activeFilterCount` | `computed` | 对应新增变量计数 |
| `fetchData()` 的 `params` | 函数体 | 添加/删除参数字段 |
| `handleReset()` | 函数体 | 清空对应变量 |
| Popover 内 `el-form-item` | `<template>` | 添加/删除表单项 |
| `XxxQueryParams.cs` | 后端 Models | 添加可空属性 |
| `GetPagedAsync()` | DatabaseService | 添加 `Where` 条件 |
| API 接口路径 | `api/index.js` | 改成对应接口 |

## 完整代码示例

### 目录结构概览

```text
前端 (Vue3)                          后端 (ASP.NET Core)
─────────────────────                ─────────────────────
src/                                  Test_Jwt/
├── api/index.js        (API接口)    ├── Models/
├── utils/request.js    (Axios封装)   │   └── XxxQueryParams.cs
└── views/                             ├── Controllers/
    └── XxxManage.vue   (页面)        │   └── XxxController.cs
                                       └── Services/
                                           └── DatabaseService.cs
```

### 一、前端完整示例

#### Axios 封装 (src/utils/request.js)

```javascript
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '../router'

const service = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器：附加 JWT Token
service.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器：直接返回 data
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error
    if (response) {
      const errorMap = {
        401: '登录已过期，请重新登录',
        403: '没有权限访问该资源',
        404: '请求的资源不存在',
        500: '服务器内部错误'
      }
      ElMessageBox.alert(errorMap[response.status] || `请求失败: ${response.status}`, '提示', {
        confirmButtonText: '确定', type: 'error'
      })
      if (response.status === 401) {
        localStorage.removeItem('access_token')
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default service
```

#### API 接口 (src/api/index.js)

```javascript
import request from '../utils/request'

export const xxxApi = {
  // GET /api/xxx/list?pageNumber=1&pageSize=10&searchKeyword=xxx&status=active&...
  getList(params) {
    return request.get('/xxx/list', { params })
  }
}
```

#### 页面完整代码 (src/views/XxxManage.vue)

```vue
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { ElMessage, ElButton, ElTable, ElTableColumn, ElTag,
         ElInput, ElIcon, ElPagination, ElPopover, ElBadge,
         ElForm, ElFormItem, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import { Search, Filter, Refresh } from '@element-plus/icons-vue'
import { xxxApi } from '../api'

// === 搜索框（header 中，不在面板内）===
const searchQuery = ref('')

// === 面板内筛选条件 ===
const filterStatus = ref('')       // 状态筛选（空字符串=全部）
const filterLevel = ref('')        // 等级筛选
const dateRange = ref([])          // 日期范围 [开始, 结束]

// === 面板控制 ===
const filterPopoverVisible = ref(false)

// === 分页与排序 ===
const tableData = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalCountFromServer = ref(0)
const sortColumn = ref('id')
const sortOrder = ref('ascending')

// 日期选择器默认时间
const defaultTime = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 1, 1, 23, 59, 59)
]

// 徽标计数（仅面板内条件，不统计搜索框）
const activeFilterCount = computed(() => {
  let count = 0
  if (filterStatus.value !== '') count++
  if (filterLevel.value !== '') count++
  if (dateRange.value && dateRange.value.length === 2) count++
  return count
})

// 格式化日期
function formatDateTime(date, type) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const time = type === 'start' ? '00:00:00' : '23:59:59'
  return `${year}-${month}-${day} ${time}`
}

// 核心请求函数
async function fetchData() {
  loading.value = true
  try {
    const params = {
      pageNumber: currentPage.value,
      pageSize: pageSize.value,
      searchKeyword: searchQuery.value || undefined,
      sortField: sortColumn.value,
      sortOrder: sortOrder.value
    }

    if (filterStatus.value !== '') {
      params.status = filterStatus.value
    }

    if (filterLevel.value !== '') {
      params.level = Number(filterLevel.value)
    }

    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = formatDateTime(dateRange.value[0], 'start')
      params.endDate = formatDateTime(dateRange.value[1], 'end')
    }

    const res = await xxxApi.getList(params)
    tableData.value = res.items
    totalCountFromServer.value = res.totalCount
  } catch (err) {
    ElMessage.error('获取列表失败')
    console.error(err)
  } finally {
    loading.value = false
  }
}

// ① 搜索框：watch 自动触发
watch(searchQuery, () => {
  currentPage.value = 1
  fetchData()
})

// ② 面板内查询按钮
function handleFilter() {
  currentPage.value = 1
  fetchData()
  filterPopoverVisible.value = false
}

// ③ 排序变化
watch([sortColumn, sortOrder], () => {
  currentPage.value = 1
  fetchData()
})

// 重置筛选
function handleReset() {
  filterStatus.value = ''
  filterLevel.value = ''
  dateRange.value = []
  currentPage.value = 1
  fetchData()
}

// 分页
function handleSizeChange(size) {
  pageSize.value = size
  currentPage.value = 1
  fetchData()
}
function handleCurrentChange(page) {
  currentPage.value = page
  fetchData()
}

// 排序
function handleSortChange({ prop, order }) {
  sortColumn.value = prop || 'id'
  sortOrder.value = order || 'ascending'
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="page">
    <div class="header">
      <!-- 搜索框（留在 header） -->
      <el-input
        v-model="searchQuery"
        placeholder="搜索名称、编码..."
        class="search-input"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>

      <!-- 筛选面板 -->
      <el-popover
        v-model:visible="filterPopoverVisible"
        placement="bottom-end"
        :width="520"
        trigger="click"
      >
        <template #reference>
          <el-badge :value="activeFilterCount" :hidden="activeFilterCount === 0" type="primary">
            <el-button type="primary">
              <el-icon style="margin-right: 5px"><Filter /></el-icon>
              筛选
            </el-button>
          </el-badge>
        </template>

        <div class="filter-panel">
          <div class="filter-panel-title">筛选条件</div>
          <el-form label-width="80px" class="filter-form">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="defaultTime"
                style="width: 100%"
                clearable
                :teleported="false"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="filterStatus" placeholder="全部" clearable style="width: 100%" :teleported="false">
                <el-option label="全部" value="" />
                <el-option label="启用" value="active" />
                <el-option label="禁用" value="inactive" />
              </el-select>
            </el-form-item>
            <el-form-item label="等级">
              <el-select v-model="filterLevel" placeholder="全部" clearable style="width: 100%" :teleported="false">
                <el-option label="全部" value="" />
                <el-option label="初级" :value="1" />
                <el-option label="中级" :value="2" />
                <el-option label="高级" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <div class="filter-actions">
                <el-button @click="handleReset">
                  <el-icon style="margin-right: 5px"><Refresh /></el-icon>
                  重置
                </el-button>
                <el-button type="primary" @click="handleFilter">
                  <el-icon style="margin-right: 5px"><Search /></el-icon>
                  查询
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-popover>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" v-loading="loading" border stripe
      @sort-change="handleSortChange"
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      <el-table-column prop="id" label="ID" min-width="80" sortable="custom" />
      <el-table-column prop="name" label="名称" min-width="150" sortable="custom" />
      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
            {{ row.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" min-width="180" sortable="custom">
        <template #default="{ row }">
          {{ row.createdTime ? new Date(row.createdTime).toLocaleString('zh-CN') : '-' }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="totalCountFromServer"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.search-input { width: 280px; }
.filter-panel { padding: 4px 0; }
.filter-panel-title {
  font-size: 16px; font-weight: 600;
  margin-bottom: 16px; padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}
.filter-form { margin-top: 8px; }
.filter-actions {
  display: flex; justify-content: flex-end;
  gap: 8px; width: 100%;
}
.pagination-container {
  margin-top: 20px; display: flex; justify-content: center;
}
</style>
```

### 二、后端完整示例

#### Vite 代理配置 (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 后端地址
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

#### 查询参数模型 (Models/XxxQueryParams.cs)

```csharp
namespace Test_Jwt.Models
{
    public class XxxQueryParams
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        // 搜索关键词（模糊匹配）
        public string? SearchKeyword { get; set; }

        // 精确匹配筛选
        public string? Status { get; set; }

        // 数值筛选
        public int? Level { get; set; }

        // 日期范围
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // 排序
        public string? SortField { get; set; } = "id";
        public string? SortOrder { get; set; } = "ascending";
    }
}
```

#### 通用分页模型 (Models/PagedResult.cs)

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

#### Controller (Controllers/XxxController.cs)

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Test_Jwt.Models;
using Test_Jwt.Services;

namespace Test_Jwt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class XxxController : ControllerBase
    {
        private readonly DatabaseService _databaseService;

        public XxxController(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetList([FromQuery] XxxQueryParams queryParams)
        {
            var result = await _databaseService.GetXxxPagedAsync(queryParams);

            var list = result.Items.Select(x => new
            {
                id = x.Id,
                name = x.Name,
                status = x.Status,
                level = x.Level,
                createdTime = x.CreatedTime
            }).ToList();

            return Ok(new
            {
                items = list,
                totalCount = result.TotalCount,
                pageNumber = result.PageNumber,
                pageSize = result.PageSize,
                totalPages = result.TotalPages
            });
        }
    }
}
```

#### DatabaseService 查询方法 (Services/DatabaseService.cs)

```csharp
public async Task<PagedResult<Xxx>> GetXxxPagedAsync(XxxQueryParams queryParams)
{
    using var scope = _scopeFactory.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();

    // ① 基础查询
    IQueryable<Xxx> query = dbContext.Xxxs;

    // ② 搜索关键词：模糊匹配（OR）
    if (!string.IsNullOrEmpty(queryParams.SearchKeyword))
    {
        var keyword = queryParams.SearchKeyword.ToLower();
        query = query.Where(x =>
            x.Name.ToLower().Contains(keyword) ||
            x.Code.ToLower().Contains(keyword)
        );
    }

    // ③ 精确匹配筛选
    if (!string.IsNullOrEmpty(queryParams.Status))
        query = query.Where(x => x.Status == queryParams.Status);

    if (queryParams.Level.HasValue)
        query = query.Where(x => x.Level == queryParams.Level.Value);

    // ④ 日期范围
    if (queryParams.StartDate.HasValue)
        query = query.Where(x => x.CreatedTime >= queryParams.StartDate.Value);

    if (queryParams.EndDate.HasValue)
        query = query.Where(x => x.CreatedTime <= queryParams.EndDate.Value);

    // ⑤ 先 Count（分页前）
    var totalCount = await query.CountAsync();

    // ⑥ 动态排序
    query = queryParams.SortField?.ToLower() switch
    {
        "id"   => queryParams.SortOrder == "ascending"
                   ? query.OrderBy(x => x.Id) : query.OrderByDescending(x => x.Id),
        "name" => queryParams.SortOrder == "ascending"
                   ? query.OrderBy(x => x.Name) : query.OrderByDescending(x => x.Name),
        "createdtime" or _ => queryParams.SortOrder == "ascending"
                   ? query.OrderBy(x => x.CreatedTime) : query.OrderByDescending(x => x.CreatedTime),
    };

    // ⑦ 分页
    var items = await query
        .Skip((queryParams.PageNumber - 1) * queryParams.PageSize)
        .Take(queryParams.PageSize)
        .ToListAsync();

    return new PagedResult<Xxx>
    {
        Items = items,
        TotalCount = totalCount,
        PageNumber = queryParams.PageNumber,
        PageSize = queryParams.PageSize
    };
}
```

### 三、请求与响应示例

#### 前端发送的 HTTP 请求

```http
GET /api/xxx/list?pageNumber=1&pageSize=10&searchKeyword=张三&status=active&level=2&startDate=2024-01-01%2000:00:00&endDate=2024-12-31%2023:59:59&sortField=id&sortOrder=ascending
Authorization: Bearer eyJhbG...
```

#### 后端返回的 JSON

```json
{
  "items": [
    {
      "id": 1,
      "name": "张三",
      "status": "active",
      "level": 2,
      "createdTime": "2024-06-15T10:30:00"
    }
  ],
  "totalCount": 156,
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 16
}
```

#### 各操作对应的请求参数

```text
操作              前端变量变化               HTTP 请求参数
──────────────────────────────────────────────────────────────────
输入搜索框        searchQuery 变化           ?searchKeyword=张三
                  → watch 自动触发           &pageNumber=1（重置到第一页）

选择状态=启用     filterStatus='active'      （不发送请求，等待手动查询）
点击「查询」      handleFilter()             ?status=active&searchKeyword=张三
                  → 关闭面板                 &pageNumber=1&pageSize=10

点击「重置」      清空所有筛选变量            ?pageNumber=1&pageSize=10
                  → 立即查询                 （筛选参数为 undefined，不发送）

点击表头排序      sortColumn/sortOrder 变化   ?sortField=name&sortOrder=descending
                  → watch 自动触发           &pageNumber=1（重置到第一页）

翻到第 2 页       currentPage = 2            ?pageNumber=2&pageSize=10
                  → handleCurrentChange      （保留当前搜索和筛选条件）
```
