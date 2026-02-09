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

### 2. JsonConvert.DeserializeObject() - 反序列化

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

## 3. JObject.Parse() - 动态解析的详细示例

```csharp
using Newtonsoft.Json.Linq;

string json = @"{
  ""Company"": ""腾讯"",
  ""CTO"": {
    ""Name"": ""张小龙"",
    ""Age"": 54,
    ""Dept"": ""微信事业群""
  }
}";

// 1. 解析整个 JSON 为 JObject
JObject root = JObject.Parse(json);

// 2. 从 JObject 取值 → 得到的都是 JToken！
JToken companyToken = root["Company"]; // 实际是 JValue（字符串）
JToken ctoToken = root["CTO"]; // root["CTO"]实际是 JObject(Newtonsoft.Json的json类型)（因为 CTO 是 json）

// 3. 如果只是读字符串，直接转 string（不需要 JObject！）
string company = (string)companyToken; // ✅ 正确：用 (string)
Console.WriteLine($"公司: {company}"); // 输出: 公司: 腾讯

// 4. 但如果想把 CTO 当作对象来操作（比如读它的属性、加字段），就必须把 JToken 转成 JObject！
// 当这个 JToken 代表一个 JSON 对象（{}），而你需要把它当作 JObject 来操作时，才需要用 (JObject) 转换。
JObject ctoObject = (JObject)ctoToken; // 👈 这里用到了 (JObject)！

// 现在可以像操作普通 JObject 一样操作它：
string name = (string)ctoObject["Name"];
int age = (int)ctoObject["Age"];
Console.WriteLine($"{name}, {age}岁"); // 输出: 张小龙, 54岁

// 也可以
JObject Cto_Object = (JObject)root["CTO"];

// 还可以添加新属性（只有 JObject 支持）：
ctoObject["Email"] = "zhangxiaolong@tencent.com";

// 验证是否成功：JToken和JObject都可以直接打印，但是当这个 JToken 代表一个 JSON 对象（{}），并且你需要把它当作 对象 来操作时，才需要用 (JObject) 转换。
Console.WriteLine(root["CTO"]["Email"]); // 输出: zhangxiaolong@tencent.com
```

### JObject 和 JToken 的区别

- **JToken**: 是 Newtonsoft.Json 库中所有 JSON 值的基类，可以表示任何 JSON 数据类型（对象、数组、字符串、数字等）
- **JObject**: 继承自 JToken，专门用于表示 JSON 对象（键值对集合）

### 使用场景

1. **只需要读取简单值**：直接使用 `(string)` 或 `(int)` 等类型转换
2. **需要操作 JSON 对象**：将 JToken 转换为 JObject 后进行操作
3. **需要添加/修改属性**：必须使用 JObject，因为只有 JObject 支持添加新属性
