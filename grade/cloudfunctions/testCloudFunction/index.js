/* =================不使用============== */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = (event, context)  => {
  console.log('=======  start  ===')
  console.log(new Date().getTime())
  db.collection("testCollection").get()
    .then(res =>{
      console.log('===第一次====')
      console.log(new Date().getTime())
      // return timeout(5000)
      timeout(5000)
    })
    .then(res =>{
      console.log('===第二次====')
      console.log(new Date().getTime())
      // return timeout(5000)
      timeout(5000)
    })
    .then(res =>{
      console.log('===第三次====')
      console.log(new Date().getTime())
      // return timeout(5000)
      timeout(5000)
    })
    .then(res =>{
      console.log('===第四次====')
      console.log(new Date().getTime())
      // return timeout(5000)
      timeout(5000)
    })
    .then(res =>{
      console.log('===第五次====')
      console.log(new Date().getTime())
      // return timeout(5000)
      timeout(5000)
    })
    console.log('=======  end  ===')
    console.log(new Date().getTime())
}
function toggleSwitch (toggleName) {
  let data = {}
  data[toggleName] = new Date().getTime()
  db.collection('testCollection').doc('XLh3X-SiwXKAQt2f').update({data})
}

/*
exports.main = (event, context)  => {
  
  ;(() => {
    console.log(new Date().getTime())    // 1555597655277
    timeout(5000)
    console.log(new Date().getTime())    // 1555597655279
  })()
  

  ;(async () => {
    console.log(new Date().getTime())    // 1555597655277
    await timeout(5000)
    console.log(new Date().getTime())    // 1555597655279
  })()

}

*/

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

