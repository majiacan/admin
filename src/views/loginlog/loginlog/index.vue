<template>
  <div class="app-container" style='cursor:pointer '>
    <!-- 顶部搜索栏 -->
    <div class="filter-container">
      <el-input v-model="listQuery.user_id" placeholder="用户ID" style="width: 80px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.version" placeholder="版本" style="width: 80px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.ip" placeholder="ip" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.ua" placeholder="标识" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.imei" placeholder="imei" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.identity" placeholder="身份" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.os" placeholder="系统" clearable class="filter-item1" style="width: 110px" @change='handleFilter'>
        <el-option v-for="item in os" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.channel" placeholder="渠道" clearable class="filter-item1" style="width: 110px" @change='handleFilter'>
        <el-option v-for="item in channel" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      
     <div class="inline-block">
          <el-date-picker
              v-model="listQuery.start"
              type="datetime"
               style='width:150px'
               value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始日期">
          </el-date-picker>
      </div>
      <div class="inline-block"> 
          <el-date-picker
              v-model="listQuery.end"
              type="datetime"
               style='width:150px'
               value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择结束日期">
          </el-date-picker>
      </div>
      <el-button v-waves class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">
      </el-button>
        <el-checkbox v-model="listQuery.check" @change="checkchange()" style='margin-left:15px'>去重</el-checkbox>
    </div>

  
<!-- 页面的展示list -->
    <el-table
      :key="tableKey"
    
      :data="list"
      border
      fit
      highlight-current-row
      style="width:100%;"
    >
      <el-table-column label="序号" prop="id"  align="center" width="60" >
      </el-table-column>

       <el-table-column label="用户ID"  prop="user_id"  width="130px"  align="center">
             <template slot-scope="{row}" >
             <div >
                 <alluserinfo  :data="row.user_id" :row="row"  ></alluserinfo>
             </div>
           </template>

      </el-table-column>
        <el-table-column label="系统" prop="os"  align="center" width="60" >
      </el-table-column>
        <el-table-column label="版本" prop="version"  align="center" width="60" >
      </el-table-column>
       <el-table-column label="渠道" prop="channel"  align="center" width="100px" >
      </el-table-column>
         <el-table-column label="标识" prop="ua"  align="center" width="120px" >
      </el-table-column>
        <el-table-column label="身份" prop="identity"  align="center" width="130px" >
      </el-table-column>
       <el-table-column label="地址" prop="addr"  align="center" width="110px" >
      </el-table-column>
      <el-table-column label="ip" prop="ip"  align="center" width="125px" >
      </el-table-column>
        <el-table-column label="imei" prop="imei"  align="center" width="110px" >
      </el-table-column>
         <el-table-column label="登录时间" prop="login_at"  align="center" width="100px" >
      </el-table-column>
        <el-table-column label="时间" prop="created_at"  align="center" min-width="100px" >
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />
     
     <!-- 查看弹窗   :before-close="handleClose"-->
      <el-dialog
        title="拒绝理由"
        :visible.sync="dialogVisible1"
        width="30%"
       >
        <el-input v-model='reason' maxlength=20  placeholder="拒绝理由"/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="sendreason()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>


<script>

import {  cashapply, cashrefuse, fetchPv, createArticle, loginlist } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import alluserinfo from '../../../views/alluserinfo'


const os=[
  { key:'1',  display_name: 'ios'   },
  { key:'2',  display_name: 'android'   }
]
const channel=[
  { key:'1',  display_name: 'appstore'   },
 
]

const cashstatus=[
   { key:'0',  display_name: '待审核'   },
   { key:'1',  display_name: '通过'   },
   { key:'2',  display_name: '拒绝'   }
]

export default {
  //页码器
  name: 'ComplexTable',
  components: { Pagination,alluserinfo },
  directives: { waves },
  //过滤
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      id:'',
      event:'',
      tableKey: 0,
      list: null,
      nickname:'',
      total: 0,
      level1:'',
      dialogVisible1:false,
      reason:'',
     
      listQuery: {   
        //页码查询
        pn: 1,
        rn: 20,
        title: undefined,
        type: undefined,
        status:'',
        sort: '+id',
        user_id:'',
        start: '',
        end:'',
        channel:'',
        version:'',
        os:'',
        ua:'',
        identity:'',
        imei:'',
        check:false,
        repeat:''
        
      },
      os,
      channel,
      cashstatus,
      statusOptions: ['published', 'draft', 'deleted'], //状态
      showReviewer: false,
      temp: {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'  //  状态值
      },
      dialogFormVisible: false,     //是否显示会话框
      dialogStatus: '',    
      dialogPvVisible: false,      //是否显示会话框
      downloadLoading: false
    }
  },
  created() {
      // 权限判定
     var level=localStorage.getItem('level')
     var arr='12'
    if(arr.indexOf(level) > -1){
           this.level1=true
        }else{
           this.level1=false
        }

     this.getList()
  },
  methods: {
   getList() {
      loginlist(this.listQuery).then(response => {
        console.log(response)
        var code=response.data.code
        if(code=='200'){
            this.list = response.data.data.list
            this.total = response.data.data.totalCnt
          
        }
        if(code=='401'){
          this.$router.push({ path: '/login/index'})
        }
       
      })
       
    },
    // 去用户界面
    gouser(event){
      console.log(event)
      var userid=event.user_id
      localStorage.setItem('userid',userid)
       this.$router.push({path:'/users/users'})

    },
    
    // 获取到选择的值，进行搜索
    handleFilter() {
         if(this.listQuery.check==false){
            this.listQuery.repeat=''
        }else{
            this.listQuery.repeat="1"
        }
      this.listQuery.pn = 1
      this.getList(this.listQuery)
    },
    checkchange(){
        this.handleFilter()
        
    }
  
  }
}
</script>
<style scoped>
   .inline-block{
     display: inline;
      width: 90px;
   }
  .filter-item{
    border: 1px solid  #1890ff;
    margin-top: 6px
  } 
  .inline-block1{
     /* margin-left: 20px; */
  }
 .userid{
   width: 100%;
   height: 80px;
   line-height: 80px
 }
 .problem{
   width: 22px;
   border-radius: 5px;
   display:inline-block;
   background:#E6A23C
 }
.reason{
  display: none;
  /* background: red */
}
.reason :hover {
  display: inline
}
.hover1:hover .reason{
  display: inline
   
}
/* .popover{
  background: red
} */
</style>

