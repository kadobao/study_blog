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



使用`StringBuilder`类可以更高效地拼接字符串，避免频繁创建新的字符串对象。
```csharp
StringBuilder sb = new StringBuilder();  // SELECT * FROM jobs WHERE NOT degree = '本科';

sb.Append("SELECT * FROM jobs WHERE NOT degree = '本科';");

string query = sb.ToString();
```