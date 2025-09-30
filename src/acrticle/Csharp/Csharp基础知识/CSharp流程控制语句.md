---
title: C#流程控制语句
icon: code
order: 3
category:
  - C#学习
tag:
  - C#基础
---




# C# 流程控制语句详解

## 概述

流程控制语句是编程语言中用于控制代码执行顺序的关键部分。C# 提供了多种流程控制结构，用于实现条件判断、循环执行和异常处理等逻辑。

---

## 1. If-Else 条件语句

**描述**：根据条件的真假来执行不同的代码块。

### 基本用法
```csharp
int score = 85;

if (score >= 90)
{
    Console.WriteLine("优秀");
}
else if (score >= 60)
{
    Console.WriteLine("及格");
}
else
{
    Console.WriteLine("不及格");
}
```

### 常用操作

```csharp
// 嵌套 If
bool isLoggedIn = true;
bool isAdmin = false;

if (isLoggedIn)
{
    Console.WriteLine("用户已登录");
    if (isAdmin)
    {
        Console.WriteLine("欢迎管理员");
    }
    else
    {
        Console.WriteLine("欢迎普通用户");
    }
}
else
{
    Console.WriteLine("请先登录");
}

// 三元运算符 (简化版 If-Else)
int a = 10;
int b = 20;
int max = (a > b) ? a : b; // 如果 a > b 为真，则返回 a，否则返回 b
Console.WriteLine($"最大值是: {max}"); // 输出 "最大值是: 20"
```

---

## 2. For 循环

**描述**：在满足指定条件时，重复执行一段代码。通常用于已知循环次数的场景。

### 基本用法
```csharp
// 从 0 循环到 4，共 5 次
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"当前数字是: {i}");
}
```

### 常用操作
```csharp
// 遍历数组
int[] numbers = { 10, 20, 30, 40, 50 };
for (int i = 0; i < numbers.Length; i++)
{
    Console.WriteLine($"索引 {i} 的值为: {numbers[i]}");
}

// 嵌套 For 循环 (打印九九乘法表)
for (int i = 1; i <= 9; i++)
{
    for (int j = 1; j <= i; j++)
    {
        Console.Write($"{j} * {i} = {i * j}\t");
    }
    Console.WriteLine(); // 换行
}

// break 和 continue
for (int i = 0; i < 10; i++)
{
    if (i == 5)
    {
        break; // 当 i 等于 5 时，立即终止循环
    }
    if (i % 2 == 0)
    {
        continue; // 当 i 是偶数时，跳过本次循环的剩余部分，进入下一次循环
    }
    Console.WriteLine(i); // 只会打印 1, 3
}
```

---

## 3. Foreach 循环

**描述**：用于遍历集合（如数组、列表、字典等）中的每个元素。代码更简洁，可读性更高。

### 基本用法
```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Cherry" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

### 常用操作
```csharp
// 遍历字典
Dictionary<string, string> capitals = new Dictionary<string, string>
{
    {"中国", "北京"},
    {"美国", "华盛顿"},
    {"英国", "伦敦"}
};

foreach (KeyValuePair<string, string> entry in capitals)
{
    Console.WriteLine($"国家: {entry.Key}, 首都: {entry.Value}");
}

// 遍历字符串中的字符
string message = "Hello";
foreach (char c in message)
{
    Console.WriteLine(c);
}
```

---

## 4. While 循环

**描述**：只要指定条件为真，就重复执行代码块。适用于循环次数未知的场景。

### 基本用法
```csharp
int count = 0;
while (count < 5)
{
    Console.WriteLine($"当前计数: {count}");
    count++;
}
```


---

## 5. Try-Catch 异常处理

**描述**：用于捕获和处理代码在运行时可能发生的错误（异常），以防止程序崩溃。

### 基本用法
```csharp
try
{
    // 可能会抛出异常的代码
    int zero = 0;
    int result = 10 / zero; // 这将引发 DivideByZeroException
    Console.WriteLine(result);
}
catch (DivideByZeroException ex)
{
    // 捕获特定类型的异常
    Console.WriteLine("错误：不能除以零。");
    Console.WriteLine($"异常信息: {ex.Message}");
}
catch (Exception ex)
{
    // 捕获所有其他类型的异常 (通常放在最后)
    Console.WriteLine("发生了一个未知错误。");
    Console.WriteLine($"异常信息: {ex.Message}");
}
```

### `finally` 和 `throw`
**描述**：`finally` 块中的代码无论是否发生异常都会执行，通常用于资源释放。`throw` 用于手动抛出异常。

```csharp
FileStream file = null;
try
{
    file = new FileStream("path/to/file.txt", FileMode.Open);
    // ... 文件操作 ...

    // 手动抛出异常
    throw new InvalidOperationException("操作无效");
}
catch (FileNotFoundException ex)
{
    Console.WriteLine("文件未找到。");
}
catch (Exception ex)
{
    Console.WriteLine($"捕获到异常: {ex.Message}");
    // 重新抛出异常，让上层调用者处理
    throw;
}
finally
{
    // 确保文件句柄被关闭，即使发生异常
    if (file != null)
    {
        file.Close();
        Console.WriteLine("文件已关闭。");
    }
}
```

---

## 总结

### 选择合适的循环

- **`for`**：当你明确知道需要循环多少次时（例如，遍历数组的索引）。
- **`foreach`**：当你需要遍历一个集合(List、Array、Dictionary等)中的所有元素，而不需要关心索引时。代码最简洁。
- **`while`**：当循环的次数不确定，取决于某个条件是否满足时。
- **`do-while`**：与 `while` 类似，但需要确保循环体至少执行一次。

::: tip `foreach` 比 `for` 对比

**`foreach`** 比 **`for`** 更常用

:::

### 异常处理的重要性

- **健壮性**：使用 `try-catch` 可以防止程序因意外错误而中断，提高应用程序的稳定性。
- **资源管理**：`finally` 块确保重要的清理代码（如关闭文件、释放网络连接）总能被执行。
- **调试**：捕获的异常信息（如 `ex.Message`, `ex.StackTrace`）是定位和修复问题的关键线索。