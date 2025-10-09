---
title: C#关于文件的方法
icon: code
order: 6
category:
  - C#学习
tag:
  - C#基础
---

# C#关于文件的方法

导入的模块是：`using System.IO;`

## 目录操作

### 获取上级目录路径
```csharp
string parentDirectory = Directory.GetParent(folderPath)?.FullName;
```

### 获取上级目录名称
```csharp
string parentDirectory = Directory.GetParent(folderPath)?.Name;
```

### 获取当前应用程序的目录
```csharp
// 获取当前应用程序的路径
string currentPath = System.Reflection.Assembly.GetExecutingAssembly().Location;
// 获取当前应用程序的目录
string currentDirectory = Path.GetDirectoryName(currentPath);

// 或者更直接一点
string currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
```

### 检测文件夹是否存在
```csharp
Directory.Exists(folderPath)
```

### 获取文件夹内所有文件(仅获取一级子文件)
```csharp
string[] files = Directory.GetFiles(folderPath);
```

### 获取文件夹内所有文件(递归搜索整个目录树，包含所有文件的 ​​完整路径（绝对路径）​​。)
```csharp
string[] files = Directory.GetFiles(folderPath, "*.*", SearchOption.AllDirectories);
```

### 创建文件夹
```csharp
// 创建一个文件夹
string newFolderPath = Path.Combine(currentDirectory, "新文件夹");
Directory.CreateDirectory(newFolderPath);
```

### 删除文件夹
```csharp
Directory.Delete(folderPath);
```

## 文件操作

### 检测文件是否存在
```csharp
File.Exists(destinationPath)
```

### 删除文件
```csharp
File.Delete(destinationPath);
```

### 获取文件名
```csharp
string fileName = Path.GetFileName(file);
```

### 移动文件
```csharp
File.Move(file, destinationPath);
```

### 复制文件
```csharp
File.Copy(newFile, destPath, true);  // true 表示如果目标文件已存在，则覆盖它
```


## 路径操作

### 拼接路径
```csharp
string destinationPath = Path.Combine(parentDirectory, fileName);
```

### 获取当前路径所在目录
```csharp
string currentDirectory = Path.GetDirectoryName(currentPath);
```

## 字符串操作

### 检测字符串是否为空
```csharp
string.IsNullOrEmpty(parentDirectory)
```