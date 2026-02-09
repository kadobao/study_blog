---
title: 使用Visual Studio创建项目模板，方便之后复用
icon: code
order: 32
category:
  - C#学习
tag:
  - Visual Studio
  - 项目模板
  - 复用
---

## 前言

项目模板是提高开发效率的重要工具。通过Visual Studio创建自定义项目模板，我们可以快速复用常用的项目结构，减少重复配置工作。

## 一、创建项目模板

### 1.1 准备工作

1. 创建Asp.Net Core Web空白项目
2. 添加必需的文件夹、引用及文件
3. 配置项目结构和基础代码

### 1.2 导出模板

1. 在Visual Studio菜单栏依次点击：**项目 → 导出模板**
2. 选择**项目模板**，并选择需要作为模板的项目
3. 点击**下一步**
4. 填写模板相关信息：
   - 模板名称
   - 模板描述
   - 图标（可选）
   - 预览图像（可选）

### 1.3 完成创建

点击**完成**按钮生成模板。

## 二、删除自定义模板

### 2.1 定位模板存储位置

在文件资源管理器地址栏输入以下路径之一：

```bash
%USERPROFILE%\Documents\Visual Studio 2022\Templates\ProjectTemplates
```

或者：

```bash
%USERPROFILE%\Documents\Visual Studio 2022\My Exported Templates
```

### 2.2 删除模板文件

在上述目录中找到对应的项目模板文件（通常为`.zip`格式），直接删除即可。

### 2.3 验证删除结果

1. 进入Visual Studio的**创建新项目**对话框
2. 搜索你的模板名称
3. 确认该模板已从列表中消失