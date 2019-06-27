<template>
  <!-- 成绩分享组件 -->
	<div class="grade-wrap">
	    <div class="weui-panel__bd">
        <span class="grade-rabder-title" :style="'background-color: ' + shadowColor + ';'">{{avgName}}</span>
        <div class="echarts-wrap">
          <mpvue-echarts :echarts="echarts" :onInit="handleInitChart" :canvasId="canvasId" ref="echarts"/>
        </div>
	    </div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      echarts: this.$echarts,
      onInit: this.initChart,
      canvasId: 'cav' + Math.random().toString(16).substr(2), // 防止重复随机生成CanvasId
    }
  },
  props: ['data', 'avgName', 'toggerFresh', 'shadowColor', 'circle'],
  computed: {
    // 绘图数据
    indicatorData () {
      return this.data.map(grade => {return {name:grade.gradeName, max:grade.maxGrade}})
    },
    // 显示数据
    seriesData () {
      return this.data.map(grade => grade.value)
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
    
      let option = {
        radar:{
          startAngle: '45',
          shape: this.circle === 'circle' ? 'circle' : 'polygon', // circle, polygon
           name: {
            textStyle: {
                color:'#6e535c'
            }
          },
          splitArea: {
            areaStyle: {
                // color: ['#B8D3E4', '#96C5E3', '#7DB5DA', '#72ACD1']
            }
          },
          indicator: this.indicatorData,
        },
        color:['#c23531'],
        series:{
          type: 'radar',
          data: [{
            value : this.seriesData,
            label: {
              normal: {
                show: true,
              }
            }
          }]
        }
    }
       // ECharts 配置项
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
  /* background-color:#FFFFFF; */
  position:relative;
  overflow:hidden;
}
.grade-wrap .weui-panel__bd{
  margin: 26rpx;
  box-shadow: 0 8rpx 16rpx 0 rgba(219,156,79,0.2);
  border-radius: 16rpx;
}
.grade-rabder-title{
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
.echarts-wrap{
  padding-top: 20rpx;
  height: 600rpx;
  width: 100%;
}
</style>
