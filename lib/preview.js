const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const fs = require('fs')
const path = require('path')
const config = require('../config')
const utility = require('./utility')

app.use('/node_modules', express.static(config.staticPath))

app.set('views', config.viewPath)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

module.exports = function(filePath, options) {

  let port = options.port || config.port

  fs.watchFile(filePath, {
    interval: 500
  }, (curr, prev) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return console.log('文件读取失败')
        // 广播
      io.emit('note', data)
    })
  })

  io.on('connection', (socket) => {
    console.log('有客户端连接进来了')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return console.log('文件读取失败')
      socket.emit('first', data)
    })
    socket.on('disconnect', () => {
      console.log('有客户端退出了...')
    })
  })

  http.listen(port, () => {
    console.log(`Real time preview service has been started, serving ${filePath}`)
    console.log('Available on:')
    console.log(`  http://127.0.0.1:${port}`)
    console.log(`  http://${utility.getLANIP()}:${port}`)
    console.log('Hit CTRL-C to stop the server.')
  })
  
}
