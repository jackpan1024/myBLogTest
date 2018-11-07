const express = require('express')
const app = express()
const bodyparser = require('body-parser') //调用包 快速的获取客户端传来的数据
app.use(bodyparser.urlencoded({ extend:false}))// 设置调用req.body的模板引擎

const fs = require('fs')
const path = require('path')


app.set('view engine','ejs')//设置ejs 的模板引

app.set('views','./views')//设置模板引擎的路径

app.use('/node_modules',express.static('./node_modules'))//静态资源的托管

// 原始的拼接方式
// const routerIndex = require('./router/index.js')//index 的路由模板
// app.use(routerIndex)
// const routerUser = require('./router/user.js')// user 的路由模板
// app.use(routerUser)

//基于拼接的格式都是差不多的 所以可以使用循环拼接的方式来创建路由模板的拼接

fs.readdir(path.join(__dirname,'./router'),(err,fileNames)=>{
    if(err) return console.log('读取文件名失败')
    fileNames.forEach((result)=>{
        // console.log(result,index)
        let count = result
        const router = require(path.join(__dirname,'/router',result))
        app.use(router)
    })
})

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})