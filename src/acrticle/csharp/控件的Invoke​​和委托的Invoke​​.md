---
title: 控件的Invoke​​和委托的Invoke​​
icon: code
order: 21
category:
  - C#学习
tag:
  - 跨线程
  - 委托的Invoke​​
---

# 控件的Invoke和委托的Invoke

## 基本概念

- **Control.Invoke**：仅用于跨线程调度，无事件触发功能。
- **委托的Invoke**：用于在当前线程执行委托指向的方法。

## 1. Invoke的核心作用：线程调度

Control.Invoke的唯一职责是解决跨线程访问 UI 的问题：

- **输入**：接收一个委托（如 Action）。
- **行为**：将该委托同步发送到 UI 线程的消息队列，并等待其执行完成。
- **输出**：无返回值（void）。

## 2. InvokeRequired属性

`control.InvokeRequired`：检测当前是否是 UI 线程。