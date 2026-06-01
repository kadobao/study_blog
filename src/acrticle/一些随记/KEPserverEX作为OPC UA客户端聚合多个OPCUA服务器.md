---
title: KEPserverEX作为OPC UA客户端聚合多个OPCUA服务器
icon:
order: 44
category:
  - 一些随记
tag:
  - KEPServerEX
  - OPC UA客户端
  - 聚合
---

## 1. 添加OPC UA Client通道

在KEPserverEX配置界面，右键点击"连接性"，选择 **"新建通道"**

在驱动列表中选择 **"OPC UA Client"**

![聚合OPCUA服务器_1](/assets/images/聚合OPCUA服务器_1.png)

为通道命名

端点URL：

```text
opc.tcp://127.0.0.1:49320
```

> 根据实际情况修改IP地址和端口

安全策略：**无**

之后完成通道创建向导。

![聚合OPCUA服务器_2](/assets/images/聚合OPCUA服务器_2.png)

![聚合OPCUA服务器_3](/assets/images/聚合OPCUA服务器_3.png)

---

## 2. 添加设备

右键点击刚创建的"OPC UA Client"通道，选择 **"新建设备"**

为设备命名（例如：`RemoteOPCUAServer`）

点击选择导入项，直接点击 **添加分支**

然后就完成了添加其他OPCUA服务器。

![聚合OPCUA服务器_4](/assets/images/聚合OPCUA服务器_4.png)
