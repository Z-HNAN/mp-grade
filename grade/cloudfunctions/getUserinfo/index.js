// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221" 
  // env: "grade-d-a2abd2"

})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let openId = cloud.getWXContext().OPENID
  let userInfo
  await db.collection('userInfo').where({_openid:openId}).get()
   .then(res => {
     userInfo = res.data[0]
  })
  await db.collection('paperType').where({id:userInfo.gradeId}).get()
  .then(res => {
    userInfo.paperTypeIds = res.data[0][userInfo.gradeType]
  })
  return userInfo
  
  
}

