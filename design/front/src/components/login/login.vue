<template>
  <div class="out">
    <div class="outer" v-show="this.aa" >
      <!-- <form action="http://localhost:8080/goods" method="get"> -->
      <span>欢迎前来就餐！</span>
       <el-divider></el-divider>
      <el-form :model="row" label-width="50px">
        <el-form-item label="桌号">
          <el-input v-model="znum" placeholder="请输入桌号"></el-input>
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model="pnum" placeholder="请输入人数"></el-input>
        </el-form-item>
      </el-form>
      <!-- <el-row> -->
      <div class="but">
        <el-button type="warning" plain @click="log" v-show="!this.bb">注册/登入</el-button>
        <el-button type="warning" plain @click="log" v-show="this.bb">登陆成功</el-button>
        <el-button type="warning" plain @click="order">点我点单</el-button>
        <el-button type="warning" plain @click="admin"> 管理员登入</el-button>
        
        <!-- <el-button type="danger" plain>危险按钮</el-button> -->
      </div>
      <!-- <input type="submit" value="点餐" /> -->
      <!-- </form> -->
      <!-- <div class="f login" @click="log" v-show="!this.bb">注册/登入</div>
      <div class="f login" @click="log" v-show="this.bb">登入成功</div>
      <div class="f order" @click="order">点餐</div> -->
    </div>
    <div class="box2"  v-show="this.cc">
        <el-form :model="row" label-width="50px">
        <el-form-item label="账号">
          <el-input v-model="number" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="请输入密码" type='password' ></el-input>
        </el-form-item>
      </el-form>
      <div class="bbb">
      <el-button type="warning" plain @click="adminLogin" >登陆</el-button>
      <el-button type="warning" plain @click="unlogin2" >取消</el-button>
      </div>
    </div>
    <div class="box1" v-show="this.xianshi">
      <!-- <p>
        <input type="text" class="aaa" v-model="phone" placeholder="请输入手机号" />
      </p> -->
      <el-input v-model="phone" placeholder="请输入手机号"></el-input>
      <div class="aaa">
      <el-button type="warning" plain @click="login" >登陆</el-button>
      <el-button type="warning" plain @click="unlogin" >取消</el-button>
      </div>
      <!-- <div class="bbb" @click="login">登入</div> -->
      <!-- <div class="bbb" @click="unlogin">取消</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      row:{},
      znum: "",
      pnum: "",
      xianshi: false,
      aa: true,
      bb: false,
      cc: false,
      phone: "",
      number:'',
      password:''
    };
  },
  methods: {
    adminLogin(){
      this.$http({
        url: "http://localhost:3000/users/adminLogin",
        method: "post",
        data: {
          number: this.number,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "800000") {
            sessionStorage.setItem("adminInfo", JSON.stringify(res.data.data));
            this.$router.push({path:'/admin'})
            // this.xianshi = !this.xianshi;
            // this.aa = !this.aa;
            // this.bb = !this.bb;
          } else {
            // alert(res.data.mess)
            alert(res.data.mess);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      if (this.phone.trim() == "") {
        alert("请输入手机号");
        return;
      } else if (!/^1[3456789]\d{9}$/.test(this.phone.trim())) {
        alert("输入正确的手机号");
        return;
      }
      this.$http({
        url: "http://localhost:3000/users/userLogin",
        method: "post",
        data: {
          phone: this.phone
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "800000") {
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            // this.$router.push({path:'/goods'})
            this.xianshi = !this.xianshi;
            this.aa = !this.aa;
            this.bb = !this.bb;
          } else {
            // alert(res.data.mess)
            alert(res.data.mess);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    unlogin() {
      this.xianshi = !this.xianshi;
      this.aa = !this.aa;
    },unlogin2() {
      this.cc = !this.cc;
      this.aa = !this.aa;
    },
    admin(){
      this.cc=!this.cc
      this.aa=!this.aa
    },
    log() {
      this.xianshi = !this.xianshi;
      this.aa = !this.aa;
    },
    order() {
      if (this.znum.trim() == "" || this.pnum.trim() == "") {
        alert("请输入桌号和用餐人数");
      } else if (
        !/^\d{2}|[1-9]$/.test(this.znum.trim()) &&
        !/^\d{2}|[1-9]$/.test(this.pnum.trim())
      ) {
        alert("请输入正确数字");
      } else {
        this.$router.push({
          path: "/goods",
          query: {
            znum: this.znum,
            pnum: this.pnum,
            phone: this.phone
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.out {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size 14px
}
.out span{
  font-size 20px
}
.but{
  // margin-left 20px
  position relative
  top 10px
  left 52px
}
.outer {
  width: 400px;
  height: 250px;
  // margin: auto;
  // margin-top: 250px;
  background-color: rgb(198, 107, 206);
  box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 20px;

  .zh {
    position: relative;
    left: 20px;
    font-size: 20px;
    // margin 0 auto
    // display block
    // width 40%
  }

  .shang {
    top: 30px;
  }

  .xia {
    top: 50px;
  }

  // display inline-block
  .f {
    position: relative;
    top: 100px;
    left: 70px;
    // height 40px
    width: 80px;
    text-align: center;
    line-height: 40px;
    background-color: #fff;
    display: inline-block;

    .box1 {
      float: left;
      position: relative;
      // top 50px
      width: 100px;
      // height 40px
      background-color: blue;
    }
  }

  // // .login
  .order {
    left: 80px;
  }
}
  .box2{
    width 300px
    height 180px
    background-color: #c66bce;
    padding 20px
  }
  .box1{
    width 270px
    height 200px
  }
  .aaa{
    position relative
    top 20px
    padding-left 30px
  }
  .bbb{
    position relative
    // top 20px
    padding-left 80px
  }
// .box1 {
//   .aaa {
//     margin: 5px 0 0 5px;
//   }

//   .bbb {
//     margin: 5px 0 0 5px;
//     display: inline-block;
//     height: 30px;
//     width: 80px;
//     background-color: red;
//     text-align: center;
//     line-height: 30px;
//   }
// }
</style>