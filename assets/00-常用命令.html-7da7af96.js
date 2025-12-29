import{_ as l,W as t,X as c,Y as n,Z as e,$ as i,a0 as s,C as p}from"./framework-715d567f.js";const r={},o=s(`<h2 id="k8s" tabindex="-1"><a class="header-anchor" href="#k8s" aria-hidden="true">#</a> k8s</h2><h3 id="资源" tabindex="-1"><a class="header-anchor" href="#资源" aria-hidden="true">#</a> 资源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl cluster-info  <span class="token comment"># 显示集群端点和服务信息</span>
kubectl get nodes <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>ns<span class="token operator">&gt;</span> <span class="token comment"># 查看节点列表</span>

kubectl get pods <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>ns<span class="token operator">&gt;</span><span class="token comment"># 查看Pod列表</span>
kubectl get svc <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>ns<span class="token operator">&gt;</span><span class="token comment"># 查看Service列表</span>
kubectl get deployments <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>ns<span class="token operator">&gt;</span> <span class="token comment"># 查看Deployment列表</span>
kubectl get ingress <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>ns<span class="token operator">&gt;</span> <span class="token comment"># 查看Ingress列表</span>
kubectl get ep <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>ns<span class="token operator">&gt;</span> <span class="token comment"># 查看Endpoint列表</span>
kubectl get pv,pvc <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>ns<span class="token operator">&gt;</span> <span class="token comment"># 查看持久卷和持久卷声明</span>

kubectl describe pod <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>  <span class="token comment"># 查看Pod详细信息</span>
kubectl describe <span class="token function">node</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>  <span class="token comment"># 查看节点详细信息</span>
kubectl describe endpoints <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>  <span class="token comment"># 查看EP详细信息</span>

<span class="token comment"># 创建资源</span>
kubectl apply <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>yaml_file<span class="token operator">&gt;</span>  <span class="token comment"># 通过YAML文件创建/更新资源</span>
kubectl create deployment <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token parameter variable">--image</span><span class="token operator">=</span><span class="token operator">&lt;</span>image<span class="token operator">&gt;</span>  <span class="token comment"># 创建Deployment</span>
kubectl expose deployment <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort  <span class="token comment"># 创建Service</span>

<span class="token comment"># 删除资源</span>
kubectl delete <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>yaml_file<span class="token operator">&gt;</span>  <span class="token comment"># 删除YAML定义的资源</span>
kubectl delete pod,svc <span class="token operator">&lt;</span>name1,name<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>  <span class="token comment"># 删除Pod和Service</span>
kubectl delete deployment <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>  <span class="token comment"># 删除Deployment</span>

<span class="token comment"># 合并秘钥</span>
<span class="token function">cat</span> xxx_public.crt xxx_chain.crt <span class="token operator">&gt;</span> xxx.crt
<span class="token comment"># 创建秘钥</span>
kb create secret tls xxx-tls-ingress-secret <span class="token parameter variable">--cert</span><span class="token operator">=</span>xxx.crt <span class="token parameter variable">--key</span><span class="token operator">=</span>xxx.key
<span class="token comment"># 查看秘钥</span>
kb get secret xxx-tls-ingress-secret <span class="token parameter variable">-o</span> yaml

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调试" tabindex="-1"><a class="header-anchor" href="#调试" aria-hidden="true">#</a> 调试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl logs <span class="token operator">&lt;</span>pod_name<span class="token operator">&gt;</span>  <span class="token comment"># 查看Pod日志</span>
kubectl logs <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>pod_name<span class="token operator">&gt;</span>  <span class="token comment"># 实时跟踪日志</span>

kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token operator">&lt;</span>pod_name<span class="token operator">&gt;</span> -- <span class="token function">sh</span>  <span class="token comment"># 进入Pod容器</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token operator">&lt;</span>pod_name<span class="token operator">&gt;</span> -- <span class="token function">cat</span> /etc/hosts  <span class="token comment"># 执行容器内命令</span>


<span class="token comment">#测试容器是否能连通coral-mysql、coral-redis</span>
kb <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> config-6ddc78c679-d6r2x -- <span class="token function">nc</span> <span class="token parameter variable">-zv</span> coral-mysql <span class="token number">3306</span>
kb <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> config-6ddc78c679-d6r2x -- <span class="token function">nc</span> <span class="token parameter variable">-zv</span> coral-redis <span class="token number">6379</span>

<span class="token comment"># DNS解析</span>
kb <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> config-6ddc78c679-d6r2x -- <span class="token function">nslookup</span> coral-ck
<span class="token comment"># 网络是否通 </span>
kb <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> config-6ddc78c679-d6r2x -- <span class="token function">nc</span> <span class="token parameter variable">-zv</span> coral-ck <span class="token number">8123</span>
<span class="token comment"># EP的状态</span>
kb describe ep coral-ck

<span class="token comment"># 验证端口是否通</span>
<span class="token function">nc</span> <span class="token parameter variable">-zv</span> 目标域名 <span class="token number">3306</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="helm" tabindex="-1"><a class="header-anchor" href="#helm" aria-hidden="true">#</a> helm</h2><h3 id="资源-1" tabindex="-1"><a class="header-anchor" href="#资源-1" aria-hidden="true">#</a> 资源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># config</span>
hl upgrade config <span class="token parameter variable">--set</span> <span class="token assign-left variable">deploy.image.tag</span><span class="token operator">=</span>v1.3.7_lch /data/estate-field-lch-deploy/estate-chart <span class="token parameter variable">-f</span> /data/estate-field-lch-deploy/service/platform/coral-config-service.yaml <span class="token parameter variable">--install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调试-1" tabindex="-1"><a class="header-anchor" href="#调试-1" aria-hidden="true">#</a> 调试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#验证chart是否遵循最佳实践的首选工具。</span>
helm lint 

<span class="token comment"># 在本地测试渲染chart模板。</span>
helm template <span class="token parameter variable">--debug</span> 

<span class="token comment"># 我们已经看到过这个技巧了，这是让服务器渲染模板的好方法，然后返回生成的清单文件。</span>
helm <span class="token function">install</span> --dry-run <span class="token parameter variable">--debug</span>

<span class="token comment"># 这是查看安装在服务器上的模板的好方法。</span>
helm get manifest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="探活设置" tabindex="-1"><a class="header-anchor" href="#探活设置" aria-hidden="true">#</a> 探活设置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">serports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8301</span>
      <span class="token key atrule">targetport</span><span class="token punctuation">:</span> <span class="token number">8301</span>

<span class="token comment">#健康检查</span>
<span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">check</span><span class="token punctuation">:</span>
    <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&quot;/actuator/health&quot;</span>
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8301</span>
    <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
    <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">3</span>
    <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">60</span>
    <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>
    <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">8</span>

<span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">check</span><span class="token punctuation">:</span>
    <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&quot;/actuator/health&quot;</span>
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8301</span>
    <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
    <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">3</span>
    <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">60</span>
    <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>
    <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>
探针配置详解
就绪探针（readinessProbe）
就绪探针用于判断容器是否已经准备好接收外部请求。当探测成功时，Kubernetes 才会将流量转发给该容器所在的 Pod。
enabled: true：启用就绪探针功能。
httpGet：通过 HTTP 请求进行探测。
path: &quot;/actuator/health&quot;：探测路径，Spring Boot 应用通常会暴露 /actuator/health 端点用于健康检查。
port: 8301：容器内服务监听的端口。
periodSeconds: 30：每 30 秒执行一次探测。
timeoutSeconds: 3：探测请求超时时间为 3 秒。
initialDelaySeconds: 60：容器启动后 60 秒才开始执行第一次探测，避免在应用启动过程中误判。
successThreshold: 1：连续 1 次探测成功即认为容器就绪。
failureThreshold: 8：连续 8 次探测失败才认为容器未就绪。

存活探针（livenessProbe）
存活探针用于判断容器是否仍在正常运行。如果探测失败，Kubernetes 会重启容器。
enabled: true：启用存活探针功能。
httpGet：通过 HTTP 请求进行探测。
path: &quot;/actuator/health&quot;：探测路径，与就绪探针相同。
port: 8301：容器内服务监听的端口。
periodSeconds: 30：每 30 秒执行一次探测。
timeoutSeconds: 3：探测请求超时时间为 3 秒。
initialDelaySeconds: 60：容器启动后 60 秒才开始执行第一次探测。
successThreshold: 1：连续 1 次探测成功即认为容器存活。
failureThreshold: 8：连续 8 次探测失败才认为容器需要重启。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> redis</h2><p>验证连通性</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> epel-release
<span class="token function">sudo</span> yum <span class="token function">install</span> redis
redis-cli <span class="token parameter variable">-h</span> xxx <span class="token parameter variable">-p</span> <span class="token number">6379</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;password&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rabbitmq" tabindex="-1"><a class="header-anchor" href="#rabbitmq" aria-hidden="true">#</a> rabbitmq</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 验证服务状态</span>
systemctl status rabbitmq-server

<span class="token comment"># 停止服务</span>
systemctl stop rabbitmq-server

<span class="token comment"># 启动服务</span>
systemctl start rabbitmq-server

<span class="token comment"># 查看日志</span>
journalctl <span class="token parameter variable">-u</span> rabbitmq-server <span class="token parameter variable">-n</span> <span class="token number">50</span> --no-pager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jdk" tabindex="-1"><a class="header-anchor" href="#jdk" aria-hidden="true">#</a> jdk</h2><h3 id="jstat命令-通常做优化使用" tabindex="-1"><a class="header-anchor" href="#jstat命令-通常做优化使用" aria-hidden="true">#</a> jstat命令--通常做优化使用</h3><p><code>jstat</code>查看jvm里面Eden区、S区、老年代的内存情况，以及YGC和FGC的执行次数和耗时</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>S0C、S1C、S0U、S1U：Survivor 0/1区容量（Capacity）和使用量（Used） 
EC、EU：Eden区容量和使用量 ，单位KB
OC、OU：年老代容量和使用量 ，单位KB
MC、MU：永久代容量和使用量 ，单位KB
YGC：年轻代垃圾回收次数
YGCT：年轻代垃圾回收消耗时间,单位是秒
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间,单位是秒
GCT：垃圾回收消耗总时间,单位是秒
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 每1秒输出一次，共输出10次</span>
<span class="token comment"># 注意对准每一列，显示结果可能会错列</span>
jstat <span class="token parameter variable">-gc</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span> 1s <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb202507121059740.png" alt="image-20250606141616751" loading="lazy"></p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>分析结果
1.Young GC的触发频率和每次耗时：总共执行了478次年轻代回收，总共耗时13.675秒
2.Full GC的触发时机和耗时：总共执行了5次老年代回收，总共耗时1.908秒
3.新生代对象增长速率：EU这一列观察，10秒增加了895-726=169M空间，
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#检查 Nginx 服务的状态</span>
systemctl status nginx

<span class="token comment">#重启命令</span>
systemctl restart nginx

<span class="token comment">#重新加载配置文件</span>
systemctl reload nginx

<span class="token comment"># 重启Nginx</span>
sbin/nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>proxy_pass配置加不加斜杠</p><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb202507121059958.png" alt="image-20250704133855370" loading="lazy"></p><h2 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> linux</h2><h3 id="便捷" tabindex="-1"><a class="header-anchor" href="#便捷" aria-hidden="true">#</a> 便捷</h3><p>1.配置命令行的自动补全及快捷命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编辑 bash 的配置文件（具体编辑内容见下方描述）</span>
<span class="token function">vim</span> ~/.bashrc
<span class="token comment"># 使配置文件生效</span>
<span class="token builtin class-name">source</span> .bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># kubectl 快捷命令</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">kb</span><span class="token operator">=</span><span class="token string">&#39;kubectl --namespace=gt-gc&#39;</span>
<span class="token comment"># kubectl 自动补全</span>
<span class="token builtin class-name">source</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span>kubectl completion <span class="token function">bash</span><span class="token punctuation">)</span>

<span class="token comment"># helm 快捷命令</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">hl</span><span class="token operator">=</span><span class="token string">&#39;helm --namespace=gt-gc&#39;</span>
<span class="token comment"># helm 自动补全</span>
<span class="token builtin class-name">source</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span>helm completion <span class="token function">bash</span><span class="token punctuation">)</span>

<span class="token comment">#解决 CentOS 7 仓库失效问题</span>
<span class="token comment"># 下载阿里云的CentOS 7仓库配置</span>
<span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
<span class="token comment"># 清理yum缓存</span>
yum clean all
<span class="token comment"># 重建缓存（获取新仓库信息）</span>
yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="资源-2" tabindex="-1"><a class="header-anchor" href="#资源-2" aria-hidden="true">#</a> 资源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看 CPU 核心数</span>
nproc

<span class="token comment">#查看磁盘及分区，type是disk的就是物理磁盘</span>
lsblk

<span class="token comment"># 查看内存</span>
<span class="token function">free</span> <span class="token parameter variable">-h</span>

<span class="token comment"># 查看当前目录内存占用</span>
<span class="token function">du</span> <span class="token parameter variable">-sh</span> ./*
<span class="token comment"># 查看root目录内存占用</span>
<span class="token function">du</span> <span class="token parameter variable">-sh</span> /root/*

<span class="token comment"># 检查 swap</span>
<span class="token function">swapon</span> <span class="token parameter variable">--show</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="挂载" tabindex="-1"><a class="header-anchor" href="#挂载" aria-hidden="true">#</a> 挂载</h3><p>以下是在 Linux 系统中挂载新磁盘分区的步骤（以 Ubuntu/Debian 为例，其他发行版类似）：</p><blockquote><p>步骤 1：检查新磁盘</p></blockquote><p>首先确认新磁盘是否被系统识别，使用以下命令列出所有磁盘：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>lsblk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出类似：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0   500G  0 disk 
└─sda1   8:1    0   500G  0 part /
sdb      8:16   0   1.5T  0 disk  # 假设这是新磁盘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>步骤 2：创建分区（如果需要）</p></blockquote><p>如果新磁盘未分区，使用fdisk或parted创建分区（以sdb为例）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo fdisk /dev/sdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在交互界面中：</p><ul><li><p>输入n创建新分区；</p></li><li><p>选择分区类型（默认主分区p）；</p></li><li><p>按默认值设置分区大小（或自定义）；</p></li><li><p>输入w保存退出。</p></li></ul><p>完成后，新分区会显示为sdb1（或其他编号）。</p><blockquote><p>步骤 3：格式化分区</p></blockquote><p>将新分区格式化为ext4文件系统（常用且稳定）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo mkfs.ext4 /dev/sdb1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>注意：格式化会清除分区所有数据，确保磁盘为空或已备份数据。</p></blockquote><blockquote><p>步骤 4：临时挂载分区（测试用）</p></blockquote><p>将新分区临时挂载到/data/minio：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo mount /dev/sdb1 /data/minio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证挂载是否成功：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>df -h | grep /data/minio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出应显示/dev/sdb1挂载到/data/minio。</p><blockquote><p>步骤 5：永久挂载（开机自动挂载）</p></blockquote><p>为了避免重启后挂载失效，需要配置/etc/fstab文件：</p><ol><li>先获取新分区的 UUID（唯一标识符）：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo blkid /dev/sdb1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出类似：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/dev/sdb1: UUID=&quot;12345678-1234-5678-1234-567812345678&quot; TYPE=&quot;ext4&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>编辑/etc/fstab：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo nano /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>在文件末尾添加一行（替换为实际 UUID）：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UUID=12345678-1234-5678-1234-567812345678 /data/minio ext4 defaults 0 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><ul><li>defaults：默认挂载选项（包括读写权限）；</li></ul></li><li><ul><li>最后两个数字0 2：表示不备份该分区，且在系统启动时检查磁盘。</li></ul></li></ul><blockquote><p>步骤 6：验证永久挂载配置</p></blockquote><p>重新加载fstab配置并检查是否生效：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo mount -a  # 重新挂载所有fstab中的分区
df -h | grep /data/minio  # 确认挂载成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="网络" tabindex="-1"><a class="header-anchor" href="#网络" aria-hidden="true">#</a> 网络</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看公网ip</span>
<span class="token function">curl</span> ifconfig.me

<span class="token comment"># 查看已经开放的端口</span>
firewall-cmd --list-ports 

<span class="token comment"># 启动防火墙</span>
systemctl start firewalld

<span class="token comment">#重启firewall</span>
firewall-cmd <span class="token parameter variable">--reload</span> 

<span class="token comment">#停止firewall</span>
systemctl stop firewalld.service 

<span class="token comment">#禁止firewall开机启动</span>
systemctl disable firewalld.service 

<span class="token comment"># 开启端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">7099</span>/tcp --add-port<span class="token operator">=</span><span class="token number">7091</span>/tcp --add-port<span class="token operator">=</span><span class="token number">7094</span>/tcp --add-port<span class="token operator">=</span><span class="token number">7090</span>/tcp --add-port<span class="token operator">=</span><span class="token number">7036</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">9109</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">83</span>/tcp <span class="token parameter variable">--permanent</span>  --add-port<span class="token operator">=</span><span class="token number">82</span>/tcp <span class="token parameter variable">--permanent</span> --add-port<span class="token operator">=</span><span class="token number">84</span>/tcp <span class="token parameter variable">--permanent</span>

firewall-cmd --remove-port<span class="token operator">=</span><span class="token number">82</span>/tcp  --remove-port<span class="token operator">=</span><span class="token number">83</span>/tcp --remove-port<span class="token operator">=</span><span class="token number">84</span>/tcp

<span class="token comment"># IP层 ping，检查源机器与目标机器之间的网络连接在 IP 层是可达的</span>
<span class="token comment"># 1.如果能正常收到应答，说明网络层连通性基本没问题，但还需进一步排查上层应用的情况。 </span>
<span class="token comment"># 2.如果收不到应答，比如目标机器防火墙屏蔽了 ICMP 报文、网络设备故障、IP 地址配置错误等。</span>
<span class="token function">ping</span> <span class="token number">192.168</span>.1.100

<span class="token comment">#查看目标服务器上对应服务是否正常启动</span>
telnet <span class="token function">ip</span> 端口
<span class="token function">nc</span> <span class="token parameter variable">-zv</span> <span class="token function">ip</span> 端口

<span class="token comment">#确认服务是否监听了该端口 2181，5672，9092，9200，12345，8123</span>
<span class="token function">netstat</span> <span class="token parameter variable">-tulnp</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">12345</span>

<span class="token function">netstat</span> <span class="token parameter variable">-tulpn</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;:2181|:5672|:9092|:9200|:12345|:8123&quot;</span>

<span class="token comment"># 应用层 curl ，在确认网络层连通性基本没问题（如通过 ping 测试）之后，用于进一步排查目标服务功能是否可访问，以及判断服务是否存在问题（如是否未正确部署、配置错误、业务逻辑错误等）</span>
<span class="token function">curl</span> <span class="token parameter variable">-I</span> http://192.168.1.100:8080

<span class="token comment">#查看ip地址</span>
<span class="token function">ifconfig</span>
<span class="token function">ip</span> addr

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定时" tabindex="-1"><a class="header-anchor" href="#定时" aria-hidden="true">#</a> 定时</h3>`,76),d={href:"https://cron.ciding.cc/",target:"_blank",rel:"noopener noreferrer"},u=s(`<p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb202507121059453.png" alt="null" loading="lazy"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-l</span> <span class="token comment">#查看定时任务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="文件" tabindex="-1"><a class="header-anchor" href="#文件" aria-hidden="true">#</a> 文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看文件，按q退出，f向下翻，b向上翻，G跳到末尾,g跳到开头,/关键字搜索，n向下搜，N向上搜</span>
<span class="token function">less</span> <span class="token operator">&lt;</span>文件名<span class="token operator">&gt;</span>
<span class="token parameter variable">-N</span> 显示行号
<span class="token parameter variable">-p</span> 定位到关键字


<span class="token comment"># 查找指定目录下包含3306的文件，显示文件目录和行数</span>
<span class="token function">grep</span> <span class="token parameter variable">-rn</span> <span class="token string">&quot;3306&quot;</span> /data/conf/

<span class="token comment"># 执行history命令，!后跟着history命令的编号</span>
<span class="token function">history</span>
<span class="token operator">!</span>编号
<span class="token comment"># 查看前后history第x行前后多少行的命令</span>

<span class="token comment"># tree命令查看文件层级</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> tree
tree

<span class="token comment">#查看机器时间</span>
<span class="token function">date</span>

<span class="token comment">#校准服务器时间</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> ntp
<span class="token function">sudo</span> systemctl start ntpd

<span class="token comment">#清空文件内容</span>
命令行模式输入
<span class="token number">1</span>,<span class="token variable">$d</span>

<span class="token comment">#从/目录 查找 &quot;linux&quot;文件</span>
<span class="token function">find</span> / <span class="token parameter variable">-name</span> linux

<span class="token comment"># sed，流编辑器，能够对文本进行替换、删除、插入等操作;格式为 s/原字符串/替换字符串/修饰符</span>
<span class="token comment"># 把 server.conf 文件里全部的 aaa 替换成 xxxx.estate-pc.svc.cluster.local</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/aaa/xxxx.estate-pc.svc.cluster.local/g&#39;</span> server.conf

<span class="token comment">#解压.zip文件</span>
<span class="token function">unzip</span>  ***.zip
<span class="token comment"># 压缩</span>
<span class="token function">zip</span> <span class="token parameter variable">-r</span> 压缩包名称.zip 要压缩的目录

<span class="token comment">#查找出包含error字符串的日志行 </span>
zgrep <span class="token string">&#39;error&#39;</span> your_log_file.log.gz

zgrep <span class="token parameter variable">-B</span> <span class="token number">50</span> <span class="token parameter variable">-A</span> <span class="token number">50</span> <span class="token string">&#39;2025-09-01 00:00:16.667&#39;</span> your_log_file.log.gz

<span class="token comment"># 解压日志、搜索包含关键字代码、再搜索时间范围内前后50行日志</span>
gunzip spring.log.2024-11-29.0.gz
<span class="token function">grep</span> <span class="token string">&quot;审批通过结束，开始更新订单流程状态&quot;</span> spring.log.2024-11-29.*
<span class="token function">grep</span> <span class="token parameter variable">-B</span> <span class="token number">50</span> <span class="token parameter variable">-A</span> <span class="token number">50</span> <span class="token string">&quot;2025-12-18 11:16:04.732&quot;</span> spring.log.2024-11-29.0

<span class="token comment">#解压压缩包</span>
<span class="token function">tar</span> zxvf xxx.tar.gz

<span class="token comment">#查看内存/监控服务器内存资源利用情况</span>
<span class="token function">free</span> <span class="token parameter variable">-h</span>

<span class="token comment">#排查因磁盘空间不足导致的应用程序故障等场景</span>
<span class="token comment"># 快速了解各文件系统的总容量、已用空间、可用空间及挂载点等信息</span>
<span class="token function">df</span> <span class="token parameter variable">-h</span>
<span class="token function">du</span> <span class="token parameter variable">-h</span> /data/logs/* <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-hr</span>

<span class="token comment"># disk usage 磁盘使用情况 -summarize  -human-readable</span>
<span class="token comment"># 会以人类可读的格式输出当前目录总共占用的磁盘空间大小</span>
<span class="token function">du</span> <span class="token parameter variable">-sh</span>

<span class="token comment">#仅显示当前目录下所有子目录本身的信息，而不展示子目录内文件的信息</span>
ll <span class="token parameter variable">-d</span> */

<span class="token comment"># 按照文件大小 从小到大，按可读方式排列</span>
ll <span class="token parameter variable">-hSr</span>

<span class="token comment">#vi命令跳到最后一行</span>
输入:$ 按Enter

<span class="token comment">#创建一个50MB的文件</span>
<span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">of</span><span class="token operator">=</span>a.log <span class="token assign-left variable">bs</span><span class="token operator">=</span>1M <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">50</span>

<span class="token comment">#定时任务</span>
<span class="token function">crontab</span> <span class="token parameter variable">-e</span>

<span class="token comment">#定时任务：清空目录/data/logs中，以.log结尾的大于700M的文件</span>
<span class="token number">0</span> <span class="token number">4</span> * * * /usr/bin/find /data/logs <span class="token parameter variable">-name</span> <span class="token string">&quot;*.log&quot;</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-size</span> +700M <span class="token parameter variable">-exec</span> /usr/bin/truncate <span class="token parameter variable">-s</span> <span class="token number">0</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="进程" tabindex="-1"><a class="header-anchor" href="#进程" aria-hidden="true">#</a> 进程</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#关机</span>
init <span class="token number">0</span>

<span class="token comment">#查看8080端口上的进程活动，可以看到进程pid</span>
<span class="token function">netstat</span> <span class="token parameter variable">-tulnp</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">8080</span>

<span class="token comment">#根据名字找进程：过滤出nginx进程、pid号对应的进程</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> pid号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-1" tabindex="-1"><a class="header-anchor" href="#nginx-1" aria-hidden="true">#</a> nginx</h2><h3 id="linux查看nginx启动路径" tabindex="-1"><a class="header-anchor" href="#linux查看nginx启动路径" aria-hidden="true">#</a> linux查看nginx启动路径</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.查找nginx的pid
<span class="token punctuation">[</span>root@wskh xpe<span class="token punctuation">]</span><span class="token comment"># netstat -anop | grep 0.0.0.0:80</span>
tcp        <span class="token number">0</span>      <span class="token number">0</span> <span class="token number">0.0</span>.0.0:80              <span class="token number">0.0</span>.0.0:*               LISTEN      <span class="token number">2320</span>/nginx: master   off <span class="token punctuation">(</span><span class="token number">0.00</span>/0/0<span class="token punctuation">)</span>

<span class="token number">2</span>.查找指定pid正在运行服务的启动路径
<span class="token punctuation">[</span>root@wskh xpe<span class="token punctuation">]</span><span class="token comment"># ll /proc/2320/exe</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">11</span>月 <span class="token number">16</span> <span class="token number">11</span>:29 /proc/2320/exe -<span class="token operator">&gt;</span> /usr/local/nginx/sbin/nginx

<span class="token number">3</span>.查找nginx启动使用的配置文件
<span class="token punctuation">[</span>root@wskh xpe<span class="token punctuation">]</span><span class="token comment"># /usr/local/nginx/sbin/nginx -t</span>
nginx: the configuration <span class="token function">file</span> /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration <span class="token function">file</span> /usr/local/nginx/conf/nginx.conf <span class="token builtin class-name">test</span> is successful
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2><h3 id="启动、登录、内存占用" tabindex="-1"><a class="header-anchor" href="#启动、登录、内存占用" aria-hidden="true">#</a> 启动、登录、内存占用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动</span>
<span class="token function">service</span> <span class="token function">docker</span> start
systemctl start <span class="token function">docker</span>

<span class="token comment">#登录镜像仓库</span>
<span class="token function">docker</span> login <span class="token parameter variable">-u</span> name <span class="token parameter variable">-p</span> password xxxx.aliyuncs.com

<span class="token comment">#查看信息</span>
<span class="token function">docker</span> info
<span class="token function">docker</span> <span class="token parameter variable">-v</span>

<span class="token comment">#查看容器内存占用</span>
<span class="token function">docker</span> stats

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="镜像" tabindex="-1"><a class="header-anchor" href="#镜像" aria-hidden="true">#</a> 镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 制作镜像，注意最后的.代表Dockerfile上下文	</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> 新镜像名字:TAG <span class="token builtin class-name">.</span>

<span class="token comment">#根据仓库名列出部分镜像</span>
<span class="token function">docker</span> image <span class="token function">ls</span> tomcat 

<span class="token comment">#查看本地所有镜像的所有镜像id</span>
<span class="token function">docker</span> images <span class="token parameter variable">-q</span>

<span class="token comment">#导入镜像</span>
<span class="token function">docker</span> load <span class="token parameter variable">-i</span> nginx.tar
<span class="token comment">#导出镜像</span>
<span class="token function">docker</span> save 镜像名:Tag <span class="token parameter variable">-o</span> 镜像名-tag.tar

<span class="token comment"># 查看docker 占用空间</span>
<span class="token function">docker</span> system <span class="token function">df</span>


<span class="token comment"># 删除没有任何容器使用的镜像、构建缓存</span>
<span class="token function">docker</span> system prune <span class="token parameter variable">-a</span>

<span class="token comment">#拉取镜像</span>
<span class="token function">docker</span> pull 镜像名<span class="token punctuation">[</span>:Tag<span class="token punctuation">]</span>

<span class="token comment">#给镜像打Tag</span>
<span class="token function">docker</span> tag 镜像名:Tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="容器" tabindex="-1"><a class="header-anchor" href="#容器" aria-hidden="true">#</a> 容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 前端nginx安装tree</span>
apk <span class="token function">add</span> tree
apk <span class="token function">add</span> telnet

<span class="token comment">#运行容器</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8081</span>:8080 <span class="token parameter variable">--name</span><span class="token operator">=</span>tomcat_tuyb tomcat:8.0
<span class="token parameter variable">-d</span>				后台运行服务
<span class="token parameter variable">-p</span> <span class="token number">8081</span>:8080	端口映射，宿主机的8081端口映射到容器内服务的8080端口	
<span class="token parameter variable">--name</span>			指定服务名称（不能重复）
<span class="token parameter variable">-it</span>             运行时直接进入容器，比如centos镜像系统
<span class="token parameter variable">-v</span> 				数据卷挂载，宿主机绝对路径1:容器内路径1

<span class="token comment">#强制删除容器，可以删除运行中的容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> 容器名

<span class="token comment"># 查看容器内的进程</span>
<span class="token function">docker</span> <span class="token function">top</span> 容器名或容器id

<span class="token comment">#查看容器细节（WorkingDir工作目录、ip地址）</span>
<span class="token function">docker</span> inspect 容器名或容器id  

<span class="token comment">#复制宿主机文件到容器内，反过来一样</span>
<span class="token function">docker</span> <span class="token function">cp</span> /etc/hosts 容器名或容器id:/opt
<span class="token function">docker</span> <span class="token function">cp</span> 容器名或容器id:/opt /etc/hosts 

<span class="token comment">#实时查看容器后200行日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">--tail</span> <span class="token number">200</span> <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>container_name<span class="token operator">&gt;</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-fn</span> <span class="token number">200</span> <span class="token number">3435</span>

<span class="token comment"># 查看容器的指定列，id 镜像 和 状态</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">--format</span> <span class="token string">&quot;table {{.ID}}<span class="token entity" title="\\t">\\t</span>{{.Image}}<span class="token entity" title="\\t">\\t</span>{{.Status}}&quot;</span>

<span class="token comment">#关闭所有启动容器</span>
<span class="token function">docker</span> stop <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="网络-1" tabindex="-1"><a class="header-anchor" href="#网络-1" aria-hidden="true">#</a> 网络</h3><h4 id="network-mode-host模式port映射无用" tabindex="-1"><a class="header-anchor" href="#network-mode-host模式port映射无用" aria-hidden="true">#</a> network_mode: host模式port映射无用</h4><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>network_mode: host 的情况下，docker-compose 里不需要再用 ports 映射，因为 host 模式已经共享网络了，ports 配置会被忽略吗？其实在 host 模式下，ports 配置是无效的，因为不需要映射，直接使用宿主机的端口。所以用户的配置里 ports 可以去掉，不过这不影响，因为 host 模式下 ports 会被忽略。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：修改docker-compose.yaml的network_mode后 ，要重启nginx</p><p>Docker 默认创建以下三种网络类型之一：</p><ol><li><code>bridge</code>（默认网络）：</li></ol><ul><li><ul><li>容器通过虚拟网桥连接，彼此隔离但可通过 IP 通信。</li><li>适用于单机多容器间的通信。</li></ul></li></ul><ol><li>\`host：</li></ol><ul><li><ul><li>容器直接使用主机的网络栈（IP 和端口），无网络隔离。</li><li>适用于需要高性能网络的场景。</li></ul></li></ul><ol><li><code>none</code>：</li></ol><ul><li><ul><li>容器无网络连接，仅能进行本地进程间通信（IPC）。</li><li>适用于对网络隔离要求极高的场景。</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出所有网络</span>
$ <span class="token function">docker</span> network <span class="token function">ls</span>
NETWORK ID     NAME      DRIVER    SCOPE
abc123         bridge    bridge    <span class="token builtin class-name">local</span>
def456         <span class="token function">host</span>      <span class="token function">host</span>      <span class="token builtin class-name">local</span>
ghi789         none      null      <span class="token builtin class-name">local</span>

<span class="token comment"># 查看自定义网络信息，主要看IPAM的Subnet为分配给网络的 IP 地址段</span>
$ <span class="token function">docker</span> network inspect <span class="token operator">&lt;</span>网络名称或 ID<span class="token operator">&gt;</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my-network&quot;</span>,
        <span class="token string">&quot;Id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;def789...&quot;</span>,
        <span class="token string">&quot;Created&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2023-10-02T10:30:00.000000Z&quot;</span>,
        <span class="token string">&quot;Scope&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
        <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bridge&quot;</span>,
        <span class="token string">&quot;EnableIPv6&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;IPAM&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,
            <span class="token string">&quot;Options&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
            <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token string">&quot;Subnet&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;192.168.100.0/24&quot;</span>,
                    <span class="token string">&quot;Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;192.168.100.1&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">..</span>.
<span class="token punctuation">]</span>
<span class="token comment">#删除网络</span>
$ <span class="token function">docker</span> network <span class="token function">rm</span> <span class="token operator">&lt;</span>网络名称或 ID<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h2><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 清空名为 \`users\` 的表中所有数据
TRUNCATE TABLE users;

-- 修改A表的A字段为VARCHAR(500)类型
ALTER TABLE tableA MODIFY COLUMN columnA VARCHAR(500);

# Threads_connected：表示当前与 MySQL 服务器建立的活动连接数，也就是当前正在使用的连接数量
SHOW STATUS LIKE &#39;Threads%&#39;;

# 查看最大连接数
SHOW VARIABLES LIKE &#39;max_connections&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git命令" tabindex="-1"><a class="header-anchor" href="#git命令" aria-hidden="true">#</a> git命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token comment"># git撤销远端的commit</span>
 <span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD~1
 <span class="token function">git</span> push <span class="token parameter variable">-f</span> origin master

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="python" tabindex="-1"><a class="header-anchor" href="#python" aria-hidden="true">#</a> python</h2><h3 id="anaconda命令" tabindex="-1"><a class="header-anchor" href="#anaconda命令" aria-hidden="true">#</a> anaconda命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看虚拟环境</span>
conda <span class="token function">env</span> list
<span class="token comment"># 创建虚拟环境（一定要指定python版本，才能虚拟环境被pycharm选中）</span>
conda create <span class="token parameter variable">-n</span> xxxxx<span class="token punctuation">(</span>名字<span class="token punctuation">)</span> <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">3.10</span>
<span class="token comment"># 删除虚拟环境</span>
conda remove <span class="token parameter variable">-n</span> xxxxx<span class="token punctuation">(</span>名字<span class="token punctuation">)</span> <span class="token parameter variable">--all</span>
<span class="token comment">#进入虚拟环境</span>
conda activate  xxxxx<span class="token punctuation">(</span>名字<span class="token punctuation">)</span>
<span class="token comment"># 退出虚拟环境</span>
conda deactivate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pycharm使用虚拟环境</p><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb202507121100139.png" alt="image-20250622180615022" loading="lazy"></p><h3 id="pip命令" tabindex="-1"><a class="header-anchor" href="#pip命令" aria-hidden="true">#</a> pip命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 更新 pip 本身</span>
pip <span class="token function">install</span> <span class="token parameter variable">--upgrade</span> pip
<span class="token comment"># 输出项目的依赖版本到requirements.txt文件</span>
pip freeze <span class="token operator">&gt;</span> requirements.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kpl项目" tabindex="-1"><a class="header-anchor" href="#kpl项目" aria-hidden="true">#</a> kpl项目</h2><p>服务器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#一、字体相关</span>
https://www.cnblogs.com/somebottle/p/18564830/matplotlib_with_cjk_chars
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>抓包</p>`,43),v={href:"https://www.cnblogs.com/yttbk/p/8609720.html",target:"_blank",rel:"noopener noreferrer"},m=s(`<p>项目运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /home/kpl

<span class="token function">docker</span> build <span class="token parameter variable">-t</span> kpl_service:1.8 <span class="token builtin class-name">.</span>

<span class="token function">docker</span> run <span class="token parameter variable">-e</span> <span class="token assign-left variable">TOKEN</span><span class="token operator">=</span>aaa <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 kpl_service:1.8

http://ip:5000/

<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>meta <span class="token assign-left variable">charset</span><span class="token operator">=</span><span class="token string">&quot;UTF-8&quot;</span>/<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>股票概念分析<span class="token operator">&lt;</span>/title<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span>-- 引入 Vue、Axios、ECharts --<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>script <span class="token assign-left variable">src</span><span class="token operator">=</span><span class="token string">&quot;./js/vue.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>/script<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>script <span class="token assign-left variable">src</span><span class="token operator">=</span><span class="token string">&quot;./js/axios.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>/script<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>script <span class="token assign-left variable">src</span><span class="token operator">=</span><span class="token string">&quot;./js/echarts.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>/script<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span>-- 引入 Element-UI --<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>link <span class="token assign-left variable">rel</span><span class="token operator">=</span><span class="token string">&quot;stylesheet&quot;</span> <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;https://unpkg.com/element-ui/lib/theme-chalk/index.css&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>script <span class="token assign-left variable">src</span><span class="token operator">=</span><span class="token string">&quot;./js/index.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>/script<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
        .clearfix:before, .clearfix:after <span class="token punctuation">{</span>
            display: table<span class="token punctuation">;</span>
            content: <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        .clearfix:after <span class="token punctuation">{</span>
            clear: both<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        .fr <span class="token punctuation">{</span>
            float: right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token operator">&lt;</span>/style<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function b(k,h){const a=p("ExternalLinkIcon");return t(),c("div",null,[o,n("p",null,[n("a",d,[e("https://cron.ciding.cc/"),i(a)])]),u,n("p",null,[n("a",v,[e("https://www.cnblogs.com/yttbk/p/8609720.html"),i(a)])]),m])}const f=l(r,[["render",b],["__file","00-常用命令.html.vue"]]);export{f as default};
