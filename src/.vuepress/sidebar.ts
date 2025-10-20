// 侧边栏配置
// 要增加侧边栏直接增加一个{}就行了，然后在`src\acrticle`下面新建一个文件夹，文件夹下面新建一个`README.md`文件



import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",  // 指向根目录下的 index.md 文件
    {
      text: "一些随记",
      icon: "pen-to-square",
      prefix: "acrticle/一些随记",  // 注意这个最后不要加`/`，不然会默认展开折叠栏
      link: "acrticle/一些随记/",
      children: "structure",
      collapsible: true
    },
    // {
    //   text: "JAVA学习",
    //   icon: "laptop-code",
    //   prefix: "acrticle/JAVA学习",   // prefix 属性的作用是定义一个路径前缀，用于指定侧边栏项的子项相对于根目录所在的路径，这里指的根目录是指源文件
    //   link: "acrticle/JAVA学习/",   // link: "acrticle/demo/" 指向的是 acrticle/demo/ 目录。这意味着当用户点击这个侧边栏项时，他们将被带到 acrticle/demo/ 目录的主页（通常是 index.html 或 README.md）。
    //   children: "structure",
    //   collapsible: true,
    // },
    {
      text: "vue学习",
      icon: "fa-brands fa-vuejs",
      prefix: "acrticle/vue学习",   // prefix 属性的作用是定义一个路径前缀，用于指定侧边栏项的子项相对于根目录所在的路径，这里指的根目录是指源文件
      link: "acrticle/vue学习/",   // link: "acrticle/demo/" 指向的是 acrticle/demo/ 目录。这意味着当用户点击这个侧边栏项时，他们将被带到 acrticle/demo/ 目录的主页（通常是 index.html 或 README.md）。
      children: "structure",    // 用于侧边栏的自动生成
      collapsible: true,  // 是否可折叠
    },
    {
      text: "C#学习",
      icon: "code",
      prefix: "acrticle/Csharp",
      link: "acrticle/Csharp/",    
      children: "structure",    // 用于侧边栏的自动生成
      collapsible: true    // 是否可折叠
    },
    {
      text: "Python学习",
      icon: "fab fa-python",
      prefix: "acrticle/Python学习",
      link: "acrticle/Python学习/",    
      children: "structure",    // 用于侧边栏的自动生成
      collapsible: true    // 是否可折叠
    },
    {
      text: "SQL理解",
      icon: "database",
      prefix: "acrticle/SQL理解",
      link: "acrticle/SQL理解/",
      children: "structure",
      collapsible: true
    },
    {
      text: "CSS属性",
      icon: "fa-brands fa-css3",
      prefix: "acrticle/CSS属性",
      link: "acrticle/CSS属性/",
      children: "structure",
      collapsible: true
    },
    {
      text: "JS学习",
      icon: "fa-brands fa-node-js",
      prefix: "acrticle/JS学习",
      link: "acrticle/JS学习/",
      children: "structure",
      collapsible: true
    },

    // {
    //   text: "C#学习",
    //   icon: "laptop-code",
    //   prefix: "acrticle/csharp",
    //   link: "acrticle/csharp/",    
    //   children: "structure",
    //   collapsible: true
    // },
    // {
    //   text: "PLC编程",
    //   icon: "laptop-code",
    //   prefix: "acrticle/PLC编程",   // prefix 属性的作用是定义一个路径前缀，用于指定侧边栏项的子项相对于根目录所在的路径，这里指的根目录是指源文件
    //   link: "acrticle/PLC编程/",    
    //   children: "structure",
    //   collapsible: true
    // },
    
    // {
    //   text: "文章",
    //   icon: "book",
    //   prefix: "acrticle/posts",
    //   link: "acrticle/posts/",    // link: "acrticle/posts/" 指向的是 acrticle/posts/ 目录。这意味着当用户点击这个侧边栏项时，他们将被带到 acrticle/posts/ 目录的主页（通常是 index.html 或 README.md）。
    //   children: "structure",
    //   collapsible: true
    // },
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
