---
title: vue3的v-if与v-for的优先级
icon: 
order: 26
category:
  - vue学习
tag:
  - vue学习
---




[details="省流"]
当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。
[/details]

------

同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显；为了解决这个问题，一般的推荐做法是尽量将 v-if 移到父级元素上，避免同时使用 v-if 和 v-for 。
```
<template>
  <!-- 推荐的做法，将 v-if 移到父级 -->
  <ul v-if="shouldRenderList">
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
```

------

注：
vue2和vue3的答案完全相反：
在vue2中，v-for的优先级高于v-if；
在vue3中，v-if的优先级高于v-for。