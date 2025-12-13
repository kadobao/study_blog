---
title: 从URL获取JSON数据然后反序列化获取键值并且使用单例作为全局变量
icon: code
order: 29
category:
  - C#学习
tag:
  - JSON
---

## 项目概述

本文介绍如何使用 `HttpClient` 访问 URL，获取 JSON 数据后进行反序列化，并将模型存储为单例模式作为全局变量使用。

## 技术要点

从 URL 获取到的 JSON 数据（通常是一个字符串）需要进行 **反序列化（Deserialization）**，才能在 C# 中访问其中的键值。

## 实现步骤

### 1. 创建数据模型

首先创建 `Models` 文件夹，建立模型类。可以直接复制 JSON 数据，在 Visual Studio 中：

1. 新建一个 C# 文件，比如 `ApiResponse.cs`
2. 在空文件中，点击顶部菜单：**编辑 → 选择性粘贴 → 将 JSON 粘贴为类**

### 2. 优化生成的模型类

生成的类需要修改，如果 JSON 里面存在字典类型，需要改为 `Dictionary<string, object>`。

#### 原始生成的模型：

```csharp
public class Rootobject
{
    public bool success { get; set; }
    public string ip { get; set; }
    public string type { get; set; }
    public Country country { get; set; }
    public string region { get; set; }
    public string city { get; set; }
    public Location location { get; set; }
    public string timeZone { get; set; }
    public Asn asn { get; set; }
}

public class Country
{
    public string code { get; set; }
    public string name { get; set; }
}

public class Location
{
    public float lat { get; set; }
    public float lon { get; set; }
}

public class Asn
{
    public int number { get; set; }
    public string name { get; set; }
    public string network { get; set; }
}
```

#### 优化后的模型：

```csharp
using System;
using System.Collections.Generic;

namespace Test_Http.Models
{
    public class Ip_Response2
    {
        public bool success { get; set; }
        public string ip { get; set; }
        public string type { get; set; }
        public Dictionary<string, object> country { get; set; }
        public string region { get; set; }
        public string city { get; set; }
        public Dictionary<string, object> location { get; set; }
        public string timeZone { get; set; }
        public Dictionary<string, object> asn { get; set; }
    }
}
```

### 3. 安装依赖包

安装 `Newtonsoft.Json` 包用于 JSON 序列化/反序列化操作。

### 4. 配置单例模式

在 `Program.cs` 里面将模型注册为单例（当作全局变量）:
```csharp
builder.Services.AddSingleton<Ip_Response2>();
```

然后在使用的类文件里面声明：

```csharp
private Ip_Response2 _ip_response2;
```

并使用 **依赖注入** 方式获取实例。

### 5. 使用示例

```csharp
// 发送 GET 请求
string response = await client.GetStringAsync("https://api.my-ip.io/v2/ip.json");

// 打印返回的 JSON 字符串
Console.WriteLine(response);

// 解析 JSON 字符串为 Ip_Response 对象
var ipResponse2 = JsonConvert.DeserializeObject<Ip_Response2>(response);

// 更新单例实例的属性值（而不是替换整个实例）
_ip_response2.success = ipResponse2.success;
_ip_response2.ip = ipResponse2.ip;
_ip_response2.type = ipResponse2.type;
_ip_response2.country = ipResponse2.country;
_ip_response2.region = ipResponse2.region;
_ip_response2.city = ipResponse2.city;
_ip_response2.location = ipResponse2.location;
_ip_response2.timeZone = ipResponse2.timeZone;
_ip_response2.asn = ipResponse2.asn;
```

## 总结

通过以上步骤，我们可以：

1. ✅ 使用 `HttpClient` 获取远程 JSON 数据
2. ✅ 反序列化 JSON 数据为强类型对象
3. ✅ 使用单例模式管理全局数据
4. ✅ 通过依赖注入方式使用全局变量

这样可以在整个应用程序中共享获取的数据，提高性能和代码复用性。