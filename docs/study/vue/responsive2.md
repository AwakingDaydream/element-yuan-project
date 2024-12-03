# Vue2响应式原理

## MVVM（Model-View-ViewModel）

主要目的是分离视图View和模型Model、通过双向数据绑定完成数据视图同步更新，view层数据变化，系统自动修改Model层的数据

#### 构成：

model处理业务逻辑和数据封装

view负责界面和现实

ViewModel监听数据改变和控制试图行为，处理交互，把view和model层链接起来，view和model没有直接联系，通过viewmodel进行交互、渲染

![这里写图片描述](https://img-blog.csdn.net/20171030153807325?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdmljdG9yeXpu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 对象的变化侦测

### 观察者 Watcher

Watcher（观察者）是一个关键的部分，它用于在数据变化时执行更新的操作。其主要作用是在依赖性收集阶段将自己添加到每个相关数据的Dependent（Dep）对象中，并在数据变化时接收到通知，从而触发回调函数。

主要职责：
（1）依赖收集： Watcher在初始化时会调用自己的get方法去读取数据，这会触发数据的getter函数从而进行依赖性收集。在getter函数中，当前Watcher实例会被添加到数据对应的Dep实例中。
（2）执行更新： 当数据发生变化，Dep实例调用notify方法时，Watcher实例会接收到通知，然后调用自己的update方法以触发回调

### 依赖Dep

Dep（Dependency）是一个核心的类，它负责建立数据和观察者（Watcher）之间的关联（依赖），并提供接口触发它们的更新

主要职责：
（1）存储观察者： Dep实例内部维护了一个观察者（Watcher）对象的数组。在依赖收集阶段，观察者对象会被添加到Dep实例的数组中，而在派发更新阶段，Dep类则会遍历这个数组，通知所有的观察者。
（2）依赖收集： Dep类提供了addSub方法，用于在依赖收集阶段添加新的观察者。当数据的getter函数被调用时，Dep会把当前正在评估的观察者添加到自身的观察者列表中。
（3）派发更新： Dep类提供了notify方法，用于在数据发生变更时通知所有的观察者。当数据的setter函数被调用时，Dep会遍历自己的观察者列表，并调用它们的update方法

### 数据侦测到视图更新

当数据发生变化的时候，侦测到并发出通知

局限性：Object.defineProperty 只能劫持对象的属性，因此Vue 2无法自动侦测到对象属性的添加或删除，以及直接通过索引修改数组项的情况。Vue解决这个问题的方式是提供了全局方法如 Vue.set 和 Vue.delete，以及修改数组时应该使用的一系列方法（如push、splice等）

![image-20241015155657427](/Users/yuanshibo/Library/Application Support/typora-user-images/image-20241015155657427.png)

- **数据劫持**：Data通过Observer转换成getter/setter的形式追踪变化

```javascript
var vue = new Vue({
        el:'#app',
        data:{
            a:{a:1,b:2,c:{d:20}},
            arr:[1,2,3]
        }
    })

function Vue(options={}){
  this.$options = options // 将所有属性挂载到实例上
  var data = this._data = this.$options.data // 所有定义的数据
  observe(data)
  //使用this去代理我们的this._data
  for(let key in data){//这就是为什么必须在data里面定义数据，才能实现数据劫持
    Object.defineProperty(this,key,{
      get(){
        return this._data[key]
      },
      set(newVal){
        this._data[key] = newVal
      }
    })
  }
  Compile(options.el,this)//编译
}
//观察对象 给对象实现数据劫持
function observe(data){
  return new Observe(data)
}

function Observe(data){
  const dep = new Dep()
  Object.keys(data).forEach((key)=>{//把data属性通过数据劫持定义属性,如果在监听对象中在多加属性则无法监听，因为初始化的时候已经完成监听了
    if(typeof data[key] === 'object'){
      Observe(data[key])
      return
    }
    let val = data[key]
    Object.defineProperty(data,key,{
      enumerable:true,
      configurable: true,
      get(){
        //新增的watcher存入dep.subs中
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal){
        if(newVal===val)return
        val = newVal
        if(typeof data[key] === 'object'){ // 如果对象中的属性从基本类型变成复杂的情况，需要完成监听
          Observe(data[key])
        }
        dep.notify()
      }
    })
  })
}
```

- **依赖收集**：当外界通过watcher读取数据（初始化数据则new Watcher，触发getter将其添加到依赖中）

```javascript
//发布订阅模式
function Dep(){ // 依赖收集者
    this.subs = []
}
Dep.prototype.addSub = function (sub){ //添加所需要的订阅对象
    this.subs.push(sub)
}
Dep.prototype.notify = function (){//通知 执行数据更新
    this.subs.forEach(sub=>sub.update())
}
```

- 当数据发生改变，触发setter像Dep中的依赖发送通知

```javascript
function Watcher(vm,key,fn){//订阅者
    /*
        vm 绑定的this，即最新数据
        key 根据key拿到vm上的对应层级数据
        fn 回调函数
     */
    this.vm = vm
    this.key = key
    this.fn = fn
    // 负责把watcher实例存在dep实例的subs数组中
    Dep.target = this
    // 主要是为了去调用get 此时Dep.target还是指向Wather 存入subs
    const newVal = key.split('.').reduce((newObj, k) => newObj[k], vm)
    this.fn(newVal)
    Dep.target = null
}
Watcher.prototype.update = function (){// 完成数据更新
    const value = this.key.split('.').reduce((newObj, k) => newObj[k], this.vm)
    this.fn(value)
}
```

- **派发更新**：Watcher收到通知，执行Dep.notify实现视图更新，触发回调（编译过程）

```javascript
//编译
function Compile(el,vm){
    // el表示操作的dom元素 vm实例化对象
    vm.$el = document.querySelector(el)
    /**
     * 创建文档片段，用于内存中构建和操作DOM结构
     * 创建时，页面上对应的dom元素会消失，变成数据，需要重新塞回
     * **/
    let fragment = document.createDocumentFragment()
    while(vm.$el.firstChild){
        fragment.appendChild(vm.$el.firstChild)//将所有元素存入fragment中
    }

    replace(fragment,vm) //替换文档中的字符

    //将编译完成的模版再塞回去
    vm.$el.appendChild(fragment)
}

function replace(fragment,vm){
    //nodeType 1:元素节点，2:属性节点，3:文本节点，4:注释节点
    Array.from(fragment.childNodes).forEach((node)=>{//数组转对象循环
        let text = node.textContent
        let reg = /\{\{(.*)\}\}/;
        if(node.nodeType===3 && reg.test(text)){
            // 更新数据
            new Watcher(vm, RegExp.$1,(newValue) => node.textContent = text.replace(reg,newValue))
        }

        if(node.nodeType===1){//元素节点 v-model实现双向数据绑定
            let nodeAttrs = node.attributes //获取当前元素节点的属性
            Array.from(nodeAttrs).forEach(attr=>{
                let name = attr.name // 获取属性名
                let exp = attr.value // 获取属性值
                if(name.indexOf('v-') === 0){
                    new Watcher(vm,exp,(newValue) => node.value = newValue)
                    node.addEventListener('input',function (e){
                        const keyArr = exp.split('.')
                        //递归找到对应对象并赋值
                        const obj = keyArr.slice(0,keyArr.length - 1).reduce((newObj,k) => newObj[k],vm)
                        obj[keyArr[keyArr.length-1]] = e.target.value
                    })
                }
            })
        }
        if(node.childNodes){
            replace(node,vm)
        }
    })
}
```

## 数组的变化侦测

用拦截器覆盖Array.prototype，使用array原型上的方法操作数组时，执行拦截器中提供的方法