const express = require('express')
const router =express.Router()

const userPage = require('../controller/user.js')

router.get('/login',userPage.handloLoginGet)

router.get('/register',userPage.handloRegisterGet)

//创建post 连接
router.post('/register',userPage.handloReginsterPost)

//创建登录的post 连接
router.post('/login',userPage.handloLoginPost)

module.exports = router