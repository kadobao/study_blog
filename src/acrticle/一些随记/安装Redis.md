---
title: 安装Redis
icon:
order: 49
category:
  - 一些随记
tag:
  - Redis
---

下面是从零开始，在 Ubuntu 24.04 上安装 Redis 并配置为「仅内网可访问」的完整命令总结。按顺序执行即可。

### 1. 安装 Redis

```bash
sudo apt update
sudo apt install redis-server
```

安装完成后，`redis-server` 会自动注册为 systemd 服务并设置开机自启。

### 2. 修改配置：只监听本机 + 内网，并设置密码

先确认你的内网 IP（例如 `10.1.191.235`）：

```bash
ip a
```

然后编辑 `/etc/redis/redis.conf`，用 `sed` 快速替换：

```bash
# 监听本机和内网 IP（把 10.1.191.235 换成你的实际内网 IP）
sudo sed -i 's/^bind .*/bind 127.0.0.1 10.1.191.235/' /etc/redis/redis.conf

# 设置强密码（把 123456 换成你自己的）
sudo sed -i 's/^# requirepass .*/requirepass 123456/' /etc/redis/redis.conf
```

检查是否改对：

```bash
grep -n "^bind\|^requirepass" /etc/redis/redis.conf
```

### 3. 重启并验证

```bash
sudo systemctl restart redis-server
sudo systemctl status redis-server
```

**关键验证：查看实际监听地址**

```bash
sudo ss -tlnp | grep 6379
```

应看到两行：

```text
127.0.0.1:6379
10.1.191.235:6379
```

**不要出现 `0.0.0.0:6379`**，否则说明监听所有网卡，有外网暴露风险。

用内网 IP 测试连接：

```bash
redis-cli -h 10.1.191.235 -p 6379 -a YourStrongPassword ping
```

返回 `PONG` 即成功。

### 4. 如果配置文件丢失（异常情况）

若 `/etc/redis/redis.conf` 不存在，用以下命令恢复，**无需重装**：

```bash
sudo apt-get install --reinstall -o Dpkg::Options::="--force-confmiss" redis-server
```

### 5. 最终检查清单

| 项目     | 验证命令                                        | 预期结果                                |
| -------- | ----------------------------------------------- | --------------------------------------- |
| 服务状态 | `systemctl status redis-server`                 | `active (running)`                      |
| 开机自启 | `systemctl is-enabled redis-server`             | `enabled`                               |
| 监听地址 | `sudo ss -tlnp \| grep 6379`                    | 只有 `127.0.0.1` 和 `10.1.191.235`       |
| 内网连接 | `redis-cli -h 10.1.191.235 -a 密码 ping`         | `PONG`                                  |
| 外网连接 | 从外网 telnet 公网IP 6379                       | 连接失败（正常）                        |

### 6. 安全提醒

- **密码必须强**：`123456` 这类弱密码极易被撞，建议 12 位以上，大小写+数字+符号。
- **不要用 `bind 0.0.0.0`**：除非配合严格防火墙，否则等于对全网开放。
- **云服务器**：除了本机 bind，还要在云控制台安全组里限制 6379 只允许内网网段。
- **DNS 临时修改**：重启后会失效，如需永久修改，请编辑 `/etc/netplan/` 下的配置文件。
