---
title: springcloud
date: 2023-03-27
category: java
---

## 什么是微服务

- 官网: https://www.martinfowler.com/articles/microservices.html


In short, the microservice architectural(架构) style is an approach to developing a single application as `a suite(系列) of small services`, each `running in its own process(进程)` and communicating with lightweight mechanisms, often an HTTP resource API. These services are `built around business(业务) capabilities(单元)` and `independently(独立) deployable(部署)` by fully automated deployment machinery. `There is a bare(基于) minimum of centralized(集中) management(管理) of these services`, which may be written in different programming languages and use different data storage technologies.                        -----[摘自官网]

```markdown
- a suite of small services                      				
- 一系列微小服务
- running in its own process                                    
- 运行在自己的进程里
- built around business capabilities                            
- 围绕自己的业务开发
- independently deployable                                      
- 独立部署
- bare minimum of centralized management of these services      
- 基于分布式管理
```

- 官方定义:**微服务就是由一系列围绕自己业务开发的微小服务构成,他们独立部署运行在自己的进程里,基于分布式的管理**
- 通俗定义:**微服务是一种架构，这种架构是将单个的整体应用程序分割成更小的项目关联的独立的服务。一个服务通常实现一组独立的特性或功能，包含自己的业务逻辑和适配器。各个微服务之间的关联通过暴露api来实现。这些独立的微服务不需要部署在同一个虚拟机，同一个系统和同一个应用服务器中。**

---

## 为什么是微服务?

### 单体应用

![image-20200708224716035](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201515958.png)

```markdown
# 1.优点
-	单一架构模式在项目初期很小的时候开发方便，测试方便，部署方便，运行良好。
# 2.缺点
- 应用随着时间的推进，加入的功能越来越多，最终会变得巨大，一个项目中很有可能数百万行的代码，互相之间繁琐的jar包。
- 久而久之，开发效率低，代码维护困难
- 还有一个如果想整体应用采用新的技术，新的框架或者语言，那是不可能的。
- 任意模块的漏洞或者错误都会影响这个应用，降低系统的可靠性
```

### 微服务架构应用

![image-20200723155352063](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201515962.png)

```markdown
# 1.优点
- 将服务拆分成多个单一职责的小的服务，进行单独部署，服务之间通过网络进行通信
- 每个服务应该有自己单独的管理团队，高度自治
- 服务各自有自己单独的职责，服务之间松耦合，避免因一个模块的问题导致服务崩溃
# 2.缺点
- 开发人员要处理分布式系统的复杂性
- 多服务运维难度，随着服务的增加，运维的压力也在增大
- 服务治理 和 服务监控 关键
```

### 架构的演变

```markdown
# 1.架构的演变过程
- [单一应用架构] `===>` [垂直应用架构] `===>` [分布式服务架构] `===>` [流动计算架构]||[微服务架构] `===>` [未知]
```

- dubbo官网:http://dubbo.apache.org/zh-cn/docs/user/preface/background.html

![image-20200318082336122](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201515966.png)

```markdown
# 1. All in One Application 	单一架构
- 起初当网站流量很小时,将所有功能都写在一个应用里面,对整个应用进行部署,以减少部署节点和成本。对于这个架构简化增删改查的工作量的数据访问框架（ORM）是关键。

# 2. Vertical Application 		垂直架构
- 当访问量逐渐增大，单一应用增加机器带来的加速度越来越小，提升效率的方法之一是将应用拆成互不相干的几个应用，以提升效率。此时，用于加速前端页面开发的Web框架(MVC)是关键。

# 3. Distributed Service    	分布式服务架构
- 当垂直应用越来越多，应用之间交互不可避免，将核心业务抽取出来，作为独立的服务，逐渐形成稳定的服务中心，使前端应用能更快速的响应多变的市场需求。此时，用于提高业务复用及整合的分布式服务框架(RPC)是关键。

# 4. Elastic Computing				流动计算架构即微服务架构
- 当服务越来越多，容量的评估，小服务资源的浪费等问题逐渐显现，此时需增加一个调度中心基于访问压力实时管理集群容量，提高集群利用率。此时，用于提高机器利用率的资源调度和治理中心(SOA)是关键
```

**好的架构并不是设计出来的,一定是进化来的**

----

## 微服务的解决方案

```markdown
# 1.Dubbo (阿里系)
- 初出茅庐:2011年末，阿里巴巴在GitHub上开源了基于Java的分布式服务治理框架Dubbo，之后它成为了国内该类开源项目的佼佼者，许多开发者对其表示青睐。同时，先后有不少公司在实践中基于Dubbo进行分布式系统架构，目前在GitHub上，它的fork、star数均已破万。Dubbo致力于提供高性能和透明化的RPC远程服务调用方案，以及SOA服务治理方案，使得应用可通过高性能RPC实现服务的输出、输入功能和Spring框架无缝集成。Dubbo包含远程通讯、集群容错和自动发现三个核心部分。

- 停止维护:从2012年10月23日Dubbo 2.5.3发布后，在Dubbo开源将满一周年之际，阿里基本停止了对Dubbo的主要升级。只在之后的2013年和2014年更新过2次对Dubbo 2.4的维护版本，然后停止了所有维护工作。Dubbo对Srping的支持也停留在了Spring 2.5.6版本上。

- 死而复生:多年漫长的等待，随着微服务的火热兴起，在国内外开发者对阿里不再升级维护Dubbo的吐槽声中，阿里终于开始重新对Dubbo的升级和维护工作。在2017年9月7日，阿里发布了Dubbo的2.5.4版本，距离上一个版本2.5.3发布已经接近快5年时间了。在随后的几个月中，阿里Dubbo开发团队以差不多每月一版本的速度开始快速升级迭代，修补了Dubbo老版本多年来存在的诸多bug，并对Spring等组件的支持进行了全面升级。

- 2018年1月8日，Dubbo创始人之一梁飞在Dubbo交流群里透露了Dubbo 3.0正在动工的消息。Dubbo 3.0内核与Dubbo 2.0完全不同，但兼容Dubbo 2.0。Dubbo 3.0将以Streaming为内核，不再是Dubbo 时代的RPC，但是RPC会在Dubbo 3.0中变成远程Streaming对接的一种可选形态。从Dubbo新版本的路线规划上可以看出，新版本的Dubbo在原有服务治理的功能基础上，将全面拥抱微服务解决方案。

- 结论:当前由于RPC协议、注册中心元数据不匹配等问题，在面临微服务基础框架选型时Dubbo与Spring Cloud是只能二选一，这也是为什么大家总是拿Dubbo和Spring Cloud做对比的原因之一。Dubbo之后会积极寻求适配到Spring Cloud生态，比如作为Spring Cloud的二进制通信方案来发挥Dubbo的性能优势，或者Dubbo通过模块化以及对http的支持适配到Spring Cloud。
```

![image-20200724143456045](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201515979.png)

```markdown
# Spring Cloud:
- Spring Cloud NetFlix  
	基于美国Netflix公司开源的组件进行封装,提供了微服务一栈式的解决方案。

- Spring Cloud alibaba
	在Spring cloud netflix基础上封装了阿里巴巴的微服务解决方案。
	
- Spring Cloud Spring
	目前spring官方趋势正在逐渐吸收Netflix组件的精华,并在此基础进行二次封装优化,打造spring专有的解决方案
```

## 什么是SpringCloud

### 官方定义

- 官方网址: https://cloud.spring.io/spring-cloud-static/Hoxton.SR5/reference/html/

**Spring Cloud provides tools for developers to quickly build some of the common patterns in distributed systems** (e.g. `configuration management`,` service discovery`, `circuit breakers, intelligent routing, micro-proxy, control bus`). Coordination of distributed systems leads to boiler plate patterns, and using Spring Cloud developers can quickly stand up services and applications that implement those patterns.  -------[摘自官网]

```markdown
# 1.翻译
- springcloud为开发人员提供了在分布式系统中快速构建一些通用模式的工具（例如配置管理、服务发现、断路器、智能路由、微代理、控制总线）。分布式系统的协调导致了锅炉板模式，使用springcloud开发人员可以快速地建立实现这些模式的服务和应用程序。

# 2.通俗理解
- springcloud是一个涵盖多个子项目的开发工具集,集合了众多的开源框架,他利用了Spring Boot开发的便利性实现了很多功能,如服务注册,服务注册发现,负载均衡等.SpringCloud在整合过程中主要是针对Netflix(耐非)开源组件的封装.SpringCloud的出现真正的简化了分布式架构的开发。NetFlix 是美国的一个在线视频网站,微服务业的翘楚,他是公认的大规模生产级微服务的杰出实践者,NetFlix的开源组件已经在他大规模分布式微服务环境中经过多年的生产实战验证,因此Spring Cloud中很多组件都是基于NetFlix

spring netflix 维护  闭源
```

### 核心架构及其组件

官网地址:https://spring.io/projects/spring-cloud

```markdown
# 1.核心组件说明
- eureka、consul、nacos  	         服务注册中心组件
- rabbion & openfeign  			  服务负载均衡 和 服务调用组件
- hystrix & hystrix dashboard     服务断路器  和  服务监控组件
- zuul、gateway 					 服务网关组件
- config 						  统一配置中心组件
- bus                             消息总线组件
```

==各组件架构图==

![image-20200724161314786](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201515983.png)



## 注册中心

所谓服务注册中心就是在整个的微服务架构中单独提出一个服务，这个服务**不完成系统的任何的业务功能**，仅仅用来完成对整个微服务系统的**服务注册**和**服务发现**，以及对服务**健康状态的监控（心跳检查）**和管理功能。

```markdown
# 1.CAP定理
- CAP定理：CAP定理又称CAP原则，指的是在一个分布式系统中，一致性（Consistency）、可用性（Availability）、分区容错性（Partition tolerance）。CAP 原则指的是，这三个要素最多只能同时实现两点，不可能三者兼顾。
	`一致性（C）：在分布式系统中的所有数据备份，在同一时刻是否同样的值。（等同于所有节点访问同一份最新的数据副本）
	`可用性（A）：在集群中一部分节点故障后，集群整体是否还能响应客户端的读写请求。（对数据更新具备高可用性）
	`分区容忍性（P），就是高可用性，一个节点崩了，并不影响其它的节点（100个节点，挂了几个，不影响服务，越多机器越好）
	
# 2.Eureka特点
- Eureka中没有使用任何的数据强一致性算法保证不同集群间的Server的数据一致，仅通过数据拷贝的方式争取注册中心数据的最终一致性，虽然放弃数据强一致性但是换来了Server的可用性，降低了注册的代价，提高了集群运行的健壮性。

# 3.Consul特点
- 基于Raft算法，Consul提供强一致性的注册中心服务，但是由于Leader节点承担了所有的处理工作，势必加大了注册和发现的代价，降低了服务的可用性。通过Gossip协议，Consul可以很好地监控Consul集群的运行，同时可以方便通知各类事件，如Leader选择发生、Server地址变更等。

# 4.zookeeper特点
- 基于Zab协议，Zookeeper可以用于构建具备数据强一致性的服务注册与发现中心，而与此相对地牺牲了服务的可用性和提高了注册需要的时间。
```

![image-20230320160102818](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201601873.png)



## pom.xml

parent

```xml
    <!--自定义properties属性-->
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <!--定义springcloud使用版本号  父项目管理版本号-->
        <spring.cloud-version>2021.0.0</spring.cloud-version>
        <!--定义springboot   使用版本号  父项目管理版本号-->
        <spring.boot-version>2.6.6</spring.boot-version>
    </properties>

    <!--仅仅是声明版本，还没有引入，子项目需要引入依赖-->
    <dependencyManagement>
        <dependencies>
            <!--springcloud-->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring.cloud-version}</version>
                <!--pom表示导入的是父模块-->
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!--springboot-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>${spring.boot-version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <dependencies>
        <!--lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.22</version>
        </dependency>
    </dependencies>
```







## Eureka 注册中心

### 用法-Server端

#### 依赖

```xml
<!--引入 eureka server-->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

#### 配置

```yml
server:
  #Eureka server 端口号
  port: 8761

eureka:
  client:
    fetch-registry: false #关闭eureka client立即注册
    register-with-eureka: false #让当前应用仅仅是服务注册中心
    service-url:
      # 指定服务注册中心地址
      defaultZone: http://localhost:8761/eureka

  server:
    # enable-self-preservation: false #关闭自我保护
    eviction-interval-timer-in-ms: 3000 #每3秒扫描一次
# 指定服务名称，
spring:
  application:
    name: eurekaserver
```

#### 注解

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

#### 自我保护机制

![image-20230320152556436](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201525482.png)

**周期是15 分钟，server要判断15分钟之内是否低于 85%**

```markdown
# 1.自我保护机制
- 官网地址: https://github.com/Netflix/eureka/wiki/Server-Self-Preservation-Mode
- 默认情况下，如果Eureka Server在一定时间内（默认90秒）没有接收到某个微服务实例的心跳，Eureka Server将会移除该实例。但是当网络分区故障发生时，微服务与Eureka Server之间无法正常通信，而微服务本身是正常运行的，此时不应该移除这个微服务，所以引入了自我保护机制。Eureka Server在运行期间会去统计心跳成功比例在 15 分钟之内是否低于 85%，如果低于 85%，Eureka Server 会将这些实例保护起来，让这些实例不会过期。这种设计的哲学原理就是"宁可信其有不可信其无!"。自我保护模式正是一种针对网络异常波动的安全保护措施，使用自我保护模式能使Eureka集群更加的健壮、稳定的运行。
```

### 用法-Client端

#### 依赖

```xml
<!--引入eureka client-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

#### 配置

```yml
server:
  port: 8989
spring:
  application:
    name: eureka-client-8991
eureka:
  client:
    #指定注册中心地址
    service-url:
      defaultZone: http://localhost:8761/eureka
  instance:
    lease-expiration-duration-in-seconds: 10 #用来修改eureka server默认接受心跳的最大时间（超过这个时间，移除改客户端） 默认是90s
    lease-renewal-interval-in-seconds: 5 #指定客户端多久向eureka server发送一次心跳 默认是30s
```

#### 注解

```java
@SpringBootApplication
@EnableEurekaClient
public class Eurekaclient8888Application {
    public static void main(String[] args) {
        SpringApplication.run(Eurekaclient8888Application.class, args);
    }
}
```

## Consul 注册中心

### 概念

```markdown
# consul 简介
- https://www.consul.io
- consul是一个可以提供服务发现，健康检查，多数据中心，Key/Value存储等功能的分布式服务框架，用于实现分布式系统的服务发现与配置。与其他分布式服务注册与发现的方案，使用起来也较为简单。Consul用Golang实现，因此具有天然可移植性(支持Linux、Windows和Mac OS X)；安装包仅包含一个可执行文件，方便部署。
```

### 用法-Server端

使用Consul可以直接安装启动，**不需要手动开发这个注册中心**，这一点区别于Eureka

consul默认服务端口是**8500**

```markdown
# 1.下载consul  windows-amd64
- https://www.consul.io/downloads

# 2.安装consul 
- 1.解压之后发现consul只有一个脚本文件 consul.exe （不是双击执行）

# 3.根据解压缩目录配置环境变量
- 根据安装目录进行环境变量配置

# 4.查看consul环境变量是否配置成功,执行命令出现如下信息代表成功
- consul -v

# 5.启动consul服务
- consul agent -dev

# 6.访问consul的web服务端口
- http://localhost:8500
```

### 用法-Client端

#### 依赖

```xml
 <!--引入consul依赖-->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>

<!-- 
- 开启consul健康监控
- 默认情况consul监控健康是开启的,但是必须依赖健康监控依赖才能正确监控健康状态所以直接启动会显示错误,引入健康监控依赖之后服务正常
-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### 配置

```yml
spring:
  cloud:
    consul:
      host: localhost #注册consul服务的主机
      port: 8500 #注册consul服务的端口号
      discovery:
        service-name: heihei #指定注册的服务名称 默认就是应用名
  application:
    name: consulClient
server:
  port: 8082
```

#### 注解

```java
@SpringBootApplication
@EnableDiscoveryClient
public class CousulClientApplication {
    public static void main(String[] args) {
        SpringApplication.run(CousulClientApplication.class, args);
    }
}
```

## Ribbon 负载均衡

> 精品文章：http://c.biancheng.net/springcloud/ribbon.html

在springcloud中服务间调用方式主要是使用 `http restful`方式进行服务间调用；

目前主流的负载方案分为以下两种：

* **集中式**负载均衡，在消费者和服务提供方中间使用独立的代理方式进行负载，有硬件的（比如 F5），也有软件的（比如Nginx）

* **客户端**根据自己的请求情况做负载均衡，Ribbon 就属于客户端自己做负载均衡

### 概念

```markdown
# 0.说明
- 官方网址: https://github.com/Netflix/ribbon
- Spring Cloud Ribbon是一个基于HTTP和TCP的客户端负载均衡工具，它基于Netflix Ribbon实现。通过Spring Cloud的封装，可以让我们轻松地将面向服务的REST模版请求自动转换成客户端负载均衡的服务调用。
```

通过Load Balancer获取到服务提供的所有机器实例，Ribbon会自动基于某种规则(轮询，随机)去调用这些服务

### 依赖

```markdown
# 1.项目中引入依赖
- 说明: 
	1.如果使用的是eureka client、consul client、Nacos无须引入依赖,因为在eureka,consul中默认集成了ribbon组件
	2.如果使用的client中没有ribbon依赖需要显式引入如下依赖
```

```xml
<!--引入ribbon依赖-->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
</dependency>
```

### 配置

```yml
# 1.修改服务默认随机策略
- 服务id.ribbon.NFLoadBalancerRuleClassName=com.netflix.loadbalancer.RandomRule
`下面的product为服务的唯一标识`
	
# 使用配置文件的方式修改ribbon默认的负载均衡算法      
product: 
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule

```

### 用法

```java
//1.整合restTemplate + ribbon
@Bean
@LoadBalanced
public RestTemplate getRestTemplate(){
  return new RestTemplate();
}

//2.调用服务位置注入RestTemplate
@Autowired
private RestTemplate restTemplate;

//3.调用
String forObject = restTemplate.getForObject("http://服务ID/hello/hello?name=" + name, String.class);
```

### 负载均衡策略

```markdown
# 1.ribbon负载均衡算法
- RoundRobinRule         		轮询策略	按顺序循环选择 Server
- RandomRule             		随机策略	随机选择 Server
- AvailabilityFilteringRule 可用过滤策略
 	`会先过滤由于多次访问故障而处于断路器跳闸状态的服务，还有并发的连接数量超过阈值的服务，然后对剩余的服务列表按照轮询策略进行访问
- WeightedResponseTimeRule  响应时间加权策略   
	`根据平均响应的时间计算所有服务的权重，响应时间越快服务权重越大被选中的概率越高，刚启动时如果统计信息不足，则使用RoundRobinRule策略，等统计信息足够会切换到
- RetryRule                 重试策略          
	`先按照RoundRobinRule的策略获取服务，如果获取失败则在制定时间内进行重试，获取可用的服务。
- BestAviableRule           最低并发策略     
	`会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务  
```

## OpenFeign 服务调用

### 概念

OpenFeign 全称 Spring Cloud OpenFeign，它是 Spring 官方推出的一种**声明式服务调用与负载均衡组件**，它的出现就是为了替代进入停更维护状态的 Feign

Feign 对**Ribbon进行了集成**，它在 **RestTemplate 的基础上做了进一步的封装**。通过 Feign，我们只需要声明一个接口并通过注解进行简单的配置（类似于 Dao 接口上面的 Mapper 注解一样）即可实现对 HTTP 接口的绑定。

通过 Feign，我们可以像调用本地方法一样来调用远程服务，而完全感觉不到这是在进行远程调用。

#### 依赖

```xml
<!--Open Feign依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

### 配置

超时控制和日志级别

```markdown
# 0.说明
- 往往在服务调用时我们需要详细展示feign的日志,默认feign在调用是并不是最详细日志输出,因此在调试程序时应该开启feign的详细日志展示。feign对日志的处理非常灵活可为每个feign客户端指定日志记录策略，每个客户端都会创建一个logger默认情况下logger的名称是feign的全限定名需要注意的是，feign日志的打印只会DEBUG级别做出响应。
- 我们可以为feign客户端配置各自的logger.lever对象，告诉feign记录那些日志logger.lever有以下的几种值
	`NONE  不记录任何日志
	`BASIC 仅仅记录请求方法，url，响应状态代码及执行时间
	`HEADERS 记录Basic级别的基础上，记录请求和响应的header
	`FULL 记录请求和响应的header，body和元数据
```



```yml
server:
  port: 8991

spring:
  cloud:
    consul:
      port: 8500
      host: localhost
  application:
    name: OPENFEIGN

logging:
  level:
    com.mrru.feignclients: debug  #指定feign调用客户端对象所在包,必须是debug级别

feign:
  client:
    config:
      # PRODUCTS 也可以替换default为指定服务名称
      default:
        connectTimeout: 60000  #建立连接所用的时间，适用于网络状况正常的情况下，两端两端连接所用的时间
        readTimeout: 6000      #建立连接后，服务器读取到可用资源的时间

```

### 注解

```java
@SpringBootApplication
@EnableFeignClients
public class Users9999Application {
    public static void main(String[] args) {
        SpringApplication.run(Users9999Application.class, args);
    }
}
```

### 用法

在编写服务绑定接口时，需要注意以下 2 点：

- 在 @FeignClient 注解中，value 属性的取值为：**服务提供者的服务名**，即服务提供者配置文件（application.yml）中 spring.application.name 的取值。
- 接口中定义的每个方法都与**服务提供者中 Controller 定义的服务方法**对应。

Spring Cloud 应用在启动时，`OpenFeign 会扫描标有 @FeignClient 注解的接口生成代理，并注人到 Spring 容器中`。

---

1. 创建一个客户端调用接口（前提是PRODUCTS有相应的controller接口）

```java
//value属性用来指定:服务提供者的服务名
@FeignClient("PRODUCTS")
public interface ProductClient {
    @GetMapping("/product/findAll") //书写服务调用路径
    String findAll();
    
    @PostMapping("/product/save")
    String save(@RequestParam("name") String name);//传递字符串
    
    @PostMapping("/product/saveProduct") 
  	String saveProduct(@RequestBody Product product);//传递对象
}
```

2. 使用feignClient客户端对象调用服务

```java
//注入客户端对象
@Autowired
private ProductClient productClient;

@GetMapping("/user/findAllFeignClient")
public String findAllFeignClient(){
  log.info("通过使用OpenFeign组件调用商品服务...");
  String msg = productClient.findAll();
  return msg;
}
```

## Hystrix 服务熔断、服务降级

> 精品文章：http://c.biancheng.net/springcloud/hystrix.html

### 概念

Hystrix是一个用于处理分布式系统的延迟和容错的开源库，在分布式系统中，许多依赖不可避免的会调用失败，超时、异常等，Hystrix能够保证在一个依赖出问题的情况下，不会导致整体服务失败，避免级联故障(服务雪崩现象)，提高分布式系统的弹性。

Spring Cloud Hystrix 是基于 Netflix 公司的开源组件 Hystrix 实现的，它提供了熔断器功能，能够有效地阻止分布式微服务系统中出现联动故障，以提高微服务系统的弹性。Spring Cloud Hystrix 具有服务降级、服务熔断、线程隔离、请求缓存、请求合并以及实时故障监控等强大功能。

> Hystrix [hɪst'rɪks]，中文含义是豪猪，豪猪的背上长满了棘刺，使它拥有了强大的自我保护能力。而 Spring Cloud Hystrix 作为一个服务容错与保护组件，也可以让服务拥有自我保护的能力，因此也有人将其戏称为“豪猪哥”。

在微服务系统中，Hystrix 能够帮助我们实现以下目标：

- **保护线程资源**：防止单个服务的故障耗尽系统中的所有线程资源。
- **快速失败机制**：当某个服务发生了故障，不让服务调用方一直等待，而是直接返回请求失败。
- **提供降级（FallBack）方案**：在请求失败后，提供一个设计好的降级方案，通常是一个兜底方法，当请求失败后即调用该方法。
- **防止故障扩散**：使用熔断机制，防止故障扩散到其他服务。
- **监控功能**：提供熔断器故障监控组件 Hystrix Dashboard，随时监控熔断器的状态。

### 服务雪崩-服务级联故障

在微服务之间进行服务调用是由于某一个服务故障，导致级联服务故障的现象，称为雪崩效应。雪崩效应描述的是提供方不可用，导致消费方不可用并将不可用逐渐放大的过程。

如图存在如下调用链路:

![image-20230320173125136](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201731187.png)

而此时，Service A的流量波动很大，流量经常会突然性增加！那么在这种情况下，就算Service A能扛得住请求，Service B和Service C未必能扛得住这突发的请求。此时，如果Service C因为抗不住请求，变得不可用。那么Service B的请求也会阻塞，慢慢耗尽Service B的线程资源，Service B就会变得不可用。紧接着，Service A也会不可用，这一过程如下图所示

**每个请求都是tomcat启动的线程，当服务器C不断有请求线程过来却没有被释放，线程资源占用越来越多，服务就会不可用**

### 服务熔断-自我熔断

```markdown
# 服务熔断
- “熔断器”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器(hystrix)的故障监控，某个异常条件被触发，直接熔断整个服务。向调用方法返回一个符合预期的、可处理的备选响应(FallBack),而不是长时间的等待或者抛出调用方法无法处理的异常，就保证了服务调用方的线程不会被长时间占用，避免故障在分布式系统中蔓延，乃至雪崩。如果目标服务情况好转则恢复调用。服务熔断是解决服务雪崩的重要手段。
```

熔断机制：每个微服务都**引入自己服务的监控器**Hystrix，**监控到异常后会返回一个fallBack**

#### 依赖

```xml
<!--引入hystrix-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
    <version>2.2.10.RELEASE</version>
</dependency>
```

#### 注解

```java
@SpringBootApplication
@EnableHystrix  //用来开启断路器
public class Products9998Application {
    public static void main(String[] args) {
        SpringApplication.run(Products9998Application.class, args);
    }
}
```

#### 用法

使用HystrixCommand注解实现断路

```java
@RestController
public class DemoController {

    @GetMapping("demo")
    @HystrixCommand(fallbackMethod = "demoFallBack") //一旦该方法失败并抛出了异常信息后，会自动调用  @HystrixCommand 注解标注的 fallbackMethod 指定的方法
    public String demo(Integer id) {
        if (id <= 0) {
            throw new RuntimeException("服务失效了");
        }
        return "hystrix demo ok";
    }
    
    //方法命名有要求,除了名字其它都一样
    public String demoFallBack(Integer id) {
        return "服务熔断了~";
    }
}
```

#### 断路器打开条件

当满足Hystrix的条件后，熔断器会打开（请求走到熔断器条件），但是一会后熔断器又会关闭（请求恢复正常），说明它状态的打开关闭有条件：

```markdown
# 原文翻译之后,总结打开关闭的条件:
- 1、  当满足一定的阀值的时候（默认10秒内超过20个请求次数）
- 2、  当失败率达到一定的时候（默认10秒内超过50%的请求失败）
- 3、  到达以上阀值，断路器将会开启
- 4、  当开启的时候，该服务的所有请求都不会进行转发
- 5、  一段时间之后（默认是5秒），这个时候断路器是半开状态，会让其中一个请求进行转发。如果成功，断路器会关闭，若失败，继续开启。重复4和5。

# 面试重点问题: 断路器流程
```

![image-20230320180230891](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201802972.png)

### 服务降级

> 精品文章：https://www.jianshu.com/p/fcb8b26b12a5

服务降级：在服务器压力陡增的情况下，利用有限资源，根据当前业务情况，关闭某些服务接口或者页面，以此释放服务器资源以保证核心任务的正常运行。

降级：服务分优先级，牺牲非核心服务（不可用），导致整体的服务下降，保证核心服务稳定；

流量控制本质上是减小访问量，而服务处理能力不变；而服务降级本质上是**降低了部分服务的处理能力，增强另一部分服务处理能力，而访问量不变**

#### 配置

```yml
# 开启降级feign.hystrix
feign:
  hystrix:
    enabled: true
```

#### 注解

在openfeign客户端中加如Hystrix

```java
@FeignClient(value = "PRODUCTS",fallback = ProductFallBack.class)
public interface ProductClient {
    @GetMapping("/product/hystrix")
    String testHystrix(@RequestParam("name") String name);
}
```

处理类

```java
public class ProductFallBack implements ProductClient {
    @Override
    public String testHystrix(String name) {
        return "我是客户端的Hystrix服务实现!!!";
    }
}
```

### 异同点总结

* 服务熔断一般是**某个服务**（下游服务）故障引起，而服务降级一般是从**整体负荷**考虑

* 熔断其实是一个**框架级**的处理，每个微服务都需要（无层级之分），而降级一般需要**对业务有层级之分**（比如降级一般是从最外围服务开始）

## Gateway 服务网关

### 概念

网关统一服务入口，对微服务的一切请求进行路由转发，并提供横切关注点

客户端向Spring Cloud Gateway发送请求。如果网关处理程序映射确定请求与路由匹配，则将其发送到网关Web处理程序。此处理程序通过特定于请求的过滤器链运行请求。用虚线分隔过滤器的原因是**过滤器可以在发送代理请求之前和之后运行逻辑**。执行所有预过滤逻辑。然后发出代理请求。发出代理请求后，运行post filter逻辑

![spring_cloud_gateway_diagram](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201846934.png)

### 作用

1. 统一所有微服务的全局入口
2. **路由转发**（接收一切外界请求，转发到后端的微服务上去） + **过滤器**（权限控制，流量监控，限流）
3. 实现负载均衡

### 用法

#### 依赖

```xml
<!--引入gateway网关依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>

<!--引入springboot 网关中不能使用spring mvc的模型-->
<!--<dependency>-->
<!--    <groupId>org.springframework.boot</groupId>-->
<!--    <artifactId>spring-boot-starter-web</artifactId>-->
<!--</dependency>-->
```

#### 配置

```yml
server:
  port: 7979
spring:
  application:
    name: GATEWAY
  cloud:
    consul:
      host: localhost
      port: 8500
    gateway:
      routes:
        - id: category_router # 路由对象唯一标识，随便写
          uri: lb://CATEGORY  # 负载均衡处理
          predicates:         # 断言，用来配置路由规则
            - Path=/category/*

        - id: product_router 
          uri: lb://PRODUCT
          # predicate使用
          predicates:        
            - Path=/product/*
            - After=2023-03-13T14:07:53.714+08:00[Asia/Shanghai]
          filters:
            - AddRequestHeader=User-Name, ruyb
```

#### 常见路由predicate  （断言、验证）

```markdown
- After=2020-07-21T11:33:33.993+08:00[Asia/Shanghai]  			`指定日期之后的请求进行路由
- Before=2020-07-21T11:33:33.993+08:00[Asia/Shanghai]       `指定日期之前的请求进行路由
- Between=2017-01-20T17:42:47.789-07:00[America/Denver], 2017-01-21T17:42:47.789-07:00[America/Denver]
- Cookie=username,chenyn		`基于指定cookie的请求进行路由
- Cookie=username,[A-Za-z0-9]+   `基于指定cookie的请求进行路由	
	`curl http://localhost:8989/user/findAll --cookie "username=zhangsna"
- Header=X-Request-Id, \d+		``基于请求头中的指定属性的正则匹配路由(这里全是整数)
	`curl http://localhost:8989/user/findAll -H "X-Request-Id:11"
- Method=GET,POST			``基于指定的请求方式请求进行路由
- 官方更多: https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.3.RELEASE/reference/html/#the-cookie-route-predicate-factory
```

#### 常见过滤器

```markdown
- AddRequestHeader=X-Request-red, blue					`增加请求头的filter`
- AddRequestParameter=red, blue							`增加请求参数的filterr`
- AddResponseHeader=X-Response-Red, AAA					`增加响应头filter`
- PrefixPath=/emp										`增加前缀的filter`
- StripPrefix=2											`去掉前缀的filter 去掉2级的` /xx/ss 去掉ss
```

## Config 配置中心

> 精品文章：http://c.biancheng.net/springcloud/config.html

### 概念

微服务系统中服务的统一管理组件

类似Eureka一样，Server端集中管理配置文件，Client端拉取使用配置文件

* 服务注册中心：统一管理微服务信息

* 统一配置中心：统一管理微服务的配置信息

Spring Cloud Config 包含以下两个部分：

- Config Server：也被称为分布式配置中心，它是一个独立运行的微服务应用，用来**连接配置仓库并为客户端提供获取配置信息**、加密信息和解密信息的访问**接口**。
- Config Client：指的是微服务架构中的各个微服务，它们通过 Config Server 对配置进行管理，并**从 Config Sever 中获取和加载配置信息**

---

微服务启动时会从Server端（即配置中心）拉取配置文件，为了提高config的高可用，当Server端集群部署时，如何实现一个Server节点的修改同步到其它Server节点呢？所以Spring和奈飞设计Config组件作为临时的配置文件中转，而不是作为终端提供者。

当配置文件经常修改，就需要去进行版本管理，自然想到Git，借助其git仓库管理配置文件。那么如何连接git仓库和每一个微服务呢？config配置中心就可以通过uri拉取git仓库到本地（即自身Server端），其它微服务作为Config Client端进行访问

![image-20230315101818765](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303151018819.png)

**当git仓库配置发生变化，Config Server检测到后，就从git仓库同步拉取最新配置文件并缓存一份到本地**（安全考虑git仓库可能宕机，所以缓存一份）；其它微服务重新启动时读取到的就是最新的配置文件了

### 作用

将配置统一管理，在日后大规模集群部署服务应用时相同的服务配置一致，日后只需要统一修改配置全部同步，不需要一个一个服务手动维护

### git仓库

![image-20230315151427158](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303151514206.png)

### 用法-Server端

#### 依赖

```xml
<!--引入统一配置中心-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

#### 配置

```yml
spring:
  application:
    name: CONFIG
  cloud:
    consul:
      port: 8500
      host: localhost
    config:
      server:
        git:
          # server对应的git仓库地址
          uri: https://gitee.com/ru12321/springcloud-config-server.git
          # 仓库分支
          default-label: master
server:
  port: 7999
```

#### 注解

```java
@SpringBootApplication
@EnableDiscoveryClient
@EnableConfigServer // 开启统一配置中心服务
public class ConfigApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigApplication.class, args);
    }
}
```

#### 使用

Spring Cloud Config 规定了一套配置文件访问规则，如下表

![image-20230321093053816](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303210930865.png)

可以通过访问localhost:7999/configclient-dev.yml来查看配置文件；

同时后台会有缓存配置文件的本地目录路径；

### 用法-Client端

#### 依赖

```xml
<!--config 客户端-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>

<!--Spring Cloud 新版本默认将Bootstrap禁用，需要引入-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```

#### 配置

为了能够提前从Server端拉取到配置文件，再以拉取到的配置加载启动config client。因此，需要将config client的配置写到==bootstrap.yml==中

> 注意：bootstrap中一定要指明与注册中心有关的配置。如该client服务名称、注册中心地址、端口

==bootstrap.yml==，注意这里，可不是application.yml哦

```yml
spring:
  cloud:
    config:
      discovery:
        # 开启服务发现
        enabled: true
        # 指定Config Server的ID
        service-id: CONFIGSERVER
      # 获取Server端哪个分支哪个环境的哪个服务的配置文件
      # 如：master分支的 configclient-dev.yml
      label: master
      name: configclient
      profile: dev
    # 是必要的，注册中心的配置，不可以放在远程git
    consul:
      host: localhost
      port: 8500
  # 是必要的，注册中心要用到，不可以放在远程git
  application:
    name: CONFIGCLIENTBOOT
```

---

#### 用法

使用client的controller测试，读取到的值应该是bootstrap.yml中指定的文件中的name值

```java
@RestController
public class ConfigClientController {

    @Value("${name}")
    private String name;

    @GetMapping("/demo")
    public String demo() {
        return "config client okk : " + name;
    }
}
```

注意点：client同时也会加载公共配置中的值，比如在configclient中指定了port为8000，后续在bootstrap.yml和虚拟机选项中再指定port不会生效

---

需要注意的是，当配置更新后，config client端如果不重启是

- 配置更新后，Spring Cloud Config 服务端（Server）可以直接从 Git 仓库中获取最新的配置。
- 除非重启 Spring Cloud Config 客户端（Client），否则无法通过 Spring Cloud Config 服务端获取最新的配置信息。

### 手动配置刷新

#### 依赖

```xml
<!--监控模块-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### 配置

```yml
# 开启所有web端点暴露
management:
  endpoints:
    web:
      exposure:
        include: "*"   # * 在yaml 文件属于关键字，所以需要加引号
```

#### 注解

需要刷新代码的类中加入刷新配置的注解

```java
// 读取配置中心指定配置文件的内容，并展示到页面
@RefreshScope //为了让动态（手动）的获取最新的git 配置，在添加 actuator 监控加载 RefreshScope，
@RestController
public class ConfigClientController {
    @Value("${server.port}")
    private String serverPort;
    
    @Value("${config.info}")
    private String configInfo;
    
    @Value("${config.version}")
    private String configVersion;
    
    @GetMapping(value = "/getConfig")
    public String getConfig() {
        return "info：" + configInfo + "<br/> version：" + configVersion + "<br/>port：" + serverPort;
    }
}
```

#### **手动调用**

发送一个 POST 请求刷新Config客户端，通知客户端配置文件已经修改，需要重新拉去配置

```shell
curl -X POST http://localhost:9099/actuator/refresh
```

---

问题接踵而至：

只要配置仓库中的配置发生改变，就需要我们**挨个向 Config 客户端手动发送 POST 请求**，通知它们重新拉取配置。

显然不科学，辣么多微服务，我疯了吗？

## Bus 消息总线

### 概念

`Spring Cloud Bus` 又被称为消息总线，它能够通过轻量级的消息代理（例如 RabbitMQ、Kafka 等）将微服务架构中的各个服务连接起来，实现广播状态更改、事件推送等功能，还可以实现微服务之间的通信功能。

bus称之为springcloud中消息总线，主要用来在微服务系统中**实现远端配置更新时通过广播形式通知所有客户端刷新配置信息**，避免手动重启服务的工作

### 动态配置刷新

Spring Cloud Config  +  Spring Cloud Bus 实现 一次通知，处处生效

当 Git 仓库中的配置发生了改变，我们只需要向某一个服务（既可以是 Config 服务端，也可以是 Config 客户端）发送一个 POST 请求，Spring Cloud Bus 就可以通过消息代理通知其他服务重新拉取最新配置，以实现配置的动态刷新。

![101942GY-11](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303211120116.png)

​	根据图上 ，利用 Spring Cloud Bus 实现配置的动态刷新需要以下步骤:

1. 当 Git 仓库中的配置发生改变后，运维人员向 Config 服务端发送一个 POST 请求，请求路径为“/actuator/refresh”。
2. Config 服务端接收到请求后，会将该请求转发给服务总线 Spring Cloud Bus。
3. Spring Cloud Bus 接到消息后，会通知给所有 Config 客户端。
4. Config 客户端接收到通知，请求 Config 服务端拉取最新配置。
5. 所有 Config 客户端都获取到最新的配置。

### 安装rabbitmq

```shell
# 拉取rabbitmq的镜像
docker pull rabbitmq

# 运行mq容器 指定容器名称为rabbitmq_ru，映射端口到宿主机
# hostname：指定主机名
# 15672：控制台Web端口号
# 5672：应用访问端口
docker run -d --hostname my_rabbitmq --name rabbitmq_ru -p 15672:15672 -p 5672:5672 rabbitmq

# 启动容器rabbitmq_ru的webUI界面
docker exec -it rabbitmq_ru rabbitmq-plugins enable rabbitmq_management 
```

### 用法

#### 依赖

server和client端都添加

```xml
<!--添加消息总线（Bus）对 RabbitMQ 的支持-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
<!--添加Spring Boot actuator 监控模块的依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### 配置

server和client端都添加

```yml
spring: 
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
# Spring Boot 2.50对 actuator 监控屏蔽了大多数的节点，只暴露了 heath 节点，本段配置（*）就是为了开启所有的节点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

#### 注解

一定要加这个注解`@RefreshScope`

```java
// 读取配置中心指定配置文件的内容，并展示到页面
@RefreshScope //为了让动态（手动）的获取最新的git 配置，在添加 actuator 监控加载 RefreshScope，
@RestController
public class ConfigClientController {
    @Value("${server.port}")
    private String serverPort;
    
    @Value("${config.info}")
    private String configInfo;
    
    @Value("${config.version}")
    private String configVersion;
    
    @GetMapping(value = "/getConfig")
    public String getConfig() {
        return "info：" + configInfo + "<br/> version：" + configVersion + "<br/>port：" + serverPort;
    }
}
```

#### 用法

手动触发一下

```
curl -X POST http://localhost:7999/actuator/busrefresh
```
