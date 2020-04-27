<template>
  <div>
      <div class="list">商品列表{{this.orders}}</div>
      <div class="list">新添商品</div>
  </div>
</template>

<script>
import bus from '../event-bus/bus.js'
export default {
    data(){
        return {
            orders:[],
        }
    },
    mounted(){
        // let _this =this
        bus.$on('recive',(...mes)=>{
        // console.log(1);
        // console.log(mes);
            let mess = JSON.parse(JSON.stringify(mes))
        //     console.log('mess'+mess);
            
        // console.log('zikaish'+this.orders);
        
        this.orders.push(mess)
        console.log(this.orders);
        
        return this.orders
            // console.log(mess);
            // this.orders.push(mess)
            

                // Array.prototype.push.call(this.orders)
                // this.orders.push(mess)
            // this.orders = mess
            // return this.orders
            // console.log('fwfw'+this.order);
        })
 
        
    },
   
}

</script>

<style lang = 'stylus' scrope>

</style>