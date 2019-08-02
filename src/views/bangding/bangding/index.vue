<template>
  <div class="app-container" style='cursor:pointer '>
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="ID" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.user_id" placeholder="用户ID" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
       <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item1 margin" style="width: 110px" @change='handleFilter'>
             <el-option v-for="item in from" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
       <el-select v-model="listQuery.type" placeholder="类型" clearable class="filter-item1 margin" style="width: 110px" @change='handleFilter'>
             <el-option v-for="item in typefrom" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
       <div class="inline-block">
          <el-date-picker
              v-model="listQuery.start"
              type="date"
               value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始日期">
          </el-date-picker>
      </div>
      <div class="inline-block"> 
          <el-date-picker
              v-model="listQuery.end"
              type="date"
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
      <el-table-column label="序号" prop="id" align="center" width="80px">
        
      </el-table-column>
      <el-table-column label="ID" prop="user_id" align="center" width="130px">
           <template slot-scope="{row}" >
             <div  >
                 <alluserinfo :data="row.user_id"  :row="row"  ></alluserinfo>
               
             </div>
           </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" align="center" width="100px">
         <template slot-scope="{row}">
              {{row.type==1?'微信':'支付宝'}}
         </template>
      </el-table-column>
      <el-table-column label="微信auth_id" align="center" prop="data"  min-width="80px">
              <template slot-scope="{row}">
                <div> {{row.type=='1'?row.wx.auth_id:'无'}}</div>
             </template>
      </el-table-column>
      
       <el-table-column label="用户支付宝名称" align="center" prop="data"  min-width="60px">
                <template slot-scope="{row}">
                <div> {{row.type=='2'?row.zfb.name:'无'}}</div>
            </template>
      </el-table-column>
      <el-table-column label="用户支付宝账号" align="center" prop="data"  min-width="60px">
                <template slot-scope="{row}">
                <div> {{row.type=='2'?row.zfb.account:'无'}}</div>
            </template>
      </el-table-column>
       <el-table-column label="时间"  align="center" prop="updated_at"  min-width="80px">
        
      </el-table-column>
       
       <el-table-column label="状态"  align="center" prop="status" width="110px">
         <template slot-scope="{row}">
                {{{'0':'待审核','1':'已同意','2':'已拒绝'}[row.status]}}
         </template>
           
      </el-table-column>
      <el-table-column label="操作" align="center"  min-width="100" class-name="small-padding fixed-width" v-show='level1'  >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" v-if='row.status==0'  @click="handleModifyStatus(row,event)"  v-show='level1' >
            同意
          </el-button>
          <el-button type="danger" size="mini" v-if='row.status==0'  @click="handleModifyStatus1(row,event)"  v-show='level1' >
           拒绝
          </el-button>
        </template>
      </el-table-column>
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
import { bangding,agree,refuse, fetchPv, createArticle, updateArticle } from '@/api/article'
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
const from =[
  {key:'0',  display_name: '待审核' },
  {key:'1',  display_name: '已同意' },
  {key:'2',  display_name: '已拒绝' },
]
const typefrom =[
  {key:'1',  display_name: '微信' },
  {key:'2',  display_name: '支付宝' },
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
      level1:'',
      event:'',
      tableKey: 0,
      list: [],
      total: 0,
     
      listQuery: {
        pn: 1,
        rn: 20,
        id:'',
        title: undefined,
        status: undefined,
        type:'',
        sort: '+id',
        start:'',
        end:'',
        user_id:''
      },
      from,
      typefrom,
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
     // 权限判定
    var level=localStorage.getItem('level')
     var arr='12'
    if(arr.indexOf(level) > -1){
           this.level1=true
        }else{
           this.level1=false
        }


    this.getList()
    // this.getstatus()
  },
  methods: {
    // 获取用户信息
    getList() {
     
     bangding(this.listQuery).then(response => {
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
    handleFilter() {
      this.listQuery.pn = 1
      this.getList()
    },
      // 去用户界面
    gouser(event){
      console.log(event)
      var userid=event.user_id
      localStorage.setItem('userid',userid)
       this.$router.push({path:'/users/users'})
    },
    // 是否同意解绑
    handleModifyStatus(event) {
        console.log(event)
              var id=event.id
              var status='1' 
              this.$confirm('是否同意该用户解绑, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    agree(id,status).then(response=>{
                  console.log(response)
                var code=response.data.code
                var info=response.data.info
                if(code=='0'){
                    this.$message({
                    type: 'warning',
                    message: info
                  });
                }
                if(code=='200'){
                  this.getList()
                    this.$message({
                    type: 'success',
                    message: '解绑成功!'
                  });
                }
                if(code=='403'){
                    this.$message({
                    type: 'danger',
                    message: '你无权限操作!'
                  });
                }
                if( code=='401'){
                    this.$router.push({ path: '/login/index'})
                }
              })
                
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消解绑'
                  });          
                });
    },
      // 是否拒绝解绑
    handleModifyStatus1(event) {
        console.log(event)
              var id=event.id
                var status='2'
              this.$confirm('是否拒绝该用户解绑, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    refuse(id,status).then(response=>{
                  console.log(response)
                var code=response.data.code
                var info=response.data.info
                if(code=='0'){
                    this.$message({
                    type: 'warning',
                    message: info
                  });
                }
                if(code=='200'){
                  this.getList()
                    this.$message({
                    type: 'success',
                    message: '拒绝成功!'
                  });
                }
                if(code=='403'){
                    this.$message({
                    type: 'danger',
                    message: '你无权限操作!'
                  });
                }
                if( code=='401'){
                    this.$router.push({ path: '/login/index'})
                }
              })
                
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消拒绝'
                  });          
                });
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
      width: 90px;
   }
  .filter-item{
  
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
</style>