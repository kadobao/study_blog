---
title: JAVA基础知识
icon: 
order: 1
category:
  - JAVA基础知识
tag:
  - JAVA学习
---

一个Java源文件中最多只能有一个公共类，但是可以有多个非公共类，公共类的名称必须与文件名相同。

在Java编程中，类是基本单位，它是一个蓝图或模板，用于创建对象。类包含属性和方法，这些方法可以是公开的（public）或私有的（private），可以是静态的（static）或实例的，并且可以有返回值或不返回值。实例就是不加static就是实例方法。

Java常用的2种注释，第一种是单行注释，以双斜线开头，而多行注释以/*星号开头，以*/结束。




在Java编程中，变量是存储数据的容器。每个变量都有一个类型，决定了它可以存储哪种类型的数据。Java中的变量可以分为以下几类：

### 1. 局部变量（Local Variables）

- **定义**：在方法、构造方法或语句块内部定义的变量。
- **作用域**：从声明处开始，直到包含它的块结束。
- **生命周期**：在方法或块执行时创建，执行完后销毁。
- **示例**：
  ```java
  public void myMethod() {
      int localVar = 10; // 局部变量
      System.out.println(localVar);
  }
  ```

### 2. 成员变量（Instance Variables）

- **定义**：在类中但在方法、构造方法或任何块之外定义的变量。
- **作用域**：整个类，但在类的任何方法、构造方法或块之外不能直接访问。
- **生命周期**：与对象的生命周期相同，对象被创建时初始化，对象被销毁时销毁。
- **示例**：
  ```java
  public class MyClass {
      int instanceVar; // 成员变量

      public MyClass(int instanceVar) {
          this.instanceVar = instanceVar;
      }
  }
  ```

### 3. 静态变量（Static Variables）

- **定义**：使用 `static` 关键字在类中定义的变量。
- **作用域**：整个类，可以通过类名直接访问。
- **生命周期**：与类的生命周期相同，类被加载时初始化，类被卸载时销毁。
- **示例**：
  ```java
  public class MyClass {
      static int staticVar; // 静态变量

      public static void main(String[] args) {
          MyClass.staticVar = 20;
          System.out.println(MyClass.staticVar);
      }
  }
  ```

### 4. 常量（Constants）

- **定义**：使用 `final` 关键字定义的变量，一旦赋值就不能改变。
- **作用域**：与变量的定义位置相关。
- **生命周期**：与变量的生命周期相同。
- **示例**：
  ```java
  public class MyClass {
      final int CONSTANT_VAR = 30; // 常量

      public static void main(String[] args) {
          MyClass myClass = new MyClass();
          System.out.println(myClass.CONSTANT_VAR);
      }
  }
  ```

### 5. 参数变量（Parameter Variables）

- **定义**：在方法或构造方法的参数列表中定义的变量。
- **作用域**：方法或构造方法的内部。
- **生命周期**：方法或构造方法执行时存在，执行完后销毁。
- **示例**：
  ```java
  public class MyClass {
      public void myMethod(int paramVar) { // 参数变量
          System.out.println(paramVar);
      }
  }
  ```

### 总结

- **局部变量**：在方法、构造方法或语句块内部定义，作用域和生命周期有限。
- **成员变量**：在类中定义，作用域是整个类，生命周期与对象相同。(实例变量)
- **静态变量**：使用 `static` 关键字定义，作用域是整个类，生命周期与类相同。(类变量)
- **常量**：使用 `final` 关键字定义，一旦赋值不能改变。
- **参数变量**：在方法或构造方法的参数列表中定义，作用域和生命周期有限。



System.out.println()向屏幕输出一些内容。


方法重载是指在同一个类中定义多个具有相同名称但参数列表不同的方法。方法重载的主要目的是提供灵活性，使得方法可以根据不同的参数类型或数量执行不同的操作。



理解接口的实现是Java编程中的一个重要概念。让我们通过一个详细的示例来解释如何实现接口。

### 接口的定义

首先，我们定义一个接口 `Animal`，其中包含两个抽象方法 `eat()` 和 `sleep()`，以及一个常量 `LEGS`。

```java
public interface Animal {
    void eat(); // 抽象方法
    void sleep(); // 抽象方法

    int LEGS = 4; // 常量
}
```

### 接口的实现

接下来，我们定义一个类 `Dog`，它实现 `Animal` 接口。实现接口的类必须提供接口中所有抽象方法的具体实现。

```java
public class Dog implements Animal {
    @Override
    public void eat() {
        System.out.println("The dog eats food.");
    }

    @Override
    public void sleep() {
        System.out.println("The dog sleeps.");
    }
}
```

### 解释

1. **接口定义**：
   - `Animal` 接口定义了两个抽象方法 `eat()` 和 `sleep()`，以及一个常量 `LEGS`。
   - 抽象方法没有具体实现，只有方法签名。
   - 常量 `LEGS` 默认是 `public`、`static` 和 `final` 的。

2. **类实现接口**：
   - `Dog` 类使用 `implements` 关键字来实现 `Animal` 接口。
   - `Dog` 类必须提供 `eat()` 和 `sleep()` 方法的具体实现。
   - 使用 `@Override` 注解来表明这些方法是重写接口中的抽象方法。

### 使用实现接口的类

我们可以创建 `Dog` 类的实例，并调用其方法。

```java
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // 输出: The dog eats food.
        dog.sleep(); // 输出: The dog sleeps.

        System.out.println("Number of legs: " + Animal.LEGS); // 输出: Number of legs: 4
    }
}
```

### 解释

1. **创建实例**：
   - 在 `Main` 类的 `main` 方法中，我们创建了 `Dog` 类的实例 `dog`。

2. **调用方法**：
   - 调用 `dog` 的 `eat()` 方法，输出 `The dog eats food.`。
   - 调用 `dog` 的 `sleep()` 方法，输出 `The dog sleeps.`。

3. **访问常量**：
   - 通过接口名 `Animal` 访问常量 `LEGS`，输出 `Number of legs: 4`。

### 总结

- **接口**：定义了一组抽象方法和常量。
- **实现接口**：类使用 `implements` 关键字实现接口，并提供接口中所有抽象方法的具体实现。
- **使用实现接口的类**：可以创建实现接口的类的实例，并调用其方法。

通过这个示例，你应该能够理解如何定义接口以及如何实现接口。接口在Java中用于实现多态、解耦和模块化设计，是面向对象编程中的重要概念。






**IntelliJ:**
- **适用场景：** 如果你希望保持简单，并且不需要使用外部构建管理工具，选择这个选项是最方便的。
- **优点：**
  - 设置简单。
  - 适合小型项目或Java开发初学者。

**Maven:**
- **适用场景：** 如果你想轻松管理依赖项，并且需要一个结构化的构建过程，Maven 是一个很好的选择。它在Java项目，特别是企业级应用中被广泛使用。
- **优点：**
  - 简化了依赖管理。
  - 提供了全面的项目构建生命周期支持。
  - 容易与各种IDE和CI/CD管道集成。
- **缺点：**
  - 对于非常小的项目可能有点过度。
  - 如果你是新手，学习曲线稍微陡峭。

**Gradle:**
- **适用场景：** 如果你喜欢更现代化和灵活的构建系统，并且追求更快的构建速度，Gradle 是一个不错的选择。它在Java和Android项目中越来越受欢迎。
- **优点：**
  - 高度灵活和可定制化。
  - 与Maven相比，构建速度更快。
  - 支持声明式（类似于Maven）和命令式的构建脚本。
- **缺点：**
  - 学习曲线较高，特别是如果你习惯于使用Maven。
  - 与Maven相比，文档较少。