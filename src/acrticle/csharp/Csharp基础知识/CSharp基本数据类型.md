---
title: C#基本数据类型
icon: code
order: 1
category:
  - C#学习
tag:
  - C#基础
---





# C# 基本数据类型详解

## 概述

C# 是静态类型语言，变量声明时必须指定数据类型。除了 `dynamic` 类型外，其他变量一旦声明后就不能改变数据类型。

---

## 1. 布尔类型 (bool)

**描述**：表示真或假的逻辑值

**取值**：`true` 或 `false`

### 基本用法
```csharp
bool isActive = true;
bool isCompleted = false;
```

### 常用方法和操作
```csharp
bool result1 = true;
bool result2 = false;

// 逻辑运算
bool and = result1 && result2;  // 逻辑与
bool or = result1 || result2;   // 逻辑或
bool not = !result1;            // 逻辑非

// 转换方法
string boolStr = result1.ToString();        // "True"
bool parsed = bool.Parse("true");           // true
bool.TryParse("false", out bool value);     // 安全解析

// 比较
bool equals = result1.Equals(result2);      // false
```

---

## 2. 整数类型 (int)

**描述**：表示32位有符号整数

**范围**：-2,147,483,648 到 2,147,483,647

### 基本用法
```csharp
int age = 25;
int temperature = -10;
```

### 常用方法和操作
```csharp
int number = 42;

// 基本运算
int sum = number + 10;          // 52
int difference = number - 5;    // 37
int product = number * 2;       // 84
int quotient = number / 2;      // 21
int remainder = number % 5;     // 2

// 转换方法
string numStr = number.ToString();          // "42"
int parsed = int.Parse("123");              // 123
int.TryParse("456", out int result);        // 安全解析
```

---

## 3. 字符串类型 (string)

**描述**：表示Unicode字符序列

**特性**：引用类型，不可变

### 基本用法
```csharp
string name = "张三";
string message = "Hello World";
string empty = string.Empty;
```

### 常用方法和操作
```csharp
string text = "Hello World";

// 基本属性
int length = text.Length;                   // 11

// 字符串操作
string trimmed = "  hello  ".Trim();        // "hello"
string replaced = text.Replace("World", "C#"); // "Hello C#"

// 字符串查找
bool contains = text.Contains("Hello");     // true

// 字符串分割和连接
string[] parts = text.Split(' ');           // ["Hello", "World"]
string joined = string.Join("-", parts);    // "Hello-World"

// 字符串格式化
string interpolated = $"Hello {name}!";     // 字符串插值

// 切片
string sub = text.Substring(0, 5);          // "Hello"
```

## 字符串常用方法

### Substring(startIndex, length)

截取指定位置和长度的子串

```csharp
string text = "Hello World";
string sub = text.Substring(0, 5);  // "Hello"
string sub2 = text.Substring(6, 5); // "World"
```

### IndexOf("xxx")

找某个子串第一次出现的位置

```csharp
string text = "Hello World";
int index = text.IndexOf("World");  // 6
int index2 = text.IndexOf("o");      // 4
```

### LastIndexOf("xxx")

找最后一次出现的位置

```csharp
string text = "Hello World";
int lastIndex = text.LastIndexOf("o");  // 7
```

### StartsWith("xxx") / EndsWith("xxx")

判断开头或结尾是否匹配

```csharp
string text = "Hello World";
bool starts = text.StartsWith("Hello");  // true
bool ends = text.EndsWith("World");      // true
```

### 获取字符串的一部分

```csharp
string nodeId = "车间A.生产线1.设备001";
var deviceName = nodeId.Substring(0, nodeId.LastIndexOf('.'));
Console.WriteLine(deviceName);
```

**说明：**

- `LastIndexOf('.')` 找到最后一个 `.` 的位置（索引）
- `Substring(0, index)` 表示从开头截取到不包含该索引位置的子串
```

---

## 4. 数组类型 (Array)

**描述**：存储相同类型元素的固定长度集合

**特性**：引用类型，长度固定

### 基本用法
```csharp
// 声明和初始化
int[] numbers = new int[5];                 // 长度为5的数组
int[] values = {1, 2, 3, 4, 5};            // 初始化数组


// 声明和初始化
string[] numbers = new string[3];      // 长度为3的数组          
string[] values = {"Alice", "Bob", "Charlie"};    // 初始化数组


// 也可以直接声明和初始化
string[] names = new string[] {"Alice", "Bob", "Charlie"};


// 还可以编译器自动推断长度
string[] values = { "Alice", "Bob", "Charlie" }; 
```

### 常用方法和操作
```csharp
int[] array = {5, 2, 8, 1, 9};

// 基本属性
int length = array.Length;                  // 5

// 访问元素
int first = array[0];                       // 5
array[1] = 10;                             // 修改元素

// 遍历数组
foreach (int item in array)
{
    Console.WriteLine(item);
}
```

---

## 5. 列表类型 (List)

**描述**：动态大小的泛型集合，最常用的集合类型

**特性**：引用类型，可变长度

### 基本用法
```csharp
using System.Collections.Generic;

List<int> numbers = new List<int>();
List<string> names = new List<string> {"Alice", "Bob"};
```

### 常用方法和操作
```csharp
List<string> list = new List<string>();

// 添加元素
list.Add("Apple");                          // 添加单个元素
list.Insert(1, "Orange");                   // 在指定位置插入

// 访问元素
string first = list[0];                     // "Apple"
int count = list.Count;                     // 元素数量

// 查找元素
bool contains = list.Contains("Apple");     // 是否包含

// 删除元素
list.Remove("Orange");                      // 删除指定元素
list.Clear();                              // 清空列表

// 遍历
foreach (string item in list)
{
    Console.WriteLine(item);
}
```

---

## 6. 结构体类型 (struct)

**描述**：用于定义小型数据结构的值类型

**特性**：值类型，支持字段和方法

### 基本用法
```csharp
public struct Point
{
    public int X;
    public int Y;
    
    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
    
    public double Distance()
    {
        return Math.Sqrt(X * X + Y * Y);
    }
    
    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}
```

### 使用示例
```csharp
// 创建结构体实例
Point p1 = new Point(3, 4);
Point p2 = new Point();  // 默认值 (0, 0)

// 访问字段和方法
Console.WriteLine(p1.X);           // 3
Console.WriteLine(p1.Distance());  // 5
Console.WriteLine(p1.ToString());  // (3, 4)

// 结构体比较
bool equal = p1.Equals(p2);        // false
```

---

## 7. 枚举类型 (enum)

**描述**：用于定义命名常量集合，底层是整数类型

**特性**：值类型，增强代码可读性

### 基本用法
```csharp
public enum DayOfWeek
{
    Sunday,     // 0
    Monday,     // 1
    Tuesday,    // 2
    Wednesday,  // 3
    Thursday,   // 4
    Friday,     // 5
    Saturday    // 6
}

public enum Status
{
    Pending = 1,
    Approved = 2,
    Rejected = 3
}
```

### 常用方法和操作
```csharp
DayOfWeek today = DayOfWeek.Monday;

// 基本操作
string name = today.ToString();             // "Monday"
int value = (int)today;                     // 1

// 枚举方法
bool isDefined = Enum.IsDefined(typeof(DayOfWeek), "Monday"); // true
DayOfWeek parsed = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), "Friday");
Enum.TryParse("Saturday", out DayOfWeek result);

// 获取所有值
DayOfWeek[] allDays = (DayOfWeek[])Enum.GetValues(typeof(DayOfWeek));
string[] names = Enum.GetNames(typeof(DayOfWeek));

// 枚举比较
bool isWeekend = (today == DayOfWeek.Saturday || today == DayOfWeek.Sunday);
```

---

## 8. 元组类型 (Tuple)

**描述**：用于将多个值组合成一个复合值

**特性**：值类型，支持不同类型的元素

### 基本用法
```csharp
// 创建元组
(int, string) person = (25, "Alice");
var point = (X: 10, Y: 20);
Tuple<int, string, bool> data = Tuple.Create(1, "Hello", true);
```

### 常用方法和操作
```csharp
// 值元组 (推荐使用)
(int age, string name) person = (25, "Bob");

// 访问元素
Console.WriteLine(person.age);   // 25
Console.WriteLine(person.name);  // "Bob"

// 解构
(int a, string n) = person;
Console.WriteLine(a);            // 25

// 返回多个值的方法
public static (int min, int max) GetMinMax(int[] numbers)
{
    return (numbers.Min(), numbers.Max());
}

var (minimum, maximum) = GetMinMax(new[] {1, 5, 3, 9, 2});
```

---

## 9. 字典类型 (Dictionary<TKey, TValue>)

**描述**：存储键值对的集合，通过键快速访问值

**特性**：引用类型，键必须唯一

### 基本用法
```csharp
using System.Collections.Generic;

Dictionary<string, int> ages = new Dictionary<string, int>();
Dictionary<string, int> names = new Dictionary<string, int>
{
    {"Alice", 25},
    {"Bob", 30},
    {"Charlie", 35}
};
```

### 常用方法和操作
```csharp
Dictionary<string, int> dict = new Dictionary<string, int>
{
    {"Alice", 25},
    {"Bob", 30}
};

// 添加元素
dict["Charlie"] = 35;                       // 也可用于更新

// 访问元素
int age = dict["Alice"];                    // 25

// 检测是否存在指定的键或者值
bool hasKey = dict.ContainsKey("Charlie");  // false
bool hasValue = dict.ContainsValue(25);     // true

// 安全访问
if (dict.TryGetValue("Bob", out int bobAge))
{
    Console.WriteLine(bobAge);              // 30
}

// 删除元素
dict.Remove("Alice");                       // 删除指定键
dict.Clear();                              // 清空字典

// 遍历
foreach (KeyValuePair<string, int> kvp in dict)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}

// 只遍历键或值
foreach (string key in dict.Keys)
{
    Console.WriteLine(key);
}

foreach (int value in dict.Values)
{
    Console.WriteLine(value);
}
```

---

## 10. 动态类型 (dynamic)

**描述**：运行时确定类型的特殊类型

**特性**：绕过编译时类型检查，在运行时解析

### 基本用法
```csharp
dynamic value = 42;
value = "Hello";        // 可以改变类型
value = new { Name = "Alice", Age = 25 };
```

### 使用示例
```csharp
dynamic obj = new { Name = "Bob", Age = 30 };

// 动态访问属性
Console.WriteLine(obj.Name);    // "Bob"
Console.WriteLine(obj.Age);     // 30

// 动态方法调用
dynamic list = new List<string> {"A", "B", "C"};
list.Add("D");
Console.WriteLine(list.Count);  // 4

// 注意：dynamic类型失去编译时类型安全
// 以下代码编译通过，但运行时可能出错
// dynamic num = 10;
// string result = num.NonExistentMethod(); // 运行时异常
```

---

## 总结

### 值类型 vs 引用类型

**值类型**：`bool`, `int`, `struct`, `enum`, `tuple`
- 存储在栈上
- 直接包含数据
- 赋值时复制值

**引用类型**：`string`, `array`, `List<T>`, `Dictionary<TKey,TValue>`
- 存储在堆上
- 包含对数据的引用
- 赋值时复制引用

### 选择建议

- **固定长度集合**：使用 `Array`
- **动态长度集合**：使用 `List<T>`
- **键值对存储**：使用 `Dictionary<TKey,TValue>`
- **小型数据结构**：使用 `struct`
- **常量集合**：使用 `enum`
- **多个返回值**：使用 `tuple`
- **运行时类型确定**：谨慎使用 `dynamic`