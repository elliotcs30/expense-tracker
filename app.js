// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Record = require('./models/record') // 載入 Record model
const Gategory = require('./models/category') // 載入 Gategory model

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定首頁路由
app.get('/', (req, res) => {
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(records => res.render('index', { records })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.get('/records/new', (req, res) => {

  Gategory.find() // 取出 Gategory model 裡的所有資料
    .lean()
    .sort({ id : 'asc' }) // 升冪'asc', 降冪'desc'
    .then(gategorys => res.render('new', { gategorys }))
    .catch(error => console.error(error))
})

app.post('/records', (req, res) => {
  // 假設當前登入使用者是 1
  req.body.userId = 1

  // 轉換型別: 經過 body-parser 處理後型別改為字串，但 model 設定的型別為 Number
  req.body.categoryId = Number(req.body.categoryId)

  return Record.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/records/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.log(error))
})

app.get('/records/:id/edit', async (req, res) => {
  const id = req.params.id
  const gategorys = await Gategory.find().lean().sort({ id: 'asc' })

  return Record.findById(id)
  .lean()
  .then(record => res.render('edit', { record, gategorys }))
  .catch(error => console.log(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id

  return Record.findByIdAndUpdate( id, req.body) // 存入資料庫
    .then(()=> res.redirect(`/records/${id}`))
    .catch(error => console.log(error))
})

app.post('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})