---
title: JS的序列化和反序列化
icon: fa-brands fa-node-js
order: 5
category:
  - JS学习
tag:
  - JS
---



# JavaScript 序列化与反序列化

序列化和反序列化是编程中常见的概念，特别是在数据存储和网络传输场景中。在JavaScript中，这两个操作主要通过`JSON`对象实现。

## 什么是序列化和反序列化

- **序列化(Serialization)**: 将对象转换为可以存储或传输的格式（通常是字符串）
- **反序列化(Deserialization)**: 将序列化后的字符串转换回原始对象

## JSON方法

JavaScript提供了两个核心方法：

### 1. JSON.stringify() - 序列化

```javascript
const obj = {
  name: "张三",
  age: 30,
  hobbies: ["阅读", "游泳"],
  address: {
    city: "北京",
    district: "海淀区"
  }
};

const jsonString = JSON.stringify(obj);
console.log(jsonString);
// 输出: {"name":"张三","age":30,"hobbies":["阅读","游泳"],"address":{"city":"北京","district":"海淀区"}}
```


### 2. JSON.parse() - 反序列化

```javascript
const jsonString = '{"name":"张三","age":30}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // 输出: 张三
```


## 总结

JavaScript中的序列化和反序列化主要通过`JSON.stringify()`和`JSON.parse()`实现。