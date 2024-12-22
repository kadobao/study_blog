---
title: 初步学习C#
icon: 
order: 
category:
  - C#
tag:
  - C#
---











[**Visual Studio 2022 Community**](https://visualstudio.microsoft.com/vs/community/)

[**Visual Studio 2022 Professional**](https://visualstudio.microsoft.com/vs/professional/)



![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20241125/image.2ves2yi6vj.jpg)

选择.NET桌面开发



检测是否安装了.NET环境

```
dotnet --version
```









以下是一步步使用 Visual Studio 2022 运行您的 C# 程序的教程：

---

### **步骤 1：安装必要的开发组件**
1. 打开 Visual Studio 2022 安装程序（如果没有安装程序，可以从 [微软官网下载](https://visualstudio.microsoft.com/)）。
2. 在安装程序中，选择**“修改”**（如果已经安装），或选择“安装社区版/专业版”等。
3. 勾选 **“.NET 桌面开发”** 工作负载。这是开发 C# 应用程序的必要组件。
4. 点击**安装/修改**按钮等待安装完成。

---

### **步骤 2：启动 Visual Studio 2022**
1. 打开 Visual Studio 2022。
2. 在欢迎页面，点击 **“创建新项目”**。

---

### **步骤 3：创建一个新的 C# 控制台应用**
1. 在项目模板中，搜索 **“控制台应用”** 或直接选择 **“C# 控制台应用 (.NET)”**。
2. 点击 **“下一步”**。
3. 输入项目名称，例如 **HelloWorldApplication**。
4. 选择存储路径（默认即可）并点击 **“创建”**。

---

### **步骤 4：编写代码**
1. 在新创建的项目中，`Program.cs` 文件会自动打开。
2. 将默认代码替换为您提供的代码：
    ```csharp
    using System;
    namespace HelloWorldApplication
    {
        class HelloWorld
        {
            static void Main(string[] args)
            {
                Console.WriteLine("Hello World!");
                Console.ReadKey();
            }
        }
    }
    ```

---

### **步骤 5：运行代码**
1. 点击菜单栏中的 **“调试”** > **“开始执行（不调试）”**（快捷键：`Ctrl+F5`）。
2. 将看到一个控制台窗口弹出，显示 **“Hello World!”**。

---

### **附加提示**
- 如果程序编译失败，请检查是否有拼写错误。
- 如果控制台窗口一闪而过，请确保 `Console.ReadKey();` 存在，保持窗口等待用户按键。
- 想要修改输出内容，可以编辑 `Console.WriteLine("Hello World!");` 里的文字。

---

