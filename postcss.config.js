const autoprefixer = require('autoprefixer')

// stylus编译成css后，再优化css代码
// autoprefixer 给CSS代码自动添加不同浏览器的前缀
module.exports = {
  plugins: [
    //需要用到加浏览器前缀的css，自动加上前缀
    autoprefixer()
  ]
}