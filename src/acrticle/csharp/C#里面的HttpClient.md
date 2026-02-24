---
title: C#里面的HttpClient
icon: code
order: 26
category:
  - C#学习
tag:
  - HttpClient
---

## 概述（HttpClient 类：用于网络请求）

HttpClient 是 .NET 中用于发送 HTTP 请求的核心类，支持同步和异步操作。

## 基础使用示例

以下是一个基本的 HttpClient 使用示例：

```csharp
using System.Net.Http;
using System.Threading.Tasks;

namespace Test_WebAPI_Http.Services
{
    public class MyService
    {
        private readonly HttpClient _httpClient;

        public MyService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<string> FetchDataAsync()
        {
            return await _httpClient.GetStringAsync("https://ipinfo.io/json");
        }
    }
}
```

## 常用方法整理

下面是 HttpClient 常用 GET 和 POST 方法的详细整理：

| 方法 | 描述 | 示例代码 |
|------|------|----------|
| **GET 方法** | | |
| `GetAsync` | 异步发送 GET 请求并返回响应消息 | `var response = await httpClient.GetAsync("https://example.com");` |
| `GetStringAsync` | 异步发送 GET 请求并返回响应内容字符串 | `var content = await httpClient.GetStringAsync("https://example.com");` |
| `GetByteArrayAsync` | 异步发送 GET 请求并返回响应内容字节数组 | `var byteArray = await httpClient.GetByteArrayAsync("https://example.com");` |
| **POST 方法** | | |
| `PostAsync` | 异步发送 POST 请求并返回响应消息 | `var response = await httpClient.PostAsync("https://example.com", content);` |
| `PostStringAsync` | 异步发送 POST 请求，将字符串作为请求体 | `var response = await httpClient.PostStringAsync("https://example.com", content);` |
| `PostJsonAsync` | 异步发送 POST 请求，将 JSON 数据作为请求体 | `var response = await httpClient.PostJsonAsync("https://example.com", jsonContent);` |
| `PostFormAsync` | 异步发送 POST 请求，使用表单数据作为请求体 | `var response = await httpClient.PostFormAsync("https://example.com", formContent);` |

## 使用说明

### 基础方法说明

- `GetAsync` 和 `PostAsync` 是最基础的异步 HTTP 方法，适用于处理各种 GET 和 POST 请求
- 这两个方法返回 `HttpResponseMessage` 对象，可以访问状态码、响应头和响应内容

### 便捷方法说明

- `GetStringAsync` 和 `GetByteArrayAsync` 是 `GetAsync` 的快捷形式，直接返回响应内容而非完整的响应对象
- `PostJsonAsync` 和 `PostFormAsync` 根据内容类型提供便捷的提交方法，分别用于 JSON 数据和表单数据

### 最佳实践建议

1. **复用 HttpClient 实例**：避免频繁创建和销毁 HttpClient 实例
2. **使用异步方法**：在 .NET 环境中优先使用异步方法避免阻塞
3. **正确处理异常**：添加适当的异常处理逻辑
4. **设置超时**：根据需求设置合适的请求超时时间
