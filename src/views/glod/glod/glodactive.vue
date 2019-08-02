<template>
   <div class="glodactive">
      <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="center" class="tab-nav">
    <el-tab-pane label="首次登陆红包说明" name="first" tab-position="center">
          <el-table
                class="el-table"
                :data="tableData2"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                 width="850"
                prop="address"
                label="地址">
                </el-table-column>
                 <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                   </template>
                </el-table-column>
            </el-table>
    </el-tab-pane>
    <el-tab-pane label="分享朋友圈说明" name="second">
           <el-table
                class="el-table"
                :data="tableData2"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
               
                <el-table-column
                    width="900"
                    prop="address"
                    label="地址">
                </el-table-column>
                 <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                   </template>
                </el-table-column>
            </el-table>
    </el-tab-pane>
    <el-tab-pane label="福利红包说明" name="third">
          <el-table
                 class="el-table"
                :data="tableData2"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                 width="900"
                prop="address"
                label="地址">
                </el-table-column>
                 <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                   </template>
                </el-table-column>
            </el-table>
    </el-tab-pane>
    
  </el-tabs>
   </div>
  
</template>
<script>
  export default {
    data() {
      return {
          activeName: 'first',
           center:'top',
           tableData2: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
      },
    
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>
<style >
   .glodactive{
     margin-left: 10px;
     margin-top: 10px
   }
    /* .el-tabs__item{
        font-size: 20px !important
    }
    #tab-first{
        margin-left: 380px !important
    } */
    .el-tabs__active-bar{   
        /* /* z-index:-999 !important; */
        /* margin-left: 380px !important  */
    }
     
  .el-table{
      /* margin-left:40px;
      margin-top: 20px; */
      /* border-bottom: 1px solid transparent;
      border-color: transparent; */
  }
</style>