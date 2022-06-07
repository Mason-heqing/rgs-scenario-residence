"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixin = void 0;
var mixin = {
  data: function data() {
    return {
      options: [{
        value: '7',
        label: '所有'
      }, {
        value: '0',
        label: '未知'
      }, {
        value: '1',
        label: '有胡须'
      }, {
        value: '2',
        label: '无胡须'
      }],
      options1: [{
        value: '7',
        label: '所有'
      }, {
        value: '0',
        label: '未知'
      }, {
        value: '1',
        label: '戴眼镜'
      }, {
        value: '2',
        label: '无眼镜'
      }],
      options2: [{
        value: '7',
        label: '所有'
      }, {
        value: '0',
        label: '未知'
      }, {
        value: '1',
        label: '有口罩'
      }, {
        value: '2',
        label: '无口罩'
      }],
      options3: [{
        value: '7',
        label: '所有'
      }, {
        value: '0',
        label: '未知'
      }, {
        value: '1',
        label: '黄色'
      }, {
        value: '2',
        label: '白色'
      }, {
        value: '3',
        label: '黑色'
      }, {
        value: '4',
        label: '棕色'
      }],
      options4: [{
        value: '0',
        label: '其他'
      }, {
        value: '1',
        label: '广告'
      }, {
        value: '2',
        label: '推销'
      }, {
        value: '3',
        label: '逃犯'
      }],
      options5: [{
        value: '1',
        label: '男性'
      }, {
        value: '2',
        label: '女性'
      }, {
        value: '0',
        label: '未知'
      }],
      options6: [{
        value: '0',
        label: '无'
      }, {
        value: '1',
        label: '一级'
      }, {
        value: '2',
        label: '二级'
      }, {
        value: '3',
        label: '三级'
      }],
      options7: [{
        value: '1',
        label: '有效'
      }, {
        value: '2',
        label: '过期'
      }],
      options8: [{
        value: '0',
        label: '离线'
      }, {
        value: '1',
        label: '在线'
      }],
      testimonyFacilityType: [{
        value: '1',
        label: '未知'
      }, {
        value: '2',
        label: '人脸识别'
      }, {
        value: '3',
        label: '人证比对'
      }, {
        value: '4',
        label: '访客机'
      }, {
        value: '5',
        label: '工地看板'
      }, {
        value: '6',
        label: '人脸抓拍机'
      }],
      options9: [//设备类型
      {
        value: "5",
        label: "抓拍机"
      }, {
        value: "6",
        label: "NVR"
      }],
      options10: [{
        value: "1",
        label: "小轿车"
      }, {
        value: "2",
        label: "suv"
      }, {
        value: "3",
        label: "小货车"
      }, {
        value: "4",
        label: "大货车"
      }],
      options11: [{
        value: "1",
        label: "私家车"
      }, {
        value: "2",
        label: "公务车"
      }, {
        value: "3",
        label: "共享汽车"
      }, {
        value: "4",
        label: "专车"
      }],
      options12: [{
        value: "1",
        label: "白色"
      }, {
        value: "2",
        label: "黑色"
      }, {
        value: "3",
        label: "银色"
      }, {
        value: "4",
        label: "黄色"
      }, {
        value: "5",
        label: "红色"
      }, {
        value: "6",
        label: "绿色"
      }, {
        value: "7",
        label: "蓝色"
      }],
      positionList: [//监控坐标点
      {
        lng: 113.944198,
        lat: 22.528774
      }, {
        lng: 113.945613,
        lat: 22.53064
      }, {
        lng: 113.94536355139878,
        lat: 22.529712896166103
      }],
      showType: [{
        id: 1,
        title: '单屏'
      }, {
        id: 4,
        title: '四屏'
      }, {
        id: 6,
        title: '六屏'
      }],
      treeList: [],
      directionPullDown: [{
        value: '1',
        label: '东区'
      }, {
        value: '2',
        label: '南区'
      }, {
        value: '3',
        label: '西区'
      }, {
        value: '4',
        label: '北区'
      }],
      equipmentType: [{
        value: '1',
        label: '未知'
      }, {
        value: '2',
        label: 'NVR'
      }, {
        value: '3',
        label: 'CAMERA'
      }],
      userCar: [{
        value: '0',
        label: '住户'
      }, {
        value: '1',
        label: '物业'
      }, {
        value: '2',
        label: '访客'
      }],
      vehicleModel: [],
      globalImgPath: '/file/download?path=',
      carTypeList: [],
      aisleJurisdiction: [],
      carParkStatus: '',
      getDady: ''
    };
  },
  methods: {
    getTime: function getTime() {
      // 设置默认时间
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var dateStr = year + "-" + month + "-" + day;
      var h = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
      var m = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
      var s = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
      var hms = h + ':' + m + ':' + s;
      this.getDady = dateStr;
      this.vcrTiemE = dateStr + 'T' + hms;
      console.log(this.getDady, '当前时间');
    },
    // 获取用户是否关联车场
    getUserCarInfo: function getUserCarInfo() {
      var _this = this;

      this.utils.http({
        url: '/park/isBindingPark',
        method: 'GET',
        params: {
          appId: window.localStorage.getItem('appid')
        }
      }, function (res) {
        if (res.code == 200) {
          _this.carParkStatus = res.data.status;
        }

        console.log(_this.carParkStatus, '是否关联停车场!!');
      });
    },
    // 获取车类
    selectCarType: function selectCarType(e) {
      var _this2 = this;

      console.log(e, '车类');
      this.utils.http({
        url: '/monthly/car/charge/info/list',
        method: 'GET',
        params: {
          parkId: window.localStorage.getItem('appid')
        }
      }, function (res) {
        if (res.code == 200) {
          _this2.carTypeList = res.data;
        }

        console.log(res, '车类');
      });
    },
    // 获取车型
    selectEvt: function selectEvt() {
      var _this3 = this;

      this.utils.http({
        url: '/parking/plateNum/getCarType',
        method: 'GET',
        params: {
          appId: window.localStorage.getItem('appid')
        }
      }, function (res) {
        if (res.code == 200) {
          _this3.vehicleModel = res.data;
        }

        console.log(res, '车型');
      });
    },
    // 获取通道权限
    selectUserpermis: function selectUserpermis() {
      var _this4 = this;

      this.utils.http({
        url: '/permission/group/list',
        method: 'GET',
        params: {
          parkId: window.localStorage.getItem('appid')
        }
      }, function (res) {
        if (res.code == 200) {
          _this4.aisleJurisdiction = res.data;
        }

        console.log(res, '通道权限');
      });
    }
  }
};
exports.mixin = mixin;