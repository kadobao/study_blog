// 不需要做任何更改



import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: process.env.NODE_ENV === 'production' ? "/study_blog/" : "/",

  port: 4343,

  lang: "zh-CN",
  title: "个人学习记录博客",
  description: "vuepress-theme-hope 的博客演示",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
