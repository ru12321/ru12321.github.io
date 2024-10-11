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

































