---
title: Python 部署到 IIS
icon:
order: 46
category:
  - 一些随记
tag:
  - Python
  - IIS
---

# Python 部署到 IIS

## 一、安装 HttpPlatformHandler

下载地址：[Microsoft HttpPlatformHandler](https://www.iis.net/downloads/microsoft/httpplatformhandler)

## 二、查找 Python 安装路径

使用命令 `where python` 查找 Python.exe 目录位置，然后导航到该目录：

```powershell
where python
# 示例路径
start C:\Users\你的用户名\AppData\Local\Programs\Python\Python313
```

然后使用start C:\Users\你的用户名\AppData\Local\Programs\Python\Python313导航到目录

## 三、配置文件夹权限

### 3.1 Python 目录权限

右键 `python.exe` 所在的文件夹 → **属性** → **安全** → **编辑** → **添加**

| 项目 | 设置 |
|------|------|
| 用户名 | `IIS_IUSRS` |
| 权限 | ✅ 读取<br>✅ 读取和执行<br>✅ 列出文件夹内容 |

### 3.2 部署文件夹权限

右键部署文件夹 → **属性** → **安全** → **编辑** → **添加**

| 项目 | 设置 |
|------|------|
| 用户名 | `IIS_IUSRS` |
| 权限 | ✅ 读取<br>✅ 读取和执行<br>✅ 列出文件夹内容 |

## 四、创建 web.config 文件

在项目根目录创建 `web.config` 文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="httpPlatformHandler" 
           path="*" verb="*" 
           modules="httpPlatformHandler" 
           resourceType="Unspecified" />
    </handlers>
    <httpPlatform 
      processPath="C:\Users\GJ_IT\AppData\Local\Programs\Python\Python313\python.exe"
      arguments="Test_DeployIIS.py"
      startupTimeLimit="60"
      startupRetryCount="3">
      <environmentVariables>
        <environmentVariable name="PORT" value="%HTTP_PLATFORM_PORT%" />
        <environmentVariable name="FLASK_APP" value="Test_DeployIIS.py" />
      </environmentVariables>
    </httpPlatform>
  </system.webServer>
</configuration>
```

## 五、创建 Python 应用文件

`Test_DeployIIS.py`

```python
import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from Python on IIS!"

if __name__ == '__main__':
    # 从环境变量获取 HttpPlatformHandler 分配的端口，默认 8000
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
```

## 六、部署

将 `Test_DeployIIS.py` 和 `web.config` 文件放到同一个部署文件夹中即可。