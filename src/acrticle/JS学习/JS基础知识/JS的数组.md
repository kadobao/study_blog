---
title: JS的数组
icon: fa-brands fa-node-js
order: 7
category:
  - JS学习
tag:
  - 数组
---

# JavaScript 数组

## 数组的 `forEach` 循环

数组的 `forEach` 方法的参数是一个函数（回调函数）。这个回调函数会被 `forEach` 为数组中的每个元素调用一次。

### 回调函数参数

回调函数（必需）- 为每个元素执行的函数，接收三个参数：

- `currentValue`：当前处理的元素
- `index`（可选）：当前元素的索引
- `array`（可选）：正在操作的数组

### 参数使用说明

大多数情况下，我们只需要 `(value, index)`，很少用到第三个参数 `array`。

- 如果不需要索引，可以只传 `value`
- 如果不需要值，可以用 `_` 或 `undefined` 占位，只取 `index`

## 示例代码

### 基本用法

```javascript
const fruits = ['苹果', '香蕉', '橙子'];

fruits.forEach(function(fruit) {
  console.log(fruit);
});

// 输出：
// 苹果
// 香蕉
// 橙子
```

### 使用索引

```javascript
const numbers = [10, 20, 30];

numbers.forEach(function(number, index) {
  console.log(`索引 ${index} 的值是 ${number}`);
});

// 输出：
// 索引 0 的值是 10
// 索引 1 的值是 20
// 索引 2 的值是 30
```

### 使用箭头函数

```javascript
const colors = ['红色', '绿色', '蓝色'];

// 使用箭头函数
colors.forEach((color, index) => {
  console.log(`${index + 1}. ${color}`);
});

// 输出：
// 1. 红色
// 2. 绿色
// 3. 蓝色
```

### 只使用索引

```javascript
const items = ['a', 'b', 'c'];

// 只使用索引，用 _ 占位值
items.forEach((_, index) => {
  console.log(`位置 ${index}`);
});

// 输出：
// 位置 0
// 位置 1
// 位置 2
```



### 打印对象数组

```javascript
let objArr = [{ name: "张三", age: 25 }, { name: "李四", age: 30 }];

console.log(JSON.stringify(objArr, null, 2));

// JSON.stringify(value, replacer, space) 有三个参数：
// value：要序列化的对象 / 数组（必填）。
// replacer：过滤 / 转换属性的函数或数组（可选，这里填 null 表示不做过滤）。
// space：缩进空格数（可选，这里填 2 表示用 2 个空格缩进）。
```

### 创建空数组，往数组里面添加对象

```javascript
const employees = [];
employees.push({ id: 101, name: '赵六', department: '销售' });
employees.push({ id: 102, name: '钱七', department: '技术' });

console.log(JSON.stringify(employees, null, 2));

// [
//   {
//     "id": 101,
//     "name": "赵六",
//     "department": "销售"
//   },
//   {
//     "id": 102,
//     "name": "钱七",
//     "department": "技术"
//   }
// ]
```


### 使用forEach遍历一个对象数组，然后使用这个数据创建一个对象数组
```javascript
const users = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 }
];

const newUsers = []; // 初始化空数组

users.forEach((user) => {
  // 创建新对象并添加到新数组
  newUsers.push({
    userId: user.id,
    userName: user.name,
    isAdult: user.age >= 18
  });
});

console.log(JSON.stringify(newUsers, null, 2));
// [
//   {
//     "userId": 1,
//     "userName": "张三",
//     "isAdult": true
//   },
//   {
//     "userId": 2,
//     "userName": "李四",
//     "isAdult": true
//   },
//   {
//     "userId": 3,
//     "userName": "王五",
//     "isAdult": true
//   }
// ]
```