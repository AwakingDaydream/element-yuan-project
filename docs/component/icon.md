# Icon 图标

以 `fontawesomeIcon` 为主的再度封装

## 安装依赖

安装基础依赖库
``` yaml
npm install --save fontawesome-svg-core
npm install --save vue-fontawesome
```

安装样式依赖库

`regular` `solid` `brands` 三种样式
``` yaml
npm install --save @free-regular-svg-icons
npm install --save @free-solid-svg-icons
npm install --save @free-brands-svg-icons
```

## 引入

``` js
// 全局引入
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

// 按需引入即可
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
```

## 样式使用

以 `['fas', 'face-smile-beam']` 、`['far', 'face-smile-beam']` 的方式使用

`fas` 代表实心 `far` 代表空心

通过 `color` 属性定义颜色

<preview path="../demo/icon/basic.vue" title="Component Preview" description="Preview By Component Form"></preview>

## API

### Attributes
大部分属性继承于 `FontAwesomeIcon` 根据 `FontAwesomeIconProps` 查看

| 属性名        | 说明     | 类型                        | 默认值 |
|:-----------|:-------|:--------------------------|:----|
| color      | 尺寸     | `string`                  | -   |
| icon       | 图标     | `string[]`                | 必传  |
