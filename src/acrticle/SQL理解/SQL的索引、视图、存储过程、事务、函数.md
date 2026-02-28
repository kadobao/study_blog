---
title: SQL的索引、视图、存储过程、事务、函数
icon: database
order: 3
category:
  - SQL理解
tag:
  - SQL基础
  - 数据库查询
---

# SQL的索引、视图、存储过程、事务、函数

## 视图 (View)

视图就是一个SELECT语句，是一个虚拟表。

### 创建视图

```sql
CREATE VIEW EmployeeBasicInfo 
AS
SELECT 
    EmployeeID,
    FirstName,
    LastName,
    Department
FROM Employees;
```

> 视图创建语法：比查询语句多了一个 `CREATE VIEW 视图名 AS`，后面跟着SELECT查询语句即可。

### 查询视图的创建语句

```sql
-- 方法1：使用系统存储过程
EXEC sp_helptext '视图名';

-- 方法2：查询系统视图
SELECT definition 
FROM sys.sql_modules 
WHERE object_id = OBJECT_ID('视图名');
```

## 索引 (Index)

### 索引的作用

索引可以提高查询速度，原本的查询是一个个往下查，而索引是通过B+树（生成一个快速查找的结构）提高查询速度。

### 索引的缺点

- 增加存储空间
- 降低写入性能，因为要维护索引

### 创建索引

```sql
CREATE INDEX 索引名 ON 需要创建索引的表(需要创建索引的列名);
CREATE INDEX idx_employee_name ON employees(name);
```

> 创建索引之后，查询语法还是和之前一样，只是速度提高；数据库自动决定是否使用索引。

### 索引使用示例

**没有索引时的查询：**
```sql
SELECT * FROM employees WHERE name = '张三';
```

**创建索引后：**
```sql
-- 同样的查询语法！
SELECT * FROM employees WHERE name = '张三';
```

## 存储过程 (Stored Procedure)

存储过程存储在数据库里面，预定义了一些SQL语句。

存储过程是一个预定义的SQL集合。

### 创建存储过程

```sql
CREATE PROCEDURE GetEmployeeDetails 
    @EmployeeId INT
AS
BEGIN
    SELECT * FROM Employees WHERE EmployeeId = @EmployeeId;
END;
```

> `BEGIN` 和 `END` 之间就是放置SQL的地方。这段代码的目的是创建一个名为 `GetEmployeeDetails` 的存储过程，它接受一个参数 `@EmployeeId`（整数类型），然后返回与该员工ID匹配的所有员工信息。

### 调用存储过程

```sql
EXEC GetEmployeeDetails @EmployeeId = 123;
```

## 事务 (Transaction)

事务不存储在数据库里面，包裹着一些SQL语句，并且是只能全部执行成功，不然会回滚到执行前的状态。

### 事务控制语句

- **BEGIN TRANSACTION**：标记一个显式事务的开始。
- **COMMIT TRANSACTION**：提交事务，将所有修改永久保存到数据库。
- **ROLLBACK TRANSACTION**：回滚事务，撤销自 BEGIN TRANSACTION 以来的所有修改。

### 事务示例

```sql
BEGIN TRANSACTION; -- 开始事务

UPDATE Accounts SET Balance = Balance - 100 WHERE AccountId = 'A';
UPDATE Accounts SET Balance = Balance + 100 WHERE AccountId = 'B';

-- 检查是否有错误（例如余额不足、账户不存在等）
IF @@ERROR <> 0
    ROLLBACK TRANSACTION; -- 如果出错，回滚所有操作
ELSE
    COMMIT TRANSACTION; -- 如果成功，提交所有操作
```

## 异常处理

### BEGIN TRY...END TRY 和 BEGIN CATCH...END CATCH

这是SQL Server中的结构化异常处理，类似于其他编程语言中的 try-catch 块。

#### 基本结构

```sql
BEGIN TRY
    -- 这里放置可能会出错的代码
    -- 如果这里发生错误，立即跳转到CATCH块
END TRY
BEGIN CATCH
    -- 这里处理错误
    -- 只有当TRY块中出现错误时，这里才会执行
END CATCH
```

## 存储过程结合事务

### 实例：转账存储过程

```sql
CREATE PROCEDURE TransferMoney
    @FromAccount INT,
    @ToAccount INT,
    @Amount DECIMAL(10,2)
AS
BEGIN
    BEGIN TRANSACTION -- 事务开始
    
    BEGIN TRY
        -- 一系列SQL操作
        UPDATE Accounts SET Balance = Balance - @Amount 
        WHERE AccountId = @FromAccount;
        
        UPDATE Accounts SET Balance = Balance + @Amount 
        WHERE AccountId = @ToAccount;
        
        INSERT INTO TransactionLog (FromAccount, ToAccount, Amount, TransactionTime)
        VALUES (@FromAccount, @ToAccount, @Amount, GETDATE());
        
        COMMIT TRANSACTION -- 提交事务
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION -- 回滚事务
        THROW
    END CATCH
END
```

> 这个存储过程展示了如何在存储过程中使用事务和异常处理，确保转账操作的原子性和数据一致性。

## 函数 (Function)

函数存储在数据库里面，可以把它当成计算器，只能计算就行。（不常用，实际业务没有使用到过）

函数是可重用的SQL代码块，可以接受参数并返回值。SQL Server中主要有三种类型的函数。

### 1. 标量函数 (Scalar Function)

标量函数返回单个值。

```sql
CREATE FUNCTION dbo.AddNumbers
(
    @a INT,
    @b INT
)
RETURNS INT
AS
BEGIN
    RETURN @a + @b
END
```

**调用标量函数：**
```sql
SELECT dbo.AddNumbers(5, 3) AS Result;
```

### 2. 内联表值函数 (Inline Table-Valued Function)

内联表值函数返回一个表，函数体只包含一个 SELECT 语句。

```sql
CREATE FUNCTION dbo.GetEmployeesByDepartment
(
    @DeptID INT
)
RETURNS TABLE
AS
RETURN (
    SELECT EmployeeID, Name, Position
    FROM Employees
    WHERE DepartmentID = @DeptID
)
```

**调用内联表值函数：**
```sql
SELECT * FROM dbo.GetEmployeesByDepartment(1);
```

### 3. 多语句表值函数 (Multi-Statement Table-Valued Function)

多语句表值函数也返回一个表，但函数体可以包含多个语句。

**特点说明：**
- **定义返回表的结构**：多语句表值函数需要明确声明它将返回的临时表的结构，这与内联表值函数不同（内联函数直接从SELECT语句推断结构）
- **创建临时表变量**：`@Result`是一个临时表变量，函数将在其中存储结果，这个表只在函数执行期间存在
- **强类型定义**：明确指定每列的数据类型和大小（如NVARCHAR(100)），这确保了数据的一致性和安全性

```sql
CREATE FUNCTION dbo.GetEmployeesWithManagers
(
    @DeptID INT
)
RETURNS @Result TABLE
(
    EmployeeID INT,
    EmployeeName NVARCHAR(100),
    ManagerID INT,
    ManagerName NVARCHAR(100)
)
AS
BEGIN
    INSERT INTO @Result
    SELECT e.EmployeeID, e.Name, e.ManagerID, m.Name
    FROM Employees e
    LEFT JOIN Employees m ON e.ManagerID = m.EmployeeID
    WHERE e.DepartmentID = @DeptID
    
    RETURN
END
```

**调用多语句表值函数：**
```sql
SELECT * FROM dbo.GetEmployeesWithManagers(1);
```

### 4. 修改函数

要修改现有函数，可以使用 `ALTER FUNCTION` 语句，语法与 `CREATE FUNCTION` 相同。

```sql
ALTER FUNCTION dbo.AddNumbers
(
    @a INT,
    @b INT
)
RETURNS INT
AS
BEGIN
    RETURN @a + @b + 10 -- 修改后的逻辑
END
```

### 5. 删除函数

```sql
DROP FUNCTION dbo.FunctionName;
```

### 函数与存储过程的区别

| 特性 | 函数 | 存储过程 |
|------|------|----------|
| 返回值 | 必须返回值（标量或表） | 可以不返回值，或返回多个结果集 |
| 调用方式 | 在SELECT语句中调用 | 使用EXEC调用 |
| 事务处理 | 不能使用事务 | 可以使用事务 |
| 参数类型 | 只支持输入参数 | 支持输入、输出参数 |
| 使用场景 | 计算和数据处理 | 复杂的业务逻辑处理 |
