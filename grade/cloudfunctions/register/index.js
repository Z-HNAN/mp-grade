// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "grade-production-b34221" 
  // env: "grade-d-a2abd2"

})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 查询是否存在，存在创建用户否则就跳过
  let openId = cloud.getWXContext().OPENID
  let user
  await db.collection('userInfo').where({_openid:openId}).get()
    .then(res => {
      user = res.data[0]
    })
  if (user) {
    return {result:'SUCCESS!'}
  }
  // 新建用户
  return db.collection('userInfo').add({
    data: {
      _openid: openId,
      defaultPackage: [],   // 存放默认试卷包
      paperPackage: [],     // 存放试卷包Id
      gradeId: 10101,       // 设置默认的试卷类型
      gradeType: 'science',  // 设置默认科目
      backgroundImg: '',    // 小程序云资源id 
    }
  })
} 

