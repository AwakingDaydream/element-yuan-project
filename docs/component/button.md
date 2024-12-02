---
title: 'Button Component'
---

# Button 按钮
常用的操作按钮
## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/button/basic.vue" title="Component Preview" description="Preview By Component Form"></preview>

## 禁用用法

你可以使用 `disabled` 属性来定义按钮是否被禁用。

使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

<preview path="../demo/button/disabled.vue" title="Component Preview" description="Preview By Component Form"></preview>

## 链接按钮

> [!WARNING]
> `type="text"` 已被 废弃

<preview path="../demo/button/link.vue" title="Component Preview" description="Preview By Component Form"></preview>

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

使用 `icon` 属性来为按钮添加图标。 您可以在我们的 Icon 组件中找到所需图标。 通过向右方添加 `<i>` 标签来添加图标， 你也可以使用自定义图标。

<preview path="../demo/button/icon.vue" title="Component Preview" description="Preview By Component Form"></preview>

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 `true` 来显示加载中状态。

> [!TIP]
> 您可以使用 `loadingIcon` 插槽自定义您的loading图标

<preview path="../demo/button/loading.vue" title="Component Preview" description="Preview By Component Form"></preview>

## 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

使用 `size` 属性额外配置尺寸，可使用 `large` 和 `small` 两种值。

<preview path="../demo/button/size.vue" title="Component Preview" description="Preview By Component Form"></preview>

## Button API

### Button 属性

| 属性名        | 说明     | 类型                                            | 默认值      |
|:-----------|:-------|:----------------------------------------------|:---------|
| size       | 尺寸     | `small` `normal` `large`                      | `normal` |
| type       | 样式     | `primary` `danger` `info` `success` `warning` | -        |
| round      | 圆角     | `boolean`                                     | `false`  |
| circle     | 原型按钮   | `boolean`                                     | `false`  |
| disabled   | 禁用     | `boolean`                                     | `false`  |
| nativeType | 按钮操作类型 | `button` `submit` `reset`                     | `button` |
| autofocus  | 自动获取焦点 | `boolean`                                     | `false`  |
| loading    | 正在加载   | `boolean`                                     | `false`  |
| icon       | 图标     | `string` `string[]`                           | -        |

### Button 插槽

| 插槽名         | 说明       |
|:------------|:---------|
| default     | 自定义默认内容  |
| loadingIcon | 自定义加载中组件 |
