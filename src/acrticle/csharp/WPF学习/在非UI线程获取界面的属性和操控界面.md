---
title: 在非UI线程获取界面的属性和操控界面
icon: code
order: 11
category:
  - C#学习
tag:
  - WPF
  - 非UI线程
---

# 在非UI线程获取界面的属性和操控界面

## View与UI线程的关系

`view.xaml.cs`本身就是UI线程的一部分。

## 访问主窗口的两种方式

`Application.Current.MainWindow`相当于`view.xaml.cs`的`this`，都可以访问主窗口。

以下代码是等价的：

```csharp
// 使用 this
// 以下代码在 MainWindow.xaml.cs 中：
this.WindowState = WindowState.Minimized;

// 使用 Application.Current.MainWindow
// 在MainWindowViewModel(非UI线程)中：
Application.Current.MainWindow.WindowState = WindowState.Minimized;
```

## 使用Dispatcher操作UI线程

`Application.Current.Dispatcher.Invoke`和`Application.Current.Dispatcher.BeginInvoke`提供的是一个非UI线程可以操控UI的作用。

以下代码是等价的：

```csharp
// 以下代码在 MainWindow.xaml.cs 中：
this.DragMove();  // 直接调用（隐含UI线程）

// 在MainWindowViewModel(非UI线程)中：
Application.Current.Dispatcher.Invoke(() => {
    Application.Current.MainWindow.DragMove();
});
```

## 命名空间的使用

- `using System.Windows.Controls`用于创建控件和获取、操控控件的元素（属性）
- `using System.Windows.Input`用于响应用户交互，可以获取到关于事件的参数，如鼠标的点击、具体的键盘值

因此，ViewModel一般只引入`using System.Windows.Input`，因为控件不能直接操作UI，只能通过绑定UI的属性进行修改。