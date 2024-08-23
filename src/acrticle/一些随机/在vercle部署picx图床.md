---
title: 在vercle部署picx图床
icon: 
order: 1
category:
  - 一些随记
tag:
  - picx
---

点击添加新的项目
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.3yedno0rto.jpg)

选择GitHub
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.lvntalmwk.jpg)

选择导入你fork的picx仓库
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.7egpfrd88t.jpg)

Framework Preset选择Vue.js，然后点击部署，
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.2krujmu0pr.jpg)

等待部署完成
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.175bfm25qc.jpg)

部署完成点击进入仪表盘
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.8ad6v8du6c.jpg)

复制vercle给的域名，然后点击Domains，接下来去cloudflare添加CNAME记录
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.6f0m2m2uc6.jpg)

类型选择CNAME，主机记录填写自己喜欢的名称，值填写vercle给的域名，然后点击保存
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.2h88lxv8i2.jpg)

填写自定义的域名，然后点击添加
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.2rv2f3bqpb.jpg)

之后就访问自己的域名就可以访问到vercel部署的picx图床了
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240824/image.6f0m2m9xs0.jpg)