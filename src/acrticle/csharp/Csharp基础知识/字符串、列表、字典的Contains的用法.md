---
title: C#的字符串、列表、字典的Contains的用法
icon: code
order: 12
category:
tag:
  - C#基础
  - Contains
---

# C#的字符串、列表、字典的Contains的用法

在C#中，`Contains`方法是一个非常常用的方法，用于判断某个集合或字符串中是否包含指定的元素或子字符串。本文将详细介绍字符串、列表和字典中Contains方法的使用方法。

---

## 1. 字符串的Contains方法

### 1.1 基本用法

字符串的`Contains`方法用于判断字符串中是否包含指定的子字符串。

```csharp
string text = "Hello World";

bool result1 = text.Contains("World");  // 返回 true
bool result2 = text.Contains("world");  // 返回 false（区分大小写）
bool result3 = text.Contains("Python"); // 返回 false
```

---

## 2. 列表的Contains方法

### 2.1 基本用法

列表的`Contains`方法用于判断列表中是否包含指定的元素。

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

bool result1 = numbers.Contains(3);  // 返回 true
bool result2 = numbers.Contains(10); // 返回 false
```

### 2.2 字符串列表

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Orange" };

bool result1 = fruits.Contains("Apple");   // 返回 true
bool result2 = fruits.Contains("apple");   // 返回 false（区分大小写）
bool result3 = fruits.Contains("Grape");  // 返回 false
```

---

## 3. 字典的Contains方法

字典没有直接的`Contains`方法，而是提供了`ContainsKey`和`ContainsValue`两个方法。

### 3.1 ContainsKey方法

判断字典中是否包含指定的键。

```csharp
Dictionary<int, string> dictionary = new Dictionary<int, string>
{
    { 1, "One" },
    { 2, "Two" },
    { 3, "Three" }
};

bool result1 = dictionary.ContainsKey(1);  // 返回 true
bool result2 = dictionary.ContainsKey(4);  // 返回 false
```

### 3.2 ContainsValue方法

判断字典中是否包含指定的值。

```csharp
Dictionary<int, string> dictionary = new Dictionary<int, string>
{
    { 1, "One" },
    { 2, "Two" },
    { 3, "Three" }
};

bool result1 = dictionary.ContainsValue("Two");   // 返回 true
bool result2 = dictionary.ContainsValue("Four");  // 返回 false
```

### 3.3 实际应用示例

```csharp
Dictionary<string, int> scores = new Dictionary<string, int>
{
    { "张三", 85 },
    { "李四", 92 },
    { "王五", 78 }
};

if (scores.ContainsKey("张三"))
{
    int score = scores["张三"];
    Console.WriteLine($"张三的成绩是：{score}");
}

if (scores.ContainsValue(90))
{
    Console.WriteLine("有人的成绩是90分");
}
```

---

## 4. 综合示例

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // 字符串Contains示例
        string message = "欢迎使用C#编程";
        Console.WriteLine($"字符串包含'C#'：{message.Contains("C#")}");

        // 列表Contains示例
        List<int> numbers = new List<int> { 10, 20, 30, 40, 50 };
        Console.WriteLine($"列表包含30：{numbers.Contains(30)}");

        // 字典Contains示例
        Dictionary<string, int> ages = new Dictionary<string, int>
        {
            { "张三", 25 },
            { "李四", 30 },
            { "王五", 28 }
        };
        Console.WriteLine($"字典包含键'李四'：{ages.ContainsKey("李四")}");
        Console.WriteLine($"字典包含值30：{ages.ContainsValue(30)}");
    }
}
```

---

## 5. 总结

| 类型 | 方法 | 用途 | 时间复杂度 |
|------|------|------|------------|
| 字符串 | Contains() | 判断是否包含子字符串 | O(n) |
| 列表 | Contains() | 判断是否包含元素 | O(n) |
| 字典 | ContainsKey() | 判断是否包含键 | O(1) |
| 字典 | ContainsValue() | 判断是否包含值 | O(n) |
