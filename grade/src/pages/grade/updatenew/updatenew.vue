<template>
	<div id="content">
    
  <!-- 正在加载 -->
  <div class="weui-loadmore" v-show="!isLoaded">
      <i class="weui-loading"></i>
      <p class="weui-loadmore__tips">{{renderTips}}</p>
  </div>
  
  <div class="show-wrap" v-if="isLoaded">
    <movable-area class='movable-area' 
                  :style="'display:' + movableViewInfo.showClass + '; height: ' + pageInfo.moveAbleHeight + 'px; '">
      <movable-view class='list-row movable-row'
                    out-of-bounds='true'
                    :style="'height:' + pageInfo.rowHeight + 'rpx;'"
                    direction="vertical"
                    damping="999"
                    :y="movableViewInfo.y">
        <div class="weui-cell weui-cell_access move-item-wrap" 
          @touchstart='handleDragStart' 
          @touchmove='handleDragMove'
          @touchend='handleDragEnd'
        >
          <div class="weui-cell__bd weui-cell_primary">
            <span>{{movableViewInfo.gradeName}}</span>
            <span>{{movableViewInfo.gradeTotal}}</span>
          </div>
          <span class="weui-cell__ft iconfont icon-move"></span>
          <span class="weui-cell__ft iconfont icon-delete"></span>
        </div>
      </movable-view>
    </movable-area>
    
    
    <div class="grade-category-wrap" v-if="isRender">
      <div class="box-wrap" :class="{'category-active': currentCategoryIndex === categoryDataIndex}" v-for="(categoryData, categoryDataIndex) in categoryDataList" :key="categoryDataIndex">
        <grade-category :categoryData="categoryData" :shadowColor="getColorRandom(categoryDataIndex)" :showIndex="categoryDataIndex" :showDetail="currentCategoryIndex === categoryDataIndex" @readyMove="handleRandyMoveItem" @readyFreshByRemove="handleRemoveFresh" @updateFresh="handleUpdateFresh"></grade-category>
      </div>
     
      <div class="box-wrap" :class="{'category-active': currentCategoryIndex === -1}">
        <grade-category :categoryData="defaultData" shadowColor="#d4237a" showIndex="-1" @readyMove="handleRandyMoveItem" @readyFreshByRemove="handleRemoveFresh"></grade-category>
      </div>
    </div>
  </div>
  
  <transition name="go-new">
    <div @tap="handRefresh" class="btn-icon refresh" :class="{'circleing': isLoaded === false}">
      <img src="/static/images/refresh.png" alt="">
    </div>
  </transition>
  
  <!-- <transition name="go-new">
    <div @tap="addCategory" class="btn-icon grade-add">
      <img src="/static/images/add.png" alt="">
    </div>
  </transition> -->
    
  </div>
</template>

<script>
  import gradeCategory from '@/components/gradeCategory.vue'
  
  import {mapState, mapActions} from 'vuex'
  
//   let categoryDataList = [
//     {name: '第一次月考',  grades:
//       [ 
//         {gradeName: '数学（理）', gradeTotal: 123, gradeDate: '2019-04-13'},
//         {gradeName: '语文', gradeTotal: 101, gradeDate: '2019-04-13'},
//       ],
//     },
//     {name: '第二次月考', grades:
//       [ 
//         {gradeName: '数学（理）',gradeTotal: 104, gradeDate: '2019-03-13'},
//         {gradeName: '语文', gradeTotal: 94, gradeDate: '2019-03-13'},
//       ],
//     },
//   ]
  
//   let defaultData = {
//     name: '未分类试卷',
//     grades:
//       [ 
//         {gradeName: '英语',gradeTotal: 88, gradeDate: '2019-04-13'},
//         {gradeName: '理综', gradeTotal: 247, gradeDate: '2019-03-13'},
//       ],
//   }
  
  export default {
    data() {
    	return {
        isLoaded: true,
        isRender: true,
        colorList: ['#e36868', '#94b38f', '#bfad86', '#a3bac2'],
        activeColor: '#f5be33',
        currentCategoryIndex: '',
        /* 移动相关*/
        movableViewInfo: {
          _id: '',
          y: 0,
          showClass: 'none',
          srcCategoryIndex: '',
          gradeTotal: '',
          gradeName: ''
        },
        /* 同步内部页面的*/
        pageInfo: {
          rowHeight: 50,
          moveAbleHeight: 100
        },
        /* 页面上category的位置信息*/
        categoryPositionList: [],
        
        /* 试卷数据 */
        categoryDataList: [],
        defaultData: {}

    	}
    },
    computed: {
      ...mapState(['gradeNameList', 'userinfo']),
      renderTips () {
        return this.$store.getters.getRandomTip()
      }
    },
    methods: {
      ...mapActions([ 'getUserinfo', 'getTipsList', 'getPaperPackage', 'getUserGradeList']),
      getColorRandom (itemIndex) {
        return this.colorList[itemIndex % this.colorList.length]
      },
      // 刷新
      handRefresh () {
        console.log(this.$store.state.paperPackage)
        console.log(this.$store.getters.getPaperPackage())
        // 重新获取考试卷包信息
        let timeId
        this.isLoaded = false
        this.categoryDataList = this.$store.getters.getPaperPackage()
        this.defaultData = this.$store.getters.getDefaultPaper()
        timeId = setTimeout(() => {
          this.isLoaded = true
          clearTimeout(timeId)
        }, 150)
        
        // 重新获取考试卷包信息
        // this.handleUpdateFresh().then(() => this.isLoaded = true)
        
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      handleUpdateFresh () {
        return new Promise(resolve => {
          // 重新获取试卷包信息
          this.getPaperPackage()
          // 重新获取用户信息(主要便于后续使用)
          .then(() => this.getUserinfo())
          .then(() => {
            this.handRefresh()
            resolve()
          })
        })
      },
      // 处理删除的更新
      handleRemoveFresh (packageId) {
        // 已经处理过视图的更新，这里只需要数据更新即可
        // this.isLoaded = false
        new Promise(resolve => {
          if(packageId){
            // 删除试卷包中的考卷信息  更新 试卷包
            this.getPaperPackage().then(() => {this.categoryDataList = this.$store.getters.getPaperPackage();resolve()})
            // this.categoryDataList = JSON.parse(JSON.stringify(this.categoryDataList))
            // this.$set(this, 'categoryDataList', JSON.parse(JSON.stringify(this.categoryDataList)))
          }else{
            // 删除用户信息的默认信息 更新 默认包
            this.getUserinfo().then(() => {this.defaultData = this.$store.getters.getDefaultPaper();resolve()})
            // this.defaultData.grades = JSON.parse(JSON.stringify(this.defaultData.grades))
            // this.$set(this.defaultData, 'grades', JSON.parse(JSON.stringify(this.defaultData.grades)))
          }
        }).then(() => {this.getUserGradeList()})
        
      },
      // 创建一个新的分类目录 
      addCategory () {
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('paperPackage').add({
          data:{
            title: '新创建的试卷包',
            papers: [],
            rank: 0,
            createdDate: this.getNowFormatDate()
          },
          success: res => {
            this.isLoaded = false
            // 创建成绩成功转入首页
            // 添加到默认试卷包中
            this.addPaperPakageToUser(res._id)
            .then(res => {
              return this.getUserinfo()
            }).then(res => {
              // 重新获取数据  重新渲染
              this.handleUpdateFresh()
              .then(() => {
                this.isLoaded = true, 
                wx.showToast({title: '已成功创建！'})
              })
            })
          }
        })
      },
      // 添加到用户包中
      addPaperPakageToUser (packageId) {
        const db = wx.cloud.database()
        const _ = db.command
        return new Promise ((resolve, reject) => {
          db.collection('userInfo').doc(this.userinfo._id).update({
            data: {
              paperPackage: _.push([packageId])
            },
            complete: res => {
              resolve ()
            }
          })
        }) 
      },
      openModal () {
        this.isShowModal = !this.isShowModal
      },
      handleRandyMoveItem (y, srcCategoryIndex, data) {
    
        // 准备移动 1.显示移动效果， 填充移动内容
        this.movableViewInfo.y = y - this.pageInfo.rowHeight 
        this.movableViewInfo._id = data._id
        this.movableViewInfo.gradeTotal = data.gradeTotal
        this.movableViewInfo.gradeName = data.gradeName
        this.movableViewInfo.showClass = 'inline'
        this.movableViewInfo.srcCategoryIndex = srcCategoryIndex
      },
      handleDragStart (e) {
        let query = wx.createSelectorQuery();
        query.selectAll('.box-wrap').boundingClientRect(rect => {
          this.categoryPositionList = rect.map(item => {return {top:item.top, bottom:item.bottom}})
        }).exec();
      },
      handleDragMove (e) {
        // 判断出现在哪个区域中
        let y = e.clientY
        let index = this.categoryPositionList.findIndex(item => (y >= item.top && y <=item.bottom))
        // 获取到了此时在哪个index的category中
        if (index === -1) return
        if(index < this.categoryDataList.length) {
          // 选中当前的元素
          this.currentCategoryIndex = index
        }else{
          // 默认筐元素
          this.currentCategoryIndex = -1
        }
//         console.log('============touchmove===============')
//         console.log(e.clientY)
      },
      handleDragEnd (e) {
        
        // console.log('============handleDragEnd===============')
        // console.log(e)
        
        /* 视图改变 */
        // 原package中grades的索引位置
        let srcCategoryItemIndex
        let srcGrades
        if (this.movableViewInfo.srcCategoryIndex == -1){
          // 从默认包出去
          // console.log('从默认包出去')
          srcCategoryItemIndex = this.defaultData.grades.findIndex(item => item._id === this.movableViewInfo._id)
          // console.log(srcCategoryItemIndex)
          srcGrades = this.defaultData.grades.splice(srcCategoryItemIndex, 1)
        }else{
          // 从普通包出去
          // console.log('从普通包出去')
          srcCategoryItemIndex = this.categoryDataList[this.movableViewInfo.srcCategoryIndex].grades.findIndex(item => item._id === this.movableViewInfo._id)
          srcGrades = this.categoryDataList[this.movableViewInfo.srcCategoryIndex].grades.splice(srcCategoryItemIndex, 1)
        }

        if (this.currentCategoryIndex === -1) {
          // 去默认包的
          // console.log('去默认包的')
          this.defaultData.grades.push(srcGrades[0])
        }else{
          // 包间互传
          // console.log('包间互传')
          this.categoryDataList[this.currentCategoryIndex].grades.push(srcGrades[0])
        }
        
        // 设置使vue监听 (数组适用)
        this.$set(this, 'categoryDataList', JSON.parse(JSON.stringify(this.categoryDataList)))
        this.$set(this.defaultData, 'grades', JSON.parse(JSON.stringify(this.defaultData.grades)))
        // 调用刷新
        this.handRefresh()
        // this.$set(this, 'categoryDataList', )
        
        /* 视图改变结束*/
        
        /* 云端改变*/
        new Promise((resolve, reject) => {
          if (this.movableViewInfo.srcCategoryIndex == -1){
            // 默认包发出
            wx.cloud.callFunction({
              name:'movePaperToPackage',
              data: {
                srcPackage: -1, 
                destPackage: this.categoryDataList[this.currentCategoryIndex]._id, 
                paperId: this.movableViewInfo._id
              }
            }).then(resolve)
          }else if (this.currentCategoryIndex == -1) {
            // 去默认包的
            wx.cloud.callFunction({
              name:'movePaperToPackage',
              data: {
                srcPackage: this.categoryDataList[this.movableViewInfo.srcCategoryIndex]._id, 
                destPackage: -1, 
                paperId: this.movableViewInfo._id
              },
            }).then(resolve)
          }else{
            // 包间互切
            wx.cloud.callFunction({
              name:'movePaperToPackage',
              data: {
                srcPackage: this.categoryDataList[this.movableViewInfo.srcCategoryIndex]._id, 
                destPackage: this.categoryDataList[this.currentCategoryIndex]._id, 
                paperId: this.movableViewInfo._id
              }
            }).then(resolve)
          }
        }).then(() => {
          // 数据的同步
          this.getUserinfo().then(() => this.defaultData = this.$store.getters.getDefaultPaper())
          this.getPaperPackage().then(() => this.categoryDataList = this.$store.getters.getPaperPackage())
        })
        /* 云端改变结束 */
        // 还原数据
        this.currentCategoryIndex = ''
        this.movableViewInfo = {
          _id: '',
          y: 0,
          showClass: 'none',
          srcCategoryIndex: '',
          gradeTotal: '',
          gradeName: ''
        }
      }
    },
    components:{ 
      gradeCategory,
    },
    beforeMount () {
      // 当进入之前
      this.categoryDataList = this.$store.getters.getPaperPackage()
      this.defaultData = this.$store.getters.getDefaultPaper()
    },
    mounted () {
      // 计算元素占高，设置可移动区域
      let query = wx.createSelectorQuery()
      query.select('#content').boundingClientRect(rect => {
        this.pageInfo.moveAbleHeight = rect.height 
      }).exec()
    },
    updated () {
      // 计算元素占高，设置可移动区域
      let query = wx.createSelectorQuery()
      query.select('#content').boundingClientRect(rect => {
        if (!rect) return
        this.pageInfo.moveAbleHeight = rect.height 
      }).exec()
    }
  }
</script>

<style>
.box-wrap{
  margin-left: 34rpx;
  width: 95%;
}

/* 移动框相关设置 */
.movable-area{
  position: absolute;
  width: 100%;
  /* height: 100%; */
  /* border: 1rpx solid blue; */
}
.list-row .move-item-wrap{
  background: rgba(245,190,51,.7);
  margin: 0 auto;
  border-radius: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-arrond;
  
  width: 80%;
  /* box-shadow: -1rpx 2rpx 10px 3rpx rgba(245,190,51,.5); */
}


.movable-row{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.move-item-wrap{
  height: 60rpx;
  padding: 10rpx;
}

.category-active{
  box-shadow: -3rpx 5rpx 10px 5rpx rgba(245,190,51,.5);
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
  /* bottom: 145rpx; */
  bottom: 20rpx;
  right: 56rpx;
}
.icon-move{
  font-size: 50rpx;
}

/* 转圈的动画 */
.circleing{
  animation: btnRotate 0.5s linear infinite;
}
@keyframes btnRotate{
  from{transform: rotateZ(0);}
  to{transform: rotateZ(360deg);}
}
</style>
