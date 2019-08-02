<template>
    <div>
      <div class=" menu-filter-top">
       <el-select v-model="listQuery.pos" placeholder="位置" clearable class="filter-item" style="width: 110px" @change='handleFilter1'>
        <el-option v-for="item in posobj" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select> 
      <el-select v-model="listQuery.type" placeholder="类型" clearable class="filter-item" style="width: 110px" @change='handleFilter1'>
        <el-option v-for="item in typeobj" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select> 
        <el-input v-model="listQuery.version" placeholder="版本号" style="width: 100px;" class="filter-item1 inline-block1" @keyup.enter.native="handleFilter1" />
      
     
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter1">
        搜索
      </el-button>
        <el-button type="primary" class='detail' @click='detail'>详情</el-button>
           <el-dialog
            :visible.sync="dialogVisible1"
            width="87%"
            class='dialog-detail'
            :before-close="handleClose">
             <div class='all-before1'>
                 <div class='index'>
                   <div class='title-name'>首页</div>
                     <div class="detail-before detail-all detail-top">
                         <div class='detail-a'>选中前:</div>
                         <div class='border'>{{indexnamebefore}}</div>
                         <img class='img-all'  :src="indeximgbefore" alt="">
                     </div>
                      <div  class="detail-after detail-all">
                         <div class='detail-a'>选中后:</div>
                         <div class='border'>{{indexnameafter}}</div>
                         <img class='img-all' :src="indeximgafter" alt="">
                     </div>
                    
                 </div>
                  <div class='find'>
                   <div class='title-name'>发现</div>
                     <div class="detail-before detail-all">
                         <div class='detail-a'>选中前:</div>
                         <div class='border'>{{findnamebefore}}</div>
                         <img class='img-all' :src="findimgbefore" alt="">
                     </div>
                      <div  class="detail-after detail-all">
                         <div class='detail-a'>选中后:</div>
                         <div class='border'>{{findnameafter}}</div>
                         <img class='img-all' :src="findimgafter" alt="">
                     </div>
                 
                 </div>
                  <div class='my'>
                   <div class='title-name' >我的</div>
                     <div class="detail-before detail-all">
                         <div class='detail-a'>选中前:</div>
                         <div class='border'>{{mynamebefore}}</div>
                         <img class='img-all' :src="myimgbefore" alt="">
                     </div>
                      <div  class="detail-after detail-all">
                         <div class='detail-a'>选中后:</div>
                         <div class='border'>{{mynameafter}}</div>
                         <img class='img-all' :src="myimgafter" alt="">
                     </div>
                  
                 </div>
        
            </div>
           
        </el-dialog>
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
       <el-table-column label="选中前"  prop="name"  width="80px" align="center">
      </el-table-column>
       <el-table-column label="选中前图像"  prop="icon"  width="160px" align="center">
           <template slot-scope="{row}">
            <img :src="row.icon" class='icon-url' alt="">
          </template>
      </el-table-column>
       <el-table-column label="选中后"  prop="name_selected"  width="80px" align="center">
      </el-table-column>
       <el-table-column label="选中后图像"  prop="icon_selected"  width="160px" align="center">
           <template slot-scope="{row}">
            <img :src="row.icon_selected" class='icon-selected-url' alt="">
          </template>
      </el-table-column>
        <el-table-column label="位置"  prop="pos"   width="120px" align="center">
             <template slot-scope="{row}">
                    {{{'1':'首页','2':'发现','3':'我的'}[row.pos]}}
            </template>
       </el-table-column>
       <el-table-column label="类型"  prop="type"   width="120px" align="center">
              <template slot-scope="{row}">
                    {{{'1':'通用','2':'固定'}[row.type]}}
            </template>
       </el-table-column>
      <el-table-column label="版本号"  prop="version"   width="120px" align="center">
                 
      </el-table-column>
      
      <el-table-column label="操作" align="center" min-width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini"   @click="changestatus(row,event)"  v-show='level1' >
            删除
          </el-button>
        
        </template>
      </el-table-column>
    </el-table> 
   <!-- 分页器 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pn" :limit.sync="listQuery.rn" @pagination="getList" />

       <el-button  class='dialog-top-button' type="text" @click="dialogVisible = true" v-show='level1' >添加</el-button> 
      <el-dialog
         :visible.sync="dialogVisible" width="35%" title="添加" :before-close="handleClose">
            <div class='all-before'>
            <div class='before1'>
                <div class='before1-left'>
                      <div style="margin-right:8px">选中前:</div>
                      <el-input v-model='name' class='input1'></el-input>
                </div>
                <div class='upload-box'>
                    <el-upload
                        ref="my-upload"
                        class="upload-demo"
                        :action="process+'/upload_img'"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="onSuccess"
                         :with-credentials="true"
                        :file='fileList'
                        list-type="picture">
                        <el-button size="small" type="primary" class='upload-button'>+</el-button>
                    </el-upload>
                </div>
          </div>
          <div class='before2'>
              <div class='before1-left'>
                    <div style="margin-right:8px">选中后:</div>
                    <el-input v-model='name_selected' class='input1'></el-input>
              </div>
              <div class='upload-box'>
                  <el-upload
                  ref="my-upload1"
                      class="upload-demo"
                      :action="process+'/upload_img'"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :on-success="onSuccess1"
                      :file='fileList1'
                       :with-credentials="true"
                      list-type="picture">
                      <el-button size="small" type="primary" class='upload-button'>+</el-button>
                  </el-upload>
              </div>
          </div>
          <div class='before3'>
              <el-select v-model="pos" placeholder="位置" clearable class="filter-item1 margin" style="width: 110px">
                  <el-option v-for="item in posfrom" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </div>
            <div class='before4'>
              <el-select v-model="type" placeholder="版本" clearable class="filter-item1 margin" style="width: 110px">
                  <el-option v-for="item in banbenfrom" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </div>
          <div class='before5'>
                  <el-input v-model='version' placeholder="版本号" class='input1'></el-input>
          </div>
          <div class='tijiao'><el-button size="small" type="primary" class='upload-button'   @click="handleFilter">提交</el-button> </div>

                  
                </div>
                <!-- <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false;handleFilter">确 定</el-button>
                </span> -->
        </el-dialog>
      
    </div>
</template>
 
<script>
import { uploaderlist , uploaderadd, uploaderdelete, uploaderdetail } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import waves from '@/directive/waves' // waves directive
const posfrom=[
  {key:1,  display_name: '首页'   },
  {key:2,  display_name: '发现'   },
  {key:3,  display_name: '我的'   }
]
const banbenfrom=[
  {key:1,display_name:'通用'},
  {key:2,display_name:'固定'}
]
const posobj=[
  {key:1,  display_name: '首页'   },
  {key:2,  display_name: '发现'   },
  {key:3,  display_name: '我的'   }
]
const typeobj=[
  {key:1,display_name:'通用'},
  {key:2,display_name:'固定'}
]
   export default {
       name: 'ComplexTable',
       components: { Pagination },
       directives: { waves },
    data() {
      return {
        // 判断运行环境
        process:process.env.VUE_APP_BASE_API,
        level1:'',

        // 详情
        indexnamebefore:'',
        indexnameafter:'',
        indeximgbefore:'',
        indeximgafter:'',
        indexpos:'',
        indextype:'',
        indexversion:'',

        
        findnamebefore:'',
        findnameafter:'',
        findimgbefore:'',
        findimgafter:'',
        findpos:'',
        findtype:'',
        findversion:'',
 
        mynamebefore:'',
        mynameafter:'',
        myimgbefore:'',
        myimgafter:'',
        mypos:'',
        mytype:'',
        myversion:'',
        
   
        // 详情结束
      event:'',  
      tableKey: 0,
      list: null,
      total: 0,
         dialogVisible: false,
         dialogVisible1: false,
         fileList:[],
         fileList1:[],
           posobj,
           typeobj,
            icon:'',
            name:'',
            icon_selected:'',
            name_selected:'',
            dialogImageUrl: '',
            version:'',
            pos:'',
            type:'',
           posfrom,
           banbenfrom,
          file:'',
        listQuery:{
           pn: 1,
           rn: 20,
            version:'',
            pos:'',
            type:''


        }
      
      };
    },
     created(){
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
    methods:{
      env() {
        if (process.env.NODE_ENV === "development") return "development";   //开发环境
        if (window.location.href.includes('192.168')) return 'test';        //测试环境，"192.168"根据实际情况而定
        return 'production'                                                 //线上环境
    },

      getList(){
            console.log('66666')
            uploaderlist(this.listQuery).then(response => {
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      // 图片上传成功后，后台返回图片的路径
      onSuccess:function(res, fileList){
        console.log(res);
        if(res.code==200){
          this.icon=res.data.img;
        }
      },
       onSuccess1:function(res, fileList){
        console.log(res);
        if(res.code==200){
          this.icon_selected=res.data.img;
        }
      },
      // 获取详情界面
      detail(){
        this.dialogVisible1 = true
        var version=this.listQuery.version
          uploaderdetail(version).then(response=>{
            console.log(response)
            var code=response.data.code
            var info=response.data.info
            var data=response.data.data
            console.log(data)
            if(code==0){
               this.$message({
                type:'warning',
                message: info
              });
            }
            if(code==200){
                  console.log(!data['1'])
                if(data['1']){
              this.indexnamebefore =data['1']['name']
              this.indexnameafter =data['1']['name_selected']
              this.indeximgbefore =data['1']['icon']
              this.indeximgafter =data['1']['icon_selected']
              this.indexpos =data['1']['pos']
              this.indextype =data['1']['type']
              this.indexversion =data['1']['version']
                }
              if( data['2']){
                this.findnamebefore =data['2']['name']
              this.findnameafter =data['2']['name_selected']
              this.findimgbefore =data['2']['icon']
              this.findimgafter =data['2']['icon_selected']
              this.findpos =data['2']['pos']
              this.findtype =data['2']['type']
              this.findversion =data['2']['version']
              }
              if(data['3']){
                    this.mynamebefore =data['3']['name']
              this.mynameafter =data['3']['name_selected']
              this.myimgbefore =data['3']['icon']
              this.myimgafter =data['3']['icon_selected']
              this.mypos =data['3']['pos']
              this.mytype =data['3']['type']
              this.myversion =data['3']['version']
           }
            }
             if(code=='401'){
           this.$router.push({ path: '/login/index'})
       }

         
           
          })
      },
      // 搜索操作
       handleFilter1(e) {
      console.log(e)
      console.log(this.starttime)
      console.log(this.endtime)
      this.listQuery.pn = 1
      this.getList(this.listQuery)
    },
      // 上传图片
     handleFilter(){
       console.log('66666')     
       var icon=this.icon
       var name=this.name
       var icon_selected=this.icon_selected
       var name_selected=this.name_selected
       var pos=this.pos
       var type=this.type
       var version=this.version

        this.$confirm('是否提交, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求
       
            uploaderadd(icon,name,icon_selected,name_selected,pos,type,version).then(response=>{
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
           this.pos=''
           this.name=''
           this.version=''
           this.icon=''
           this.type=''
           this.name_selected=''
           this.icon_selected=''
           this.fileList1=[]
           this.fileList=[]
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
      clearFiles(){
            this.$refs['my-upload'].clearFiles();
            this.$refs['my-upload1'].clearFiles();
      },
        handleClose(done) {
          done();

      },
       // 更改配置状态
    changestatus(event){
      console.log(event)
      var id=event.id
      this.$confirm('是否禁用该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求
          uploaderdelete( id ).then(response=>{
         var code=response.data.code
         if(code=='0'){
           alert('未查询到该用户')
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
    }
    
  }
  
</script>
<style scoped>
.menu-table{
  margin-top: 56px
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
  margin-left: 10px
}
.upload-demo{
  display: flex;
  align-items: center;
  width: 100px;
  height: 67px;
}
.upload-button{
 margin-right: 10px;
 position: absolute;
}
.el-upload-list{
  width: 100px;
}
.all-before{
   height: 410px;
}

.before1-left{
  margin-right: 5px;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  text-align:center;
  align-items:center;
}
.before1{
  margin-top:10px;
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.before2{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
  
}
.before3{
   margin-left: 20px;
   margin-bottom: 20px
}

.before4{ 
   margin-left: 20px;
    margin-bottom: 20px
}

.before5{
   margin-left: 20px;
    margin-bottom: 20px
}
.tijiao{
   margin-left: 20px;
    margin-bottom: 20px
}
.input1{
  width: 150px;
  /* height: 52px; */
  
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
    display: flex

  }
  .index{
    width: 268px;
    display: flex;
    flex-direction: column;
    margin-right: 180px
  }
 .find{
    width: 268px;
    display: flex;
    flex-direction: column;
    margin-right: 180px
  }
  .my{
    width: 268px;
    display: flex;
    flex-direction: column;
    margin-right: 180px
  }
  .detail-all{
    display: flex;
    margin-top: 20px;
    align-items: center
  }
  .detail-a{
    width: 60px;
    margin-top: 2px;
   color: #409EFF
  }
  .detail-before{
    margin-bottom: 40px
  }
  .detail-after{
    margin-bottom: 40px
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
    border:1px solid #909399;
    border-radius: 10px;
    text-align:center;
    line-height: 40px
  }
  .title-name{
    text-align:center;
    font-weight: 600;
    color: #409EFF
  }
</style>