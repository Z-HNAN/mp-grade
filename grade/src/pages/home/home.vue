<template>
  <div class="body">
    <div class="school-wrap">
      <div class="school-img">
        <div class="img-content">
          <img
            :src="backgroundImg"
            alt=""
          />
        </div>
      </div>
      <div class="school-space">
        <span class="count">{{ countDay }}天</span>
        <span class="school weui-cell_link" @tap="uploadImg">点击更换背景墙</span>
      </div>
    </div>
    
    <!-- 图片裁剪框 -->
    <image-cropper v-if="showCropper" id="image-cropper" :limit_move="true" :disable_ratio="true" 
      :disable_rotate="true" width="340" height="190" :imgSrc="backgroundImgSrc" :export_scale="1"
      @confirmCut="handleConfirmCut"
      @cancelCut="handleCancelCut"
      @load="cropperload" 
      @imageload="loadimage" 
      @tapcut="clickcut">
    </image-cropper>

    <div class="userinfo">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" :src="currentUserInfo.avatarUrl" />
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{ currentUserInfo.nickName }}</h4>
        </div>
      </div>
    </div>

    <div class="setting">
      <div class="setting-item weui-cell">
        <div class="weui-cell__hd"><label class="grade-input-head weui-label">考卷类型</label></div>
        <picker
          mode="multiSelector"
          @change="handleMultiPickerChange"
          @columnchange="handleMultiPickerColumnChange"
          :range="parperTypeList"
          range-key="name"
        >
          <view class="picker weui-cell__bd link_text">{{ showPaperType }}</view>
        </picker>
      </div>

      <div class="setting-item setting-parper weui-cell">
        <div class="weui-cell__hd"><label class="grade-input-head weui-label">绑定学校</label></div>
        <div @tap="handleBindSchool" class="weui-cell__bd"><span>点击绑定</span></div>
      </div>
      
      <div class="setting-item setting-parper weui-cell">
        <div class="weui-cell__hd"><label class="grade-input-head weui-label">查看教程</label></div>
        <div @tap="goGuidePage" class="weui-cell__bd"><span>点击查看</span></div>
      </div>

      <div class="about weui-cell">
        <div @tap="goAbout">
          <span class="iconfont icon-about"></span>
          <span class="tips">关于我们</span>
        </div>
      </div>
      
      <modal id="modal" v-show="isShowModal" title="绑定学校" confirm-text="提交" cancel-text="取消" @cancel="handleCancel" @confirm="handleConfirm">  
        <p>注意:绑定学校功能，需学校教务处申请接通后，方可正常使用，与学生自己管理不造成冲突，并且可由教务处导入成绩。(^_^可在关于我们-联系作者处申请)</p>
        <span>学校邀请码： </span><input class="modal-input" type='text' v-model="inviteCode"/>
        <span>学号： </span><input class="modal-input" type='text' v-model="studentId"/>
      </modal>

      <!-- <Button @click="handleClearUser" class="weui-btn weui-btn_warn exit-btn">删除考试信息</Button> -->
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data () {
    	return {
        showCropper: false,
        backgroundImgSrc: '',
        countDay: '',
        parperTypeList: [[],[]],
        showPaperType: '',
        currentUserInfo: {},
        isShowModal: false,
        inviteCode: '',
        studentId: '',
    	}
    },
    computed: {
      ...mapState(['userinfo']),
      backgroundImg () {
        const defaultImgURL = 'cloud://grade-production-b34221.6772-grade-production-b34221/background-img/default.jpg'
        return this.userinfo.backgroundImg ? this.userinfo.backgroundImg : defaultImgURL 
      }
    },
    methods: {
       ...mapActions(['getNameGradeList', 'getUserinfo', 'getUserGradeList']),
      // 完成选择
      handleMultiPickerChange (e) {
        // 获取试卷gradeId
        let gradeIdIndex = e.target.value[0]
        let gradeId = this.parperTypeList[0][gradeIdIndex].id
        let gradeIdName = this.parperTypeList[0][gradeIdIndex].name
        // 获取考生种类
        let gradeTypeIndex = e.target.value[1]
        let gradeType = this.parperTypeList[1][gradeTypeIndex].value
        let gradeTypeName = this.parperTypeList[1][gradeTypeIndex].name
        // 修改显示信息
        // console.log(gradeId, gradeType)
        wx.showModal({
          title: '注意',
          content: '是否修改为【' + gradeIdName + '  ' + gradeTypeName + '】',
          success: res => {
            wx.showLoading({title: '修改中'})
            if (res.confirm) {
              // 确认信息
              // 发送请求修改
              const db = wx.cloud.database()
              // console.log(this.userinfo._id)
              db.collection('userInfo').doc(this.userinfo._id).update({
                data: {
                  gradeId,
                  gradeType
                }
              }).then(() => {
                return this.getUserinfo()
              }).then(() => {
               return this.getNameGradeList()
              }).then(() => {
                // 加载完毕
                wx.hideLoading()
                wx.showToast({title: '修改完毕'})
              })
              this.showPaperType = gradeIdName + '  ' + gradeTypeName
            }
          }
        })
      },
      // 动态刷新右侧栏目
      handleMultiPickerColumnChange (e) {
        let column = e.target.column
        if (column === 0){
          // 卷种类型
          let gradeId = this.parperTypeList[0][e.target.value].id
          // 动态更新条目
          this.getPaperTypeByGradeId(gradeId, arr => {
            this.parperTypeList = [this.parperTypeList[0], arr]
          })

        }else if (column === 1){
          // 右侧试卷类型
          return
        }
      },
      getUserInfo () {
        wx.getUserInfo({
          success: (res) => {
            this.currentUserInfo = res.userInfo
          }
        })
      },
      goAbout () {
        wx.navigateTo({url:'/pages/about/main'})
      },
      // 绑定学校教务相关
      handleBindSchool () {
        this.isShowModal = !this.isShowModal
      },
      // 处理模态框 取消
      handleCancel () {
        this.isShowModal = false
      },
      // 处理模态框 确认
      handleConfirm () {
        // 保存绑定信息
        wx.cloud.callFunction({
          name:'bindSchool',
          data:{
            inviteCode: this.inviteCode,
            studentId: this.studentId
          },
        }).then(res => {
           let bindStatu = res.result.message
           if (bindStatu === 'success'){
             // 绑定成功
             wx.showToast({title: '绑定成功'})
             this.isShowModal = false
           }else{
             // 绑定失败
             wx.showToast({title: '绑定失败,请检查邀请码是否正确', icon:'none'})
           }
        })
      },
      handleClearUser () {
        wx.showModal({
          title: '警告',
          content: '此操作不可逆，为保证您的隐私，我们将您清除所有数据',
          success (res) {
            if (res.confirm) {
              wx.showToast({title: '已经全部清除！'})
            }
          }
        })
      },
      getPaperTypeByGradeId (id, callback) {
        let ret = []
        const db = wx.cloud.database()
        db.collection('paperType').where({id:id}).get()
          .then(res => {
            let paper = res.data[0]
            if (paper.humanities) {
              ret.push({name:"文科",value:'humanities'})
            }
            if (paper.science) {
              ret.push({name:"理科",value:'science'})
            }
            // 为空的话补一个全部
            if (ret.length === 0) {
              ret.push({name:"全部",value:'normal'})
            }
            callback(ret)
          })
      },
      goGuidePage () {
        wx.navigateTo({url:'/pages/guide/main'}) // 前往演示页
      },
      getCountDay () {
        wx.cloud.callFunction({
          name:'countDown',
          data: {}
        })
        .then(res => this.countDay = res.result)
      },
      // 上传背景墙
      uploadImg () {
        wx.showActionSheet({
          itemList: ['从相册中选择', '拍照'],
          itemColor: "#999",
          success: res => {
            if (res.tapIndex == 0) {
              this.chooseWxImage('album')
            } else if (res.tapIndex == 1) {
              this.chooseWxImage('camera')
            }
          }
        })
      },
      chooseWxImage (type) {
        wx.chooseImage({
          sizeType: ['original', 'compressed'],
          sourceType: [type],
          success: chooseResult => {
            // 切换图像裁切
            this.showCropper = true
            this.backgroundImgSrc = chooseResult.tempFilePaths[0]
          }
        })
      },
      handleConfirmCut (e) { // 确认裁剪, 即最终上传
        // 关闭裁剪框
        this.showCropper = false
        console.log(e)
        // 上传图片至云端
        wx.showToast({icon: 'loading', title: '上传中...'})
        // 删除之前的图片
        wx.cloud.deleteFile({
          fileList: [this.userinfo.backgroundImg]
        }).then(() => {
          wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: 'background-img/' + Math.random().toString(16).substr(2) + '.png',
            // 指定要上传的文件的小程序临时文件路径
            filePath: e.mp.detail.url,
            success: res => {
              wx.hideToast()
              // 设置userinfo.backgroundImg = fileID
              // 本地修改
              this.$store.dispatch('updateBackgroundImg', res.fileID)
              // 云端同步
              const db = wx.cloud.database()
              db.collection('userInfo').doc(this.userinfo._id).update({
                data:{backgroundImg: res.fileID}
              })
            },
            fail: e => wx.showToast({title: '提示',content: '上传失败'}),
            complete:() => wx.hideToast()
          })
        })
      },
      handleCancelCut () { // 取消裁剪
        // 关闭裁剪框
        this.showCropper = false
      }
      
    },
    created () {

    },
    beforeMount () {
      // 检测是否授权
      this.getUserInfo()
      // 获取倒计时
      this.getCountDay()
    },
    mounted () {
      // 获取所在考区
      const db = wx.cloud.database()
      db.collection('paperType').get()
        .then(res => {
          let firstArr = res.data.map(item => {
            return {name: item.typeName, id: item.id}
          })
          this.parperTypeList = [firstArr]
          // 默认获取第一个考区的分科信息
          this.getPaperTypeByGradeId(this.parperTypeList[0][0].id, arr => {
            this.parperTypeList = [this.parperTypeList[0], arr]
            // 显示默认 用户的选择
            if(this.userinfo.gradeId) {
              // 已经是选择过了
              let grade = this.parperTypeList[0].find(item => item.id == this.userinfo.gradeId)
              let paperType = '全部'
              if (this.userinfo.gradeType === 'science'){
                paperType = '理科'
              }else if (this.userinfo.gradeType === 'humanities') {
                paperType = '文科'
              }
              this.showPaperType = grade.name  + '  ' + paperType

            }else{
              // 还未选择
              this.showPaperType = this.parperTypeList[0][0].name + '  ' + this.parperTypeList[1][0].name
            }
          })
        })
      
      // 获取教务信息
      db.collection('studentSchoolMap').where({_openid:this.userinfo._openid}).get()
      .then(res => {
        // 判断是否存取过
        if ( !res.data[0] ){ return }
       let schoolInfo = res.data[0] 
        // 填充数据
        this.inviteCode = schoolInfo.inviteCode
        this.studentId = schoolInfo.studentId
      })
    }
  }
</script>

<style scoped>
.body {
  background: #fbfbfb;
  height: 100vh;
  box-sizing: border-box;
}
.school-wrap {
  width: 100%;
  height: 480rpx;
}
.school-wrap .school-img {
  height: 296rpx;
  background-color: #f8ca00;
  border: 1rpx solid #f8ca00;
}
.school-wrap .school-space {
  height: 180rpx;
  background-color: #fbfbfb;
  padding-top: 110rpx;
  box-sizing: border-box;
}
.school-img .img-content {
  width: 680rpx;
  height: 380rpx;
  margin: 20rpx auto;
}
.school-img .img-content img {
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 10rpx;
  box-shadow: 4rpx 8rpx 8rpx 0 rgba(0, 0, 0, 0.3);
}

.school-space .count {
  color: #666;
  margin-left: 50rpx;
}
.school-space .school {
  float: right;
  margin-top: 15rpx;
  margin-right: 50rpx;
}

.userinfo {
  border-bottom: 1rpx solid #eee;
}
.userinfo .weui-media-box{
  padding: 10rpx 30rpx;
}
.userinfo .weui-media-box__thumb {
  margin-left: 10rpx;
}
.userinfo .weui-media-box__title {
  text-align: left;
  margin-left: 80rpx;
  font-size: 38rpx;
  color: #444;
}

.shadow-wrap {
  margin: 10rpx 26rpx 26rpx;
  padding: 5rpx;
  box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.2);
  border-radius: 16rpx;
}

.setting-item {
  height: 85rpx;
  border-bottom: 1rpx solid #eee;
}
.about {
  height: 50rpx;
  padding-top: 10rpx;
  /* padding-bottom: 10rpx; */
  color: #808080;
  font-size: 32rpx;
  /* border-top: 1rpx solid #eee; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about .tips {
  text-decoration: underline;
}

.link_text,
.setting-item.setting-parper span {
  color: #586c94;
  margin-left: 20rpx;
}

.exit-btn {
  width: 95%;
}
#modal p {
  font-size:30rpx;
  margin-bottom:10rpx;
  text-indent: 1.8em;
}
#modal span{
  color: #666;
}
#modal .modal-input{
  border-bottom: 1rpx solid #eee;
}

/* 解决cut层相关问题 */
.weui-cell:before {
  border-top: none;
}

</style>
