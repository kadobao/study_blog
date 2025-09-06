---
title: C#类型系统与转换
icon: code
order: 2
category:
  - C#学习
tag:
  - C#基础
---


# C# 类型系统与转换详解

## 概述

C# 是一种强类型语言，它拥有一个统一的类型系统。所有类型，无论是预定义的还是用户定义的，都直接或间接地继承自唯一的根类型 `object`。这使得值类型和引用类型之间可以平滑转换，同时也提供了丰富的类型转换机制。

---

## 1. var - 隐式类型声明

**描述**：`var` 是 C# 3.0 引入的关键字，用于声明隐式类型的局部变量。编译器会根据变量的初始化表达式自动推断其确切类型。这可以简化代码，尤其是在处理复杂的泛型类型时。

**注意**：`var` 只是语法糖，变量的类型在编译时就已经确定，它仍然是静态类型的。

### 基本用法
```csharp
// 编译器会自动推断为 int
var number = 10;

// 编译器会自动推断为 string
var message = "Hello, World!";

// 编译器会自动推断为 List<string>
var names = new List<string> { "Alice", "Bob" };

// 编译错误：var 变量必须在声明时初始化
// var x;
```

---

## 2. object - 通用基类

**描述**：`object` 是 .NET 中所有类型的最终基类。任何类型的值都可以被赋给 `object` 类型的变量。这使得 `object` 成为一种通用的数据容器。

### 基本用法
```csharp
// 值类型可以赋值给 object
object obj1 = 10;
object obj2 = true;

// 引用类型也可以赋值给 object
object obj3 = "Hello";
object obj4 = new int[] { 1, 2, 3 };

// 可以用 object 数组存储不同类型的数据
object[] mixedArray = { 1, "world", false, 3.14 };
```

---

## 3. 装箱与拆箱 (Boxing & Unboxing)

**描述**：装箱和拆箱是值类型和引用类型之间进行转换的桥梁。

- **装箱 (Boxing)**：将值类型（如 `int`, `char`, `struct`）转换为 `object` 类型或其实现的任何接口类型的过程。装箱时，会在托管堆上分配一个新的对象，并将值类型的值复制到该对象中。
- **拆箱 (Unboxing)**：将 `object` 类型显式转换回其原始值类型的过程。拆箱需要进行类型检查，如果类型不匹配，则会抛出 `InvalidCastException`。

### 装箱示例
```csharp
int num = 100;       // 值类型，存储在栈上
object obj = num;    // 装箱操作：num 的值被复制到堆上的一个新对象中
```

### 拆箱示例
```csharp
object obj = 100;    // 已经装箱的 object
int num = (int)obj;  // 拆箱操作：将堆上对象的值复制回栈上的变量
                     // 必须显式转换为正确的类型

// 运行时错误：尝试将 object 拆箱为错误的类型
try
{
    long value = (long)obj; // 将抛出 InvalidCastException
}
catch (InvalidCastException ex)
{
    Console.WriteLine("拆箱失败：" + ex.Message);
}
```

---

## 4. 字符串与其他类型的转换

**描述**：在实际开发中，经常需要在字符串和其他数据类型之间进行转换，例如，从用户输入（字符串）解析出数值或日期。

### 基本用法

#### `ToString()` - 转换为字符串
几乎所有类型都提供了 `ToString()` 方法，用于将其值的文本表示形式转换为字符串。

```csharp
int number = 123;
string numStr = number.ToString(); // "123"

bool flag = true;
string boolStr = flag.ToString(); // "True"

DateTime now = DateTime.Now;
string dateStr = now.ToString("yyyy-MM-dd HH:mm:ss"); // "2023-10-27 15:30:00"
```

#### `Parse()` - 从字符串解析
许多基本类型都提供了静态的 `Parse()` 方法，用于将符合格式的字符串转换为该类型。如果字符串格式无效，会抛出 `FormatException`。

```csharp
string str1 = "456";
int parsedNum = int.Parse(str1); // 456

string str2 = "true";
bool parsedBool = bool.Parse(str2); // true

// 运行时错误：字符串格式不正确
try
{
    int invalidNum = int.Parse("abc"); // 将抛出 FormatException
}
catch (FormatException ex)
{
    Console.WriteLine("解析失败：" + ex.Message);
}
```

#### `TryParse()` - 更安全的解析
`TryParse()` 方法提供了一种更安全的转换方式。它尝试解析字符串，如果成功，则返回 `true` 并将结果存入 `out` 参数；如果失败，则返回 `false` 而不会抛出异常。

```csharp
string dateString = "2023-10-27 14:30:00";
DateTime parsedDate;

if (DateTime.TryParse(dateString, out parsedDate))
{
    Console.WriteLine($"转换成功: {parsedDate}");
    Console.WriteLine($"年份: {parsedDate.Year}");
}
else
{
    Console.WriteLine("转换失败：字符串格式无效。");
}

string numString = "789";
int result;
if (int.TryParse(numString, out result))
{
    Console.WriteLine($"成功解析为: {result}");
}
```

---

## 5. 获取变量的类型信息

**描述**：可以使用 `GetType()` 方法获取任何变量在运行时的确切类型。该方法返回一个 `Type` 对象，其中包含了类型的元数据信息。

### 基本用法
```csharp
int number = 10;
string text = "hello";
var list = new List<int>();

Console.WriteLine(number.GetType()); // System.Int32
Console.WriteLine(text.GetType());   // System.String
Console.WriteLine(list.GetType());   // System.Collections.Generic.List`1[System.Int32]

object obj = 50;
Console.WriteLine(obj.GetType());    // 即使变量是 object，GetType() 仍返回其真实的运行时类型：System.Int32
```

---

## 总结

### 关键概念回顾

- **`var`**：是编译时的语法糖，用于简化局部变量声明，但变量本身是强类型的。
- **`object`**：是所有类型的根，可以容纳任何数据，是实现装箱和多态性的基础。
- **装箱/拆箱**：是值类型与引用类型之间转换的底层机制，涉及性能开销，应谨慎使用。
- **类型转换**：`ToString()`、`Parse()` 和 `TryParse()` 是处理字符串与其他类型之间转换的常用工具，推荐优先使用 `TryParse()` 以提高代码的健壮性。
- **`GetType()`**：是在运行时动态获取对象类型信息的强大工具，常用于反射和泛型编程。