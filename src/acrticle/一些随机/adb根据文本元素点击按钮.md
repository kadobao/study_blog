---
title: adb根据文本元素点击按钮
icon: 
order: 
category:
  - 一些随记
tag:
  - python
---






```python
from lxml import etree as ET
import subprocess

# 解析XML文件路径
xml_file_path = r"C:\Users\cf\window_dump.xml"

# 解析XML文件
tree = ET.parse(xml_file_path)
root = tree.getroot()

# 查找 text="我的" 的元素
target_text = "南明义军"

def get_bounds_center(bounds):
    """计算 bounds 的中心点坐标"""
    bounds = bounds.replace('[', '').replace(']', ',').split(',')
    x1, y1, x2, y2 = map(int, bounds[:4])
    x_center = (x1 + x2) // 2
    y_center = (y1 + y2) // 2
    return x_center, y_center

def find_clickable_parent(node):
    """向上查找父节点，直到找到可点击的元素"""
    parent = node
    while parent is not None:
        # 如果当前节点是可点击的，返回它的 bounds 和中心点
        if parent.attrib.get('clickable') == 'true' and parent.attrib.get('bounds'):
            return parent.attrib['bounds']
        # 向上移动到父节点
        parent = parent.getparent()  # 使用 lxml 提供的 getparent() 方法
    return None

# 遍历XML节点查找目标文本
for node in root.iter('node'):
    if node.attrib['text'] == target_text:
        # 检查元素是否有 clickable 属性和有效的 bounds
        bounds = node.attrib.get('bounds', '[0,0][0,0]')
        clickable = node.attrib.get('clickable', 'false')

        # 如果元素不可点击，查找父节点是否可点击
        if clickable == 'false' or bounds == '[0,0][0,0]':
            print(f'Element "{target_text}" is not clickable, checking parent nodes...')
            bounds = find_clickable_parent(node)

        # 如果找到可点击的 bounds
        if bounds and bounds != '[0,0][0,0]':
            x_center, y_center = get_bounds_center(bounds)
            print(f'Found clickable element at bounds: {bounds}, center: ({x_center}, {y_center})')

            # 执行 ADB 命令进行点击
            adb_command = ['adb', 'shell', 'input', 'tap', str(x_center), str(y_center)]
            subprocess.run(adb_command)
            print(f'Clicked at ({x_center}, {y_center})')
        else:
            print(f'No clickable element found for "{target_text}".')
        break
else:
    print(f'Element with text "{target_text}" not found.')
```

