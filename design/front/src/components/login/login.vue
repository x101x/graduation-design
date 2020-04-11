<template>
  <div >
 
        <div class="outer" v-show="this.aa">
          <!-- <form action="http://localhost:8080/goods" method="get"> -->
            <p class="zh shang">桌号: <input type="text"  v-model="znum" placeholder="请输入桌号" /></p>
            <p class="zh xia">人数: <input type="text" v-model="pnum" placeholder="请输入人数" /></p>
            <!-- <input type="submit" value="点餐" /> -->
          <!-- </form> -->
          <div class="f login" @click="log">注册/登入</div>
          <div class="f order" @click="order">直接点餐</div>
        </div>
        <div class="box1 " v-show="this.xianshi">
              <p><input type="text" class="aaa" v-model="phone" placeholder="请输入手机号" ></p>
              <div class="bbb" @click="login">登入</div>
              <div class="bbb" @click="unlogin">取消</div>
            </div>
        
  </div>
</template>

<script>
export default {
    
    data(){
        return{
          znum:'',
          pnum:'',
          xianshi:false,
          aa:true,
          phone:''
        }
    },
    methods:{
      login(){
        if(this.phone.trim()=='') {
          alert('账号或密码不能为空')
          return
        } 
        else if(!(/^1[3456789]\d{9}$/.test(this.phone.trim()))){
          alert('输入正确的手机号')
          return
        }
        this.$http({
          url: 'http://localhost:3000/users/userLogin',
          method: 'post',
          data:{
            phone:this.phone
          }
        }).then((res) => {
        console.log(res)
        if(res.data.code == '800000') {
          sessionStorage.setItem('userInfo',JSON.stringify(res.data.data) )
          this.$router.push({path:'/goods'})
        } else {
          this.$toast(res.data.mess)
        }
      }).catch((err)=>{
        console.log(err);
        
      })
      },
      unlogin(){
        this.xianshi = !this.xianshi
        this.aa = !this.aa
      },
      log(){
        this.xianshi = !this.xianshi
        this.aa = !this.aa
      },
      order(){
        if(this.znum.trim()==''||this.pnum.trim() == ''){
          alert('请输入桌号和用餐人数')
        }else if( !(/^\d{2}|[1-9]$/).test(this.znum.trim())
          &&!(/^\d{2}|[1-9]$/).test(this.pnum.trim())){
          alert('请输入正确数字')
    
        } else{
          this.$router.push({
            path: '/goods',
            query:{
              znum:this.znum,
              pnum:this.pnum
            } 
          })
        }
        
      }
    }

}
</script>

<style lang="stylus" scoped>

  
.outer
  width 80%
  height 200px
  margin 0 auto
  margin-top 200px
  background-color red
  .zh
    position relative
    left 20px
    font-size 20px
    // margin 0 auto
    // display block
    // width 40%
  .shang
    top 30px
  .xia  
    top 50px
  //   display inline-block
  .f
    position relative
    top 100px
    left 70px
    // height 40px
    width 80px
    text-align center
    line-height 40px
    background-color #fff
    display inline-block
    .box1
      float left
      position relative
      // top 50px
      width 100px
      // height 40px
      background-color blue

  // // .login
  .order
    left 80px
    
.box1
  .aaa
    margin 5px 0 0 5px
  .bbb
    margin 5px 0 0 5px
    display inline-block
    height 30px
    width 80px
    background-color red
    text-align center
    line-height 30px


</style>