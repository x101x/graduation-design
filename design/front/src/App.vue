<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <v-header :seller='seller'></v-header> -->
    <!-- <div class="tab boeder-1px">
      <div class="tab-item">
        <router-link to="/">商品</router-link>
      </div> -->
      <!-- <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div> -->
    <!-- </div> -->
    <!-- <router-link to = '/'></router-link> -->
    <!-- <goods /> -->
    <router-view />
    <!-- <router-view :seller='seller'/> -->
  </div>
</template>

<script>
// import  header from '@/components/header/Header.vue'
import  goods from '@/components/goods/goods.vue'
import  login from '@/components/login/login.vue'

export default {
  name: 'App',
  data () {
    return{
      // seller:{}
    }
  },
  components:{
    // 'v-header':header,
    goods,login
  },
  created(){
    this.$http.get('http://localhost:8080/static/seller.json')
    .then(res=>{
      console.log(res);
      if(res.data.errno===0){
        this.seller = Object.assign({},this.seller,res.data.data)//?
      }
    })
  }
}
</script>

<style lang='stylus'>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
// @import './common/stylus/mixin.styl';
// .tab
  display flex
  height 40px
  /* line-height: 40px; */
  align-items center
  border-bottom 1px solid rgba(7,17,23,0.1)
  .tab-item
    flex 1
    text-align center
    & > a
      display block
      text-decoration none
      color rgb(77,85,93)
      font-size  14px
      
      &.router-link-active
        color rgb(240,20,20)

</style>
