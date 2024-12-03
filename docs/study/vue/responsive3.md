# Vue3响应式原理

## proxy代理对象

new Proxy：传入一个源对象，返回一个新对象（代理对象）

```javascript
//定义全部变量，触发者 目标对象
const obj = {name:'xiaopang'}

//使用proxy完成代理，生成代理对象
const proxy = new Proxy(obj,{
  get(target,key){//target 目标对象，key 代理对象的属性名
    //当访问proxy代理对象的属性时，会执行该函数 访问的属性会放到proxy里面的Target 将get函数的返回值作为表达式的值
    return target[key]
  },
  set(target,key,value){//value 代表设置的值
    //当设置proxy代理对象的属性时，会执行set函数
    target[key] = value
    return true //赋值成功后返回boolean
  }
})

proxy.name='chenyixu'
console.log(obj)
```

## reactive函数的实现

```javascript
修改源对象或者代理对象，都会影响另一方，导致两边都更新
const aboutObj = { name: "chinaYuan", age: 22 }
  const state = reactive(aboutObj);

  setTimeout(() => {
    state.age = 80
    console.log("state.name----out", aboutObj.age,state.age);// 80 80
  }, 2000);

function reactive(data){
  if(!isObject(data))return
  return new Proxy(data,{
    get(target,key){//target 目标对象，key 代理对象的属性名
      //当访问proxy代理对象的属性时，会执行该函数 访问的属性会放到proxy里面的Target 将get函数的返回值作为表达式的值
      return target[key]
    },
    set(target,key,value){//value 代表设置的值
      //当设置proxy代理对象的属性时，会执行set函数
      target[key] = value
      console.log(target,key)
      return true //赋值成功后返回boolean
    }
  })
}

const sourceObj = {name:''}
const p = reactive(sourceObj)
p.name = '陈奕迅'
console.log('sourceObj---',p,sourceObj)
```

## 副作用函数

如果一个函数引用了外部的资源，这个函数会受到外部资源改变的影响，我们就说这个函数存在副作用，也被称作副作用函数

```javascript
const bucket = new Set() //副作用函数桶，存放所有的副作用函数 set集合类型会自动去除重复的元素，也可以使用forEach

  function isObject(obj) {
    return typeof obj === "object";
  }

  function reactive(data) {
    if (!isObject(data)) return;
    return new Proxy(data, {
      get(target, key) {
        //target 目标对象，key 代理对象的属性名
        //当访问proxy代理对象的属性时，会执行该函数 访问的属性会放到proxy里面的Target 将get函数的返回值作为表达式的值
        return target[key];
      },
      set(target, key, value) {
        //value 代表设置的值
        //当设置proxy代理对象的属性时，会执行set函数
        target[key] = value;
        bucket.forEach((fn)=>{
          fn()
        })
        return true; //赋值成功后返回boolean
      },
    });
  }

  function effect(){
    console.log('effect被执行了,执行响应式修改');
    document.querySelector("#app").innerHTML = state.name
  }
  bucket.add(effect)//set集合使用add方法添加元素

  const state = reactive({name:'chinaYuan'})
  state.name = 'xiaoxueting'
```

## 依赖收集

在不同的属性值发生改变时，只执行需要的副作用函数

> 如果一个副作用函数只引用了name
>
> 另一个副作用函数引用了age
>
> 更新name的时候只需要执行name的副作用函数，而不需要执行age的副作用函数
>
> 依赖收集就是建立属性与副作用函数之间的对应关系

### 基本代码

通过副作用函数桶，对应属性发生改变执行对应的副作用函数

实现基本的reactive函数封装

```javascript
const bucket = new WeakMap(); //Map和Set相关 WeekMap[Map[name:Set(fn,fn),age:Set(fn,fn)],Map[name:Set(fn,fn),age:Set(fn,fn)]]

  function isObject(obj) {
    return typeof obj === "object";
  }

  let activeEffect = null;
  function effect(fn) {
    //注册，开始执行是为了放入对应副作用函数桶中
    if (typeof fn !== "function") return;
    //记录正在执行的副作用函数
    activeEffect = fn;
    //注册时调用副作用函数 调用后因为使用的相关属性，走入了get方法，将副作用函数放入桶中
    fn();
    //重置activeEffect，副作用函数放入桶中后，将值清空
    activeEffect = null;
  }

  // 收集依赖
  function track(target, key) {
    if (!activeEffect) return;
    let depMap = bucket.get(target) //第一层Map 判断属性属于哪一个代理函数,根据代理对象target判断
    if(!depMap){
      depMap = new Map()
      bucket.set(target,depMap) // 第二层Set 判断相同属性添加
    }
    let depSet = depMap.get(key);
    if (!depSet) {
      depSet = new Set();
      depMap.set(key, depSet);
    }
    depSet.add(activeEffect);
  }
  //执行依赖
  function trigger(target, key) {
    let depMap = bucket.get(target)
    if(!depMap)return
    let depSet = depMap.get(key);
    if (depSet) {
      //执行对应属性的副作用函数
      depSet.forEach((fn) => {
        fn();
      });
    }
  }

  //响应式函数
  function reactive(data) {
    if (!isObject(data)) return;
    return new Proxy(data, {
      get(target, key) {
        track(target, key); //依赖收集副作用函数
        return target[key];
      },
      set(target, key, value) {
        target[key] = value;
        trigger(target, key); //修改时触发依赖
        return true; //赋值成功后返回boolean
      },
    });
  }
```

## ref的基本实现

```javascript
/**
 * @desc 如果是对象和数组，则转化为响应式对象
 */
function toReactive(value) {
  return isObject(value) ? reactive(value) : value
}

/**
 * @desc RefImpl
 * @issue1 如果是对象和数组，则转化为响应式对象
 */
class RefImpl {
  // ref标识
  public __v_isRef = true
  // 存储effect 放入副作用函数
  public dep = new Set()
  public _value
  constructor(public rawValue, public _shallow) {
    // @issue1
    this._value = _shallow ? rawValue : toReactive(rawValue)
  }
  get value() { 设置get方法，返回变量_value
    // 取值的时候收集依赖
    trackEffects(this.dep)
    return this._value
  }
  set value(newValue) { 设置set方法，修改变量_value
    // 新旧值不相等
    if (newValue !== this.rawValue) {
      // @issue1
      this._value = this._shallow ? newValue : toReactive(newValue)
      this.rawValue = newValue
      // 设置值的时候触发依赖
      triggerEffects(this.dep)
    }
  }
}


// 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。
export function ref(value) {
  return new RefImpl(value)
}
```

