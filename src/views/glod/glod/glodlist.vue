<template>
  <div class="app-container" style='cursor:pointer '>
    <div class="filter-container">
      <el-select v-model="listQuery.op_type" placeholder="金币来源" clearable class="filter-item1" style="width: 130px" @change='handleFilter'>
        <el-option v-for="item in optype" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="收益支出" clearable class="filter-item1" style="width: 130px" @change='handleFilter'>
        <el-option v-for="item in type" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
        <el-input v-model="listQuery.user_id" placeholder="用户ID" style="width: 120px;" class="filter-item1 margin inline-block1" @keyup.enter.native="handleFilter" />
        
       <div class="inline-block">
          <el-date-picker
              v-model="listQuery.start"
              type="datetime"
             value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始日期">
          </el-date-picker>
      </div>
      <div class="inline-block"> 
          <el-date-picker
              v-model="listQuery.end"
              type="datetime"
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
      <el-table-column label="序号" prop="id"  align="center" width="100">
      </el-table-column>

       <el-table-column label="用户ID"  prop="user_id"  width="130px" align="center">
           <template slot-scope="{row}" >
             <div   class='userid'>
                    <alluserinfo  :data="row.user_id" :row="row"  ></alluserinfo>
             </div>
           </template>
      </el-table-column>
      
       <el-table-column label="当前金币数量"  prop="before"  width="120px" align="center">    
      </el-table-column> 
         <el-table-column label="获取金币数量"  prop="coin"  width="120px" align="center">   
             <template slot-scope="{row}" >
                 <div v-if='row.type==1' style='color:green'>+{{row.coin}}</div>
                 <div v-else style='color:red'>-{{row.coin}}</div>
           </template>

      </el-table-column>
         <el-table-column label="之后金币数量"  prop="after"  width="120px" align="center">    
      </el-table-column> 
        <el-table-column label="金币来源"  prop="op_type_desc"  width="100px" align="center">    
      </el-table-column> 
        <el-table-column label="ref_id"  prop="ref_id"  width="100px" align="center">    
      </el-table-column> 
    
        <el-table-column label="获取时间"  prop="created_at"  min-width="190px" align="center">
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
import { fetchList,coinloglist, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import alluserinfo from '../../../views/alluserinfo'

// 类型筛选
const optype=[
  {key: '1',display_name: '看视频'},
  {key: '2',display_name: '分享'},
  {key: '3',display_name: '佣金推广'},
  {key: '4',display_name: '活动红包'},
  {key: '5',display_name: '提现'},
  {key: '6',display_name: '提现拒绝'},
  {key: '7',display_name: '签到'},
  {key: '8',display_name: '猜金蛋活动-门票'},
  {key: '9',display_name: '猜金蛋活动-猜中奖励'},
  {key: '10',display_name: '评论奖励'},
  {key: '11',display_name: '看广告'},
 
]
const type=[
  {key: '1',display_name: '收入'},
  {key: '0',display_name: '支出'},
]


export default {
  //这是什么
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
     
      tableKey: 0,
      list: null,
      total: 0,
     
      listQuery: {   
        //页码查询
        pn: 1,
        rn: 20,
        user_id:'',
        title: undefined,
        type: undefined,
        sort: '+id',
        start: '',
        end:'',
        op_type:''
      },
      optype,
      type,
     
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
    this.getList()
  },
  methods: {
    // 请求列表数据
    getList() {
     
      coinloglist(this.listQuery).then(response => {
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
      // 去用户界面
    gouser(event){
      console.log(event)
      var userid=event.user_id
      localStorage.setItem('userid',userid)
       this.$router.push({path:'/users/users'})

    },

  }
}
</script>
<style scoped>
   .inline-block{
     display: inline;
    
   }
  .filter-item{
    border: 1px solid  #1890ff;
    margin-top: 6px
  } 
  .inline-block1{
     margin-left: 20px;
  }
  .margin{
    margin-left: 1px
  }
</style>