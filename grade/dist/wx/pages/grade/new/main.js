require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([4],{"2fnQ":function(a,e){},"75NE":function(a,e,t){"use strict";var i=t("rlzQ"),s=t("fzrF");var r=function(a){t("ka+G")},d=t("ybqe")(i.a,s.a,r,"data-v-603828a9",null);e.a=d.exports},JVGg:function(a,e,t){"use strict";var i=t("OtPb"),s=t("nvwG");var r=function(a){t("2fnQ")},d=t("ybqe")(i.a,s.a,r,"data-v-dc3a6f26",null);e.a=d.exports},NxIZ:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("5nAL"),s=t.n(i),r=t("JVGg");new s.a(r.a).$mount()},OtPb:function(a,e,t){"use strict";var i=t("Dd8w"),s=t.n(i),r=t("wpP+"),d=t("75NE"),n=t("NYxO");e.a={data:function(){return{currentNavBar:0,dragInfo:{},gradeNewObj:{},gradeTitle:"",isAdding:!1,isGradeMin:!0,gradeRank:"",gradeTotal:"",gradeDate:"",gradeNameId:"",gradeItemList:[]}},watch:{gradeTotal:function(a,e){a<=this.gradeNameArr[this.currentNavBar].maxGrade||(this.gradeTotal=this.gradeNameArr[this.currentNavBar].maxGrade,wx.showToast({title:"棒！已经满分了",icon:"success"}))},gradeNameId:function(a,e){var t=this.userGradeList.filter(function(e){return e.gradeId==a}).length+1;this.currentGradeIndex=t,this.gradeTitle="第"+t+"次测验"}},methods:s()({},Object(n.b)(["getUserGradeList","updatePapaerPackage","getUserinfo"]),{handleFullGrade:function(a,e){wx.showToast({title:"棒！已经满分了",icon:"success"}),this.gradeNewObj[a]=e},handleGradeMin:function(a){this.isGradeMin=a.mp.detail.value},handleDateChange:function(a){this.gradeDate=a.mp.detail.value},handleAddGrade:function(){var a={gradeId:this.gradeNameId,gradeName:this.gradeName,gradeTitle:this.gradeTitle,gradeRank:this.gradeRank,gradeDate:this.gradeDate};if(!0===this.isGradeMin)a.gradeTotal=this.gradeTotal,a.gradeObj={};else{a.gradeTotal=this.gradeTotalComputed;var e={};for(var t in this.gradeNewObj)parseInt(t)>0&&(e[t]=this.gradeNewObj[t]);a.gradeObj=e}this.addGrade(a)},addGrade:function(a){var e=this,t=this.userGradeList.filter(function(e){return e.gradeId==a.gradeId}).length;this.isAdding=!0,this.initGrade(),wx.cloud.database().collection("userGrade").add({data:a,success:function(a){wx.showToast({title:"已成功创建！"}),wx.cloud.callFunction({name:"addPaperIdToPackage",data:{paperId:a._id,packageIndex:t}}).then(function(a){console.log(a),e.getUserGradeList(),e.getUserinfo(),e.isAdding=!1,console.log("======updatePapaerPackage======="),console.log(a.result.paperPackage),e.updatePapaerPackage(a.result.paperPackage)})}})},addDefaultPacakge:function(a){var e=wx.cloud.database(),t=e.command;e.collection("userInfo").doc(this.userinfo._id).update({data:{defaultPackage:t.push([a])},complete:function(a){console.log(a)}})},initGrade:function(){var a=this,e=this.userGradeList.filter(function(e){return e.gradeId==a.gradeNameId}).length+2;this.gradeTitle="第"+e+"次测验",this.gradeRank="",this.gradeDate="",this.gradeTotal="",this.gradeNewObj={}},navBarTo:function(a){this.currentNavBar=a,this.gradeNameId=this.gradeNameArr[a].id,this.gradeItemList=this.$store.getters.getGradeInfoByGradeId(this.gradeNameId).gradeItemList,this.isGradeMin=!0},handleDragStart:function(a){this.dragInfo.startX=a.clientX,this.dragInfo.startY=a.clientY},handleDragEnd:function(a){this.dragInfo.endX=a.mp.changedTouches[0].clientX,this.dragInfo.endY=a.mp.changedTouches[0].clientY;var e=this.gradeNameArr.length,t=this.currentNavBar;this.dragInfo.endX-this.dragInfo.startX>50&&Math.abs(this.dragInfo.endY-this.dragInfo.startY)<50?t=t<=0?0:t-1:this.dragInfo.endX-this.dragInfo.startX<-50&&Math.abs(this.dragInfo.endY-this.dragInfo.startY)<50&&(t=t>=e?e:t+1),t!==this.currentNavBar&&this.navBarTo(t)}}),computed:s()({},Object(n.c)(["gradeNameList","userinfo","userGradeList"]),{gradeName:function(){return this.gradeNameArr[this.currentNavBar].name},isFinished:function(){return!!/\S/.test(this.gradeRank)&&(!!/\S/.test(this.gradeDate)&&!(!0===this.isGradeMin&&!/\S/.test(this.gradeTotal)))},gradeTotalComputed:function(){var a=0;for(var e in this.gradeNewObj)parseInt(e)>=0&&(a+=parseFloat(this.gradeNewObj[e]||0));return a},gradeNameArr:function(){return this.gradeNameList.map(function(a){return{id:a.id,name:a.gradeName,maxGrade:a.maxGrade}})}}),components:{gradeInputBox:r.a,countDown:d.a},created:function(){},beforeMount:function(){var a=this;this.gradeNameId=this.gradeNameArr[0].id,this.gradeItemList=this.gradeNameList.find(function(e){return e.id===a.gradeNameId}).gradeItemList},mounted:function(){}}},fzrF:function(a,e,t){"use strict";var i={render:function(){var a=this.$createElement,e=this._self._c||a;return e("div",{staticClass:"weui-form-preview"},[e("div",{staticClass:"shadow-wrap"},[e("div",{staticClass:"weui-form-preview__hd clear-fix"},[e("div",{staticClass:"weui-form-preview__item"},[e("label",{staticClass:"weui-form-preview__label"},[this._v("距离高考还有： "+this._s(this.countDay)+"天")])],1)]),this._v(" "),e("div",{staticClass:"weui-form-preview__bd"},[e("p",[this._v("青春是段跌跌撞撞的旅行，将来的你，一定会感谢现在正在拼搏的你。")]),this._v(" "),this._m(0)],1)])])},staticRenderFns:[function(){var a=this.$createElement,e=this._self._c||a;return e("div",{staticClass:"origin"},[e("span",{staticClass:"origin-home"},[this._v("文字来源")]),this._v(" "),e("span",{staticClass:"origin-name"},[this._v("微博")]),this._v(" "),e("span",{staticClass:"origin-brand"},[this._v("人民日报")])])}]};e.a=i},"ka+G":function(a,e){},nvwG:function(a,e,t){"use strict";var i={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"body",attrs:{eventid:"8"},on:{touchstart:a.handleDragStart,touchend:a.handleDragEnd}},[t("div",{staticClass:"navbar-wrap"},[t("div",{staticClass:"weui-tab"},[t("div",{staticClass:"weui-navbar"},a._l(a.gradeNameArr,function(e,i){return t("div",{key:i,staticClass:"weui-navbar__item",class:{"weui-bar__item_on":a.currentNavBar===i},attrs:{eventid:"0_"+i},on:{tap:function(e){a.navBarTo(i)}}},[a._v("\n              "+a._s(e.name)+"\n          ")])}))])]),a._v(" "),t("div",{staticClass:"count-down clear-fix"},[t("div",{staticClass:"weui-panel"},[t("div",{staticClass:"weui-panel__bd"},[t("div",{staticClass:"weui-media-box weui-media-box_text"},[t("h6",[a._v(a._s(a.gradeTitle))])],1)])])]),a._v(" "),t("div",{staticClass:"grade-new-body shadow-wrap"},[t("div",{staticClass:"grade-min-switch"},[t("div",{staticClass:"weui-cells weui-cells_form"},[t("div",{staticClass:"weui-cell weui-cell_switch"},[t("div",{staticClass:"weui-cell__bd"},[t("span",{staticClass:"grade-min-switch-tips"},[a._v(a._s(a.gradeName))]),a._v(" "),t("div",{staticClass:"grade-min-switch-box"},[t("span",{staticClass:"grade-min-switch-title"},[a._v(a._s(a.isGradeMin?"极简":"完全")+"模式")]),a._v(" "),t("switch",{attrs:{checked:a.isGradeMin,eventid:"1"},on:{change:a.handleGradeMin}})])])])])]),a._v(" "),!1===a.isGradeMin?t("div",{staticClass:"grade-min-wrap"},[t("div",{staticClass:"box-input-list clear-fix"},a._l(a.gradeItemList,function(e,i){return t("div",{key:e.id,staticClass:"box-item"},[t("grade-input-box",{attrs:{totalValue:e.maxGrade,inputTitle:e.topicName,inputValue:a.gradeNewObj[e.id],index:e.id,eventid:"2_"+i,mpcomid:"0_"+i},on:{fullGrade:a.handleFullGrade}}),a._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:a.gradeNewObj[e.id],expression:"gradeNewObj[item.id]"}],staticClass:"weui-input",attrs:{type:"digit",placeholder:"成绩",eventid:"3_"+i},domProps:{value:a.gradeNewObj[e.id]},on:{input:function(t){t.target.composing||a.$set(a.gradeNewObj,e.id,t.target.value)}}})],1)}))]):a._e(),a._v(" "),t("div",{staticClass:"grade-input grade-rank weui-cell"},[t("div",{staticClass:"weui-cell__hd"},[t("label",{staticClass:"grade-input-head weui-label"},[a._v("排名")])],1),a._v(" "),t("div",{staticClass:"weui-cell__bd"},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.gradeRank,expression:"gradeRank"}],staticClass:"weui-input",attrs:{type:"number",placeholder:"请输入此次排名",eventid:"4"},domProps:{value:a.gradeRank},on:{input:function(e){e.target.composing||(a.gradeRank=e.target.value)}}})])]),a._v(" "),t("div",{staticClass:"grade-input weui-cell"},[t("div",{staticClass:"weui-cell__hd"},[t("label",{staticClass:"grade-input-head weui-label"},[a._v("日期")])],1),a._v(" "),t("div",{staticClass:"weui-cell__bd"},[t("picker",{attrs:{mode:"date",end:"2217-09-01",eventid:"5"},on:{change:a.handleDateChange}},[t("div",{staticClass:"index_picker"},[t("div",{staticClass:"grade-date"},[a._v(a._s(a.gradeDate?a.gradeDate:"请选择考试日期"))])])])],1)]),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:!0===a.isGradeMin,expression:"isGradeMin === true"}],staticClass:"grade-min-wrap"},[t("div",{staticClass:"grade-input weui-cell"},[t("div",{staticClass:"weui-cell__hd"},[t("label",{staticClass:"grade-input-head weui-label"},[a._v("总分")])],1),a._v(" "),t("div",{staticClass:"weui-cell__bd"},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.gradeTotal,expression:"gradeTotal"}],staticClass:"weui-input",attrs:{type:"digit",placeholder:"请输入总分",eventid:"6"},domProps:{value:a.gradeTotal},on:{input:function(e){e.target.composing||(a.gradeTotal=e.target.value)}}})])])])]),a._v(" "),!1===a.isGradeMin?t("div",{staticClass:"grade-min-wrap grade-new-footer"},[t("div",{staticClass:"grade-total weui-form-preview"},[t("div",{staticClass:"grade-head weui-form-preview__hd"},[t("div",{staticClass:"weui-form-preview__item"},[t("label",{staticClass:"grade-taotal-head weui-form-preview__label"},[a._v("此次总分共计：")])],1)]),a._v(" "),t("div",{staticClass:"weui-form-preview__bd"},[t("p",{staticClass:"grade-total-content"},[a._v(a._s(a.gradeTotalComputed)+" 分")])],1)])]):a._e(),a._v(" "),t("div",{staticClass:"btn"},[!1===a.isFinished||!0===a.isAdding?t("a",{staticClass:"weui-btn weui-btn_primary weui-btn_disabled"},[!0===a.isAdding?t("i",{staticClass:"weui-loading"}):a._e(),a._v("确认添加")],1):a._e(),a._v(" "),!0===a.isFinished&&!1===a.isAdding?t("a",{staticClass:"weui-btn weui-btn_primary",attrs:{eventid:"7"},on:{tap:a.handleAddGrade}},[a._v("确认添加")]):a._e()])])},staticRenderFns:[]};e.a=i},rlzQ:function(a,e,t){"use strict";e.a={data:function(){return{countDay:""}},beforeMount:function(){var a=this;wx.cloud.callFunction({name:"countDown",data:{}}).then(function(e){return a.countDay=e.result})}}}},["NxIZ"]);