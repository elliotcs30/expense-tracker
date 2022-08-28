const mongoose = require('mongoose')
const Record = require('../record') // 載入 record model
const recordList = require('../../records.json').results

const User = require('../user') // 載入 user model
const userList = require('../../users.json').results

mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } )
const db = mongoose.connection

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

