---
title: React
date: 2024-01-17
category: javascript & react
---

# Hooks

1.useEffect是每次组件**render完后**==判断依赖==并执行

* 依赖项为[]，仅第一次render后执行
* 依赖项数组有值，第一次render后以及之后的render完依赖项发生变化了才执行

2.





# 补充知识

1.解构写法  const {key1} = this.refs；key1.value   等同于  this.refs.key1.value ；使用简便，写法简单

2.回调函数没有this，里面如果用到了this要去函数外层函数中找；

3.模板字符串：

```react
showInfo = ()=>{
    const {username, password} = this
    //模板字符串
    alert(`你输入的用户名是${username.value},输入的密码是${password.value}`)
}
```

4.event传递

```react
//展示右侧输入框的数据
//发生事件的事件源和要使用的数据是同一个节点  就能通过传递的event参数拿到节点的值
showData2 = (event)>{
    alert(event.target.value);
}
```

5.回调函数调用

**saveFormData是一个函数时，**

```react
saveFormData = ()=>{
    console.log('@@')
}

//写法1：this.saveFormData是一个函数，将函数作为onChange整体的回调，这样onChange触发一次就会调用一次this.saveFormData函数
用户名：<input onChange={this.saveFormData} type="text" name="username"/>

//写法2：this.saveFormData('username')会自己调用一次，返回这个saveFormData函数的值
用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
```

**saveFormData返回的值是一个函数时，**

```react
saveFormData = (dataType)=>{
    return (event)=>{
        this.setState({[dataType]:event.target.value})
    }
}

//this.saveFormData('username')会自己调用一次，但是返回的就是一个函数了，onChange回调的就是saveFormData里面return的那个函数
用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
```

本质上就是要给onClick事件的回调 给到一个**函数**！！

6.如果A类继承了B类，且A类中写了构造器，那么A类构造器中的**super是必须要调用**的

7.类中所定义的方法，都放在了类的原型对象上，供实例去使用

8.展开运算符

```js
let arr1 = [1,3,5,7,9]
let arr2 = [2,4,6,8,10]
console.log(...arr1); //展开一个数组
let arr3 = [...arr1,...arr2]//连接数组
console.log(arr3);

//在函数中使用
function sum(...numbers){
    console.log(numbers);
    //数组自带的方法reduce
    return numbers.reduce((preValue,currentValue)=>{
        return preValue + currentValue
    })
}
console.log(sum(1,2,3,4));

//构造字面量对象时使用展开语法
let person = {name:'tom',age:18}
let person2 = {...person} //使用{}可以复制一个对象
//console.log(...person); //报错，展开运算符不能展开对象
person.name = 'jerry'
console.log(person2);
console.log(person);

//合并  复制对象时修改了其中的属性
let person3 = {...person,name:'jack',address:"地球"}
console.log(person3);
```



# React视频学习



## jsx语法

```markdown
jsx语法规则：
   1.定义虚拟DOM时，不要写引号
   2.标签中混入JS表达式时要用{}，{}里面不能写语句，只能写表达式
   3.样式的类名指定不要用class，要用className。
   4.内联样式，要用style={{key:value}}的形式去写。  针对VDOM而言
   5.只有一个根标签  用一个div包裹起来            针对VDOM而言
   6.标签必须闭合
   7.标签首字母  jsx向html转化时：
         (1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
         (2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
```

## 组件定义

### 函数式组件

```react
<script type="text/babel">
    //1.创建函数式组件
    function MyComponent(){
        console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
        return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
    }
    //2.渲染组件到页面
    ReactDOM.render(<MyComponent/>,document.getElementById('test'))
    /* 
    执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
    1.React解析组件标签，找到了MyComponent组件。
    2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
</script>
```

### 类式组件

render中的this是组件的实例对象

```react
<script type="text/babel">
    //1.创建类式组件
    class MyComponent extends React.Component {
        render(){
            //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
            //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
            console.log('render中的this:',this);
            return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
        }
    }
    //2.渲染组件到页面
    ReactDOM.render(<MyComponent/>,document.getElementById('test'))
    /* 
    执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
    1.React解析组件标签，找到了MyComponent组件。
    2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
    3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
</script>
```

## state

### 理解

1. state是**组件对象**最重要的属性, 值是对象(可以包含多个key-value的组合)

2. ==组件被称为"状态机",，通过更新组件的state来更新对应的页面显示(重新渲染组件)==

**注意点**

1.	组件中render方法中的this为组件实例对象
2.	组件自定义的方法中this为undefined，如何解决？
	a) 强制绑定this: 通过函数对象的bind()
	b) 箭头函数
3.	状态数据，不能直接修改或更新

### 写法

```react
<script type="text/babel">
    //1.创建组件
    class Weather extends React.Component {
        //构造器调用几次？ ———— 1次
        constructor(props) {
            console.log("constructor");
            super(props);
            //初始化状态
            this.state = { isHot: false, wind: "微风" };
            //解决changeWeather中this指向问题
            this.changeWeather = this.changeWeather.bind(this);
        }

        //render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
        render() {
            //render是放在哪里的？———— Weather的原型对象上，供实例使用。
            console.log("render");
            //读取状态
            const { isHot, wind } = this.state;
            return (
                <h1 onClick={this.changeWeather}>
                    今天天气很{isHot ? "炎热" : "凉爽"}，{wind}
                </h1>
            );
        }

        //changeWeather调用几次？ ———— 点几次调几次
        changeWeather() {
            //changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
            //由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
            //类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined

            console.log("changeWeather");
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
    ReactDOM.render(<Weather />, document.getElementById("test"));
</script>
```



### 简洁写法

```react
class Weather extends React.Component {
    //初始化状态
    state = { isHot: false, wind: "微风" };

    render() {
        const { isHot, wind } = this.state;
        return (
            <h1 onClick={this.changeWeather}>
                今天天气很{isHot ? "炎热" : "凉爽"}，{wind}
            </h1>
        );
    }

    //自定义方法————要用赋值语句的形式+箭头函数
    changeWeather = () => {
        const isHot = this.state.isHot;
        this.setState({ isHot: !isHot });
    };
}
```



## props

### 理解

1. 每个**组件对象**都会有props(properties的简写)属性

2. 组件标签的所有属性都保存在props中

**注意点**

1. 通过标签属性从组件外向组件内传递变化的数据

2. 注意: 组件内部不要修改props数据（prop）

### 写法

props基本使用、对props限制

```react
//创建组件
class Person extends React.Component{
    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        //props是只读的
        //this.props.name = 'jack' //此行代码会报错，因为props是只读的
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
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
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))
ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

const p = {name:'老刘',age:18,sex:'女'}
ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
```

### 简洁写法

```react
//创建组件
class Person extends React.Component{
    //类中的构造器能省略就省略
    constructor(props){
        // 构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
        // console.log(props);
        // 也可以不传递props
        super(props)
        console.log('constructor',this.props);
    }

    //对标签属性进行类型、必要性的限制
    static propTypes = {
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        sex:PropTypes.string,//限制sex为字符串
        age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    static defaultProps = {
        sex:'男',//sex默认值为男
        age:18 //age默认值为18
    }

    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        // props是只读的
        // this.props.name = 'jack' //此行代码会报错，因为props是只读的
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}
```

## refs

### 理解

* refs理解为打标识，组件内的标签可以定义ref属性来标识自己，**方便别人拿到该ref所在的节点或节点相关值**

* refs为React组件实例对象的主属性，用来收集ref

```jsx
<script type="text/babel">
    class Demo extends React.Component {
        showData = () => {
            console.log(this);
        };
        render() {
            return (
                <div>
                    <input ref='input1' type="text" palceholder="点击按钮" />
                    <button onClick={this.showData}>点击左侧按钮</button>
                    <input type="text" palceholder="点击按钮失去焦点提示" />
                </div>
            );
        }
    }
    ReactDOM.render(<Demo />, document.getElementById("test"));
</script>
```

* key：value 形式，key是自定义的ref名称，value是DOM节点

![image-20230306101554822](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201347852.png)

### 写法

#### 字符串类型

字符串类型  refs 存在效率问题，react不推荐使用

```react
class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=>{
        const {input1} = this.refs
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        const {input2} = this.refs
        alert(input2.value)
    }
    render(){
        return(
            <div>
                <input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
            </div>
        )
    }
}
```

#### 回调函数类型

直接将ref所在的`标签节点`作为回调函数的参数

```react
class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=>{
        const {input1} = this
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        const {input2} = this
        alert(input2.value)
    }
    //input1就是所在的input节点！
    render(){
        return(
            <div>
                <input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input ref={c => this.input2 = c } onBlur={this.showData2}  type="text" placeholder="失去焦点提示数据"/>&nbsp;
            </div>
        )
    }
}
```

refs回调函数类型调用次数，小注意点：https://react.docschina.org/docs/refs-and-the-dom.html

```markdown
关于回调 refs 的说明

如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。


`更新过程`即再次render渲染的过程，回调函数就会执行两次
```



#### createRef类型 React推荐

```react
//创建组件
class Demo extends React.Component{
    /* 
		React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
	 */
    myRef = React.createRef()
    //要接收额外的  就定义出新的名字
    myRef2 = React.createRef()
    //展示左侧输入框的数据
    showData = ()=>{
        alert(this.myRef.current.value);
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        alert(this.myRef2.current.value);
    }
    render(){
        return(
            <div>
                <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
            </div>
        )
    }
}
```

**key是current，value是ref所在的节点**

![image-20230320112208176](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201122386.png)



## 事件处理

 (1).通过onXxx属性指定事件处理函数(注意大小写)

​    a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 —————— 为了更好的兼容性

​    b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效

(2).通过event.target得到发生事件的DOM元素对象 ——————————不要过度使用ref

```js
//展示右侧输入框的数据
//发生事件的事件源和要使用的数据是同一个节点  就能通过传递的event参数拿到节点的值
showData2 = (event)>{
    alert(event.target.value);
}
```
## 非受控组件

概念：所有输入类（单选，多选，输入框）的DOM，在组件内都是现用现取

理解：通过ref将节点存储，然后使用的时候通过.value取到值

```react
//创建组件
class Login extends React.Component{
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this
        alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input ref={c => this.username = c} type="text" name="username"/>
                密码：<input ref={c => this.password = c} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
```

## 受控组件  推荐

理解：所有输入类（单选，多选，输入框）的DOM，随着输入，将数据维护到状态state中，等需要用的时候直接从状态中取出来。  一句话，**随着输入要维护状态就是受控**

因为这种写法没有ref，所以推荐受控组件的写法

```react
//创建组件
class Login extends React.Component{

    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    //保存用户名到状态中
    saveUsername = (event)=>{
        this.setState({username:event.target.value})
    }

    //保存密码到状态中
    savePassword = (event)=>{
        this.setState({password:event.target.value})
    }

    //表单提交的回调
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveUsername} type="text" name="username"/>
                密码：<input onChange={this.savePassword} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
```

## 高阶函数

一句话：**接收一个函数或者返回一个函数**

 高阶函数：如果一个函数符合下面2个规范中的`任何一个`，那该函数就是高阶函数。

    1.若A函数，`接收的参数是一个函数`，那么A就可以称之为高阶函数。
    
    2.若A函数，`调用的返回值依然是一个函数`，那么A就可以称之为高阶函数。

常见的高阶函数有：Promise、setTimeout、arr.map()等等



## 函数柯里化

函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 

一句话，**应用**了高阶函数（返回值是函数）的方式

```react
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    //保存表单数据到状态中
    //返回一个函数
    saveFormData = (dataType)=>{
        return (event)=>{
            this.setState({[dataType]:event.target.value})
        }
    }

    //表单提交的回调
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
                密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
```

## 生命周期

挂载 mount，卸载 unmount

### 生命周期流程图--旧

![image-20230320112542601](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202303201125661.png)

**1.** **初始化阶段:** 由ReactDOM.render()触发---初次渲染  组件初次挂载

1. `constructor()`

2. componentWillMount()

3. render()

4. componentDidMount()              **常用**，一般做些初始化事，开启定时器、发送网络请求、订阅请求

**2.** **更新阶段:** 由组件内部this.setSate()或父组件重新render触发

1. shouldComponentUpdate()   默认返回true，**当返回false时，更新阶段在此终止**    //控制组件更新的“阀门”

2. componentWillUpdate()         //组件将要更新的钩子

3. render()

4. componentDidUpdate()          //组件更新完毕的钩子

 **3.** **卸载组件:** 由ReactDOM.unmountComponentAtNode()触发

1. componentWillUnmount()       **常用**，一般做些收尾事，关闭定时器、取消订阅消息





### 生命周期流程图--新

 1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
                1. constructor()
                2. getDerivedStateFromProps
                3. render()
                4. componentDidMount() ====> 常用
                            一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
                1. getDerivedStateFromProps  //若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps
            
            ​    2. shouldComponentUpdate()
            
            ​    3. render()
            
            ​    4. getSnapshotBeforeUpdate    //在更新之前获取快照
            
            ​    5. componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
                1. componentWillUnmount()  ====> 常用
                            一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息

![image-20230320112626982](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202310251037078.png)



# React中文官网

## 1.描述UI



### 1.1 第一个组件

* 组件定义：React 允许你将标签、CSS 和 JavaScript 组合成自定义“组件”，即 **应用程序中可复用的 UI 元素**

* **React 组件是常规的 JavaScript 函数**，但 **组件的名称必须以大写字母开头**



### 1.3 使用JSX书写标签语言

* JSX：将标签引入 JavaScript。**在 React 中，渲染逻辑和标签共同存在于同一个地方——组件**

* 每个 React 组件都是一个 JavaScript **函数，它会返回一些标签**，React 会将这些标签渲染到浏览器上。React 组件使用一种被称为 JSX 的语法扩展来描述这些标签

> JSX规则

规则1：只能返回一个根元素。如果想要在一个组件中包含多个元素，需要用**一个父标签**把它们包裹起来

规则2：所有标签必须闭合。

规则3：使用驼峰式命名法给属性命名。如**className**

### 1.4 JSX中通过大括号使用javascript

* 使用引号传递字符串

当你想把一个字符串属性传递给 JSX 时，把它放到单引号或双引号中；

```react
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

请注意 `className="avatar"` 和 `src={avatar}` 之间的区别，`className="avatar"` 指定了一个就叫 `"avatar"` 的使图片在样式上变圆的 CSS 类名，而 `src={avatar}` 这种写法会去读取 JavaScript 中 `avatar` 这个变量的值。这是因为大括号可以使你直接在标签中使用 JavaScript！

* ==大括号内的任何 JavaScript 表达式都能正常运行==；调用函数、引用变量、表达式计算

* 在 JSX 中，只能在以下两种场景中使用大括号：
  1. 用作 JSX 标签内的**文本**：`<h1>{name}'s To Do List</h1>` 是有效的，但是 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 无效。
  2. 用作紧跟在 `=` 符号后的 **属性**：`src={avatar}` 会读取 `avatar` 变量，但是 `src="{avatar}"` 只会传一个字符串 `{avatar}`。

*  JSX 中传递对象。对象用{}表示，外面再包一个{}，就是双括号{{}}



### 1.8 保持组件纯粹

- 一个组件必须是纯粹的，就意味着：
  - **只负责自己的任务。** 它不会更改在该函数调用前就已存在的对象或变量。
  - **输入相同，则输出相同。** 给定相同的输入，组件应该总是返回相同的 JSX。
- 渲染随时可能发生，因此组件不应依赖于彼此的渲染顺序。
- 你不应该改变组件用于渲染的任何输入。这包括 props、state 和 context。通过 “设置” state 来更新界面，而不要改变预先存在的对象。
- 努力在你返回的 JSX 中表达你的组件逻辑。当你需要“改变事物”时，你通常希望在事件处理程序中进行。作为最后的手段，你可以使用 `useEffect`
- 编写纯函数需要一些练习，但它充分释放了 React 范式的能力

---

> 副作用定义：React 的渲染过程必须自始至终是纯粹的。组件应该只 **返回** 它们的 JSX，而不 **改变** 在渲染前，就已存在的任何对象或变量 — 这将会使它们变得不纯粹！

* 反例：**多次调用这个组件会产生不同的 JSX**！

```jsx
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

* 纯函数**不会改变**函数作用域外的变量、或在函数调用前创建的对象——这会使函数变得不纯粹

* React 为何侧重于**纯函数**？

  ```markdown
  编写纯函数需要遵循一些习惯和规程。但它开启了绝妙的机遇：
  
  ## 你的组件可以在不同的环境下运行 — 例如，在服务器上！由于它们针对相同的输入，总是返回相同的结果，因此一个组件可以满足多个用户请求。
  
  ## 你可以为那些输入未更改的组件来 跳过渲染，以提高性能。这是安全的做法，因为纯函数总是返回相同的结果，所以可以安全地缓存它们。
  
  ## 如果在渲染深层组件树的过程中，某些数据发生了变化，React 可以重新开始渲染，而不会浪费时间完成过时的渲染。纯粹性使得它随时可以安全地停止计算。
  
  我们正在构建的每个 React 新特性都利用到了纯函数。从数据获取到动画再到性能，保持组件的纯粹可以充分释放 React 范式的能力。
  ```

  

---

反例1 ：渲染前**产生了副作用（修改 DOM）**，第4行都没有className这个玩意~

```jsx
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

正例1：传递的是className，没有修改DOM

```jsx
export default function Clock({ time }) {
  let hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

---

反例2：通过在接收到的 `stories` 数组（一个 prop！）上调用 `push` 方法，它正改变着一个在 `StoryTray` 渲染 **之前** 创建的对象；多次渲染后，stories都会不断增加元素，最后渲染的li标签越来越多

```jsx
export default function StoryTray({ stories }) {
  stories.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

正例2： push 之前创建一个 **新** 数组（通过复制现有数组）：

```jsx
export default function StoryTray({ stories }) {
  // Copy the array!
  let storiesToDisplay = stories.slice();

  // Does not affect the original array:
  storiesToDisplay.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {storiesToDisplay.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

记住数组上的哪些操作会修改原始数组、哪些不会，这非常有帮助。例如，`push`、`pop`、`reverse` 和 `sort` 会改变原始数组，但 `slice`、`filter` 和 `map` 则会创建一个新数组。

## 2.添加交互

* 随时间变化的数据被称为状态（state）

### 2.1 响应事件

* 可以通过将函数作为 prop 传递给元素如 `<button>` 来处理事件

* 事件处理函数在组件内部定义，所以它们**可以访问 props**

* 从**子组件显式调用事件处理函数** prop 是事件传播的另一种优秀替代方案

* 事件处理函数接收一个 **事件对象** 作为唯一的参数。按照惯例，它通常被称为 `e` ，代表 “event”（事件）;

  这个事件对象还允许你阻止传播。**如果你想阻止一个事件到达父组件**，调用 `e.stopPropagation()`

  ```react
  export default function ColorSwitch({
    onChangeColor
  }) {
    return (
      <button onClick={(e)=>{
        e.stopPropagation();
        onChangeColor();
      }}>
        改变颜色
      </button>
    );
  }
  ```

### 2.2 State：组件的记忆

* 更改局部变量不会触发渲染，一个函数中定义的变量就是局部变量了

```react
//这里的 [ 和 ] 语法称为数组解构，它允许你从数组中读取值。 useState 返回的数组总是正好有两项。
//index 是一个 state 变量，setIndex 是对应的 setter 函数
const [index, setIndex] = useState(0);
```

* 在 React 中，`useState` 以及任何其他以“`use`”开头的函数都被称为 **Hook**
* ==Hook 是特殊的函数，只在 React[渲染时有效==
* Hooks ——以 `use` 开头的函数——只能在组件或自定义 Hook的==最顶层调用==

* useState 的唯一参数是 state 变量的初始值

---

> 每次你的组件渲染时，`useState` 都会给你一个包含两个值的数组：
>
> 1. **state 变量** (`index`) 会保存上次渲染的值。
> 2. **state setter 函数** (`setIndex`) 可以更新 state 变量并触发 React 重新渲染组件

```js
const [index, setIndex] = useState(0);
```

1. **组件进行第一次渲染。** 因为你将 `0` 作为 `index` 的初始值传递给 `useState`，它将返回 `[0, setIndex]`。 React 记住 `0` 是最新的 state 值。
2. **你更新了 state**。当用户点击按钮时，它会调用 `setIndex(index + 1)`。 `index` 是 `0`，所以它是 `setIndex(1)`。这告诉 ==React 现在记住 index 是 1 并触发下一次渲染==。
3. **组件进行第二次渲染**。React 仍然看到 `useState(0)`，但是因为 React *记住* 了你将 `index` 设置为了 `1`，它将返回 `[1, setIndex]`

---

> React 如何知道返回哪个 state？
>
> 你可能已经注意到，`useState` 在调用时没有任何关于它引用的是*哪个* state 变量的信息。没有传递给 `useState` 的“标识符”，它是如何知道要返回哪个 state 变量呢?

> 术语统一：useState(0)——>这个就叫做Hook的一次调用

1.在同一组件的每次渲染中，Hooks 都依托于一个稳定的调用顺序。==只在顶层调用 Hooks的话，Hooks 将始终以相同的顺序被调用==

2.这两个变量都是闭包产生的，都可以被外部访问到

* componentHooks：数组，每一项是当前组件内部的state变量的值，按照useState()调用的上下顺序依次写入变量值

* currentHookIndex：每一次渲染开始都是0，**调用一次useState()，+1**。**记录的是每个state变量在componentHooks数组的索引位置**
* setState：React会收集需要更新的变量值，一次性更新数组中的对应state变量值，并将currentHookIndex再次置为0。这样，下一次再调用useState()时，**currentHookIndex又从0开始依次读取到新的变量值**。

```react
let componentHooks = [];
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

const render = () => ReactDOM.render(<App />, rootElement);
```

更简洁理解的代码 https://blog.csdn.net/qq_30632003/article/details/124940407

```js
import React from "src/tech/web_framework/react";
import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");

let _state = [];
let index = 0;
const myUseState = (initState) => {
  let currentIndex = index;
  _state[currentIndex] = (_state[currentIndex] === undefined ? initState : _state[currentIndex]);
  const setState = (newState) => {
    _state[currentIndex] = newState
    index = 0
    render()
  }
  index += 1
  return [_state[currentIndex], setState]
}

const render = () => ReactDOM.render(<App/>, rootElement);

function App() {
  const [n, setN] = myUseState(0);
  const [m, setM] = myUseState(0);
  return (
    <div className="App">
      <p>{n}</p>
      <p>
        <button onClick={() => setN(n + 1)}>+1</button>
      </p>
      <p>{m}</p>
      <p>
        <button onClick={() => setM(m + 1)}>+1</button>
      </p>
    </div>
  );
}
```

* **state 完全私有于声明它的组件**。如果你在两个地方渲染它，则每个副本都有独属于自己的 state

### ==2.3 渲染和提交==

React 是服务员，负责提出顾客的要求，并给顾客上菜。这个**获取请求和服务 UI** 的过程有三个步骤：

1. **触发**渲染（将食客的订单送到厨房）
2. **渲染**组件（在厨房准备订单）
3. **提交**到 DOM（将订单送到桌前）

![image-20231025112055772](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202310251120818.png)



#### 步骤1 触发一次渲染

有两种原因会导致组件的渲染：

1. 组件的 **初次渲染。**
2. 组件（或者其祖先之一）的 **状态发生了改变。**更新组件的状态会自动将一次渲染送入队列

**初次渲染**：当应用启动时，会触发初次渲染。框架和沙箱有时会隐藏这部分代码，但它是通过调用目标 DOM 节点的 [`createRoot`](https://zh-hans.react.dev/reference/react-dom/client/createRoot)，然后用你的组件调用 `render` 函数完成的

```js
const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

**状态更新时重新渲染**：一旦组件被初次渲染，你就可以通过使用 `set` 函数更新其状态来触发之后的渲染。更新组件的状态会自动将一次渲染送入队列

#### 步骤 2: React 渲染你的组件，渲染中

- **在进行初次渲染时,** React 会调用根组件。`document.getElementById('root')`
- **对于后续的渲染,** React 会调用内部状态更新触发了渲染的函数组件

---

- **在初次渲染中，** React 将会为`<section>`、`<h1>` 和三个 `<img>` 标签 ==创建 DOM 节点==。
- **在一次重渲染过程中,** React 将==计算==它们的哪些属性（如果有的话）自上次渲染以来已更改。在下一步（提交阶段）之前，它不会对这些信息执行任何操作。

#### 步骤 3: React 把更改提交到 DOM 上

在渲染（调用）你的组件之后，React 将会修改 DOM

- **对于初次渲染，** React 会使用 [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) DOM API 将其创建的所有 DOM 节点放在屏幕上。
- **对于重渲染，** React 将应用==最少的必要操作==（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配

### 2.4 作为快照的状态

与普通 JavaScript 变量不同，==React 状态==的行为更像一个==快照==。**设置它并不改变你已有的状态变量，而是触发一次重新渲染**

#### 设置 state 会触发渲染

```js
export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
}

单击按钮时会发生以下情况:
1.执行 onSubmit 事件处理函数。
2.setIsSent(true) 将 isSent 设置为 true 并排列一个新的渲染。
3.React 根据新的 isSent 值重新渲染组件
```

#### 渲染会及时生成一张快照 （拷贝）

当 React 重新渲染一个组件时：

1. React 会再次调用你的函数
2. 函数会返回新的 JSX 快照
3. React 会更新界面以匹配返回的快照

![image-20231122151020227](https://typora-imgbed-mrru.oss-cn-chengdu.aliyuncs.com/ruyb/202311221510322.png)

* **设置 state 只会为下一次渲染变更 state 的值**

```js
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```

但在 **这次渲染** 的 事件处理函数中 number 会一直是 0，所以你会三次将 state 设置成 1。这就是为什么在你的事件处理函数执行完以后，React 重新渲染的组件中的 number 等于 1 而不是 3。
你还可以通过在心里把 state 变量==替换成==（==替代法==）它们在你代码中的值来想象这个过程。由于 这次渲染 中的 state 变量 number 是 0，其事件处理函数看起来会像这样

```js
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```

#### 随时间变化的 state

* **一个 state 变量的值永远不会在一次渲染的内部发生变化** ，即使其事件处理函数的代码是异步的。在 **那次渲染的** `onClick` 内部，`number` 的值即使在调用 `setNumber(number + 5)` 之后也还是 `0`。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。

* **React 会使 state 的值始终”固定“在一次渲染的各个事件处理函数内部。** 你无需担心代码运行时 state 是否发生了变化。

#### ==摘要==

- 设置组件 state 会把一次重新渲染加入队列
- React 将 state 存储在组件之外，就像在架子上一样。
- 当你调用 `useState` 时，React 会为你提供**该次渲染** 的一张 state 快照。
- 变量和事件处理函数不会在重渲染中“存活”。每个渲染都有自己的事件处理函数。
- 每个渲染（以及其中的函数）始终“看到”的是 React 提供给**这个** 渲染的 state 快照。
- 你可以在心中替换事件处理函数中的 state，类似于替换渲染的 JSX。
- 过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值

### 2.5 把一系列state更新加入队列

#### React 会对 state 更新进行批处理

* **React 会等到事件处理函数中的** 所有 **代码都运行完毕再处理你的 state 更新。** 这就是为什么重新渲染只会发生在所有这些 `setNumber()` 调用 **之后** 的原因

* 但这也意味着只有在你的事件处理函数及其中任何代码执行完成 **之后**，UI 才会更新。这种特性也就是 **批处理**，它会使你的 React 应用运行得更快。它还会帮你避免处理只更新了一部分 state 变量的令人困惑的“半成品”渲染。

#### 在下次渲染前多次更新同一个 state

这是一个不常见的用例，但是如果你想在下次渲染之前多次更新同一个 state，你可以像 `setNumber(n => n + 1)` 这样传入一个根据队列中的前一个 state 计算下一个 state 的 **函数**，而不是像 `setNumber(number + 1)` 这样传入 **下一个 state 值**。这是一种告诉 React “**用 state 值做某事**”而不是仅仅替换它的方法

* 点击一次按钮，number直接+3

```js
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```













### 2.6 更新状态中的对象





### 2.7 更新状态中的数组







## 3.状态管理





## 4.应急方案

































