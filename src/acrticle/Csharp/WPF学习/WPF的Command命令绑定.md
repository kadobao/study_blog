---
title: WPF的Command命令绑定
icon: code
order: 9
category:
  - C#学习
tag:
  - WPF
  - Command绑定
---



# WPF MVVM 命令使用指南

## 1. DelegateCommand 的使用场景

`DelegateCommand` 的作用是为**内置 Command 属性**的控件提供命令绑定能力。

### View 层写法 (XAML)
```xml
<!-- 直接绑定ViewModel中的命令 -->
<Button Content="导航到PLC页面" 
        Command="{Binding NavigateCommand}"
        CommandParameter="PLC"/>
```

### ViewModel 层写法
```csharp
using Prism.Commands;
using Prism.Regions;

public class MainWindowViewModel
{
    private readonly IRegionManager _regionManager;
    
    // 声明命令 - 带字符串参数
    public DelegateCommand<string> NavigateCommand { get; }

    public MainWindowViewModel(IRegionManager regionManager)
    {
        _regionManager = regionManager;
        
        // 初始化导航命令，将导航方法绑定到命令
        NavigateCommand = new DelegateCommand<string>(Navigate);

        // 延迟导航到首页，确保Region已经初始化
        Application.Current.Dispatcher.BeginInvoke(new Action(() =>
        {
            Navigate("PLC"); // 自动导航到初始页面
        }), DispatcherPriority.Loaded);
    }

    // 导航方法
    private void Navigate(string viewName)
    {
        if (!string.IsNullOrEmpty(viewName))
        {
            // ContentRegion是Region的名称，用于指定导航区域
            // viewName是要导航到的视图的名称
            _regionManager.RequestNavigate("ContentRegion", viewName);
        }
    }
}
```

---

## 2. InvokeCommandAction 的使用场景

`InvokeCommandAction` 的作用是为**没有内置 Command 属性**的控件提供命令绑定能力。

### 2.1 绑定事件 (EventTrigger)

**场景：** 当 TextBox 文本改变时执行命令

```xml
<TextBox Text="{Binding InputText, UpdateSourceTrigger=PropertyChanged}">
    <i:Interaction.Triggers>
        <!-- 当TextBox的TextChanged事件触发时 -->
        <i:EventTrigger EventName="TextChanged">
            <!-- 调用ViewModel中的TextChangedCommand命令 -->
            <prism:InvokeCommandAction Command="{Binding TextChangedCommand}"/>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</TextBox>
```

### 2.2 绑定快捷键 (KeyTrigger)

**场景：** 在 TextBox 中按 Enter 键执行命令

```xml
<TextBox Text="{Binding InputText, UpdateSourceTrigger=PropertyChanged}">
    <i:Interaction.Triggers>
        <!-- 当按下Enter键时触发 -->
        <i:KeyTrigger Key="Enter">
            <!-- 调用处理文本的命令 -->
            <prism:InvokeCommandAction Command="{Binding ProcessTextCommand}"/>
        </i:KeyTrigger>
    </i:Interaction.Triggers>
</TextBox>
```

---

## 3. ViewModel 中的命令实现

### 3.1 基本命令模式

```csharp
public class TextProcessingViewModel
{
    // 声明命令
    public DelegateCommand TextChangedCommand { get; private set; }
    public DelegateCommand ProcessTextCommand { get; private set; }

    // 绑定属性
    private string _inputText;
    public string InputText
    {
        get => _inputText;
        set => SetProperty(ref _inputText, value);
    }

    public TextProcessingViewModel()
    {
        // 初始化命令
        TextChangedCommand = new DelegateCommand(OnTextChanged);
        ProcessTextCommand = new DelegateCommand(ProcessText);
    }

    // 文本改变处理方法
    private void OnTextChanged()
    {
        // 处理文本变化逻辑
        Debug.WriteLine($"文本已改变: {InputText}");
    }

    // 处理文本命令
    private void ProcessText()
    {
        if (!string.IsNullOrEmpty(InputText))
        {
            // 处理输入文本的逻辑
            Debug.WriteLine($"处理文本: {InputText}");
            InputText = string.Empty; // 清除输入框
        }
    }
}
```


<!-- ### 3.2 XAML中使用带参数的命令

```xml
<TextBox Text="{Binding InputText}">
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="KeyDown">
            <prism:InvokeCommandAction Command="{Binding KeyDownCommand}"
                                     PassEventArgsToCommand="True"/>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</TextBox>
```



### 3.3 带参数的命令示例

```csharp
// ViewModel中声明带参数的命令
public DelegateCommand<KeyEventArgs> KeyDownCommand { get; private set; }

// 在构造函数中初始化
KeyDownCommand = new DelegateCommand<KeyEventArgs>(OnKeyDown);

// 处理方法
private void OnKeyDown(KeyEventArgs e)
{
    // 处理按键逻辑
    if (e.Key == Key.Escape)
    {
        InputText = string.Empty; // 按ESC键清空文本框
        e.Handled = true;
    }
}
``` -->


---

## 4. 关键概念总结

### 4.1 DelegateCommand
- **作用：** 在 ViewModel 中封装业务逻辑为可绑定的命令
- **优势：** 避免在视图后台代码中直接写事件处理逻辑
- **使用场景：** 按钮点击、菜单操作等有内置 Command 属性的控件

### 4.2 InvokeCommandAction
- **作用：** 为没有 Command 属性的控件提供命令绑定能力
- **两种用法：**
  - `EventTrigger` - 绑定事件到命令
  - `KeyTrigger` - 绑定快捷键到命令

### 4.3 命令参数传递
- 使用 `CommandParameter` 传递简单参数
- 使用 `TriggerParameterPath="EventArgs"` 传递事件详细信息
- 在 ViewModel 中使用泛型 `DelegateCommand<T>` 接收参数

<!-- `TriggerParameterPath`：一个布尔开关，决定是否将整个事件参数对象传递给命令。

`PassEventArgsToCommand`：一个路径字符串，允许你精确指定要传递事件参数中的哪个属性。 -->



---

## 5. 必要命名空间引用

在 XAML 文件中需要引用以下命名空间：

```xml
xmlns:prism="http://prismlibrary.com/"
xmlns:i="http://schemas.microsoft.com/xaml/behaviors"
```


这种模式确保了良好的代码分离，View 只负责 UI 展示，ViewModel 负责业务逻辑，符合 MVVM 设计原则。

::: tip 相同点

相同点：`ViewModel`部分都是按照以下步骤使用`DelegateCommand`：

1. 定义一个`DelegateCommand`命令属性
2. 编写一个处理业务逻辑的函数
3. 将函数绑定到命令上

:::
