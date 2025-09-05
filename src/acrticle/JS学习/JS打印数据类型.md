---
title: JS打印数据类型
icon: fa-brands fa-node-js
order: 3
category:
  - JS学习
tag:
  - JS
---




# JavaScript 数据类型检查方法

在实际开发中，打印数据类型**最常用的是 `typeof` 和 `Array.isArray()`**

## typeof 操作符

typeof 操作符用于检查基本数据类型（Number, String, Boolean, Undefined, Symbol, BigInt）

```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 123n);        // "bigint"
```

## Array.isArray() 方法

Array.isArray() 方法专门用于检查是否为数组类型

```javascript
console.log(Array.isArray([1, 2, 3]));  // true
console.log(Array.isArray({}));        // false
console.log(Array.isArray("array"));    // false
```

## 其他数据类型检查方法

### 检查 null
```javascript
let value = null;
console.log(value === null);      // true
```

### 检查对象
```javascript
let obj = {};
console.log(typeof obj === "object" && obj !== null); // true
```

### instanceof 操作符
```javascript
let date = new Date();
console.log(date instanceof Date); // true

let arr = [];
console.log(arr instanceof Array); // true
```

这些是 JavaScript 中检查数据类型最常用的方法。根据不同的数据类型，可以选择合适的检查方法。