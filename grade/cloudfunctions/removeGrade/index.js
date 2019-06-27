// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221" 
  // env: "grade-d-a2abd2"

})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context)  => {
  const {packageId, gradeId} = event
  const openId = cloud.getWXContext().OPENID
  let ret = {}
  if (packageId){ // 试卷包中删除
    // 寻找试卷包
    await db.collection('paperPackage').doc(packageId).get().then(res => {
      ret.papers = res.data.papers
    })
    // 删除试卷
    let removeIndex = ret.papers.findIndex(paperId => paperId === gradeId)
    ret.papers.splice(removeIndex, 1)
    // 同步回数据
    await db.collection('paperPackage').doc(packageId).update({
      data: {
        papers: ret.papers
      }
    })
  }else{ // 默认包中删除
    // 寻找试卷包
    await db.collection('userInfo').where({_openid:openId}).get().then(res => {
      ret.defaultPackage =  res.data[0].defaultPackage
    })
    // 删除试卷
    let removeIndex = ret.defaultPackage.findIndex(paperId => paperId === gradeId)
    ret.defaultPackage.splice(removeIndex, 1)
    // 同步回数据
    await db.collection('userInfo').where({_openid:openId}).update({
      data: {
        defaultPackage: ret.defaultPackage
      }
    })
  }
  // 删除试卷实体信息
  await db.collection('userGrade').doc(gradeId).remove()
  return {result:'success'}
}

