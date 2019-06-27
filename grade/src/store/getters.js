
export default {
  // 获取用户的指定一门所有分数
  getUserGradeByGradeId: (state) => (gradeId) => {
    // getter方法的返回值 是一个函数
    return state.userGradeList.filter(item => item.gradeId === gradeId)
  },
  
  // 根据gradeId 获取科目完全信息
  getGradeInfoByGradeId: (state) => (gradeId) => {
    return state.gradeNameList.find(item => item.id === gradeId)
  },
  
  // 获取用户的分数概括
  getSimpleAllUserGrade: (state) => () => {
    let gradeDate = []
    let paperTypeIds = state.userinfo.paperTypeIds
    for(let key in paperTypeIds) {
      // 寻找对应的试卷信息
      let paperTypeId = paperTypeIds[key]
      let paper = state.gradeNameList.find(item => item.id === paperTypeId)
      // 获取用户的该科目所有分数信息
      let grades = state.userGradeList.filter(item => item.gradeId === paperTypeId).map(item => item.gradeTotal)
      gradeDate.push({
        gradeId: paper.id,
        gradeName: paper.gradeName,
        maxGrade: paper.maxGrade,
        grades: grades
      })
    }
    return gradeDate
  },
  
  // 获取总分
  getTotalGrade:  (state) => () => {
    let userinfo = state.userinfo
    let ret = {totalId: userinfo.gradeId, totalName:'总分'}
    let maxTotal = 0
    state.gradeNameList.forEach(grade => maxTotal += grade.maxGrade)
    let grades = []
    // 1.获取每一个paperPackage 
    state.paperPackage.forEach(paperPac => {
      let currentTotal = 0
      // 2.获取每一份试卷id
      paperPac.papers.forEach(paperId => {
        // 3.寻找到改试卷 累加总分
        currentTotal += parseFloat(state.userGradeList.find(grade => grade._id === paperId).gradeTotal)
      })
      grades.push(currentTotal)
    })
    console.log('============getTotalGrade===============')
    // 4.参数封装
    ret.maxTotal = maxTotal
    ret.grades = grades
    
    console.log(ret)
    // 返回参数
    return ret
  },
  
  // 获取总分详情页数据
  getTotalDetailGrade:  (state) => () => {
    let userinfo = state.userinfo
    let ret = {gradeId: userinfo.gradeId, totalName:'总分'}
    let maxTotal = 0
    state.gradeNameList.forEach(grade => maxTotal += grade.maxGrade)
    let grades = []
    // 1.获取每一个paperPackage 
    state.paperPackage.forEach(paperPac => {
      let currentTotal = {}
      currentTotal.id = paperPac._id
      currentTotal.gradeObj = {}
      currentTotal.gradeTotal = 0
      // 2.获取每一份试卷id
      paperPac.papers.forEach(paperId => {
        // 3.寻找到具体每次试卷 
        let parperDetail = state.userGradeList.find(grade => grade._id === paperId)
        let paperDetailGrade = parseFloat(parperDetail.gradeTotal)
        currentTotal.gradeObj[parperDetail.gradeId] = paperDetailGrade
        currentTotal.gradeTotal += paperDetailGrade
      })
      grades.push(currentTotal)
    })
    
    // 4.参数封装
    ret.maxTotal = maxTotal
    ret.grades = grades
    
    // 返回参数
    return ret
  },

  // 获取平均成绩
  getGradeAvg: (state) => () => {
    let gradeNameList = state.gradeNameList
    let ret = {avgName: '平均分', grades:[]}

    gradeNameList.forEach(gradeInfo => {
      // 目标分数数组
      let gradesArr = state.userGradeList.filter(grade => grade.gradeId === gradeInfo.id)
      let avg = 0
      if (gradesArr.length !== 0){
        // 目标分数平均数
        avg = gradesArr.reduce((temp, item) => parseFloat(temp) + parseFloat(item.gradeTotal), 0) / gradesArr.length
        avg = avg.toFixed(2)
      }
      ret.grades.push({
        gradeName: gradeInfo.gradeName,
        maxGrade: gradeInfo.maxGrade,
        // 平均数
        value: avg
      })
    })
    return ret
  },
  // 获取排名
  getGradeRank:  (state) => () => {
    let userinfo = state.userinfo
    let ret = {rankId: userinfo.gradeId, rankName:'年级排名', maxRank:460}
    let grades = []
    // 1.获取每一个paperPackage 
    state.paperPackage.forEach(paperPac => {
      grades.push(paperPac.rank)
    })
    // 4.参数封装
    ret.grades = grades
    // 返回参数
    return ret
  },
  
  // 获取一条提示
  getRandomTip: (state) => () => {
    if (!state.tipsList || state.tipsList.length === 0) {return '感谢您对我的支持'}
    let index = Math.floor(Math.random()*state.tipsList.length)
    return state.tipsList[index].content
  },
  
  // 获取默认试卷包
  getDefaultPaper: (state) => () => {
    let grades = []
    state.userinfo.defaultPackage.forEach(itemId => {
      // 将试卷放到包中
      let {_id, gradeName, gradeTitle, gradeTotal, gradeDate} = state.userGradeList.find(grade => grade._id === itemId)
      grades.push({_id, gradeName, gradeTitle, gradeTotal, gradeDate})
    })
    return {packageTitle:'未分类', grades}
  },
  
  // 获取所有的试卷包
  getPaperPackage: (state) => () => {
    let paperPackageData = []
    state.userinfo.paperPackage.forEach(packageId => {
      let grades = []
      let paperPackage = state.paperPackage.find(item => item._id === packageId)
      // paperPackage.papers 该试卷包的所有卷子_id
      paperPackage.papers.forEach(paperId => {
        let {_id, gradeName, gradeTitle, gradeTotal, gradeDate} = state.userGradeList.find(grade => grade._id === paperId)   
        grades.push({_id, gradeName, gradeTitle, gradeTotal, gradeDate})
      })
      let paperPackageItem = {packageTitle:paperPackage.title, _id:paperPackage._id, rank:paperPackage.rank, grades}
      paperPackageData.push(paperPackageItem)
    })
    return paperPackageData
  },
  
  
  // 获取每道题的平均成绩
  getDetailGradeAvg: (state) => (gradeId) => {
    const gradeStandard = state.gradeNameList.find(item => item.id == gradeId)
    const currentGradeList = state.userGradeList.filter(item => item.gradeId == gradeId)
    
    // 1. 首先把每道题的平均分过滤一次记录下来
    // 1.1 准备数组
    let grades = gradeStandard.gradeItemList.map(item => {
      return {
        id: item.id,
        maxGrade: item.maxGrade,
        gradeName: item.topicName,
        value: 0
      }
    })
    let detailCount = 0
    // 1.2遍历成绩做记录
    currentGradeList.forEach(grade => {
      // 得到每次考试详情项
      let gradeObj = grade.gradeObj
      if (JSON.stringify(gradeObj) !== "{}") {detailCount++}
      for(let key in gradeObj) {
        // 遍历加和进去 提米对应关系
        grades.forEach(item =>{
          if (item.id != key) return
          // 寻找到需要添加数据
          item.value = parseFloat(item.value) + parseFloat(gradeObj[key])
        })
      }
    })
    // 预防detailCount为0报除法异常
    detailCount = detailCount === 0 ? 1 : detailCount
    // 1.3 求出平均数
    grades.forEach(item => item.value = (item.value/detailCount).toFixed(2))
    
    // console.log(grades) // 平均分完毕 grade {id, gradeName, maxGrade, value}
    return grades
  },
  
  
}
