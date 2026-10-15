---
title: JWT及权限验证
icon: code
order: 47
category:
  - C#学习
tag:
  - WebAPI
  - JWT
  - 权限验证
---

login 接口的 controller 负责下发 token；program 里面的 JWT 认证中间件（`AddJwtBearer` 注册的那套组件）负责解析 token，之后的 controller 才能获取到 token 包含的用户信息。

## 一、SQL 表设计

### 1.1 角色权限表 RolePermissions

```sql
CREATE TABLE [RolePermissions] (
    [RoleCode] NVARCHAR(20) NOT NULL,                -- 角色代码（对应 Users.Role）
    [PermissionCode] NVARCHAR(50) NOT NULL,          -- 权限代码，如 clock:delete
    [RoleName] NVARCHAR(50) NULL,                    -- 角色名称
    PRIMARY KEY ([RoleCode], [PermissionCode])       -- 复合主键
);

-- 示例：给 admin 和 foreman 角色添加删除权限
INSERT INTO [RolePermissions] ([RoleCode], [PermissionCode], [RoleName])
VALUES ('admin', 'clock:delete', '超级管理员'),
       ('foreman', 'clock:delete', '班长');

CREATE NONCLUSTERED INDEX [IX_RolePermissions_RoleCode] ON [RolePermissions] ([RoleCode]);
CREATE NONCLUSTERED INDEX [IX_RolePermissions_PermissionCode] ON [RolePermissions] ([PermissionCode]);
```

### 1.2 用户额外授权表 UserPermissions（可选：单独给某人加权限）

```sql
CREATE TABLE [UserPermissions] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [UserId] INT NOT NULL,                            -- 用户ID
    [PermissionCode] NVARCHAR(50) NOT NULL,           -- 权限代码
    [GrantedBy] NVARCHAR(50) NULL,                    -- 授予人
    [Remark] NVARCHAR(200) NULL,                      -- 授予原因
    [CreatedTime] DATETIME DEFAULT GETDATE()
);
CREATE UNIQUE INDEX [IX_UserPermissions_User_Permission] ON [UserPermissions] ([UserId], [PermissionCode]);
```

### 1.3 聚合视图 V_UserPermissions（体系核心）

```sql
CREATE VIEW [V_UserPermissions] AS
SELECT
    u.[Id], u.[UserName], u.[RealName], u.[PasswordHash],
    u.[Role], u.[IsBanned], u.[IsNewcomer], u.[SkillLevel],
    u.[EmployeeLevel], u.[WorkHourConversionRatio],
    -- 最终权限 = 角色权限 UNION 用户直接权限（UNION 自动去重）
    STRING_AGG(merged.[PermissionCode], ', ') AS Permissions
FROM [Users] u
CROSS APPLY (
    SELECT [PermissionCode] FROM [RolePermissions] rp WHERE rp.[RoleCode] = u.[Role]
    UNION
    SELECT [PermissionCode] FROM [UserPermissions] up WHERE up.[UserId] = u.[Id]
    UNION ALL
    SELECT NULL   -- 保证无权限用户也出现在结果中
) AS merged
GROUP BY u.[Id], u.[UserName], u.[RealName], u.[PasswordHash], u.[Role],
         u.[IsBanned], u.[IsNewcomer], u.[SkillLevel], u.[EmployeeLevel],
         u.[WorkHourConversionRatio];
```

### 1.4 用户信息缓存（SQL 表的代码层补充）

> 以下内容是对上面三张 SQL 表在代码层的**缓存实现**：把视图数据加载进内存，供后续 Controller 直接读取，避免每次查库。属于 SQL 表设计的补充说明，不是独立业务章节。

#### 1.4.1 【数据层】视图实体 Models/V_UserPermissions.cs

```csharp
using System.ComponentModel.DataAnnotations.Schema;

namespace Test_Jwt.Models
{
    /// <summary>
    /// 用户权限视图模型（聚合角色权限 + 用户额外权限）
    /// </summary>
    [Table("V_UserPermissions")]
    public class V_UserPermissions
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string? RealName { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsBanned { get; set; }
        public bool? IsNewcomer { get; set; }
        public int? SkillLevel { get; set; }
        public int? EmployeeLevel { get; set; }
        public decimal? WorkHourConversionRatio { get; set; }
        /// <summary>聚合权限串，逗号分隔，如 "qr:view, clock:delete"</summary>
        public string? Permissions { get; set; }
    }
}
```

#### 1.4.2 【数据层】DbContext 配置（Data/QrScanDbContext.cs）

```csharp
public DbSet<V_UserPermissions> V_UserPermissions { get; set; }

// OnModelCreating 中：
modelBuilder.Entity<V_UserPermissions>(entity =>
{
    entity.HasNoKey();                        // 视图无主键
    entity.ToView("V_UserPermissions");
    entity.Property(e => e.WorkHourConversionRatio).HasPrecision(5, 2);
});
```

#### 1.4.3 【缓存层·数据源】视图全量查询（Services/DatabaseService.cs）

```csharp
public async Task<List<V_UserPermissions>> GetAllUserPermissionsViewAsync()
{
    using var scope = _scopeFactory.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<QrScanDbContext>();
    return await dbContext.V_UserPermissions.ToListAsync();
}
```

#### 1.4.4 【缓存层】单例注册 + 后台刷新服务注册（Program.cs）

```csharp
// 设置为全局变量（整个进程共享同一个 List 实例）
builder.Services.AddSingleton<List<V_UserPermissions>>();

// 注册后台服务（启动加载 + 定时刷新）
builder.Services.AddHostedService<InitAdminUserService>();
```

#### 1.4.5 【缓存层】后台刷新服务 BackgroundTasks/InitAdminUserService.cs（完整）

```csharp
using Microsoft.Extensions.Hosting;
using Test_Jwt.Models;
using Test_Jwt.Services;

namespace Test_Jwt.BackgroundTasks
{
    public class InitAdminUserService : BackgroundService
    {
        private readonly LoggingService _loggingService;
        private readonly DatabaseService _databaseService;
        private readonly List<V_UserPermissions> _v_UserPermissions;

        public InitAdminUserService(
            LoggingService loggingService,
            DatabaseService databaseService,
            List<V_UserPermissions> v_UserPermissions)
        {
            _loggingService = loggingService;
            _databaseService = databaseService;
            _v_UserPermissions = v_UserPermissions;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            // 启动时先同步加载一次数据，确保服务可用
            try
            {
                var initialList = await _databaseService.GetAllUserPermissionsViewAsync();
                _v_UserPermissions.Clear();
                _v_UserPermissions.AddRange(initialList);
                _loggingService.Info("InitAdminUserService", $"初始加载用户权限完成，共 {initialList.Count} 条记录");
            }
            catch (Exception ex)
            {
                _loggingService.Error("InitAdminUserService", "初始加载用户权限失败", ex);
            }

            // 每2分钟定时刷新（改角色/封禁用户最多2分钟自动生效）
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var permissionsList = await _databaseService.GetAllUserPermissionsViewAsync();
                    _v_UserPermissions.Clear();
                    _v_UserPermissions.AddRange(permissionsList);
                }
                catch (Exception ex)
                {
                    _loggingService.Error("InitAdminUserService", "更新用户权限时发生错误", ex);
                }
                await Task.Delay(TimeSpan.FromMinutes(2), stoppingToken);
            }
        }
    }
}
```

## 二、生成 Token

### 2.1 【解析环节①】登录时把身份写入 Token — Services/JwtTokenService.cs

> 这一步决定"请求自带的 token 里有什么信息"。这里写入什么 claim，Controller 里就只能读出什么 claim。

```csharp
public string GenerateToken(string userId, string username, string role = "normal", string realName = null)
{
    var jwtSettings = _configuration.GetSection("Jwt");
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var expirationMinutes = int.Parse(jwtSettings["ExpirationMinutes"]);

    // ★ 解析环节①：把用户身份写入 token（之后每个请求的 token 都自带这些信息）
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, userId),   // → Controller 里 User.FindFirst(ClaimTypes.NameIdentifier) 读
        new Claim(ClaimTypes.Name, username),           // → User.FindFirst(ClaimTypes.Name) 读【用户名，查权限缓存的key】
        new Claim(ClaimTypes.Role, role),               // → User.FindFirst(ClaimTypes.Role) 读【角色】
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
    };
    if (!string.IsNullOrEmpty(realName))
        claims.Add(new Claim("RealName", realName));    // → User.FindFirst("RealName") 读【中文名，自定义claim】


    var token = new JwtSecurityToken(
        issuer: jwtSettings["Issuer"], audience: jwtSettings["Audience"],
        claims: claims, expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
        signingCredentials: credentials);
    return new JwtSecurityTokenHandler().WriteToken(token);
}
```

### 2.2 【下发层】登录下发权限数组（Controllers/AuthController.cs）

```csharp
// Login：第71-84行（token 交给前端，permissions 数组单独下发——权限码不放 token 里）
var token = _jwtTokenService.GenerateToken(user.Id.ToString(), user.UserName, user.Role, user.RealName);
var permissions = string.IsNullOrEmpty(user.Permissions)
    ? new List<string>()
    : user.Permissions.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();
return Ok(new LoginResponse { AccessToken = token, Role = user.Role, Permissions = permissions, /* ...用户信息 */ });

// CheckAuth：重新从内存缓存取【最新】权限（角色变更后无需重新登录）
var currentPermissions = string.IsNullOrEmpty(user.Permissions)
    ? new List<string>()
    : user.Permissions.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();
// user.IsBanned 时返回 401（封禁校验）
```

## 三、解析 Token 与验证权限

### 3.1 【解析环节②】每个请求自动验证并解析 Token（Program.cs）

> 这一步是"解析请求自带的 token"的**自动部分**：不需要在任何 Controller 里写解析代码，中间件验证通过后自动把 token 里的 claims 还原成 `HttpContext.User`（即 Controller 里直接可用的 `User` 属性）。

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    // ★ 解析环节②：验证请求头 Authorization: Bearer xxx 里的 token
    //   验证通过 → token 里的 claims 自动还原为 Controller 里的 User 属性
    //   验证失败 → 请求直接被拦（401），根本进不了 Controller
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,  ValidateAudience = true,
        ValidateLifetime = true,  ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],  ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ClockSkew = System.TimeSpan.Zero   // 到期即失效，不留宽限
    };
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context => { /* 记日志 */ return Task.CompletedTask; }
        // 如需封禁立即生效，在此加 OnTokenValidated 回调查内存缓存的 IsBanned
    };
});

// ── 中间件管道（顺序不能颠倒）──
// UseAuthentication：认证中间件——读请求头里的 Bearer token，验签/验期，
//                     把解析出的身份塞进 HttpContext.User（上面 3.1 配置的就是它）
// UseAuthorization ：授权中间件——根据 [Authorize]/[AllowAnonymous] 特性决定放行还是 403，
//                     它依赖前一步塞好的 User，所以必须排在 UseAuthentication 之后
// 顺序反了会导致 User 还是空的，[Authorize] 全部 401 或权限校验失效
app.UseAuthentication();   // ① 先认证：解析 token → 填充 User
app.UseAuthorization();    // ② 后授权：按特性拦截 → 放行或 403
// ③ 之后请求才进入 Controller —— 所以 Controller 里 User.FindFirst(...) 才有值

// ── 常见疑问：UseAuthentication() 没有任何参数，它怎么知道"怎么验"？──
// 答案："怎么验"和"什么时候验"是分离的：
//   ① 怎么验 → 前面 AddAuthentication().AddJwtBearer(options => {...}) 在【DI 容器】里
//      注册了 JwtBearerHandler（真正干活的处理器）和 TokenValidationParameters（验证规则）
//   ② 什么时候验 → UseAuthentication() 把认证中间件插进请求管道，
//      运行时每个请求流经这里，中间件从 DI 容器取出注册好的 Handler 按规则执行
// 类比：AddJwtBearer = 教门卫怎么查证件（规则）；UseAuthentication = 把门卫安排到岗位；
//       [Authorize] = 规定这间房必须查证。三样缺一不可：
//       只注册不启用 → 没人查证（User 永远是空）；
//       只启用不注册 → 不知道按什么规则验（启动报错）；
//       都有但 Controller 没加 [Authorize] → 验了不拦，匿名请求也能进接口
```

#### 解析之后如何使用（中间件解析完，Controller 里怎么拿到结果）

中间件解析完成后，解析结果放在 **`HttpContext.User`**（`ClaimsPrincipal` 类型）。Controller 继承自 `ControllerBase`，基类自带 `User` 属性，**不用注入、不用 new，直接写 `User` 就是在用它**。使用方式有三种，按需选：

```csharp
// ── 用法1：类级/方法级 [Authorize] —— 只问"token 有没有效"，不读内容 ──
[ApiController]
[Route("api/[controller]")]
[Authorize]                          // 没带 token / token 过期/伪造 → 自动 401，进不了任何接口
public class ClockController : ControllerBase { ... }

// ── 用法2：User.FindFirst(...) 读 token 里的身份字段（解析结果的具体消费）──
[HttpGet("records")]
public async Task<IActionResult> GetRecords()
{
    // 写 token 时是什么 key（环节① GenerateToken），这里就用什么 key 读，一个字都不能差
    var username = User.FindFirst(ClaimTypes.Name)?.Value;      // 读用户名，如 "lisi"
    var role     = User.FindFirst(ClaimTypes.Role)?.Value;      // 读角色，如 "foreman"
    var realName = User.FindFirst("RealName")?.Value;           // 读自定义 claim（key 是普通字符串）
    // ... 拿 username/role 做业务过滤，比如普通用户只能查自己的记录
}

// ── 用法3：拿解析出的 username 去内存权限缓存查权限码（权限校验的核心用法）──
// 详见下方 3.2 节 HasPermission，这里只看衔接关系：
//   token 解析出 username → username 查 _userPermissions → 得到权限串 → Contains(权限码)
private bool HasPermission(string permissionCode)
{
    var username = User.FindFirst(ClaimTypes.Name)?.Value;   // ← 用法2 的读法
    var user = _userPermissions.FirstOrDefault(u => u.UserName == username);  // ← 用解析结果查缓存
    return user?.Permissions?.Split(',')?.Contains(permissionCode) == true;
}
```

**衔接关系**：环节①写入 → 环节②本节自动解析成 `User` → 用法1/2/3 消费 → `HasPermission`

### 3.2 【解析环节③ + 后端层】Controller 读取 Token 身份并校验权限（Controllers/ClockController.cs 第 956-969 行模式）

```csharp
/// <summary>
/// 检查当前登录用户是否拥有指定权限码（从内存缓存 V_UserPermissions 读取）
/// </summary>
private bool HasPermission(string permissionCode)
{
    // ★ 解析环节③：User 是 JWT 中间件（环节②）从请求自带 token 里还原出来的，
    //   FindFirst(ClaimTypes.Name) 读到的就是环节① GenerateToken 写进去的 username
    var username = User.FindFirst(ClaimTypes.Name)?.Value;
    if (string.IsNullOrEmpty(username)) return false;

    // ★ 后端层：用 token 解析出的用户名去内存权限缓存查权限码（不查库，快）
    var user = _userPermissions.FirstOrDefault(u => u.UserName == username);
    if (user == null) return false;

    if (string.IsNullOrEmpty(user.Permissions)) return false;

    var permissionList = user.Permissions.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    return permissionList.Contains(permissionCode);
}

// 接口用法（敏感操作返回 403 + errorType=forbidden）：
if (!HasPermission("clock:delete"))
{
    _loggingService.Warning("ClockController.DeleteClockRecord函数",
        $"用户{username}无 clock:delete 权限，尝试删除 id={id}");
    return StatusCode(403, new
    {
        success = false,
        message = "只有班长或管理员才能删除上下工记录",
        errorType = "forbidden"
    });
}
```

### 3.3 解析请求自带 Token 的信息（Controller 内取值）

**链路：登录写入 → 中间件自动解析 → Controller 读取，三步对上同一个 key**

```text
① 写入（登录时）Services/JwtTokenService.cs GenerateToken
   new Claim(ClaimTypes.Name, username)          ← key 在这里定下
        ↓ token 下发给前端，前端存 localStorage('access_token')
② 前端使用（每个请求）utils/request.js 请求拦截器
   自动把 token 放进请求头：Authorization: Bearer xxx（前端请求拦截器自动添加）
        ↓
③ 自动解析（每个请求）Program.cs .AddJwtBearer(...)
   中间件验证签名/有效期后，把 claims 还原成 ClaimsPrincipal
   塞进 HttpContext.User（Controller 基类属性 User，无需任何注入）
        ↓
④ 读取（Controller 内）User.FindFirst(同一个key)?.Value
```

#### Claim 写入 / 读取对照表

登录时在 `GenerateToken`（环节①）里写入什么 claim，Controller 里就只能用同一个 key 读出来。对照如下：

| Claim 类型 | 写入的值（环节① `GenerateToken`） | Controller 读取方式 | 用途 |
| --- | --- | --- | --- |
| `ClaimTypes.NameIdentifier` | `userId` | `User.FindFirst(ClaimTypes.NameIdentifier)?.Value` | 用户 ID |
| `ClaimTypes.Name` | `username` | `User.FindFirst(ClaimTypes.Name)?.Value` | 用户名，查权限缓存的 key |
| `ClaimTypes.Role` | `role` | `User.FindFirst(ClaimTypes.Role)?.Value` | 角色 |
| `"RealName"`（自定义 claim） | `realName` | `User.FindFirst("RealName")?.Value` | 中文名 |
| `JwtRegisteredClaimNames.Jti` | `Guid.NewGuid()` | `User.FindFirst(JwtRegisteredClaimNames.Jti)?.Value` | 令牌唯一 ID |
| `JwtRegisteredClaimNames.Iat` | 签发时间戳 | `User.FindFirst(JwtRegisteredClaimNames.Iat)?.Value` | 签发时间 |

**`User` 到底是哪来的（新手最容易懵的点）**：

```csharp
// Controller 里直接写的 User，不是你定义的变量，也不是注入的服务！
var username = User.FindFirst(ClaimTypes.Name)?.Value;
//  ↑ User 是 ASP.NET Core 的 ControllerBase 基类自带属性：
//    public ClaimsPrincipal User => HttpContext.User;
//    等价于写 HttpContext.User，继承自 Controller/ControllerBase 就直接能用
//
// 它的值由 JWT 中间件（环节③）填充：
//   请求进来 → 中间件读请求头 Authorization: Bearer xxx → 验签/验期通过
//   → 把 token 里的每个 claim 还原成 ClaimsPrincipal → 赋给 HttpContext.User
//
// 所以：token 里有什么 claim，User 里就能 FindFirst 出什么，
//       没带 token / token 无效 → 中间件直接 401，请求根本到不了 Controller
```

> **为什么需要权限码（如 `clock:delete`）**
>
> 之所以要把权限设计成"权限码"，是因为它同时服务于两个层级：**页面级**（菜单 / 路由是否对用户可见）与**按钮级**（某个操作按钮是否允许点击、对应接口是否放行）。本方案用同一套权限码统一描述"页面权限"和"按钮权限"——前端按权限码控制显隐，后端用 `HasPermission` 控制放行。
