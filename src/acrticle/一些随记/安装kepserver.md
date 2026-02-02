---
title: 安装KepServer
icon:
order: 39
category:
  - 一些随记
tag:
  - KepServer
---

## 安装步骤

安装就是直接一步步点击继续就行。


## 配置OPC UA远程访问链接

在KepServer的配置中，按以下步骤操作：

1. 右键右侧树顶点“项目”
2. 在属性编辑器中 -> 左侧树选择“OPC UA”
3. 在“客户端会话”中将“允许匿名登录”选择“是”
4. 在“服务器接口”中将“启用”选择“是”

![KepServer设置服务器_1](/assets/images/KepServer设置服务器_1.png)

![KepServer设置服务器_2](/assets/images/KepServer设置服务器_2.png)

## 打开OPC UA配置

右键系统托盘中的KepServer图标，点击 `OPCUA配置`

> **提示**：如果右下角没有KepServer图标，请按以下步骤操作：
> 1. 点击Windows开始按钮
> 2. 在"已固定"区域点击"全部"
> 3. 搜索找到"Kepware"
> 4. 找到"KEPServerEX 6 Administration"图标
> 5. 双击启动，图标就会出现在系统托盘中

![KepServer设置服务器_3](/assets/images/KepServer设置服务器_3.png)

## 配置网络适配器

1. 点击 `添加` 按钮
2. 选择网络适配器
3. 安全策略选择 `无`

![KepServer设置服务器_4](/assets/images/KepServer设置服务器_4.png)