// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()


const home = require('./modules/home') // 引入 home 模組程式碼
const records = require('./modules/records') // 引入 records 模組程式碼
const users = require('./modules/users') // 引入 users 模組
const auth = require('./modules/auth') // 引入 auth 模組

const { authenticator } = require('../middleware/auth') // 掛載 middleware

// 將網址結構符合 /records 字串開頭的 request 導向 records 模組 
router.use('/records', authenticator, records)  // 加入驗證程序
// 將網址結構符合 /users 字串開頭的 request 導向 users 模組 
router.use('/users', users)
router.use('/auth', auth)
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', authenticator, home) // 加入驗證程序

// 準備引入路由模組, 匯出路由器
module.exports = router