// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221" 
  // env: "grade-d-a2abd2"

})

const db = cloud.database()

// 云函数入口函数
exports.main = (event, context) =>{
  let destDate = new Date('06-08-2020') // 天数表示00开始 高考时间 2020-06-07
  let nowDate = new Date()
  let daySpace = (destDate - nowDate)/1000/60/60/24
  return Math.floor(daySpace)
} 

