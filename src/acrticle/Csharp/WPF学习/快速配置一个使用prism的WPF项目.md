---
title: 快速配置一个使用prism的WPF项目
icon: code
order: 3
category:
  - C#学习
tag:
  - WPF
  - prism
---


## 一、Prism项目配置概述

配置一个使用Prism的WPF项目通常需要完成以下核心步骤：

1. **引入资源**：包括控件样式文件、主题文件等
2. **配置主窗口和导航**：设置应用程序的主界面
3. **关联View与ViewModel**：实现MVVM模式的核心关联
4. **创建主窗口**：设置应用程序的主界面

下面将详细介绍每个步骤的具体实现方法。

## 二、引入Prism资源

### 1. 安装必要的NuGet包

首先需要通过NuGet包管理器安装以下核心包：

- **Prism.Core**：Prism框架的核心库
- **Prism.Wpf**：WPF特定的Prism功能
- **Prism.Unity**：Unity容器实现依赖注入

### 2. 修改App.xaml文件

在App.xaml中添加Prism命名空间并引入资源字典：

```xaml
<Application.Resources>
    <!-- 引入所有必要的资源字典 -->
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <!-- 引入图标资源 -->
            <ResourceDictionary Source="Assets/Icons/Icons.xaml"/>
            <!-- 引入主题颜色资源 -->
            <ResourceDictionary Source="Styles/LightTheme.xaml"/>
            <!-- 引入按钮样式资源 -->
            <ResourceDictionary Source="Styles/ButtonStyles.xaml"/>
            <!-- 引入卡片样式资源 -->
            <ResourceDictionary Source="Styles/CardStyles.xaml"/>
            <!-- 引入文本框样式资源 -->
            <ResourceDictionary Source="Styles/TextBoxStyles.xaml"/>
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

### 3. 修改App类继承自PrismApplication

将App类从标准的Application类改为继承自PrismApplication：

```csharp
public partial class App : PrismApplication
{
    // Prism框架要求的方法将在下面实现
}
```

## 三、配置主窗口和注册导航页面（配置App.xaml.cs）

App.xaml.cs是Prism配置的核心，需要实现三个关键方法：

### 1. CreateShell方法

CreateShell方法用于创建应用程序的主窗口：

```csharp
// 创建主窗口
// CreateShell 方法是Prism框架要求的，用于创建应用程序的主窗口
// CreateShell()方法用于指定应用程序的主窗口（Shell）。
// 这个方法是固定的，不需要改变
override Window CreateShell()
{
    // 使用Prism容器解析并返回MainWindow实例
    return Container.Resolve<MainWindow>();   // 这个决定了MainWindow是应用程序的主窗口
}
```

### 2. RegisterTypes方法

RegisterTypes方法用于注册应用程序中使用的类型，包括导航视图、ViewModel、服务等：

#### 关联View与ViewModel（使用命名约定）

这是最简单的方式，Prism会自动查找与View名称匹配的ViewModel：

- View名称：HomeView
- ViewModel名称：HomeViewModel
- Prism会自动将它们关联

```csharp
// 注册应用程序中使用的类型
// RegisterTypes 方法是Prism框架要求的，方法名和参数不能改变，用于注册应用程序中使用的类型：导航视图/ViewModel、服务/接口、其他需要依赖注入的类型
override void RegisterTypes(IContainerRegistry containerRegistry)
{
    // 注册共享数据服务为单例
    containerRegistry.RegisterSingleton<ISharedDataService, SharedDataService>();

    // 注册导航页面
    // 将View与ViewModel关联，以便导航时自动创建
    containerRegistry.RegisterForNavigation<Home, HomeViewModel>();      //  这里的RegisterForNavigation<View, ViewModel>()方法将视图和ViewModel关联起来，并使用视图类名作为导航键。
    containerRegistry.RegisterForNavigation<Edge, EdgeViewModel>();
    containerRegistry.RegisterForNavigation<PLC, PLCViewModel>();
    containerRegistry.RegisterForNavigation<Database, DatabaseViewModel>();
    containerRegistry.RegisterForNavigation<Embedded, EmbeddedViewModel>();
    containerRegistry.RegisterForNavigation<OS, OSViewModel>();
    containerRegistry.RegisterForNavigation<RealTime, RealTimeViewModel>();
    containerRegistry.RegisterForNavigation<DataVisualization, DataVisualizationViewModel>();
    containerRegistry.RegisterForNavigation<SystemLogs, SystemLogsViewModel>();
}
```

### 3. ConfigureModuleCatalog方法（可选）

如果需要模块化开发，可以实现ConfigureModuleCatalog方法：

```csharp
override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    // 注册模块
    moduleCatalog.AddModule<ModuleName>();
}
```

## 四、创建主窗口

### 1. 创建MainWindow.xaml

在Views文件夹中添加MainWindow.xaml作为主窗口：

```xaml
<Window x:Class="WPF的MVVM模式的Prism框架.Views.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:prism="http://prismlibrary.com/"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    
    <Grid>
        <!-- 定义导航区域 -->
        <ContentControl prism:RegionManager.RegionName="ContentRegion" />
    </Grid>
</Window>
```

### 2. 设置窗口样式

根据需要设置窗口样式，如无边框、透明背景等：

```xaml
<Window x:Class="WPF的MVVM模式的Prism框架.Views.MainWindow"
        ...
        WindowStyle="None"
        AllowsTransparency="True"
        Background="Transparent">
    <!-- 窗口内容 -->
</Window>
```

### 3. 添加导航区域和内容显示区域

使用Prism的RegionManager划分区域：

```xaml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="200"/>
        <ColumnDefinition Width="*"/>
    </Grid.ColumnDefinitions>
    
    <!-- 侧边栏导航区域 -->
    <ContentControl Grid.Column="0" prism:RegionManager.RegionName="NavigationRegion"/>
    
    <!-- 主内容区域 -->
    <ContentControl Grid.Column="1" prism:RegionManager.RegionName="ContentRegion"/>
</Grid>
```

## 四、完整示例代码

下面是一个完整的EdgeViewModel示例，展示了如何访问Model数据和使用共享服务：

```csharp
using Prism.Mvvm;
using Prism.Navigation.Regions;
using System;
using WPF的MVVM模式的Prism框架.Models;
using WPF的MVVM模式的Prism框架.Services;

namespace WPF的MVVM模式的Prism框架.ViewModels
{
    public class EdgeViewModel : BindableBase, INavigationAware
    {
        private readonly ISharedDataService _dataService;
        private EdgeModel _model = new EdgeModel();

        public string Title
        {
            get { return _model.Title; }
            set
            {
                _model.Title = value;
                RaisePropertyChanged();
            }
        }

        public string Description
        {
            get { return _model.Description; }
            set
            {
                _model.Description = value;
                RaisePropertyChanged();
            }
        }

        private string _homeTitle = string.Empty;
        public string HomeTitle
        {
            get { return _homeTitle; }
            set { SetProperty(ref _homeTitle, value); }
        }

        private DateTime _homeTime;
        public DateTime HomeTime
        {
            get { return _homeTime; }
            set { SetProperty(ref _homeTime, value); }
        }

        // 构造函数注入服务
        public EdgeViewModel(ISharedDataService dataService)
        {
            _dataService = dataService;

            // 从共享服务获取数据
            LoadSharedData();
        }

        private void LoadSharedData()
        {
            // 获取Home页面保存的数据
            if (_dataService.HasData("HomeTitle"))
                HomeTitle = _dataService.GetData<string>("HomeTitle");

            if (_dataService.HasData("HomeTime"))
                HomeTime = _dataService.GetData<DateTime>("HomeTime");
        }

        // INavigationAware 接口实现
        public void OnNavigatedTo(NavigationContext navigationContext)
        {
            // 每次导航到此页面时重新加载共享数据
            LoadSharedData();
        }

        public bool IsNavigationTarget(NavigationContext navigationContext)
        {
            // 返回 false 表示每次导航都创建新实例，返回 true 表示重用现有实例
            // 这里返回 true 以重用实例，但会在 OnNavigatedTo 中刷新数据
            return true;
        }

        public void OnNavigatedFrom(NavigationContext navigationContext)
        {
            // 离开页面时的清理工作（如果需要的话）
        }
    }
}
```

## 五、完整的App.xaml.cs示例

::: details `App.xaml.cs`完整文件

```csharp
using System.Windows;
using Prism.Ioc;
using Prism.Unity;
using WPF的MVVM模式的Prism框架.Views;
using WPF的MVVM模式的Prism框架.ViewModels;
using WPF的MVVM模式的Prism框架.Services;

namespace WPF的MVVM模式的Prism框架
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : PrismApplication
    {
        // 创建主窗口
        // CreateShell 方法是Prism框架要求的，用于创建应用程序的主窗口、
        // CreateShell()方法用于指定应用程序的主窗口（Shell）。
        // 这个方法是固定的，不需要改变
         override Window CreateShell()
        {
            // 使用Prism容器解析并返回MainWindow实例
            return Container.Resolve<MainWindow>();   // 这个决定了MainWindow是应用程序的主窗口
        }

        // 注册应用程序中使用的类型
        // RegisterTypes 方法是Prism框架要求的，方法名和参数不能改变，用于注册应用程序中使用的类型：导航视图/ViewModel、服务/接口、其他需要依赖注入的类型
         override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            // 注册共享数据服务为单例
            containerRegistry.RegisterSingleton<ISharedDataService, SharedDataService>();

            // 注册导航页面
            // 将View与ViewModel关联，以便导航时自动创建
            containerRegistry.RegisterForNavigation<Home, HomeViewModel>();      //  这里的RegisterForNavigation<View, ViewModel>()方法将视图和ViewModel关联起来，并使用视图类名作为导航键。
            containerRegistry.RegisterForNavigation<Edge, EdgeViewModel>();
            containerRegistry.RegisterForNavigation<PLC, PLCViewModel>();
            containerRegistry.RegisterForNavigation<Database, DatabaseViewModel>();
            containerRegistry.RegisterForNavigation<Embedded, EmbeddedViewModel>();
            containerRegistry.RegisterForNavigation<OS, OSViewModel>();
            containerRegistry.RegisterForNavigation<RealTime, RealTimeViewModel>();
            containerRegistry.RegisterForNavigation<DataVisualization, DataVisualizationViewModel>();
            containerRegistry.RegisterForNavigation<SystemLogs, SystemLogsViewModel>();
        }
    }
}
```

:::