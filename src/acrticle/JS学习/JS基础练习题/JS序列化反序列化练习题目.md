---
title: JS序列化反序列化练习题目
icon: fa-brands fa-node-js
order: 5
category:
  - JS学习
tag:
  - JS
---




# JavaScript 序列化与反序列化练习题目

---

### 题目 1
```javascript
const obj = { name: "张三", age: 25 };
// 将对象序列化为JSON字符串
```

---

### 题目 2
```javascript
const jsonString = '{"city":"北京","population":2154}';
// 将JSON字符串反序列化为JavaScript对象
```

---

### 题目 3
```javascript
const user = {
  name: "李四",
  age: 30,
  hobbies: ["篮球", "音乐"],
  address: { city: "上海", district: "浦东新区" }
};
// 序列化对象，并获取序列化后的字符串长度
```

---

### 题目 4
```javascript
const data = '{"product":"手机","price":3999,"inStock":true}';
// 反序列化后，检查产品是否在库存中（inStock为true）
```

---

### 题目 5
```javascript
const student = {
  name: "王五",
  scores: { math: 95, english: 88, science: 92 }
};
// 序列化对象，然后反序列化回来，获取数学成绩
```

---

### 题目 6
```javascript
const jsonArray = '[{"id":1,"name":"A"},{"id":2,"name":"B"}]';
// 反序列化JSON数组，获取第二个元素的name属性
```

---

### 题目 7
```javascript
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retry: 3
};
// 序列化配置对象，然后替换timeout值为10000，再反序列化
```

---

### 题目 8
```javascript
const invalidJson = '{name:"赵六", age:28}';
// 尝试反序列化，处理可能的语法错误（使用try-catch）
```

---

### 题目 9
```javascript
const product = {
  id: 101,
  name: "笔记本电脑",
  price: 5999,
  features: ["8GB RAM", "256GB SSD", "Intel i5"]
};
// 序列化时排除features属性
```

---

### 题目 10
```javascript
const nestedData = {
  user: {
    profile: {
      personal: { firstName: "陈", lastName: "小明" }
    }
  }
};
// 深度序列化，然后修改lastName为"大明"，再反序列化
```

---

### 题目 11
```javascript
const jsonWithDates = '{"event":"会议","date":"2024-03-20T10:00:00Z"}';
// 反序列化，将date字符串转换为Date对象
```

---

### 题目 12
```javascript
const complexObj = {
  nullValue: null,
  undefinedValue: undefined,
  functionValue: function() { return "test"; }
};
// 序列化对象，观察哪些值会被忽略
```

---

### 题目 13
```javascript
const jsonString = '{"a":1,"b":2,"c":3}';
// 使用reviver函数在反序列化时将所有的值乘以2
```

---

### 题目 14
```javascript
const circularReference = { name: "循环引用" };
circularReference.self = circularReference;
// 尝试序列化循环引用对象，处理错误
```

---

### 题目 15
```javascript
const data = [
  { id: 1, value: "第一项" },
  { id: 2, value: "第二项" },
  { id: 3, value: "第三项" }
];
// 序列化数组，然后反序列化并过滤出id为偶数的项
```

---

### 题目 16
```javascript
const settings = {
  theme: "dark",
  language: "zh-CN",
  notifications: true
};
// 序列化到localStorage，然后从localStorage读取并反序列化
```

---

### 题目 17
```javascript
const jsonWithSpaces = '  { "name" : "测试" , "value" : 123 }  ';
// 反序列化带有额外空格的JSON字符串
```

---

### 题目 18
```javascript
const template = '{"username":"%name%","age":%age%}';
const name = "张三";
const age = 25;
// 使用模板字符串创建有效的JSON，然后反序列化
```

---

### 题目 19
```javascript
const partialJson = '{"complete":false, "data":';
// 尝试解析不完整的JSON字符串，处理错误
```

---

### 题目 20
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
// 序列化两个对象，合并它们的JSON字符串，然后反序列化合并后的对象