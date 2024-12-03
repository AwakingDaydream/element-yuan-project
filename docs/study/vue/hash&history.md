# hash和history模式

### hash:#/结尾 

###### 1.通过锚点技术充血URL访问路径，在原有的路径后面拼接 #/        href="#/aaa"

###### 2.通过window.onhashchange()方法去监听到hash值的改变

###### 3.分布式微前端会出现问题（多个开发多个项目，合并成一个项目的情况下，hash会混乱）

###### 4.视觉不美观 多了#号

### History:/结尾

###### 1.通过history对象的pushState()函数去充血URL路径，并且不触发跳转

###### 	点击事件 history.pushState(null,'page','/index) 直接修改端口（port）后面的所有字符串

###### 2.如果使用了history模式后刷新 会出现404 因为history通过改变路径完成不刷新（不包括原有html物理文件的访问地址），但是刷新后浏览器会按照真实路径去寻找，然而找不到，因此404，在vue的生产环境不会出现此问题，部署到服务器会遇到该问题，从而出现404，因此服务器需要 重定向 



属性含义

location.protocal协议

location.hostname主机名

location.host主机

location.port端口号

location.patchname访问页面

location.search搜索内容

location.hash哈希值



//http://127.0.0.1:8001/01-hash.html?a=100&b=20#/aaa/bbb 

location.protocal // 'http:'

localtion.hostname // '127.0.0.1'

location.host // '127.0.0.1:8001' 

location.port //8001 

location.pathname //'01-hash.html' 

location.serach // '?a=100&b=20' 

location.hash // '#/aaa/bbb'