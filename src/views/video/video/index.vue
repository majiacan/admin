<template>
  <div class="app-container" style='cursor:pointer '>
    <div class="filter-container filter-top">
        <el-input v-model="listQuery.title" placeholder="标题" style="width: 220px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.user_id" placeholder="用户ID" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.id" placeholder="ID" style="width: 90px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.is_delete" placeholder="状态" clearable class="filter-item" style="width: 100px" @change='handleFilter'>
        <el-option v-for="item in status1" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select> 
       <div class="inline-block">
          <el-date-picker
              v-model="listQuery.start"
              type="datetime"
               style='width:120px'
                value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="开始日期">
          </el-date-picker>
      </div>
      <div class="inline-block"> 
          <el-date-picker
              v-model="listQuery.end"
              type="datetime"
               style='width:120px'
                value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="结束日期">
          </el-date-picker>
      </div>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    
      <el-input style="width: 100px; margin-left:15px" v-show='switchShow' @change='switchinput' v-model='switchinputval' ></el-input>
       <el-select v-model="random" v-show='!switchShow'   placeholder="随机" clearable class="filter-item" style="width: 100px;margin-left:15px">
        <el-option v-for="item in random" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select> 
        <el-switch
          v-model='switchval'
          active-color="#13ce66"
          @change='switchchange'
          inactive-color="#ff4949">
      </el-switch>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    
      @selection-change="toggleSelection"
    > 
       <el-table-column type="selection"  width="55" align="center" > </el-table-column>
      <el-table-column label="ID" prop="id"  align="center" width="70">
      </el-table-column>
      <el-table-column label="用户ID" prop="user_id"  align="center" width="130px">
           <template slot-scope="{row}" >
             <div class='userid'>
                 <!-- {{row.user_id}} -->
                  <alluserinfo  :data="row.user_id" :row="row"  ></alluserinfo>
             </div>
           </template>
      </el-table-column>
       <el-table-column label="封面图片"  prop="cover_img"  width="150px" align="center">
           <template slot-scope="{row}">
            <img :src="row.cover_img" class='img-url' alt="">
          </template>
      </el-table-column>

        <el-table-column label="标题"  prop="title"  width="110px" align="center">    
      </el-table-column>
         <el-table-column label="链接"   prop="url"  width="160px"  align="center">   
           <template slot-scope="{row}" >
             <video :src="row.url" id='videourl' ref='videourl' class='videourl'   controls   ></video>
           </template>
       </el-table-column>
        <el-table-column label="点赞量"  prop="zans"  width="80px" align="center"> 
      </el-table-column>

        <el-table-column label="分享量"  prop="shares"  width="80px" align="center">  
      </el-table-column>

       <el-table-column label="评论量"  prop="comments"  width="80px" align="center">
      </el-table-column>
        <el-table-column label="状态"  prop="is_delete"  width="80px" align="center">
             <template slot-scope="{row}">
                 {{row.is_delete==0 ? '启用' : '已删除'}}
          </template>
      </el-table-column>
       <el-table-column label="时间"  prop="created_at"  width="100px" align="center">  
      </el-table-column>
       <el-table-column label="操作" align="center" width="160px" class-name="small-padding fixed-width" >
        <template slot-scope="{row}">
          <el-button v-if="row.is_delete=='0'"  type="danger" size="mini"  @click="getstatus(row,event)" v-show='level1' >
            删除
          </el-button> 
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
     <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />
   
  </div>
</template>

<script>
import { videolist, videodelete, fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import alluserinfo from '../../../views/alluserinfo'
// 视频分类
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' },
]
const status1=[
  {key: '0', display_name: '使用中'},
  {key: '1', display_name: '已删除'}
]
const random=[
  {key: '1', display_name: '随机'},
]
//ARR到OBJ，例如CN：“中国”，US：“美国”
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  //这是什么
  name: 'ComplexTable',
  components: { Pagination ,alluserinfo},
  directives: { waves },
  //过滤
  filters: {
    statusFilter(status) {
      // const statusMap = {
      //   published: 'success',
      //   draft: 'info',
      //   deleted: 'danger'
      // }
      // return statusMap[status]
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
      list: null,
      total: 0,
      switchval:true,
       random:'',
      switchShow:true,
      switchinputval:'',
      listQuery: {   
        //页码查询
        pn: 1,
        rn: 20,
        title: undefined,
        type: undefined,
        sort: '+id',
        title:'',
        status:'',
         user_id:'',
         start:'',
         end:'',
         is_delete:'',
         id:''
      },
      selected:[],
      status1,
      calendarTypeOptions,
     
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
      dialogStatus: '',             //文件对话框
      textMap: {
        update: '编辑',
        create: 'Create'
      },
      dialogPvVisible: false,      //是否显示会话框
      pvData: [],
      rules: {
        type: [{ required: true, message: '类型是必须的', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: '时间是必须的', trigger: 'change' }],
        title: [{ required: true, message: '标题是必须的', trigger: 'blur' }]
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
     this.listQuery.id=localStorage.getItem('videoid')
    
    this.handleFilter(this.listQuery)
      setTimeout(() => {
      localStorage.setItem('videoid','')
    }, 10000);
  },
  methods: {
    // 请求列表数据
    getList() {
     
      videolist(this.listQuery).then(response => {
        console.log(response)
        var code=response.data.code
        if(code=="200"){
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
    // 更改状态
    getstatus(event){
      console.log(event)
       var id=event.id
       var status='2'
       this.$confirm('是否删除该视频, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            videodelete(id,status).then(response=>{
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
            message: '删除成功!'
          });
         }
          if(code=='403'){
           this.$message({
            type: 'danger',
            message: '无权操作!'
          });
         }
        if( code=='401'){
             this.$router.push({ path: '/login/index'})
         }
       })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    },
    // 搜索
    handleFilter() {
      // console.log(this.listQuery.type)
      this.listQuery.pn = 1
      this.getList(this.listQuery)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
//  全选
     toggleSelection(val) {
      //  console.log(val)
      //  this.selected = val;
      //  var id=val.map((item) => {return item.id;})
     
      },
      // switch切换
      switchchange(row){
        console.log(row)
        this.switchShow=row
      },
    // switchinput搜索
    switchinput(event){
       console.log(event)
    },
    // 排序
    sortChange(data) {
      // console.log(data)
      // const { prop, order } = data
      // if (prop == 'id') {
      //   this.sortByID(order)
      // }
    },
    sortByID(order) {
      // console.log(order)
      // if (order === 'ascending') {
      //   this.listQuery.sort = '+id'
      // } else {
      //   this.listQuery.sort = '-id'
      // }
      // this.handleFilter()
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
        this.$refs['dataForm'].clearValidate()      //
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // 模拟 a id
          this.temp.author = 'LZXX-admin'
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
   
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // 将2017年11月30日星期四16:41:05 GMT+0800（CST）改为151203311464
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
    // 不知道作用
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
   
    formatJson(filterVal, jsonData) {
      // return jsonData.map(v => filterVal.map(j => {
      //   if (j === 'timestamp') {
      //     return parseTime(v[j])
      //   } else {
      //     return v[j]
      //   }
      // }))
    }
  }
}
</script>
<style scoped >
     .table-img{
       width: 126px;
       height: 152px;
     }
       .inline-block{
     display: inline;
    
   }
  .filter-item{
    /* border: 1px solid  #1890ff; */
    margin-top: 6px
  } 
  .inline-block1{
     /* margin-left: 20px; */
  }
  .img-url{
     object-fit: fill;
     width: 120px;
     height: 120px;
  }
  .videourl{
    object-fit: fill;
    width: 120px;
    height: 120px;
  }
  .userid{
    width: 100%;
    height: 111px;
    line-height: 111px;
    
  }
</style>