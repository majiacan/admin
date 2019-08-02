<template>
  <div class="app-container" style='cursor:pointer '>
    <div class="filter-container">
      <el-input v-model="listQuery.mobile" placeholder="搜索手机号" style="width: 130px;" class="filter-item" @keyup.enter.native="handleFilter" />
      
       <el-input v-model="listQuery.id" placeholder="用户ID" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      
       <el-input v-model="listQuery.nickname" placeholder="昵称" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
       <el-input v-model="listQuery.ip" placeholder="IP" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
     
       <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item1 margin" style="width: 110px" @change='handleFilter'>
        <el-option v-for="item in cashfrom" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
        <div class="inline-block">
          <el-date-picker
              v-model="listQuery.start"
              type="datetime"
               style='width:150px'
               value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始日期"
             >
          </el-date-picker>
      </div>
      <div class="inline-block"> 
          <el-date-picker
              v-model="listQuery.end"
              type="datetime"
               style='width:150px'
               value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择结束日期"
              >
          </el-date-picker>
      </div>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="用户ID" prop="id"  align="center" width="130px" >
           <template slot-scope="{row}"   >
             <div>
                  <!-- <el-popover
                    placement="right-start"
                    title="详细信息"
                    min-width="200"
                    style="z-index:2000"
                    trigger="hover"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    <div>
                      <div class='alluserinfo-item' >
                           <div class='alluserinfo' >
                              <div class='alluserinfo-title'>用户ID:</div>
                              <div class='alluserinfo-val'>{{user.id}}</div>
                            </div> 
                           <div class='alluserinfo'>
                              <div class='alluserinfo-title'>用户昵称:</div>
                              <div class='alluserinfo-val'>{{user.nickname}}</div>
                           </div>
                      </div>
                      <div  class='alluserinfo-item' >
                            <div class='alluserinfo'>
                              <div class='alluserinfo-title'>金币数:</div>
                              <div class='alluserinfo-val'>{{wallet.coin}}</div>
                           </div>
                            <div class='alluserinfo'>
                              <div class='alluserinfo-title'>总金币数:</div>
                              <div class='alluserinfo-val'>{{wallet.total_coin}}</div>
                           </div>
                      </div>
                      <div  class='alluserinfo-item' >
                          <div class='alluserinfo'>
                                <div class='alluserinfo-title'>师傅ID:</div>
                                <div class='alluserinfo-val'>{{mercenary.parent_id}}</div>
                            </div>
                              <div class='alluserinfo'>
                                <div class='alluserinfo-title'>总金币数:</div>
                                <div class='alluserinfo-val'>{{mercenary.total_coin}}</div>
                            </div>
                            <div class='alluserinfo'>
                                <div class='alluserinfo-title'>状态:</div>
                                <div class='alluserinfo-val'>{{{'1':'启用','2':'禁用'}[mercenary.status]}}</div>
                            </div>
                      </div>
                    </div>
                     <div @dblclick="gouser(row) " class='userid'  slot="reference"  @mouseenter="toggleShow(row)"   @mouseleave="toggleShow1(row)"   >
                 {{row.id}}
                 </div>
                 :alluserinfo="alluserinfo"
                   </el-popover> -->
                   <alluserinfo  :data="row.id" :row="row"  ></alluserinfo>
             </div>
             
           </template>
      </el-table-column>
       <el-table-column label="用户名"  prop="nickname"  width="80px" align="center">
      </el-table-column>
       <el-table-column label="头像"  prop="nickname"  width="110px" align="center">
           <template slot-scope="{row}">
            <img :src="row.avatar" class='img-url' alt="">
          </template>
      </el-table-column>
       <el-table-column label="性别"  prop="gender"   width="60px" align="center">
           <template slot-scope="{row}">
                 {{row.gender==1 ? '女' : '男'}}
          </template>
      </el-table-column>
        <el-table-column label="ip"  prop="reg_ip"   width="130px" align="center">
       </el-table-column>
       <el-table-column label="身份"  prop="identity"   width="80px" align="center">
       </el-table-column>
      <el-table-column label="系统"  prop="os"   width="80px" align="center">
           <!-- <template slot-scope="{row}">
                 {{row.gender==1 ? '女' : '男'}}
          </template> -->
      </el-table-column>
       <el-table-column label="手机号"  prop="mobile" align="center"  width="120px">
         
      </el-table-column>
       <el-table-column label="地区"  prop="city" align="center"  width="110px">
            <template slot-scope="{row}">
                 {{row.city=='' ? '未填写地区' : row.city}}
            </template>
      </el-table-column>
       <el-table-column label="注册地区"  prop="reg_addr" align="center"  width="110px">
          
      </el-table-column>
       <el-table-column label="时间"  prop="created_at" align="center"  width="160px">
        
      </el-table-column>
       <el-table-column label="账号状态"  prop="status"  width="80px" align="center">
             <template slot-scope="{row}">
                 {{row.status=="1" ? '启用' : '已禁用'}}
            </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width" >
        <template slot-scope="{row}">
          <el-button type="danger" size="mini"  v-if="row.status=='1'"  @click="changestatus(row,event)" v-show='level1' >
            禁用
          </el-button>
            <el-button type="success" size="mini" v-else  @click="changestatus1(row,event)" v-show='level1'  >
            启用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
   <!-- 分页器 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />
      
    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList,userList,changeStatus, hovershow, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import alluserinfo from '../../../views/alluserinfo'


// 状态值
const cashfrom=[
  {key:2,  display_name: '禁用'   },
  {key:1,  display_name: '启用'   }
]


export default {
  name: 'ComplexTable',
  components: { Pagination,alluserinfo},
  directives: { waves },
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
      level1:'',
      event:'',
      tableKey: 0,
      list: [],
      total: 0,
      listQuery: {
        pn: 1,
        rn: 20,
        id: undefined,
        type: undefined,
        type1: undefined,
        sort: '+id',
        nickname:'',
        mobile:'',
        status:'',
        start:'',
        end:'',
        ip:''
     
      },
        cashfrom,
    
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],  //没用
      statusOptions: ['published', 'draft', 'deleted'],  //没用
      showReviewer: false,
      temp: {
        id: undefined,
      
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'   //没用
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '查看详情',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {   //没用
        type: [{ required: true, message: 'type is required', trigger: 'change' }],  
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false     //没用
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
    this.listQuery.id=localStorage.getItem('userid')
    console.log(this.id)
    this.handleFilter(this.listQuery)
    setTimeout(() => {
      localStorage.setItem('userid','')
    }, 10000);
  },
  methods: {
    // 获取用户信息
    getList() {
     
      userList(this.listQuery).then(response => {
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
      // 去钱包界面
    gouser(event){
      console.log(event)
      var userid=event.id
      localStorage.setItem('userid',userid)
       this.$router.push({path:'/wallet/wallet'})

    },
    
    // 更改用户状态
    changestatus(event){
      console.log(event)
      var id=event.id
      var index=event.currentTarget
      var status='2'
      this.$confirm('是否禁用该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求
            changeStatus( id,status ).then(response=>{
         var code=response.data.code
         var info=response.data.info
         if(code=='0'){
            this.$message({
            type:'warning',
            message: info
          });
         }
         if(code=='200'){
           this.getList()
           this.$message({
            type: 'success',
            message: '禁用成功!'
          });
         }
          if(code=='403'){
           this.$message({
            type: 'danger',
            message: '无权操作!'
          });
         }
         if(code=='401'){
            this.$router.push({ path: '/login/index'})
         }
       })
         
        }).catch(() => {
                 console.log('1111',this)
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });          
        });
      
    },
     changestatus1(event){
      console.log(event)
      var id=event.id
      var index=event.currentTarget
      var status='1'
      this.$confirm('是否启用该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            changeStatus( id,status ).then(response=>{
            console.log(response)
         var code=response.data.code
         if(code=='0'){
           alert('未查询到该用户')
         }
         if(code=='200'){
           this.getList()
             this.$message({
            type: 'success',
            message: '启用成功!'
          });
         }
        if( code=='401'){
             this.$router.push({ path: '/login/index'})
         }
       })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });          
        });
      
    },
    handleFilter() {
      console.log('执行le')
      this.listQuery.pn = 1
      this.getList(this.listQuery)
    },
    // 点击查看用户信息
    handleModifyStatus(row, status) {
       this.dialogFormVisible = true
    },
  
  }
}
</script>

<style scoped>
   .user-info{
     width: 189px;
     padding: 0 15px;
     height: 36px;
     line-height: 36px;
     border-radius: 4px;
     border: 1px solid #DCDFE6;
   }
   .inline-block{
     display: inline;
    
   }
  .filter-item{
    /* border: 1px solid  #1890ff; */
    margin-top: 6px
  } 
  .inline-block1{
     margin-left: 20px;
  }
  .margin{
    margin-left: 10px
  }
   .img-url{
     object-fit: fill;
     width: 70px;
     height: 70px;
  }
  .userid{
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    /* background: red */
  }
  /* .alluserinfo-item{
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px
  }
  .alluserinfo{
    margin-left: 10px;
    display: flex;
  }
  .alluserinfo-val{
    margin-left: 10px
  }
  .alluserinfo-title{
    color: #409EFF
  } */
</style>