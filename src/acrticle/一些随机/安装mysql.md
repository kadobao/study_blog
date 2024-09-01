![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240831/image.9kg4cc507c.jpg)


![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240831/image.5xakotijp0.jpg)



![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240831/image.839zaldmk6.jpg)



![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240831/image.2h88wqdteu.jpg)


![image](https://cdn.jsdelivr.net/gh/kadobao/picx-images-hosting@master/20240831/image.2a511as8km.jpg)






好的，我会详细补充每个步骤，确保用户能够清楚地理解每一步的操作以及需要输入的内容。

### 1. **创建并编辑 `my.ini` 配置文件**

在 MySQL 的 `bin` 目录同级的目录下（即 `C:/software/mysql-9.0.1-winx64`），创建一个名为 `my.ini` 的配置文件，并将以下内容粘贴进去：

```ini
# MySQL 服务器配置

[mysqld]
# 设置 MySQL 的基础安装目录
basedir = C:/software/mysql-9.0.1-winx64

# 设置 MySQL 数据库文件的目录
datadir = C:/software/mysql-9.0.1-winx64/data

# 设置 MySQL 监听的端口
port = 3306

# 推荐的 SQL 模式
sql_mode = NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

# 设置最大并发连接数
max_connections = 200

# 设置最大连接失败次数（防止恶意攻击）
max_connect_errors = 10

# 设置服务器的默认字符集
character-set-server = utf8mb4

# 设置默认存储引擎
default-storage-engine = INNODB

# 确保跳过授权表的选项被禁用（用于正常启动）
#skip-grant-tables

[mysql]
# 设置 MySQL 客户端的默认字符集
default-character-set = utf8mb4

[client]
# 设置 MySQL 客户端连接时使用的默认端口
port = 3306
default-character-set = utf8mb4
```

### 2. **初始化 MySQL 数据目录**

进入 MySQL 的 `bin` 目录，打开命令提示符，然后运行以下命令初始化 MySQL 的数据目录：

```cmd
mysqld --initialize --console
```

- **重要提示**：运行这个命令后，系统会生成一个临时密码。**请务必记住**这个密码，因为稍后需要用它来登录 MySQL。

### 3. **安装 MySQL 作为 Windows 服务**

在初始化完成后，安装 MySQL 作为 Windows 服务，这样你可以方便地通过 Windows 服务管理器来启动和管理 MySQL。运行以下命令：

```cmd
mysqld --install mysql
```

如果成功安装服务，你会看到提示 “Service successfully installed.”。

### 4. **启动 MySQL 服务**

启动 MySQL 服务，使用以下命令：

```cmd
net start mysql
```

- 如果服务启动成功，你会看到提示 “MySQL 服务已成功启动。”

### 5. **登录 MySQL 并修改 `root` 用户密码**

使用初始化时生成的临时密码登录 MySQL，并立即修改 `root` 用户的密码。操作步骤如下：

1. 运行以下命令登录 MySQL：
   ```cmd
   mysql -u root -p
   ```
2. 系统会提示你输入密码。在此处输入你之前记录下来的**临时密码**，并按回车。

3. 登录成功后，你将看到 MySQL 的提示符，接下来你需要立即修改 `root` 用户的密码。输入以下命令，并将 `新密码` 替换为你想要设置的新密码（比如 `zxc1234d`）：
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'zxc1234d';
   ```

4. 然后，刷新权限表以确保新密码生效：
   ```sql
   FLUSH PRIVILEGES;
   ```

### 6. **创建新的管理员账号**

为了更好地管理 MySQL，建议你创建一个新的管理员账号。操作步骤如下：

1. 在 MySQL 提示符下，输入以下命令创建一个名为 `admin` 的新用户，并设置密码为 `zxc1234d`：
   ```sql
   CREATE USER 'admin'@'localhost' IDENTIFIED BY 'zxc1234d';
   ```
2. 为新用户授予所有权限，输入以下命令：
   ```sql
   GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
   ```
3. 最后，刷新权限表以确保新用户的权限生效：
   ```sql
   FLUSH PRIVILEGES;
   ```

### 7. **退出 MySQL**

完成上述操作后，输入以下命令退出 MySQL：
```sql
EXIT;
```

### 8. **验证新用户**

为了确认新创建的 `admin` 用户能够正常使用，请用新账号登录 MySQL：

1. 在命令提示符下，输入以下命令：
   ```cmd
   mysql -u admin -p
   ```
2. 系统会提示你输入密码，这里输入你刚才为 `admin` 用户设置的密码 `zxc1234d`，并按回车。

3. 如果登录成功，说明新用户创建并配置成功。你现在可以使用 `admin` 账号进行日常管理。

### 总结：

- 初始化 MySQL 并安装为 Windows 服务后，先用临时密码登录并修改 `root` 密码。
- 创建一个新的管理员账号，避免直接使用 `root` 进行日常操作。
- 登录并验证新账号，确保一切设置正确。

这些步骤帮助你完成 MySQL 的初始设置和安全配置.




`ALTER USER 'root'@'localhost' IDENTIFIED BY 'zxc1234d';` 这条 SQL 命令的作用是修改 MySQL 数据库中 `root` 用户的密码。我们可以将这条命令拆解为几个部分来理解：

### 1. **`ALTER USER`**：
   - 这个关键字用于修改已有的数据库用户账号的属性。在本例中，我们使用它来修改用户的密码。

### 2. **`'root'@'localhost'`**：
   - `'root'` 是用户名，表示你要修改的是 MySQL 中的 `root` 用户。
   - `'localhost'` 是主机名，表示这个用户只能从 `localhost`（本地主机，即当前计算机）进行连接。这意味着只有在运行 MySQL 服务器的那台计算机上，才能使用这个 `root` 账号连接到 MySQL。

### 3. **`IDENTIFIED BY 'zxc1234d'`**：
   - `IDENTIFIED BY` 用来指定新的密码。
   - `'zxc1234d'` 是你要设置的新密码。将这个密码用于 `root` 用户。

### **总结**

整条命令的意思是：将 MySQL 中 `root` 用户（仅限从本地连接，即 `localhost`）的密码修改为 `'zxc1234d'`。

### 实际应用

- 当你第一次安装 MySQL 或出于安全原因需要修改 `root` 用户的密码时，可以使用这条命令。
- 修改密码后，你需要记住这个新密码，以便下次登录 MySQL 时使用。

### 注意事项

- 为了安全起见，密码应设置为一个强密码，包含大小写字母、数字和特殊字符。
- 修改密码后，确保立即测试新密码，以确认设置成功。








### 将 MySQL 添加到系统环境变量

通过将 MySQL 的 `bin` 目录添加到系统的 `PATH` 环境变量中，你可以在任何目录下运行 `mysql` 命令。

#### 1. **打开系统环境变量设置**

1. 右键点击 “此电脑” 或 “计算机”，选择 “属性”。
2. 点击左侧的 “高级系统设置”。
3. 在系统属性窗口中，点击 “环境变量” 按钮。

#### 2. **编辑 `PATH` 环境变量**

1. 在环境变量窗口中，找到 “系统变量” 区域下的 `Path` 变量，选中它后点击 “编辑”。
2. 在弹出的编辑窗口中，点击 “新建”，然后输入 MySQL 的 `bin` 目录路径：
   ```text
   C:\SoftWare\mysql-9.0.1-winx64\bin
   ```
3. 点击 “确定” 保存更改。

#### 3. **验证配置**

1. 关闭并重新打开命令提示符窗口。
2. 在命令提示符中，输入以下命令，查看 MySQL 是否已成功配置到 `PATH` 环境变量：
   ```cmd
   mysql --version
   ```
   如果配置正确，你应该会看到 MySQL 的版本信息。

### 总结

通过将 MySQL 的 `bin` 目录路径添加到 `PATH` 环境变量中，你可以在任意目录下使用 `mysql` 命令，而无需每次都进入 MySQL 的安装目录。这将极大地方便日常使用 MySQL。