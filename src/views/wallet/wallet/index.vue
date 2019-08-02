<template>
  <div class="app-container" style='cursor:pointer '>
    <div class="filter-container">
      <!-- <el-select v-model="listQuery.type" placeholder="金币来源" clearable class="filter-item1" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select> -->
     
       <el-input v-model="listQuery.user_id" placeholder="ID" style="width: 120px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter" />
       
      <div class="inline-block">
          <el-date-picker
              v-model="listQuery.start"
              type="date"
               value-format="yyyy-MM-dd"
              placeholder="选择开始日期">
          </el-date-picker>
      </div>
      <div class="inline-block"> 
          <el-date-picker
              v-model="listQuery.end"
              type="date"
               value-format="yyyy-MM-dd"
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
      <el-table-column label="序号" prop="id"  align="center" min-width="80">
      </el-table-column>

       <el-table-column label="用户ID"  prop="user_id"  width="130px" align="center">
            <template slot-scope="{row}" >
             <div  class='userid'>
                 <alluserinfo  :data="row.user_id" :row="row"  ></alluserinfo>
             </div>
           </template>

      </el-table-column>


        <el-table-column label="当前金币"  prop="coin"  min-width="110px" align="center">    
      </el-table-column>

        <el-table-column label="获取时间"  prop="created_at"  min-width="160px" align="center">
      </el-table-column>

        <el-table-column label="累计金币"  prop="total_coin"  min-width="110px" align="center"> 
      </el-table-column>

      

       <el-table-column label="累计提现金额"  prop="total_withdraw"  min-width="120px" align="center">
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />
   
  </div>
</template>


<script>
import { fetchList,walletlist, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import alluserinfo from '../../../views/alluserinfo'





export default {
  //这是什么
  name: 'ComplexTable',
  components: { Pagination,alluserinfo},
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
      },
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
    this.listQuery.user_id=localStorage.getItem('userid')
    console.log(this.id)
    this.handleFilter(this.listQuery)
    setTimeout(() => {
      localStorage.setItem('userid','')
    }, 10000);
  },
  methods: {
    // 请求列表数据
    getList() {
     
      walletlist(this.listQuery).then(response => {
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

    }
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
     /* margin-left: 20px; */
  }

</style>