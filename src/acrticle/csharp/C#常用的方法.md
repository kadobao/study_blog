---
title: C#常用的方法
icon: code
order: 19
category:
  - C#学习
tag:
  - 常用方法
---

## 打印当前日期

```csharp
TimeText = DateTime.Now.ToString("D"); // D相当于yyyy-MM-dd
```

## 打印当前时间

```csharp
TimeText = DateTime.Now.ToString("T"); // T相当于HH:mm:ss
```

## 打印当前日期和时间

```csharp
TimeText = DateTime.Now.ToString("G"); // G相当于yyyy-MM-dd HH:mm:ss
```

## 打印当前日期和时间（ISO 8601 格式）

例如: 2023-10-15T14:30:45.1234567Z

```csharp
// 打印当前日期和时间
TimeText = DateTime.Now.ToString("o"); // o相当于yyyy-MM-ddTHH:mm:ss.fffffffZ
```

## 将文本复制到剪贴板

```csharp
Clipboard.SetText(TimeText);
```

## Prism 中通知 UI 更新

当 ViewModel 中的属性值发生变化时，通过 RaisePropertyChanged 方法通知 UI 界面更新

```csharp
private string _timeText;
public string TimeText
{
    get { return _timeText; }
    set { SetProperty(ref _timeText, value); }
}

// 添加这行代码来通知UI更新
RaisePropertyChanged(nameof(TimeText));
```

## EF 和 Prism 结合查询数据表记录数

```csharp
int rowCount = context.Products.Count();
```

## 使用 StringBuilder 拼接字符串

可以更高效地拼接字符串，避免频繁创建新的字符串对象。

```csharp
StringBuilder sb = new StringBuilder();  // SELECT * FROM jobs WHERE NOT degree = '本科';

sb.Append("SELECT * FROM jobs WHERE NOT degree = '本科';");

string query = sb.ToString();
```

## 打印返回类型是 json 格式的数据

```csharp
using Newtonsoft.Json;

// 直接打印响应的完整内容
if (response != null)
{
    Console.WriteLine("\n=== 完整响应内容 ===");

    // 使用JSON序列化打印所有属性
    try
    {
        var json = JsonConvert.SerializeObject(response, Formatting.Indented);
        Console.WriteLine($"JSON格式:\n{json}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"JSON序列化失败: {ex.Message}");
    }
}
```

## 测量代码执行时间

```csharp
using System.Diagnostics;

// 创建并启动 Stopwatch
var stopwatch = Stopwatch.StartNew();

// 消耗时间的代码
Thread.Sleep(100);

// 停止计时
stopwatch.Stop();

// 输出耗时（单位：毫秒）
Console.WriteLine($"执行耗时: {stopwatch.ElapsedMilliseconds} 毫秒");
```

## 判断白晚班

```csharp
using System;

// 获取当前小时（24小时制）
int currentHour = DateTime.Now.Hour;

// 判断班次
int shift = (currentHour >= 8 && currentHour < 20) ? 0 : 1;

Console.WriteLine(shift == 0 ? "当前是白班" : "当前是晚班");
```

## 使用 True 和 False 实现第一次立即执行，第二次延时 10min

```csharp
bool isFirstRun = true;

while (true)
{
    if (isFirstRun)
    {
        // 第一次立即执行的代码
        Console.WriteLine("第一次立即执行");
        isFirstRun = false;
    }
    else
    {
        // 第二次延时10分钟执行的代码
        Console.WriteLine("第二次延时10分钟执行");
        Thread.Sleep(TimeSpan.FromMinutes(10));
        // await Task.Delay(TimeSpan.FromMinutes(60));
    }
}
```

## 获取字典中所有键名的列表

```csharp
List<string> keyList = Dictionary.Keys.ToList();
```

## 检查字典中是否包含指定的键

返回一个布尔值

```csharp
bool containsKey = Dictionary.ContainsKey(key);
```

## 打印字典

```csharp
using Newtonsoft.Json;

Console.WriteLine(JsonConvert.SerializeObject(myDict, Formatting.Indented));
```

## 打印列表

```csharp
Console.WriteLine(string.Join(", ", myList));
```

## 检测字符串是否包含指定的子字符串

返回一个布尔值

```csharp
bool containsSubstring = myString.Contains("substring");
```

## 判断传入的时间是否为当前班次

```csharp
private bool IsInCurrentShift(DateTime targetTime)
{
    // 获取当前时间
    DateTime now = DateTime.Now;
    // 定义班次开始和结束时间
    DateTime shiftStart, shiftEnd;

    // 判断当前时间处于哪个班次
    if (now.Hour >= 8 && now.Hour < 20)
    {
        // 白班：8:00 - 20:00
        shiftStart = now.Date.AddHours(8);
        shiftEnd = now.Date.AddHours(20);
    }
    else
    {
        // 晚班：20:00 - 次日8:00
        if (now.Hour >= 20)
        {
            // 当前时间在20:00之后，晚班刚开始
            shiftStart = now.Date.AddHours(20);
            shiftEnd = now.Date.AddDays(1).AddHours(8);
        }
        else
        {
            // 当前时间在8:00之前，晚班还未结束（跨天）
            shiftStart = now.Date.AddDays(-1).AddHours(20);
            shiftEnd = now.Date.AddHours(8);
        }
    }
    // 判断目标时间是否在当前班次范围内（左闭右开区间）
    return targetTime >= shiftStart && targetTime < shiftEnd;
}
```

## 获取运行程序的文件路径

```csharp
string currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
```

## 读取 json 文件数据并赋值给字典

```csharp
// 获取运行程序的文件路径
string currentDirectory = AppDomain.CurrentDomain.BaseDirectory;

// 组合文件路径
string filePath = Path.Combine(currentDirectory, "repair_nodes.json");

if (File.Exists(filePath))
{
    // 读取文件内容
    string json = await File.ReadAllTextAsync(filePath);
    // 反序列化JSON字符串为字典
    var loadedDictionary = JsonConvert.DeserializeObject<Dictionary<string, long>>(json);
    if (loadedDictionary != null)
    {
        _repairNodes.repairNodes = loadedDictionary;
        _nodeTimestamps = loadedDictionary;
        _loggingService.Info("MyBackgroundService.LoadRepairNodesFromJsonAsync函数", $"成功从repair_nodes.json文件加载了{_repairNodes.repairNodes.Count}条维修节点记录");
    }
}
else
{
    // 序列化字典为JSON字符串
    string json = JsonConvert.SerializeObject(_repairNodes.repairNodes, Formatting.Indented);
    // 写入文件，如果文件不存在则创建
    await File.WriteAllTextAsync(filePath, json);
    _loggingService.Info("MyBackgroundService.LoadRepairNodesFromJsonAsync函数", $"repair_nodes.json文件不存在, 已创建新文件");
}
```

## 将字符串全部转换为小写进行比较

```csharp
string str1 = "Hello";
string str2 = "hello";

bool areEqual = str1.ToLower() == str2.ToLower();
```

## 堵塞异步操作 1min

```csharp
await Task.Delay(TimeSpan.FromMinutes(1));
```

## 每隔 10min 执行一次（使用不堵塞的方式）

```csharp
// 每15分钟重新订阅所有节点
if (DateTime.Now.Minute % 15 == 0)
{

}
```

## 字典赋值

```csharp
scores["Alice"] = 95;   // 如果 "Alice" 不存在，就添加；如果存在，就覆盖
scores["Bob"] = 88;
```

## 字典取值

```csharp
int aliceScore = scores["Alice"];
int bobScore = scores["Bob"];
```

## 在 foreach 循环中取字典指定的键值

要使用 .value[]，编程要大胆试错，现在有 AI 可以纠错

## 列表赋值

```csharp
List<int> numbers = new List<int> {};

numbers.Add(1);
numbers.Add(2);
numbers.Add(3);
```

## 列表取值

```csharp
int firstNumber = numbers[0];  // 1
int secondNumber = numbers[1]; // 2
```

## 获取当天 0 时 0 分 0 秒和 23 时 59 分 59 秒的时间并转换为时间戳

单位: 毫秒

```csharp
// 1. 获取本地当天的 00:00:00
DateTime startOfDay = DateTime.Today; // 本地时间，00:00:00

// 2. 获取本地当天的 23:59:59
DateTime endOfDay = DateTime.Today.AddDays(1).AddSeconds(-1); // 即 23:59:59

// 3. 转换为 Unix 时间戳（毫秒）
DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

long timestampStart = (long)(startOfDay.ToUniversalTime() - unixEpoch).TotalMilliseconds;
long timestampEnd   = (long)(endOfDay.ToUniversalTime()   - unixEpoch).TotalMilliseconds;

// 输出结果
Console.WriteLine($"开始时间戳: {timestampStart}");
Console.WriteLine($"结束时间戳: {timestampEnd}");
```

## 网络请求获取到的数据是对象字典

字典多层嵌套的第二层是 object，一个方法就是使用 foreach 循环，另一个方法是使用 `as` 关键字进行转换

假设网络请求返回的数据结构如下：

```json
{
  "Body": {
    "Data": {
      "formDataList": [
        {
          "id": 1,
          "name": "表单1",
          "fields": {
            "field1": "值1",
            "field2": "值2"
          }
        },
        {
          "id": 2,
          "name": "表单2",
          "fields": {
            "field1": "值3",
            "field2": "值4"
          }
        }
      ]
    }
  }
}
```

使用 foreach 循环处理：

```csharp
var formDataList = response.Body.Data;

foreach (var formData in formDataList["formDataList"])
{
    var id = formData["id"];
    Console.WriteLine($"id: {id}");
    var name = formData["name"];
    Console.WriteLine($"name: {name}");
    var fields = formData["fields"] as Dictionary<string, object>;
    Console.WriteLine($"fields: {JsonConvert.SerializeObject(fields)}");
}
```

## 处理 JObject 和 Dictionary&lt;string, object&gt; 的区别

假设网络请求返回的数据结构如下：

```json
{
  "device_id": "DEV001",
  "field_data": {
    "temperature": "25.5",
    "status": "online",
    "tags": ["sensor", "room1"]
  }
}
```

返回的 `response` 进行了序列化（比如请求用的是 `httpClient.GetStringAsync` 方法）：使用 `JsonConvert.DeserializeObject<JObject>` 方法进行转换，将其转换为 `JObject` 对象；或者使用 `JsonConvert.DeserializeObject<Dictionary<string, object>>` 方法将其转换为 `Dictionary<string, object>` 字典。

处理 JObject：

```csharp
// 处理JObject
var jObject = deviceInfo["field_data"] as Newtonsoft.Json.Linq.JObject;
var fieldData = jObject?.ToObject<Dictionary<string, object>>();
```

处理 Dictionary&lt;string, object&gt;：

```csharp
// 处理Dictionary<string, object>
var fieldData = deviceInfo["field_data"] as Dictionary<string, object>;
```

## ToObject&lt;T&gt;() 方法说明

ToObject&lt;T&gt;() 是 Newtonsoft.Json（Json.NET）库中 JToken 类的一个扩展方法，它的核心作用是：

```csharp
将一个 JToken（比如 JObject、JArray、JValue）安全地转换为指定的 .NET 类型 T。
```

## 字符串常用方法

### Substring(startIndex, length)

截取指定位置和长度的子串

### IndexOf("xxx")

找某个子串第一次出现的位置

### LastIndexOf("xxx")

找最后一次出现的位置

### StartsWith("xxx") / EndsWith("xxx")

判断开头或结尾是否匹配

### 获取字符串的一部分

```csharp
string nodeId = "车间A.生产线1.设备001";
var deviceName = nodeId.Substring(0, nodeId.LastIndexOf('.'));
Console.WriteLine(deviceName);
```

**说明：**

- `LastIndexOf('.')` 找到最后一个 `.` 的位置（索引）
- `Substring(0, index)` 表示从开头截取到不包含该索引位置的子串
