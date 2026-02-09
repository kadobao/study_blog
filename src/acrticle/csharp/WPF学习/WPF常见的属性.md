---
title: WPF常见的属性
icon: code
order: 5
category:
  - C#学习
tag:
  - WPF
  - 属性
---

在WPF（Windows Presentation Foundation）中，这些属性通常与控件的样式和外观相关，以下是对应的属性名称：

### 1. 背景颜色

- **属性名**：`Background`
- **数据类型**: `Brush`
- **初始化**: `private Brush _background = Brushes.LightBlue;`
- **双向绑定**: 
```cs
private Brush _background = Brushes.LightBlue;

public Brush Background
{
    get => _background;
    set => SetProperty(ref _background, value);
}
```
- **说明**：用于设置控件的背景颜色。
- **示例**: 
```xaml
<Button Background="LightBlue" Content="蓝色背景按钮"/>
```

### 2. 文本颜色

- **属性名**：`Foreground`
- **数据类型**: `Brush`
- **初始化**: `private Brush _foreground = Brushes.Black;`
- **双向绑定**:
```cs
private Brush _foreground = Brushes.Black;

public Brush Foreground
{
    get => _foreground;
    set => SetProperty(ref _foreground, value);
}
```
- **说明**：用于设置控件（如`TextBlock`、`Label`、`Button`等）的文本颜色。
- **示例**:
```xaml
<TextBlock Foreground="Red" Text="红色文字"/>
```

### 3. 外边距

- **属性名**：`Margin`
- **数据类型**: `Thickness`
- **初始化**: `private Thickness _margin = new Thickness(0);`
- **双向绑定**:
```cs
private Thickness _margin = new Thickness(0);

public Thickness Margin
{
    get => _margin;
    set => SetProperty(ref _margin, value);
}
```
- **说明**：用于设置控件与其他控件之间的外边距。`Margin`是一个`Thickness`结构，可以分别设置上下左右的外边距，例如`Margin="10,20,30,40"`表示左边距为10，上边距为20，边右距为30，下边距为40。
- **示例**:
```xaml
<Button Margin="10" Content="有外边距的按钮"/>
```

### 4. 内边距

- **属性名**：`Padding`
- **数据类型**: `Thickness`
- **初始化**: `private Thickness _padding = new Thickness(0);`
- **双向绑定**:
```cs
private Thickness _padding = new Thickness(0);

public Thickness Padding
{
    get => _padding;
    set => SetProperty(ref _padding, value);
}
```
- **说明**：用于设置控件内部内容与控件边框之间的内边距。`Padding`也是一个`Thickness`结构，用法与`Margin`类似，例如`Padding="5,10"`表示左右内边距为5，上下内边距为10。
- **示例**:
```xaml
<Border Padding="10" Background="LightGray">
    <TextBlock Text="有内边距的文本"/>
</Border>
```

### 5. 圆角边框

- **属性名**：`CornerRadius`
- **数据类型**: `CornerRadius`
- **初始化**: `private CornerRadius _cornerRadius = new CornerRadius(0);`
- **双向绑定**:
```cs
private CornerRadius _cornerRadius = new CornerRadius(0);

public CornerRadius CornerRadius
{
    get => _cornerRadius;
    set => SetProperty(ref _cornerRadius, value);
}
```
- **说明**：用于设置控件（如`Border`、`Button`等）的边框圆角。`CornerRadius`是一个结构，可以分别设置四个角的圆角大小，例如`CornerRadius="10"`表示四个角的圆角半径均为10，`CornerRadius="10,20,30,40"`分别表示左上角、右上角、右下角、左下角的圆角半径。
- **示例**:
```xaml
<Button CornerRadius="10" Content="圆角按钮"/>
```

### 6.宽度

- **属性名**：`Width`
- **数据类型**: `double`
- **初始化**: `private double _width = 0;`
- **双向绑定**:
```cs
private double _width = 0;

public double Width
{
    get => _width;
    set => SetProperty(ref _width, value);
}
```
- **说明**：用于设置控件的宽度。
- **示例**:
```xaml
<Button Width="100" Content="固定宽度按钮"/>
```

### 7.高度

- **属性名**：`Height`
- **数据类型**: `double`
- **初始化**: `private double _height = 0;`
- **双向绑定**:
```cs
private double _height = 0;

public double Height
{
    get => _height;
    set => SetProperty(ref _height, value);
}
```
- **说明**：用于设置控件的高度。
- **示例**:
```xaml
<Button Height="50" Content="固定高度按钮"/>
```


### 8.最小宽度

- **属性名**：`MinWidth`
- **数据类型**: `double`
- **初始化**: `private double _minWidth = 0;`
- **双向绑定**:
```cs
private double _minWidth = 0;

public double MinWidth
{
    get => _minWidth;
    set => SetProperty(ref _minWidth, value);
}
```
- **说明**：用于设置控件的最小宽度。
- **示例**:
```xaml
<Button MinWidth="100" Content="最小宽度按钮"/>
```

### 9. 最小高度

- **属性名**：`MinHeight`
- **数据类型**: `double`
- **初始化**: `private double _minHeight = 0;`
- **双向绑定**:
```cs
private double _minHeight = 0;

public double MinHeight
{
    get => _minHeight;
    set => SetProperty(ref _minHeight, value);
}
```
- **说明**：用于设置控件的最小高度。
- **示例**:
```xaml
<Button MinHeight="50" Content="最小高度按钮"/>
```

### 10. 最大宽度

- **属性名**：`MaxWidth`
- **数据类型**: `double`
- **初始化**: `private double _maxWidth = double.PositiveInfinity;`
- **双向绑定**:
```cs
private double _maxWidth = double.PositiveInfinity;

public double MaxWidth
{
    get => _maxWidth;
    set => SetProperty(ref _maxWidth, value);
}
```
- **说明**：用于设置控件的最大宽度。
- **示例**:
```xaml
<Button MaxWidth="200" Content="最大宽度按钮"/>
```

### 11. 最大高度

- **属性名**：`MaxHeight`
- **数据类型**: `double`
- **初始化**: `private double _maxHeight = double.PositiveInfinity;`
- **双向绑定**:
```cs
private double _maxHeight = double.PositiveInfinity;

public double MaxHeight
{
    get => _maxHeight;
    set => SetProperty(ref _maxHeight, value);
}
```
- **说明**：用于设置控件的最大高度。
- **示例**:
```xaml
<Button MaxHeight="100" Content="最大高度按钮"/>
```


### 13. 水平对齐方式

- **属性名**：`HorizontalAlignment`
- **数据类型**: `HorizontalAlignment`
- **初始化**: `private HorizontalAlignment _horizontalAlignment = HorizontalAlignment.Left;`
- **双向绑定**:
```cs
private HorizontalAlignment _horizontalAlignment = HorizontalAlignment.Left;

public HorizontalAlignment HorizontalAlignment
{
    get => _horizontalAlignment;
    set => SetProperty(ref _horizontalAlignment, value);
}
```
- **说明**：用于设置控件在父容器中的水平对齐方式。
- **示例**:
```xaml
<Button HorizontalAlignment="Center" Content="居中对齐按钮"/>
```

### 14. 垂直对齐方式

- **属性名**：`VerticalAlignment`
- **数据类型**: `VerticalAlignment`
- **初始化**: `private VerticalAlignment _verticalAlignment = VerticalAlignment.Top;`
- **双向绑定**:
```cs
private VerticalAlignment _verticalAlignment = VerticalAlignment.Top;

public VerticalAlignment VerticalAlignment
{
    get => _verticalAlignment;
    set => SetProperty(ref _verticalAlignment, value);
}
```
- **说明**：用于设置控件在父容器中的垂直对齐方式。
- **示例**:
```xaml
<Button VerticalAlignment="Center" Content="垂直居中对齐按钮"/>
```

### 15. 可见性

- **属性名**：`Visibility`
- **数据类型**: `Visibility`
- **属性值**: `Visible`（可见）, `Collapsed`（不可见，不占用空间）, `Hidden`（不可见，占用空间）
- **双向绑定**:
```cs
private Visibility _visibility = Visibility.Visible;

public Visibility Visibility
{
    get => _visibility;
    set => SetProperty(ref _visibility, value);
}
```
- **说明**：用于设置控件的可见性。
- **示例**:
```xaml
<Button Visibility="Collapsed" Content="不可见按钮"/>
```

### 16. 边框颜色

- **属性名**：`BorderBrush`
- **数据类型**: `Brush`
- **初始化**: `private Brush _borderBrush = Brushes.Black;`
- **双向绑定**:
```cs
private Brush _borderBrush = Brushes.Black;

public Brush BorderBrush
{
    get => _borderBrush;
    set => SetProperty(ref _borderBrush, value);
}
```
- **说明**：用于设置控件的边框颜色。
- **示例**:
```xaml
<Button BorderBrush="Red" Content="红色边框按钮"/>
```

### 17. 边框宽度

- **属性名**：`BorderThickness`
- **数据类型**: `Thickness`
- **初始化**: `private Thickness _borderThickness = new Thickness(0);`
- **双向绑定**:
```cs
private Thickness _borderThickness = new Thickness(0);

public Thickness BorderThickness
{
    get => _borderThickness;
    set => SetProperty(ref _borderThickness, value);
}
```
- **说明**：用于设置控件的边框宽度。
- **示例**:
```xaml
<Button BorderThickness="2" Content="边框宽度按钮"/>
```

### 18. 字体大小

- **属性名**：`FontSize`
- **数据类型**: `double`
- **初始化**: `private double _fontSize = 12;`
- **双向绑定**:
```cs
private double _fontSize = 12;

public double FontSize
{
    get => _fontSize;
    set => SetProperty(ref _fontSize, value);
}
```
- **说明**：用于设置控件的字体大小。
- **示例**:
```xaml
<Button FontSize="16" Content="字体大小按钮"/>
```

### 19. 字体

- **属性名**：`FontFamily`
- **数据类型**: `FontFamily`
- **初始化**: `private FontFamily _fontFamily = new FontFamily("微软雅黑");`
- **双向绑定**:
```cs
private FontFamily _fontFamily = new FontFamily("微软雅黑");

public FontFamily FontFamily
{
    get => _fontFamily;
    set => SetProperty(ref _fontFamily, value);
}
```
- **说明**：用于设置控件的字体。
- **示例**:
```xaml
<Button FontFamily="宋体" Content="宋体字体按钮"/>
```

### 20. 字重

- **属性名**：`FontWeight`
- **数据类型**: `FontWeight`
- **属性值**: `FontWeights.Normal`（正常）, `FontWeights.Bold`（加粗）, `FontWeights.ExtraBlack`（超黑）, `FontWeights.ExtraBold`（超粗）, `FontWeights.ExtraLight`（超轻）, `FontWeights.Light`（轻）, `FontWeights.Medium`（中）, `FontWeights.SemiBold`（半粗）, `FontWeights.SemiLight`（半轻）
- **双向绑定**:
```cs
private FontWeight _fontWeight = FontWeights.Normal;

public FontWeight FontWeight
{
    get => _fontWeight;
    set => SetProperty(ref _fontWeight, value);
}
```
- **说明**：用于设置控件的字体粗细。
- **示例**:
```xaml
<Button FontWeight="Bold" Content="加粗字体按钮"/>
```


### 21. 字体样式

- **属性名**：`FontStyle`
- **数据类型**: `FontStyle`
- **属性值**: `FontStyles.Normal`（正常）, `FontStyles.Italic`（斜体）, `FontStyles.Oblique`（倾斜）
- **双向绑定**:
```cs
private FontStyle _fontStyle = FontStyles.Normal;

public FontStyle FontStyle
{
    get => _fontStyle;
    set => SetProperty(ref _fontStyle, value);
}
```
- **说明**：用于设置控件的字体样式。
- **示例**:
```xaml
<Button FontStyle="Italic" Content="斜体字体按钮"/>
```

### 22. 透明度

- **属性名**：`Opacity`
- **数据类型**: `double`
- **初始化**: `private double _opacity = 1;`
- **双向绑定**:
```cs
private double _opacity = 1;

public double Opacity
{
    get => _opacity;
    set => SetProperty(ref _opacity, value);
}
```
- **说明**：用于设置控件的透明度。
- **示例**:
```xaml
<Button Opacity="0.5" Content="半透明按钮"/>
```

### 23. 文本

- **属性名**：`Text`
- **数据类型**: `string`
- **初始化**: `private string _text = "默认文本";`
- **双向绑定**:
```cs
private string _text = "默认文本";

public string Text
{
    get => _text;
    set => SetProperty(ref _text, value);
}
```
- **说明**：用于设置控件的文本内容。
- **示例**:
```xaml
<Button Text="按钮文本"/>
```

### 24. 内容

- **属性名**：`Content`
- **数据类型**: `object`
- **初始化**: `private object _content = null;`
- **双向绑定**:
```cs
private object _content = null;

public object Content
{
    get => _content;
    set => SetProperty(ref _content, value);
}
```
- **说明**：用于设置控件的内容。
- **示例**:
```xaml
<Button Content="按钮内容"/>
```

### 25. 获取焦点

- **属性名**：`Focusable`
- **数据类型**: `bool`
- **初始化**: `private bool _focusable = true;`
- **双向绑定**: 
```cs
private bool _focusable = true;

public bool Focusable
{
    get => _focusable;
    set => SetProperty(ref _focusable, value);
}
```
- **说明**：用于设置控件是否可以获取焦点。
- **示例**:
```xaml
<Button Focusable="False" Content="不可获取焦点按钮"/>
```

### 26. 检测控件是否可见

- **属性名**：`IsVisible`
- **数据类型**: `bool`
- **初始化**: 不支持双向数据绑定
- **说明**：用于检测控件是否可见。
- **示例**:
```Csharp
if (myTextBox.IsVisible)
{
    // 只有当文本框可见时执行操作
    Console.WriteLine("文本框当前可见");

    MessageBox.Show("文本框当前可见");
}
```

### 27. 设置控件是否启用

- **属性名**：`IsEnabled`
- **数据类型**: `bool`
- **初始化**: `private bool _isEnabled = true;`
- **双向绑定**: 
```cs
private bool _isEnabled = true;

public bool IsEnabled
{
    get => _isEnabled;
    set => SetProperty(ref _isEnabled, value);
}
```
- **说明**：用于设置控件是否启用。
- **示例**:
```xaml
<Button IsEnabled="False" Content="不可用按钮"/>
```



---

## WPF控件常用属性分类

在WPF中，控件的常用属性可以分为 **布局属性**、**外观属性**、**内容属性**、**交互属性** 和 **行为属性** 等几大类。以下是大多数控件（如 `Button`、`TextBox`、`Label` 等）常用的核心属性：

### 1. 布局属性（Layout）

控制控件在容器（如 `Grid`、`StackPanel`）中的位置和大小：

- **`Width` / `Height`** - 控件的宽度和高度（`Auto` 表示自适应内容）
  ```xaml
  <Button Width="100" Height="50" Content="固定尺寸按钮"/>
  <TextBlock Width="Auto" Height="Auto" Text="自适应内容"/>
  ```

- **`MinWidth` / `MinHeight`** - 最小尺寸
  ```xaml
  <Button MinWidth="80" MinHeight="30" Content="最小尺寸按钮"/>
  ```

- **`MaxWidth` / `MaxHeight`** - 最大尺寸
  ```xaml
  <TextBox MaxWidth="200" MaxHeight="100" Text="最大尺寸文本框"/>
  ```

- **`Margin`** - 外边距（`"左,上,右,下"`，如 `"5,10,5,10"`）
  ```xaml
  <!-- 统一外边距 -->
  <Button Margin="10" Content="统一外边距"/>
  <!-- 不同方向外边距 -->
  <Button Margin="5,10,15,20" Content="不同外边距"/>
  ```

- **`Padding`** - 内边距（控件内容与边框的距离）
  ```xaml
  <Border Padding="10" Background="LightGray">
    <TextBlock Text="有内边距的文本"/>
  </Border>
  ```

- **`HorizontalAlignment`** - 水平对齐方式（`Left`、`Center`、`Right`、`Stretch`）
  ```xaml
  <StackPanel>
    <Button HorizontalAlignment="Left" Content="左对齐"/>
    <Button HorizontalAlignment="Center" Content="居中"/>
    <Button HorizontalAlignment="Right" Content="右对齐"/>
  </StackPanel>
  ```

- **`VerticalAlignment`** - 垂直对齐方式（`Top`、`Center`、`Bottom`、`Stretch`）
  ```xaml
  <Grid Height="200">
    <Button VerticalAlignment="Top" Content="顶部对齐"/>
    <Button VerticalAlignment="Center" Content="垂直居中"/>
    <Button VerticalAlignment="Bottom" Content="底部对齐"/>
  </Grid>
  ```

- **`Visibility`** - 可见性（`Visible`、`Collapsed`、`Hidden`）
  ```xaml
  <StackPanel>
    <Button Content="可见按钮" Visibility="Visible"/>
    <Button Content="隐藏按钮" Visibility="Collapsed"/>
  </StackPanel>
  ```

- **`Grid.Row` / `Grid.Column`** - 在Grid布局中的行列位置
  ```xaml
  <Grid>
    <Grid.RowDefinitions>
      <RowDefinition/>
      <RowDefinition/>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
      <ColumnDefinition/>
      <ColumnDefinition/>
    </Grid.ColumnDefinitions>
    
    <Button Grid.Row="0" Grid.Column="0" Content="(0,0)"/>
    <Button Grid.Row="1" Grid.Column="1" Content="(1,1)"/>
  </Grid>
  ```

- **`Grid.ColumnSpan` / `Grid.RowSpan`** - 指定控件跨越的列数/行数
  ```xaml
  <Grid>
    <Grid.RowDefinitions>
      <RowDefinition/>
      <RowDefinition/>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
      <ColumnDefinition/>
      <ColumnDefinition/>
    </Grid.ColumnDefinitions>
    
    <Button Grid.Row="0" Grid.Column="0" Grid.ColumnSpan="2"
            Content="跨越两列"/>
    <Button Grid.Row="1" Grid.Column="0" Grid.RowSpan="2"
            Content="跨越两行"/>
  </Grid>
  ```

### 2. 外观属性（Appearance）

控制控件的视觉样式：

- **`Background`** - 背景色（如 `"#FF3AB19B"` 或 `"LightBlue"`）
  ```xaml
  <Button Background="LightBlue" Content="蓝色背景按钮"/>
  ```

- **`Foreground`** - 前景色（文字颜色）
  ```xaml
  <TextBlock Foreground="Red" Text="红色文字"/>
  ```

- **`BorderBrush`** - 边框颜色
  ```xaml
  <Border BorderBrush="Black" BorderThickness="1">
    <TextBlock Text="带边框的文本"/>
  </Border>
  ```

- **`BorderThickness`** - 边框粗细（如 `"1"` 或 `"2,0,2,0"`）
  ```xaml
  <!-- 统一边框 -->
  <Button BorderThickness="2" BorderBrush="Black" Content="粗边框按钮"/>
  <!-- 不同方向边框 -->
  <Border BorderThickness="2,0,2,0" BorderBrush="Black">
    <TextBlock Text="左右边框"/>
  </Border>
  ```

- **`FontSize`** - 字体大小
  ```xaml
  <TextBlock FontSize="18" Text="大号文字"/>
  ```

- **`FontFamily`** - 字体（如 `"Arial"`）
  ```xaml
  <TextBlock FontFamily="Arial" Text="Arial字体"/>
  ```

- **`FontWeight`** - 字重（如 `"Bold"`）
  ```xaml
  <TextBlock FontWeight="Bold" Text="加粗文字"/>
  ```

- **`Opacity`** - 透明度（`0.0` 完全透明 ~ `1.0` 完全不透明）
  ```xaml
  <Button Opacity="0.5" Content="半透明按钮"/>
  ```

- **`CornerRadius`**（某些控件如 `Border`）- 圆角半径
  ```xaml
  <Border CornerRadius="10" Background="LightGray" Padding="10">
    <TextBlock Text="圆角边框"/>
  </Border>
  ```

### 3. 内容属性（Content）

控制控件显示的内容：

- **`Content`** - 用于 `Button`、`Label` 等（可以是文本或嵌套控件）
  ```xaml
  <!-- 文本内容 -->
  <Button Content="点击我"/>
  
  <!-- 嵌套控件内容 -->
  <Button>
    <StackPanel Orientation="Horizontal">
      <Image Source="icon.png" Width="16"/>
      <TextBlock Text="带图标的按钮" Margin="5,0,0,0"/>
    </StackPanel>
  </Button>
  ```

- **`Text`** - 用于 `TextBox`、`TextBlock`（纯文本）
  ```xaml
  <TextBox Text="可编辑文本"/>
  <TextBlock Text="只读文本"/>
  ```

- **`ItemsSource`** - 用于 `ListBox`、`ComboBox`（绑定数据源）
  ```xaml
  <ListBox ItemsSource="{Binding Items}">
    <ListBox.ItemTemplate>
      <DataTemplate>
        <TextBlock Text="{Binding Name}"/>
      </DataTemplate>
    </ListBox.ItemTemplate>
  </ListBox>
  ```

- **`Image`** / `Icon` - 某些控件支持嵌入图片（如 `Image` 控件）
  ```xaml
  <Image Source="picture.jpg" Stretch="Uniform"/>
  ```

### 4. 交互属性（Interaction）

控制用户交互行为：

- **`IsEnabled`** - 是否启用（`True`/`False`）
  ```xaml
  <Button IsEnabled="False" Content="禁用按钮"/>
  ```

- **`IsVisible`** - 是否可见（通常用 `Visibility` 替代）
  ```xaml
  <Button IsVisible="False" Content="不可见按钮"/>
  ```

- **`IsMouseOver`**（触发器用）- 鼠标悬停状态
  ```xaml
  <Button>
    <Button.Style>
      <Style TargetType="Button">
        <Style.Triggers>
          <Trigger Property="IsMouseOver" Value="True">
            <Setter Property="Background" Value="LightBlue"/>
          </Trigger>
        </Style.Triggers>
      </Style>
    </Button.Style>
    <Button Content="悬停变色按钮"/>
  </Button>
  ```

- **`IsFocused`** - 是否获得键盘焦点
  ```xaml
  <TextBox x:Name="txtBox" IsFocused="True" Text="获得焦点"/>
  ```

- **`IsPressed`**（如 `Button`）- 是否被按下
  ```xaml
  <Button>
    <Button.Style>
      <Style TargetType="Button">
        <Style.Triggers>
          <Trigger Property="IsPressed" Value="True">
            <Setter Property="Foreground" Value="Red"/>
          </Trigger>
        </Style.Triggers>
      </Style>
    </Button.Style>
    <Button Content="按下变色按钮"/>
  </Button>
  ```

- **`Command`** - 绑定 `ICommand`（MVVM 模式常用）
  ```xaml
  <Button Command="{Binding MyCommand}" Content="命令按钮"/>
  ```

- **`Click`**（事件）- 点击事件
  ```xaml
  <Button Click="Button_Click" Content="点击事件按钮"/>
  ```

- **`Focusable`** - 控件是否能获取焦点
  ```xaml
  <TextBox Focusable="False" Text="不能获取焦点"/>
  ```

### 5. 文本与字体属性

- **`TextAlignment`** - 文本对齐方式（`Left`, `Center`, `Right`, `Justify`）
  ```xaml
  <TextBlock TextAlignment="Center" Text="居中对齐文本"/>
  ```

- **`TextDecorations`** - 添加下划线、删除线等（如 `TextDecorations="Underline"`）
  ```xaml
  <TextBlock TextDecorations="Underline" Text="下划线文本"/>
  <TextBlock TextDecorations="Strikethrough" Text="删除线文本"/>
  ```

- **`LineHeight` / `LineStackingStrategy`** - 控制多行文本的行高和布局
  ```xaml
  <TextBlock LineHeight="30" TextWrapping="Wrap"
             Text="这是一段长文本，用于演示行高设置效果。"/>
  ```

- **`CharacterSpacing`** - 调整字符间距
  ```xaml
  <TextBlock CharacterSpacing="10" Text="字符间距较大的文本"/>
  ```

### 6. 行为属性（Behavior）

控制控件的特殊行为：

- **`ToolTip`** - 鼠标悬停提示文本
  ```xaml
  <Button Content="按钮" ToolTip="这是一个提示信息"/>
  ```
  
- **`ContextMenu`** - 右键菜单
  ```xaml
  <TextBox Text="右键点击我">
    <TextBox.ContextMenu>
      <ContextMenu>
        <MenuItem Header="复制"/>
        <MenuItem Header="粘贴"/>
      </ContextMenu>
    </TextBox.ContextMenu>
  </TextBox>
  ```
  
- **`FocusVisualStyle`** - 键盘焦点样式（如 `{x:Null}` 禁用虚线框）
  ```xaml
  <Button Content="按钮" FocusVisualStyle="{x:Null}"/>
  ```
  
- **`Cursor`** - 鼠标悬停时的指针样式（如 `"Hand"`）
  ```xaml
  <Button Content="按钮" Cursor="Hand"/>
  ```
  
- **`TabIndex`** - Tab 键切换顺序
  ```xaml
  <StackPanel>
    <TextBox TabIndex="1"/>
    <TextBox TabIndex="2"/>
  </StackPanel>
  ```
  
- **`ScrollViewer.HorizontalScrollBarVisibility`** - 滚动条显示方式
  ```xaml
  <TextBox ScrollViewer.HorizontalScrollBarVisibility="Auto"
           Text="这是一个长文本..."/>
  ```

### 7. 数据绑定相关（Data Binding）

- **`DataContext`** - 数据上下文（MVVM 模式）
- **`Binding`** - 绑定数据（如 `Text="{Binding Name}"`）
- **`ItemTemplate`**（`ListBox`、`ComboBox`）- 数据项模板

---

## 示例：一个典型的 WPF 按钮

```xml
<Button
    Width="200"
    Height="40"
    Margin="10"
    Padding="10,5"
    HorizontalAlignment="Center"
    VerticalAlignment="Center"
    Background="#3AB19B"
    Foreground="White"
    FontSize="14"
    FontWeight="Bold"
    BorderBrush="#49B7A3"
    BorderThickness="1"
    CornerRadius="20"
    Content="Click Me"
    Cursor="Hand"
    ToolTip="This is a button"
    Command="{Binding MyCommand}"
    FocusVisualStyle="{x:Null}">
</Button>
```

---

## 总结

- **布局属性** 决定控件的位置和大小
- **外观属性** 控制颜色、字体、边框等
- **内容属性** 决定显示什么（文本、图片、子控件）
- **交互属性** 处理用户输入（点击、悬停、焦点）
- **行为属性** 影响控件的额外功能（提示、滚动、Tab 键顺序）

---

## WPF 中常见的交互属性

属性名称             | 类型       | 适用控件                     | 用途                         | 示例                                                     |
|----------------------|------------|-----------------------------|------------------------------|----------------------------------------------------------|
`IsEnabled`          | `bool`     | 大多数控件（如 Button、TextBox） | 指定控件是否可以被用户交互。     | `<Button Content="按钮" IsEnabled="False" />`                |
`IsFocused`          | `bool`     | 大多数控件（如 TextBox、Button） | 指示控件是否具有焦点。           | `if (textBox.IsFocused) { /* 执行操作 */ }`                  |
`IsSelected`         | `bool`     | ListBoxItem、TreeViewItem 等     | 指示控件是否被选中。             | `<ListBoxItem Content="选项1" IsSelected="True" />`          |
`IsChecked`          | `bool?`    | CheckBox、RadioButton            | 指示复选框或单选按钮是否被选中。 | `<CheckBox Content="复选框" IsChecked="True" />`             |
`IsPressed`          | `bool`     | Button、ToggleButton 等          | 指示按钮或其他控件是否被按下。   | `if (button.IsPressed) { /* 执行操作 */ }`                   |
`IsMouseOver`        | `bool`     | 大多数控件（如 Button、TextBox） | 指示鼠标是否悬停在控件上。       | `<Button Content="按钮" Style="{StaticResource HoverStyle}" />` |
`IsKeyboardFocused`  | `bool`     | 大多数控件（如 TextBox、Button） | 指示控件是否具有键盘焦点。       | `if (textBox.IsKeyboardFocused) { /* 执行操作 */ }`          |
`IsReadOnly`         | `bool`     | TextBox、ComboBox 等             | 指定控件是否为只读状态。         | `<TextBox Text="只读文本" IsReadOnly="True" />`              |
`IsTabStop`          | `bool`     | 大多数控件（如 TextBox、Button） | 指定控件是否参与 Tab 键顺序。    | `<TextBox Text="跳过 Tab" IsTabStop="False" />`              |
`TabIndex`           | `int`      | 大多数控件（如 TextBox、Button） | 指定控件在 Tab 键顺序中的位置。  | `<TextBox Text="第一个" TabIndex="1" />`                     |
`IsHitTestVisible`   | `bool`     | 大多数控件（如 Button、TextBox） | 指定控件是否可以被鼠标点击。     | `<Button Content="不可点击" IsHitTestVisible="False" />`     |
`Command`            | `ICommand` | Button、MenuItem 等              | 绑定命令到控件。                 | `<Button Content="点击" Command="{Binding MyCommand}" />`    |
`CommandParameter`   | `object`   | Button、MenuItem 等              | 为绑定的命令提供参数。           | `<Button Content="点击" Command="{Binding MyCommand}" CommandParameter="参数值" />` |
`Focusable`          | `bool`     | 大多数控件（如 Button、TextBox） | 指定控件是否可以获取焦点。       | `<TextBox Focusable="False" />`                              |
