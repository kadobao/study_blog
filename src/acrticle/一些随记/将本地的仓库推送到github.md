---
title: 将本地的仓库推送到github
icon: 
order: 
category:
  - 一些随记
tag:
  - github
---



```bash
git init
```

```bash
git config user.name "昵称"
```

```bash
git config user.email "邮箱"
```

```bash
git add .
```

```bash
git commit -m "Initial commit"
```

```bash
git branch -M main
```

```bash
git remote add origin git@github.com-别名:kadobao/my-vue-me
```

```bash
git push -u origin main
```



修改远程仓库地址：
```bash
git remote set-url origin https://gitee.com/your_username/your_repository.git
```