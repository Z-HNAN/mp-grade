import Vue from 'vue'
import App from './App'

/* 使用vuex */
import Store from './store/store'
Vue.prototype.$store = Store

/* ============= 引入 echarts ============= */
// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts'
Vue.prototype.$echarts = echarts
// 引入折线图。
import 'echarts/lib/chart/line'
// 引入扇形图
import 'echarts/lib/chart/pie'
// 引入雷达图
import 'echarts/lib/chart/radar'
// 引入图例组件。
import 'echarts/lib/component/legend'


// 引入mpvue-echars 
import mpvueEcharts from 'mpvue-echarts'
Vue.component('mpvue-echarts', mpvueEcharts)

/* ========== 引入 echarts  结束 ============= */

/* 引入WeUI */
import './static/vendor/weui/dist/style/weui.css'


/* 引入全局css */
import './static/css/global.css'



Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
