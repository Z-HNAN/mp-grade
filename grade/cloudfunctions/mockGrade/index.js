/* ==========不使用============= */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const gradeIds = [102015, 102011, 102012, 102013]
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context)  => {
  
  // 承载所有读操作的 promise 的数组
  const tasks = []
  // 循环查询每一门科目
   for (let i = 0; i < gradeIds.length; i++) {
     const promise = getGradesByGradeId(gradeIds[i])
     tasks.push(promise)
  }
  // 等待所有
  return await Promise.all(tasks)
}

/*
let mockGrade = [
    {id:0, gradeId:0, gradeName:"语文", gradeMax:150, grades: [108,102,110,106,115]},
    {id:1, gradeId:1, gradeName:"数学", gradeMax:150, grades: [115,118,109,121,122]},
    {id:2, gradeId:2, gradeName:"英语", gradeMax:150, grades: [98,102,100,110,108]},
    {id:3, gradeId:3, gradeName:"理综", gradeMax:300, grades: [247,255,268,257,271]},
  ]
*/

// 根据gradeId获取这个学生的最近成绩
function getGradesByGradeId (id) {
  let promise = new Promise((resolve, reject) => {
    let grades = [] // 分数
    let ret = {gradeId:0, gradeName:"", gradeMax:0, grades: []} // 返回模板
    // 获取gradeId最近的成绩grades
    db.collection('mockGrade').where({gradeId:id})
      .orderBy('gradeDate', 'asc').get()
      .then(res => {
        let arr = res.data
        for(let i = 0; i < arr.length; i++){
          grades.push(arr[i].gradeTotal)
        }
        // 获取其他的成绩项
       return db.collection('paperSubject').where({id:id}).get()
      })
      .then(res => {
        ret.gradeId = id,
        ret.gradeName = res.data[0].gradeName
        ret.gradeMax = res.data[0].maxGrade
        ret.grades = grades
        resolve (ret)
      })
    })
    return promise
}