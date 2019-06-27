// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221" 
  // env: "grade-d-a2abd2"

})

const db = cloud.database()

// 云函数入口函数
exports.main = (event, context) => {
  let openId = cloud.getWXContext().OPENID
  return db.collection('paperPackage').where({_openid:openId}).orderBy('createdDate','asc').get()
}

