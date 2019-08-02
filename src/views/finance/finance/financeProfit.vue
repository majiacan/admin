
<template>
    <div>
        <div class="chart">
            <div class="chart-title">财务支出</div>
        </div> 
        <div class="chart-bottom">   
            <div class="chart-date">今日日期 2019-05-24</div>
            <div class="chart-today">本日累计支出 1800元</div>
            <div class="chart-all">累计支出 7890元</div>
              <div class="date">
                    <el-date-picker
                        v-model="starttime"
                        type="date"
                        placeholder="选择日期">
                     </el-date-picker>
             
                <el-button  class="filter-item" type="primary" icon="el-icon-search" >
                    搜索
                </el-button>
             </div>
        </div>
        <div class="mychart-box"> 
            <div id="myChart" class="mychart"></div>
        </div>
        
    </div>
</template>
<script>
// let echarts = require('echarts/lib/echarts')
// // 引入柱状图组件
// require('echarts/lib/chart/bar')

// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
export default {
     name: 'hello',
  data () {
    return {
     starttime:'',
    
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        // let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
             legend: {
	        // data:['申请融资金额','预测融资金额','增长率','预测增长率'],
	        x:'right'
	        
	       },
            // title: { text: '财务支出' },
            tooltip: {},
            xAxis: {
                // boundaryGap: false,
                data: ["00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00",]
            },
            yAxis: {
              // ticks:{
              //    beginAtZero:false
              // },
               name: '元',
            },
            series: [{
                // name: '支出',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20],
                barWidth :10 ,
                label:{
                    normal:{
                        show:true,
                        position:'top',

                    }
                }   
            }]
        });
    }
  }
}
</script>
<style >
*{
    margin: 0;
    padding: 0
}
.chart{
   
     font-size:30px;
     font-weight: 700;
      margin-top:10px;   
}
.chart-title{
  text-align: center;   
  color: brown;

}
.mychart-box{
  margin-left: -50px
}
    .mychart{
        width: 1000px;
        height: 650px;
      
    }
    .mychart> .element-style{
        left: -59px  !important
    }
    .chart-bottom{
      display: flex;
      font-size:18px;
      margin-top:15px;  
      align-items:center 
    }
    .chart-date{
      margin-left: 20px
    }
    .chart-today{
      margin-left: 42px  
    }
    .chart-all{
        margin-left: 42px
    }
    .date{
      position: absolute;
      left: 800px;
      top: 50px;
    }
    
</style>