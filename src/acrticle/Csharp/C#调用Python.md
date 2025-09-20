---
title: C#调用Python
icon: code
order: 7
category:
  - C#学习
tag:
  - C#
  - Python
---

# C#调用Python

在C#中调用Python代码可以扩展应用程序的功能，利用Python丰富的库生态系统。本文将介绍如何在C#项目中集成Python代码。

## 安装Python.NET

首先，需要安装`pythonnet`包，它提供了在.NET中调用Python的功能：

```bash
Install-Package pythonnet
```

## 配置Python环境

在调用Python代码之前，需要正确配置Python环境。

### 查找Python解释器路径

使用以下命令查找Python解释器的安装路径：

```bash
C:\Users\XJ>where python
C:\Users\XJ\AppData\Local\Programs\Python\Python310\python.exe
C:\Users\XJ\AppData\Local\Microsoft\WindowsApps\python.exe
```

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

## 基本调用示例

以下是一个简单的C#程序，演示如何调用Python模块：

```c#
using System;
using Python.Runtime; // 引入 Python.NET 命名空间

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            // 配置 Python 路径
            Runtime.PythonDLL = @"C:\Users\XJ\AppData\Local\Programs\Python\Python310\python310.dll";
            PythonEngine.PythonHome = @"C:\Users\XJ\AppData\Local\Programs\Python\Python310";

            // 初始化 Python 引擎
            PythonEngine.Initialize();

            // 调用Python模块的示例代码
            using (Py.GIL()) // 获取Python全局解释器锁
            {
                try
                {
                    dynamic sys = Py.Import("sys");
                    sys.path.append(@"C:\Users\XJ\Desktop\test\XJ\Backend\Python\test");
                    
                    dynamic helloModule = Py.Import("Hello_World");
                    Console.WriteLine("Python模块调用成功！");
                }
                catch (PythonException ex)
                {
                    Console.WriteLine($"Python执行错误: {ex.Message}");
                    Console.WriteLine($"Python异常详情: {ex.StackTrace}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"其他错误: {ex.Message}");
                }
            } // GIL 释放

            // +++ 关键步骤：程序结束前关闭引擎 +++
            try
            {
                PythonEngine.Shutdown();
            }
            catch (NotSupportedException ex)
            {
                Console.WriteLine($"Python引擎关闭时出现序列化警告: {ex.Message}");
                Console.WriteLine("这不会影响程序的主要功能，可以安全忽略。");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Python引擎关闭时出现其他错误: {ex.Message}");
            }
        }
    }
}
```

## 调用Python模块方法

以下示例展示了如何调用Python模块中的具体方法：

```c#
using System;
using Python.Runtime; // 引入 Python.NET 命名空间

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            // 配置 Python 路径
            Runtime.PythonDLL = @"C:\Users\XJ\AppData\Local\Programs\Python\Python310\python310.dll";
            PythonEngine.PythonHome = @"C:\Users\XJ\AppData\Local\Programs\Python\Python310";

            // 初始化 Python 引擎
            PythonEngine.Initialize();

            // 调用Python模块的示例代码
            using (Py.GIL()) // 获取Python全局解释器锁
            {
                try
                {
                    dynamic sys = Py.Import("sys");
                    sys.path.append(@"C:\Users\XJ\Desktop\test\XJ\Backend\Python\test");
                    
                    // 导入Python模块
                    dynamic helloModule = Py.Import("Hello_World");
                    Console.WriteLine("Python模块调用成功！");
                    
                    // 调用 hello_world() 方法
                    Console.WriteLine("调用 hello_world() 方法:");
                    helloModule.hello_world();
                    
                    // 调用 add(a, b) 方法
                    Console.WriteLine("调用 add(5, 3) 方法:");
                    dynamic result = helloModule.add(5, 3);
                    Console.WriteLine($"5 + 3 = {result}");
                    
                    // 可以多次调用
                    Console.WriteLine("调用 add(10, 20) 方法:");
                    dynamic result2 = helloModule.add(10, 20);
                    Console.WriteLine($"10 + 20 = {result2}");
                }
                catch (PythonException ex)
                {
                    Console.WriteLine($"Python执行错误: {ex.Message}");
                    Console.WriteLine($"Python异常详情: {ex.StackTrace}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"其他错误: {ex.Message}");
                }
            } // GIL 释放

            // +++ 关键步骤：程序结束前关闭引擎 +++
            try
            {
                PythonEngine.Shutdown();
            }
            catch (NotSupportedException ex)
            {
                Console.WriteLine($"Python引擎关闭时出现序列化警告: {ex.Message}");
                Console.WriteLine("这不会影响程序的主要功能，可以安全忽略。");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Python引擎关闭时出现其他错误: {ex.Message}");
            }
        }
    }
}
```

## 配置项目文件

在.NET应用程序中，默认禁用了BinaryFormatter序列化。需要在项目文件（例如Test.csproj）中的`<PropertyGroup>`标签内添加以下配置项：

```xml
<PropertyGroup>
  <!-- 其他已有的配置... -->
  <EnableUnsafeBinaryFormatterSerialization>true</EnableUnsafeBinaryFormatterSerialization>
</PropertyGroup>
```

---

# Python调用C#

需要先安装：`pip install pythonnet`

```py
import clr
import os

# 添加 DLL 路径（根据您的实际路径调整）
dll_path = r"C:\Users\XJ\Desktop\test\XJ\Backend\CSharp\Test_Library\bin\Debug\net8.0\Test_Library.dll"
clr.AddReference(dll_path)

# 导入 .NET 命名空间和类
from Test_Library import Class1

def call_dotnet_method():
    """
    调用 .NET DLL 中的方法
    """
    try:
        # 创建 .NET 类的实例
        dotnet_obj = Class1()
        
        # 调用 Hello_World 方法
        # 注意：由于原方法返回 void，我们直接调用即可
        dotnet_obj.Hello_World()
        
        print("✅ .NET 方法调用成功！")
        
    except Exception as e:
        print(f"❌ 调用失败: {e}")

def demonstrate_clr_features():
    """
    演示更多 Python.NET 功能
    """
    print("=== Python.NET 功能演示 ===")
    
    # 1. 加载系统程序集
    clr.AddReference("System")
    from System import DateTime, String
    
    # 使用 .NET DateTime
    now = DateTime.Now
    print(f"当前时间: {now}")
    
    # 2. 字符串操作
    dotnet_string = String.Format("Hello, {0}!", "Python.NET")
    print(f".NET 字符串格式化: {dotnet_string}")
    
    # 3. 数学运算
    from System import Math
    result = Math.Sqrt(25)
    print(f"平方根计算: √25 = {result}")

if __name__ == "__main__":
    # 调用自定义 DLL
    call_dotnet_method()
    
    # 演示其他功能
    demonstrate_clr_features()
    
    print("Python 调用 .NET 完成！")
```