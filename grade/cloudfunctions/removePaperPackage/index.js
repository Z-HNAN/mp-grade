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
  const {paperId} = event
  const openId = cloud.getWXContext().OPENID
  let ret = {}
  // 获取原先所有的试卷
  await db.collection('paperPackage').doc(paperId).get().then(res => {
    ret.papers = res.data.papers
  })
  // 删除原试卷 paperPackage
  
  await db.collection('paperPackage').doc(paperId).remove()
  
  // 删除userinfo 中的paperPackage  paperid
  // 1.提取userinfo的paperPackage
  await db.collection('userInfo').where({_openid:openId}).get().then(res => {
    ret.paperPackage =  res.data[0].paperPackage
  })
  console.log('1.提取userinfo的paperPackage')
  console.log(ret.paperPackage)
  let index = ret.paperPackage.findIndex(packageId => packageId == paperId)
  ret.paperPackage.splice(index, 1)
  // 2.更新进去
  await db.collection('userInfo').where({_openid:openId}).update({
    data: {
      paperPackage: ret.paperPackage
    }
  })
  await db.collection('userInfo').where({_openid:openId}).get(res => console.log(res))
  console.log('2.更新进去')
  console.log(ret.paperPackage)
  // 插入 defaultPackage
  console.log('插入 defaultPackage')
  console.log(ret.papers)
  if (ret.papers.length === 0) {return}
  await db.collection('userInfo').where({_openid:openId}).update({
    data: {
      defaultPackage: _.push(ret.papers)
    }
  })
  console.log('end')
}

