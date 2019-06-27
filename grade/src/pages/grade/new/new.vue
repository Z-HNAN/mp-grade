<template>
	<div class="body"
    @touchstart='handleDragStart' 
    @touchend='handleDragEnd'
  >
    <div class="navbar-wrap">
      <div class="weui-tab">
        <div class="weui-navbar">
          <div @tap="navBarTo(index)" class="weui-navbar__item" :class="{'weui-bar__item_on':currentNavBar === index}"
            v-for="(item, index) in gradeNameArr" :key="index" 
          >
              {{item.name}}
          </div>
        </div>
      </div>
    </div>
    
    <!-- 考试名称自动补全-->
    <div class="count-down clear-fix">
      <div class="weui-panel">
          <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_text">
                  <!-- <h4 class="weui-media-box__title">{{gradeName}}</h4> -->
                  <h6>{{gradeTitle}}</h6>
              </div>
          </div>
      </div>
      <!-- <count-down></count-down> -->
    </div>
    
    <div class="grade-new-body shadow-wrap">
      <!-- 科目选择-->
      <!-- <div class="grade-input grade-name-title weui-cell weui-cell_select weui-cell_select-before">
          <div class="weui-cell__hd">
            <picker class="weui-label" :range="gradeNameArr" range-key="name" @change="handleGradeNameChange">
              <view class="picker">
                  {{gradeName}}
              </view>
            </picker>
          </div>
          <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入考试名称" v-model="gradeTitle"/>
          </div>
      </div> -->
      
      <!-- 极简切换-->
      <div class="grade-min-switch">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_switch">
                <div class="weui-cell__bd">
                  <span class="grade-min-switch-tips">{{gradeName}}</span>
                  <div class="grade-min-switch-box">
                    <span class="grade-min-switch-title">{{isGradeMin ? '极简':'完全'}}模式</span>
                    <switch :checked="isGradeMin" @change="handleGradeMin" />
                  </div>
                </div>
            </div>
        </div>
      </div>
      
      <!-- 输入分数区域-->
      <div class="grade-min-wrap" v-if="isGradeMin === false">
        <div class="box-input-list clear-fix" >
          <div class="box-item" v-for="item in gradeItemList" :key="item.id">
            <grade-input-box :totalValue="item.maxGrade" :inputTitle="item.topicName" :inputValue="gradeNewObj[item.id]" :index="item.id" @fullGrade="handleFullGrade"></grade-input-box>
            <input class="weui-input" type="digit" placeholder="成绩" v-model="gradeNewObj[item.id]">
          </div>
        </div>
      </div>
      
      <!-- 排名块-->
      <div class="grade-input grade-rank weui-cell">
          <div class="weui-cell__hd">
            <label class="grade-input-head weui-label">排名</label>
          </div>
          <div class="weui-cell__bd">
              <input class="weui-input" type="number" placeholder="请输入此次排名" v-model="gradeRank"/>
          </div>
      </div>
      
      <!-- 考试时间块 -->
      <div class="grade-input weui-cell">
          <div class="weui-cell__hd"><label class="grade-input-head weui-label">日期</label></div>
          <div class="weui-cell__bd">
            <picker mode="date" end="2217-09-01" @change="handleDateChange">
              <div class="index_picker">
                <div class="grade-date">{{gradeDate?gradeDate:'请选择考试日期'}}</div>
              </div>
            </picker>
          </div>
      </div>
      
      <!-- 考试总分 min模式-->
      <div class="grade-min-wrap" v-show="isGradeMin === true">
        <div class="grade-input weui-cell">
            <div class="weui-cell__hd"><label class="grade-input-head weui-label">总分</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="digit" placeholder="请输入总分" v-model="gradeTotal"/>
            </div>
        </div>
      </div>
    
    </div><!-- 结束count-down-body -->
    
    <!-- 考试总分 full模式-->
    <div class="grade-min-wrap grade-new-footer" v-if="isGradeMin === false">
      <div class="grade-total weui-form-preview">
          <div class="grade-head weui-form-preview__hd">
              <div class="weui-form-preview__item">
                  <label class="grade-taotal-head weui-form-preview__label">此次总分共计：</label>
              </div>
          </div>
          <div class="weui-form-preview__bd">
            <p class="grade-total-content">{{gradeTotalComputed}} 分</p>
          </div>
      </div>
    </div>
    
    <div class="btn">
      <a v-if="isFinished === false || isAdding === true" class="weui-btn weui-btn_primary weui-btn_disabled"><i v-if="isAdding === true" class="weui-loading"></i>确认添加</a>
      <a v-if="isFinished === true && isAdding === false" @tap="handleAddGrade" class="weui-btn weui-btn_primary">确认添加</a>
    </div>
    
    
  </div>
</template>

<script>
  import gradeInputBox from '@/components/gradeInputBox'
  import countDown from '@/components/countDown'
  
  import {mapState, mapActions} from 'vuex'
  
//   let gradeItemList = [
//     {"id":0, "maxGrade":60, "topicName":"选择题"},
//     {"id":1, "maxGrade":20, "topicName":"填空题"},
//     {"id":2, "maxGrade":12, "topicName":"17题"},
//     {"id":3, "maxGrade":12, "topicName":"18题"},
//     {"id":4, "maxGrade":12, "topicName":"19题"},
//     {"id":5, "maxGrade":12, "topicName":"20题"},
//     {"id":6, "maxGrade":10, "topicName":"选考题"}
//   ]
  
  export default {
    data () {
      return {
        currentNavBar: 0,   // navbar导航
        dragInfo: {},     // 移动信息记录
        gradeNewObj:{},  // 避免页面栈压入 grade[gradeNameId] 由于key不同
        gradeTitle: '',  
        isAdding: false,
        isGradeMin: true,
        gradeRank: '',  
        gradeTotal: '', 
        gradeDate: '',
        gradeNameId: '',
        gradeItemList: [],
      }
    },
    watch: {
      // 判断是否超过总分
    	gradeTotal(newValue, oldValue) {
        // console.log(this.gradeNameArr[this.currentNavBar])
        if (newValue <= this.gradeNameArr[this.currentNavBar].maxGrade) {return}
        this.gradeTotal = this.gradeNameArr[this.currentNavBar].maxGrade
        wx.showToast({title: '棒！已经满分了', icon: 'success'})
    	},
      // 获取下一次 考试的名称
      gradeNameId (newValue, oldValue) {
        let index = this.userGradeList.filter(item => item.gradeId == newValue).length + 1
        this.currentGradeIndex = index
        this.gradeTitle = `第${index}次测验`
      }
    },
    methods:{
      ...mapActions(['getUserGradeList', 'updatePapaerPackage', 'getUserinfo']),
      handleFullGrade (index, totalValue) {
        // 该index已经满分了
        wx.showToast({title: '棒！已经满分了', icon: 'success'})
        this.gradeNewObj[index] = totalValue
      },
      handleGradeMin (e) {
        this.isGradeMin = e.mp.detail.value
      },
      handleDateChange (e) {
        this.gradeDate = e.mp.detail.value
      },
      handleAddGrade () {
        let grade = {
          gradeId: this.gradeNameId,
          gradeName: this.gradeName,
          gradeTitle: this.gradeTitle,
          gradeRank: this.gradeRank,
          gradeDate: this.gradeDate,
        }
        if (this.isGradeMin === true){
          // 极简模式
          grade.gradeTotal = this.gradeTotal
          grade.gradeObj = {}
        } else {
          // full模式
           grade.gradeTotal = this.gradeTotalComputed
           let tempObj = {}
           for(let key in this.gradeNewObj){
             // 排出他自动创建的其他属性
             if (parseInt(key) > 0){
               tempObj[key] = this.gradeNewObj[key]
             }
           }
           grade.gradeObj = tempObj
        }
        // 准备提交信息
        this.addGrade(grade)
      },
      addGrade (grade) {
        // 此次应该放入的试卷包的index 从0开始
        let index = this.userGradeList.filter(item => item.gradeId == grade.gradeId).length
        this.isAdding = true
        // 初始化
        this.initGrade()
        wx.cloud.database().collection('userGrade').add({
          data:grade,
          success: res => {
            // 创建成绩成功转入首页
            wx.showToast({title: '已成功创建！'})
            // 关联应有的试卷包
            wx.cloud.callFunction({
              name:'addPaperIdToPackage',
              data: {
                paperId: res._id, 
                packageIndex: index
              }
            }).then(res => {
              console.log(res)
              // 重新获取数据 
              this.getUserGradeList()   // 获取全部的分数 新的分数关联了云端抓取
              this.getUserinfo()        // 获取用户信息 有可能产生试卷包，有可能没产生
              this.isAdding = false
              console.log('======updatePapaerPackage=======')
              console.log(res.result.paperPackage)
              this.updatePapaerPackage(res.result.paperPackage)   // 将新的id放到本地store, 云端已经更新过了
            })
          }
        })
      },
      // 添加试卷id到默认包中
      addDefaultPacakge (paperId) {
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('userInfo').doc(this.userinfo._id).update({
          data: {
            defaultPackage: _.push([paperId])
          },
          complete: res => {
            console.log(res)
          }
        })
      },
      initGrade () {
        let index = this.userGradeList.filter(item => item.gradeId == this.gradeNameId).length + 2  // 此时还为同步数据
        this.gradeTitle =  `第${index}次测验` // 触发gradeTitle的刷新
        this.gradeRank = ''
        this.gradeDate = ''
        this.gradeTotal = ''
        this.gradeNewObj = {}
      },
          // 切换navbar页面
      navBarTo (index) {
        this.currentNavBar = index
        // 同步数据
        this.gradeNameId =this.gradeNameArr[index].id
        this.gradeItemList = this.$store.getters.getGradeInfoByGradeId(this.gradeNameId).gradeItemList
        // this.gradeItemList = this.gradeNameList.find(item => item.id === this.gradeNameId).gradeItemList
        this.isGradeMin = true
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
        const dragIndexMax = this.gradeNameArr.length
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
    computed:{
      ...mapState(['gradeNameList', 'userinfo', 'userGradeList']),
      gradeName () {
        return this.gradeNameArr[this.currentNavBar].name
      },
      isFinished () { // 是否完成填写
        if (!/\S/.test(this.gradeRank)) {return false}
        if (!/\S/.test(this.gradeDate)) {return false}
        if (this.isGradeMin === true && !/\S/.test(this.gradeTotal)) {return false} // 极简模式
        return true
      },
      gradeTotalComputed () {
        let sum = 0
        for(let id in this.gradeNewObj) {
          // 排出他自动创建的其他属性
          if (parseInt(id) >= 0){
            sum += parseFloat(this.gradeNewObj[id] || 0)  // 避免为空报错
          }
        }
        return sum
      },
      gradeNameArr () {
        return this.gradeNameList.map(item => {
          return {
            id:item.id,
            name:item.gradeName,
            maxGrade:item.maxGrade,
          }
        })
      },
    },
    components: {
      gradeInputBox,
      countDown
    },
    created () {
     
    },
    beforeMount () {
      // 初始化gradeNameId
      this.gradeNameId =this.gradeNameArr[0].id
      this.gradeItemList = this.gradeNameList.find(item => item.id === this.gradeNameId).gradeItemList
    },
    mounted () {
      // 页面初始化的任务
      
    }
  }
</script>

<style scoped>
.body{
  padding-top: 70rpx;
  height: 100vh;
  box-sizing: border-box;
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

.weui-media-box_text h4{
  font-size: 70rpx;
  text-align: center;
}
.weui-media-box_text h6{
  font-size: 65rpx;
  text-align: center;
}
  .grade-new-body.shadow-wrap,
  .grade-new-footer{
    margin: 26rpx;
    box-shadow: 0 8rpx 16rpx 0 rgba(168,116,86,0.4);
    border-radius: 16rpx; 
  }
  
  .grade-input{
    height: 90rpx;
    padding: 5rpx 30rpx;
    /* margin-bottom: 20rpx; */
    border-bottom: 1rpx solid #eee;
  }
  .grade-name-title .weui-label {
     width: 160rpx;
    /* border-right: 1rpx solid #ccc; */
    margin: 0 40rpx 0 10rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .grade-input .grade-input-head{
    width: 160rpx;
    /* border-right: 1rpx solid #ccc; */
    margin: 0 60rpx 0 30rpx;
  }
  .grade-input .grade-date{
    color: #808080;
    
  }
  .grade-min-switch-box{
    float: right;
  }

  .grade-min-switch-title{
    margin-right: 10rpx;
    vertical-align: middle;
    color: #666;
  }
  .grade-min-switch-tips{
    vertical-align: middle;
    margin-left: 28rpx;
    font-size: 44rpx;
    /* color: #666; */
  }
  
  .box-input-list{
    border-top: 1rpx solid #eee;
    margin: 20rpx 0;
  }
  .box-item{
    box-sizing: border-box;
    width: 50%;
    height: 200rpx;
    float: left;
    /* border-bottom: 1rpx solid #eee; */
  }
  .box-item:nth-child(odd){
    /* border-right: 1rpx solid #eee; */
  }
  
  .box-item .weui-input{
    width: 30%;
    margin-top: -90rpx;
    margin-left: 45%;
    padding-left: 25rpx;
    border-bottom: 1rpx solid #808080;
    /* border-bottom-width:15px; */
  }
  .grade-total{
    border-bottom:1rpx solid #eee ;
    margin-bottom: 20rpx;
  }
  .grade-total .grade-head{
    padding: 0 30rpx;
  }
  .grade-total .grade-taotal-head{
    color: #333;
  }
  .grade-total .grade-total-content{
    color: #333;
    font-size: 48rpx;
    text-align: center;
  }
  
  .btn{
    width: 90%;
    margin: 20rpx auto 45rpx;
  }
  .btn .weui-btn .weui-btn_primary{
    background: #fdcf47;
  }
  
  .count-down{
  }
  
  
 
</style>
