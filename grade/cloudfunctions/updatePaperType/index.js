// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221" 
  // env: "grade-d-a2abd2"

})

const db = cloud.database()

// 云函数入口函数
exports.main = (event, context) => {
  // 查询是否存在，存在创建用户否则就跳过
  let openId = cloud.getWXContext().OPENID
  const {gradeId, gradeType} = event
  return db.collection('userInfo').where({_openid:openId}).update({
    data: {
      gradeId,
      gradeType
    }
  })
  
} 

