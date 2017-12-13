const http = require('http')
const url = require('url')
const querystring = require('querystring')
const express = require('./simpleExpress')
const titles = {
  '1': '姓名：李伟民，学历：本科，地址：北京市石景山区',
  '2': 'CSS，HTML，JS，CSS3，H5，ES6，nodeJS，vue',
  '3': '立志成为一名优秀的前端工程师'
}
var app = express()
app.use(function (req, res, next) {
  var urlObj = url.parse(req.url, true)
  var pathName = urlObj.pathname
  var query = urlObj.query
  req.query = query
  next()
})
app.use(function (req, res, next) {
  res.send = function (html) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(html)
  }
  next()
})
app.use('/list', function (req, res) {
  res.send('<ul><li><a href="/title?id=1">个人介绍</a></li><li><a href="/title?id=2">技术栈</a></li><li><a href="/title?id=3">个人评价</a></li></ul>')
})
app.use('/title', function (req, res) {
  res.send(titles[req.query.id])
})
app.use(function (req, res) {
  res.end('404')
})
app.listen(8080)