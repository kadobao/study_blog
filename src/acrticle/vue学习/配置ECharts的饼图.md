---
title: 配置ECharts的饼图
icon: fa-brands fa-vuejs
order: 37
category:
  - vue3学习
tag:
  - vue3学习
  - ECharts
  - 饼图
---

> **💡 提示**：样式配置（颜色、字体、边框等）可以直接复用，最重要的是根据实际需求配置数据。

## 饼图构成

饼图由以下几个部分组成：

- **标题**：显示图表的名称
- **提示框**：鼠标悬停时显示数据详情
- **图例**：显示各数据项的标识和名称
- **饼图主体**：包含以下特性
  - 每个扇形的占比
  - 鼠标悬浮扇形高亮效果
  - 扇形内部显示百分比
  - 扇形的基本样式（颜色、边框、阴影等）

## 常用占位符说明

| 占位符 | 含义 |
| :--- | :--- |
| `{a}` | 系列名称 |
| `{b}` | 数据名称 |
| `{c}` | 数据值 |
| `{d}` | 百分比 |

![饼图展示](/assets/images/饼图展示.png)

## 配置详解

### 1. 标题配置

```javascript
title: {
    text: t('rightBottom.title'),  // 使用国际化翻译的标题
    textStyle: {
        color: '#00ffff',          // 标题颜色
        fontSize: '30px',         // 标题字体大小
        fontWeight: 'bold'        // 标题字体加粗
    },
    left: 'center',               // 标题水平居中
    top: '5%'                     // 标题距离顶部5%
}
```

### 2. 提示框配置

```javascript
tooltip: {
    trigger: 'item',                 // 触发类型：鼠标悬停在某个扇形区域时，显示该扇形的数据
    backgroundColor: 'rgba(14, 18, 29, 0.8)',  // 提示框背景颜色，使用半透明深色背景
    borderColor: '#9D00FF',         // 提示框边框颜色，使用紫色边框
    borderWidth: 1,                  // 提示框边框宽度为1像素
    textStyle: {
        color: '#FFFFFF'             // 提示框文字颜色为白色
    }
}
```

### 3. 图例配置

```javascript
legend: {
    orient: 'vertical',            // 图例垂直排列
    right: '30px',                 // 图例距离右侧30px
    top: '80px',                   // 图例距离顶部80px
    data: [                        // 图例数据
        t('rightBottom.legend.online'),   // 在线状态的翻译文本
        t('rightBottom.legend.offline')   // 离线状态的翻译文本
    ],
    textStyle: {
        color: '#fff'              // 图例文字颜色
    }
}
```

### 4. 数据配置

```javascript
data: [                        // 饼图数据
    { 
        value: onlineCount,        // 数据值：在线设备数量
        name: t('rightBottom.legend.online'),  // 数据名称：使用国际化翻译的"在线"文本
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [  // 线性渐变色填充
                { offset: 0, color: '#00d4ff' },      // 渐变起点颜色：青蓝色
                { offset: 0.5, color: '#00ffff' },    // 渐变中点颜色：青色
                { offset: 1, color: '#00ffaa' }       // 渐变终点颜色：青绿色
            ]),
            shadowBlur: 20,           // 阴影模糊程度：20像素，产生发光效果
            shadowColor: 'rgba(0, 255, 255, 0.6)'  // 阴影颜色：半透明青色
        }
    },  // 在线数据
    { 
        value: offlineCount,       // 数据值：离线设备数量
        name: t('rightBottom.legend.offline'),  // 数据名称：使用国际化翻译的"离线"文本
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [  // 线性渐变色填充
                { offset: 0, color: '#9D00FF' },      // 渐变起点颜色：深紫色
                { offset: 0.5, color: '#b829ff' },    // 渐变中点颜色：紫罗兰色
                { offset: 1, color: '#d455ff' }       // 渐变终点颜色：浅紫色
            ]),
            shadowBlur: 20,           // 阴影模糊程度：20像素，产生发光效果
            shadowColor: 'rgba(157, 0, 255, 0.6)'  // 阴影颜色：半透明紫色
        }
    }  // 离线数据
]
```

### 5. 高亮效果配置

```javascript
emphasis: {                    // 高亮样式
    itemStyle: {
        shadowBlur: 30,        // 阴影模糊大小
        shadowOffsetX: 0,      // 阴影水平偏移
        shadowColor: 'rgba(255, 255, 255, 0.8)'  // 阴影颜色
    },
    scale: true,               // 是否开启放大效果
    scaleSize: 10             // 放大尺寸
}
```

### 6. 标签配置

```javascript
label: {                       // 标签配置
    show: true,                // 显示标签
    formatter: '{d}%',         // 标签显示百分比
    position: 'inside',        // 标签显示在饼图内部
    fontSize: 16,              // 标签字体大小
    fontWeight: 'bold',        // 标签字体加粗
    color: '#fff',            // 标签文字颜色
    textShadowBlur: 2,         // 文字阴影模糊程度
    textShadowColor: 'rgba(0, 0, 0, 0.8)'  // 文字阴影颜色
}
```

### 7. 扇区样式配置

```javascript
itemStyle: {
    borderRadius: 5,    // 扇区边角的圆角半径
    borderColor: '#0e121d',   // 扇区边框颜色（深色背景色）
    borderWidth: 2    //  边框宽度为2像素
}
```

## 完整配置代码

```javascript
const option = {
    // 标题配置
    title: {
        text: t('rightBottom.title'),  // 使用国际化翻译的标题
        textStyle: {
            color: '#00ffff',          // 标题颜色
            fontSize: '30px',         // 标题字体大小
            fontWeight: 'bold'        // 标题字体加粗
        },
        left: 'center',               // 标题水平居中
        top: '5%'                     // 标题距离顶部5%
    },
    // 提示框配置
    tooltip: {
        trigger: 'item',                 // 触发类型：鼠标悬停在某个扇形区域时，显示该扇形的数据
        backgroundColor: 'rgba(14, 18, 29, 0.8)',  // 提示框背景颜色，使用半透明深色背景
        borderColor: '#9D00FF',         // 提示框边框颜色，使用紫色边框
        borderWidth: 1,                  // 提示框边框宽度为1像素
        textStyle: {
            color: '#FFFFFF'             // 提示框文字颜色为白色
        }
    },
    // 图例配置
    legend: {
        orient: 'vertical',            // 图例垂直排列
        right: '30px',                 // 图例距离右侧30px
        top: '80px',                   // 图例距离顶部80px
        data: [                        // 图例数据
            t('rightBottom.legend.online'),   // 在线状态的翻译文本
            t('rightBottom.legend.offline')   // 离线状态的翻译文本
        ],
        textStyle: {
            color: '#fff'              // 图例文字颜色
        }
    },
    // 圆环主体配置
    series: [
        {
            name: t('rightBottom.title'),  // 系列名称，之后图例会显示这个名称
            type: 'pie',                   // 图表类型为饼图
            radius: ['40%', '70%'],        // 饼图内外半径
            center: ['50%', '58%'],        // 饼图中心位置
            // 这个决定扇形的百分比（扇形的数据来源）
            data: [                        // 饼图数据
                { 
                    value: onlineCount,        // 数据值：在线设备数量
                    name: t('rightBottom.legend.online'),  // 数据名称：使用国际化翻译的"在线"文本
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [  // 线性渐变色填充
                            { offset: 0, color: '#00d4ff' },      // 渐变起点颜色：青蓝色
                            { offset: 0.5, color: '#00ffff' },    // 渐变中点颜色：青色
                            { offset: 1, color: '#00ffaa' }       // 渐变终点颜色：青绿色
                        ]),
                        shadowBlur: 20,           // 阴影模糊程度：20像素，产生发光效果
                        shadowColor: 'rgba(0, 255, 255, 0.6)'  // 阴影颜色：半透明青色
                    }
                },  // 在线数据
                { 
                    value: offlineCount,       // 数据值：离线设备数量
                    name: t('rightBottom.legend.offline'),  // 数据名称：使用国际化翻译的"离线"文本
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [  // 线性渐变色填充
                            { offset: 0, color: '#9D00FF' },      // 渐变起点颜色：深紫色
                            { offset: 0.5, color: '#b829ff' },    // 渐变中点颜色：紫罗兰色
                            { offset: 1, color: '#d455ff' }       // 渐变终点颜色：浅紫色
                        ]),
                        shadowBlur: 20,           // 阴影模糊程度：20像素，产生发光效果
                        shadowColor: 'rgba(157, 0, 255, 0.6)'  // 阴影颜色：半透明紫色
                    }
                }  // 离线数据
            ],   
            // 控制鼠标悬停或选中饼图扇区时的高亮效果
            emphasis: {                    // 高亮样式
                itemStyle: {
                    shadowBlur: 30,        // 阴影模糊大小
                    shadowOffsetX: 0,      // 阴影水平偏移
                    shadowColor: 'rgba(255, 255, 255, 0.8)'  // 阴影颜色
                },
                scale: true,
                scaleSize: 10
            },
            // 控制饼图扇区内部显示的文字标签
            label: {                       // 标签配置
                show: true,                // 显示标签
                formatter: '{d}%',         // 标签显示百分比
                position: 'inside',        // 标签显示在饼图内部
                fontSize: 16,              // 标签字体大小
                fontWeight: 'bold',        // 标签字体加粗
                color: '#fff',            // 标签文字颜色
                textShadowBlur: 2,
                textShadowColor: 'rgba(0, 0, 0, 0.8)'
            },
            // 控制饼图扇区的基本样式
            itemStyle: {
                borderRadius: 5,    // 扇区边角的圆角半径
                borderColor: '#0e121d',   // 扇区边框颜色（深色背景色）
                borderWidth: 2    //  边框宽度为2像素
            }
        }
    ]
}
```