const router = require('koa-router')()
const userService = require('../controllers/mySqlConfig')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.get('/all', async (ctx, next) => {
  await userService.getAllUsers()
    .then((res) => {
      console.log('打印结果' + JSON.stringify(res))
      ctx.body = res
    })
})
router.get('/allFoods', async (ctx, next) => {
  await userService.getAllFoods()
    .then((res) => {
      // console.log('打印结果' + JSON.stringify(res))
      ctx.body = res
    })
})

router.get('/hot', async (ctx, next) => {
  await userService.dat()

    .then((res) => {
      console.log('打印结果' + JSON.stringify(res))
      ctx.body = res
    });
  // ctx.body = userService.data();
  // let www = [
  //   {"name":"热销榜","foods":rxb},
  //   {"name":"热榜","foods":drtc},
  //   {"name":"热销21榜","foods":bsyp},
  //   {"name":"热销2d榜","foods":jxrc},
  //   {"name":"热销榜","foods":sklc},
  //   {"name":"热w销f3榜","foods":jxtc},
  //   {"name":"热销榜","foods":gpgz},
  //   {"name":"热cw销榜","foods":xczs},
  //   {"name":"热销w榜","foods":tszp},
  // ]

})
router.post('/foodsInsert', async (ctx, next) => {
  // id=?,name=?,,price=?,oldPrice=?,
  // sellCount=?,description=?,type=?,icon=?
  var form = ctx.request.body.form
  // var id = ctx.request.body.from.id
  // var name = ctx.request.body.from.name
  // var price = ctx.request.body.from.price
  // var oldPrice = ctx.request.body.from.oldPrice
  // var sellCount = ctx.request.body.from.sellCount
  // var description = ctx.request.body.from.description
  // var type = ctx.request.body.from.type
  // var icon = ctx.request.body.from.icon
  await userService.insertFoods( [form.name,form.price,form.oldPrice,form.sellCount,form.description,form.type,form.icon])
    .then((res) => {
      console.log(res);
      
      let r = ''
      if (res.affectedRows != 0) {
        r = 'ok'
        // let result = {
          
        //   name: res[0].name,
        //   price: res[0].price,
        //   oldPrice: res[0].oldPrice,
        //   sellCount: res[0].sellCount,
        //   description: res[0].description,
        //   type: res[0].type,
        //   pricicone: res[0].icon,
        // }
        ctx.body = {
          code: '800000',
          data: r,
          mess: '成功'
        }
      } else {
        r = 'error'
        ctx.body = {
          code: '800004',
          data: r,
          mess: '失败了'
        }
      }
    }).catch((err) => {
      ctx.body = {
        code: '800002',
        data: err
      }
    })

})

router.delete('/foodsDelect', async (ctx, next) => {
  
  var _id = ctx.request.body.id
 
  await userService.delectFoods(_id)
    .then((res) => {
      console.log(1);

      console.log(res);
      console.log(1);
      
      let r = ''
      if (res.affectedRows > 0) {
        r = 'ok'
        // let result = {
          
        //   name: res[0].name,
        //   price: res[0].price,
        //   oldPrice: res[0].oldPrice,
        //   sellCount: res[0].sellCount,
        //   description: res[0].description,
        //   type: res[0].type,
        //   pricicone: res[0].icon,
        // }
        ctx.body = {
          code: '800000',
          data: r,
          mess: '操作成功'
        }
      } else {
        r = 'error'
        ctx.body = {
          code: '800004',
          data: r,
          mess: '失败了'
        }
      }
    }).catch((err) => {
      ctx.body = {
        code: '800002',
        data: err
      }
    })

})




router.post('/userLogin', async (ctx, next) => {
  var _phone = ctx.request.body.phone
  await userService.findUser(_phone)
    .then(async (res) => {
      if (!res.length) {
        userService.insertUser(_phone)
      }
      await userService.userLogin(_phone)
        .then((res) => {
          console.log(res);
          
          let r = ''
          if (res.length) {
            r = 'ok'
            let result = {
              id: res[0].id,
              nickname: res[0].nickname,
              phone: res[0].phone
            }
            ctx.body = {
              code: '800000',
              data: result,
              mess: '登陆成功'
            }
          } else {
            r = 'ok'
            ctx.body = {
              code: '800000',
              data: r,
              mess: '注册成功'
            }
          }
        }).catch((err) => {
          ctx.body = {
            code: '800002',
            data: err
          }
        })

    })



})
// 登陆
// router.post('/userLogin', async(ctx, next) => {
//   var _phone = ctx.request.body.phone
//   let a = userService.findUser(_phone);
//   console.log(a);

//   if(a==''){
//     userService.insertUser(_phone)
//   }
//   // var _userpwd = ctx.request.body.userpwd

//   await userService.userLogin(_phone)
//     .then((res) => {
//       let r = ''
//       if (res.length) {
//         r = 'ok'
//         let result = {
//           id: res[0].id,
//           nickname: res[0].nickname,
//           phone: res[0].phone
//         }
//         ctx.body = {
//           code: '800000',
//           data: result,
//           mess: '登陆成功'
//         }
//       } else {
//         r = 'error'
//         ctx.body = {
//           code: '800004',
//           data: r,
//           mess: 'shoujihaocuowu'
//         }
//       }
//     }).catch((err) => {
//       ctx.body = {
//         code: '800002',
//         data: err
//       }
//     })
// })

// 注册
// router.post('/userRegister', async(ctx, next) => {
//   var _phone = ctx.request.body.username
//   var _userpwd = ctx.request.body.userpwd
//   var _nickname = ctx.request.body.nickname
//   if (!_username && !_userpwd && !_nickname) {
//     ctx.body = {
//       code: '800001',
//       mess: "用户名昵称密码不能为空"
//     }
//     return
//   }
//   let user = {
//     username: _username,
//     userpwd: _userpwd,
//     nickname: _nickname
//   }
//   await userService.findUser(user.username).then(async (res) => {
//     if (res.length) {
//       try {
//         throw Error("用户名已存在")
//       } catch (error) {
//         console.log(error)
//       }
//       ctx.body = {
//         code: '800003',
//         data: 'err',
//         mess: '用户名已存在'
//       }
//     } else {
//       await userService.insertUser([user.username, user.userpwd, user.nickname])
//         .then((res) => {
//           let r = ''
//           if (res.affectedRows != 0) {
//             r = 'ok'
//             ctx.body = {
//               code: '800000',
//               data: r,
//               mess: '注册成功'
//             }
//           } else {
//             r = 'error'
//             ctx.body = {
//               code: '800004',
//               data: r,
//               mess: '注册失败'
//             }
//           }
//         })
//     }
//   })
// })



module.exports = router
