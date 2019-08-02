<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="id" style="width: 120px;" class="filter-item" @keyup.enter.native="seach" />
      <el-input v-model="listQuery.ad_id" placeholder="广告id" style="width: 120px;" class="filter-item" @keyup.enter.native="seach" />
      <el-input v-model="listQuery.coin" placeholder="奖励金币" style="width: 120px;" class="filter-item" @keyup.enter.native="seach" />
      <el-input v-model="listQuery.name" placeholder="名称" style="width: 120px;" class="filter-item" @keyup.enter.native="seach" />
        <!-- <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item1" style="width: 130px" @change='seach'>
          <el-option v-for="item in status" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select> -->
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
               style='width:150px'
              type="datetime"
             value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择结束日期">
          </el-date-picker>
      </div>
    
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="seach()">
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
      class='menu-table'
    >
      <el-table-column label="ID" prop="id"  align="center" width="80" >
          
      </el-table-column>
       <el-table-column label="广告ID"  prop="ad_id"  width="80px" align="center">
      </el-table-column>
       <el-table-column label="金币"  prop="coin"  width="160px" align="center">
      </el-table-column>
       <el-table-column label="名称"  prop="name"  width="80px" align="center">
      </el-table-column>
        <el-table-column label="秘钥"  prop="secret"   width="120px" align="center">  
       </el-table-column>
        <el-table-column label="类型"  prop="type"   width="120px" align="center">  
       </el-table-column>
       <!-- <el-table-column label="状态"  prop="status"   width="120px" align="center">
              <template slot-scope="{row}">
                    {{{'1':'启用','2':'禁用'}[row.status]}}
            </template>
       </el-table-column> -->
      <el-table-column label="时间"  prop="created_at"   min-width="100px" align="center">   
      </el-table-column>
      <el-table-column label="操作" align="center" width="230px" class-name="small-padding fixed-width"  >
        <template slot-scope="{row}"  >
          <el-button type="primary" size="mini"  @click="handleUpdate1(row)" v-show='level1'>
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />
    
    <el-button  class='dialog-top-button' type="text" @click="dialogFormVisible1 = true"  v-show='level1' >添加</el-button> 
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible2">
      <el-form  :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
    
        <el-form-item label="广告ID" prop="title">
          <el-input v-model="temp.ad_id" disabled />
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="金币" prop="title">
          <el-input v-model="temp.coin" />
        </el-form-item>
        <el-form-item label="秘钥" prop="title" >
          <el-input v-model="temp.secret" />
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">
         取消
        </el-button>
        <el-button type="primary" @click="createData1()">
         确认
        </el-button>
      </div>
    </el-dialog>
    <!-- 上传 -->
      <el-dialog title="添加" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
    
        <el-form-item label="广告ID" prop="title">
          <el-input v-model="temp1.ad_id" />
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="temp1.name" />
        </el-form-item>
        <el-form-item label="金币" prop="title">
          <el-input v-model="temp1.coin" />
        </el-form-item>
        <el-form-item label="秘钥" prop="title" >
          <el-input v-model="temp1.secret" />
        </el-form-item>
     
        <div class='tijiao'><el-button size="small" type="primary" class='upload-button'   @click="handleFilter()">提交</el-button> </div>
      </el-form>
      
     
    </el-dialog>


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
import { chuanlist,chuanedit,chuanadd,gamechange } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const status=[
  {key:1,display_name:'启用'},
  {key:2,display_name:'禁用'}
]

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
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
      process:process.env.VUE_APP_BASE_API,
      editupload:true,
      editupload1:false,
      tupian:'',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pn: 1,
        rn: 20,
        id:'',
        coin:'',
        sort: '+id',
        name:'',
        ad_id:'',
        start:'',
        end:''
      },
      status,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      // 编辑
      temp: {
        id:'',
        ad_id:'',
        coin: '',
        type:'',
        secret: '',
        name: '',
        timestamp: new Date(),
       
      },
      // 上传
       temp1: {
        coin: '',
        name:'',
        secret: '',
        ad_id: '',
        type: '',
         timestamp: new Date(),
      },
      // 上传
      dialogFormVisible1: false,
      // 编辑
      dialogFormVisible2: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
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
       console.log('66666')
           chuanlist(this.listQuery).then(response => {
          console.log(response)
          var code=response.data.code
          if(code=='200'){
              this.list = response.data.data.list
              this.total = response.data.data.totalCnt

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
    },
    edittupian(){
        this.editupload=false
        this.editupload1=true
    },
    seach(){
        this.listQuery.page = 1
      this.getList(this.listQuery)
    },
    handleFilter1() {
     
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
  
     onSuccess1:function(res, fileList){
        if(res.code==200){
          this.temp1.icon=res.data.img;
        }
      },
        onSuccess2:function(res, fileList){
       console.log(res)
        if(res.code==200){
          this.temp.icon=res.data.img;
        }
      },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      // this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
       // 启用
    changestatus(event){
      console.log(event)
      var id=event.id
      var status='1'
      this.$confirm('是否启用该设设置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求
         gamechange( id,status).then(response=>{
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
    // 禁用
     changestatus1(event){
      console.log(event)
      var id=event.id
      var status='2'
      this.$confirm('是否禁用该设置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求
          console.log('hsdhsddhdhs')
          gamechange( id,status ).then(response=>{
         var code=response.data.code
         if(code=='0'){
           alert('未查询到该用户')
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
               
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });          
        });
      
    },
    // 编辑
    createData1(){
         this.dialogFormVisible2 = false
         chuanedit(this.temp).then(() => {
            console.log('dsdsdsdsad ')
            this.getList()
          })
    },
      handleUpdate1(row) {
          console.log(row.type)
           this.dialogFormVisible2 = true
           this.temp.name=row.name
           this.temp.coin=row.coin
           this.temp.id=row.id
           this.temp.ad_id=row.ad_id
           this.temp.type=row.type
           this.temp.secret=row.secret
          console.log(this.temp.icon)
          console.log(row.icon)
      },
    handleUpdate(row) {
  
      // this.dialogFormVisible = true
 
    },
         // 添加数据
     handleFilter(){
       console.log('66666')    

        this.$confirm('是否提交, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求
          console.log(this.temp1)
           chuanadd(this.temp1).then(response=>{
              console.log(response)
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
            message: '提交成功!'
          });
           this.temp1.coin=''
           this.temp1.type=''
           this.temp1.id=''
           this.temp1.ad_id=''
           this.temp1.name=''
           this.temp1.secret=''
          //  this.clearFiles()
          this.dialogFormVisible1=false
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
            message: '已取消提交'
          });          
        });
      },
  
    
  }
}
</script>
<style scoped>
.menu-table{
  
}
.dialog-top-button{
  width: 50px;
  height: 50px;
  background: #409EFF;
  color: black;
  position: absolute;
  top:16px;
  right:40px;
  text-align: center
}
.upload-box{
  width: 100px;
  height: 100px;
  margin-top: 14px
}
.upload-demo{
  display: flex;
  align-items: center;
  width: 100px;
  height: 67px;
}
.upload-button{
  margin-right: 10px
 
}
.el-upload-list{
  width: 100px;
}
.all-before{
  margin-top: 60px;
   height: 150px;
}

.before1{
  margin-top:10px;
  margin-left: 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 30px;
  left:37px
}
.before1-left{
 
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align:center
}
.before2{
  margin-top:9px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 443px
}
.before3{
  position: absolute;
  top: 175px;
  left: 57px
}

.before4{
  position: absolute;
  top: 175px;
  left: 200px
}

.before5{
   position: absolute;
  top: 175px;
  left: 340px
}

.input1{
  width: 150px;
  height: 52px;
  
}
.tijiao{
 
  margin-left: 500px;
}
  .input1{
    width: 100px;
  }
  .icon-url{
    width: 80px;
    height: 80px;
     object-fit: fill;
  }
  .icon-selected-url{
    width: 80px;
    height: 80px;
     object-fit: fill;
  }
  .menu-filter-top{
    height: 4px;
    margin-left:15px;
    margin-top: 24px
  }
  .detail{
    background: #409EFF;
    color: white
  }
  .all-before1{
    width: 100%;
    display: flex;
    margin-left: 63px;
    height: 390px

  }
  .index{
    width: 500px;
    display: flex;
    flex-direction: column;
   
  }
  .detail-all{
    display: flex;
    align-items: center
  }
  .detail-margin{
      margin-right: 70px;
      margin-top: 50px
  }
  .detail-a{
    width: 60px;
    margin-top: 2px;
   color: black
  }
  .detail-before{
  
  }
  .detail-after{
  
  }
  .img-all{
    width: 100px;
    height: 100px;
    margin-left: 10px;
    border-radius: 15px
  }
  .border{
    width: 100px;
    height: 40px;
    /* border:1px solid #909399;
    border-radius: 10px; */
    text-align:center;
    line-height: 40px
  }
  .title-name{
    text-align:center;
    font-weight: 600;
    color: #409EFF
  }
  .form-flex{
      display: flex
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
    margin-left: 1px
  }
</style>