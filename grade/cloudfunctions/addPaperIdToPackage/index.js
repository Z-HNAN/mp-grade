// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221"
  // env: "grade-d-a2abd2"
})

const db = cloud.database()
const _ = db.command

// 添加试卷 并根据试卷id关联 试卷包  均返回paperPackage
exports.main = async (event, context) => {
  
  let openId = cloud.getWXContext().OPENID
  const {paperId, packageIndex} = event   // packageIndex 是新创建的试卷包index
  let params = {
    isExist: false
  }
  // 查看此试卷包是否存在
  await db.collection('paperPackage').where({_openid:openId}).orderBy('createdDate','asc').get().then(res => {
    params.paperPackage = res.data
    if (res.data.length-1 >= packageIndex) {  // 当前所需要的试卷包已经存在
      params.isExist = true
    }
  })
  // 1.1是否创建试卷包
  if (params.isExist === true) {
    // 1.2直接push进试卷包
    params.paperPackage[packageIndex].papers.push(paperId)   // 执行完毕
    await db.collection('paperPackage').doc(params.paperPackage[packageIndex]._id).update({
      data:{
        papers: _.push(paperId)
      }
    })
    return {message:'only push', paperPackage:params.paperPackage}
  }
  // 2.1此时先创建试卷包
  await db.collection('paperPackage').add({
      data:{
        _openid: openId,
        title: `第${packageIndex+1}次测验`,   // index为新创建的index，转换为显示的index+1
        papers: [paperId],
        rank: 0,
        createdDate: getNowFormatDate()
      }
          
    }).then(res => {
      params.packageId = res._id
    })
  // 2.2关联进用户中
  await db.collection('userInfo').where({_openid:openId}).update({
    data: {
      paperPackage: _.push(params.packageId)
    }
  })
  // 2.3 手动关联paperPackage
  params.paperPackage.push({
    _id: params.packageId,
    _openid: openId,
    title: `第${packageIndex+1}次测验`,   // index为新创建的index，转换为显示的index+1
    papers: [paperId],
    rank: 0,
    createdDate: getNowFormatDate()
  })
  // 2.4返回出去
  return {message:'add and push', paperPackage:params.paperPackage}
 
 
   // 日期转换函数
   function getNowFormatDate() {
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
   }
  
}

