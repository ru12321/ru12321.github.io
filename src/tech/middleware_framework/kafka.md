---
title: Kafka
date: 2024-01-17
category: 中间件
---

Ctrl + L 清屏


## Linux知识

### 集群配置

**做完步骤1、2、3、4后，就可以克隆虚拟机102，103，在102,103上面修改1、2的ip和hostname即可**

#### 1.配置ip和网卡

vim /etc/sysconfig/network-scripts/ifcfg-ens33

```txt
TYPE=Ethernet                                                                                                       
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=0a27b761-862c-43dd-9666-00b74e5e1965
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.10.101
NETMASK=255.255.255.0
GATEWAY=192.168.10.2
DNS1=8.8.8.8
```

#### 2.配置主机名称

vim /etc/hostname

```
ruyb101
```

#### 3.配置ip和host映射

vim /etc/hosts

```ssh
192.168.10.101 ruyb101
192.168.10.102 ruyb102
192.168.10.103 ruyb103
```

#### 4.配置防火墙，重启

```sh
#关闭防火墙
systemctl stop firewalld
#关闭防火墙开机自启
systemctl stop firewalld

reboot
```

#### 5.安装vim，jdk

安装epel-release，相当于一个软件仓库

```bash
yum install -y epel-release
```

安装net-tools：包含`ifconfig`等工具 命令

```bash
yum install -y net-tools
```

安装vim编辑器

```bash
yum install -y vim

vim /etc/vimrc

# 文本后换行添加内容
" 打开语法高亮。自动识别代码，使用多种颜色显示。
syntax on
"在底部显示，当前处于命令模式还是插入模式。
set showmode
"显示行号
set number
"光标所在的当前行高亮。
set cursorline 
```

查看所安装的rmp安装包中含java的忽略大小写

```bash
rpm -qa | grep -i java 

#卸载

```

安装jdk，配置环境变量

```bash
cd /usr/local

tar -zxvf jdk8u-.tar.gz

# 新建环境变量启动文件
vim /etc/profile.d/my_env.sh

#文件添加内容
export JAVA_HOME=/usr/local/jdk1.8.0_271
export PATH=$PATH:$JAVA_HOME/bin

#重启环境
source /etc/profile
```

#### 6.集群分发脚本

##### scp传输（secure copy）安全拷贝

实现服务器与服务器之间的数据拷贝

---

scp   -r    $pdir/$fname       $user@$host:$pdir/$fname

命令  递归   要拷贝的文件路径/名称  目的地用户@主机:目的地路径/名称

---

```bash
#101上操作，给102拷贝文件，输入yes和密码
scp -r /usr/local/jdk1.8.0_271/ root@ruyb102:/usr/local

#103上操作，从101拷贝文件：
 scp -r root@ruyb101:/usr/local/jdk1.8.0_271/ ./
 
#102操作，从101拷贝文件到103
scp -r root@ruyb101:/usr/local/jdk1.8.0_271/ root@ruyb103:/usr/local/jdktmp
```

##### rsync 远程同步工具

rsync主要用于备份和镜像。具有速度快、避免复制相同内容和支持符号链接的优点。

rsync和scp区别：用rsync做文件的复制要比scp的速度快，**rsync只对差异文件做更新。scp是把所有文件都复制过去**

---

rsync   -av    $pdir/$fname       $user@$host:$pdir/$fname

命令  选项参数  要拷贝的文件路径/名称  目的地用户@主机:目的地路径/名称

-a：归档拷贝

-v：显示复制过程

##### ==xsync集群分发脚本==

作用：循环复制文件到所有节点的相同目录下，期望通过xsync脚本在任何路径可以使用

---

写任何脚本都可以按这个步骤来做，**直接写到环境变量下，随处调用**

---

1.查看环境变量

```
echo $PATH
```

2.在环境变量某个bin目录下，推荐用户目录或者usr/local/bin下创建脚本文件xsync，编写脚本

```bash
cd /usr/local/bin
vim xsync


#脚本文件内容
#2. 遍历集群所有机器
for host in ruyb102 ruyb103
do
    echo ====================  $host  ====================
    #3. 遍历所有目录，挨个发送

    for file in $@
    do
        #4. 判断文件是否存在
        if [ -e $file ]
            then
                #5. 获取父目录
                pdir=$(cd -P $(dirname $file); pwd)

                #6. 获取当前文件的名称
                fname=$(basename $file)
                ssh $host "mkdir -p $pdir"
                rsync -av $pdir/$fname $host:$pdir
            else
                echo $file does not exists!
        fi
    done
done
```

3.让脚本具备执行权限

```bash
chmod +x xsync
```

4.环境编辑生效

```bash
source /etc/profile
```







#### 7.ssh免密登录

![image-20230911092206689](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202309110922766.png)



```bash
# 进入ssh命令目录
cd /root/.ssh

#生成公钥私钥
ssh-keygen -t sra

#将公钥拷贝到要免密登录的目标机器上
#这是在101机器上执行的命令，同理在102,103机器上也执行这三行命令
ssh-copy-id ruyb101
ssh-copy-id ruyb102
ssh-copy-id ruyb103
```

中文官网https://kafka.apachecn.org/

官网https://kafka.apache.org/

## kafka定义

Kafka传统定义：Kafka是一个分布式的基于发布/订阅模式的消息队列（MessageQueue），主要应用于大数据实时处理领域。

发布/订阅：消息的发布者不会将消息直接发送给特定的订阅者，而是将发布的消息分为不同的类别，订阅者只接收感兴趣的消息。

Kafka 最新定义： Kafka 是一个开源的分布式事件流平台（ Event StreamingPlatform），被数千家公司用于高性能数据管道、流分析、数据集成和关键任务应用。



## ==消息队列的应用场景==

消峰

解耦

异步通信



## 基础架构

![image-20230907143857269](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202309071438347.png)

## 安装部署

解压tar包

```bash
tar -zxvf kafka_2.12-3.5.1.tgz
```

修改配置文件

```bash
vim kafka/config/server.properties

# 修改broker.id，集群机器要唯一
broker.id=0

#修改日志目录
log.dirs=/usr/local/kafka/datas

#修改zk服务器地址
zookeeper.connect=ruyb101:2181,ruyb102:2181,ruyb103:2181/kafka 
```

配置环境变量

```bash
vim /etc/profile.d/my_env.sh 


#文件内容
#KAFKA
export KAFKA_HOME=/usr/local/kafka
export PATH=$PATH:$KAFKA_HOME/bin


#环境变量生效
source /etc/profile
```

通过脚本启动zk集群

```bash
zk.sh start
```

zk.sh，写在环境变量目录/usr/local/bin下，chmod +x zk.sh，source zk.sh即可

```shell
#!/bin/bash

case $1 in
"start"){
        for i in ruyb101 ruyb102 ruyb103
        do
                echo  ------------- zookeeper $i 启动 ------------
                ssh $i "/usr/local/zookeeper/bin/zkServer.sh start"
        done
}
;;
"stop"){
        for i in ruyb101 ruyb102 ruyb103
        do
                echo  ------------- zookeeper $i 停止 ------------
                ssh $i "/usr/local/zookeeper/bin/zkServer.sh stop"
        done
}
;;
"status"){
        for i in ruyb101 ruyb102 ruyb103
        do
                echo  ------------- zookeeper $i 状态 ------------
                ssh $i "/usr/local/zookeeper/bin/zkServer.sh status"
        done
}
;;
esac
```

通过脚本查看zk状态

```bash
xcall jps


=============== ruyb101 ===============
8018 QuorumPeerMain
13399 Jps
=============== ruyb102 ===============
100457 Jps
95117 QuorumPeerMain
=============== ruyb103 ===============
101395 Jps
96078 QuorumPeerMain
```

xcall脚本

```shell
#!/bin/bash                                                                                                                                         
for host in ruyb101 ruyb102 ruyb103
do
        echo =============== $host ===============
        ssh $host jps
done
```







## kafka消息发送流程

![image-20231016093523861](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202310160935927.png)

## spring cloud项目使用

### 配置文件

```yml
# 代码中指定信道

# 配置中指定kafka的主题、消费者组

spring:   
  cloud:
    stream:
      bindings:
        flDocStandardNodePubMnr_flow_input: #spring stream的信道名称
          destination: task # 对应kafka架构的topic--主题名
          binder: kafka-ext # kafka作为spring cloud stream的binder的固定写法
          group: estate_fl_doc_standard_flow_style # 对应kafka架构的consumer group--消费者组名
```







### spring cloud stream binding

* 作用：连接spring应用和中间件的**连接+转换器**

* output binding：中间件生产者使用，将sprng数据**转换**为中间件数据
* intput binding：中间件消费者使用，将中间件数据**转换**为的spring数据

![image-20230926103151250](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202309261031360.png)

### kafka生产者











### kafka消费者









## 文末.....





























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































