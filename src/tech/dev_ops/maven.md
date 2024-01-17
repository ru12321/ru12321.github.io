---
title: Maven
date: 2023-03-27
category: devops
---

> 课程：尚硅谷maven
>
> deploy发布：https://ld246.com/article/1581425726499  
>
> https://blog.csdn.net/wolfking1414/article/details/125789754
>
> 



# 收获点

1.`artifactId`是每个模块的名称

2.`pom`是项目对象模型，管理项目用

3.一个工程只能有一个父工程；父工程项目的打包方式必须是pom

4.`dependencyManagement`用于父工程指定依赖版本，标签只是指定，并没有真正引入任何依赖到项目。子项目哪里用到了才真正引入相关依赖的jar包

5.`scope`默认值就是compile，

6`.plugin`插件`spring-boot-maven-plugin`帮助将模块打包为可执行的jar包（含有代码、当前服务所依赖的 jar 包、tomcat等）

7.maven仓库有`release`（稳定）和`snapshot`（不稳定）两种，具体pom中以版本号有无`-SNAPSHOT`区分，快照版本在编译时会从远程快照仓库拉取下最新的

8.`distributionManagement`用于发布依赖版本到远程仓库

9.maven模块约定的src\main等目录是在超级POM中指定好的

10.子工程

* 如果子工程坐标中的groupId和version与父工程一致，那么可以省略

* 在 POM 的继承关系中，子 POM 可以覆盖父 POM 中的配置；如果子 POM 没有覆盖，那么父 POM 中的配置将会被继承

11.在任何一个**生命周期内部**，执行任何一个具体环节的操作，都是**从本周期最初的位置开始执行，直到指定的地方**

12.一个插件可以对应多个目标，而**每一个目标都和生命周期中的某一个环节对应**。

13.IDEA操作时，右击父工程，即可直接创建其子工程，父pom的打包方式变为pom

14.项目架构设计时，需要提前建立工程间依赖关系

15.Linux命令

* `nohup`   不挂断运行：就是指客户端断开连接后，命令启动的进程仍然运行
* `&`     以后台方式运行命令，不阻塞前台命令的继续输入

16.maven构件的理解

`构件关系定义`：Maven 定义了构件之间的三种基本关系，让大型应用系统可以使用 Maven 来进行管理

- 继承关系：通过从上到下的继承关系，将各个子构件中的重复信息提取到父构件中统一管理
- 聚合关系：将多个构件聚合为一个整体，便于统一操作
- 依赖关系：Maven 定义了依赖的范围、依赖的传递、依赖的排除、版本仲裁机制等一系列规范和标准，让大型项目可以有序容纳数百甚至更多依赖

17.maven配置优先级从高到低：pom.xml> user settings > global settings，`但settings.xml的profile会覆盖掉同id的pom.xml的profile`，setting.xml的profile优先级比pom中同名的profile高

18.profile标签

* 可以在profile中的activation元素中指定激活条件，当没有指定条件，然后指定activeByDefault为true的时候就表示当没有指定其他profile为激活状态时，该profile就默认会被激活。

# 一、maven概述

## 1.1 为什么

* 依赖管理工具

  * jar包也越来越多，不好管理

  * jar包的来源多、第三方不规范，不好查找

  * jar包的依赖关系，手动管理不可能

* 构建管理工具

运行一个web工程：编译.java源文件-->打成war包-->放到tomcat运行

![image-20230512094055736](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305120940815.png)

## 1.2 是什么

### 1 构建

构建过程包含的主要的环节：

- 清理`clean`：删除上一次构建的结果，为下一次构建做好准备    `target目录清空再创建`
- 编译`compile`：Java 源程序编译成 *.class 字节码文件
- 测试`test`：运行提前准备好的测试程序     `juint自动运行测试`
- 报告：针对刚才测试的结果生成一个全面的信息
- 打包`package`
  - Java工程：jar包
  - Web工程：war包  war包下面会有很多jar包依赖
- 安装`install`：把一个 Maven 工程经过打包操作生成的 jar 包或 war 包存入 Maven 仓库
- 部署`deploy`
  - 部署 jar 包：把一个 jar 包部署到 Nexus 私服服务器上
  - 部署 war 包：借助相关 Maven 插件（例如 cargo），将 war 包部署到 Tomcat 服务器上

### 2 依赖

如果 A 工程里面用到了 B 工程的类、接口、配置文件等等这样的资源，那么我们就可以说` A 依赖 B`

依赖管理中要解决的具体问题：

- jar 包的下载：使用 Maven 之后，jar 包会从规范的远程仓库下载到本地
- jar 包之间的依赖：通过依赖的传递性自动完成
- jar 包之间的冲突：通过对依赖的配置进行调整，让某些jar包不会被导入

### 3 工作机制

maven本地仓库的jar包有三类

1.自己开发的maven工程的jar包

2.依赖的框架第三方的jar包

3.maven的插件

![image-20230512100957503](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305121009557.png)

## 1.3 安装及配置

下载链接 https://maven.apache.org/download.cgi

![image-20230512102352028](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305121023098.png)

* maven核心配置文件  conf/settings.xml

![image-20230512102325781](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305121023829.png)

* 指定本地仓库

  ```xml
  <!-- localRepository
  | The path to the local repository maven will use to store artifacts.
  |
  | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
  <localRepository>D:\maven-repository</localRepository>
  ```

  **注意**：本地仓库本身也需要使用一个**非中文、没有空格**的目录

# 二、maven核心概念

## 2.1 gav坐标

### 向量说明

使用三个**『向量』**在**『Maven的仓库』**中**唯一**的定位到一个**『jar』**包

==项目会包含很多个工程（模块），所以注意artifactId==

- groupId：公司或组织域名的倒序，**通常也会加上项目名称**
  - 例如：com.atguigu.maven  `倒序看过来就是maven.atguigu.com`
- artifactId：**模块的名称，将来作为 Maven 工程的工程名**
- version：模块的版本号，根据自己的需要设定
  - 例如：SNAPSHOT 表示快照版本，正在迭代过程中，不稳定的版本
  - 例如：RELEASE 表示正式版本

举例：

- groupId：com.atguigu.maven
- artifactId：pro01-atguigu-maven
- version：1.0-SNAPSHOT

### 坐标和仓库中 jar 包的存储路径

```xml
<groupId>javax.servlet</groupId>
<artifactId>servlet-api</artifactId>
<version>2.5</version>
```

上面坐标对应的 jar 包在 Maven 本地仓库中的位置：

```shell
Maven本地仓库根目录\javax\servlet\servlet-api\2.5\servlet-api-2.5.jar
```

## 2.2 创建工程

创建maven工程的命令，输入完，根据命令行提示操作

![image-20230512105709552](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305121057615.png)

自动生成的POM文件

```xml
  <!-- 当前Maven工程的坐标 -->
  <groupId>com.atguigu.maven</groupId>
  <artifactId>pro01-maven-java</artifactId>
  <version>1.0-SNAPSHOT</version>
  
  <!-- 当前Maven工程的打包方式，可选值有下面三种： -->
  <!-- jar：表示这个工程是一个Java工程  -->
  <!-- war：表示这个工程是一个Web工程 -->
  <!-- pom：表示这个工程是“管理其他工程”的工程 -->
  <packaging>jar</packaging>

  <name>pro01-maven-java</name>
  <url>http://maven.apache.org</url>

  <properties>
	<!-- 工程构建过程中读取源码时使用的字符集 -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <!-- 当前工程所依赖的jar包 -->
  <dependencies>
	<!-- 使用dependency配置一个具体的依赖 -->
    <dependency>
	
	  <!-- 在dependency标签内使用具体的坐标依赖我们需要的一个jar包 -->
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
	  
	  <!-- scope标签配置依赖的范围 -->
      <scope>test</scope>
    </dependency>
  </dependencies>
```

## ==2.3 pom.xml==

POM：**P**roject **O**bject **M**odel，项目对象模型。和 POM 类似的是：DOM（Document Object Model），文档对象模型。它们都是模型化思想的具体体现

POM 理念集中体现在 Maven 工程根目录下 **pom.xml** 这个配置文件中。所以这个 pom.xml 配置文件就是 Maven 工程的核心配置文件。其实学习 Maven 就是学这个文件怎么配置，各个配置有什么用

### parent

一个工程只能有一个父工程；父工程项目的打包方式必须是pom

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.6</version>
</parent>

<packaging>pom</packaging>
```

#### modelVersion

指定了当前Maven模型的版本号，maven3都是4.0.0

### groupId

子工程不写，默认使用父工程的

### artifactId 

### version

子工程不写，默认使用父工程的

### properties

定义配置属性，可以直接`${}`引用

```xml
<properties>
    <!-- 工程构建过程中读取源码时使用的字符集 -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <java.version>1.8</java.version>
    <mysql.version>5.1.41</mysql.version>
    <file.encoding>UTF-8</file_encoding>
</properties>

<dependencyManagement>
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>${mysql.version}</version>
	</dependency>
</dependencyManagement>
```

### packaging

项目打包的类型

```xml
<!-- 不写该标签默认就是jar -->
<packaging>jar</packaging>
<packaging>war</packaging>
<packaging>pom</packaging>
```

### modules/module

组合多模块或聚合项目

```xml
<modules>
    <module>estate-field-fill-api</module>
    <module>estate-field-fill-sdk</module>
    <module>estate-field-fill-service</module>
</modules>
```

### dependencyManagement

用于父工程指定依赖版本，标签只是指定，并没有真正引入任何依赖到项目。子项目哪里用到了才真正引入相关依赖的jar包；

### dependencies/dependency/scope

```xml
<!-- 当前工程所依赖的jar包 -->
<dependencies>
    <!-- 使用dependency配置一个具体的依赖 -->
    <dependency>
        <!-- 在dependency标签内使用具体的坐标依赖我们需要的一个jar包 -->
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <!-- scope标签配置依赖的范围 ：compile/test/provided/system/runtime/import -->
        <!--1.默认就是compile，编译期、测试期、运行期-->
        <scope>compile</scope>
        <!--2.测试期-->
        <scope>test</scope>
        <!--3.编译期、测试期-->
        <scope>provided</scope>
        <!--4.某些工程如springcloud需要以父工程的形式导入，但过程已经有别的父工程了，这时候就需要用import方式引入此父工程；必须放在 dependencyManagement 中-->
        <scope>import</scope>
    </dependency>
</dependencies>
```

### exclusions/exclusion



### build/plugins/plugin

```xml
<!-- 控制Maven在构建过程中相关配置 -->
<build>
    <!-- 构建过程中用到的插件 -->
    <plugins>
        <!-- 1.boot项目打包插件，打包后jar包又代码，依赖，tomcat -->
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>2.3.6.RELEASE</version>
        </plugin>
    </plugins>
</build>
```

### profiles/profile

profile：轮廓，侧面的意思

把适用于各种不同环境的配置信息分别准备好，部署哪个环境就激活哪个配置

由于 profile 标签覆盖了 pom.xml 中的默认配置，所以 profiles 标签通常是 `pom.xml 中的最后一个标签`

* 配置在当前pom.xml，当前POM生效

* 配置在settings.xml，全局生效

---

**一个 profile 可以覆盖项目的最终名称、项目依赖、插件配置等各个方面以影响构建行为**。

* id

- build
  - defaultGoal
  - finalName
  - resources
  - testResources
  - plugins
- reporting
- modules
- dependencies
- dependencyManagement
- repositories
- pluginRepositories
- properties

---

```xml
<profile>
    <id>dev</id>
    <!-- 1.激活条件 -->
    <activation>
        <!-- 1.1 配置是否默认激活 -->
        <activeByDefault>false</activeByDefault>
        <!-- 1.2 在jdk为1.5情况下激活 -->
        <jdk>1.5</jdk>
    </activation>
    <properties>
        <dev.jdbc.user>root</dev.jdbc.user>
        <dev.jdbc.password>atguigu</dev.jdbc.password>
        <dev.jdbc.url>http://localhost:3306/db_good</dev.jdbc.url>
        <dev.jdbc.driver>com.mysql.jdbc.Driver</dev.jdbc.driver>
    </properties>
    <build>
        <resources>
            <resource>
                <!-- 表示为这里指定的目录开启资源过滤功能 -->
                <directory>src/main/resources</directory>
                <!-- 将资源过滤功能打开 -->
                <filtering>true</filtering>
                <includes>
                    <include>*.properties</include>
                </includes>
                <excludes>
                    <exclude>happy.properties</exclude>
                </excludes>
            </resource>
        </resources>
    </build>
</profile>
```



### distributionManagement

mvn deploy 用来将项目生成的构件分发到远程Maven仓库

- maven仓库分为两种 **release发布仓库**(<repository>) 和 **snapshot快照仓库**(<snapshotsrepository>)

- snapshot快照仓库用于保存开发过程中的**不稳定**版本
- release正式仓库用来保存**稳定**的发行版本
- 定义一个组件/模块为快照版本  只需要在pom文件中的该模板的**版本号后面加上 -SNAPSHOT**就可以了.  注意:**必须是大写**
- maven会根据模块的版本号(pom文件中的<version>版本号</version>)中**是否带有SNAPSHOT来判断这个是**快照版本还是正式版本
  - 如果是快照版本:
    - 在mvn deploy时会自动发布到`快照版本库`中
    - 而使用快照版本的模块,在不更改版本号的情况下,直接编译打包时,maven会**自动从镜像服务器上下载最新的快照版本**
  - 如果是正式发布版本:
    - 那么在mvn deploy时会自动发布到`正式版本库`中,
    - 而使用正式版本的模块,在不更改版本号的情况下,编译打包时,**如果本地已经存在该版本的模块则使用本地的而不是主动去镜像服务器上下载**

![image-20230517103455516](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171034598.png)

```xml
<distributionManagement>
    <repository>
        <id>estate-release</id>
        <name>estate-release</name>
        <url>http://packages.glodon.com/artifactory/maven-estate-releases/</url>
    </repository>
    <snapshotRepository>
        <id>estate-snapshot</id>
        <name>estate-snapshot</name>
        <url>http://packages.glodon.com/artifactory/maven-estate-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```

## 2.4 目录

在超级POM（所有POM的父POM）中约定的目录层级

![image-20230512110429701](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305121104772.png)

* 为什么约定？

Maven 为了让构建过程能够尽可能自动化完成，所以必须约定目录结构的作用。例如：Maven 执行编译操作，必须先去 Java 源程序目录读取 Java 源代码，然后执行编译，最后把编译结果存放在 target 目录

目前开发领域的技术发展趋势就是：`约定大于配置，配置大于编码`

## 2.5 mvn命令

运行 Maven 中和构建操作相关的命令时，必须进入到 pom.xml 所在的目录

### mvn clean

删除 target 目录

### mvn compile

主程序编译

主体程序编译结果存放的目录：`target/classes`

### mvn test-compile

测试程序编译

测试程序编译结果存放的目录：`target/test-classes`

### mvn test

运行junit测试用例，并生成测试报告，目录为：target/surefire-reports

### mvn package

构建当前工程，生成jar包，目录为：target

* 生成名称为`artifactId`-`version`.jar文件

### mvn install

将本地构建过程中生成的 jar 包存入 Maven 本地仓库，目录：gav坐标+jar包名称

另外，安装操作还会将 pom.xml 文件转换为 XXX.pom 文件一起存入本地仓库

### mvn dependency:list

查看当前 Web 工程所依赖的 jar 包的列表

### mvn dependency:tree

以树形结构查看当前web工程依赖

## 2.6 web工程、java工程

* web工程中可以依赖java工程，最终部署的都是整个war包到tomcat服务器

* web工程打包后，所依赖的java工程变成 Web 工程的 WEB-INF/lib 目录下的 jar 包

![image-20230515094159042](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305150941081.png)



![image-20230515094206070](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305150942104.png)

## 2.7 依赖的范围

### 1、依赖范围

标签的位置：dependencies/dependency/**scope**

标签的可选值：**compile**/**test**/**provided**/system/runtime/**import**

①compile 和 test 对比

|         | main目录（空间） | test目录（空间） | 开发过程（时间） | 部署到服务器（时间） |
| ------- | ---------------- | ---------------- | ---------------- | -------------------- |
| compile | 有效             | 有效             | 有效             | 有效                 |
| test    | 无效             | 有效             | 有效             | 无效                 |

②compile 和 provided 对比

|          | main目录（空间） | test目录（空间） | 开发过程（时间） | 部署到服务器（时间） |
| -------- | ---------------- | ---------------- | ---------------- | -------------------- |
| compile  | 有效             | 有效             | 有效             | 有效                 |
| provided | 有效             | 有效             | 有效             | 无效                 |

③结论

compile：`通常使用的第三方框架的 jar 包`这样在项目实际运行时真正要用到的 jar 包都是以 compile 范围进行依赖的。比如 SSM 框架所需jar包

test：`测试过程中使用的 jar 包`，以 test 范围依赖进来。比如 junit

provided：`在开发过程中需要用到的“服务器上的 jar 包”`通常以 provided 范围依赖进来。比如 servlet-api、jsp-api。而这个范围的 jar 包之所以不参与部署、不放进 war 包，就是避免和服务器上已有的同类 jar 包产生冲突，同时减轻服务器的负担。说白了就是：“**服务器上已经有了，你就别带啦！**

### 2、依赖传递

A 依赖 B，B 依赖 C，那么在 A 没有配置对 C 的依赖的情况下，A 里面能不能直接使用 C？

在 A 依赖 B，B 依赖 C 的前提下，C 是否能够传递到 A，取决于 B 依赖 C 时使用的依赖范围。

- `B 依赖 C 时使用 compile 范围：可以传递`
- B 依赖 C 时使用 test 或 provided 范围：不能传递，所以需要这样的 jar 包时，就必须在需要的地方明确配置依赖才可以

### 3、依赖排除

```xml
<dependency>
	<groupId>com.atguigu.maven</groupId>
	<artifactId>pro01-maven-java</artifactId>
	<version>1.0-SNAPSHOT</version>
	<scope>compile</scope>
	<!-- 使用excludes标签配置依赖的排除	-->
	<exclusions>
		<!-- 在exclude标签中配置一个具体的排除 -->
		<exclusion>
			<!-- 指定要排除的依赖的坐标（不需要写version） -->
			<groupId>commons-logging</groupId>
			<artifactId>commons-logging</artifactId>
		</exclusion>
	</exclusions>
</dependency>
```

## 2.8 继承

![image-20230515135321508](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305151353562.png)

### 父POM

* `统一管理`各依赖的`版本号`

```xml
<groupId>com.atguigu.maven</groupId>
<artifactId>pro03-maven-parent</artifactId>
<version>1.0-SNAPSHOT</version>

<!-- 当前工程作为父工程，它要去管理子工程，所以打包方式必须是 pom -->
<packaging>pom</packaging>

<!-- 聚合各模块 -->
<modules>  
	<module>pro04-maven-module</module>
	<module>pro05-maven-module</module>
	<module>pro06-maven-module</module>
</modules>

<!-- 使用dependencyManagement标签配置对依赖的管理 -->
<!-- 被管理的依赖并没有真正被引入到工程 -->
<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-beans</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-expression</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aop</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>
	</dependencies>
</dependencyManagement>

```

只有打包方式为 pom 的 Maven 工程能够管理其他 Maven 工程。打包方式为 pom 的 Maven 工程中不写业务代码，它是专门管理其他 Maven 工程的工程

### 子POM

* 在 POM 的继承关系中，子 POM 可以覆盖父 POM 中的配置；如果子 POM 没有覆盖，那么父 POM 中的配置将会被继承

```xml
!-- 使用parent标签指定当前工程的父工程 -->
<parent>
	<!-- 父工程的坐标 -->
	<groupId>com.atguigu.maven</groupId>
	<artifactId>pro03-maven-parent</artifactId>
	<version>1.0-SNAPSHOT</version>
</parent>

<!-- 子工程的坐标 -->
<!-- 如果子工程坐标中的groupId和version与父工程一致，那么可以省略 -->
<!-- <groupId>com.atguigu.maven</groupId> -->
<artifactId>pro04-maven-module</artifactId>
<!-- <version>1.0-SNAPSHOT</version> -->

<!-- 子工程引用父工程中的依赖信息时，可以把版本号去掉。	-->
<!-- 把版本号去掉就表示子工程中这个依赖的版本由父工程决定。 -->
<!-- 具体来说是由父工程的dependencyManagement来决定。 -->
<dependencies>
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-core</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-beans</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-context</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-expression</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-aop</artifactId>
	</dependency>
</dependencies>
```

## 2.9 生命周期

maven设定了三个生命周期环节

![image-20230515154203513](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305151542571.png)

特点

- 前面三个生命周期`彼此是独立`的。
- 在任何一个**生命周期内部**，执行任何一个具体环节的操作，都是**从本周期最初的位置开始执行，直到指定的地方**。（本节记住这句话就行了，其他的都不需要记）

Maven 之所以这么设计其实就是为了提高构建过程的自动化程度：让使用者**只关心最终要干的**即可，过程中的各个环节是自动执行的

## 2.10 插件

> 生命周期定义了抽象的标准，从逻辑上该干什么事情；
>
> 插件是具体实现
>
> 插件目标是具体的一个功能

### 插件

Maven 的核心程序仅仅负责宏观调度，不做具体工作。**具体工作都是由 Maven 插件完成的**

**一个插件就是具体的jar包**

例如：编译就是由 maven-compiler-plugin-3.1.jar 插件来执行的。

### 目标（理解为插件的功能）

一个插件可以对应多个目标，而**每一个目标都和生命周期中的某一个环节对应**。

Default 生命周期中有 compile 和 test-compile 两个和编译相关的环节，这两个环节对应 compile 和 test-compile 两个目标，而这两个目标都是由 maven-compiler-plugin-3.1.jar 插件来执行的

## 2.11 仓库

- 本地仓库：在当前电脑上，为电脑上所有 Maven 工程服务
- 远程仓库：需要联网
  - 局域网：我们自己搭建的 Maven 私服，例如使用 Nexus 技术（`公司搭建自己的私服，其它人从上面下载依赖`）
  - Internet
    - 中央仓库
    - 镜像仓库：内容和中央仓库保持一致，但是能够分担中央仓库的负载，同时让用户能够就近访问提高下载速度，例如：Nexus aliyun

建议：不要中央仓库和阿里云镜像混用，否则 jar 包来源不纯，彼此冲突。

专门搜索 Maven 依赖信息的网站：https://mvnrepository.com/

# 三、IDEA操作

## 3.1 创建父工程

一个工程只能有一个父工程

![image-20230515143131006](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305151431062.png)

## 3.2 创建子工程

右击父工程，即可创建其子工程，父pom的打包方式变为pom

## 3.3 创建web工程

步骤1：创建普通工程，修改打包方式为war 修改后，下图就会识别出该module

步骤2：按下图点击添加web.xml

![image-20230515150419543](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305151504602.png)

部署到tomcat服务端

![image-20230515153537215](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305151535275.png)

# 四、微服务案例实操

## 4.1 创建工程，建立工程间依赖关系

![image-20230516100504968](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305161005027.png)

![image-20230516100414960](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305161004013.png)

## 4.2 生成微服务可运行 jar 包

可以以 SpringBoot 微服务形式直接运行的 jar 包包括：

- 当前微服务本身代码
- 当前微服务所依赖的 jar 包
- 内置 Tomcat（Servlet 容器）
- 与 jar 包可以通过 java -jar 方式直接启动相关的配置

要加入额外的资源、相关配置等等，仅靠 Maven 自身的构建能力是不够的，所以要通过 build 标签引入下面的插件。

```xml
<!-- build 标签：用来配置对构建过程的定制 -->
<build>
    <!-- plugins 标签：定制化构建过程中所使用到的插件 -->
	<plugins>
        <!-- plugin 标签：一个具体插件 -->
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
		</plugin>
	</plugins>
</build>
```

![image-20230516163548259](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305161635330.png)

**执行插件目标**

对 demo02-user-auth-center 和 demo06-mysql-data-provider 都执行下面的命令：

- clean 子命令：清理之前构建的结果
- package 子命令：我们真正要调用的 spring-boot:repackage 要求必须将当前微服务本身的 jar 包提前准备好，所以必须在它之前执行 package 子命令。
- spring-boot:repackage 子命令：调用 spring-boot 插件的 repackage 目标
- -Dmaven.test.skip=true 参数：跳过测试

```sh
mvn clean package spring-boot:repackage -Dmaven.test.skip=true
```



---

这样打出的jar包大小为40M左右，而直接使用maven的package命令，jar包只有7kb

## 4.3 部署

```sh
nohup java -jar spring-boot-demo.jar>springboot.log 2>&1 &
```

[命令解释](http://heavy_code_industry.gitee.io/code_heavy_industry/pro006-Linux/lecture/chapter03/verse04-07-nohup.html )

* nohup   不挂断运行：就是指客户端断开连接后，命令启动的进程仍然运行
* &     以后台方式运行命令，不阻塞前台命令的继续输入

# 五、再知识

## 5.1 maven认识

Maven 本身的产品定位是一款『**项目**管理工具』

所以从『项目管理』的角度来看，Maven 提供了如下这些功能：

- 项目对象模型（POM）：将`整个项目本身抽象、封装为应用程序中的一个对象`，以便于管理和操作。
- 全局性构建逻辑重用：Maven 对整个构建过程进行封装之后，程序员只需要指定配置信息即可完成构建。让构建过程从 Ant 的『编程式』升级到了 Maven 的『声明式』。
- 构件的标准集合：在 Maven 提供的标准框架体系内，所有的构件都可以按照统一的规范生成和使用。
- `构件关系定义`：Maven 定义了构件之间的三种基本关系，让大型应用系统可以使用 Maven 来进行管理
  - 继承关系：通过从上到下的继承关系，将各个子构件中的重复信息提取到父构件中统一管理
  - 聚合关系：将多个构件聚合为一个整体，便于统一操作
  - 依赖关系：Maven 定义了依赖的范围、依赖的传递、依赖的排除、版本仲裁机制等一系列规范和标准，让大型项目可以有序容纳数百甚至更多依赖
- `插件目标系统`：Maven 核心程序定义抽象的生命周期，然后将插件的目标绑定到生命周期中的特定阶段，实现了标准和具体实现解耦合，让 Maven 程序极具扩展性
- `项目描述信息`的维护：我们不仅可以在 POM 中声明项目描述信息，更可以将整个项目相关信息收集起来生成 HTML 页面组成的一个可以直接访问的站点。这些项目描述信息包括：
  - 公司或组织信息
  - 项目许可证
  - 开发成员信息
  - issue 管理信息
  - SCM 信息

## 5.2 超级 POM

类似java的Object类，是所有类的父类

Maven 在构建过程中有很多默认的设定。例如：源文件存放的目录、测试源文件存放的目录、构建输出的目录……等等。但是其实这些要素也都是被 Maven 定义过的。定义的位置就是：**超级 POM**

```xml
<build>
    <directory>${project.basedir}/target</directory>
    <outputDirectory>${project.build.directory}/classes</outputDirectory>
    <finalName>${project.artifactId}-${project.version}</finalName>
    <testOutputDirectory>${project.build.directory}/test-classes</testOutputDirectory>
    <sourceDirectory>${project.basedir}/src/main/java</sourceDirectory>
    <scriptSourceDirectory>${project.basedir}/src/main/scripts</scriptSourceDirectory>
    <testSourceDirectory>${project.basedir}/src/test/java</testSourceDirectory>
    <resources>
        <resource>
            <directory>${project.basedir}/src/main/resources</directory>
        </resource>
    </resources>
    <testResources>
        <testResource>
            <directory>${project.basedir}/src/test/resources</directory>
        </testResource>
    </testResources>
</build>
```



综上所述，平时我们使用和配置的 POM 其实大致是由四个层次组成的：

- 超级 POM：所有 POM 默认继承，只是有直接和间接之分。
- 父 POM：这一层可能没有，可能有一层，也可能有很多层。
- 当前 pom.xml 配置的 POM：我们最多关注和最多使用的一层。
- 有效 POM：隐含的一层，但是实际上真正生效的一层。继承关系中的所有 POM 叠加到一起，就得到了一个最终生效的 POM

## ==5.3 settings.xml==

其中settings.xml是maven的全局配置文件，pom.xml则是文件所在项目的局部配置

* **局部配置优先于全局配置**

* 配置优先级从高到低：pom.xml> user settings > global settings

* ==Profile标签可以覆盖当前文件的其它标签配置，所以以后`先看profile标签`==

---

### localRepository

### repositories

```xml
<repositories>
  	<!--包含需要连接到远程仓库的信息 -->
  	<repository>
    	<!--远程仓库唯一标识 -->
    	<id>codehausSnapshots</id>
    	<!--远程仓库名称 -->
        <name>Codehaus Snapshots</name>
        <!--远程仓库URL，按protocol://hostname/path形式 -->
    	<url>http://snapshots.maven.codehaus.org/maven2</url>
        <!--如何处理远程仓库里发布版本的下载 -->
    	<releases>
      		<!--true或者false表示该仓库是否为下载某种类型构件（发布版，快照版）开启。 -->
      		<enabled>false</enabled>
      		<!--该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳。这里的选项是：always（一直），daily（默认，每日），interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。 -->
      		<updatePolicy>always</updatePolicy>
      		<!--当Maven验证构件校验文件失败时该怎么做-ignore（忽略），fail（失败），或者warn（警告）。 -->
      		<checksumPolicy>warn</checksumPolicy>
    	</releases>
    	<!--如何处理远程仓库里快照版本的下载。有了releases和snapshots这两组配置，POM就可以在每个单独的仓库中，为每种类型的构件采取不同的策略。例如，可能有人会决定只为开发目的开启对快照版本下载的支持。参见repositories/repository/releases元素 -->
    	<snapshots>
      		<enabled />
      		<updatePolicy />
      		<checksumPolicy />
    	</snapshots>
  	</repository>
</repositories>

```

### servers

```xml
<server>
  <id>deploymentRepo</id>
  <username>repouser</username>
  <password>repopwd</password>
</server>
```

### mirrors

id的值为central，表示该配置为中央仓库的镜像，任何对于中央仓库的请求都会转至该镜像

```xml
<mirrors>
    <mirror>
        <!-- 该镜像的唯一标识符 -->
        <id>mirrorId</id>
        <!-- 镜像名称 -->
        <name>name</name>
        <!-- 该镜像的URL，构建系统会优先考虑使用该URL，而非使用默认的服务器URL -->
        <url>url</url>
        <!-- 被镜像的服务器的id。例如，如果我们要设置了一个Maven中央仓库（http://repo.maven.apache.org/maven2/）的镜像，就需要将该元素设置成central。这必须和中央仓库的id central完全一致。 -->
        <mirrorOf>central</mirrorOf>
    </mirror>
    <mirror>
        <id>alimaven</id>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <mirrorOf>central</mirrorOf>
    </mirror>
</mirrors>

```

### profiles

**如果一个settings.xml中的profile被激活，它的值会覆盖任何其它定义在pom.xml中带有相同id的profile**

```xml
<profiles>
    <profile>
      	<id>test</id> <!-- profile的唯一标识 -->
      	<activation /> <!-- 自动触发profile的条件逻辑 且全部满足才激活！ -->      
      	<properties /> <!-- 扩展属性列表 -->      
      	<repositories /> <!-- 远程仓库列表 -->      
      	<pluginRepositories /> <!-- 插件仓库列表 -->
    </profile>
</profiles>

```

### activeProfiles

```xml
<activeProfiles>
    <!-- 要激活的profile id -->
    <activeProfile>env</activeProfile>
</activeProfiles>
```
