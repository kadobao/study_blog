---
title: javascript里面的promise
icon: 
order: 6
category:
  - 一些随记
tag:
  - js的promise
---









**`Promise`** 是 JavaScript 中用于处理异步操作的对象，它代表着一个异步操作的最终完成（或失败）及其结果值。简单来说，`Promise` 提供了一种优雅的方式来处理像网络请求、定时器、文件读取等异步任务。

### `Promise` 的三种状态：
1. **`pending`（等待中）**：初始状态，既没有完成，也没有拒绝。
2. **`fulfilled`（已成功）**：操作成功完成，Promise 有了一个结果值（通过 `resolve()` 实现）。
3. **`rejected`（已失败）**：操作失败，Promise 有了拒绝的原因（通过 `reject()` 实现）。

在 JavaScript 中，Promise 构造函数接受一个执行器函数作为参数，这个执行器函数本身接受两个参数：resolve 和 reject。这两个参数是函数，用来在异步操作成功或失败时分别改变 Promise 的状态。

### 创建一个 `Promise`
```js
const promise = new Promise((resolve, reject) => {
  // 执行一些异步操作
  let success = true;

  if (success) {
    resolve('操作成功');  // 调用 resolve()，Promise 变为 fulfilled 状态
  } else {
    reject('操作失败');  // 调用 reject()，Promise 变为 rejected 状态
  }
});
```

### 使用 `Promise`：
1. **`then()`**：用于处理 Promise 成功完成时的结果。
2. **`catch()`**：用于处理 Promise 被拒绝（失败）的情况。
3. **`finally()`**：无论 Promise 成功或失败，都会执行的操作。

```js
promise
  .then((result) => {
    console.log(result);  // 如果成功，输出 "操作成功"
  })
  .catch((error) => {
    console.error(error);  // 如果失败，输出 "操作失败"
  })
  .finally(() => {
    console.log('操作结束');  // 不管成功或失败，都会执行
  });
```

### 回到代码中的 `Promise.reject(error)`：
```js
return Promise.reject(error);
```
这个代码的意思是返回一个被拒绝（`rejected`）的 `Promise`，并将 `error` 作为原因。这样，调用该方法的地方就可以捕获到这个错误，并通过 `.catch()` 或 `try...catch` 处理它。

### 应用场景：
在 Axios 响应拦截器中，如果请求失败，返回 `Promise.reject(error)` 会将错误传递出去，这样你在使用 Axios 时，可以通过 `.catch()` 捕获这个错误，并进行相应的处理。

例如：

```js
axiosInstance.get('/api')
  .then((data) => {
    console.log('数据：', data);
  })
  .catch((error) => {
    console.error('请求出错：', error);  // 捕获到拦截器中传出的错误
  });
```