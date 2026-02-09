---
title: view.xaml.cs和viewmodel同时修改一个属性
icon: code
order: 10
category:
  - C#学习
tag:
  - WPF
  - 属性
---

# View.xaml.cs和ViewModel同时修改一个属性

本文将介绍如何在View.xaml.cs和ViewModel中同时修改一个属性，并确保UI能够正确更新。

## 实现步骤

### 1. 在ViewModel中创建属性

首先，在ViewModel中创建需要绑定的属性。我们使用Prism的`BindableBase`基类来简化属性更改通知：

```csharp
public class MainWindowViewModel : BindableBase
{
    private double _menuButtonHeight = 55; // 私有字段存储实际值
    
    public double MenuButtonHeight
    {
        get => _menuButtonHeight;
        set => SetProperty(ref _menuButtonHeight, value); // SetProperty会自动通知UI更新
    }
}
```

### 2. 在View.xaml.cs中获取ViewModel的引用

在View的代码隐藏文件中，我们需要获取ViewModel的引用，以便可以直接操作它：

```csharp
public partial class MainWindow : Window
{
    private MainWindowViewModel _viewModel; // 存储ViewModel引用
    
    public MainWindow()
    {
        InitializeComponent();
        
        // 在构造函数中获取ViewModel引用
        if (DataContext is MainWindowViewModel vm)
        {
            _viewModel = vm;
        }
    }
}
```

### 3. 在View.xaml.cs中修改ViewModel的属性

现在，我们可以在View的事件处理程序中直接修改ViewModel的属性：

```csharp
private void SomeEventHandler(object sender, RoutedEventArgs e)
{
    // 直接通过引用修改ViewModel的属性
    if (_viewModel != null)
    {
        _viewModel.MenuButtonHeight = 35; // 这会自动更新UI
    }
}
```

### 4. 在ViewModel中修改自己的属性

同样，ViewModel内部的方法也可以修改属性：

```csharp
public void SomeMethod()
{
    MenuButtonHeight = 55; // 直接修改，SetProperty会处理通知
}
```

### 5. 在XAML中绑定属性到UI元素

最后，在XAML中将属性绑定到UI元素：

```xml
<StackPanel MinHeight="{Binding MenuButtonHeight}" />
```

注意：确保在XAML中使用`prism:ViewModelLocator.AutoWireViewModel="True"`来自动关联View和ViewModel：

```xml
<Window x:Class="YourNamespace.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:prism="http://prismlibrary.com/"
        prism:ViewModelLocator.AutoWireViewModel="True">
    <!-- Your content here -->
</Window>
```

## 总结

通过以上步骤，我们实现了在View.xaml.cs和ViewModel中同时修改属性的功能。关键点包括：

1. 使用Prism的`BindableBase`和`SetProperty`方法实现属性更改通知
2. 在`View.xaml.cs`中获取`ViewModel`的引用
3. 正确设置XAML中的数据绑定
4. 无论是从View还是ViewModel修改属性，UI都会自动更新