---
title: JS跳转语句
icon: fa-brands fa-node-js
order: 4
category:
  - JS学习
tag:
  - JS
---



# JavaScript 跳转语句

## 1. return 语句

`return` 语句用于在函数内部结束函数执行并返回一个值。

### 语法
```javascript
return [expression];
```

### 示例
```javascript
// 基本用法
function add(a, b) {
    return a + b;
}
console.log(add(2, 3)); // 输出: 5

// 提前返回
function checkAge(age) {
    if (age < 0) {
        return "年龄无效";
    }
    if (age < 18) {
        return "未成年人";
    }
    return "成年人";
}
console.log(checkAge(25)); // 输出: 成年人

// 返回对象
function createUser(name, age) {
    return {
        name: name,
        age: age,
        isAdult: age >= 18
    };
}
let user = createUser("张三", 25);
console.log(user); // 输出: {name: "张三", age: 25, isAdult: true}
```

## 2. continue 语句

`continue` 语句用于跳过当前循环迭代，继续执行下一次迭代。

### 语法
```javascript
continue [label];
```

### 示例
```javascript
// 跳过奇数
for (let i = 0; i < 10; i++) {
    if (i % 2 !== 0) {
        continue; // 跳过奇数
    }
    console.log(i); // 输出: 0, 2, 4, 6, 8
}

// 在嵌套循环中使用
outer: for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        if (j === 2) {
            continue outer; // 跳过当前外层循环的剩余部分
        }
        console.log(`i=${i}, j=${j}`);
    }
}
// 输出:
// i=1, j=1
// i=2, j=1
// i=3, j=1
```

## 3. break 语句

`break` 语句用于立即退出当前循环或switch语句。

### 语法
```javascript
break [label];
```

### 示例
```javascript
// 在循环中使用
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break; // 当i等于5时退出循环
    }
    console.log(i); // 输出: 0, 1, 2, 3, 4
}

// 在switch中使用
let fruit = "apple";
switch (fruit) {
    case "apple":
        console.log("苹果");
        break; // 退出switch
    case "banana":
        console.log("香蕉");
        break;
    default:
        console.log("未知水果");
}

// 在嵌套循环中使用标签
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outer; // 退出外层循环
        }
        console.log(`i=${i}, j=${j}`);
    }
}
// 输出:
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
```

## 4. throw 语句

`throw` 语句用于抛出一个异常。

### 语法
```javascript
throw expression;
```

### 示例
```javascript
// 抛出字符串
function divide(a, b) {
    if (b === 0) {
        throw "除数不能为零";
    }
    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (error) {
    console.log("错误:", error); // 输出: 错误: 除数不能为零
}

// 抛出Error对象
function validateEmail(email) {
    if (!email.includes("@")) {
        throw new Error("邮箱格式不正确");
    }
    return true;
}

try {
    validateEmail("invalid-email");
} catch (error) {
    console.log(error.message); // 输出: 邮箱格式不正确
}

// 自定义错误类型
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function processData(data) {
    if (!data) {
        throw new ValidationError("数据不能为空");
    }
    // 处理数据...
}
```

## 四种跳转语句的核心区别对比表

| 特性 | return | continue | break | throw |
|------|--------|----------|-------|-------|
| **适用场景** | 函数内部 | 循环内部 | 循环或switch内部 | 任何地方 |
| **主要作用** | 退出函数并返回值 | 跳过当前迭代，继续下一轮循环 | 立即退出当前循环或switch | 抛出异常 |
| **影响范围** | 整个函数 | 当前循环迭代 | 当前循环/switch块 | 直到被catch捕获或程序终止 |
| **返回值** | 可以返回任意值 | 无返回值 | 无返回值 | 抛出异常对象 |
| **错误处理** | 正常流程 | 正常流程 | 正常流程 | 异常流程 |
| **使用频率** | 非常高 | 中等 | 中等 | 相对较少 |

## 使用建议

1. **return**：用于函数返回值或提前退出函数
2. **continue**：用于跳过循环中不符合条件的迭代
3. **break**：用于提前退出循环或switch语句
4. **throw**：用于处理异常情况，应该与try-catch配合使用

## 注意事项

- 合理使用跳转语句可以使代码更简洁，但过度使用可能导致代码难以理解
- throw语句应该用于真正的异常情况，而不是普通的控制流程
- 在嵌套循环中使用标签时，要确保标签名称的唯一性和可读性
- return语句在箭头函数中有特殊的语法，如果函数体只有一条返回语句，可以省略大括号和return关键字