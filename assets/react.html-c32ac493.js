import{_ as i,W as l,X as p,Y as n,Z as s,$ as t,a0 as a,C as o}from"./framework-715d567f.js";const c={},r=a(`<h1 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> Hooks</h1><p>1.useEffect是每次组件<strong>render完后</strong><mark>判断依赖</mark>并执行</p><ul><li>依赖项为[]，仅第一次render后执行</li><li>依赖项数组有值，第一次render后以及之后的render完依赖项发生变化了才执行</li></ul><ol start="2"><li></li></ol><h1 id="补充知识" tabindex="-1"><a class="header-anchor" href="#补充知识" aria-hidden="true">#</a> 补充知识</h1><p>1.解构写法 const {key1} = this.refs；key1.value 等同于 this.refs.key1.value ；使用简便，写法简单</p><p>2.回调函数没有this，里面如果用到了this要去函数外层函数中找；</p><p>3.模板字符串：</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>showInfo = ()=&gt;{
    const {username, password} = this
    //模板字符串
    alert(\`你输入的用户名是\${username.value},输入的密码是\${password.value}\`)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.event传递</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>//展示右侧输入框的数据
//发生事件的事件源和要使用的数据是同一个节点  就能通过传递的event参数拿到节点的值
showData2 = (event)&gt;{
    alert(event.target.value);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.回调函数调用</p><p><strong>saveFormData是一个函数时，</strong></p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>saveFormData = ()=&gt;{
    console.log(&#39;@@&#39;)
}

//写法1：this.saveFormData是一个函数，将函数作为onChange整体的回调，这样onChange触发一次就会调用一次this.saveFormData函数
用户名：&lt;input onChange={this.saveFormData} type=&quot;text&quot; name=&quot;username&quot;/&gt;

//写法2：this.saveFormData(&#39;username&#39;)会自己调用一次，返回这个saveFormData函数的值
用户名：&lt;input onChange={this.saveFormData(&#39;username&#39;)} type=&quot;text&quot; name=&quot;username&quot;/&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>saveFormData返回的值是一个函数时，</strong></p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>saveFormData = (dataType)=&gt;{
    return (event)=&gt;{
        this.setState({[dataType]:event.target.value})
    }
}

//this.saveFormData(&#39;username&#39;)会自己调用一次，但是返回的就是一个函数了，onChange回调的就是saveFormData里面return的那个函数
用户名：&lt;input onChange={this.saveFormData(&#39;username&#39;)} type=&quot;text&quot; name=&quot;username&quot;/&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本质上就是要给onClick事件的回调 给到一个<strong>函数</strong>！！</p><p>6.如果A类继承了B类，且A类中写了构造器，那么A类构造器中的<strong>super是必须要调用</strong>的</p><p>7.类中所定义的方法，都放在了类的原型对象上，供实例去使用</p><p>8.展开运算符</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">...</span>arr1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//展开一个数组</span>
<span class="token keyword">let</span> arr3 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>arr1<span class="token punctuation">,</span><span class="token operator">...</span>arr2<span class="token punctuation">]</span><span class="token comment">//连接数组</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr3<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//在函数中使用</span>
<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>numbers</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//数组自带的方法reduce</span>
    <span class="token keyword">return</span> numbers<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">preValue<span class="token punctuation">,</span>currentValue</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> preValue <span class="token operator">+</span> currentValue
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//构造字面量对象时使用展开语法</span>
<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;tom&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">18</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> person2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>person<span class="token punctuation">}</span> <span class="token comment">//使用{}可以复制一个对象</span>
<span class="token comment">//console.log(...person); //报错，展开运算符不能展开对象</span>
person<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;jerry&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person2<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//合并  复制对象时修改了其中的属性</span>
<span class="token keyword">let</span> person3 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>person<span class="token punctuation">,</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;jack&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">address</span><span class="token operator">:</span><span class="token string">&quot;地球&quot;</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="react视频学习" tabindex="-1"><a class="header-anchor" href="#react视频学习" aria-hidden="true">#</a> React视频学习</h1><h2 id="jsx语法" tabindex="-1"><a class="header-anchor" href="#jsx语法" aria-hidden="true">#</a> jsx语法</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>jsx语法规则：
   1.定义虚拟DOM时，不要写引号
   2.标签中混入JS表达式时要用{}，{}里面不能写语句，只能写表达式
   3.样式的类名指定不要用class，要用className。
   4.内联样式，要用style={{key:value}}的形式去写。  针对VDOM而言
   5.只有一个根标签  用一个div包裹起来            针对VDOM而言
   6.标签必须闭合
   7.标签首字母  jsx向html转化时：
         (1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
         (2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组件定义" tabindex="-1"><a class="header-anchor" href="#组件定义" aria-hidden="true">#</a> 组件定义</h2><h3 id="函数式组件" tabindex="-1"><a class="header-anchor" href="#函数式组件" aria-hidden="true">#</a> 函数式组件</h3><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>&lt;script type=&quot;text/babel&quot;&gt;
    //1.创建函数式组件
    function MyComponent(){
        console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
        return &lt;h2&gt;我是用函数定义的组件(适用于【简单组件】的定义)&lt;/h2&gt;
    }
    //2.渲染组件到页面
    ReactDOM.render(&lt;MyComponent/&gt;,document.getElementById(&#39;test&#39;))
    /* 
    执行了ReactDOM.render(&lt;MyComponent/&gt;.......之后，发生了什么？
    1.React解析组件标签，找到了MyComponent组件。
    2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类式组件" tabindex="-1"><a class="header-anchor" href="#类式组件" aria-hidden="true">#</a> 类式组件</h3><p>render中的this是组件的实例对象</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>&lt;script type=&quot;text/babel&quot;&gt;
    //1.创建类式组件
    class MyComponent extends React.Component {
        render(){
            //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
            //render中的this是谁？—— MyComponent的实例对象 &lt;=&gt; MyComponent组件实例对象。
            console.log(&#39;render中的this:&#39;,this);
            return &lt;h2&gt;我是用类定义的组件(适用于【复杂组件】的定义)&lt;/h2&gt;
        }
    }
    //2.渲染组件到页面
    ReactDOM.render(&lt;MyComponent/&gt;,document.getElementById(&#39;test&#39;))
    /* 
    执行了ReactDOM.render(&lt;MyComponent/&gt;.......之后，发生了什么？
    1.React解析组件标签，找到了MyComponent组件。
    2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
    3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> state</h2><h3 id="理解" tabindex="-1"><a class="header-anchor" href="#理解" aria-hidden="true">#</a> 理解</h3><ol><li><p>state是<strong>组件对象</strong>最重要的属性, 值是对象(可以包含多个key-value的组合)</p></li><li><p><mark>组件被称为&quot;状态机&quot;,，通过更新组件的state来更新对应的页面显示(重新渲染组件)</mark></p></li></ol><p><strong>注意点</strong></p><ol><li>组件中render方法中的this为组件实例对象</li><li>组件自定义的方法中this为undefined，如何解决？ a) 强制绑定this: 通过函数对象的bind() b) 箭头函数</li><li>状态数据，不能直接修改或更新</li></ol><h3 id="写法" tabindex="-1"><a class="header-anchor" href="#写法" aria-hidden="true">#</a> 写法</h3><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>&lt;script type=&quot;text/babel&quot;&gt;
    //1.创建组件
    class Weather extends React.Component {
        //构造器调用几次？ ———— 1次
        constructor(props) {
            console.log(&quot;constructor&quot;);
            super(props);
            //初始化状态
            this.state = { isHot: false, wind: &quot;微风&quot; };
            //解决changeWeather中this指向问题
            this.changeWeather = this.changeWeather.bind(this);
        }

        //render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
        render() {
            //render是放在哪里的？———— Weather的原型对象上，供实例使用。
            console.log(&quot;render&quot;);
            //读取状态
            const { isHot, wind } = this.state;
            return (
                &lt;h1 onClick={this.changeWeather}&gt;
                    今天天气很{isHot ? &quot;炎热&quot; : &quot;凉爽&quot;}，{wind}
                &lt;/h1&gt;
            );
        }

        //changeWeather调用几次？ ———— 点几次调几次
        changeWeather() {
            //changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
            //由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
            //类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined

            console.log(&quot;changeWeather&quot;);
            //获取原来的isHot值
            const isHot = this.state.isHot;
            //严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
            this.setState({ isHot: !isHot });
            console.log(this);

            //严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
            //this.state.isHot = !isHot //这是错误的写法
        }
    }
    //2.渲染组件到页面
    ReactDOM.render(&lt;Weather /&gt;, document.getElementById(&quot;test&quot;));
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="简洁写法" tabindex="-1"><a class="header-anchor" href="#简洁写法" aria-hidden="true">#</a> 简洁写法</h3><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>class Weather extends React.Component {
    //初始化状态
    state = { isHot: false, wind: &quot;微风&quot; };

    render() {
        const { isHot, wind } = this.state;
        return (
            &lt;h1 onClick={this.changeWeather}&gt;
                今天天气很{isHot ? &quot;炎热&quot; : &quot;凉爽&quot;}，{wind}
            &lt;/h1&gt;
        );
    }

    //自定义方法————要用赋值语句的形式+箭头函数
    changeWeather = () =&gt; {
        const isHot = this.state.isHot;
        this.setState({ isHot: !isHot });
    };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> props</h2><h3 id="理解-1" tabindex="-1"><a class="header-anchor" href="#理解-1" aria-hidden="true">#</a> 理解</h3><ol><li><p>每个<strong>组件对象</strong>都会有props(properties的简写)属性</p></li><li><p>组件标签的所有属性都保存在props中</p></li></ol><p><strong>注意点</strong></p><ol><li><p>通过标签属性从组件外向组件内传递变化的数据</p></li><li><p>注意: 组件内部不要修改props数据（prop）</p></li></ol><h3 id="写法-1" tabindex="-1"><a class="header-anchor" href="#写法-1" aria-hidden="true">#</a> 写法</h3><p>props基本使用、对props限制</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>//创建组件
class Person extends React.Component{
    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        //props是只读的
        //this.props.name = &#39;jack&#39; //此行代码会报错，因为props是只读的
        return (
            &lt;ul&gt;
                &lt;li&gt;姓名：{name}&lt;/li&gt;
                &lt;li&gt;性别：{sex}&lt;/li&gt;
                &lt;li&gt;年龄：{age+1}&lt;/li&gt;
            &lt;/ul&gt;
        )
    }
}
//对标签属性进行类型、必要性的限制
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
    speak:PropTypes.func,//限制speak为函数
}
//指定默认标签属性值
Person.defaultProps = {
    sex:&#39;男&#39;,//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(&lt;Person name={100} speak={speak}/&gt;,document.getElementById(&#39;test1&#39;))
ReactDOM.render(&lt;Person name=&quot;tom&quot; age={18} sex=&quot;女&quot;/&gt;,document.getElementById(&#39;test2&#39;))

const p = {name:&#39;老刘&#39;,age:18,sex:&#39;女&#39;}
ReactDOM.render(&lt;Person {...p}/&gt;,document.getElementById(&#39;test3&#39;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="简洁写法-1" tabindex="-1"><a class="header-anchor" href="#简洁写法-1" aria-hidden="true">#</a> 简洁写法</h3><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>//创建组件
class Person extends React.Component{
    //类中的构造器能省略就省略
    constructor(props){
        // 构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
        // console.log(props);
        // 也可以不传递props
        super(props)
        console.log(&#39;constructor&#39;,this.props);
    }

    //对标签属性进行类型、必要性的限制
    static propTypes = {
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        sex:PropTypes.string,//限制sex为字符串
        age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    static defaultProps = {
        sex:&#39;男&#39;,//sex默认值为男
        age:18 //age默认值为18
    }

    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        // props是只读的
        // this.props.name = &#39;jack&#39; //此行代码会报错，因为props是只读的
        return (
            &lt;ul&gt;
                &lt;li&gt;姓名：{name}&lt;/li&gt;
                &lt;li&gt;性别：{sex}&lt;/li&gt;
                &lt;li&gt;年龄：{age+1}&lt;/li&gt;
            &lt;/ul&gt;
        )
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="refs" tabindex="-1"><a class="header-anchor" href="#refs" aria-hidden="true">#</a> refs</h2><h3 id="理解-2" tabindex="-1"><a class="header-anchor" href="#理解-2" aria-hidden="true">#</a> 理解</h3><ul><li><p>refs理解为打标识，组件内的标签可以定义ref属性来标识自己，<strong>方便别人拿到该ref所在的节点或节点相关值</strong></p></li><li><p>refs为React组件实例对象的主属性，用来收集ref</p></li></ul><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/babel<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    class Demo extends React.Component {
        showData = () =&gt; {
            console.log(this);
        };
        render() {
            return (
                &lt;div&gt;
                    &lt;input ref=&#39;input1&#39; type=&quot;text&quot; palceholder=&quot;点击按钮&quot; /&gt;
                    &lt;button onClick={this.showData}&gt;点击左侧按钮&lt;/button&gt;
                    &lt;input type=&quot;text&quot; palceholder=&quot;点击按钮失去焦点提示&quot; /&gt;
                &lt;/div&gt;
            );
        }
    }
    ReactDOM.render(&lt;Demo /&gt;, document.getElementById(&quot;test&quot;));
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>key：value 形式，key是自定义的ref名称，value是DOM节点</li></ul><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201347852.png" alt="image-20230306101554822" loading="lazy"></p><h3 id="写法-2" tabindex="-1"><a class="header-anchor" href="#写法-2" aria-hidden="true">#</a> 写法</h3><h4 id="字符串类型" tabindex="-1"><a class="header-anchor" href="#字符串类型" aria-hidden="true">#</a> 字符串类型</h4><p>字符串类型 refs 存在效率问题，react不推荐使用</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=&gt;{
        const {input1} = this.refs
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=&gt;{
        const {input2} = this.refs
        alert(input2.value)
    }
    render(){
        return(
            &lt;div&gt;
                &lt;input ref=&quot;input1&quot; type=&quot;text&quot; placeholder=&quot;点击按钮提示数据&quot;/&gt;&amp;nbsp;
                &lt;button onClick={this.showData}&gt;点我提示左侧的数据&lt;/button&gt;&amp;nbsp;
                &lt;input ref=&quot;input2&quot; onBlur={this.showData2} type=&quot;text&quot; placeholder=&quot;失去焦点提示数据&quot;/&gt;
            &lt;/div&gt;
        )
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="回调函数类型" tabindex="-1"><a class="header-anchor" href="#回调函数类型" aria-hidden="true">#</a> 回调函数类型</h4><p>直接将ref所在的<code>标签节点</code>作为回调函数的参数</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=&gt;{
        const {input1} = this
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=&gt;{
        const {input2} = this
        alert(input2.value)
    }
    //input1就是所在的input节点！
    render(){
        return(
            &lt;div&gt;
                &lt;input ref={c =&gt; this.input1 = c } type=&quot;text&quot; placeholder=&quot;点击按钮提示数据&quot;/&gt;&amp;nbsp;
                &lt;button onClick={this.showData}&gt;点我提示左侧的数据&lt;/button&gt;&amp;nbsp;
                &lt;input ref={c =&gt; this.input2 = c } onBlur={this.showData2}  type=&quot;text&quot; placeholder=&quot;失去焦点提示数据&quot;/&gt;&amp;nbsp;
            &lt;/div&gt;
        )
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,62),u={href:"https://react.docschina.org/docs/refs-and-the-dom.html",target:"_blank",rel:"noopener noreferrer"},d=a(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>关于回调 refs 的说明

如果 <span class="token code-snippet code keyword">\`ref\`</span> 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 <span class="token code-snippet code keyword">\`null\`</span>，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。


<span class="token code-snippet code keyword">\`更新过程\`</span>即再次render渲染的过程，回调函数就会执行两次
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="createref类型-react推荐" tabindex="-1"><a class="header-anchor" href="#createref类型-react推荐" aria-hidden="true">#</a> createRef类型 React推荐</h4><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>//创建组件
class Demo extends React.Component{
    /* 
		React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
	 */
    myRef = React.createRef()
    //要接收额外的  就定义出新的名字
    myRef2 = React.createRef()
    //展示左侧输入框的数据
    showData = ()=&gt;{
        alert(this.myRef.current.value);
    }
    //展示右侧输入框的数据
    showData2 = ()=&gt;{
        alert(this.myRef2.current.value);
    }
    render(){
        return(
            &lt;div&gt;
                &lt;input ref={this.myRef} type=&quot;text&quot; placeholder=&quot;点击按钮提示数据&quot;/&gt;&amp;nbsp;
                &lt;button onClick={this.showData}&gt;点我提示左侧的数据&lt;/button&gt;&amp;nbsp;
                &lt;input onBlur={this.showData2} ref={this.myRef2} type=&quot;text&quot; placeholder=&quot;失去焦点提示数据&quot;/&gt;&amp;nbsp;
            &lt;/div&gt;
        )
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>key是current，value是ref所在的节点</strong></p><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201122386.png" alt="image-20230320112208176" loading="lazy"></p><h2 id="事件处理" tabindex="-1"><a class="header-anchor" href="#事件处理" aria-hidden="true">#</a> 事件处理</h2><p>(1).通过onXxx属性指定事件处理函数(注意大小写)</p><p>​ a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 —————— 为了更好的兼容性</p><p>​ b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效</p><p>(2).通过event.target得到发生事件的DOM元素对象 ——————————不要过度使用ref</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//展示右侧输入框的数据</span>
<span class="token comment">//发生事件的事件源和要使用的数据是同一个节点  就能通过传递的event参数拿到节点的值</span>
showData2 <span class="token operator">=</span> <span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="非受控组件" tabindex="-1"><a class="header-anchor" href="#非受控组件" aria-hidden="true">#</a> 非受控组件</h2><p>概念：所有输入类（单选，多选，输入框）的DOM，在组件内都是现用现取</p><p>理解：通过ref将节点存储，然后使用的时候通过.value取到值</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>//创建组件
class Login extends React.Component{
    handleSubmit = (event)=&gt;{
        event.preventDefault() //阻止表单提交
        const {username,password} = this
        alert(\`你输入的用户名是：\${username.value},你输入的密码是：\${password.value}\`)
    }
    render(){
        return(
            &lt;form onSubmit={this.handleSubmit}&gt;
                用户名：&lt;input ref={c =&gt; this.username = c} type=&quot;text&quot; name=&quot;username&quot;/&gt;
                密码：&lt;input ref={c =&gt; this.password = c} type=&quot;password&quot; name=&quot;password&quot;/&gt;
                &lt;button&gt;登录&lt;/button&gt;
            &lt;/form&gt;
        )
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="受控组件-推荐" tabindex="-1"><a class="header-anchor" href="#受控组件-推荐" aria-hidden="true">#</a> 受控组件 推荐</h2><p>理解：所有输入类（单选，多选，输入框）的DOM，随着输入，将数据维护到状态state中，等需要用的时候直接从状态中取出来。 一句话，<strong>随着输入要维护状态就是受控</strong></p><p>因为这种写法没有ref，所以推荐受控组件的写法</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>//创建组件
class Login extends React.Component{

    //初始化状态
    state = {
        username:&#39;&#39;, //用户名
        password:&#39;&#39; //密码
    }

    //保存用户名到状态中
    saveUsername = (event)=&gt;{
        this.setState({username:event.target.value})
    }

    //保存密码到状态中
    savePassword = (event)=&gt;{
        this.setState({password:event.target.value})
    }

    //表单提交的回调
    handleSubmit = (event)=&gt;{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(\`你输入的用户名是：\${username},你输入的密码是：\${password}\`)
    }

    render(){
        return(
            &lt;form onSubmit={this.handleSubmit}&gt;
                用户名：&lt;input onChange={this.saveUsername} type=&quot;text&quot; name=&quot;username&quot;/&gt;
                密码：&lt;input onChange={this.savePassword} type=&quot;password&quot; name=&quot;password&quot;/&gt;
                &lt;button&gt;登录&lt;/button&gt;
            &lt;/form&gt;
        )
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高阶函数" tabindex="-1"><a class="header-anchor" href="#高阶函数" aria-hidden="true">#</a> 高阶函数</h2><p>一句话：<strong>接收一个函数或者返回一个函数</strong></p><p>高阶函数：如果一个函数符合下面2个规范中的<code>任何一个</code>，那该函数就是高阶函数。</p><pre><code>1.若A函数，\`接收的参数是一个函数\`，那么A就可以称之为高阶函数。

2.若A函数，\`调用的返回值依然是一个函数\`，那么A就可以称之为高阶函数。
</code></pre><p>常见的高阶函数有：Promise、setTimeout、arr.map()等等</p><h2 id="函数柯里化" tabindex="-1"><a class="header-anchor" href="#函数柯里化" aria-hidden="true">#</a> 函数柯里化</h2><p>函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。</p><p>一句话，<strong>应用</strong>了高阶函数（返回值是函数）的方式</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>class Login extends React.Component{
    //初始化状态
    state = {
        username:&#39;&#39;, //用户名
        password:&#39;&#39; //密码
    }

    //保存表单数据到状态中
    //返回一个函数
    saveFormData = (dataType)=&gt;{
        return (event)=&gt;{
            this.setState({[dataType]:event.target.value})
        }
    }

    //表单提交的回调
    handleSubmit = (event)=&gt;{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(\`你输入的用户名是：\${username},你输入的密码是：\${password}\`)
    }
    render(){
        return(
            &lt;form onSubmit={this.handleSubmit}&gt;
                用户名：&lt;input onChange={this.saveFormData(&#39;username&#39;)} type=&quot;text&quot; name=&quot;username&quot;/&gt;
                密码：&lt;input onChange={this.saveFormData(&#39;password&#39;)} type=&quot;password&quot; name=&quot;password&quot;/&gt;
                &lt;button&gt;登录&lt;/button&gt;
            &lt;/form&gt;
        )
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期" aria-hidden="true">#</a> 生命周期</h2><p>挂载 mount，卸载 unmount</p><h3 id="生命周期流程图-旧" tabindex="-1"><a class="header-anchor" href="#生命周期流程图-旧" aria-hidden="true">#</a> 生命周期流程图--旧</h3><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201125661.png" alt="image-20230320112542601" loading="lazy"></p><p><strong>1.</strong> <strong>初始化阶段:</strong> 由ReactDOM.render()触发---初次渲染 组件初次挂载</p><ol><li><p><code>constructor()</code></p></li><li><p>componentWillMount()</p></li><li><p>render()</p></li><li><p>componentDidMount() <strong>常用</strong>，一般做些初始化事，开启定时器、发送网络请求、订阅请求</p></li></ol><p><strong>2.</strong> <strong>更新阶段:</strong> 由组件内部this.setSate()或父组件重新render触发</p><ol><li><p>shouldComponentUpdate() 默认返回true，<strong>当返回false时，更新阶段在此终止</strong> //控制组件更新的“阀门”</p></li><li><p>componentWillUpdate() //组件将要更新的钩子</p></li><li><p>render()</p></li><li><p>componentDidUpdate() //组件更新完毕的钩子</p></li></ol><p><strong>3.</strong> <strong>卸载组件:</strong> 由ReactDOM.unmountComponentAtNode()触发</p><ol><li>componentWillUnmount() <strong>常用</strong>，一般做些收尾事，关闭定时器、取消订阅消息</li></ol><h3 id="生命周期流程图-新" tabindex="-1"><a class="header-anchor" href="#生命周期流程图-新" aria-hidden="true">#</a> 生命周期流程图--新</h3><ol><li><p>初始化阶段: 由ReactDOM.render()触发---初次渲染 1. constructor() 2. getDerivedStateFromProps 3. render() 4. componentDidMount() ====&gt; 常用 一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息</p></li><li><p>更新阶段: 由组件内部this.setSate()或父组件重新render触发 1. getDerivedStateFromProps //若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps</p><pre><code>     ​    2. shouldComponentUpdate()
     
     ​    3. render()
     
     ​    4. getSnapshotBeforeUpdate    //在更新之前获取快照
     
     ​    5. componentDidUpdate()
</code></pre></li><li><p>卸载组件: 由ReactDOM.unmountComponentAtNode()触发 1. componentWillUnmount() ====&gt; 常用 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息</p></li></ol><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202310251037078.png" alt="image-20230320112626982" loading="lazy"></p><h1 id="react中文官网" tabindex="-1"><a class="header-anchor" href="#react中文官网" aria-hidden="true">#</a> React中文官网</h1><h2 id="_1-描述ui" tabindex="-1"><a class="header-anchor" href="#_1-描述ui" aria-hidden="true">#</a> 1.描述UI</h2><h3 id="_1-1-第一个组件" tabindex="-1"><a class="header-anchor" href="#_1-1-第一个组件" aria-hidden="true">#</a> 1.1 第一个组件</h3><ul><li><p>组件定义：React 允许你将标签、CSS 和 JavaScript 组合成自定义“组件”，即 <strong>应用程序中可复用的 UI 元素</strong></p></li><li><p><strong>React 组件是常规的 JavaScript 函数</strong>，但 <strong>组件的名称必须以大写字母开头</strong></p></li></ul><h3 id="_1-3-使用jsx书写标签语言" tabindex="-1"><a class="header-anchor" href="#_1-3-使用jsx书写标签语言" aria-hidden="true">#</a> 1.3 使用JSX书写标签语言</h3><ul><li><p>JSX：将标签引入 JavaScript。<strong>在 React 中，渲染逻辑和标签共同存在于同一个地方——组件</strong></p></li><li><p>每个 React 组件都是一个 JavaScript <strong>函数，它会返回一些标签</strong>，React 会将这些标签渲染到浏览器上。React 组件使用一种被称为 JSX 的语法扩展来描述这些标签</p></li></ul><blockquote><p>JSX规则</p></blockquote><p>规则1：只能返回一个根元素。如果想要在一个组件中包含多个元素，需要用<strong>一个父标签</strong>把它们包裹起来</p><p>规则2：所有标签必须闭合。</p><p>规则3：使用驼峰式命名法给属性命名。如<strong>className</strong></p><h3 id="_1-4-jsx中通过大括号使用javascript" tabindex="-1"><a class="header-anchor" href="#_1-4-jsx中通过大括号使用javascript" aria-hidden="true">#</a> 1.4 JSX中通过大括号使用javascript</h3><ul><li>使用引号传递字符串</li></ul><p>当你想把一个字符串属性传递给 JSX 时，把它放到单引号或双引号中；</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>export default function Avatar() {
  const avatar = &#39;https://i.imgur.com/7vQD0fPs.jpg&#39;;
  const description = &#39;Gregorio Y. Zara&#39;;
  return (
    &lt;img
      className=&quot;avatar&quot;
      src={avatar}
      alt={description}
    /&gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意 <code>className=&quot;avatar&quot;</code> 和 <code>src={avatar}</code> 之间的区别，<code>className=&quot;avatar&quot;</code> 指定了一个就叫 <code>&quot;avatar&quot;</code> 的使图片在样式上变圆的 CSS 类名，而 <code>src={avatar}</code> 这种写法会去读取 JavaScript 中 <code>avatar</code> 这个变量的值。这是因为大括号可以使你直接在标签中使用 JavaScript！</p><ul><li><p><mark>大括号内的任何 JavaScript 表达式都能正常运行</mark>；调用函数、引用变量、表达式计算</p></li><li><p>在 JSX 中，只能在以下两种场景中使用大括号：</p><ol><li>用作 JSX 标签内的<strong>文本</strong>：<code>&lt;h1&gt;{name}&#39;s To Do List&lt;/h1&gt;</code> 是有效的，但是 <code>&lt;{tag}&gt;Gregorio Y. Zara&#39;s To Do List&lt;/{tag}&gt;</code> 无效。</li><li>用作紧跟在 <code>=</code> 符号后的 <strong>属性</strong>：<code>src={avatar}</code> 会读取 <code>avatar</code> 变量，但是 <code>src=&quot;{avatar}&quot;</code> 只会传一个字符串 <code>{avatar}</code>。</li></ol></li><li><p>JSX 中传递对象。对象用{}表示，外面再包一个{}，就是双括号{</p></li></ul><h3 id="_1-8-保持组件纯粹" tabindex="-1"><a class="header-anchor" href="#_1-8-保持组件纯粹" aria-hidden="true">#</a> 1.8 保持组件纯粹</h3><ul><li>一个组件必须是纯粹的，就意味着： <ul><li><strong>只负责自己的任务。</strong> 它不会更改在该函数调用前就已存在的对象或变量。</li><li><strong>输入相同，则输出相同。</strong> 给定相同的输入，组件应该总是返回相同的 JSX。</li></ul></li><li>渲染随时可能发生，因此组件不应依赖于彼此的渲染顺序。</li><li>你不应该改变组件用于渲染的任何输入。这包括 props、state 和 context。通过 “设置” state 来更新界面，而不要改变预先存在的对象。</li><li>努力在你返回的 JSX 中表达你的组件逻辑。当你需要“改变事物”时，你通常希望在事件处理程序中进行。作为最后的手段，你可以使用 <code>useEffect</code></li><li>编写纯函数需要一些练习，但它充分释放了 React 范式的能力</li></ul><hr><blockquote><p>副作用定义：React 的渲染过程必须自始至终是纯粹的。组件应该只 <strong>返回</strong> 它们的 JSX，而不 <strong>改变</strong> 在渲染前，就已存在的任何对象或变量 — 这将会使它们变得不纯粹！</p></blockquote><ul><li>反例：<strong>多次调用这个组件会产生不同的 JSX</strong>！</li></ul><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">let</span> guest <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Cup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Bad: changing a preexisting variable!</span>
  guest <span class="token operator">=</span> guest <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Tea cup for guest #</span><span class="token punctuation">{</span>guest<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">TeaSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Cup</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Cup</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Cup</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>纯函数<strong>不会改变</strong>函数作用域外的变量、或在函数调用前创建的对象——这会使函数变得不纯粹</p></li><li><p>React 为何侧重于<strong>纯函数</strong>？</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>编写纯函数需要遵循一些习惯和规程。但它开启了绝妙的机遇：

<span class="token title important"><span class="token punctuation">##</span> 你的组件可以在不同的环境下运行 — 例如，在服务器上！由于它们针对相同的输入，总是返回相同的结果，因此一个组件可以满足多个用户请求。</span>

<span class="token title important"><span class="token punctuation">##</span> 你可以为那些输入未更改的组件来 跳过渲染，以提高性能。这是安全的做法，因为纯函数总是返回相同的结果，所以可以安全地缓存它们。</span>

<span class="token title important"><span class="token punctuation">##</span> 如果在渲染深层组件树的过程中，某些数据发生了变化，React 可以重新开始渲染，而不会浪费时间完成过时的渲染。纯粹性使得它随时可以安全地停止计算。</span>

我们正在构建的每个 React 新特性都利用到了纯函数。从数据获取到动画再到性能，保持组件的纯粹可以充分释放 React 范式的能力。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><hr><p>反例1 ：渲染前<strong>产生了副作用（修改 DOM）</strong>，第4行都没有className这个玩意~</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Clock</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> time <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> hours <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">getHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>hours <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> hours <span class="token operator">&lt;=</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;time&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">&#39;night&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;time&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">&#39;day&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>time<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span>time<span class="token punctuation">.</span><span class="token function">toLocaleTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正例1：传递的是className，没有修改DOM</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Clock</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> time <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> hours <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">getHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> className<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>hours <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> hours <span class="token operator">&lt;=</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    className <span class="token operator">=</span> <span class="token string">&#39;night&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    className <span class="token operator">=</span> <span class="token string">&#39;day&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>className<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span>time<span class="token punctuation">.</span><span class="token function">toLocaleTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>反例2：通过在接收到的 <code>stories</code> 数组（一个 prop！）上调用 <code>push</code> 方法，它正改变着一个在 <code>StoryTray</code> 渲染 <strong>之前</strong> 创建的对象；多次渲染后，stories都会不断增加元素，最后渲染的li标签越来越多</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">StoryTray</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> stories <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  stories<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;create&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">&#39;Create Story&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span>stories<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">story</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>story<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
          </span><span class="token punctuation">{</span>story<span class="token punctuation">.</span>label<span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
      <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正例2： push 之前创建一个 <strong>新</strong> 数组（通过复制现有数组）：</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">StoryTray</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> stories <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Copy the array!</span>
  <span class="token keyword">let</span> storiesToDisplay <span class="token operator">=</span> stories<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Does not affect the original array:</span>
  storiesToDisplay<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;create&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">&#39;Create Story&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span>storiesToDisplay<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">story</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>story<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
          </span><span class="token punctuation">{</span>story<span class="token punctuation">.</span>label<span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
      <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记住数组上的哪些操作会修改原始数组、哪些不会，这非常有帮助。例如，<code>push</code>、<code>pop</code>、<code>reverse</code> 和 <code>sort</code> 会改变原始数组，但 <code>slice</code>、<code>filter</code> 和 <code>map</code> 则会创建一个新数组。</p><h2 id="_2-添加交互" tabindex="-1"><a class="header-anchor" href="#_2-添加交互" aria-hidden="true">#</a> 2.添加交互</h2><ul><li>随时间变化的数据被称为状态（state）</li></ul><h3 id="_2-1-响应事件" tabindex="-1"><a class="header-anchor" href="#_2-1-响应事件" aria-hidden="true">#</a> 2.1 响应事件</h3><ul><li><p>可以通过将函数作为 prop 传递给元素如 <code>&lt;button&gt;</code> 来处理事件</p></li><li><p>事件处理函数在组件内部定义，所以它们<strong>可以访问 props</strong></p></li><li><p>从<strong>子组件显式调用事件处理函数</strong> prop 是事件传播的另一种优秀替代方案</p></li><li><p>事件处理函数接收一个 <strong>事件对象</strong> 作为唯一的参数。按照惯例，它通常被称为 <code>e</code> ，代表 “event”（事件）;</p><p>这个事件对象还允许你阻止传播。<strong>如果你想阻止一个事件到达父组件</strong>，调用 <code>e.stopPropagation()</code></p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>export default function ColorSwitch({
  onChangeColor
}) {
  return (
    &lt;button onClick={(e)=&gt;{
      e.stopPropagation();
      onChangeColor();
    }}&gt;
      改变颜色
    &lt;/button&gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_2-2-state-组件的记忆" tabindex="-1"><a class="header-anchor" href="#_2-2-state-组件的记忆" aria-hidden="true">#</a> 2.2 State：组件的记忆</h3><ul><li>更改局部变量不会触发渲染，一个函数中定义的变量就是局部变量了</li></ul><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>//这里的 [ 和 ] 语法称为数组解构，它允许你从数组中读取值。 useState 返回的数组总是正好有两项。
//index 是一个 state 变量，setIndex 是对应的 setter 函数
const [index, setIndex] = useState(0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>在 React 中，<code>useState</code> 以及任何其他以“<code>use</code>”开头的函数都被称为 <strong>Hook</strong></p></li><li><p><mark>Hook 是特殊的函数，只在 React[渲染时有效</mark></p></li><li><p>Hooks ——以 <code>use</code> 开头的函数——只能在组件或自定义 Hook的<mark>最顶层调用</mark></p></li><li><p>useState 的唯一参数是 state 变量的初始值</p></li></ul><hr><blockquote><p>每次你的组件渲染时，<code>useState</code> 都会给你一个包含两个值的数组：</p><ol><li><strong>state 变量</strong> (<code>index</code>) 会保存上次渲染的值。</li><li><strong>state setter 函数</strong> (<code>setIndex</code>) 可以更新 state 变量并触发 React 重新渲染组件</li></ol></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">[</span>index<span class="token punctuation">,</span> setIndex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li><strong>组件进行第一次渲染。</strong> 因为你将 <code>0</code> 作为 <code>index</code> 的初始值传递给 <code>useState</code>，它将返回 <code>[0, setIndex]</code>。 React 记住 <code>0</code> 是最新的 state 值。</li><li><strong>你更新了 state</strong>。当用户点击按钮时，它会调用 <code>setIndex(index + 1)</code>。 <code>index</code> 是 <code>0</code>，所以它是 <code>setIndex(1)</code>。这告诉 <mark>React 现在记住 index 是 1 并触发下一次渲染</mark>。</li><li><strong>组件进行第二次渲染</strong>。React 仍然看到 <code>useState(0)</code>，但是因为 React <em>记住</em> 了你将 <code>index</code> 设置为了 <code>1</code>，它将返回 <code>[1, setIndex]</code></li></ol><hr><blockquote><p>React 如何知道返回哪个 state？</p><p>你可能已经注意到，<code>useState</code> 在调用时没有任何关于它引用的是<em>哪个</em> state 变量的信息。没有传递给 <code>useState</code> 的“标识符”，它是如何知道要返回哪个 state 变量呢?</p></blockquote><blockquote><p>术语统一：useState(0)——&gt;这个就叫做Hook的一次调用</p></blockquote><p>1.在同一组件的每次渲染中，Hooks 都依托于一个稳定的调用顺序。<mark>只在顶层调用 Hooks的话，Hooks 将始终以相同的顺序被调用</mark></p><p>2.这两个变量都是闭包产生的，都可以被外部访问到</p><ul><li><p>componentHooks：数组，每一项是当前组件内部的state变量的值，按照useState()调用的上下顺序依次写入变量值</p></li><li><p>currentHookIndex：每一次渲染开始都是0，<strong>调用一次useState()，+1</strong>。<strong>记录的是每个state变量在componentHooks数组的索引位置</strong></p></li><li><p>setState：React会收集需要更新的变量值，一次性更新数组中的对应state变量值，并将currentHookIndex再次置为0。这样，下一次再调用useState()时，<strong>currentHookIndex又从0开始依次读取到新的变量值</strong>。</p></li></ul><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>let componentHooks = [];
let currentHookIndex = 0;

// useState 在 React 中是如何工作的（简化版）
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // 这不是第一次渲染
    // 所以 state pair 已经存在
    // 将其返回并为下一次 hook 的调用做准备
    currentHookIndex++;
    return pair;
  }

  // 这是我们第一次进行渲染
  // 所以新建一个 state pair 然后存储它
  pair = [initialState, setState];

  function setState(nextState) {
    // 当用户发起 state 的变更，
    // 把新的值放入 pair 中
    pair[0] = nextState;
    // 在渲染组件之前
    // 重置当前 Hook 的下标
    currentHookIndex = 0;
    render()；
  }

  // 存储这个 pair 用于将来的渲染
  // 并且为下一次 hook 的调用做准备
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

const render = () =&gt; ReactDOM.render(&lt;App /&gt;, rootElement);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,94),v={href:"https://blog.csdn.net/qq_30632003/article/details/124940407",target:"_blank",rel:"noopener noreferrer"},m=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&quot;src/tech/web_framework/react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">&quot;react-dom&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> rootElement <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _state <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">myUseState</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">initState</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> currentIndex <span class="token operator">=</span> index<span class="token punctuation">;</span>
  _state<span class="token punctuation">[</span>currentIndex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>_state<span class="token punctuation">[</span>currentIndex<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> initState <span class="token operator">:</span> _state<span class="token punctuation">[</span>currentIndex<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">setState</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">newState</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    _state<span class="token punctuation">[</span>currentIndex<span class="token punctuation">]</span> <span class="token operator">=</span> newState
    index <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  index <span class="token operator">+=</span> <span class="token number">1</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>_state<span class="token punctuation">[</span>currentIndex<span class="token punctuation">]</span><span class="token punctuation">,</span> setState<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App<span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> rootElement<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>n<span class="token punctuation">,</span> setN<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">myUseState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>m<span class="token punctuation">,</span> setM<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">myUseState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;App&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token punctuation">{</span>n<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setN</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">+</span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token punctuation">{</span>m<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setM</span><span class="token punctuation">(</span>m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">+</span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>state 完全私有于声明它的组件</strong>。如果你在两个地方渲染它，则每个副本都有独属于自己的 state</li></ul><h3 id="_2-3-渲染和提交" tabindex="-1"><a class="header-anchor" href="#_2-3-渲染和提交" aria-hidden="true">#</a> <mark>2.3 渲染和提交</mark></h3><p>React 是服务员，负责提出顾客的要求，并给顾客上菜。这个<strong>获取请求和服务 UI</strong> 的过程有三个步骤：</p><ol><li><strong>触发</strong>渲染（将食客的订单送到厨房）</li><li><strong>渲染</strong>组件（在厨房准备订单）</li><li><strong>提交</strong>到 DOM（将订单送到桌前）</li></ol><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202310251120818.png" alt="image-20231025112055772" loading="lazy"></p><h4 id="步骤1-触发一次渲染" tabindex="-1"><a class="header-anchor" href="#步骤1-触发一次渲染" aria-hidden="true">#</a> 步骤1 触发一次渲染</h4><p>有两种原因会导致组件的渲染：</p><ol><li>组件的 <strong>初次渲染。</strong></li><li>组件（或者其祖先之一）的 **状态发生了改变。**更新组件的状态会自动将一次渲染送入队列</li></ol>`,9),k=n("strong",null,"初次渲染",-1),b={href:"https://zh-hans.react.dev/reference/react-dom/client/createRoot",target:"_blank",rel:"noopener noreferrer"},g=n("code",null,"createRoot",-1),h=n("code",null,"render",-1),f=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> root <span class="token operator">=</span> <span class="token function">createRoot</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
root<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>Image <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>状态更新时重新渲染</strong>：一旦组件被初次渲染，你就可以通过使用 <code>set</code> 函数更新其状态来触发之后的渲染。更新组件的状态会自动将一次渲染送入队列</p><h4 id="步骤-2-react-渲染你的组件-渲染中" tabindex="-1"><a class="header-anchor" href="#步骤-2-react-渲染你的组件-渲染中" aria-hidden="true">#</a> 步骤 2: React 渲染你的组件，渲染中</h4><ul><li><strong>在进行初次渲染时,</strong> React 会调用根组件。<code>document.getElementById(&#39;root&#39;)</code></li><li><strong>对于后续的渲染,</strong> React 会调用内部状态更新触发了渲染的函数组件</li></ul><hr><ul><li><strong>在初次渲染中，</strong> React 将会为<code>&lt;section&gt;</code>、<code>&lt;h1&gt;</code> 和三个 <code>&lt;img&gt;</code> 标签 <mark>创建 DOM 节点</mark>。</li><li><strong>在一次重渲染过程中,</strong> React 将<mark>计算</mark>它们的哪些属性（如果有的话）自上次渲染以来已更改。在下一步（提交阶段）之前，它不会对这些信息执行任何操作。</li></ul><h4 id="步骤-3-react-把更改提交到-dom-上" tabindex="-1"><a class="header-anchor" href="#步骤-3-react-把更改提交到-dom-上" aria-hidden="true">#</a> 步骤 3: React 把更改提交到 DOM 上</h4><p>在渲染（调用）你的组件之后，React 将会修改 DOM</p>`,8),x=n("strong",null,"对于初次渲染，",-1),y={href:"https://developer.mozilla.org/docs/Web/API/Node/appendChild",target:"_blank",rel:"noopener noreferrer"},q=n("code",null,"appendChild()",-1),w=n("li",null,[n("strong",null,"对于重渲染，"),s(" React 将应用"),n("mark",null,"最少的必要操作"),s("（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配")],-1),S=a(`<h3 id="_2-4-作为快照的状态" tabindex="-1"><a class="header-anchor" href="#_2-4-作为快照的状态" aria-hidden="true">#</a> 2.4 作为快照的状态</h3><p>与普通 JavaScript 变量不同，<mark>React 状态</mark>的行为更像一个<mark>快照</mark>。<strong>设置它并不改变你已有的状态变量，而是触发一次重新渲染</strong></p><h4 id="设置-state-会触发渲染" tabindex="-1"><a class="header-anchor" href="#设置-state-会触发渲染" aria-hidden="true">#</a> 设置 state 会触发渲染</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Form</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>isSent<span class="token punctuation">,</span> setIsSent<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>message<span class="token punctuation">,</span> setMessage<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;Hi!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isSent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>Your message is on its way<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token literal-property property">单击按钮时会发生以下情况</span><span class="token operator">:</span>
<span class="token number">1.</span>执行 onSubmit 事件处理函数。
<span class="token number">2.</span><span class="token function">setIsSent</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> 将 isSent 设置为 <span class="token boolean">true</span> 并排列一个新的渲染。
<span class="token number">3</span><span class="token punctuation">.</span>React 根据新的 isSent 值重新渲染组件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="渲染会及时生成一张快照-拷贝" tabindex="-1"><a class="header-anchor" href="#渲染会及时生成一张快照-拷贝" aria-hidden="true">#</a> 渲染会及时生成一张快照 （拷贝）</h4><p>当 React 重新渲染一个组件时：</p><ol><li>React 会再次调用你的函数</li><li>函数会返回新的 JSX 快照</li><li>React 会更新界面以匹配返回的快照</li></ol><p><img src="https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202311221510322.png" alt="image-20231122151020227" loading="lazy"></p><ul><li><strong>设置 state 只会为下一次渲染变更 state 的值</strong></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setNumber</span><span class="token punctuation">(</span>number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setNumber</span><span class="token punctuation">(</span>number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setNumber</span><span class="token punctuation">(</span>number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">+</span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但在 <strong>这次渲染</strong> 的 事件处理函数中 number 会一直是 0，所以你会三次将 state 设置成 1。这就是为什么在你的事件处理函数执行完以后，React 重新渲染的组件中的 number 等于 1 而不是 3。 你还可以通过在心里把 state 变量<mark>替换成</mark>（<mark>替代法</mark>）它们在你代码中的值来想象这个过程。由于 这次渲染 中的 state 变量 number 是 0，其事件处理函数看起来会像这样</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">+</span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="随时间变化的-state" tabindex="-1"><a class="header-anchor" href="#随时间变化的-state" aria-hidden="true">#</a> 随时间变化的 state</h4><ul><li><p><strong>一个 state 变量的值永远不会在一次渲染的内部发生变化</strong> ，即使其事件处理函数的代码是异步的。在 <strong>那次渲染的</strong> <code>onClick</code> 内部，<code>number</code> 的值即使在调用 <code>setNumber(number + 5)</code> 之后也还是 <code>0</code>。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。</p></li><li><p><strong>React 会使 state 的值始终”固定“在一次渲染的各个事件处理函数内部。</strong> 你无需担心代码运行时 state 是否发生了变化。</p></li></ul><h4 id="摘要" tabindex="-1"><a class="header-anchor" href="#摘要" aria-hidden="true">#</a> <mark>摘要</mark></h4><ul><li>设置组件 state 会把一次重新渲染加入队列</li><li>React 将 state 存储在组件之外，就像在架子上一样。</li><li>当你调用 <code>useState</code> 时，React 会为你提供<strong>该次渲染</strong> 的一张 state 快照。</li><li>变量和事件处理函数不会在重渲染中“存活”。每个渲染都有自己的事件处理函数。</li><li>每个渲染（以及其中的函数）始终“看到”的是 React 提供给<strong>这个</strong> 渲染的 state 快照。</li><li>你可以在心中替换事件处理函数中的 state，类似于替换渲染的 JSX。</li><li>过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值</li></ul><h3 id="_2-5-把一系列state更新加入队列" tabindex="-1"><a class="header-anchor" href="#_2-5-把一系列state更新加入队列" aria-hidden="true">#</a> 2.5 把一系列state更新加入队列</h3><h4 id="react-会对-state-更新进行批处理" tabindex="-1"><a class="header-anchor" href="#react-会对-state-更新进行批处理" aria-hidden="true">#</a> React 会对 state 更新进行批处理</h4><ul><li><p><strong>React 会等到事件处理函数中的</strong> 所有 <strong>代码都运行完毕再处理你的 state 更新。</strong> 这就是为什么重新渲染只会发生在所有这些 <code>setNumber()</code> 调用 <strong>之后</strong> 的原因</p></li><li><p>但这也意味着只有在你的事件处理函数及其中任何代码执行完成 <strong>之后</strong>，UI 才会更新。这种特性也就是 <strong>批处理</strong>，它会使你的 React 应用运行得更快。它还会帮你避免处理只更新了一部分 state 变量的令人困惑的“半成品”渲染。</p></li></ul><h4 id="在下次渲染前多次更新同一个-state" tabindex="-1"><a class="header-anchor" href="#在下次渲染前多次更新同一个-state" aria-hidden="true">#</a> 在下次渲染前多次更新同一个 state</h4><p>这是一个不常见的用例，但是如果你想在下次渲染之前多次更新同一个 state，你可以像 <code>setNumber(n =&gt; n + 1)</code> 这样传入一个根据队列中的前一个 state 计算下一个 state 的 <strong>函数</strong>，而不是像 <code>setNumber(number + 1)</code> 这样传入 <strong>下一个 state 值</strong>。这是一种告诉 React “<strong>用 state 值做某事</strong>”而不是仅仅替换它的方法</p><ul><li>点击一次按钮，number直接+3</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>number<span class="token punctuation">,</span> setNumber<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span><span class="token punctuation">{</span>number<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token parameter">n</span> <span class="token operator">=&gt;</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token parameter">n</span> <span class="token operator">=&gt;</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token parameter">n</span> <span class="token operator">=&gt;</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">+</span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-更新状态中的对象" tabindex="-1"><a class="header-anchor" href="#_2-6-更新状态中的对象" aria-hidden="true">#</a> 2.6 更新状态中的对象</h3><h3 id="_2-7-更新状态中的数组" tabindex="-1"><a class="header-anchor" href="#_2-7-更新状态中的数组" aria-hidden="true">#</a> 2.7 更新状态中的数组</h3><h2 id="_3-状态管理" tabindex="-1"><a class="header-anchor" href="#_3-状态管理" aria-hidden="true">#</a> 3.状态管理</h2><h2 id="_4-应急方案" tabindex="-1"><a class="header-anchor" href="#_4-应急方案" aria-hidden="true">#</a> 4.应急方案</h2>`,27);function R(D,_){const e=o("ExternalLinkIcon");return l(),p("div",null,[r,n("p",null,[s("refs回调函数类型调用次数，小注意点："),n("a",u,[s("https://react.docschina.org/docs/refs-and-the-dom.html"),t(e)])]),d,n("p",null,[s("更简洁理解的代码 "),n("a",v,[s("https://blog.csdn.net/qq_30632003/article/details/124940407"),t(e)])]),m,n("p",null,[k,s("：当应用启动时，会触发初次渲染。框架和沙箱有时会隐藏这部分代码，但它是通过调用目标 DOM 节点的 "),n("a",b,[g,t(e)]),s("，然后用你的组件调用 "),h,s(" 函数完成的")]),f,n("ul",null,[n("li",null,[x,s(" React 会使用 "),n("a",y,[q,t(e)]),s(" DOM API 将其创建的所有 DOM 节点放在屏幕上。")]),w]),S])}const j=i(c,[["render",R],["__file","react.html.vue"]]);export{j as default};
