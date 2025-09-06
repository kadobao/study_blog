---
title: JS字符串练习题目
icon: fa-brands fa-node-js
order: 1
category:
  - JS学习
tag:
  - JS
---






# JavaScript 字符串操作题目

---

### 题目 1
```javascript
let str = "   JavaScript Programming   ";
// 获取去除前后空格后的字符串长度
```

---

### 题目 2
```javascript
let text = "The quick brown fox jumps over the lazy dog";
// 检查字符串中是否包含单词 "fox" 和 "cat"
```

---

### 题目 3
```javascript
let sentence = "I like apples, apples are delicious";
// 将所有的 "apples" 替换为 "oranges"
```

---

### 题目 4
```javascript
let csvData = "name,age,city,country";
// 将字符串按逗号分割成数组，并获取第三个元素
```

---

### 题目 5
```javascript
let part1 = "Hello";
let part2 = "World";
let part3 = "!";
// 将三个部分连接成一个完整的句子 "Hello World!"
```

---

### 题目 6
```javascript
let longText = "abcdefghijklmnopqrstuvwxyz";
// 获取从第5个到第15个字符的子字符串
```

---

### 题目 7
```javascript
let email = "  user@example.com  ";
// 去除前后空格，检查是否是有效的邮箱（包含@和.）
```

---

### 题目 8
```javascript
let url = "https://www.example.com/products?id=123&category=books";
// 提取查询参数部分（?后面的内容）
```

---

### 题目 9
```javascript
let fullName = "John-Doe-Smith";
// 将字符串按连字符分割，然后重新用空格连接
```

---

### 题目 10
```javascript
let poem = "Roses are red,Violets are blue,Sugar is sweet,And so are you";
// 将字符串按逗号分割成诗句数组，然后获取第二句诗
```

---

### 题目 11
```javascript
let secretMessage = "xJavascriptxIsxAwesomex";
// 去除首尾的'x'字符，并将中间的'x'替换为空格
```

---

### 题目 12
```javascript
let mixedCase = "HeLlO WoRlD";
// 将字符串转换为全小写，检查是否包含"world"
```

---

### 题目 13
```javascript
let timestamp = "2024-03-20T15:30:00Z";
// 提取日期部分（2024-03-20）和时间部分（15:30:00）
```

---

### 题目 14
```javascript
let nestedText = "Start[[innerText]]End";
// 提取双中括号内的内容 "innerText"
```

---

### 题目 15
```javascript
let name = "张三";
let age = 25;
// 使用模板字符串创建自我介绍："我叫张三，今年25岁"
```

---

### 题目 16
```javascript
let product = "手机";
let price = 2999;
let discount = 0.1;
// 使用模板字符串计算并显示折后价格："手机原价2999元，打9折后2699.1元"
```

---

### 题目 17
```javascript
let firstName = "张";
let lastName = "三";
// 使用模板字符串和表达式创建全名："张三"
```

---

### 题目 18
```javascript
let x = 10;
let y = 20;
// 使用模板字符串显示数学运算："10 + 20 = 30"
```

---

### 题目 19
```javascript
let items = ["苹果", "香蕉", "橙子"];
// 使用模板字符串和map()创建购物清单："购物清单：苹果、香蕉、橙子"
```

---

### 题目 20
```javascript
let user = {name: "李四", score: 95};
// 使用模板字符串嵌套对象属性："用户李四的得分是95分"
```

---

### 题目 21
```javascript
let multilineText = `第一行
第二行
第三行`;
// 使用模板字符串创建多行文本，并获取行数
```

---

### 题目 22
```javascript
let date = new Date();
// 使用模板字符串和Date对象创建当前时间字符串："当前时间：2024-03-20 15:30:00"
```

---

### 题目 23
```javascript
let a = 5;
let b = 3;
// 使用模板字符串标签函数处理表达式：计算"5 * 3 = 15"
```

---

### 题目 24
```javascript
let temperature = 28.5;
let city = "北京";
// 使用模板字符串和toFixed()："北京当前温度：28.5°C"
```

---

### 题目 25
```javascript
let isMember = true;
let discountText = isMember ? "会员8折" : "原价";
// 使用模板字符串和三目运算符："当前优惠：会员8折"
```

---

### 题目 26
```javascript
let data = {title: "会议", time: "14:00", location: "会议室A"};
// 使用模板字符串和Object.values()创建会议通知
```

---

### 题目 27
```javascript
let firstName = "John";
let lastName = "Doe";
// 使用模板字符串创建HTML片段："<div>John Doe</div>"
```

---

### 题目 28
```javascript
let numbers = [1, 2, 3, 4, 5];
// 使用模板字符串和reduce()计算总和："数字总和：15"
```

---

### 题目 29
```javascript
let userInput = "Hello World";
// 使用模板字符串和字符串方法创建反转文本："dlroW olleH"
```

---

### 题目 30
```javascript
let template = `欢迎{name}，您的余额是{balance}元`;
let data = {name: "王五", balance: 1000};
// 使用模板字符串和replace()替换占位符
```