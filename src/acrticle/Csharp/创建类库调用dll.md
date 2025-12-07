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

## 1. 创建类库

### 1.1 操作步骤

1. 在项目模板里面选择创建 **`类库`**
2. 删除默认的 **`Class1.cs`** 文件
3. 右键点击项目，选择 **`添加 → 新建项`**
4. 根据功能为新类命名（之后调用时将使用这个命名）
5. 将类中的 **`internal`** 修饰符改为 **`public`**
6. 在这个类中编写你的函数

> 💡 **重要提示**：一般一个文件就是一个类，可以理解为每个文件就是一个API接口。一个类库中可以创建多个文件/类。

## 2. 在其他项目中引用类库

1. 右键想要调用这个类库的项目
2. 选择 **`添加 → 项目引用`**
3. 点击浏览，选中生成的类库 `.dll` 文件
4. 在需要调用的代码文件顶部添加：`using 类库的名字;`
5. 调用类的方法：`类名.函数名`

## 3. 依赖管理

> 如果类库已经通过 NuGet 引用了某个包（如 `Newtonsoft.Json`），调用它的项目不需要手动重新下载该包，因为 .NET 的依赖机制会自动处理传递性依赖。

## 4. 完整示例

### 4.1 创建类库（DLL）

#### 步骤一：创建类库项目

1. 在 Visual Studio 中：**`文件 → 新建 → 项目 → 类库（C#）`**  
   （比如项目名叫 `MyMathLibrary`）

2. 删除 `Class1.cs`，右键项目 → **`添加 → 类`**，命名为 `Calculator.cs`

#### 步骤二：编写类库代码

编辑 `Calculator.cs`：

```csharp
// Calculator.cs（在 MyMathLibrary 项目中）
namespace MyMathLibrary
{
    // 类必须是 public，外部项目才能访问
    public class Calculator
    {
        // 实例方法：需要先 new 一个对象才能调用
        public int Add(int a, int b)
        {
            return a + b;
        }

        // 静态方法：可以直接用 类名.方法名 调用（可选）
        public static string GetVersion()
        {
            return "MyMathLibrary v1.0";
        }
    }
}
```

#### 步骤三：构建项目

构建项目（生成 `MyMathLibrary.dll`）

---

### 4.2 创建调用项目（控制台应用）

#### 步骤一：创建调用项目

1. 新建一个 **`控制台应用（Console App）`** 项目（比如叫 `AppUsingDll`）

2. 右键 `AppUsingDll` 项目 → **`添加 → 项目引用`** → 勾选 `MyMathLibrary`

#### 步骤二：编写调用代码

在 `Program.cs` 中编写调用代码：

```csharp
// Program.cs（在 AppUsingDll 项目中）
using System;
using MyMathLibrary; // 引入类库的命名空间

namespace AppUsingDll
{
    class Program
    {
        static void Main(string[] args)
        {
            // ✅ 调用实例方法：先创建对象
            Calculator calc = new Calculator(); // new 出一个实例
            int result = calc.Add(3, 5);
            Console.WriteLine($"3 + 5 = {result}");

            // ✅ 调用静态方法：直接用类名
            string version = Calculator.GetVersion();
            Console.WriteLine(version);

            Console.ReadKey(); // 暂停看结果
        }
    }
}
```

---

## 5. 🧠 重要概念理解

| 概念 | 说明 |
|:-----|:-----|
| **类库（Class Library）** | 编译后生成 `.dll` 文件，包含可重用的代码 |
| **`public` 类** | 外部项目要能访问这个类，必须加 `public` 修饰符 |
| **实例方法** | 没有 `static` 关键字，必须 `new 类名()` 创建对象后才能调用 |
| **静态方法** | 有 `static` 关键字，可以直接 `类名.方法名()` 调用 |
| **`using` 命名空间** | 等价于"导入"，写一次后就不用写全名了 |

---

## 6. 运行结果

```bash
3 + 5 = 8
MyMathLibrary v1.0
```

---