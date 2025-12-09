---
title: C#里面的WebAPI和HttpClient
icon: code
order: 25
category:
  - C#学习
tag:
  - WebAPI
  - HttpClient
---

# C# 里面的 WebAPI 和 HttpClient

## ASP.NET Core Web API 接口创建指南

### 文件结构与命名规则

在 ASP.NET Core Web API 项目中，控制器文件应直接放在 `Controllers` 文件夹中。

#### 文件命名规则

- 文件名必须以 `Controller` 结尾
- `Controller` 前面的部分将自动成为 API 的一级路径

**示例**：

| 项目 | 值 |
|------|-----|
| 文件名 | `TestController.cs` |
| 对应的 API 路径 | `/api/Test` |

### 代码示例

```csharp
// Controllers/TestController.cs
using Microsoft.AspNetCore.Mvc;

namespace Test_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TestController : ControllerBase
    {
        // 访问地址：http://10.1.193.130:7878/api/Test/Get
        [HttpGet]
        public string Get()
        {
            return "Hello World!";
        }
    }
}
```

### 路由规则说明

特性 `[Route("api/[controller]/[action]")]` 的含义如下：

- `api`：固定的 URL 前缀
- `[controller]`：自动替换为控制器类名（**去掉 `Controller` 后缀**）
- `[action]`：自动替换为方法名（即 Action 名称）

#### 完整访问路径示例

| 项目 | 值 |
|------|-----|
| 控制器文件 | `TestController.cs` |
| 方法名 | `Get()` |
| 完整 URL | `http://localhost:7567/api/Test/Get` |

> **注意**：实际端口号（如 `7567` 或 `7878`）取决于项目启动配置。

### 总结

- **文件名** 决定 API 的一级路径（如 `TestController` → `/Test`）
- **方法名** 决定 API 的二级路径（如 `Get` → `/Get`）
- 路由模板 `api/[controller]/[action]` 会自动将控制器名和方法名映射到 URL 路径中

---

## HttpClient 使用指南

### 1. 需要的命名空间

```csharp
using System.Net.Http;
using System.Threading.Tasks;
```

### 2. 在 Program.cs 中配置 HttpClientFactory

```csharp
builder.Services.AddHttpClient();
```

### 3. 创建服务类

在 `Service` 文件夹中创建 `MyService.cs` 文件：

```csharp
using System.Net.Http;
using System.Threading.Tasks;

namespace Test_WebAPI_Http.Services
{
    public class MyService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly HttpClient _httpClient;

        public MyService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            // 从HttpClientFactory获取HttpClient实例
            _httpClient = _httpClientFactory.CreateClient();
        }

        public async Task<string> FetchDataAsync()
        {
            return await _httpClient.GetStringAsync("https://ipinfo.io/json");
        }
    }
}
```

### 4. 创建控制器

在 `Controllers` 文件夹中创建 `MyServiceController.cs` 文件：

```csharp
using Microsoft.AspNetCore.Mvc;
using Test_WebAPI_Http.Services;
using System.Threading.Tasks;

namespace Test_WebAPI_Http.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MyServiceController : ControllerBase
    {
        private readonly MyService _myService;
        private readonly ILogger<MyServiceController> _logger;

        public MyServiceController(MyService myService, ILogger<MyServiceController> logger)
        {
            _myService = myService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> FetchData()
        {
            try
            {
                _logger.LogInformation("开始调用API");
                var data = await _myService.FetchDataAsync();
                return Content(data, "application/json");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "调用API时发生错误");
                return StatusCode(500, $"错误: {ex.Message}");
            }
        }
    }
}
```

### 5. 访问接口

访问 `http://localhost:7567/api/MyService/FetchData` 即可获取数据。
