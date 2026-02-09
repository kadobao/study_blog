---
title: EF结合MS DI
icon: code
order: 18
category:
  - C#学习
tag:
  - EF
  - MS DI
---

`MS DI`（Microsoft.Extensions.DependencyInjection）​是内置的，无需安装

## 步骤1：安装必要的NuGet包

在使用EF Core和MS DI之前，需要安装以下NuGet包：

```bash
# 安装EF Core SQLite包
Install-Package Microsoft.EntityFrameworkCore.Sqlite

# 安装EF Core工具包
Install-Package Microsoft.EntityFrameworkCore.Tools

# 安装MS DI包（通常已包含在.NET Core中）
Install-Package Microsoft.Extensions.DependencyInjection
```

## 步骤2：创建项目结构

确保你的WPF项目结构如下：

```
WPF_EF_Sqlite/
├── App.xaml
├── App.xaml.cs
├── MainWindow.xaml
├── MainWindow.xaml.cs
├── WpfTest.cs          # 实体类
└── AppDbContext.cs     # 数据库上下文
```

## 步骤3：创建实体类

实体类是与数据库表对应的 C# 类。我们可以通过以下方式创建：

1. 使用 Navicat 等工具，右键数据表 → 点击 `转储 SQL 文件` → 选择 `仅结构`
2. 将生成的结构粘贴到 AI 模型中，要求 AI 生成与数据库表对应的实体类代码

在根目录中创建 `WpfTest.cs` 文件，代码内容如下：

```csharp
using System;
using System.ComponentModel.DataAnnotations;

public class WpfTest
{
    [Key]
    public string FieldName { get; set; }
    
    public string FieldValue { get; set; }
    
    public string DataType { get; set; }
    
    public string Remark { get; set; }
    
    public DateTime UpdateTime { get; set; }
}
```

**代码说明：**
- `[Key]` 特性表示该字段是主键
- 每个属性对应数据库表中的一个字段

## 步骤4：创建数据库上下文

数据库上下文 (DbContext) 是 EF Core 的核心类，它负责与数据库进行交互。

在根目录中创建 `AppDbContext.cs` 文件，代码内容如下：

```csharp
using Microsoft.EntityFrameworkCore;

namespace WPF_EF_Sqlite
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<WpfTest> WpfTests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // 数据库路径设置为执行文件的同级目录
            string dbPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "WPF_Test.db");
            optionsBuilder.UseSqlite($"Data Source={dbPath}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 设置表名
            modelBuilder.Entity<WpfTest>().ToTable("WPF_Test");
        }
    }
}
```

**代码说明：**
- `DbSet<WpfTest>` 属性表示对应的数据表
- `OnConfiguring` 方法配置数据库连接
- `OnModelCreating` 方法用于配置数据库模型

## 步骤5：配置App.xaml

修改`App.xaml`，去除`StartupUri="MainWindow.xaml"`，因为我们将在代码中手动创建和显示主窗口。

```xml
<Application x:Class="WPF_EF_Sqlite.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

## 步骤6：配置App.xaml.cs

在`App.xaml.cs`中配置依赖注入和EF Core：

```csharp
using System.Configuration;
using System.Data;
using System.Windows;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace WPF_EF_Sqlite
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public IServiceProvider? ServiceProvider { get; private set; }

        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            // 配置服务
            var services = new ServiceCollection();
            
            // 注册AppDbContext，让它自己管理配置
            // AddDbContext 方法是Entity Framework Core提供的一个扩展方法，用于在依赖注入容器中注册 DbContext 类型。它会自动配置 DbContext 的生命周期为 Scoped
            services.AddDbContext<AppDbContext>();
            
            // 注册MainWindow
            services.AddTransient<MainWindow>();
            
            // 构建服务提供者
            ServiceProvider = services.BuildServiceProvider();
            
            // 创建并显示主窗口
            var mainWindow = ServiceProvider.GetRequiredService<MainWindow>();
            mainWindow.Show();
        }

        protected override void OnExit(ExitEventArgs e)
        {
            // 释放服务
            if (ServiceProvider is IDisposable disposable)
            {
                disposable.Dispose();
            }
            
            base.OnExit(e);
        }
    }
}
```

## 步骤7：在MainWindow中使用数据库上下文

现在你可以在MainWindow的构造函数中注入`AppDbContext`并使用它：

```csharp
using System.Windows;
using Microsoft.EntityFrameworkCore;

namespace WPF_EF_Sqlite
{
    public partial class MainWindow : Window
    {
        private readonly AppDbContext _context;

        public MainWindow(AppDbContext context)
        {
            InitializeComponent();
            _context = context;
            
            // 示例：查询数据
            var testData = _context.WpfTests.ToList();
        }
    }
}
```