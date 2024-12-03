# Vue指令合集



- ###  **v-text和v-html**

  |      v-text      |            v-html            |
  | :--------------: | :--------------------------: |
  | 用于渲染普通文本 | 可以渲染标签，解析 HTML 代码 |
  |   Hello  Vue!    | <strong>Hello</strong> Vue!  |

  

- ###  v-if、v-else-if、v-else和v-show

  >  根据表达式的值真假条件来渲染元素，会销毁元素再重新创建。v-show则不会销毁元素，相当于display

  

- ### v-bind和v-model 

  |                    v-bind                    |             v-model              |
  | :------------------------------------------: | :------------------------------: |
  |                   单向绑定                   |             双向绑定             |
  |            用于动态绑定标签的属性            | 用于表单，实现表单数据的实时更改 |
  | css的样式、对象、数组、number 类型、bool类型 |             表单元素             |

  > v-model 其实就是相当于 :value="message" @input="message = $event.target.value"

  |             | 修饰符  |                             作用                             |
  | :---------: | :-----: | :----------------------------------------------------------: |
  | **v-bind**  |  .sync  | props进行一个双向绑定，自组件传递的事件名必须格式必须为update:value, 其中value必须与自组件中props中声明的名称完全一致 |
  |             |  .prop  |      设置自定义标签属性，避免暴露数据，防止污染HTML结构      |
  |             | .camel  |                    将命名变为驼峰法命名法                    |
  | **v-model** |  .trim  |                    用来过滤输入的前后空格                    |
  |             | .number |       将字符串转化为数字，并且在失去焦点时将非数字删除       |
  |             |  .lazy  | 改变v-model的语法糖，原本监听input事件                                               :value="value"  @change="value=$event.target.value" |

  

- ###  v-on

  >  用于绑定dom事件，实现dom事件的处理

  |  修饰符  |        作用        |
  | :------: | :----------------: |
  |  .stop   |  阻止事件继续传播  |
  | .prevent |  事件不再重载页面  |
  | .capture | 先处理元素自身事件 |
  |  .once   |     只触发一次     |

  

- ### v-once

  > 关联的实例，只会渲染一次。它的作用就是定义它的元素或组件只会渲染一次，包括元素或者组件的所有字节点。首次渲染后，不再随着数据的改变而重新渲染。也就是说使用v-once，那么该块都将被视为静态内容,用于优化性能。

  

- ###  v-cloak

  >  当网络较慢，网页还在加载 Vue.js ，而导致 Vue 来不及渲染，这时页面就会显示出 Vue 源代码。我们可以使用 v-cloak 指令来解决这一问题。

  ![img](https://upload-images.jianshu.io/upload_images/3386108-cc0cda1d980b9586.gif?imageMogr2/auto-orient/strip|imageView2/2/w/288/format/webp)

  

- ###  v-pre

  > 只会编译静态标签，从实例中拿到的变量常量都不会显示

  ![img](https://img-blog.csdnimg.cn/20190719113349402.png)

  编译结果：

  ![img](https://img-blog.csdnimg.cn/20190719113411988.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMjQ0ODEw,size_16,color_FFFFFF,t_70)

- ### v-for 

  > 遍历data中存放的数组数据，实现列表的渲染

  ```javascript
  //1.迭代普通数组
  data:{
        list:[1,2,3,4,5,6]
  }
  <p v-for="(item,i) in list">--索引值--{{i}}   --每一项--{{item}}</p>
  
  //2.迭代对象数组
  listObj:[
          {id:1, name:'zs1'},
          {id:2, name:'zs2'},
          {id:3, name:'zs3'},
          {id:4, name:'zs4'},
          {id:5, name:'zs5'},
          {id:6, name:'zs6'},
        ]
  <p v-for="(user,i) in listObj">--id--{{user.id}}   --姓名--{{user.name}}</p>
  
  //3.迭代对象
  user:{
          id:1,
          name:'托尼.贾',
          gender:'男'
        }
  <p v-for="(val,key) in user">--键是--{{key}}--值是--{{val}}</p>
  
  //4.迭代数字
  
  <!-- 注意：如果使用v-for迭代数字的话，前面 count 的值从 1 开始-->
  <p v-for="count in 10">这是第{{count}}次循环</p>
  
  ```

  

  

​			