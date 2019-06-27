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
  let {inviteCode, studentId} = event
  let ret = 'success'
  let params = {}
  // 判断邀请码是否正确
  await db.collection('schoolMap').where({inviteCode:inviteCode}).get().then(res => {
    if (res.data.length === 0) {
      // 没有该学校
      ret = 'fail'
    }
  })
  if (ret === 'fail') {return {message:ret}}
  // 判断是更新还是新建
  await db.collection('studentSchoolMap').where({_openid:openId}).get().then(res => {
    params.srcData = res.data[0]
  })
  
  if (params.srcData){
    // 更新绑定数据
    await db.collection('studentSchoolMap').doc(params.srcData._id).update({
      data: {
        studentId: studentId,
        inviteCode: inviteCode
      }
    })
  }else{
     // 创建绑定数据
    await db.collection('studentSchoolMap').add({
      data: {
        _openid: openId,
        studentId: studentId,
        inviteCode: inviteCode
      }
    })
  }
  
  return {message:ret}
}

