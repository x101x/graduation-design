<template>
  <div>
    <div class="ratings">
        <div class="ratings-grade">
            <div class="ratings-score">
               <h1 class="score">4.2</h1> 
               <div class="title">综合评分</div>
               <div class="rank">综合评分</div>
            </div>
            <div class="ratings-star">
                <div class="score-wrapper">
                    <span class="title">服务态度</span>
                    <span class="star-on"><img src="./1.png" alt=""></span>
                    <span class="star-off"><img src="./2.png" alt=""></span>
                    <span class="score">4.1</span>
                </div>
                <div class="score-wrapper"><span class="title">商品评分</span>
                    <span class="star-on"><img src="./1.png" alt=""></span>
                    <span class="star-off"><img src="./2.png" alt=""></span>
                    <span class="score">4.1</span>
                </div>
                <div class="bottom-wrapper">
                <span class="title">送达时间</span>
                <span class="time">38fz</span>
                </div>
            </div>
        </div>
        <div class="ratings-content">
             <div class="ratings-content-top">
                 <div class="all">1</div>
                 <div class="manyi">2</div>
                 <div class="numanyi">3</div>
             </div>
             <div class="ratings-content-center"></div>
             <div class="ratings-content-bottom">
                 <ul>
                     <li></li>
                 </ul>
             </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';
.ratings
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .ratings-grade
        padding 18px 0px
        display flex
        border-bottom 1px solid #000
        .ratings-score
            flex 0 0 137px
            // width 137px
            // background-color red
            padding 6px 0px
            border-right 1px solid  rgba(7,17,27,1)
            text-align center
            h1 
                color #FF9900
                margin-bottom 6px
                line-height 28px
                font-size 24px
            
        .ratings-star
            flex 1
            padding 6px 0 6px 24px
            // background-color green
            .score-wrapper
                margin 0 0 8px  
                span
                    font-size 14px
                    &.title
                        display: inline-block;
                        line-height: 18px;
                        color: #07111b;
                    &.star-on 
                        display: inline-block;                  
                        margin-left 5px
                        img 
                            width 16px
                            height 16px
                    &.star-off
                        display: inline-block;
                        margin-left 5px
                        img 
                            width 16px
                            height 16px
                    &.score
                        color yellow
                        margin-left 8px
            .bottom-wrapper
                .title
                    line-height: 18px;
                    font-size: 12px;
                    color: #07111b;
                .time
                    margin-left: 12px;
                    font-size: 12px;
                    color: #93999f
    .ratings-content
        margin-top 20px
        border-top 1px solid #000
        .ratings-content-top
            margin: 0 18px;
            position: relative;
            .all
                margin-left: 2px;
                font-size: 8px;
            
                        
                      
                         
                
    
</style>
