---
title: 读取OPCUA服务器节点的值
icon: code
order: 22
category:
  - C#学习
tag:
  - OPCUA协议
  - OpcUaHelper
---


好的，除了 `ReadNodeAsync` 和 `ReadNode` 方法，OpcUaHelper 库（通常指由 hylasoft 开发的那个流行开源库）提供了非常丰富的客户端操作方法，涵盖了 OPC UA 通信的各个方面。

这个库的核心是 `UaApplication` 类，它封装了底层 OPC UA 复杂会话管理，而最常用的方法是其 `Run` 方法，它接受一个委托，在这个委托中你可以使用一个 `OpcUaClient` 对象来执行各种操作。

以下是 `OpcUaClient` 类中一些非常重要和常用的方法，按功能分类：

### 1. 读取数据

*   **`ReadNodeAsync` / `ReadNode`**: 你已经知道了，读取单个节点的值、时间戳、状态码等。
*   **`ReadNodesAsync` / `ReadNodes`**: 批量读取多个节点。传入一个节点ID列表（`List<string>`），返回一个包含所有节点数据的列表（`List<DataValue>`）。这比循环调用 `ReadNodeAsync` 效率高得多。
*   **`ReadAttributesAsync`**: 读取一个节点的特定属性（例如，除了值之外，还可以读取描述、工程单位等）。

### 2. 写入数据

*   **`WriteNodeAsync` / `WriteNode`**: 向单个节点写入值。
*   **`WriteNodesAsync` / `WriteNodes`**: 批量向多个节点写入值。传入节点ID列表和值列表。

---

### 简单代码示例

```csharp
using OpcUaHelper;
using System;
using System.Linq;
using System.Threading.Tasks;

public class Program
{
    private static OpcUaClient opcUaClient;

    public static async Task Main(string[] args)
    {
        Console.WriteLine("OPC UA客户端测试程序");
        Console.WriteLine("====================");

        await ConnectToServer();

        // 按任意键断开连接
        Console.WriteLine("\n按任意键断开连接...");
        Console.ReadKey();

        Disconnect();
    }

    public static async Task ConnectToServer()
    {
        opcUaClient = new OpcUaClient();

        // 服务器地址示例（这是一个公共测试服务器）   opc.tcp://milo.digitalpetri.com:62541/milo
        string serverUrl = "opc.tcp://milo.digitalpetri.com:62541/milo";

        try
        {
            Console.WriteLine($"正在连接到: {serverUrl}");

            // 连接服务器
            await opcUaClient.ConnectServer(serverUrl);

            // 检查连接状态
            if (opcUaClient.Connected)
            {
                Console.WriteLine("OPC UA服务器连接成功！");

                // 读取服务器时间
                Console.WriteLine("\n读取服务器时间...");
                DateTime serverTime = await opcUaClient.ReadNodeAsync<DateTime>("i=2258");
                Console.WriteLine($"服务器时间: {serverTime}");

                // 读取服务器状态
                Console.WriteLine("\n读取服务器状态...");
                int serverState = await opcUaClient.ReadNodeAsync<int>("i=2259");
                Console.WriteLine($"服务器状态: {serverState}");


                // 节点ID的查找直接点击`KEPServerEX`的`Quick client`，那的`ItemID`
                // 然后在`ItemID`前添加`ns=2;s=`，就是节点ID了

                // 定义要读取的节点ID：产量，数据类型是Float
                string yieldId = "ns=2;s=测试.测试1.产量";

                // 读取该节点的值
                var yieldDataValue = opcUaClient.ReadNode(yieldId);
                Console.WriteLine($"当前产量：{yieldDataValue}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"连接错误: {ex.Message}");
        }
    }

    public static void Disconnect()
    {
        opcUaClient?.Disconnect();
        Console.WriteLine("已断开连接");
    }
}
```

**总结一下**，OpcUaHelper 库的方法主要围绕 **连接管理、读写数据、浏览地址空间、订阅通知、调用方法、访问历史数据** 这几个核心功能。