---
title: JS的forEach遍历和filter筛选数组方法
icon: fa-brands fa-node-js
order: 8
category:
  - JS学习
tag:
  - 数组
---

# JavaScript 数组遍历方法

## 1. forEach - 遍历数组

### 作用
对数组的每个元素执行一次给定的函数，不返回新数组。

适用于需要对每个元素执行操作（如打印、修改、调用函数等）

### 语法

```javascript
数组.forEach((当前元素, 索引, 原数组) => {
  // 执行的代码
});
```

### 参数说明

- `当前元素`：当前正在处理的元素
- `索引`（可选）：当前元素的索引
- `原数组`（可选）：正在操作的数组

大多数情况下，我们只需要 `(value, index)`，很少用到第三个参数 `array`。

- 如果不需要索引，可以只传 `value`
- 如果不需要值，可以用 `_` 或 `undefined` 占位，只取 `index`

### 示例代码

#### 基础用法

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(num => {
  console.log(num * 2);  // 输出: 2, 4, 6, 8, 10
});
```

#### 有索引参数

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index) => {
  console.log(`索引${index}: ${num}`);
});
// 输出: 索引0: 1, 索引1: 2...
```

#### 修改原数组

```javascript
const fruits = ['apple', 'banana'];


// arr 就是 fruits 本身，第三个参数是原数组
fruits.forEach((item, index, arr) => {
  arr[index] = item.toUpperCase();
});

console.log(fruits); // ['APPLE', 'BANANA']
```

---

## 2. filter - 过滤数组

### 作用
创建一个新数组，包含通过测试的所有元素，返回新数组。

### 语法

```javascript
const 新数组 = 数组.filter((当前元素, 索引, 原数组) => {
  return 条件;  // 返回true保留，false过滤掉
});
```

### 参数说明

- `当前元素`：当前正在处理的元素
- `索引`（可选）：当前元素的索引
- `原数组`（可选）：正在操作的数组

### 示例代码

#### 筛选偶数

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// 筛选偶数
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6]
console.log(numbers); // 原数组不变 [1,2,3,4,5,6]
```

#### 筛选大于3的数字

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// 筛选大于3的数字
const greaterThan3 = numbers.filter(num => num > 3);
console.log(greaterThan3); // [4, 5, 6]
```

#### 实际应用：筛选价格低于100的商品

```javascript
const products = [
  { name: '鼠标', price: 50 },
  { name: '键盘', price: 200 },
  { name: '显示器', price: 1500 }
];

const cheapProducts = products.filter(item => item.price < 100);
console.log(cheapProducts); // [{ name: '鼠标', price: 50 }]
```

---

## forEach 和 filter 的区别

| 方法 | 是否返回新数组 | 是否修改原数组 | 主要用途 |
|------|---------------|---------------|----------|
| forEach | 否 | 可以修改 | 遍历数组，执行操作 |
| filter | 是 | 否 | 过滤数组，返回符合条件的元素 |

### 使用建议

- **forEach**：适用于需要对每个元素执行操作（如打印、修改、调用函数等）
- **filter**：适用于需要从数组中筛选出符合条件的元素