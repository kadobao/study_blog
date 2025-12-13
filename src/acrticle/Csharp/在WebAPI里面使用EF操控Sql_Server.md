---
title: 在WebAPI里面使用EF操控Sql_Server
icon: code
order: 30
category:
  - C#学习
tag:
  - WebAPI
  - EF
  - Sql_Server
---

# 在WebAPI里面使用EF操控Sql_Server

## 前言

Entity Framework Core (EF) 是微软官方提供的 ORM 框架，可以帮助我们在 .NET 应用中高效地操作数据库。本文将介绍如何在 WebAPI 项目中使用 EF Core 操控 SQL Server 数据库。

## 1. 配置连接字符串

首先在 `appsettings.json` 中配置多个数据库连接字符串：

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "UserDbConnection": "Server=192.168.1.10;Database=UserDB;User Id=sa;Password=your_password;TrustServerCertificate=true;",
    "OrderDbConnection": "Server=192.168.1.20;Database=OrderDB;User Id=sa;Password=your_password;TrustServerCertificate=true;"
  }
}
```

## 2. 创建数据模型

先定义好数据表对应的模型对象类。

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string ProductName { get; set; }
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

## 3. 创建 DbContext

为每个数据库创建独立的 DbContext（数据库上下文）：

### UserDbContext

```csharp
// Data/UserDbContext.cs
public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions\<UserDbContext\> options)
        : base(options) { }

    public DbSet\<User\> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // 配置表名（如果数据表名与实体类名不同，如果相同可以省略）
        modelBuilder.Entity<User>().ToTable("User");
    }
}
```

### OrderDbContext

```csharp
// Data/OrderDbContext.cs
public class OrderDbContext : DbContext
{
    public OrderDbContext(DbContextOptions\<OrderDbContext\> options)
        : base(options) { }

    public DbSet\<Order\> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // 配置表名（如果数据表名与实体类名不同，如果相同可以省略）
        modelBuilder.Entity<Order>().ToTable("Order");
    }
}
```

## 4. 注册 DbContext 服务

在 `Program.cs` 中分别注册两个 DbContext：

```csharp
var builder = WebApplication.CreateBuilder(args);

// 注册 UserDbContext，使用 UserDbConnection
builder.Services.AddDbContext\<UserDbContext\>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("UserDbConnection")
    )
);

// 注册 OrderDbContext，使用 OrderDbConnection
builder.Services.AddDbContext\<OrderDbContext\>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("OrderDbConnection")
    )
);

builder.Services.AddControllers();
// ... 其他配置
```

## 5. 服务生命周期管理

### 服务生命周期类型

服务的生命周期分为三种类型：
- **单例（Singleton）**：整个应用程序生命周期内只创建一个实例
- **作用域（Scoped）**：每个请求创建一个实例
- **瞬时（Transient）**：每次请求创建一个新实例

### 示例配置

```csharp
// program.cs

// 注册数据库服务为单例服务
builder.Services.AddSingleton\<DatabaseService\>();

// 注册数据库上下文为作用域服务
builder.Services.AddDbContext\<DbContext\>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## 6. 使用 IServiceScopeFactory

当你脱离了 HTTP 请求上下文，如后台任务，需要使用 `IServiceScopeFactory` 来管理作用域内的依赖项。

这个示例展示了如何在后台任务中使用 `IServiceScopeFactory` 来测试数据库连接和获取表记录数。
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test_WebAPI.Services
{
    /// <summary>
    /// 数据库访问服务，封装常用的数据库操作，简化数据访问代码
    /// </summary>
    public class DatabaseService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public DatabaseService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        /// <summary>
        /// 测试数据库连接
        /// </summary>
        /// <returns>连接是否成功</returns>
        public async Task<bool> TestConnectionAsync()
        {
            // 创建服务作用域，用于获取DbContext实例
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService\<DbContext\>();
            
            // 测试数据库连接是否成功并返回结果
            return await dbContext.Database.CanConnectAsync();
        }

        /// <summary>
        /// 获取表记录数
        /// </summary>
        /// <typeparam name="T">实体类型</typeparam>
        /// <returns>记录数</returns>
        public async Task<int> GetRecordCountAsync\<T\>() where T : class
        {
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService\<DbContext\>();
            
            return await dbContext.Set\<T\>().CountAsync();
        }

        /// <summary>
        /// 获取所有记录
        /// </summary>
        /// <typeparam name="T">实体类型</typeparam>
        /// <returns>所有记录列表</returns>
        public async Task\<List\<T\>\> GetAllAsync\<T\>() where T : class
        {
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService\<DbContext\>();
            
            return await dbContext.Set\<T\>().ToListAsync();
        }

        /// <summary>
        /// 添加单条记录
        /// </summary>
        /// <typeparam name="T">实体类型</typeparam>
        /// <param name="entity">实体对象</param>
        /// <returns>受影响的行数</returns>
        public async Task<int> AddAsync\<T\>(T entity) where T : class
        {
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService\<DbContext\>();
            
            // 将实体对象添加到数据库上下文的指定集合中
            await dbContext.Set\<T\>().AddAsync(entity);
            
            // 保存所有更改到数据库并返回受影响的行数
            return await dbContext.SaveChangesAsync();
        }
    }
}
```

## 7. Controller 中使用 DbContext

在 Controller 场景中可以直接注入 DbContext：

```csharp
[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly UserDbContext _userDb;
    private readonly OrderDbContext _orderDb;

    public ReportController(UserDbContext userDb, OrderDbContext orderDb)
    {
        _userDb = userDb;
        _orderDb = orderDb;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var userCount = await _userDb.Users.CountAsync();
        var orderCount = await _orderDb.Orders.CountAsync();

        return Ok(new
        {
            TotalUsers = userCount,
            TotalOrders = orderCount
        });
    }
}
```

## 8. 泛型方法解析

### 方法签名解析

```csharp
public async Task<int> AddAsync\<T\>(T entity) where T : class
```

- **`\<T\>`**：表示这是一个泛型方法（Generic Method）
- **`T entity`**：表示参数 entity 的类型是 T
- **`where T : class`**：限制 T 必须是一个类（class），不能是 int、string 这种值类型（EF Core 实体必须是类）
- **T 在运行时会被替换成你传入的具体类型！**

### Set\<T\>() 方法

`Set\<T\>()` 的意思是操控某个表，EF Core 会根据泛型类型 T 自动映射到对应的数据库表。

## 9. 最佳实践总结

1. **生命周期管理**：合理使用 `IServiceScopeFactory` 来解决单例服务访问作用域服务的问题
2. **代码组织**：将数据库操作封装到服务类中，避免在 Controller 中直接操作数据库
3. **错误处理**：在数据库操作中添加适当的异常处理
4. **性能优化**：使用异步方法，避免阻塞操作
5. **连接管理**：确保 DbContext 的正确生命周期管理

通过以上配置和实践，你可以在 WebAPI 项目中高效地使用 EF Core 操作 SQL Server 数据库。