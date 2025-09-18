---
title: Python读取文件内容
icon: fab fa-python
order: 5
category:
  - Python学习
tag:
  - Python
  - 读取文件
---

# Python 读取文件内容

## 1. 读取文件内容

在 Python 中，读取文件内容是一个常见的操作。我们可以使用内置的 `open()` 函数来打开文件，然后使用 `read()` 方法来读取文件内容。

### 1.1 基本语法

```python
with open(file_path, 'r', encoding='utf-8') as file:
    content = file.read()
```

### 1.2 示例代码

```py
import re

# SVG文件路径
svg_file_path = r"C:\Users\XJ\Downloads\Setting.svg"

try:
    # 读取SVG文件内容
    with open(svg_file_path, 'r', encoding='utf-8') as file:
        svg_content = file.read()
    
    # 使用正则表达式提取所有<path d="">中的内容
    path_data_list = re.findall(r'<path d="([^"]+)"', svg_content)

    final_string = f'<PathGeometry x:Key="根据功能命名" Figures="{"".join(path_data_list)}"/>'
    print(final_string)
    
except FileNotFoundError:
    print(f"错误：找不到文件 {svg_file_path}")
except Exception as e:
    print(f"读取文件时发生错误: {e}")
```