const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'), // 输入：项目主文件（入口文件）
  output: {  // 输出
    filename: 'boudle.[hash:8].js',  // 输出的文件名
    path: path.join(__dirname, 'dist')  // 输出路径
  },
  module: {  // 配置加载资源
    rules: [
      {  // 规则
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|gif|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,  // 文件小于1024字节，转换成base64编码，写入文件里面
            name: '[name]-aaa.[ext]'
          }
        }]
      }
      // {
      //   test: /\.(js|vue)$/,
      //   use: [{
      //     loader: 'eslint-loader',
      //     enforce: 'pre',
      //     include: [resolve('src'), resolve('test')],
      //     options: {
      //       formatter: require('eslint-friendly-formatter'),
      //       // 不符合Eslint规则时只警告(默认运行出错)
      //       // emitWarning: !config.dev.showEslintErrorsInOverlay
      //     }
      //   }]
      // }
    ]
  },
  // webpack插件配置
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

if (isDev) {
  // 开发坏境的配置
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {  // webpack编译出现错误，则显示到网页上
      errors: true,
    },
    //热加载——改代码后只渲染某个组建，不重新加载整个页面
    hot: true,
    //单页应用会做很多前端路由，请求的地址不一定是index.html的地址，
    //会把webpack不理解的地址、没有映射的地址都映射到index.html里
    // historyFallBack: {
    // },

    //启动打开浏览器（新的页面）
    // open: true,

  }
  //热加载需要的组建
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // 生成坏境的配置
  config.entry = {  // 将所用到的类库单独打包
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[chunkhash:8].css')
    // 将类库文件单独打包出来
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
    // webpack相关的代码单独打包
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime'
    // })
  )
  config.optimization = {
    splitChunks: {
      cacheGroups: {              // 这里开始设置缓存的 chunks
        commons: {
          chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          minSize: 0,             // 最小尺寸，默认0,
          minChunks: 2,           // 最小 chunk ，默认1
          maxInitialRequests: 5   // 最大初始化请求书，默认1
        },
        vendor: {
          test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
          chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
          priority: 10,           // 缓存组优先级
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config