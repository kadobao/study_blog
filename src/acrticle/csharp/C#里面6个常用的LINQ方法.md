---
title: C#里面6个常用的LINQ方法
icon: code
order: 35
category:
  - C#学习
tag:
  - LINQ
---

适用于任何 IEnumerable&lt;T&gt; 类型的集合，如 List&lt;T&gt;, Array&lt;T&gt;, Dictionary&lt;TKey, TValue&gt; 等。


## 🧒 假设你有一筐水果（数据）

```csharp
List<string> fruits = new List<string> { "苹果", "香蕉", "苹果", "橙子", "葡萄" };
```

---

## ✅ 最常用 6 个 LINQ（含 ToList）

### 1. `Where` —— 挑出想要的
> 只要“苹果”

```csharp
var apples = fruits.Where(f => f == "苹果");
// ❌ 注意：这时候 apples 还不是一个真正的 List！
```

---

### 2. `Select` —— 把每个东西变个样
> 把水果名变成“好吃的XX”，获取里面的元素或者元素的属性，和where不同的是，select可以对每个元素进行操作，而where只能筛选出符合条件的元素

```csharp
var yummy = fruits.Select(f => "好吃的" + f).ToList();
// 结果：["好吃的苹果", "好吃的香蕉", ...]
```

---

### 3. `OrderBy` —— 排队
> 按字母顺序排（中文按拼音）

```csharp
var sorted = fruits.OrderBy(f => f).ToList();
// 结果：["苹果", "苹果", "橙子", "葡萄", "香蕉"]
```

---

### 4. `Distinct` —— 去重
> 去掉重复的

```csharp
var unique = fruits.Distinct().ToList();
// 结果：["苹果", "香蕉", "橙子", "葡萄"]
```

---

### 5. `Count` —— 数一数
> 统计“苹果”的数量

```csharp
int appleCount = fruits.Count(f => f == "苹果"); // 2
```

---

### 6. `Any` —— 有没有？
> 是否存在“葡萄”

```csharp
bool hasGrape = fruits.Any(f => f == "葡萄");   // true
```

---

## 💡 补充说明

### ToList() 示例
```csharp
var apples = fruits.Where(f => f == "苹果").ToList();
// 现在是一个真正的 List<string>
```

### ToDictionary() 示例

> 直接在查询结果后面加上`.ToDictionary(pair => pair.Key, pair => pair.Value)`就行

```csharp
var dict = new Dictionary<string, int>
{
    { "Apple", 5 },
    { "Banana", 2 },
    { "Cherry", 9 },
    { "Date", 1 }
};

// 将字典转换为列表，然后筛选数量大于3的，再转换回字典
var filteredDict = dict
    .Where(pair => pair.Value > 3)
    .ToDictionary(pair => pair.Key, pair => pair.Value);
// 结果：{ "Apple": 5, "Cherry": 9 }
```

这两个方法都是将查询结果转换为列表或字典，这在需要对查询结果进行后续操作时非常有用。
