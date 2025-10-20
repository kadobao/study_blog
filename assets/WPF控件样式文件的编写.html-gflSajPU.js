import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e,o as l}from"./app-DA0sIwlw.js";const i={};function t(p,n){return l(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="在wpf项目中创建按钮样式的完整指南" tabindex="-1"><a class="header-anchor" href="#在wpf项目中创建按钮样式的完整指南"><span>在WPF项目中创建按钮样式的完整指南</span></a></h1><p>结合<code>ButtonStyles.xaml</code>文件，详细讲解如何在WPF中创建自定义按钮样式。<code>ButtonStyles.xaml</code>文件定义了多种类型的按钮样式，包括菜单单选按钮、开关按钮、图标按钮等。</p><h2 id="一、按钮样式的基本结构" tabindex="-1"><a class="header-anchor" href="#一、按钮样式的基本结构"><span>一、按钮样式的基本结构</span></a></h2><p>在WPF中，按钮样式通常定义在资源字典文件中（如<code>ButtonStyles.xaml</code>），其基本结构如下：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;!-- 资源字典根元素 --&gt;</span></span>
<span class="line"><span>&lt;ResourceDictionary xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;</span></span>
<span class="line"><span>                    xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    &lt;!-- 按钮样式定义 --&gt;</span></span>
<span class="line"><span>    &lt;Style x:Key=&quot;StyleName&quot; TargetType=&quot;Button&quot;&gt;</span></span>
<span class="line"><span>        &lt;!-- 属性设置 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;PropertyName&quot; Value=&quot;PropertyValue&quot;/&gt;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        &lt;!-- 控件模板定义（可选，但可以完全自定义外观） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Template&quot;&gt;</span></span>
<span class="line"><span>            &lt;Setter.Value&gt;</span></span>
<span class="line"><span>                &lt;ControlTemplate TargetType=&quot;Button&quot;&gt;</span></span>
<span class="line"><span>                    &lt;!-- 模板内容 --&gt;</span></span>
<span class="line"><span>                &lt;/ControlTemplate&gt;</span></span>
<span class="line"><span>            &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>        &lt;/Setter&gt;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        &lt;!-- 触发器定义（可选，用于添加交互效果） --&gt;</span></span>
<span class="line"><span>        &lt;Style.Triggers&gt;</span></span>
<span class="line"><span>            &lt;!-- 触发器内容 --&gt;</span></span>
<span class="line"><span>        &lt;/Style.Triggers&gt;</span></span>
<span class="line"><span>    &lt;/Style&gt;</span></span>
<span class="line"><span>&lt;/ResourceDictionary&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、创建按钮样式的步骤详解" tabindex="-1"><a class="header-anchor" href="#二、创建按钮样式的步骤详解"><span>二、创建按钮样式的步骤详解</span></a></h2><h3 id="_1-定义样式的标识和目标类型" tabindex="-1"><a class="header-anchor" href="#_1-定义样式的标识和目标类型"><span>1. 定义样式的标识和目标类型</span></a></h3><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;!-- 定义样式的唯一标识和适用的控件类型 --&gt;</span></span>
<span class="line"><span>&lt;Style x:Key=&quot;MenuRadioButtonStyle&quot; TargetType=&quot;RadioButton&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- 样式内容 --&gt;</span></span>
<span class="line"><span>&lt;/Style&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>x:Key</code>：样式的唯一标识符，在XAML中通过这个名称引用样式</li><li><code>TargetType</code>：指定该样式适用于哪种类型的控件（Button、RadioButton、ToggleButton等）</li></ul><h3 id="_2-设置按钮的基本属性" tabindex="-1"><a class="header-anchor" href="#_2-设置按钮的基本属性"><span>2. 设置按钮的基本属性</span></a></h3><p>使用<code>&lt;Setter&gt;</code>元素设置按钮的基本属性，如背景色、前景色、字体等：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;!-- 设置按钮的基本属性 --&gt;</span></span>
<span class="line"><span>&lt;Setter Property=&quot;Background&quot; Value=&quot;Transparent&quot;/&gt;</span></span>
<span class="line"><span>&lt;Setter Property=&quot;Foreground&quot; Value=&quot;{DynamicResource TertiaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>&lt;Setter Property=&quot;FontFamily&quot; Value=&quot;Arial&quot;/&gt;</span></span>
<span class="line"><span>&lt;Setter Property=&quot;FontWeight&quot; Value=&quot;Bold&quot;/&gt;</span></span>
<span class="line"><span>&lt;Setter Property=&quot;FontSize&quot; Value=&quot;15&quot;/&gt;</span></span>
<span class="line"><span>&lt;Setter Property=&quot;Height&quot; Value=&quot;48&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ButtonStyles.xaml</code>文件大量使用了<code>{DynamicResource}</code>来引用颜色资源，这允许在运行时切换主题。</p><h3 id="_3-创建自定义控件模板-重点" tabindex="-1"><a class="header-anchor" href="#_3-创建自定义控件模板-重点"><span>3. 创建自定义控件模板（重点）</span></a></h3><p>控件模板是创建自定义外观的核心，通过它可以完全重新设计按钮的结构和外观：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;!-- 定义控件模板 --&gt;</span></span>
<span class="line"><span>&lt;Setter Property=&quot;Template&quot;&gt;</span></span>
<span class="line"><span>    &lt;Setter.Value&gt;</span></span>
<span class="line"><span>        &lt;ControlTemplate TargetType=&quot;RadioButton&quot;&gt;</span></span>
<span class="line"><span>            &lt;!-- 使用Border作为按钮的容器 --&gt;</span></span>
<span class="line"><span>            &lt;Border x:Name=&quot;menuButton&quot; Background=&quot;{TemplateBinding Background}&quot; BorderThickness=&quot;{TemplateBinding BorderThickness}&quot;&gt;</span></span>
<span class="line"><span>                &lt;!-- 使用Grid进行布局 --&gt;</span></span>
<span class="line"><span>                &lt;Grid&gt;</span></span>
<span class="line"><span>                    &lt;Grid.ColumnDefinitions&gt;</span></span>
<span class="line"><span>                        &lt;ColumnDefinition Width=&quot;45&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;ColumnDefinition/&gt;</span></span>
<span class="line"><span>                    &lt;/Grid.ColumnDefinitions&gt;</span></span>
<span class="line"><span>                    </span></span>
<span class="line"><span>                    &lt;!-- 添加选中指示器 --&gt;</span></span>
<span class="line"><span>                    &lt;Rectangle Name=&quot;Indicator&quot; Width=&quot;6&quot; Height=&quot;25&quot; .../&gt;</span></span>
<span class="line"><span>                    </span></span>
<span class="line"><span>                    &lt;!-- 添加图标 --&gt;</span></span>
<span class="line"><span>                    &lt;Path x:Name=&quot;Icon&quot; Data=&quot;{Binding Tag, RelativeSource={RelativeSource AncestorType={x:Type RadioButton}}}&quot; .../&gt;</span></span>
<span class="line"><span>                    </span></span>
<span class="line"><span>                    &lt;!-- 添加文本 --&gt;</span></span>
<span class="line"><span>                    &lt;TextBlock x:Name=&quot;txtName&quot; Text=&quot;{TemplateBinding Content}&quot; .../&gt;</span></span>
<span class="line"><span>                &lt;/Grid&gt;</span></span>
<span class="line"><span>            &lt;/Border&gt;</span></span>
<span class="line"><span>        &lt;/ControlTemplate&gt;</span></span>
<span class="line"><span>    &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>&lt;/Setter&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在模板中，通常使用以下元素：</p><ul><li><strong>布局容器</strong>：如Grid、StackPanel等，用于组织按钮内部元素</li><li><strong>视觉元素</strong>：如Border、Rectangle、Path等，用于创建按钮的视觉效果</li><li><strong>内容呈现器</strong>：如ContentPresenter，用于显示按钮的Content属性内容</li></ul><h3 id="_4-添加交互效果-使用触发器" tabindex="-1"><a class="header-anchor" href="#_4-添加交互效果-使用触发器"><span>4. 添加交互效果（使用触发器）</span></a></h3><p>触发器用于在按钮处于不同状态时（如鼠标悬停、按下、选中）改变其外观：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;!-- 添加触发器定义 --&gt;</span></span>
<span class="line"><span>&lt;ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>    &lt;!-- 鼠标悬停触发器 --&gt;</span></span>
<span class="line"><span>    &lt;Trigger Property=&quot;IsMouseOver&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>        &lt;Setter TargetName=&quot;txtName&quot; Property=&quot;Foreground&quot; Value=&quot;{DynamicResource SecundaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>        &lt;Setter TargetName=&quot;Icon&quot; Property=&quot;Fill&quot; Value=&quot;{DynamicResource SecundaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/Trigger&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    &lt;!-- 选中状态触发器 --&gt;</span></span>
<span class="line"><span>    &lt;Trigger Property=&quot;IsChecked&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>        &lt;Setter TargetName=&quot;Indicator&quot; Property=&quot;Fill&quot; Value=&quot;{DynamicResource SecundaryGreenColor}&quot;/&gt;</span></span>
<span class="line"><span>        &lt;Setter TargetName=&quot;btnSelected&quot; Property=&quot;Background&quot; Value=&quot;{DynamicResource TertiaryBackgroundColor}&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/Trigger&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    &lt;!-- 事件触发器（可添加动画效果） --&gt;</span></span>
<span class="line"><span>    &lt;EventTrigger RoutedEvent=&quot;Checked&quot;&gt;</span></span>
<span class="line"><span>        &lt;BeginStoryboard&gt;</span></span>
<span class="line"><span>            &lt;Storyboard&gt;</span></span>
<span class="line"><span>                &lt;!-- 颜色动画 --&gt;</span></span>
<span class="line"><span>                &lt;ColorAnimation Storyboard.TargetName=&quot;Border&quot; </span></span>
<span class="line"><span>                                Storyboard.TargetProperty=&quot;(Border.Background).(SolidColorBrush.Color)&quot; </span></span>
<span class="line"><span>                                To=&quot;#C2D1FC&quot; Duration=&quot;0:0:0.2&quot;/&gt;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                &lt;!-- 位置动画 --&gt;</span></span>
<span class="line"><span>                &lt;ThicknessAnimation Storyboard.TargetName=&quot;Ellipse&quot; </span></span>
<span class="line"><span>                                   Storyboard.TargetProperty=&quot;Margin&quot; </span></span>
<span class="line"><span>                                   To=&quot;15 0 0 0&quot; Duration=&quot;0:0:0.2&quot;/&gt;</span></span>
<span class="line"><span>            &lt;/Storyboard&gt;</span></span>
<span class="line"><span>        &lt;/BeginStoryboard&gt;</span></span>
<span class="line"><span>    &lt;/EventTrigger&gt;</span></span>
<span class="line"><span>&lt;/ControlTemplate.Triggers&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ButtonStyles.xaml</code>文件使用了三种类型的触发器：</p><ul><li><strong>Trigger</strong>：基于属性值的触发器</li><li><strong>MultiTrigger</strong>：基于多个属性值的触发器</li><li><strong>EventTrigger</strong>：基于事件的触发器，可添加动画效果</li></ul><h3 id="_5-在应用程序中引入和使用样式" tabindex="-1"><a class="header-anchor" href="#_5-在应用程序中引入和使用样式"><span>5. 在应用程序中引入和使用样式</span></a></h3><p>在<code>App.xaml</code>中引入样式资源字典：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;Application.Resources&gt;</span></span>
<span class="line"><span>    &lt;ResourceDictionary&gt;</span></span>
<span class="line"><span>        &lt;ResourceDictionary.MergedDictionaries&gt;</span></span>
<span class="line"><span>            &lt;!-- 引入按钮样式资源 --&gt;</span></span>
<span class="line"><span>            &lt;ResourceDictionary Source=&quot;Styles/ButtonStyles.xaml&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/ResourceDictionary.MergedDictionaries&gt;</span></span>
<span class="line"><span>    &lt;/ResourceDictionary&gt;</span></span>
<span class="line"><span>&lt;/Application.Resources&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在XAML中使用样式：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;!-- 使用按钮样式 --&gt;</span></span>
<span class="line"><span>&lt;RadioButton Content=&quot;主页&quot; </span></span>
<span class="line"><span>             Style=&quot;{DynamicResource MenuRadioButtonStyle}&quot; </span></span>
<span class="line"><span>             Tag=&quot;{DynamicResource home}&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、项目中的按钮样式类型" tabindex="-1"><a class="header-anchor" href="#三、项目中的按钮样式类型"><span>三、项目中的按钮样式类型</span></a></h2><p><code>ButtonStyles.xaml</code>文件定义了五种主要的按钮样式，每种适用于不同场景：</p><ol><li><strong>MenuRadioButtonStyle</strong>：菜单单选按钮，带有图标和文本，适用于侧边栏导航</li><li><strong>ToggleButtonStyle</strong>：开关按钮，带有滑块动画效果，适用于开关设置</li><li><strong>IconButtonsStyle</strong>：小型图标按钮，适用于窗口控制按钮（关闭、最小化等）</li><li><strong>SettingButtonsStyle</strong>：中型设置按钮，适用于设置面板</li><li><strong>RoundedButtonStyle</strong>：普通圆角按钮，适用于通用按钮场景</li></ol><h2 id="四、创建自定义按钮样式的示例" tabindex="-1"><a class="header-anchor" href="#四、创建自定义按钮样式的示例"><span>四、创建自定义按钮样式的示例</span></a></h2><p>下面是创建一个新的渐变按钮样式的示例：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;!-- 自定义渐变按钮样式 --&gt;</span></span>
<span class="line"><span>&lt;Style x:Key=&quot;GradientButtonStyle&quot; TargetType=&quot;Button&quot;&gt;</span></span>
<span class="line"><span>    &lt;Setter Property=&quot;Foreground&quot; Value=&quot;White&quot;/&gt;</span></span>
<span class="line"><span>    &lt;Setter Property=&quot;FontWeight&quot; Value=&quot;Bold&quot;/&gt;</span></span>
<span class="line"><span>    &lt;Setter Property=&quot;Padding&quot; Value=&quot;12,6&quot;/&gt;</span></span>
<span class="line"><span>    &lt;Setter Property=&quot;Cursor&quot; Value=&quot;Hand&quot;/&gt;</span></span>
<span class="line"><span>    &lt;Setter Property=&quot;Template&quot;&gt;</span></span>
<span class="line"><span>        &lt;Setter.Value&gt;</span></span>
<span class="line"><span>            &lt;ControlTemplate TargetType=&quot;Button&quot;&gt;</span></span>
<span class="line"><span>                &lt;Border x:Name=&quot;border&quot; CornerRadius=&quot;8&quot; Padding=&quot;{TemplateBinding Padding}&quot;&gt;</span></span>
<span class="line"><span>                    &lt;!-- 渐变背景 --&gt;</span></span>
<span class="line"><span>                    &lt;Border.Background&gt;</span></span>
<span class="line"><span>                        &lt;LinearGradientBrush StartPoint=&quot;0,0&quot; EndPoint=&quot;1,1&quot;&gt;</span></span>
<span class="line"><span>                            &lt;GradientStop Offset=&quot;0&quot; Color=&quot;{DynamicResource PrimaryBlueColor}&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;GradientStop Offset=&quot;1&quot; Color=&quot;{DynamicResource PrimaryTealColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/LinearGradientBrush&gt;</span></span>
<span class="line"><span>                    &lt;/Border.Background&gt;</span></span>
<span class="line"><span>                    &lt;ContentPresenter HorizontalAlignment=&quot;Center&quot; VerticalAlignment=&quot;Center&quot;/&gt;</span></span>
<span class="line"><span>                &lt;/Border&gt;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                &lt;!-- 触发器 --&gt;</span></span>
<span class="line"><span>                &lt;ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                    &lt;Trigger Property=&quot;IsMouseOver&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                        &lt;Setter TargetName=&quot;border&quot; Property=&quot;Opacity&quot; Value=&quot;0.9&quot;/&gt;</span></span>
<span class="line"><span>                    &lt;/Trigger&gt;</span></span>
<span class="line"><span>                    &lt;Trigger Property=&quot;IsPressed&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                        &lt;Setter TargetName=&quot;border&quot; Property=&quot;Opacity&quot; Value=&quot;0.8&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;Setter TargetName=&quot;border&quot; Property=&quot;RenderTransform&quot;&gt;</span></span>
<span class="line"><span>                            &lt;Setter.Value&gt;</span></span>
<span class="line"><span>                                &lt;ScaleTransform ScaleX=&quot;0.98&quot; ScaleY=&quot;0.98&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>                        &lt;/Setter&gt;</span></span>
<span class="line"><span>                    &lt;/Trigger&gt;</span></span>
<span class="line"><span>                &lt;/ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>            &lt;/ControlTemplate&gt;</span></span>
<span class="line"><span>        &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>    &lt;/Setter&gt;</span></span>
<span class="line"><span>&lt;/Style&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、属性冲突解决方案" tabindex="-1"><a class="header-anchor" href="#五、属性冲突解决方案"><span>五、属性冲突解决方案</span></a></h2><p>当基本属性和控件模板存在冲突时，解决办法是：</p><ol><li>在Style的Setter中定义公共属性</li><li>在模板中通过TemplateBinding引用这些属性</li></ol><h2 id="六、staticresource与dynamicresource的区别" tabindex="-1"><a class="header-anchor" href="#六、staticresource与dynamicresource的区别"><span>六、StaticResource与DynamicResource的区别</span></a></h2><p><code>ButtonStyles.xaml</code>文件同时使用了StaticResource和DynamicResource，它们的主要区别是：</p><ul><li><strong>StaticResource</strong>：在XAML加载时一次性解析资源引用，如果资源发生变化，引用不会自动更新</li><li><strong>DynamicResource</strong>：在运行时动态解析资源引用，当资源发生变化时（如主题切换），引用会自动更新</li></ul><p>在<code>ButtonStyles.xaml</code>文件中，DynamicResource更多用于可能需要在运行时改变的资源，如主题相关的颜色和样式。</p><h2 id="七、使用资源文件" tabindex="-1"><a class="header-anchor" href="#七、使用资源文件"><span>七、使用资源文件</span></a></h2><p>资源引用格式：<code>{DynamicResource 资源名}</code> 或 <code>{StaticResource 资源名}</code></p><p>例如，对于定义如下的资源：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;SolidColorBrush x:Key=&quot;SecundaryTextColor&quot; Color=&quot;#2C2C2E&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>可以这样引用：</p><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;Setter Property=&quot;Background&quot; Value=&quot;{DynamicResource SecundaryWhiteColor}&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="八、小结" tabindex="-1"><a class="header-anchor" href="#八、小结"><span>八、小结</span></a></h2><p>创建WPF按钮样式的核心步骤包括：</p><ol><li><strong>定义样式结构</strong>：设置<code>x:Key</code>和<code>TargetType</code></li><li><strong>设置基本属性</strong>：使用<code>Setter</code>设置控件属性</li><li><strong>创建控件模板</strong>：通过<code>Setter Property=&quot;Template&quot;</code>定义按钮的视觉结构和布局</li><li><strong>添加交互效果</strong>：使用<code>ControlTemplate.Triggers</code>触发器实现状态变化和动画</li><li><strong>引入和使用</strong>：在应用程序中引入并应用样式</li></ol><details class="hint-container details"><summary><code>ButtonStyles.xaml</code>文件</summary><div class="language-xaml line-numbers-mode" data-highlighter="shiki" data-ext="xaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xaml"><span class="line"><span>&lt;!-- 资源字典根元素：这是一个&quot;样式仓库&quot;，存储所有可重用的按钮样式 --&gt;</span></span>
<span class="line"><span>&lt;!-- xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;：告诉系统这是WPF界面文件 --&gt;</span></span>
<span class="line"><span>&lt;!-- xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;：引入XAML语言的基本功能 --&gt;</span></span>
<span class="line"><span>&lt;ResourceDictionary xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;</span></span>
<span class="line"><span>                    xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- 菜单单选按钮样式定义 --&gt;</span></span>
<span class="line"><span>    &lt;!-- x:Key=&quot;MenuRadioButtonStyle&quot;：给这个样式起名叫&quot;MenuRadioButtonStyle&quot;，就像给文件夹起名一样 --&gt;</span></span>
<span class="line"><span>    &lt;!-- TargetType=&quot;RadioButton&quot;：这个样式专门用于RadioButton（单选按钮）控件 --&gt;</span></span>
<span class="line"><span>    &lt;Style x:Key=&quot;MenuRadioButtonStyle&quot; TargetType=&quot;RadioButton&quot;&gt;</span></span>
<span class="line"><span>        &lt;!-- &lt;Setter&gt;元素用于设置控件的各种属性 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Background&quot;：设置按钮的背景颜色属性 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;Transparent&quot;：背景颜色设为透明（看不见背景） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Background&quot; Value=&quot;Transparent&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Foreground&quot;：设置按钮文字的颜色属性 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;{DynamicResource TertiaryTextColor}&quot;：文字颜色从主题配置文件中动态获取第三级文本颜色 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Foreground&quot; Value=&quot;{DynamicResource TertiaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;FontFamily&quot;：设置按钮文字的字体类型 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;Arial&quot;：使用Arial字体（一种常见的英文字体） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;FontFamily&quot; Value=&quot;Arial&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;FontWeight&quot;：设置按钮文字的粗细程度 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;Bold&quot;：设为粗体（Bold=粗体，Normal=正常） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;FontWeight&quot; Value=&quot;Bold&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;FontSize&quot;：设置按钮文字的大小 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;15&quot;：文字大小为15像素（数字越大文字越大） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;FontSize&quot; Value=&quot;15&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Height&quot;：设置按钮的高度尺寸 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;48&quot;：按钮高度为48像素 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Height&quot; Value=&quot;48&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Template&quot;：设置按钮的外观模板（就像给按钮换&quot;外衣&quot;） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Template&quot;&gt;</span></span>
<span class="line"><span>            &lt;Setter.Value&gt;</span></span>
<span class="line"><span>                &lt;!-- ControlTemplate：控件模板，用来完全重新设计按钮的外观 --&gt;</span></span>
<span class="line"><span>                &lt;!-- TargetType=&quot;RadioButton&quot;：这个模板专门为RadioButton设计 --&gt;</span></span>
<span class="line"><span>                &lt;ControlTemplate TargetType=&quot;RadioButton&quot;&gt;</span></span>
<span class="line"><span>                    &lt;!-- Border：边框容器，就像给按钮加一个&quot;相框&quot; --&gt;</span></span>
<span class="line"><span>                    &lt;!-- x:Name=&quot;menuButton&quot;：给这个边框起名叫&quot;menuButton&quot;，方便后面引用 --&gt;</span></span>
<span class="line"><span>                    &lt;!-- Background=&quot;{TemplateBinding Background}&quot;：边框背景色继承按钮的背景色设置 --&gt;</span></span>
<span class="line"><span>                    &lt;!-- BorderThickness=&quot;{TemplateBinding BorderThickness}&quot;：边框粗细继承按钮的边框设置 --&gt;</span></span>
<span class="line"><span>                    &lt;Border x:Name=&quot;menuButton&quot; Background=&quot;{TemplateBinding Background}&quot; BorderThickness=&quot;{TemplateBinding BorderThickness}&quot;&gt;</span></span>
<span class="line"><span>                        &lt;!-- Grid：网格布局容器，就像把按钮内部划分成格子来摆放东西 --&gt;</span></span>
<span class="line"><span>                        &lt;Grid&gt;</span></span>
<span class="line"><span>                            &lt;!-- Grid.ColumnDefinitions：定义网格有几列，每列多宽 --&gt;</span></span>
<span class="line"><span>                            &lt;Grid.ColumnDefinitions&gt;</span></span>
<span class="line"><span>                                &lt;!-- ColumnDefinition：定义一列的属性 --&gt;</span></span>
<span class="line"><span>                                &lt;!-- Width=&quot;45&quot;：第一列固定宽度45像素，专门放图标 --&gt;</span></span>
<span class="line"><span>                                &lt;ColumnDefinition Width=&quot;45&quot;/&gt;</span></span>
<span class="line"><span>                                &lt;!-- ColumnDefinition：定义第二列 --&gt;</span></span>
<span class="line"><span>                                &lt;!-- 没写Width表示自动宽度，占用剩余所有空间，专门放文字 --&gt;</span></span>
<span class="line"><span>                                &lt;ColumnDefinition/&gt;</span></span>
<span class="line"><span>                            &lt;/Grid.ColumnDefinitions&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                            &lt;!-- Border：选中状态的背景边框（当按钮被选中时显示的背景） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- x:Name=&quot;btnSelected&quot;：给这个背景边框起名叫&quot;btnSelected&quot; --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Grid.ColumnSpan=&quot;2&quot;：这个背景横跨2列（占满整个按钮宽度） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- CornerRadius=&quot;10&quot;：背景的圆角半径为10像素（数字越大越圆） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Width=&quot;225&quot;：背景宽度为225像素 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- HorizontalAlignment=&quot;Right&quot;：背景在水平方向靠右对齐 --&gt;</span></span>
<span class="line"><span>                            &lt;Border x:Name=&quot;btnSelected&quot;</span></span>
<span class="line"><span>                                        Grid.ColumnSpan=&quot;2&quot;</span></span>
<span class="line"><span>                                        CornerRadius=&quot;10&quot;</span></span>
<span class="line"><span>                                        HorizontalAlignment=&quot;Stretch&quot;&gt;</span></span>
<span class="line"><span>                            &lt;/Border&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                            &lt;!-- Rectangle：矩形形状元素，用作选中指示器（按钮左边的小竖条，表示当前按钮被选中） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Name=&quot;Indicator&quot;：给这个指示器起名叫&quot;Indicator&quot;，方便后面的触发器通过名字找到它并改变颜色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- HorizontalAlignment=&quot;Left&quot;：指示器在水平方向的对齐方式为靠左（Left=靠左边，Center=居中，Right=靠右边） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Width=&quot;6&quot;：指示器的宽度为6像素（像素是屏幕上最小的点，6像素很细，形成一条细竖线） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Height=&quot;25&quot;：指示器的高度为25像素（比按钮高度48像素要小，所以不会占满整个按钮高度） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- VerticalAlignment=&quot;Center&quot;：指示器在垂直方向的对齐方式为居中（Top=靠上，Center=居中，Bottom=靠下） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- RadiusX=&quot;3&quot;：指示器左右两边的圆角半径为3像素（让竖条的左右两边变圆润，不那么尖锐） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- RadiusY=&quot;3&quot;：指示器上下两边的圆角半径为3像素（让竖条的上下两边变圆润，整体看起来像胶囊形状） --&gt;</span></span>
<span class="line"><span>                            &lt;Rectangle Name=&quot;Indicator&quot;</span></span>
<span class="line"><span>                                           HorizontalAlignment=&quot;Left&quot;</span></span>
<span class="line"><span>                                           Width=&quot;6&quot; Height=&quot;25&quot;</span></span>
<span class="line"><span>                                           VerticalAlignment=&quot;Center&quot;</span></span>
<span class="line"><span>                                           RadiusX=&quot;3&quot; RadiusY=&quot;3&quot;&gt;</span></span>
<span class="line"><span>                                &lt;!-- Rectangle.BitmapEffect：给这个矩形指示器添加视觉特效（让它看起来更有立体感和美观） --&gt;</span></span>
<span class="line"><span>                                &lt;Rectangle.Effect&gt;</span></span>
<span class="line"><span>                                    &lt;!-- DropShadowEffect：投影阴影效果（在指示器后面添加一个阴影，就像现实中物体在灯光下的投影） --&gt;</span></span>
<span class="line"><span>                                    &lt;!-- ShadowDepth=&quot;3&quot;：阴影深度3像素（阴影离指示器的距离，数字越大阴影离得越远，立体感越强） --&gt;</span></span>
<span class="line"><span>                                    &lt;!-- Direction=&quot;0&quot;：阴影投射的方向为0度（0度=向右投影，90度=向下投影，180度=向左投影，270度=向上投影） --&gt;</span></span>
<span class="line"><span>                                    &lt;!-- Color=&quot;#5B8DEF&quot;：阴影的颜色为蓝色（#5B8DEF是十六进制颜色代码，#后面6位数字代表红绿蓝三种颜色的组合） --&gt;</span></span>
<span class="line"><span>                                    &lt;!-- Softness=&quot;0.6&quot;：阴影的柔和度为0.6（0=完全锐利的硬阴影边缘，1=完全模糊的软阴影边缘，0.6是中等柔和） --&gt;</span></span>
<span class="line"><span>                                    &lt;DropShadowEffect </span></span>
<span class="line"><span>                                        ShadowDepth=&quot;3&quot;</span></span>
<span class="line"><span>                                        Direction=&quot;0&quot;</span></span>
<span class="line"><span>                                        Color=&quot;#5B8DEF&quot;</span></span>
<span class="line"><span>                                        BlurRadius=&quot;10&quot;</span></span>
<span class="line"><span>                                        Opacity=&quot;0.6&quot;/&gt;</span></span>
<span class="line"><span>                                &lt;/Rectangle.Effect&gt;</span></span>
<span class="line"><span>                            &lt;/Rectangle&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                            &lt;!-- Path：路径图形元素，用来显示图标（可以是任何矢量图形，如箭头、齿轮、文件夹等形状） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- x:Name=&quot;Icon&quot;：给这个图标元素起名叫&quot;Icon&quot;，方便后面的触发器通过名字找到它并改变颜色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Data=&quot;{Binding Tag, RelativeSource={RelativeSource AncestorType={x:Type RadioButton}}}&quot;：图标的形状数据从父级RadioButton控件的Tag属性获取 --&gt;</span></span>
<span class="line"><span>                            &lt;!--   - Binding Tag：绑定到Tag属性（Tag是一个可以存储任意数据的属性，这里存储图标的路径数据） --&gt;</span></span>
<span class="line"><span>                            &lt;!--   - RelativeSource：指定数据来源的相对位置 --&gt;</span></span>
<span class="line"><span>                            &lt;!--   - AncestorType={x:Type RadioButton}：向上查找到RadioButton类型的祖先控件 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Height=&quot;24&quot;：图标的高度为24像素（数字越大图标越高） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Width=&quot;24&quot;：图标的宽度为24像素（数字越大图标越宽） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Stretch=&quot;Fill&quot;：图标的拉伸方式为填充（Fill=完全填满指定尺寸可能变形，Uniform=等比例缩放不变形，None=保持原始大小） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Fill=&quot;{DynamicResource TertiaryTextColor}&quot;：图标的填充颜色从主题配置文件中动态获取第三级文本颜色 --&gt;</span></span>
<span class="line"><span>                            &lt;!--   - DynamicResource：动态资源，可以在运行时改变（比如切换主题时颜色会自动更新） --&gt;</span></span>
<span class="line"><span>                            &lt;!--   - TertiaryTextColor：第三级文本颜色（通常是较浅的颜色，用于次要元素） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- VerticalAlignment=&quot;Center&quot;：图标在垂直方向的对齐方式为居中 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- HorizontalAlignment=&quot;Right&quot;：图标在水平方向的对齐方式为靠右 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Margin=&quot;0 0 5 0&quot;：图标的外边距，格式为&quot;左边距 上边距 右边距 下边距&quot;，这里是右边距5像素（让图标离右边界有5像素的空隙） --&gt;</span></span>
<span class="line"><span>                            &lt;Path x:Name=&quot;Icon&quot; Data=&quot;{Binding Tag,</span></span>
<span class="line"><span>                                      RelativeSource={RelativeSource AncestorType={x:Type RadioButton}}}&quot;</span></span>
<span class="line"><span>                                      Height=&quot;24&quot; Width=&quot;24&quot;</span></span>
<span class="line"><span>                                      Stretch=&quot;Fill&quot; Fill=&quot;{DynamicResource TertiaryTextColor}&quot; VerticalAlignment=&quot;Center&quot; HorizontalAlignment=&quot;Right&quot; Margin=&quot;0 0 5 0&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                            &lt;!-- TextBlock：文本显示块，用来显示按钮文字 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- x:Name=&quot;txtName&quot;：给这个文本块起名叫&quot;txtName&quot; --&gt;</span></span>
<span class="line"><span>                            &lt;!-- HorizontalAlignment=&quot;Left&quot;：文本在水平方向靠左对齐 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- VerticalAlignment=&quot;Center&quot;：文本在垂直方向居中对齐 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Margin=&quot;12 0 0 0&quot;：文本外边距，格式为&quot;左 上 右 下&quot;，这里是左边距12像素 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Grid.Column=&quot;1&quot;：文本放在网格的第2列（从0开始计数，所以1是第二列） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Text=&quot;{TemplateBinding Content}&quot;：文本内容从按钮的Content属性获取 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Foreground=&quot;{TemplateBinding Foreground}&quot;：文本颜色从按钮的Foreground属性获取 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- FontWeight=&quot;{TemplateBinding FontWeight}&quot;：文本粗细从按钮的FontWeight属性获取 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- FontSize=&quot;{TemplateBinding FontSize}&quot;：文本大小从按钮的FontSize属性获取 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- 如果不写任何绑定，属性会使用该元素(属性)的默认值((通常为null/透明); TemplateBinding会从应用模板的控件获取对应属性的值 --&gt;</span></span>
<span class="line"><span>                            &lt;TextBlock x:Name=&quot;txtName&quot; HorizontalAlignment=&quot;Left&quot;</span></span>
<span class="line"><span>                                           VerticalAlignment=&quot;Center&quot; Margin=&quot;12 0 0 0&quot;</span></span>
<span class="line"><span>                                           Grid.Column=&quot;1&quot; Text=&quot;{TemplateBinding Content}&quot;</span></span>
<span class="line"><span>                                           Foreground=&quot;{TemplateBinding Foreground}&quot;</span></span>
<span class="line"><span>                                           FontWeight=&quot;{TemplateBinding FontWeight}&quot;</span></span>
<span class="line"><span>                                           FontSize=&quot;{TemplateBinding FontSize}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Grid&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    &lt;/Border&gt;</span></span>
<span class="line"><span>                    &lt;!-- ControlTemplate.Triggers：控件模板的触发器集合，用于响应不同状态变化 --&gt;</span></span>
<span class="line"><span>                    &lt;ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                        &lt;!-- Trigger：触发器，当指定条件满足时执行相应动作 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Property=&quot;IsMouseOver&quot;：监听鼠标是否悬停在按钮上 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Value=&quot;True&quot;：当鼠标悬停时（IsMouseOver为True时）触发 --&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsMouseOver&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- Setter：设置器，用来改变元素的属性值 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- TargetName=&quot;txtName&quot;：指定要改变的元素名称为&quot;txtName&quot; --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Foreground&quot;：要改变的属性是前景色（文字颜色） --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Value=&quot;{DynamicResource SecundaryTextColor}&quot;：改变为主题中的次要文本颜色 --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;txtName&quot; Property=&quot;Foreground&quot; Value=&quot;{DynamicResource SecundaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;!-- TargetName=&quot;Icon&quot;：指定要改变名为&quot;Icon&quot;的图标元素 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Fill&quot;：要改变图标的填充颜色 --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;Icon&quot; Property=&quot;Fill&quot; Value=&quot;{DynamicResource SecundaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;!-- TargetName=&quot;btnSelected&quot;：指定要改变名为&quot;btnSelected&quot;的背景边框 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Background&quot;：要改变背景颜色 --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;btnSelected&quot; Property=&quot;Background&quot; Value=&quot;{DynamicResource TertiaryBackgroundColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span>                        &lt;!-- Property=&quot;IsChecked&quot;：监听按钮是否被选中 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Value=&quot;True&quot;：当按钮被选中时（IsChecked为True时）触发 --&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsChecked&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- 选中时将图标颜色改为主要文本颜色（更突出） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;Icon&quot; Property=&quot;Fill&quot; Value=&quot;{DynamicResource PrimaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;!-- 选中时显示绿色指示器（左边的小竖条变成绿色） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;Indicator&quot; Property=&quot;Fill&quot; Value=&quot;{DynamicResource SecundaryGreenColor}&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;!-- 选中时改变背景颜色 --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;btnSelected&quot; Property=&quot;Background&quot; Value=&quot;{DynamicResource TertiaryBackgroundColor}&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;!-- 选中时将文本颜色改为主要文本颜色（更突出） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;txtName&quot; Property=&quot;Foreground&quot; Value=&quot;{DynamicResource PrimaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span>                    &lt;/ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                &lt;/ControlTemplate&gt;</span></span>
<span class="line"><span>            &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>        &lt;/Setter&gt;</span></span>
<span class="line"><span>    &lt;/Style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 切换按钮样式定义，用于开关类型的按钮 --&gt;</span></span>
<span class="line"><span>    &lt;Style x:Key=&quot;ToggleButtonStyle&quot; TargetType=&quot;{x:Type ToggleButton}&quot;&gt;</span></span>
<span class="line"><span>        &lt;!-- 设置背景颜色为动态资源中的次要白色 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Background&quot; Value=&quot;{DynamicResource SecundaryWhiteColor}&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- 设置边框画刷颜色为动态资源中的主要白色 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;BorderBrush&quot; Value=&quot;{DynamicResource PrimaryWhiteColor}&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- 设置控件高度为20像素 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Height&quot; Value=&quot;20&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- 设置控件宽度为35像素 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Width&quot; Value=&quot;35&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- 设置最大高度为20像素 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;MaxHeight&quot; Value=&quot;20&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- 设置最大宽度为35像素 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;MaxWidth&quot; Value=&quot;35&quot;/&gt;</span></span>
<span class="line"><span>        &lt;!-- 设置控件模板 --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Template&quot;&gt;</span></span>
<span class="line"><span>            &lt;Setter.Value&gt;</span></span>
<span class="line"><span>                &lt;!-- 切换按钮的控件模板定义 --&gt;</span></span>
<span class="line"><span>                &lt;ControlTemplate TargetType=&quot;{x:Type ToggleButton}&quot;&gt;</span></span>
<span class="line"><span>                    &lt;!-- 网格容器，用于放置开关的背景和滑块 --&gt;</span></span>
<span class="line"><span>                    &lt;Grid&gt;</span></span>
<span class="line"><span>                        &lt;!-- Border：开关的背景边框（椭圆形的背景轨道，滑块在其中滑动） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- x:Name=&quot;Border&quot;：给这个背景边框起名叫&quot;Border&quot;，方便动画效果中通过名字找到它并改变颜色 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Background=&quot;{TemplateBinding Background}&quot;：背景颜色从使用这个模板的控件的Background属性继承 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- CornerRadius=&quot;7&quot;：边框的圆角半径为7像素（让背景看起来像椭圆形轨道） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Height=&quot;14&quot;：背景轨道的高度为14像素 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Width=&quot;35&quot;：背景轨道的宽度为35像素 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- VerticalAlignment=&quot;Center&quot;：背景在垂直方向居中对齐 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- HorizontalAlignment=&quot;Center&quot;：背景在水平方向居中对齐 --&gt;</span></span>
<span class="line"><span>                        &lt;Border x:Name=&quot;Border&quot;</span></span>
<span class="line"><span>                            Background=&quot;{TemplateBinding Background}&quot;</span></span>
<span class="line"><span>                            CornerRadius=&quot;7&quot;</span></span>
<span class="line"><span>                            Height=&quot;14&quot;</span></span>
<span class="line"><span>                            Width=&quot;35&quot;</span></span>
<span class="line"><span>                            VerticalAlignment=&quot;Center&quot;</span></span>
<span class="line"><span>                            HorizontalAlignment=&quot;Center&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- 可选的阴影效果（已注释掉，如果启用会给背景添加投影效果） --&gt;</span></span>
<span class="line"><span>                            &lt;!--&lt;Border.Effect&gt;</span></span>
<span class="line"><span>                            &lt;DropShadowEffect ShadowDepth=&quot;0.5&quot; Opacity=&quot;.2&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Border.Effect&gt;--&gt;</span></span>
<span class="line"><span>                        &lt;/Border&gt;</span></span>
<span class="line"><span>                        &lt;!-- Ellipse：椭圆形元素，用作开关的滑块（圆形的可移动按钮） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- x:Name=&quot;Ellipse&quot;：给这个滑块起名叫&quot;Ellipse&quot;，方便动画效果中通过名字找到它并移动位置 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Height=&quot;20&quot;：滑块的高度为20像素（比背景轨道高14像素要大，所以会突出显示） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Width=&quot;20&quot;：滑块的宽度为20像素（圆形，所以高度和宽度相等） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- VerticalAlignment=&quot;Center&quot;：滑块在垂直方向居中对齐 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- HorizontalAlignment=&quot;Left&quot;：滑块在水平方向靠左对齐（初始位置在左边，表示关闭状态） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Fill=&quot;{DynamicResource TertiaryWhiteColor}&quot;：滑块的填充颜色从主题配置中动态获取第三级白色 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Stroke=&quot;{TemplateBinding BorderBrush}&quot;：滑块的边框颜色从控件的BorderBrush属性继承 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- StrokeThickness=&quot;3&quot;：滑块边框的粗细为3像素（数字越大边框越粗） --&gt;</span></span>
<span class="line"><span>                        &lt;Ellipse x:Name=&quot;Ellipse&quot;</span></span>
<span class="line"><span>                                 Height=&quot;20&quot;</span></span>
<span class="line"><span>                                 Width=&quot;20&quot;</span></span>
<span class="line"><span>                                 VerticalAlignment=&quot;Center&quot;</span></span>
<span class="line"><span>                                 HorizontalAlignment=&quot;Left&quot;</span></span>
<span class="line"><span>                                 Fill=&quot;{DynamicResource TertiaryWhiteColor}&quot;</span></span>
<span class="line"><span>                                 Stroke=&quot;{TemplateBinding BorderBrush}&quot;</span></span>
<span class="line"><span>                                 StrokeThickness=&quot;3&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- 可选的阴影效果（已注释掉，如果启用会给滑块添加投影效果） --&gt;</span></span>
<span class="line"><span>                            &lt;!--&lt;Ellipse.Effect&gt;</span></span>
<span class="line"><span>                            &lt;DropShadowEffect ShadowDepth=&quot;0.5&quot; Opacity=&quot;.2&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Ellipse.Effect&gt;--&gt;</span></span>
<span class="line"><span>                        &lt;/Ellipse&gt;</span></span>
<span class="line"><span>                    &lt;/Grid&gt;</span></span>
<span class="line"><span>                    &lt;!-- 控件模板的触发器集合：这是一个装载各种触发条件和响应动作的容器 --&gt;</span></span>
<span class="line"><span>                    &lt;ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                        </span></span>
<span class="line"><span>                        &lt;!-- 选中事件触发器：当用户点击按钮选中时自动执行的动作 --&gt;</span></span>
<span class="line"><span>                        &lt;EventTrigger RoutedEvent=&quot;Checked&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- RoutedEvent=&quot;Checked&quot; 参数说明：</span></span>
<span class="line"><span>                                 - RoutedEvent：指定要监听的事件类型</span></span>
<span class="line"><span>                                 - &quot;Checked&quot;：表示监听&quot;被选中&quot;这个事件</span></span>
<span class="line"><span>                                 - 理解：就像门铃，当有人按门铃(选中)时就会响(执行动画) --&gt;</span></span>
<span class="line"><span>                            </span></span>
<span class="line"><span>                            &lt;!-- 开始故事板动画：启动一系列预设的动画效果 --&gt;</span></span>
<span class="line"><span>                            &lt;BeginStoryboard&gt;</span></span>
<span class="line"><span>                                &lt;!-- 故事板：包含多个动画的容器，像电影脚本一样按顺序执行 --&gt;</span></span>
<span class="line"><span>                                &lt;Storyboard&gt;</span></span>
<span class="line"><span>                                    </span></span>
<span class="line"><span>                                    &lt;!-- 颜色动画：改变边框背景色为蓝色 --&gt;</span></span>
<span class="line"><span>                                    &lt;ColorAnimation Storyboard.TargetName=&quot;Border&quot;</span></span>
<span class="line"><span>                                                    Storyboard.TargetProperty=&quot;(Border.Background).(SolidColorBrush.Color)&quot;</span></span>
<span class="line"><span>                                                    To=&quot;#C2D1FC&quot; Duration=&quot;0:0:0.2&quot;/&gt;</span></span>
<span class="line"><span>                                    &lt;!-- 参数详细说明：</span></span>
<span class="line"><span>                                         - Storyboard.TargetName=&quot;Border&quot;：指定要改变的目标元素名称是&quot;Border&quot;(边框)</span></span>
<span class="line"><span>                                         - Storyboard.TargetProperty：指定要改变的属性路径</span></span>
<span class="line"><span>                                           * (Border.Background)：边框的背景属性</span></span>
<span class="line"><span>                                           * (SolidColorBrush.Color)：纯色画刷的颜色属性</span></span>
<span class="line"><span>                                         - To=&quot;#C2D1FC&quot;：目标颜色值，#C2D1FC是淡蓝色的十六进制代码</span></span>
<span class="line"><span>                                         - Duration=&quot;0:0:0.2&quot;：动画持续时间，格式为&quot;小时:分钟:秒.毫秒&quot;，即0.2秒</span></span>
<span class="line"><span>                                         - 理解：就像给房间刷墙，0.2秒内从原色渐变到淡蓝色 --&gt;</span></span>
<span class="line"><span>                                    </span></span>
<span class="line"><span>                                    &lt;!-- 厚度动画：将滑块向右移动15像素 --&gt;</span></span>
<span class="line"><span>                                    &lt;ThicknessAnimation Storyboard.TargetName=&quot;Ellipse&quot;</span></span>
<span class="line"><span>                                                        Storyboard.TargetProperty=&quot;Margin&quot;</span></span>
<span class="line"><span>                                                        To=&quot;15 0 0 0&quot; Duration=&quot;0:0:0.2&quot;/&gt;</span></span>
<span class="line"><span>                                    &lt;!-- 参数详细说明：</span></span>
<span class="line"><span>                                         - Storyboard.TargetName=&quot;Ellipse&quot;：指定要移动的目标元素是&quot;Ellipse&quot;(椭圆形滑块)</span></span>
<span class="line"><span>                                         - Storyboard.TargetProperty=&quot;Margin&quot;：指定要改变的是外边距属性</span></span>
<span class="line"><span>                                         - To=&quot;15 0 0 0&quot;：目标外边距值，四个数字分别代表：</span></span>
<span class="line"><span>                                           * 15：左边距15像素(向右推15像素)</span></span>
<span class="line"><span>                                           * 0：上边距0像素(不向上下移动)</span></span>
<span class="line"><span>                                           * 0：右边距0像素(不影响右侧空间)</span></span>
<span class="line"><span>                                           * 0：下边距0像素(不向上下移动)</span></span>
<span class="line"><span>                                         - Duration=&quot;0:0:0.2&quot;：移动动画持续0.2秒</span></span>
<span class="line"><span>                                         - 理解：就像推拉门，0.2秒内滑块从左边滑到右边15像素的位置 --&gt;</span></span>
<span class="line"><span>                                &lt;/Storyboard&gt;</span></span>
<span class="line"><span>                            &lt;/BeginStoryboard&gt;</span></span>
<span class="line"><span>                        &lt;/EventTrigger&gt;</span></span>
<span class="line"><span>                        </span></span>
<span class="line"><span>                        &lt;!-- 取消选中事件触发器：当用户取消选中按钮时自动执行的动作 --&gt;</span></span>
<span class="line"><span>                        &lt;EventTrigger RoutedEvent=&quot;Unchecked&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- RoutedEvent=&quot;Unchecked&quot; 参数说明：</span></span>
<span class="line"><span>                                 - &quot;Unchecked&quot;：表示监听&quot;被取消选中&quot;这个事件</span></span>
<span class="line"><span>                                 - 理解：就像关灯开关，当关闭(取消选中)时执行相应动作 --&gt;</span></span>
<span class="line"><span>                            </span></span>
<span class="line"><span>                            &lt;!-- 开始故事板动画：启动取消选中时的动画效果 --&gt;</span></span>
<span class="line"><span>                            &lt;BeginStoryboard&gt;</span></span>
<span class="line"><span>                                &lt;!-- 故事板：取消选中时的动画脚本 --&gt;</span></span>
<span class="line"><span>                                &lt;Storyboard&gt;</span></span>
<span class="line"><span>                                    </span></span>
<span class="line"><span>                                    &lt;!-- 颜色动画：改变边框背景色为灰色 --&gt;</span></span>
<span class="line"><span>                                    &lt;ColorAnimation Storyboard.TargetName=&quot;Border&quot;</span></span>
<span class="line"><span>                                                    Storyboard.TargetProperty=&quot;(Border.Background).(SolidColorBrush.Color)&quot;</span></span>
<span class="line"><span>                                                    To=&quot;#CECECE&quot; Duration=&quot;0:0:0.2&quot;/&gt;</span></span>
<span class="line"><span>                                    &lt;!-- 参数详细说明：</span></span>
<span class="line"><span>                                         - 目标元素和属性与上面相同</span></span>
<span class="line"><span>                                         - To=&quot;#CECECE&quot;：目标颜色值，#CECECE是浅灰色的十六进制代码</span></span>
<span class="line"><span>                                         - 理解：0.2秒内从蓝色渐变回灰色，表示未选中状态 --&gt;</span></span>
<span class="line"><span>                                    </span></span>
<span class="line"><span>                                    &lt;!-- 厚度动画：将滑块移回左侧原位 --&gt;</span></span>
<span class="line"><span>                                    &lt;ThicknessAnimation Storyboard.TargetName=&quot;Ellipse&quot;</span></span>
<span class="line"><span>                                                        Storyboard.TargetProperty=&quot;Margin&quot;</span></span>
<span class="line"><span>                                                        To=&quot;0 0 0 0&quot; Duration=&quot;0:0:0.2&quot;/&gt;</span></span>
<span class="line"><span>                                    &lt;!-- 参数详细说明：</span></span>
<span class="line"><span>                                         - To=&quot;0 0 0 0&quot;：目标外边距全部为0，即：</span></span>
<span class="line"><span>                                           * 0：左边距0像素(回到最左边)</span></span>
<span class="line"><span>                                           * 0：上边距0像素(保持垂直位置)</span></span>
<span class="line"><span>                                           * 0：右边距0像素(不占用右侧空间)</span></span>
<span class="line"><span>                                           * 0：下边距0像素(保持垂直位置)</span></span>
<span class="line"><span>                                         - 理解：滑块在0.2秒内从右边滑回到最左边的原始位置 --&gt;</span></span>
<span class="line"><span>                                &lt;/Storyboard&gt;</span></span>
<span class="line"><span>                            &lt;/BeginStoryboard&gt;</span></span>
<span class="line"><span>                        &lt;/EventTrigger&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        &lt;!-- 选中状态触发器：根据选中状态改变外观，不涉及动画 --&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsChecked&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;IsChecked&quot; 参数说明：</span></span>
<span class="line"><span>                                 - Property：指定要检查的属性名称</span></span>
<span class="line"><span>                                 - &quot;IsChecked&quot;：检查是否被选中的属性</span></span>
<span class="line"><span>                                 - Value=&quot;True&quot;：当属性值为True(已选中)时触发</span></span>
<span class="line"><span>                                 - 理解：就像检查开关是否打开，如果打开就执行下面的设置 --&gt;</span></span>
<span class="line"><span>                            </span></span>
<span class="line"><span>                            &lt;!-- 选中时将滑块颜色改为绿色 --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;Ellipse&quot;</span></span>
<span class="line"><span>                                Property=&quot;Fill&quot;</span></span>
<span class="line"><span>                                Value=&quot;{DynamicResource SecundaryGreenColor}&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;!-- 参数详细说明：</span></span>
<span class="line"><span>                                 - TargetName=&quot;Ellipse&quot;：指定要改变的目标元素是椭圆形滑块</span></span>
<span class="line"><span>                                 - Property=&quot;Fill&quot;：指定要改变的属性是填充颜色</span></span>
<span class="line"><span>                                 - Value=&quot;{DynamicResource SecundaryGreenColor}&quot;：</span></span>
<span class="line"><span>                                   * DynamicResource：动态资源引用，可以实时更新</span></span>
<span class="line"><span>                                   * SecundaryGreenColor：预定义的绿色资源名称</span></span>
<span class="line"><span>                                 - 理解：当按钮被选中时，滑块立即变成绿色，表示激活状态 --&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span>                    &lt;/ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                &lt;/ControlTemplate&gt;</span></span>
<span class="line"><span>            &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>        &lt;/Setter&gt;</span></span>
<span class="line"><span>    &lt;/Style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 图标按钮样式定义，专门用于小型图标按钮（如关闭、最小化等窗口控制按钮） --&gt;</span></span>
<span class="line"><span>    &lt;!-- Style：样式定义标签，用于创建可重复使用的外观设置 --&gt;</span></span>
<span class="line"><span>    &lt;!-- x:Key=&quot;IconButtonsStyle&quot;：样式的唯一标识符，其他控件通过这个名称来引用此样式 --&gt;</span></span>
<span class="line"><span>    &lt;!-- TargetType=&quot;{x:Type Button}&quot;：指定此样式只能应用于Button类型的控件 --&gt;</span></span>
<span class="line"><span>    &lt;Style x:Key=&quot;IconButtonsStyle&quot; TargetType=&quot;{x:Type Button}&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Setter：属性设置器，用于设置控件的各种属性值 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Background&quot;：指定要设置的属性为背景色 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;Transparent&quot;：将背景色设置为完全透明（看不见背景） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Background&quot; Value=&quot;Transparent&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Cursor&quot;：指定要设置的属性为鼠标光标样式 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;Hand&quot;：当鼠标悬停在按钮上时，光标变为手型（表示可点击） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Cursor&quot; Value=&quot;Hand&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;BorderThickness&quot;：指定要设置的属性为边框粗细 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;0&quot;：将边框粗细设置为0像素（即无边框，看不到边框线） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;BorderThickness&quot; Value=&quot;0&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Height&quot;：指定要设置的属性为按钮高度 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;25&quot;：将按钮高度设置为25像素（比较小的按钮） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Height&quot; Value=&quot;25&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Width&quot;：指定要设置的属性为按钮宽度 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;25&quot;：将按钮宽度设置为25像素（正方形小按钮） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Width&quot; Value=&quot;25&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Template&quot;：指定要设置的属性为控件模板（控件的内部结构和外观） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Template&quot;&gt;</span></span>
<span class="line"><span>            &lt;Setter.Value&gt;</span></span>
<span class="line"><span>                &lt;!-- ControlTemplate：控件模板定义，用于完全自定义控件的外观和结构 --&gt;</span></span>
<span class="line"><span>                &lt;!-- TargetType=&quot;{x:Type Button}&quot;：指定此模板适用于Button类型的控件 --&gt;</span></span>
<span class="line"><span>                &lt;ControlTemplate TargetType=&quot;{x:Type Button}&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    &lt;!-- Border：边框容器，用于包装按钮内容并提供背景和边框 --&gt;</span></span>
<span class="line"><span>                    &lt;!-- Name=&quot;bd&quot;：给这个边框元素命名为&quot;bd&quot;，方便后续在触发器中引用 --&gt;</span></span>
<span class="line"><span>                    &lt;!-- CornerRadius=&quot;5&quot;：设置边框圆角半径为5像素（让按钮看起来更圆润） --&gt;</span></span>
<span class="line"><span>                    &lt;!-- Background=&quot;{TemplateBinding Background}&quot;：将边框背景绑定到按钮的Background属性 --&gt;</span></span>
<span class="line"><span>                    &lt;!-- BorderThickness=&quot;{TemplateBinding BorderThickness}&quot;：将边框粗细绑定到按钮的BorderThickness属性 --&gt;</span></span>
<span class="line"><span>                    &lt;Border Name=&quot;bd&quot; CornerRadius=&quot;5&quot; Background=&quot;{TemplateBinding Background}&quot; BorderThickness=&quot;{TemplateBinding BorderThickness}&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        &lt;!-- Path：路径图形元素，用于绘制矢量图标（如×、-、□等符号） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Name=&quot;ico&quot;：给这个图标元素命名为&quot;ico&quot;，方便后续在触发器中引用 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Data=&quot;{TemplateBinding Content}&quot;：将图标的路径数据绑定到按钮的Content属性（按钮内容就是图标数据） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Fill=&quot;{DynamicResource PrimaryTextColor}&quot;：设置图标填充色为主要文本颜色（从资源字典动态获取） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Height=&quot;10&quot;：设置图标高度为10像素 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Width=&quot;10&quot;：设置图标宽度为10像素 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Stretch=&quot;Uniform&quot;：设置图标缩放模式为等比例缩放（保持图标比例不变形） --&gt;</span></span>
<span class="line"><span>                        &lt;Path Name=&quot;ico&quot; Data=&quot;{TemplateBinding Content}&quot;</span></span>
<span class="line"><span>                          Fill=&quot;{DynamicResource PrimaryTextColor}&quot; Height=&quot;10&quot; Width=&quot;10&quot; Stretch=&quot;Uniform&quot;/&gt;</span></span>
<span class="line"><span>                    &lt;/Border&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    &lt;!-- ControlTemplate.Triggers：控件模板触发器集合，用于定义按钮在不同状态下的外观变化 --&gt;</span></span>
<span class="line"><span>                    &lt;ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        &lt;!-- Trigger：单一条件触发器，当指定条件满足时执行相应的设置 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Property=&quot;IsMouseOver&quot;：监听的属性为鼠标是否悬停在按钮上 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Value=&quot;True&quot;：当鼠标悬停（IsMouseOver为True）时触发 --&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsMouseOver&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- Setter：设置器，用于改变属性值 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Background&quot;：要改变的属性为背景色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Value=&quot;{DynamicResource SecundaryBackgroundColor}&quot;：将背景色改为次要背景色（从资源字典获取） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter Property=&quot;Background&quot; Value=&quot;{DynamicResource SecundaryBackgroundColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        &lt;!-- MultiTrigger：多条件触发器，当所有指定条件同时满足时才触发 --&gt;</span></span>
<span class="line"><span>                        &lt;MultiTrigger&gt;</span></span>
<span class="line"><span>                            &lt;!-- MultiTrigger.Conditions：多条件触发器的条件集合 --&gt;</span></span>
<span class="line"><span>                            &lt;MultiTrigger.Conditions&gt;</span></span>
<span class="line"><span>                                &lt;!-- Condition：单个触发条件 --&gt;</span></span>
<span class="line"><span>                                &lt;!-- Property=&quot;IsMouseOver&quot;：监听的属性为鼠标是否悬停 --&gt;</span></span>
<span class="line"><span>                                &lt;!-- Value=&quot;True&quot;：条件为鼠标正在悬停 --&gt;</span></span>
<span class="line"><span>                                &lt;Condition Property=&quot;IsMouseOver&quot; Value=&quot;True&quot;/&gt;</span></span>
<span class="line"><span>                                &lt;!-- Property=&quot;Tag&quot;：监听的属性为按钮的标签属性（用于标识按钮类型） --&gt;</span></span>
<span class="line"><span>                                &lt;!-- Value=&quot;IsCloseButton&quot;：条件为按钮标签等于&quot;IsCloseButton&quot;（表示这是关闭按钮） --&gt;</span></span>
<span class="line"><span>                                &lt;Condition Property=&quot;Tag&quot; Value=&quot;IsCloseButton&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;/MultiTrigger.Conditions&gt;</span></span>
<span class="line"><span>                            &lt;!-- 当上述两个条件同时满足时（鼠标悬停且是关闭按钮），执行以下设置 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Background&quot;：要改变的属性为背景色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Value=&quot;#F72626&quot;：将背景色设置为红色（#F72626是十六进制颜色代码，表示红色） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter Property=&quot;Background&quot; Value=&quot;#F72626&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;!-- TargetName=&quot;ico&quot;：指定要改变的目标元素为名为&quot;ico&quot;的图标 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Fill&quot;：要改变的属性为图标填充色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Value=&quot;#FFFFFF&quot;：将图标颜色设置为白色（#FFFFFF是十六进制颜色代码，表示白色） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;ico&quot; Property=&quot;Fill&quot; Value=&quot;#FFFFFF&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/MultiTrigger&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        &lt;!-- 按钮按下状态触发器 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Property=&quot;IsPressed&quot;：监听的属性为按钮是否被按下 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Value=&quot;True&quot;：当按钮被按下（IsPressed为True）时触发 --&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsPressed&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- TargetName=&quot;ico&quot;：指定要改变的目标元素为名为&quot;ico&quot;的图标 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Fill&quot;：要改变的属性为图标填充色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Value=&quot;{DynamicResource TertiaryTextColor}&quot;：将图标颜色改为第三级文本颜色（从资源字典获取） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;ico&quot; Property=&quot;Fill&quot; Value=&quot;{DynamicResource TertiaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span>                    &lt;/ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                &lt;/ControlTemplate&gt;</span></span>
<span class="line"><span>            &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>        &lt;/Setter&gt;</span></span>
<span class="line"><span>    &lt;/Style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 设置按钮样式定义，专门用于较大的设置类按钮（如设置面板中的功能按钮） --&gt;</span></span>
<span class="line"><span>    &lt;!-- Style：样式定义标签，用于创建可重复使用的外观设置 --&gt;</span></span>
<span class="line"><span>    &lt;!-- x:Key=&quot;SettingButtonsStyle&quot;：样式的唯一标识符，其他控件通过这个名称来引用此样式 --&gt;</span></span>
<span class="line"><span>    &lt;!-- TargetType=&quot;{x:Type Button}&quot;：指定此样式只能应用于Button类型的控件 --&gt;</span></span>
<span class="line"><span>    &lt;Style x:Key=&quot;SettingButtonsStyle&quot; TargetType=&quot;{x:Type Button}&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Setter：属性设置器，用于设置控件的各种属性值 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Background&quot;：指定要设置的属性为背景色 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;Transparent&quot;：将背景色设置为完全透明（看不见背景） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Background&quot; Value=&quot;Transparent&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Cursor&quot;：指定要设置的属性为鼠标光标样式 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;Hand&quot;：当鼠标悬停在按钮上时，光标变为手型（表示可点击） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Cursor&quot; Value=&quot;Hand&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;BorderThickness&quot;：指定要设置的属性为边框粗细 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;0&quot;：将边框粗细设置为0像素（即无边框，看不到边框线） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;BorderThickness&quot; Value=&quot;0&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Height&quot;：指定要设置的属性为按钮高度 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;50&quot;：将按钮高度设置为50像素（比IconButtonsStyle更大的按钮） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Height&quot; Value=&quot;50&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Width&quot;：指定要设置的属性为按钮宽度 --&gt;</span></span>
<span class="line"><span>        &lt;!-- Value=&quot;50&quot;：将按钮宽度设置为50像素（正方形中等大小按钮） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Width&quot; Value=&quot;50&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- Property=&quot;Template&quot;：指定要设置的属性为控件模板（控件的内部结构和外观） --&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Template&quot;&gt;</span></span>
<span class="line"><span>            &lt;Setter.Value&gt;</span></span>
<span class="line"><span>                &lt;!-- ControlTemplate：控件模板定义，用于完全自定义控件的外观和结构 --&gt;</span></span>
<span class="line"><span>                &lt;!-- TargetType=&quot;{x:Type Button}&quot;：指定此模板适用于Button类型的控件 --&gt;</span></span>
<span class="line"><span>                &lt;ControlTemplate TargetType=&quot;{x:Type Button}&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    &lt;!-- Border：边框容器，用于包装按钮内容并提供背景和边框 --&gt;</span></span>
<span class="line"><span>                    &lt;!-- Name=&quot;bd&quot;：给这个边框元素命名为&quot;bd&quot;，方便后续在触发器中引用 --&gt;</span></span>
<span class="line"><span>                    &lt;!-- CornerRadius=&quot;5&quot;：设置边框圆角半径为5像素（让按钮看起来更圆润） --&gt;</span></span>
<span class="line"><span>                    &lt;!-- Background=&quot;{TemplateBinding Background}&quot;：将边框背景绑定到按钮的Background属性（模板绑定：让模板内的元素属性与使用该模板的控件属性保持同步） --&gt;</span></span>
<span class="line"><span>                    &lt;!-- BorderThickness=&quot;{TemplateBinding BorderThickness}&quot;：将边框粗细绑定到按钮的BorderThickness属性 --&gt;</span></span>
<span class="line"><span>                    &lt;Border Name=&quot;bd&quot; CornerRadius=&quot;5&quot; Background=&quot;{TemplateBinding Background}&quot; BorderThickness=&quot;{TemplateBinding BorderThickness}&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        &lt;!-- Path：路径图形元素，用于绘制矢量图标（如齿轮、文件夹等设置图标） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Name=&quot;ico&quot;：给这个图标元素命名为&quot;ico&quot;，方便后续在触发器中引用 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Data=&quot;{TemplateBinding Content}&quot;：将图标的路径数据绑定到按钮的Content属性（按钮内容就是图标数据） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Fill=&quot;{DynamicResource PrimaryTextColor}&quot;：设置图标填充色为主要文本颜色（DynamicResource：动态资源加载，可以在运行时更新） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Height=&quot;30&quot;：设置图标高度为30像素（比IconButtonsStyle的10像素更大） --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Width=&quot;30&quot;：设置图标宽度为30像素 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Stretch=&quot;Uniform&quot;：设置图标缩放模式为等比例缩放（保持图标比例不变形，适应指定的高度和宽度） --&gt;</span></span>
<span class="line"><span>                        &lt;Path Name=&quot;ico&quot; Data=&quot;{TemplateBinding Content}&quot; Fill=&quot;{DynamicResource PrimaryTextColor}&quot; Height=&quot;30&quot; Width=&quot;30&quot; Stretch=&quot;Uniform&quot;/&gt;</span></span>
<span class="line"><span>                    &lt;/Border&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    &lt;!-- ControlTemplate.Triggers：控件模板触发器集合，用于定义按钮在不同状态下的外观变化 --&gt;</span></span>
<span class="line"><span>                    &lt;ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        &lt;!-- Trigger：单一条件触发器，当指定条件满足时执行相应的设置 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Property=&quot;IsMouseOver&quot;：监听的属性为鼠标是否悬停在按钮上 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Value=&quot;True&quot;：当鼠标悬停（IsMouseOver为True）时触发 --&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsMouseOver&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- Setter：设置器，用于改变属性值 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- TargetName=&quot;ico&quot;：指定要改变的目标元素为名为&quot;ico&quot;的图标 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Fill&quot;：要改变的属性为图标填充色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Value=&quot;{DynamicResource SecundaryTextColor}&quot;：将图标颜色改为次要文本颜色（从资源字典动态获取） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;ico&quot; Property=&quot;Fill&quot; Value=&quot;{DynamicResource SecundaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Background&quot;：要改变的属性为背景色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Value=&quot;{DynamicResource PrimaryBackgroundColor}&quot;：将背景色改为主要背景色（从资源字典获取） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter Property=&quot;Background&quot; Value=&quot;{DynamicResource PrimaryBackgroundColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        &lt;!-- 按钮按下状态触发器 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Property=&quot;IsPressed&quot;：监听的属性为按钮是否被按下 --&gt;</span></span>
<span class="line"><span>                        &lt;!-- Value=&quot;True&quot;：当按钮被按下（IsPressed为True）时触发 --&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsPressed&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;!-- TargetName=&quot;ico&quot;：指定要改变的目标元素为名为&quot;ico&quot;的图标 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Property=&quot;Fill&quot;：要改变的属性为图标填充色 --&gt;</span></span>
<span class="line"><span>                            &lt;!-- Value=&quot;{DynamicResource TertiaryTextColor}&quot;：将图标颜色改为第三级文本颜色（从资源字典获取，通常是较暗或较淡的颜色） --&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;ico&quot; Property=&quot;Fill&quot; Value=&quot;{DynamicResource TertiaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span>                    &lt;/ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                &lt;/ControlTemplate&gt;</span></span>
<span class="line"><span>            &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>        &lt;/Setter&gt;</span></span>
<span class="line"><span>    &lt;/Style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 普通圆角按钮样式 --&gt;</span></span>
<span class="line"><span>    &lt;Style x:Key=&quot;RoundedButtonStyle&quot; TargetType=&quot;{x:Type Button}&quot;&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Background&quot; Value=&quot;{DynamicResource PrimaryBackgroundColor}&quot;/&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Foreground&quot; Value=&quot;{DynamicResource PrimaryTextColor}&quot;/&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;BorderThickness&quot; Value=&quot;0&quot;/&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Cursor&quot; Value=&quot;Hand&quot;/&gt;</span></span>
<span class="line"><span>        &lt;Setter Property=&quot;Template&quot;&gt;</span></span>
<span class="line"><span>            &lt;Setter.Value&gt;</span></span>
<span class="line"><span>                &lt;ControlTemplate TargetType=&quot;{x:Type Button}&quot;&gt;</span></span>
<span class="line"><span>                    &lt;Border x:Name=&quot;border&quot; </span></span>
<span class="line"><span>                            Background=&quot;{TemplateBinding Background}&quot; </span></span>
<span class="line"><span>                            BorderThickness=&quot;{TemplateBinding BorderThickness}&quot;</span></span>
<span class="line"><span>                            CornerRadius=&quot;10&quot;&gt;</span></span>
<span class="line"><span>                        &lt;ContentPresenter HorizontalAlignment=&quot;Center&quot; </span></span>
<span class="line"><span>                                          VerticalAlignment=&quot;Center&quot;/&gt;</span></span>
<span class="line"><span>                    &lt;/Border&gt;</span></span>
<span class="line"><span>                    &lt;ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsMouseOver&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;border&quot; Property=&quot;Background&quot; Value=&quot;{DynamicResource SecundaryBackgroundColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span>                        &lt;Trigger Property=&quot;IsPressed&quot; Value=&quot;True&quot;&gt;</span></span>
<span class="line"><span>                            &lt;Setter TargetName=&quot;border&quot; Property=&quot;Background&quot; Value=&quot;{DynamicResource TertiaryBackgroundColor}&quot;/&gt;</span></span>
<span class="line"><span>                        &lt;/Trigger&gt;</span></span>
<span class="line"><span>                    &lt;/ControlTemplate.Triggers&gt;</span></span>
<span class="line"><span>                &lt;/ControlTemplate&gt;</span></span>
<span class="line"><span>            &lt;/Setter.Value&gt;</span></span>
<span class="line"><span>        &lt;/Setter&gt;</span></span>
<span class="line"><span>    &lt;/Style&gt;</span></span>
<span class="line"><span>&lt;!-- 资源字典结束标签 --&gt;</span></span>
<span class="line"><span>&lt;/ResourceDictionary&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,51)])])}const o=s(i,[["render",t]]),d=JSON.parse('{"path":"/acrticle/Csharp/WPF%E5%AD%A6%E4%B9%A0/WPF%E6%8E%A7%E4%BB%B6%E6%A0%B7%E5%BC%8F%E6%96%87%E4%BB%B6%E7%9A%84%E7%BC%96%E5%86%99.html","title":"WPF控件样式文件的编写","lang":"zh-CN","frontmatter":{"title":"WPF控件样式文件的编写","icon":"code","order":2,"category":["C#学习"],"tag":["WPF","WinForm"],"description":"在WPF项目中创建按钮样式的完整指南 结合ButtonStyles.xaml文件，详细讲解如何在WPF中创建自定义按钮样式。ButtonStyles.xaml文件定义了多种类型的按钮样式，包括菜单单选按钮、开关按钮、图标按钮等。 一、按钮样式的基本结构 在WPF中，按钮样式通常定义在资源字典文件中（如ButtonStyles.xaml），其基本结构如下...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"WPF控件样式文件的编写\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-09-13T05:40:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"XJ\\",\\"url\\":\\"https://mister-hope.com\\"}]}"],["meta",{"property":"og:url","content":"https://mister-hope.github.io/study_blog/acrticle/Csharp/WPF%E5%AD%A6%E4%B9%A0/WPF%E6%8E%A7%E4%BB%B6%E6%A0%B7%E5%BC%8F%E6%96%87%E4%BB%B6%E7%9A%84%E7%BC%96%E5%86%99.html"}],["meta",{"property":"og:site_name","content":"个人学习记录博客"}],["meta",{"property":"og:title","content":"WPF控件样式文件的编写"}],["meta",{"property":"og:description","content":"在WPF项目中创建按钮样式的完整指南 结合ButtonStyles.xaml文件，详细讲解如何在WPF中创建自定义按钮样式。ButtonStyles.xaml文件定义了多种类型的按钮样式，包括菜单单选按钮、开关按钮、图标按钮等。 一、按钮样式的基本结构 在WPF中，按钮样式通常定义在资源字典文件中（如ButtonStyles.xaml），其基本结构如下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-13T05:40:39.000Z"}],["meta",{"property":"article:tag","content":"WinForm"}],["meta",{"property":"article:tag","content":"WPF"}],["meta",{"property":"article:modified_time","content":"2025-09-13T05:40:39.000Z"}]]},"git":{"createdTime":1757741716000,"updatedTime":1757742039000,"contributors":[{"name":"XJ","username":"XJ","email":"XJ@qq.com","commits":2,"url":"https://github.com/XJ"}]},"readingTime":{"minutes":26.15,"words":7845},"filePathRelative":"acrticle/Csharp/WPF学习/WPF控件样式文件的编写.md","excerpt":"\\n<p>结合<code>ButtonStyles.xaml</code>文件，详细讲解如何在WPF中创建自定义按钮样式。<code>ButtonStyles.xaml</code>文件定义了多种类型的按钮样式，包括菜单单选按钮、开关按钮、图标按钮等。</p>\\n<h2>一、按钮样式的基本结构</h2>\\n<p>在WPF中，按钮样式通常定义在资源字典文件中（如<code>ButtonStyles.xaml</code>），其基本结构如下：</p>\\n<div class=\\"language-xaml line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"xaml\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-xaml\\"><span class=\\"line\\"><span>&lt;!-- 资源字典根元素 --&gt;</span></span>\\n<span class=\\"line\\"><span>&lt;ResourceDictionary xmlns=\\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\\"</span></span>\\n<span class=\\"line\\"><span>                    xmlns:x=\\"http://schemas.microsoft.com/winfx/2006/xaml\\"&gt;</span></span>\\n<span class=\\"line\\"><span>    </span></span>\\n<span class=\\"line\\"><span>    &lt;!-- 按钮样式定义 --&gt;</span></span>\\n<span class=\\"line\\"><span>    &lt;Style x:Key=\\"StyleName\\" TargetType=\\"Button\\"&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;!-- 属性设置 --&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;Setter Property=\\"PropertyName\\" Value=\\"PropertyValue\\"/&gt;</span></span>\\n<span class=\\"line\\"><span>        </span></span>\\n<span class=\\"line\\"><span>        &lt;!-- 控件模板定义（可选，但可以完全自定义外观） --&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;Setter Property=\\"Template\\"&gt;</span></span>\\n<span class=\\"line\\"><span>            &lt;Setter.Value&gt;</span></span>\\n<span class=\\"line\\"><span>                &lt;ControlTemplate TargetType=\\"Button\\"&gt;</span></span>\\n<span class=\\"line\\"><span>                    &lt;!-- 模板内容 --&gt;</span></span>\\n<span class=\\"line\\"><span>                &lt;/ControlTemplate&gt;</span></span>\\n<span class=\\"line\\"><span>            &lt;/Setter.Value&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;/Setter&gt;</span></span>\\n<span class=\\"line\\"><span>        </span></span>\\n<span class=\\"line\\"><span>        &lt;!-- 触发器定义（可选，用于添加交互效果） --&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;Style.Triggers&gt;</span></span>\\n<span class=\\"line\\"><span>            &lt;!-- 触发器内容 --&gt;</span></span>\\n<span class=\\"line\\"><span>        &lt;/Style.Triggers&gt;</span></span>\\n<span class=\\"line\\"><span>    &lt;/Style&gt;</span></span>\\n<span class=\\"line\\"><span>&lt;/ResourceDictionary&gt;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{o as comp,d as data};
