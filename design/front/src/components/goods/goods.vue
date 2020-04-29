<template>
  <div>
    <div class="top">
      <span class="gg">桌号：{{ this.$route.query.znum}}</span>
      <span class="gg g">就餐人数：{{ this.$route.query.pnum}}</span>
      <span
        class="gg ph"
        v-show="this.$route.query.phone"
        :title="this.$route.query.phone"
      >会员{{ this.$route.query.phone}}</span>
      <span class="gg exit" @click="exit">退出</span>
    </div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            v-for="(item,index) in goods"
            :key="index"
            class="menu-item"
            @click="selectMenu(index,$event)"
            :class="{'current':currentIndex===index}"
          >
            <span class="text border-1px">
              <span class="icon" :class="classMap[item.type]" v-if="item.type > 0"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food, index) in item.foods" :key="index" class="food-item border-1px">
                <div class="icon">
                  <img :src="food.icon" alt width="57px" height="57px" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <!-- <span>好评率{{food.rating}}%</span> -->
                  </div>
                  <div class="price">
                    <div class="now">￥{{food.price}}</div>
                    <div class="old" v-show="food.oldPrice">{{food.oldPrice}}</div>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                    <!-- @add="addFood" -->
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 购物车 -->
      <!-- <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"> -->
      <shopcart
        ref="shopcart"
        :selectFoods="selectFoods"
        v-on:cler="clearn"
        v-on:jia="add"
        v-on:jian="inc"
      ></shopcart>
      <div class="yidian peisong" @click="yid" >已点</div>
      <div class="yd" v-show="this.yidian">
        <span>已点订单</span>
        <el-divider></el-divider>
        <div class='yg' v-for="(item,index) in this.yddd" :key="index">
        <span class='sp'>{{item.name}}  ￥{{item.price}}  x{{item.count}}</span></div>
        <el-divider></el-divider>
        总价：￥{{totalPrice}}
      </div>

      <div class="peisong" @click="peisong">配送详情</div>
      <div class="orders" v-show="this.show">
        <span>配送详情</span>
        <el-divider></el-divider>
        <div class="check" v-for="(item,index) in this.ddxq" :key="index">
          <input  type="checkbox">
          <span >{{item.name}}  x{{item.count}}</span>
        </div>
        <div class="footer">
          <div class="finish" @click="finish">配送完成</div>
          <div class="finish" @click="fanhui">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "@/components/cartcontrol/cartcontrol";
import shopcart from "@/components/shopcart/shopcart";
// import bus from "../event-bus/bus.js";

export default {
  // props:{
  //   seller:{
  //     type:Object
  //   }
  // },
  data() {
    return {
      goods: [],
      classMap: [],
      listHeight: [],
      scrollY: 0,
      ddxq: [],
      yddd:[],
      znum: "",
      pnum: "",
      phone: "",
      date:'',
      show:false,
      yidian:false,
      // totalPrice:0,
    };
  },
  created() {
    //  console.log('::'+this.$route.query.znum),
    this.znum = this.$route.query.znum;
    this.pnum = this.$route.query.pnum;
    this.phone = this.$route.query.phone;
    // console.log(this.ddxq,this.znum,this.pnum,this.phone);

    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$http.get("http://localhost:8080/static/goods.json").then(res => {
      // console.log(res);
      if (res.data.errno === 0) {
        this.goods = res.data.data;
        this.$nextTick(() => {
          // 页面渲染完成才会执行
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },

  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      // console.log("slelct:" + foods);

      return foods;
    },totalPrice(){
            let total = 0;
            this.yddd.forEach((food) => {
                total += food.price*food.count
            });
            return total
        },
  },
  components: {
    cartcontrol,
    shopcart
  },
  methods: {
    // sendData() {
    //   console.log(this.ddxq, this.znum, this.pnum, this.phone);
      
    //   bus.$emit("recive", this.ddxq, this.znum, this.pnum, this.phone);
    // },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, { click: true });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on("scroll", pos => {
        // console.log(pos)
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    selectMenu(index, event) {
      // this.currentIndex = index
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      // console.log(el);

      this.foodsScroll.scrollToElement(el, 300);
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    //   updated () {
    //   this.sendData()
    // },
    clearn(el) {
      //  let xq = [];
      // this.ddxq=[]
      // let date = new Date();
      // let da = JSON.parse(JSON.stringify(date))
      // this.ddxq.push(date)
      let mes = confirm('确认下单?')
      if(mes == true){
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            let fd = JSON.parse(JSON.stringify(food));                 
           this.ddxq.push(fd)
            food.count = 0; 
          }
        });
      });}
      console.log(this.ddxq);
      this.yddd = JSON.parse(JSON.stringify(this.ddxq)); 
    },
    add() {
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          // console.log(food);

          if (food.count) {
            food.count++;
          }
        });
      });
    },
    inc() {
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count > 0) {
            food.count--;
          }
        });
      });
    },
    exit() {
      this.$router.push({
        path: "/"
      });
    },
    peisong(){
      this.show=!this.show
    },
    fanhui(){
      this.show=!this.show
    },
    yid(){
      this.yidian=!this.yidian
    },
    finish(){
      let mes =confirm('确认完成配送?')
      if(mes==true){
        this.ddxq=[];
      this.show=!this.show
      }
      
    }
    // addFood(target){
    //   console.log(target);
    //   this._drop(target)
    // },
    // _drop(target){
    //   this.$nextTick(()=>{
    //     this.$refs.shopcart.drop(target)
    //   })
    // }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.top {
  // position relative
  font-size: 20px;

  .gg {
    display: inline-block;
    position: absolute;
    top: 20px;
    left: 10px;
  }

  .ph {
    left: 240px;
    // width 70px
    white-space: nowrap;
    // overflow hidden
    // text-overflow ellipsis
  }

  .g {
    left: 110px;
  }

  .exit {
    left: 90%;
    white-space: nowrap;
    // margin-left 5px
  }
}

.goods {
  display: flex;
  position: absolute;
  top: 70px;
  bottom: 1px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 200px;
    width: 200px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 76px;
      width: 176px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #ffffff;
        font-weight: 700;
      }

      .text {
        border-none();
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        text-align: center;
        border-1px(rgba(7, 17, 27, 0.1));
        font-size: 16px;

        .icon {
          display: inline-block;
          vertical-align: top;
          width: 20px;
          height: 20px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;

          &.decrease {
            bg-image('decrease_3');
          }

          &.discount {
            bg-image('discount_3');
          }

          &.guarantee {
            bg-image('guarantee_3');
          }

          &.invoice {
            bg-image('invoice_3');
          }

          &.special {
            bg-image('special_3');
          }
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 14px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 16px;
          font-size: 16px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 14px;
          font-size: 14px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
  .peisong{
    position absolute
    width 120px
    height 33px
    background-color red
    right 90px
    top 610px
    background-color #DCDFE6
    text-align center
    line-height 33px
  }
  .yidian{
    top 570px
  }
  .yd{

    position absolute
    z-index 9
    top 25px
    right 30px
    height 480px
    width 240px
    background-color #DCDFE6
    padding 10px
    font-size 20px
    box-sizing border-box
  }
  .sp{
    display block
    margin-bottom 5px
  }
  .orders{
    width 300px
    height 700px
    background-color  #f3f5f7
    position absolute
    z-index 99
    right 0
    padding 10px
    box-sizing border-box
    font-size 20px
    
  }
  .footer{
    position absolute
    display table
    width 280px
    height 100px
    // background-color red
    bottom 20px
    padding 20px
    box-sizing border-box
    text-align center
    border-spacing 8px

    .finish{
      display table-cell
      vertical-align middle
      width 70px
      background-color #DCDFE6

    }
  }

}
</style>