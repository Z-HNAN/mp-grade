<template>
	<div class="shadow-wrap" :style="'box-shadow:-28rpx 0 0 0 ' + shadowColor +', 0 8rpx 16rpx 0 rgba(168,116,86,0.2);'">
    <div class="weui-panel">
        <div class="weui-panel__hd">{{detailData.gradeName}}</div>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
              <div class="box-item-wrap" v-for="(grade, gradeIndex) in detailData.grades" :key="gradeIndex">
                  <!-- 成绩标题栏-->
                  <div class="weui-cell weui-cell_access grade-item-wrap"  @click="handleDetailGrade(gradeIndex)">
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>{{grade.gradeDate}}  {{grade.gradeTitle}}  {{grade.gradeTotal}}</p>
                    </div>
                    <span class="weui-cell__ft">查看</span>
                  </div>
                  <!-- 成绩分析图-->
                  <div class="detail-box-wrap" v-show="currentGradeDetailInedx === gradeIndex">
                    <div class="box-input-list clear-fix">
                      <div class="box-item-list" >
                        <span class="box-item" v-for="(item, itemIndex) in gradeItemList" :key="itemIndex" >{{item.topicName}}:<b>{{grade.gradeObj[item.id]}}分</b></span>
                      </div>
                      <a class="weui-btn weui-btn_mini weui-btn_primary">修改</a>
                      <a class="weui-btn weui-btn_mini weui-btn_warn">删除</a>
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
  export default {
    props:['detailData', 'gradeItemList','shadowColor'],
    data () {
      return {
        currentGradeDetailInedx: ''
      }
    },
    computed: {
    },
    methods:{
      handleDetailGrade (currentDetailIndex, e) {
        // 查看是否当前是关闭状态
        if (this.currentGradeDetailInedx === currentDetailIndex) {
          return this.currentGradeDetailInedx = ''
        }
        // 替换当前点击的位置
        this.currentGradeDetailInedx = currentDetailIndex
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
  font-size: 44rpx;
}
.box-item-wrap .weui-cell__ft{
  margin-right: 50rpx;
}
.grade-item-wrap{
  width: 100%;
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
.box-input-list{

}
.box-item-list{
}
.box-item{
  display: block;
  float: left;
  width: 50%;
  box-sizing: border-box;
  padding: 0 16rpx;
  border-bottom: 1rpx solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.box-item b{
  float: right;
  margin-right: 40rpx;
}
</style>
