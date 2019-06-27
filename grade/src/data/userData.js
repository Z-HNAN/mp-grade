export default {
  gradeData: [
    {id:0, gradeId:0, gradeName:"语文", gradeMax:150, grades: [108,102,110,106,115]},
    {id:1, gradeId:1, gradeName:"数学", gradeMax:150, grades: [115,118,109,121,122]},
    {id:2, gradeId:2, gradeName:"英语", gradeMax:150, grades: [98,102,100,110,108]},
    {id:3, gradeId:3, gradeName:"理综", gradeMax:300, grades: [247,255,268,257,271]},
  ],
  rankData: {id:0, rankId:0, rankName:'年级排名', maxRank:460, grades: [108,102,110,106,115]},
  totalData: {id:0, totallId:0, totalName:'总分', maxTotal:750, grades: [552,580,499,530,533]},
  avgData:{avgName:'平均分', grades:[{gradeName: '数学(理)', value:101, maxGrade:150},{gradeName: '语文', value:118, maxGrade:150},{gradeName: '英语', value:99, maxGrade:150},{gradeName: '理科综合', value:276, maxGrade:300}]},
  
  
  totalNameDetail:{
    totalName:'总分', maxTotal:750, totallId:0,
    gradeItemList: [
      {"id":0, "maxGrade":150, "gradeName":"语文"},
      {"id":1, "maxGrade":150, "gradeName":"数学"},
      {"id":2, "maxGrade":150, "gradeName":"英语"},
      {"id":3, "maxGrade":300, "gradeName":"理综"},
    ],
  },
  
  totalDetailData: {
    openId: '16gmioshnqw16casf46dsa',
    gradeId: 0,
    totalName:'总分', 
    maxTotal:750,
    grades:[
      {id:0, gradeTotal:552, gradeObj:{0:108, 1:115, 2:98, 3:248}},
      {id:1, gradeTotal:580, gradeObj:{0:102, 1:122, 2:102, 3:255}},
      {id:2, gradeTotal:499, gradeObj:{0:110, 1:109, 2:108, 3:268}},
      {id:3, gradeTotal:530, gradeObj:{0:108, 1:115, 2:100, 3:257}},
      {id:4, gradeTotal:552, gradeObj:{0:106, 1:118, 2:102, 3:248}},
      {id:5, gradeTotal:533, gradeObj:{0:115, 1:121, 2:110, 3:271}}
    ]
  },
  
  detailData: {
    openId: '16gmioshnqw16casf46dsa',
    gradeId: 1,
    grandName: '数学',
    gradeMax: 150,
    grades: [
      {id:90, grandTitle: '第一次月考', grandDate: '2019-01-07', grandRank: 93, grandTotal: 128, gradeObj: {0:55,1:15,2:12,3:8,4:11,5:7,6:10}},
      {id:91, grandTitle: '第二次月考', grandDate: '2019-02-07', grandRank: 83, grandTotal: 116, gradeObj: {0:50,1:15,2:12,3:8,4:11,5:7,6:10}},
      {id:92, grandTitle: '第三次月考', grandDate: '2019-03-07', grandRank: 123, grandTotal: 134, gradeObj: {0:45,1:15,2:12,3:8,4:11,5:7,6:10}},
      {id:93, grandTitle: '第四次月考', grandDate: '2019-04-07', grandRank: 68, grandTotal: 98, gradeObj: {0:55,1:15,2:12,3:8,4:11,5:7,6:10}},
      {id:94, grandTitle: '第五次月考', grandDate: '2019-05-07', grandRank: 72, grandTotal: 115, gradeObj: {0:60,1:15,2:12,3:8,4:11,5:7,6:10}}
    ]
  },
  
  gradeNameDetail:{
    gradeId: 1,
    grandName: '数学',
    gradeMax: 150,
    gradeItemList: [
      {"id":0, "totalValue":60, "inputTitle":"选择题"},
      {"id":1, "totalValue":20, "inputTitle":"填空题"},
      {"id":2, "totalValue":12, "inputTitle":"17题"},
      {"id":3, "totalValue":12, "inputTitle":"18题"},
      {"id":4, "totalValue":12, "inputTitle":"19题"},
      {"id":5, "totalValue":12, "inputTitle":"20题"},
      {"id":6, "totalValue":10, "inputTitle":"选考题"}
    ]
  },
  
  avgData:{
    avgName:'平均分', 
    grades:[
      {gradeName: '数学(理)', value:101, maxGrade:150},
      {gradeName: '语文', value:118, maxGrade:150},
      {gradeName: '英语', value:99, maxGrade:150},
      {gradeName: '理科综合', value:276, maxGrade:300},
    ]},

  userData: [ 
    { 
      gradeId: 102015,
      gradeName: '数学（理）',
      gradeMax: 150,
      grades: [ '83.0', '141.4', '138.9', '92.9', '91.6', '132.8' ] ,
    },
    { 
      gradeId: 102011,
      gradeName: '语文',
      gradeMax: 150,
      grades: [ '94.7', '78.1', '113.3', '106.3', '100.3', '115.5' ] ,
    },
    { 
      gradeId: 102012,
      gradeName: '英语',
      gradeMax: 150,
      grades: [ '107.0', '102.7', '82.8', '85.8', '103.2', '106.8' ] ,
    },
    { 
      gradeId: 102013,
      gradeName: '理科综合',
      gradeMax: 300,
      grades: [ '282.4', '254.9', '209.8', '266.2', '269.8', '211.2' ] ,
    } ,
  ],
  
  102015: {"data":[{"_id":"5caea604a7314805dcff799e","gradeDate":"2018-10-10","gradeId":102015,"gradeName":"数学（理）","gradeObj":{"10301500":"28.6","10301501":"10.1","10301502":"10.6","10301503":"6.8","10301504":"12.0","10301505":"3.2","10301506":"5.6","10301507":"6.1"},"gradeRank":201,"gradeTitle":"第一次月考","gradeTotal":"83.0"},{"_id":"5caea604a7314805dcff79a0","gradeDate":"2018-11-10","gradeId":102015,"gradeName":"数学（理）","gradeObj":{"10301500":"60.0","10301501":"19.4","10301502":"12.0","10301503":"6.9","10301504":"11.2","10301505":"12.0","10301506":"9.9","10301507":"10.0"},"gradeRank":1,"gradeTitle":"第二次月考","gradeTotal":"141.4"},{"_id":"5caea604a7314805dcff79a2","gradeDate":"2018-12-10","gradeId":102015,"gradeName":"数学（理）","gradeObj":{"10301500":"60.0","10301501":"11.5","10301502":"12.0","10301503":"12.0","10301504":"12.0","10301505":"12.0","10301506":"11.2","10301507":"8.2"},"gradeRank":25,"gradeTitle":"第三次月考","gradeTotal":"138.9"},{"_id":"5caea604a7314805dcff79a4","gradeDate":"2019-01-10","gradeId":102015,"gradeName":"数学（理）","gradeObj":{"10301500":"30.2","10301501":"8.3","10301502":"7.0","10301503":"12.0","10301504":"6.2","10301505":"12.0","10301506":"9.7","10301507":"7.5"},"gradeRank":194,"gradeTitle":"第四次月考","gradeTotal":"92.9"},{"_id":"5caea604a7314805dcff79a6","gradeDate":"2019-02-10","gradeId":102015,"gradeName":"数学（理）","gradeObj":{"10301500":"20.9","10301501":"20.0","10301502":"5.6","10301503":"12.0","10301504":"5.3","10301505":"9.3","10301506":"12.0","10301507":"6.5"},"gradeRank":210,"gradeTitle":"第五次月考","gradeTotal":"91.6"},{"_id":"5caea604a7314805dcff79a8","gradeDate":"2019-03-10","gradeId":102015,"gradeName":"数学（理）","gradeObj":{"10301500":"60.0","10301501":"20.0","10301502":"11.7","10301503":"6.1","10301504":"12.0","10301505":"10.2","10301506":"10.2","10301507":"2.6"},"gradeRank":78,"gradeTitle":"第六次月考","gradeTotal":"132.8"}],"avgData":[{"id":10301500,"maxGrade":60,"gradeName":"选择题","value":"43.28"},{"id":10301501,"maxGrade":20,"gradeName":"填空题","value":"14.88"},{"id":10301502,"maxGrade":12,"gradeName":"17题","value":"9.82"},{"id":10301503,"maxGrade":12,"gradeName":"18题","value":"9.30"},{"id":10301504,"maxGrade":12,"gradeName":"19题","value":"9.78"},{"id":10301505,"maxGrade":12,"gradeName":"20题","value":"9.78"},{"id":10301506,"maxGrade":12,"gradeName":"21题","value":"9.77"},{"id":10301507,"maxGrade":10,"gradeName":"选修题","value":"6.82"}]},
  102011: {"data":[{"_id":"5caea604a7314805dcff7990","gradeDate":"2018-10-10","gradeId":102011,"gradeName":"语文","gradeObj":{"10301100":"8.7","10301101":"14.0","10301102":"12.0","10301103":"13.8","10301104":"11.0","10301105":"5.0","10301106":"13.3","10301107":"16.9"},"gradeRank":201,"gradeTitle":"第一次月考","gradeTotal":"94.7"},{"_id":"5caea604a7314805dcff798e","gradeDate":"2018-11-10","gradeId":102011,"gradeName":"语文","gradeObj":{"10301100":"2.5","10301101":"12.0","10301102":"4.7","10301103":"13.3","10301104":"6.6","10301105":"2.0","10301106":"20.0","10301107":"17.0"},"gradeRank":172,"gradeTitle":"第二次月考","gradeTotal":"78.1"},{"_id":"5caea604a7314805dcff798c","gradeDate":"2018-12-10","gradeId":102011,"gradeName":"语文","gradeObj":{"10301100":"7.3","10301101":"9.6","10301102":"12.0","10301103":"18.9","10301104":"4.4","10301105":"3.9","10301106":"11.2","10301107":"46.0"},"gradeRank":104,"gradeTitle":"第三次月考","gradeTotal":"113.3"},{"_id":"5caea604a7314805dcff798a","gradeDate":"2019-01-10","gradeId":102011,"gradeName":"语文","gradeObj":{"10301100":"8.9","10301101":"13.7","10301102":"12.0","10301103":"19.0","10301104":"8.8","10301105":"3.1","10301106":"12.3","10301107":"28.5"},"gradeRank":95,"gradeTitle":"第四次月考","gradeTotal":"106.3"},{"_id":"5caea604a7314805dcff7988","gradeDate":"2019-02-10","gradeId":102011,"gradeName":"语文","gradeObj":{"10301100":"5.8","10301101":"4.6","10301102":"12.0","10301103":"6.7","10301104":"9.3","10301105":"5.0","10301106":"16.0","10301107":"40.9"},"gradeRank":115,"gradeTitle":"第五次月考","gradeTotal":"100.3"},{"_id":"5caea604a7314805dcff7986","gradeDate":"2019-03-10","gradeId":102011,"gradeName":"语文","gradeObj":{"10301100":"9.0","10301101":"14.0","10301102":"9.0","10301103":"19.0","10301104":"11.0","10301105":"1.6","10301106":"16.1","10301107":"35.8"},"gradeRank":101,"gradeTitle":"第六次月考","gradeTotal":"115.5"}],"avgData":[{"id":10301100,"maxGrade":9,"gradeName":"论述类文本阅读","value":"7.03"},{"id":10301101,"maxGrade":14,"gradeName":"文学类文本阅读","value":"11.32"},{"id":10301102,"maxGrade":12,"gradeName":"实用类文本阅读","value":"10.28"},{"id":10301103,"maxGrade":19,"gradeName":"文言文阅读","value":"15.12"},{"id":10301104,"maxGrade":11,"gradeName":"古诗歌阅读","value":"8.52"},{"id":10301105,"maxGrade":5,"gradeName":"名句默写","value":"3.43"},{"id":10301106,"maxGrade":20,"gradeName":"语言文学应用","value":"14.82"},{"id":10301107,"maxGrade":60,"gradeName":"写作","value":"30.85"}]},
  102012: {"data":[{"_id":"5caea605a7314805dcff79aa","gradeDate":"2018-10-10","gradeId":102012,"gradeName":"英语","gradeObj":{"10301200":"26.6","10301201":"30.0","10301202":"9.4","10301203":"17.2","10301204":"2.6","10301205":"4.6","10301206":"16.6"},"gradeRank":221,"gradeTitle":"第一次月考","gradeTotal":"107.0"},{"_id":"5caea605a7314805dcff79ac","gradeDate":"2018-11-10","gradeId":102012,"gradeName":"英语","gradeObj":{"10301200":"8.1","10301201":"25.5","10301202":"6.6","10301203":"30.0","10301204":"14.4","10301205":"2.0","10301206":"16.1"},"gradeRank":170,"gradeTitle":"第二次月考","gradeTotal":"102.7"},{"_id":"5caea605a7314805dcff79ae","gradeDate":"2018-12-10","gradeId":102012,"gradeName":"英语","gradeObj":{"10301200":"4.0","10301201":"11.7","10301202":"6.5","10301203":"23.4","10301204":"10.3","10301205":"5.5","10301206":"21.4"},"gradeRank":330,"gradeTitle":"第三次月考","gradeTotal":"82.8"},{"_id":"5caea605a7314805dcff79b0","gradeDate":"2019-01-10","gradeId":102012,"gradeName":"英语","gradeObj":{"10301200":"12.6","10301201":"17.1","10301202":"9.3","10301203":"13.0","10301204":"6.6","10301205":"5.9","10301206":"21.3"},"gradeRank":315,"gradeTitle":"第四次月考","gradeTotal":"85.8"},{"_id":"5caea605a7314805dcff79b2","gradeDate":"2019-02-10","gradeId":102012,"gradeName":"英语","gradeObj":{"10301200":"21.2","10301201":"21.1","10301202":"8.2","10301203":"29.8","10301204":"6.0","10301205":"8.6","10301206":"8.3"},"gradeRank":176,"gradeTitle":"第五次月考","gradeTotal":"103.2"},{"_id":"5caea605a7314805dcff79b4","gradeDate":"2019-03-10","gradeId":102012,"gradeName":"英语","gradeObj":{"10301200":"17.2","10301201":"13.9","10301202":"5.0","10301203":"28.4","10301204":"13.7","10301205":"9.7","10301206":"18.9"},"gradeRank":191,"gradeTitle":"第六次月考","gradeTotal":"106.8"}],"avgData":[{"id":10301200,"maxGrade":30,"gradeName":"听力","value":"14.95"},{"id":10301201,"maxGrade":30,"gradeName":"阅读理解","value":"19.88"},{"id":10301202,"maxGrade":10,"gradeName":"七选五","value":"7.50"},{"id":10301203,"maxGrade":30,"gradeName":"完形填空","value":"23.63"},{"id":10301204,"maxGrade":15,"gradeName":"选词填空","value":"8.93"},{"id":10301205,"maxGrade":10,"gradeName":"短文改错","value":"6.05"},{"id":10301206,"maxGrade":25,"gradeName":"书面表达","value":"17.10"}]},
  102013: {"data": [{"_id": "5caea605a7314805dcff79b6","gradeDate": "2018-10-10","gradeId": 102013,"gradeName": "理科综合","gradeObj": {"10301300": "36.0","10301301": "42.0","10301302": "45.0","10301303": "50.0","10301304": "53.0","10301305": "49.0"},"gradeRank": 19,"gradeTitle": "第一次月考","gradeTotal": "275"}, {"_id": "5caea605a7314805dcff79b8","gradeDate": "2018-11-10","gradeId": 102013,"gradeName": "理科综合","gradeObj": {"10301300": "30.0","10301301": "36.0","10301302": "42.0","10301303": "50.0","10301304": "50.0","10301305": "45.0"},"gradeRank": 97,"gradeTitle": "第二次月考","gradeTotal": "253"}, {"_id": "5caea605a7314805dcff79ba","gradeDate": "2018-12-10","gradeId": 102013,"gradeName": "理科综合","gradeObj": {"10301300": "30.0","10301301": "30.0","10301302": "32.0","10301303": "51.0","10301304": "48.0","10301305": "49.0"},"gradeRank": 209,"gradeTitle": "第三次月考","gradeTotal": "240"}, {"_id": "5caea605a7314805dcff79bc","gradeDate": "2019-01-10","gradeId": 102013,"gradeName": "理科综合","gradeObj": {"10301300": "30.0","10301301": "42.0","10301302": "48.0","10301303": "58.0","10301304": "48.0","10301305": "44.0"},"gradeRank": 30,"gradeTitle": "第四次月考","gradeTotal": "270"}, {"_id": "5caea605a7314805dcff79be","gradeDate": "2019-02-10","gradeId": 102013,"gradeName": "理科综合","gradeObj": {"10301300": "30.0","10301301": "36.0","10301302": "42.0","10301303": "56.0","10301304": "50.0","10301305": "44.0"},"gradeRank": 44,"gradeTitle": "第五次月考","gradeTotal": "258"}, {"_id": "5caea605a7314805dcff79c0","gradeDate": "2019-03-10","gradeId": 102013,"gradeName": "理科综合","gradeObj": {"10301300": "30.0","10301301": "30.0","10301302": "33.0","10301303": "50.0","10301304": "45.0","10301305": "43.0"},"gradeRank": 168,"gradeTitle": "第六次月考","gradeTotal": "231"}],"avgData": [{"id": 10301300,"maxGrade": 36,"gradeName": "生物选择","value": "31"}, {"id": 10301301,"maxGrade": 42,"gradeName": "化学选择","value": "36"}, {"id": 10301302,"maxGrade": 48,"gradeName": "物理选择","value": "40.3"}, {"id": 10301303,"maxGrade": 62,"gradeName": "物理大题","value": "52.5"}, {"id": 10301304,"maxGrade": 58,"gradeName": "化学大题","value": "49"}, {"id": 10301305,"maxGrade": 54,"gradeName": "生物大题","value": "45.7"}]}  
  
     
  
   
  
}