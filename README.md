# Vue + Webpack 的 todo app

## 使用方法
1、进入根目录执行：npm i
2、运行：npm run dev

webpack<br/>
Vue<br/>
vue-loader
css-loader-------处理css文件中的url()等	http://www.css88.com/doc/webpack/loaders/css-loader/<br/>
style-loader-------自动将css代码放到生成的style标签中插入到head标签里		http://www.css88.com/doc/webpack/loaders/style-loader/<br/>
url-loader-------解决图片较多，会发很多http请求，会降低页面性能等问题		http://www.css88.com/doc/webpack/loaders/url-loader/<br/>
file-loader-------解决图片引入问题		http://www.css88.com/doc/webpack/loaders/file-loader/<br/>
stylus<br/>
stylus-loader-------将stylus语言转化为原生css<br/>
cross-env-------运行跨平台设置和使用环境变量的脚本<br/>
html-webpack-plugin-------生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）<br/>
webpack-dev-server-------提供了开发环境调试工具 		https://blog.csdn.net/qq_38652603/article/details/73865017
postcss-loader-------补全css代码的兼容性前缀<br/>
autoprefixer-------自动添加css前缀的功能<br/>
babel-plugin-syntax-jsx<br/> 		
babel-helper-vue-jsx-merge-props<br/>
extract-text-webpack-plugin-------将样式文件单独打包 		http://www.css88.com/doc/webpack/plugins/extract-text-webpack-plugin/<br/>
babel-preset-env-------根据当前的运行环境来自动配置源码到当前环境可正常运行的代码的编译转换    https://coding.imooc.com/learn/questiondetail/8901.html<br/>
babel-plugin-transform-vue-jsx-------Vue官方提供了一个叫做babel-plugin-transform-vue-jsx的插件来编译JSX<br/>
babel-core-------babel-core是作为babel的核心存在,babel的核心api都在这个模块里面<br/>
babel-loader-------调用babel-core的API来完成转译过程		http://www.css88.com/doc/webpack/loaders/babel-loader/<br/>