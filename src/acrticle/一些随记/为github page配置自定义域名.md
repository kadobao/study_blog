---
title: 为github page配置自定义域名
icon:
order: 33
category:
  - 一些随记
tag:
  - github page
  - 自定义域名
---

## 准备工作

在开始之前，请确保你已经：
- 有一个配置好的VuePress博客
- 拥有自己的域名
- 有GitHub仓库的访问权限

## 配置步骤

### 第一步：创建CNAME文件

在你的项目中创建 `.vuepress/public/CNAME` 文件，并在文件中写入你的自定义域名：

```text
kblog.de5.net
```

> 💡 **提示**：将 `kblog.de5.net` 替换为你的实际域名

### 第二步：配置VuePress基础路径

在 `config.ts` 文件中，确保 `base` 配置为根路径：

```typescript
export default defineConfig({
  base: "/"
})
```

### 第三步：配置GitHub仓库

1. 登录GitHub，进入你的博客仓库
2. 点击顶部的 `Settings` 选项卡
3. 在左侧菜单中找到 `Pages` 选项
4. 在 `Custom domain` 输入框中输入你的域名，例如：`kblog.de5.net`
5. 点击 `Save` 保存

### 第四步：配置域名解析

前往你的域名注册商（推荐使用Cloudflare）进行DNS解析配置：

1. 登录Cloudflare控制面板
2. 选择你的域名
3. 点击 `DNS` 选项卡
4. 点击 `添加记录`
5. 配置以下信息：
   - **类型**：选择 `CNAME`
   - **名称**：输入 `@`
   - **目标**：输入 `kadobao.github.io` （你的GitHub Pages域名）
   - **TTL**：保持默认或设置为自动

> 💡 **提示**：如果你直接使用IP地址，也可以选择 `A` 记录类型

### 第五步：验证配置

等待DNS解析生效（通常需要几分钟到几小时），然后：

1. 访问你的自定义域名检查是否正常显示博客
2. 在GitHub仓库的Pages设置中，确认域名显示为已验证状态

## 完成

配置完成后，你就可以通过自定义域名访问你的博客了！🎉

> ⚠️ **注意**：DNS解析可能需要一些时间生效，如果暂时无法访问，请耐心等待。