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

  Compile(options.el,this)
}

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
            //更新页面
            // RegExp.$1 取 匹配字符的第一个 必须搭配使用
            // let arr = RegExp.$1.split(".") // a.a a.b
            // let val = vm
            // arr.forEach((key)=>{//循环取到类似于a.a这样深层嵌套的值
            //     val = val[key]
            // })
            // //替换的逻辑
            // node.textContent = text.replace(reg,val)
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
    if (Array.isArray(data[key])) {
        // 数组，需要特殊处理，进行劫持数组方法
        (data[key]).__proto__ = arrayMethods;
        observeArray(data[key]);
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

//数据的监测方法
import { def } from "core/util/lang";
const arrayProto = Array.prototype;

/**
 * 将数组的每一项进行响应式处理
 * @param value
 */
function observeArray(value) {
    for (let i = 0, l = value.length; i < l; i++) {
        observe(value[i]);
    }
}

export const arrayMethods = Object.create(arrayProto);// 创建一个新对象，该新对象的原型指向 Array 的原型

const methodsToPatch = [//需要监测的数组方法
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse",
];

methodsToPatch.forEach((method) => {
    // 缓存原始方法
    const original = arrayProto[method];

    // 定义新方法
    def(arrayMethods, method, function (...args) {
        console.log("劫持数组", args);
        const result = original.apply(this, args);
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case "push":
            case "unshift":
                inserted = args;
                break;
            case "splice":
                inserted = args.slice(2);
                break;
        }

        if (inserted) {
            ob.observeArray(inserted);
        }

        // 通知更新

        return result;
    });
});
