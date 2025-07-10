---
icon: iconfont icon-ruyb-wangluozhuabao
title: charles
date: 2025-07-09
category: 办公
index: true
comment: true
---

https://www.cnblogs.com/yttbk/p/8609720.html

## kpl项目

服务器

```shell
#一、字体相关
https://www.cnblogs.com/somebottle/p/18564830/matplotlib_with_cjk_chars
```

项目运行

```shell
docker build -t kpl_service:1.6 .

docker run -e TOKEN=f6eb3aa1eb6c30822c734be72f274f5f -d -p 5000:5000 kpl_service:1.6

http://1.92.151.97:5000/
```

服务器主要操作截图

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742095645427-78acce63-b113-4970-8681-4f673e636f20.png)

## Charles

**下载安装及破解方法：**

1.下载charles并安装
云盘下载地址：[Windows 64bit 32bit](https://pan.baidu.com/s/1Pub5dVrNVRr6tW1-nuyeUA)

2.安装后先打开Charles一次（Windows版可以忽略此步骤）

3.下载破解文件 charles.jar
网盘下载地址：[charles.jar](https://pan.baidu.com/s/1Pub5dVrNVRr6tW1-nuyeUA)

4.替换掉原文件夹里的charles.jar
Windows替换路径: C:\Program Files\Charles\lib\charles.jar
Mac替换路径: /Applications/Charles.app/Contents/Java/charles.jar

**二、配置电脑**

2.1 在电脑上，我们首先需要安装证书，点击help，如图：
![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954334-17b1c552-bc1d-48e7-bb54-2ed8cc8971ac.png)

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954360-18e38257-ea8d-424b-afcf-daba854872d7.png)

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954350-3b97ef7a-9141-4a47-b395-25769fb3b445.png)

2.2 设置HTTPS端口

菜单栏 Proxy -> SSL Proxying Settings 打开 SSL Proxying Settings配置面板，

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954468-1387851b-3cfa-40a4-9806-f2971213cd30.png)

因为HTTPS是走的 443端口，所以这里设置一个443端口，*代表匹配所有，意思为：代理所有域名的443端口

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954407-26806e94-f6bc-4eee-a235-c891abcd2342.png)

点击 “OK”保存即可

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954853-2cd13714-70ec-4b1a-88a8-7f38cca0af73.png)

配置好这两步骤，就能抓到 https 请求了

**三、移动设备配置**

在移动设备上安装证书，首先点击proxy—>proxy settings...端口修改为8888，如下图所示：

手机端配置的端口要和电脑的一样！1

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954872-5ccfbceb-5623-48d2-93aa-e47e50150c12.png)

然后我们查看ip地址，这样在手机上才可以添加ip地址和端口号.点击help——local ip addresses，如下图所示：

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954919-3fe94516-32b3-49c1-86b1-d09834703af5.png)

点击手机连接的WIFI，设置手动http代理，设置完成后要检查是否正确

以上设置完成后，就可以捕捉到手机请求啦，连接成功后 打开你要测试的APP，进行刷新动作，然后Charles会弹出确认提示框，这时候选择‘Allow’即可，如下图所示：

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085954941-af9d7ee5-9ce6-4501-8d3e-739813fefc29.png)

## 安装移动设备的证书

这个时候虽然可以抓包了，但是https的还抓取不到，因为上面我们安装的证书是电脑本地的证书，接下来我们安装移动设备的证书。

首先点击help——SSL proxying ——，如下图所示：

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085955101-e74b00da-255f-4a55-930e-97106d0f88c4.png)

打开手机浏览器，用手机浏览器输入chls.pro/ssl 或下方网址安装证书，如下图所示：

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085955299-9e0e8dd5-1cc2-4be6-8351-a3f017703123.png)

接下来弹出证书安装提示：页面和提示为英文是因为当前设备设置的语言为英文，如下图所示：

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085955373-cf7368cf-bd3d-4264-a9ed-1166f6018e5a.png)

选择‘确认’后进行安装 点击‘下载’ ，如下图所示：

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085955385-e277a432-2fc3-429f-bbcc-7a58c012477f.png)

此时已经安装成功，还差最后一步，信任该证书，点击设置——通用——关于——拉到底部——勾选信任该证书

最后一步，启动HTTPS捕捉 点击proxy——SSL proxying settings——设置通配符 * *，如下图所示：

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085955614-c3454e30-d88a-4af3-8825-c579a8da9e27.png)

通过以上配置，此时手机和电脑设置完毕，我们可以截取https的网络封包。

**四、使用****charles进行****抓包**

1.看发出的请求

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085955703-91295754-951c-41e8-a2c1-29ab59d87362.png)

2.定位问题
server端的问题
客户端的问题
3.能帮咱们模拟一下服务端返回的异常情况
4.拦截请求并修改请求及返回值，通过设置断点来拦截，下面以598同城为例
4.1 左侧选中bj.58.com，右侧点击response--HTML查看返回结果

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085955710-f93f9309-5ef2-47d9-a350-002fc8ac8c97.png)

4.2将bj.58.com设置为断点，右键“bj.58.com”--“breakpoints”，然后点击垃圾桶，清空请求列表

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085955868-bf7bea4d-b1ad-4ab6-b692-f6e369b78755.png)

4.3刷新58首页，修改请求

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085956059-d1dffcac-48ee-4bb0-b9b3-9766ae371204.png)

4.4修改完后点击“Execute”，这时可修改返回值

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085956044-5555e82a-9acb-4a54-93fc-90d31154c59a.png)

![img](../../%E5%9B%BE%E7%89%87%E5%AD%98%E5%82%A8/1742085956271-d9b59a87-e259-48bf-af3b-b68fc01a1b66.png)
