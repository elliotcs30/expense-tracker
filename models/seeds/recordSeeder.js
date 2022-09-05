const bcrypt = require('bcryptjs')

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

  return Promise.all(
    userList.map(user => {
      return Promise.all([
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
      ])
    })
  )
  .then(user => {
    return Promise.all(
      recordList.map(record => {
        const date = new Date()
        // 如果月份為個位數, 就把月份第1位數補0變成兩位數, ex: 2022-09-04
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
        // 如果天數為個位數, 就把月份第1位數補0變成兩位數, ex: 2022-09-04
        const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
      
        record.date = `${date.getFullYear()}-${month}-${day}`
        record.userId === 1 ? record.userId = user[0][0]._id : record.userId = user[1][0]._id

        return Record.create(record)
      })
    ).then(() => {
      console.log('record done!')
      process.exit()
    })
  })
})

