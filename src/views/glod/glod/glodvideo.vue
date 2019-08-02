<template>
  <div>
    <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div class="glod-seach">
         <el-input v-model="title" placeholder="输入版本号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
        </el-button>
    </div>
        <div class="img-box" v-for="item in items" :key="item.id">
              <div class="img-title">{{item.title}}</div>
              <img class="img"  v-bind:src="item.src" alt="">
        </div>
        
  </div>
</template>

<script>

   import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'


    export default {
    data() {
      return {
        title:'',
        items:[
          {
            title:'',
            src:''
          },
          {
             title:'',
            src:''
          },
          {
             title:'',
            src:''
          }
        ]

      };
    },
    created() {
    // this.getList()
  },
    methods: {
      getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total


        console.log(this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
     handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    }
  }
  
</script>
<style  scoped>
   .upload-demo{
     margin-left: 40px;
     margin-top: 10px;
     margin-bottom: 10px
   }
  .img{
    width: 90%;
    height: 80%;
    margin-left: 5%;
    margin-top: 10px
  }
  .glod-seach{
    position: absolute;
    top: 10px;
    left: 150px
  }
  .img-box{
    position: relative;

  }
  .img-title{
    position: absolute;
    right: 8%;
    top: 5%;
    width:90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    background: red
  }
</style>