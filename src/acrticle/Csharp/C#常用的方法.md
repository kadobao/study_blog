---
title: C#常用的方法
icon: code
order: 19
category:
  - C#学习
tag:
  - 常用方法
---



打印当前日期：
```csharp
TimeText = DateTime.Now.ToString("D"); // D相当于yyyy-MM-dd
```



打印当前时间：
```csharp
TimeText = DateTime.Now.ToString("T"); // T相当于HH:mm:ss
```

打印当前日期和时间：
```csharp
TimeText = DateTime.Now.ToString("G"); // G相当于yyyy-MM-dd HH:mm:ss
```



将文本复制到剪贴板：
```csharp
Clipboard.SetText(TimeText);
```



prism里面：当ViewModel中的属性值发生变化时，通过RaisePropertyChanged方法通知UI界面更新
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


EF和prism结合里面：查询数据表一共多少条记录
```csharp
int rowCount = context.Products.Count();
```


使用`StringBuilder`类可以更高效地拼接字符串，避免频繁创建新的字符串对象。
```csharp
StringBuilder sb = new StringBuilder();  // SELECT * FROM jobs WHERE NOT degree = '本科';

sb.Append("SELECT * FROM jobs WHERE NOT degree = '本科';");

string query = sb.ToString();
```



打印返回类型是`json`格式的数据
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


测量执行一个代码，需要消耗的时间
```Csharp
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




判断白晚班
```csharp
using System;

// 获取当前小时（24小时制）
int currentHour = DateTime.Now.Hour;

// 判断班次
int shift = (currentHour >= 8 && currentHour < 20) ? 0 : 1;

Console.WriteLine(shift == 0 ? "当前是白班" : "当前是晚班");
```


使用`True`和`False`实现第一次立即执行，第二次延时10min
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


获取字典中所有键名的列表
```Csharp
List<string> keyList = Dictionary.Keys.ToList();
```


检查字典中是否包含指定的键（key），返回一个布尔值
```Csharp
bool containsKey = Dictionary.ContainsKey(key);
```


打印字典
```Csharp
using Newtonsoft.Json;

Console.WriteLine(JsonConvert.SerializeObject(myDict, Formatting.Indented));
``` 


打印列表
```Csharp
Console.WriteLine(string.Join(", ", myList));
``` 


检测字符串是否包含指定的子字符串，返回一个布尔值
```Csharp
bool containsSubstring = myString.Contains("substring");
```



判断传入的时间是否为当前班次：
```Csharp
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



获取运行程序的文件路径
```Csharp
string currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
```


读取`json`文件数据，然后赋值给字典
```Csharp
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



将字符串全部转换为小写进行比较
```Csharp
string str1 = "Hello";
string str2 = "hello";

bool areEqual = str1.ToLower() == str2.ToLower();
```



堵塞异步操作1min
```Csharp
await Task.Delay(TimeSpan.FromMinutes(1));
```



每隔10min执行一次(使用不堵塞的方式执行)
```Csharp
// 每15分钟重新订阅所有节点
if (DateTime.Now.Minute % 15 == 0)
{
    
}
``` 



字典赋值：
```Csharp
scores["Alice"] = 95;   // 如果 "Alice" 不存在，就添加；如果存在，就覆盖
scores["Bob"] = 88;
```


字典取值
```Csharp
int aliceScore = scores["Alice"];  
int bobScore = scores["Bob"];
```


在foreach循环里面取字典指定的键值要使用.value[]，编程要大胆试错，现在有AI可以纠错