const mysql = require('mysql')

    // 设置数据库的链接
  const conn = mysql.createConnection({
      host:'127.0.0.1',
      user:'root',
      password:'root',
      database:'myblog'
  })

  module.exports = conn