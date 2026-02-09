---
title: C#的字典
icon: code
order: 11
category:
tag:
  - C#基础
---

# C# 字典 (Dictionary) 基础知识

## 1. 字典遍历基础

### 1.1 foreach 循环遍历字典

在 `foreach (var x in dictionary)` 中，x 是 `KeyValuePair` 类型，所以要访问内容就必须用 `x.Key` 和 `x.Value`。

### 1.2 字典类型判断

判断一个变量是否是字典，看内部的元素是否是键值对的形式。

## 2. 实际应用示例

### 2.1 嵌套字典遍历

```csharp
var instanceNodes = new List<string>();

// 使用 foreach 循环遍历 devicesData 字典
foreach (var device in devicesData)
{
    // 使用 foreach 循环遍历 device.Value 字典
    foreach (var status in device.Value)
    {
        // 如果状态键为 "InstanceNode"，则将状态值添加到 instanceNodes 列表中
        if (status.Key == "InstanceNode")
        {
            instanceNodes.Add(status.Value.ToString());
        }
    }
}

_loggingService.Info("MyBackgroundService.ExecuteAsync函数", $"Count: {instanceNodes.Count}");
```

## 3. 字典常用操作

### 3.1 获取字典中所有键名的列表

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // 创建一个字典
        Dictionary<string, int> ages = new Dictionary<string, int>
        {
            { "Alice", 30 },
            { "Bob", 25 },
            { "Charlie", 35 }
        };

        // 获取所有键名（Key）的列表
        List<string> keyList = ages.Keys.ToList();

        // 输出键名列表
        Console.WriteLine("字典中的键名列表：");
        foreach (string key in keyList)
        {
            Console.WriteLine(key);
        }
    }
}
```

### 3.2 常用字典操作方法

| 操作 | 方法 | 说明 |
|------|------|------|
| 获取所有键 | `dictionary.Keys.ToList()` | 返回包含字典中所有键的集合 |
| 获取所有值 | `dictionary.Values.ToList()` | 返回包含字典中所有值的集合 |
| 检查键是否存在 | `dictionary.ContainsKey(key)` | 返回布尔值，表示键是否存在于字典中 |
| 检查值是否存在 | `dictionary.ContainsValue(value)` | 返回布尔值，表示值是否存在于字典中 |
| 获取键对应值 | `dictionary.TryGetValue(key, out value)` | 安全获取键对应的值，不会抛出异常 |
