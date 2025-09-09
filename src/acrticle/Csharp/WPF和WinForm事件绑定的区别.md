---
title: WPF和WinForm事件绑定的区别
icon: code
order: 5
category:
  - C#学习
tag:
  - WPF
  - WinForm
---



# WPF 和 WinForms 事件绑定机制对比

## 一、WPF 中的 Click 事件绑定

### 1. 基本Click绑定方式

```xml
<Button Click="Button_Click" Content="Click Me"/>
```

对应的代码后端：
```csharp
private void Button_Click(object sender, RoutedEventArgs e)
{
    MessageBox.Show("Button was clicked!");
}
```

- 功能：实现最简单的按钮点击事件处理
- 结构：
  - XAML中通过`Click="事件处理方法名"`属性绑定事件
  - 代码后端中定义对应的事件处理方法
  - 事件处理方法接收`object sender`和`RoutedEventArgs e`参数
- 特点：
  - 类似于WinForms的事件处理机制
  - 直接在XAML中绑定事件处理方法
  - 适合简单的事件处理场景

## 二、WPF 中的 Command 绑定

### 1. ViewModel 实现

```csharp
using Prism.Commands;
using Prism.Mvvm;

public class MainViewModel : BindableBase
{
    public DelegateCommand<string> ClickCommand { get; }

    public MainViewModel()
    {
        ClickCommand = new DelegateCommand<string>(ExecuteClick);
    }

    private void ExecuteClick(string parameter)
    {
        System.Windows.MessageBox.Show($"按钮被点击了！参数是：{parameter}");
    }
}
```

- 功能：实现MVVM模式下的命令绑定
- 结构：
  - 继承`BindableBase`基类实现属性通知
  - 定义`DelegateCommand<T>`类型的公共属性
  - 在构造函数中初始化Command并绑定执行方法
  - 执行方法接收Command传递的参数
- 特点：
  - 符合MVVM设计模式
  - 支持参数传递
  - 便于单元测试
  - 可以实现命令的启用/禁用逻辑

### 2. XAML 视图绑定

```xml
<Button Command="{Binding ClickCommand}" CommandParameter="这是传递的参数" Content="点击我" Width="100" Height="30"/>
```

- 功能：在XAML中将UI元素绑定到ViewModel中的命令
- 结构：
  - `Command="{Binding ClickCommand}"`：绑定到ViewModel中的命令属性
  - `CommandParameter="参数值"`：设置要传递的参数
- 实现步骤：
  1. 在ViewModel类中添加Prism.Commands命名空间引用
  2. 在ViewModel中定义一个DelegateCommand类型的公共属性
  3. 在ViewModel的构造函数中初始化该Command，绑定到对应的执行方法
  4. 在XAML视图中，找到需要绑定命令的UI元素（如按钮、单选按钮）
  5. 在UI元素上添加Command="{Binding 定义好的DelegateCommand类型的公共属性}"
  6. 如需传递参数，再添加CommandParameter="参数值"

## 三、WinForms 的事件绑定

### 1. 传统事件驱动模型

```csharp
Button button = new Button();
button.Text = "Click Me";
button.Click += Button_Click;

private void Button_Click(object sender, EventArgs e)
{
    MessageBox.Show("Button was clicked!");
}
```

- 功能：实现WinForms中的按钮点击事件处理
- 结构：
  - 创建Button控件实例
  - 设置控件属性（如Text）
  - 使用`+=`运算符订阅事件
  - 定义事件处理方法

::: tip WinForms事件绑定方式

1. 设计时绑定：在设计器中直接双击控件自动生成事件处理方法
2. 代码中绑定：使用 `+=` 运算符手动订阅事件

:::