# MongoDB基础

文档地址: https://docs.mongodb.com/manual/

## 简介

### 说明

- 百度百科

MongoDB是一个`基于分布式文件存储的数据库`。由C++语言编写。旨在`为WEB应用提供可扩展高性能数据存储解决方案`。

MongoDB是一个`介于关系数据库和非关系数据库`之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型 。Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，`几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引`。

总结: mongoDB 是一个==非关系型== ==文档数据库==

### 历史

- 2009年2月，MongoDB数据库首次在数据库领域亮相，打破了关系型数据库一统天下的局面；
- 2010年8月, MongoDB 1.6发布。这个版本最大的一个功能就是Sharding，自动分片
- 2014年12月, MongoDB 3.0发布。由于收购了WiredTiger 存储引擎，大幅提升了MongoDB的写入性能；
- 2015年12月，3.2版本发布，开始支持了关系型数据库的核心功能：关联。你可以一次同时查询多个MongoDB的集合。
- 2016年, MongoDB推出Atlas，在AWS、 Azure 和GCP上的MongoDB托管服务；
- **2017年10月，MongoDB成功在纳斯达克敲钟**，成为26年来**第一家以数据库产品为主要业务的上市公司。**
- 2018年6月, MongoDB4.0 发布推出ACID事务支持，**成为第一个支持强事务的NoSQL数据库；**
- 2018年--至今，MongoDB已经从一个在数据库领域籍籍无名的“小透明”，变成了话题度和热度都很高的“流量”数据库。

## 特点

### 特点

-  面向集合存储，**易存储对象类型的数据**
-  支持查询,以及动态查询
-  支持RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言
-  **文件存储格式为BSON**（一种JSON的扩展）
-  支持复制和故障恢复和分片
-  **支持事务支持**
-  索引 聚合 关联....

### 应用场景

说明：**事务一致性要求不高的可以放在mongodb中，一些重要是订单金额等数据放在关系型数据库中好点**

- 游戏应用：使用云数据库MongoDB作为游戏服务器的数据库存储用户信息。用户的游戏装备、积分等直接以内嵌文档的形式存储，方便进行查询与更新。
- 物流应用：使用云数据库MongoDB存储订单信息，订单状态在运送过程中会不断更新，以云数据库MongoDB内嵌数组的形式来存储，一次查询就能将订单所有的变更读取出来，方便快捷且一目了然。
- 社交应用：使用云数据库MongoDB存储用户信息以及用户发表的朋友圈信息，通过地理位置索引实现附近的人、地点等功能。并且，云数据库MongoDB非常适合用来存储聊天记录，因为它提供了非常丰富的查询，并在写入和读取方面都相对较快。
- 视频直播：使用云数据库MongoDB存储用户信息、礼物信息等。
- 大数据应用：使用云数据库MongoDB作为大数据的云存储系统，随时进行数据提取分析，掌握行业动态。

## 安装

官网社区版，==选择5.0版本的（6.0有Bug）==



1.先启动服务：bin目录cmd然后输入**mongod --dbpath=..\data\db**

2.打开客户端 mongo.exe

3.MongoDBCompass可视化查看工具

## 核心概念

### 库< DataBase>

​	`mongodb中的库就类似于传统关系型数据库中库的概念，用来通过不同库隔离不同应用数据`。mongodb中可以建立多个数据库。每一个库都有自己的集合和权限，不同的数据库也放置在不同的文件中。默认的数据库为"test"，数据库存储在启动指定的data目录中。

### 集合< Collection>

​	`集合就是 MongoDB 文档组，类似于 RDBMS （关系数据库管理系统：Relational Database Management System)中的表的概念`

集合存在于数据库中，一个库中可以创建多个集合。每个集合没有固定的结构，这意味着你在对集合可以插入不同格式和类型的数据，但通常情况下我们插入集合的数据都会有一定的关联性。

### 文档< Document>

文档集合中一条条记录，是一组键值(key-value)对(即 BSON)。MongoDB 的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是 MongoDB 非常突出的特点。

一个简单的文档例子如下：

### 关系总结

| RDBMS             | MongoDB           |
| ----------------- | ----------------- |
| 数据库< database> | 数据库< database> |
| 表< table>        | 集合< collection> |
| 行< row>          | 文档< document>   |
| 列< colume>       | 字段< field>      |

## 基本操作

### 库< database>

- 查看所有库

  ```sql
  > show databases;
  > show dbs;//推荐用
  ```

  ![image-20211214114636572](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20211214114636572.png)

  `注意:`

  - **`admin`**： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
  - **`local`**: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
  - **`config`**: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

- 创建数据库

  ```sql
  > use 库名
  ```

  注意: use 代表创建并使用,==当库中没有数据时默认不显示这个库==

  添加数据后，show databases才会显示

- 删除数据库

  - `默认删除当前选中的库`

  ```sql
  > db.dropDatabase()
  ```

  ![image-20211214115339513](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20211214115339513.png)

- 查看当前所在库

  ```sql
  > db;
  ```


### 集合< Collection>

就是mysql中表的概念！

- 查看库中所有集合

  ```sql
  > show collections;
  > show tables;
  ```

- 创建集合（表）

  ```sql
  > db.createCollection('集合名称', [options])
  ```

  `options可以是如下参数：`

  | 字段   | 类型 | 描述                                                         |
  | :----- | :--- | :----------------------------------------------------------- |
  | capped | 布尔 | （可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。 **当该值为 true 时，必须指定 size 参数。** |
  | size   | 数值 | （可选）为固定集合指定一个最大值，即字节数。 **如果 capped 为 true，也需要指定该字段。** |
  | max    | 数值 | （可选）指定固定集合中包含文档的最大数量。                   |

​		**注意:当集合不存在时,向集合中插入文档也会自动创建该集合。**

- 删除集合

  ```sql
  > db.集合名称.drop();
  ```


### 文档< document>

**注意：方法的参数的语法格式不要写错！**

官方doc: https://docs.mongodb.com/manual/reference/method/

- 插入文档

  - 单条文档

    ```sql
    > db.集合名称.insert({"name":"编ryb","age":25,"bir":"1997-03-24"});
    ```

  - 多条文档

    ```sql
    > db.集合名称.insert([
      	{"name":"ryb","age":25,"bir":"1997-03-24"},
      	{"name":"ryb2","age":25,"bir":"1997-03-29"}
    ]);
    ```
    
  - 脚本方式
  
    ```sql
    for(let i=0;i<100;i++){ 		  db.users.insert({"_id":i,"name":"ruyb_"+i,"age":25});
    }
    ```

  `注意:在 mongodb 中每个文档都会有一个_id作为唯一标识,_id默认会自动生成如果手动指定将使用手动指定的值作为_id 的值。`

- **查询所有**

  ```sql
  > db.集合名称.find();
  ```

- 删除文档

  ```sql
  db.集合名称.remove(
     <query>,
     {
      //参数
      justOne: <boolean>,
      writeConcern: <document>
     }
  )
  ```

  **参数说明：**

  - **query** :`可选`删除的文档的条件。
  - **justOne** : `可选`如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
  - **writeConcern** :`可选`抛出异常的级别。

- 更新文档

  ```sql
  db.集合名称.update(
     <query>,
     <update>,
     {
       upsert: <boolean>,
       multi: <boolean>,
       writeConcern: <document>
     }
  );
  ```

  **参数说明：**

  - **query** : update的查询条件，类似sql update查询内where后面的。
  - **update** : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
  - **upsert** : `可选`，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
  - **multi** : `可选`，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
  - **writeConcern** :`可选`，抛出异常的级别。
  
  ```markdown
  - db.集合名称.update({"name":"zhangsan"},{name:"11",bir:new date()}) 
  	`这个更新是将符合条件的全部更新成后面的文档,相当于先删除在更新`
  - db.集合名称.update({"name":"xiaohei"},{$set:{name:"mingming"}})
  	`保留原来数据更新,但是只更新符合条件的第一条数据`
  - db.集合名称.update({name:”小黑”},{$set:{name:”小明”}},{multi:true})		
  	`保留原来数据更新,更新符合条件的所有数据`
  - db.集合名称.update({name:”小黑”},{$set:{name:”小明”}},{multi:true,upsert:true})
  	`保留原来数据更新,更新符合条件的所有数据 没有条件符合时插入数据
  ```

## 文档查询

**MongoDB 查询文档使用 find() 方法。find() 方法以非结构化的方式来显示所有文档。**

### 语法

```sql
> db.集合名称.find(query, projection)
```

- **query** ：可选，使用查询操作符指定查询条件
- **projection** ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：

```sql
> db.集合名称.find().pretty()
```

`注意: pretty() 方法以格式化的方式来显示所有文档。`

### 对比语法

如果你熟悉常规的 SQL 数据，通过下表可以更好的理解 MongoDB 的条件语句查询：

注意：==这里的命令行查询可以封装成JSON格式作为参数传递==

![image-20211214123631600](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20211214123631600.png)

### AND

```sql
> db.集合名称.find({key1:value1, key2:value2,...}).pretty()
```

### OR

MongoDB OR 条件语句使用了关键字 **$or**,语法格式如下：

```sql
> db.集合名称.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

`类似于 WHERE 语句：WHERE key1=value1 or key2=value2`

### AND 和 OR 联合

`类似SQL语句为：'where age >50 AND (name = 'ruyb1' OR name = 'ruyb2')'`

```sql
> db.集合名称.find({"age": {$gt:50}, $or: [{"name": "ruyb1"},{"name": "ruyb2"}]}).pretty();
```

### 数组中查询

```sql
-- 测试数据
> db.集合名称.insert({ "_id" : 100, "salary" : 2200, "likes" : [ "电视", "读书", "game" ], "name" : "ruyb_0" })
-- 执行数组查询
> db.users.find({likes:"电视"})
-- $size 按照数组长度查询
> db.users.find({likes:{$size:2}});
```

### 模糊查询

`类似 SQL 中为 'where name like '%name%''`

```sql
> db.users.find({likes:/ruyb/});
```

`注意:在 mongoDB 中使用正则表达式可以是实现近似模糊查询功能`

### 排序

```sql
> db.集合名称.find().sort({name:1,salary:1}),
- 1 升序  -1 降序
```

`类似 SQL 语句为: 'order by name,age'`

### 分页

```sql
> db.集合名称.find().sort({条件}).skip(start).limit(rows);
```

`类似于 SQL 语句为: 'limit start,rows'`

### 总条数

```sql
> db.集合名称.count();
> db.集合名称.find({"name":"ruyb_0"}).count();
```

`类似于 SQL 语句为: 'select count(id) from ....'`

### 去重

```sql
> db.集合名称.distinct('字段')
```

`类似于 SQL 语句为: 'select distinct name from ....'`

### ==指定返回字段==

```sql
> db.集合名称.find({条件},{name:1,_id:0}) 
- 参数2: 1 返回  0 不返回    `注意:1和0不能同时使用`
```



## $type

### 说明

$type操作符是基于BSON类型来检索集合中匹配的数据类型，并返回结果。

MongoDB 中可以使用的类型如下表所示：

![image-20211214125324193](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20211214125324193.png)

- 如果想获取 "col" 集合中 title 为 String 的数据，你可以使用以下命令：

```sql
db.col.find({"title" : {$type : 2}}).pretty();
或
db.col.find({"title" : {$type : 'string'}}).pretty();
```

- 如果想获取 "col" 集合中 tags 为 Array 的数据，你可以使用以下命令：

```sql
dge
或
db.col.find({"tags" : {$type : 'array'}}).pretty();
```

## 索引< index>

官方doc：https://docs.mongodb.com/manual/indexes/

### 说明

索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，**索引是对数据库表中一列或多列的值进行排序的一种结构。**

### 原理

![image-20211220093934250](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20211220093934250.png)

从根本上说，MongoDB中的索引与其他数据库系统中的索引类似。MongoDB在集合层面上定义了索引，并支持对MongoDB集合中的任何字段或文档的子字段进行索引。 **非常类似mysql**

### 操作

* ==每个集合一定有一个默认的索引  _id==
* 注意参数的语法格式

0、创建索引

```sql
> db.集合名称.createIndex(keys, options)
> db.集合名称.createIndex({"title":1,"description":-1})
```

`说明: 语法中 Key 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可。`

createIndex() 接收可选参数，可选参数列表如下：

| Parameter          | Type          | Description                                                  |
| :----------------- | :------------ | :----------------------------------------------------------- |
| `background`       | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| `unique`           | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**. |
| `name`             | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。 |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。 |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |

1、查看集合索引

```sql
> db.集合名称.getIndexes()
```

2、查看集合索引大小

```sql
> db.集合名称.totalIndexSize()
```

3、删除集合所有索引

**_id不会被删除掉**

```sql
> db.集合名称.dropIndexes()
```

4、删除集合指定索引

```sql
> db.集合名称.dropIndex("索引名称")
```

### 复合索引

​	说明: 一个索引的值是由多个 key 进行维护的索引的称之为复合索引

* 注意: mongoDB 中复合索引和传统关系型数据库一致都是左前缀原则

```sql
> db.集合名称.createIndex({"title":1,"description":-1})
```

![image-20211220122531182](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20211220122531182.png)



## 聚合< aggregate>

### 说明

MongoDB 中聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果。有点类似 **SQL** 语句中的 **count(*)**。

### 常见聚合表达式

![](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20211214131110733.png)



# SpringData-MongoTemplate

参考文档：https://blog.csdn.net/dglsx123/article/details/103134976

**说明: 这里主要以 springboot 应用为基础应用进行整合开发。**

Spring Data : `Spring 数据框架 `：封装集成了大多数数据库的操作，如：

* `Spring data JPA `：提供了对mysql,orcale,sqlserver的操作；`JdbcTemplate`：封装了这个对象

* spring data Redis、spring data Elasticsearch、spring data AMQP；`RedisTemplate`，`ElasticTempalte`，`AmqpTemplate`
* **spring data MongoDB；提供了`MongoTemplate`对象，对mongo进行增删改查**

在SpringBoot使用==Spring Data==操作MongoDB

### 环境搭建

```markdown
# 引入依赖
```

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

```markdown
# 编写配置
```

```properties
# 连接到Mongo,mongodb没有开启任何安全协议 即没有开启用户名密码校验
# mongodb(协议)://121.5.167.13(主机):27017(端口)/glodon(库名)
spring.data.mongodb.uri=mongodb://127.0.0.1:27017/glodon

# mongodb 存在密码的配置
#spring.data.mongodb.host=127.0.0.1
#spring.data.mongodb.port=27017
#spring.data.mongodb.database=glodon
#spring.data.mongodb.username=root
#spring.data.mongodb.password=root
```

引入依赖后，MongoTemplate对象自动会注入到Spring工厂

### 集合操作

- 创建集合

  ```java
  @Test
  public void testCreateCollection(){
    mongoTemplate.createCollection("users");//参数: 创建集合名称
  }
  ```

  `注意:创建集合不能存在,存在报错`

- 删除集合

  ```java
  @Test
  public void testDeleteCollection(){
    mongoTemplate.dropCollection("users");
  }
  ```

### 相关注解

mongoTemplate面向对象设计，springframework.data.mongodb 提供了这些简单注解

- `@Document(collection = "users")`
  - 修饰范围: 	用在类上
  - 作用:    用来映射这个类的一个对象为 mongo 中一条文档数据
  - 属性：注解的值有`value 、collection` ，用来**指定操作的集合名称**
- `@Id`
  - 修饰范围:  用在成员变量、方法上
  - 作用：       用来将成员变量的值映射为==文档的_id== 的值
- `@Field(value = "username")`
  - 不添加注解的话，**默认是成员变量名**为文档的属性名
  - 修饰范围:  用在成员变量、方法上
  - 作用:          ==用来将成员变量以及值映射为文档中一个key、value对==
  - 属性:       注解的值有   `name,value `，用来**指定在文档中 key 的名称**，默认为成员变量名
  
- `@Transient`
  - 修饰范围: 用在成员变量、方法上
  - 作用: 用来指定改成员变量，表示该成员变量在**对象转换文档时，不参与文档的序列化**

---



### 文档操作

#### 查询

- Criteria

- ![image-20211221201808467](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20211221201808467.png)

- 常见查询

  ```java
  public void testFindDoc() {
  
      //1.查询所有
      List<User> userList = mongoTemplate.findAll(User.class);
      userList.forEach(System.out::println);
  
      //2.基于id查询
      User user = mongoTemplate.findById(100, User.class);
      System.out.println(user);
  
      //3.条件查询 参数1：查询条件，参数2：返回类型
      //空的query代表查询所有
      List<User> userList1 = mongoTemplate.find(new Query(), User.class);
      userList1.forEach(System.out::println);
  
      //4.等值查询
      Query query = Query.query(Criteria.where("name").is("ruyb3"));
      List<User> userList2 = mongoTemplate.find(query, User.class);
      userList2.forEach(System.out::println);
  
      //5.< > <= >= and 查询
      Query query1 = Query.query(Criteria.where("salary").lt(1300).and("name").is("ruyb1"));
      List<User> users = mongoTemplate.find(query1, User.class);
      users.forEach(System.out::println);
  
      //6.or
      Criteria criteria = new Criteria().orOperator(
          Criteria.where("name").is("ruyb1"),
          Criteria.where("salary").lt(5000)
      );
      Query query2 = Query.query(criteria);
      List<User> users2 = mongoTemplate.find(query2, User.class);
      users2.forEach(System.out::println);
  
      //7.排序
      Query query = new Query();
      query.with(Sort.by(Sort.Order.desc("salary")));
      List<User> users = mongoTemplate.find(query, User.class);
      users.forEach(System.out::println);
  
      //8.分页查询
      Query query = new Query();
      query.with(Sort.by(Sort.Order.desc("salary")))
          .skip(0)
          .limit(2);
      List<User> users = mongoTemplate.find(query, User.class);
      users.forEach(System.out::println);
  
      //9.总条数
      long count = mongoTemplate.count(new Query(), User.class);
      System.out.println(count);
  
      //10.去重  注意最后一个参数是返回的数据类型
      List<Double> list = mongoTemplate.findDistinct(new Query(), "salary", "users", Double.class);
      list.forEach(System.out::println);
      
      //11.JSON？？
  }
  ```



#### 添加

> 文档添加--save

```java
 //文档添加
@Test
public void testAddDoc(){
    User ruyb1 = new User(100, "ruyb1", 1200.0, new Date());
    mongoTemplate.save(ruyb1);
    //mongoTemplate.insert();
}
```

![](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20220915093357930.png)

再添加一条，但是对birthday加transent注解

```java
public class User {
    @Id
    private Integer id;
    @Field(value = "username")
    private String name;
    private Double salary;
    @Transient
    private Date birthday;
}

@Test
public void testAddDoc(){
    User ruyb2 = new User(200, "ruyb2", 1200.0, new Date());
    mongoTemplate.save(ruyb2);
}
```



![image-20220915093705156](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20220915093705156.png)

> 文档添加--insert

尝试再insert一次user1对象时，报错！

```shell
org.springframework.dao.DuplicateKeyException: Write operation error on server 127.0.0.1:27017. Write error: WriteError{code=11000, message='E11000 duplicate key error collection: glodon.users index: _id_ dup key: { _id: 100 }', details={}}.; nested exception is com.mongodb.MongoWriteException: Write operation error on server 127.0.0.1:27017. Write error: WriteError{code=11000, message='E11000 duplicate key error collection: glodon.users index: _id_ dup key: { _id: 100 }', details={}}.
```

---

批处理insert

```java
List<User> userList = Arrays.asList(new User(300, "ruyb3", 1300.0, new Date()),
                                    new User(400, "ruyb4", 1400.0, new Date()));

//参数1：批量数据，参数2：指定放入哪个集合
mongoTemplate.insert(userList, User.class);
```

总结

- 批处理操作时（比如insert一个集合List）：
  - `save`只能一条条放，需遍历整个数据，一次插入或更新，效率较低。
  - `insert`可以一次性插入整个数据，效率较高；==批量处理推荐==
- 插入重复数据时：
  - `save`对已存在的数据进行更新。
  - `insert`报错`DuplicateKeyException`提示主键重复；

#### 更新

```java
@Test
public void  testUpdate(){
  //1.更新条件
  Query query = Query.query(Criteria.where("name").is("ruyb2"));
  //2.更新内容
  Update update = new Update();
  update.set("name","ruyb200");

  //单条更新
  mongoTemplate.updateFirst(query, update, User.class);
  //多条更新
  mongoTemplate.updateMulti(query, update, User.class);
  //更新插入
  mongoTemplate.upsert(query,update,User.class);

  //返回值均为 updateResult
  //System.out.println("匹配条数:" + updateResult.getMatchedCount());
  //System.out.println("修改条数:" + updateResult.getModifiedCount());
  //System.out.println("插入id_:" + updateResult.getUpsertedId());
}
```

#### 删除

```java
@Test
public void testDelete(){
  //删除所有
  mongoTemplate.remove(new Query(),User.class);
  //条件删除
  mongoTemplate.remove(
    Query.query(Criteria.where("name").is("ruyb200")),
    User.class
  );
}
```



# SpringData-MongoRepository

MongoRepository能够满足一般的需求开发，而且拿来即用即可

https://blog.csdn.net/weixin_42806958/article/details/115768900

### 环境搭建

```java
@Repository
public interface UserRepository extends MongoRepository<User,String> {
}
```

### 测试mongorepository

在springboot环境下 测试了mongorepository的功能

```java
public class MongoRepositoryTest extends ApplicationTests {

    @Autowired
    private UserRepository userRepository;

    //增加
    @Test
    public void add() throws ParseException {
        for (int i = 0; i < 1; i++) {
            User user = new User();
            user.setId("001");
            user.setName("ruyb_" + i);
            user.setSalary(2000.0 + 100.0 * i);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date date = dateFormat.parse("2022-09-15");
            user.setBirthday(date);
            userRepository.save(user);
        }
    }

    //删除
    @Test
    public void delete() {
        userRepository.deleteById("6322e0fdb641e92a9d818edb");
    }

    //修改
    @Test
    public void update() {
        User user = userRepository.findById("6322e19c00bde16337ebe91f").get();
        user.setSalary(9999.99);
        userRepository.save(user);
    }

    //查询所有
    @Test
    public void findAll() {
        List<User> userList = userRepository.findAll();
        userList.forEach(System.out::println);
    }

    //查询通过id
    @Test
    public void findById() {
        User user = userRepository.findById("6322e19c00bde16337ebe91f").get();
        System.out.println(user);
    }

    //查询通过条件 example相当于一个对象，查出来和对象属性相同的数据
    @Test
    public void findByCondition() throws ParseException {
        User user = new User();
        user.setName("ruyb_0");
        //user.setId("001");
        //user.setSalary(2000.0);
        //SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        //Date date = dateFormat.parse("2022-09-15");
        //user.setBirthday(date);
        Example<User> example = Example.of(user);
        List<User> userList = userRepository.findAll(example);
        userList.forEach(System.out::println);
    }

    //模糊查询
    @Test
    public void findLikeName() {
        //创建匹配器，即如何使用查询条件
        // 改变默认字符串匹配方式：模糊查询
        // 改变默认大小写忽略方式：忽略大小写
        ExampleMatcher matcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreCase(true);
        User user = new User();
        user.setName("ruyb");
        //模糊查询条件
        Example<User> userExample = Example.of(user, matcher);
        List<User> userList = userRepository.findAll(userExample);
        System.out.println(userList);
    }

    @Test
    public void page() {
        //分页参数 参数1：第几页:，参数2：每页几条
        PageRequest pageRequest = PageRequest.of(0, 1);
        PageRequest pageRequest2 = PageRequest.of(1, 1);

        User user = new User();
        user.setName("ruyb_0");

        Example<User> example = Example.of(user);
        Page<User> all = userRepository.findAll(example, pageRequest);
        for (User user1 : all) {
            System.out.println(user1);
        }
    }
}
```



### API整理

关于这一类，比较麻烦的地方就是不知道有哪些方法是JPA自动生成的。除了通过idea的提示可以做一部分判断，另一个方法还是要通过查看源码来判断。通过查看代码，发现每个类的Repository类都会继承**MongoRepository**，而MongoRepository继承了**PagingAndSortingRepository**，PagingAndSortingRepository继承**CrudRepository**，CrudRepository继承**Repository**。所以这几个Repository中已经有的方法都是JPA可以自动生成的。**使用某一具体方法时可以在这几个Repository中查找是否有对应方法**

在这里我们需要区分两种情况：一种是**本身的Repository类继承**的那一些Repository提供的基本的数据操作方法，包含基本的增删改查、分页查询、排序查询等，对于这一种，在创建的Repository类中是不需要再申明方法的。另一种是我们可以自己写一些简单的方法，这些方法只需要**符合Spring Data制定的那一类规范**就能被其识别出来，对于这一种就需要在Repository类中声明方法。



### ==Spring Data Repository接口==

https://docs.spring.io/spring-data/mongodb/docs/2.2.2.RELEASE/reference/html/#repositories

`CrudRepository`  接口定义的通用的底层持久性CRUD方法

![image-20220919091640818](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20220919091640818.png)

`PagingAndSortingRepository`接口提供分页方法

![image-20220919092419021](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20220919092419021.png)

`派生计数查询、删除方法`

```java
interface UserRepository extends CrudRepository<User, Long> {

    long countByLastname(String lastname);
    
    long deleteByLastname(String lastname);

    List<User> removeByLastname(String lastname);
}
```

### ==MongoDB repository==

文档很详细！！

https://docs.spring.io/spring-data/mongodb/docs/2.2.2.RELEASE/reference/html/#mongo.repositories

#### `支持查询方法的关键字`

| Keyword                              | Sample                                                       | Logical result                                               |
| :----------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `After`                              | `findByBirthdateAfter(Date date)`                            | `{"birthdate" : {"$gt" : date}}`                             |
| `GreaterThan`                        | `findByAgeGreaterThan(int age)`                              | `{"age" : {"$gt" : age}}`                                    |
| `GreaterThanEqual`                   | `findByAgeGreaterThanEqual(int age)`                         | `{"age" : {"$gte" : age}}`                                   |
| `Before`                             | `findByBirthdateBefore(Date date)`                           | `{"birthdate" : {"$lt" : date}}`                             |
| `LessThan`                           | `findByAgeLessThan(int age)`                                 | `{"age" : {"$lt" : age}}`                                    |
| `LessThanEqual`                      | `findByAgeLessThanEqual(int age)`                            | `{"age" : {"$lte" : age}}`                                   |
| `Between`                            | `findByAgeBetween(int from, int to)` `findByAgeBetween(Range<Integer> range)` | `{"age" : {"$gt" : from, "$lt" : to}}` lower / upper bounds (`$gt` / `$gte` & `$lt` / `$lte`) according to `Range` |
| `In`                                 | `findByAgeIn(Collection ages)`                               | `{"age" : {"$in" : [ages…]}}`                                |
| `NotIn`                              | `findByAgeNotIn(Collection ages)`                            | `{"age" : {"$nin" : [ages…]}}`                               |
| `IsNotNull`, `NotNull`               | `findByFirstnameNotNull()`                                   | `{"firstname" : {"$ne" : null}}`                             |
| `IsNull`, `Null`                     | `findByFirstnameNull()`                                      | `{"firstname" : null}`                                       |
| `Like`, `StartingWith`, `EndingWith` | `findByFirstnameLike(String name)`                           | `{"firstname" : name} (name as regex)`                       |
| `NotLike`, `IsNotLike`               | `findByFirstnameNotLike(String name)`                        | `{"firstname" : { "$not" : name }} (name as regex)`          |
| `Containing` on String               | `findByFirstnameContaining(String name)`                     | `{"firstname" : name} (name as regex)`                       |
| `NotContaining` on String            | `findByFirstnameNotContaining(String name)`                  | `{"firstname" : { "$not" : name}} (name as regex)`           |
| `Containing` on Collection           | `findByAddressesContaining(Address address)`                 | `{"addresses" : { "$in" : address}}`                         |
| `NotContaining` on Collection        | `findByAddressesNotContaining(Address address)`              | `{"addresses" : { "$not" : { "$in" : address}}}`             |
| `Regex`                              | `findByFirstnameRegex(String firstname)`                     | `{"firstname" : {"$regex" : firstname }}`                    |
| `(No keyword)`                       | `findByFirstname(String name)`                               | `{"firstname" : name}`                                       |
| `Not`                                | `findByFirstnameNot(String name)`                            | `{"firstname" : {"$ne" : name}}`                             |
| `Near`                               | `findByLocationNear(Point point)`                            | `{"location" : {"$near" : [x,y]}}`                           |
| `Near`                               | `findByLocationNear(Point point, Distance max)`              | `{"location" : {"$near" : [x,y], "$maxDistance" : max}}`     |
| `Near`                               | `findByLocationNear(Point point, Distance min, Distance max)` | `{"location" : {"$near" : [x,y], "$minDistance" : min, "$maxDistance" : max}}` |
| `Within`                             | `findByLocationWithin(Circle circle)`                        | `{"location" : {"$geoWithin" : {"$center" : [ [x, y], distance]}}}` |
| `Within`                             | `findByLocationWithin(Box box)`                              | `{"location" : {"$geoWithin" : {"$box" : [ [x1, y1], x2, y2]}}}` |
| `IsTrue`, `True`                     | `findByActiveIsTrue()`                                       | `{"active" : true}`                                          |
| `IsFalse`, `False`                   | `findByActiveIsFalse()`                                      | `{"active" : false}`                                         |
| `Exists`                             | `findByLocationExists(boolean exists)`                       | `{"location" : {"$exists" : exists }}`                       |

#### 删除方法

可以返回列表或者删除的数

![image-20220919094333237](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20220919094333237.png)



### ==Repository query keywords==

Spring data repository 查询派生机制通常支持的关键字

| Logical keyword       | Keyword expressions                            |
| :-------------------- | :--------------------------------------------- |
| `AND`                 | `And`                                          |
| `OR`                  | `Or`                                           |
| `AFTER`               | `After`, `IsAfter`                             |
| `BEFORE`              | `Before`, `IsBefore`                           |
| `CONTAINING`          | `Containing`, `IsContaining`, `Contains`       |
| `BETWEEN`             | `Between`, `IsBetween`                         |
| `ENDING_WITH`         | `EndingWith`, `IsEndingWith`, `EndsWith`       |
| `EXISTS`              | `Exists`                                       |
| `FALSE`               | `False`, `IsFalse`                             |
| `GREATER_THAN`        | `GreaterThan`, `IsGreaterThan`                 |
| `GREATER_THAN_EQUALS` | `GreaterThanEqual`, `IsGreaterThanEqual`       |
| `IN`                  | `In`, `IsIn`                                   |
| `IS`                  | `Is`, `Equals`, (or no keyword)                |
| `IS_EMPTY`            | `IsEmpty`, `Empty`                             |
| `IS_NOT_EMPTY`        | `IsNotEmpty`, `NotEmpty`                       |
| `IS_NOT_NULL`         | `NotNull`, `IsNotNull`                         |
| `IS_NULL`             | `Null`, `IsNull`                               |
| `LESS_THAN`           | `LessThan`, `IsLessThan`                       |
| `LESS_THAN_EQUAL`     | `LessThanEqual`, `IsLessThanEqual`             |
| `LIKE`                | `Like`, `IsLike`                               |
| `NEAR`                | `Near`, `IsNear`                               |
| `NOT`                 | `Not`, `IsNot`                                 |
| `NOT_IN`              | `NotIn`, `IsNotIn`                             |
| `NOT_LIKE`            | `NotLike`, `IsNotLike`                         |
| `REGEX`               | `Regex`, `MatchesRegex`, `Matches`             |
| `STARTING_WITH`       | `StartingWith`, `IsStartingWith`, `StartsWith` |
| `TRUE`                | `True`, `IsTrue`                               |
| `WITHIN`              | `Within`, `IsWithin`                           |



### Example类

https://blog.csdn.net/weixin_41326813/article/details/108708712

Example用来模糊搜索

```java
package org.springframework.data.domain;

import org.springframework.data.util.ProxyUtils;

//支持示例查询
public interface Example<T> {
    
    //Create a new Example including all non-null properties by default.
    //probe是实体类 包含用于查询的参数  不能为空
    static <T> Example<T> of(T probe) {
        return new TypedExample(probe, ExampleMatcher.matching());
    }
    
	//Create a new Example using the given ExampleMatcher.
    static <T> Example<T> of(T probe, ExampleMatcher matcher) {
        return new TypedExample(probe, matcher);
    }

    T getProbe();

    ExampleMatcher getMatcher();

    default Class<T> getProbeType() {
        return ProxyUtils.getUserClass(this.getProbe().getClass());
    }
}
```



# 问题讨论

> 问题1：能否通过mongoTemplate只查询某个字段

能。可以通过mongoTemplate的BasicQuery的构造方法封装查询条件、显示字段进行查询，构造函数API如下：

**BasicQuery 类：自定义查询实现，从任意JSON查询字符串设置基本查询。**

```java
/**
* Create a new {@link BasicQuery} given a JSON {@code query} and {@code fields}.
* @param query may be {@literal null}. 参数1：查询条件
* @param fields may be {@literal null}. 参数2：控制显示字段
*/
public BasicQuery(@Nullable String query, @Nullable String fields) {
    this(query != null ? Document.parse(query) : new Document(),
         fields != null ? Document.parse(fields) : new Document());
}
```

本质上是==通过JSON查询==，所以以下直接用==JSON格式==封装查询条件和显示字段

> 问题2：当文档的某字段数据量大的情况下，只查询该字段和查询该文档的效率哪个高？

## 查出一条文档指定字段 JSON

测试在SpringBoot 2.7.3 版本，引入spring-boot-starter-data-mongodb依赖进行

**实体类User**

```java
@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;
    @Field(value = "username")
    private String name;
    private Double salary;
    private Date birthday;
}
```

**测试类**MongoTemplateTests通过构造注入mongoTemplate实例对象，测试方法如下：

```java
//查询一个字段数据的时间  JSON查询  705  661 637
@Test
public void testFindField03() {
    long start = System.currentTimeMillis();
    for (int i = 0; i < count; i++) {
        Query query2 = new BasicQuery("{salary:{$gt:3000}}", "{username:1, _id:0}");
        List<Map> userList2 = mongoTemplate.find(query2, Map.class, "users");
        userList2.forEach(System.out::println);
    }
    long end = System.currentTimeMillis();
    System.out.println("查询一条数据的时间：" + (end - start));
}
```

**执行结果：**

为避免控制台输出的影响，对比运行时注释掉第8行输出语句

```shell
#username是String类型字段，长度444（为下面对比查询整条数据的效率）
#{username=ruyb_4还记得看干啥的萨科技和打开的骄傲看到了扩大时刻到了哈萨我quiet请问IU让我去高...}
查询一条数据的时间：705 
```

## 查出一条文档指定字段 query.field

```java
//查询一个字段数据的时间  query.fields()  657 664 648
@Test
public void testFindField04() {
    long start = System.currentTimeMillis();
    for (int i = 0; i < count; i++) {
        Criteria criteria = Criteria.where("salary").gt(3000);
        Query query = new Query(criteria);
        Field field = query.fields().exclude("_id", "salary", "birthday");

        List<Map> userList2 = mongoTemplate.find(query, Map.class, "users");
        userList2.forEach(System.out::println);
    }
    long end = System.currentTimeMillis();
    System.out.println("查询一条数据的时间：" + (end - start));
}
```

## 查出一条文档 

对比同样查询条件、查出该条文档数据（不去筛选字段）

```java
//测试查询一条数据的时间  普通 575 561 577
@Test
public void testFindField02() {
    long start = System.currentTimeMillis();
    for (int i = 0; i < count; i++) {
        Query query2 = Query.query(Criteria.where("salary").gt(3000));
        List<Map> userList2 = mongoTemplate.find(query2, Map.class, "users");
        userList2.forEach(System.out::println);
    }
    long end = System.currentTimeMillis();
    System.out.println("查询一条数据的时间：" + (end - start));
}
```

## 总结

查询一条文档的指定字段  JSON格式		 			耗时 **667** ms

查询一条文档的指定字段  query.field格式		 耗时 **656** ms

查询一条文档 					     							 			耗时 **571** ms

通过mongoTemplate只查询文档的某个字段的效率并不如查询整条数据高，查询指定字段的方法实际上只是控制了字段的显示和关闭

