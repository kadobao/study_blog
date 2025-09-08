---
title: JS对象方法练习题目
icon: fa-brands fa-node-js
order: 4
category:
  - JS学习
tag:
  - JS
---




# JavaScript 对象方法练习题目

---

### 题目 1
```javascript
let num = 123;
// 使用toString()方法将数字转换为字符串
```

---

### 题目 2
```javascript
let bool = true;
// 使用toString()方法将布尔值转换为字符串
```

---

### 题目 4
```javascript
let obj = {name: "张三", age: 25};
// 使用hasOwnProperty()检查对象是否包含"name"属性
```

---

### 题目 5
```javascript
let person = {firstName: "李", lastName: "四"};
// 使用hasOwnProperty()检查对象是否包含"fullName"属性
```

---

### 题目 6
```javascript
let car = {brand: "Toyota", model: "Camry", year: 2020};
// 使用Object.keys()获取对象的所有键名
```

---

### 题目 7
```javascript
let student = {name: "王五", score: 95, grade: "A"};
// 使用Object.values()获取对象的所有值
```

---

### 题目 8
```javascript
let data = {a: 1, b: 2, c: 3};
// 使用Object.keys()和forEach遍历对象的所有属性
```

---

### 题目 9
```javascript
let config = {theme: "dark", language: "zh-CN", notifications: true};
// 使用Object.values()检查数组中是否包含"dark"主题
```

---

### 题目 10
```javascript
let product = {id: 101, name: "手机", price: 2999, inStock: true};
// 使用hasOwnProperty()检查产品是否有价格属性，然后转换为字符串
```

---

### 题目 12
```javascript
let user = {username: "admin", role: "administrator", active: true};
// 使用Object.keys()获取属性数量
```

---

### 题目 13
```javascript
let book = {title: "JavaScript指南", author: "张三", pages: 300};
// 检查对象是否有"publisher"属性，如果没有则添加
```

---

### 题目 14
```javascript
let settings = {volume: 80, brightness: 70, theme: "light"};
// 使用Object.values()找出最大的数值
```

---

### 题目 15
```javascript
let data = {x: 10, y: 20, z: 30};
// 使用Object.keys()和map创建["x:10", "y:20", "z:30"]数组
```

---

### 题目 16
```javascript
let person = {name: "赵六", age: 30, city: "北京"};
// 使用toString()方法尝试将整个对象转换为字符串，观察结果
```

---

### 题目 17
```javascript
let inventory = {apples: 50, oranges: 30, bananas: 20};
// 使用Object.keys()检查是否包含"grapes"键
```

---

### 题目 18
```javascript
let scores = {math: 90, english: 85, science: 92};
// 使用Object.values()计算平均分
```

---

### 题目 19
```javascript
let flags = {isLoggedIn: true, hasPermission: false, isAdmin: true};
// 使用Object.values()统计true的数量
```

---

### 题目 20
```javascript
let emptyObj = {};
// 使用Object.keys()检查空对象，然后使用hasOwnProperty()检查任意属性
```

---

### 题目 22
```javascript
let nestedObj = {user: {name: "张三", details: {age: 25}}};
// 使用hasOwnProperty()检查嵌套属性"user.details.age"
```

---

### 题目 23
```javascript
let mixedData = {string: "hello", number: 42, boolean: true, array: [1,2,3]};
// 使用Object.values()过滤出所有非对象类型的值
```

---

### 题目 24
```javascript
let person = {firstName: "张", lastName: "三", getFullName: function() {
    return this.firstName + this.lastName;
}};
// 使用Object.keys()排除函数类型的属性
```

---

### 题目 25
```javascript
let config = {apiUrl: "https://api.example.com", timeout: 5000, retry: 3};
// 使用Object.entries()转换为键值对数组，然后处理每个条目
```

---

### 题目 26
```javascript
let data = {a: 1, b: 2, c: 3, d: 4};
// 使用Object.keys()和reduce计算所有值的和
```

---

### 题目 27
```javascript
let user = {name: "李四", age: "25", city: "北京"};
// 检查age属性是否存在且是字符串，然后转换为数字
```

---

### 题目 28
```javascript
let flags = {featureA: true, featureB: false, featureC: true, featureD: null};
// 使用Object.values()过滤出所有真值(truthy values)
```

---

### 题目 29
```javascript
let product = {id: 101, name: "笔记本电脑", price: 5999, currency: "CNY"};
// 使用toString()方法链式调用：price.toString() + currency
```

---

### 题目 30
```javascript
let complexObj = {
    user: {name: "王五", age: 30},
    settings: {theme: "dark", notifications: true},
    metadata: {created: "2024-01-01", updated: "2024-03-01"}
};
// 使用多层hasOwnProperty()安全检查嵌套属性