//发布订阅模式 先订阅 再发布
function Dep(){ //绑定的方法 都绑定一个update属性
    this.subs = []
}
Dep.prototype.addSub = function (sub){ //添加所需要的订阅对象
    this.subs.push(sub)
}
Dep.prototype.notify = function (){//通知 执行数据更新
    this.subs.forEach(sub=>sub.update())
}

function Watcher(fn){//被观察的数据
    this.fn = fn
}
Watcher.prototype.update = function (){//通知 执行数据更新
    this.fn()
}

let watcher = new Watcher(function (){
    console.log(123)
})

let dep = new Dep()
dep.addSub(watcher)
dep.notify()
