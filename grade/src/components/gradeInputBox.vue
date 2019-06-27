<template>
  <!-- 输入分数组件-->
  <div class="grade-input-box">
    <div class="shdow-wrap">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <div class="echarts-wrap">
            <mpvue-echarts
              :echarts="echarts"
              :onInit="handleInitChart"
              :canvasId="canvasId"
              disableTouch="true"
              ref="echarts"
            />
          </div>
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{ inputTitle }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['inputValue', 'inputTitle', 'totalValue', 'index'],
  computed:{
    falseGrade() {
      return this.totalValue - this.currentValue
    },
    getOptionData() {
      return [this.currentValue, this.falseGrade]
    }
  },
  data () {
    return {
      canvasId: 'cav' + Math.random().toString(16).substr(2), // 防止重复随机生成CanvasId
      echarts: this.$echarts,
      onInit: this.initChart,
      currentValue : 0
    }
  },
  watch: {
  	inputValue(newValue, oldValue) {
  		if (parseFloat(newValue) >= parseFloat(this.totalValue) ) {
        this.currentValue = this.totalValue
        // 刷新图表
        this.refresh()
        return this.$emit("fullGrade", this.index, this.totalValue)
      }
      this.currentValue = newValue ? parseFloat(newValue) : 0
      // 刷新图表
      this.refresh()
  	}
  },
  methods: {
    refresh(){
      this.$refs.echarts.init()
    },
  	handleInitChart(canvas, width, height) {
  	  let chart = this.$echarts.init(canvas, null, {
  	    width: width,
  	    height: height
  	  });
  	  canvas.setChart(chart);
  	
  	  chart.setOption({
        // color: ['#fdcf47', '#ececec'],
        color: ['#e97f02', '#ececec'],

        series : [
            {
              type: 'pie',
              radius : '75%',
              center: ['50%', '50%'],
              label: {
                show: true,
                normal: {
                  position: 'inner'
                }
              },
              data: this.getOptionData
            }
        ]
      })
  	  return chart; // 返回 chart 后可以自动绑定触摸操作
  	}
  },
  beforeMount(){
    // 判断是否初始传入了inputValue， 做一次小圆圈的初始化
    if(this.inputValue >= 0) {
      this.currentValue = parseFloat(this.inputValue)
    }
  },
  updated() {
    // this.refresh()
  }
}
</script>

<style scoped>
.weui-media-box {
  padding: 10rpx 20rpx 20rpx;
}
.shdow-wrap{
  margin: 20rpx;
  box-shadow: 0 6rpx 8rpx 0 rgba(168,116,86,0.2);
}
.weui-media-box__hd {
  margin-right: 0.4em;
  margin-left: -10rpx;
  width: 140rpx;
  height: 140rpx;
}
.echarts-wrap {
  width: 100%;
  height: 100%;
}
.weui-media-box__title{
  margin-top:-30rpx;
}
</style>
