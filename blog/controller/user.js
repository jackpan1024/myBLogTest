


const moment = require('moment')

const msql = require('../db/msql.js')

const handloLoginGet = (req,res)=>{
    res.render('./user/login.ejs',{})
}

const handloRegisterGet = (req,res)=>{
    res.render('./user/register.ejs',{})
}

const handloReginsterPost = (req,res)=>{
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
            str.ctime = moment().format('YY-MM-DD HH:mm:ss') // 服务器添加时间属性项

        const sql2 = 'insert into user set ?'
        conn.query(sql2,str,(err,result)=>{
            // console.log(result)
            if(err) return res.send({status:400,msg:'插入数据失败'})
            if(result.affectedRows !==1 ) return res.send({status:400,msg:'注册失败'})
            res.send({status:200,msg:'注册成功'})
        })
        

    })

   
}

const handloLoginPost = (req,res)=>{
    const str = req.body
   if(str.password.trim().length < 1 || str.username.trim().length < 1){
       return res.send({status:400,msg:'用户名或者密码不能为空'})
   }
  
   // console.log(str)
   const sql = 'select * from user where username = ? and password = ?'
   conn.query(sql,[str.username,str.password],(err,result)=>{
       if(err) return  res.send({status:400,msg:'请求失败，请重新登录'})
       //console.log(result) 加入数据没有匹配成功，那么返回的就是一个空的数组 说明resul就是一个数组
       if (result.length == 0 ) return res.send({status:400,msg:'用户名或者密码不匹配！请重新登录'})
       res.send({status:200,msg:'登录成功'})
   })

   
}

module.exports = {
    handloLoginGet,
    handloRegisterGet,
    handloReginsterPost,
    handloLoginPost
}

