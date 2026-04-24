---
title: 根据JSON响应内容生成C#模型类的skills
icon: code
order: 41
category:
  - C#学习
tag:
  - JSON
  - 模型类
  - 生成
  - AI
---



# JSON响应内容转C#模型

根据用户提供的JSON响应数据，自动生成对应的C#模型类（Model）。

## 使用场景

当用户出现以下情况时调用此skill：
- 用户提供了API响应数据（JSON格式）
- 用户要求"根据响应内容生成模型"
- 用户要求"生成模型类"或类似表述

## 输入要求

用户提供的内容应包含：
1. JSON格式的响应数据（可以是文件路径或直接粘贴的内容）
2. 模型保存的目标位置（文件路径）

## 输出规则

生成的C#模型类必须遵循以下规则：

### 1. 文件命名
- 文件名格式：`{API名称}Response.cs`（或根据实际用途命名）
- 路径：`Models/`目录下

### 2. 类命名规范
- 响应根对象：`{API名称}Response`
- 子对象：根据JSON结构语义命名，使用PascalCase
- 列表项：如JSON数组中包含对象，创建独立类而非匿名类型

### 3. 属性命名规范
- 使用C#标准命名：PascalCase（如 `orderNumber` → `OrderNumber`）
- 如果JSON原已是PascalCase，保持不变
- 添加 `{ get; set; }` 自动属性

### 4. 类型映射规则

| JSON类型 | C#类型 |
|---------|--------|
| `123` (整数) | `int` |
| `123.45` (小数) | `double` |
| `"text"` (字符串) | `string` |
| `true/false` | `bool` |
| `null` | `string` (或 `object`) |
| `[1,2,3]` (数组) | `List<对应类型>` |
| `{"key":"value"}` (对象) | `Dictionary<string, 对应类型>` 或独立类 |
| `"2026-04-24T13:50Z"` (日期) | `string` |

### 5. Newtonsoft.Json特性

- 数组类型：`List<T>` 而非数组 `T[]`
- 嵌套对象：创建独立类
- 动态键（key为变量）：使用 `Dictionary<string, T>`
- 属性名与JSON一致，无需JsonProperty标记

## 示例

### 输入JSON
```json
{
  "count": 22,
  "dataList": [
    {
      "orderNumber": "MO-202260410-0009",
      "OrderStatus": "0",
      "items": ["item1", "item2"]
    }
  ]
}
```

### 输出C#
```csharp
public class OrderItem
{
    public string OrderNumber { get; set; }
    public string OrderStatus { get; set; }
    public List<string> Items { get; set; }
}

public class DataListResponse
{
    public int Count { get; set; }
    public List<OrderItem> DataList { get; set; }
}
```

## 注意事项

1. **先读取现有模型文件**：如果用户指定了已有模型文件路径，先读取内容避免覆盖
2. **保持语义一致**：类名和属性名要有意义，反映业务含义
3. **处理复杂嵌套**：多层嵌套时拆分为多个独立类
4. **数组类型选择**：始终使用 `List<T>` 而非 `T[]`
5. **不确定类型时**：JSON值类型统一使用 `string` 以保证兼容性