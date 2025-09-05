---
title: CSS常用属性
icon: fa-brands fa-css3
order: 1
category:
  - CSS
tag:
  - CSS
  - 前端
---


## CSS 中常用的基础属性分类整理：

---

### **盒模型相关**
1. **width** - 元素宽度  
2. **height** - 元素高度  
3. **margin** - 外边距（可分别设置 `margin-top`/`right`/`bottom`/`left`）  
4. **padding** - 内边距（可分别设置 `padding-top`/`right`/`bottom`/`left`）  
5. **border** - 边框（可细化设置 `border-width`/`style`/`color`）  
6. **box-sizing** - 盒模型计算方式（`content-box` 或 `border-box`）  

---

### **背景与颜色**
1. **background-color** - 背景颜色  
2. **background-image** - 背景图片  
3. **background-size** - 背景图大小（如 `cover`/`contain`）  
4. **background-position** - 背景图位置  
5. **color** - 文字颜色  

---

### **文本与字体**
1. **font-size** - 字体大小  
2. **font-family** - 字体类型（如 `Arial, sans-serif`）  
3. **font-weight** - 字体粗细（如 `bold`/`normal`）  
4. **text-align** - 文本水平对齐（`left`/`center`/`right`）  
5. **line-height** - 行高  
6. **text-decoration** - 文本装饰（如下划线 `underline`）  

---

### **布局与显示**
1. **display** - 显示类型（如 `block`/`inline`/`flex`/`grid`）  
2. **position** - 定位方式（`static`/`relative`/`absolute`/`fixed`）  
3. **top** / **right** / **bottom** / **left** - 定位偏移  
4. **float** - 浮动（`left`/`right`）  
5. **clear** - 清除浮动  

---

### **Flexbox 布局**
1. **justify-content** - 主轴对齐方式  
2. **align-items** - 交叉轴对齐方式  
3. **flex-direction** - 主轴方向（`row`/`column`）  
4. **flex-wrap** - 是否换行（`wrap`/`nowrap`）  

---

### **Grid 布局**
1. **grid-template-columns**  
   - 作用：定义网格的列数和每列的宽度  
   - 单位：支持 `fr`（比例）、`px`（固定像素）、`%`（百分比）等  
   - 示例：`grid-template-columns: 1fr 200px 30%;`（3列，比例分配、固定宽度、百分比宽度）

2. **grid-template-rows**  
   - 作用：定义网格的行数和每行的高度  
   - 单位：同列宽，支持多种单位  
   - 示例：`grid-template-rows: 100px auto 2fr;`（3行，固定高度、自适应高度、比例分配）

3. **grid-template-areas**  
   - 作用：通过命名区域规划网格布局结构  
   - 特点：需要与 `grid-area` 配合使用，用字符串表示区域分布  
   - 示例：  
     ```css
     grid-template-areas: 
       "header header"
       "sidebar main";
     ```

4. **grid-area**  
   - 作用：有两种用法  
     ① 给网格项命名（配合 `grid-template-areas`）：`grid-area: header;`  
     ② 直接指定项目位置（替代 `grid-row` + `grid-column`）：`grid-area: 行起始 / 列起始 / 行结束 / 列结束;`  
   - 示例：`grid-area: 1 / 1 / 3 / 2;`（从第1行到第3行，第1列到第2列）

5. **grid-row**  
   - 作用：单独指定网格项在行方向的位置范围  
   - 语法：`grid-row: 行起始位置 / 行结束位置;`  
   - 示例：`grid-row: 2 / 4;`（项目从第2行开始，到第4行结束，占据第2-3行）

6. **grid-column**  
   - 作用：单独指定网格项在列方向的位置范围  
   - 语法：`grid-column: 列起始位置 / 列结束位置;`  
   - 示例：`grid-column: 1 / 3;`（项目从第1列开始，到第3列结束，占据第1-2列）

7. **gap（grid-gap）**  
   - 作用：设置网格项之间的间距（行间距和列间距）  
   - 简写形式：`gap: 行间距 列间距;`（省略第二个值则行列间距相同）  
   - 单独设置：`row-gap: 10px;`（行间距）、`column-gap: 20px;`（列间距）  
   - 示例：`gap: 10px 15px;`（行间距10px，列间距15px）


---

### **其他常用**
1. **cursor** - 鼠标指针样式（如 `pointer`）  
2. **opacity** - 透明度（0-1）  
3. **visibility** - 可见性（`visible`/`hidden`）  
4. **z-index** - 层叠顺序  

---

## CSS 属性分类 Demo

---

### 盒模型相关
```html
<div style="width: 200px; height: 100px; margin: 10px; padding: 15px; border: 2px solid black; box-sizing: border-box;">
  盒模型示例
</div>
```

### 背景与颜色
```html
<div style="background-color: #f0f0f0; background-image: url('image.jpg'); background-size: cover; color: #333;">
  背景与颜色示例
</div>
```

### 文本与字体
```html
<p style="font-size: 16px; font-family: Arial, sans-serif; font-weight: bold; text-align: center; line-height: 1.5; text-decoration: underline;">
  文本样式示例
</p>
```

### 布局与显示
```html
<div style="display: flex; position: relative; top: 20px; float: left; clear: both;">
  布局示例
</div>
```

### Flexbox 布局
```html
<div style="display: flex; justify-content: center; align-items: center; flex-direction: row; flex-wrap: wrap;">
  <div>Flex 项1</div>
  <div>Flex 项2</div>
</div>
```

### Grid 布局
```html
<div style="display: grid; grid-template-columns: 1fr 2fr; grid-template-rows: 100px 200px; gap: 10px;">
  <div style="grid-area: 1 / 1 / 2 / 2;">Grid 项1</div>
  <div style="grid-area: 1 / 2 / 2 / 3;">Grid 项2</div>
</div>
```

### 其他常用
```html
<button style="cursor: pointer; opacity: 0.8; visibility: visible; z-index: 10;">
  交互示例
</button>
```



---




#### **grid-template-rows**

::: details grid-template-rows

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>grid-template-rows</title>
    <style>
        body, html {
            height: 100%;
            margin: 0;
        }
        .grid-item {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="grid-container" style="display: grid; grid-template-rows: repeat(14, 1fr); gap: 10px; height: 100vh;">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
        <div class="grid-item">7</div>
        <div class="grid-item">8</div>
        <div class="grid-item">9</div>
        <div class="grid-item">10</div>
        <div class="grid-item">11</div>
        <div class="grid-item">12</div>
        <div class="grid-item">13</div>
        <div class="grid-item">14</div>
    </div>

</body>
</html>
```

:::





#### **grid-template-columns**


::: details grid-template-columns

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>grid-template-columns</title>
    <style>
        .grid-item {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>

    <div style="display: grid; grid-template-columns: repeat(14, 1fr); gap: 10px; width: 100%;">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
        <div class="grid-item">7</div>
        <div class="grid-item">8</div>
        <div class="grid-item">9</div>
        <div class="grid-item">10</div>
        <div class="grid-item">11</div>
        <div class="grid-item">12</div>
        <div class="grid-item">13</div>
        <div class="grid-item">14</div>
    </div>

</body>
</html>
```

:::


#### **grid-template-areas**

::: details grid-template-areas

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid Template Areas</title>
    <style>
        body, html {
            height: 100%;
            margin: 0;
        }
        .container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: auto;
            grid-template-areas:
                "header header header"
                "sidebar content content"
                "footer footer footer";
            gap: 10px;
            height: 100vh;
            background-color: #2196F3;
            /* padding: 10px; */
        }

        .item {
            background-color: rgba(255, 255, 255, 0.8);
            text-align: center;
            padding: 20px;
            font-size: 30px;
        }

        .header {
            grid-area: header;
        }

        .sidebar {
            grid-area: sidebar;
        }

        .content {
            grid-area: content;
        }

        .footer {
            grid-area: footer;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="item header">Header</div>
    <div class="item sidebar">Sidebar</div>
    <div class="item content">Content</div>
    <div class="item footer">Footer</div>
</div>

</body>
</html>
```

:::



