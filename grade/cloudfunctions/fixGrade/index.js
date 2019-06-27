// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221"
  // env: "grade-d-a2abd2"

})

const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
  
  const openId = cloud.getWXContext().OPENID
  // 获取用户所有试卷
  let params = {}
  // 1 获取opendid的试卷数
  await db.collection('userGrade').where({_openid:openId}).count().then(res => params.totalByOpenid = res.total)
  // 2.1 获取用户数据
  await db.collection('userInfo').where({_openid:openId}).get().then(res => params.userInfo = res.data[0])
  // 2.2 根据试卷包id获取所有的试卷包
  await db.collection('paperPackage').where({
    _id: _.in(params.userInfo.paperPackage)
  }).get().then(res => params.paperPackage = res.data)
  // 2.3获取默认包中的试卷数
  params.defaultPaperId = params.userInfo.defaultPackage
  // 2.4加和试卷包中存储的试卷
  params.totalByPackage = params.defaultPaperId.length
  params.paperPackage.forEach(paperPackageItem => {
    params.totalByPackage += paperPackageItem.papers.length
  })
  // console.log(params.totalByOpenid) 
  // console.log(params.totalByPackage)

  if (params.totalByOpenid === params.totalByPackage) {
    // 数量一致
    return {message:'pass'}
  }
  // 数量不一致，合并数据
  // 1.取出opendid的paperid
  await db.collection('userGrade').where({_openid:openId}).get().then(res => {
    params.papersIdByOpenid = res.data.map(item => item._id)
  })
  // 2.1取出default中的paperid
  params.papersIdByPackage = params.defaultPaperId
  // 2.2分发出default中的paperid
  params.paperPackage.forEach(paperPackageItem => {
    params.papersIdByPackage = params.papersIdByPackage.concat(paperPackageItem.papers)
  })
//   console.log('============papersIdByOpenid===============')
//   console.log(params.papersIdByOpenid)
//   console.log('===========papersIdByPackage================')
//   console.log(params.papersIdByPackage)
  // 比较不同数据
  let diffPaperid =  params.papersIdByOpenid.concat(params.papersIdByPackage).filter((v, i ,arr) => {
    // 合并后，看第一个最后一个是否是同一个
    return arr.indexOf(v) === arr.lastIndexOf(v)
  })
  
//   console.log('==========diffPaperid=================')
//   console.log(diffPaperid)

  /* 
  * 方案1 考试包导入到defaultPackage中
  // 将diffPaperid插入userinfo的defaultPapers中 
  await db.collection('userInfo').where({_openid:openId}).update({
    data: {
      defaultPackage: _.push(diffPaperid)
    }
  })
  */
 
   /*
   * 方案2 考试卷生成一个试卷包 将试卷包id导给学生
   */
  let paperPackageId 
  // 2.1 生成试卷包
  await db.collection('paperPackage').add({
    data:{
      _openid: openId,
      title: '教务端导入试卷包',
      papers: diffPaperid,
      rank: 0,
      createdDate: getNowFormatDate()
    }
  }).then(res => paperPackageId = res._id)
  
  // 2.2关联试卷包
  await db.collection('userInfo').where({_openid:openId}).update({
    data: {
      paperPackage: _.push([paperPackageId])
    }
  })
  
  
  
  // 更新完成
  return {message:'checked'}
  
}
