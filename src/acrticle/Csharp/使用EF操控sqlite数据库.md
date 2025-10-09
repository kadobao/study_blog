---
title: 使用EF操控sqlite数据库
icon: code
order: 13
category:
  - C#学习
tag:
  - EF
  - 数据库
---

# 使用EF操控SQLite数据库

## 步骤1：安装必要的NuGet包

首先需要安装以下两个NuGet包：
- `Microsoft.EntityFrameworkCore`
- `Microsoft.EntityFrameworkCore.Sqlite`

## 步骤2：创建实体类

通过Navicat，右键数据表，然后点击 `转储 SQL 文件`，选择 `仅结构`，然后把生成的结构，让AI生成与数据库表对应的实体类代码。

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

## 步骤3：创建数据库上下文

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

## 步骤4：使用EF操作数据库

现在可以在任意位置使用EF来操作SQLite数据库了。以下是一个完整的示例：

```csharp
private void Button_Click(object sender, RoutedEventArgs e)
{
    try
    {
        using (var context = new AppDbContext())   //  因为在同一命名空间，且在根目录，所以可以直接实例化定义好的类
        {
            // 尝试连接数据库
            context.Database.CanConnect();
            MessageBox.Show("可以连接", "连接测试", MessageBoxButton.OK, MessageBoxImage.Information);

            // // 查询所有数据
            // var allData = context.WpfTests.ToList();
            
            // // 将数据绑定到DataGrid
            // WpfTestDataGrid.ItemsSource = allData;
            
            // // 显示记录数量
            // MessageBox.Show($"数据加载成功，共有 {allData.Count} 条记录", "数据加载", MessageBoxButton.OK, MessageBoxImage.Information);
        }
    }
    catch (Exception ex)
    {
        MessageBox.Show($"连接失败: {ex.Message}", "连接测试", MessageBoxButton.OK, MessageBoxImage.Error);
    }
}
```

## 常用操作

### 添加数据
```csharp
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

    // SaveChanges() 方法将更改提交到数据库、
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
```

### 查询数据
```csharp
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
```

### 更新数据
```csharp
using (var context = new AppDbContext())
{
    // 查找要更新的记录，FirstOrDefault() - 获取第一个匹配的元素，如果没有匹配元素则返回默认值（null）
    var recordToUpdate = context.WpfTests.FirstOrDefault(x => x.FieldName == "示例字段");
    
    if (recordToUpdate != null)
    {
        // 更新时间为当前时间
        recordToUpdate.UpdateTime = DateTime.Now;
        
        // SaveChanges() 方法将更改提交到数据库、
        // result > 0 ，表示提交成功；result == 0，表示提交失败
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
```

### 删除数据
```csharp
using (var context = new AppDbContext())
{
    // 查找要删除的记录，FirstOrDefault() - 获取第一个匹配的元素，如果没有匹配元素则返回默认值（null）
    var recordToDelete = context.WpfTests.FirstOrDefault(x => x.FieldName == "示例字段");
    
    if (recordToDelete != null)
    {
        // 从数据库中删除记录
        context.WpfTests.Remove(recordToDelete);
        
        // SaveChanges() 方法将更改提交到数据库、
        // result > 0 ，表示提交成功；result == 0，表示提交失败
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
```


### 将查询到的数据绑定到DataGrid

```csharp
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
```