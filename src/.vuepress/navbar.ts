// 导航栏配置


import { navbar } from "vuepress-theme-hope";

export default navbar([
  // 代表有两个导航项
  "/",
  "/acrticle/",  // 等同于 { text: "学习记录", link: "/acrticle/" }，VuePress 会自动根据目标页面的 frontmatter 中的 title 字段来显示导航文本，如果没有则使用默认名称。
  // {
  //   text: "博文",
  //   icon: "pen-to-square",
  //   prefix: "acrticle/posts/",
  //   children: [
  //     {
  //       text: "苹果",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "苹果1", icon: "pen-to-square", link: "1" },
  //         { text: "苹果2", icon: "pen-to-square", link: "2" },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     {
  //       text: "香蕉",
  //       icon: "pen-to-square",
  //       prefix: "banana/",
  //       children: [
  //         // {
  //         //   text: "香蕉 1",
  //         //   icon: "pen-to-square",
  //         //   link: "1",
  //         // },
  //         // {
  //         //   text: "香蕉 2",
  //         //   icon: "pen-to-square",
  //         //   link: "2",
  //         // },
  //         "1",
  //         "2",
  //         "3",
  //         "4",
  //       ],
  //     },
  //     { text: "樱桃", icon: "pen-to-square", link: "cherry" },
  //     { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
  //     "tomato",
  //     "strawberry",
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
