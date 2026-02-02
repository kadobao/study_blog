---
title: 配置ECharts的折线图
icon: fa-brands fa-vuejs
order: 38
category:
  - vue3学习
tag:
  - vue3学习
  - ECharts
  - 折线图
---

> **💡 提示**：样式配置（颜色、字体、边框等）可以直接复用，最重要的是根据实际需求配置数据。

## 折线图构成

折线图由以下几个部分组成：

- **标题**：显示图表的名称
- **提示框**：鼠标悬停时显示数据详情
- **X轴**：显示时间或类目数据
- **Y轴**：显示数值数据
- **网格区域**：配置折线图的显示区域
- **折线图主体**：包含以下特性
  - 折线数据
  - 数据点样式
  - 数据点旁边的标签样式
  - 折线样式
  - 区域填充
  - 高亮样式

## 常用占位符说明

| 占位符 | 含义 |
| :--- | :--- |
| `{a}` | 系列名称 |
| `{b}` | 数据名称 |
| `{c}` | 数据值 |
| `{d}` | 百分比 |

![折线图展示](/assets/images/折线图展示.png)

## 配置详解

### 1. 标题配置

```javascript
title: {
    text: t('rightTop.title'),  // 标题文本，使用国际化
    textStyle: {
        color: '#00ffff',        // 标题颜色
        fontSize: '30px',        // 标题字体大小
        fontWeight: 'bold'       // 标题字体粗细
    },
    left: 'center',              // 标题水平居中
    top: '6%'                    // 标题距离顶部6%
}
```

### 2. 提示框配置

```javascript
tooltip: {
    trigger: 'axis',             // 触发类型，坐标轴触发
    // 鼠标悬停时，整个坐标区间会被高亮成一个阴影区域
    axisPointer: {
        type: 'shadow',          // 指示器类型，阴影指示器
        color: '#00FFFF'         // 指示器颜色
    },
    backgroundColor: 'rgba(14, 18, 29, 0.8)',  // 提示框背景色
    borderColor: '#00FFFF',      // 提示框边框颜色
    borderWidth: 1,             // 提示框边框宽度
    textStyle: {
        color: '#FFFFFF'         // 提示框文字颜色
    }
}
```

### 3. X轴配置

```javascript
xAxis: {
    type: 'category',            // 类目轴
    data: ['0点', '3点', '6点', '9点', '12点', '15点', '18点', '21点'],  // x轴数据
    // 坐标轴线颜色
    axisLine: {
        lineStyle: {
            color: '#00FFFF33'   
        }
    },
    // 刻度线颜色
    axisTick: {
        lineStyle: {
            color: '#00FFFF33'   
        }
    },
    // 刻度标签颜色
    axisLabel: {
        color: '#00FFFF'         
    }
}
```

### 4. Y轴配置

```javascript
yAxis: {
    type: 'value',               // 数值轴
    max: 100,                    // y轴最大值
    // 坐标轴线颜色
    axisLine: {
        lineStyle: {
            color: '#00FFFF33'   
        }
    },
    // 刻度线颜色
    axisTick: {
        lineStyle: {
            color: '#00FFFF33'   
        }
    },
    // 刻度标签颜色
    axisLabel: {
        color: '#00FFFF'         
    },
    // 分隔线颜色
    splitLine: {
        lineStyle: {
            color: '#00FFFF1A'   
        }
    }
}
```

### 5. 网格区域配置

```javascript
grid: {
    left: '3%',                   // 图表左边距
    right: '3%',                  // 图表右边距
    bottom: '9%',                 // 图表下边距
    top: '27%',                   // 图表上边距
    containLabel: true            // 包含坐标轴标签
}
```

### 6. 数据配置

```javascript
data: [78.2, 72.1, 68.5, 82.3, 90.7, 95.6, 98.7, 96.2]  // 系列数据
```

### 7. 数据点样式配置

```javascript
itemStyle: {
    color: '#00ffff',      // 标记颜色
    borderColor: '#0f1e36',  // 标记边框颜色
    borderWidth: 2         // 标记边框宽度
}
```

### 8. 折线样式配置

```javascript
lineStyle: {
    color: '#00ffff',      // 线条颜色
    width: 3               // 线条宽度
}
```

### 9. 区域填充配置

```javascript
areaStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [  // 区域填充渐变色
        {
            offset: 0,
            color: 'rgba(0, 255, 255, 0.3)'  // 渐变起始色
        },
        {
            offset: 1,
            color: 'rgba(0, 255, 255, 0)'    // 渐变结束色
        }
    ])
}
```

### 10. 高亮样式配置

```javascript
emphasis: {
    focus: 'series',       // 高亮时聚焦当前系列
    itemStyle: {
        color: '#ffeb3b',  // 高亮时标记颜色
        borderColor: '#0f1e36',  // 高亮时标记边框颜色
        borderWidth: 2     // 高亮时标记边框宽度
    },
    lineStyle: {
        width: 4           // 高亮时线条宽度
    }
}
```

### 11. 标签配置

```javascript
label: {
    show: true,            // 是否显示标签
    position: 'top',       // 标签位置
    formatter: '{c}%',     // 标签格式化
    color: '#fff',         // 标签颜色
    fontSize: 12           // 标签字体大小
}
```

## 完整配置代码

```javascript
const option = {
    // 标题配置
    title: {
        text: t('rightTop.title'),  // 标题文本，使用国际化
        textStyle: {
            color: '#00ffff',        // 标题颜色
            fontSize: '30px',        // 标题字体大小
            fontWeight: 'bold'       // 标题字体粗细
        },
        left: 'center',              // 标题水平居中
        top: '6%'                    // 标题距离顶部6%
    },
    // 提示框配置
    tooltip: {
        trigger: 'axis',             // 触发类型，坐标轴触发
        // 鼠标悬停时，整个坐标区间会被高亮成一个阴影区域
        axisPointer: {
            type: 'shadow',          // 指示器类型，阴影指示器
            color: '#00FFFF'         // 指示器颜色
        },
        backgroundColor: 'rgba(14, 18, 29, 0.8)',  // 提示框背景色
        borderColor: '#00FFFF',      // 提示框边框颜色
        borderWidth: 1,             // 提示框边框宽度
        textStyle: {
            color: '#FFFFFF'         // 提示框文字颜色
        }
    },
    // X轴配置
    xAxis: {
        type: 'category',            // 类目轴
        data: ['0点', '3点', '6点', '9点', '12点', '15点', '18点', '21点'],  // x轴数据
        // 坐标轴线颜色
        axisLine: {
            lineStyle: {
                color: '#00FFFF33'   
            }
        },
        // 刻度线颜色
        axisTick: {
            lineStyle: {
                color: '#00FFFF33'   
            }
        },
        // 刻度标签颜色
        axisLabel: {
            color: '#00FFFF'         
        }
    },
    // Y轴配置
    yAxis: {
        type: 'value',               // 数值轴
        max: 100,                    // y轴最大值
        // 坐标轴线颜色
        axisLine: {
            lineStyle: {
                color: '#00FFFF33'   
            }
        },
        // 刻度线颜色
        axisTick: {
            lineStyle: {
                color: '#00FFFF33'   
            }
        },
        // 刻度标签颜色
        axisLabel: {
            color: '#00FFFF'         
        },
        // 分隔线颜色
        splitLine: {
            lineStyle: {
                color: '#00FFFF1A'   
            }
        }
    },
    // 网格区域配置
    grid: {
        left: '3%',                   // 图表左边距
        right: '3%',                  // 图表右边距
        bottom: '9%',                 // 图表下边距
        top: '27%',                   // 图表上边距
        containLabel: true            // 包含坐标轴标签
    },
    // 数据系列配置
    series: [
        {
            name: t('rightTop.title'),  // 系列名称
            type: 'line',               // 图表类型：折线图
            data: [78.2, 72.1, 68.5, 82.3, 90.7, 95.6, 98.7, 96.2],  // 系列数据
            smooth: true,               // 是否平滑曲线
            symbol: 'circle',          // 标记数据点形状
            symbolSize: 8,             // 标记数据点大小
            // 数据点样式配置
            itemStyle: {
                color: '#00ffff',      // 标记颜色
                borderColor: '#0f1e36',  // 标记边框颜色
                borderWidth: 2         // 标记边框宽度
            },
            // 折线样式配置
            lineStyle: {
                color: '#00ffff',      // 线条颜色
                width: 3               // 线条宽度
            },
            // 区域填充配置
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [  // 区域填充渐变色
                    {
                        offset: 0,
                        color: 'rgba(0, 255, 255, 0.3)'  // 渐变起始色
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 255, 255, 0)'    // 渐变结束色
                    }
                ])
            },
            // 高亮样式配置
            emphasis: {
                focus: 'series',       // 高亮时聚焦当前系列
                itemStyle: {
                    color: '#ffeb3b',  // 高亮时标记颜色
                    borderColor: '#0f1e36',  // 高亮时标记边框颜色
                    borderWidth: 2     // 高亮时标记边框宽度
                },
                lineStyle: {
                    width: 4           // 高亮时线条宽度
                }
            },
            // 标签配置
            label: {
                show: true,            // 是否显示标签
                position: 'top',       // 标签位置
                formatter: '{c}%',     // 标签格式化
                color: '#fff',         // 标签颜色
                fontSize: 12           // 标签字体大小
            }
        }
    ]
}
```