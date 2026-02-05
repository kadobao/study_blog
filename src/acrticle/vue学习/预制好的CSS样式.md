---
title: 预制好的CSS样式
icon: fa-brands fa-vuejs
order: 39
category:
  - vue3学习
tag:
  - vue3学习
  - CSS
---

卡片容器：
```css
.card-container {
    width: 100%;
    height: 100%;
    background-color: rgba(45, 45, 55, 0.6);
    border: solid rgba(147, 112, 219, 0.3);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(147, 112, 219, 0.3);
}
```



半透明的青色网格背景:
```css
.bg-grid {
  // 叠加两个线性渐变
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  // 每个网格单元的大小为20px
  background-size: 20px 20px;
}
```