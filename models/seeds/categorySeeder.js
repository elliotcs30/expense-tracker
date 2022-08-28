const mongoose = require('mongoose')
const Category = require('../category') // 載入 category model
const categoryList = require('../../categorys.json').results

// 請將此變數放在應用程式的流程裡，在適當的時候取得 icon 圖源
const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

mongoose.connect(
  process.env.MONGODB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  // 取出 CATEGORY['家居物業'] 的網址覆值給 category.icon
  return Promise.all(
    categoryList.map(category => {
      category.icon = CATEGORY[category.name]
      return Category.create(category)
    }
  ))
  .then(() => {
    console.log('category done!')
    process.exit()
  })
})