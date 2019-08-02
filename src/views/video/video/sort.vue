<template>
    <div  class="container">
        <div class="container-title">  短视频分类</div>
            <div class="container-box"  > 
                 <div class="container-item" v-for="item in list" :key="item.key"  >
                      <img class="container-item-image" v-bind:src="item.image_uri" />   
                      <div class="container-item-num">{{item.author}}</div>
                    
                 </div>
            </div>
    </div> 
</template>
<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import Vue from 'vue'
export default {
     data(){
         return{
             list:'',
             total:'',
            //  url:'',
            //  author:'',
         }
         
     },
     created() {
    this.getList()
  },
     methods:{
          getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // this.url=response.data.image_url
        // this.author=response.data.author

        console.log(this.list)
      
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
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
    /* flex-direction:row !important; */
}
.container-item{
    width: 50px;
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