

# UML概述

> 学习链接：
>
> https://www.w3cschool.cn/uml_tutorial/uml_tutorial-c1gf28pd.html

![image-20220923204014902](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20220923204014902.png)

UML(Unified Modeling Language, UML)为**面向对象**开发系统的产品，进行建模描述说明。

UML是一种建模机制，给出一个可视化的指导系统构造的模板。



# UML构建模块

## 事物

事物是实体抽象化的最终结果，是 UML 构建块最重要的组成部分，事物的分类如下:

- 结构事物
- 行为事物
- 分组事物
- 注释事物

### 结构事物:

结构事物是模型中的静态部分，用以呈现概念或实体的表现元素，是软件建模中最常见的元素，接下来是对结构化物件的简要描述：

#### **A 类（class）**

类是指具有相同属性、方法、关系和语义的对象的集合；

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503026734254369.png)

#### B 接口(interface)

接口是指类或组件所提供的服务（操作），描述了类或组件对外可见的动作；

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503026741440794.png)

#### C 协作(collaboration)

协作定义元素之间的相互作用；

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503026749875402.png)

#### **D 用例(use case)**

用例定义了执行者（在系统外部和系统交互的人）和被考虑的系统之间的交互来实现的一个业务目标；

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503026766490926.png)



#### E 组件(component)

组件描述物理系统的一部分；

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503026779668038.png)

#### F 节点(node)

一个节点可以被定义为在运行时存在的物理元素；

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503026786121818.png)

### 行为事物

行为事物指的是 UML 模型中的动态部分，代表语句里的 "动词"，表示模型里随着时空不断变化的部分，包含两类：

* 交互被定义为一种行为，包括一组元素之间的消息交换来完成特定的任务。

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503027686313760.png)

* 状态机由一系列对象的状态组成，它是有用的，一个对象在其生命周期的状态是很重要的。

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503027701231138.png)

### 分组事物

可以把分组事物看成是一个"盒子"，模型可以在其中被分解。目前只有一种分组事物，即包（package）。结构事物、动作事物甚至分组事物都有可能放在一个包中。包纯粹是概念上的，只存在于开发阶段，而组件在运行时存在。

包:封装是唯一一个分组事物可收集结构和行为的东西。

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503027889642542.png)

### 注释事物

注释事物可以被定义为一种机制来捕捉UML模型元素的言论，说明和注释。注释是唯一一个注释事物。

注释用于渲染意见，约束等的UML元素。

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503027895319734.png)

## 关系 

关系显示元素是如何彼此相关联，此关联描述的一个应用程序的功能，UML中定义了四种关系：

### A 依赖关系:

依赖是两件事物之间的语义联系，其中一个事物的变化也影响到另一个事物。

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503028031675933.png)

### B 协作:

一种描述一组对象之间连接的结构关系，如聚合关系（描述了整体和部分间的结构关系）；

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503028037625295.png)

### C 泛化:

泛化可以被定义为一个专门的元件连接关系与一个广义的元素，它基本上描述了在对象世界中的**继承关系**，是一种一般化-特殊化的关系；

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/1503028042977930.png)

### D 实现:

类之间的语义关系，其中的一个类指定了由另一个类保证执行的契约。

![img](https://atts.w3cschool.cn/attachments/image/20170818/1503028048635277.png)

## UML图

UML 图是整个过程中最重要的部分，展示出系统的所有元素

图是事物集合的分类，UML 中包含多种图：

1. 类图：类图描述系统所包含的**类、类的内部结构及类之间的关系；**
2. 对象图：对象图是类图的一个具体实例；
3. 顺序图：顺序图表示对象之间动态合作的关系；
4. 协作图：协作图描述对象之间的协作关系；
5. 状态图：状态图描述一类对象的所有可能的状态以及事件发生时状态的转移条件；
6. 部署关系图：部署关系图定义系统中软硬件的物理体系结构；
7. 组件图：组件图描述代码部件的物理结构以及各部件之间的依赖关系；
8. 活动图：活动图描述系统中各种活动的执行顺序。
9. 用例图：用例图**从用户的角度**出发描述系统的功能、需求，展示系统外部的各类角色与系统内部的各种用例之间的关系；





# UML类图

- 在软件工程中，类图是一种**静态的结构图**，描述了系统的类的集合，类的属性和类之间的关系，可以**简化了人们对系统的理解**；
- 类图是系统分析和设计阶段的重要产物，是系统编码和测试的重要模型。



## 类图表示

> 学习链接：https://blog.csdn.net/weixin_57504000/article/details/124218420















































































































































































































































































































































































































































































































































































