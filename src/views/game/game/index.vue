<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="id" style="width: 120px;" class="filter-item" @keyup.enter.native="seach" />
      <el-input v-model="listQuery.coin" placeholder="奖励金币" style="width: 120px;" class="filter-item" @keyup.enter.native="seach" />
        <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item1" style="width: 130px" @change='seach'>
          <el-option v-for="item in status" :key="item.key" :label="item.display_name" :value="item.key" />
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
       <el-table-column label="答案数量"  prop="answers"  width="80px" align="center">
      </el-table-column>
       <el-table-column label="金币"  prop="coin"  width="160px" align="center">
           <!-- <template slot-scope="{row}">
            <img :src="row.icon" class='icon-url' alt="">
          </template> -->
      </el-table-column>
       <el-table-column label="门票"  prop="ticket"  width="80px" align="center">
      </el-table-column>
       <el-table-column label="图像"  prop="icon"  width="160px" align="center">
           <template slot-scope="{row}">
               <img :src="row.icon" class='icon-selected-url' alt="">
          </template>
      </el-table-column>
        <el-table-column label="猜测次数"  prop="guess"   width="120px" align="center">
            
       </el-table-column>
       <el-table-column label="状态"  prop="status"   width="120px" align="center">
              <template slot-scope="{row}">
                    {{{'1':'启用','2':'禁用'}[row.status]}}
            </template>
       </el-table-column>
      <el-table-column label="时间"  prop="created_at"   min-width="100px" align="center">   
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width"  >
        <template slot-scope="{row}"  >
          <el-button type="primary" size="mini" v-if='row.status==1' @click="handleUpdate1(row)" v-show='level1'>
            编辑
          </el-button>
         <el-button type="success" size="mini"  v-if='row.status==2'   @click="changestatus(row)"  v-show='level1'>
           启用
          </el-button>  
          <el-button type="danger" size="mini"  v-if='row.status==1'  @click="changestatus1(row)" v-show='level1' >
           禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />
    
    <el-button  class='dialog-top-button' type="text" @click="dialogFormVisible1 = true"  v-show='level1' >添加</el-button> 
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible2">
      <el-form  :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
    
        <el-form-item label="图片" prop="icon">
          <img :src="temp.icon" alt="" style='width:80px;height:80px' v-if='editupload'  @click='edittupian()'>
           <div class='upload-box' v-if='editupload1'>
                <el-upload
                 ref="my-upload"
                    class="upload-demo"
                    :action="process+'/upload_img'"
                    :on-success="onSuccess2"
                    :file='temp.icon'
                    :with-credentials="true"
                    list-type="picture">
                    <el-button size="small" type="primary" class='upload-button'>+</el-button>
                </el-upload>
            </div>
        </el-form-item>
        <el-form-item label="门票" prop="ticket">
          <el-input v-model="temp.ticket" />
        </el-form-item>
        <el-form-item label="赏金" prop="coin">
          <el-input v-model="temp.coin" />
        </el-form-item>
        <el-form-item label="答案数量" prop="answers" >
          <el-input v-model="temp.answers" />
        </el-form-item>
        <el-form-item label="可猜次数" prop="guess" >
          <el-input v-model="temp.guess" />
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
      <el-dialog title="上传" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
    
        <el-form-item label="图片" prop="title" >
          <div class='upload-box'>
                <el-upload
                 ref="my-upload"
                    class="upload-demo"
                    :action="process+'/upload_img'"
                    :on-success="onSuccess1"
                    :file='tupian'
                    :with-credentials="true"
                    list-type="picture">
                    <el-button size="small" type="primary" class='upload-button'>+</el-button>
                </el-upload>
            </div>
        </el-form-item>
        <el-form-item label="门票" prop="title">
          <el-input v-model="temp1.ticket" />
        </el-form-item>
        <el-form-item label="赏金" prop="title">
          <el-input v-model="temp1.coin" />
        </el-form-item>
        <el-form-item label="答案数量" prop="title" >
          <el-input v-model="temp1.answers" />
        </el-form-item>
        <el-form-item label="可猜次数" prop="title" >
          <el-input v-model="temp1.guess" />
        </el-form-item>
        <div class='tijiao'><el-button size="small" type="primary" class='upload-button'   @click="handleFilter()">提交</el-button> </div>
      </el-form>
      
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
         取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
         确认
        </el-button>
      </div> -->
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
import { gamelist,gameedit,gameadd,gamechange } from '@/api/article'
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
        status:'',
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
        coin: '',
        guess:'',
        answers: '',
        ticket: '',
        icon: '',
        timestamp: new Date(),
       
      },
      // 上传
       temp1: {
        coin: '',
        guess:'',
        answers: '',
        ticket: '',
        icon: '',
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
           gamelist(this.listQuery).then(response => {
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
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
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
         gameedit(this.temp).then(() => {
            console.log('dsdsdsdsad ')
            this.getList()
          })
    },
      handleUpdate1(row) {
          console.log(row)
           this.dialogFormVisible2 = true
           this.temp.answers=row.answers
           this.temp.coin=row.coin
           this.temp.icon=row.icon
           this.temp.guess=row.guess
           this.temp.ticket=row.ticket
           this.temp.id=row.id
          console.log(this.temp.icon)
          console.log(row.icon)
      },
    handleUpdate(row) {
  
      // this.dialogFormVisible = true
 
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            // this.dialogFormVisible = false
            this.dialogFormVisible1 = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
      clearFiles(){
            this.$refs['my-upload'].clearFiles();
            
      },
         // 上传图片
     handleFilter(){
       console.log('66666')    

        this.$confirm('是否提交, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求
          console.log(this.temp1)
           gameadd(this.temp1).then(response=>{
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
           this.temp1.guess=''
           this.temp1.answers=''
           this.temp1.ticket=''
           this.temp1.icon=[]
           this.clearFiles()
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
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
