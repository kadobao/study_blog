---
title: Grid​、StackPanel​和Viewbox​布局
icon: code
order: 4
category:
  - C#学习
tag:
  - WPF
  - 布局控件
---

# WPF 布局控件的方向与缩放属性详解

## Grid、StackPanel和Viewbox布局控件

Grid是网格布局，StackPanel类似流式布局，Viewbox的作用是在页面放大缩小的同时，内容也按比例缩放。

## Grid 的布局方向

Grid 本身没有"方向"概念，它通过行和列来组织内容：

```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="*"/> <!-- 垂直方向 -->
        <RowDefinition Height="Auto"/>
    </Grid.ColumnDefinitions>
    
    <Button Grid.Row="0" Grid.Column="0" Content="单元格1"/>
    <Button Grid.Row="1" Grid.Column="1" Content="单元格2"/>
</Grid>

<!-- 不均匀分布示例 -->
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="2*"/> <!-- 高度占2份 -->
        <RowDefinition Height="*"/>  <!-- 高度占1份 -->
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*"/>
        <ColumnDefinition Width="2*"/> <!-- 宽度是第1列的2倍 -->
    </Grid.ColumnDefinitions>
</Grid>

<!-- 跨行跨列示例 -->
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="*"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*"/>
        <ColumnDefinition Width="*"/>
    </Grid.ColumnDefinitions>
    
    <!-- 跨2行1列 -->
    <Button Grid.Row="0" Grid.Column="0"
            Grid.RowSpan="2" Content="跨行按钮"/>
            
    <!-- 跨1行2列 -->
    <Button Grid.Row="1" Grid.Column="1"
            Grid.ColumnSpan="2" Content="跨列按钮"/>
</Grid>

<!-- 完整3x3网格示例 -->
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="*"/>
        <RowDefinition Height="*"/>
        <RowDefinition Height="Auto"/>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*"/>
        <ColumnDefinition Width="*"/>
        <ColumnDefinition Width="Auto"/>
    </Grid.ColumnDefinitions>
    
    <Button Grid.Row="0" Grid.Column="0" Content="(0,0)"/>
    <Button Grid.Row="0" Grid.Column="1" Content="(0,1)"/>
    <Button Grid.Row="0" Grid.Column="2" Content="(0,2)"/>
    
    <Button Grid.Row="1" Grid.Column="0" Content="(1,0)"/>
    <Button Grid.Row="1" Grid.Column="1" Content="(1,1)"/>
    <Button Grid.Row="1" Grid.Column="2" Content="(1,2)"/>
    
    <Button Grid.Row="2" Grid.Column="0" Content="(2,0)"/>
    <Button Grid.Row="2" Grid.Column="1" Content="(2,1)"/>
    <Button Grid.Row="2" Grid.Column="2" Content="(2,2)"/>
</Grid>
```

## StackPanel 的方向控制

StackPanel 通过 `Orientation` 属性明确控制方向：

### 垂直排列 (默认)
```xml
<StackPanel Orientation="Vertical">
    <Button Content按钮1"/>
    <Button Content="按钮2"/>
    <Button Content="按钮3"/>
</StackPanel>
```

### 水平排列
```xml
<StackPanel Orientation="Horizontal">
    <Button Content="按钮1"/>
    <Button Content="按钮2"/>
    <Button Content="按钮3"/>
</StackPanel>
```

## Viewbox 的 Stretch 属性

Viewbox 通过 `Stretch` 控制内容缩放方式：

### 1. Uniform (默认)
```xml
<Viewbox Stretch="Uniform" Width="200" Height="100">
    <Ellipse Width="50" Height="50" Fill="Blue"/>
</Viewbox>
```
- 保持宽高比
- 完整显示内容
- 可能留有空白



## 布局控件选择指南

1. **使用 Grid 当**：
   - 需要复杂的二维布局
   - 需要精确控制元素位置
   - 元素间有相对位置关系

2. **使用 StackPanel 当**：
   - 简单的一维排列
   - 需要顺序排列元素
   - 制作工具栏或菜单栏

3. **使用 Viewbox 当**：
   - 需要整体缩放内容
   - 保持矢量图形的比例
   - 创建响应式可缩放UI