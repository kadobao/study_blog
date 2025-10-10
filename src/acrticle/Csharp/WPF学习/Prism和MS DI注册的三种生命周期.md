---
title: Prism和MS DI注册的三种生命周期
icon: code
order: 17
category:
  - C#学习
tag:
  - Prism
  - MS DI
---

# MS DI 支持的三种生命周期

MS DI（Microsoft Dependency Injection）提供了三种服务生命周期，每种生命周期适用于不同的场景：

| 方法 | 说明 | 生命周期特点 |
|------|------|-------------|
| `services.AddTransient<TService, TImplementation>()` | 瞬时 | 每次请求都创建新实例 |
| `services.AddScoped<TService, TImplementation>()` | 作用域 | 同一作用域内单例 |
| `services.AddSingleton<TService, TImplementation>()` | 单例 | 全局唯一实例 |

## 生命周期详解

### 瞬时（Transient）
- 每次从服务容器请求服务时，都会创建一个新的实例
- 适用于轻量级、无状态的服务
- 生命周期最短，每次使用都是新对象

### 作用域（Scoped）
- 在同一作用域（Scope）内，多次请求会返回同一个实例
- 不同作用域会创建不同的实例
- 适用于需要在单个请求或操作期间保持状态的服务

### 单例（Singleton）
- 整个应用程序生命周期中只创建一个实例
- 所有请求都会返回同一个实例
- 适用于全局共享的服务，如配置、日志服务等

# Prism 的三种生命周期

Prism框架也提供了对应的服务注册方式：

## 单例（Singleton）
```csharp
containerRegistry.RegisterSingleton<TService, TImplementation>()
```

## 瞬态（Transient）
```csharp
containerRegistry.Register<TService, TImplementation>()
```

## 作用域（Scoped）
```csharp
containerRegistry.RegisterScoped<TService, TImplementation>()
```

## 使用建议

1. **单例模式**：适用于配置管理、日志记录、缓存服务等全局共享资源
2. **作用域模式**：适用于需要在特定范围内保持状态的服务，如数据库上下文
3. **瞬时模式**：适用于轻量级、无状态的服务，如计算服务、验证服务等

选择合适的生命周期对于应用程序的性能和资源管理非常重要。