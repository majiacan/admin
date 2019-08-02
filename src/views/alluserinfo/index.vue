<template>
  <div>
       <el-popover
                    placement="right-start"
                    title="详细信息"
                    min-width="250px"
                    style="z-index:2000 ;background:black"
                    trigger="hover"
                   
                   >
                    <div  >
                      <div class='alluserinfo-item1 '>
                           <div class='alluserinfo-img' >
                             <img  class='alluserinfo-img' :src="user.avatar" alt="">
                            </div>
                            <div  style="display:flex; justify-content: space-between ; ">
                              <div style='display:flex;  flex-direction: column; margin-left:20px'>
                                   <div class='alluserinfo  ' >
                                      <div class='alluserinfo-title'>用户ID:</div>
                                      <div class='alluserinfo-val'>{{user.id}}</div>
                                  </div>  
                                   <div class='alluserinfo'>
                                        <div class='alluserinfo-title'>状态:</div>
                                        <div class='alluserinfo-val'>{{{'1':'启用','2':'禁用'}[user.status]}}</div>
                                  </div>
                              </div>
                              <div>
                                <el-button style="margin-left:70px" type="success" size="mini" @click="send(row)" v-show="level1"> 发消息</el-button>
                              </div>
                            </div>
                           
                      </div>
                      <!-- 列表 -->
                      <div class='alluserinfo-box'>
                        <!-- 第一列 -->
                          <div class='alluserinfo-item' >
                           <div class='alluserinfo'>
                                <div class='alluserinfo-title'>用户昵称:</div>
                                <div class='alluserinfo-val'>{{user.nickname}}</div>
                            </div>
                                <div class='divider'></div>
                              <div class='alluserinfo'>
                                  <div class='alluserinfo-title'>师傅ID:</div>
                                  <div class='alluserinfo-val'>{{mercenary.parent_id==undefined?"无":mercenary.parent_id}}</div>
                              </div>
                                <div class='divider'></div>
                                <div class='alluserinfo'>
                              <div class='alluserinfo-title'>金币数:</div>
                              <div class='alluserinfo-val'>{{wallet.coin}}</div>
                           </div>
                             <div class='divider'></div>
                            <div class='alluserinfo '>
                              <div class='alluserinfo-title'>总金币数:</div>
                              <div class='alluserinfo-val'>{{wallet.total_coin}}</div>
                           </div>
                             <div class='divider'></div>
                           <div class='alluserinfo'>
                              <div class='alluserinfo-title'>提现金币数:</div>
                              <div class='alluserinfo-val'>{{wallet.total_withdraw}}</div>
                           </div>
                             <div class='divider'></div>
                         
                         </div>
                         <!-- 第二列 -->
                         <div class='alluserinfo-item' >
                             <div class='alluserinfo'>
                                <div class='alluserinfo-title'>佣金总数:</div>
                                <div class='alluserinfo-val'>{{mercenary.total_coin==undefined?"无":mercenary.total_coin}}</div>
                            </div>
                              <div class='divider'></div>
                             <div class='alluserinfo'>
                                <div class='alluserinfo-title'>reg_ip:</div>
                                <div class='alluserinfo-val'>{{user.reg_ip}}</div>
                           </div>
                             <div class='divider'></div>
                            <div class='alluserinfo'>
                                <div class='alluserinfo-title'>位置:</div>
                                <div class='alluserinfo-val'>{{user.reg_addr}}</div>
                           </div>
                             <div class='divider'></div>
                              <div class='alluserinfo'>
                                <div class='alluserinfo-title'>播放次数:</div>
                                <div class='alluserinfo-val'>{{play_cnt}}</div>
                            </div>
                              <div class='divider'></div>
                              <div class='alluserinfo'>
                                <div class='alluserinfo-title'>left_coin:</div>
                                <div class='alluserinfo-val'>{{mercenary.left_coin==undefined?"无":mercenary.left_coin}}</div>
                            </div>
                              <div class='divider'></div>
                         </div>
                   

                      </div>
                        <div class='alluserinfo'>
                                  <div class='alluserinfo-title'>imei:</div>
                                  <div class='alluserinfo-val'>
                                    {{user.imei==""?'无':user.imei}}
                                  </div>
                           </div>
                    </div>
                     <div  @dblclick="gouser(row) " class='userid1'  slot="reference"  @mouseenter="toggleShow(row)"   @mouseleave="toggleShow1(row)">
                       {{data}}
                    </div>
                   </el-popover>
                   <!-- 推送消息弹窗  style="position:absolute; top:10px;left:40px;"-->
                   <el-dialog
                      :visible.sync="dialogVisible"
                      width="30%"
                      :title="comment"
                      style="line-height:50px;text-align:left"
                   >
                      <div >
                          <div style="display:flex; margin-top:-30px">
                             <div><img class='tuiimg' :src="user.avatar" alt=""></div>
                            <!-- <div>向{{id}}用户发送消息</div> -->
                           
                               <!-- <el-switch
                                  style='height:50px;margin-left:40px'
                                  v-model='switchval'
                                  active-color="#13ce66"
                                  @change='switchchange'
                                  inactive-color="#ff4949">
                              </el-switch>
                          
                                <div v-show="switchshow">推送</div>
                                 <div v-show="!switchshow">系统消息</div> -->
                          </div>
                         <div>
                           <div  style="display:flex;flex-direction:cloumn;justify-content: 
                           flex-start; align-items:flex-start; flex-direction: column;width:100% ;margin-top:-6px">
                                 <el-input placeholder="推送标题" style="width: 350px;height:75px" v-model="push_info.push_title" :disabled="push_info.types.indexOf('push') === -1"/>
                                 <el-input placeholder="消息标题" style="width: 350px;height:75px"  v-model="push_info.title" :disabled="push_info.types.indexOf('message') === -1"/>
                                <el-input class='el-input' placeholder="消息内容" type='textarea' rows='7'
                                 style="width: 350px;min-height:100px;margin-top:15px"  v-model="push_info.content" :disabled="push_info.types.indexOf('message') === -1"/>
                           </div>


                           <div>
                             <el-checkbox-group v-model="push_info.types" :min="1">
                                 <el-checkbox v-for="item in push_info.check_types" :label="item.key" :key="item.key">{{item.value}}</el-checkbox>
                            </el-checkbox-group>
                           </div>
                         </div>
                      </div>

                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="push()">确 定</el-button>
                      </span>
                   </el-dialog>



  </div>

</template>
<script>
import {  hovershow } from '@/api/article'
import { simplePush } from "@/api/user";

export default {
    name:'alluserinfo',
    props:{
      data:{
        type:String,
      },
      row:{
        type:Object
      }
      // alluserinfo:{
      //   type:Array
      // }
    },
    data(){
      return{
     level1:'',
     alluserinfo:[],
     user:{},
     wallet:{},
     mercenary:{},
     push_info:{
         check_types:[{'key':'push', 'value':'推送'}, {'key':'message', 'value':'系统消息'}],
         title:'',
         disable_message: true,
         push_title:'',
         content:'',
         types:['push']
     },
     play_cnt:'',
     id:'',
     comment:'',
      checkList: [ ],
      switchval:true,
     dialogFormVisible : true,
      dialogVisible: false,
     switchshow:true,
     tuisong:'',
     xitong:'',
     tuixi:''
      }
    },
    watch:{
        push_info:{
            handler:function(){},
            deep: true
        },
        'push_info.title' : function(newVal, oldVal){
            console.log("标题修改",newVal,oldVal);
            if(oldVal === this.push_info.push_title && this.push_info.types.indexOf('push') !== -1){
                this.push_info.push_title = newVal;
            }
        }
    },
    created(){
      // console.log(alluserinfo)
        var level=localStorage.getItem('level')
        var arr='12'
        if(arr.indexOf(level) > -1){
              this.level1=true
            }else{
              this.level1=false
            }
    },
   methods:{
      // hover显示信息
    toggleShow(row){
       this.dialogFormVisible = true
      if(!row.user_id){
          var id=row.id
      }else{
         var id=row.user_id
      }
      
       console.log(row)
       this.id=id
       var startdate=new Date()
       var allid=this.alluserinfo.filter((item)=>{
            // console.log(item.user.id)
            return item.user.id && item.user.id == id;
       })

      //  console.log(this.alluserinfo)
      //  console.log(allid.length<0)
      //  没有该id
      if(allid.length==0){
           hovershow(id).then(response => {
              var code=response.data.code
              var data=response.data.data
              console.log(data)
              //  加时间戳
              data.id=id
              data.time=startdate
              if(code=='200'){
                this.alluserinfo.push(data)
                // console.log(this.alluserinfo)
              for(var i=0;i<this.alluserinfo.length;i++){
                  if(this.alluserinfo[i].id==id){
                      this.user=this.alluserinfo[i].user
                      this.wallet=this.alluserinfo[i].wallet
                      this.mercenary=this.alluserinfo[i].mercenary
                      this.play_cnt=this.alluserinfo[i].play_cnt
                    }
                    console.log(this.mercenary.parent_id==undefined)
                  }
              }
            if(code=='401'){
                this.$router.push({ path: '/login/index'})
            }
          }) 
      //  有id就判断时间
      }else{
      for(var i=0;i<this.alluserinfo.length;i++){
        if(this.alluserinfo[i].id==id){
        
          var idate=this.alluserinfo[i].time
          var index=i
          if((startdate-idate)>180000){
            this.alluserinfo.splice(index,1)
            console.log('超时了')
            //  重新请求
              hovershow(id).then(response => {
              var code=response.data.code
              var data=response.data.data
              //  加时间戳
              data.id=id
              data.time=startdate
              if(code=='200'){
                this.alluserinfo.push(data)
                // console.log(this.alluserinfo)
              }
            if(code=='401'){
                this.$router.push({ path: '/login/index'})
            }
          })
        }else{
          //  未过期就使用本地数据
          console.log('使用了本地数据')
          for(var i=0;i<this.alluserinfo.length;i++){
            if(this.alluserinfo[i].id==id){
                  this.user=this.alluserinfo[i].user
                  this.wallet=this.alluserinfo[i].wallet
                  this.mercenary=this.alluserinfo[i].mercenary
                  this.play_cnt=this.alluserinfo[i].play_cnt
            } 
          }
        }
      }else{
        console.log('不是该id')
      }
      }
      }
         
    },
    send(row){
        this.dialogVisible = true;
        console.log(row)
        if(!row.user_id){
          var id=row.id
        }else{
          var id=row.user_id
       }
       this.comment="向"+id+"用户发送消息"
    },
    change(){
      console.log(this.push_info.types)
    },
     toggleShow1(){
        // this.dialogFormVisible = false
     },
         // switch切换
      switchchange(row){
        console.log(row)
        this.switchshow=row
      },
        // 去用户界面
    gouser(event){
      console.log(event)
      var userid=event.user_id
      localStorage.setItem('userid',userid)
       this.$router.push({path:'/users/users'})

    },
    // 关闭弹窗
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    push(){
        let data = {
            type:this.push_info.types.join(','),
            title:this.push_info.title,
            push_title:this.push_info.push_title,
            content:this.push_info.content,
            user_id:this.id
        };
        if(this.dialogVisible){
            simplePush(data, () => {
                this.dialogVisible = false;
                this.$message({
                    type: 'success',
                    message: '发送成功!'
                });
            }, (error) => {
                this.$message({
                    type: 'danger',
                    message: error
                });
            });
        }
    }
   }
}
</script>
<style scoped >
.userid1{
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    /* background: red */
  }
  .alluserinfo-box{
    display: flex;
   
  }
  .alluserinfo-item1{
    display: flex;
    /* justify-content: center; */
    min-width: 120px;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px
  }
   .alluserinfo-item{
    display: flex;
    flex-direction: column;
    min-width: 120px;
    /* align-items: center; */
    margin-top: 8px;
    margin-bottom: 8px
  }
  
  .alluserinfo{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /* background: red */
    
  }
  .alluserinfo-val{
    
  }
  .alluserinfo-title{
    color: #409EFF
  }
  .alluserinfo-img{
    width: 50px;
    height: 50px;
  }
  .divider{
    width: 100%;
    height: 0px;
    margin-top: 12px;
    margin-bottom: 12px;
    border-top: 1px solid rgba(99,99,99,0.5)
  }
  .tuiimg{
    width: 50px;
    height: 50px;
  }
  .el-input{
    
  }
</style>