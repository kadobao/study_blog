---
title: 常用的element plus组件
icon: fa-brands fa-vuejs
order: 41
category:
  - vue3学习
tag:
  - vue3学习
  - element plus
---

消息提示（轻提示），自动在几秒后消失。：
![消息提示（轻提示）](/assets/images/消息提示(轻提示).png)
```js
ElMessage.success(`操作成功`)
```

消息提示（对话模态框），需要用户点击确认按钮才能关闭。：
![消息提示（对话模态框）](/assets/images/消息提示(对话模态框).png)
```js
ElMessageBox.alert('内容', '标题', {
  confirmButtonText: '确定',
  callback: (action) => {
    console.log(action)
  }
})
```


