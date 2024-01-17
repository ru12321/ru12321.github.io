import{_ as i,W as r,X as t,Y as s,Z as a,$ as l,a0 as n,C as p}from"./framework-715d567f.js";const o={},c=n(`<p>Ctrl + L 清屏</p><h2 id="linux知识" tabindex="-1"><a class="header-anchor" href="#linux知识" aria-hidden="true">#</a> Linux知识</h2><h3 id="集群配置" tabindex="-1"><a class="header-anchor" href="#集群配置" aria-hidden="true">#</a> 集群配置</h3><p><strong>做完步骤1、2、3、4后，就可以克隆虚拟机102，103，在102,103上面修改1、2的ip和hostname即可</strong></p><h4 id="_1-配置ip和网卡" tabindex="-1"><a class="header-anchor" href="#_1-配置ip和网卡" aria-hidden="true">#</a> 1.配置ip和网卡</h4><p>vim /etc/sysconfig/network-scripts/ifcfg-ens33</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>TYPE=Ethernet                                                                                                       
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-配置主机名称" tabindex="-1"><a class="header-anchor" href="#_2-配置主机名称" aria-hidden="true">#</a> 2.配置主机名称</h4><p>vim /etc/hostname</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ruyb101
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-配置ip和host映射" tabindex="-1"><a class="header-anchor" href="#_3-配置ip和host映射" aria-hidden="true">#</a> 3.配置ip和host映射</h4><p>vim /etc/hosts</p><div class="language-ssh line-numbers-mode" data-ext="ssh"><pre class="language-ssh"><code>192.168.10.101 ruyb101
192.168.10.102 ruyb102
192.168.10.103 ruyb103
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-配置防火墙-重启" tabindex="-1"><a class="header-anchor" href="#_4-配置防火墙-重启" aria-hidden="true">#</a> 4.配置防火墙，重启</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#关闭防火墙</span>
systemctl stop firewalld
<span class="token comment">#关闭防火墙开机自启</span>
systemctl stop firewalld

<span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-安装vim-jdk" tabindex="-1"><a class="header-anchor" href="#_5-安装vim-jdk" aria-hidden="true">#</a> 5.安装vim，jdk</h4><p>安装epel-release，相当于一个软件仓库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> epel-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装net-tools：包含<code>ifconfig</code>等工具 命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> net-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装vim编辑器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">vim</span>

<span class="token function">vim</span> /etc/vimrc

<span class="token comment"># 文本后换行添加内容</span>
<span class="token string">&quot; 打开语法高亮。自动识别代码，使用多种颜色显示。
syntax on
&quot;</span>在底部显示，当前处于命令模式还是插入模式。
<span class="token builtin class-name">set</span> showmode
<span class="token string">&quot;显示行号
set number
&quot;</span>光标所在的当前行高亮。
<span class="token builtin class-name">set</span> cursorline 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看所安装的rmp安装包中含java的忽略大小写</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token function">java</span> 

<span class="token comment">#卸载</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装jdk，配置环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local

<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> jdk8u-.tar.gz

<span class="token comment"># 新建环境变量启动文件</span>
<span class="token function">vim</span> /etc/profile.d/my_env.sh

<span class="token comment">#文件添加内容</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/local/jdk1.8.0_271
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin

<span class="token comment">#重启环境</span>
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-集群分发脚本" tabindex="-1"><a class="header-anchor" href="#_6-集群分发脚本" aria-hidden="true">#</a> 6.集群分发脚本</h4><h5 id="scp传输-secure-copy-安全拷贝" tabindex="-1"><a class="header-anchor" href="#scp传输-secure-copy-安全拷贝" aria-hidden="true">#</a> scp传输（secure copy）安全拷贝</h5><p>实现服务器与服务器之间的数据拷贝</p><hr>`,30),d=s("p",null,[a("scp -r "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"p"),s("mi",null,"d"),s("mi",null,"i"),s("mi",null,"r"),s("mi",{mathvariant:"normal"},"/")]),s("annotation",{encoding:"application/x-tex"},"pdir/")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"p"),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord mathnormal"},"i"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"r"),s("span",{class:"mord"},"/")])])]),a("fname "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"u"),s("mi",null,"s"),s("mi",null,"e"),s("mi",null,"r"),s("mi",{mathvariant:"normal"},"@")]),s("annotation",{encoding:"application/x-tex"},"user@")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord mathnormal"},"u"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"ser"),s("span",{class:"mord"},"@")])])]),a("host:"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"p"),s("mi",null,"d"),s("mi",null,"i"),s("mi",null,"r"),s("mi",{mathvariant:"normal"},"/")]),s("annotation",{encoding:"application/x-tex"},"pdir/")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"p"),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord mathnormal"},"i"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"r"),s("span",{class:"mord"},"/")])])]),a("fname")],-1),u=n(`<p>命令 递归 要拷贝的文件路径/名称 目的地用户@主机:目的地路径/名称</p><hr><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#101上操作，给102拷贝文件，输入yes和密码</span>
<span class="token function">scp</span> <span class="token parameter variable">-r</span> /usr/local/jdk1.8.0_271/ root@ruyb102:/usr/local

<span class="token comment">#103上操作，从101拷贝文件：</span>
 <span class="token function">scp</span> <span class="token parameter variable">-r</span> root@ruyb101:/usr/local/jdk1.8.0_271/ ./
 
<span class="token comment">#102操作，从101拷贝文件到103</span>
<span class="token function">scp</span> <span class="token parameter variable">-r</span> root@ruyb101:/usr/local/jdk1.8.0_271/ root@ruyb103:/usr/local/jdktmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="rsync-远程同步工具" tabindex="-1"><a class="header-anchor" href="#rsync-远程同步工具" aria-hidden="true">#</a> rsync 远程同步工具</h5><p>rsync主要用于备份和镜像。具有速度快、避免复制相同内容和支持符号链接的优点。</p><p>rsync和scp区别：用rsync做文件的复制要比scp的速度快，<strong>rsync只对差异文件做更新。scp是把所有文件都复制过去</strong></p><hr>`,7),m=s("p",null,[a("rsync -av "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"p"),s("mi",null,"d"),s("mi",null,"i"),s("mi",null,"r"),s("mi",{mathvariant:"normal"},"/")]),s("annotation",{encoding:"application/x-tex"},"pdir/")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"p"),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord mathnormal"},"i"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"r"),s("span",{class:"mord"},"/")])])]),a("fname "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"u"),s("mi",null,"s"),s("mi",null,"e"),s("mi",null,"r"),s("mi",{mathvariant:"normal"},"@")]),s("annotation",{encoding:"application/x-tex"},"user@")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord mathnormal"},"u"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"ser"),s("span",{class:"mord"},"@")])])]),a("host:"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"p"),s("mi",null,"d"),s("mi",null,"i"),s("mi",null,"r"),s("mi",{mathvariant:"normal"},"/")]),s("annotation",{encoding:"application/x-tex"},"pdir/")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"p"),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord mathnormal"},"i"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"r"),s("span",{class:"mord"},"/")])])]),a("fname")],-1),v=n(`<p>命令 选项参数 要拷贝的文件路径/名称 目的地用户@主机:目的地路径/名称</p><p>-a：归档拷贝</p><p>-v：显示复制过程</p><h5 id="xsync集群分发脚本" tabindex="-1"><a class="header-anchor" href="#xsync集群分发脚本" aria-hidden="true">#</a> <mark>xsync集群分发脚本</mark></h5><p>作用：循环复制文件到所有节点的相同目录下，期望通过xsync脚本在任何路径可以使用</p><hr><p>写任何脚本都可以按这个步骤来做，<strong>直接写到环境变量下，随处调用</strong></p><hr><p>1.查看环境变量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo $PATH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.在环境变量某个bin目录下，推荐用户目录或者usr/local/bin下创建脚本文件xsync，编写脚本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/bin
<span class="token function">vim</span> xsync


<span class="token comment">#脚本文件内容</span>
<span class="token comment">#2. 遍历集群所有机器</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">host</span> <span class="token keyword">in</span> ruyb102 ruyb103
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>  <span class="token variable">$host</span>  <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
    <span class="token comment">#3. 遍历所有目录，挨个发送</span>

    <span class="token keyword">for</span> <span class="token for-or-select variable">file</span> <span class="token keyword">in</span> <span class="token variable">$@</span>
    <span class="token keyword">do</span>
        <span class="token comment">#4. 判断文件是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token variable">$file</span> <span class="token punctuation">]</span>
            <span class="token keyword">then</span>
                <span class="token comment">#5. 获取父目录</span>
                <span class="token assign-left variable">pdir</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">cd</span> <span class="token parameter variable">-P</span> <span class="token punctuation">$(</span>dirname $file<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>

                <span class="token comment">#6. 获取当前文件的名称</span>
                <span class="token assign-left variable">fname</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $file<span class="token variable">)</span></span>
                <span class="token function">ssh</span> <span class="token variable">$host</span> <span class="token string">&quot;mkdir -p <span class="token variable">$pdir</span>&quot;</span>
                <span class="token function">rsync</span> <span class="token parameter variable">-av</span> <span class="token variable">$pdir</span>/<span class="token variable">$fname</span> <span class="token variable">$host</span><span class="token builtin class-name">:</span><span class="token variable">$pdir</span>
            <span class="token keyword">else</span>
                <span class="token builtin class-name">echo</span> <span class="token variable">$file</span> does not exists<span class="token operator">!</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">done</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.让脚本具备执行权限</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x xsync
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4.环境编辑生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_7-ssh免密登录" tabindex="-1"><a class="header-anchor" href="#_7-ssh免密登录" aria-hidden="true">#</a> 7.ssh免密登录</h4><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202309110922766.png" alt="image-20230911092206689" loading="lazy"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入ssh命令目录</span>
<span class="token builtin class-name">cd</span> /root/.ssh

<span class="token comment">#生成公钥私钥</span>
ssh-keygen <span class="token parameter variable">-t</span> sra

<span class="token comment">#将公钥拷贝到要免密登录的目标机器上</span>
<span class="token comment">#这是在101机器上执行的命令，同理在102,103机器上也执行这三行命令</span>
ssh-copy-id ruyb101
ssh-copy-id ruyb102
ssh-copy-id ruyb103
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),k={href:"https://kafka.apachecn.org/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://kafka.apache.org/",target:"_blank",rel:"noopener noreferrer"},h=n(`<h2 id="kafka定义" tabindex="-1"><a class="header-anchor" href="#kafka定义" aria-hidden="true">#</a> kafka定义</h2><p>Kafka传统定义：Kafka是一个分布式的基于发布/订阅模式的消息队列（MessageQueue），主要应用于大数据实时处理领域。</p><p>发布/订阅：消息的发布者不会将消息直接发送给特定的订阅者，而是将发布的消息分为不同的类别，订阅者只接收感兴趣的消息。</p><p>Kafka 最新定义： Kafka 是一个开源的分布式事件流平台（ Event StreamingPlatform），被数千家公司用于高性能数据管道、流分析、数据集成和关键任务应用。</p><h2 id="消息队列的应用场景" tabindex="-1"><a class="header-anchor" href="#消息队列的应用场景" aria-hidden="true">#</a> <mark>消息队列的应用场景</mark></h2><p>消峰</p><p>解耦</p><p>异步通信</p><h2 id="基础架构" tabindex="-1"><a class="header-anchor" href="#基础架构" aria-hidden="true">#</a> 基础架构</h2><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202309071438347.png" alt="image-20230907143857269" loading="lazy"></p><h2 id="安装部署" tabindex="-1"><a class="header-anchor" href="#安装部署" aria-hidden="true">#</a> 安装部署</h2><p>解压tar包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> kafka_2.12-3.5.1.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> kafka/config/server.properties

<span class="token comment"># 修改broker.id，集群机器要唯一</span>
<span class="token assign-left variable">broker.id</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token comment">#修改日志目录</span>
<span class="token assign-left variable">log.dirs</span><span class="token operator">=</span>/usr/local/kafka/datas

<span class="token comment">#修改zk服务器地址</span>
<span class="token assign-left variable">zookeeper.connect</span><span class="token operator">=</span>ruyb101:2181,ruyb102:2181,ruyb103:2181/kafka 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/profile.d/my_env.sh 


<span class="token comment">#文件内容</span>
<span class="token comment">#KAFKA</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KAFKA_HOME</span><span class="token operator">=</span>/usr/local/kafka
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$KAFKA_HOME</span>/bin


<span class="token comment">#环境变量生效</span>
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过脚本启动zk集群</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>zk.sh start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,19),g={href:"http://zk.sh",target:"_blank",rel:"noopener noreferrer"},f={href:"http://zk.sh",target:"_blank",rel:"noopener noreferrer"},y=n(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
<span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> ruyb101 ruyb102 ruyb103
        <span class="token keyword">do</span>
                <span class="token builtin class-name">echo</span>  ------------- zookeeper <span class="token variable">$i</span> 启动 ------------
                <span class="token function">ssh</span> <span class="token variable">$i</span> <span class="token string">&quot;/usr/local/zookeeper/bin/zkServer.sh start&quot;</span>
        <span class="token keyword">done</span>
<span class="token punctuation">}</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;stop&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> ruyb101 ruyb102 ruyb103
        <span class="token keyword">do</span>
                <span class="token builtin class-name">echo</span>  ------------- zookeeper <span class="token variable">$i</span> 停止 ------------
                <span class="token function">ssh</span> <span class="token variable">$i</span> <span class="token string">&quot;/usr/local/zookeeper/bin/zkServer.sh stop&quot;</span>
        <span class="token keyword">done</span>
<span class="token punctuation">}</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;status&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> ruyb101 ruyb102 ruyb103
        <span class="token keyword">do</span>
                <span class="token builtin class-name">echo</span>  ------------- zookeeper <span class="token variable">$i</span> 状态 ------------
                <span class="token function">ssh</span> <span class="token variable">$i</span> <span class="token string">&quot;/usr/local/zookeeper/bin/zkServer.sh status&quot;</span>
        <span class="token keyword">done</span>
<span class="token punctuation">}</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过脚本查看zk状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>xcall jps


<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span> ruyb101 <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
<span class="token number">8018</span> QuorumPeerMain
<span class="token number">13399</span> Jps
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span> ruyb102 <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
<span class="token number">100457</span> Jps
<span class="token number">95117</span> QuorumPeerMain
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span> ruyb103 <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
<span class="token number">101395</span> Jps
<span class="token number">96078</span> QuorumPeerMain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>xcall脚本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash                                                                                                                                         </span>
<span class="token keyword">for</span> <span class="token for-or-select variable">host</span> <span class="token keyword">in</span> ruyb101 ruyb102 ruyb103
<span class="token keyword">do</span>
        <span class="token builtin class-name">echo</span> <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span> <span class="token variable">$host</span> <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
        <span class="token function">ssh</span> <span class="token variable">$host</span> jps
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kafka消息发送流程" tabindex="-1"><a class="header-anchor" href="#kafka消息发送流程" aria-hidden="true">#</a> kafka消息发送流程</h2><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202310160935927.png" alt="image-20231016093523861" loading="lazy"></p><h2 id="spring-cloud项目使用" tabindex="-1"><a class="header-anchor" href="#spring-cloud项目使用" aria-hidden="true">#</a> spring cloud项目使用</h2><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 代码中指定信道</span>

<span class="token comment"># 配置中指定kafka的主题、消费者组</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>   
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">flDocStandardNodePubMnr_flow_input</span><span class="token punctuation">:</span> <span class="token comment">#spring stream的信道名称</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> task <span class="token comment"># 对应kafka架构的topic--主题名</span>
          <span class="token key atrule">binder</span><span class="token punctuation">:</span> kafka<span class="token punctuation">-</span>ext <span class="token comment"># kafka作为spring cloud stream的binder的固定写法</span>
          <span class="token key atrule">group</span><span class="token punctuation">:</span> estate_fl_doc_standard_flow_style <span class="token comment"># 对应kafka架构的consumer group--消费者组名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="spring-cloud-stream-binding" tabindex="-1"><a class="header-anchor" href="#spring-cloud-stream-binding" aria-hidden="true">#</a> spring cloud stream binding</h3><ul><li><p>作用：连接spring应用和中间件的<strong>连接+转换器</strong></p></li><li><p>output binding：中间件生产者使用，将sprng数据<strong>转换</strong>为中间件数据</p></li><li><p>intput binding：中间件消费者使用，将中间件数据<strong>转换</strong>为的spring数据</p></li></ul><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202309261031360.png" alt="image-20230926103151250" loading="lazy"></p><h3 id="kafka生产者" tabindex="-1"><a class="header-anchor" href="#kafka生产者" aria-hidden="true">#</a> kafka生产者</h3><h3 id="kafka消费者" tabindex="-1"><a class="header-anchor" href="#kafka消费者" aria-hidden="true">#</a> kafka消费者</h3><h2 id="文末" tabindex="-1"><a class="header-anchor" href="#文末" aria-hidden="true">#</a> 文末.....</h2>`,16);function x(_,w){const e=p("ExternalLinkIcon");return r(),t("div",null,[c,d,u,m,v,s("p",null,[a("中文官网"),s("a",k,[a("https://kafka.apachecn.org/"),l(e)])]),s("p",null,[a("官网"),s("a",b,[a("https://kafka.apache.org/"),l(e)])]),h,s("p",null,[s("a",g,[a("zk.sh"),l(e)]),a("，写在环境变量目录/usr/local/bin下，chmod +x "),s("a",f,[a("zk.sh"),l(e)]),a("，source zk.sh即可")]),y])}const $=i(o,[["render",x],["__file","kafka.html.vue"]]);export{$ as default};
