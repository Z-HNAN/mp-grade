<template>
  <div class="body"
  @touchstart='handleDragStart' 
  @touchend='handleDragEnd'
  >
    <!-- 正在加载 -->
    <div class="weui-loadmore" v-show="!isLoaded">
        <i class="weui-loading"></i>
        <p class="weui-loadmore__tips">{{renderTips}}</p>
    </div>
    <div class="navbar-wrap">
      <div class="weui-tab">
        <div class="weui-navbar">
          <div @tap="navBarTo(0)" class="weui-navbar__item" :class="{'weui-bar__item_on':currentNavBar === 0}" >
              总览
          </div>
          <div @tap="navBarTo(index+1)" class="weui-navbar__item" :class="{'weui-bar__item_on':currentNavBar === index+1}"
            v-for="(item, index) in userData" :key="index" 
          >
              {{item.gradeName}}
          </div>
        </div>
      </div>
    </div>
    <!-- 成绩项 -->
    <div class="grade-line-list" v-if="isLoaded">
      <div class="totalView" v-show="currentNavBar === 0">
        <div class="grade-line-wrap"><grade-rank-box :data="rankData.grades" :rankName="rankData.rankName" :maxRank="rankData.maxRank" :shadowColor="shadowColor[0]"></grade-rank-box></div>
        <div class="grade-line-wrap"><grade-total-box :data="totalData.grades" :totalName="totalData.totalName" :maxTotal="totalData.maxTotal" url="/pages/grade/total/main?login=1" :shadowColor="shadowColor[1]"></grade-total-box></div>
        <div class="grade-line-wrap"><grade-radar-box :data="avgData.grades" :avgName="avgData.avgName" :shadowColor="shadowColor[2]" circle="circle"></grade-radar-box></div>
      </div>
      <div class="grade-line-wrap" v-if="currentNavBar === (index+1)" v-for="(item, index) in userData" :key="index">
        <grade-detail :gradeId="item.gradeId" :isTourist="false"></grade-detail>
      </div>
    </div>
    
    <transition name="go-new">
      <div @tap="handRefresh" class="btn-icon refresh" :class="{'circleing': isLoaded === false}">
        <img src="/static/images/refresh.png" alt="">
      </div>
    </transition>
    
    <transition name="go-new">
      <div @tap="goGradeNew" class="btn-icon grade-add">
        <img src="/static/images/add.png" alt="">
      </div>
    </transition>
    
  </div>
</template>

<script>
import gradeLineBox from '@/components/gradeLineBox.vue'
import gradeRankBox from '@/components/gradeRankBox.vue'
import gradeTotalBox from '@/components/gradeTotalBox.vue'
import gradeRadarBox from '@/components/gradeRadarBox.vue'

import gradeDetail from '@/components/gradeDetail.vue'

import {mapState, mapActions} from 'vuex'

 export default {
   data() {
     return {
      shadowColor: ['#e97f02', '#e36868','#a3bac2','#bfad86','#94b38f','#f5be33'],
      currentNavBar: 0,   // navbar导航
      dragInfo: {},       // 移动信息
      // avator: '',
      userData: [],
      rankData: [],
      totalData: [],
      avgData: {},
      isLoaded: false,
      toggleFresh: true,
     }
   },
   computed: {
   	...mapState(['userinfo']),
    renderTips () {
      return this.$store.getters.getRandomTip()
    }
   },
   methods:{
     ...mapActions(['getNameGradeList', 'getUserinfo', 'getUserGradeList', 'getTipsList', 'getPaperPackage', 'fixGrade']),
     goGradeNew () {
       wx.navigateTo({url: '/pages/grade/new/main'})
     },
     handRefresh () {
      this.isLoaded = false
      // 刷新数据,重新获取用户数据
      this.getUserGradeList().then(() => {
        this.userData = this.$store.getters.getSimpleAllUserGrade()
        this.totalData = this.$store.getters.getTotalGrade()
        this.rankData = this.$store.getters.getGradeRank()
        this.avgData = this.$store.getters.getGradeAvg()
        this.isLoaded = true
        // this.toggleFresh = !this.toggleFresh
      })
     },
         // 切换navbar页面
     navBarTo (index) {
       this.currentNavBar = index
     },
     handleDragStart (e) {
       this.dragInfo.startX = e.clientX
       this.dragInfo.startY = e.clientY
     },
     handleDragEnd (e) {
       this.dragInfo.endX = e.mp.changedTouches[0].clientX
       this.dragInfo.endY = e.mp.changedTouches[0].clientY
       // 判断左右滑动
       const dragIndexMin = 0
       const dragIndexMax = this.userData.length
       let nextIndex = this.currentNavBar
       if (this.dragInfo.endX - this.dragInfo.startX > 50 && Math.abs(this.dragInfo.endY - this.dragInfo.startY) < 50) {      //右滑
         // turn = "right"
         nextIndex = nextIndex <= dragIndexMin ? dragIndexMin : nextIndex - 1 
       } else if (this.dragInfo.endX - this.dragInfo.startX < -50 && Math.abs(this.dragInfo.endY - this.dragInfo.startY) < 50) {   //左滑
         // turn = "left"
         nextIndex = nextIndex >= dragIndexMax ? dragIndexMax : nextIndex + 1 
       }
       // 判断是否有滑动
       if (nextIndex !== this.currentNavBar) {
         // 发生了变动，进行滑动
         this.navBarTo(nextIndex)
       }
     },
   },
   components: {
     gradeLineBox,
     gradeRankBox,
     gradeTotalBox,
     gradeRadarBox,
     gradeDetail,
   },
   created () {
     /* 获取提示信息 非必要 */
     this.getTipsList()
   },
   async beforeMount () {
     /* 新方式 */
     // 0.检查是否自检
     wx.showToast({
       icon: 'loading',
       title: "安全校验中......",
       duration: 5000
     })
     await this.fixGrade()
     wx.showToast({
       icon: 'success',
       title: "安全校验通过",
       duration: 1500
     })
     let pUser = this.getUserinfo()
     let pName = this.getNameGradeList()
     let pGrade = this.getUserGradeList()
     let pPackage = this.getPaperPackage()
     await Promise.all([pUser, pName, pGrade, pPackage])
     this.userData = this.$store.getters.getSimpleAllUserGrade()
     this.totalData = this.$store.getters.getTotalGrade()
     this.rankData = this.$store.getters.getGradeRank()
     this.avgData = this.$store.getters.getGradeAvg()
     // 加载完毕
     this.isLoaded = true
   },
   mounted () {
   }
 };
</script>

<style>
.body{
  padding-top: 70rpx;
}
.weui-loadmore__tips{
  font-size: 30rpx;
}
.navbar-wrap{
  position: fixed;
  top: 0;
  display: block;
  width: 100%;
  z-index: 500 !important;
}
.weui-navbar{
  position: relative;
}
.weui-navbar:after{
  border-bottom: none;
}
.weui-navbar__item{
  height: 30rpx;
  line-height: 30rpx;
  background-color: #fff !important;
  border-bottom:2rpx solid #eee;
}
.weui-navbar__item:after{
  border-right: none;
}
.weui-navbar .weui-bar__item_on{
  border-bottom:5rpx solid #f8ca00;
}  
.grade-line-wrap{
  margin: 10rpx;
}
.btn-icon{
  position: fixed;
  z-index: 1000;
}
.btn-icon img{
  width: 100%;
  height: 100%;
}

.btn-icon.grade-add{
  width: 120rpx;
  height: 120rpx;
  bottom: 20rpx;
  right: 40rpx;
}
.btn-icon.refresh{
  width: 90rpx;
  height: 90rpx;
  bottom: 145rpx;
  right: 56rpx;
}

/* 转圈的动画 */
.circleing{
  animation: btnRotate 0.8s linear infinite;
}
@keyframes btnRotate{
  from{transform: rotateZ(0);}
  to{transform: rotateZ(360deg);}
}
</style>
