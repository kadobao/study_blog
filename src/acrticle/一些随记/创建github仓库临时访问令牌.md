---
title: 创建github仓库临时访问令牌
icon: 
order: 25
category:
  - 一些随记
tag:
  - github
  - 临时访问令牌
---

# 创建GitHub仓库临时访问令牌

![临时令牌权限](/assets/images/临时令牌权限.png)

## 步骤一：进入令牌生成页面

1. 登录 GitHub 账户
2. 点击右上角的头像，选择 **Settings**
3. 在左侧菜单中找到并点击 **Developer settings**
4. 选择 **Personal access tokens**
5. 点击 **Fine-grained tokens**（细粒度令牌）
6. 点击 **Generate new token** 按钮

## 步骤二：配置令牌基本信息

1. **Token name**：为令牌起一个描述性的名称，便于识别用途
2. **Expiration**：设置令牌的有效期，建议根据需要选择合适的时间
3. **Description**（可选）：添加令牌的描述信息

## 步骤三：设置仓库访问权限

1. 选择 **Only select repositories**（仅选择特定仓库）
2. 在下方列表中选择需要访问的仓库
3. 这样可以限制令牌的访问范围，提高安全性

## 步骤四：设置权限范围

在 **Permissions** 下拉列表中，选择最小权限集合。对于基本的代码读写和CI/CD，建议如下配置：

1. **Contents**：权限级别选择 **Read and write**
   - 这是最核心的权限，允许代码的克隆、推送、拉取

2. **Metadata**：权限级别选择 **Read-only**（通常会自动添加）
   - 这是查看仓库基本信息所必需的，非常安全

3. **Workflows**（可选）：
   - 如果需要这个令牌能够触发 GitHub Actions，请勾选此项

## 步骤五：生成并保存令牌

1. 点击页面底部的 **Generate token** 按钮
2. **重要**：立即复制生成的令牌，因为离开页面后将无法再次查看
3. 将令牌安全保存，建议使用密码管理器存储

## 使用令牌

### 配置Git远程仓库URL

使用以下命令重新配置Git远程仓库URL，将令牌集成到URL中：

```bash
git remote set-url origin https://kadobao:新令牌@github.com/kadobao/study_blog.git
```

如果是没有设置过远程仓库URL，使用这个命令：

```bash
git remote add origin https://kadobao:新令牌@github.com/kadobao/study_blog.git
```

将上面的 `新令牌` 替换为实际生成的令牌。

### 执行Git操作

配置完成后，就可以正常执行Git操作，如：

```bash
git push origin main
git pull origin main
```
