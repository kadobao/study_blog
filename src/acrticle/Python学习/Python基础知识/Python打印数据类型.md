---
title: Python打印数据类型
icon: fab fa-python
order: 2
category:
  - Python学习
tag:
  - Python
  - 数据类型
---



# Python 数据类型检查方法

在实际开发中，打印数据类型**最常用的是 `type()` 

## type() 函数

type() 函数用于返回对象的类型

```python
# 基本数据类型
print(type(42))              # <class 'int'>
print(type("hello"))         # <class 'str'>
print(type(True))            # <class 'bool'>
print(type(None))            # <class 'NoneType'>
print(type(3.14))            # <class 'float'>
print(type(1 + 2j))          # <class 'complex'>

# 容器类型
print(type([1, 2, 3]))       # <class 'list'>
print(type((1, 2, 3)))       # <class 'tuple'>
print(type({"name": "张三"})) # <class 'dict'>
print(type({1, 2, 3}))       # <class 'set'>

# 比较类型
print(type(42) == int)       # True
print(type("hello") == str)  # True
```

# 结合 __name__获取类型名称​

```python
# 基本数据类型的类型名称
print(int.__name__)       # 'int'
print(str.__name__)       # 'str'
print(bool.__name__)      # 'bool'
print(float.__name__)     # 'float'

# 容器类型的类型名称
print(list.__name__)      # 'list'
print(tuple.__name__)     # 'tuple'
print(dict.__name__)      # 'dict'
print(set.__name__)       # 'set'
```