# expense-tracker

## 專案功能
  * 使用者可以註冊帳號
    * 註冊之後，可以登入/登出
    * 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
  * 在首頁一次瀏覽所有支出的清單
    * 使用者只能看到自己建立的資料
  * 在首頁看到所有支出清單的總金額
  * 新增一筆支出
  * 編輯支出的屬性 (一次只能編輯一筆) 
  * 刪除任何一筆支出 (一次只能刪除一筆)
  * 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和
  

## 執行專案
1. 將本專案 clone 到本地端

2. 安裝套件
```shell
  npm install express@4.17.1
  npm i mongoose@6.0.4 # Mac M1 chip
  npm install express-handlebars@4.0.2
  npm install body-parser@1.20.0
  npm install method-override@3.0.0
  npm install express-session@1.17.1
  npm install passport@0.4.1 passport-local@1.0.0
  npm install connect-flash@0.1.1
  npm install bcryptjs@2.4.3
  npm install passport-facebook@3.0.0
  npm install dotenv@8.2.0
```

3. 建立 .env 環境變數檔案, 可參考 .env.example 檔案

4. 資料庫連線設定，本專案使用 Robo 3T GUI:
```shell
  export MONGODB_URI="mongodb+srv://<your name>:<your password>@cluster0.ayhtm.mongodb.net/expense-tracker-list?retryWrites=true&w=majority"
```

5. 新增種子資料到資料庫，在終端機執行:
```shell
  npm run seed
```

6. 種子資料新增成功，會看到以下訊息:
```shell
  category done!
  record done!
```

7. 啟動伺服器
```shell
  npm run start
```

8. 終端機啟動成功會顯示以下訊息
```node
  App is running on http://localhost:3000
  mongodb connected!
```