---
title: MyBatis
date: 2022-08-08
category: database
---

## 1.Mybatis介绍

MyBatis 是一款优秀的持久层框架，它支持`自定义 SQL、存储过程以及高级映射`。

MyBatis `免除了几乎所有的 JDBC 代码`以及`设置参数和获取结果集`的工作。

## 2.关于JDBC

> JDBC编程：http://www.mybatis.cn/archives/765.html

### 2.1 什么是JDBC

Java数据库连接 `Java Database Connectivity`，简称JDBC。

JDBC是一类标准接口，**制定了统一访问各类关系数据库的标准接口**。

JDBC是Java语言中用来规范客户端程序如何来访问数据库的应用程序接口，提供了诸如查询和更新数据库中数据的方法。

### 2.2 什么是驱动

JDBC是接口，**驱动是接口的实现类**，没有驱动将无法完成数据库连接，从而不能操作数据库！

**每个数据库厂商都需要提供自己的驱动，用来连接自己公司的数据库**，也就是说驱动一般都由数据库生成厂商提供。

### 2.3 JDBC开发步骤

```java
try 
{
    //1.注册和加载数据库驱动，如加载MySQL数据库驱动
    Class.forName("com.mysql.jdbc.Driver");
    
    //2.获得数据库连接，DriverManager
    String url = "jdbc:mysql://localhost:3306/database_name";
    String user = "root";
    Strign password = "root"
    Connection conn = DriverManager.getConnection(url, user, password);
    
    //3.获得语句执行对象，然后执行SQL语句，获取执行结果，最后释放资源
    String sql = "insert into user(username, sex, address) values('张三','1','北京市')";
    Statement stmt = conn.createStatement();    //创建一个Statement对象
    stms.executeUpdate(sql);                   //执行SQL语句
    conn.close();                             //关闭数据库连接对象
    
} catch(ClassNotFoundException e) 
{
    e.printStackTrace();
}
```

## 3.Mybatis原理

### 3.1 改变

Mybatis核心流程其实与JDBC一脉相承，但是做出了改变：

* 避免了JDBC代码和手动设置参数、获取结果集

* 封装了JDBC，简化了加载驱动、创建连接、创建`Statement`等繁杂的过程，开发者只需关注SQL语句本身

* MyBatis将程序中大量的SQL语句剥离出来，`使用XML文件或注解的方式实现SQL的灵活配置`，`将SQL语句与程序代码分离`，在不修改程序代码的情况下，直接在配置文件中修改SQL语句

---

### 3.2 基本工作原理

> mybatis原理：http://www.mybatis.cn/archives/706.html

先封装SQL，接着调用JDBC操作数据库，最后把数据库返回的表结果封装成Java类

|                         | JDBC                       | Mybatis         |
| ----------------------- | -------------------------- | --------------- |
| 注册数据库连接          | DriverManager              |                 |
| 数据库连接对象          | Connection                 | SqlSession对象  |
| 操作数据库SQL语句的对象 | Statement/PrepareStatement | Executor接口    |
| 结果集或一张虚拟表      | ResultSet                  | ResultHandler   |
| 封装映射信息            |                            | MappedStatement |



![1](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202304181446542.png)

```txt
（1）读取MyBatis的配置文件。mybatis-config.xml为MyBatis的全局配置文件，用于配置数据库连接信息。

（2）加载映射文件。映射文件即SQL映射文件，该文件中配置了操作数据库的SQL语句，需要在MyBatis配置文件mybatis-config.xml中加载。mybatis-config.xml 文件可以加载多个映射文件，每个文件对应数据库中的一张表。

（3）构造会话工厂。通过MyBatis的环境配置信息构建会话工厂SqlSessionFactory。

（4）创建会话对象。由会话工厂创建SqlSession对象，该对象中包含了执行SQL语句的所有方法。

（5）Executor执行器。MyBatis底层定义了一个Executor接口来操作数据库，它将根据SqlSession传递的参数动态地生成需要执行的SQL语句，同时负责查询缓存的维护。

（6）MappedStatement对象。在Executor接口的执行方法中有一个MappedStatement类型的参数，该参数是对映射信息的封装，用于存储要映射的SQL语句的id、参数等信息。

（7）输入参数映射。输入参数类型可以是Map、List等集合类型，也可以是基本数据类型和POJO类型。输入参数映射过程类似于JDBC对preparedStatement对象设置参数的过程。

（8）输出结果映射。输出结果类型可以是Map、List等集合类型，也可以是基本数据类型和POJO类型。输出结果映射过程类似于JDBC对结果集的解析过程
```

## 4.Mybatis使用

### 4.1 构建SqlSessionFactory

每个基于 MyBatis 的应用都是以一个 SqlSessionFactory 的实例为核心的。SqlSessionFactory 的实例可以通过 SqlSessionFactoryBuilder 获得。而 SqlSessionFactoryBuilder 则可以从 XML 配置文件或一个预先配置的 Configuration 实例来构建出 SqlSessionFactory 实例。

`mybatis-config.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://127.0.0.1:3306/mybatis_study"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <!--引入映射文件-->
    <mappers>
        <mapper resource="mappers/SysUserMapper.xml"/>
    </mappers>
</configuration>
```

> mybatis配置文件详解：http://www.mybatis.cn/mybatis/32.html

### 4.2 获取 SqlSession

SqlSession 提供了在数据库执行 SQL 命令所需的所有方法

```java
try (SqlSession session = sqlSessionFactory.openSession()) {
  Blog blog = (Blog) session.selectOne("org.mybatis.example.BlogMapper.selectBlog", 101);
}
```



```java
try (SqlSession session = sqlSessionFactory.openSession()) {
  BlogMapper mapper = session.getMapper(BlogMapper.class);
  Blog blog = mapper.selectBlog(101);
}
```





