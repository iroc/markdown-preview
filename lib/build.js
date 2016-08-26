const fs = require('fs')
const path = require('path')
const marked = require('marked')
const utility = require('./utility')

module.exports = function (filePath, options) {
  let filePathObj = path.parse(filePath)
  if (filePathObj.ext !== '.md') {
    return console.error('要转换的文件必须是markdown文件.')
  }
  let mdStr = fs.readFileSync(filePath, 'utf8')
  let htmlStr = marked(mdStr)
  var content = utility.render(path.join(__dirname, '../resource/template.html'), {
    article: htmlStr
  })
  
  let writePath = `${path.join(filePathObj.dir, filePathObj.name)}.html`
  writePath = options.output || writePath
  fs.writeFileSync(writePath, content)
  console.log('Build success.')
}
