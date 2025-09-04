---
title: 在 Windows 上设置右键菜单选项以便用 Visual Studio Code 打开文件和文件夹
icon: 
order: 11
category:
  - 一些随记
tag:
  - vscode 
---











`C:\Users\cf\AppData\Local\Programs\Microsoft VS Code\Code.exe`是我本地文件的路径，你自己需要替换为你自己的路径。

------

在 Windows 上设置右键菜单选项以便用 Visual Studio Code 打开文件和文件夹

### 修改注册表显示中文步骤

#### 1. **为文件添加右键选项**
1. 打开注册表编辑器，导航到：
   ```
   HKEY_CLASSES_ROOT\*\shell\
   ```
2. 右键 `shell`，选择 **新建 -> 项**，将该项命名为 `使用 VSCode 打开`（你可以根据需要自定义）。
3. 在 `使用 VSCode 打开` 项下，新建一个 `command` 子项。
4. 在右侧窗口中，双击 `command` 项中的 `默认` 值，并输入以下内容：
   ```bash
   "C:\Users\cf\AppData\Local\Programs\Microsoft VS Code\Code.exe" "%1"
   ```
   （请确保路径和用户名正确。）

#### 2. **为文件夹添加右键选项**
1. 导航到：
   ```
   HKEY_CLASSES_ROOT\Directory\shell\
   ```
2. 右键 `shell`，选择 **新建 -> 项**，将该项命名为 `使用 VSCode 打开`（同样可以自定义）。
3. 在 `使用 VSCode 打开` 项下，新建一个 `command` 子项。
4. 在右侧窗口中，双击 `command` 项中的 `默认` 值，并输入以下内容：
   ```bash
   "C:\Users\cf\AppData\Local\Programs\Microsoft VS Code\Code.exe" "%V"
   ```

### 完成后的效果
这样设置完成后，当你右键点击文件或文件夹时，菜单项将会显示为“**使用 VSCode 打开**”，并且你可以点击此选项用 Visual Studio Code 打开文件或文件夹。

你也可以根据个人喜好，将菜单项设置为其他中文描述，比如“用 VSCode 编辑”之类的。