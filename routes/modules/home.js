// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Record model
const Record = require('../../models/record')
const Categorys = require('../../models/category')

// 定義首頁路由
router.get('/', (req, res) => {
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) // desc
    .then(records => {
      let totalAmount = 0

      Categorys
      .find()
      .lean()
      .then(categorys => {
        Promise.all([
          records.map(record => {
            categorys.map(category => {
              if (record.categoryId === category.id) {
                record.icon = category.icon
              }
            })

            totalAmount += record.amount
          })
        ])
        .then(() => {
          res.render('index', { records, categorys, totalAmount })
        })
      })
    }) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router
