---
title: JS流程控制语句
icon: fa-brands fa-node-js
order: 2
category:
  - JS学习
tag:
  - JS
---



# JavaScript 流程控制语句

## 1. if...else 语句

`if...else` 语句用于基于条件执行不同的代码块。

### 基本语法
```javascript
if (condition) {
    // 条件为真时执行的代码
} else {
    // 条件为假时执行的代码
}
```

### 示例
```javascript
let age = 18;

if (age >= 18) {
    console.log("成年人");
} else {
    console.log("未成年人");
}
```

### 多条件判断
```javascript
let score = 85;

if (score >= 90) {
    console.log("优秀");
} else if (score >= 80) {
    console.log("良好");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}
```

## 2. 三元运算符

三元运算符是 `if...else` 的简写形式，用于简单的条件判断。

### 语法
```javascript
condition ? expression1 : expression2
```

### 示例
```javascript
let age = 20;
let status = age >= 18 ? "成年人" : "未成年人";
console.log(status); // 输出: 成年人

// 嵌套三元运算符
let grade = 85;
let result = grade >= 90 ? "优秀" : 
             grade >= 80 ? "良好" : 
             grade >= 60 ? "及格" : "不及格";
console.log(result); // 输出: 良好
```

## 3. switch 语句

`switch` 语句用于基于不同情况执行不同的代码块。

### 语法
```javascript
switch(expression) {
    case value1:
        // 代码块1
        break;
    case value2:
        // 代码块2
        break;
    default:
        // 默认代码块
}
```

### 示例
```javascript
let day = 3;
let dayName;

switch(day) {
    case 1:
        dayName = "星期一";
        break;
    case 2:
        dayName = "星期二";
        break;
    case 3:
        dayName = "星期三";
        break;
    case 4:
        dayName = "星期四";
        break;
    case 5:
        dayName = "星期五";
        break;
    case 6:
        dayName = "星期六";
        break;
    case 7:
        dayName = "星期日";
        break;
    default:
        dayName = "无效的天数";
}

console.log(dayName); // 输出: 星期三
```

## 4. for 循环

`for` 循环是条件循环，条件就是数字

`for of` 适合除对象之外的(官方说法是：可迭代对象)

`for...in` 循环 (遍历对象属性)

### 语法
```javascript
for (initialization; condition; increment) {
    // 要执行的代码
}
```

### 示例
```javascript
// 基本for循环
for (let i = 0; i < 5; i++) {
    console.log(i); // 输出: 0, 1, 2, 3, 4
}

// 遍历数组
let fruits = ["苹果", "香蕉", "橙子"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// for...of 循环 (ES6)
for (let fruit of fruits) {
    console.log(fruit);
}

// for...in 循环 (遍历对象属性)
let person = {name: "张三", age: 25, city: "北京"};
for (let key in person) {
    console.log(key + ": " + person[key]);
}
```

## 5. while 循环

`while` 循环在指定条件为真时重复执行代码块。

### 语法
```javascript
while (condition) {
    // 要执行的代码
}
```

### 示例
```javascript
// while循环
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

```

## 6. try...catch...finally

`try...catch...finally` 语句用于处理代码执行过程中可能出现的错误。

### 语法
```javascript
try {
    // 尝试执行的代码
} catch (error) {
    // 发生错误时执行的代码
} finally {
    // 无论是否发生错误都会执行的代码
}
```

### 示例
```javascript
try {
    let result = 10 / 0;
    console.log("结果:", result);
    
    // 故意抛出错误
    throw new Error("自定义错误");
    
} catch (error) {
    console.log("捕获到错误:", error.message);
    
} finally {
    console.log("finally块总是会执行");
}

// 处理JSON解析错误
try {
    let json = '{"name": "张三", "age": 25}';
    let obj = JSON.parse(json);
    console.log(obj.name);
} catch (e) {
    console.log("JSON解析错误:", e.message);
}
```

## 7. throw 语句

`throw` 语句用于创建自定义错误。

### 语法
```javascript
throw expression;
```

### 示例
```javascript
// 抛出字符串错误
function divide(a, b) {
    if (b === 0) {
        throw "除数不能为零";
    }
    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (error) {
    console.log("错误:", error);
}

// 抛出Error对象
function validateAge(age) {
    if (age < 0) {
        throw new Error("年龄不能为负数");
    }
    if (age > 150) {
        throw new Error("年龄不能超过150岁");
    }
    return true;
}

```

## 总结

JavaScript提供了丰富的流程控制语句，使得程序能够根据不同的条件执行不同的逻辑，处理循环任务，以及优雅地处理错误情况。合理使用这些控制语句可以编写出结构清晰、易于维护的代码。