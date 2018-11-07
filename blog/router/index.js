const express = require('express')
const router =express.Router()

const ctrl = require('../controller/index.js')
// console.log(__dirname)

router.get('/',ctrl)

module.exports = router;