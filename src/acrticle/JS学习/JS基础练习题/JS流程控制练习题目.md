---
title: JS流程控制练习题目
icon: fa-brands fa-node-js
order: 3
category:
  - JS学习
tag:
  - JS
---



# JavaScript 流程控制练习题目

---

### 题目 1
```javascript
let age = 17;
// 使用if...else判断是否成年（>=18岁），输出相应信息
```

---

### 题目 2
```javascript
let score = 87;
// 使用if...else if...else判断成绩等级：
// 90+为优秀，80-89为良好，60-79为及格，60以下为不及格
```

---

### 题目 3
```javascript
let num = 15;
// 使用三元运算符判断数字是否为偶数，输出"偶数"或"奇数"
```

---

### 题目 4
```javascript
let day = 5;
// 使用switch语句根据数字输出对应的星期几（1-7对应星期一至星期日）
```

---

### 题目 5
```javascript
let numbers = [1, 2, 3, 4, 5];
// 使用for循环计算数组中所有数字的和
```

---

### 题目 6
```javascript
let fruits = ["苹果", "香蕉", "橙子", "葡萄"];
// 使用for...of循环遍历数组并输出每个水果名称
```

---

### 题目 7
```javascript
let person = {name: "张三", age: 25, city: "北京"};
// 使用for...in循环遍历对象属性并输出键值对
```

---

### 题目 8
```javascript
let count = 0;
// 使用while循环输出数字0到4
```

---

### 题目 9
```javascript
let i = 10;
// 使用do...while循环输出数字10到14
```

---

### 题目 10
```javascript
let data = '{"name": "李四", "age": 30}';
// 使用try...catch安全地解析JSON，处理可能的解析错误
```

---

### 题目 11
```javascript
function divide(a, b) {
    // 如果b为0，使用throw抛出错误"除数不能为零"
}
// 调用divide(10, 0)并使用try...catch捕获错误
```

---

### 题目 12
```javascript
let temperature = 28;
// 使用嵌套三元运算符：
// 温度>30输出"炎热"，25-30输出"温暖"，<25输出"凉爽"
```

---

### 题目 13
```javascript
let numbers = [2, 7, 1, 9, 4, 6];
// 使用for循环找出数组中的最大值
```

---

### 题目 14
```javascript
let password = "abc123";
// 使用if语句检查密码长度是否至少6位，并包含数字和字母
```

---

### 题目 15
```javascript
let user = {name: "", age: 20};
// 使用if语句检查用户名是否为空，如果为空则使用throw抛出错误
```

---

### 题目 16
```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 使用for循环和continue语句跳过偶数，只输出奇数
```

---

### 题目 17
```javascript
let str = "Hello World";
// 使用for循环和break语句，找到第一个空格的位置后停止循环
```

---

### 题目 18
```javascript
let operations = ["create", "read", "update", "delete"];
// 使用switch语句根据操作类型输出相应的CRUD描述
```

---

### 题目 19
```javascript
let numbers = [10, 20, 30, 40, 50];
let target = 35;
// 使用for循环和break，找到第一个大于target的数字
```

---

### 题目 20
```javascript
let data = [
    {name: "产品A", price: 100, inStock: true},
    {name: "产品B", price: 200, inStock: false},
    {name: "产品C", price: 150, inStock: true}
];
// 使用for循环找出所有有库存(inStock为true)的产品名称
```

---

### 题目 21
```javascript
let userInput = "admin";
// 使用switch语句实现简单的权限检查：
// "admin" -> "管理员权限", "user" -> "用户权限", 其他 -> "访客权限"
```

---

### 题目 22
```javascript
let count = 5;
// 使用while循环实现倒计时，从5到1，然后输出"发射！"
```

---

### 题目 23
```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 使用for循环和continue，只输出能被3整除的数字
```

---

### 题目 24
```javascript
let str = "programming";
// 使用for循环统计字符串中字母'g'出现的次数
```

---

### 题目 25
```javascript
let values = [null, undefined, 0, "", false, "hello", 123, true];
// 使用for循环过滤出所有真值(truthy values)
```

---

### 题目 26
```javascript
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
// 使用嵌套for循环遍历二维数组并输出所有元素
```

---

### 题目 27
```javascript
let attempts = 3;
let correctPassword = "secret123";
// 使用while循环实现密码验证，最多尝试3次
```

---

### 题目 28
```javascript
let data = '{"name": "John", "age": "25"}';
// 使用try...catch...finally，无论解析成功与否都输出"解析完成"
```

---

### 题目 29
```javascript
let numbers = [10, 20, 30, 40, 50];
// 使用for循环和标签(label)结合break，跳出外层循环
```

---

### 题目 30
```javascript
let user = {role: "editor", permissions: ["read", "write"]};
// 使用switch和if嵌套，根据角色和权限输出相应的操作提示