---
title: 使用安卓adb
icon: 
order: 15
category:
  - 一些随记
tag:
  - python
---



先下载工具：`https://developer.android.com/tools/releases/platform-tools?hl=zh-cn`



下载之后

在“系统变量”区域找到并选择“Path”变量，然后点击“编辑”。
点击“新建”，然后输入你刚刚记住的 Platform-Tools 文件夹的路径。
点击“确定”保存你的更改。



验证安装
adb version

验证是否连接
adb devices



唤醒屏幕：

```bash
adb shell input keyevent KEYCODE_WAKEUP
```

查看是否是亮屏：

```bash
adb shell dumpsys power | findstr "Display Power"
```

模拟按下电源键：

```bash
adb shell input keyevent 26
```

强制进入睡眠，熄灭屏幕:

```bash
adb shell input keyevent KEYCODE_SLEEP
```

锁定设备，屏幕熄灭:

```bash
adb shell input keyevent 223
```

列出用户安装的第三方应用：

```
adb shell pm list packages -3
```

列出所有应用（包括系统应用）：

```
adb shell pm list packages
```

列出系统应用：

```
adb shell pm list packages -s
```

启动应用（需要包名和类名）：

```
adb shell am start -n 包名/类名
```

注：类名可以通过`Package Names`获取

启动应用（只需要包名）：

```
adb shell monkey -p 包名 -c android.intent.category.LAUNCHER 1
```

关闭应用：

```
adb shell am force-stop 包名
```

获取屏幕分辨率：

```
adb shell wm size
```

实际 x 坐标 = 相对 x 坐标 * 屏幕宽度

实际 y 坐标 = 相对 y 坐标 * 屏幕高度

相对坐标就是通过`QtScrcpy`点击获取，屏幕宽度和屏幕高度就是屏幕分辨率



点击屏幕指定的坐标：

```
adb shell input tap <x> <y>
```

```
screen_width = 1080
screen_height = 2400
pos = {"x": 0.835681, "y": 0.226695}

# 计算实际的像素坐标
x_actual = pos["x"] * screen_width  # 0.835681 * 1080 ≈ 902.54
y_actual = pos["y"] * screen_height  # 0.226695 * 2400 ≈ 544.07

# 生成 adb tap 命令
adb_command = f"adb shell input tap {int(x_actual)} {int(y_actual)}"
print(adb_command)  # 输出: adb shell input tap 902 544
```



------


截图到安卓设备的根目录：

    adb shell screencap -p /sdcard/screenshot.png

拉取截图到本地：

```
adb pull /sdcard/screenshot.png .
```

删除文件：

```
    adb shell rm /sdcard/screenshot.png
```

打印根目录有哪些文件：

```
    adb shell ls /sdcard/
```

生成当前屏幕的 UI 层次结构到安卓设备的根目录：

```
    adb shell uiautomator dump /sdcard/window_dump.xml
```

拉取文件到本地：

```
    adb pull /sdcard/window_dump.xml .
```

删除文件：

```
    adb shell rm /sdcard/window_dump.xml
```



+++





### 点击特定的元素

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





滑动命令：

```
adb shell input swipe <x1> <y1> <x2> <y2> [duration]
```

输入密码：

```
adb shell input text 123456
```

输入中文（要求安装ADBKeyBoard）：

```
adb shell am broadcast -a ADB_INPUT_TEXT --es msg '赞'
```



[MUMU模拟器使用ADB的教程](https://mumu.163.com/help/20230214/35047_1073151.html)




获取应用的进程ID：

```
adb shell "ps|grep 包名"
```



### adb根据文本元素点击按钮

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

