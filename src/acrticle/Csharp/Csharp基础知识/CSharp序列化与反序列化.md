---
title: C#序列化与反序列化
icon: code
order: 5
category:
  - C#学习
tag:
  - C#基础
---



# C# 序列化与反序列化

序列化和反序列化是编程中常见的概念：
- **序列化(Serialization)**: 将对象转换为可以存储或传输的格式（通常是字符串）
- **反序列化(Deserialization)**: 将序列化后的字符串转换回原始对象(C# 是强类型语言，必须先定义类，然后才能创建对象（实例）)

在 C# 中，主要通过 `Newtonsoft.Json` 库实现。

## 核心方法

### 1. JsonConvert.SerializeObject() - 序列化

```csharp
// C# 是强类型语言，必须先定义类，然后才能创建对象（实例）
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string[] Hobbies { get; set; }
}

// 创建对象并序列化
// var 是类型推断，编译器知道 person 的类型是 Person
var person = new Person
{
    Name = "张三",
    Age = 30,
    Hobbies = new[] { "阅读", "游泳" }
};

string jsonString = JsonConvert.SerializeObject(person);
Console.WriteLine(jsonString);
// 输出: {"Name":"张三","Age":30,"Hobbies":["阅读","游泳"]}
```

### 2. JsonConvert.DeserializeObject`&lt;T&gt;`() - 反序列化

**T 表示泛型类型参数**，指定要将 JSON 反序列化为什么类型的对象。

```csharp
string jsonString = "{\"Name\":\"张三\",\"Age\":30}";
Person person = JsonConvert.DeserializeObject<Person>(jsonString);
Console.WriteLine(person.Name); // 输出: 张三
```

### 3. JObject.Parse() - 动态解析

当不需要完整对象时，可以使用动态解析：

```csharp
using Newtonsoft.Json.Linq;

string jsonString = "{\"Name\":\"张三\",\"Age\":30}";
JObject jObject = JObject.Parse(jsonString);
Console.WriteLine($"姓名: {jObject["Name"]}"); // 输出: 姓名: 张三
```

## 总结

C# 中的序列化和反序列化主要通过：
- `JsonConvert.SerializeObject()` - 序列化
- `JsonConvert.DeserializeObject<T>()` - 强类型反序列化
- `JObject.Parse()` - 动态解析