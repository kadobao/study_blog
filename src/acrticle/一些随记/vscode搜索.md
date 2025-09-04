---
title: vscode的搜索
icon: 
order: 2
category:
  - 一些随记
tag:
  - vscode
---







普通搜索是`Ctrl  + F`，全局搜索是`Ctrl + Shift + F`

------

起因是我学习这个[开源项目](https://github.com/caix-1987/vue3-vite-typescript-elementplus-pinia)，然后想给密码框加上一个显示隐藏效果，打开login文件夹报错

```
不能将类型“{ username: "caix-1987"; password: string; }”分配给类型“LoginFormRequest”。
  属性“username”的类型不兼容。
    不能将类型“"caix-1987"”分配给类型“"admin" | "guest"”。ts-plugin(2322)
```

，于是丢给gpt分析，发现是类型错误，gpt也给出了建议，

```
// 假设 LoginFormRequest 在 "@/api/login/type" 中定义，修改这个文件
export type LoginFormRequest = {
  username: "admin" | "guest" | "caix-1987"; // 允许 "caix-1987"
  password: string;
};
```


最开始是`Ctrl  + F`，发现不是全局搜索，搜索发现全局搜索是`Ctrl + Shift + F`，于是搜索，发现文件是位于`api`文件夹里面。
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20241014/image.45hnl6busq.jpg)

最后也顺利实现了密码框的隐藏和显示。
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20241014/image.7p3lazfypz.jpg)