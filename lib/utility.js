const os = require('os')
const hbs = require('hbs')
const fs = require('fs')

exports.getLANIP = function() {
  let address = '0.0.0.0'
  let netInterfaces = os.networkInterfaces()
  for (let name in netInterfaces) {
    let net = netInterfaces[name].find(i => i.family === 'IPv4' && i.mac !== '00:00:00:00:00:00')
    if (net) {
      address = net.address
      break
    }
  }
  return address
}

exports.render = function(filePath, obj) {
  let sourceStr = fs.readFileSync(filePath, 'utf8')
  let render = hbs.compile(sourceStr)
  return render(obj || {})
}
