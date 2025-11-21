---
title: 为电脑同时配置GitLab和Github平台的SSH密钥
icon:
order: 29
category:
  - 一些随记
tag:
  - GitLab
  - Github
---

# 为电脑同时配置GitLab和Github平台的SSH密钥

## 一、为Github配置SSH密钥

1. 打开 Git Bash 或 Windows 终端，输入以下命令（将邮箱替换为你自己的）：

```bash
ssh-keygen -t ed25519 -C "XJ@qq.com" -f %USERPROFILE%\.ssh\id_ed25519_github
```

2. 按回车键接受默认保存路径。
3. 出现提示时，继续按回车键不设置密码（Password）。
4. 密钥生成后，输入以下命令查看并复制公钥内容：

```bash
type %USERPROFILE%\.ssh\id_ed25519_github.pub
```

5. 选中终端中显示的以 `ssh-ed25519 AAA...` 开头的全部文本（包括后面的邮箱），并复制。

## 二、将公钥添加到GitHub

1. 登录 GitHub 网站，点击右上角头像，选择 Settings。
2. 在左侧边栏中，选择 SSH and GPG keys。
3. 点击绿色的 New SSH key 按钮。
4. 填写信息：
   - **Title**：为你的新密钥起一个易于识别的名称（例如：办公室电脑）。
   - **Key type**：保持默认的 Authentication Key。
   - **Key**：在框中粘贴你刚才复制的公钥内容。
5. 点击 Add SSH key 完成添加。

## 三、为GitLab配置SSH密钥

1. 打开 Git Bash 或 Windows 终端，输入以下命令（将邮箱替换为你自己的）：

```bash
ssh-keygen -t ed25519 -C "XJ@qq.com" -f %USERPROFILE%\.ssh\id_ed25519_gitlab
```

2. 按回车键接受默认保存路径。
3. 出现提示时，继续按回车键不设置密码（Password）。
4. 密钥生成后，输入以下命令查看并复制公钥内容：

```bash
type %USERPROFILE%\.ssh\id_ed25519_gitlab.pub
```

5. 选中终端中显示的以 `ssh-ed25519 AAA...` 开头的全部文本（包括后面的邮箱），并复制。

## 四、将公钥添加到GitLab

1. 打开企业内部的 GitLab 网站（通常是 https://gitlab.你的公司域名.com，比如 gitlab.xxx-corp.com），用你的账户登录。
2. 点击页面右上角的头像，在下拉菜单中选择 Preferences（偏好设置，部分 GitLab 版本可能显示为 Settings）。
3. 在左侧边栏中，找到并点击 SSH Keys（SSH 密钥）。
4. 然后填入你刚才复制的公钥内容。
5. 到期时间可以去除，或者保持默认。
6. 点击 `添加密钥` 完成添加。

## 五、创建并配置SSH config文件（让Git自动匹配密钥）

1. 使用以下命令创建无扩展名的config文件：

```bash
# 使用 echo 命令创建无扩展名的 config 文件
type nul > %USERPROFILE%\.ssh\config

# 然后用 notepad 编辑
notepad %USERPROFILE%\.ssh\config
```

2. 之后会在记事本打开，你需要填写这些内容，根据自己的实际填写：

```bash
# GitLab (公司内网)
Host 53.1.222.76
    HostName 53.1.222.76
    User git
    IdentityFile ~/.ssh/id_ed25519_gitlab
    IdentitiesOnly yes

# GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes
```

## 六、测试连接

1. 测试GitHub连接：

```bash
ssh -T git@github.com
```

2. 测试GitLab连接：

```bash
ssh -T git@53.1.222.76
```

> **注意**：确保你已经完成了「配置 SSH config 文件」这一步（就是创建 ~/.ssh/config 并填写 GitHub 和 GitLab 的区分配置）。

## 七、在Sourcetree中配置SSH密钥

### SourceTree基础设置（无需修改原有GitHub配置）

1. 打开 SourceTree，点击顶部菜单栏「工具 (Tools)」→「选项 (Options)」。
2. 在弹出的窗口中，切换到「一般 (General)」选项卡。
3. 找到「SSH 客户端配置 (SSH Client Configuration)」部分：
   - **SSH 客户端 (SSH Client)**：选择「OpenSSH」。
   - **SSH 密钥 (SSH Key)**：使用 GitHub 的私钥（C:\Users\你的用户名\.ssh\id_ed25519_github），调用GitLab时，也不用切换。
4. 点击「确定」保存设置。

✅ **关键说明**：SourceTree 会优先遵循 ~/.ssh/config 的规则，即使默认密钥是 GitHub 的，连接 GitLab 仓库时也会自动调用 GitLab 专属密钥（id_ed25519_gitlab），无需手动切换。