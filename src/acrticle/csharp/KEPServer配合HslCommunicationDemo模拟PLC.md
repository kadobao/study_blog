---
title: KEPServer配合HslCommunicationDemo模拟PLC
icon: code
order: 44
category:
  - C#学习
tag:
  - KEPServer
  - HslCommunicationDemo
  - C#
---

## 概述

本文介绍如何使用 HslCommunicationDemo 模拟 PLC 服务端，以及使用 KEPServer 连接模拟的 PLC 进行数据读写操作。适用于开发测试、学习 PLC 通信等场景。

## HslCommunicationDemo 的作用

- 模拟 PLC 服务端
- 自动生成地址位
- 简化操作流程

### 举例：使用 HslCommunicationDemo 模拟西门子 S7-200 SMART PLC

操作步骤：

1. 设备列表里面选择 `SIE Siemens Plc [西门子]` 系列
2. 点击 `S7 Virtual Server1`
3. 本地 IP 地址填写：`127.0.0.1`
4. 点击 `启动服务` 按钮

## KEPServer 的作用

- 向地址位读写数据

### 举例：使用 KEPServer 连接 HslCommunicationDemo 模拟的西门子 S7-200 SMART PLC

#### 步骤 1：新建通道

1. 驱动选择：`Siemens TCP/IP Ethernet`
2. 通道名称：如 `S7_200SMART_Sim`
3. Network Adapter：默认值
4. 点击下一步完成创建

#### 步骤 2：新建设备

右键新创建的通道 `S7_200SMART_Sim`，点击 `新建设备`：

- 设备名称：如 `SMART_Sim`
- 型号选择：`S7-200`
- ID 填写：`127.0.0.1`（HslCommunicationDemo 的 IP 地址）
- 字节顺序：默认选择 `大端序`
- 之后一直点击下一步完成创建

#### 步骤 3：新建标记

右键设备 `SMART_Sim`，点击 `新建标记`：

| 项目 | 说明 | 示例 |
|------|------|------|
| 名称 | PLC 工程师定义的地址位名称 | 设备状态 |
| 地址 | PLC 工程师定义的地址位 | VD4 |
| 数据类型 | 由 PLC 工程师给出或根据地址位判断 | Float |

#### 地址位数据类型判断

| 地址前缀 | 数据类型 |
|----------|----------|
| VD 开头 | Float |
| V 开头 | Bool |

完成以上步骤后，即可使用 KEPServer 读写数据。

## 通信协议

可以选择以下协议进行通信：

- OPC UA 协议
- S7 协议