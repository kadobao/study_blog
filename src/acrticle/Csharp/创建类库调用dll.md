---
title: 创建类库调用dll
icon: code
order: 12
category:
  - C#学习
tag:
  - dll
  - 类库
---

# 创建类库调用dll

## 第一步：创建类库

1. 在项目模版里面选择创建`类库`
2. 删除默认的`Class1.cs`文件
3. 右键点击项目，选择`添加` → `新建项`
4. 根据功能为新类命名（之后调用时将使用这个命名）
5. 将类中的`internal`修饰符改为`public`
6. 在这个类中编写你的函数

> **注意**：一般一个文件就是一个类，可以理解为每个文件就是一个API接口。一个类库中可以创建多个文件/类。

## 第二步：在其他项目中引用类库

1. 右键想要调用这个类库的项目
2. 选择`添加` → `项目引用`
3. 点击浏览，选中生成的类库.dll文件
4. 在需要调用的代码文件顶部添加：`using 类库的名字;`
5. 调用类的方法：`类名.函数名`

## 第三步：依赖管理

> 如果类库已经通过 NuGet 引用了某个包（如 Newtonsoft.Json），调用它的项目不需要手动重新下载该包​​，因为 .NET 的依赖机制会自动处理传递性依赖。

## 完整示例

```csharp
// 在类库项目中
public class MyLibrary
{
    public string GetMessage()
    {
        return "Hello from DLL!";
    }
}

// 在调用项目中
using MyLibrary; // 引用类库命名空间

class Program
{
    static void Main()
    {
        string message = MyLibrary.GetMessage(); // 调用类库方法
        Console.WriteLine(message);
    }
}
```