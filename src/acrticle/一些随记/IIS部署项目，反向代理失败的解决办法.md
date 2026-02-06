---
title: IIS部署项目，反向代理失败的解决办法
icon:
order: 40
category:
  - 一些随记
tag:
  - IIS
  - 反向代理
---

在 IIS 中安装 Application Request Routing (ARR) 模块后，默认情况下代理功能是关闭的，必须手动启用才能让 IIS 作为反向代理转发请求。

## 启用步骤

1. 在 IIS 管理器中，点击左侧的服务器节点（即计算机名，代表整个服务器级别）

2. 在中间的功能视图中，双击打开 "Application Request Routing Cache"

3. 在右侧操作面板中，点击 "Server Proxy Settings..."

4. 在弹出的窗口中，勾选 "Enable proxy"（有时也显示为 "Enable proxy" 或 "Enable application request routing"）

5. 点击 "Apply"（应用）保存设置