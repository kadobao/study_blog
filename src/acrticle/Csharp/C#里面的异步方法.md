---
title: C#里面的异步方法
icon: code
order: 24
category:
  - C#学习
tag:
  - 异步方法
---

## 什么是异步编程

异步就是：`async Task` 组合，然后调用这个方法需要使用到 `await`

> 简单理解：记住 `await/async Task` 就是异步，不堵塞线程就行

## 异步方法的基本语法

### 无返回值的异步方法

```csharp
async Task MethodName()
{
    // 异步操作
}
```

### 有返回值的异步方法

```csharp
async Task<string> MethodName()
{
    // 异步操作
    return "结果";
}
```

## 常用的异步操作

### 延迟操作

```csharp
await Task.Delay(3000); // 这里会"暂停"3秒，但不堵塞线程
```

## 特殊情况

### async void 的使用场景

```csharp
async void EventHandlerMethod(object sender, EventArgs e)
{
    // 这种方式主要用于UI事件处理程序
    await SomeAsyncOperation();
}
```

> **注意**：`async void` 主要用于事件处理程序，一般情况下应该使用 `async Task`

## 异步方法类型对比

| 方法类型 | 返回类型 | 使用场景 | 示例 |
|---------|---------|---------|------|
| 普通异步方法 | `async Task` | 不需要返回值的异步操作 | `async Task ProcessData()` |
| 返回值异步方法 | `async Task<T>` | 需要返回结果的异步操作 | `async Task<string> GetData()` |
| 事件处理方法 | `async void` | UI事件处理程序 | `async void Button_Click()` |

## 引用命名空间

使用的模块：

```csharp
using System.Threading.Tasks;
```