<template>
	<div>
    <!-- 成绩分析走势图-->
    <div class="detail-line-wrap">
      <grade-total-box :data="grades" :totalName="detailData.totalName" :maxTotal="detailData.maxTotal" url="#"></grade-total-box>
    </div>
    
    <!-- 成绩分析项-->
    <div class="detail-list weui-panel">
        <div class="weui-panel__hd">各次成绩报告</div>
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <div class="grade-detail-box-for" v-for="(grade, gradeIndex) in detailData.grades" :key="gradeIndex">
                    
                    <a @click="handleDetailGrade(gradeIndex)" class="weui-cell weui-cell_access">
                        <!-- <div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div> -->
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>{{grade.gradeTotal}}分</p>
                        </div>
                        <span class="weui-cell__ft">点击查看</span>
                    </a>
                    <!-- 成绩分析图-->
                    <div class="detail-box-wrap list-line-box" v-if="currentGradeDetailInedx === gradeIndex">
                      <div class="box-input-list clear-fix" >
                        <div class="box-item" v-for="(item, itemIndex) in gradeItemList" :key="itemIndex">
                          <grade-input-box :totalValue="item.maxGrade" :inputTitle="item.gradeName" :inputValue="grade.gradeObj[item.id]" :index="item.id"></grade-input-box>
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
</template>

<script>
import gradeTotalBox from '@/components/gradeTotalBox.vue'
import gradeInputBox from '@/components/gradeInputBox.vue'

import mockData from '@/data/userData'

export default {
  data() {
  	return {
      detailData: {}, // 总分的data
      gradeItemList: [],  // 总分的卷子分布
      currentGradeDetailInedx: ''  // 当前的显示的索引
  	}
  },
  computed: {
  	grades() {
      if(!this.detailData.grades) {return []}
      return this.detailData.grades.map(item => item.gradeTotal);
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
    }
  },
  components:{
    gradeTotalBox,
    gradeInputBox
  },
  
  beforeMount () {
    // 当进入之前
    let login = parseInt(this.$mp.query.login)
     console.log(login)
    if (login === 0 ){
      // 游客模式进来
      this.detailData = mockData.totalDetailData
      this.gradeItemList = mockData.totalNameDetail.gradeItemList
    }else{
      // 登录切换进来
      this.detailData = this.$store.getters.getTotalDetailGrade()
      this.gradeItemList = this.$store.state.gradeNameList
    }
   
    // this.gradeNewObj = mockData.gradeObj 
  },
  updated () {
    
  }
}
</script>

<style scoped>
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
