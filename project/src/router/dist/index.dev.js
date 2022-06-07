"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  linkExactActiveClass: "active",
  mode: 'history',
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    //解决滚动条高度继承问题
    return {
      x: 0,
      y: 0
    };
  },
  routes: [//-----------------首页---------------------
  {
    path: "/",
    name: "home",
    component: function component(resolve) {
      return require(['@/views/home/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------我的项目---------------------
  {
    path: "/projectmanage",
    name: "projectmanage",
    component: function component(resolve) {
      return require(['@/views/myProject/projectManage/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, {
    path: "/projectmanageadd",
    name: "projectmanageadd",
    component: function component(resolve) {
      return require(['@/views/myProject/projectManageAdd/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, {
    path: "/usermsg",
    name: "usermsg",
    component: function component(resolve) {
      return require(['@/views/myProject/userMsg/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-------------------人员管理-----------------------
  //访客管理
  {
    path: "/visitormanage",
    name: "visitormanage",
    component: function component(resolve) {
      return require(['@/views/personManage/visitorManage/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //访客管理-增加
  {
    path: "/visitormanageadd",
    name: "visitormanageadd",
    component: function component(resolve) {
      return require(['@/views/personManage/visitorManageAdd/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //业主管理
  {
    path: "/ownermanage",
    name: "ownermanage",
    component: function component(resolve) {
      return require(['@/views/personManage/ownerManage/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //业主管理-增加
  {
    path: "/ownermanageadd",
    name: "ownermanageadd",
    component: function component(resolve) {
      return require(['@/views/personManage/ownerManageAdd/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //员工管理
  {
    path: "/staffmanage",
    name: "staffmanage",
    component: function component(resolve) {
      return require(['@/views/personManage/staffManage/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //员工管理-增加
  {
    path: "/staffmanageadd",
    name: "staffmanageadd",
    component: function component(resolve) {
      return require(['@/views/personManage/staffManageAdd/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //黑名单
  {
    path: "/blacklist",
    name: "personmanageblacklist",
    component: function component(resolve) {
      return require(['@/views/personManage/blacklist/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-------------------------设备管理-----------------------------
  //通道门禁
  {
    path: "/aisleaccess",
    name: "aisleaccess",
    component: function component(resolve) {
      return require(['@/views/deviceManage/aisleAccess/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //软件管理
  {
    path: "/softmanage",
    name: "softmanage",
    component: function component(resolve) {
      return require(['@/views/deviceManage/softManage/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //对讲门禁
  {
    path: "/talkaccess",
    name: "talkaccess",
    component: function component(resolve) {
      return require(['@/views/deviceManage/talkAccess/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //可视电话
  {
    path: "/visibletel",
    name: "visibletel",
    component: function component(resolve) {
      return require(['@/views/deviceManage/visibleTel/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //访客终端
  {
    path: "/visitorend",
    name: "visitorend",
    component: function component(resolve) {
      return require(['@/views/deviceManage/visitorEnd/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //------------------通行规则-------------------------
  //设备规则
  {
    path: "/devicerules",
    name: "devicerules",
    component: function component(resolve) {
      return require(['@/views/TrafficRules/deviceRules/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //人员规则
  {
    path: "/personrules",
    name: "personrules",
    component: function component(resolve) {
      return require(['@/views/TrafficRules/personRules/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // ----------------------历史记录--------------------------
  // 识别记录
  {
    path: "/recognizerecord",
    name: "recognizerecord",
    component: function component(resolve) {
      return require(['@/views/historyRecord/recognizeRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //通行记录
  {
    path: "/throughrecord",
    name: "throughrecord",
    component: function component(resolve) {
      return require(['@/views/historyRecord/throughRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //对讲记录
  {
    path: "/talkrecord",
    name: "talkrecord",
    component: function component(resolve) {
      return require(['@/views/historyRecord/talkRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //报警记录
  {
    path: "/alarmrecord",
    name: "alarmrecord",
    component: function component(resolve) {
      return require(['@/views/historyRecord/alarmRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //----------------------物业服务-------------------------------
  //通知公告
  {
    path: "/notice",
    name: "notice",
    component: function component(resolve) {
      return require(['@/views/propertyServices/notice/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //通知公告添加
  {
    path: "/noticeadd",
    name: "noticeadd",
    component: function component(resolve) {
      return require(['@/views/propertyServices/noticeAdd/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //房屋报修
  {
    path: "/housingrepair",
    name: "housingrepair",
    component: function component(resolve) {
      return require(['@/views/propertyServices/housingRepair/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //物业账单
  {
    path: "/propertybill",
    name: "propertybill",
    component: function component(resolve) {
      return require(['@/views/propertyServices/propertyBill/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //投诉举报
  {
    path: "/complaint",
    name: "complaint",
    component: function component(resolve) {
      return require(['@/views/propertyServices/complaint/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //处理投诉举报
  {
    path: "/complaintdeal",
    name: "complaintdeal",
    component: function component(resolve) {
      return require(['@/views/propertyServices/complaintDeal/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //联系方式repairs
  {
    path: "/contact",
    name: "contact",
    component: function component(resolve) {
      return require(['@/views/propertyServices/contact/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //处理报修  处理投诉
  {
    path: "/repairs",
    name: "repairs",
    component: function component(resolve) {
      return require(['@/views/propertyServices/repairs/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //添加账单
  {
    path: "/addBill",
    name: "addBill",
    component: function component(resolve) {
      return require(['@/views/propertyServices/addBill/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //---------------------报警管理-----------------------------
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
    component: function component(resolve) {
      return require(['@/views/houseManage/cellSet1/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, {
    path: "/cellset1",
    name: "cellset1",
    component: function component(resolve) {
      return require(['@/views/houseManage/cellSet/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, {
    path: "/callnum",
    name: "callnum",
    component: function component(resolve) {
      return require(['@/views/houseManage/callNum/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, {
    path: "/serviceset",
    name: "serviceset",
    component: function component(resolve) {
      return require(['@/views/houseManage/serviceSet/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  },
  /**人脸布控模块 */
  {
    path: "/seizeRecord",
    name: "seizeRecord",
    component: function component(resolve) {
      return require(['@/views/faceDiscern/seizeRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, {
    path: "/faceSearching",
    name: "faceSearching",
    component: function component(resolve) {
      return require(['@/views/faceDiscern/faceSearching/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // 实时布控
  {
    path: "/realTimeMonitoring",
    name: "realTimeMonitoring",
    component: function component(resolve) {
      return require(['@/views/faceDiscern/realTimeMonitoring/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // 抓拍报警
  {
    path: "/takeEarlyPolice",
    name: "takeEarlyPolice",
    component: function component(resolve) {
      return require(['@/views/faceDiscern/takeEarlyPolice/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // 布控名单
  {
    path: "/deployList",
    name: "deployList",
    component: function component(resolve) {
      return require(['@/views/faceDiscern/deployList/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // 布控设备
  {
    path: "/deployEquipment",
    name: "deployEquipment",
    component: function component(resolve) {
      return require(['@/views/faceDiscern/deployEquipment/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //人证设备
  {
    path: "/testimonyFacility",
    name: "testimonyFacility",
    component: function component(resolve) {
      return require(['@/views/faceDiscern/testimonyFacility/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  },
  /**视频监控模块 */
  {
    path: "/allProjectMsg",
    name: "allProjectMsg",
    component: function component(resolve) {
      return require(['@/views/allProjectMsg/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, {
    path: "/videoMonitor",
    name: "videoMonitor",
    component: function component(resolve) {
      return require(['@/views/videoMonitoring/videoMonitor/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // 添加监控设备
  {
    path: "/monitorEquipment",
    name: "monitorEquipment",
    component: function component(resolve) {
      return require(['@/views/videoMonitoring/monitorEquipment/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // 监控视频回放
  {
    path: "/videoPlayback",
    name: "videoPlayback",
    component: function component(resolve) {
      return require(['@/views/videoMonitoring/videoPlayback/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, {
    path: "/vcrList",
    name: "vcrList",
    component: function component(resolve) {
      return require(['@/views/videoMonitoring/vcrList/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // 车辆记录页面
  {
    path: "/vehicleRecord",
    name: "vehicleRecord",
    component: function component(resolve) {
      return require(['@/views/vehicleManagement/vehicleRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // 车辆登记页面
  {
    path: "/vehicleRegister",
    name: "vehicleRegister",
    component: function component(resolve) {
      return require(['@/views/vehicleManagement/vehicleRegister/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------------用户信息-----------------------------------
  //  所有项目页面
  {
    path: "/edituserinfo",
    name: "edituserinfo",
    component: function component(resolve) {
      return require(['@/views/userInfo/editUserInfo/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------------404-----------------------------------
  {
    path: "*",
    name: "notfound",
    component: function component(resolve) {
      return require(['@/components/notFound'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // -----------------停车场模块区域--------------------
  //-----------------云停车首页---------------------
  {
    path: "/smartParkingDashboard",
    name: "smartParkingDashboard",
    component: function component(resolve) {
      return require(['@/views/parkingLot/smartParkingDashboard/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------车场管理---------------------
  //车场管理
  {
    path: "/parkManager",
    name: "parkManager",
    component: function component(resolve) {
      return require(['@/views/parkingLot/parkingManage/parkingManage/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //添加车场
  {
    path: "/parkingmanageadd",
    name: "parkingmanageadd",
    component: function component(resolve) {
      return require(['@/views/parkingLot/parkingManage/parkingManageAdd/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //开通支付
  {
    path: "/payment",
    name: "payment",
    component: function component(resolve) {
      return require(['@/views/parkingLot/parkingManage/payment/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------设备管理---------------------
  {
    path: "/deviceManger",
    name: "deviceManger",
    component: function component(resolve) {
      return require(['@/views/parkingLot/deviceManger/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------车俩设置---------------------
  //车辆管理
  {
    path: "/carManager",
    name: "carManager",
    component: function component(resolve) {
      return require(['@/views/parkingLot/vehicleSetup/carManager/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //车位组管理
  {
    path: "/carGroupManager",
    name: "carGroupManager",
    component: function component(resolve) {
      return require(['@/views/parkingLot/vehicleSetup/parkingGroupManagement/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //黑名单管理
  {
    path: "/blackManger",
    name: "blackManger",
    component: function component(resolve) {
      return require(['@/views/parkingLot/vehicleSetup/blackManger/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------访客信息---------------------
  //访客车辆管理
  {
    path: "/vistorCarManager",
    name: "vistorCarManager",
    component: function component(resolve) {
      return require(['@/views/parkingLot/visitorInformation/vistorCarManager/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------记录查询---------------------
  //在场车辆
  {
    path: '/vehicleOn',
    name: 'vehicleOn',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/vehicleOn/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //进出记录
  {
    path: '/inOrOutRecord',
    name: 'inOrOutRecord',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/inOrOutRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //临时车缴费
  {
    path: '/tempCarPay',
    name: 'tempCarPay',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/tempCarPay/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //储值车缴费
  {
    path: '/storeCarPay',
    name: 'storeCarPay',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/storeCarPay/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //月租车续费
  {
    path: '/monthCarPay',
    name: 'monthCarPay',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/monthCarPay/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //储值车充值
  {
    path: '/storeCarRechange',
    name: 'storeCarRechange',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/storeCarRechange/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //手动抬杆记录
  {
    path: '/manualBarRecord',
    name: 'manualBarRecord',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/manualBarRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //异常放行记录
  {
    path: '/abnormalRecord',
    name: 'abnormalRecord',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/abnormalRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //修改车牌记录
  {
    path: '/upVehRecord',
    name: 'upVehRecord',
    component: function component(resolve) {
      return require(['@/views/parkingLot/recordQuery/upVehRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------报表查询---------------------
  //值班报表
  {
    path: '/dutyReport',
    name: 'dutyReport',
    component: function component(resolve) {
      return require(['@/views/parkingLot/reportQuery/dutyReport/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //日报表
  {
    path: '/dailyReport',
    name: 'dailyReport',
    component: function component(resolve) {
      return require(['@/views/parkingLot/reportQuery/dailyReport/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //月报表
  {
    path: '/monthReport',
    name: 'monthReport',
    component: function component(resolve) {
      return require(['@/views/parkingLot/reportQuery/monthReport/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //车场收入汇总报表
  {
    path: '/revenueReport',
    name: 'revenueReport',
    component: function component(resolve) {
      return require(['@/views/parkingLot/reportQuery/revenueReport/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //通行报表
  {
    path: '/trafficReport',
    name: 'trafficReport',
    component: function component(resolve) {
      return require(['@/views/parkingLot/reportQuery/trafficReport/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------统计分析---------------------
  //临时车收入分析
  {
    path: '/tempCarAnalysis',
    name: 'tempCarAnalysis',
    component: function component(resolve) {
      return require(['@/views/parkingLot/statisticalAnalysis/tempCarAnalysis/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //储值车收入分析
  {
    path: '/storecarAnalysis',
    name: 'storecarAnalysis',
    component: function component(resolve) {
      return require(['@/views/parkingLot/statisticalAnalysis/storecarAnalysis/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //月租车收入分析
  {
    path: '/monthCarAnalysis',
    name: 'monthCarAnalysis',
    component: function component(resolve) {
      return require(['@/views/parkingLot/statisticalAnalysis/monthCarAnalysis/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //周转率收入分析
  {
    path: '/turnoverAnalysis',
    name: 'turnoverAnalysis',
    component: function component(resolve) {
      return require(['@/views/parkingLot/statisticalAnalysis/turnoverAnalysis/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //车流分析
  {
    path: '/trafficAnalysis',
    name: 'trafficAnalysis',
    component: function component(resolve) {
      return require(['@/views/parkingLot/statisticalAnalysis/trafficAnalysis/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //停车时长分析
  {
    path: '/parkTimeAnalysis',
    name: 'parkTimeAnalysis',
    component: function component(resolve) {
      return require(['@/views/parkingLot/statisticalAnalysis/parkTimeAnalysis/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //异常分析
  {
    path: '/exceptionAnalysis',
    name: 'exceptionAnalysis',
    component: function component(resolve) {
      return require(['@/views/parkingLot/statisticalAnalysis/exceptionAnalysis/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // //-----------------订单管理---------------------
  //  //订单查询
  {
    path: "/orderList",
    name: "orderList",
    component: function component(resolve) {
      return require(['@/views/parkingLot/orderListManage/orderInquiry/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // //订单统计
  {
    path: "/orderStatics",
    name: "orderStatics",
    component: function component(resolve) {
      return require(['@/views/parkingLot/orderListManage/reconciliationStatistics/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //线上支付订单
  {
    path: "/onlinePayOrder",
    name: "onlinePayOrder",
    component: function component(resolve) {
      return require(['@/views/parkingLot/orderListManage/orderInquiry/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // //线上支付兑帐
  {
    path: "/onlinePayRecon",
    name: "onlinePayRecon",
    component: function component(resolve) {
      return require(['@/views/parkingLot/orderListManage/reconciliationInquiry/veriftyList/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //兑帐查询-查看明细
  {
    path: "/transactionDetails",
    name: "transactionDetails",
    component: function component(resolve) {
      return require(['@/views/parkingLot/orderListManage/reconciliationInquiry/transactionDetails'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //-----------------返佣管理---------------------
  //开户返佣
  {
    path: "/openReward",
    name: "openAccount",
    component: function component(resolve) {
      return require(['@/views/parkingLot/commissionManage/openAccount/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //返佣修改记录
  {
    path: "/reviseRecord",
    name: "reviseRecord",
    component: function component(resolve) {
      return require(['@/views/parkingLot/commissionManage/reviseRecord/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //返佣修改记录
  {
    path: "/seeDetails",
    name: "seeDetails",
    component: function component(resolve) {
      return require(['@/views/parkingLot/commissionManage/seeDetails/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //支付返佣
  {
    path: "/payReward",
    name: "payCommission",
    component: function component(resolve) {
      return require(['@/views/parkingLot/commissionManage/payCommission/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, //物料返佣
  {
    path: "/materialReward",
    name: "materielCommission",
    component: function component(resolve) {
      return require(['@/views/parkingLot/commissionManage/materielCommission/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }, // {
  //   path: "/projectmanage",
  //   name: "projectmanage",
  //   component: (resolve) => require(['@/views/myProject/projectManage/index'], resolve),
  //   meta: { keepAlive: false },
  // },
  // {
  //   path: "/projectmanageadd",
  //   name: "projectmanageadd",
  //   component: (resolve) => require(['@/views/myProject/projectManageAdd/index'], resolve),
  //   meta: { keepAlive: false },
  // },
  {
    path: "/usermsg",
    name: "usermsg",
    component: function component(resolve) {
      return require(['@/views/parkingLot/myProject/userMsg/index'], resolve);
    },
    meta: {
      keepAlive: false
    }
  }]
}); //拦截未登录状态访问需登录的路由

router.beforeEach(function (to, from, next) {
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
  next();
});
var _default = router;
exports["default"] = _default;