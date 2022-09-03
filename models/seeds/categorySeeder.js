const Category = require('../category') // 載入 category model
const categoryList = require('../../categorys.json').results

// 請將此變數放在應用程式的流程裡，在適當的時候取得 icon 圖源
const CATEGORY = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}

const db = require('../../config/mongoose')

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