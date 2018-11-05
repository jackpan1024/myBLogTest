const express = require('express')
const app = express()
const mysql = require('mysql')

const bodyparser = require('body-parser') //调用包 快速的获取客户端传来的数据

app.use(bodyparser.urlencoded({ extend:false}))// 设置调用req.body的模板引擎

    // 设置数据库的链接
    const conn = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'root',
        database:'myblog'
    })

//设置ejs 的模板引擎
app.set('view engine','ejs')
//设置模板引擎的路径
app.set('views','./views')
//静态资源的托管
app.use('/node_modules',express.static('./node_modules'))
//创建连接
app.get('/',(req,res)=>{
    res.render('index.ejs',{})
})

app.get('/login',(req,res)=>{
    res.render('./user/login.ejs',{})
})

app.get('/register',(req,res)=>{
    res.render('./user/register.ejs',{})
})

//创建post 连接
app.post('/register',(req,res)=>{
    // 解析从客户端提交过来的数据 req.body
    // console.log(req.body)
    const str = req.body
    if(str.password.trim().length < 1 || str.username.trim().length < 1 || str.nickname.trim().length < 1){
        return res.send({status:400,msg:'用户名或者密码不能为空'})
    }
    const sql1 = 'select count(*) as count from user where username=?'
    conn.query(sql1,str.username,(err,result)=>{
        if(err) return res.send({status:400,msg:'查询失败'}) 
        if(result[0].count !==0) return res.send({status:400,msg:'用户名重复'})

        const sql2 = 'insert into user set ?'
        conn.query(sql2,str,(err,result)=>{
            if(err) return res.send({status:400,msg:'插入数据失败'})
            res.send({status:400,msg:'注册成功'})
        })
        

    })

   
})

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})