---
title: Vue 3模板层与JS层绑定方式指南
icon: fa-brands fa-vuejs
order: 42
category:
  - vue3学习
tag:
  - vue3学习
  - 模板层与JS层绑定方式指南
---


# Vue 3 模板层与JS层绑定方式指南

---

## 1. 文本插值 `{{ }}`

### 例子1：显示设备信息

**JS层 (script)**
```javascript
const device = ref({
  deviceId: 'QR-001',
  qrCodeId: '二维码ID123'
})
```

**模板层 (template)**
```vue
<div class="device-title">{{ device.deviceId }}</div>
<el-tag type="warning" effect="dark">{{ device.qrCodeId }}</el-tag>
```

---

### 例子2：表格中使用默认值

**JS层 (script)**
```javascript
const getRoleTagType = (role) => {
  const roleMap = { admin: 'danger', manager: 'warning', normal: 'success' }
  return roleMap[role] || 'info'
}
```

**模板层 (template)**
```vue
<el-table-column prop="realName" label="中文名">
  <template #default="{ row }">
    {{ row.realName || '-' }}
  </template>
</el-table-column>

<el-table-column prop="role" label="角色">
  <template #default="{ row }">
    <el-tag :type="getRoleTagType(row.role)">
      {{ row.role === 'admin' ? '超级管理员' : row.role === 'manager' ? '经理' : '普通用户' }}
    </el-tag>
  </template>
</el-table-column>
```

---

## 2. 属性绑定 `:`

数据从 JS 流向模板，但模板的变化不会自动流回 JS。

### 例子1：按钮动态禁用状态

**JS层 (script)**
```javascript
const resetting = ref(false)

async function handleReset() {
  resetting.value = true
  try {
    await healthApi.resetNodes({ deviceType, deviceName })
    ElMessage.success('清零成功')
  } finally {
    resetting.value = false
  }
}
```

**模板层 (template)**
```vue
<el-button 
  type="danger" 
  size="large" 
  :disabled="resetting" 
  @click="handleReset"
>
  清零
</el-button>
```
---

## 3. 事件绑定 `@`

### 例子1：按钮点击事件

**JS层 (script)**
```javascript
const clockDialogVisible = ref(false)

function handleClockIn() {
  clockType.value = '上工打卡'
  clockTime.value = new Date().toLocaleString('zh-CN')
  clockUser.value = authStore.user.realName || authStore.user.username
  clockDialogVisible.value = true
}
```

**模板层 (template)**
```vue
<el-button type="success" size="large" @click="handleClockIn">
  上工
</el-button>
```

---

## 4. 双向绑定 `v-model`

### 例子1：表单数据双向绑定

**JS层 (script)**
```javascript
const formData = ref({
  userName: '',
  realName: '',
  password: '',
  role: 'normal'
})
```

**模板层 (template)**
```vue
<el-form :model="formData" label-width="80px">
  <el-form-item label="用户名" required>
    <el-input v-model="formData.userName" placeholder="请输入用户名" />
  </el-form-item>
  <el-form-item label="中文名">
    <el-input v-model="formData.realName" placeholder="请输入中文名" />
  </el-form-item>
  <el-form-item label="密码" required>
    <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
  </el-form-item>
  <el-form-item label="角色">
    <el-select v-model="formData.role" style="width: 100%">
      <el-option label="普通用户" value="normal" />
      <el-option label="经理" value="manager" />
      <el-option label="超级管理员" value="admin" />
    </el-select>
  </el-form-item>
</el-form>
```

---

## 5. 条件渲染 `v-if` / `v-show`

### 例子1：加载/错误/正常状态切换

**JS层 (script)**
```javascript
const loading = ref(true)
const error = ref(null)
const device = ref(null)

async function fetchDeviceDetail() {
  try {
    device.value = await deviceApi.getDetail(deviceId)
  } catch (err) {
    error.value = '设备不存在或已停用'
  } finally {
    loading.value = false
  }
}
```

**模板层 (template)**
```vue
<div v-if="loading" class="status-wrapper">
  <el-icon class="status-icon"><Monitor /></el-icon>
  <div>加载中...</div>
</div>

<div v-else-if="error" class="status-wrapper">
  <el-icon class="status-icon"><CircleCheck /></el-icon>
  <div>{{ error }}</div>
</div>

<div v-else-if="device">
  <el-card class="device-card">
    <!-- 设备详情内容 -->
  </el-card>
</div>
```

---

### 例子2：条件显示按钮

**JS层 (script)**
```javascript
const relatedDevices = ref([])

function handleBatchReset() {
  // 批量清零逻辑
}
```

**模板层 (template)**
```vue
<el-button type="danger" @click="handleReset">
  清零
</el-button>

<el-button 
  v-if="relatedDevices.length > 0" 
  type="danger" 
  @click="handleBatchReset"
>
  对照设备双清零
</el-button>
```

---

## 6. 列表渲染 `v-for`

### 例子1：遍历对照设备列表

**JS层 (script)**
```javascript
const relatedDevices = ref([
  { deviceId: 'Device-A', deviceType: '直立机', deviceStatus: '1' },
  { deviceId: 'Device-B', deviceType: '收卷机', deviceStatus: '0' }
])

function getDeviceStatusType(status) {
  return { '0': 'danger', '1': 'success' }[status] || 'info'
}

function getDeviceStatusText(status) {
  return { '0': '停机', '1': '运行中' }[status] || '未知'
}
```

**模板层 (template)**
```vue
<div class="related-devices">
  <el-card 
    v-for="(relatedDevice, index) in relatedDevices" 
    :key="index"
    shadow="never"
  >
    <div class="related-device-header">
      <strong>{{ relatedDevice.deviceId }}</strong>
      <el-tag size="small" :type="getDeviceStatusType(relatedDevice.deviceStatus)">
        {{ getDeviceStatusText(relatedDevice.deviceStatus) }}
      </el-tag>
    </div>
  </el-card>
</div>
```

---

### 例子2：下拉选项

**JS层 (script)**
```javascript
const roleOptions = [
  { label: '普通用户', value: 'normal' },
  { label: '经理', value: 'manager' },
  { label: '超级管理员', value: 'admin' }
]
```

**模板层 (template)**
```vue
<el-select v-model="filterRole" placeholder="角色筛选">
  <el-option label="全部" value="" />
  <el-option 
    v-for="item in roleOptions" 
    :key="item.value" 
    :label="item.label" 
    :value="item.value" 
  />
</el-select>
```

---

### 例子3：打卡设备列表

**JS层 (script)**
```javascript
const clockDevices = computed(() => {
  const devices = []
  if (device.value) {
    devices.push({ deviceId: device.value.deviceId })
  }
  relatedDevices.value.forEach(related => {
    devices.push({ deviceId: related.deviceId })
  })
  return devices
})
```

**模板层 (template)**
```vue
<div class="clock-devices-list">
  <el-tag 
    v-for="(dev, index) in clockDevices" 
    :key="index" 
    type="info"
  >
    {{ dev.deviceId }}
  </el-tag>
</div>
```

---

## 7. 计算属性 `computed`

### 例子1：组合设备列表

**JS层 (script)**
```javascript
import { computed } from 'vue'

const device = ref({ deviceId: 'QR-001', deviceType: '直立机' })
const relatedDevices = ref([
  { deviceId: 'QR-002', deviceType: '收卷机' }
])

const clockDevices = computed(() => {
  const devices = []
  if (device.value) {
    devices.push({
      deviceId: device.value.deviceId,
      deviceType: device.value.deviceType
    })
  }
  relatedDevices.value.forEach(related => {
    devices.push({
      deviceId: related.deviceId,
      deviceType: related.deviceType
    })
  })
  return devices
})
```

**模板层 (template)**
```vue
<el-select v-model="selectedDevice" placeholder="选择设备">
  <el-option 
    v-for="dev in clockDevices" 
    :key="dev.deviceId" 
    :label="dev.deviceId" 
    :value="dev.deviceId" 
  />
</el-select>
```

---

### 例子2：获取当前用户名

**JS层 (script)**
```javascript
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const currentUsername = computed(() => {
  return authStore.user?.username || localStorage.getItem('user_name') || ''
})
```

**模板层 (template)**
```vue
<span>当前用户: {{ currentUsername }}</span>
```

---

## 8. 侦听器 `watch`

### 例子1：监听筛选条件变化

**JS层 (script)**
```javascript
import { watch } from 'vue'

const searchQuery = ref('')
const filterRole = ref('')
const dateRange = ref([])
const currentPage = ref(1)

async function fetchUsers() {
  // 获取用户列表
}

watch([searchQuery, filterRole, dateRange], () => {
  currentPage.value = 1
  fetchUsers()
})
```

**模板层 (template)**
```vue
<el-input v-model="searchQuery" placeholder="搜索..." />
<el-select v-model="filterRole" />
<el-date-picker v-model="dateRange" />
```

---

### 例子2：监听排序变化

**JS层 (script)**
```javascript
import { watch } from 'vue'

const sortColumn = ref('id')
const sortOrder = ref('ascending')
const currentPage = ref(1)

async function fetchUsers() {
  // 获取用户列表
}

watch([sortColumn, sortOrder], () => {
  currentPage.value = 1
  fetchUsers()
})
```

**模板层 (template)**
```vue
<el-table :data="users" @sort-change="handleSortChange">
  <el-table-column prop="id" label="ID" sortable="custom" />
</el-table>
```

---

## 绑定方式一览

| 绑定方式 | 语法 | 用途 |

|---------|------|------|

| 文本插值 | `{{ }}` | 显示数据（填在标签中间的文本内容） |

| 属性绑定 | `:` | 绑定HTML属性，单向绑定（JS -> 模板） |

| 事件绑定 | `@` | 绑定点击、输入等事件 |

| 双向绑定 | `v-model` | 表单数据双向同步 |

| 条件渲染 | `v-if/v-show` | 条件显示元素 |

| 列表渲染 | `v-for` | 遍历数组/对象 |

| 计算属性 | `computed` | 派生数据 |

| 侦听器 | `watch` | 监听数据变化 |

---
