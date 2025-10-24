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
- **重要规则**：SELECT中的非聚合字段必须出现在GROUP BY中

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
- **DESC**：降序
- **ASC**：升序（默认）
- 支持多字段排序：`ORDER BY 主排序字段 方向, 次排序字段 方向`

```sql
SELECT city, COUNT(*) AS job_count
FROM jobs
GROUP BY city
HAVING COUNT(*) > 1
ORDER BY job_count DESC;  -- 按职位数量降序排列
```

## 聚合函数

聚合函数作用于每个分组内的数据（GROUP BY分好的组）：

- **SUM(列)**：求和
- **AVG(列)**：平均数
- **MAX(列)**：最大值
- **MIN(列)**：最小值
- **COUNT(列)**：计数（统计行数）

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

## IN操作符

**作用**：检测数据表里面的列是否存在IN括号里面的值
- 功能上相当于多个OR条件的组合，但更加简洁和高效

### 示例
返回`Country`字段值为`'Germany'`、`'France'`或`'UK'`的记录：

```sql
SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');
```

相当于：
```sql
SELECT * FROM Customers
WHERE Country = 'Germany' OR Country = 'France' OR Country = 'UK';
```


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

