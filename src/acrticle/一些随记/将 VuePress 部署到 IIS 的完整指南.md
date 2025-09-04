---
title: 将 VuePress 部署到 IIS 的完整指南
icon: search
order: 20
category:
  - 一些随记
tag:
  - Vuepress
  - IIS
---


# 将 VuePress 部署到 IIS 的完整指南

## 构建静态文件

1. 在项目根目录执行构建命令：
```bash
npm run docs:build
```

## 配置 IIS 支持

### 1. 添加 web.config 文件

在生成的 `dist` 文件夹中添加 `web.config` 文件，内容如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/" />
                </rule>
            </rules>
        </rewrite>
        <httpErrors errorMode="DetailedLocalOnly">
            <remove statusCode="404" subStatusCode="-1" />
            <remove statusCode="500" subStatusCode="-1" />
            <!-- VuePress 内置的 404 页面 -->
            <error statusCode="404" path="/404.html" responseMode="File" />
            <error statusCode="500" path="/500.html" responseMode="File" />
        </httpErrors>
        <modules runAllManagedModulesForAllRequests="true"/>
    </system.webServer>
</configuration>
```

### 2. 设置文件夹权限

1. 找到 `dist` 文件夹
2. 右键 → 属性 → 安全 → 编辑
3. 添加以下账户（点击"添加"→"高级"→"立即查找"）：
   - `IIS_IUSRS`
   - `IUSR`
   - 应用程序池账户（默认是应用程序池上一级目录的名字）
4. 给这些账户赋予 **完全控制** 权限（至少需要"读取和执行"、"列出文件夹内容"、"读取"权限）

### 3. 在 IIS 中创建网站

1. 打开 IIS 管理器
2. 右键"网站" → "添加网站"
3. 配置网站：
   - 网站名称：填写你想要的网站名称
   - 物理路径：选择 `dist` 文件夹的路径
   - 绑定设置：
     - 类型：http
     - IP地址：选择"全部未分配"或指定本机IP
     - 端口：设置未被占用的端口号（如8080）
     - 主机名：留空

## 访问网站

部署完成后，可以通过以下方式访问：

1. **本地访问**：
   - 在浏览器地址栏输入：`http://localhost:端口号`
   - 或使用本机IP地址：`http://[你的本地IP地址]:端口号`

2. **局域网访问**：
   - 同一局域网内的其他设备可以通过：`http://[服务器IP地址]:端口号`

> 提示：要查看本机IP地址，可以在命令提示符中输入 `ipconfig`（Windows）或 `ifconfig`（Mac/Linux），查找IPv4地址。