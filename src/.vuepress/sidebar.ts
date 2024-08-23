import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "acrticle/demo",
      link: "acrticle/demo/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "文章",
      icon: "book",
      prefix: "acrticle/posts",
      children: "structure",
      collapsible: true
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    },
  ],
});
