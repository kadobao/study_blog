---
title: C#字符串插值
icon: code
order: 8
category:
  - C#学习
tag:
  - C#基础
---

# C# 的 $（字符串插值）

在 C# 中，以 `$` 为前缀的字符串称为**插值字符串**。

## 基本语法

```csharp
$"这是一个字符串 {变量名} 和 {表达式}"
```

## 示例

```csharp
string name = "Bob";
int age = 25;
double height = 1.80;

// 使用 $ 字符串插值
string message = $"你好，我是 {name}，今年 {age} 岁。明年我就 {age + 1} 岁了。";
Console.WriteLine(message);
// 输出：你好，我是 Bob，今年 25 岁。明年我就 26 岁了。

// 同样支持格式规范，语法略有不同
string info = $"姓名：{name}，身高：{height:F2} 米";
Console.WriteLine(info);
// 输出：姓名：Bob，身高：1.80 米
```
