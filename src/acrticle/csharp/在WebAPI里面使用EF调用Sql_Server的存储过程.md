---
title: 在WebAPI里面使用EF调用Sql_Server的存储过程
icon: code
order: 37
category:
  - C#学习
tag:
  - WebAPI
  - EF
  - Sql_Server
  - 存储过程
---

# C# 调用存储过程完整教程

## 步骤1：创建存储过程返回值的DTO模型

首先创建一个类来接收存储过程的返回结果：

```csharp
// Models/ProductionStatisticsResult.cs
using System;

namespace Test_SchedulingData.Models
{
    public class ProductionStatisticsResult
    {
        public int TotalQuantity { get; set; }
        public int DeviceCount { get; set; }
        public int OrderCount { get; set; }
        public DateTime? MinTime { get; set; }
        public DateTime? MaxTime { get; set; }
    }
}
```

### 关键点

- 这个类是DTO（Data Transfer Object），用于数据传输
- 属性名称和类型要与存储过程返回的列名匹配
- 不需要添加主键，因为它不对应数据库表

---

## 步骤2：在DbContext中配置模型

在 `OnModelCreating` 方法中标记这个模型属于DTO模型（数据传输），不属于实体模型（数据库里面的表），因为存储过程返回的结果不是数据库表。

```csharp
// Data/ScadaDbContext.cs
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 配置实体表的映射
    modelBuilder.Entity<ProductionData>(entity =>
    {
        entity.HasIndex(e => e.RecordTime).HasDatabaseName("IX_ProductionData_RecordTime");
        entity.Property(e => e.ShiftTotalOutput).HasPrecision(18, 2);
    });

    // 配置DTO模型 - 标记为无键实体
    // ### 1. modelBuilder.Entity<ProductionStatisticsResult>
    // - 注册 ProductionStatisticsResult 类到 EF Core 的模型中
    // - 让 EF Core 知道这个类的存在，可以用于查询
    // ### 2. entity.HasNoKey()
    // - 关键配置：标记这个实体没有主键
    // - 告诉 EF Core：这个类不对应数据库中的表
    modelBuilder.Entity<ProductionStatisticsResult>(entity =>
    {
        entity.HasNoKey();
    });
}
```

### 关键配置说明

- `entity.HasNoKey()` - 告诉EF Core这个类没有主键
- 这样EF Core就知道它不是数据库表，而是用于接收查询结果的DTO
- 不会尝试为它创建数据库表

---

## 步骤3：在DatabaseService中调用存储过程

```csharp
// Services/DatabaseService.cs
public async Task<ProductionStatisticsResult?> GetTotalProductionByTimeRangeAsync(DateTime startTime, DateTime endTime)
{
    // 创建服务作用域，用于获取ScadaDbContext实例
    using var scope = _scopeFactory.CreateScope();
    // 从服务作用域中获取ScadaDbContext实例
    var dbContext = scope.ServiceProvider.GetRequiredService<ScadaDbContext>();

    // 创建SQL参数
    var startTimeParam = new SqlParameter("@StartTime", startTime);
    var endTimeParam = new SqlParameter("@EndTime", endTime);

    // 调用存储过程并映射到DTO
    var results = await dbContext.Database
        .SqlQueryRaw<ProductionStatisticsResult>(
            "EXEC usp_GetTotalProductionByTimeRange @StartTime, @EndTime",
            startTimeParam,
            endTimeParam
        )
        .ToListAsync();

    return results.FirstOrDefault();
}
```

### 关键点

- 使用 `SqlQueryRaw<T>()` 方法执行原始SQL查询
- `T` 是DTO类型，EF Core会自动将结果映射到这个类型
- 使用 `SqlParameter` 防止SQL注入
- `ToListAsync()` 执行查询并返回结果列表

---

## 完整流程图

```
1. 创建DTO模型
   ↓
2. 在DbContext中用 HasNoKey() 标记
   ↓
3. 使用 SqlQueryRaw<T>() 调用存储过程
   ↓
4. EF Core自动映射结果到DTO
   ↓
5. 返回数据给客户端
```

---

## 注意事项

1. **属性映射**：DTO属性名必须与存储过程返回的列名一致（不区分大小写）
2. **类型匹配**：确保C#类型与SQL类型兼容
3. **参数化查询**：始终使用 `SqlParameter` 防止SQL注入
4. **HasNoKey()**：这是关键配置，告诉EF Core这不是数据库表
5. **性能考虑**：对于大量数据，考虑使用分页查询

---

## 示例存储过程（SQL Server）

```sql
CREATE PROCEDURE usp_GetTotalProductionByTimeRange
    @StartTime DATETIME,
    @EndTime DATETIME
AS
BEGIN
    SELECT
        COUNT(*) AS TotalQuantity,
        COUNT(DISTINCT DeviceId) AS DeviceCount,
        COUNT(DISTINCT OrderId) AS OrderCount,
        MIN(RecordTime) AS MinTime,
        MAX(RecordTime) AS MaxTime
    FROM ProductionData
    WHERE RecordTime BETWEEN @StartTime AND @EndTime;
END
```

---

## FromSqlRaw 和 SqlQueryRaw 主要区别

| 特性 | FromSqlRaw | SqlQueryRaw |
|------|-----------|-------------|
| 调用对象 | `DbSet<TEntity>` | `Database` |
| 返回类型 | `IQueryable<TEntity>` | `IQueryable<T>` |
| 结果类型 | 必须是实体类型 | 可以是任意类型 |
| LINQ 链式调用 | 支持 | 支持 |
| 追踪行为 | 默认追踪实体 | 不追踪（除非是实体类型） |

---

## 使用场景

- **使用 FromSqlRaw**：当你需要查询实体数据，并且希望 EF Core 自动追踪这些实体的变化时
- **使用 SqlQueryRaw**：当你需要执行聚合查询、报表统计，或者返回非实体类型的 DTO 时

---

## AI提示词

```
先为存储过程的返回值建立模型，然后在OnModelCreating里面使用entity.HasNoKey标记模型属于DTO 模型；然后在DatabaseService 中添加调用存储过程的方法；最后在后台任务里面调用这个方法，将结果使用`JsonConvert.SerializeObject`打印。
```
