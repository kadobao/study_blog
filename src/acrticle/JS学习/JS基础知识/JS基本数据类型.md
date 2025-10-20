---
title: JS基本数据类型
icon: fa-brands fa-node-js
order: 1
category:
  - JS学习
tag:
  - JS
---





# JavaScript 基本数据类型及其常用方法

JavaScript 有几种基本数据类型，每种类型都有其相关的方法和操作。以下是 `int` (Number)、`string`、`bool` (Boolean)、`object` 和 `array` 的常用方法：

::: details JS常用数据类型的常用方法
```
int: tostring()

string: length，includes，trim，replace，split，slice，indexOf，lastIndexOf

bool: tostring()

Object: hasOwnProperty，object.keys，object.values

Array: length，includes，push，pop，map，slice，filter，join
```
:::




## Number (int)

```javascript
let num = 123.456;

// 转换为字符串
num.toString(); // "123.456"
```

## String

```javascript
let str = "Hello World";

// 长度
str.length; // 11

// 获取字符
str[1]; // "e" (ES6)

// 获取字符的索引
str.indexOf("W"); // 6 (返回第一次出现的索引)
str.indexOf("w"); // -1 (区分大小写，未找到返回-1)
str.lastIndexOf("o"); // 7 (从后往前搜索，返回最后一次出现的索引)


// 查找
str.includes("Hello"); // true

// 修改
str.trim(); // 去除两端空格
str.replace("World", "JS"); // "Hello JS"

// let secretMessage = "xJavascriptxIsxAwesomex";
// let result = secretMessage.replace(/x/g, " ");   // /x/g匹配所有 x并替换为空格
// console.log(result); // "Javascript Is Awesome"


// 字符串格式化
const name = "张三";
const age = 25;
const message = `姓名：${name}，年龄：${age}岁`;    // 姓名：张三，年龄：25岁


// 分割和连接
str.split(" "); // ["Hello", "World"]

// 切片
str.slice(6, 11); // "World"
```

## Boolean (bool)

```javascript
let bool = true;

// 转换为字符串
bool.toString(); // "true"

// 逻辑运算
true && false; // false
true || false; // true
!true; // false
```

## Object

```javascript
let obj = { name: "John", age: 30 };

// 获取键
Object.keys(obj); // ["name", "age"]  返回的是数组

// 获取值
Object.values(obj); // ["John", 30]   返回的是数组

// 添加/修改键值对
obj.city = "NY"; // 添加新属性
obj.age = 31; // 修改已有属性

// 获取键值对
Object.entries(obj); // [["name", "John"], ["age", 30]]

// 检查属性
obj.hasOwnProperty("name"); // true
"name" in obj; // true

// 遍历
for (let key in obj) {
  console.log(key, obj[key]);
}
```

### 打印对象

```javascript
let obj = { name: "John", age: 30 };

console.log(JSON.stringify(obj, null, 2));
```

## Array

```javascript
let arr = [1, 2, 3, 4, 5];

console.log(arr);

// 长度
arr.length; // 5

// 添加/删除元素
arr.push(6); // [1,2,3,4,5,6] (末尾添加)
arr.pop(); // [1,2,3,4,5] (末尾删除)

// 查找
arr.includes(4); // true
arr.find(x => x > 2); // 3
arr.findIndex(x => x > 2); // 2

// 过滤/映射/缩减
arr.filter(x => x > 2); // [3,4,5]；​​filter()方法只保留回调函数返回 true（或真值）的元素​​，并过滤掉返回 false（或假值）的元素。
arr.map(x => x * 2); // [2,4,6,8,10]；arr.map(x => x * 2)是 JavaScript 中数组的一个常用操作，它使用 map()方法对数组中的每个元素进行处理并返回一个新数组。第一个X相当于函数的参数，值是数组中的元素；`x * 2`是对元素进行处理，返回处理后的结果。
// map()方法接受一个函数作为参数，该函数对数组中的每个元素进行处理并返回一个新数组。

// 切片
arr.slice(1, 3); // [4,3] (不改变原数组)


// 合并成字符串（默认用逗号连接）
let str1 = arr.join();  // "1,2,3,4,5"

let str3 = arr.join("-");  // "1-2-3-4-5"


// 连接
arr.concat([8, 9]); // [5,6,7,2,1,8,9]

// 遍历
arr.forEach(x => console.log(x));
for (let item of arr) {
  console.log(item);
}
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


这些是 JavaScript 中基本数据类型最常用的方法。根据不同的需求，可以选择合适的方法来操作数据。