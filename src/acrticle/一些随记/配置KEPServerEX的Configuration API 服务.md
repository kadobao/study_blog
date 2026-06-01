---
title: 配置KEPServerEX的Configuration API 服务
icon:
order: 43
category:
  - 一些随记
tag:
  - KEPServerEX
  - Configuration API服务
---

# 配置KEPServerEX的Configuration API 服务

## 1. 打开设置

右键系统托盘中的KepServer图标，点击 `设置`

> **提示**：如果右下角没有KepServer图标，请按以下步骤操作：
> 1. 点击Windows开始按钮
> 2. 在"已固定"区域点击"全部"
> 3. 搜索找到"Kepware"
> 4. 找到"KEPServerEX 6 Administration"图标
> 5. 双击启动，图标就会出现在系统托盘中

![KEPServerEX Configuration API 服务_1](/assets/images/配置KEPServerEX_Configuration_API_服务_1.png)

## 2. 配置API服务

在设置里面点击 `配置API服务`，然后进行以下配置：

1. 将 `启用` 选择 `是`
2. 将 `启用HTTP` 选择 `是`
3. 点击 `应用` 按钮
4. 点击 `确定` 按钮

![KEPServerEX Configuration API 服务_2](/assets/images/配置KEPServerEX_Configuration_API_服务_2.png)

## 3. 添加用户

在设置里面点击 `用户管理器`，然后：

1. 点击 `添加` 按钮，添加用户
2. 在添加用户窗口中，输入用户名和密码
3. 点击 `确定` 按钮

![KEPServerEX Configuration API 服务_3](/assets/images/配置KEPServerEX_Configuration_API_服务_3.png)

## 4. 验证配置

配置完成后，可以使用以下命令验证Configuration API服务是否正常工作：

```bash
curl -X GET "http://127.0.0.1:57412/config/v1/project" -u "用户名:密码"
```

> **说明**：
> - 将 `用户名:密码` 替换为实际添加的用户名和密码
> - 如果配置成功，会返回项目配置信息的JSON数据
> - 如果返回认证错误，请检查用户名和密码是否正确
