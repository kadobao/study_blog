---
title: Python序列化与反序列化
icon: fab fa-python
order: 3
category:
  - Python学习
tag:
  - Python
  - 序列化
  - JSON
---

# Python 序列化与反序列化

序列化是将Python对象转换为可存储或传输的格式（如JSON字符串），反序列化则是将格式化的数据重新转换为Python对象。

## 1. 使用json模块

### 基本序列化与反序列化

```python
import json

# 序列化（Python对象 → JSON字符串）
data = {"name": "张三", "age": 25, "scores": [90, 85, 95]}
json_str = json.dumps(data, ensure_ascii=False)  # ensure_ascii=False 支持中文
print(json_str)  # 输出: {"name": "张三", "age": 25, "scores": [90, 85, 95]}

# 反序列化（JSON字符串 → Python对象）
python_obj = json.loads(json_str)
print(python_obj["name"])  # 输出: 张三
```

### 文件读写中的序列化

```python
# 写入JSON文件
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)  # indent参数美化输出

# 从文件读取
with open("data.json", "r", encoding="utf-8") as f:
    loaded_data = json.load(f)
    print(loaded_data)  # 输出: {'name': '张三', 'age': 25, 'scores': [90, 85, 95]}
```


## 2. 使用requests库处理JSON

```python
import requests

# 发送请求并自动处理JSON响应
response = requests.get("https://api.example.com/data")
if response.status_code == 200:
    data = response.json()  # 自动将JSON响应转换为Python对象
    print(data)
    
    # 可以直接处理嵌套数据
    print(data["key"]["nested_key"])
```

### 处理POST请求中的JSON

```python
# 发送JSON数据
payload = {"name": "李四", "age": 30}
headers = {"Content-Type": "application/json"}

response = requests.post(
    "https://api.example.com/users",
    data=json.dumps(payload, ensure_ascii=False),
    headers=headers
)

# 或者使用json参数自动序列化
response = requests.post(
    "https://api.example.com/users",
    json=payload,
    headers=headers
)
```