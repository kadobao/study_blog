---
title: ASP.NET Core API 转发/中转实现指南
icon: code
order: 40
category:
  - C#学习
tag:
  - WebAPI
  - 转发
  - 中转
---

# ASP.NET Core API 转发/中转实现指南

用于实现 ASP.NET Core 后端作为中转层，将前端请求转发到另一个外部后端服务。

## 使用场景

- 前端需要调用第三方或独立部署的外部 API
- 需要对请求进行统一鉴权、日志记录后再转发
- 需要隐藏外部 API 的真实地址和细节
- 需要对外部 API 进行包装或适配

## 实现步骤

### 1. Controller 结构

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Test_Jwt.Services;

namespace Test_Jwt.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class HealthCheckController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly LoggingService _loggingService;
        private const string ExternalApiBaseUrl = "http://external-api:port";

        public HealthCheckController(
            IHttpClientFactory httpClientFactory,
            LoggingService loggingService)
        {
            _httpClientFactory = httpClientFactory;
            _loggingService = loggingService;
        }
    }
}
```

### 2. GET 请求转发示例

```csharp
[HttpGet]
public async Task<IActionResult> GetData()
{
    try
    {
        var client = _httpClientFactory.CreateClient();
        var url = $"{ExternalApiBaseUrl}/api/External/GetData";

        _loggingService.Info("ControllerName", $"转发 GET 请求到: {url}");

        var response = await client.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            _loggingService.Error("ControllerName", $"外部 API 调用失败, 状态码: {response.StatusCode}");
            return StatusCode((int)response.StatusCode, new { message = "调用外部服务失败" });
        }

        var content = await response.Content.ReadAsStringAsync();
        return Content(content, "application/json");
    }
    catch (Exception ex)
    {
        _loggingService.Error("ControllerName", "转发请求时发生异常", ex);
        return StatusCode(500, new { message = "服务器内部错误", error = ex.Message });
    }
}
```

### 3. POST 请求转发示例

```csharp
[HttpPost]
public async Task<IActionResult> PostData([FromBody] JsonElement paramsData)
{
    try
    {
        var client = _httpClientFactory.CreateClient();
        var url = $"{ExternalApiBaseUrl}/api/External/PostData";

        _loggingService.Info("ControllerName", $"转发 POST 请求到: {url}, 参数: {paramsData.ToString()}");

        var httpContent = new StringContent(
            paramsData.ToString(),
            System.Text.Encoding.UTF8,
            "application/json"
        );

        var response = await client.PostAsync(url, httpContent);

        if (!response.IsSuccessStatusCode)
        {
            _loggingService.Error("ControllerName", $"外部 API 调用失败, 状态码: {response.StatusCode}");
            return StatusCode((int)response.StatusCode, new { message = "调用外部服务失败" });
        }

        var content = await response.Content.ReadAsStringAsync();
        _loggingService.Info("ControllerName", $"响应: {content}");

        return Content(content, "application/json");
    }
    catch (Exception ex)
    {
        _loggingService.Error("ControllerName", "转发请求时发生异常", ex);
        return StatusCode(500, new { message = "服务器内部错误", error = ex.Message });
    }
}
```

### 4. Program.cs 注册 HttpClient

```csharp
builder.Services.AddHttpClient();
```

### 5. 前端调用方式

```javascript
// api/index.js
export const healthApi = {
  resetNodes(data) {
    return request.post('/healthcheck/ResetNodes', data)
  }
}
```

### 6. Vite 代理配置（开发环境）

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5238',  // 只配置到中转后端
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

## 关键要点

1. **路由设计**: 使用 `[Route("api/[controller]/[action]")]` 或固定路径
2. **参数传递**: 使用 `JsonElement` 接收任意 JSON 参数并原样转发
3. **日志记录**: 记录请求和响应便于调试
4. **错误处理**: 捕获异常并返回友好的错误信息
5. **状态码透传**: 外部服务的状态码可以透传给前端
6. **前端统一**: 前端只配置中转后端的代理，无需知道外部 API 地址
