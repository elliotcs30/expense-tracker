const express = require('express')
const router = express.Router()

// 引用 Record model
const Record = require('../../models/record')
// 引用 Category model
const Category = require('../../models/category')

router.get('/new', (req, res) => {

  Category.find() // 取出 Category model 裡的所有資料
    .lean()
    .sort({ id : 'asc' }) // 升冪'asc', 降冪'desc'
    .then(categorys => res.render('new', { categorys }))
    .catch(error => console.error(error))
})

router.post('/', (req, res) => {
  // 假設當前登入使用者是 1
  req.body.userId = 1

  // 轉換型別: 經過 body-parser 處理後型別改為字串，但 model 設定的型別為 Number
  req.body.categoryId = Number(req.body.categoryId)

  return Record.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', async (req, res) => {
  const id = req.params.id
  const categorys = await Category.find().lean().sort({ id: 'asc' })

  return Record.findById(id)
  .lean()
  .then(record => res.render('edit', { record, categorys }))
  .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id

  return Record.findByIdAndUpdate( id, req.body) // 存入資料庫
    .then(()=> res.redirect(`/records/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router