---
title: Python基本数据类型
icon: fab fa-python
order: 1
category:
  - Python学习
tag:
  - Python
  - 基本数据类型
---



# Python 基本数据类型及其常用方法

Python 有几种基本数据类型，每种类型都有其相关的方法和操作。以下是 `int`、`string`、`bool`、`list`、`tuple` 和 `dict` 的常用方法：



## int (整数)

```python
# 创建整数
num = 42
negative_num = -17

# 转换为字符串
str_num = str(num)  # "42"

# 数学运算
add = 10 + 5  # 15
subtract = 10 - 5  # 5
multiply = 10 * 5  # 50
divide = 10 / 5  # 2.0 (浮点数除法)
floor_divide = 10 // 3  # 3 (整数除法)
modulus = 10 % 3  # 1 (取余)
power = 2 ** 3  # 8 (幂运算)
```

## string (字符串)

```python
# 创建字符串
text = "Hello World"
multi_line = """这是一个
多行字符串"""

# 长度
length = len(text)  # 11

# 访问字符
first_char = text[0]  # "H"
last_char = text[-1]  # "d"

# 切片
substring = text[0:5]  # "Hello"
reverse_text = text[::-1]  # "dlroW olleH"

# 查找
position = text.find("World")  # 6
index = text.index("World")  # 6 (如果找不到会抛出异常)
contains = "World" in text  # True


# 去除空白
stripped = "  hello  ".strip()  # "hello"

# 分割和连接
words = text.split()  # ["Hello", "World"]
joined_text = "-".join(words)  # "Hello-World"

# 替换
replaced = text.replace("World", "Python")  # "Hello Python"

# 格式化
name = "张三"
age = 25
formatted = f"姓名：{name}，年龄：{age}岁"  # "姓名：张三，年龄：25岁"
```

## bool (布尔值)

```python
# 创建布尔值
true_val = True
false_val = False

# 转换为字符串
str_from_true = str(True)  # "True"
str_from_false = str(False)  # "False"
```

## list (列表)

```python
# 创建列表
empty_list = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# 长度
length = len(numbers)  # 5

# 合并元素
Merge = "-".join(numbers)

# 访问元素
first = numbers[0]  # 1
last = numbers[-1]  # 5

# 切片
subset = numbers[1:4]  # [2, 3, 4]
first_three = numbers[:3]  # [1, 2, 3]
last_three = numbers[-3:]  # [3, 4, 5]

# 添加元素
numbers.append(6)  # [1, 2, 3, 4, 5, 6] (末尾添加)
numbers.insert(2, 99)  # [1, 2, 99, 3, 4, 5, 6] (在指定位置插入)

# 删除元素
numbers.remove(99)  # [1, 2, 3, 4, 5, 6, 7, 8] (删除指定元素)
popped = numbers.pop()  # 8 (删除并返回最后一个元素)

# 查找元素
index_of = numbers.index(4)  # 3 (返回元素的索引)
count_of = numbers.count(2)  # 1 (返回元素出现的次数)
contains = 3 in numbers  # True (检查元素是否存在)

# 排序
numbers.sort()  # [1, 2, 4, 5, 6, 7] (升序排序)
numbers.sort(reverse=True)  # [7, 6, 5, 4, 2, 1] (降序排序)

# 反转
numbers.reverse()  # [1, 2, 4, 5, 6, 7] (反转列表)

# 清空
numbers.clear()  # [] (清空列表)

# 列表推导式
squares = [x**2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]
evens = [x for x in range(1, 11) if x % 2 == 0]  # [2, 4, 6, 8, 10]

# 遍历
for num in numbers:
    print(num)

for index, num in enumerate(numbers):
    print(f"索引 {index}: {num}")
```

## tuple (元组)

```python
# 创建元组
empty_tuple = ()
numbers = (1, 2, 3, 4, 5)
mixed = (1, "hello", 3.14, True)

# 长度
length = len(numbers)  # 5

# 访问元素
first = numbers[0]  # 1
last = numbers[-1]  # 5

# 切片
subset = numbers[1:4]  # (2, 3, 4)

# 查找元素
index_of = numbers.index(4)  # 3 (返回元素的索引)
count_of = numbers.count(2)  # 1 (返回元素出现的次数)
contains = 3 in numbers  # True (检查元素是否存在)


# 遍历
for num in numbers:
    print(num)

for index, num in enumerate(numbers):
    print(f"索引 {index}: {num}")

# 转换为列表
list_from_tuple = list(numbers)  # [1, 2, 3, 4, 5]
```

## dict (字典)

```python
# 创建字典
empty_dict = {}
person = {"name": "张三", "age": 25, "city": "北京"}
person2 = dict(name="李四", age=30, city="上海")

# 长度
length = len(person)  # 3

# 访问值
name = person["name"]  # "张三"
age = person.get("age")  # 25 (使用get方法更安全，如果键不存在会返回None)
city = person.get("city", "未知")  # "北京" (如果键不存在，返回默认值"未知")

# 添加/修改键值对
person["email"] = "zhangsan@example.com"  # 添加新键值对
person["age"] = 26  # 修改已有键值对

# 删除键值对
del person["city"]  # 删除指定键值对
popped_value = person.pop("email")  # "zhangsan@example.com" (删除并返回值)

# 获取键、值和键值对
keys = person.keys()  # dict_keys(['name', 'age'])
values = person.values()  # dict_values(['张三', 26])
items = person.items()  # dict_items([('name', '张三'), ('age', 26)])

# 检查键是否存在
has_name = "name" in person  # True
has_city = "city" in person  # False

# 更新字典
person.update({"age": 27, "city": "北京"})  # 更新多个键值对

# 清空字典
person.clear()  # {}


# 字典推导式
squares = {x: x**2 for x in range(1, 6)}  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
evens = {x: x for x in range(1, 11) if x % 2 == 0}  # {2: 2, 4: 4, 6: 6, 8: 8, 10: 10}

# 遍历字典
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(key, value)

for key in person.keys():
    print(key)

for value in person.values():
    print(value)

# 嵌套字典
nested_dict = {
    "person1": {"name": "张三", "age": 25},
    "person2": {"name": "李四", "age": 30}
}
name1 = nested_dict["person1"]["name"]  # "张三"
```