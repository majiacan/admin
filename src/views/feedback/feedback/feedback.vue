<template>
  <div class="app-container" style='cursor:pointer '>
    <!-- 顶部搜索栏 -->
    <div class="filter-container">
       <el-input v-model="listQuery.id" placeholder="ID" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
       <el-input v-model="listQuery.user_id" placeholder="用户ID" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.os" placeholder="系统" clearable class="filter-item1" style="width: 110px" @change='handleFilter'>
        <el-option v-for="item in cashfrom" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
  
     <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item1" style="width: 110px" @change='handleFilter'>
        <el-option v-for="item in cashstatus" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
       
      <!-- <el-select v-model="listQuery.type3" placeholder="审核人" clearable class="filter-item1" style="width: 90px">
        <el-option v-for="item in who" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
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

       <el-table-column label="用户ID"  prop="user_id"  width="130px" align="center">
             <template slot-scope="{row}" >
             <div class='userid'>
                 <!-- {{row.user_id}} -->
                  <alluserinfo  :data="row.user_id" :row="row"  ></alluserinfo>
             </div>
           </template>

      </el-table-column>
      <el-table-column label="系统"  prop="os"  width="90px" align="center">
         
      </el-table-column>
       <el-table-column label="问题描述"  prop="content"  width="150px" align="center">
         
      </el-table-column>
      <el-table-column label="图像"  prop="nickname"  width="350px" align="center">
            <template slot-scope="{row}">
                 <div v-if='!row.imgs[0]'>未上传图片</div>
                 <div class="demo-image__preview" v-else>
                 <el-image 
                    style="width: 100px; height: 100px"
                    :src="row.imgs[0]" 
                    :preview-src-list="row.imgs">
                 </el-image>
                  <el-image 
                   v-if="row.imgs[1]"
                    style="width: 100px; height: 100px"
                    :src="row.imgs[1]" 
                    :preview-src-list="row.imgs">
                 </el-image>
                  <el-image 
                    v-if="row.imgs[2]"
                    style="width: 100px; height: 100px"
                    :src="row.imgs[2]" 
                    :preview-src-list="row.imgs">
                 </el-image>
                  </div>
          </template>
      </el-table-column>
      <el-table-column label="视频"  prop="nickname"  width="150px" align="center">
           <template slot-scope="{row}">
            <video :src="row.video" class='img-url' alt="" controls v-show='row.video'></video>
            <div v-show='!row.video'>无</div>
          </template>
      </el-table-column>
     
        <el-table-column label="申请时间"  prop="created_at"  width="100px" align="center">  
      </el-table-column>
          <!-- <el-table-column label="审核人ID"  prop="auditor_id"  width="100px" align="center">  
      </el-table-column> -->
         <el-table-column label="回复人"  prop="auditor_name"  width="100px" align="center" >  
           <template slot-scope="{row}">
             <div :title=row.auditor_id>
                 {{row.auditor_name}}
             </div>
           </template>
      </el-table-column>
       <el-table-column label="回复状态"  prop="status_text"  width="120px" align="center" >
            <template slot-scope="{row}">
              <div class='hover1'>
                   {{{'0':'待处理','1':'已处理','2':'审核拒绝'}[row.status]}}
              <el-popover
                placement="top-start"
                title="拒绝理由:"
                width="200"
                class='popover'
                trigger="hover"
               >
               <div >{{row.status_text}} </div>
                  <div  class='problem' slot="reference" v-if='row.status==2'>
                  ?
                 </div>
             </el-popover>
              </div>
            </template>
      </el-table-column>
     
      <el-table-column label="操作" align="center" width="160px" class-name="small-padding fixed-width" >
        <template slot-scope="{row}">
          <el-button v-if="row.status=='0'"  v-show="level1" size="mini" type="danger"  @click="handleModifyStatus1(row,event)">
          回复
          </el-button> 
          <div v-if="row.status=='1'" style="margin-left:10px" >
              <div style='display:flex; justify-content:flex-start;font-size: larger;' >  回复内容：</div>
             <div style='text-align:start'> {{row.reply}}</div>
          </div>
        </template>
      </el-table-column>
       
    </el-table>
    <!-- 分页器 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />
    <!-- <img class='img' :src="feedback" alt="" > -->
         

     <!-- 查看弹窗   :before-close="handleClose"-->
      <el-dialog
        title="反馈回复"
        :visible.sync="dialogVisible1"
        width="30%"
       >
        <el-input v-model='reason'  type="textarea" placeholder="回复内容"/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="sendreason()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>


<script>
import Element from 'element-ui'
import { elimage } from 'element-ui';
import { feedbacklist, feedreply, cashrefuse, } from '@/api/article'
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
//ARR到OBJ，例如CN：“中国”，US：“美国”
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const cashfrom=[
  { key:'1',  display_name: 'IOS'   },
  { key:'2',  display_name: 'android'   }
]
const cashstatus=[
   { key:'0',  display_name: '待处理'   },
   { key:'1',  display_name: '已处理'   },
  
]
const who=[
   { key:'ZF',  display_name: '郑芳'   },
  { key:'ZCJ',  display_name: '张超锦'   },
  { key:'XFF',  display_name: '徐芳芳'   }
]

export default {
  //页码器
  name: 'ComplexTable',
  components: { Pagination ,alluserinfo },
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
      feedback:'',
         url: '',
        srcList: [
         
        ],
      listQuery: {   
        //页码查询
        pn: 1,
        rn: 20,
        title: undefined,
        os: undefined,
        status:'',
        sort: '+id',
        user_id:'',
        start: '',
        end:'',
        id:''
        
      },
      
      calendarTypeOptions,
      cashfrom,
      who,
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
  },
  methods: {
   getList() {
      feedbacklist(this.listQuery).then(response => {
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
    // 粘贴板
    copy() {  
        
        },
    // 获取到选择的值，进行搜索
    handleFilter() {
      console.log(this.listQuery.user_id)
      this.listQuery.pn = 1
      this.getList(this.listQuery)
    },
    // 是否允许提现   cashlog/apply
    handleModifyStatus(event) {
      console.log(event)
      var id=event.id
     
       this.$confirm('是否允许该用户提现, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             cashapply(id,).then(response=>{
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
            message: '提现成功!'
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
            message: '已取消提现'
          });          
        });
    },
    // 发送拒绝理由
    sendreason(){
        console.log(this.reason)
        var reason=this.reason
        var id=this.id
            feedreply(id,reason).then(response=>{
           console.log(response)
         var code=response.data.code
         if(code=='0'){
           alert('未查询到该用户')
         }
         if(code=='200'){
           this.getList()
             this.$message({
            type: 'success',
            message: '回复成功!'
          });
          this.dialogVisible1 = false
          this.reason=''
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
    // 是否拒绝提现   cashlog/refuse     dialogVisible1 = false
    handleModifyStatus1(event) {
      this.dialogVisible1=true
      console.log(this.reason)
      console.log(event)
      this.id=event.id
    
    },
    imgShow(row){
       this.feedback=row
    },
    imgShow1(row){
      console.log(row)
    },
  
    
  
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
    height: 100px;
    line-height: 100px;
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
.reason :hover{
  display: inline
}
.hover1:hover .reason{
  display: inline
   
}
  .img-url{
     object-fit: fill;
     width: 120px;
     height: 120px;
  }
  .img{
    position: absolute;
    top: 0;
    /* left: ; */
    width: 300px;
    height: 300px;
    z-index: 100
  }
/* .popover{
  background: red
} */
</style>

