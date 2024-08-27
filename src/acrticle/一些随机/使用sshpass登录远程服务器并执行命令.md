---
title: 使用sshpass登录远程服务器并执行命令
icon: 
order: 4
category:
  - 一些随记
tag:
  - sshpass
---

### `sshpass` 的作用

sshpass的作用就是要求远程服务器执行一个命令。

### 检查 `sshpass` 是否安装

你可以通过以下命令检查 `sshpass` 是否已经安装：

```bash
which sshpass
```

如果没有安装 `sshpass`，可以使用以下命令进行安装：

```bash
sudo apt-get install sshpass
```

### 使用 `sshpass` 的命令示例

下面是一个使用 `sshpass` 的 SSH 连接示例命令：

```bash
sshpass -p 'your_password' ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -tt your_name@your_host 'echo "Connection successful"; date; sleep 5'
```

#### 选项解释

- **`-o StrictHostKeyChecking=no`**: 
    - 该选项告诉 SSH 客户端在连接时不要检查主机密钥。这在自动化脚本中非常有用，因为它可以避免手动确认主机密钥的提示。
  
- **`-o UserKnownHostsFile=/dev/null`**: 
    - 该选项告诉 SSH 客户端不要将主机密钥存储在已知主机文件中。这可以避免在多次执行脚本时主机密钥发生变化的问题。这个是防止重新安装操作系统，更换硬件之类的情况，每次连接并不会重新生成不同的主机密钥
  
- **`-tt`**: 
    - 该选项强制分配一个伪终端（pseudo-terminal），即使没有交互式 shell。这在执行需要终端的命令时（例如 `sudo` 命令）非常有用。