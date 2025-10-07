---
title: Python字符串插值
icon: fab fa-python
order: 6
category:
  - Python学习
tag:
  - Python
  - 字符串插值
---

# Python 的 f-string

在 Python 中，以 `f` 为前缀的字符串称为 **f-string**（格式化字符串字面量）。

## 基本语法

```python
f"这是一个字符串 {变量名} 和 {表达式}"
```

## 示例

```python
name = "Alice"
age = 30
height = 1.65

# 使用 f-string
message = f"你好，我是 {name}，今年 {age} 岁。明年我就 {age + 1} 岁了。"
print(message)
# 输出：你好，我是 Alice，今年 30 岁。明年我就 31 岁了。

# 可以在大括号内进行格式规范，比如控制浮点数位数
info = f"姓名：{name}，身高：{height:.2f} 米"
print(info)
# 输出：姓名：Alice，身高：1.65 米
```