---
title: C#的三元表达式和空合并运算符
icon: code
order: 14
category:
tag:
  - C#基础
  - 运算符
---

# C#的三元表达式和空合并运算符

在C#中,三元表达式(`?:`)和空合并运算符(`??`)是两个非常实用的运算符,可以帮助我们简化代码,提高代码的可读性。本文将详细介绍这两个运算符的使用方法。

---

## 1. 三元表达式 (`?:`)

### 1.1 基本语法

三元表达式是基于布尔条件来选择两个值中的一个,语法格式为:

```csharp
条件 ? 值A : 值B
```

如果条件为 `true`,返回值A;如果条件为 `false`,返回值B。

### 1.2 基本用法示例

```csharp
int age = 18;
string result = age >= 18 ? "成年人" : "未成年人";
Console.WriteLine(result);  // 输出: 成年人
```

### 1.3 实际应用场景

#### 1.3.1 简单的条件赋值

```csharp
int score = 85;
string grade = score >= 60 ? "及格" : "不及格";
Console.WriteLine(grade);  // 输出: 及格
```

---

## 2. 空合并运算符 (??)

### 2.1 基本语法

空合并运算符专门用于处理 `null` 值,语法格式为:

```csharp
值A ?? 值B
```

如果值A不为 `null`,返回值A;如果值A为 `null`,返回值B(默认值)。

### 2.2 基本用法示例

```csharp
string name = null;
string displayName = name ?? "匿名用户";
Console.WriteLine(displayName);  // 输出: 匿名用户

string city = "北京";
string displayCity = city ?? "未知城市";
Console.WriteLine(displayCity);  // 输出: 北京
```

### 2.3 实际应用场景

#### 2.3.1 提供默认值

```csharp
string userInput = null;
string processedInput = userInput ?? "默认值";
Console.WriteLine(processedInput);  // 输出: 默认值
```