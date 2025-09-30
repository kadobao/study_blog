---
title: C#数组和列表的区别
icon: code
order: 7
category:
tag:
  - C#基础
---

# C#数组和列表的区别

## Array（数组）

- 固定长度，创建后不能改变
- `string[]` 是固定长度的数组，创建后不能改变长度

## List（列表）

- 动态长度，创建后可以根据需要添加或删除元素
- `List<string>` 是动态长度的列表，创建后可以根据需要添加或删除元素

## 总结

由于 `List<string>` 具有动态调整大小的特性，因此在实际开发中更常用。


::: tip 提示：

这里是为了方便理解才写`string[]` 和 `List<string>`，数组和列表不止`String`这一个类型

:::
