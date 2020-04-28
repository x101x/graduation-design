var mysql = require('mysql')
var config = require('./defaultConfig')

// 创建线程池
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT,
})

//统一连接数据库的方法
let allServies = {
  query: function (sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release() //释放连接池
          })
        }
      })
    })
  }
}

//读取所有表数据 测试数据连接

let getAllUsers = function () {
  let _sql = `select * from users`
  return allServies.query(_sql)
}

// let getAllFoods = function () {
//   let _sql = `select * from foods`
//   return allServies.query(_sql)
// }
let getAllFoods = function () {
  let _sql = allServies.query(`select * from foods`)
  return _sql
}

//添加菜品
let insertFoods = function (value) {
  // let _sql = `insert into users set username=?,userpwd=?,nickname=?;`

  let _sql = `insert into foods set name=?,price=?,oldPrice=?,sellCount=?,description=?,type=?,icon=?;`
  return allServies.query(_sql,value)
}

//删除菜品
let delectFoods = function (id) {
  // let _sql = allServies.query(`insert into foods set name=?,price=?,oldPrice=?,sellCount=?,description=?,type=?,icon=?;`)
  let _sql =  allServies.query(`delete from foods where id=${id};`)
  return _sql
}

//修改菜品
let updateFoods = function(id,value){
  let _sql = allServies.query(`update foods set  name=?,price=?,oldPrice=?,sellCount=?,description=?,type=?,icon=? where id=${id};`,value)
  return _sql
}

let dat = function () {
  let rxb = allServies.query(`select * from foods where sellCount > 80`)
  let drtc = allServies.query(`select * from foods where type = 1`)
  let bsyp = allServies.query(`select * from foods where type = 2`)
  let jxrc = allServies.query(`select * from foods where type = 3`)
  let sklc = allServies.query(`select * from foods where type = 4`)
  let jxtc = allServies.query(`select * from foods where type = 5`)
  let gpgz = allServies.query(`select * from foods where type = 6`)
  let xczs = allServies.query(`select * from foods where type = 7`)
  let tszp = allServies.query(`select * from foods where type = 8`)
  let arr = [];
  arr[0] = rxb;
  arr[1] = drtc;
  arr[2] = bsyp;
  arr[3] = jxrc;
  arr[4] = sklc;
  arr[5] = jxtc;
  arr[6] = gpgz;
  arr[7] = xczs;
  arr[8] = tszp;
  
  return arr.forEach(()=>{
    console.log(arr)
  });
     
  // return [rxb,drtc,bsyp,jxrc,sklc,jxtc,gpgz,xczs,tszp]
}

// 注册用户

let insertUser = function (value) {
  let _sql = `insert into users set phone=?;`
  return allServies.query(_sql,value)
}

//查找用户
let findUser = function (phone) {
  let _sql = `select * from users where phone ="${phone}";`
  return allServies.query(_sql)
}

//用户登录
let userLogin = function (phone) {
  let _sql = `select * from users where phone ="${phone}" ;`
  return allServies.query(_sql)
}

//管理员登录
let adminLogin = function (number,password) {
  let _sql = `select * from admin where number ="${number}" and password = "${password}";`
  return allServies.query(_sql)
}

// 根据分类名称查找对应的笔记列表
// let findNoteListByType = function (note_type) {
//   let _sql = `select * from note where note_type ="${note_type}";`
//   return allServies.query(_sql)
// }

// //根据笔记列表ID查找笔记详情
// let findNoteDetailById = function (id) {
//   let _sql = ` select * from note where id ="${id}"; `
//   return allServies.query(_sql)
// }

module.exports = {
  getAllUsers,
  insertUser,
  userLogin,
  findUser,
  getAllFoods,
  dat,insertFoods,delectFoods,updateFoods,adminLogin
  // findNoteListByType,
  // findNoteDetailById
}