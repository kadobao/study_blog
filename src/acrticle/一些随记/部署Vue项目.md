---
title: 部署Vue项目
icon:
order: 38
category:
  - 一些随记
tag:
  - Vue
  - 部署
---


## 第一步：下载 ASP.NET Core 托管捆绑包

下载 Windows 版本的 ASP.NET Core 托管捆绑包（Hosting Bundle），对应「ASP.NET Core 运行时 8.0.22」板块下 Windows 行的「Hosting Bundle」链接：

**下载地址：**

```
https://builds.dotnet.microsoft.com/dotnet/aspnetcore/Runtime/8.0.22/dotnet-hosting-8.0.22-win.exe
```

> 📝 **说明**：这个包含了 IIS 部署必须的组件

## 第二步：启用 Windows 功能

确保已启用以下 Windows 功能：

1. 在 Windows 搜索框中搜索"启用或关闭 Windows 功能"并打开它
2. 找到并展开"Internet Information Services"
3. 全部勾选，然后点击确定

## 第三步：安装 IIS 模块

需要安装以下 IIS 模块：

| 模块名称 | 下载链接 |
| :--- | :--- |
| URL Rewrite | [点击下载](https://www.iis.net/downloads/microsoft/url-rewrite) |
| Application Request Routing | [点击下载](https://www.iis.net/downloads/microsoft/application-request-routing) |

## 第四步：打开 IIS 管理器

**方法一：**

1. 按 `Win + R` → 输入 `inetmgr` → 回车

**方法二：**

控制面板 → 系统和安全 → 管理工具 → Internet Information Services (IIS) 管理器

## 第五步：创建应用程序池

在 IIS 管理器左侧「连接」面板中：

1. 展开服务器名称 → 右键「应用程序池」→ 选择「添加应用程序池」

**配置应用程序池：**

| 配置项 | 值 | 说明 |
| :--- | :--- | :--- |
| 名称 | 自定义（如 `VueProjectPool`） | 便于识别 |
| .NET CLR 版本 | 无托管代码 | Vue 项目不依赖 IIS 的 CLR 托管 |
| 托管管道模式 | 集成 | - |

点击「确定」

## 第六步：配置发布目录权限

配置发布目录权限（避免访问报错）

1. 打开发布目录（如 `D:\Publish\VueProject`）
2. 右键目录 → 选择「属性」→ 切换到「安全」选项卡
3. 点击「编辑」→ 点击「添加」→ 输入对象名称 `IIS_IUSRS` → 点击「检查名称」→ 确认后点击「确定」
4. 点击「编辑」→ 点击「添加」→ 输入对象名称 `IUSR` → 点击「检查名称」→ 确认后点击「确定」
5. 给「IIS_IUSRS」和 「IUSR」分配权限：勾选「读取」「读取和执行」「列出文件夹内容」→ 点击「确定」

## 第七步：创建网站（指向发布目录）

在 IIS 管理器左侧「连接」面板中，右键「网站」→ 选择「添加网站」

**配置网站基本信息：**

| 配置项 | 值 | 说明 |
| :--- | :--- | :--- |
| 网站名称 | 自定义（如 `VueProject`） | 与应用程序池名称一致便于管理 |
| 应用程序池 | 下拉选择第一步创建的应用程序池 | 必须匹配 |
| 物理路径 | 点击「浏览」→ 选择第一步发布的文件夹 | 如 `D:\Publish\VueProject` |

**绑定：配置访问地址（关键）：**

| 配置项 | 建议值 | 说明 |
| :--- | :--- | :--- |
| 类型 | http | - |
| IP 地址 | 全部未分配 | 允许所有 IP 访问 |
| 端口 | 自定义未被占用的端口 | 如 `8080`，避免与默认 80 端口冲突 |
| 主机名 | 留空 | 无需域名时 |


## 第八步：放行防火墙端口

### 方法一：图形界面配置

1. 控制面板 → 查看方式：大图标 → Windows Defender 防火墙
2. 高级设置 → 入站规则 → 新建规则
3. 选择「端口」→ 点击「下一步」
4. 选择「TCP」→ 特定本地端口（如 `8080`）→ 点击「下一步」
5. 选择「允许连接」→ 点击「下一步」
6. 保持默认配置→ 点击「下一步」
7. 输入规则名称（如 "VueProject Port"）→ 点击「完成」

### 方法二：命令行配置

使用管理员权限打开命令提示符（CMD）或 PowerShell，执行以下命令：

```bash
netsh advfirewall firewall add rule name="VueProject Port" dir=in action=allow protocol=TCP localport=8080 profile=any
```

> 📝 **说明**：将 `8080` 替换为你实际需要放行的端口号，`VueProject Port` 可以自定义规则名称



