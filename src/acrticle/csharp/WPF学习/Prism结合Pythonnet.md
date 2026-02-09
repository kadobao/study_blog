---
title: Prism结合Pythonnet
icon: code
order: 18
category:
  - C#学习
tag:
  - Prism
  - Pythonnet
---

# Prism结合Pythonnet完整指南

在C# WPF应用中集成Python代码可以扩展应用程序的功能，利用Python丰富的库生态系统。本文将详细介绍如何在Prism框架中集成Python.NET。

## 步骤1：安装Python.NET

首先，需要安装`pythonnet`包，它提供了在.NET中调用Python的功能：

```bash
Install-Package pythonnet
```

## 步骤2：配置Python环境

在调用Python代码之前，需要正确配置Python环境。

### 2.1 查找Python解释器路径

使用以下命令查找Python解释器的安装路径：

```bash
C:\Users\XJ>where python
C:\Users\XJ\AppData\Local\Programs\Python\Python310\python.exe
C:\Users\XJ\AppData\Local\Microsoft\WindowsApps\python.exe
```

### 2.2 确认Python DLL文件

进入Python安装目录查看DLL文件：

```bash
C:\Users\XJ\AppData\Local\Programs\Python\Python310>dir
 驱动器 C 中的卷是 OS
 卷的序列号是 82DD-6BF9

 C:\Users\XJ\AppData\Local\Programs\Python\Python310 的目录

2025-08-05  07:52    <DIR>          .
2025-08-05  07:52    <DIR>          ..
2025-08-05  07:52    <DIR>          DLLs
2025-08-05  07:52    <DIR>          Doc
2025-08-05  07:52    <DIR>          include
2025-08-05  07:52    <DIR>          Lib
2025-08-05  07:52    <DIR>          libs
2023-04-05  00:47            32,768 LICENSE.txt
2023-04-05  00:48         1,306,983 NEWS.txt
2023-04-05  00:47           103,192 python.exe
2023-04-05  00:47            66,328 python3.dll
2023-04-05  00:47         4,458,776 python310.dll
2023-04-05  00:47           101,656 pythonw.exe
2025-08-19  14:07    <DIR>          Scripts
2025-08-05  07:52    <DIR>          tcl
2025-08-05  07:52    <DIR>          Tools
2023-04-05  00:47            98,224 vcruntime140.dll
2023-04-05  00:47            37,256 vcruntime140_1.dll
               8 个文件      6,205,183 字节
              10 个目录 212,126,916,608 可用字节
```

其中`python310.dll`就是Python解释器DLL。

## 步骤3：创建Python服务类

在`Services`文件夹中创建`PythonService.cs`文件：

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Python.Runtime; // 引入 Python.NET 命名空间
using System.Windows; // 引入 MessageBox 命名空间

namespace WPF的MVVM模式的Prism框架.Services
{
    public class PythonService
    {
        public PythonService()
        {
            InitializePythonEngine();
        }

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

        // 执行Python代码的通用方法，由服务管理GIL
        public T ExecutePythonCode<T>(Func<T> pythonCode)
        {
            using (Py.GIL()) // 在服务中管理GIL，全局锁定
            {
                return pythonCode();
            }
        }

        // 执行Python代码的通用方法（无返回值）
        public void ExecutePythonCode(Action pythonCode)
        {
            using (Py.GIL()) // 在服务中管理GIL，全局锁定
            {
                pythonCode();
            }
        }
    }
}
```

## 步骤4：在Prism中注册Python服务

在 `App.xaml.cs` 中注册 `PythonService` 为单例：

```csharp
using Prism.Ioc;
using WPF的MVVM模式的Prism框架.Services;

namespace WPF的MVVM模式的Prism框架
{
    public partial class App
    {
        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            // 注册 Python 服务为单例
            containerRegistry.RegisterSingleton<PythonService>();
        }
    }
}
```

## 步骤5：在ViewModel中使用Python服务

在需要调用Python代码的ViewModel中，通过构造函数注入 `PythonService`：

```csharp
using System.Windows;
using Prism.Ioc;
using Prism.Unity;
using WPF的MVVM模式的Prism框架.Views;
using WPF的MVVM模式的Prism框架.ViewModels;
using WPF的MVVM模式的Prism框架.Services;
using Python.Runtime; // 引入 Python.NET 命名空间

namespace WPF的MVVM模式的Prism框架.ViewModels
{
    public class MainWindowViewModel : BindableBase
    {
        private readonly PythonService _pythonService;

        public MainWindowViewModel(PythonService pythonService)
        {
            _pythonService = pythonService;
        }

        // 处理文件夹选择对话框
        private async void OnOpenFolderDialog()
        {
            // 设置对话框已打开标志
            IsDialogOpened = true;
            
            // 设置忽略鼠标离开事件
            IgnoreMouseLeave = true;
            DragString = "选择文件夹";

            // 使用异步操作让UI有机会更新
            await Task.Delay(100);

            // 创建一个OpenFileDialog，但将其配置为选择文件夹
            // 使用 WindowsAPICodePack 的 CommonOpenFileDialog
            var dialog = new Microsoft.WindowsAPICodePack.Dialogs.CommonOpenFileDialog
            {
                IsFolderPicker = true,   // 仅选择文件夹
                Title = "选择文件夹",
                EnsurePathExists = true    // 确保路径存在
            };

            if (dialog.ShowDialog() == Microsoft.WindowsAPICodePack.Dialogs.CommonFileDialogResult.Ok)
            {
                string selectedPath = dialog.FileName;
                DroppedFilePath = selectedPath;
                
                // 调用Python模块的示例代码 - 通过PythonService执行
                try
                {
                    _pythonService.ExecutePythonCode(() =>
                    {
                        dynamic sys = Py.Import("sys");
                        
                        sys.path.append(@"C:\Users\XJ\Desktop\test\XJ\Backend\Python\Get_Project_File_Structure\");
                        
                        // 调用Python模块和函数
                        dynamic helloModule = Py.Import("Get_File_Structure");
                        dynamic source_dir = selectedPath; // 使用选择的文件夹路径
                        dynamic result = helloModule.get_project_file_structure(source_dir);
                        
                        System.Diagnostics.Debug.WriteLine($"Python模块调用成功！\nPython函数返回值: {result}");
                        MessageBox.Show($"Python模块调用成功！\nPython函数返回值: {result}");
                    });
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
                
                // 弹窗显示选择的文件夹路径
                MessageBox.Show($"文件夹已选择！\n文件夹路径: {selectedPath}", 
                              "文件夹选择成功", 
                              MessageBoxButton.OK, 
                              MessageBoxImage.Information);
            }
            
            // 恢复处理鼠标离开事件
            IgnoreMouseLeave = false;
            DragString = "拖放文件夹或者点击选择文件夹";
            
            // 延迟重置对话框标志，确保动画效果有时间显示
            // await Task.Delay(500);
            IsDialogOpened = false;
        }
    }
}
```

## 总结

通过以上步骤，我们成功地在Prism框架中集成了Python.NET，实现了C#调用Python代码的功能。主要步骤包括：

1. 安装Python.NET包
2. 配置Python环境路径
3. 创建Python服务类管理Python引擎
4. 在Prism中注册服务
5. 在ViewModel中注入并使用服务

这种方式的优势在于：
- 使用依赖注入模式，符合Prism框架的设计理念
- 通过服务类统一管理Python引擎的生命周期
- 提供了异常处理机制，确保应用稳定性
- 使用GIL（全局解释器锁）管理，确保线程安全