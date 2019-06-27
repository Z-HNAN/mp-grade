import {GRADE_NAME_LIST, USERINFO, USER_GRADE_LIST, TIPS_LIST, PAPER_PACKAGE, ADD_GRADEID_TO_PAPERPACKAGE, BACKGROUND_IMG} from './mutation-type'
const db = wx.cloud.database()

export default {
  // 获取用户所使用的分数标准
  getNameGradeList ({commit}) {
    return new Promise((resolve, reject) => {
      // 调用云函数获取数据
      wx.cloud.callFunction({
        name: 'getGradeNameList',
        data: {}
      })
      .then(res => {
        // 将所有的数据拼接起来为一个数组返回
        let gradeNameList = res.result.map(item => item.data[0])
        // 触发对应的mutation
        commit(GRADE_NAME_LIST, gradeNameList)
        resolve()
      })
    })
  },
  // 获取用户信息
  getUserinfo ({commit}) {
    return new Promise((resolve, reject) => {
      let userinfo = {}
      // 获取userinfo
      wx.cloud.callFunction({
        name: 'getUserinfo',
        data: {}
      })
      .then(res => {
        // 关联用户考试卷信息
        userinfo = res.result
        // 提交完整的信息回去
        commit(USERINFO, userinfo)
        resolve()
      })
    })
  },
  // 获取用户所有的分数
  getUserGradeList ({commit}) {
    return new Promise((resolve, reject) => {
      // 获取userGradeList
      wx.cloud.callFunction({
        name: 'getUsergrade',
        data: {}
      })
      .then(res => {
        // 获取结果提交
        let userGradeList = res.result.data
        commit(USER_GRADE_LIST, userGradeList)
        resolve()
      })
    })
  },
  // 用户自检 单纯请求方法
  fixGrade () {
    return new Promise((resolve, reject) => {
      // 获取userGradeList
      wx.cloud.callFunction({
        name: 'fixGrade',
        data: {}
      }).then(resolve)
    })
  },
  // 将gradeId放到store中
  addGradeIdToDefaultPaper ({commit}, gradeId) {
    commit(ADD_GRADEID_TO_PAPERPACKAGE, gradeId)
  },
  // paperPackage更新
  updatePapaerPackage ({commit}, paperPackage) {
    commit(PAPER_PACKAGE, paperPackage)
  },
  // 获取提示信息
  getTipsList ({commit}) {
    // 本地有，走本地，本地没有走云端 TIPS_LIST
    return getTipsByStorage()
      .then(res => {
        let tips = JSON.parse(res || '[]')
        if(tips && tips.length > 0){
          // 本地有数据
          commit(TIPS_LIST, tips)
          reject()
        }else{
          // 继续走云端获取数据
          return getTipsByCloud()
        }
      })
      .then(res => {
        // 拉取到云端数据
        commit(TIPS_LIST, res)
      })
  },
  // 获取试卷包
  getPaperPackage ({commit}){
    return new Promise((resolve, reject) => {
      // 获取userGradeList
      wx.cloud.callFunction({
        name: 'getPaperPackage',
        data: {}
      })
      .then(res => {
        // 获取结果提交
        commit(PAPER_PACKAGE, res.result.data)
        resolve()
      })
    })
  },
  
  // 更新backgroundImg
  updateBackgroundImg ({commit}, backgroundImg){
    return new Promise((resolve, reject) => {
       commit(BACKGROUND_IMG, backgroundImg)
       resolve()
    })
  }
  
}

// 从本地获取tips
function getTipsByStorage () {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key:TIPS_LIST,
      complete: res => {
        resolve(res.data)
      }
    })
  })
}

// 从云端获取tips
function getTipsByCloud () {
  return new Promise((resolve, reject) => {
    const db = wx.cloud.database()
    db.collection('tips').get({
      success(res) {
        // 放入本地存储
        wx.setStorage({
          key: TIPS_LIST,
          data: JSON.stringify(res.data)
        })
        resolve(res.data)
      }
    })
  })
}
  
  




