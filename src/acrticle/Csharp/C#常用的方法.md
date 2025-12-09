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