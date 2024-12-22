### 开启解决方案资源管理器

#### 方法 1：通过菜单打开

1. 点击顶部菜单栏的 **视图**（View）。
2. 在下拉菜单中选择 **解决方案资源管理器**（Solution Explorer）。
3. 窗口会在右侧（或最后使用的位置）打开。



#### 方法 2：通过快捷键打开

按下 **`Ctrl + Alt + L`**，即可快速打开解决方案资源管理器。





------





### 打开属性工具窗口



右键选择属性就行













------











一个完整的 C# Windows Forms 应用程序项目通常包括以下文件和文件夹，它们构成了项目的结构。以下是常见的项目结构及各文件的用途：

------

## **1. 项目结构**

假设项目名称为 `MyWindowsApp`，项目结构可能如下：

```
MyWindowsApp/
│
├── Properties/
│   ├── AssemblyInfo.cs
│   ├── Resources.resx
│   ├── Settings.settings
│
├── bin/
├── obj/
├── MyWindowsApp.csproj
├── App.config (可选)
├── Form1.cs
├── Form1.Designer.cs
├── Form1.resx
├── Program.cs
└── Packages.config (可选)
```

------

## **2. 文件和文件夹说明**

### **顶层文件**

#### 1. `MyWindowsApp.csproj`

- **用途**：项目文件，包含项目的配置信息（如目标框架、文件引用、依赖项等）。
- **格式**：XML 文件，主要用于 MSBuild 编译项目。
- **修改方式**：可以手动编辑或通过 Visual Studio 的项目属性界面修改。

#### 2. `Program.cs`

- **用途**：项目的入口文件，定义程序的启动行为。

- 常见内容

  ：

  ```csharp
  static class Program
  {
      [STAThread]
      static void Main()
      {
          Application.EnableVisualStyles();
          Application.SetCompatibleTextRenderingDefault(false);
          Application.Run(new Form1());
      }
  }
  ```

------

### **窗体相关文件**

#### 3. `Form1.cs`

- **用途**：窗体的代码文件，包含窗体类的定义、事件处理代码等。

- 内容

  ：用户可以在此编写业务逻辑。

  ```csharp
  public partial class Form1 : Form
  {
      public Form1()
      {
          InitializeComponent();
      }
  
      private void button1_Click(object sender, EventArgs e)
      {
          MessageBox.Show("Hello, World!");
      }
  }
  ```

#### 4. `Form1.Designer.cs`

- **用途**：窗体的设计文件，由 Visual Studio 自动生成并管理，包含控件的布局和属性代码。

- 内容

  ：初始化控件及其属性的代码，例如：

  ```csharp
  private void InitializeComponent()
  {
      this.button1 = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // button1
      // 
      this.button1.Location = new System.Drawing.Point(100, 50);
      this.button1.Name = "button1";
      this.button1.Size = new System.Drawing.Size(75, 23);
      this.button1.Text = "Click Me";
      this.ResumeLayout(false);
  }
  ```

#### 5. `Form1.resx`

- **用途**：资源文件，用于存储与窗体相关的资源（如图像、字符串等）。
- **内容**：以 XML 格式存储的窗体资源，Visual Studio 管理。

------

### **Properties 文件夹**

#### 6. `AssemblyInfo.cs`

- **用途**：定义程序集的元数据信息，例如标题、版本号、版权信息等。

- 内容

  ：

  ```csharp
  [assembly: AssemblyTitle("MyWindowsApp")]
  [assembly: AssemblyVersion("1.0.0.0")]
  ```

#### 7. `Resources.resx`

- **用途**：全局资源文件，存储项目范围内的字符串、图像或其他资源。
- **内容**：以 XML 格式存储，支持通过 `Properties.Resources` 访问。

#### 8. `Settings.settings`

- **用途**：存储用户和应用程序设置，可以通过 `Properties.Settings` 访问。
- **内容**：包含键值对，支持类型化访问。

------

### **输出目录**

#### 9. `bin/` 和 `obj/`

- 用途

  ：

  - `bin/`：存储编译输出文件，包括可执行文件（`.exe`）、动态链接库（`.dll`）。
  - `obj/`：存储中间文件（如临时的编译文件）。

- 生成文件

  ：

  - `bin/Debug/MyWindowsApp.exe`（调试模式）
  - `bin/Release/MyWindowsApp.exe`（发布模式）

------

### **可选文件**

#### 10. `App.config`

- **用途**：应用程序配置文件，用于存储配置信息（如数据库连接字符串、应用程序设置）。

- 内容

  ：

  ```xml
  <configuration>
      <appSettings>
          <add key="Setting1" value="Value1"/>
      </appSettings>
  </configuration>
  ```

#### 11. `Packages.config`

- **用途**：用于管理 NuGet 包引用，记录已安装的包及其版本号。

------

### **其他文件夹**

#### 12. 自定义类和控件文件夹

- 你可以根据需要添加自定义文件夹，用于存放业务逻辑类、用户控件（`.cs` 文件）等。

------

