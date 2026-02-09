---
title: Prism结合EF
icon: code
order: 16
category:
  - C#学习
tag:
  - Prism
  - EF
---

# Prism结合EF

Prism 是一个用于构建复合 WPF 应用程序的框架，而 Entity Framework (EF) 是一个强大的对象关系映射 (ORM) 框架。本教程将详细介绍如何在 Prism 框架中集成 EF Core 来操作 SQLite 数据库。

## 目录

1. [准备工作](#步骤1准备工作)
2. [创建项目结构](#步骤2创建项目结构)
3. [创建实体类](#步骤3创建实体类)
4. [创建数据库上下文](#步骤4创建数据库上下文)
5. [注册DbContext服务](#步骤5注册dbcontext服务)

## 步骤1：创建项目结构

在 Prism 项目中，我们需要创建以下文件夹结构来组织代码：

1. 在项目中创建 `Models` 文件夹 - 用于存放实体类
2. 在项目中创建 `Services` 文件夹 - 用于存放服务类，包括数据库上下文

这样的结构有助于保持代码的清晰和可维护性，符合 MVVM 模式的最佳实践。

## 步骤2：创建实体类

在 `Models` 文件夹中创建实体类文件，这个类将与数据库表对应。

创建 `WpfTestModel.cs` 文件，代码内容如下：

```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPF_MVVM_Prism.Models
{
    public class WpfTestModel
    {
        [Key]
        public string FieldName { get; set; }

        public string FieldValue { get; set; }

        public string DataType { get; set; }

        public string Remark { get; set; }

        public DateTime UpdateTime { get; set; }
    }
}
```

**代码说明：**
- `[Key]` 特性表示该字段是主键
- 每个属性对应数据库表中的一个字段
- `DateTime` 类型的 `UpdateTime` 用于记录数据更新时间

## 步骤3：创建数据库上下文

在 `Services` 文件夹中创建 `AppDbContext.cs` 文件，这个类是 EF Core 的核心，负责与数据库进行交互。

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WPF_MVVM_Prism.Models;

namespace WPF_MVVM_Prism.Services
{
    public class AppDbContext : DbContext
    {
        public DbSet<WpfTestModel> WpfTests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // 数据库路径设置为执行文件的同级目录
            string dbPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "WPF_Test.db");
            optionsBuilder.UseSqlite($"Data Source={dbPath}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 设置表名
            modelBuilder.Entity<WpfTestModel>().ToTable("WPF_Test");
        }
    }
}
```

**代码说明：**
- `DbSet<WpfTestModel>` 属性表示对应的数据表
- `OnConfiguring` 方法配置数据库连接，这里使用 SQLite 数据库
- `OnModelCreating` 方法用于配置数据库模型，如设置表名
- 数据库文件将创建在应用程序的执行目录下

## 步骤4：注册DbContext服务

在 Prism 框架中，我们需要将 DbContext 注册为服务，以便在应用程序的其他部分（如 ViewModel）中使用依赖注入。

在 `App.xaml.cs` 文件中，找到 `RegisterTypes` 方法，添加以下代码：

```csharp
using Prism.Ioc;
using WPF_MVVM_Prism.Services;

namespace WPF_MVVM_Prism
{
    public partial class App
    {
        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            // 注册DbContext为瞬态服务
            containerRegistry.Register<AppDbContext>(AppDbContext);
        }
    }
}
```

**代码说明：**
- `RegisterTypes` 方法是 Prism 中用于注册服务的地方
- `containerRegistry.Register<AppDbContext>(AppDbContext)` 将 DbContext 注册为瞬态服务
- 瞬态服务意味着每次请求时都会创建一个新的实例，这对于数据库上下文是推荐的做法

## 使用DbContext

完成上述步骤后，你可以在 ViewModel 中通过依赖注入使用 DbContext：

```csharp
public class YourViewModel : BindableBase
{
    private readonly AppDbContext _dbContext;
    
    public YourViewModel(AppDbContext dbContext)
    {
        _dbContext = dbContext;
        LoadDataToDataGrid();
    }

    private void LoadDataToDataGrid()
    {
        try
        {
            
            // 尝试连接数据库
            if (_dbContext.Database.CanConnect())
            {
                // 查询所有数据
                var allData = _dbContext.WpfTests.ToList();
                
                // 将数据绑定到DataGrid
                WpfTestData = allData;
                
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
}
```

这样，你就成功在 Prism 框架中集成了 EF Core，可以开始进行数据库操作了。