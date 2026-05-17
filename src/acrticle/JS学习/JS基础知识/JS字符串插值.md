---
title: JS字符串插值
icon: fa-brands fa-node-js
order: 6
category:
  - JS学习
tag:
  - JS字符串
---

# JavaScript 的模板字符串

在 JavaScript 中，使用反引号（` `）包围的字符串称为 **模板字符串**（template literals），它提供了强大的字符串插值功能。

## 基本语法

```javascript
`这是一个字符串 ${变量名} 和 ${表达式}`
```

## 示例

```javascript
const name = "Alice";
const age = 30;
const height = 1.65;

// 使用模板字符串
const message = `你好，我是 ${name}，今年 ${age} 岁。明年我就 ${age + 1} 岁了。`;
console.log(message);
// 输出：你好，我是 Alice，今年 30 岁。明年我就 31 岁了。

// 可以在大括号内进行表达式计算，比如控制浮点数位数
const info = `姓名：${name}，身高：${height.toFixed(2)} 米`;
console.log(info);
// 输出：姓名：Alice，身高：1.65 米
```

## JSON 数据的格式化打印

在开发中，经常需要打印对象或数组数据，使用 `JSON.stringify()` 配合模板字符串可以方便地格式化输出。

```javascript
const filteredData = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 }
];

// 使用模板字符串打印格式化的 JSON 数据
console.log(`筛选后的数据: ${JSON.stringify(filteredData, null, 2)}`);
```

