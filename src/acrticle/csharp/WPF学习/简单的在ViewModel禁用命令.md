---
title: 简单的在ViewModel禁用命令
icon: code
order: 14
category:
  - C#学习
tag:
  - WPF
  - Command
  - 禁用
---

# 简单的在ViewModel禁用命令

## 核心思想

核心思想就是定义一个bool变量加上if，在命令的最外行加上if。

## 实现步骤

### 1. 定义Bool变量

先定义一个bool变量，这样你就可以在其他地方设置它来禁用命令。

```csharp
// 添加标志控制是否处理鼠标离开事件
private bool _ignoreMouseLeave = false;
public bool IgnoreMouseLeave
{
    get { return _ignoreMouseLeave; }
    set { SetProperty(ref _ignoreMouseLeave, value); }
}
```

### 2. 在事件中添加判断

在事件最外层加上if判断。

```csharp
// 处理鼠标离开事件
private void OnMouseLeave()
{
    if (!IgnoreMouseLeave)
    {
        DragString = "拖放文件夹或者点击选择文件夹";
    }
}
```



## 一、图片说明

![简单的在ViewModel禁用命令](/assets/images/简单的在ViewModel禁用命令.png)