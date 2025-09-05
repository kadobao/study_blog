---
title: vue3全屏模式
icon: fa-brands fa-vuejs
order: 31
category:
  - vue3学习
tag:
  - vue3学习
---







![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20241014/image.6pnhxv97d8.jpg)

------





```
          <!-- 添加全屏切换按钮 -->
          <el-menu-item @click="toggleFullScreen">
            <el-icon>
              <full-screen v-if="!isFullscreen" />
              <aim v-else />
            </el-icon>
            <span>{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
          </el-menu-item>
```

```
import { ref, watch, watchEffect} from 'vue'

// 全屏切换功能
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }
}

// 使用 watchEffect 监听全屏变化
watchEffect(() => {
  isFullscreen.value = !!document.fullscreenElement
})
```

这个 `toggleFullScreen` 函数实现了网页进入和退出全屏模式的功能。我们逐步解析其中的逻辑：

### 功能解析：

1. **检测是否在全屏模式**：
   ```js
   if (!document.fullscreenElement)
   ```
   - 这里通过 `document.fullscreenElement` 检测当前是否处于全屏模式。
   - `document.fullscreenElement` 返回当前处于全屏模式的元素。如果没有任何元素处于全屏状态，它将返回 `null`。因此，当 `!document.fullscreenElement` 为 `true` 时，表示当前不是全屏状态。

2. **进入全屏模式**：
   ```js
   document.documentElement.requestFullscreen()
   isFullscreen.value = true
   ```
   - 当检测到没有元素在全屏时，调用 `document.documentElement.requestFullscreen()` 来请求浏览器将整个页面元素（`document.documentElement`，即 `<html>` 标签）进入全屏模式。
   - 请求全屏操作是异步的，但是这里没有处理 `.then()` 或 `.catch()`，因此假设操作成功后，将 `isFullscreen.value` 设置为 `true`，表示页面已进入全屏模式。

3. **退出全屏模式**：
   ```js
   if (document.exitFullscreen) {
     document.exitFullscreen()
     isFullscreen.value = false
   }
   ```
   - 如果已经处于全屏状态，则检查浏览器是否支持退出全屏功能 (`document.exitFullscreen`)。
   - 如果支持，调用 `document.exitFullscreen()` 退出全屏模式，并将 `isFullscreen.value` 设置为 `false`，表示页面已退出全屏模式。

### 具体工作原理：

- **`document.fullscreenElement`**: 检查当前页面是否有元素在全屏模式。
- **`document.documentElement.requestFullscreen()`**: 将整个页面请求为全屏。
- **`document.exitFullscreen()`**: 退出全屏模式。
- **`isFullscreen.value`**: 响应式状态，记录页面是否在全屏模式，通常用于更新界面（例如切换按钮文本或图标）。

### 总结：
- 该函数的主要作用是当用户点击某个按钮时，判断当前是否处于全屏状态。如果不是全屏状态，则请求进入全屏；如果已经在全屏状态，则退出全屏模式。