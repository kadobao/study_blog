---
title: WebAPI的后台服务
icon: code
order: 28
category:
  - C#学习
tag:
  - 后台服务
---

## 实现步骤

### 1. 在Program.cs中注册托管服务

在 `Program.cs` 文件中注册托管服务，增加一行代码：

```csharp
using Test_WebAPI.BackgroundTasks;
builder.Services.AddHostedService<DeviceBackgroundService>();
```

### 2. 创建后台服务文件

创建 `BackgroundTasks` 文件夹，然后创建 `DeviceBackgroundService.cs` 文件，代码如下：

```csharp
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Test_WebAPI.BackgroundTasks
{
    public class DeviceBackgroundService : BackgroundService
    {
        private readonly ILogger<DeviceBackgroundService> _logger;

        public DeviceBackgroundService(ILogger<DeviceBackgroundService> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("DeviceBackgroundService is running.");
                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}
```

## 核心方法说明

### ExecuteAsync 方法

`ExecuteAsync` 是你需要重写的核心方法。这个方法会被系统调用，启动后台服务。你可以在此方法中执行你希望后台运行的代码，比如：

- 定时任务
- 后台数据处理
- 消息处理等

> **注意**：ExecuteAsync 方法在整个后台服务的生命周期中只会被调用一次

### 方法参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| stoppingToken | CancellationToken | 传入的取消令牌，可以用于优雅地停止任务。通常会定期检查这个令牌，以便在应用关闭时停止执行后台任务。 |

## 重要说明

`BackgroundService` 主要提供了 `ExecuteAsync(CancellationToken stoppingToken)` 方法，它是后台任务的核心入口。