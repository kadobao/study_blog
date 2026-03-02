---
title: 在WebAPI里面使用EF调用Sql_Server的视图
icon: code
order: 38
category:
  - C#学习
tag:
  - WebAPI
  - EF
  - Sql_Server
  - 视图
---





## 视图 vs 存储过程的区别

| 特性 | 存储过程 | 视图 |
|------|---------|------|
| 调用方式 | `EXEC 存储过程名` | `SELECT * FROM 视图名` |
| 参数 | 可以接受参数 | 不能接受参数 |
| 返回结果 | 可以返回多行数据 | 返回查询结果集 |
| EF Core 调用 | `SqlQueryRaw` | `DbSet<实体>` 或 `FromSqlRaw` |

## 使用视图的步骤

### 步骤 1：创建视图模型类

视图模型类与普通实体类类似，但**不需要主键**（如果视图没有主键）。

**示例：** 假设有一个视图 `vw_ProductionSummary`，查询生产汇总数据

```csharp
// Models/ProductionSummaryView.cs
using System;

namespace Test_SchedulingData.Models
{
    public class ProductionSummaryView
    {
        public DateTime RecordDate { get; set; }
        public string Shift { get; set; }
        public decimal TotalQuantity { get; set; }
        public int DeviceCount { get; set; }
        public int OrderCount { get; set; }
    }
}
```

### 步骤 2：在 DbContext 中配置视图

在 `OnModelCreating` 中配置视图，使用 `ToView` 方法指定视图名称。


```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 配置视图
    modelBuilder.Entity<ProductionSummaryView>(entity =>
    {
        entity.HasNoKey();  // 视图通常没有主键
        entity.ToView("vw_ProductionSummary");  // 指定数据库中的视图名称
    });
}
```

### 步骤 3：在 DbContext 中添加 DbSet（可选）

如果你希望像操作表一样操作视图，可以添加 `DbSet`。

**示例：**

```csharp
public class ScadaDbContext : DbContext
{
    public DbSet<ProductionSummaryView> ProductionSummaryView { get; set; }
    
    // 其他代码...
}
```

### 步骤 4：在 DatabaseService 中添加查询方法

有两种方式查询视图：

#### 方式 1：使用 DbSet（推荐，如果添加了 DbSet）

```csharp
// 带条件的查询
public async Task<List<ProductionSummaryView>> GetProductionSummaryByDateAsync(DateTime date)
{
    using var scope = _scopeFactory.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<ScadaDbContext>();
    
    return await dbContext.ProductionSummaryView
        .Where(v => v.RecordDate.Date == date.Date)
        .ToListAsync();
}
```