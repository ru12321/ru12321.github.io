---
title: jdk8新特性
date: 2022-02-02
category: java
---

学习资料 https://blog.csdn.net/LXYDSF/article/details/125919046

# 一、Stream新特性

## Stream概念

java.util.stream包

* Stream 是Java8 中**处理集合**的关键抽象概念，它可以对集合执行非常复杂的查找、过滤和映射数据等操作。**使用Stream API 对集合数据进行操作，就类似于使用SQL 执行的数据库查询**。

* Stream API 提供了一种高效且易于使用的处理数据的方式。
    * **Stream 和Collection 集合的区别**：Collection 是一种静态的内存数据结构，而Stream 是有关计算的。前者是主要面向内存，存储在内存中，后者主要是面向CPU，通过CPU 实现计算。

* **==集合讲的是数据，关注的是数据的存储，与内存打交道==**
* **==Stream 讲的是计算，关注的是对数据的运算，与CPU打交道==**

* Stream是==数据渠道==，用于操作数据源（集合、数组等）所生成的元素序列。
    * Stream 自己不会存储元素。
    * Stream 不会改变源对象。相反，他们会*返回一个持有结果的新 Stream* 。
    * Stream 操作是延迟执行的。这意味着他们会等到*需要结果的时候才执行*。

## Stream操作

### 1 操作步骤

1. 创建 Stream 一个数据源（如：集合、数组），获取一个
2. 中间操作（**非必要**） 一个中间操作链，对数据源的数据进行处理
3. 终止操作 一旦执行 终止操作， 就 执行中间操作链 ，并产生结果 。之后，不会再被使用

### 2 创建

#### **2.1 通过集合**

最常见！ 集合.stream()

Java8中的 Collection 接口被扩展，提供了两个获取流的方法`.stream()`，`.parallelStream()`

```java
default Stream<E> stream():返回一个顺序流
default Stream<E> parallelStream():返回一个并行流
```

```java
//创建方式一：通过集合 stream()、parallelStream()
@Test
public void test01(){
        List<Employee> employees=EmployeeTestData.getEmployees();

        //Collection接口：返回基于元素的顺序流
        Stream<Employee> stream=employees.stream();

        //Collection接口：返回一个并行流，多线程，只能用线程安全的集合
        Stream<Employee> employeeStream=employees.parallelStream();
        }
```

#### 2.2 Arrays.stream()

Java8中的 Arrays 的静态方法 `Arrays.stream()` 可以获取数组流：

```java
static<T> Stream<T> stream(T[]array):返回一个流
```

重载形式，能够处理对应基本类型的数组：

```java
public static IntStream stream(int[]array)
public static LongStream stream(long[]array)
public static DoubleStream stream(double[]array)
```

```java
//创建方式二：通过数组 调用Arrays类的static <T> Stream<T> stream(T[] array): 返回一个流
@Test
public void test02(){
        int[]arr=new int[]{1,2,3,4,5};
        IntStream stream=Arrays.stream(arr);
        Employee employee1=new Employee(1001,"ccdd",20,846);
        Employee employee2=new Employee(1001,"ccdd",20,846);
        Employee[]arr2={employee1,employee2};
        Stream<Employee> stream1=Arrays.stream(arr2);
        }
```

#### 2.3 Stream.of()

可以调用Stream 类静态方法`Stream.of()` , 通过显示值创建一个流。它可以接收任意数量的参数。

```java
public static<T> Stream<T> of(T...values):返回一个流
```

```java
//创建方式三：通过Stream的of()
@Test
public void test03(){
        Stream<Integer> stream=Stream.of(1,2,3,4);
        }
```

#### 2.4 无限流

可以使用Stream 类静态方法`Stream.iterate()` 和 `Stream.generate()`，创建无限流。

```java
public static<T> Stream<T> iterate(final T seed,final UnaryOperator<T> f)//迭代
public static<T> Stream<T> generate(Supplier<T> s)//生成
```

```java
//创建方式四：创建无限流
@Test
public void test04(){
        //对于seed，执行一元函数f，生成有序元素无限流
        // public static<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f)
        Stream.iterate(1,t->t+2).limit(10).forEach(System.out::println);

        //根据s函数，生成无序元素无限流
        // public static<T> Stream<T> generate(Supplier<T> s)
        Stream.generate(Math::random).limit(10).forEach(System.out::println);
        }
```

### 3 中间操作

多个**中间操作** 可以连接起来形成一个 **流水线** ，除非流水线上触发终止操作，否则 **中间操作不会执行任何的处理** ！而在 ==*终止操作时一次性全部处理*==，称为“惰性求值” 。

#### 3.1 筛选与切片

* **filter(Predicate p)：接收Lambda ，获得满足条件P（断定型接口 返回Boolean值）的元素**
* **distinct()：去除重复元素（同一个内存地址的）**

* **limit(long maxSize)：截断流，使其元素不超过给定数量**

* skip(long n)：跳过元素，返回一个扔掉了前n 个元素的流。若流中元素不足n 个，则返回一个空流。与`limit(n)`互补

```java
public void test01(){
        List<Employee> employees=EmployeeTestData.getEmployees();
        //filter(Predicate p)——接收 Lambda ， 从流中排除某些元素。
        //练习：查询员工表中薪资大于7000的员工信息
        employees.stream().filter(employee->employee.getSalary()>7000).forEach(System.out::println);
        System.out.println("------------------------------------------------");
        //只要前三个元素
        employees.stream().limit(3).forEach(System.out::println);
        System.out.println("------------------------------------------------");
        //不要前三个元素
        employees.stream().skip(3).forEach(System.out::println);
        System.out.println("------------------------------------------------");
        //去重
        employees.stream().distinct().forEach(System.out::println);
        System.out.println("------------------------------------------------");
        }
```

#### 3.2 映射

* **map(Function f)：接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。**
* mapToDouble(ToDoubleFunction f)：接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的DoubleStream。
* mapToInt(ToIntFunction f)：接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的IntStream。
* mapToLong(ToLongFunction f)：接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的LongStream。
* flatMap(Function f)：接收一个函数作为参数，将流中的每个值都换成另一个流，**然后把所有流连接成一个流**

```java
public void test02(){
        List<String> list=Arrays.asList("aa","dd","vv");
        //每个元素 过一遍 map中的函数计算
        list.stream().map(str->str.toUpperCase()).forEach(System.out::println);
        }
```

#### 3.3 排序

* **sorted()：产生一个新流，其中按自然顺序排序**
* sorted(Comparator com)：产生一个新流，其中按比较器顺序排序

### 4 终止操作

* ==流不一定需要中间操作，可以直接创建-->终止操作==

* 终端操作**会从流的流水线生成结果**。其结果可以是任何不是流的值，例如：List、Integer，甚至是void 。

* 流进行了终止操作后，不能再次使用。

#### 4.1 匹配与查找

* allMatch(Predicate p)：检查是否匹配所有元素

* **anyMatch(Predicate p)：检查是否至少匹配一个元素**
* noneMatch(Predicate p)：检查是否没有匹配所有元素
* **findFirst()：返回第一个元素**
* findAny()：返回当前流中的任意元素
* count()：返回流中元素总数
* max(Comparator c)：返回流中最大值。参数是比较器，比如Comparator.comparing(String::length)
* min(Comparator c)：返回流中最小值。
* **forEach(Consumer c)：内部迭代**

#### 4.2 reduce 归约

归约：将一个Stream中的所有元素反复结合起来,得到一个结果

备注：map 和reduce 的连接通常称为map-reduce 模式，因Google 用它来进行网络搜索而出名。

* reduce(T iden, BinaryOperator b)：可以将流中元素反复结合起来，得到一个值。返回T
* reduce(BinaryOperator b)：参数是二元函数。可以将流中元素反复结合起来，得到一个值。==返回Optional对象==，

```java
@Test
public void test01(){
        Stream<Integer> stream=Stream.iterate(1,i->i+2).limit(5);

        System.out.println(stream.reduce((a,b)->{
        System.out.println("a = "+a);
        System.out.println("b = "+b);
        return a+b;
        }).get());
        }

/*
a = 1
b = 3
a = 4
b = 5
a = 9
b = 7
a = 16
b = 9
25
*/
```

#### 4.3 收集

* collect(Collector c)：将流转换为==其他形式（如List 、 Set 、Map等）==。接收一个Collector接口的实现，用于给Stream中元素做汇总的方法

Collector接口中方法的实现决定了如何对流执行收集的操作 如收集到 List 、 Set 、Map。

另外，Collectors 实用类提供了很多**静态方法**，可以方便地创建常见收集器实例

![image-20230317154719527](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303171547597.png)

![image-20230317154727522](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303171547592.png)

# 二、Lambda表达式

Lambda 是一个匿名函数，我们可以把Lambda 表达式理解为是一段可以传递的代码（==将代码像数据一样进行传递==）。使用它可以写出更简洁、更灵活的代码。作为一种更紧凑的代码风格，使Java的语言表达能力得到了提升。

- 好处：避免匿名内部类定义过多，可以让代码简洁紧凑，留下核心的逻辑

* Lambda表达式特征
    * **可选类型声明：**不需要声明参数类型，编译器可以统一识别参数值。
    * **可选的参数圆括号：**一个参数无需定义圆括号，但多个参数需要定义圆括号。
    * **可选的大括号：**如果主体包含了一个语句，就不需要使用大括号。
    * **可选的返回关键字：**如果主体只有一个表达式返回值则编译器会自动返回值，大括号需要指定表达式返回了一个数值。

* 注意：lambda 表达式只能引用标记了 final 的外层局部变量，这就是说不能在 lambda 内部修改定义在域外的局部变量，否则会编译错误。

# 三、函数式接口

## 1 函数式接口概念

- 定义：==只包含一个抽象方法的接口==
- 使用 `@FunctionalInterface` 注解**用来测试用**，如果不是函数式接口，那么会报错；
    - 只要满足函数式接口的定义，*这个注解写不写无所谓*

- 可以通过 `Lambda `表达式来创建该接口的对象

* java 不但可以支持 OOP 还可以支持 OOF （面向函数编程），==将函数作为参数，进行传递==

* 在 Java8 中， `Lambda` 表达式就是一个函数式接口的实例

## 2 Java内置的函数式接口

> **一定要注意这些函数参数类型什么，返回类型是什么**

| 函数式接口       | 参数类型 | 返回类型    | 用途                                                         |
| ---------------- | -------- | ----------- | ------------------------------------------------------------ |
| `Consumer<T>`    | ==T==    | ==void==    | 对类型为T的对象应用操作，包含方法：`void accept(T t)`        |
| `Supplier<T>`    | ==无==   | ==T==       | 返回类型为T的对象，包含方法：`T get()`                       |
| `Function<T, R>` | ==T==    | ==R==       | 对类型为T的对象应用操作，并返回结果。结果是R类型的对象。包含方法：`R apply(T t)` |
| `Predicate<T>`   | ==T==    | ==boolean== | 确定类型为T的对象是否满足某约束，并返回boolean 值。包含方法：`boolean test(T t)` |

总结：**遇到方法参数类型为以上接口时，可以使用lambda表达式进行优化**

### 2.1 消费型接口 Consumer< T>     void accept(T t)

* ==**在lambda中使用：T类型参数，无需返回数据**==

**消费一个指定泛型的数据**（至于具体怎么消费(使用), 需要自定义(输出，计算…） 其数据类型由泛型决定。

```java
//将函数作为method的参数，进行传递
public static void method(String name,Consumer<String> consumer){
        //函数有一个参数哦
        consumer.accept(name);
        }

/**
 * Consumer接口的lambda使用
 */
@Test
public void test02(){
        method("我是Consumer的参数",str->{
        System.out.println(str.toUpperCase());
        });
        }
```

### 2.2 生产型接口 Supplier< T>      T get()

* ==**在lambda中使用：无参，返回T类型数据 即可**==

* 生产型接口，指定接口的泛型是什么类型，那么接口中的get方法**就会生产什么类型的数据**

```java
//定义一个方法，方法的参数传递Supplier，泛型使用Integer
public static Integer getMax(Supplier<Integer> sup){
        return sup.get();
        }
public static void main(String[]args){
        int[]arr={12,9,8,3,30};
        //调用getMax方法，方法的参数Supplier是一个函数式接口，所以可以传递Lambda表达式
        int maxValue=getMax(()->{
        int max=arr[0];
        for(int i=0;i<arr.length;i++){
        if(max<arr[i]){
        max=arr[i];
        }
        }
        return max;
        });
        System.out.println(maxValue);
        }
```

### 2.3 函数型接口 Function<T, R>      R  apply(T t)

* ==**在lambda中使用：T类型参数，返回R类型数据 即可**==

来根据一个类型的数据得到另一个类型的数据，前者称为前置条件，后者称为后置条件。

```java
public static void functional(Double salary,Function<Double, String> function){
        System.out.println(function.apply(20.0));
        }

@Test
public void test04(){
        functional(60.0,sa->sa+"薪水");
        }
//20.0薪水
```

### 2.4 断定型接口 Predicate< T>       boolean   test(T t)

==**在lambda中使用：T类型参数，返回boolean类型数据 即可**==

**对某种类型的数据进行判断**，得到一个boolean值结果

```java
/**
 * Predicate函数作为参数进行传递
 * @param user
 * @param predicate
 */
public static void predicate(String user,Predicate<String> predicate){
        boolean test=predicate.test(user);
        System.out.println(user+"的密码: "+test);

        }
/**
 * Predict接口的lambda使用
 */
@Test
public void test03(){
        //lambda的原始写法
        predicate("ruyb",str->{
        return str.equals("ruyb");
        });
        //lambda的简便写法
        predicate("ruyb",str->str.equals("ruyb"));
        }
```

# 四、方法引用与构造器引用

## 4.2

### 1 方法引用

* 使用情境：当要传递给Lambda体的操作，已经有实现的方法了，可以使用方法引用！

* **通过方法的名字来指向一个方法**，可以认为是Lambda表达式的一个语法糖

* 要求：实现接口的抽象方法的参数列表和返回值类型，必须与方法引用的方法的参数列表和返回值类型保持一致
* 格式：`类(或对象) :: 方法名`
* 如下三种主要使用情况：
    - 对象 :: 实例方法名
    - 类 :: 静态方法名
    - 类 :: 实例方法名

### 2 构造器引用

格式：ClassName :: new //构造器引用

格式：type[] :: new //数组引用

# 五、Optional类

https://www.runoob.com/java/java8-optional-class.html

### 1 概述

* 本质上，这是一个==包含有可选值==的包装类

* Optional 类是一个**可以为null的容器对象**。==**如果值存在则isPresent()方法会返回true，调用get()方法会返回该对象。**==
* Optional 是个容器：它可以保存类型T的值，或者仅仅保存null。Optional提供很多有用的方法，这样我们就**不用显式进行空值检测**。Optional
  类的引入很好的解决空指针异常（NullPointerException）。

### 2 创建optional实例

* 使用静态方法**empty()**创建一个**空的Optional对象**

```java
@Test(expected = NoSuchElementException.class)
public void whenCreateEmptyOptional_thenNull(){
        Optional<User> emptyOpt=Optional.empty();
        emptyOpt.get();
        }
```

* **明确对象不为null** 的时候使用**of()**，**包含值**的对象

```java
@Test(expected = NullPointerException.class)
public void whenCreateOfEmptyOptional_thenNullPointerException(){
        Optional<User> opt=Optional.of(user);
        }
```

* 如果对象即**可能是null也可能是非 null**，你就应该使用**ofNullable()**方法，**包含值**的对象

```java
Optional<User> opt=Optional.ofNullable(user);
```

### 3 访问对象的值

* **get()方法**

```java
@Test
public void whenCreateOfNullableOptional_thenOk(){
        String name="John";
        Optional<String> opt=Optional.ofNullable(name);

        assertEquals("John",opt.get());
        }
```

* 检查是否有值的另一个选择是 ifPresent()方法

```java
@Test
public void whenCheckIfPresent_thenOk(){
        User user=new User("john@gmail.com","1234");
        Optional<User> opt=Optional.ofNullable(user);
        assertTrue(opt.isPresent());

        assertEquals(user.getEmail(),opt.get().getEmail());
        }
```

### 4 返回默认值

* **orElse()**：如果有值则返回该值user，否则返回传递给它的参数值user2

```java
@Test
public void whenEmptyValue_thenReturnDefault(){
        User user=null;
        User user2=new User("anna@gmail.com","1234");
        User result=Optional.ofNullable(user).orElse(user2);
        //这里user对象是空的，所以返回了作为默认值的user2。
        assertEquals(user2.getEmail(),result.getEmail());
        }
```

* orElseGet()—— 其行为略有不同。这个方法会在有值的时候返回值，如果没有值，它会执行作为参数传入的**Supplier(供应者)**函数式接口，并将返回其执行结果：

```java
User result=Optional.ofNullable(user).orElseGet(()->user2);
```

### 5.map()方法





























































































































































































































