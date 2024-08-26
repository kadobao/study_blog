---
title: 修改wsl设置为阿里云的镜像源

icon: 
order: 3
category:
  - 一些随记
tag:
  - wsl
---


在Windows中通过图形界面来设置WSL中的Ubuntu使用阿里云的镜像源。以下是步骤：

### 1. 启动WSL并打开文件资源管理器

1. **启动WSL**：
   - 打开你安装的Ubuntu WSL，通过“开始”菜单或者在命令行中输入 `wsl` 然后回车。

2. **导航到APT源文件目录**：
   - 在WSL的终端中输入以下命令，导航到APT源文件所在的目录：

     ```bash
     cd /etc/apt/
     ```

3. **打开文件资源管理器**：
   - 在WSL终端中输入以下命令，以在Windows文件资源管理器中打开当前目录：

     ```bash
     explorer.exe .
     ```

   - 这会在Windows的文件资源管理器中打开 `/etc/apt/` 目录。

### 2. 修改 `sources.list`

```yml
# 默认的阿里云镜像源
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
# deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse

## Major bug fix updates produced after the final release of the distribution.
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu team.
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse

## Uncomment the following two lines to add software from Canonical's
## 'partner' repository.
## This software is not part of Ubuntu, but is offered by Canonical and the
## respective vendors as a service to Ubuntu users.
# deb http://archive.canonical.com/ubuntu jammy partner
# deb-src http://archive.canonical.com/ubuntu jammy partner

## 安全更新源
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
# deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
```