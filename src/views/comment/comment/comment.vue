<template>
  <div class="app-container" style='cursor:pointer '>
    <div class="filter-container">
       <el-input v-model="listQuery.nickname" placeholder="昵称" style="width: 120px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
       <el-input v-model="listQuery.video_id" placeholder="视频ID" style="width: 120px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
       <el-input v-model="listQuery.user_id" placeholder="用户ID" style="width: 120px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
       <el-input v-model="listQuery.comment_id" placeholder="评论ID" style="width: 120px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.display" placeholder="状态" clearable class="filter-item1 margin" style="width: 110px" @change='handleFilter'>
             <el-option v-for="item in from" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
       <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item1 margin" style="width: 110px" @change='handleFilter'>
             <el-option v-for="item in statusfrom" :key="item.key" :label="item.display_name" :value="item.key" />
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
    >
      <el-table-column label="序号" prop="id"  align="center" width="80">
           <!-- <template slot-scope="{row}">
            <div v-if="row.display==1" >{{row.id}}</div>
          </template> -->
      </el-table-column>
        <el-table-column label="用户ID"  prop="" width="130px" align="center">  
           <template slot-scope="{row}" >
             <div   class='userid'>
                 <alluserinfo  :data="row.user_id" :row="row"  ></alluserinfo>
             </div>
           </template>
      </el-table-column>
       <el-table-column label="昵称"   prop="nickname"  width="110px" align="center">
          
      </el-table-column>

        <el-table-column label="评论内容"  prop="content"  min-width="110px" align="center">   
          
      </el-table-column>
      
       <el-table-column label="评论ID"  prop="comment_id"  width="110px" align="center">   
          
      </el-table-column>
        <el-table-column label="评论时间"  prop="created_at"  width="110px" align="center"> 
            
      </el-table-column>
        <el-table-column label="视频ID"  prop="video_id"  width="110px" align="center">  
              <template slot-scope="{row}" >
                <div  @dblclick="govideo(row) " class='userid'>
                 {{row.video_id}}
               </div>
           </template> 
      </el-table-column>
       <el-table-column label="状态"  prop="status"  width="110px" align="center">  
              <template slot-scope="{row}">
                 <div v-if="row.display==1" style='color:green' >{{{'0':'待审核','1':'通过','2':'拒绝'}[row.status]}}</div>
                   <div v-else style='color:red' >已删除 </div>
               
            </template>
      </el-table-column>
        <el-table-column label="被赞数" prop="zans" class-name="status-col" width="100">
             
       </el-table-column>
        <el-table-column label="被评论数" prop="comments" class-name="status-col" width="100">
               
       </el-table-column>
       <!-- <el-table-column label="状态" prop="status" class-name="status-col" width="100">
          <template slot-scope="{row}">
              
                   <div v-if="row.status==0"   >待审核</div>
                   <div v-else-if="row.status==1"  >通过审核</div>
                   <div v-else >审核未通过</div>
               
            </template>
       </el-table-column> -->
        <!-- <el-table-column label="审核员"  prop="Reviewer"  width="110px" align="center">    
            <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template>
        </el-table-column>    
       <el-table-column label="审核时间"  prop="pageviews"  width="110px" align="center">    
      </el-table-column> -->
      <el-table-column label="操作" align="center"  width="220px" class-name="small-padding fixed-width" >
        <template slot-scope="{row}">
          <div>
              <el-button  size="mini" v-if="row.status==0"  type="success" @click="handleModifyStatus1(row,event)" v-show='level1'>
          通过
          </el-button>
           <el-button  size="mini"  v-if="row.status==0"    type="danger" @click="handleModifyStatus2(row,event)" v-show='level1'>
          拒绝
          </el-button>
          <el-button  size="mini" v-if="row.status==1"  type="warning" @click="handleModifyStatus(row,event)" v-show='level1'>
          删除
          </el-button>
           <el-popover
                placement="top-start"
                title="拒绝理由:"
                width="200"
                class='popover'
                trigger="hover"
                 v-if='row.status==2'
               >
               <div >{{row.status_text}} </div>
                  <div  class='problem' slot="reference">
                  ?
                 </div>
             </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>

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
import { commentlist, changeCommentStatus,commentagree,commentrefuse, fetchPv, createArticle, updateArticle } from '@/api/article'
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
  {key:'1',  display_name: '在使用' },
  {key:'0',  display_name: '已删除' },
]
const statusfrom =[
  {key:'0',  display_name: '待审核' },
  {key:'1',  display_name: '已通过' },
  {key:'2',  display_name: '已拒绝' },
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
      level1:'',
      tableKey: 0,
      list: null,
      total: 0,
       dialogVisible1:false,
       reason:'',
      listQuery: {
        pn: 1,
        rn: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        video_id:'',
        user_id:'',
        nickname:'',
        display:'',
        status:'',
        start: '',
        end:'',
        comment_id:''
      },
      importanceOptions: [1, 2, 3],
      from,
      statusfrom,
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,  //隐藏弹窗
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
     
     commentlist(this.listQuery).then(response => {
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
     open() {
        
      },
    //搜索操作
    handleFilter(e) {
      console.log(e)
      console.log(this.starttime)
      console.log(this.endtime)
      this.listQuery.pn = 1
      this.getList(this.listQuery)
    },
    //删除操作
    handleModifyStatus(event) {
        var id=event.id
      this.$confirm('是否删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getList()
           changeCommentStatus( id ).then(response=>{
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
            message: '删除成功!'
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
     // 是否允许通过   
    handleModifyStatus1(event) {
      console.log(event)
      var id=event.id
     
       this.$confirm('是否允许该评论通过, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             commentagree(id,).then(response=>{
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
            message: '通过成功!'
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
            message: '已取消通过'
          });          
        });
    },
       // 是否拒绝提现  
    handleModifyStatus2(event) {
      this.dialogVisible1=true
      console.log(this.reason)
      console.log(event)
      this.id=event.id
    },
      // 发送拒绝理由
    sendreason(){
        console.log(this.reason)
        var reason=this.reason
        var id=this.id
           commentrefuse(id,reason).then(response=>{
           console.log(response)
         var code=response.data.code
         if(code=='0'){
           alert('未查询到该用户')
         }
         if(code=='200'){
           this.getList()
             this.$message({
            type: 'success',
            message: '拒绝成功!'
          });
          this.dialogVisible1 = false
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

    },
    // 去用户界面
    gouser(event){
      console.log(event)
      var userid=event.user_id
      localStorage.setItem('userid',userid)
       this.$router.push({path:'/users/users'})

    },
     // 去视频界面
    govideo(event){
      console.log(event)
      var videoid=event.video_id
      localStorage.setItem('videoid',videoid)
       this.$router.push({path:'/video/video'})

    }
  }
}
</script>
<style scoped>
   .inline-block{
     display: inline;
   }
  .filter-item{
    /* border: 1px solid  #1890ff; */
    margin-top: 6px
  } 
  .userid{
    width: 100%;
    height: 100px;
    line-height: 100px
   
    
  }
   .problem{
   width: 22px;
   border-radius: 5px;
   display:inline-block;
   background:#E6A23C
 }
</style>
