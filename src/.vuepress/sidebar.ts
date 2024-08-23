import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",  // 指向根目录下的 index.md 文件
    {
      text: "一些随机",
      icon: "pen-to-square",
      prefix: "acrticle/一些随机",  // 注意这个最后不要加`/`，不然会默认展开折叠栏
      link: "acrticle/一些随机/",
      children: "structure",
      collapsible: true
    },
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "acrticle/demo",   // prefix 属性的作用是定义一个路径前缀，用于指定侧边栏项的子项相对于根目录所在的路径，这里指的根目录是指源文件
      link: "acrticle/demo/",   // link: "acrticle/demo/" 指向的是 acrticle/demo/ 目录。这意味着当用户点击这个侧边栏项时，他们将被带到 acrticle/demo/ 目录的主页（通常是 index.html 或 README.md）。
      children: "structure",
      collapsible: true,
    },
    {
      text: "文章",
      icon: "book",
      prefix: "acrticle/posts",
      link: "acrticle/posts/",    // link: "acrticle/posts/" 指向的是 acrticle/posts/ 目录。这意味着当用户点击这个侧边栏项时，他们将被带到 acrticle/posts/ 目录的主页（通常是 index.html 或 README.md）。
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
