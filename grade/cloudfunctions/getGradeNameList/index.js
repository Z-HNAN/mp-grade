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
  let options = {}
  return db.collection('userInfo').where({_openid:openId}).get()
    .then(res => {
      // 获取用户的数据类型
      options.gradeType = res.data[0].gradeType
      options.gradeId = res.data[0].gradeId
      return db.collection('paperType').where({id:options.gradeId}).get()
    })
    .then(res => {
      options.gradeTypeList = res.data[0][options.gradeType]
      // 获取全部的试卷信息反馈回去
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < options.gradeTypeList.length; i++) {
        const promise = db.collection('paperSubject').where({id: options.gradeTypeList[i]}).get()
        tasks.push(promise)
      }
      return Promise.all(tasks)
    })
    
}

