---
title: WPF窗口自适应设计方案
icon: code
order: 7
category:
  - C#学习
tag:
  - WPF
  - 窗口自适应
---

## Grid布局方案

1. 设计好Grid布局里面行和列的比例
2. 为主界面设置MinWidth和MinHeight
3. 运行查看布局是否合理
4. 为行或列设置MinWidth和MinHeight（根据实际运行时的界面宽高计算）
5. 在控件中设置 `HorizontalAlignment="Stretch"` 和 `VerticalAlignment="Stretch"`


![使用Grid实现窗口自适应](/assets/images/使用Grid实现窗口自适应.png)

## Grid布局示例

::: details 完整XAML代码

```xaml
<UserControl x:Class="WPF的MVVM模式的Prism框架.Views.PLC"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:WPF的MVVM模式的Prism框架.Views"
             xmlns:prism="http://prismlibrary.com/"
             mc:Ignorable="d" 
             d:DesignWidth="1357"
             d:DesignHeight="821"
             prism:ViewModelLocator.AutoWireViewModel="True">
    <!-- 这行代码运用了 Prism 框架的 ViewModelLocator 自动将视图（UserControl）的数据上下文设置为对应的视图模型（ViewModel）。ViewModelLocator 会依据视图的名称自动查找匹配的视图模型，例如 PLC 视图会对应 PLCViewModel 视图模型。 -->
    <Grid Background="{DynamicResource TertiaryBackgroundColor}">
        <Grid.RowDefinitions>
            <RowDefinition Height="*"/>
            <RowDefinition Height="*"/>
            <RowDefinition Height="*"/>
            <RowDefinition Height="*"/>
            <RowDefinition Height="*"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>

        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="2*" MinWidth="124"/>
            <ColumnDefinition Width="2*" MinWidth="124"/>
            <ColumnDefinition Width="2*" MinWidth="124"/>
            <ColumnDefinition Width="5*" MinWidth="310"/>
            <ColumnDefinition Width="5*" MinWidth="310"/>
        </Grid.ColumnDefinitions>

        <!-- 第一行控件示例 -->
        <Border Grid.Row="0" Grid.Column="0" Style="{StaticResource TimeCardStyle}" HorizontalAlignment="Stretch" VerticalAlignment="Stretch" Background="{DynamicResource TertiaryBlueColor}">
            <Button Width="120" 
                    Height="110" 
                    Content="连接断开" 
                    FontFamily="微软雅黑" 
                    FontSize="18" 
                    FontWeight="Bold"
                    Style="{StaticResource LargeRoundedButtonStyle}"
                    HorizontalAlignment="Center" 
                    VerticalAlignment="Center"/>
        </Border>

        <!-- 其他控件代码... -->
    </Grid>
</UserControl>
```

:::

## StackPanel布局方案

直接在StackPanel上设置 `HorizontalAlignment="Stretch"`，然后在子控件上设置 `MinWidth` 或 `MinHeight`：

### 水平排列示例

```xaml
<StackPanel Orientation="Horizontal" HorizontalAlignment="Stretch">
    <Button Content="保存" MinWidth="100" HorizontalAlignment="Stretch" Margin="5"/>
    <Button Content="取消" MinWidth="100" HorizontalAlignment="Stretch" Margin="5"/>
</StackPanel>
```

### 垂直排列示例

```xaml
<StackPanel Orientation="Vertical" HorizontalAlignment="Stretch">
    <Button Content="保存" MinHeight="30" Margin="5" Padding="10,5"/>
    <Button Content="取消" MinHeight="30" Margin="5" Padding="10,5"/>
    <Button Content="这是一个很长的按钮文本" MinHeight="30" Margin="5" Padding="10,5"/>
</StackPanel>