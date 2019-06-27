// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221" 
  // env: "grade-d-a2abd2"

})

const db = cloud.database()
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  let openId = cloud.getWXContext().OPENID
  return db.collection('userGrade').where({_openid:openId}).limit(MAX_LIMIT).orderBy('gradeDate', 'asc').get()
}

