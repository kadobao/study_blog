---
title: WPF控件样式文件的编写
icon: code
order: 2
category:
  - C#学习
tag:
  - WPF
  - WinForm
---        




# 在WPF项目中创建按钮样式的完整指南

结合`ButtonStyles.xaml`文件，详细讲解如何在WPF中创建自定义按钮样式。`ButtonStyles.xaml`文件定义了多种类型的按钮样式，包括菜单单选按钮、开关按钮、图标按钮等。

## 一、按钮样式的基本结构

在WPF中，按钮样式通常定义在资源字典文件中（如`ButtonStyles.xaml`），其基本结构如下：

```xaml
<!-- 资源字典根元素 -->
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    
    <!-- 按钮样式定义 -->
    <Style x:Key="StyleName" TargetType="Button">
        <!-- 属性设置 -->
        <Setter Property="PropertyName" Value="PropertyValue"/>
        
        <!-- 控件模板定义（可选，但可以完全自定义外观） -->
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="Button">
                    <!-- 模板内容 -->
                </ControlTemplate>
            </Setter.Value>
        </Setter>
        
        <!-- 触发器定义（可选，用于添加交互效果） -->
        <Style.Triggers>
            <!-- 触发器内容 -->
        </Style.Triggers>
    </Style>
</ResourceDictionary>
```

## 二、创建按钮样式的步骤详解

### 1. 定义样式的标识和目标类型

```xaml
<!-- 定义样式的唯一标识和适用的控件类型 -->
<Style x:Key="MenuRadioButtonStyle" TargetType="RadioButton">
    <!-- 样式内容 -->
</Style>
```

- `x:Key`：样式的唯一标识符，在XAML中通过这个名称引用样式
- `TargetType`：指定该样式适用于哪种类型的控件（Button、RadioButton、ToggleButton等）

### 2. 设置按钮的基本属性

使用`<Setter>`元素设置按钮的基本属性，如背景色、前景色、字体等：

```xaml
<!-- 设置按钮的基本属性 -->
<Setter Property="Background" Value="Transparent"/>
<Setter Property="Foreground" Value="{DynamicResource TertiaryTextColor}"/>
<Setter Property="FontFamily" Value="Arial"/>
<Setter Property="FontWeight" Value="Bold"/>
<Setter Property="FontSize" Value="15"/>
<Setter Property="Height" Value="48"/>
```

`ButtonStyles.xaml`文件大量使用了`{DynamicResource}`来引用颜色资源，这允许在运行时切换主题。

### 3. 创建自定义控件模板（重点）

控件模板是创建自定义外观的核心，通过它可以完全重新设计按钮的结构和外观：

```xaml
<!-- 定义控件模板 -->
<Setter Property="Template">
    <Setter.Value>
        <ControlTemplate TargetType="RadioButton">
            <!-- 使用Border作为按钮的容器 -->
            <Border x:Name="menuButton" Background="{TemplateBinding Background}" BorderThickness="{TemplateBinding BorderThickness}">
                <!-- 使用Grid进行布局 -->
                <Grid>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="45"/>
                        <ColumnDefinition/>
                    </Grid.ColumnDefinitions>
                    
                    <!-- 添加选中指示器 -->
                    <Rectangle Name="Indicator" Width="6" Height="25" .../>
                    
                    <!-- 添加图标 -->
                    <Path x:Name="Icon" Data="{Binding Tag, RelativeSource={RelativeSource AncestorType={x:Type RadioButton}}}" .../>
                    
                    <!-- 添加文本 -->
                    <TextBlock x:Name="txtName" Text="{TemplateBinding Content}" .../>
                </Grid>
            </Border>
        </ControlTemplate>
    </Setter.Value>
</Setter>
```

在模板中，通常使用以下元素：
- **布局容器**：如Grid、StackPanel等，用于组织按钮内部元素
- **视觉元素**：如Border、Rectangle、Path等，用于创建按钮的视觉效果
- **内容呈现器**：如ContentPresenter，用于显示按钮的Content属性内容

### 4. 添加交互效果（使用触发器）

触发器用于在按钮处于不同状态时（如鼠标悬停、按下、选中）改变其外观：

```xaml
<!-- 添加触发器定义 -->
<ControlTemplate.Triggers>
    <!-- 鼠标悬停触发器 -->
    <Trigger Property="IsMouseOver" Value="True">
        <Setter TargetName="txtName" Property="Foreground" Value="{DynamicResource SecundaryTextColor}"/>
        <Setter TargetName="Icon" Property="Fill" Value="{DynamicResource SecundaryTextColor}"/>
    </Trigger>
    
    <!-- 选中状态触发器 -->
    <Trigger Property="IsChecked" Value="True">
        <Setter TargetName="Indicator" Property="Fill" Value="{DynamicResource SecundaryGreenColor}"/>
        <Setter TargetName="btnSelected" Property="Background" Value="{DynamicResource TertiaryBackgroundColor}"/>
    </Trigger>
    
    <!-- 事件触发器（可添加动画效果） -->
    <EventTrigger RoutedEvent="Checked">
        <BeginStoryboard>
            <Storyboard>
                <!-- 颜色动画 -->
                <ColorAnimation Storyboard.TargetName="Border" 
                                Storyboard.TargetProperty="(Border.Background).(SolidColorBrush.Color)" 
                                To="#C2D1FC" Duration="0:0:0.2"/>
                
                <!-- 位置动画 -->
                <ThicknessAnimation Storyboard.TargetName="Ellipse" 
                                   Storyboard.TargetProperty="Margin" 
                                   To="15 0 0 0" Duration="0:0:0.2"/>
            </Storyboard>
        </BeginStoryboard>
    </EventTrigger>
</ControlTemplate.Triggers>
```

`ButtonStyles.xaml`文件使用了三种类型的触发器：
- **Trigger**：基于属性值的触发器
- **MultiTrigger**：基于多个属性值的触发器
- **EventTrigger**：基于事件的触发器，可添加动画效果

### 5. 在应用程序中引入和使用样式

在`App.xaml`中引入样式资源字典：

```xaml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <!-- 引入按钮样式资源 -->
            <ResourceDictionary Source="Styles/ButtonStyles.xaml"/>
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

在XAML中使用样式：

```xaml
<!-- 使用按钮样式 -->
<RadioButton Content="主页" 
             Style="{DynamicResource MenuRadioButtonStyle}" 
             Tag="{DynamicResource home}"/>
```

## 三、项目中的按钮样式类型

`ButtonStyles.xaml`文件定义了五种主要的按钮样式，每种适用于不同场景：

1. **MenuRadioButtonStyle**：菜单单选按钮，带有图标和文本，适用于侧边栏导航
2. **ToggleButtonStyle**：开关按钮，带有滑块动画效果，适用于开关设置
3. **IconButtonsStyle**：小型图标按钮，适用于窗口控制按钮（关闭、最小化等）
4. **SettingButtonsStyle**：中型设置按钮，适用于设置面板
5. **RoundedButtonStyle**：普通圆角按钮，适用于通用按钮场景

## 四、创建自定义按钮样式的示例

下面是创建一个新的渐变按钮样式的示例：

```xaml
<!-- 自定义渐变按钮样式 -->
<Style x:Key="GradientButtonStyle" TargetType="Button">
    <Setter Property="Foreground" Value="White"/>
    <Setter Property="FontWeight" Value="Bold"/>
    <Setter Property="Padding" Value="12,6"/>
    <Setter Property="Cursor" Value="Hand"/>
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="Button">
                <Border x:Name="border" CornerRadius="8" Padding="{TemplateBinding Padding}">
                    <!-- 渐变背景 -->
                    <Border.Background>
                        <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                            <GradientStop Offset="0" Color="{DynamicResource PrimaryBlueColor}"/>
                            <GradientStop Offset="1" Color="{DynamicResource PrimaryTealColor}"/>
                        </LinearGradientBrush>
                    </Border.Background>
                    <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center"/>
                </Border>
                
                <!-- 触发器 -->
                <ControlTemplate.Triggers>
                    <Trigger Property="IsMouseOver" Value="True">
                        <Setter TargetName="border" Property="Opacity" Value="0.9"/>
                    </Trigger>
                    <Trigger Property="IsPressed" Value="True">
                        <Setter TargetName="border" Property="Opacity" Value="0.8"/>
                        <Setter TargetName="border" Property="RenderTransform">
                            <Setter.Value>
                                <ScaleTransform ScaleX="0.98" ScaleY="0.98"/>
                            </Setter.Value>
                        </Setter>
                    </Trigger>
                </ControlTemplate.Triggers>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

## 五、属性冲突解决方案

当基本属性和控件模板存在冲突时，解决办法是：

1. 在Style的Setter中定义公共属性
2. 在模板中通过TemplateBinding引用这些属性



## 六、StaticResource与DynamicResource的区别

`ButtonStyles.xaml`文件同时使用了StaticResource和DynamicResource，它们的主要区别是：

- **StaticResource**：在XAML加载时一次性解析资源引用，如果资源发生变化，引用不会自动更新
- **DynamicResource**：在运行时动态解析资源引用，当资源发生变化时（如主题切换），引用会自动更新

在`ButtonStyles.xaml`文件中，DynamicResource更多用于可能需要在运行时改变的资源，如主题相关的颜色和样式。

## 七、使用资源文件

资源引用格式：`{DynamicResource 资源名}` 或 `{StaticResource 资源名}`

例如，对于定义如下的资源：
```xaml
<SolidColorBrush x:Key="SecundaryTextColor" Color="#2C2C2E"/>
```

可以这样引用：
```xaml
<Setter Property="Background" Value="{DynamicResource SecundaryWhiteColor}"/>
```

## 八、小结

创建WPF按钮样式的核心步骤包括：

1. **定义样式结构**：设置`x:Key`和`TargetType`
2. **设置基本属性**：使用`Setter`设置控件属性
3. **创建控件模板**：通过`Setter Property="Template"`定义按钮的视觉结构和布局
4. **添加交互效果**：使用`ControlTemplate.Triggers`触发器实现状态变化和动画
5. **引入和使用**：在应用程序中引入并应用样式





::: details `ButtonStyles.xaml`文件

```xaml
<!-- 资源字典根元素：这是一个"样式仓库"，存储所有可重用的按钮样式 -->
<!-- xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"：告诉系统这是WPF界面文件 -->
<!-- xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"：引入XAML语言的基本功能 -->
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <!-- 菜单单选按钮样式定义 -->
    <!-- x:Key="MenuRadioButtonStyle"：给这个样式起名叫"MenuRadioButtonStyle"，就像给文件夹起名一样 -->
    <!-- TargetType="RadioButton"：这个样式专门用于RadioButton（单选按钮）控件 -->
    <Style x:Key="MenuRadioButtonStyle" TargetType="RadioButton">
        <!-- <Setter>元素用于设置控件的各种属性 -->
        <!-- Property="Background"：设置按钮的背景颜色属性 -->
        <!-- Value="Transparent"：背景颜色设为透明（看不见背景） -->
        <Setter Property="Background" Value="Transparent"/>
        <!-- Property="Foreground"：设置按钮文字的颜色属性 -->
        <!-- Value="{DynamicResource TertiaryTextColor}"：文字颜色从主题配置文件中动态获取第三级文本颜色 -->
        <Setter Property="Foreground" Value="{DynamicResource TertiaryTextColor}"/>
        <!-- Property="FontFamily"：设置按钮文字的字体类型 -->
        <!-- Value="Arial"：使用Arial字体（一种常见的英文字体） -->
        <Setter Property="FontFamily" Value="Arial"/>
        <!-- Property="FontWeight"：设置按钮文字的粗细程度 -->
        <!-- Value="Bold"：设为粗体（Bold=粗体，Normal=正常） -->
        <Setter Property="FontWeight" Value="Bold"/>
        <!-- Property="FontSize"：设置按钮文字的大小 -->
        <!-- Value="15"：文字大小为15像素（数字越大文字越大） -->
        <Setter Property="FontSize" Value="15"/>
        <!-- Property="Height"：设置按钮的高度尺寸 -->
        <!-- Value="48"：按钮高度为48像素 -->
        <Setter Property="Height" Value="48"/>
        <!-- Property="Template"：设置按钮的外观模板（就像给按钮换"外衣"） -->
        <Setter Property="Template">
            <Setter.Value>
                <!-- ControlTemplate：控件模板，用来完全重新设计按钮的外观 -->
                <!-- TargetType="RadioButton"：这个模板专门为RadioButton设计 -->
                <ControlTemplate TargetType="RadioButton">
                    <!-- Border：边框容器，就像给按钮加一个"相框" -->
                    <!-- x:Name="menuButton"：给这个边框起名叫"menuButton"，方便后面引用 -->
                    <!-- Background="{TemplateBinding Background}"：边框背景色继承按钮的背景色设置 -->
                    <!-- BorderThickness="{TemplateBinding BorderThickness}"：边框粗细继承按钮的边框设置 -->
                    <Border x:Name="menuButton" Background="{TemplateBinding Background}" BorderThickness="{TemplateBinding BorderThickness}">
                        <!-- Grid：网格布局容器，就像把按钮内部划分成格子来摆放东西 -->
                        <Grid>
                            <!-- Grid.ColumnDefinitions：定义网格有几列，每列多宽 -->
                            <Grid.ColumnDefinitions>
                                <!-- ColumnDefinition：定义一列的属性 -->
                                <!-- Width="45"：第一列固定宽度45像素，专门放图标 -->
                                <ColumnDefinition Width="45"/>
                                <!-- ColumnDefinition：定义第二列 -->
                                <!-- 没写Width表示自动宽度，占用剩余所有空间，专门放文字 -->
                                <ColumnDefinition/>
                            </Grid.ColumnDefinitions>

                            <!-- Border：选中状态的背景边框（当按钮被选中时显示的背景） -->
                            <!-- x:Name="btnSelected"：给这个背景边框起名叫"btnSelected" -->
                            <!-- Grid.ColumnSpan="2"：这个背景横跨2列（占满整个按钮宽度） -->
                            <!-- CornerRadius="10"：背景的圆角半径为10像素（数字越大越圆） -->
                            <!-- Width="225"：背景宽度为225像素 -->
                            <!-- HorizontalAlignment="Right"：背景在水平方向靠右对齐 -->
                            <Border x:Name="btnSelected"
                                        Grid.ColumnSpan="2"
                                        CornerRadius="10"
                                        HorizontalAlignment="Stretch">
                            </Border>

                            <!-- Rectangle：矩形形状元素，用作选中指示器（按钮左边的小竖条，表示当前按钮被选中） -->
                            <!-- Name="Indicator"：给这个指示器起名叫"Indicator"，方便后面的触发器通过名字找到它并改变颜色 -->
                            <!-- HorizontalAlignment="Left"：指示器在水平方向的对齐方式为靠左（Left=靠左边，Center=居中，Right=靠右边） -->
                            <!-- Width="6"：指示器的宽度为6像素（像素是屏幕上最小的点，6像素很细，形成一条细竖线） -->
                            <!-- Height="25"：指示器的高度为25像素（比按钮高度48像素要小，所以不会占满整个按钮高度） -->
                            <!-- VerticalAlignment="Center"：指示器在垂直方向的对齐方式为居中（Top=靠上，Center=居中，Bottom=靠下） -->
                            <!-- RadiusX="3"：指示器左右两边的圆角半径为3像素（让竖条的左右两边变圆润，不那么尖锐） -->
                            <!-- RadiusY="3"：指示器上下两边的圆角半径为3像素（让竖条的上下两边变圆润，整体看起来像胶囊形状） -->
                            <Rectangle Name="Indicator"
                                           HorizontalAlignment="Left"
                                           Width="6" Height="25"
                                           VerticalAlignment="Center"
                                           RadiusX="3" RadiusY="3">
                                <!-- Rectangle.BitmapEffect：给这个矩形指示器添加视觉特效（让它看起来更有立体感和美观） -->
                                <Rectangle.Effect>
                                    <!-- DropShadowEffect：投影阴影效果（在指示器后面添加一个阴影，就像现实中物体在灯光下的投影） -->
                                    <!-- ShadowDepth="3"：阴影深度3像素（阴影离指示器的距离，数字越大阴影离得越远，立体感越强） -->
                                    <!-- Direction="0"：阴影投射的方向为0度（0度=向右投影，90度=向下投影，180度=向左投影，270度=向上投影） -->
                                    <!-- Color="#5B8DEF"：阴影的颜色为蓝色（#5B8DEF是十六进制颜色代码，#后面6位数字代表红绿蓝三种颜色的组合） -->
                                    <!-- Softness="0.6"：阴影的柔和度为0.6（0=完全锐利的硬阴影边缘，1=完全模糊的软阴影边缘，0.6是中等柔和） -->
                                    <DropShadowEffect 
                                        ShadowDepth="3"
                                        Direction="0"
                                        Color="#5B8DEF"
                                        BlurRadius="10"
                                        Opacity="0.6"/>
                                </Rectangle.Effect>
                            </Rectangle>

                            <!-- Path：路径图形元素，用来显示图标（可以是任何矢量图形，如箭头、齿轮、文件夹等形状） -->
                            <!-- x:Name="Icon"：给这个图标元素起名叫"Icon"，方便后面的触发器通过名字找到它并改变颜色 -->
                            <!-- Data="{Binding Tag, RelativeSource={RelativeSource AncestorType={x:Type RadioButton}}}"：图标的形状数据从父级RadioButton控件的Tag属性获取 -->
                            <!--   - Binding Tag：绑定到Tag属性（Tag是一个可以存储任意数据的属性，这里存储图标的路径数据） -->
                            <!--   - RelativeSource：指定数据来源的相对位置 -->
                            <!--   - AncestorType={x:Type RadioButton}：向上查找到RadioButton类型的祖先控件 -->
                            <!-- Height="24"：图标的高度为24像素（数字越大图标越高） -->
                            <!-- Width="24"：图标的宽度为24像素（数字越大图标越宽） -->
                            <!-- Stretch="Fill"：图标的拉伸方式为填充（Fill=完全填满指定尺寸可能变形，Uniform=等比例缩放不变形，None=保持原始大小） -->
                            <!-- Fill="{DynamicResource TertiaryTextColor}"：图标的填充颜色从主题配置文件中动态获取第三级文本颜色 -->
                            <!--   - DynamicResource：动态资源，可以在运行时改变（比如切换主题时颜色会自动更新） -->
                            <!--   - TertiaryTextColor：第三级文本颜色（通常是较浅的颜色，用于次要元素） -->
                            <!-- VerticalAlignment="Center"：图标在垂直方向的对齐方式为居中 -->
                            <!-- HorizontalAlignment="Right"：图标在水平方向的对齐方式为靠右 -->
                            <!-- Margin="0 0 5 0"：图标的外边距，格式为"左边距 上边距 右边距 下边距"，这里是右边距5像素（让图标离右边界有5像素的空隙） -->
                            <Path x:Name="Icon" Data="{Binding Tag,
                                      RelativeSource={RelativeSource AncestorType={x:Type RadioButton}}}"
                                      Height="24" Width="24"
                                      Stretch="Fill" Fill="{DynamicResource TertiaryTextColor}" VerticalAlignment="Center" HorizontalAlignment="Right" Margin="0 0 5 0"/>

                            <!-- TextBlock：文本显示块，用来显示按钮文字 -->
                            <!-- x:Name="txtName"：给这个文本块起名叫"txtName" -->
                            <!-- HorizontalAlignment="Left"：文本在水平方向靠左对齐 -->
                            <!-- VerticalAlignment="Center"：文本在垂直方向居中对齐 -->
                            <!-- Margin="12 0 0 0"：文本外边距，格式为"左 上 右 下"，这里是左边距12像素 -->
                            <!-- Grid.Column="1"：文本放在网格的第2列（从0开始计数，所以1是第二列） -->
                            <!-- Text="{TemplateBinding Content}"：文本内容从按钮的Content属性获取 -->
                            <!-- Foreground="{TemplateBinding Foreground}"：文本颜色从按钮的Foreground属性获取 -->
                            <!-- FontWeight="{TemplateBinding FontWeight}"：文本粗细从按钮的FontWeight属性获取 -->
                            <!-- FontSize="{TemplateBinding FontSize}"：文本大小从按钮的FontSize属性获取 -->
                            <!-- 如果不写任何绑定，属性会使用该元素(属性)的默认值((通常为null/透明); TemplateBinding会从应用模板的控件获取对应属性的值 -->
                            <TextBlock x:Name="txtName" HorizontalAlignment="Left"
                                           VerticalAlignment="Center" Margin="12 0 0 0"
                                           Grid.Column="1" Text="{TemplateBinding Content}"
                                           Foreground="{TemplateBinding Foreground}"
                                           FontWeight="{TemplateBinding FontWeight}"
                                           FontSize="{TemplateBinding FontSize}"/>
                        </Grid>

                    </Border>
                    <!-- ControlTemplate.Triggers：控件模板的触发器集合，用于响应不同状态变化 -->
                    <ControlTemplate.Triggers>
                        <!-- Trigger：触发器，当指定条件满足时执行相应动作 -->
                        <!-- Property="IsMouseOver"：监听鼠标是否悬停在按钮上 -->
                        <!-- Value="True"：当鼠标悬停时（IsMouseOver为True时）触发 -->
                        <Trigger Property="IsMouseOver" Value="True">
                            <!-- Setter：设置器，用来改变元素的属性值 -->
                            <!-- TargetName="txtName"：指定要改变的元素名称为"txtName" -->
                            <!-- Property="Foreground"：要改变的属性是前景色（文字颜色） -->
                            <!-- Value="{DynamicResource SecundaryTextColor}"：改变为主题中的次要文本颜色 -->
                            <Setter TargetName="txtName" Property="Foreground" Value="{DynamicResource SecundaryTextColor}"/>
                            <!-- TargetName="Icon"：指定要改变名为"Icon"的图标元素 -->
                            <!-- Property="Fill"：要改变图标的填充颜色 -->
                            <Setter TargetName="Icon" Property="Fill" Value="{DynamicResource SecundaryTextColor}"/>
                            <!-- TargetName="btnSelected"：指定要改变名为"btnSelected"的背景边框 -->
                            <!-- Property="Background"：要改变背景颜色 -->
                            <Setter TargetName="btnSelected" Property="Background" Value="{DynamicResource TertiaryBackgroundColor}"/>
                        </Trigger>
                        <!-- Property="IsChecked"：监听按钮是否被选中 -->
                        <!-- Value="True"：当按钮被选中时（IsChecked为True时）触发 -->
                        <Trigger Property="IsChecked" Value="True">
                            <!-- 选中时将图标颜色改为主要文本颜色（更突出） -->
                            <Setter TargetName="Icon" Property="Fill" Value="{DynamicResource PrimaryTextColor}"/>
                            <!-- 选中时显示绿色指示器（左边的小竖条变成绿色） -->
                            <Setter TargetName="Indicator" Property="Fill" Value="{DynamicResource SecundaryGreenColor}"/>
                            <!-- 选中时改变背景颜色 -->
                            <Setter TargetName="btnSelected" Property="Background" Value="{DynamicResource TertiaryBackgroundColor}"/>
                            <!-- 选中时将文本颜色改为主要文本颜色（更突出） -->
                            <Setter TargetName="txtName" Property="Foreground" Value="{DynamicResource PrimaryTextColor}"/>
                        </Trigger>
                    </ControlTemplate.Triggers>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>

    <!-- 切换按钮样式定义，用于开关类型的按钮 -->
    <Style x:Key="ToggleButtonStyle" TargetType="{x:Type ToggleButton}">
        <!-- 设置背景颜色为动态资源中的次要白色 -->
        <Setter Property="Background" Value="{DynamicResource SecundaryWhiteColor}"/>
        <!-- 设置边框画刷颜色为动态资源中的主要白色 -->
        <Setter Property="BorderBrush" Value="{DynamicResource PrimaryWhiteColor}"/>
        <!-- 设置控件高度为20像素 -->
        <Setter Property="Height" Value="20"/>
        <!-- 设置控件宽度为35像素 -->
        <Setter Property="Width" Value="35"/>
        <!-- 设置最大高度为20像素 -->
        <Setter Property="MaxHeight" Value="20"/>
        <!-- 设置最大宽度为35像素 -->
        <Setter Property="MaxWidth" Value="35"/>
        <!-- 设置控件模板 -->
        <Setter Property="Template">
            <Setter.Value>
                <!-- 切换按钮的控件模板定义 -->
                <ControlTemplate TargetType="{x:Type ToggleButton}">
                    <!-- 网格容器，用于放置开关的背景和滑块 -->
                    <Grid>
                        <!-- Border：开关的背景边框（椭圆形的背景轨道，滑块在其中滑动） -->
                        <!-- x:Name="Border"：给这个背景边框起名叫"Border"，方便动画效果中通过名字找到它并改变颜色 -->
                        <!-- Background="{TemplateBinding Background}"：背景颜色从使用这个模板的控件的Background属性继承 -->
                        <!-- CornerRadius="7"：边框的圆角半径为7像素（让背景看起来像椭圆形轨道） -->
                        <!-- Height="14"：背景轨道的高度为14像素 -->
                        <!-- Width="35"：背景轨道的宽度为35像素 -->
                        <!-- VerticalAlignment="Center"：背景在垂直方向居中对齐 -->
                        <!-- HorizontalAlignment="Center"：背景在水平方向居中对齐 -->
                        <Border x:Name="Border"
                            Background="{TemplateBinding Background}"
                            CornerRadius="7"
                            Height="14"
                            Width="35"
                            VerticalAlignment="Center"
                            HorizontalAlignment="Center">
                            <!-- 可选的阴影效果（已注释掉，如果启用会给背景添加投影效果） -->
                            <!--<Border.Effect>
                            <DropShadowEffect ShadowDepth="0.5" Opacity=".2"/>
                        </Border.Effect>-->
                        </Border>
                        <!-- Ellipse：椭圆形元素，用作开关的滑块（圆形的可移动按钮） -->
                        <!-- x:Name="Ellipse"：给这个滑块起名叫"Ellipse"，方便动画效果中通过名字找到它并移动位置 -->
                        <!-- Height="20"：滑块的高度为20像素（比背景轨道高14像素要大，所以会突出显示） -->
                        <!-- Width="20"：滑块的宽度为20像素（圆形，所以高度和宽度相等） -->
                        <!-- VerticalAlignment="Center"：滑块在垂直方向居中对齐 -->
                        <!-- HorizontalAlignment="Left"：滑块在水平方向靠左对齐（初始位置在左边，表示关闭状态） -->
                        <!-- Fill="{DynamicResource TertiaryWhiteColor}"：滑块的填充颜色从主题配置中动态获取第三级白色 -->
                        <!-- Stroke="{TemplateBinding BorderBrush}"：滑块的边框颜色从控件的BorderBrush属性继承 -->
                        <!-- StrokeThickness="3"：滑块边框的粗细为3像素（数字越大边框越粗） -->
                        <Ellipse x:Name="Ellipse"
                                 Height="20"
                                 Width="20"
                                 VerticalAlignment="Center"
                                 HorizontalAlignment="Left"
                                 Fill="{DynamicResource TertiaryWhiteColor}"
                                 Stroke="{TemplateBinding BorderBrush}"
                                 StrokeThickness="3">
                            <!-- 可选的阴影效果（已注释掉，如果启用会给滑块添加投影效果） -->
                            <!--<Ellipse.Effect>
                            <DropShadowEffect ShadowDepth="0.5" Opacity=".2"/>
                        </Ellipse.Effect>-->
                        </Ellipse>
                    </Grid>
                    <!-- 控件模板的触发器集合：这是一个装载各种触发条件和响应动作的容器 -->
                    <ControlTemplate.Triggers>
                        
                        <!-- 选中事件触发器：当用户点击按钮选中时自动执行的动作 -->
                        <EventTrigger RoutedEvent="Checked">
                            <!-- RoutedEvent="Checked" 参数说明：
                                 - RoutedEvent：指定要监听的事件类型
                                 - "Checked"：表示监听"被选中"这个事件
                                 - 理解：就像门铃，当有人按门铃(选中)时就会响(执行动画) -->
                            
                            <!-- 开始故事板动画：启动一系列预设的动画效果 -->
                            <BeginStoryboard>
                                <!-- 故事板：包含多个动画的容器，像电影脚本一样按顺序执行 -->
                                <Storyboard>
                                    
                                    <!-- 颜色动画：改变边框背景色为蓝色 -->
                                    <ColorAnimation Storyboard.TargetName="Border"
                                                    Storyboard.TargetProperty="(Border.Background).(SolidColorBrush.Color)"
                                                    To="#C2D1FC" Duration="0:0:0.2"/>
                                    <!-- 参数详细说明：
                                         - Storyboard.TargetName="Border"：指定要改变的目标元素名称是"Border"(边框)
                                         - Storyboard.TargetProperty：指定要改变的属性路径
                                           * (Border.Background)：边框的背景属性
                                           * (SolidColorBrush.Color)：纯色画刷的颜色属性
                                         - To="#C2D1FC"：目标颜色值，#C2D1FC是淡蓝色的十六进制代码
                                         - Duration="0:0:0.2"：动画持续时间，格式为"小时:分钟:秒.毫秒"，即0.2秒
                                         - 理解：就像给房间刷墙，0.2秒内从原色渐变到淡蓝色 -->
                                    
                                    <!-- 厚度动画：将滑块向右移动15像素 -->
                                    <ThicknessAnimation Storyboard.TargetName="Ellipse"
                                                        Storyboard.TargetProperty="Margin"
                                                        To="15 0 0 0" Duration="0:0:0.2"/>
                                    <!-- 参数详细说明：
                                         - Storyboard.TargetName="Ellipse"：指定要移动的目标元素是"Ellipse"(椭圆形滑块)
                                         - Storyboard.TargetProperty="Margin"：指定要改变的是外边距属性
                                         - To="15 0 0 0"：目标外边距值，四个数字分别代表：
                                           * 15：左边距15像素(向右推15像素)
                                           * 0：上边距0像素(不向上下移动)
                                           * 0：右边距0像素(不影响右侧空间)
                                           * 0：下边距0像素(不向上下移动)
                                         - Duration="0:0:0.2"：移动动画持续0.2秒
                                         - 理解：就像推拉门，0.2秒内滑块从左边滑到右边15像素的位置 -->
                                </Storyboard>
                            </BeginStoryboard>
                        </EventTrigger>
                        
                        <!-- 取消选中事件触发器：当用户取消选中按钮时自动执行的动作 -->
                        <EventTrigger RoutedEvent="Unchecked">
                            <!-- RoutedEvent="Unchecked" 参数说明：
                                 - "Unchecked"：表示监听"被取消选中"这个事件
                                 - 理解：就像关灯开关，当关闭(取消选中)时执行相应动作 -->
                            
                            <!-- 开始故事板动画：启动取消选中时的动画效果 -->
                            <BeginStoryboard>
                                <!-- 故事板：取消选中时的动画脚本 -->
                                <Storyboard>
                                    
                                    <!-- 颜色动画：改变边框背景色为灰色 -->
                                    <ColorAnimation Storyboard.TargetName="Border"
                                                    Storyboard.TargetProperty="(Border.Background).(SolidColorBrush.Color)"
                                                    To="#CECECE" Duration="0:0:0.2"/>
                                    <!-- 参数详细说明：
                                         - 目标元素和属性与上面相同
                                         - To="#CECECE"：目标颜色值，#CECECE是浅灰色的十六进制代码
                                         - 理解：0.2秒内从蓝色渐变回灰色，表示未选中状态 -->
                                    
                                    <!-- 厚度动画：将滑块移回左侧原位 -->
                                    <ThicknessAnimation Storyboard.TargetName="Ellipse"
                                                        Storyboard.TargetProperty="Margin"
                                                        To="0 0 0 0" Duration="0:0:0.2"/>
                                    <!-- 参数详细说明：
                                         - To="0 0 0 0"：目标外边距全部为0，即：
                                           * 0：左边距0像素(回到最左边)
                                           * 0：上边距0像素(保持垂直位置)
                                           * 0：右边距0像素(不占用右侧空间)
                                           * 0：下边距0像素(保持垂直位置)
                                         - 理解：滑块在0.2秒内从右边滑回到最左边的原始位置 -->
                                </Storyboard>
                            </BeginStoryboard>
                        </EventTrigger>

                        <!-- 选中状态触发器：根据选中状态改变外观，不涉及动画 -->
                        <Trigger Property="IsChecked" Value="True">
                            <!-- Property="IsChecked" 参数说明：
                                 - Property：指定要检查的属性名称
                                 - "IsChecked"：检查是否被选中的属性
                                 - Value="True"：当属性值为True(已选中)时触发
                                 - 理解：就像检查开关是否打开，如果打开就执行下面的设置 -->
                            
                            <!-- 选中时将滑块颜色改为绿色 -->
                            <Setter TargetName="Ellipse"
                                Property="Fill"
                                Value="{DynamicResource SecundaryGreenColor}"/>
                            <!-- 参数详细说明：
                                 - TargetName="Ellipse"：指定要改变的目标元素是椭圆形滑块
                                 - Property="Fill"：指定要改变的属性是填充颜色
                                 - Value="{DynamicResource SecundaryGreenColor}"：
                                   * DynamicResource：动态资源引用，可以实时更新
                                   * SecundaryGreenColor：预定义的绿色资源名称
                                 - 理解：当按钮被选中时，滑块立即变成绿色，表示激活状态 -->
                        </Trigger>
                    </ControlTemplate.Triggers>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>

    <!-- 图标按钮样式定义，专门用于小型图标按钮（如关闭、最小化等窗口控制按钮） -->
    <!-- Style：样式定义标签，用于创建可重复使用的外观设置 -->
    <!-- x:Key="IconButtonsStyle"：样式的唯一标识符，其他控件通过这个名称来引用此样式 -->
    <!-- TargetType="{x:Type Button}"：指定此样式只能应用于Button类型的控件 -->
    <Style x:Key="IconButtonsStyle" TargetType="{x:Type Button}">

        <!-- Setter：属性设置器，用于设置控件的各种属性值 -->
        <!-- Property="Background"：指定要设置的属性为背景色 -->
        <!-- Value="Transparent"：将背景色设置为完全透明（看不见背景） -->
        <Setter Property="Background" Value="Transparent"/>

        <!-- Property="Cursor"：指定要设置的属性为鼠标光标样式 -->
        <!-- Value="Hand"：当鼠标悬停在按钮上时，光标变为手型（表示可点击） -->
        <Setter Property="Cursor" Value="Hand"/>

        <!-- Property="BorderThickness"：指定要设置的属性为边框粗细 -->
        <!-- Value="0"：将边框粗细设置为0像素（即无边框，看不到边框线） -->
        <Setter Property="BorderThickness" Value="0"/>

        <!-- Property="Height"：指定要设置的属性为按钮高度 -->
        <!-- Value="25"：将按钮高度设置为25像素（比较小的按钮） -->
        <Setter Property="Height" Value="25"/>

        <!-- Property="Width"：指定要设置的属性为按钮宽度 -->
        <!-- Value="25"：将按钮宽度设置为25像素（正方形小按钮） -->
        <Setter Property="Width" Value="25"/>

        <!-- Property="Template"：指定要设置的属性为控件模板（控件的内部结构和外观） -->
        <Setter Property="Template">
            <Setter.Value>
                <!-- ControlTemplate：控件模板定义，用于完全自定义控件的外观和结构 -->
                <!-- TargetType="{x:Type Button}"：指定此模板适用于Button类型的控件 -->
                <ControlTemplate TargetType="{x:Type Button}">

                    <!-- Border：边框容器，用于包装按钮内容并提供背景和边框 -->
                    <!-- Name="bd"：给这个边框元素命名为"bd"，方便后续在触发器中引用 -->
                    <!-- CornerRadius="5"：设置边框圆角半径为5像素（让按钮看起来更圆润） -->
                    <!-- Background="{TemplateBinding Background}"：将边框背景绑定到按钮的Background属性 -->
                    <!-- BorderThickness="{TemplateBinding BorderThickness}"：将边框粗细绑定到按钮的BorderThickness属性 -->
                    <Border Name="bd" CornerRadius="5" Background="{TemplateBinding Background}" BorderThickness="{TemplateBinding BorderThickness}">

                        <!-- Path：路径图形元素，用于绘制矢量图标（如×、-、□等符号） -->
                        <!-- Name="ico"：给这个图标元素命名为"ico"，方便后续在触发器中引用 -->
                        <!-- Data="{TemplateBinding Content}"：将图标的路径数据绑定到按钮的Content属性（按钮内容就是图标数据） -->
                        <!-- Fill="{DynamicResource PrimaryTextColor}"：设置图标填充色为主要文本颜色（从资源字典动态获取） -->
                        <!-- Height="10"：设置图标高度为10像素 -->
                        <!-- Width="10"：设置图标宽度为10像素 -->
                        <!-- Stretch="Uniform"：设置图标缩放模式为等比例缩放（保持图标比例不变形） -->
                        <Path Name="ico" Data="{TemplateBinding Content}"
                          Fill="{DynamicResource PrimaryTextColor}" Height="10" Width="10" Stretch="Uniform"/>
                    </Border>

                    <!-- ControlTemplate.Triggers：控件模板触发器集合，用于定义按钮在不同状态下的外观变化 -->
                    <ControlTemplate.Triggers>

                        <!-- Trigger：单一条件触发器，当指定条件满足时执行相应的设置 -->
                        <!-- Property="IsMouseOver"：监听的属性为鼠标是否悬停在按钮上 -->
                        <!-- Value="True"：当鼠标悬停（IsMouseOver为True）时触发 -->
                        <Trigger Property="IsMouseOver" Value="True">
                            <!-- Setter：设置器，用于改变属性值 -->
                            <!-- Property="Background"：要改变的属性为背景色 -->
                            <!-- Value="{DynamicResource SecundaryBackgroundColor}"：将背景色改为次要背景色（从资源字典获取） -->
                            <Setter Property="Background" Value="{DynamicResource SecundaryBackgroundColor}"/>
                        </Trigger>

                        <!-- MultiTrigger：多条件触发器，当所有指定条件同时满足时才触发 -->
                        <MultiTrigger>
                            <!-- MultiTrigger.Conditions：多条件触发器的条件集合 -->
                            <MultiTrigger.Conditions>
                                <!-- Condition：单个触发条件 -->
                                <!-- Property="IsMouseOver"：监听的属性为鼠标是否悬停 -->
                                <!-- Value="True"：条件为鼠标正在悬停 -->
                                <Condition Property="IsMouseOver" Value="True"/>
                                <!-- Property="Tag"：监听的属性为按钮的标签属性（用于标识按钮类型） -->
                                <!-- Value="IsCloseButton"：条件为按钮标签等于"IsCloseButton"（表示这是关闭按钮） -->
                                <Condition Property="Tag" Value="IsCloseButton"/>
                            </MultiTrigger.Conditions>
                            <!-- 当上述两个条件同时满足时（鼠标悬停且是关闭按钮），执行以下设置 -->
                            <!-- Property="Background"：要改变的属性为背景色 -->
                            <!-- Value="#F72626"：将背景色设置为红色（#F72626是十六进制颜色代码，表示红色） -->
                            <Setter Property="Background" Value="#F72626"/>
                            <!-- TargetName="ico"：指定要改变的目标元素为名为"ico"的图标 -->
                            <!-- Property="Fill"：要改变的属性为图标填充色 -->
                            <!-- Value="#FFFFFF"：将图标颜色设置为白色（#FFFFFF是十六进制颜色代码，表示白色） -->
                            <Setter TargetName="ico" Property="Fill" Value="#FFFFFF"/>
                        </MultiTrigger>

                        <!-- 按钮按下状态触发器 -->
                        <!-- Property="IsPressed"：监听的属性为按钮是否被按下 -->
                        <!-- Value="True"：当按钮被按下（IsPressed为True）时触发 -->
                        <Trigger Property="IsPressed" Value="True">
                            <!-- TargetName="ico"：指定要改变的目标元素为名为"ico"的图标 -->
                            <!-- Property="Fill"：要改变的属性为图标填充色 -->
                            <!-- Value="{DynamicResource TertiaryTextColor}"：将图标颜色改为第三级文本颜色（从资源字典获取） -->
                            <Setter TargetName="ico" Property="Fill" Value="{DynamicResource TertiaryTextColor}"/>
                        </Trigger>
                    </ControlTemplate.Triggers>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>

    <!-- 设置按钮样式定义，专门用于较大的设置类按钮（如设置面板中的功能按钮） -->
    <!-- Style：样式定义标签，用于创建可重复使用的外观设置 -->
    <!-- x:Key="SettingButtonsStyle"：样式的唯一标识符，其他控件通过这个名称来引用此样式 -->
    <!-- TargetType="{x:Type Button}"：指定此样式只能应用于Button类型的控件 -->
    <Style x:Key="SettingButtonsStyle" TargetType="{x:Type Button}">

        <!-- Setter：属性设置器，用于设置控件的各种属性值 -->
        <!-- Property="Background"：指定要设置的属性为背景色 -->
        <!-- Value="Transparent"：将背景色设置为完全透明（看不见背景） -->
        <Setter Property="Background" Value="Transparent"/>

        <!-- Property="Cursor"：指定要设置的属性为鼠标光标样式 -->
        <!-- Value="Hand"：当鼠标悬停在按钮上时，光标变为手型（表示可点击） -->
        <Setter Property="Cursor" Value="Hand"/>

        <!-- Property="BorderThickness"：指定要设置的属性为边框粗细 -->
        <!-- Value="0"：将边框粗细设置为0像素（即无边框，看不到边框线） -->
        <Setter Property="BorderThickness" Value="0"/>

        <!-- Property="Height"：指定要设置的属性为按钮高度 -->
        <!-- Value="50"：将按钮高度设置为50像素（比IconButtonsStyle更大的按钮） -->
        <Setter Property="Height" Value="50"/>

        <!-- Property="Width"：指定要设置的属性为按钮宽度 -->
        <!-- Value="50"：将按钮宽度设置为50像素（正方形中等大小按钮） -->
        <Setter Property="Width" Value="50"/>

        <!-- Property="Template"：指定要设置的属性为控件模板（控件的内部结构和外观） -->
        <Setter Property="Template">
            <Setter.Value>
                <!-- ControlTemplate：控件模板定义，用于完全自定义控件的外观和结构 -->
                <!-- TargetType="{x:Type Button}"：指定此模板适用于Button类型的控件 -->
                <ControlTemplate TargetType="{x:Type Button}">

                    <!-- Border：边框容器，用于包装按钮内容并提供背景和边框 -->
                    <!-- Name="bd"：给这个边框元素命名为"bd"，方便后续在触发器中引用 -->
                    <!-- CornerRadius="5"：设置边框圆角半径为5像素（让按钮看起来更圆润） -->
                    <!-- Background="{TemplateBinding Background}"：将边框背景绑定到按钮的Background属性（模板绑定：让模板内的元素属性与使用该模板的控件属性保持同步） -->
                    <!-- BorderThickness="{TemplateBinding BorderThickness}"：将边框粗细绑定到按钮的BorderThickness属性 -->
                    <Border Name="bd" CornerRadius="5" Background="{TemplateBinding Background}" BorderThickness="{TemplateBinding BorderThickness}">

                        <!-- Path：路径图形元素，用于绘制矢量图标（如齿轮、文件夹等设置图标） -->
                        <!-- Name="ico"：给这个图标元素命名为"ico"，方便后续在触发器中引用 -->
                        <!-- Data="{TemplateBinding Content}"：将图标的路径数据绑定到按钮的Content属性（按钮内容就是图标数据） -->
                        <!-- Fill="{DynamicResource PrimaryTextColor}"：设置图标填充色为主要文本颜色（DynamicResource：动态资源加载，可以在运行时更新） -->
                        <!-- Height="30"：设置图标高度为30像素（比IconButtonsStyle的10像素更大） -->
                        <!-- Width="30"：设置图标宽度为30像素 -->
                        <!-- Stretch="Uniform"：设置图标缩放模式为等比例缩放（保持图标比例不变形，适应指定的高度和宽度） -->
                        <Path Name="ico" Data="{TemplateBinding Content}" Fill="{DynamicResource PrimaryTextColor}" Height="30" Width="30" Stretch="Uniform"/>
                    </Border>

                    <!-- ControlTemplate.Triggers：控件模板触发器集合，用于定义按钮在不同状态下的外观变化 -->
                    <ControlTemplate.Triggers>

                        <!-- Trigger：单一条件触发器，当指定条件满足时执行相应的设置 -->
                        <!-- Property="IsMouseOver"：监听的属性为鼠标是否悬停在按钮上 -->
                        <!-- Value="True"：当鼠标悬停（IsMouseOver为True）时触发 -->
                        <Trigger Property="IsMouseOver" Value="True">
                            <!-- Setter：设置器，用于改变属性值 -->
                            <!-- TargetName="ico"：指定要改变的目标元素为名为"ico"的图标 -->
                            <!-- Property="Fill"：要改变的属性为图标填充色 -->
                            <!-- Value="{DynamicResource SecundaryTextColor}"：将图标颜色改为次要文本颜色（从资源字典动态获取） -->
                            <Setter TargetName="ico" Property="Fill" Value="{DynamicResource SecundaryTextColor}"/>
                            <!-- Property="Background"：要改变的属性为背景色 -->
                            <!-- Value="{DynamicResource PrimaryBackgroundColor}"：将背景色改为主要背景色（从资源字典获取） -->
                            <Setter Property="Background" Value="{DynamicResource PrimaryBackgroundColor}"/>
                        </Trigger>

                        <!-- 按钮按下状态触发器 -->
                        <!-- Property="IsPressed"：监听的属性为按钮是否被按下 -->
                        <!-- Value="True"：当按钮被按下（IsPressed为True）时触发 -->
                        <Trigger Property="IsPressed" Value="True">
                            <!-- TargetName="ico"：指定要改变的目标元素为名为"ico"的图标 -->
                            <!-- Property="Fill"：要改变的属性为图标填充色 -->
                            <!-- Value="{DynamicResource TertiaryTextColor}"：将图标颜色改为第三级文本颜色（从资源字典获取，通常是较暗或较淡的颜色） -->
                            <Setter TargetName="ico" Property="Fill" Value="{DynamicResource TertiaryTextColor}"/>
                        </Trigger>
                    </ControlTemplate.Triggers>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>

    <!-- 普通圆角按钮样式 -->
    <Style x:Key="RoundedButtonStyle" TargetType="{x:Type Button}">
        <Setter Property="Background" Value="{DynamicResource PrimaryBackgroundColor}"/>
        <Setter Property="Foreground" Value="{DynamicResource PrimaryTextColor}"/>
        <Setter Property="BorderThickness" Value="0"/>
        <Setter Property="Cursor" Value="Hand"/>
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="{x:Type Button}">
                    <Border x:Name="border" 
                            Background="{TemplateBinding Background}" 
                            BorderThickness="{TemplateBinding BorderThickness}"
                            CornerRadius="10">
                        <ContentPresenter HorizontalAlignment="Center" 
                                          VerticalAlignment="Center"/>
                    </Border>
                    <ControlTemplate.Triggers>
                        <Trigger Property="IsMouseOver" Value="True">
                            <Setter TargetName="border" Property="Background" Value="{DynamicResource SecundaryBackgroundColor}"/>
                        </Trigger>
                        <Trigger Property="IsPressed" Value="True">
                            <Setter TargetName="border" Property="Background" Value="{DynamicResource TertiaryBackgroundColor}"/>
                        </Trigger>
                    </ControlTemplate.Triggers>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>
<!-- 资源字典结束标签 -->
</ResourceDictionary>
```

:::