<template>
  <!-- 倒计时组建-->
  <div class="weui-form-preview">
    <div class="shadow-wrap">
      <div class="weui-form-preview__hd clear-fix">
          <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">距离高考还有： {{countDay}}天</label>
          </div>
      </div>
      <div class="weui-form-preview__bd">
        <p>青春是段跌跌撞撞的旅行，将来的你，一定会感谢现在正在拼搏的你。</p>
        <div class="origin">
          <span class="origin-home">文字来源</span>
          <span class="origin-name">微博</span>
          <span class="origin-brand">人民日报</span>
        </div>
      </div>
    </div>
  </div> 
  
  <!-- <div class="weui-panel">
      <div class="weui-panel__hd">文字列表附来源</div>
      <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text">
              <h4 class="weui-media-box__title">标题一</h4>
              <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
              <ul class="weui-media-box__info">
                  <li class="weui-media-box__info__meta">文字来源</li>
                  <li class="weui-media-box__info__meta">时间</li>
                  <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
              </ul>
          </div>
      </div>
  </div> -->
</template>

<script>
  export default {
    data() {
    	return {
    		countDay: ''
    	}
    },
    beforeMount () {
      /* 挂在前获取倒计时 */
      wx.cloud.callFunction({
        name:'countDown',
        data: {}
      })
      .then(res => this.countDay = res.result)
    }
  }
</script>

<style scoped>
  
.shadow-wrap{
  margin: 26rpx;
  box-shadow: 0 4rpx 8rpx 0 rgba(168,116,86,0.4);
  border-radius: 16rpx;
}
.weui-form-preview__hd{
  color: #333;
  padding-bottom: 0;
}
.weui-form-preview__hd .weui-form-preview__label{
  color: #666;
}
.weui-form-preview__bd{
  text-align: left;
  text-indent: 1.8em;
  margin-bottom: 20rpx;
  color: #666;
}
.weui-form-preview__bd .origin{
  text-indent: 0;
  margin-top: 30rpx;
}
.origin {
  color: #999;
}
.origin .origin-home{
  margin-left: 0.9em;
}
.origin .origin-name{
  padding: 0 26rpx;
  border-right: 2rpx solid #666;
}
.origin .origin-brand{
  margin-left: 18rpx;
}
</style>
