---
title: IIS 部署 ASP.NET Core WebAPI 指南
icon:
order: 35
category:
  - 一些随记
tag:
  - IIS
  - WebAPI
---

# IIS 部署 ASP.NET Core Web API 指南

## 第一步：安装必要组件

### 1.1 下载 ASP.NET Core 托管捆绑包

下载 Windows 版本的 ASP.NET Core 托管捆绑包（Hosting Bundle），对应「ASP.NET Core 运行时 8.0.22」板块下 Windows 行的「Hosting Bundle」链接：

**下载地址：**

```bash
https://builds.dotnet.microsoft.com/dotnet/aspnetcore/Runtime/8.0.22/dotnet-hosting-8.0.22-win.exe
```

> 📝 **说明**：这个包含了 IIS 部署必须的组件

### 1.2 启用 Windows 功能

确保已启用以下 Windows 功能：

1. 在 Windows 搜索框中搜索"启用或关闭 Windows 功能"并打开它
2. 找到并展开"Internet Information Services"
3. 全部勾选，然后点击确定

### 1.3 安装 IIS 模块

需要安装以下 IIS 模块：

| 模块名称 | 下载链接 |
|---------|----------|
| URL Rewrite | [点击下载](https://www.iis.net/downloads/microsoft/url-rewrite) |
| Application Request Routing | [点击下载](https://www.iis.net/downloads/microsoft/application-request-routing) |

## 第二步：发布 ASP.NET Core Web API 项目

先将 Visual Studio 中的 API 项目发布为「文件夹」形式（用于 IIS 读取）：

### 2.1 打开项目发布向导

1. 打开你的 ASP.NET Core Web API 项目（确保已编译通过，无报错）
2. 右键项目 → 选择「发布」（或顶部菜单：生成 → 发布）

### 2.2 配置发布目标

在发布窗口中：

1. 点击「新建」→ 发布目标选择「文件夹」→ 点击「下一步」
2. 选择目标框架（需与服务器安装的 .NET 运行时一致，如 .NET 8.0）→ 点击「下一步」
3. 选择发布位置（建议本地创建一个容易找到的文件夹，如 `D:\Publish\MyWebApi`）→ 点击「完成」

### 2.3 配置发布选项（关键）

在发布窗口的「配置」中，设置：

| 配置项 | 建议值 | 说明 |
|--------|--------|------|
| 部署模式 | 框架依赖 | 需服务器安装对应 .NET 运行时，体积小 |
| 目标运行时 | win-x64 | Windows 64位系统 |

点击「发布」按钮，等待发布完成（发布成功后会显示「发布成功」，并打开发布目录）

## 第三步：配置发布目录权限（避免访问报错）

1. 打开发布目录（如 `D:\Publish\MyWebApi`）
2. 右键目录 → 选择「属性」→ 切换到「安全」选项卡
3. 点击「编辑」→ 点击「添加」→ 输入对象名称 `IIS_IUSRS` → 点击「检查名称」→ 确认后点击「确定」
4. 给「IIS_IUSRS」分配权限：勾选「读取」「读取和执行」「列出文件夹内容」→ 点击「确定」

## 第四步：配置 IIS（核心步骤）

### 4.1 打开 IIS 管理器

**方法一：**
1. 按 `Win + R` → 输入 `inetmgr` → 回车

**方法二：**
控制面板 → 系统和安全 → 管理工具 → Internet Information Services (IIS) 管理器

### 4.2 创建应用程序池（必须为 ASP.NET Core 专用）

> ⚠️ **重要**：IIS 需要专用应用程序池运行 ASP.NET Core，不能用默认池（默认池是为 ASP.NET Framework 设计的）

在 IIS 管理器左侧「连接」面板中：
1. 展开服务器名称 → 右键「应用程序池」→ 选择「添加应用程序池」

**配置应用程序池：**

| 配置项 | 值 | 说明 |
|--------|----|----|
| 名称 | 自定义（如 `MyWebApiPool`） | 便于识别 |
| .NET CLR 版本 | 无托管代码 | ASP.NET Core 不依赖 IIS 的 CLR 托管 |
| 托管管道模式 | 集成 | - |

点击「确定」

### 4.3 创建网站（指向发布目录）

在 IIS 管理器左侧「连接」面板中，右键「网站」→ 选择「添加网站」

**配置网站基本信息：**

| 配置项 | 值 | 说明 |
|--------|----|----|
| 网站名称 | 自定义（如 `MyWebApi`） | 与应用程序池名称一致便于管理 |
| 应用程序池 | 下拉选择第一步创建的应用程序池 | 必须匹配 |
| 物理路径 | 点击「浏览」→ 选择第一步发布的文件夹 | 如 `D:\Publish\MyWebApi` |

**绑定：配置访问地址（关键）：**

| 配置项 | 建议值 | 说明 |
|--------|--------|------|
| 类型 | http | - |
| IP 地址 | 全部未分配 | 允许所有 IP 访问 |
| 端口 | 自定义未被占用的端口 | 如 `8080`，避免与默认 80 端口冲突 |
| 主机名 | 留空 | 无需域名时 |

✅ 勾选「启动网站立即」

点击「确定」，此时网站会自动启动（左侧网站列表中状态为「已启动」）

## 第五步：放行防火墙端口

1. 控制面板 → 查看方式：大图标 → Windows Defender 防火墙
2. 高级设置 → 入站规则 → 新建规则
3. 选择「端口」→ 点击「下一步」
4. 选择「TCP」→ 特定本地端口（如 `8080`）→ 点击「下一步」
5. 选择「允许连接」→ 点击「下一步」
6. 保持默认配置→ 点击「下一步」
7. 输入规则名称（如 "IIS Web API Port"）→ 点击「完成」

---

✅ **至此，ASP.NET Core Web API 在 IIS 上的部署已完成！**

## IIS 部署问题排查指南

### 问题1：没有 web.config 报错 404

**错误现象：**
页面显示 404 错误（物理路径填写的是 VS 发布的路径）

**解决办法：**
将 IIS 站点的物理路径修改为 VS 发布时实际填写的正确路径

### 问题2：缺少 AspNetCoreModuleV2 模块报错 500.19

**问题诊断步骤：**

1. 打开目标服务器的 IIS 管理器
2. 点击左侧「服务器名称」（位于最顶部）
3. 双击右侧「模块」（在「IIS」栏目下）
4. 在模块列表中搜索「AspNetCoreModuleV2」

**判断标准：**
- 如果找不到该模块：说明模块未注册（这是核心问题）

**解决办法：**

1. 卸载当前的 `dotnet-hosting-8.0.22-win.exe`
2. 重新安装 `dotnet-hosting-8.0.22-win.exe`
3. 以管理员身份打开命令提示符，执行命令：

```bash
iisreset
```

## Windows Server 服务器部署

### 安装必要组件

1. 打开「服务器管理器」
2. 选择「添加角色和功能」
3. 勾选「Web 服务器 (IIS)」，并确保勾选以下子项：

**角色服务：**
- ASP.NET 4.8
- ISAPI 扩展
- ISAPI 筛选器

**管理工具：**
- IIS 管理器

> 📝 **说明**：之后的步骤按上面的常规部署流程进行即可。