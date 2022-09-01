const Record = require('../record') // 載入 record model
const recordList = require('../../records.json').results

const User = require('../user') // 載入 user model
const userList = require('../../users.json').results

const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  Promise.all(
    userList.map(user => {
      return User.create(user)
    })
  )
  .then(() => {
    return Promise.all(
      recordList.map(record => {
        return Record.create(record)
      })
    ).then(() => {
      console.log('record done!')
      process.exit()
    })
  })
})

