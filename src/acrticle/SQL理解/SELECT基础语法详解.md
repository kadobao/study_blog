---
title: SELLECT基础语法详解
icon: database
order: 1
category:
  - SQL理解
tag:
  - SQL基础
  - 数据库查询
---

# SELECT基础语法详解

## SQL查询语句的基本结构

```sql
SELECT 列名 
FROM 表名 
WHERE 行过滤条件 
GROUP BY 分组列 
HAVING 组过滤条件 
ORDER BY 排序列 
LIMIT 结果数量;
```

### 各子句说明

- **SELECT 列名**：指定要从数据库表中检索哪些列，后续显示的也是这些列
  - 如果要全部列：写成 `*`
  - 如果要特定列：写要检索显示的列名
  - 可以理解为选择显示哪些内容

- **FROM 表名**：指定数据来源的表

- **WHERE 行过滤条件**：筛选符合条件的行

- **GROUP BY 分组列**：将数据按指定列进行分组

- **HAVING 组过滤条件**：对分组后的结果进行过滤

- **ORDER BY 排序列**：对结果进行排序

- **LIMIT 结果数量**：限制返回的记录数量，没有这个字段就默认返回全部

## SQL执行顺序

**重要**：SQL的实际执行流程为：
```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

理解为：**过滤 → 逻辑计算 → 再过滤**

## 基本查询示例

### 1. 查询特定列
检索显示city和salary列，并且过滤条件是city为南昌：

```sql
SELECT city, salary
FROM jobs
WHERE city = '南昌';
```

### 2. 查询所有列
要求显示全部的列，过滤条件是city为南昌：

```sql
SELECT *
FROM jobs
WHERE city = '南昌';
```

## 逻辑运算符

### 常用逻辑运算符
- **AND**：逻辑与（&&）
- **OR**：逻辑或（||）
- **NOT**：逻辑非（!）

### 示例
要求显示`degree`字段不为`本科`的全部行的全部字段：

```sql
-- 方法1：使用NOT
SELECT *
FROM jobs
WHERE NOT degree = '本科';

-- 方法2：使用!=
SELECT *
FROM jobs
WHERE degree != '本科';
```

## WHERE子句详解

**作用**：原始数据过滤
- 筛选某列值达到条件的行
- 在数据分组之前进行过滤

## GROUP BY子句详解

**作用**：数据分组统计
- 相同的列值归为一组，会产生多个组
- 窗口函数和分组函数都是将相同列值分成一组，然后基本会在SELECT语句里面使用聚合函数
- **重要规则**：SELECT中的非聚合字段必须出现在GROUP BY中（SELECT 里凡是没套聚合函数（SUM/COUNT/AVG…）的普通字段，必须全部写到 GROUP BY 后面，一个都不能少、也不能多。）

### 基础语法

```sql
SELECT 分组列, 聚合函数(列名)
FROM 表名
GROUP BY 分组列;  -- 必须和 SELECT 里的非聚合列完全一致
```

### 重要规则

- `SELECT` 后面**只能写两种内容**：
  1. 你用来分组的列（`GROUP BY` 里的列）
  2. 聚合函数（`COUNT/SUM/AVG` 等）
- 不能直接查询未分组、也未聚合的普通列。

### 超简单示例（一看就懂）

假设我们有一张 **员工表（Employee）**：

| ID | Name | Department | Salary |
|----|------|------------|--------|
| 1  | 张三 | 技术部     | 8000   |
| 2  | 李四 | 技术部     | 9000   |
| 3  | 王五 | 市场部     | 6000   |
| 4  | 赵六 | 市场部     | 7000   |
| 5  | 孙七 | 人事部     | 5000   |

#### 示例1：按部门分组，统计每个部门的人数

```sql
SELECT
  Department,  -- 分组列
  COUNT(*) AS 人数  -- 聚合函数：统计每组行数
FROM Employee
GROUP BY Department;  -- 按部门分组
```

**结果**：

| Department | 人数 |
|------------|------|
| 技术部     | 2    |
| 市场部     | 2    |
| 人事部     | 1    |

#### 示例2：按部门分组，计算每个部门的总工资

```sql
SELECT
  Department,
  SUM(Salary) AS 总工资  -- 累加该部门所有员工的工资
FROM Employee
GROUP BY Department;
```

**结果**：

| Department | 总工资 |
|------------|--------|
| 技术部     | 17000  |
| 市场部     | 13000  |
| 人事部     | 5000   |

> **提示**：`SUM(Salary)` 是把**每个部门（分组）内**所有员工的 `Salary` 累加起来，不是只算某一行。

> **提示**：聚合函数计算的是**整个分组**的数据。例如 `SUM(列)` 会把该分组内所有行的对应列值**累加**起来，而不是只算单行。

### 错误示例

```sql
-- 错误：company_name不在GROUP BY中
SELECT city, company_name, COUNT(*)
FROM jobs
GROUP BY city;
```

### 正确示例

```sql
SELECT city, COUNT(*) AS job_count
FROM jobs
GROUP BY city;
```

## HAVING子句详解

**作用**：过滤分组后的结果
- 必须配合GROUP BY使用
- 可以使用聚合函数
- 例如：只显示职位数量>1的城市

```sql
SELECT city, COUNT(*) AS job_count
FROM jobs
GROUP BY city
HAVING COUNT(*) > 1;
```

## ORDER BY子句详解

**作用**：指定列按照设置的顺序排列
- **DESC**：降序（从大到小、从新到旧）
- **ASC**：升序（默认，从小到大、从旧到新）
- 支持多字段排序：`ORDER BY 主排序字段 方向, 次排序字段 方向`

```sql
SELECT city, COUNT(*) AS job_count
FROM jobs
GROUP BY city
HAVING COUNT(*) > 1
ORDER BY job_count DESC;  -- 按职位数量降序排列
```

字符串排序的作用就是将同一字符串的列排在一起，例如：

```sql
ORDER BY EquipmentID, OrderNo, Operator;
```

按设备编号排序后，同一个设备的所有记录会集中在一起。

### 多列排序的"分组聚集"效果

执行逻辑是：

1. **先按 EquipmentID 排序** → 同一设备的所有记录聚集在一起
2. **同设备内，再按 OrderNo 排序** → 订单号升序排列
3. **同设备、同订单内，再按 Operator 排序**

### 实际效果演示

假设原始数据是乱的：

| EquipmentID | OrderNo | Operator |
|:-----------|:--------|:---------|
| EQ-003      | OR-101  | 王五     |
| EQ-001      | OR-103  | 张三     |
| EQ-003      | OR-099  | 李四     |
| EQ-001      | OR-101  | 李四     |
| EQ-002      | OR-102  | 赵六     |
| EQ-001      | OR-101  | 张三     |

排序后：

| EquipmentID | OrderNo | Operator |
|:-----------|:--------|:---------|
| **EQ-001**  | OR-101  | 李四     |
| **EQ-001**  | OR-101  | 张三     |
| **EQ-001**  | OR-103  | 张三     |
| **EQ-002**  | OR-102  | 赵六     |
| **EQ-003**  | OR-099  | 李四     |
| **EQ-003**  | OR-101  | 王五     |

EQ-001 的 3 条记录、EQ-002 的 1 条、EQ-003 的 2 条，各自集中在一起。

## 聚合函数

> **提示**：聚合函数计算的是**整个分组**的数据。例如 `SUM(列)` 会把该分组内所有行的对应列值**累加**起来，而不是只算单行。

聚合函数作用于每个分组内的数据（GROUP BY分好的组）：

- **SUM(列)**：求和（累加整个分组里该列的所有值）
- **AVG(列)**：平均数（整个分组里该列的平均值）
- **MAX(列)**：最大值（整个分组里该列的最大值）
- **MIN(列)**：最小值（整个分组里该列的最小值）
- **COUNT(列)**：计数（统计整个分组的行数）

## JOIN连接查询

### 什么是JOIN？
将两个表中相关联的数据合并显示，就像拼图一样把不同表的信息拼在一起。

### 常见JOIN类型

| JOIN类型 | 作用 | 示例场景 |
|---------|------|----------|
| INNER JOIN | 只显示两个表都匹配的记录 | 查询有员工的部门信息 |
| LEFT JOIN | 显示左表所有记录，右表无匹配则为NULL | 查询所有部门（含无员工的） |


### ON关键字
**ON** 是用于明确指定表之间如何连接的关键字，只有值相等才相连。

```sql
SELECT
    ci.UserName,
    ci.ClockInTime,
    co.ClockOutTime
FROM Latest_ClockIn ci
-- ON后面是连接条件：
-- 1. 上工记录的用户名与下工记录的用户名匹配
-- 2. 下工记录的排名为1，即取最新的下工记录
-- 如果条件不满足，就取NULL
-- LEFT JOIN 的核心特点：会保留左表的所有记录，即使右表没有匹配的数据。
LEFT JOIN Latest_ClockOut co ON ci.[UserName] = co.[UserName] AND co.rn = 1;
```

#### 举例说明

假设有两张表：

**Latest_ClockIn（上工记录表）**
| UserName | ClockInTime |
|----------|-------------|
| 张三 | 2026-06-06 08:00 |
| 李四 | 2026-06-06 08:05 |
| 王五 | 2026-06-06 08:10 |

**Latest_ClockOut（下工记录表，有排名）**
| UserName | ClockOutTime | rn（排名） |
|----------|--------------|----------|
| 张三 | 2026-06-06 18:00 | 1（最新） |
| 张三 | 2026-06-06 17:00 | 2 |
| 李四 | 2026-06-06 18:05 | 1（最新） |

**执行这个JOIN后的结果：**

| UserName | ClockInTime | ClockOutTime |
|----------|-------------|--------------|
| 张三 | 08:00 | 18:00 |
| 李四 | 08:05 | 18:05 |
| 王五 | 08:10 | NULL |

**解释：**
- **张三**：两边都有且 rn=1，匹配成功 → 显示下工时间
- **李四**：两边都有且 rn=1，匹配成功 → 显示下工时间
- **王五**：左表有记录，右表没有匹配的 → **NULL**（保留左表记录）

**关键点**：LEFT JOIN 保留左表所有行，右表没有匹配的显示 NULL。王五没有下工记录，但依然出现在结果中。

## IN操作符

**作用**：检测数据表里面的列是否存在IN括号里面的值
- 功能上相当于多个OR条件的组合，但更加简洁和高效

### 示例

返回 `Country` 字段值为 `'Germany'`、`'France'` 或 `'UK'` 的记录：

```sql
SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');
```

相当于：
```sql
SELECT * FROM Customers
WHERE Country = 'Germany' OR Country = 'France' OR Country = 'UK';
```


## 窗口函数（Window Function）

### 核心特点
窗口函数的核心特点：**不合并行，但能跨行计算；为行增加新列**

- `PARTITION BY` 的意思就是：把列值相同的行划到同一个窗口（分组）里
- 窗口函数 = 函数 + OVER()，核心是保留所有行做计算

### 小诀窍

**OVER 划圈子（分组），函数在圈子里干活，函数结果当新列。**

例如：

```sql
SUM(分数) OVER(PARTITION BY 班级) AS 班级总分

LAG(数量) OVER(PARTITION BY 设备号,单号 ORDER BY 采集时间) - 数量 AS 数量差值
```

### 标准语法

```sql
窗口函数() OVER (
    PARTITION BY 分组列  -- 可选：划分窗口（分组）
    ORDER BY 排序列      -- 可选：窗口内排序
)
```

### 关键字解释

- **OVER**：标志这是一个窗口函数，必须写
- **PARTITION BY**：**按列分组**，把数据切成多个小窗口（类似 GROUP BY，但不合并行）
- **ORDER BY**：**窗口内排序**，控制计算的顺序

### 窗口函数的三大分类

#### 1. 排名函数（最常用）

给窗口内的行生成排名序号，**不改变原行数**。

| 函数 | 作用 | 示例（1,2,2,4） |
|------|------|----------------|
| ROW_NUMBER() | 连续唯一排名（无并列） | 1,2,3,4 |
| RANK() | 并列排名，跳过后续序号 | 1,2,2,4 |
| DENSE_RANK() | 并列排名，不跳过后续序号 | 1,2,2,3 |

#### 2. 聚合窗口函数

普通聚合函数（SUM/AVG/COUNT/MIN/MAX）+ OVER，**不合并行**。

#### 3. 取值函数

获取窗口内其他行的数据。

| 函数 | 作用 |
|------|------|
| LAG() | 取上一行的值 |
| LEAD() | 取下一行的值 |
| FIRST_VALUE() | 取窗口第一行的值 |
| LAST_VALUE() | 取窗口最后一行的值 |

### 实战示例

#### 测试表：学生成绩表

```sql
CREATE TABLE 成绩表 (
    班级 VARCHAR(10),
    姓名 VARCHAR(10),
    分数 INT
);

INSERT INTO 成绩表 VALUES
('一班','张三',90),
('一班','李四',85),
('一班','王五',90),
('二班','赵六',88),
('二班','钱七',92);
```

**执行结果**：表创建成功，插入5条学生成绩数据。

```
查询成绩表所有数据：
班级  姓名  分数
一班  张三   90
一班  李四   85
一班  王五   90
二班  赵六   88
二班  钱七   92
```

#### 示例1：班级内排名（窗口函数）

```sql
SELECT
    班级,
    姓名,
    分数,
    -- 班级内连续排名
    ROW_NUMBER() OVER(PARTITION BY 班级 ORDER BY 分数 DESC) AS 连续排名,
    -- 并列跳号
    RANK() OVER(PARTITION BY 班级 ORDER BY 分数 DESC) AS 并列排名,
    -- 并列不跳号
    DENSE_RANK() OVER(PARTITION BY 班级 ORDER BY 分数 DESC) AS 密集排名
FROM 成绩表;
```

**结果（保留所有5行，每行都有排名）**：

```
班级  姓名  分数  连续排名  并列排名  密集排名
一班  张三   90      1        1        1
一班  王五   90      2        1        1
一班  李四   85      3        3        2
二班  钱七   92      1        1        1
二班  赵六   88      2        2        2
```

#### 示例2：聚合窗口函数（每行看班级总分/平均分）

```sql
SELECT
    班级,
    姓名,
    分数,
    -- 班级总分
    SUM(分数) OVER(PARTITION BY 班级) AS 班级总分,
    -- 班级平均分
    AVG(分数) OVER(PARTITION BY 班级) AS 班级平均分
FROM 成绩表;
```

**结果**：每个人的行里，都能看到自己班级的总分和平均分。

```
班级  姓名  分数  班级总分  班级平均分
一班  张三   90     265      88.33
一班  李四   85     265      88.33
一班  王五   90     265      88.33
二班  赵六   88     180      90.00
二班  钱七   92     180      90.00
```

#### 示例3：累计求和（常用报表计算）

```sql
SELECT
    姓名,
    分数,
    -- 按分数排序，累计求和
    SUM(分数) OVER(ORDER BY 分数 DESC) AS 累计分数
FROM 成绩表;
```

**结果**：按分数降序排列，逐行累加。

```
姓名  分数  累计分数
钱七   92      92
张三   90     182
王五   90     272
赵六   88     360
李四   85     445
```

## COALESCE 函数

`COALESCE` 是 SQL Server 中**非常常用的空值处理函数**，核心作用是：**按顺序检查参数，返回第一个非 NULL（非空）的参数值**；如果所有参数都是 NULL，最终返回 NULL。

简单说：**从左往右找，找到第一个不为空的值就返回**。

### 基础语法

```sql
COALESCE(表达式1, 表达式2, 表达式3, ..., 表达式N)
```

### 核心规则

1. 接收**任意多个参数**（至少 1 个），参数可以是字段、常量、计算式
2. 依次判断每个参数是否为 NULL
3. 返回**第一个非 NULL** 的参数值
4. 所有参数都为 NULL 时，返回 NULL

### 简单示例（一看就懂）

#### 示例1：基础用法

```sql
-- 结果：10（第一个非空值）
SELECT COALESCE(NULL, 10, 20, 30);

-- 结果：张三（字段值非空，直接返回）
SELECT COALESCE(NULL, '张三', '未知');

-- 结果：默认值（全为NULL，返回最后一个参数）
SELECT COALESCE(NULL, NULL, '默认值');
```

#### 示例2：结合表字段（实际业务常用）

假设有用户表 `Users`：

| ID | 真实姓名 | 昵称  |
|----|----------|-------|
| 1  | 张三     | NULL  |
| 2  | NULL     | 小李  |
| 3  | NULL     | NULL  |

需求：**优先显示真实姓名，没有则显示昵称，都没有则显示「匿名用户」**

```sql
SELECT
    ID,
    COALESCE(真实姓名, 昵称, '匿名用户') AS 显示名称
FROM Users;
```

查询结果：

| ID | 显示名称 |
|----|----------|
| 1  | 张三     |
| 2  | 小李     |
| 3  | 匿名用户 |

## CASE WHEN 条件判断

`CASE WHEN` 是 SQL Server 里用于条件判断的表达式，作用和编程语言里的 `if...else if...else` 完全一样。

### 基础语法

```sql
CASE
    WHEN 条件1 THEN 返回结果1
    WHEN 条件2 THEN 返回结果2
    WHEN 条件3 THEN 返回结果3
    ELSE 其他情况默认结果
END
```

### 核心规则

1. 从上到下判断，满足第一个条件就直接返回结果，不再往下判断
2. 所有条件都不满足时，返回 ELSE 后的内容
3. 不写 ELSE，不满足条件时返回 NULL
4. 最后必须加 END 结尾

### 实用示例（一看就懂）

假设有一张学生成绩表 `StudentScores`：

| ID | Name  | Score |
|----|-------|-------|
| 1  | 张三  | 95    |
| 2  | 李四  | 82    |
| 3  | 王五  | 65    |
| 4  | 赵六  | 50    |

#### 示例1：用 CASE WHEN 给成绩评级（搜索写法）

```sql
SELECT
    Name,
    Score,
    CASE
        WHEN Score >= 90 THEN '优秀'
        WHEN Score >= 80 THEN '良好'
        WHEN Score >= 60 THEN '及格'
        ELSE '不及格'
    END AS 成绩等级  -- 给计算结果起别名
FROM StudentScores
```

**查询结果**：

| Name  | Score | 成绩等级 |
|-------|-------|----------|
| 张三  | 95    | 优秀     |
| 李四  | 82    | 良好     |
| 王五  | 65    | 及格     |
| 赵六  | 50    | 不及格   |

#### 示例2：简单 CASE（等值判断）

```sql
SELECT
    Name,
    CASE Score
        WHEN 100 THEN '满分'
        WHEN 95 THEN '顶尖'
        ELSE '普通'
    END AS 评价
FROM StudentScores
```

**查询结果**：

| Name  | 评价 |
|-------|------|
| 张三  | 顶尖 |
| 李四  | 普通 |
| 王五  | 普通 |
| 赵六  | 普通 |

### 进阶用法

#### 配合聚合函数统计（常用）

统计不同成绩等级的人数：

```sql
SELECT
    COUNT(CASE WHEN Score >= 90 THEN 1 END) AS 优秀人数,
    COUNT(CASE WHEN Score BETWEEN 80 AND 89 THEN 1 END) AS 良好人数,
    COUNT(CASE WHEN Score < 60 THEN 1 END) AS 不及格人数
FROM StudentScores
```

**查询结果**：

| 优秀人数 | 良好人数 | 不及格人数 |
|---------|---------|-----------|
| 1       | 1       | 1         |

## CTE (WITH...AS) 临时表

SQL Server 中用 `WITH...AS` 语法定义的一次性的临时视图/临时表；只在当前一条 SQL 查询、插入、更新、删除语句中有效，执行完就自动销毁，不用手动创建和删除。

### 基础语法

```sql
WITH CTE名称 AS
(
    -- 子查询语句
    SELECT 列名 FROM 表名 WHERE 条件
)
-- 主查询（使用CTE）
SELECT * FROM CTE名称 WHERE 条件;
```

### 示例1：基础CTE（最常用）

#### 场景
有一张学生表 `Students`，我们先用 CTE 筛选出**年龄 >= 20**的学生，再从里面查男生。

#### 建表 + 插入测试数据

```sql
CREATE TABLE Students (
    ID INT,
    Name VARCHAR(20),
    Age INT,
    Gender VARCHAR(10)
);

INSERT INTO Students VALUES
(1, '张三', 19, '男'),
(2, '李四', 21, '男'),
(3, '王五', 22, '女'),
(4, '赵六', 20, '男');
```

#### CTE查询语句

```sql
WITH AdultStudents AS  -- CTE名字：AdultStudents（成年学生）
(
    -- 第一步：筛选年龄 >=20 的学生
    SELECT ID, Name, Age, Gender
    FROM Students
    WHERE Age >= 20
)
-- 第二步：从CTE中查男生
SELECT * FROM AdultStudents WHERE Gender = '男';
```

#### 执行结果

| ID | Name | Age | Gender |
|----|------|-----|--------|
| 2  | 李四 | 21  | 男     |
| 4  | 赵六 | 20  | 男     |

### 示例2：多个CTE一起用

#### 场景
先定义 CTE1 筛选男生，再定义 CTE2 筛选成年男生。

```sql
WITH
CTE_Male AS  -- CTE1：男生
(
    SELECT * FROM Students WHERE Gender = '男'
),
CTE_AdultMale AS  -- CTE2：引用CTE1，成年男生
(
    SELECT * FROM CTE_Male WHERE Age >= 20
)
SELECT * FROM CTE_AdultMale;
```

#### 结果

| ID | Name | Age | Gender |
|----|------|-----|--------|
| 2  | 李四 | 21  | 男     |
| 4  | 赵六 | 20  | 男     |

### CTE + UNION ALL 完整实战示例

#### 1. 前置建表+测试数据

##### 员工表 Employee

```sql
CREATE TABLE Employee(
    ID INT,
    Name VARCHAR(20),
    Department VARCHAR(20),
    Salary INT
);

INSERT INTO Employee
VALUES
(1,'张三','技术部',8000),
(2,'李四','技术部',9000),
(3,'王五','市场部',6000),
(4,'赵六','市场部',7000),
(5,'孙七','人事部',5000);
```

原始表数据：

| ID | Name | Department | Salary |
|----|------|------------|--------|
| 1  | 张三 | 技术部     | 8000   |
| 2  | 李四 | 技术部     | 9000   |
| 3  | 王五 | 市场部     | 6000   |
| 4  | 赵六 | 市场部     | 7000   |
| 5  | 孙七 | 人事部     | 5000   |

#### 2. 业务场景

用**两个CTE**分别查出：
1. CTE1：**技术部员工**
2. CTE2：**市场部员工**
再用 `UNION ALL` 把两个CTE结果合并查询

#### 3. 带UNION ALL的CTE语句

```sql
WITH
-- CTE1：查询技术部员工
CTE_Tech AS
(
    SELECT ID,Name,Department,Salary
    FROM Employee
    WHERE Department='技术部'
),
-- CTE2：查询市场部员工
CTE_Market AS
(
    SELECT ID,Name,Department,Salary
    FROM Employee
    WHERE Department='市场部'
)
-- UNION ALL 合并两个CTE结果
SELECT * FROM CTE_Tech
UNION ALL
SELECT * FROM CTE_Market;
```

#### 4. 最终查询结果

| ID | Name | Department | Salary |
|----|------|------------|--------|
| 1  | 张三 | 技术部     | 8000   |
| 2  | 李四 | 技术部     | 9000   |
| 3  | 王五 | 市场部     | 6000   |
| 4  | 赵六 | 市场部     | 7000   |

### 拓展：单CTE内部用UNION ALL

#### 需求：直接在一个CTE里拼接两类人员

```sql
WITH CTE_UnionData AS
(
    SELECT ID,Name,Department,Salary FROM Employee WHERE Salary>=8000
    UNION ALL
    SELECT ID,Name,Department,Salary FROM Employee WHERE Salary<6000
)
SELECT * FROM CTE_UnionData;
```

#### 执行结果

| ID | Name | Department | Salary |
|----|------|------------|--------|
| 1  | 张三 | 技术部     | 8000   |
| 2  | 李四 | 技术部     | 9000   |
| 5  | 孙七 | 人事部     | 5000   |

#### 补充区别

- `UNION ALL`：**不去重、效率高**，直接拼接所有数据
- `UNION`：自动去重，速度更慢

## 总结

SQL查询的核心思路：
1. **FROM**：确定数据来源
2. **WHERE**：过滤原始数据
3. **GROUP BY**：对数据进行分组
4. **HAVING**：过滤分组结果
5. **SELECT**：选择要显示的列
6. **ORDER BY**：对结果排序
7. **LIMIT**：限制结果数量

掌握这个执行顺序和各子句的作用，就能写出正确高效的SQL查询语句。

