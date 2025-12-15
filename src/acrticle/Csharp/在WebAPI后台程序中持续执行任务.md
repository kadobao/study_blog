---
title: 在WebAPI后台程序中持续执行任务
icon: code
order: 31
category:
  - C#学习
tag:
  - WebAPI
  - 后台任务
  - 持续执行
---

# 在WebAPI后台程序中持续执行任务

## 概述

在WebAPI应用中，经常需要一些后台任务来执行定时操作、数据同步、监控等需求。这些任务需要能够启动、执行、停止，并且能够优雅地处理异常。

## 核心实现原理

后台任务的核心实现基于以下关键点：

- 在 `ExecuteAsync` 方法中调用可循环执行的函数
- 传入 `CancellationToken` 用于控制任务的取消
- 使用 `while (!stoppingToken.IsCancellationRequested)` 循环判断是否需要停止
- 通过 try-catch 块优雅处理异常和正常停止

## 完整实现代码

以下是一个"能启动、能循环执行、能优雅停止、异常不中断"的后台服务模板代码：

```csharp
/// <summary>
/// 后台服务入口方法
/// </summary>
protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    _logger.LogInformation("后台服务启动");

    try
    {
        // 启动后台任务主循环
        await RunAsync(stoppingToken);
    }
    finally
    {
        _logger.LogInformation("后台服务结束");
    }
}

/// <summary>
/// 后台任务主循环方法
/// </summary>
private async Task RunAsync(CancellationToken stoppingToken)
{
    // 持续循环执行后台任务
    while (!stoppingToken.IsCancellationRequested)
    {
        try
        {
            // 在此处添加需要在后台持续执行的任务逻辑
            // 例如：定时数据同步、监控检查、定时清理等
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
        catch (TaskCanceledException)
        {
            // 任务被正常取消，退出循环
            break;
        }
        catch (Exception ex)
        {
            // 记录异常但不让程序崩溃
            _logger.LogError(ex, "后台任务执行异常");
            
            // 短暂延迟后重试，避免异常循环
            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        }
    }
}
```

## 实际使用示例

以下是一个实际的使用示例，展示如何在后台任务中执行数据同步操作：

```csharp
/// <summary>
/// 后台任务主循环方法 - 数据同步示例
/// </summary>
private async Task RunAsync(CancellationToken stoppingToken)
{
    while (!stoppingToken.IsCancellationRequested)
    {
        try
        {
            // 示例：每5分钟执行一次数据同步
            await PerformDataSyncAsync();
            
            // 等待5分钟或直到收到取消信号
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
        catch (TaskCanceledException)
        {
            // 正常停止
            break;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "数据同步任务异常");
            
            // 异常时等待30秒再重试
            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        }
    }
}

/// <summary>
/// 模拟数据同步操作
/// </summary>
private async Task PerformDataSyncAsync()
{
    _logger.LogInformation("开始执行数据同步");
    
    // 模拟数据同步工作
    await Task.Delay(TimeSpan.FromSeconds(10));
    
    _logger.LogInformation("数据同步完成");
}
```

## 最佳实践

### 1. 异常处理
- 使用 try-catch 包裹主要逻辑
- 区分 `TaskCanceledException`（正常停止）和其他异常
- 记录异常信息便于调试

### 2. 资源管理
- 使用 `CancellationToken` 控制任务生命周期
- 在 finally 块中清理资源
- 避免长时间运行的阻塞操作

### 3. 性能优化
- 合理设置循环间隔时间
- 避免频繁的数据库查询或网络请求
- 考虑使用 `SemaphoreSlim` 限制并发数

### 4. 并发控制
**使用 `SemaphoreSlim` 限制同时执行的任务数量**

在处理大量数据或访问受限资源时，限制并发数可以避免系统过载：

```csharp
private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(3, 3); // 最多同时3个任务

private async Task RunAsync(CancellationToken stoppingToken)
{
    while (!stoppingToken.IsCancellationRequested)
    {
        try
        {
            // 获取信号量许可证
            await _semaphore.WaitAsync(stoppingToken);
            
            try
            {
                // 执行需要限制并发的任务
                await ProcessDataAsync();
            }
            finally
            {
                // 释放信号量许可证
                _semaphore.Release();
            }
            
            await Task.Delay(TimeSpan.FromSeconds(1), stoppingToken);
        }
        catch (TaskCanceledException)
        {
            break;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "处理数据异常");
        }
    }
}

private async Task ProcessDataAsync()
{
    // 模拟需要限制并发的操作
    await Task.Delay(TimeSpan.FromSeconds(2));
}
```

### 5. 日志记录
- 记录服务启动和停止
- 记录关键操作步骤
- 记录异常和错误信息

## 总结

通过继承 `BackgroundService` 并重写 `ExecuteAsync` 方法，可以轻松实现WebAPI中的后台任务。