---
title: Docker
date: 2023-03-27
category: devops
---

## 教程网址

命令大全 https://blog.csdn.net/anqixiang/article/details/114001509

Docker中文文档https://vuepress.mirror.docker-practice.com/basic_concept/container/

## 1.什么是docker

Docker 是使用最广泛的开源容器引擎，它彻底释放了计算虚拟化的威力，极大提高了应用的运行效率，降低了云计算资源供应的成本！ 使用 Docker，可以让应用的部署、测试和分发都变得前所未有的高效和轻松！

Docker 使用 **Google 公司推出的 Go 语言** 进行开发实现，基于 Linux 内核的 cgroup，namespace，以及 AUFS 类的 Union FS 等技术，对进程进行封装隔离，属于操作系统层面的虚拟化技术。**由于隔离的进程独立于宿主和其它的隔离的进程，因此也称其为容器。**

==Docker 在容器的基础上，进行了进一步的封装，从文件系统、网络互联到进程隔离等等，极大的简化了容器的创建和维护。使得 Docker 技术比虚拟机技术更为轻便、快捷。==

## 2.为什么用docker

① 更高效的利用系统资源：由于容器不需要进行硬件虚拟以及运行完整操作系统等额外开销，Docker 对系统资源的利用率更高。

② 更快速的启动时间：Docker 容器应用，由于直接运行于宿主内核，无需启动完整的操作系统，因此可以做到秒级、甚至毫秒级的启动时间。

③ 一致的运行环境：Docker 的镜像提供了除内核外完整的运行时环境，**确保了应用运行环境一致性**。

④ 持续交付和部署：使用 Docker 可以通过定制应用镜像来实现持续集成、持续交付、部署。一次创建或配置，可以在任意地方正常运行。

⑤ 更轻松的迁移：Docker 确保了执行环境的一致性，使得应用的迁移更加容易。Docker 可以在很多平台上运行，无论是物理机、虚拟机、公有云、私有云，甚至是笔记本，其运行结果是一致的。

## 3.docker隔离原理

https://zhuanlan.zhihu.com/p/519499603

==容器是一种对进程进行隔离的运行环境==

一个容器进程本质上是一个运行在沙盒中的隔离进程，由Linux系统本身负责隔离，Docker只是提供了一系列工具，帮助我们设置好隔离环境后，启动这个进程。

### 1.进程隔离

最基本的隔离就是进程之间看不到彼此，这是由**Linux的Cgroup机制**实现的。进程隔离的结果就是**以隔离方式启动的进程看到的自身进程ID总是1，且看不到系统的其他进程**。

### 2.文件系统隔离

Docker利用**Linux的mount机制**，**给每个隔离进程挂载了一个虚拟的文件系统**，使得一个隔离进程只能访问这个虚拟的文件系统，无法看到系统真实的文件系统。至于这个虚拟的文件系统应该长什么样，这就是制作Docker镜像要考虑的问题。比如我们的Python程序要正常运行，需要一个Python3解释器，需要把用到的第三方库如`psutil`引入进来，这些复杂的工作被简化为一个`Dockerfile`，再由Docker把这些运行时的依赖打包，就形成了Docker镜像。我们可以把一个Docker镜像看作一个zip包，每启动一个进程，Docker都会自动解压zip包，把它变成一个虚拟的文件系统。

### 3.网络协议栈隔离

我们举个例子：在Docker中运行`docker run redis:latest`，然后在宿主机上写个程序连接`127.0.0.1:6379`，是无法连接到Redis的，因为Redis虽然监听`127.0.0.1:6379`这个端口，但Linux可以为进程隔离网络，Docker默认启动的Redis进程拥有自己的网络名字空间，与宿主机不同：

![img](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201501619.webp)

要让宿主机访问到Redis，可以用`-p 6379:6379`把Redis进程的端口号映射到宿主机，从而在宿主机上访问Redis：

![img](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201501660.webp)

因此，在Linux的网络名字空间隔离下，Redis进程和宿主机进程看到的IP地址`127.0.0.1`表面上一样，但实际上是不同的网络接口。

我们再看一个更复杂的例子。如果我们要运行ZooKeeper和Kafka，先启动ZooKeeper：

```css
docker run -p 2181:2181 zookeeper:latest
```

再启动Kafka，发现Kafka是无法连接ZooKeeper的，原因是，Kafka试图连接的`127.0.0.1:2181`在它自己的网络接口上并不存在：

![img](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201501077.webp)

必须连接到ZooKeeper的`IP:2181`或者宿主机的`IP:2181`。直接指定IP并不是一个好的方式，我们应该利用Docker Compose，把ZooKeeper和Kafka运行在同一个网络名字空间里，并通过`zookeeper:2181`来访问ZooKeeper端口，让Docker自动把zookeeper名字解析为动态分配的IP地址。



## 4.docker组成

### 镜像(Images)

Docker 镜像是一个特殊的文件系统，除了**提供容器运行时所需的程序、库、资源、配置**等文件外，还包含了一些**为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）**。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

Docker 设计时，充分利用 Union FS 的技术，将其设计为分层存储的架构，Docker 镜像由多层文件系统联合组成。镜像构建时，会一层层构建，前一层是后一层的基础。每一层构建完就不会再发生改变，后一层上的任何改变只发生在自己这一层。

---

#### docker的镜像原理

#### 镜像是什么？

> 镜像是一种轻量级的，可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时所需的库、环境变量和配置文件。

#### 为什么一个镜像会那么大？

`镜像就是花卷`

- UnionFS（联合文件系统）:

  Union文件系统是一种分层，轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下。Union文件系统是Docker镜像的基础。这种文件系统特性:就是一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录 。	

#### Docker镜像原理

> `docker的镜像实际是由一层一层的文件系统组成。`

- bootfs（boot file system）主要包含bootloader和kernel，bootloader主要是引导加载kernel，Linux刚启动时会加载bootfs文件系统。在docker镜像的最底层就是bootfs。这一层与Linux/Unix 系统是一样的，包含boot加载器（bootloader）和内核（kernel）。当boot加载完,后整个内核就都在内存中了，此时内存的使用权已由bootfs转交给内核，此时会卸载bootfs。

- rootfs（root file system），在bootfs之上，包含的就是典型的linux系统中的/dev，/proc，/bin，/etc等标准的目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu/CentOS等等。

- 我们平时安装进虚拟机的centos都有1到几个GB，为什么docker这里才200MB？对于一个精简的OS，rootfs可以很小，只需要包括最基本的命令，工具，和程序库就可以了，因为底层直接使用Host的Kernal，自己只需要提供rootfs就行了。由此可见不同的linux发行版，他们的bootfs是一致的，rootfs会有差别。**因此不同的发行版可以共用bootfs。**

![image-20221228104808238](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201501323.png)

#### 为什么docker镜像要采用这种分层结构呢?

> `最大的一个好处就是资源共享`

比如：**有多个镜像都是从相同的base镜像构建而来的，那么宿主机只需在磁盘中保存一份base镜像。同时内存中也只需要加载一份base镜像，就可以为所有容器服务了。而且镜像的每一层都可以被共享**。Docker镜像都是只读的。当容器启动时，一个新的可写层被加载到镜像的顶部。这一层通常被称为容器层，容器层之下都叫镜像层。

### 容器(Container)

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，**镜像是静态的定义，容器是镜像运行时的实体**。容器可以被创建、启动、停止、删除、暂停等。

**容器的实质是进程**，但与直接在宿主执行的进程不同，**容器进程运行于属于自己的独立的 命名空间**。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。

==每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层==，我们可以称这个为容器运行时读写而准备的存储层为==容器存储层==。容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。
按照 Docker 最佳实践的要求，**容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化**。所有的文件写入操作，都应该==使用 数据卷（Volume）、或者绑定宿主目录，在这些位置的读写会跳过容器存储层==，直接对宿主(或网络存储)发生读写，其性能和稳定性更高。

**数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷后，容器可以随意删除、重新 run ，数据却不会丢失。**

### 镜像仓库(Registry)

镜像仓库是一个集中的存储、分发镜像的服务。一个 Docker Registry 中可以包含多个仓库（Repository）；每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像。
通常，**一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本**。我们可以通过 `<仓库名>:<标签> `的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 `latest` 作为默认标签。

最常使用的 Registry 公开服务是官方的 Docker Hub，这也是默认的 Registry，并拥有大量的高质量的官方镜像。用户还可以在本地搭建私有 Docker Registry。Docker 官方提供了 Docker Registry 镜像，可以直接使用做为私有 Registry 服务。

## 5.全局命令

`service docker start`：wsl2启动docker： （必须在root下！ sudo su -）

`docker -v` ：查看docker版本

`docker info` : 显示 Docker 系统信息，包括镜像和容器数

`docker login --username=zhangb-l@bimcop registry.cn-beijing.aliyuncs.com`  设置登录公司镜像

密码  glodonUser123!@#

## 6.镜像命令

`docker image ls tomcat` 根据仓库名列出部分镜像

`docker images` 查看本地所有镜像

```txt
虚悬镜像:这个镜像既没有仓库名，也没有标签，均为 <none>
```

`docker images -q` 查看本地镜像的所有镜像id

`docker load -i nginx.tar`	      	 导入nginx镜像，-i就是input

`docker load < nginx.tar`	      		导入nginx镜像

`docker login -u 用户名 -p密码 镜像仓库地址`		 登录镜像仓库

`docker push 镜像仓库地址/镜像名:Tag`   	推送镜像到远程镜像仓库

`docker rmi 镜像名[:Tag]`	删除镜像

`docker rmi 镜像ID`		          删除镜像

`docker rmi -f 镜像ID`		   强制删除镜像（如果容器已经启动则需先停止后方可删除）

`docker rmi -f $(docker images -aq)`		批量删除所有镜像（$后作为参数传递）

```txt
1.实际上是在要求删除某个标签的镜像
```

`docker save 镜像名:Tag > 镜像名-tag.tar`			把镜像打成一个tar包（推荐tar包命名为镜像名-tag），-o代表output

`docker save 镜像名:Tag -o 镜像名-tag.tar`			把镜像打成一个tar包

`docker search 镜像名[:Tag]`  搜索镜像，默认从dockerhub搜索

`docker system df`查看镜像、容器、数据卷所占用的空间

`docker system prune -a`		               			删除没有任何容器使用的镜像、构建缓存

`docker pull 镜像名[:Tag]` 下载镜像；不指定Tag，默认为latest

```txt
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
    Docker 镜像仓库地址：地址的格式一般是 <域名/IP>[:端口号]。默认地址是 Docker Hub(docker.io)
    仓库名：如之前所说，这里的仓库名是两段式名称，即 <用户名>/<软件名>。对于 Docker Hub，如果不给出用户名，则默认为 library，也就是官方镜像

例子：
   docker pull ubuntu:18.04
              等价于 
   docker pull docker.io/library/ubuntu:18.04
```

`docker tag 镜像名:Tag` 	                        		给镜像打Tag

## 7.容器命令

* 每一个容器都是一个精简版的linux系统，里面运行着一个服务

---

`docker ps` 查看正在运行的容器

```txt
CONTAINER ID		容器ID，在同一宿主机上是唯一的
IMAGE				说明容器是用哪个镜像起的
COMMAND				容器启动后执行的第一个shell命令
CREATED				容器已创建了多久
STATUS				容器在Up状态持续的时间
PORTS				容器默认开放的端口，在Dockfile中通过EXPOSE指定
NAMES				容器名字，具有唯一性 
```

`docker ps -a` 查看所有容器

`docker ps -q` 返回正在运行容器id

`docker ps -aq` 返回所有容器id

`docker run -d -p 8081:8080 --name=tomcat_ruyb tomcat:8.0` 启动容器

```txt
-d				后台运行服务
-p 8081:8080	端口映射，宿主机的8081端口映射到容器内服务的8080端口	
--name			指定服务名称（不能重复）
-it             运行时直接进入容器，比如centos镜像系统
```

`docker stop 容器名或容器id` 正常停止容器运行

`docker kill 容器名或容器id` 立即停止容器运行

`docker rm 容器名或容器id`		      删除容器

`docker rm -f 容器名`					      强制删除容器，可以删除运行中的容器

`docker exec -it 容器ID bash`	进入容器，并分配一个新的终端

`docker top 容器名或容器id`          查看容器内的进程

`docker inspect 容器名或容器id`  查看容器细节（WorkingDir工作目录、ip地址）

`exit`															      退出容器

`docker cp /etc/hosts 容器名或容器id:/opt`	 拷贝宿主机的hosts文件到容器的/opt目录下

`docker cp 容器名或容器id:/opt/a.sh /tmp`		拷贝容器的a.sh文件到宿主机的/tmp路径下

`docker logs 容器名`          查看容器日志

`docker logs -f 容器名`   实时查看容器日志

`docker commit 容器名或容器id 镜像名:版本` 将当前容器打包成一个新的镜像

```txt
-m "描述信息" 
-a "作者信息"
```

## 8.数据卷

### 基础

作用：同来实现`容器中数据` 和 `宿主机中数据`进行==文件或目录==的**映射（同步）**的；**持久化容器数据到宿主机上**

注意：数据卷使用必须在**容器首次启动时设置**

应用场景：容器中的服务需要存储数据的，就要使用到数据卷；这样即使docker容器被删除了，那么它里面的**数据还存在于数据卷**中，这样再启动一个容器将数据卷中的数据映射到新容器中，数据也就恢复了。推荐生产一定要使用数据卷！



> 1.使用绝对路径设置数据卷

* docker run -v 宿主机绝对路径1:容器内路径1  -v `宿主机绝对路径2:容器内路径2`  镜像

  注意: 这种方式会**将容器路径的原始内容全部清空,始终以宿主机路径为主**

  ```bash
  docker run -d -p 8082:8080 --name tomcat02 -v /root/apps/:/usr/local/tomcat/webapps:ro
  ```

* ro选项 只能用在容器的路径后面，ro表示宿主机的目录改变只能影响到容器，容器不能影响到宿主机

> 2.使用别名创建

* 注意：这种创建数据卷的方式会**保留原有容器路径下的内容**

```bash
docker run -d -p 8081:8080 --name tomcat01 -v aaaa:/usr/local/tomcat/webapps tomcat:8.0
```

aaaa是docker在宿主机自建的目录，docker自己会创建这个别名并维护

```bash
root@glodon-p1:~# find /var -name aaaa
 /var/lib/docker/volumes/aaaa
```

---

### 高级

别名代表一个docker自身维护的数据卷

`docker volume ls`：查看所有docker维护数据卷

`docker inspect 数据卷别名` 查看数据卷详细内容

```txt
docker inspect 命令可以跟多种参数
	- 容器名称
	- 网桥名称
	- 数据卷别名
但是如果其中名称相同时，需要指定查询的是什么类型的，如
docker volume inspect ems
docker network inspect ems
```

`docker volume rm 数据卷别名`删除一个数据卷

`docker volume create 数据卷别名`创建一个数据卷

## 9.网络配置

### 默认网桥

容器间通信：容器之间不可避免存在网络相互通信。

当 Docker 启动时，会自动在主机上创建一个 `docker0` **虚拟网桥**，实际上是 Linux 的一个 bridge，可以理解为一个软件交换机。它会在挂载到它的网口之间进行转发。

![image-20221228145803100](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201502692.png)

* 通过宿主机`ip a`可以查看到

  ![image-20221228145136509](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201502704.png)

同时，Docker 随机分配一个本地未占用的私有网段（在 [RFC1918](https://tools.ietf.org/html/rfc1918) 中定义）中的一个地址给 `docker0` 接口。比如典型的 `172.17.42.1`，掩码为 `255.255.0.0`。此后启动的容器内的网口也会自动分配一个同一网段（`172.17.0.0/16`）的地址。

当创建一个 Docker 容器的时候，同时会创建了一对 `veth pair` 接口（当数据包发送到一个接口时，另外一个接口也可以收到相同的数据包）。这对接口一端在容器内，即 `eth0`；另一端在本地并被挂载到 `docker0` 网桥，名称以 `veth` 开头（例如 `vethAQI2QT`）。通过这种方式，主机可以跟容器通信，容器之间也可以相互通信。Docker 就创建了在主机和所有容器之间一个虚拟共享网络（**不需要做额外的处理**）

![image-20221228144427212](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201502019.png)

> 总结

1.默认docker在创建容器时将所有容器都连接到docker0网桥上，默认在docker0网桥的容器都可以使用**容器内ip地址**进行通信

```bash
#进入tomcat01容器，对tomcat02容器进行通信访问
root@glodon-p1:~# docker exec -it tomcat01 bash
root@5f8e27802f77:/usr/local/tomcat# curl http://172.17.0.3:8080
```

2.默认docker创建容器时将所有容器都连接到docker0网桥上，默认在docker0网桥的容器都可以使用**容器名称作为容器ip**进行通信，但是注意：使用容器名称**必须自定义网桥**不能使用默认dockero

---

### 自定义网桥

1.docker网桥类型，有三种bridge、host、none

* 允许连接到同一网桥网络的容器进行通信，同时提供与未连接到该网桥网络的容器的隔离

```bash
root@glodon-p1:/# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
daf4e6a263a3   bridge    bridge    local
3fb3be082705   host      host      local
a5a612bdf0dc   none      null      local
```

2.查看网络 `docker network ls`

3.查看某网络细节`docker network inspect 网络名称`

* 在自定义网络创建容器前

```bash
root@glodon-p1:/# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
daf4e6a263a3   bridge    bridge    local
3fb3be082705   host      host      local
b10c10f01429   n-ruyb    bridge    local
a5a612bdf0dc   none      null      local
root@glodon-p1:/# docker network inspect n-ruyb
[
    {
        "Name": "n-ruyb",
        "Id": "b10c10f01429dea1dcb730e01457ed0b61ab6dc11d064180c3cd78995f64d8db",
        "Created": "2022-12-28T17:58:51.608529755+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]
root@glodon-p1:/#
```

* 在自定义网络创建容器两个容器后：

```bash
root@glodon-p1:/# docker network inspect n-ruyb
[
    {
        "Name": "n-ruyb",
        "Id": "b10c10f01429dea1dcb730e01457ed0b61ab6dc11d064180c3cd78995f64d8db",
        "Created": "2022-12-28T17:58:51.608529755+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "759dc488ad730d07c0bd8cf436b8393599d3c610688084aa1a676406ef735783": {
                "Name": "tomcat02",
                "EndpointID": "34948c6cdc2dcb081a6a7f9f083c824d2d435b1fde4b9590017e5ddad144db30",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            },
            "9780c45385c0479f932f00c099f233d98bcf7c2a7cc32c172e599b3567b03083": {
                "Name": "tomcat01",
                "EndpointID": "8b067f0bf2ffaed5221fd0bd9dd804e43152703354f31f60154963479cee1e52",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
root@glodon-p1:/#
```

4.删除一个网络

`docker network rm 网络名称`

`docker network prune` 删除所有未被用到网络

**5.创建自定义网桥**

`docker network create 网络名称`  

```bash
docker run -d -p 8081:8080 --name tomcat02 --network n-ruyb tomcat:8.0
```

自定义网桥后就可以通过名称来访问容器

```bash
root@glodon-p1:/# docker exec -it tomcat02 bash
#访问tomcat01的地址 获得默认的jsp页面代码
root@759dc488ad73:/usr/local/tomcat# curl http://tomcat01:8080
```

**6.运行多个容器在指定网络中**

a.启动容器时明确指定容器使用那个网络

`docker run -d --network 网络名称`

b.启动之后容器加入到某个网络中

`docker network connect 网络名 容器id(name)`

## 10.Dockerfile

> 注意D大写f小写，是Dockerfile而不是dockerFile

![image-20230108154217367](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201502003.png)

1.概念：Dockerfile可以认为是**Docker镜像的描述文件，是由一系列命令和参数构成的脚本**。

2.作用：**用来构建docker镜像的构建文件**。

3.如何构建自己的镜像

​	a.在指定位置创建Dockerfile文件。编写dockerfile相关语法

​	b.通过Dockerfile构建镜像。`docker build -t aa:1.0 . `(.用来指定Dockerfile文件所在位置)

### 构建镜像流程

![image-20230108154417283](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201502335.png)

* 执行build命令时，会将**Dockerfile的上下文**目录中`所有文件`都发给Server引擎；也可以写`.dockerIgnore`文件去选择发送哪些文件；

* Dockerfile要求一行只有存在一条完整命令；

* Server引擎会根据第一行命令，构建出一个临时镜像；第二天指令，在第一个临时镜像再构建一个临时镜像，最终生成一个最终镜像（这个镜像Id就是通过docker images看到的）；

* Docker使用缓存存下这些临时镜像，方便后续相同命令直接获取；


### Dockerfile指令

官方说明:https://docs.docker.com/engine/reference/builder/

```txt
1.每条保留字指令都必须为大写，且后面都要跟至少一个参数
2.指令按照从上到下，顺序执行
3.#表示注释
4.每条指令都会创建一个新的镜像层，并对镜像进行提交
```

| 保留字         | 作用                                                         |
| -------------- | ------------------------------------------------------------ |
| **FROM**       | **当前镜像是基于哪个镜像的** `第一个指令必须是FROM`          |
| MAINTAINER     | 镜像维护者的姓名和邮箱地址                                   |
| **RUN**        | **构建镜像时需要运行的指令**                                 |
| **EXPOSE**     | **当前容器对外暴露出的端口号**                               |
| **WORKDIR**    | **指定在创建容器后，终端默认登录进来的工作目录，一个落脚点** |
| **ENV**        | **用来在构建镜像过程中设置环境变量**                         |
| **ADD**        | **将宿主机目录下的文件拷贝进镜像且ADD命令会自动处理URL和解压tar包** |
| **COPY**       | **类似于ADD，拷贝文件和目录到镜像中<br/>将从构建上下文目录中<原路径>的文件/目录复制到新的一层的镜像内的<目标路径>位置** |
| **VOLUME**     | **容器数据卷，用于数据保存和持久化工作**                     |
| **CMD**        | **指定一个容器启动时要运行的命令<br/>Dockerfile中可以有多个CMD指令，但只有最后一个生效，CMD会被docker run之后的参数替换** |
| **ENTRYPOINT** | **指定一个容器启动时要运行的命令<br/>ENTRYPOINT的目的和CMD一样，都是在指定容器启动程序及其参数** |



### 构建过程

`docker build -t 镜像名称:Tag .`  构建镜像，指定名称和Tag

#### 1.创建Dockerfile文件

建议创建一个单独文件夹，创建一个`Dockerfile`文件，去编写指令

`mkdir docker`

`cd docker`

`mv Dockerfile docker/`

`vim Dockerfile`

添加指令`FROM centos:latest`，保存退出

#### 2.构建自己的镜像

`docker build -t ruybos:01 .`  注意一定要加上最后的.；

可以看到，因为Dockerfile中只有一个FROM指令，所以它的最终镜像id和centos一样；

```txt
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
ubuntu        18.04     251b86c83674   4 weeks ago     63.1MB
hello-world   latest    feb5d9fea6a5   15 months ago   13.3kB
centos        latest    5d0da3dc9764   15 months ago   231MB
ruybos        01        5d0da3dc9764   15 months ago   231MB
tomcat        8.0       ef6a7c98d192   4 years ago     356MB
```

#### 3.给镜像安装vim

RUN命令 在上一步的镜像上执行一些操作

```txt
ps:因为centos的latest镜像无法安装vim，所以FROM的参数换为centos:centos7
```

添加指令`RUN yum install -y vim`

构建镜像`docker build -t ruybos:02 .`

创建容器，验证

```shell
docker run -it ruybos:02
touch r.txt
vim r.txt
```

#### 4.Expose

注意：**仅仅是声明**

用来指定构建的镜像在运行为容器时对外暴露的端口

```dockerfile
EXPOSE 80/tcp  如果没有显示指定则默认暴露都是tcp
EXPOSE 80/udp
```

#### 5.WORKDIR 

用来指定构建的镜像在运行为容器时，进入的目录

```dockerfile
WORKDIR /a  #绝对路径
WORKDIR b   #相对路径
```

#### 6.ADD、COPY

- 用来从context上下文复制新文件、目录或远程文件url，并将它们添加到位于指定路径的映像文件系统中。

- 语法:

  ```dockerfile
  ADD hom* /mydir/       通配符添加多个文件
  ADD hom?.txt /mydir/   通配符添加
  ADD test.txt relativeDir/  可以指定相对路径
  ADD test.txt /absoluteDir/ 也可以指定绝对路径
  ADD url #自动下载url指定的文件
  ```

* ADD比COPY多的功能是 可以通过`ADD url`自动下载文件，添加到镜像的`WORKDIR`目录下

#### 7.ENV

设置环境变量，方便维护

* 指定BASE_PATH常量
* 倒数第二个 `WORKDIR tomcat-9.0.48` 是进入tomcat-9.04.48目录，创建了aa.txt文件

![image-20230116151253167](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201502584.png)

#### 8.VOLUME

注意：**仅仅是声明**

定义容器运行时可以挂在到宿主机的目录



#### 9.CMD和ENTRYPOINT

语法1：直接命令方式

`java -jar ems.jar`

语法2：json数组方式 **推荐**

