const os = require('os')
const hbs = require('hbs')
const fs = require('fs')

exports.getLANIP = function () {
  return os.networkInterfaces()['以太网'].find(info => info.family === 'IPv4').address
}

exports.render = function (filePath, obj) {
  let sourceStr = fs.readFileSync(filePath, 'utf8')
  let render = hbs.compile(sourceStr)
  return render(obj || {})
}
