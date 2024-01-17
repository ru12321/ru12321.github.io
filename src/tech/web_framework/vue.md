---
title: Vue
date: 2024-01-17
category: javascript & vue
---

# 小知识

* Vue标配

  * ```js
    //定义局部组件对象
    const login = {
        template:`<div> xxx + {{msg}}</div>`,
        data(){
            return{
                msg:"局部组件msg",
            }
        },
        methods:{},
        computed:{},
        created(){},
    }
    
    //定义Vue实例 根组件对象
    const app = new Vue({
        el: "#app", 	//定义vue实例的作用范围
        data: {			//定义vue的数据、变量
            msg:"Vue实例根组件msg"
        },
        methods: {		//定义一系列方法
     	
        },
        computed:{		//定义计算属性
            login,		//注册局部组件
        },
        created(){}, 	//定义生命周期函数
        components:{},	//定义局部组件
    })
    ```

* ==js的加载是从代码上面一直到代码下面的，vue实例部分建议写在最下面！==
* ==js中 字符串 null 和 ""  和布尔值false相等==
* < a >标签中href="javascript:;"表示什么都不执行
* vue data中的数组lists[] 方法
  * push(元素)  添加元素到lists中
  * splice(start,delCount)，从start开始，删除数组delCount个元素
* v-model   代替了标签的value属性，常见于 input 或表单等标签
* 总价格：{{ totalPrice().toFixed(2) }}     {{ }}里面可以调用方法，显示的是vue实例方法的返回值，toFixed(2)保留两位小数的意思
* <a  href="baidu.com" @click="test"  点击a标签会先触发@click，再触发href
* @CrossOrigin解决跨域问题  加在Controller类上
* ==@RequestBody的作用其实是将json格式的数据转为java对象==，在axios发送post请求时，传过来的就是json数据，要在Controller的方法参数上加上@requestbody

*  html中 创建表格 

  * ```html
    <table border="1" width="100%">
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>工资</th>
            <th>操作</th>
        </tr>
        <tr style="text-align: center">
            <td>1</td>
            <td>老王</td>
            <td>15</td>
            <td>12345</td>
            <td><a href="">删除</a>&nbsp;&nbsp;&nbsp; <a href="">修改</a></td>
        </tr>
    </table>
    ```

* easy code插件 直接从数据库生成一系列entity dao mapper  service serviceimpl controller 生成后==在dao类上面添加@mapper注释（不是@service那一类的）==或者在启动类上添加MapperScan("com.mrru.dao")
  * @Mapper注解是==Mybatis框架的注解==，使用这个注解我们的接口就可以被Mybatis框架加载，然后==动态代理生成实体类，然后就将实体类放到了spring容器中。==
  * 可以修改模板 中 dao类添加注释@Mapper，mapper.xml存放目录改为com/mrru/mapper   ,  Controller类添加注释@CrossOrigin, 

* ==在axios中==，==不能直接用this代表vue实例，==可以在外部声明一个var变量_this代表this，在axios中使用 _this代替即可

* 删除前提示框 if (window.confirm("您确定要删除吗？"){  //点击确定后要执行的东西 }

* “./”：代表目前所在的目录

* “../”：代表上一层目录

* vue中 style标签加入scoped的话 会影响全局的样式，不加scoped只影响自己的样式，因此所有公共的样式加在App.Vue中

* Vue-cli前端开发
  
* src下 新建views目录，在里面构建组件。components里面放公共组件
  
* vue router切换到同一个页面会报错

  ```js
  const VueRouterPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push (to) {
      return VueRouterPush.call(this, to).catch(err => err)
  }
  ```

  



# Vue2

## 1. Vue 引言

![image-20210129104929487](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202209142158464.png)

> `渐进式` JavaScript 框架   --摘自官网

```markdown
# 渐进式
   1. 易用  html css javascript
   2. 高效  开发前端页面 非常高效 
   3. 灵活  开发灵活 多样性

# 总结
	Vue 是一个javascript 框架 js 简化页面js操作
	bootstrap 是一个css框架  封装css

# 后端服务端开发人员: 
	Vue 渐进式javascript框架: 让我们通过操作很少的DOM,甚至不需要操作页面中任何DOM元素,就很容易的完成数据和视图绑定 ====> 双向绑定 MVVM  

# Vue 作者
 	尤雨溪   国内的    
```

-------

## 2. Vue入门

* ==Vue就是个js的框架==

### 2.1	下载Vuejs

```html
//开发版本:
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

//生产版本:
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

### 2.2 Vue第一个入门应用

* ==js的加载是从代码上面一直到代码下面的，vue实例部分建议写在最下面！==
* ==作用域通常组织在一个div上面！而不能是body==

总结：

* ==一个页面中只能存在一个Vue实例，不能创建多个vue实例==

```html
<div id="app" class="aa">
    {{ msg }}  {{username}} {{pwd}}
    <br>
    <span>
        {{ username }}
        <h1>{{ msg }}</h1>
    </span>

</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",  //element 用来给Vue实例定义一个作用范围，#app是id选择器  .aa是类选择器
        data:{      //用来给Vue实例定义一些相关数据
            msg:"百知欢迎你,期待你的加入!",
            username:"hello Vue!",
            pwd :"12345",
        },
    });
</script>	
```

#### 总结:
 	1.vue实例(对象)中el属性: 	代表Vue的作用范围  日后在==Vue的作用范围内==都可以使用Vue的语法
 	2.vue实例(对象)中data属性: 用来给Vue实例绑定一些相关数据, 绑定的数据可以通过=={{变量名}}==**在Vue作用范围内**取出
 	3.在使用 {{ }} 进行获取data中数据时,可以在 {{ }} 中书写表达式,运算符,调用相关方法,以及逻辑运算等

![image-20220414190035114](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202209142158969.png)	

​	4.el属性中可以书写任意的CSS选择器[jquery选择器],但是在使用Vue开发是**推荐使用id选择器**  注意: el属性值不能指定body或html标签，一个vue实例只能作用在一个具体作用范围

## 3. v-text和v-html

* v-text直接显示数据
* v-html先渲染，再显示数据

![image-20220414201612826](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202209142159891.png)

### 3.1 v-text

> `v-text`:用来获取data中数据将数据以文本的形式渲染到指定标签内部             类似于javascript 中 innerText

```html
		<div id="app" class="aa">
        <span >{{ message }}</span>
        <span v-text="message"></span>
    </div>

    <!--引入vue.js-->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el:"#app",
            data:{
                message:"百知欢迎您"
            }
        })
    </script>
```

### 总结

* 插值表达式 即{{}} 这样的方式不会覆盖原数据
*  v-text ==会将标签中原有的数据覆盖==，能避免插值闪烁

1. {{}}(插值表达式) 和 v-text获取数据 的区别在于 
   	a.使用v-text取值==会将标签中原有的数据覆盖== 使用插值表达式的形式不会覆盖标签原有的数据
    b.使用v-text可以避免在网络环境较差的情况下出现插值闪烁

### 3.2 v-html

> `v-html`:用来获取data中数据将数据中含有的html标签先解析在渲染到指定标签的内部  类似于javascript中 innerHTML

```html
<div id="app" class="aa">
    <span>{{message}}</span>
    <br>
    <span v-text="message"></span>

    <br>
    <span v-html="message">xxxxxx</span>
</div>

<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",
        data:{
            message:"<a href=''>百知欢迎您</a>"
        }
    })
</script>
```

----

## 4.vue中事件绑定(v-on)

* 事件！

![image-20220414203807472](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202209142159939.png)

* MVVM  双向绑定机制  model数据改变会影响view
  * model 就是vue中的data属性
  * view 就是显示的{{ msg }}

### 4.1 绑定事件基本语法

```html
<div id="app">
    <h2>{{message}}</h2>
    <h2 v-text="message"></h2>
    <h2>年龄:{{ age }}</h2>
    <br>
    <input type="button" value="点我改变年龄" v-on:click="changeage">
</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",
        data:{
            message:"hello 欢迎来到百知课堂!",
            age:23,
        },
        methods:{  //methods 用来定义vue中时间
            changeage:function(){
                alert('点击触发');
                this.age//代表当前vue实例
                this.aa();//代表调用方法
            },
            aa:function(){}
        }
    })
</script>
```

### **总结:**

事件三要素  事件源:发生事件dom元素  事件: 发生特定的动作  click....  监听器  发生特定动作之后的事件处理程序 通常是js中函数

1.在vue中绑定事件是通过v-on指令来完成的 v-on:事件名 如  v-on:click

2.在v-on:事件名的赋值语句中是==当前事件触发调用的函数名==

3.在vue中事件的函数统一定义在Vue实例的==methods属性==中

4.在vue定义的事件中this指的就是当前的Vue实例,==日后可以在事件中通过使用this获取Vue实例中相关数据==以及==调用methods中相关方法aa==
`而且不用this.data.count，直接this.count就可以了`

### 4.2 Vue中事件的简化语法

* ==@代表v-on==  语法： @事件名=事件函数名
* ==函数省去 :function==  test(参数){}

```html
<div id="app">
    <h2>{{ age }}</h2>
    <input type="button" value="通过v-on事件修改年龄每次+1" v-on:click="changeage">
    <input type="button" value="通过@绑定时间修改年龄每次-1" @click="editage">
</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",  //element: 用来指定vue作用范围
        data:{
            age:23,
        },    //data   : 用来定义vue实例中相关数据
        methods:{
            changeage:function(){
                this.age++;
            },
            editage:function(){
                this.age--;
            }

        }  //methods: 用来定义事件的处理函数
    });
</script>
```

总结:

1.日后在vue中绑定事件时可以==通过@符号形式== 简化  v-on 的事件绑定

### 4.3 Vue方法的简化写法

```html
<div id="app">
    <span>{{count}}</span>
    <input type="button" value="改变count的值" @click="changecount">
</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",
        data:{
            count:1,
        },
        methods:{
            /*changecount:function(){
                   this.count++;
               }*/
            changecount(){
                this.count++;
            }
        }
    });
</script>
```

```markdown
# 总结:
1.在Vue中事件定义存在两种写法  
一种是 函数名:function(){}       
`一种是  函数名(){} 推荐`
```

### 4.4 Vue事件参数传递

```html
<div id="app">
    <span>{{count}}</span>
    <input type="button" value="改变count为指定的值" @click="changecount(23,'xiaohei')">
</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",
        data:{
            count:1,
        },
        methods:{
            //定义changecount
            changecount(count,name){
                this.count = count;
                alert(name);
            }
        }
    });
</script>
```

```markdown
# 总结:
	1.在使用事件时,可以直接在事件调用处给事件进行参数传递,在事件定义处通过定义对应变量接收传递的参数
```

-----

## 5.v-show v-if v-bind

* vi-if v-show里面可以写逻辑表达式，还可以==获取vue实例data的值==  ==v-if = "ishow"  用双引号引起！==
* 这样就可以动态修改vue上的值 来控制 是否展示
* 两者区别
  * 1.v-if 底层通过控制**dom树上元素节点**实现页面标签展示和隐藏
  * 2.v-show底层通过控制标签**css中display**属性实现标签展示和隐藏，不修改dom树
  * ==变化快用v-show，变化慢用v-if==
* ![image-20220415103911365](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204151039713.png)

### 5.1 v-show

> `v-show`:用来控制页面中某个标签元素是否展示       

```html
<div id="app">
    <!--
        v-show: 用来控制标签展示还是隐藏的
    -->
    <h2 v-show="false">百知教育欢迎你的加入!</h2>
    <h2 v-show="show">百知教育欢迎你的加入这是vue中定义变量true!</h2>
    <input type="button" value="展示隐藏标签" @click="showmsg">

</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",
        data:{
            show:false,
        },
        methods:{
            //定义时间
            showmsg(){
               this.show =  !this.show;
            }
        }
    })
</script>
```

```markdown
# 总结
	1.在使用v-show时可以直接书写boolean值控制元素展示,也可以通过变量控制标签展示和隐藏
	2.在v-show中可以通过boolean逻辑表达式控制标签的展示和隐藏
```

### 5.2 v-if 

> `v-if`: 用来控制页面元素是否展示             

```html
<div id="app">
    <h2 v-if="false">百知教育</h2>
    <h2 v-if="show">百知教育欢迎你的加入</h2>
</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",
        data:{
            show:false
        },
        methods:{},
    });
</script>
```

### 5.3 v-bind

* v-bind可以绑定所有html标签的属性
* 作用:用来绑定html标签中==某个属性==交给vue实例进行管理
* 好处:一旦属性交给vue实例进行管理之后，日后可以通过修改vue实例中绑定属性达到动态修改标签属性的效果
* 语法:对应标签上 ==v-bind:属性名==，==加上v-bind后代表这个属性交给vue去管理了==
* v-bind:title=“msg”  这里可以直接赋值为与Vue中data的变量

> `v-bind`: 用来绑定标签的属性从而通过vue实例动态修改标签的属性

```html
<div id="app">
    <img width="300" v-bind:title="msg" v-bind:class="{aa:showCss}"  src="baizhilogo.jpg" alt="">
</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el:"#app",
        data:{
            msg:"百知教育官方logo!!!!",
            showCss:true,
        },
        methods:{
        }
    })
</script>
```

### 5.4 v-bind 简化写法

> vue为了方便我们日后绑定标签的属性提供了对属性绑定的简化写法如 `v-bind:属性名` 简化之后 `:属性名`

```html
<div id="app">
    <img width="300" :title="msg" :class="{aa:showCss}"  :src="src" alt="">
    <input type="button" value="动态控制加入样式" @click="addCss">
    <input type="button" value="改变图片" @click="changeSrc">
</div>
<!--引入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>

    const app = new Vue({
        el:"#app",
        data:{
            msg:"百知教育官方logo!!!!",
            showCss:true,
            src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583490365568&di=52a82bd614cd4030f97ada9441bb2d0e&imgtype=0&src=http%3A%2F%2Fimg.kanzhun.com%2Fimages%2Flogo%2F20160714%2F820a68f65b4e4a3634085055779c000c.jpg"
        },
        methods:{
            addCss(){
                this.showCss= !this.showCss;
            },
            changeSrc(){
                this.src = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1925088662,1336364220&fm=26&gp=0.jpg";
            }
        }
    })
</script>
```

--------

## 6.v-for的使用

* 作用:用来在页面中实现vue中定义数据的遍历语法:直接在对应标签上加入v-for指令
* 语法 
  * https://cn.vuejs.org/v2/guide/list.html
  * a.遍历对象:v-for="==(value ,key ,index)==  in  ==data中变量==”,也可以**单个取value**  v-for="value in user"   {{ value }}
  * b.==value,name,index这三个参数是有顺序的！！！==

> `v-for`: 作用就是用来对对象进行遍历的(数组也是对象的一种)

```html
<div id="app">

    <span>{{ user.name }} {{ user.age }}</span>
    <br>
    <!--
       1.通过v-for遍历对象
    -->
    <span v-for="(value,key,index) in user">
        {{index}} : {{key}} : {{value}}
    </span>

    <!--
        2.通过v-for遍历数组
    -->
    <ul>
        <li v-for="a,index in arr" >
            {{index}} {{a}}
        </li>
    </ul>

    <!--
        3.通过v-for遍历数组中对象
        :key 便于vue内部做重用和排序
    -->
    <ul>
        <li v-for="user,index in users" :key="user.id">
            {{index+1}} {{ user.name }}  === {{ user.age }} ==== {{ user.content }}
        </li>
    </ul>

</div>
<!--引入vue-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el: "#app",
        data: {
            user:{name:"小陈",age:23},
            arr:["北京校区", "天津校区", "河南校区"],
            users:[
                {id:"1",name:"xiaochen",age:23,content:"我曾经也是一个单纯的少年!"},
                {id:"2",name:"小白",age:23,content:"我曾经是一个邪恶的少年!"},
            ]
        },
        methods: {}
    });
</script>
```

```markdown
# 总结
	1.在使用v-for的时候一定要注意加入:key 用来给vue内部提供重用和排序的唯一key 
```

----

## 7 .v-model 双向绑定

* ==v-model的实际使用！！强大之处==
* bilibili.com/video/BV1Lo4y1R7hc?p=7&spm_id_from=pageDriver 第48分钟
* 页面的值变，影响model数据值
* model数据值变了，影响页面的值

![image-20220416110746656](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204161107858.png)

* v-bind:绑定作用:用来将==html标签的属性==进行绑定，交给vue实例管理,**除了value属性的所有属性**都可以绑定
* v-model:模型﹑作用:用来将==html标签的value属性==进行绑定，,交给vue实例管理，主要用在表单元素上，最能体现双向绑定机制
  * 语法：在表单元素标签上，直接加入v-model="vue变量"，就相当于给value赋值了，不用再单独写value属性了

> `v-model`: 作用用来绑定标签元素的值与vue实例对象中data数据保持一致,从而实现双向的数据绑定机制

```html
<div id="app">
    <input type="text" v-model="message">
    <span>{{message}}</span>
    <hr>
    <input type="button" value="改变Data中值" @click="changeValue">
</div>
<!--引入vue-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el: "#app",
        data: {
            message:""
        },
        methods: {
            changeValue(){
                this.message='百知教育!';
            }
        }
    });
</script>
```

```markdown
# 总结
		1.使用v-model指令可以实现数据的双向绑定 
		2.所谓双向绑定 表单中数据变化导致vue实例data数据变化   vue实例中data数据的变化导致表单中数据变化 称之为双向绑定

# MVVM架构  双向绑定机制
	Model: 数据  Vue实例中绑定数据
	
	VM:   ViewModel  监听器

	View:  页面  页面展示的数据
```

-----

## vue基本内容回顾

![image-20220417200352468](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204172003787.png)

![image-20220417200743416](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204172007557.png)

![image-20220417200842983](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204172008151.png)

![image-20220417200954021](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204172009166.png)

![image-20220417201050305](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204172010486.png)

![image-20220417201208238](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204172012435.png)

![image-20220417201307169](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204172013346.png)

## vue实例的computed计算属性

* **惰性计算，只有依赖的值改变，才会触发computed**，**但是不能传参数**

* 相比用methods里面的方法，computed计算属性只计算一次，就可以缓存到vue中了，不需要进行多次计算

* ==只要数据不想直接渲染到页面，想进行额外的处理，就用compted==

* 作用：用来在vue实例中完成相关业务计算工作，日后在将某个数据渲染页面时 如果该数据==需要经过业务处理==之后再==渲染到页面多处==就可以使用computed

* 好处：提升vue运行性能，主要使用computed进行计算相关处理会将第一次计算结果进行缓存，,便于日后页面多次使用
* 使用：{{ 属性名 }}   这个属性名就是computed计算属性中的方法名，==但是不能加()==，不然和methods里面的方法一样了，
* 注意：**computed里的方法名和methods方法名不要重名！**

## 8. 事件修饰符

* 语法：@事件名.事件修饰符 = "事件处理函数"  ===> @click.stop = "test"
* 事件修饰符可以连用，@click.stop.self

> `修饰符`: 作用用来和事件连用,用来决定事件触发条件或者是阻止事件的触发机制

```markdown
# 1.常用的事件修饰符
	.stop    停止
	.prevent 阻止
	.self    独自
	.once    一次
```

### 8.1 stop事件修饰符

* js存在事件冒泡，比如大的div块套个小的div块，都有click事件，点击小的div，两个div同时响应了click事件！ 这是因为==js的冒泡机制，层级小的标签中的事件，会将这个事件同时向父节点，父父节点传递...==,所以**大的div块也会响应小div块上的click事件**

> 用来阻止事件冒泡，.stop意味着事件不会向后传递了

```html
<div id="app">
    <div class="aa" @click="divClick">
        <!--用来阻止事件冒泡-->
        <input type="button" value="按钮" @click.stop="btnClick">
    </div>
</div>
<!--引入vue-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  const app = new Vue({
    el: "#app",
    data: {},
    methods: {
      btnClick(){
        alert('button被点击了');
      },
      divClick(){
        alert('div被点击了');
      }
    }
  });
</script>
```

### 8.2 prevent 事件修饰符

> 用来阻止标签的默认行为

```html
<!--用来阻止事件的默认行为-->
<a href="http://www.baizhibest.com/" @click.prevent="aClick">百知教育</a>
```

### 8.3 self 事件修饰符

> 用来针对于当前标签的事件触发     ===========> 只触发自己标签的上特定动作的事件     只关心自己标签上触发的事件 ==不监听事件冒泡==

```html
<!--只触发标签自身的事件-->
<div class="aa" @click.self="divClick">
  <!--用来阻止事件冒泡-->
  <input type="button" value="按钮"  @click.stop="btnClick">
  <input type="button" value="按钮1" @click="btnClick1">
</div>
```

### 8.4 once 事件修饰符

> once 一次作用:  就是让指定事件只触发一次

```html
    <!--
    .prevent : 用来阻止事件的默认行为
    .once    : 用来只执行一次特定的事件
    -->
    <a href="http://www.baizhibest.com/" @click.prevent.once="aClick">百知教育</a>
```

----

## 9. 按键修饰符

* 按键修饰符也可连用
* @keyup.enter.tab.space.delete

> 作用: 用来与键盘中按键事件绑定在一起,用来修饰特定的按键事件的修饰符

```markdown
# 键盘按键事件
	@keyup @keydown @keypress
# 按键修饰符
	.enter
	.tab 光标转到tab键才可以触发
	.delete (捕获“删除”和“退格”键)
	.esc
	.space
	.up
	.down
	.left
	.right
```

### 9.1 enter 回车键

> 用来在触发回车按键之后触发的事件

```html
 <input type="text" v-model="msg" @keyup.enter="keyups">
```

### 9.2 tab 键

> 用来捕获到tab键执行到当前标签是才会触发

```html
<input type="text" @keyup.tab="keytabs">
```

----

## 10. Axios 基本使用

> axios 简介

* axios 前端异步请求库类似 jQuery ajax 技术
* ajax用来在页面发起异步请求到后端服务,并将后端服务响应数据渲染到页面上
* jouery推荐ajax技术，vue里面并不推荐再使用jquery框架，vue推荐使用axios 异步请求库
* axios 总结:==用来在前端页面发起一个异步请求,请求之后页面不动,响应回来刷新页面局部==
* 官方定义: 
  * axios 异步请求库并不是vue官方库   **第三方异步库**﹑
  * 在vue中摧荐axios易用、简洁且高效的http库--->==发送http异步请求库==
  * 官方网站: http : //vavaa . axios-js . com/
* 特性:
  * 从浏览器中创建XLHttpReguests
  * 从node.js创建http请求
  * 支持Promise AP1
  * ==拦截请求和响应==
  * 转换请求数据和响应数据
  * 取消请求
  * ==自动转换Json数据==
  * 客户端支持防御xSRF

### 10.1 引言

> `Axios` 是一个异步请求技术,核心作用就是用来在页面中发送异步请求,并获取对应数据在页面中渲染       页面局部更新技术  Ajax

### 10.2 Axios 第一个程序

中文网站:https://www.kancloud.cn/yunye/axios/234845

安装: https://unpkg.com/axios/dist/axios.min.js

#### 10.2.1 GET方式的请求

==axios.get("url?id=21").then(function(res){res.data}).catch(function(err){});==

```js
	  //发送GET方式请求
    axios.get("http://localhost:8989/user/findAll?name=xiaochen").then(function(response){
        console.log(response.data);
    }).catch(function(err){
        console.log(err);
    });
```

#### 10.2.2 POST方式请求

* 将数据以json格式发送给后端

```javascript
		//发送POST方式请求
    axios.post("http://localhost:8989/user/save",{
        username:"xiaochen",
        age:23,
        email:"xiaochen@zparkhr.com",
        phone:13260426185
    }).then(function(response){
        console.log(response.data);
    }).catch(function(err){
        console.log(err);
    });
```

![image-20220418165529958](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204181655478.png)

> 创建实例

可以使用自定义配置新建一个 axios 实例

```js
const instance = axios.create({  
    baseURL: 'https://localhost:8080',  //这样就会自动在请求前加上这个baseURL
    timeout: 5000,  //一般设置为5秒
    headers: {'X-Custom-Header': 'foobar'}
    //还可以添加其它的各种配置
});
```

> 请求配置

http://www.axios-js.com/zh-cn/docs/  搜索请求配置

#### 10.2.3 axios并发请求

> `并发请求`:  将多个请求在同一时刻发送到后端服务接口,最后在集中处理每个请求的响应结果

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
}));
```

### 10.3 axios中的拦截器 intercept

* 作用:用来将axios中共有参数,响应公共处理交给拦截器处理，减少axios发送请求时代码元余

* 请求拦截器：在发送请求时 **给axios实例** 做一些事情   比如发送的所有请求都加上token

```js
//创建axios的配置对象 创建实例
var instance = axios.create({
    baseURL: 'https://localhost:8080',
    timeout: 5000
    //还可以写其它配置！http://www.axios-js.com/zh-cn/docs/
})

//请求拦截器
instance.interceptors.request.use(function (config) {//config就是axios实例对象
    console.log("request");
    console.log(config);
    if (config.url.indexOf("?") == -1) { //url没有？
        config.url += "?token=1234";
    } else {
        config.url += "&token=1234";
    }
    return config;
})
```

* 响应拦截器：给**返回的response对象**做一些公共的错误处理  

```js
//响应拦截器
instance.interceptors.response.use(function (response) {//config就是axios实例对象
    response.data = "xxxxxxx";
    if (response.status != 200) {
        alert("服务器出现错误");
    }
    return response;
})
```

> 注意

在axios中，==不能直接用this代表vue实例，==可以在外部声明一个var变量_this代表this，在axios中使用 _this代替即可

------

## 11. Vue 生命周期

>  Vue 实例生命周期 ===> java 对象生命周期(初始化阶段 运行阶段  销毁阶段)    `生命周期钩子`   ====>  `生命周期函数` 
>
>  Vue实例从创建到销毁过程中==自动触发==一系列函数   ====> Vue生命周期函数(钩子)

![img](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202209142200579.png)

Vue生命周期总结

- 1.初始化阶段
    - beforeCreate(){ //1.生命周期中第一个函数,该函数在执行时Vue实例仅仅完成了自身事件的绑定和生命周期函数的初始化工作,**Vue实例中还没有 Data el methods相关属性**
    - created(){ //2.生命周期中第二个函数,该函数在执行时==Vue实例已经初始化了data属性和methods中相关方法==
    - beforeMount(){//3.生命周期中第三个函数,该函数在执行时**Vue将El中指定作用范围作为模板编译**
    -  mounted(){//4.生命周期中第四个函数,该函数在执行过程中,==已经将数据渲染到界面中并且已经更新页面==
- 2.运行阶段
    - beforeUpdate(){//5.生命周期中第五个函数,该函数是data中数据发生变化时执行 这个事件执行时仅仅是**Vue实例中data数据变化**，**页面显示的依然是原始数据**
    - updated(){    //6.生命周期中第六个函数,该函数执行时data中数据发生变化,==页面中数据也发生了变化==  页面中数据已经和data中数据一致
- 3.销毁阶段
    - beforeDestory(){//7.生命周期第七个函数,该函数执行时,Vue中所有数据 methods componet 都没销毁},
    - destoryed(){ //8.生命周期的第八个函数,该函数执行时,Vue实例彻底销毁}

----

## ES6基本用法

ECMAScript 和 JavaScript 的关系是，==前者是后者的规格，后者是前者的一种实现==（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。

* let :用来声明局部变量   好处: 作用范围严谨 从代码声明出开始 到代码块结束  一般在声明基本变量使用推荐使用let
* const :用来声明js中==常量==   好处: 一旦被赋值不能被修改   推荐使用这两个关键字声明变量 声明js中==对象和数组==时推荐使用const

*  前提：在使用**匿名函数**时**作为参数**时候 function(){}   推荐使用es6中==箭头函数==  ==(参数,参数)=>{函数体}==   ==在axios中.then .catch中很常见==  类似java8的lambda表达式
  *  当箭头函数没有参数时或者参数大于1个 必须加入()
  *  当箭头函数只有一个参数时 () 可以省略不写
  *  当函数体中只有一行代码时 函数体{} 可以省略不写
  *  箭头函数和匿名函数最大区别  ==箭头函数没有自己this==   匿名函数存在自己的this         => 这样的写法的话就不用外部定义_this=this

* ==模板字符串== 方便ES6中在==``==中写标签，解决ES6中写标签的问题

* ==对象定义==  便利: 在定义对象时如果对象属性名和变量名一致,写一个即可

  * ```js
    let id = 21;
    let name = "小三";
    let age = 23;
    //es5.x
    const emp = {id: id, name: name, age: age};
    console.log("es5", emp);
    //es6.x
    const emp1 = {id, name, age}
    console.log("es6", emp1);
    ```

## 12. Vue中组件(component)

* Vue一切皆组件

### 12.1 组件作用

组件作用: 用来减少Vue实例对象中代码量,日后在使用Vue开发过程中,可以根据 不同业务功能将页面中划分不同的多个组件,然后由多个组件去完成整个页面的布局,便于日后使用Vue进行开发时页面管理,方便开发人员维护。

### 12.2 组件使用

* 注意:==无论使用全局组件还是局部组件都必须在组件template中加入唯一根元素  建议div 包裹==

#### 12.2.1 全局组件注册

> 说明:全局组件注册给Vue实例,日后可以在任意Vue实例的范围内使用该组件

```js
//1.开发全局组件
Vue.component('login',{
  template:'<div><h1>用户登录</h1></div>'
});
//2.使用全局组件  在Vue实例范围内
<login></login>  
```

> 注意:

 - 1.Vue.component用来开发全局组件 参数1: ==组件的名称==  参数2: ==组件配置{}==  template:''用来书写组件的html代码  template中必须有且只有一个root元素 ==建议templent中都用一个div标签包裹起来==
 - 2.使用时需要在Vue的作用范围内根据组件名使用全局组件
 - 3.如果在注册组件过程中使用 驼峰命名组件的方式 在使用组件时 必须将驼峰的所有单词小写加入-线进行使用

#### 12.2.2 局部组件注册

* 项目中主要使用局部组件，全局组件使用较少

* **建议templent中都用一个div标签包裹起来**

> 说明:通过将组件注册给对应Vue实例中一个components属性来完成组件注册,这种方式不会对Vue实例造成累加

- 第一种开发方式

```js
//局部组件登录模板声明
let login ={   //具体局部组件名称
  template:'<div><h2>用户登录</h2></div>'
};
const app = new Vue({
  el: "#app",
  data: {},
  methods: {},
  components:{  //用来注册局部组件
    login:login  //注册局部组件
  }
});

//局部组件使用 在Vue实例范围内
<login></login>
```

- 第二种开发方式

```js
//1.声明局部组件模板  template 标签 注意:在Vue实例作用范围外声明
  <template id="loginTemplate">
      <h1>用户登录</h1>
  </template>

//2.定义变量用来保存模板配置对象
    let login ={   //具体局部组件名称
        template:'#loginTemplate'  //使用自定义template标签选择器即可
    };

//3.注册组件	
    const app = new Vue({
        el: "#app",
        data: {},
        methods: {},
        components:{  //用来注册局部组件
            login:login  //注册局部组件
        }
    });

 //4.局部组件使用 在Vue实例范围内
	 <login></login>
```



### 12.2 组件中定义data、methods、computed、生命周期函数

https://www.bilibili.com/video/BV1Lo4y1R7hc?p=23&spm_id_from=pageDriver

![image-20220420112044255](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204201120884.png)

### 12.3 Prop机制的使用

![image-20220421092452589](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204210924838.png)



Props 机制:

* 定义: vue中提供一个特有数据传递机制，==用来接收传递数据用的数组==
* 作用:在使用vue组件时如果需要通过**父组件给子组件**传递数据可以通过props进行实现
* new Vue()这个就是根组件

`作用:props用来给组件传递相应静态数据或者是动态数据的`

#### 12.3.1 在组件上声明【静态数据】传递给组件内部

* 父组件向子组件传递数据
  * 传递静态数据：在组件使用标签上，声明==静态数据 key = value==形式，然后在组件内部使用props进行接收数据才可以

* props 用来接收==父组件给当前组件==传递的数据，注意，props机制接收数据就相当于==自己组件的data==中声明这样一个数据了

```js
//1.声明组件模板配置对象
    let login = {
        template:"<div><h1>欢迎:{{ userName }} 年龄:{{ age }}</h1></div>",
        props:['userName','age']  //props作用 用来接收使用组件时通过组件标签传递的数据
    }

//2.注册组件
    const app = new Vue({
        el: "#app",
        data: {},
        methods: {},
        components:{
            login //组件注册
        }
    });

//3.通过组件完成数据传递
	<login user-name="小陈" age="23"></login>
```

```markdown
# 总结:
	1.使用组件时可以在组件上定义多个属性以及对应数据
	2.在组件内部可以使用props数组生命多个定义在组件上的属性名 日后可以在组件中通过{{ 属性名 }} 方式获取组件中属性值
```

#### 12.3.2 在组件上声明【动态数据】传递给组件内部

* 组件标签上声明 ==: key="value"== 组件内部使用props数组进行声明对应接收key

```js
//1.声明局部组件模板对象login
    const login = {
        template:'<div><h2>欢迎: {{ name }} 年龄:{{ age }}</h2></div>',
        props:['name']
    }
 
//2.Vue实例 根组件上注册局部组件
    const app = new Vue({
        el: "#app",
        data: {
            username:"小陈陈",
        },
        methods: {},
        components:{
            login, //注册组件
        }
    });

//3.使用组件
	<input type="text" v-model="username">
	<login :name="username" ></login>  

//使用v-bind形式将数据绑定Vue实例中data属性,日后data属性发生变化,组件内部数据跟着变化
理解：
//v-model绑定了vue实例data中的username，input值一变，data中的username就会改变
//username改变，因为login标签的name属性绑定了username，所以name属性的值就会变，动态数据传递给了组件中的props，组件的template的值就会变
```

#### 12.3.3 prop的单向数据流

> 单向数据流:所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。

- 所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。


- 额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。---摘自官网

### 12.4 组件中定义数据和事件使用

##### 1. 组件中定义属于组件的数据

```js
//组件声明的配置对象
const login = {
  template:'<div><h1>{{ msg }} 百知教育</h1><ul><li v-for="item,index in lists">{{ index }}{{ item }}</li></ul></div>',
  data(){   //使用data函数方式定义组件的数据   在templatehtml代码中通过插值表达式直接获取
    return {
      msg:"hello",
      lists:['java','spring','springboot']
    }//组件自己内部数据
  }
}
```

##### 2.组件中事件定义

```js
const login={
    template:'<div><input type="button" value="点我触发组件中事件" @click="change"></div>',
    data(){
        return {
            name:'小陈'
        };
    },
    methods:{
        change(){
            alert(this.name)
            alert('触发事件');
        }
    }
}
```

```markdown
# 总结	
	1.组件中定义事件和直接在Vue中定义事件基本一致 直接在组件内部对应的html代码上加入@事件名=函数名方式即可
	2.在组件内部使用methods属性用来定义对应的事件函数即可,事件函数中this 指向的是当前组件的实例
```

### 12.5 向子组件中传递事件并在子组件中调用该事件

* 在使用组件时向组件传递事件，直接在对应组件标签上定义传递事件即可 @key=value           ==@传递事件名="父组件中传递事件名“==

`在子组件中调用传递过来的相关事件必须使用 this.$emit('函数名') 方式调用`

```js
//1.声明组件
const login = {
    template:"<div><h1>百知教育 {{ uname }}</h1> <input type='button' value='点我' @click='change'></div>",
    data(){
        return {
            uname:this.name
        }
    },
    props:['name'],
    methods:{
        change(){
            //接收 vue父组件传递过来的findAll函数
            this.$emit('aaa');  //调用父组件传递过来的函数时需要使用 this.$emit('传递事件名') 
        }
    }
}

//2.注册组件
const app = new Vue({
    el: "#app",
    data: {
        username:"小陈"
    },
    methods: {
        findAll(){  //一个事件函数  将这个函数传递给子组件
            alert('Vue 实例中定义函数');
        }
    },
    components:{
        login,//组件的注册
    }
});

//3.使用组件  
<login  @aaa="findAll" ></login>    
```

-----

### 12.6 组件插槽slot

* < slot > 标签用来占位

  ```html
  <login>---嘻嘻哈哈---</login>
  
  <!--1.不注明 slot的name  会在两个位置都显示slot-->
  const login = {
      template:`<div> <slot></slot><h3>用户登录网站</h3>  <slot></slot></div>`,
  }
  
  ---嘻嘻哈哈---
  用户登录网站
  ---嘻嘻哈哈---
  
  <login><span slot="aa">---嘻嘻哈哈---</span></login>
  <login> <button slot="bb">点我</button></login>
  
  <!--2. 具名插槽：slot用name标识后，传到指定插槽位置处-->
  const login = {
      template:`<div> <slot name="aa"></slot><h3>用户登录网站</h3>  <slot name="bb"></slot></div>`,
  }
  
  ---嘻嘻哈哈---
  用户登录网站
  点我（按钮）
  
  <!--3. 默认插槽：插槽本身就有内容，如果不覆盖就会显示默认内容；覆盖了话则显示覆盖内容-->
  const login = {
      template:`
  	<div> 
          <slot name="aa"> <span>aa插槽的默认内容</span></slot>
          <h3>用户登录网站</h3>  
          <slot name="bb"></slot>
      </div>`,
  }
  ```

  

## 13.Vue中路由 (Vue Router)

#### 13.1 路由

`路由:根据请求的路径按照一定的路由规则进行请求的转发从而帮助我们实现统一请求的管理`

* 定义: Vne Router 是Vue js 官方路由管理器,它和Vue.js 的核心深度集成，让构建单页面应用变得易如反掌
* 通俗定义:通过使用 vue Router 可以将现有vue开发变得更加灵活,他可以根据==前端请求url==对应在页面中==展示不同组件==
* 将url路径和组件内容的展示 关联了起来！

#### 13.2 作用

>  用来在vue中实现组件之间的动态切换

#### 13.3 使用路由

1. ##### 引入路由

   ```html
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>  
   //vue-router.js一定要在vue.js下面
   ```

2. ##### 创建组件对象

   ```js
   //声明组件模板
   const login = {
     template:'<h1>登录</h1>'
   };
   const register = {
     template:'<h1>注册</h1>'
   };
   ```
   
3. ##### 定义路由规则对象

   ```js
    //创建路由对象
   const router = new VueRouter({
     routes:[
       {path:'/',redirect: '/login'},//匹配  ‘/‘ 结尾的路径
       {path:'/login',component:login},   //path: 路由的路径  component:路径对应的组件
       {path:'/register',component:register}
   	{path:'/*', component:notfound},//这个路由规则放到最后面
     ]
});
   ```

4. ##### 将路由对象注册到vue实例

   ```js
   const app = new Vue({
     el: "#app",
     data: {
       username:"小陈",
     },
     methods: {},
     router:router   //设置路由对象 ES6语法 可以直接写router,
   });
   ```

5. ##### 在页面中显示路由的组件

   ```html
   <!--显示路由的组件  必须要写的-->
   <router-view></router-view>
   ```

6. ##### 根据连接切换路由

   * 用a标签的话==必须加#==  这样vue才知道这是哈希路由

#### 13.4 router-link标签切换路由

* 路径切换路由

  ```js
  <router-link :to="{path:'/login'}"> 登录router-link标签-对象 </router-link>
  <router-link :to="{path:'/reg'}"> 注册router-link标签-对象 </router-link>
  //路由规则对象
  const router = new VueRouter({
      routes:[
          {path:'/login', component:login},
          {path:'/reg', component:reg},
      ]
  })
  ```

* ==名称切换 命名切换！ 推荐使用==

  ```js
  <!--名称切换路由-->
  <router-link :to="{name:'Login'}">登录router-link标签-名称</router-link>
  <router-link :to="{name:'Reg'}">注册router-link标签-名称</router-link>
  //路由规则对象
  const router = new VueRouter({
      routes:[
          {path:'/login', component:login,name:'Login'},
          {path:'/reg', component:reg, name:'Reg'},
      ]
  })
  ```

`作用:用来替换我们在切换路由时使用a标签切换路由`

`好处:就是可以自动给路由路径加入#不需要手动加入`

```html
<router-link to="/login" tag="button">我要登录</router-link>
<router-link to="/register" tag="button">点我注册</router-link>
```

```markdown
# 总结:
	1.router-link 用来替换使用a标签实现路由切换 好处是不需要书写#号直接书写路由路径
	2.router-link to属性用来书写路由路径   tag属性:用来将router-link渲染成指定的标签
```

#### 13.4 在Js代码中切换路由

```js
<button @click="login">用户登录</button>
<button @click="reg">用户注册</button>


//Vue实例 根组件
const app = new Vue({
    el: "#app",
    data: {
        msg: "vue router 切换路由",
    },
    methods: {
        login(){
            ///『发送axios请求完成登录响应回来之后切换路由到主页
            // this.$route object当前路由对象   this.$router vueRouter代表路由管理器对象
            this.$router.push({name:'Login'});
        },
        reg(){
            this.$router.push({name:'Reg'});
        }
    },
    router,
});

```

* 以上可以实现js切换路由，但是多次点击会报错，添加下列配置可以拟制错误

```js
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
```

总结：

![image-20220424150804100](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202204241508428.png)



#### 13.5 默认路由

`作用:用来在第一次进入界面是显示一个默认的组件`

```js
const router = new VueRouter({
  routes:[
    //{ path:'/',component:login},
    { path:'/',redirect:'/login'},  //redirect: 用来当访问的是默认路由 "/" 时 跳转到指定的路由展示  推荐使用
    { path:'/login', component:login},
    { path:'/register', component:register},
  ]
});
```

#### 13.6 路由中参数传递

- ==第一种方式传递参数 传统方式==

1. 通过?号形式拼接参数

   ```html
    <router-link to="/login?id=21&name=zhangsan">我要登录</router-link>
   ```

2. 组件中获取参数  ==this.$route.query.name==

   ```js
   const login = {
       template:'<h1>用户登录</h1>',
       data(){return {}},
       methods:{},
       //在组件的生命周期函数中接收
       created(){ console.log("=============>"+this.$route.query.id+"======>"+this.$route.query.name);
       }
   };
   ```

- ==第二种方式传递参数 restful==

1. ==通过使用路径方式传递参数==

   ```js
   //第一种方式
   <router-link to="/register/24/张三">我要注册</router-link>
   
   //第二种方式
   <router-link :to="{name:'Reg',params:{id:233,name:'jjgg'}} "> 用户登录router-link </router-link>
   var router = new VueRouter({
     routes:[
       {path:'/register/:id/:name',component:register}   //定义路径中获取对应参数
     ] 
   });
   ```

2. 组件中获取参数   ==this.$route.params.id==

   ```js
   const register = {
     template:'<h1>用户注册{{ $route.params.name }}</h1>',
     //在组件的生命周期函数中接收
     created(){
       console.log("注册组件中id:   "+this.$route.params.id+this.$route.params.name);
     }
   };
   ```

3. ==JS代码传递参数==

   ```js
   this.$router.push({name: ’ 路由的name ', params: {key: value}})
   ```

#### 13.7 嵌套路由

**==建议看vue-day04-10.vue router 的基本使用之嵌套路由中的代码==**

1. ##### 声明最外层和内层路由

   ```js
   <template id="product">
       <div>
           <h1>商品管理</h1>
           <router-link to="/product/add">商品添加</router-link>
           <router-link to="/product/edit">商品编辑</router-link>
           <router-view></router-view>
       </div>
   </template>
   
   //声明组件模板
   const product={
     template:'#product'
   };
   
   const add = {
     template:'<h4>商品添加</h4>'
   };
   
   const edit = {
     template:'<h4>商品编辑</h4>'
   };
   ```
   
2. ##### 创建路由对象含有嵌套路由

   ```js
   const router = new VueRouter({
           routes:[
               {
                   path:'/product',
                   component:product,
                   children:[//嵌套子组件路由 注意:嵌套路由中子路由不能使用/开头   访问子路由 /users/useradd
                       {path:'add',component: add},
                       {path:'edit',component: edit},
                   ]
               },
           ]
       });
   ```

3. ##### 注册路由对象

   ```js
   const app = new Vue({
       el: "#app",
       data: {},
       methods: {},
       router,//定义路由对象
   });
   ```

4. 测试路由

   ```html
   <router-link to="/product">商品管理</router-link>
   <router-view></router-view>
   ```

---

## 14. Vue CLI 脚手架

### 14.1 什么是CLI

命令行界面（英语：command-line interface，缩写：*CLI*）是在图形用户界面得到普及之前使用最为广泛的用户界面，它通常不支持鼠标，用户通过键盘输入指令，计算机接收到指令后，予以执行。也有人称之为字符用户界面（CUI）

### 14.2 什么是Vue CLI  <====>  (maven 项目构建工具)

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统。 使用Vue 脚手架之后我们开发的页面将是一个完整系统(项目)。 前端系统

### 14.3 Vue CLI优势

- 通过 `vue-cli` 搭建交互式的项目脚手架。       
- 通过 `@vue/cli` + `@vue/cli-service-global` 快速开始零配置原型开发   
- 一个运行时依赖 (`@vue/cli-service`)，该依赖：
  - 可升级;
  - 基于 webpack 构建，并带有合理的默认配置；   webpack 前端打包工具  index.html   vue组件  用户组件   学生组件  ..... 路由   dist目录
  - 可以通过项目内的配置文件进行配置；      cli 项目配置文件  添加
  - 可以通过插件进行扩展。                            cli 项目里
- ==一个丰富的官方插件集合，集成了前端生态中最好的工具==。 
  - webpack可以es6语法 转为 es5语法
  - nodejs 服务器(tomcat java) -天生支持热部署插件 
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面 **vue cli 3.x支持**

### 14.4 Vue CLI安装

##### 1. 环境准备

```markdown
# 1.下载nodejs
	http://nodejs.cn/download/
		windows系统:   .msi  安装包(exe)指定安装位置   .zip(压缩包)直接解压缩指定目录
		mac os 系统:   .pkg  安装包格式自动配置环境变量  .tar.gz(压缩包)解压缩安装到指定名

# 2.配置nodejs环境变量
	1.windows系统:
	 	计算上右键属性---->  高级属性 ---->环境变量 添加如下配置:
		NODE_HOME=  nodejs安装目录
        PATH    = xxxx;%NODE_HOME%
    2.macos 系统
    	推荐使用.pkg安装直接配置node环境

# 3.验证nodejs环境是否成功
	node -v 

# 4.npm介绍
	node package mangager   nodejs包管理工具       前端主流技术  npm 进行统一管理
	maven 管理java后端依赖    远程仓库(中心仓库)      阿里云镜像
	npm   管理前端系统依赖     远程仓库(中心仓库)      配置淘宝镜像

# 5.配置淘宝镜像
	  npm config set registry https://registry.npm.taobao.org
	  npm config get registry

# 6.配置npm下载依赖位置
	 windows:
		npm config set cache "H:\nodereps\npm-cache"
		npm config set prefix "H:\nodereps\npm_global"
	 mac os:
	 	npm config set cache "/Users/chenyannan/dev/nodereps"
		npm config set prefix "/Users/chenyannan/dev/nodereps"

# 7.验证nodejs环境配置
	npm config ls
    ; userconfig /Users/chenyannan/.npmrc
    cache = "/Users/chenyannan/dev/nodereps"
    prefix = "/Users/chenyannan/dev/nodereps"
    registry = "https://registry.npm.taobao.org/"
```

##### 2.安装脚手架

```markdown
# 0.卸载脚手架
	npm uninstall -g @vue/cli  //卸载3.x版本脚手架
	npm uninstall -g vue-cli  //卸载2.x版本脚手架

# 1.Vue Cli官方网站
	https://cli.vuejs.org/zh/guide/

# 2.安装vue Cli
	npm install -g vue-cli

```

##### 3.第一个vue脚手架项目

* ==看着资料的图片 上的步骤 更好一些==
* node_modules不用提交 里面都是js文件！  直接进入项目目录执行==npm install====就可以通过package.json进行安装==

* 一个组件就包含template模板、script js代码、style css样式

* 以后就是开发一个个的组件，然后改路由，在App.vue添加router-link



```markdown
# 0.配置nodejs本地仓库环境变量
	H:\nodereps\npm_global添加到path
	vue init验证
# 1.创建vue脚手架第一个项目
	vue init webpack 项目名
		vue-router 选择y
		其它都选择  n
# 2.创建第一个项目
	hello     ------------->项目名
    -build  ------------->用来使用webpack打包使用build依赖  构建一些依赖文件
    -config ------------->用来做整个项目配置目录   主要用来对 开发 测试 环境进行配置
    -node_modules  ------>用来管理项目中使用依赖
    -src					 ------>用来书写vue的源代码[重点]
    	-assets      ------>用来存放静态资源 [重点]
      	-components   ------>用来书写Vue组件 [重点]
      	-router			 ------>用来配置项目中路由[重点]
      	-App.vue      ------>项目中根组件[重点]
      	-main.js      ------>项目中主入口[重点] new Vue()
    -static        ------>其它静态
    -.babelrc      ------> 将es6语法转为es5运行
    -.editorconfig ------> 项目编辑配置
    -.gitignore    ------> git版本控制忽略文件
    -.postcssrc.js ------> 源码相关js
    -index.html    ------> 项目主页 单页面！！
    -package.json  ------> 类似与pom.xml 依赖管理  jquery 不建议手动修改
    -package-lock.json ----> 对package.json加锁
    -README.md         ----> 项目说明文件

# 3.如何运行在项目的根目录中执行
	npm run dev

# 4.如何访问项目
	http://localhost:8081    

# 5.Vue Cli中项目开发方式
	 注意: 一切皆组件   一个组件中   js代码  html代码  css样式
	 	1. VueCli开发方式是在项目中开发一个一个组件对应一个业务功能模块,日后可以将多个组件组合到一起形成一个前端系统
	 	2. 日后在使用vue Cli进行开发时不再书写html,编写的是一个个组件(组件后缀.vue结尾的文件),日后打包时vue cli会将组件编译成运行的html文件	  
```



##### 4.如何开发Vue脚手架

`注意:在Vue cli 中一切皆组件`

------

## 15.在脚手架中使用axios

* 当执行命令npm install axios 会联网将axios.js下载到node_modules文件夹中，而且会将依赖写入到package.json中
* 

### 15.1 安装axios

```markdown
# 1.安装axios
	npm install axios --save

# 2.配置main.js中引入axios
	import axios from 'axios';
	Vue.prototype.$http=axios;

# 3.使用axios
	在需要发送异步请求的位置:this.$http.get("url").then((res)=>{}) this.$http.post("url").then((res)=>{})
```

---

## 16.Vue Cli脚手架项目部署

```markdown
# 1.在项目根目录中执行如下命令:
	npm run build
	注意:vue脚手架打包的项目必须在服务器上运行不能直接双击运行

# 2.打包之后当前项目中变化
	在打包之后项目中出现dist目录,dist目录就是vue脚手架项目生产目录或者说是直接部署目录
```

----

## 17.VueX 状态管理

### 17.1 简介&安装

```markdown
# 1.简介
- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

# 2.安装vuex
-	npm install vuex --save

# 3.创建vue cli中创建store文件夹
```

![image-20201226214407298](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-mdfile/202209142200277.png)

```markdown
# 4.在stroe中创建index.js文件
```

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
//1.安装vuex
Vue.use(Vuex);
//2.创建store对象
const store = new Vuex.Store({
  
});
//3.暴露store对象
export default store;
```

```markdown
# 5.在main.js中引入stroe并注册到vue实例
```

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./stroe";//引入store
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,//注册状态
})
```

### 17.2 state属性

```markdown
# 1.state属性
- 作用: 用来全局定义一些共享的数据状态

# 2.语法
    const store = new Vuex.Store({
    	state:{
    		counter:0,//定义共享状态
    	},
    }

# 3.使用
	 {{$store.state.counter}} ===> {{this.$store.state.counter}}
```

### 17.3 mutations 属性

```markdown
# 1.mutations 属性
- 作用: 用来定义对共享的数据修改的一系列函数

# 2.语法
    const store = new Vuex.Store({
      state:{
        counter:0,//定义共享状态
      },
      mutations:{
        //增加
        increment(state){
          state.counter++
        },
        //减小
        decrement(state){
          state.counter--
        }
      }
    });

# 3.使用
	this.$store.commit('decrement');
	this.$store.commit('increment');

# 4.mutations传递参数

- a.定义带有参数的函数
			mutations:{
     		//addCount 参数1:state 对象 参数2:自定义参数
     		addCount(state,counter){
        	console.log(counter);
        	return  state.counter += counter ;
      	}
    	}
- b.调用时传递参数
		this.$store.commit('addCount',11);
```

### 17.4 getters 属性

```markdown
# 1.getters 属性
- 官方:  允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据	
	它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
- 作用: 用来定义对共享的数据的计算相关的一系列函数 相当于 computed 属性 会对结果进行缓存

# 2.语法
	  getters:{
      //平方
      mathSqrts(state){
        console.log("--------");
        return state.counter*state.counter;
      },
      //乘以一个数字
      mathSqrtsNumber(state,getters){
        return getters.mathSqrts*3;
      },
      //传递参数
      mathSqrtsNumbers(state,getters){
        return function (number){
          return  number;
        }
      }
    }

# 3.使用
-		1.{{$store.getters.mathSqrts}}
-   2.{{$store.getters.mathSqrtsNumber}}
-   3.{{$store.getters.mathSqrtsNumbers(3)}}
```

----



# Vue3 

官网学习：https://cn.vuejs.org/guide/introduction.html#what-is-vue





​        























































































































































































































































































































































































































































































































































































































































































































































































