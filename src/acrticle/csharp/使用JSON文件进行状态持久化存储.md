---
title: 使用JSON文件进行状态持久化存储
icon: code
order: 39
category:
  - C#学习
tag:
  - JSON
  - 状态持久化
---

# JSON 文件持久化存储实现指南

## 概述

提供在 C# ASP.NET Core 项目中使用 JSON 文件进行状态持久化的完整方案。适用于需要在程序重启后保持状态的场景，如定时任务提交记录、排班系统状态等。

## 使用场景

- 后台服务定时提交数据，避免程序重启后重复提交
- 记录已处理的班次/任务状态
- IIS 定时重启场景下的状态保持
- 需要跨会话保持的简单状态数据

## 实现步骤

### 1. 添加必要的 using 语句

```csharp
using Newtonsoft.Json;
```

### 2. 定义状态字典（类级别）

```csharp
public class YourBackgroundService : BackgroundService
{
    // 记录每个班次是否已提交，Key: "yyyy-MM-dd_白班/晚班", Value: 是否已提交
    private Dictionary<string, bool> submittedShifts = new Dictionary<string, bool>();
    
    // 其他依赖注入...
}
```

### 3. 在服务启动时加载 JSON 文件

```csharp
public async Task YourTaskAsync(CancellationToken stoppingToken)
{
    // 从JSON文件加载已提交的班次记录
    await LoadSubmittedShiftsFromJsonAsync(submittedShifts);

    while (!stoppingToken.IsCancellationRequested)
    {
        // 业务逻辑...
    }
}
```

### 4. 提交成功后保存状态

```csharp
if (shouldSubmit)
{
    // 执行业务逻辑...
    await _databaseService.AddAsync(proData);

    // 标记该班次已提交
    submittedShifts[shiftKey] = true;
    _loggingService.Info("YourService.SubmitToDbAsync", $"班次 {shiftKey} 已标记为已提交");

    // 保存到JSON文件
    await SaveSubmittedShiftsToJsonAsync(submittedShifts);

    // 等待一段时间避免重复提交
    await Task.Delay(TimeSpan.FromMinutes(2), stoppingToken);
}
```

### 5. 实现保存方法

```csharp
/// <summary>
/// 将submittedShifts字典写入到JSON文件
/// 文件位于C:\WH\项目文件夹\SubmittedShifts.json
/// </summary>
private async Task SaveSubmittedShiftsToJsonAsync(Dictionary<string, bool> submittedShifts)
{
    try
    {
        string json = JsonConvert.SerializeObject(submittedShifts, Formatting.Indented);
        string currentExePath = AppDomain.CurrentDomain.BaseDirectory;
        string folderName = new DirectoryInfo(currentExePath).Name;
        string targetDirectory = @"C:\WH";
        string jsonFilePath = Path.Combine(targetDirectory, folderName, "SubmittedShifts.json");

        Directory.CreateDirectory(Path.GetDirectoryName(jsonFilePath));
        await File.WriteAllTextAsync(jsonFilePath, json);
        _loggingService.Info("YourService.SaveSubmittedShiftsToJsonAsync", $"成功将submittedShifts写入到{jsonFilePath}文件");
    }
    catch (Exception ex)
    {
        _loggingService.Error("YourService.SaveSubmittedShiftsToJsonAsync", "写入SubmittedShifts.json文件失败", ex);
    }
}
```

### 6. 实现加载方法

```csharp
/// <summary>
/// 从JSON文件加载submittedShifts的初始值
/// 如果文件存在则读取，不存在则使用空字典
/// </summary>
private async Task LoadSubmittedShiftsFromJsonAsync(Dictionary<string, bool> submittedShifts)
{
    try
    {
        string currentExePath = AppDomain.CurrentDomain.BaseDirectory;
        string folderName = new DirectoryInfo(currentExePath).Name;
        string targetDirectory = @"C:\WH";
        string filePath = Path.Combine(targetDirectory, folderName, "SubmittedShifts.json");

        Directory.CreateDirectory(Path.GetDirectoryName(filePath));

        if (File.Exists(filePath))
        {
            string json = await File.ReadAllTextAsync(filePath);
            var loadedDictionary = JsonConvert.DeserializeObject<Dictionary<string, bool>>(json);
            if (loadedDictionary != null)
            {
                foreach (var kvp in loadedDictionary)
                {
                    submittedShifts[kvp.Key] = kvp.Value;
                }
                _loggingService.Info("YourService.LoadSubmittedShiftsFromJsonAsync", $"成功从{filePath}文件加载了{submittedShifts.Count}条提交记录");
            }
        }
        else
        {
            _loggingService.Info("YourService.LoadSubmittedShiftsFromJsonAsync", $"{filePath}文件不存在，将使用空字典");
        }
    }
    catch (Exception ex)
    {
        _loggingService.Error("YourService.LoadSubmittedShiftsFromJsonAsync", "加载SubmittedShifts.json文件失败", ex);
    }
}
```

## 完整示例

### 排班系统提交场景

```csharp
public async Task SubmitToDbAsync(CancellationToken stoppingToken)
{
    bool isFirstExecution = true;
    Dictionary<string, bool> submittedShifts = new Dictionary<string, bool>();

    // 从JSON文件加载已提交的班次记录
    await LoadSubmittedShiftsFromJsonAsync(submittedShifts);

    while (!stoppingToken.IsCancellationRequested)
    {
        var now = DateTime.Now;

        // 0代表白班，1代表夜班
        int shift2 = (now.Hour >= 8 && now.Hour < 20) ? 0 : 1;


        // 当为夜班且当前时间为00:00-08:00时，查询昨日数据
        if (shift2 == 1 && currentHour >= 0 && currentHour < 8)
        {
            queryDate = queryDate.AddDays(-1);
        }

        string shiftName = shift2 == 0 ? "白班" : "晚班";

        // 构建班次提交记录Key: "yyyy-MM-dd_白班/晚班"
        string shiftKey = $"{queryDate:yyyy-MM-dd}_{shiftName}";

        
        bool shouldSubmit = false;
        
        // 正常触发时间：8:00-8:10 或 20:00-20:10
        if ((now.Hour == 8 && now.Minute >= 0 && now.Minute <= 10) || 
            (now.Hour == 20 && now.Minute >= 0 && now.Minute <= 10))
        {
            // 检查该班次是否已提交
            if (!submittedShifts.ContainsKey(shiftKey) || !submittedShifts[shiftKey])
            {
                shouldSubmit = true;
            }
        }
        
        // 补救提交：如果错过整点，在8:01-8:10或20:01-20:10之间进行补救
        if (((now.Hour == 8 && now.Minute >= 1 && now.Minute <= 10) || 
             (now.Hour == 20 && now.Minute >= 1 && now.Minute <= 10)) &&
            (!submittedShifts.ContainsKey(shiftKey) || !submittedShifts[shiftKey]))
        {
            shouldSubmit = true;
            _loggingService.Info("YourService.SubmitToDbAsync", $"检测到错过整点提交，进行补救提交，班次: {shiftKey}");
        }

        if (shouldSubmit)
        {
            // 执行业务逻辑，提交数据到数据库
            var proData = new ProductionData
            {
                RecordTime = DateTime.Now.AddMinutes(-1),
                ShiftTotalOutput = result.TotalQuantity,
                Shift = shiftName,
            };
            
            await _databaseService.AddAsync(proData);

            // 标记该班次已提交
            submittedShifts[shiftKey] = true;
            _loggingService.Info("YourService.SubmitToDbAsync", $"班次 {shiftKey} 已标记为已提交");

            // 保存到JSON文件
            await SaveSubmittedShiftsToJsonAsync(submittedShifts);

            // 等待2min，确保只提交一条记录
            await Task.Delay(TimeSpan.FromMinutes(2), stoppingToken);
        }
        else
        {
            // 不满足条件时，等待20秒后再检查
            await Task.Delay(TimeSpan.FromSeconds(20), stoppingToken);
        }
    }
}
```

## 注意事项

1. **文件路径**：默认存储在 `C:\WH\项目文件夹名\SubmittedShifts.json`，确保该目录有写入权限
2. **并发安全**：如果是多线程场景，需要对字典操作加锁
3. **定期清理**：JSON 文件会不断增长，建议定期清理过期数据
4. **异常处理**：保存和加载操作都有 try-catch，确保不影响主流程
5. **备份策略**：重要数据建议同时存储到数据库，JSON 仅作为辅助状态记录

## 项目文件结构

```
C:\WH\
└── Test_SchedulingData\
    └── SubmittedShifts.json    # 自动生成的状态文件
```

## JSON 文件示例

```json
{
  "2026-04-13_白班": true,
  "2026-04-13_晚班": true,
  "2026-04-14_白班": true
}
```
