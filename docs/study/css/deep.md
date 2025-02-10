# 样式隔离

## 属性选择器
HTML允许给DOM元素设置属性`（<p bg-red>属性</p>）或属性值(<p data=“red”>属性值</p>)`,通过属性进一步选择元素，修改其样式。
```html
<html>
    <head>
      <style>
        p[bg-red] {
          background-color: red;
        }
    
        p[fontColor="red"] {
          color: red;
        }
      </style>
    </head>
    <body>
      <p bg-red>文本一</p>
      <p fontColor="red">文本二</p>
    </body>
</html>
```

## scoped基本原理

使用scoped的组件、会生成唯一标识，组件中的每个标签dom元素添加一个属性标签

给scoped中的每一个选择器最后添加一个属性选择器，原选择器`[data-v-xxxx]

```js
// 当父子组件拥有同一个类名的时候
<div data-v-598e5607 class="common parent">
    <div data-v-598e5607 class="left">你好，我是父组件</div>
    <div data-v-1310b012 data-v-598e5607 class="son common">
        <div data-v-1310b012 class="left">你好，我是子组件</div>
    </div>
</div>

```
```scss
//父组件
.common[data-v-598e5607] {
    background: #3c3f44;
    .left[data-v-598e5607] { //父组件
        color: #3dd68c;
    }
}
//子组件
.common {// 根组件 跟父组件同名 导致被父组件影响
  background: grey;// 被父组件属性影响[data-v-598e5607]
  .left[data-v-1310b012] {
    //单独生效，组件除去根组件绑定的都是子组件的属性标签
    color: red;
  }
}
```
<preview path="../../views/css/deep/index.vue" title="Component Preview" description="Preview By Component Form"></preview>


## 深度选择器

相关标签：`/deep/`、`::v-deep`、`:deep()`

scoped的标签影响下，css只能作用于当前组件中，子组件无法覆盖更新

deep选择器能够穿透组件，从而实现子组件样式修改

多作用于类如element框架的样式覆盖，不影响全局变量

```scss
// 编译情况：.common[data-v-598e5607] .left
.common { // 父组件使用deep，则实现样式覆盖
	background: #3c3f44;
	:deep(.left) {
		color: #3dd68c;
	}
}
```
