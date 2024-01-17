

# 收获

0.文件颜色

* 蓝色是目录
* 绿色是可执行文件
* 红色是压缩文件

1.`init 0` 关机

2.`tar zxvf xxx.tar.gz`解压压缩包

3.`yum intall -y xxx` centos安装包 -y默认就是选了提示的yes

4.防火墙

* 关闭防火墙 `systemctl stop firewalld.service`
* 禁止防火墙开机启动 `systemctl disable firewalld.service`
* 放行端口 `firewall-cmd --zone=public --add-port=80/tcp --permanent`
* 重启防火墙 `firewall-cmd --reload`

5.`ps -ef | grep nginx` 过滤出nginx进程

6.linux一般安装应用到`/usr/local`

7.`telnet ip 端口` 验证**端口**是否开通，必须加上端口号 eg: `telnet 192.168.10.101 80`

8.服务器可以上网，配置静态ip后，使用Xshell连接使用更方便；使用xftp查看服务器目录层级，可以直接右键记事本打开编辑文件；

9.nginx.conf.default是默认的配置文件，搞坏了.conf可以使用默认的玩，**编辑时一定注意`;`分号**

10.vmware开的虚拟机中的nginx，如果给内网其它人访问到

* vmware是nat网络模式下
* ![image-20230518151207302](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305181512360.png)

* 访问http://10.8.52.38:2201/，请求就可以转发到192.168.10.101:80端口去

11.命令curl

```sh
#返回请求内容
curl http://192.168.10.102

#返回响应头信息，注意是大写的I 
curl -I http://192.168.10.102

#-e表示加上referer
curl -e "http://baidu.com" -I http://192.168.44.101/img/logo.png
```

12.date 查看机器时间







# 一、Nginx安装

vmware中安装cenos7

> 报错：VMware Workstation与Credential Guard不兼容。在禁用 Device/Credential Guard后，可以运行VMware Workstation
>
> 解决：http://681314.com/A/EioXEKQ48e 注意解决后影响了wsl的使用



## 1.1 配置上网

* 安装后配置网卡文件；重启网络；测试

  ![image-20230517142615754](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171426774.png)

  ```sh
  //进入网卡配置文件
  vi /etc/sysconfig/network-scripts/ifcfg-ens33
  
  //修改ONBOOT=yes
  
  //重启网络
  systemctl restart network
  
  //ping外网试试
  ping qq.com
  ```

  

* 此时的网卡是`dhcp方式分配ip地址`，这种方式会在系统**每次联网的时候分配一个ip**给我们用，也就是说有可能系统下次启动的时候ip会变，这样非常不方便我们管理；

  此时的ip是`192.168.10.128`，能访问外网（ping通了qq.com），所以可以使用Xshell连接这个ip

  ![image-20230517142517272](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171425338.png)

## 1.2 配置静态ip

* 通常xxx.xxx.xxx.1是网关，但也不一定



![image-20230517143503639](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171435662.png)



## 1.3 过程排错

1.先`ping qq.com`，没有数据包返回，说明不能上网

2.再ping DNS如`ping 8.8.8.8 `，没有数据包返回，说明该机器没有上到互联网

3.再排查网关配置是否正确，去看vmware的网关是多少

![image-20230517144525116](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171445170.png)

4.所以修改centos7的网关为.2即可

## 1.4 nginx版本

Nginx开源版  			http://nginx.org/                         很干净的版本
Nginx plus 商业版	https://www.nginx.com             商业版，全家桶
openresty					http://openresty.org/cn/             lua脚本扩展，免费，
Tengine						http://tengine.taobao.org/			c语言扩展，免费，淘宝网发起



* 下载开源版本nginx-1.21.6.tar.gz

* xftp上传到服务器中，然后tar zxvf xxx解压

* 然后进入文件夹，直接编译安装

  * `./configure --prefix=/usr/local/nginx`

  * 报错则依次安装以下

    * ```shell
      yum install -y gcc
      yum install -y pcre pcre-devel
      yum install -y zlib zlib-devel
      ```

  * 再依次编译执行

    * ```shell
      ./configure --prefix=/usr/local/nginx
      make
      make install
      ```

## 1.5 启动nginx

进入安装好的目录/usr/local/nginx/sbin

```shell
./nginx 启动
./nginx -s stop 快速停止
./nginx -s quit 优雅关闭，在退出前完成已经接受的连接请求（把之前没完成的下载啊什么任务执行完）
./nginx -s reload 重新加载配置
```

* 启动后，在宿主机访问服务器的nginx（本机ip即可），发现无法访问，需要关闭防火墙

* 关闭后再访问，显示正常

  ![image-20230517151646600](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171516644.png)



### 防火墙

关闭防火墙 `systemctl stop firewalld.service`

禁止防火墙开机启动 `systemctl disable firewalld.service`

放行端口 `firewall-cmd --zone=public --add-port=80/tcp --permanent`

重启防火墙 `firewall-cmd --reload`



### 编写nginx启动脚本

创建服务脚本：将nginx启动命令作为服务器的一个服务，实现开机自己启动

```shell
vi /usr/lib/systemd/system/nginx.service
```

服务脚本内容

* 注意下面的路径要和安装nginx的路径一样

```shell
[Unit]
Description=nginx - web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```


重新加载系统服务

```shell
systemctl daemon-reload
```

启动服务

```shell
systemctl start nginx.service
```

查看服务状态

```shell
systemctl status nginx
```

开机自启动服务

```shell
systemctl enable nginx.service
```

修改完配置文件重新加载一下

```shell
systemctl reload nginx
```





# 二、Nginx使用

## 2.1 目录

conf目录

`用来存放配置文件相关`，主要是`nginx.conf`

html目录

`用来存放静态文件的默认目录 html、css等，默认访问的就是index.html页面`

logs目录

`记录访问日志 access.log，日志文件大小可以配置；`

`nginx.pid记录nginx程序的pid为887`

sbin目录

`nginx的主程序`

## 2.2 运行原理

1.运行时分为主进程，加载和校验配置文件，协调子进程；

2.再forks启动子进程，去接收请求；读取到nginx.conf的站点配置，解析请求要访问的站点页面

![image-20230517154517629](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171545684.png)

## 2.3 nginx.conf

* 编辑完配置后，重新加载一下`systemctl reload nginx`

去掉注释后的精简文件

```json
//默认为1，表示开启一个业务进程
worker_processes  1;

events {
    //单个业务进程可接受连接数
    worker_connections  1024;
}

http {
    //引入http mime类型，存放的是各类文件类型、后缀，用于网络传输解析用
    include       mime.types;
    
    //如果mime类型没匹配上，默认使用二进制流的方式传输
    default_type  application/octet-stream;
    
    //使用linux的sendfile(socket, file, len) 高效网络传输，也就是数据0拷贝
    sendfile        on;
   
    keepalive_timeout  65;
 
    //一个server代表一个主机，每个主机不干扰，这种方式叫虚拟主机vhost
    server {
        //当前主机的监听端口号
        listen       80;

    	//当前主机的主机名或域名 http://glodon.com
        server_name  localhost;
    
        // 一个url是http://glodon.com/xxoo/index.html
    	//uri是/xxoo/index.html
		//匹配路径，/代表uri，是资源的意思
        location / {
    		//匹配上uri后，进入文件根目录，这个html是相对目录，相对于/usr/local/nginx下的
            root   html;
    		//默认页名称
            index  index.html index.htm;
        }

		//报错编码对应页面
		error_page 500 502 503 504 /50x.html; 
		location = /50x.html {
			root html;
		}
    }
}
```

### 关于sendFiile

linxu内核直接复制文件的技术

**未使用：**

* nginx软件通过linux内核的网络接口接收请求，假如该请求要访问xxx.mp3文件
* nginx会将该文件读取到自己的应用程序内存，再通过linux网络接口缓存发送出去

![image-20230517160254270](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171602325.png)



**启用sendFile后**

* nginx对于文件请求，直接发送给linux内核一个信号
* linux内核直接读取发送出去该文件

![image-20230517160521822](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305171605869.png)



## 2.4 虚拟主机和域名解析

这里的虚拟主机可以理解为nginx配置中的不同的server，每个server代表一个主机

参考文档：https://blog.csdn.net/weixin_41490593/article/details/94612784

* 当客户端发送一个请求后，通常是http协议，而`http1.1包含了host字段，即请求头带着域名的信息--默认url`
* 先通过DNS域名解析，得到ip，然后建立tcp连接，当服务器（以nginx为例）收到请求时，就会`解析http请求host字段`来判断你是访问的`那个server配置`下的代码。nginx配置多个server。这样就可以实现在一个服务器上通过http的host字段实现虚拟服务器

* 虚拟主机（virtual hosting）即共享主机（shared web hosting），可以利用虚拟技术把一台完整的服务器分成若干个主机，因此可以在单一主机上运行多个网站或服务。

* 举个栗子，有一台 ip 地址为 61.135.169.125 的服务器，在这台服务器上部署着谷歌、百度、淘宝的网站。为什么我们访问 [https://www.google.com](https://www.google.com/) 时，看到的是 Google 的首页而不是百度或者淘宝的首页？原因就是 `Host 请求头决定着访问哪个虚拟主机`

* hosts文件配置  `ip   --->  域名`的映射



阿里云域名解析

* 将实际购买的域名解析到具体的机器（虚拟机服务器也可以）上~

![image-20230518092813199](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305180928260.png)

* 多用户/租户的二级用户，使用通配符 * 进行解析

![image-20230518093150889](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305180931945.png)



域名解析实战

1. 多用户的二级域名

nginx拿到完整的url（ruyb.glodon.com），拆分得到二级域名的值（ruyb），nginx反向代理去数据库查到ruyb的个人信息，再转给nginx，nginx再返回给页面

2. 短网址

短网址DB用key-value形式存储`uuid:真实网址`，url拆分得到uuid，拿到真实网址去redirect



## 2.5 nginx虚拟主机配置

1.配置**不同的端口号**进行测试，注意配置中的分号不能省略`;`

```json
   server {
        listen       80;
        server_name  localhost;

        location / {
            root   /test01/www;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }


    server {
        listen       88;
        server_name  localhost;

        location / {
            root   /test01/vod;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

2.配置**不同的server_name**域名

宿主机的hosts文件配置了域名解析

```txt
192.168.10.101    r.com
192.168.10.101    r2.com
```

nginx.conf

```json
server {
        listen       80;
        server_name  r.com;

        location / {
            root   /test01/www;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }


    server {
        listen       80;
        server_name  r2.com;

        location / {
            root   /test01/vod;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

## 2.6 server_name匹配规则

* ==重要==：如果域名解析后打到服务器上了（即**匹配到了nginx所监听的server端口**），但是该请求带的域名**匹配不上**任何一个server_name，那么**nginx默认就会返回该server端口下的第一个（按照书写的先后顺序）location对应的页面**
* **所有请求都是从上到下匹配server，匹配到就不往下走了**

* **在一个server中的同一servername中可以配置多个域名**

---

完整匹配

```js
server_name vod.mmban.com www1.mmban.com;
```

通配符匹配

```js
server_name *.mmban.com;
```

通配符结束匹配

```js
server_name vod.*;
```

正则匹配

```js
server_name ~^[0-9]+\.mmban\.com$;
```

举例

* 这样配置是指除了www.r.com，其它的以`.r.com`结尾的请求都打到下面的server上

```js
    server {
        listen       80;
        server_name  www.r.com;

        location / {
            root   /test01/www;
            index  index.html index.htm;
        }
    }


    server {
        listen       80;
        server_name  *.r.com;

        location / {
            root   /test01/vod;
            index  index.html index.htm;
        }
    }
```

## 2.7 反向代理

> 好文推荐，讲代理的 https://zhuanlan.zhihu.com/p/464965616
>
> 为什么有这东西，不能直接访问吗？利用反向代理可以作为内部 **负载均衡(load balance)** 的手段

1. 网关、代理与反向代理

网关：转发数据包，访问网络的入口

代理：即正向代理，是指用户主动配置代理服务器，用户和代理服务器是整体；是客户端视角

反向代理：代理服务器和后台应用服务器是整体；是服务端视角

`正反代理都是一个数据传输中转站，代理服务器可以理解为一个网关`

2. 反向代理在系统架构中的应用场景
   * 传统公司系统架构，nginx做反向代理

![image-20230518135818640](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305181358696.png)

![image-20230518135836335](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305181358393.png)

![image-20230518135905537](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305181359588.png)



* 中小型互联网，nginx可以改变请求的url，`url拼接形式可以转为100.html`

  ![image-20230518140356977](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305181403047.png)

![image-20230518140751802](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305181407869.png)



3. Nginx的反向代理配置

`proxy_pass`让http请求直接302

* 不支持https的proxy_pass，会直接配置文件报错

* location是/，说明访问站点的根目录会进来，把请求转发到`http://www.baidu.com	`这个地址

```js
    server {
        listen       80;
        server_name localhost;

        location / {
            proxy_pass http://www.baidu.com	
            #root   html;
            #index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

4. 基于反向代理的负载均衡器

```js
  //名称要和第12行后面的一样 
  upstream httpru {
       server 192.168.10.102:80;
       server 192.168.10.103:80;
   }

    server {
        listen       80;
        server_name localhost;

        location / {
            proxy_pass http://httpru;	
            #root   html;
            #index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

## 2.8 负载均衡

**轮询**（使用多，但不能维持会话）

* 逐一转发，这种方式适用于无状态请求

* 不能保存session信息，本次会话在机器A上，下次请求不一定到机器B了，拿不到会话信息

```js
  upstream httpru {
       server 192.168.10.102:80;
       server 192.168.10.103:80;
   }
```

**权重**（不能维持会话）

* 指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况

* weight默认为1

```js
   upstream httpru {
       server 192.168.10.102:80 weight=8;
       server 192.168.10.103:80 weight=2;
       server 192.168.10.104:80 weight=1;
   }

   //down代表下线了，只能访问到3和4
   //backup代表只有3挂了，才能访问到备用机4
   upstream httpru {
       server 192.168.10.102:80 weight=8 down;
       server 192.168.10.103:80 weight=2;
       server 192.168.10.104:80 weight=1 backup;
   }
```

ip_hash

* 根据客户端的ip地址转发同一台服务器，可以保持会话

* 但是ip也可以变化，当信号不好时/手机切换基站时，ip发生变化，会话无法保持了

url_hash（适用固定资源，这些资源都不在同一服务器）

* 根据用户访问的url定向流量转发请求

least_conn

* 最少连接访问

fair

* 根据后端服务器响应时间转发请求

---

企业更多的是`轮询方式 + token方式`做负载均衡和维持会话（身份验证）

> token
>
> https://cloud.tencent.com/developer/article/2062159
>
> https://www.jianshu.com/p/3b5e7293bf95

## 2.9 动静分离

将静态资源前置到nginx服务器上，减轻了应用服务器的压力，提高并发；而且即使动态服务不可用，但静态资源不会受到影响

配置反向代理

```js
location / {
    proxy_pass http://127.0.0.1:8080;
    root html;
    index index.html index.htm;
}
```

**同一个server下增加location**

```js
location /css {
    root html;
    index index.html index.htm;
}
location /images {
    root html;
    index index.html index.htm;
}
location /js {
    root html;
    index index.html index.htm;
}
```

## 2.10 location匹配

location 前缀

`/` 通用匹配，任何请求都会匹配到

`= `精准匹配，不是以指定模式开头

`~ `正则匹配，区分大小写

`~*` 正则匹配，不区分大小写

`^~`

---

举例正则匹配

```js
location ~*/(css|img|js) {
		root /usr/local/nginx/static;
		index index.html index.htm;
}
```

location匹配顺序

* 普通（非正则）location会一直往下，直到找到==匹配度最高==的（最大前缀匹配）

* 多个正则location直接按书写顺序匹配，成功后就不会继续往后面匹配
* 当普通location与正则location同时存在，如果正则匹配成功,则不会再执行普通匹配
* ==所有类型location存在时，“=”匹配 > “^~”匹配 > 正则匹配 > 普通（最大前缀匹配）==

## 2.11 URL rewrite

将含参数的那些URL地址，隐藏一下，应用场景有

- 地址跳转，用户访问www.linux.com这个URL是，将其定向至一个新的域名www.baidu.com。
- 协议跳转，用户通过http协议请求网站时，将其重新跳转至https协议方式。
- **伪静态**，将动态页面显示为静态页面方式的一种技术，便于搜索引擎的录入，同时建上动态URL地址对外暴露过多的参数，提升更高的安全性。
- **搜索引擎**，SEO优化依赖于url路径，好记的url便于搜索引擎录入

---

* 静态的写法：以^开头，$结尾，将uri`/2.html`重转到`/index.jsp?pageNum=2`
* break不会改变原有的url`www.xxxx.com/2.html`；redirect会改变原有的url`www.xxxx.com/index.jsp?pageNum=2`

![image-20230518165058225](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305181650286.png)



```bash
rewrite是实现URL重写的关键指令，根据regex (正则表达式)部分内容，重定向到replacement，结尾是flag标记。

rewrite <regex> <replacement> [flag];
 关键字   正则       替代内容    flag标记

关键字：其中关键字error_log不能改变

正则：perl兼容正则表达式语句进行规则匹配

替代内容：将正则匹配的内容替换成replacement

flag标记：rewrite支持的flag标记
	rewrite参数的标签段位置：
	server,location,if
	flag标记说明：
		last #本条规则匹配完成后，继续向下匹配新的location URI规则
		break #本条规则匹配完成即终止，不再匹配后面的任何规则
		redirect #返回302临时重定向，浏览器地址会显示跳转后的URL地址
		permanent #返回301永久重定向，浏览器地址栏会显示跳转后的URL地址
```

* 正则写法：

```js
//()括起来正则，代表是第一个参数
//$1 代表 拿到正则的第一个值
rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 break;
```



## 2.12 网关服务器

**nginx更准确的叫法是网关服务器，包含反向代理、负载均衡、动静分离、URL WRITEd等功能**

```js
upstream httpds {
    server 192.168.44.102 weight=8 down;
    server 192.168.44.103:8080 weight=2;
    server 192.168.44.104:8080 weight=1 backup;
}
location / {
    rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1 redirect;
    proxy_pass http://httpds ;
}
```



## 2.13 防盗链

网页的加载顺序是先加载HTML相关的内容，然后解析HTML的内容，那些需要加载图片，那些需要加载文件，是逐步加载的。

背景：当发起一个请求xxx.html文件时，xxx.html文件引用到了zz.img，这时会再发请求去拿到zz.img，此时的请求头`Header`上就会带着`Referer`字段。通俗理解就是referer**代表你从哪个url跳转过来的**

![image-20230518171852214](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305181718284.png)

这样就可以做防盗链配置，即不想让别人（爬虫）等使用你的静态资源，即**指定从www.xxx.com跳转过来才可以访问静态资源**；

```js
location ~*/(css|img|js) {
	//指定请求必须从192.168.44.101跳转过来才可以往下执行
	valid_referers 192.168.44.101;
	if ($invalid_referer) {
        
        //可以直接返回图片
        rewrite ^/  /img/x.png  break;
        //也可以返回状态码
    	// return 403;
	}
	root /usr/local/nginx/static;
	index index.html index.htm;
}
```

```sh
valid_referers none | blocked | server_names | strings ....;
```

* none， 检测 Referer 头域不存在的情况，没有referer也可以访问；但带错了referer就不行
* blocked，检测 Referer 头域的值被防火墙或者代理服务器删除或伪装的情况。这种情况该头域的值不以
  “http://” 或 “https://” 开头
* server_names ，设置一个或多个 URL ，检测 Referer 头域的值是否是这些 URL 中的某一个

## 2.14 高可用配置

为什么要有高可用？因为nginx万一挂掉了呢...

* keepalived是一个小软件，运行在nginx上，可以检测nginx之间有没有挂掉
* 对外暴露出一个虚拟ip即可

![image-20230519095138951](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305190951045.png)



* 安装keepalived

```sh
yum install keepalived
```

* 修改配置，删除多余配置

  * 第一台机器

  ![image-20230519100021352](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305191000417.png)

  * 第二台机器，优先级可以调低一点

    注意instance、virual_router_id、auth要对得上第一台机器

    ![image-20230519100225774](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305191002842.png)



* 启动服务

  ```sh
  systemctl start keepalived
  ```

* 测试

  第一台机器使用ip addr可以看到有`ip200`，宿主机使用`ping 192.168.44.200`，可以ping通，但是第一台机器挂掉后（即这台机器的keepalived进程挂了），ping 命令会超时一次，但很快第二台机器上有了ip200，请求又恢复了正常。这里看起来就是**ip200实现了漂移**

* 以后访问统一出口`ip200`即可

## 2.15 https证书配置

> 如何通俗易懂的给你讲明白HTTPS？傻子都能看懂~ 墙裂推荐看多次
>
> https://juejin.cn/post/6955767063524671524



* 第一次请求先下载公钥
* 整个过程私钥是保证绝对安全的
* 公钥加密的公钥是解不开的

![image-20230519104849875](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305191048951.png)

---

但这个过程还是存在问题：

* 第一次下载公钥时可能被拦截，返回了一个假公钥，然后之后的请求都是用假公钥，有对应的假私钥进行解密，数据就不安全了

---

P43---P50实战讲解买域名、买服务器、配置证书

* 网站https://oneinstack.com/  在Linux上组合安装软件

* 在Nginx上配置证书

![image-20230519161638489](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202305191616563.png)
