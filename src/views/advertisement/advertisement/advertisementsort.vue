<template>
    <div  class="container">
        <div class="container-title">  广告分类</div>
            <div class="container-box"  > 
                 <div class="container-item" v-for="item in list" :key="item.key"  >
                      <img class="container-item-image" v-bind:src="item.image_uri" />   
                      <div class="container-item-num">{{item.author}}</div>
                    
                 </div>
            </div>
    </div> 
</template>
<script>
import { fetchList } from '@/api/article'
import Vue from 'vue'
export default {
     data(){
         return{
             list:'',
             listQuery: {
                page: 1,
                limit: 9999999999,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
        }    
     },
     created() {
    // this.getList()
  },
     methods:{
          getList() {
           this.listLoading = true
          fetchList(this.listQuery).then(response => {  
              this.list = response.data.items
       
          
       
      
        //   setTimeout(() => {
        //       this.listLoading = false
        //    }, 1.5 * 100)
      })  
    }
     }
}
</script>
<style  scope>
.container-title{
    width: 600px;
    font-weight: 800;
    font-size: 26px;
    padding: 30px
}


.container-box{
   
   
    display: flex;
    flex-wrap: wrap;
    flex-direction:row !important;
}
.container-item{
    display: flex;
    flex-direction: column-reverse;
    border: 1px solid black;
    padding: 20px;
    margin:15px;
    display: inline-table;
}
    .container-item-image{
        width: 200px;;
        height: 200px;   
    }
  .container-item-num{
      text-align: center;
      margin-top: 9px
  }
</style>