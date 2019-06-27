import {GRADE_NAME_LIST, USERINFO, USER_GRADE_LIST, TIPS_LIST, PAPER_PACKAGE,ADD_GRADEID_TO_PAPERPACKAGE, BACKGROUND_IMG} from './mutation-type'

export default {
  [GRADE_NAME_LIST] (state, gradeNameList) {
    state.gradeNameList = gradeNameList
  },
  [USERINFO] (state, userinfo) {
    state.userinfo = userinfo
  },
  [USER_GRADE_LIST] (state, userGradeList) {
    state.userGradeList = userGradeList 
  },
  [TIPS_LIST] (state, tipsList) {
    state.tipsList = tipsList 
  },
  [PAPER_PACKAGE] (state, paperPackage) {
    state.paperPackage = paperPackage
  },
  [ADD_GRADEID_TO_PAPERPACKAGE] (state, gradeId) {
    state.userinfo.defaultPackage.push(gradeId)
  },
  [BACKGROUND_IMG] (state, backgroundImg) {
    state.userinfo.backgroundImg = backgroundImg
  }
  
}