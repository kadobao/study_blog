---
title: Python流程控制语句
icon: fab fa-python
order: 4
category:
  - Python学习
tag:
  - Python
  - 流程控制
---

# Python 流程控制语句

## 1. 条件语句

### 1.1 if...elif...else 语句

`if...elif...else` 语句用于基于条件执行不同的代码块。

#### 基本语法
```python
if condition1:
    # 条件1为真时执行的代码
elif condition2:
    # 条件2为真时执行的代码
else:
    # 所有条件都为假时执行的代码
```

#### 示例代码
```python
# 简单判断
age = 18
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# 多条件判断
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

## 2. 循环语句

### 2.1 for 循环

用于遍历可迭代对象（如列表、元组、字典等）。

#### 基本语法
```python
for item in iterable:
    # 循环体
```

#### 示例代码
```python
# 遍历列表
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(fruit)

# 遍历字典
person = {"name": "张三", "age": 25, "city": "北京"}
for key, value in person.items():
    print(f"{key}: {value}")

# 使用range函数
for i in range(5):  # 0到4
    print(i)

# 带索引遍历
for index, fruit in enumerate(fruits):
    print(f"索引 {index}: {fruit}")
```

### 2.2 while 循环

在指定条件为真时重复执行代码块。

#### 基本语法
```python
while condition:
    # 循环体
```

#### 示例代码
```python
# 基本while循环
i = 0
while i < 5:
    print(i)
    i += 1

# 带控制语句
count = 0
while True:
    count += 1
    if count % 2 == 0:
        continue  # 跳过偶数
    if count > 10:
        break  # 退出循环
    print(count)
```

## 3. 异常处理

### 3.1 try...except...finally

用于处理代码执行过程中可能出现的异常。

#### 基本语法
```python
try:
    # 尝试执行的代码
except ExceptionType:
    # 发生异常时执行的代码
finally:
    # 无论是否发生异常都会执行的代码
```

#### 示例代码
```python
# 基本异常处理
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零")

# 捕获多种异常
try:
    value = int("abc")
except (ValueError, TypeError) as e:
    print(f"输入错误: {e}")

# 使用finally
try:
    file = open("example.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("文件不存在")
finally:
    file.close()  # 确保文件总是被关闭
```

## 4. 循环控制语句

### 4.1 break 语句

立即退出当前循环。

```python
for i in range(10):
    if i == 5:
        break
    print(i)  # 输出: 0 1 2 3 4
```

### 4.2 continue 语句

跳过当前循环的剩余部分，进入下一次循环。

```python
for i in range(5):
    if i == 2:
        continue
    print(i)  # 输出: 0 1 3 4
```