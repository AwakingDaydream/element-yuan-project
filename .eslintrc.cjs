module.exports = {
    //运行环境
    "env": {
        "browser": true,//浏览器端
        "es2021": true, //es2021
        "node":true
    },
    // 支持使用的第三方插件 当我们使用plugins（插件）时，插件提供的配置我们可以在extends里面进行配置
    "plugins": [
        "vue",
        "@typescript-eslint",
        "prettier"
    ],
    //继承的规则集
    /*
    * plugins的配置仅仅代表在项目中引入了哪些规则，并没有指明该规则是警告、报错、忽略，extends要做的就是引入eslint推荐的规则设置。
    * 按照eslint插件的开发规范，每个插件的入口文件都会导出一个对象，其中就有一个configs字段，该字段是个对象，他可以把该插件已有的规则分成不同的风格，
    * */
    "extends": [
        "plugin:vue/vue3-recommended", // vue3规则语法
        "plugin:@typescript-eslint/recommended",// ts规则语法
        // "eslint-config-prettier", // 新增
        "plugin:prettier/recommended" // 防止prettier和eslint发生冲突 代码整体规范
        // 'plugin:vue/recommended' // 如果您使用的是 Vue.js 2.x，请使用此选项
    ],
    //特定类型文件指定处理器 特定类型的文件指定处理器，请使用 overrides 键和 processor 键的组合
    /*
    *"plugins": ["a-plugin"],
    "overrides": [
        {
            "files": ["*.md"],
            "processor": "a-plugin/markdown"
        }
    ]
    * */
    "overrides": [],
    //解析器 javaScript语言类型和风格 指定 JavaScript 相关的选项
    // 在使用了自定义解析器parser后，配置属性parserOptions仍然是必须的。解析器会被传入parserOptions，但是不一定会使用它们来决定功能特性的开关。
    "parser": "vue-eslint-parser",
    // 这里一定要配置对 先使用vue-eslint-parser 再使用@typescript-eslint/parser
    // 先解析 <template> 标签中的内容 然后再解析 vue <script> 标签中的 TS 代码
    "parserOptions": {
        "parser": '@typescript-eslint/parser',
        "ecmaVersion": "latest",//校验ECMA最新版本
        "sourceType": "module" //设置为"script"（默认），或者"module"代码在ECMAScript模块中
    },
    /** 规则 https://www.wenjiangs.com/docs/eslint，vue规则：https://eslint.vuejs.org/rules/
     *  主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
     *  'off' 或 0 - 关闭规则
     *  'warn' 或 1 - 开启警告规则，使用警告级别的错误：warn (不会导致程序退出),
     *  'error' 或 2 - 开启错误规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    "rules": {
        'prettier/prettier': 'error',
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁止使用debugger
        'no-console': 0, // 禁止使用console
        'no-unused-vars': 2, // 存在声明但未使用的变量
        'no-useless-escape': 0, // 禁止不必要的转义字符
        'no-alert': 0, // 禁止使用 alert、confirm 和 prompt

        'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
        'generator-star-spacing': 0, // 生成器函数*的前后空格
        '@typescript-eslint/explicit-module-boundary-types': 0, // 函数的返回值类型必须被显式声明
        '@typescript-eslint/no-empty-function': 0, // 禁止出现空函数
        '@typescript-eslint/ban-types': 0, // 禁止使用特定的类型
        '@typescript-eslint/no-var-requires': 0, // 禁止使用 require 语句
        'arrow-parens': 0, // 箭头函数用小括号括起来
        '@typescript-eslint/ban-ts-comment': 0, // 禁止使用ts的注释
        '@typescript-eslint/no-unused-vars': 0, // 禁止出现未使用过的变量

        '@typescript-eslint/no-this-alias': 0, // 禁止将 this 别名
        '@typescript-eslint/no-inferrable-types': 0, // 禁止使用隐式 any 类型
        '@typescript-eslint/no-extra-semi': 0, // 禁止不必要的分号
        'prefer-const': 0, // 推荐使用const
        '@typescript-eslint/no-explicit-any': 0, // 禁止使用any类型
        '@typescript-eslint/no-empty-interface': 0, // 禁止空接口
        '@typescript-eslint/no-non-null-assertion': 0, // 禁止使用!后缀运算符
        'vue/no-side-effects-in-computed-properties': 1, // 禁止在计算属性中对属性修改

        'linebreak-style': 'off', // 换行风格
        'class-methods-use-this': 'off', // 确保在类的方法中没有无效的this引用
        'import/no-cycle': [0, { ignoreExternal: true }], // 防止在 JavaScript 项目中导入路径产生循环引用
        'global-require': 'off', // 检查是否在 ESLint 文件中全局调用了 require 函数
        'no-unused-expressions': 'off', // 检查在 JavaScript 代码中是否有无用的表达式
        'no-plusplus': 'off', // 禁止使用自增（++）和自减（--）操作符
        'no-underscore-dangle': 'off', // 禁止使用前导下划线命名变量或函数
        'no-tabs': 'off', // 禁止代码中的 tab 字符的使用，因为 tab 容易造成代码缩进混乱
        'max-len': 'off', // 限制一行代码的最大长度
        'no-async-promise-executor': 'warn', // 禁止在 Promise 构造函数中使用 async 函数作为执行器
        'no-param-reassign': 'warn', // 禁止对函数参数进行重新赋值
        'quotes': ['error', 'single'], // 指定字符串是否必须使用单引号'或双引号"
        'no-nested-ternary': 'off', // 禁止使用嵌套的三元运算符
        'complexity': ['off', 30], // 限制函数的复杂度
        'vue/attributes-order': 'off', // 禁止在组件中使用未排序的属性
        'lines-between-class-members': 'off', // 禁止类成员之间出现空行
        'camelcase': [2, { properties: 'never' }], // 强制使用骆驼拼写法或强制使用小写单词拼写法
        // 关闭驼峰命名规则
        'vue/multi-word-component-names': 0,
    }
}
