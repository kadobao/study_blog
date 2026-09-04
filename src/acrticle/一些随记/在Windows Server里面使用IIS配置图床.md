---
title: 在Windows Server里面使用IIS配置图床
icon:
order: 48
category:
  - 一些随记
tag:
  - Windows Server
  - IIS
  - 图床
---

# 在Windows Server里面使用IIS配置图床

## 第一步：安装必要组件

### 1.1 下载 ASP.NET Core 托管捆绑包

下载 Windows 版本的 ASP.NET Core 托管捆绑包（Hosting Bundle），对应「ASP.NET Core 运行时 8.0.22」板块下 Windows 行的「Hosting Bundle」链接：

**下载地址：**

```text
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

| 模块名称                     | 下载链接                                                                   |
| --------------------------- | ------------------------------------------------------------------------- |
| URL Rewrite                 | [点击下载](https://www.iis.net/downloads/microsoft/url-rewrite)            |
| Application Request Routing | [点击下载](https://www.iis.net/downloads/microsoft/application-request-routing) |

## 第二步：配置图片目录权限（避免访问报错）

1. 打开发布目录（如 `D:\Publish\MyWebApi`）
2. 右键目录 → 选择「属性」→ 切换到「安全」选项卡
3. 点击「编辑」→ 点击「添加」→ 分别输入对象名称 `IIS_IUSRS` 和 `IUSR` → 点击「检查名称」→ 确认后点击「确定」
4. 给「IIS_IUSRS」「IUSR」分配权限：勾选「读取」「读取和执行」「列出文件夹内容」→ 点击「确定」

## 第三步：配置 IIS（核心步骤）

### 3.1 打开 IIS 管理器

**方法一：**

1. 按 `Win + R` → 输入 `inetmgr` → 回车

**方法二：**

控制面板 → 系统和安全 → 管理工具 → Internet Information Services (IIS) 管理器

### 3.2 创建应用程序池

在 IIS 管理器左侧「连接」面板中：

1. 展开服务器名称 → 右键「应用程序池」→ 选择「添加应用程序池」

**配置应用程序池：**

| 配置项        | 值                               | 说明     |
| ------------- | -------------------------------- | -------- |
| 名称          | 自定义（如 `StaticImageSitePool`） | 便于识别 |
| .NET CLR 版本 | 无托管代码                       | -        |
| 托管管道模式  | 集成                             | -        |

点击「确定」

### 3.3 创建网站（指向发布目录）

在 IIS 管理器左侧「连接」面板中，右键「网站」→ 选择「添加网站」

**配置网站基本信息：**

| 配置项     | 值                                  | 说明                       |
| ---------- | ----------------------------------- | -------------------------- |
| 网站名称   | 自定义（如 `StaticImageSite`）      | 与应用程序池名称一致便于管理 |
| 应用程序池 | 下拉选择第一步创建的应用程序池      | 必须匹配                   |
| 物理路径   | 点击「浏览」→ 选择第一步发布的文件夹 | 如 `D:\Publish\StaticImageSite` |

**绑定：配置访问地址（关键）：**

| 配置项  | 建议值               | 说明                              |
| ------- | -------------------- | --------------------------------- |
| 类型    | http                 | -                                 |
| IP 地址 | 全部未分配           | 允许所有 IP 访问                  |
| 端口    | 自定义未被占用的端口 | 如 `8080`，避免与默认 80 端口冲突 |
| 主机名  | 留空                 | 无需域名时                        |

✅ 勾选「启动网站立即」

点击「确定」，此时网站会自动启动（左侧网站列表中状态为「已启动」）

## 第四步：放行防火墙端口

1. 控制面板 → 查看方式：大图标 → Windows Defender 防火墙
2. 高级设置 → 入站规则 → 新建规则
3. 选择「端口」→ 点击「下一步」
4. 选择「TCP」→ 特定本地端口（如 `8080`）→ 点击「下一步」
5. 选择「允许连接」→ 点击「下一步」
6. 保持默认配置 → 点击「下一步」
7. 输入规则名称（如 "IIS Web API Port"）→ 点击「完成」

---

## 第五步：配置目录浏览（方便测试）

### 5.1 开启目录浏览（可选，建议开启方便排查）

1. 在 IIS 管理器左侧「连接」面板中，展开服务器名称 → 展开「网站」→ 点击选中 `StaticImageSite`
2. 在中间面板（功能视图）中，找到并**双击**「目录浏览」图标
3. 进入目录浏览设置页面后，点击右侧「操作」面板 → 点击「**启用**」

> 📝 **说明**：开启后状态会从「禁用」变为「已启用」

### 5.2 验证目录浏览

1. 打开浏览器，在地址栏输入 `http://localhost:8080/`
2. 如果配置成功，页面会显示发布目录下的文件夹和文件列表
3. 点击列表中的文件即可预览图片内容

> 💡 **提示**：目录浏览主要用于测试阶段，方便排查图片是否上传到正确位置、路径是否拼接正确

### 5.3 关闭目录浏览（生产环境）

目录浏览会暴露服务器上的文件结构，存在安全隐患。**生产环境上线后建议关闭**：

1. 在 IIS 管理器左侧选中 `StaticImageSite` 网站
2. 双击中间面板的「目录浏览」
3. 点击右侧「操作」面板 → 点击「**禁用**」

> ⚠️ **注意**：关闭目录浏览后，直接访问 `http://localhost:8080/` 会返回 `403 Forbidden`，但通过完整 URL 仍可正常访问图片（如 `http://localhost:8080/images/test.png`）

---

## 第六步：配置应用池避免被回收（可选，建议配置）

IIS 应用池默认配置会在固定时间间隔或闲置超时后自动回收工作进程，导致网站首次访问时出现短暂卡顿。对于图床这类需要长期稳定运行的静态站点，建议关闭回收机制。

> 📝 **参考文档**：[修改IIS应用池的配置避免部署在IIS上面的API项目被回收](./修改IIS应用池的配置避免部署在IIS上面的API项目被回收.md)

### 6.1 打开应用池高级设置

1. 在 IIS 管理器左侧「连接」面板中，展开服务器名称 → 点击「应用程序池」
2. 找到第三步创建的应用池 `StaticImageSitePool` → **右键** → 选择「**高级设置**」

### 6.2 配置回收参数

在弹出的高级设置窗口中，找到以下配置项并修改：

| 配置项             | 位置                          | 设置值 | 说明                                   |
| ------------------ | ----------------------------- | ------ | -------------------------------------- |
| 固定时间间隔       | 回收 → 固定时间间隔           | 0      | 禁用定期回收，避免固定时间间隔导致的重启 |
| 闲置超时（分钟）   | 进程模型 → 闲置超时（分钟）   | 0      | 禁用闲置超时，防止应用因空闲被回收       |

**设置固定时间间隔：**

将 `回收 → 固定时间间隔` 的值设置为 **0**

![避免IIS回收_1](/assets/images/避免IIS回收_1.png)

**设置闲置超时：**

将 `进程模型 → 闲置超时（分钟）` 的值设置为 **0**

![避免IIS回收_2](/assets/images/避免IIS回收_2.png)

### 6.3 重启应用池使配置生效

配置完成后需要重启应用池才能使修改生效：

1. 在左侧「应用程序池」列表中，选中 `StaticImageSitePool`
2. 点击右侧「操作」面板 → 点击「**停止**」
3. 等待状态变为「已停止」后，再点击「**启动**」

> 💡 **提示**：也可以右键应用池 → 选择「回收」来直接重启工作进程

### 6.4 注意事项

> ⚠️ **注意**：禁用回收后，应用池将长期保持运行，建议配合服务器监控定期检查内存占用情况，必要时可手动回收。

---

## 第七步：配置 MIME 类型（支持非图片文件下载）

IIS 默认只允许访问**已知 MIME 类型**的文件（如 `.png`、`.jpg`、`.gif` 等常见图片类型）。对于不在默认列表中的文件类型（如 `.apk`、`.exe`、`.zip` 等），IIS 出于安全考虑会直接返回 **404 - 找不到文件或目录**，而不是提供下载。

> ⚠️ **注意**：这不是文件权限问题，也不是路径问题，而是 IIS 的安全策略——未知 MIME 类型的文件一律不提供下载。

### 常见需要手动添加 MIME 类型的文件

| 文件扩展名 | MIME 类型 |
| ---------- | --------- |
| `.apk` | `application/vnd.android.package-archive` |
| `.exe` | `application/octet-stream` |
| `.zip` | `application/zip` |
| `.dmg` | `application/x-apple-diskimage` |
| `.wgt` | `application/widget` |

### 方式一：通过 IIS 管理器手动添加

1. 打开 **IIS 管理器**（`Win + R` → 输入 `inetmgr`）
2. 在左侧「连接」面板中，**点击服务器名称**（最顶层节点，不是单个网站）
3. 在中间面板（功能视图）中，找到并**双击「MIME 类型」**
4. 在右侧「操作」面板中，点击**「添加」**
5. 填写以下信息：

   | 配置项 | 值 |
   | ------ | --- |
   | 文件扩展名 | `.apk` |
   | MIME 类型 | `application/vnd.android.package-archive` |

6. 点击「确定」，**立即生效**，无需重启 IIS

> 💡 **提示**：在服务器节点级别添加会对所有网站生效；如果只想对单个网站生效，选中那个网站再操作即可。

### 方式二：通过 web.config 文件添加（推荐，可复用、可移植）

在你的网站物理路径根目录下（如 `D:\Publish\StaticImageSite\`）创建一个 `web.config` 文件，内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <staticContent>
      <!-- APK 安装包 -->
      <mimeMap fileExtension=".apk" mimeType="application/vnd.android.package-archive" />
      <!-- WGT Widget 包（uni-app 热更新包） -->
      <mimeMap fileExtension=".wgt" mimeType="application/widget" />
      <!-- 可根据需要继续添加其他类型 -->
      <!-- <mimeMap fileExtension=".exe" mimeType="application/octet-stream" /> -->
      <!-- <mimeMap fileExtension=".zip" mimeType="application/zip" /> -->
    </staticContent>
  </system.webServer>
</configuration>
```

> 💡 **提示**：放下文件后**立即生效**，无需重启 IIS。以后要加其他类型，只需要在 `<staticContent>` 里加一行 `<mimeMap ... />` 即可。

### 两种方式对比

| | 方式一 IIS 管理器 | 方式二 web.config |
| -------- | ---------------- | ----------------- |
| 操作方式 | 图形界面点击 | 放置一个文件 |
| 作用范围 | 全局（所有网站）或单个网站 | 仅当前网站 |
| 可复用/可移植 | ❌ 不可复用 | ✅ 跟着目录走 |
| 后续维护 | 每次都要打开 IIS 管理器 | 加一行 XML 即可 |

**推荐使用方式二 `web.config`**，既是一键放置即可生效，又方便后续维护和服务器迁移。

---

## 第八步：实现后端上传功能（ASP.NET Core WebAPI）

前面七步我们把 IIS 图床搭成了一个「静态文件站点」——只能手动把图片放进目录、靠 URL 访问。真正的图床还需要一个**后端上传接口**：前端选择文件 → 后端把文件直接写入 IIS 图床的物理目录 → 返回可访问的 URL。

### 8.1 核心原理

后端与 IIS 图床**部署在同一台服务器**上，后端通过代码直接操作磁盘，把文件写入 IIS 站点的物理目录，再由 IIS 负责对外提供静态文件访问。这样**不需要图床额外提供上传 API**，后端写完磁盘即可。

```text
前端 → POST /api/FileUpload/Upload → 后端写入磁盘 → IIS 提供静态访问URL
                                         ↓
                              D:\Publish\StaticImageSite\products\xxx.jpg
                                         ↓
                              http://服务器IP:8080/products/xxx.jpg
```

> 📝 说明：本项目（图床）的物理路径在前面的第三步配置为 `D:\Publish\StaticImageSite`，端口为 `8080`，所以上传后的访问地址基础就是 `http://服务器IP:8080`。

### 8.2 配置图床信息（appsettings.json）

在后端项目的 `appsettings.json` 中新增 `FileBed` 配置节点：

```json
{
  "FileBed": {
    "BaseUrl": "http://服务器IP:8080",
    "PhysicalPath": "D:\\Publish\\StaticImageSite",
    "MaxFileSizeMB": 100,
    "AllowedExtensions": [
      ".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg", ".ico", ".tiff",
      ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".csv", ".md",
      ".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv", ".webm",
      ".mp3", ".wav", ".flac", ".aac", ".ogg",
      ".zip", ".rar", ".7z", ".tar", ".gz",
      ".json", ".xml", ".html", ".htm", ".js", ".css", ".sql", ".log"
    ]
  }
}
```

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `BaseUrl` | 图床访问基础 URL（不含末尾斜杠），正式部署改成服务器 IP | `http://服务器IP:8080` |
| `PhysicalPath` | 图床物理目录，必须和第三步 IIS 站点指向的物理路径一致 | `D:\Publish\StaticImageSite` |
| `MaxFileSizeMB` | 单文件最大允许大小（MB） | `100` |
| `AllowedExtensions` | 允许上传的扩展名白名单（小写，禁止 .exe/.bat 等可执行文件） | 见上 |

> ⚠️ 部署到服务器时，**只需修改 `BaseUrl` 的 IP 和 `PhysicalPath`**，其余不用动。

### 8.3 配置模型类（Models/FileUploadConfig.cs）

```csharp
namespace Test_PureWebApi.Models
{
    /// <summary>
    /// 文件图床配置模型（对应 appsettings.json 中的 FileBed 节点）
    /// </summary>
    public class FileUploadConfig
    {
        /// <summary>
        /// 图床访问基础URL（如 http://10.1.191.226:8080）
        /// </summary>
        public string BaseUrl { get; set; } = string.Empty;

        /// <summary>
        /// 图床物理路径（如 D:\Publish\StaticImageSite）
        /// </summary>
        public string PhysicalPath { get; set; } = string.Empty;

        /// <summary>
        /// 单个文件最大允许大小（MB）
        /// </summary>
        public int MaxFileSizeMB { get; set; } = 100;

        /// <summary>
        /// 允许上传的文件扩展名列表
        /// </summary>
        public List<string> AllowedExtensions { get; set; } = new();
    }
}
```

### 8.4 上传结果 DTO（Models/FileUploadDtos.cs）

```csharp
namespace Test_PureWebApi.Models
{
    /// <summary>
    /// 单个文件上传返回结果
    /// </summary>
    public class FileUploadResult
    {
        /// <summary>
        /// 是否上传成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 文件访问URL（如 http://10.1.191.226:8080/products/xxx.jpg）
        /// </summary>
        public string Url { get; set; } = string.Empty;

        /// <summary>
        /// 实际保存到图床的文件名
        /// </summary>
        public string FileName { get; set; } = string.Empty;

        /// <summary>
        /// 业务子目录名（如 products、devices）
        /// </summary>
        public string Category { get; set; } = string.Empty;

        /// <summary>
        /// 原始文件名
        /// </summary>
        public string OriginalFileName { get; set; } = string.Empty;

        /// <summary>
        /// 文件大小（字节）
        /// </summary>
        public long FileSize { get; set; }

        /// <summary>
        /// 错误信息（失败时返回）
        /// </summary>
        public string? ErrorMessage { get; set; }
    }

    /// <summary>
    /// 批量上传返回结果
    /// </summary>
    public class FileBatchUploadResult
    {
        /// <summary>
        /// 总文件数
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// 成功数量
        /// </summary>
        public int SuccessCount { get; set; }

        /// <summary>
        /// 失败数量
        /// </summary>
        public int FailedCount { get; set; }

        /// <summary>
        /// 每个文件的上传结果明细
        /// </summary>
        public List<FileUploadResult> Results { get; set; } = new();
    }
}
```

### 8.5 核心上传服务（Services/FileUploadService.cs）

这是最关键的文件，包含文件保存、安全校验（路径穿越防护、文件名清洗）、GUID 命名、同名冲突处理。下面示例使用内置 `ILogger`（若你项目已有 `LoggingService`，可将其替换掉）。

```csharp
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Test_PureWebApi.Models;

namespace Test_PureWebApi.Services
{
    #region 文件上传服务（图床管理）

    /// <summary>
    /// 文件上传服务
    /// 负责将文件直接写入IIS图床的物理目录，并返回访问URL
    /// 支持图片、文档、视频、音频、压缩包等所有配置允许的文件类型
    /// </summary>
    public class FileUploadService
    {
        private readonly FileUploadConfig _config;
        private readonly ILogger<FileUploadService> _logger;

        public FileUploadService(IOptions<FileUploadConfig> config, ILogger<FileUploadService> logger)
        {
            _config = config.Value;
            _logger = logger;

            if (!string.IsNullOrEmpty(_config.PhysicalPath) && !Directory.Exists(_config.PhysicalPath))
            {
                Directory.CreateDirectory(_config.PhysicalPath);
            }

            _logger.LogInformation(
                "FileUploadService 初始化完成，物理路径: {Path}，基础URL: {Url}，允许类型数: {Count}",
                _config.PhysicalPath, _config.BaseUrl, _config.AllowedExtensions.Count);
        }

        /// <summary>
        /// 上传单个文件到图床
        /// </summary>
        public async Task<FileUploadResult> UploadFileAsync(IFormFile file, string? category = null, string? fileName = null)
        {
            if (!IsValidCategory(category))
            {
                _logger.LogWarning("业务子目录名不合法，已拒绝上传: {Category}", category);
                return new FileUploadResult
                {
                    Success = false,
                    ErrorMessage = "业务子目录名不合法：仅允许中文、字母、数字、-、_，且长度不超过50",
                    Category = category ?? string.Empty
                };
            }

            var result = new FileUploadResult
            {
                OriginalFileName = file.FileName,
                Category = category ?? string.Empty
            };

            try
            {
                if (file == null || file.Length == 0)
                {
                    result.Success = false;
                    result.ErrorMessage = "文件为空";
                    return result;
                }

                var maxFileSizeBytes = _config.MaxFileSizeMB * 1024L * 1024L;
                if (file.Length > maxFileSizeBytes)
                {
                    result.Success = false;
                    result.ErrorMessage = $"文件大小({file.Length / 1024.0 / 1024.0:F2}MB)超过最大限制({_config.MaxFileSizeMB}MB)";
                    return result;
                }

                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!_config.AllowedExtensions.Contains(extension))
                {
                    result.Success = false;
                    result.ErrorMessage = $"不支持的文件类型: {extension}";
                    return result;
                }

                var finalExtension = extension;
                var customBaseName = string.Empty;

                if (!string.IsNullOrWhiteSpace(fileName))
                {
                    var safeName = SanitizeFileName(fileName);
                    if (!string.IsNullOrEmpty(safeName))
                    {
                        var customExtension = Path.GetExtension(safeName).ToLowerInvariant();
                        if (!string.IsNullOrEmpty(customExtension))
                        {
                            if (!_config.AllowedExtensions.Contains(customExtension))
                            {
                                result.Success = false;
                                result.ErrorMessage = $"不支持的文件类型: {customExtension}";
                                return result;
                            }
                            finalExtension = customExtension;
                        }
                        customBaseName = Path.GetFileNameWithoutExtension(safeName);
                        if (customBaseName.Length > 100)
                            customBaseName = customBaseName.Substring(0, 100);
                    }
                    else
                    {
                        _logger.LogWarning("自定义文件名非法，已回退为GUID命名: {FileName}", fileName);
                    }
                }

                var saveDir = string.IsNullOrEmpty(category)
                    ? _config.PhysicalPath
                    : Path.Combine(_config.PhysicalPath, category);
                if (!Directory.Exists(saveDir))
                    Directory.CreateDirectory(saveDir);

                var newFileName = string.IsNullOrEmpty(customBaseName)
                    ? $"{Guid.NewGuid()}{finalExtension}"
                    : $"{customBaseName}{finalExtension}";

                if (!string.IsNullOrEmpty(customBaseName) && File.Exists(Path.Combine(saveDir, newFileName)))
                {
                    newFileName = $"{customBaseName}_{Guid.NewGuid().ToString("N").Substring(0, 8)}{finalExtension}";
                }
                result.FileName = newFileName;

                var savePath = Path.Combine(saveDir, newFileName);

                using (var stream = new FileStream(savePath, FileMode.Create, FileAccess.Write))
                {
                    await file.CopyToAsync(stream);
                }

                var urlPath = string.IsNullOrEmpty(category) ? $"/{newFileName}" : $"/{category}/{newFileName}";
                var baseUrl = _config.BaseUrl.TrimEnd('/');
                result.Url = $"{baseUrl}{urlPath}";
                result.FileSize = file.Length;
                result.Success = true;

                _logger.LogInformation("文件上传成功: {Original} -> {Url}，大小: {Size}字节",
                    file.FileName, result.Url, file.Length);
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.ErrorMessage = $"上传异常: {ex.Message}";
                _logger.LogError(ex, "文件上传异常: {FileName}", file.FileName);
                return result;
            }
        }

        /// <summary>
        /// 批量上传文件到图床（并发处理，不逐个循环等待）
        /// </summary>
        public async Task<FileBatchUploadResult> UploadFilesAsync(IFormFile[] files, string? category = null, string[]? fileNames = null)
        {
            var batchResult = new FileBatchUploadResult { TotalCount = files.Length };

            var tasks = files.Select((f, index) =>
            {
                var customName = fileNames != null && index < fileNames.Length ? fileNames[index] : null;
                return UploadFileAsync(f, category, string.IsNullOrWhiteSpace(customName) ? null : customName);
            }).ToArray();

            var results = await Task.WhenAll(tasks);

            foreach (var r in results)
            {
                batchResult.Results.Add(r);
                if (r.Success) batchResult.SuccessCount++;
                else batchResult.FailedCount++;
            }
            return batchResult;
        }

        /// <summary>
        /// 删除图床上的文件
        /// </summary>
        public (bool Success, string Message) DeleteFile(string? category, string fileName)
        {
            try
            {
                if (fileName.Contains("..") || fileName.Contains("/") || fileName.Contains("\\"))
                    return (false, "文件名包含非法字符");

                if (!IsValidCategory(category))
                    return (false, "目录名包含非法字符：仅允许中文、字母、数字、-、_，且长度不超过50");

                var filePath = string.IsNullOrEmpty(category)
                    ? Path.Combine(_config.PhysicalPath, fileName)
                    : Path.Combine(_config.PhysicalPath, category, fileName);

                if (!File.Exists(filePath))
                    return (false, "文件不存在");

                File.Delete(filePath);
                _logger.LogInformation("文件删除成功: {Path}", filePath);
                return (true, "删除成功");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "文件删除异常: {FileName}", fileName);
                return (false, $"删除异常: {ex.Message}");
            }
        }

        /// <summary>
        /// 检查文件是否存在于图床
        /// </summary>
        public (bool Exists, string? Url) FileExists(string? category, string fileName)
        {
            try
            {
                if (!IsValidCategory(category)) return (false, null);
                if (fileName.Contains("..") || fileName.Contains("/") || fileName.Contains("\\")) return (false, null);

                var filePath = string.IsNullOrEmpty(category)
                    ? Path.Combine(_config.PhysicalPath, fileName)
                    : Path.Combine(_config.PhysicalPath, category, fileName);

                if (!File.Exists(filePath)) return (false, null);

                var urlPath = string.IsNullOrEmpty(category) ? $"/{fileName}" : $"/{category}/{fileName}";
                var baseUrl = _config.BaseUrl.TrimEnd('/');
                return (true, $"{baseUrl}{urlPath}");
            }
            catch { return (false, null); }
        }

        #region 安全校验方法

        /// <summary>
        /// 校验业务子目录名合法性，防止路径穿越攻击
        /// 仅允许中文、字母、数字、-、_，长度不超过50
        /// </summary>
        private bool IsValidCategory(string? category)
        {
            if (string.IsNullOrEmpty(category)) return true;
            if (category.Length > 50) return false;

            foreach (var c in category)
            {
                var isLetterOrDigit = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
                var isChinese = c >= '\u4e00' && c <= '\u9fa5';
                if (!isLetterOrDigit && !isChinese && c != '-' && c != '_')
                    return false;
            }
            return true;
        }

        /// <summary>
        /// 清洗自定义文件名，防止路径穿越与非法字符
        /// 1. 只取文件名部分 2. 移除系统非法字符 3. 处理Windows保留设备名
        /// </summary>
        private string? SanitizeFileName(string? rawFileName)
        {
            if (string.IsNullOrWhiteSpace(rawFileName)) return null;

            var name = Path.GetFileName(rawFileName);
            if (string.IsNullOrWhiteSpace(name) || name == "." || name == "..") return null;

            var invalidChars = Path.GetInvalidFileNameChars();
            var cleaned = new string(name.Where(c => !invalidChars.Contains(c)).ToArray());
            cleaned = cleaned.Trim().TrimEnd('.', ' ');

            if (string.IsNullOrWhiteSpace(cleaned) || cleaned == "..") return null;

            var baseName = Path.GetFileNameWithoutExtension(cleaned);
            var reservedNames = new[] { "CON", "PRN", "AUX", "NUL" };
            if (reservedNames.Contains(baseName.ToUpperInvariant())
                || System.Text.RegularExpressions.Regex.IsMatch(baseName, "^(COM|LPT)[0-9]$",
                    System.Text.RegularExpressions.RegexOptions.IgnoreCase))
            {
                cleaned = $"_{cleaned}";
            }
            return cleaned;
        }

        #endregion
    }

    #endregion
}
```

#### 安全机制说明

| 安全措施 | 实现位置 | 作用 |
|----------|----------|------|
| `IsValidCategory` 白名单校验 | 上传/删除/检查时调用 | 防止 `../../` 路径穿越，仅允许中文/字母/数字/-/_ |
| `SanitizeFileName` 文件名清洗 | 自定义文件名解析时 | `Path.GetFileName` 取纯文件名 + 移除系统非法字符 + Windows 保留设备名处理 |
| 扩展名双校验 | 源文件 + 自定义文件名 | 防止上传可执行文件 |
| 同名冲突追加 GUID | `File.Exists` 检查后 | `文件名_8位GUID.ext` |
| 文件大小校验 | 上传时检查 | 防止超大文件耗尽磁盘 |
| 批量并发 | `Task.WhenAll` | 不逐个循环等待，上传更快 |

### 8.6 上传接口控制器（Controllers/FileUploadController.cs）

```csharp
using Microsoft.AspNetCore.Mvc;
using Test_PureWebApi.Models;
using Test_PureWebApi.Services;

namespace Test_PureWebApi.Controllers
{
    #region 文件上传管理

    /// <summary>
    /// 文件上传接口
    /// 支持单张/批量上传文件到IIS图床，按业务类型分目录存储
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FileUploadController : ControllerBase
    {
        private readonly FileUploadService _fileUploadService;
        private readonly ILogger<FileUploadController> _logger;

        public FileUploadController(FileUploadService fileUploadService, ILogger<FileUploadController> logger)
        {
            _fileUploadService = fileUploadService;
            _logger = logger;
        }

        /// <summary>
        /// 上传单个文件到图床
        /// </summary>
        [HttpPost]
        [RequestSizeLimit(200 * 1024 * 1024)]
        public async Task<ActionResult<FileUploadResult>> Upload(
            IFormFile file,
            [FromQuery] string? category = null,
            [FromQuery] string? fileName = null)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new FileUploadResult { Success = false, ErrorMessage = "请选择要上传的文件" });

            var result = await _fileUploadService.UploadFileAsync(file, category, fileName);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        /// <summary>
        /// 批量上传文件到图床（并发处理）
        /// </summary>
        [HttpPost]
        [RequestSizeLimit(500 * 1024 * 1024)]
        public async Task<ActionResult<FileBatchUploadResult>> BatchUpload(
            IFormFile[] files,
            [FromQuery] string? category = null,
            [FromQuery] string[]? fileNames = null)
        {
            if (files == null || files.Length == 0)
                return BadRequest(new FileBatchUploadResult());

            var result = await _fileUploadService.UploadFilesAsync(files, category, fileNames);
            return Ok(result);
        }

        /// <summary>
        /// 删除图床上的文件
        /// </summary>
        [HttpDelete]
        public ActionResult Delete([FromQuery] string? category, [FromQuery] string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest(new { Success = false, Message = "文件名不能为空" });

            var (success, message) = _fileUploadService.DeleteFile(category, fileName);
            return success ? Ok(new { Success = true, Message = message })
                           : BadRequest(new { Success = false, Message = message });
        }

        /// <summary>
        /// 检查文件是否存在于图床
        /// </summary>
        [HttpGet]
        public ActionResult CheckExists([FromQuery] string? category, [FromQuery] string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest(new { Exists = false, Message = "文件名不能为空" });

            var (exists, url) = _fileUploadService.FileExists(category, fileName);
            return Ok(new { Exists = exists, Url = url });
        }
    }

    #endregion
}
```

> ⚠️ **注意**：`IFormFile` 参数**不要**加 `[FromForm]` 特性，否则 Swashbuckle（Swagger）会报错。ASP.NET Core 会自动从 `multipart/form-data` 绑定。

### 8.7 注册服务（Program.cs）

在 `Program.cs` 中绑定配置并注册服务：

```csharp
// 绑定文件图床配置（对应 appsettings.json 的 FileBed 节点）
builder.Services.Configure<Test_PureWebApi.Models.FileUploadConfig>(
    builder.Configuration.GetSection("FileBed"));

// 注册 FileUploadService（单例即可，内部无状态依赖）
builder.Services.AddSingleton<FileUploadService>();
```

如果后端也是部署在 IIS 且使用 HTTP 访问，需要注释掉 HTTPS 重定向中间件（否则会被强制跳转 HTTPS 导致上传失败）：

```csharp
// 部署在IIS图床同服务器且使用HTTP时，注释掉避免重定向
// app.UseHttpsRedirection();
```

### 8.8 目录权限补充（后端需要写入权限）

前面**第二步**只给图床目录分配了「读取 / 读取和执行 / 列出文件夹内容」权限。现在后端要**写入**文件到该目录，还需要给写入权限：

1. 右键图床目录 `D:\Publish\StaticImageSite` → 属性 → 安全
2. 选中 `IIS_IUSRS`（如果是独立应用池，也把对应应用池身份加进来）→ 点击「编辑」
3. 在权限列表中勾选「**修改**」（自动包含写入、读取等）→ 确定

> 💡 提示：`修改` 权限已包含读取与写入，给 `IIS_IUSRS` 分配「修改」即可同时满足 IIS 读文件和后端写文件两种需求。

### 8.9 部署注意事项

1. **IIS 应用池权限**：图床物理路径需给 `IIS_IUSRS` 分配「修改」权限（见 8.8）。
2. **HttpsRedirection**：部署在 HTTP 环境时需注释掉 `app.UseHttpsRedirection()`（见 8.7）。
3. **RequestSizeLimit**：已在 Controller 上设置请求体大小限制（单文件 200MB / 批量 500MB），不够可在 `[RequestSizeLimit(...)]` 调整。
4. **MIME 类型**：非图片文件（如 .pdf / .mp4 / .zip）已在**第七步**通过 `web.config` 配置了 MIME 类型，访问才不会出现 404。
5. **配置修改**：部署到服务器时只需改 `appsettings.json` 的 `BaseUrl`（改成服务器 IP）和 `PhysicalPath`。

### 8.10 调用示例

#### 8.10.1 Postman 单文件上传

```text
POST http://localhost:端口/api/FileUpload/Upload?category=products&fileName=商品图.jpg
Content-Type: multipart/form-data

form-data:
  file: 选择本地文件
```

返回示例：

```json
{
  "success": true,
  "url": "http://服务器IP:8080/products/商品图.jpg",
  "fileName": "商品图.jpg",
  "category": "products",
  "originalFileName": "photo.jpg",
  "fileSize": 102400,
  "errorMessage": null
}
```

> 同名冲突时，返回的文件名会自动追加 8 位 GUID：`商品图_a1b2c3d4.jpg`。

#### 8.10.2 Postman 批量上传

```text
POST http://localhost:端口/api/FileUpload/BatchUpload?category=products&fileNames=a.jpg&fileNames=b.png
Content-Type: multipart/form-data

form-data:
  files: 选择多个文件
```

#### 8.10.3 前端调用（axios 上传示例）

单文件上传：

```javascript
// 单文件上传
const formData = new FormData();
formData.append('file', fileInput.files[0]); // file 为 <input type="file"> 选择的文件

const res = await axios.post(
  '/api/FileUpload/Upload?category=products&fileName=商品图.jpg',
  formData,
  { headers: { 'Content-Type': 'multipart/form-data' } }
);
console.log(res.data.url); // 上传成功后的访问URL
```

批量上传：

```javascript
// 批量上传
const formData = new FormData();
for (const f of fileList) {
  formData.append('files', f); // 注意字段名是 files（复数）
}
// fileNames 可省略，省略时后端用 GUID 自动命名
const res = await axios.post(
  '/api/FileUpload/BatchUpload?category=products',
  formData,
  { headers: { 'Content-Type': 'multipart/form-data' } }
);
console.log(res.data); // { totalCount, successCount, failedCount, results:[...] }
```

> 💡 提示：实际项目中 `category` 建议按业务类型传，例如 `products`（商品图）、`avatars`（头像）、`certificates`（证书）等，便于在图床目录里分类管理。

### 8.11 部署检查清单

**图床侧（IIS）**

- [ ] 应用程序池 .NET CLR 版本设为「无托管代码」
- [ ] 网站物理路径指向 `D:\Publish\StaticImageSite`
- [ ] `IIS_IUSRS` 对图床目录有「修改」权限（读取 + 写入）
- [ ] 防火墙放行 `8080` 端口
- [ ] `web.config` 中已配置非图片文件的 MIME 类型
- [ ] 目录浏览在生产环境已关闭

**后端侧**

- [ ] `appsettings.json` 中 `FileBed.BaseUrl` 改为服务器实际 IP + 端口，`PhysicalPath` 与 IIS 物理路径一致
- [ ] `app.UseHttpsRedirection()` 在 HTTP 环境已注释
- [ ] `RequestSizeLimit` 已设置足够大的值
- [ ] Swagger 中 `IFormFile` 参数未使用 `[FromForm]` 特性
- [ ] `FileUploadService` 已在 `Program.cs` 注册

**安全检查**

- [ ] `IsValidCategory` 在上传 / 删除 / 检查方法中都有调用（防路径穿越）
- [ ] `SanitizeFileName` 处理了 Windows 保留设备名
- [ ] 扩展名白名单已配置（不允许 .exe / .bat / .sh 等可执行文件）
- [ ] 同名文件自动追加 GUID 后缀

> 📝 说明：请将示例代码中的命名空间 `Test_PureWebApi` 替换为你自己的项目名；若你的项目已有 `LoggingService`，可将 `ILogger` 替换回 `LoggingService`。

---

## 使用说明

之后就可以正常地放置图片到目录里面，然后就可以通过 URL 进行访问。之后写好后端，并且将相对路径保存在数据库里面，就是一个图床了。
