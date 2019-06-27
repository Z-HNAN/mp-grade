/* ================不使用============  */

// 云函数入口文件   
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = (event, context) =>{
  return db.collection('paperSubject').doc('5cadb869a7314805dcf69a94').get()
} 

