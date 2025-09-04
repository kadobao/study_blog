---
title: 获取价格并发送给tg_bot
icon: 
order: 21
category:
  - 一些随记
tag:
  - python
---





### 获取价格并发送给tg_bot

::: details 点击展开项目代码

```python
import requests
from concurrent.futures import ThreadPoolExecutor
import time

def get_binance_price(symbol):
    url = f"https://api.binance.com/api/v3/ticker/price?symbol={symbol}USDT"
    response = requests.get(url)
    data = response.json()
    usdt_price = float(data['price'])
    cny_price = usdt_price * 7.01
    return f"{symbol}/USDT 实时价格: {usdt_price:.2f} USD, 人民币价格: {cny_price:.2f} CNY"

def send_telegram_message(message):
    # 替换为你的API Token
    API_TOKEN = ''
    # 替换为你的Chat ID
    CHAT_ID = ''
    # 发送消息的URL
    send_message_url = f'https://api.telegram.org/bot{API_TOKEN}/sendMessage'
    # 设置请求参数
    params = {
        'chat_id': CHAT_ID,
        'text': message
    }
    # 发送请求
    response = requests.get(send_message_url, params=params)
    # 检查请求是否成功
    if response.status_code == 200:
        print("消息发送成功")
    else:
        print(f"消息发送失败，状态码: {response.status_code}")
        print(f"响应内容: {response.text}")

# 获取 ILV 和 HIGH 的实时价格
symbols = ["ILV", "HIGH"]

while True:
    with ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(get_binance_price, symbols))

    # 将所有结果合并成一条消息
    combined_message = "\n".join(results)

    # 发送合并后的消息到 Telegram
    send_telegram_message(combined_message)

    # 等待一段时间再进行下一次循环
    time.sleep(60)  # 每分钟执行一次
```

:::





### 获取价格并发送给tg_bot，并提醒

::: details 点击展开项目代码

```python
import requests
from concurrent.futures import ThreadPoolExecutor
import time
import threading

def get_binance_price(symbol):
    url = f"https://api.binance.com/api/v3/ticker/price?symbol={symbol}USDT"
    response = requests.get(url)
    data = response.json()
    usdt_price = float(data['price'])
    cny_price = usdt_price * 7.01
    return symbol, usdt_price, cny_price

def send_telegram_message(message):
    # 替换为你的API Token
    API_TOKEN = '7351:AAE9aA_6RdUBessI'
    # 替换为你的Chat ID
    CHAT_ID = '656544319'
    # 发送消息的URL
    send_message_url = f'https://api.telegram.org/bot{API_TOKEN}/sendMessage'
    # 设置请求参数
    params = {
        'chat_id': CHAT_ID,
        'text': message
    }
    # 发送请求
    response = requests.get(send_message_url, params=params)
    # 检查请求是否成功
    if response.status_code == 200:
        print("消息发送成功")
    else:
        print(f"消息发送失败，状态码: {response.status_code}")
        print(f"响应内容: {response.text}")

def check_prices_and_send_alerts():
    # 获取 ILV 和 HIGH 的实时价格
    symbols = ["ILV", "HIGH"]

    # 购买提醒条件
    buy_conditions = {
        "ILV": 300,
        "HIGH": 10
    }

    while True:
        with ThreadPoolExecutor(max_workers=5) as executor:
            results = list(executor.map(get_binance_price, symbols))

        # 检查是否满足购买条件
        for symbol, usdt_price, cny_price in results:
            if cny_price > buy_conditions[symbol]:
                message = f"立即购买提醒: {symbol}/USDT 人民币价格: {cny_price:.2f} CNY 已超过 {buy_conditions[symbol]} CNY"
                send_telegram_message(message)

def send_prices_every_minute():
    # 获取 ILV 和 HIGH 的实时价格
    symbols = ["ILV", "HIGH"]

    while True:
        with ThreadPoolExecutor(max_workers=5) as executor:
            results = list(executor.map(get_binance_price, symbols))

        # 将所有结果合并成一条消息
        combined_message = "\n".join([f"{symbol}/USDT 实时价格: {usdt_price:.2f} USD, 人民币价格: {cny_price:.2f} CNY" for symbol, usdt_price, cny_price in results])

        # 发送合并后的消息到 Telegram
        send_telegram_message(combined_message)

        # 等待一段时间再进行下一次循环
        time.sleep(20)  # 每分钟执行一次

# 启动两个线程
alert_thread = threading.Thread(target=check_prices_and_send_alerts)
minute_thread = threading.Thread(target=send_prices_every_minute)

alert_thread.start()
minute_thread.start()

alert_thread.join()
minute_thread.join()
```

:::
