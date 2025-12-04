// 不需要做任何更改



import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  // 没有配置自定义域名的写法
  // base: process.env.NODE_ENV === 'production' ? "/study_blog/" : "/",

  // 配置了自定义域名的写法
  base: "/",

  port: 4343,

  lang: "zh-CN",
  title: "个人学习记录博客",
  description: "vuepress-theme-hope 的博客演示",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
});
