<template>
  <div>
    <div class="weui-panel">
      <div class="weui-panel__hd"><h2>操作教程</h2></div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">如何添加成绩</h4>
          <p class="weui-media-box__desc"> 
            1.点击`+`按钮，
          </p>
          <p class="weui-media-box__desc"> 
            2.根据自己需求，选择简洁/完全模式的成绩输入，
          </p>
          <p class="weui-media-box__desc"> 
            3.点击`确认添加`。 一份试卷就到了你的包中了。
          </p>
        </div>
        
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">如何完善总排名</h4>
          <p class="weui-media-box__desc"> 
            1.添加好试卷后，在`试卷包`菜单中会自动生成一次考试记录，
          </p>
          <p class="weui-media-box__desc"> 
            2.点击`<span class="iconfont icon-edit"></span>`修改按钮，就可加入此次考试的排名进去。
          </p>
          <p class="weui-media-box__desc"> 
            注意:`未分类`试卷包是不可以修改的，仅仅作为暂时存放试卷的位置。
          </p>
        </div>
        
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">如何删除试卷</h4>
          <p class="weui-media-box__desc"> 
            1.进入到`试卷包`菜单中，找到试卷旁边的`<span class="iconfont icon-delete"></span>`点击即可。
          </p>
        </div>
        
        <div class="weui-media-box weui-media-box_text">
          <h4 class="weui-media-box__title">如何删除试卷包</h4>
          <p class="weui-media-box__desc"> 
            1.进入到`试卷包`菜单中，找到试卷包旁边的`<span class="iconfont icon-delete"></span>`点击即可。
          </p>
          <p class="weui-media-box__desc">
            注意: 如果试卷包中还有考试卷,他们会自动归类到`未分类`考卷包中，点击`<span class="iconfont icon-move"></span>`按钮，可更改其顺序。
          </p>
        </div>
        
        <div class="weui-media-box weui-media-box_text">
          <p class="weui-media-box__desc">
            <a @tap="handleViewGuide" class="weui-btn weui-btn_plain-primary">查看图文介绍</a>
            <a @tap="handleViewPreview" class="weui-btn weui-btn_primary">查看实例数据</a>
          </p> 
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    handleViewGuide () {
       wx.cloud.database().collection('guide').where({type: 'new'}).orderBy('url', 'asc').get().then(res => {
        // 查看新手教程
        wx.previewImage({
          urls: res.data.map(item => item.url) // 需要预览的图片http链接列表
        })
      })
    },
    handleViewPreview () {
      wx.navigateTo({url: '/pages/preview/tourist/main?tourist=0'})
    }
  }
}

</script>

<style>
.weui-panel{
}
.weui-panel__hd{
  font-size:38rpx;
  color:#303133;
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
</style>
