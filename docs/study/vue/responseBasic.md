# Vue3响应式使用

## 响应式基础

### reactive实现

`ObjectRefImpl`是用于实现`reactive`的内部类

将深层地转换对象：当访问嵌套对象时，它们也会被 `reactive()` 包装。当 ref 的值是一个对象时，`ref()` 也会在内部调用它。如果重新赋值整个对象，Vue将无法追踪原始对象的变化，没有在引用相同的对象。

`reactive`返回的对象是对原始对象的引用，而不是简单值的包装。

> 类似对象的浅拷贝,是保存对象的栈地址,无论值怎么变还是指向原来的对象的堆地址;
>
> `reactive`就算赋值一个新的对象,`reactive`还是指向原来对象堆地址
>
> reactive(a) 指向的是 a的原始地址 在重新赋值b 指向的就是b的原始地址了

```javascript
// 判断是否为对象
const isObject = val => val !== null && typeof val === 'object';
// 判断key是否存在
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

export function reactive<T extends object>(target:T) {
    // 首先先判断是否为对象
    if (!isObject(target)) return target;

    const handler = {
        get(target, key, receiver) {
            console.log(`获取对象属性${key}值`)
            // 收集依赖 ...
            const result = Reflect.get(target, key, receiver)
            // 深度监听（惰性）
            if (isObject(result)) {
                return reactive(result);
            }
            return result;
        },

        set(target, key, value, receiver) {
            console.log(`设置对象属性${key}值`)
            // 首先先获取旧值
            const oldValue = Reflect.get(target, key, reactive)
            let result = Reflect.set(target, key, value, receiver); //返回的事boolean
            if (result && oldValue !== value) {
                // 更新操作 ...
            }
            return result
        },
        deleteProperty(target, key) {
            console.log(`删除对象属性${key}值`)
            // 先判断是否有key
            const hadKey = hasOwn(target, key)
            const result = Reflect.deleteProperty(target, key)
            if (hadKey && result) {
                // 更新操作 ...
            }
            return result
        },
    }
    return new Proxy(target, handler)
}

const obj = { a: { b: { c: 6 } } };
const proxy = reactive(obj);

proxy.a.b.c = 77;
```

### ref的实现

`RefImpl`：`RefImpl`是用于实现`ref`的内部类，用.value来获取它的值

本质：ref(0) --> reactive( { value:0 })

> #### triggerRef()的使用
>
> ref底层会调用的方法，更新视图，和shadowRef这种只能修改浅层数据的api放在一起（使用shadowRef修改深层数据不会更新视图，shadowReactive同理），会导致视图的更新造成混淆

```javascript
// 自定义ref
function ref(target) {
  const result = { // 这里在源码中体现为一个类 RefImpl
    _value: reactive(target), // target传给reactive方法做响应式处理，如果是对象的话就变成响应式
    // get set 后面 跟属性名可以完成对单个属性的劫持，在vue2则需要用objectdefineProperty去循环劫持
    get value () {
      return this._value
    },
    set value (val) {
      this._value = val
      console.log('set value 数据已更新, 去更新界面')
    }
  }
 
  return result
}
// 测试
const ref = ref(9);
ref.value = 6;
const ref = ref({a: 4});
ref.value.a = 6;
```

### reactive和ref的异同

#### 原始值与响应式对象

1.ref对于赋值本质上是  **ref(0) --> reactive( { value:0 })**  函数本质上是通过reactive进行的赋值响应式

2.当ref被解构出来后的复杂数据类型为 reactive响应式对象

```javascript
//将同一个对象复制成响应式对象，会返回相同的代理
const defaultObj = { name:1 }
const defaultObj1 = ref(defaultObj)
const defaultObj2 = reactive(defaultObj)
console.log(defaultObj===defaultObj1.value) false
console.log(defaultObj===defaultObj2) false
console.log(defaultObj2===defaultObj1.value) true

// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true
// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true

//只有代理对象是响应式的，更改原始对象不会触发更新。
const proxy = reactive({})
const raw = {}
proxy.nested = raw
console.log(proxy.nested === raw) // false
```

2.代理对象里面的数据发生变化时，对应的原始数据也会发生变化

修改原始对象数据，会影响代理对象发生数据改变，但是没有触发响应式更新。

```javascript
<script setup>
  import { reactive } from 'vue'
  const obj = {
    count: 1
  }
  const proxy = reactive(obj);
  
  proxy.count++;
  console.log(proxy.count); // 2
  console.log(obj.count);   // 2

 const obj = {
    count: 1
  }
  const proxy = reactive(obj);
  
  obj.count++;
  console.log(proxy.count); // 2
  console.log(obj.count);   // 2
</script>
```

3.当我们将响应式对象的原始类型属性进行解构时，或者将该属性传递给函数时，会丢失响应式。

如果只是基本类型属性，会丢失响应式，复杂类型属性则还是会有响应式，修改解构出来的值，原始响应式对象也会发生改变

```javascript
const state = reactive({ count: 0 })
// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++
// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```

#### watch监听中的不同

当ref给复杂数据类型赋值时，需要监听到深层数据变化，监听的对象没有添加.value的情况下需要添加deep:true

## 响应式工具函数

### isRef()

检查某个值是否为 ref

### unref()

val = **isRef**(val) ? val.value : val;

### shallowRef()

深层的属性则不具备响应式

```javascript
<template>
    <div>
        {{ shallowObj.a }}
        <button @click="addCount"> +1</button>
    </div>
</template>

<script lang='ts' setup>
import { shallowRef } from "vue"

const shallowObj = shallowRef({
    a: 1
})
const addCount = () => {
    //不会触发页面更新
    shallowObj.value.a++
}
</script>

```

### toRef()

1.toRef 可以根据一个响应式对象中的一个属性,创建一个响应式的 ref。同时这个 ref 和原对象中的属性保持同步,改变原对象属性的值这个 ref 会跟着改变,反之改变这个 ref 的值原对象属性值也会改变,它接收两个参数,一个是响应式对应,另一个则是属性值,如果是复杂类型的解构，可以直接获得到reactive类型的响应式数据

```javascript
<template>
    <div>
        {{ count.a }}
        {{ a }}
        <button @click="addCount">+1</button>
    </div>
</template>

<script lang='ts' setup>
import { ref, toRef } from "vue"
const count = ref({
    a: 1,
    b: 2
})
const a = toRef(count.value, 'a')
const addCount = () => {
    a.value++ //不管修改哪个 都会同时变化
}
</script>
```

2.当rective的复杂数据类型直接赋值，会导致响应式丢失

```javascript
const shadowObj = ref({
  name:20,
  list:[1,2,3,4]
})
const getList = shadowObj.value.list //此时赋值的list为reactive响应式，重新赋值会丢失响应式
console.log(shadowObj.value.list)
function change1(){
  shadowObj.value.list = [5,6,7]
  console.log(shadowObj.value.list,getList) //这时候的list的指向发生改变，但是因为是直接赋值，无法完成响应式更新
  
  const getList = toRef(shadowObj.value,'list')//通过toRef的方式，实现响应式更新
}
```

### toRefs()

toRefs 它可以将一个响应式对象转成普通对象,而这个普通对象的每个属性都是响应式的 ref

```javascript
<template>
    <div>
        {{ count.a }}
        {{ countAsRefs.a }}
        <button @click="addCount">+1</button>
    </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs } from "vue"
const count = reactive({
    a: 1,
    b: 2
})
const countAsRefs = toRefs(count)
const addCount = () => {
    countAsRefs.a.value++
}

</script>

{
  a: Ref<number>,
  b: Ref<number>
}
```

### toRaw()

移除响应式

## reactive赋值的响应问题

```javascript
const _showList = reactive({
  name:'袁诗博',
  list:[1,2,3,4]
})

//需要使用toRef保持属性同步，不然父元素属性重新赋值响应式会直接丢失
let _aboutList = _showList.list //不管是ref还是reactive解构出来都是reactive
console.log('_aboutList--',_aboutList)

function change(){
  //重新赋值 会导致响应式丢失
  _showList.list = [5,6,7]
  
  // 如果是直接解构出来，不考虑重新赋值只是修改内容，可以保持同步
  _aboutList.push(5)
  
  //`reactive`返回的对象是对原始对象的引用，而不是简单值的包装。 因此重新赋值拿到的也是[5,6,7,8]的地址引用
  _aboutList = reactive([5,6,7,8])
  console.log('_showList.list---',_aboutList)
  
  //reactive如果重新赋值
  function change(){
    _showList.list = [5,6,7]
    _changeValye.value = 4 // template标签中如果存在有ref标签更新，页面也会因为triggerRef强制更新
    console.log('_showList.list---',_aboutList)
  }
}
```

