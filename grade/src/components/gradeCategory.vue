<template>
	<div v-show="!isHidden" class="shadow-wrap" :style="'box-shadow:-28rpx 0 0 0 ' + shadowColor +', 0 8rpx 16rpx 0 rgba(168,116,86,0.2);'">
    <div class="weui-panel">
        <div @tap="handleShowCategory" class="weui-cell_access weui-panel__hd">
          <span class="head-title">{{categoryData.packageTitle}}</span> 
          <span class="head-btn" :class="{'default': isDefaultPackage === true}">
            <span class="op-icon iconfont icon-edit" v-if="!isDefaultPackage" @tap="isShowModal = true"></span>
            <span class="op-icon iconfont icon-delete" v-if="!isDefaultPackage" @tap="handleRemovePackage"></span>
            <span class="op-icon iconfont icon-detail"></span>
          </span>
        </div>
        <div class="weui-panel__bd" v-if="isShowCategory">
          <div class="weui-media-box weui-media-box_small-appmsg">
            <!-- 排名处 -->
            <div v-if="!isDefaultPackage" class="weui-cellgrade-item-wrap grade-rank">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="title">总排名: {{categoryData.rank}} </p>
              </div>
            </div>
            
            <div class="weui-cells">
              <div class="box-item-wrap">
                <!-- 成绩标题栏-->
                <div class="weui-cell grade-item-wrap" v-for="(categoryItem, categoryItemIndex) in categoryData.grades" :key="categoryItemIndex">
                  <div class="weui-cell__bd weui-cell_primary grade-item">
                    <p class="title grade-name">{{categoryItem.gradeName}} {{categoryItem.gradeTotal}} {{categoryItem.gradeTitle}}</p>
                     <!-- <span>{{categoryItem.gradeDate}}</span> 暂时考虑作为 悬浮属性 -->
                  </div>
                  <span class="weui-cell__ft iconfont icon-move" @tap="handleMoveItem(categoryItem, $event)" ></span>
                  <span class="weui-cell__ft iconfont icon-delete" @tap="handleDeleteItem(categoryItem, categoryItemIndex, $event)"></span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
    </div>
    
    <modal id="modal" v-show="isShowModal" title="更改试卷分类信息" confirm-text="提交" cancel-text="取消" @cancel="handleCancel" @confirm="handleConfirm">  
      分类名称： <input class="modal-input" type='text' v-model="packageTitle"/>
      排名： <input class="modal-input" type='number' v-model="packageRank" />
    </modal>
    
    
  </div>
</template>

<script>
  export default {
    props:['categoryData', 'shadowColor', 'showDetail', 'showIndex'],
    data () {
      return {
        isShowCategory: false,
        isShowModal: false,
        isHidden: false,
        isDefaultPackage: this.showIndex == -1,
        packageTitle: this.categoryData.packageTitle,
        packageRank: this.categoryData.rank,
      }
    },
    computed: {
    },
    methods:{
      // 控制当前目录是否展示
      handleShowCategory () {
        // 开关目录
        this.isShowCategory = !this.isShowCategory
      },
      // 处理移动元素
      handleMoveItem (categoryItem, e) {
        this.$emit('readyMove', e.y, this.showIndex, categoryItem)
      },
      handleDeleteItem (categoryItem, categoryItemIndex, e){
        // console.log(categoryItem)
        // console.log(this.categoryData)
        let that = this
        wx.showModal({
          title: '删除试卷',
          content: '是否删除?' + categoryItem.gradeName,
          success(res) {
            if (res.confirm) {
               wx.showToast({icon: 'loading',title: "删除中......",duration: 5000})
              wx.cloud.callFunction({
                name:'removeGrade',
                data: {
                  packageId: that.categoryData._id,   // 如果是默认包 此处为underfind
                  gradeId: categoryItem._id, 
                }
              }).then(() => {
                // 隐藏该成绩
                wx.showToast({icon: 'success',title: "已删除",duration: 800})
                that.categoryData.grades.splice(categoryItemIndex, 1)
                that.categoryData = JSON.parse(JSON.stringify(that.categoryData))
                that.$emit('readyFreshByRemove', that.categoryData._id)
              })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      },
      // 删除package
      handleRemovePackage () {
        let that = this
        wx.showModal({
          title: '删除试卷包',
          content: '是否删除?' + that.packageTitle,
          success(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              that.isHidden = true
              wx.cloud.callFunction({
                name:'removePaperPackage',
                data: {
                  paperId: that.categoryData._id
                }
              }).then(() => that.$emit('updateFresh'))  // 触发外部更新
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      },
      // 处理模态框 取消
      handleCancel () {
        this.isShowModal = false
      },
      // 处理模态框 确认
      handleConfirm () {
        this.isShowModal = false
        // 同步数据
        const db = wx.cloud.database()
        db.collection('paperPackage').doc(this.categoryData._id).update({
          data: {
            title: this.packageTitle,
            rank: this.packageRank
          }
        })
        this.$emit('updateFresh')
      }
    },
    beforeMount () {
    }
  }
</script>

<style scoped>
.shadow-wrap{
  margin: 26rpx;
  border-radius: 16rpx;
}
.weui-panel{
  width: 100%;
}
.weui-panel__hd{
  position: relative;
  font-size: 44rpx;
}
.weui-panel__hd .head-title{
  display: inline-block;
  box-sizing: border-box;
  width: 62%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.weui-panel__hd .head-btn{
  box-sizing: border-box;
  width: 37%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
}
.weui-panel__hd .head-btn.default{
  justify-content: flex-end;
}

.weui-panel__hd .op-icon{
  /* margin: 0 20rpx; */
}
.weui-panel__hd .icon-detail{
   padding-right: 13px;
   position: relative;
}
.weui-panel__hd .icon-detail:after{
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 2px;
}


.grade-item-wrap{
  height:50rpx;
  width: 100%;
}
.box-item-wrap .weui-cell__ft{
  margin-right: 50rpx;
}
.grade-item-wrap .grade-item{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.box-item-wrap .weui-cell_primary span{
  margin-right: 20rpx;
}
.box-input-list a{
  float: right;
  margin: 60rpx 20rpx 10rpx 0;
}

.detail-box-wrap{
  margin: 10rpx 26rpx 26rpx;
  padding: 5rpx;
  box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.2);
  border-radius: 16rpx;
}

.weui-panel__hd .weui-cell__ft{
  float: right;
  margin-right: 30rpx;
}

.grade-rank .title{
  margin-left: 30rpx;
  font-size: 34rpx;
  color: #666;
}

#modal .modal-input{
  border-bottom: 1rpx solid #eee;
}
</style>
