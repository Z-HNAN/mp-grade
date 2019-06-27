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
  const {srcPackage, destPackage, paperId} = event
  const openId = cloud.getWXContext().OPENID
  let ret = {}
  if (srcPackage == -1) {
    // 默认分包过去
    // 1 去除原来的defaultPackage
    await db.collection('userInfo').where({_openid:openId}).get().then(res => {
      ret.defaultPackage = res.data[0].defaultPackage
      // 寻找 index
      let index = ret.defaultPackage.findIndex(item => item === paperId)
      // 删除
      ret.defaultPackage.splice(index, 1)
    })
    await db.collection('userInfo').where({_openid:openId}).update({
      // 更新元素
      data: {
        defaultPackage: ret.defaultPackage
      }
    })
  }else{
    // 1 包间调整
    await db.collection('paperPackage').doc(srcPackage).get()
    .then(res => {
      ret.papers = res.data.papers
      // 寻找 index
      let index = ret.papers.findIndex(item => item === paperId)
      // 删除
      ret.papers.splice(index, 1)
    })
    await db.collection('paperPackage').doc(srcPackage).update({
      // 更新元素
      data: {
        papers: ret.papers
      }
    })
  }
  // 2 分到目标包中
  if (destPackage == -1){
    // 去默认包中
    await db.collection('userInfo').where({_openid:openId}).get().then(res => {
      ret.defaultPackage = res.data[0].defaultPackage
      // 添加
      ret.defaultPackage.push(paperId)
    })
    await db.collection('userInfo').where({_openid:openId}).update({
      // 更新元素
      data: {
        defaultPackage: ret.defaultPackage
      }
    })
  }else{
    // 包间互切
    await db.collection('paperPackage').doc(destPackage).get()
    .then(res => {
      ret.newPapers = res.data.papers
      // 增加 index
      ret.newPapers.push(paperId)
    })
    console.log(ret.newPapers)
    await db.collection('paperPackage').doc(destPackage).update({
      // 更新元素
      data: {
        papers: ret.newPapers
      }
    })
  }
}

