---
title: C#的列表
icon: code
order: 10
category:
tag:
  - C#基础
---

# C# 列表操作指南

## 使用 foreach 循环遍历对象列表并创建新的对象列表


```csharp
// 创建包含字典的列表
List<Dictionary<string, object>> listOfDictionaries = new List<Dictionary<string, object>>();

// 创建第一个字典并添加到列表
Dictionary<string, object> dict1 = new Dictionary<string, object>();
dict1.Add("Name", "张三");
dict1.Add("Age", 25);
dict1.Add("City", "北京");
listOfDictionaries.Add(dict1);

// 创建第二个字典并添加到列表
Dictionary<string, object> dict2 = new Dictionary<string, object>();
dict2.Add("Name", "李四");
dict2.Add("Age", 30);
dict2.Add("City", "上海");
listOfDictionaries.Add(dict2);

// 创建第三个字典（使用集合初始化器）
Dictionary<string, object> dict3 = new Dictionary<string, object>
{
    {"Name", "王五"},
    {"Age", 28},
    {"City", "广州"}
};
listOfDictionaries.Add(dict3);

// 创建第四个字典，包含空值
Dictionary<string, object> dict4 = new Dictionary<string, object>
{
    {"Name", ""},
    {"Age", ""},
    {"City", null}
};
listOfDictionaries.Add(dict4);

// 创建第五个字典，部分值为空
Dictionary<string, object> dict5 = new Dictionary<string, object>
{
    {"Name", ""},
    {"Age", 35},
    {"City", null}
};
listOfDictionaries.Add(dict5);

// 使用循环方法筛选
List<Dictionary<string, object>> newUnqualifiedDetails = new List<Dictionary<string, object>>();

foreach (var detail in listOfDictionaries)
{
    bool isEmpty = true;
    
    // 检查每个键值对是否有非空值
    foreach (var kvp in detail)
    {
        if (!string.IsNullOrEmpty(kvp.Value?.ToString()))   // 检查字典中的每个值，如果发现任何一个值不是null也不是空字符串，就标记该字典为非空并停止检查。
        {
            isEmpty = false;
            break;
        }
    }
    
    // 如果至少有一个键的值不为空，则添加到新数组
    if (!isEmpty)
    {
        newUnqualifiedDetails.Add(detail);
    }
}

// 输出结果
Console.WriteLine("原始列表中的字典数量: " + listOfDictionaries.Count);
Console.WriteLine("筛选后的字典数量: " + newUnqualifiedDetails.Count);

// 显示筛选结果
Console.WriteLine("\n筛选后的字典内容:");
for (int i = 0; i < newUnqualifiedDetails.Count; i++)
{
    Console.WriteLine($"字典 {i + 1}:");
    foreach (var kvp in newUnqualifiedDetails[i])
    {
        Console.WriteLine($"  {kvp.Key}: {kvp.Value ?? "null"}");    // ?? 是 空合并运算符（Null-coalescing operator），它的作用是：如果左边的值为 null，就返回右边的值；如果左边的值不为 null，就返回左边的值。
    }
    Console.WriteLine();
}
```





## 创建列表

```csharp
List<string> dldevices = new List<string>();
```

## 使用 foreach 筛选列表 - 检测字符串是否包含某个字符

```csharp
foreach (var deviceId in currentOnlineDevices)
{
    // 如果字符串包含`多列机`就添加到 dldevices
    if (deviceId.Contains("多列机"))
    {
        dldevices.Add(deviceId);
    }
}
```

## 使用 foreach 从列表中移除匹配项

```csharp
// 如果 currentOnlineDevices 包含`多列机`就移除
foreach (var deviceId in currentOnlineDevices)
{
    if (deviceId.Contains("多列机"))
    {
        currentOnlineDevices.Remove(deviceId);
    }
}
```

## 使用 RemoveAll 方法批量移除匹配项

```csharp
// 如果 currentOnlineDevices 包含`多列机`就移除
currentOnlineDevices.RemoveAll(deviceId => deviceId.Contains("多列机"));
```



## 字符串空值判断

`string.IsNullOrEmpty` 是 C# 中的一个静态方法，用于判断一个字符串是否为 null 或空字符串（""）。

```csharp
bool result = string.IsNullOrEmpty(value);
```


## 使用 LINQ 查询筛选列表

```csharp
List<string> ModbusTcpNodeNames = allNodeNames.Where(s => s.Contains("ModbusTcp")).ToList();
```
