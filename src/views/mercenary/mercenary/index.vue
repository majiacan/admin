<template>
  <div class="app-container" style='cursor:pointer '>
    <div class="filter-container">
       <el-input v-model="listQuery.user_id" placeholder="用户ID" style="width: 120px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      
       <el-input v-model="listQuery.parent_id" placeholder="师傅ID" style="width: 120px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
     
       <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item1 margin" style="width: 110px">
        <el-option v-for="item in cashfrom" :key="item.key" :label="item.display_name" :value="item.key" />
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
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id"  align="center" width="80" >
          
      </el-table-column>
       <el-table-column label="用户ID"  prop="user_id"  width="130px" align="center">
            <template slot-scope="{row}" >
             <div  class='userid'>
                 <alluserinfo  :data="row.user_id" :row="row"  ></alluserinfo>
             </div>
           </template>
      </el-table-column>
       <!-- <el-table-column label="头像"  prop="nickname"  width="110px" align="center">
           <template slot-scope="{row}">
            <img :src="row.avatar" class='img-url' alt="">
          </template>
      </el-table-column> -->
       <!-- <el-table-column label="性别"  prop="gender"   width="60px" align="center">
           <template slot-scope="{row}">
                 {{row.gender==1 ? '女' : '男'}}
          </template>
      </el-table-column> -->
        <el-table-column label="师傅ID"  prop="parent_id"   width="110px" align="center">
              <template slot-scope="{row}" >
             <div @dblclick="gouser1(row) " class='userid'>
                 {{row.parent_id}}
             </div>
           </template>
       </el-table-column>
       <el-table-column label="比例"  prop="ratio"   width="100px" align="center">
       </el-table-column>
        <el-table-column label="剩余金币"  prop="left_coin"   width="100px" align="center">
        
      </el-table-column>
      <el-table-column label="总计金币"  prop="total_coin"   width="100px" align="center">
        
      </el-table-column>
      
       <el-table-column label="时间"  prop="created_at" align="center"  width="180px">
        
      </el-table-column>
       <el-table-column label="账号状态"  prop="status"  min-width="120px" align="center">
             <template slot-scope="{row}">
                 {{row.status=="1" ? '启用' : '已禁用'}}
            </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" min-width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini"  v-if="row.status=='1'"  @click="changestatus(row,event)" >
            禁用
          </el-button>
            <el-button type="success" size="mini" v-else  @click="changestatus1(row,event)"  >
            启用
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
   <!-- 分页器 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="zhege ">
        <el-form  :inline="true"  ref="dataForm"  :model="temp" label-position="left" label-width="70px"  >
            <el-form-item label="ID" prop="type" :inline="false">
              <el-input v-model="temp.title" />
            </el-form-item>
            <el-form-item label="用户名">
                 <div class="user-info"></div>
            </el-form-item>   
             <el-form-item label="性别">
                 <div class="user-info"></div>
            </el-form-item>   
            <el-form-item label="手机号">
                 <div class="user-info"></div>
            </el-form-item>   
            <el-form-item label="地区">
                <div class="user-info"></div>
            </el-form-item>
              <el-form-item label="登录方式">
                  <div class="user-info"></div>
            </el-form-item>  
               <el-form-item label="账号状态" style="width:80%">
                  <div class="user-info"></div>
            </el-form-item>  
           
             
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
         取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
         确定
        </el-button>
      </div>
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
import { mercenarylist} from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import alluserinfo from '../../../views/alluserinfo'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
// 状态值
const cashfrom=[
  {key:2,  display_name: '禁用'   },
  {key:1,  display_name: '启用'   }
]
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination,alluserinfo },
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
      event:'',
      tableKey: 0,
      list: [],
      total: 0,
      listQuery: {
        pn: 1,
        rn: 20,
        user_id: undefined,
        type: undefined,
        type1: undefined,
        sort: '+id',
        status:'',
        start:'',
        end:'',
     
      },
        cashfrom,
      calendarTypeOptions,
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
    this.getList()
 
    
    this.handleFilter(this.listQuery)
   
  },
  methods: {
    // 获取用户信息
    getList() {
     
      mercenarylist(this.listQuery).then(response => {
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
     // 去用户界面
    gouser1(event){
      console.log(event)
      var userid=event.parent_id
      localStorage.setItem('userid',userid)
       this.$router.push({path:'/users/users'})
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

      // this.$message({
      //   message: '操作Success',
      //   type: 'success'
      // })
      // row.status = status
    },
    sortChange(data) {
      console.log(data)
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      console.log(order)
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
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
            this.dialogFormVisible = false
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
</style>