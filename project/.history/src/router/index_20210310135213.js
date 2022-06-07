import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: "active",
  mode: 'history',
  scrollBehavior(to, from, savedPosition) { //解决滚动条高度继承问题
      return { x: 0, y: 0 }
  },

  routes: [
    //-----------------首页---------------------
    {
      path: "/",
      name: "home",
      component: (resolve) => require(['@/views/home/index'], resolve),
      meta: { keepAlive: false },
    },

    //-----------------我的项目---------------------
    {
      path: "/projectmanage",
      name: "projectmanage",
      component: (resolve) => require(['@/views/myProject/projectManage/index'], resolve),
      meta: { keepAlive: false },
    },
    {
      path: "/projectmanageadd",
      name: "projectmanageadd",
      component: (resolve) => require(['@/views/myProject/projectManageAdd/index'], resolve),
      meta: { keepAlive: false },
    },
    {
      path: "/usermsg",
      name: "usermsg",
      component: (resolve) => require(['@/views/myProject/userMsg/index'], resolve),
      meta: { keepAlive: false },
    },




    //-------------------人员管理-----------------------
    //访客管理
    {
      path: "/visitormanage",
      name: "visitormanage",
      component: (resolve) => require(['@/views/personManage/visitorManage/index'], resolve),
      meta: { keepAlive: false },
    },
    //访客管理-增加
    {
      path: "/visitormanageadd",
      name: "visitormanageadd",
      component: (resolve) => require(['@/views/personManage/visitorManageAdd/index'], resolve),
      meta: { keepAlive: false },
    },
    //业主管理
    {
      path: "/ownermanage",
      name: "ownermanage",
      component: (resolve) => require(['@/views/personManage/ownerManage/index'], resolve),
      meta: { keepAlive: false },
    },
     //业主管理-增加
     {
      path: "/ownermanageadd",
      name: "ownermanageadd",
      component: (resolve) => require(['@/views/personManage/ownerManageAdd/index'], resolve),
      meta: { keepAlive: false },
    },
     //员工管理
     {
      path: "/staffmanage",
      name: "staffmanage",
      component: (resolve) => require(['@/views/personManage/staffManage/index'], resolve),
      meta: { keepAlive: false },
    },
     //员工管理-增加
     {
      path: "/staffmanageadd",
      name: "staffmanageadd",
      component: (resolve) => require(['@/views/personManage/staffManageAdd/index'], resolve),
      meta: { keepAlive: false },
    },
    //黑名单
    {
      path: "/blacklist",
      name: "personmanageblacklist",
      component: (resolve) => require(['@/views/personManage/blacklist/index'], resolve),
      meta: { keepAlive: false },
    },

    //-------------------------设备管理-----------------------------
    //通道门禁
    {
      path: "/aisleaccess",
      name: "aisleaccess",
      component: (resolve) => require(['@/views/deviceManage/aisleAccess/index'], resolve),
      meta: { keepAlive: false },
    },
     //软件管理
     {
      path: "/softmanage",
      name: "softmanage",
      component: (resolve) => require(['@/views/deviceManage/softManage/index'], resolve),
      meta: { keepAlive: false },
    },
    //对讲门禁
    {
      path: "/talkaccess",
      name: "talkaccess",
      component: (resolve) => require(['@/views/deviceManage/talkAccess/index'], resolve),
      meta: { keepAlive: false },
    },
    //可视电话
    {
      path: "/visibletel",
      name: "visibletel",
      component: (resolve) => require(['@/views/deviceManage/visibleTel/index'], resolve),
      meta: { keepAlive: false },
    },
    //访客终端
    {
      path: "/visitorend",
      name: "visitorend",
      component: (resolve) => require(['@/views/deviceManage/visitorEnd/index'], resolve),
      meta: { keepAlive: false },
    },

    //------------------通行规则-------------------------
    //设备规则
    {
      path: "/devicerules",
      name: "devicerules",
      component: (resolve) => require(['@/views/TrafficRules/deviceRules/index'], resolve),
      meta: { keepAlive: false },
    },
     //人员规则
    {
      path: "/personrules",
      name: "personrules",
      component: (resolve) => require(['@/views/TrafficRules/personRules/index'], resolve),
      meta: { keepAlive: false },
    }, 
    

    // ----------------------历史记录--------------------------
    // 识别记录
    {
      path: "/recognizerecord",
      name: "recognizerecord",
      component: (resolve) => require(['@/views/historyRecord/recognizeRecord/index'], resolve),
      meta: { keepAlive: false },
    },
    //通行记录
    {
      path: "/throughrecord",
      name: "throughrecord",
      component: (resolve) => require(['@/views/historyRecord/throughRecord/index'], resolve),
      meta: { keepAlive: false },
    },
     //对讲记录
     {
      path: "/talkrecord",
      name: "talkrecord",
      component: (resolve) => require(['@/views/historyRecord/talkRecord/index'], resolve),
      meta: { keepAlive: false },
    },
    //报警记录
    {
      path: "/alarmrecord",
      name: "alarmrecord",
      component: (resolve) => require(['@/views/historyRecord/alarmRecord/index'], resolve),
      meta: { keepAlive: false },
    },


    //----------------------物业服务-------------------------------
    //通知公告
    {
      path: "/notice",
      name: "notice",
      component: (resolve) => require(['@/views/propertyServices/notice/index'], resolve),
      meta: { keepAlive: false },
    },
    //通知公告添加
    {
      path: "/noticeadd",
      name: "noticeadd",
      component: (resolve) => require(['@/views/propertyServices/noticeAdd/index'], resolve),
      meta: { keepAlive: false },
    },
    //房屋报修
    {
      path: "/housingrepair",
      name: "housingrepair",
      component: (resolve) => require(['@/views/propertyServices/housingRepair/index'], resolve),
      meta: { keepAlive: false },
    },
    //物业账单
    {
      path: "/propertybill",
      name: "propertybill",
      component: (resolve) => require(['@/views/propertyServices/propertyBill/index'], resolve),
      meta: { keepAlive: false },
    },
    //投诉举报
    {
      path: "/complaint",
      name: "complaint",
      component: (resolve) => require(['@/views/propertyServices/complaint/index'], resolve),
      meta: { keepAlive: false },
    },
    //处理投诉举报
    {
      path: "/complaintdeal",
      name: "complaintdeal",
      component: (resolve) => require(['@/views/propertyServices/complaintDeal/index'], resolve),
      meta: { keepAlive: false },
    },
     //联系方式repairs
     {
      path: "/contact",
      name: "contact",
      component: (resolve) => require(['@/views/propertyServices/contact/index'], resolve),
      meta: { keepAlive: false },
    },
     //处理报修  处理投诉
     {
      path: "/repairs",
      name: "repairs",
      component: (resolve) => require(['@/views/propertyServices/repairs/index'], resolve),
      meta: { keepAlive: false },
    },
     //添加账单
     {
      path: "/addBill",
      name: "addBill",
      component: (resolve) => require(['@/views/propertyServices/addBill/index'], resolve),
      meta: { keepAlive: false },
    },



    //---------------------报警管理-----------------------------
    //报警记录
    // {
    //   path: "/alarmrecord",
    //   name: "alarmrecord",
    //   component: (resolve) => require(['@/views/alarmManage/alarmRecord/index'], resolve),
    //   meta: { keepAlive: false },
    // },
    


    //-----------------------房屋管理---------------------------
    //基础设置
    {
      path: "/cellset",
      name: "cellset",
      component: (resolve) => require(['@/views/houseManage/cellSet1/index'], resolve),
      meta: { keepAlive: false },
    },
    {
      path: "/cellset1",
      name: "cellset1",
      component: (resolve) => require(['@/views/houseManage/cellSet/index'], resolve),
      meta: { keepAlive: false },
    },
    {
      path: "/callnum",
      name: "callnum",
      component: (resolve) => require(['@/views/houseManage/callNum/index'], resolve),
      meta: { keepAlive: false },
    },
    {
      path: "/serviceset",
      name: "serviceset",
      component: (resolve) => require(['@/views/houseManage/serviceSet/index'], resolve),
      meta: { keepAlive: false },
    },



    //-----------------------用户信息-----------------------------------
    {
      path: "/edituserinfo",
      name: "edituserinfo",
      component: (resolve) => require(['@/views/userInfo/editUserInfo/index'], resolve),
      meta: { keepAlive: false },
    },


    //-----------------------404-----------------------------------
    {
      path: "*",
      name: "notfound",
      component: (resolve) => require(['@/components/notFound'], resolve),
      meta: { keepAlive: false },
    },


   

     
  ]






  
});
//拦截未登录状态访问需登录的路由
router.beforeEach((to, from, next) => {
  // localStorage.setItem("isNoProject",true)
  // if(!localStorage.getItem("isNoProject")){
  //   if(to.path != '/projectmanageadd'){
  //     next('/projectmanageadd')
  //   }else{
  //     next();
  //   }
    
  // }else{
  //   next()
  // }
  next()
  
});

export default router
