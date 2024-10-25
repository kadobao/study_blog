---
title: VuePress配置Algolia踩坑
icon: 
order: 
category:
  - 一些随记
tag:
  - Algolia
---












直接放在theme.ts里面的插件里面：

```
    docsearch: {
      appId: '',         // 替换为你的 appId
      apiKey: '',       // 替换为你的 apiKey
      indexName: '', // 替换为你的 indexName
      // 可选项，参考 DocSearch 配置文档
      placeholder: '搜索文档',
      translations: {
        button: {
          buttonText: '搜索',
        },
        // 其他翻译选项
      },
    },
```

然后构建之后你会发现，搜索为空，你需要去[后台界面](https://crawler.algolia.com/admin/crawlers/)

```
https://crawler.algolia.com/admin/crawlers/
```

然后点击对应 indexName 进入后台，然后点击 Editor，把`pathsToMatch`替换为自己的博客域名，因为一般后缀是没有**docs/\****的，然后把`recordProps`整体换成这个：

```
          recordProps: {
            lvl1: "h1",
            content: "p, li",
            lvl0: {
              selectors: "p.sidebar-heading.open",
              defaultValue: "Documentation",
            },
            lvl2: "h2",
            lvl3: "h3",
            lvl4: "h4",
            lvl5: "h5",
            tags: {
              defaultValue: ["v1"],
            },
          },
```



![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/image.6bh2myw6f6.jpg)