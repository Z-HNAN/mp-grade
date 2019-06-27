<template>
	<div>
    
    <div class="weui-loadmore" v-if="!isRender">
      <i class="weui-loading"></i>
      <p class="weui-loadmore__tips">{{renderTips}}</p>
    </div>
    
    <div v-if="isRender">
      <!-- 成绩分析走势图-->
      <div class="detail-line-wrap">
        <grade-line-box :data="grades" :gradeName="detailData.gradeName" :gradeMax="detailData.maxGrade" :toggerFresh="toggerFresh" url="#" shadowColor="#e36868"></grade-line-box>
      </div>
      
      <!-- 排名走势图-->
      <div class="detail-line-wrap">
        <div class="grade-line-wrap"><grade-rank-box :data="rank" :rankName="detailData.gradeName+'排名'" :toggerFresh="toggerFresh" maxRank="500" shadowColor="#e97f02"></grade-rank-box></div>
      </div>
      
      <!-- 平均雷达图-->
      <div class="detail-line-wrap">
        <div class="grade-line-wrap"><grade-radar-box :data="avgGrade" :avgName="detailData.gradeName+'平均分'"  shadowColor="#a3bac2"></grade-radar-box></div>
      </div>
      
      <!-- 成绩分析项-->
      <div class="detail-list weui-panel">
          <div class="weui-panel__hd">各次成绩报告</div>
          <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_small-appmsg">
                  <div class="weui-cells">
                      <div class="grade-detail-box-for" v-for="(grade, gradeIndex) in gradeList" :key="gradeIndex">
                      
                      <a @click="handleDetailGrade(gradeIndex)" class="weui-cell weui-cell_access">
                          <div class="weui-cell__bd weui-cell_primary">
                              <p>{{grade.gradeTitle}}  {{grade.gradeTotal}}分</p>
                          </div>
                          <span class="weui-cell__ft">点击查看</span>
                      </a>
                      <!-- 成绩分析图-->
                      <div class="detail-box-wrap list-line-box" v-if="currentGradeDetailInedx === gradeIndex">
                        <div class="box-input-list clear-fix" >
                          <div class="box-item" v-for="(item, itemIndex) in gradeItemList" :key="itemIndex">
                            <grade-input-box :totalValue="item.maxGrade" :inputTitle="item.topicName" :inputValue="grade.gradeObj[item.id]" :index="item.id"></grade-input-box>
                            <div class="input-content">{{grade.gradeObj[item.id]}}分</div>
                          </div>
                        </div>
                      </div>
                      </div>
                      
                  </div>
              </div>
          </div>
          
      </div>
    
    </div>
  </div>
</template>

<script>
import gradeLineBox from '@/components/gradeLineBox.vue'
import gradeInputBox from '@/components/gradeInputBox.vue'
import gradeRankBox from '@/components/gradeRankBox.vue'
import gradeRadarBox from '@/components/gradeRadarBox.vue'

import mockData from '@/data/userData.js'
import {mapState} from 'vuex'

export default {
  data() {
  	return {
      isLoader: false,  // loader的刷新状态
      isRender: false,  // 整个页面
      toggerFresh: false, // 局部刷新开关
      // gradeId: '',
      detailData: {}, // 总概况的data
      gradeItemList: [],  // 该科目的题型分布
      currentGradeDetailInedx: '',  // 当前的显示的索引
      gradeList: [], // 分数详情
      avgGrade: [],  // 平均分数据
  	}
  },
  props: ['gradeId', 'isTourist'],
  computed: {
    ...mapState(['userinfo', 'gradeNameList']),
  	grades () {
      return this.gradeList.map(item => parseFloat(item.gradeTotal))
  	},
    rank () {
      return this.gradeList.map(item => parseFloat(item.gradeRank))
    },
    renderTips () {
      return this.$store.getters.getRandomTip()
    }
  },
  methods:{
    handleDetailGrade (currentDetailIndex, e) {
      // 查看是否当前是关闭状态
      if (this.currentGradeDetailInedx === currentDetailIndex) {
        return this.currentGradeDetailInedx = ''
      }
      // 替换当前点击的位置
      this.currentGradeDetailInedx = currentDetailIndex
    },
    getGradeItemList () {
      const db = wx.cloud.database()
      return db.collection('paperSubject').where({
          id: this.gradeId
      }).get()
    },
    getTouristGrade () {
//       const db = wx.cloud.database()
//       return db.collection('mockGrade').where({gradeId:this.gradeId}).orderBy('gradeDate', 'asc').get()
//       .then(res => {
//         let avgData = this.getTouristAvgGrade(res.data)
//         return {data: res.data, avgData:avgData}
//       })
        return mockData[this.gradeId]     // 取出固定缓存数据
    },
    getTouristAvgGrade(userGrades) {
      const gradeStandard = this.detailData
      const currentGradeList = userGrades
      // 1. 首先把每道题的平均分过滤一次记录下来
      // 1.1 准备数组

      let grades = gradeStandard.gradeItemList.map(item => {
        return {
          id: item.id,
          maxGrade: item.maxGrade,
          gradeName: item.topicName,
          value: 0
        }
      })
      let detailCount = 0
      // 1.2遍历成绩做记录
      currentGradeList.forEach(grade => {
        // 得到每次考试详情项
        let gradeObj = grade.gradeObj
        if (JSON.stringify(gradeObj) !== "{}") {detailCount++}
        for(let key in gradeObj) {
          // 遍历加和进去 提米对应关系
          grades.forEach(item =>{
            if (item.id != key) return
            // 寻找到需要添加数据
            item.value = parseFloat(item.value) + parseFloat(gradeObj[key])
          })
        }
      })
      // 预防detailCount为0报除法异常
      detailCount = detailCount === 0 ? 1 : detailCount
      // 1.3 求出平均数
      grades.forEach(item => item.value = (item.value/detailCount).toFixed(2))
      
      // console.log(grades) // 平均分完毕 grade {id, gradeName, maxGrade, value}
      return grades
    },
    getGrade () {
      return new Promise((resolve, reject) => {
        let userGradeById = this.$store.getters.getUserGradeByGradeId(this.gradeId) // 获取用户数据
        let avgData = this.$store.getters.getDetailGradeAvg(this.gradeId) // 获取平均分数据
        resolve({data:userGradeById, avgData:avgData})
      })
    },
  },
  components:{
    gradeLineBox,
    gradeInputBox,
    gradeRankBox,
    gradeRadarBox,
    
  },
  
  beforeMount () {
    // 进来就设为false,放置页面缓存的影响
    this.isRender = false
    // 获取gradeId
    // this.gradeId = parseInt(this.$mp.query.gradeId) 
    // 分数详情查看
    return new Promise((resolve, reject) => {
      if (!this.isTourist) { // 正常模式
         // 本地获取分数项
        this.detailData = this.gradeNameList.find(gradeNameItem => gradeNameItem.id == this.gradeId )
        this.gradeItemList = this.detailData.gradeItemList
        // 得到分数
        resolve(this.getGrade())
      }else{ // 游客模式
        // 云端获取分数标准
        this.getGradeItemList().then(res => {
        this.detailData = res.data[0]
        this.gradeItemList = this.detailData.gradeItemList
        // 得到用户分数
        resolve(this.getTouristGrade())
        })
      }
    })
    .then(res => {
      this.gradeList = res.data
      this.avgGrade = res.avgData
      // 最后一步重新渲染数据
      this.isRender = true
      // 重新刷新图表数据
      this.toggerFresh = !this.toggerFresh
    })
    
  },
  updated () {
    
  }
}
</script>

<style scoped>
.weui-loadmore__tips{
  font-size: 30rpx;
}
.detail-box-wrap{
/*  background: deeppink;
  height: 400rpx; */
}
.detail-box-wrap.list-line-box{
  margin: 26rpx;
  box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.2);
  border-radius: 16rpx;
}
.box-item{
  box-sizing: border-box;
  width: 50%;
  height: 200rpx;
  float: left;
}
.box-item:nth-child(odd){
    border-right: 1rpx solid #eee;
  }
.box-item .input-content{
  margin-top:-75rpx;
  margin-left:49%;
  font-size: 40rpx;
}
</style>
