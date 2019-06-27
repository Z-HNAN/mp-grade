<template>
  <div>
    <div class="weui-panel">
      <div class="weui-panel__hd">关于我们</div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title"><span class="iconfont icon-group"></span>我们是谁</h4>
          <p class="weui-media-box__desc"> 
            一个大学生团队，将尽自己所能，去给大家更好更优质的体验。
          </p>
        </div>
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title"><span class="iconfont icon-encourage"></span>为什么要做</h4>
          <p class="weui-media-box__desc">
            大家都是一步步走来的，之前就觉得传统的方式有很多的不足之处，所以就希望能用更便捷的方法来帮我们进行记录，借助小程序的平台，力争做到更好的服务。
          </p>
        </div>
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title"><span class="iconfont icon-good"></span>点赞一下</h4>
          <p class="weui-media-box__desc"> 
            大家的使用与肯定，是我们的动力与初衷，发表一下自己的看法吧。
          </p>
        </div>
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title"><span class="iconfont icon-contact"></span>联系作者</h4>
          <p class="weui-media-box__desc">如果您发现了问题，或者有一些更好的点子，欢迎来撩我哦！(如有需要请留下您的联系方式)</p>
          <div class="issue-wrap">
            <textarea
              class="issue-box"
              placeholder="尽情的吐槽吧!"
              auto-height
              v-model="issue"
              @confirm="handleIssue"
            />
          <a class="weui-btn weui-btn_mini weui-btn_primary btn-issue" @tap="handleIssue">提交</a>
          </div>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">2019/04</li>
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">开发团队</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
  	return {
  		issue: ''
  	}
  },
  computed: {
  	...mapState(['userinfo']),
  },
  methods: {
    handleIssue(e) {
      // 上传到数据库中
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('issue').get({_openid:this.userinfo._openid})
      .then(res => {
        let currentUserIssue = res.data[0]
        if (currentUserIssue){
          // 当前issue已经存在追加即可
          db.collection('issue').doc(currentUserIssue._id).update({
            data: {
              issues: _.push([this.issue])
            }
          }).then(() => {
            wx.showToast({title: '已成功反馈！'})
            // 清空issue
            this.issue = ''
          })
        }else{
          // 新创建的issue
          db.collection('issue').add({data:{issues:[this.issue]}})
          .then(() => {
            wx.showToast({title: '成功反馈！'})
            // 清空issue
            this.issue = ''
          })
        }
      })
    }
  }
};
</script>

<style>
.weui-panel{
}
.weui-media-box__desc {
  color: #999999;
  font-size: 26rpx;
  line-height: 1.2;
  text-indent: 2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}
.issue-wrap{
  margin: 50rpx 16rpx 26rpx;
  height: 100rpx;
  padding: 5rpx;
  box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.2);
  border-radius: 16rpx;
  position: relative;
}
.issue-box {
  text-indent: 2em;
  color: #999999;
  font-size: 24rpx;
}
.btn-issue{
  position: absolute;
  top: -70rpx;
  right: 0;
}
</style>
