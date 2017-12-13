//实现一个简单的express中间件

//导入两个系统模块
const http = require('http')
const url = require('url')

var express = function () {
  var app = function (req, res) {
//调用app会自动运行handle函数
    app.handle(req, res)
  }
  app.stack = []
//给app设置proto属性
  Object.assign(app, proto)
  return app
}
var proto = {
  use: function (path, fn) {
// 判断传入的参数是否是路径
    if (typeof path !== 'string') {
      fn = path
      path = '/'
    }
//把传入的路径存入到stack栈中
    this.stack.push({ fn: fn, path: path })
  },
// 处理函数
  handle: function (req, res) {
    var stack = this.stack
    var index = 0
    function next() {
      var layer = stack[index++]
      var route = layer.path
      var fn = layer.fn
      var path = url.parse(req.url).pathname
// 判断如果请求的路径是以传入的路径为开头，则执行fn函数
      if (path.startsWith(route)) {
        fn(req, res, next)
      } else {
        next()
      }
    }
    next()
  },
  listen: function (port) { 
//创建web服务器
    var server = http.createServer(this)
//监听端口
    server.listen(port)
  }
}
module.exports = express