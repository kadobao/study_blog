---
title: 在ViewModel里面绑定UI属性
icon: code
order: 12
category:
  - C#学习
tag:
  - WPF
  - ViewModel
---

# 在ViewModel里面绑定UI属性

## 定义属性

先定义一个私有变量，再定义公共属性：

```csharp
private double _sidebarWidth = 200;

public double SidebarWidth
{
    get => _sidebarWidth;
    set => SetProperty(ref _sidebarWidth, value);
}
```

## 在View中绑定

之后在 `View.xaml` 文件里面使用 `Binding` 进行绑定：

```xml
<ColumnDefinition x:Name="SidebarColumn" Width="{Binding SidebarWidth, UpdateSourceTrigger=PropertyChanged, FallbackValue=200, Mode=TwoWay}"/>
```

### Binding 参数说明

- `Binding`: 代表双向绑定
- `UpdateSourceTrigger=PropertyChanged`: 代表绑定的目标属性变化时，立即更新源属性
- `FallbackValue`: 是代表默认值
- `Mode=TwoWay`: 代表双向数据流，使得 View（界面）和 ViewModel（数据源）之间的数据能够自动同步
