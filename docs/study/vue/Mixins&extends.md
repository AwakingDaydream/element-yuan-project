# Mixins、extends的使用

## Mixins的基本使用

**Minxis是一种Vue组件项目，允许我们定义一些可重用的组件选项**

组件通过mixins:[***]使用

mixins和父子组件的生命周期：

mixin的beforeCreate > 父beforeCreate > mixin的created > 父created > mixin的beforeMount > 父beforeMount > 子beforeCreate > 子created > 子beforeMount > 子mounted > mixin的mounted >父mounted

```javascript
import otherChange from "@/components/otherChange.vue";

export const search = {
    components:{
        otherChange //可以直接供组件使用
    },
    data(){
        return {//当组件和mixins有相同的变量的时候，组件会覆盖mixins里面的值
            searchQuery:{
                pageNum:1,
                pageSize:10
            }
        }
    },
    created(){
        setTimeout(()=>{
            this.searchQuery.pageNum =2
        },1000)
        console.log('searchQuery----',this.searchQuery)
    },
    computed:{
        searchQueryChange(){
            console.log('.searchQuery.pageNum---',this.searchQuery.pageNum)
            return this.searchQuery.pageNum
        }
    }
}

```

## 多个Mixins覆盖问题

```javascript
const mixinA = {
  data() {
    return {
      message: 'Mixin A'
    };
  }
};

const mixinB = {
  data() {
    return {
      message: 'Mixin B'
    };
  }
};

const ComponentC = {
  mixins: [mixinA, mixinB],
  template: '<div>{{ message }}</div>'
};

// 最终渲染结果是 'Mixin B'，因为 mixinB 覆盖了 mixinA
```



## extends的基本使用

是另外一种Vue组件选项，创建一个新组件，该组件继承另一个组件的所有选项（直接相同的覆盖）

extends类似于mixin,相当于继承,但是只是继承options Api中的内容，不继承template模板

```javascript
const BaseComponent = {
  data() {
    return {
      message: 'Hello from BaseComponent'
    };
  }
};

const ExtendedComponent = {
  extends: BaseComponent,
  data() {
    return {
      message: 'Hello from ExtendedComponent' // 覆盖基础组件的数据属性
    };
  }
};

// ExtendedComponent 中的 message 将覆盖 BaseComponent 中的 message

```

![img](https://img-blog.csdnimg.cn/2693b848cb214c7998eee3ba0edf3a38.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Y2W6I-c55qE5bCP55m9,size_20,color_FFFFFF,t_70,g_se,x_16)





## 两者区别

- 两个都可以理解为继承，mixins接收对象数组（可理解为多继承，可以同时混入多个），extends接收的是对象或函数（可理解为单继承，只能为一个）

- `mixin`通过合并选项的方式，允许多个`mixin`和组件共享相同的选项，但`data`选项的处理方式不同。
- `extends`允许你创建一个新组件，继承另一个组件的所有选项，但完全覆盖相同选项。

```javascript
const extend = {
 created () {
  console.log('extends created')
 }
}
const mixin1 = {
 created () {
  console.log('mixin1 created')
 }
}
const mixin2 = {
 created () {
  console.log('mixin2 created')
 }
}
export default {
 extends: extend,
 mixins: [mixin1, mixin2],
 name: 'app',
 created () {
  console.log('created')
 }
}

extends created
mixin1 created
mixin2 created
created

- 结论: 优先调用mixins和extends继承的父类，extends触发的优先级更高，相对于是队列
- push(extend, mixin1, minxin2, 本身的钩子函数)
- 经过测试， watch的值 继承规则一样
```



