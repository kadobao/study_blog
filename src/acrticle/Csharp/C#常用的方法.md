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
