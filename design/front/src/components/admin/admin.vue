<template>
  <div>
    <div class="head">
      <h1>后台管理</h1>
    </div>

    <div class="list lists">商品列表</div>
    <div class="list addFood" @click="addFoods">新添商品</div>
    <div class="fom" v-show="this.aa">
      <el-form :model="form" label-width="80px">
        <!-- <el-form-item label="ID">
          <el-input v-model="form.id" required='true'></el-input>
        </el-form-item>-->
        <el-form-item label="名称">
          <el-input v-model="form.name" required="true"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" required="true"></el-input>
        </el-form-item>
        <el-form-item label="原价">
          <el-input v-model="form.oldPrice"></el-input>
        </el-form-item>
        <el-form-item label="售额">
          <el-input v-model="form.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type" required="true"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="form.icon" required="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>-->
        <!-- <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>-->
        <!-- <el-form-item label="图片">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="qx">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="element">
      <template>
        <el-table :data="orders" border style="width: 100%" header-align="center">
          <el-table-column type="index" label="序号" width="40"></el-table-column>
          <el-table-column prop="id" label="ID" width="40"></el-table-column>
          <el-table-column prop="name" label="名称" width="130"></el-table-column>
          <el-table-column prop="price" label="价格" width="50"></el-table-column>
          <el-table-column prop="oldPrice" label="原价" width="50"></el-table-column>
          <el-table-column prop="sellCount" label="名称" width="50"></el-table-column>
          <el-table-column prop="description" label="描述" width="180"></el-table-column>
          <el-table-column prop="type" label="类型" width="100"></el-table-column>
          <el-table-column prop="icon" label="图片"></el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="update" v-show="this.bb" ref="upd">
      <!-- mingzi: <input type="text" v-model="this.row.name" > -->
      <el-form   :model="row" label-width="50px" >
          <el-form-item label="名称">
            <el-input v-model="row.name"  ></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="row.price"  ></el-input>
          </el-form-item>
          <el-form-item label="原价">
            <el-input v-model="row.oldPrice"></el-input>
          </el-form-item>
          <el-form-item label="售额">
            <el-input v-model="row.sellCount"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="row.description" ></el-input>  
           </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="row.type" ></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-input v-model="row.icon" ></el-input>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="update">修改</el-button>
          <el-button @click="quxiao">取消</el-button>
        </el-form-item>
      </el-form >
     
    </div>
  </div>
</template>
      <!-- <table class="table-a" border="0" cellspacing="0" cellpadding="0">
          <tr >
              <td>序号</td>
              <td>ID</td>
              <td>名字</td>
              <td>价格</td>
              <td>旧价格</td>
              <td>售额</td>
              <td>描述</td>
              
              <td>类型</td>
              <td>图片</td>

          </tr>
          <tr v-for="(item,index) in orders" :key="index">
              <td>{{Number(index)+1}}</td>
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.price}}</td>
              <td>{{item.oldPrice}}</td>
              <td>{{item.sellCount}}</td>
              <td>{{item.description}}</td>
              
              <td>{{item.type}}</td>
              <td class="dd">{{item.icon}}</td>
          </tr>
      </table> -->
  </div>
</template>

<script>
// import bus from '../event-bus/bus.js'
export default {
  data() {
    return {
      row: {},
      orders: [],
      aa: false,
      bb: false,
      form: {
        //   id:'',
        name: "",
        price: "",
        oldPrice: "",
        sellCount: "",
        description: "",
        type: "",
        icon: ""
      }
    };
  },
  created() {
    this.$http.get("http://localhost:3000/users/allFoods").then(res => {
      //   console.log(res);
      if (res.data) {
        this.orders = Object.assign([], this.orders, res.data); //?
        // console.log(this.orders);
      }
    });
  },
  methods: {
    update(){
      console.log(this.row);
      this.$http({
        url:'http://localhost:3000/users/foodsUpdate',
        method:'patch',
        data:{
          row:this.row
        }
      }).then(res=>{
          console.log(res);

        if(res.data.code=='800000'){
          this.bb = !this.bb

        }else {
            // alert(res.data.mess)
            alert(res.data.mess);
          }
        })
        .catch(err => {
          console.log(err);
        });
     
    },
    addFoods() {
      this.aa = !this.aa;
    },
    handleEdit(index, row) {
      console.log(row);
      this.bb = !this.bb;
      this.row = row;
      this.$refs.upd.style.top = document.documentElement.scrollTop + "px";
    },
    onSubmit() {
      console.log(this.form);

      this.$http({
        url: "http://localhost:3000/users/foodsInsert",
        method: "post",
        data: {
          form: this.form
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "800000") {
            //   sessionStorage.setItem('userInfo',JSON.stringify(res.data.data) )
            // this.$router.push({path:'/goods'})
            //   this.xianshi = !this.xianshi
            this.aa = !this.aa;
            //   this.bb = !this.bb
          } else {
            // alert(res.data.mess)
            alert(res.data.mess);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    handleDelete(index, row) {
      console.log(row.id);
      let mes = confirm("确认删除？");
      if (mes == true) {
        this.$http({
          url: "http://localhost:3000/users/foodsDelect",
          method: "delete",
          data: {
            id: Number(row.id)
          }
        })
          .then(res => {
            console.log(res);
            if (res.data.code == "800000") {
            } else {
              // alert(res.data.mess)
              alert(res.data.mess);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    qx() {
      this.aa = !this.aa;
    },quxiao() {
      this.bb = !this.bb;
    }
  }
};
</script>

<style lang = 'stylus' scrope>
@import '../../common/stylus/mixin.styl';

.head {
  width: 100%;
  height: 60px;
  background-color: rgb(198, 107, 206);

  /* display table */
  h1 {
    display: inline-block;
    /* vertical-align middle */
    text-align: center;
    line-height: 60px;
    height: 60px;
    margin-left: 100px;
  }
}

.fom {
  padding: 20px 100px 20px 20px;
  position: absolute;
  width: 400px;
  height: 480px;
  background-color: black;
  z-index: 99;
  /* opacity: 0.8; */
  left: 18%;
}

.list {
  width: 200px;
  height: 50px;
  background-color: #faf;
  text-align: center;
  line-height: 50px;
  margin-bottom: 5px;
}

.lists {
  position: relative;
  top: 50px;
  left: 100px;
}

.addFood {
  position: relative;
  /* top  50px */
  left: 400px;
  cursor: pointer;
}

.addFood:hover {
  background-color: rgb(198, 107, 206);
}

.element {
  margin: 0 auto;
  width: 90%;
}

.update {
  /* display: fixed; */
  position: absolute;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.9;
  top: 0;
  z-index: 99;
  padding: 100px 400px 20px 200px;
}

/* .table-a
width 1600px
margin-left 50px
margin-top 50px
border-top: 1px  solid black 
border-left: 1px  solid black 
     
td
    /* width 100px */
/* border-right: 1px  solid black
border-bottom: 1px  solid black */
/* .dd
width 100px
display inline-block
overflow hidden */
</style>