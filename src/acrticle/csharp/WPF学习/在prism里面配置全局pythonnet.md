---
title: 在prism里面配置全局pythonnet
icon: code
order: 13
category:
  - C#学习
tag:
  - WPF
  - Prism
  - pythonnet
---

# 在Prism中配置全局Python.NET

本文将介绍如何在Prism框架的WPF应用程序中配置全局Python.NET (pythonnet)，以便在整个应用程序中使用Python功能。

## 初始化Python引擎

首先需要在 `App.xaml.cs` 文件中导入Python.NET命名空间：

```csharp
using Python.Runtime; // 引入 Python.NET 命名空间
```

然后在 `App.xaml.cs` 文件中添加以下两个函数：

### 初始化函数

```csharp
// 初始化 Python 引擎
private void InitializePythonEngine()
{
    try
    {
        // 配置 Python 路径
        Runtime.PythonDLL = @"C:\Users\XJ\AppData\Local\Programs\Python\Python310\python310.dll";
        PythonEngine.PythonHome = @"C:\Users\XJ\AppData\Local\Programs\Python\Python310";

        // 初始化 Python 引擎
        if (!PythonEngine.IsInitialized)
        {
            PythonEngine.Initialize();
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show($"Python 引擎初始化失败: {ex.Message}", "错误", MessageBoxButton.OK, MessageBoxImage.Error);
    }
}
```

### 应用程序退出处理

```csharp
// 重写 OnExit 方法，在应用程序退出时关闭 Python 引擎
protected override void OnExit(ExitEventArgs e)
{
    try
    {
        // 在应用程序退出时关闭 Python 引擎
        if (PythonEngine.IsInitialized)
        {
            PythonEngine.Shutdown();
        }
    }
    catch (Exception ex)
    {
        // 忽略关闭时的异常
        System.Diagnostics.Debug.WriteLine($"关闭 Python 引擎时出错: {ex.Message}");
    }
    
    base.OnExit(e);
}
```

## 调用初始化函数

最后，在 `App.xaml.cs` 文件的构造函数中调用 `InitializePythonEngine` 函数：

```csharp
protected override Window CreateShell()
{
    // 初始化 Python 引擎
    InitializePythonEngine();
    
    // 使用Prism容器解析并返回MainWindow实例
    return Container.Resolve<MainWindow>();   // 这个决定了MainWindow是应用程序的主窗口
}
```

## 在ViewModel中使用Python.NET

完成以上配置后，就可以在ViewModel文件中使用Python.NET了，例如：

```csharp
// 处理文件拖放事件
private void OnFileDropped(DragEventArgs e)
{
    if (e.Data.GetDataPresent(DataFormats.FileDrop))
    {
        string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);
        if (files.Length > 0)
        {
            DroppedFilePath = files[0];

            // 调用Python模块的示例代码
            using (Py.GIL()) // Py.GIL()充当的是锁的作用确保全局唯一，获取Python全局解释器锁，using语句确保在使用后自动释放GIL
            {
                try
                {
                    dynamic sys = Py.Import("sys");
                    // dynamic io = Py.Import("io");
                    
                    sys.path.append(@"C:\Users\XJ\Desktop\test\XJ\Backend\Python\Get_Project_File_Structure\");
                    
                    // // 重定向标准输出到StringIO对象
                    // dynamic stdout_backup = sys.stdout;
                    // dynamic captured_output = io.StringIO();
                    // sys.stdout = captured_output;
                    
                    // 调用Python模块和函数
                    dynamic helloModule = Py.Import("Get_File_Structure");
                    dynamic source_dir = @"D:\XJ\Customer_Development\XJ\SRC\SMESServices\user_information_get_C";
                    dynamic result = helloModule.get_project_file_structure(source_dir);
                    // 在WPF应用程序中， Console.WriteLine 默认不会显示在Visual Studio的"输出"窗口中
                    System.Diagnostics.Debug.WriteLine($"Python模块调用成功！\nPython函数返回值: {result}");
                    
                    // // 恢复标准输出并获取捕获的输出
                    // sys.stdout = stdout_backup;
                    // string pythonOutput = captured_output.getvalue().ToString();
                    
                    // // 显示捕获的Python输出
                    // MessageBox.Show($"Python模块调用成功！\nPython输出: {pythonOutput}\n文件路径: {DroppedFilePath}");
                }
                catch (PythonException ex)
                {
                    MessageBox.Show($"Python执行错误: {ex.Message}");
                    MessageBox.Show($"Python异常详情: {ex.StackTrace}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"其他错误: {ex.Message}");
                }
            } // GIL 释放
            
            // 弹窗显示文件路径
            MessageBox.Show($"文件已拖放！\n文件路径: {DroppedFilePath}", 
                            "文件拖放成功", 
                            MessageBoxButton.OK, 
                            MessageBoxImage.Information);
        }
    }
    
    // 完成拖放后重置视觉效果 - 取消注释这部分代码
    IsDragOver = false;
    DragString = "拖放文件夹或者点击选择文件夹";
    e.Handled = true;
}
```