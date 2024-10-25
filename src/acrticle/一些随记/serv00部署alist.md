---
title: 在serv00部署alist
icon: 
order: 2
category:
  - 一些随记
tag:
  - alist
---




::: details 点击展开具体步骤

查看进程：`pgrep -l .`，查看alist进程是否存在：`pgrep -laf alist`。  


![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.1hs5cn4i9o.jpg)
先使用`rm -rf ./*`删除这个文件夹里面的所有文件，再使用`cd ..`回到上一级目录。再使用`mkdir public_nodejs`创建一个public_nodejs文件夹，使用`cd public_nodejs`进入`public_nodejs`文件夹，再使用`wget https://github.com/uubulb/alist-freebsd/releases/download/v3.36.0/alist`下载alist包
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.8dwswujj19.jpg)



![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.1lbraegk5n.jpg)
选择添加一个网站域名，然后去cloudflare添加NS记录


![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.7ax3lzgf1w.jpg)
把这个NS记录添加到cloudflare的dns解析里


![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.839z3pyst3.jpg)
NS记录添加到cloudflare的dns解析里


![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.3d4q5baae6.jpg)
再去创建一个数据库，记住用户名，密码，数据库的名字
```yml
用户名：m2646_alist
密码：xxIlw]K0oDjR-QB2bq0_9d-Zfg.0P*
数据库的名字：m2646_alist
数据库的地址：mysql3.serv00.com
```

获取数据库的地址：`mysql3.serv00.com`
![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.8s38nqu2o6.jpg)


![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.wihqe9nax.jpg)
到`public_nodejs`文件夹里面，使用`chmod +x alist && ./alist server`运行alist

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240826/image.60u6foed8i.jpg)
到底`public_nodejs`文件夹里面的`data`文件夹里面，把`config.json`换成这个：


:::



::: details 点击展开


```json
{
  "force": false,
  "site_url": "https://s3.homini.us.kg",
  "cdn": "",
  "jwt_secret": "uH5cS9k0QbHM6BJv",
  "token_expires_in": 48,
  "database": {
    "type": "mysql",
    "host": "mysql3.serv00.com",
    "port": 3306,
    "user": "m2646_alist",
    "password": "xxIlw]K0oDjR-QB2bq0_9d-Zfg.0P*",
    "name": "m2646_alist",
    "db_file": "data/data.db",
    "table_prefix": "x_",
    "ssl_mode": "",
    "dsn": ""
  },
  "meilisearch": {
    "host": "http://localhost:7700",
    "api_key": "",
    "index_prefix": ""
  },
  "scheme": {
    "address": "0.0.0.0",
    "http_port": 11938,
    "https_port": -1,
    "force_https": false,
    "cert_file": "",
    "key_file": "",
    "unix_file": "",
    "unix_file_perm": ""
  },
  "temp_dir": "data/temp",
  "bleve_dir": "data/bleve",
  "dist_dir": "",
  "log": {
    "enable": true,
    "name": "data/log/log.log",
    "max_size": 50,
    "max_backups": 30,
    "max_age": 28,
    "compress": false
  },
  "delayed_start": 0,
  "max_connections": 0,
  "tls_insecure_skip_verify": true,
  "tasks": {
    "download": {
      "workers": 5,
      "max_retry": 1
    },
    "transfer": {
      "workers": 5,
      "max_retry": 2
    },
    "upload": {
      "workers": 5,
      "max_retry": 0
    },
    "copy": {
      "workers": 5,
      "max_retry": 2
    }
  },
  "cors": {
    "allow_origins": [
      "*"
    ],
    "allow_methods": [
      "*"
    ],
    "allow_headers": [
      "*"
    ]
  },
  "s3": {
    "enable": false,
    "port": 0,
    "ssl": false
  }
}
```

:::


主要是修改，其余的都不要修改，域名换成自己的，数据库换成自己的，端口换成自己的
```yml
"site_url": "https://s3.homini.us.kg",
  "database": {
    "type": "mysql",
    "host": "mysql3.serv00.com",
    "port": 3306,
    "user": "m2646_alist",
    "password": "xxIlw]K0oDjR-QB2bq0_9d-Zfg.0P*",
    "name": "m2646_alist",
    "db_file": "data/data.db",
    "table_prefix": "x_",
    "ssl_mode": "",
    "dsn": ""
  },
"http_port": 11938,
```



把下面的代码复制到`public_nodejs`文件夹里面，然后在`public_nodejs`文件夹里面使用`npm22 install`安装依赖，然后访问网站就行，只要修改`aap.js`文件里面的端口就可以了`target: 'http://127.0.0.1:11938'`换成自己的端口，如果是其他应用只要修改
```yml
pgrep -laf alist
alist server # 使用`pgrep -l .`就能查看进程的名字是什么了，前提是你的应用在运行
./alist server
```
就行



### app.js

::: details 点击展开项目代码


```js
const express = require("express"); // 引入 express 模块
const app = express(); // 创建 express 应用实例
const port = 3000; // 定义服务器监听的端口
var exec = require("child_process").exec; // 引入 child_process 模块的 exec 函数
const { createProxyMiddleware } = require("http-proxy-middleware"); // 引入 http-proxy-middleware 模块
const path = require('path'); // 引入 path 模块
const fs = require('fs'); // 引入 fs 模块

const currentDir = __dirname; // 获取当前文件所在目录的路径
process.chdir(currentDir); // 将当前工作目录设置为当前文件所在目录

app.use('/', createProxyMiddleware({
  target: 'http://127.0.0.1:11938', // 设置代理目标地址为本地 30277 端口
  changeOrigin: true, // 修改请求头中的 Origin 为目标地址
  ws: true, // 支持 WebSocket
  onError: (err, req, res) => { // 代理发生错误时的处理函数
    res.writeHead(500, { // 返回 500 状态码
      'Content-Type': 'text/plain', // 设置响应内容类型为纯文本
    });
    res.end('Please wait for a while and try to refresh the page.'); // 返回错误信息
  },
}));

function keep_web_alive() { // 定义一个函数用于保持 Web 应用运行
    exec("pgrep -laf alist", function (err, stdout, stderr) { // 执行命令检查 alist 进程是否存在
      if (stdout.includes("alist server")) { // 如果进程存在
        console.log("web 正在运行"); // 输出日志
      } else { // 如果进程不存在
        exec(
          "./alist server", // 执行命令启动 alist 进程
          function (err, stdout, stderr) { // 启动命令的回调函数
            if (err) { // 如果启动失败
              console.log("保活-调起web-命令行执行错误:" + err); // 输出错误日志
            } else { // 如果启动成功
              console.log("保活-调起web-命令行执行成功!"); // 输出成功日志
            }
          }
        );
      }
    });
  }
  setInterval(keep_web_alive, 10 * 1000); // 每 10 秒执行一次 keep_web_alive 函数

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); // 启动服务器，监听指定端口
```
:::

### package.json


::: details 点击展开项目代码

```json
{
    "name": "alist",
    "version": "1.0.0",
    "description": "A simple alist server",
    "author": "k0baya",
    "main": "app.js",
    "license": "MIT",
    "private": false,
    "scripts": {
      "start": "node app.js"
    },
    "dependencies": {
      "express": "^4.19.2",
      "http-proxy-middleware": "^3.0.0"
    },
    "engines": {
      "node": "22"
    },
    "keywords": [
      "node"
    ]
}
```

:::



如果域名访问不了，把依赖删除掉，然后重新启动访问就行，如果显示不安全，去ssl哪里第一个IP的管理，申请一个ssl证书就行



申请SSL证书
````yml
拉起镜像
```yml
docker pull jc21/nginx-proxy-manager:latest
```

运行容器
```yml
docker run -d --name nginx-proxy-manager --restart unless-stopped -p 80:80 -p 81:81 -p 443:443 -v C:/Users/cf/Documents/Docker/nginx-proxy-manager/data:/data -v C:/Users/cf/Documents/Docker/nginx-proxy-manager/letsencrypt:/etc/letsencrypt jc21/nginx-proxy-manager:latest
```

访问`http://localhost:81/`，初始账号和密码是：
```yml
Email:    admin@example.com
Password: changeme
```
````




::: details 点击展开具体步骤


![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.77dhoszebt.jpg)
去`SSL Certificates`点击`Add SSL Certificate`申请SSL证书，

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.8ad6zp71dr.jpg)
输入通配符域名，也就是域名前面加上`*.`，例如域名是`kodo.us.kg`，通配符域名就是`*.kodo.us.kg`，输入邮箱，选择域名机构，选择cloudflare，因为域名托管在了cloudflare，

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.6m3u2ik0f0.jpg)
输入Cloudflare API token，Propagation Seconds留空，同意 `Let's Encrypt` 的协议，点击保存就行，过几分钟就可以看到申请好了域名的证书了，

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.51e331q0xp.jpg)
点击三个点，然后选择下载，

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.7p86x66ar.jpg)
cert1.pem:这是服务器的公钥证书文件。

chain1.pem:这是证书链文件，包含了中间证书。

fullchain1.pem:这是完整的证书链文件，包含了 cert1.pem 和 chain1.pem 的组合。

privkey1.pem:这是私钥文件，应该保密。




![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.6m3u2irlgj.jpg)
点击创建Cloudflare API token

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.175bk3ddz8.jpg)
点击创建令牌

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.6wqnvo8g0o.jpg)
选择编辑DNS

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.41xzpvu8wp.jpg)
选择自己要申请SSL证书的域名

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.99tacvp9ru.jpg)
点击继续显示摘要就行

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.8s38oaonxb.jpg)
点击创建令牌

![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240827/image.6f0m73blu6.jpg)
这个就是我们需要的`Cloudflare API token`令牌了


:::