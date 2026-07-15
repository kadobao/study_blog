---
title: 使用Modbus协议需要了解的知识
icon: code
order: 43
category:
  - C#学习
tag:
  - Modbus协议
  - C#
---

## 概述

在上位机开发中，保持寄存器（4xxxx）绝对是最常用、最核心的区域，没有之一。在实际工业项目中，90%以上的上位机读写操作都是针对保持寄存器进行的。

## 常用功能码

| 功能码 | 名称           | 用途说明                           |
| ------ | -------------- | ---------------------------------- |
| 03     | 读保持寄存器   | 从PLC读取数值/参数/状态（最频繁）  |
| 06     | 写单个寄存器   | 修改一个参数（如修改一个字）       |
| 16     | 写多个寄存器   | 同时修改多个连续参数（如修改浮点数）|

## 基本概念

### 站号设置

Modbus TCP：站号通常用 **1**

### 主从关系

在Modbus协议里，上位机（C#程序）就是主站，PLC就是从站。这个关系可以形象地理解为"客户端-服务器"模式。

### 寄存器与字节

- **1个寄存器 = 2个字节（16位）**
- **float是32位，所以要读取连续两个寄存器**

### 高低位问题

有16位及以上的就会出现高低位，但是一般都是32位出现高低位，常见于浮点数。

## 方法库

推荐使用：**NModbus**

## 读写操作示例

### 读取保持寄存器（功能码03）

```csharp
// 基本语法
var registers = master.ReadHoldingRegisters(unitId, 16498, 2);
//                          ↑         ↑       ↑
//                       从站地址  起始寄存器地址  读取数量
```

```csharp
// 示例：读取地址416499的float值
// ReadHoldingRegisters(从站地址, 起始寄存器地址, 读取寄存器数量)
// 起始地址 = 16498，对应 PLC地址 416499（16498 + 400001 = 416499）
// 读取数量 = 2，连续读取 2个寄存器：16498、16499
// 实际读取 PLC地址：416499、416500
var registers = master.ReadHoldingRegisters(unitId, 16498, 2);
byte[] bytes = BitConverter.GetBytes(registers[0]).Concat(BitConverter.GetBytes(registers[1])).ToArray();
float floatValue = BitConverter.ToSingle(bytes, 0);
Console.WriteLine($"地址416499的值: {floatValue}");
```

### 写入保持寄存器

#### 一、写入寄存器的三种方式

| 方法                     | 功能码 | 写入数量      | 适用场景                       |
| ------------------------ | ------ | ------------- | ------------------------------ |
| `WriteSingleRegister`    | 06     | **1个**寄存器 | 修改单个参数（如温度设定值）   |
| `WriteMultipleRegisters` | 16     | **多个**寄存器（连续） | 批量下发参数（如下发整段配方） |
| `WriteSingleCoil`        | 05     | **1个**线圈（位） | 启停控制（不推荐，建议用寄存器写位）|


#### 二、最常用的两种写法（C# + NModbus）

##### 1. 写单个寄存器（功能码06）—— 最常用

```csharp
// 示例：把地址416902（清零不良测试）写入值 123
await master.WriteSingleRegisterAsync(unitId, 16901, 123);
//                               ↑        ↑        ↑
//                             从站地址  起始地址   要写的值
```

**对应您的地址表**：
- PLC地址 416902 → 报文地址 `416902 - 40001 = 16901`
- 写入 `123` 到该寄存器

##### 2. 写多个寄存器（功能码16）—— 批量下发

```csharp
// 示例：从地址417285开始，连续写入10个字符（设备编号）
ushort[] values = new ushort[]
{
    'P', 'L', 'C', '-', '0', '0', '1', '\0', '\0', '\0'
    // 等价于 0x0050, 0x004C, 0x0043, ...
};
await master.WriteMultipleRegistersAsync(unitId, 17284, values);
//                                    ↑        ↑        ↑
//                                  从站地址  起始地址   写入的值数组
```

**对应您的地址表**：
- PLC地址 417285 → 报文地址 `417285 - 40001 = 17284`
- 从 17284 开始，连续写入 10个寄存器

##### 3. 按位写入（掩码写入）—— 修改单个bit

在 Modbus 中，一个保持寄存器是 **16位**。有时你只需要修改其中某一位（bit），而不影响其他位。这就是"按位写入"。

> 比如地址 `416902.12` 表示寄存器 416902 的第 12 位（从0开始算）。

###### 原理

核心思路三步走：**先读 → 位运算 → 再写回**

1. **先读取**当前寄存器的值
2. 用**位运算**修改目标位
3. **再写入**修改后的值

###### 位运算公式

| 操作目标 | 公式 | 说明 |
|:--------:|:-----|:-----|
| 第N位设为 **1** | `新值 = 原值 OR (1 << N)` | 或运算置位 |
| 第N位设为 **0** | `新值 = 原值 AND ~(1 << N)` | 与运算清位 |

> `1 << N` 就是把 1 左移 N 位，等价于 `2ⁿ`。例如 `1 << 12 = 4096`。

###### C# 示例代码

```csharp
/// <summary>
/// 按位写入 - 将寄存器的指定位设置为1或0
/// </summary>
/// <param name="address">寄存器地址（报文地址）</param>
/// <param name="bitIndex">位索引（0-15）</param>
/// <param name="value">true=设为1，false=设为0</param>
public async Task WriteBitAsync(ushort address, int bitIndex, bool value)
{
    // 第一步：先读取当前寄存器的值
    var registers = await master.ReadHoldingRegistersAsync(unitId, address, 1);
    ushort currentValue = registers[0];

    // 第二步：位运算修改目标位
    ushort newValue;
    if (value)
    {
        // 设为1：原值 OR 掩码
        newValue = (ushort)(currentValue | (1 << bitIndex));
    }
    else
    {
        // 设为0：原值 AND 取反掩码
        newValue = (ushort)(currentValue & ~(1 << bitIndex));
    }

    // 第三步：写回寄存器
    await master.WriteSingleRegisterAsync(unitId, address, newValue);
}
```

###### 使用示例

```csharp
// 将地址 16901（PLC地址 416902）的第12位设为1
await WriteBitAsync(16901, 12, true);

// 将地址 16901 的第12位设为0
await WriteBitAsync(16901, 12, false);
```

###### 计算过程说明

以地址 16901（PLC地址 416902），原值 0，操作第 12 位为例：

**设为1：**

- 掩码 = `1 << 12 = 4096`（二进制 `0001 0000 0000 0000`）
- 新值 = `0 | 4096 = 4096`
- 向地址 16901 写入 **4096**

**设为0：**

> 前提：此时寄存器值已变为 4096

- 取反掩码 = `~4096 = 61439`（二进制 `1110 1111 1111 1111`）
- 新值 = `4096 & 61439 = 0`
- 向地址 16901 写入 **0**

> **补充说明**：如果原值不是 0，比如原值是 5（二进制 `0000 0000 0000 0101`）：
> - 设为1：`5 | 4096 = 4101`
> - 设为0：`4101 & 61439 = 5`
>
> 只会改变第 12 位，不影响其他位。

## 高低位处理

### 什么是高低位问题

float 是 **32位 = 4字节**，而一个 Modbus 寄存器只有 **16位 = 2字节**，所以一个 float 值需要**占用 2 个连续寄存器**。

问题在于：4 个字节放进 2 个寄存器，排列顺序有多种可能，不同设备的排列方式可能不同。如果顺序搞错了，读出来的值就是乱码。

### 四种常见字节序

假设 float 的 4 个字节为 `A B C D`（A 是最高位字节 MSB，D 是最低位字节 LSB）：

| 名称 | 别名 | 寄存器[0] | 寄存器[1] | 特点 |
|:-----:|:----:|:---------:|:---------:|:-----|
| **ABCD** | 大端序 | A B | C D | 高字在前，字内大端 |
| **BADC** | 字内小端 | B A | D C | 高字在前，字内小端 |
| **CDAB** | 字交换 | C D | A B | 低字在前，字内大端 |
| **DCBA** | 小端序 | D C | B A | 低字在前，字内小端 |

> **关键**：实际使用哪种顺序，取决于 PLC 的配置。需要查阅设备手册或通过测试确认。

### 字节排列图解

以 float `1.0f` 为例：

- IEEE 754 二进制：`0x3F800000`
- 4 个字节标记为：`A=0x3F, B=0x80, C=0x00, D=0x00`

**ABCD 排列方式（本示例代码使用的方式）：**

```
寄存器[0]：A B → 0x3F 0x80 → 0x3F80
寄存器[1]：C D → 0x00 0x00 → 0x0000
```

### 写入处理函数

```csharp
/// <summary>
/// 写入 float 到两个连续寄存器（ABCD 大端序）
/// </summary>
public async Task WriteRegisterAsync(int address, float value)
{
    // 第一步：把 float 拆成 4 个字节
    // Windows 系统是小端序，所以 BitConverter 返回的顺序是 D C B A
    // bytes[0]=D(0x00), bytes[1]=C(0x00), bytes[2]=B(0x80), bytes[3]=A(0x3F)
    var bytes = BitConverter.GetBytes(value);

    // 第二步：拼成 2 个寄存器（ABCD 大端序）
    var registers = new[] {
        (ushort)((bytes[3] << 8) | bytes[2]),  // 寄存器[0] = A B = 高字
        (ushort)((bytes[1] << 8) | bytes[0])   // 寄存器[1] = C D = 低字
    };

    // 以 float 1.0f 为例：
    // 寄存器[0] = (0x3F << 8) | 0x80 = 0x3F80
    // 寄存器[1] = (0x00 << 8) | 0x00 = 0x0000

    try
    {
        await Task.Run(() => _modbusTcpMaster.WriteMultipleRegisters(1, (ushort)address, registers));
    }
    catch (Exception ex)
    {
        MessageBox.Show("写入失败: " + ex.Message);
    }

    OnStatusChanged?.Invoke($"写入成功, 写入值: {value}");
}
```

### 读取处理函数

```csharp
/// <summary>
/// 从两个连续寄存器读取 float（ABCD 大端序）
/// </summary>
public async Task<float> ReadRegisterAsync(int address)
{
    // 第一步：读取 2 个寄存器
    var registers = await _modbusTcpMaster.ReadHoldingRegistersAsync(1, (ushort)address, 2);

    // 第二步：从寄存器还原出 4 个字节（ABCD 大端序的逆操作）
    // 寄存器[0] = A B → bytes[3]=A, bytes[2]=B
    // 寄存器[1] = C D → bytes[1]=C, bytes[0]=D
    byte[] bytes = new byte[4];
    bytes[3] = (byte)(registers[0] >> 8);   // A = 高字的高字节
    bytes[2] = (byte)(registers[0] & 0xFF); // B = 高字的低字节
    bytes[1] = (byte)(registers[1] >> 8);   // C = 低字的高字节
    bytes[0] = (byte)(registers[1] & 0xFF); // D = 低字的低字节

    // 第三步：还原成 float
    float value = BitConverter.ToSingle(bytes, 0);

    OnStatusChanged?.Invoke($"读取成功, 读取值: {value}");
    return value;
}
```

### 计算过程示例

以向地址 16901 写入 `float 3.14f` 为例：

**第一步：拆字节**

```
3.14f 的 IEEE 754 = 0x4048F5C3
A=0x40, B=0x48, C=0xF5, D=0xC3
BitConverter.GetBytes 返回（小端序）：[0xC3, 0xF5, 0x48, 0x40]
                                       D       C       B       A
bytes[0]=0xC3, bytes[1]=0xF5, bytes[2]=0x48, bytes[3]=0x40
```

**第二步：拼寄存器（ABCD）**

```
寄存器[0] = (bytes[3] << 8) | bytes[2] = (0x40 << 8) | 0x48 = 0x4048（高字）
寄存器[1] = (bytes[1] << 8) | bytes[0] = (0xF5 << 8) | 0xC3 = 0xF5C3（低字）
```

**第三步：写入**

```
WriteMultipleRegisters(1, 16901, [0x4048, 0xF5C3])
```

> **如果读出来是乱码**：说明设备用的不是 ABCD 顺序，需要尝试交换寄存器顺序或交换字节顺序，改成 CDAB、BADC 或 DCBA。