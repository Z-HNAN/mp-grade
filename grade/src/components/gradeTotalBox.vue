<template>
  <!-- 成绩分享折现组件 -->
	<div class="grade-wrap">
    <div class="shdow-wrap">
	    <div class="weui-panel__bd">
        <span class="grade-total-title" :style="'background-color: ' + shadowColor + ';'">{{totalName + '走势'}}</span>
	        <div class="echarts-wrap">
	          <mpvue-echarts :echarts="echarts" :onInit="handleInitChart" :canvasId="canvasId" ref="echarts"/>
	        </div>
	    </div>
	    <div class="weui-panel__ft">
	        <a :href="url" class="weui-cell weui-cell_access weui-cell_link">
	            <div class="weui-cell__bd">查看详情</div>
	            <span class="weui-cell__ft"></span>
	        </a>    
	    </div>
    </div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      toggerFresh: false,
      echarts: this.$echarts,
      onInit: this.initChart,
      canvasId: 'cav' + Math.random().toString(16).substr(2), // 防止重复随机生成CanvasId
    }
  },
  props: ['data', 'totalName', 'maxTotal','url', 'shadowColor'],
  computed: {
    showData () {
      return this.data.map(value => {return {value : value, label: {show: true, color:'#490a3d'}} })
    }
  },
  watch: {
  	toggerFresh(newValue, oldValue) {
  		// 是否刷新
      this.refresh();
  	}
  },
  methods: {
    refresh () {
      this.$refs.echarts.init()
    },
    handleInitChart (canvas, width, height) {
      let chart = this.$echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
    
      var option = {
        xAxis: {
         type: 'category',
         data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
         axisTick: {show: false},
        },
        yAxis: {
          type: 'value',
          axisTick: {show: false},
          // scale: true,
          max: this.maxTotal
        },
       series: [{
           data: this.showData,
           type: 'line',
           smooth: true,
           itemStyle: {  
             normal: {   
               lineStyle: {        // 系列级个性化折线样式  
                 width: 2,  
                 type: 'solid',  
                 color: "#e97f02"
               }
             },  
           },//线条样式 
       }],
       grid: {
        left: '2%',
        top: '20%',
        bottom: '3%',  
        containLabel: true  
       }
      }; // ECharts 配置项
      chart.setOption(option);
      return chart; // 返回 chart 后可以自动绑定触摸操作
    },
  },
  beforeMount () {
    this.toggerFresh = !this.toggerFresh
  },
  updated () {
  }
}
</script>

<style scoped>
.grade-wrap{
  height: 100%;
  width: 100%;
  position:relative;
  overflow:hidden;
}
.shdow-wrap{
  margin: 26rpx;
  box-shadow: 0 8rpx 16rpx 0 rgba(219,156,79,0.2);
  border-radius: 10rpx;
}
.grade-total-title{
  color:#fff;
  background: #bd1550;
  position:absolute;
  top:auto;
  left:-1rpx;
  display: block;
  width: 40%;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 8rpx;
  text-align: center;
}
.grade-wrap .weui-panel__bd{
}
.echarts-wrap{
  padding-top: 20rpx;
  height: 580rpx;
  width: 100%;
}
</style>
