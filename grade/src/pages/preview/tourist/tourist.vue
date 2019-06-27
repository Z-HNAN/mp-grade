<template>
  <div class="body"
    @touchstart='handleDragStart' 
    @touchend='handleDragEnd'
  >
    
    <div class="weui-loadmore" v-if="!isRender">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips ">授权后可有更多功能哦</span>
    </div>
        <div class="navbar-wrap">
          <div class="weui-tab">
            <div class="weui-navbar">
              <div @tap="navBarTo(0)" class="weui-navbar__item" :class="{'weui-bar__item_on':currentNavBar === 0}" >
                  总览
              </div>
              <div @tap="navBarTo(1)" class="weui-navbar__item" :class="{'weui-bar__item_on':currentNavBar === 1}">
                  数学(理)
              </div>
              <div @tap="navBarTo(2)" class="weui-navbar__item" :class="{'weui-bar__item_on':currentNavBar === 2}">
                  语文
              </div>
              <div @tap="navBarTo(3)" class="weui-navbar__item" :class="{'weui-bar__item_on':currentNavBar === 3}">
                  英语
              </div>
              <div @tap="navBarTo(4)" class="weui-navbar__item" :class="{'weui-bar__item_on':currentNavBar === 4}">
                  理综
              </div>
            </div>
          </div>
        </div>
    <div>
      
      <div v-if="isTourist" class="tourist-head weui-cell">
        <div class="weui-cell__bd">
          <p class="tourist-head-btn"><Button open-type="getUserInfo" @getuserinfo="handleGetUserInfo" class="weui-btn weui-btn_plain-primary"><span class="iconfont icon-authorization"> </span>创建自己的记录册</Button></p>
          <p class="tourist-head-tips">届时您的成绩也会以此方式呈现上去</p>
        </div>
      </div>
      
      <div class="grade-line-list">
        <div class="totalView" v-show="currentNavBar === 0">
          <div class="grade-line-wrap"><grade-rank-box :data="rankData.grades" :rankName="rankData.rankName" :maxRank="rankData.maxRank" :isRender="isRender" :shadowColor="shadowColor[0]"></grade-rank-box></div>
          <div class="grade-line-wrap"><grade-total-box :data="totalData.grades" :totalName="totalData.totalName" :maxTotal="totalData.maxTotal" url="/pages/grade/total/main?login=0" :shadowColor="shadowColor[1]"></grade-total-box></div>
          <div class="grade-line-wrap"><grade-radar-box :data="avgData.grades" :avgName="avgData.avgName" :shadowColor="shadowColor[2]" circle="circle"></grade-radar-box></div>
        </div>
        <div class="grade-line-wrap" v-if="currentNavBar === (index+1)" v-for="(item, index) in userData" :key="index" >
          <grade-detail :gradeId="item.gradeId" :isTourist="true"></grade-detail>
        </div>
      </div>
      
      <transition name="fade">
        <div @tap="goGradeNew" class="grade-add">
          <img src="/static/images/add.png" alt="">
        </div>
      </transition>
    
    </div>
    
  </div>
</template>

<script>
 import gradeLineBox from '@/components/gradeLineBox.vue'
 import gradeRankBox from '@/components/gradeRankBox.vue'
 import gradeTotalBox from '@/components/gradeTotalBox.vue'
 import gradeRadarBox from '@/components/gradeRadarBox.vue'
 
 import gradeDetail from '@/components/gradeDetail.vue'
 
 import {mapActions} from 'vuex'

 import mockData from '@/data/userData'
 
 export default {
   data() {
     return {
       shadowColor: ['#e97f02', '#e36868','#a3bac2','#bfad86','#94b38f','#f5be33'],
       currentNavBar: 0,
       isTourist: true,   // 默认是游客功能
       dragInfo: {},
       userData: mockData.userData,
       rankData: mockData.rankData,
       totalData: mockData.totalData,
       avgData: mockData.avgData,
       isRender: false
     };
   },
   methods:{
    ...mapActions(['getUserinfo']),
    handleGetUserInfo (res) {
      // 授权成功
      if (res.mp.detail.rawData) {
         // 获取用户数据
         wx.cloud.callFunction({name:'register'}).then(res => {
          // 获取用户信息
          this.getUserinfo()
          // 跳转到home页 
          wx.switchTab({url: '/pages/home/main'})
         })
      }
    },
    goGradeNew () {
      wx.showToast({
        icon: 'none',
        title: "(〃'▽'〃)请先授权登录"
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
    gradeDetail
   },
   beforeMount () {
     // 获取是否是游客模式进来
     this.isTourist = parseInt(this.$mp.query.tourist) === 0 ? false : true
     if (this.isTourist === false) {
       //==========已经授权 再次查看============
       return this.isRender = true
     }
     
     //==========第一次进入应用============
     // 检测是否授权
     wx.getUserInfo({
       complete: (res) => {
        if (res.rawData) {
          // 授权成功
          wx.switchTab({url: '/pages/preview/index/main'})
        }else{
          // 授权失败 获取数据 获取实例数据
          wx.cloud.database().collection('guide').where({type: 'new'}).orderBy('url', 'asc').get().then(res => {
            // 查看新手教程
            wx.previewImage({
              urls: res.data.map(item => item.url) // 需要预览的图片http链接列表
            })
          })
          this.isRender = true
       }
      }
    })
   },
   
 };
</script>

<style scoped>
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
  z-index: 10000 !important;
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
  background-color: #fff;
  border-bottom:2rpx solid #eee;
}
.weui-navbar__item:after{
  border-right: none;
}
.weui-navbar .weui-bar__item_on{
  border-bottom:5rpx solid #f8ca00;
}  

.tourist-head{
  border-bottom: 1rpx solid #eee;
  height: 200rpx;
}

.tourist-head .tourist-head-tips{
  line-height: 60rpx;
  font-size: 30rpx;
  margin-top: 40rpx;
  text-align: center;
  color: #606266;
}

.tourist-head .tourist-head-btn{
  padding: 20rpx 20rpx 0;
  margin-bottom: -30rpx;
}

.grade-line-wrap{
  margin: 10rpx;
  border-bottom: 1rpx solid #eee;
}

.grade-add{
  width: 120rpx;
  height: 120rpx;
  position: fixed;
  bottom: 20rpx;
  right: 40rpx;
  z-index: 10000;
}
.grade-add img{
  width: 100%;
  height: 100%;
}

</style>
