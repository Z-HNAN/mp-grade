<template>
	<div>
    
   <div class="box-wrap" v-for="(gradeNameItem, gradeNameItemIndex) in gradeNameList" :key="gradeNameItemIndex">
     <update-grade-box :detailData="currentGradeDetail(gradeNameItem.id, $event)" :gradeItemList="gradeNameItem.gradeItemList" :shadowColor="colorList[gradeNameItemIndex]"></update-grade-box>
   </div>
    
  </div>
</template>

<script>
  import updateGradeBox from '@/components/updateGradeBox.vue'
  
  import {mapState} from 'vuex'
  
  export default {
    data() {
    	return {
        colorList: ['#e36868', '#f5be33', '#94b38f', '#bfad86', '#a3bac2'],
    	}
    },
    computed: {
      ...mapState(['gradeNameList']),
    },
    methods: {
      currentGradeDetail (gradeId, e) {
        let grades = this.$store.getters.getUserGradeByGradeId(gradeId) 
        const {gradeName} = this.$store.getters.getGradeInfoByGradeId(gradeId)
        return {
          gradeId: gradeId,
          gradeName: gradeName,
          grades: grades
        }
      }
    },
    components:{ 
      updateGradeBox,
    },
    beforeMount () {
      // 当进入之前
      // 模拟获取数据
//       this.detailData = mockData.detailData,
//       this.gradeItemList = mockData.gradeNameDetail.gradeItemList
    },
  }
</script>

<style>
.box-wrap{
  margin-left: 34rpx;
  width: 95%;
}

</style>
