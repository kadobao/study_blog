---
title: 使用EF操控SQLite数据库
icon: code
order: 13
category:
  - C#学习
tag:
  - EF
  - 数据库
---

# 使用EF操控SQLite数据库

Entity Framework (EF) 是一个强大的对象关系映射 (ORM) 框架，它允许开发者使用 .NET 对象来操作数据库。本教程将详细介绍如何使用 EF Core 来操作 SQLite 数据库。

## 目录

1. [准备工作](#步骤1准备工作)
2. [安装必要的NuGet包](#步骤2安装必要的nuget包)
3. [创建实体类](#步骤3创建实体类)
4. [创建数据库上下文](#步骤4创建数据库上下文)
5. [基本数据库操作](#步骤5基本数据库操作)
6. [进阶技巧](#步骤6进阶技巧)

## 步骤1：准备工作

在开始之前，请确保你已经安装了：
- Visual Studio 2019 或更高版本
- .NET Core 3.1 或更高版本
- 基本的 C# 和 WPF 知识

## 步骤2：安装必要的NuGet包

首先需要安装以下两个NuGet包：

- `Microsoft.EntityFrameworkCore`
- `Microsoft.EntityFrameworkCore.Sqlite`

可以通过以下方式安装：

1. 在 Visual Studio 中，右键项目 → 管理NuGet程序包 → 搜索并安装上述包
2. 或者使用包管理器控制台：

```powershell
Install-Package Microsoft.EntityFrameworkCore
Install-Package Microsoft.EntityFrameworkCore.Sqlite
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

## 步骤5：基本数据库操作

### 5.1 测试数据库连接

```csharp
private void TestDatabaseConnection()
{
    try
    {
        using (var context = new AppDbContext())
        {
            // 尝试连接数据库
            if (context.Database.CanConnect())
            {
                MessageBox.Show("数据库连接成功", "连接测试", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            else
            {
                MessageBox.Show("数据库连接失败", "连接测试", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show($"连接失败: {ex.Message}", "连接测试", MessageBoxButton.OK, MessageBoxImage.Error);
    }
}
```

### 5.2 添加数据

```csharp
private void AddData()
{
    using (var context = new AppDbContext())
    {
        // 创建新记录
        var newRecord = new WpfTest
        {
            FieldName = "示例字段",
            FieldValue = "示例值",
            DataType = "字符串",
            Remark = "这是一个示例记录",
            UpdateTime = DateTime.Now
        };
        
        // 添加记录到数据库
        context.WpfTests.Add(newRecord);

        // SaveChanges() 方法将更改提交到数据库
        // result > 0 ，表示提交成功；result == 0，表示提交失败
        int result = context.SaveChanges();
        
        if (result > 0)
        {
            // 刷新DataGrid显示
            var allData = context.WpfTests.ToList();
            WpfTestDataGrid.ItemsSource = allData;
            
            // 更新窗口标题显示记录数量
            this.Title = $"MainWindow - 共 {allData.Count} 条记录";
            
            MessageBox.Show("数据添加成功", "添加数据", MessageBoxButton.OK, MessageBoxImage.Information);
        }
        else
        {
            MessageBox.Show("数据添加失败", "添加数据", MessageBoxButton.OK, MessageBoxImage.Warning);
        }
    }
}
```

### 5.3 查询数据

```csharp
private void QueryData()
{
    using (var context = new AppDbContext())
    {
        // 查询所有数据
        var allData = context.WpfTests.ToList();
        
        // 条件查询
        var boolData = context.WpfTests.Where(w => w.DataType == "Bool").ToList();
        
        // 单条查询，FirstOrDefault() - 获取第一个匹配的元素，如果没有匹配元素则返回默认值（null）
        var singleRecord = context.WpfTests.FirstOrDefault(w => w.DataType == "Bool");
        
        if (singleRecord != null)
        {
            // 将单条记录放入列表中，以便绑定到DataGrid
            var recordList = new List<WpfTest> { singleRecord };
            
            // 将数据绑定到DataGrid
            WpfTestDataGrid.ItemsSource = recordList;
        }
        else
        {
            // 清空DataGrid
            WpfTestDataGrid.ItemsSource = null;
        }
    }
}
```

### 5.4 更新数据

```csharp
private void UpdateData()
{
    using (var context = new AppDbContext())
    {
        // 查找要更新的记录
        var recordToUpdate = context.WpfTests.FirstOrDefault(x => x.FieldName == "示例字段");
        
        if (recordToUpdate != null)
        {
            // 更新时间为当前时间
            recordToUpdate.UpdateTime = DateTime.Now;
            
            // SaveChanges() 方法将更改提交到数据库
            int result = context.SaveChanges();
            
            if (result > 0)
            {
                MessageBox.Show("数据更新成功", "更新数据", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            else
            {
                MessageBox.Show("数据更新失败", "更新数据", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
        else
        {
            MessageBox.Show("未找到要更新的记录", "更新数据", MessageBoxButton.OK, MessageBoxImage.Warning);
        }
    }
}
```

### 5.5 删除数据

```csharp
private void DeleteData()
{
    using (var context = new AppDbContext())
    {
        // 查找要删除的记录
        var recordToDelete = context.WpfTests.FirstOrDefault(x => x.FieldName == "示例字段");
        
        if (recordToDelete != null)
        {
            // 从数据库中删除记录
            context.WpfTests.Remove(recordToDelete);
            
            // SaveChanges() 方法将更改提交到数据库
            int result = context.SaveChanges();
            
            if (result > 0)
            {
                MessageBox.Show("数据删除成功", "删除数据", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            else
            {
                MessageBox.Show("数据删除失败", "删除数据", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
        else
        {
            MessageBox.Show("未找到要删除的记录", "删除数据", MessageBoxButton.OK, MessageBoxImage.Warning);
        }
    }
}
```

### 5.6 将查询到的数据绑定到DataGrid

```csharp
private void LoadDataToDataGrid()
{
    using (var context = new AppDbContext())
    {
        // 尝试连接数据库
        if (context.Database.CanConnect())
        {
            // 查询所有数据
            var allData = context.WpfTests.ToList();
            
            // 将数据绑定到DataGrid，WpfTestDataGrid是DataGrid的名字
            WpfTestDataGrid.ItemsSource = allData;
            
            // 显示记录数量
            MessageBox.Show($"数据加载成功，共有 {allData.Count} 条记录", "数据加载", MessageBoxButton.OK, MessageBoxImage.Information);
        }
        else
        {
            MessageBox.Show("无法连接到数据库", "连接测试", MessageBoxButton.OK, MessageBoxImage.Warning);
        }
    }
}
```

## 步骤6：进阶技巧

### 6.1 使用单例模式管理数据库上下文

对于小型项目，可以使用单例模式避免重复创建数据库上下文，提高性能。

创建 `DatabaseService.cs` 文件：

```csharp
using Microsoft.EntityFrameworkCore;
using System;

namespace WPF_EF_Sqlite
{
    /// <summary>
    /// 数据库服务类，提供全局数据库访问
    /// </summary>
    public class DatabaseService : IDisposable
    {
        private static DatabaseService _instance;
        private static readonly object _lock = new object();
        private AppDbContext _context;
        
        /// <summary>
        /// 获取数据库服务单例实例
        /// </summary>
        public static DatabaseService Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (_lock)
                    {
                        if (_instance == null)
                        {
                            _instance = new DatabaseService();
                        }
                    }
                }
                return _instance;
            }
        }
        
        /// <summary>
        /// 私有构造函数，确保单例模式
        /// </summary>
        private DatabaseService()
        {
            _context = new AppDbContext();
        }
        
        /// <summary>
        /// 获取数据库上下文
        /// </summary>
        public AppDbContext Context
        {
            get { return _context; }
        }
        
        /// <summary>
        /// 测试数据库连接
        /// </summary>
        public bool TestConnection()
        {
            try
            {
                return _context.Database.CanConnect();
            }
            catch
            {
                return false;
            }
        }
        
        /// <summary>
        /// 保存所有更改到数据库
        /// </summary>
        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
        
        /// <summary>
        /// 释放资源
        /// </summary>
        public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
                _context = null;
            }
            _instance = null;
        }
    }
}
```

### 6.2 使用单例模式获取数据库服务

```csharp
// 使用全局数据库服务
private readonly DatabaseService dbService = DatabaseService.Instance;

private void LoadDataToDataGrid()
{
    try
    {
        // 尝试连接数据库
        if (dbService.TestConnection())
        {
            // 查询所有数据
            var allData = dbService.Context.WpfTests.ToList();
            
            // 将数据绑定到DataGrid
            WpfTestDataGrid.ItemsSource = allData;
            
            // 在状态栏或标题栏显示记录数量（可选）
            this.Title = $"MainWindow - 共 {allData.Count} 条记录";
        }
        else
        {
            MessageBox.Show("无法连接到数据库", "连接测试", MessageBoxButton.OK, MessageBoxImage.Warning);
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show($"数据加载失败: {ex.Message}", "数据加载", MessageBoxButton.OK, MessageBoxImage.Error);
    }
}
```