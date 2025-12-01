---
title: 使用SourceTree初始化仓库并且提交到GitLab远程地址
icon:
order: 32
category:
  - 一些随记
tag:
  - SourceTree
  - GitLab
---

## 步骤说明

### 步骤1：创建仓库
1. 点击`创建`按钮
2. 点击`浏览`，选择项目所在的文件夹
3. 点击`确定`

![Sourcetree初始化仓库_1](Sourcetree初始化仓库_1.png)

### 步骤2：确认创建仓库
- 当询问是否创建仓库时，点击`是`

![Sourcetree初始化仓库_2](Sourcetree初始化仓库_2.png)

### 步骤3：配置远程地址
1. 点击`设置`按钮
2. 进入设置界面

![Sourcetree初始化仓库_3](Sourcetree初始化仓库_3.png)

### 步骤4：添加远程仓库
1. 点击`远程仓库`选项卡
2. 点击`添加`按钮

![Sourcetree初始化仓库_4](Sourcetree初始化仓库_4.png)

### 步骤5：配置远程仓库信息
1. **远程名称**：保持默认设置
2. **URL/路径**：输入GitLab项目的远程地址
3. 点击`确定`完成配置

![Sourcetree初始化仓库_5](Sourcetree初始化仓库_5.png)

## 注意事项
- 确保GitLab项目已创建并获取正确的远程地址
- 远程地址格式通常为：`https://gitlab.com/用户名/项目名.git`
- 或者使用SSH格式：`git@gitlab.com:用户名/项目名.git`