import echarts from 'echarts'
import position from '../../../utils/position.js';
import ligature from '../../../utils/ligature.js';
export default {
  name: 'home',
  data() {
    return {
      mapX:"",
      mapY:"",
      loadingMap: true,
      BMap: "",
      map: "",
      geoc: "",
      showMap: false,
      addressKeyword: "",
      pointLngLat: "",
      center: { lng: 109.45744048529967, lat: 36.49771311230842 },
      zoom: 13,
      mapZoom: 13,
      mapCenter: { lng: 0, lat: 0 },
      mapLocation: {
        address: undefined,
        coordinate: undefined
      },
      msg: '项目管理',
      rules: {
        // currPayChannelId: [
        //   { required: true, message: '请选择渠道', trigger: 'change' },
        // ],
        name: [
          { required: true, message: '请输入车场名称', trigger: 'blur' },
          {max: 48, message: '车场名称长度不能超过48个字符', trigger: 'blur' }
        ],
        parkType: [
          { required: true, message: '请选择车场业态', trigger: 'change' },
        ],
        provId: [
          { required: true, message: '请选择省份', trigger: 'change' },
        ],
        cityId: [
          { required: true, message: '请选择城市', trigger: 'change' },
        ],
        address:[
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        grid:[
          { required: true, message: '请添加坐标'},
        ]
      },
      abc:false,
      imageUrl: '',
      addPop:false,
      groupName:'',//添加设备分组
      startTime:null,

      addForm:{
        // currPayChannelId:'',//所属渠道
        name:'',//车场名称
        parkType:'',//车场业态
        contacts:'',//联系人
        tel:'',//联系电话
        province: '',//省份
        provId:'',
        city: '',//城市
        cityId:'',
        address:'',//详细地址
        grid:""//坐标
      },
      currPayChannelId:[{ name: '渠道一', id: '1' }, { name: '渠道二', id: '2' }],
      parkType:[
        { name: '住宅', id: '0' },
        { name: '办公', id: '1' },
        { name: '商业', id: '2' },
        { name: '商住', id: '3' },
        { name: '文体 ', id: '5' },
        { name: '专用 ', id: '6' },
        { name: '货运  ', id: '7' },
        { name: '交通枢纽 ', id: '8' },
        { name: '其它 ', id: '9' },
      ],
      payChannelListData:[],
      howText:'',
      isChina:true,
      position:[],
      prov:[],//省市数据
      city:[],//城市
      area:[],//区
      isRequst:false,
      // popVisible:false,//弹框提示信息
      popTitle:'',
      popContent:'',
    }
  },
  watch: {

  },
  filters: {

  },
  created() {
    this.position=position;
    this.getProv();
    // this.getpayChannelListData();
  },
  mounted() {
    if(this.$route.query.type==2){//编辑
      this.howText='更新';
      this.addForm=JSON.parse(this.utils.getStore('thisData'));
      this.addForm.enabled = 1;
      this.addForm.provId=JSON.parse(this.utils.getStore('thisData')).provId.toString();
      this.addForm.cityId=JSON.parse(this.utils.getStore('thisData')).cityId.toString();
      this.addForm.parkType=JSON.parse(this.utils.getStore('thisData')).parkType.toString();
      this.mapX = JSON.parse(this.utils.getStore('thisData')).grid.toString().split(',')[0];
      this.mapY = JSON.parse(this.utils.getStore('thisData')).grid.toString().split(',')[1];
      // this.addForm.provId=JSON.parse(this.utils.getStore('thisData')).provId.toString();
      // this.addForm.cityId=JSON.parse(this.utils.getStore('thisData')).cityId.toString();
      // this.addForm.areaId=JSON.parse(this.utils.getStore('thisData')).areaId.toString();
      // this.addForm.payChannelId = JSON.parse(this.utils.getStore('thisData')).payChannelId.toString();
      // if(this.addForm.status==2){
      //   this.addForm.status=true;
      // }else{
      //   this.addForm.status=false;
      // } 
      if(this.addForm.provId){
        this.getProv(this.addForm.provId,1)
      }
      // if(this.addForm.cityId){
      //   this.getProv(this.addForm.cityId,1)
      // }
      
    }else{
      this.howText='添加';
    }
    //省市
    
   },
  methods: {
    //添加
    addBtn(fromMsg){
      if(this.addForm.status){
        this.addForm.status='2';
      }else{
        this.addForm.status='1';
      }
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.isRequst=true;
          this.utils.http({
            url: "/park/update",
            method: "POST",
            data:this.addForm
          },
          res => {
            this.isRequst=false;    
            if(res.code==200){
              ligature.$emit("addProject",true);
              this.$router.push({
                path:'/parkManager'
              })
            };
            
          });  
        }
      })
    },
    //获取省份/area/areas
    getProv(id,type){
      var areaId
      id? areaId=id:'';
      this.utils.http({
        url: "/area/areas",
        method: "GET",
        params:{id:areaId}
      }, res => {
        if(type==1){
          this.city=res.data;
        }else{
          this.prov=res.data;
        }
        
      })
    },

    //省份改变
    changeProv(e){
      let obj = {};
      obj = this.prov.find((item)=>{
        return item.id == e;
      });
      this.addForm.province=obj.name;
      this.getProv(e,1);
      this.addForm.cityId='';
      this.addForm.areaId='';
    },
    //城市改变
    changeCity(e){
      let obj = {};
      obj = this.city.find((item)=>{
        return item.id == e;
      });
      this.addForm.city=obj.name;
      this.getProv(e,2)
      this.addForm.areaId='';
    },
    //区改变
    changeArea(e){
      let obj = {};
      obj = this.area.find((item)=>{
        return item.id === e;
      });
      this.addForm.area=obj.name;
    },

    //获取支付渠道
    getpayChannelListData(){
      this.utils.http({
        url: "/park/organizationList",
        method: "GET",
        // params: {appId:this.appId}
        // params: {appId:nice}
      },
      res => {
        if(res.code==200){
          console.log("获取渠道信息----》",res);
          this.realTimeList=res.data;
          if(0 < res.data.length){
             this.currPayChannelId = res.data
          }
        }
        
      });  
    },

    //返回
    goBack() {
      this.$router.push({
        path: '/parkManager',
      })
    },

    handler({ BMap, map }) {
      this.mapOpen();
      this.BMap = BMap;
      this.map = map;
      this.loadingMap = true;
      var geolocation = new BMap.Geolocation();
      this.geoc = new BMap.Geocoder(); // 地址解析对象
      var $this = this;
      // 调用百度地图api 中的获取当前位置接口

      geolocation.getCurrentPosition(function (r) {
        let myGeo = new BMap.Geocoder();
        myGeo.getLocation(
          new BMap.Point(r.point.lng - 0.089, r.point.lat - 0.0245),
          function (result) {
            if (result) {
              $this.loadingMap = false;
              console.log(result);
              // $this.coordinateX = result.point.lat;
              // $this.coordinateY = result.point.lng
              if("" != $this.addForm.grid){
                $this.$set($this, "pointLngLat", {
                  lng: $this.mapX,
                  lat: $this.mapY,
                }); 
              }else{
                $this.$set($this, "pointLngLat", {
                  lng: result.point.lng,
                  lat: result.point.lat,
                });
              }
              
              map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放,默认关闭
              $this.addPoint({ BMap, map });
            }
          }
        );
      });
    },
    // 添加点位
    addPoint({ BMap, map }) {
      map.clearOverlays();
      var point = new BMap.Point(this.pointLngLat.lng, this.pointLngLat.lat);
      let zoom = map.getZoom();
      console.log("zoom:" + zoom);
      setTimeout(() => {
        map.centerAndZoom(point, zoom);
      }, 0);
      // var marker = new BMap.Marker(point); // 创建标注
      // map.addOverlay(marker); // 将标注添加到地图中
    },
    // 点击地图
    getClickInfo(e) {
      console.log(e);
      this.center = { lng: e.point.lng, lat: e.point.lat };
      this.pointLngLat = { lng: e.point.lng, lat: e.point.lat };
      // 获取点位信息
      let $this = this;
      this.geoc.getLocation(e.point, function (rs) {
        console.log("获取经纬度----》", rs.point);
        // alert(rs.point);
        $this.mapX = rs.point.lng;
        $this.mapY = rs.point.lat;
        var addComp = rs.addressComponents;
        $this.pointAddress =
          addComp.province +
          addComp.city +
          addComp.district +
          addComp.street +
          addComp.streetNumber;
        console.log($this.pointAddress);
      });
    },
    // 地图相关
    mapOpen() {
      this.top = this.getScrollTop();
      if (this.top) {
        this.setScrollTop(0);
      }
    },
    // 关闭地图后调用
    mapClose() {
      this.setScrollTop(this.top);
      this.top = 0;
      this.showMap = false;
    },
    getScrollTop() {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    setScrollTop(top) {
      if (!isNaN(top)) {
        if (
          document.documentElement &&
          document.documentElement.scrollTop !== undefined
        ) {
          document.documentElement.scrollTop = top;
        } else if (document.body) {
          document.body.scrollTop = top;
        }
      }
    },
     querySearch(queryString, cb) {
      var that = this
      var myGeo = new this.BMap.Geocoder()
      myGeo.getPoint(queryString, function(point) {
        if (point) {
          that.mapLocation.coordinate = point
          // that.makerCenter(point)
        } else {
          that.mapLocation.coordinate = null
        }
      }, this.locationCity)
      var options = {
        onSearchComplete: function(results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = []
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i)
              var item = { value: x.address + x.title, point: x.point }
              s.push(item)
              cb(s)
            }
          } else {
            cb()
          }
        }
      }
      var local = new this.BMap.LocalSearch(this.map, options)
      local.search(queryString)
    },
    handleSelect(item) {
      var { point } = item
      this.mapLocation.coordinate = point
      // this.makerCenter(point)
      this.addressKeyword = this.mapLocation.address;
      this.mapX = point.lng;
      this.mapY = point.lat;
    },

    //关闭弹框
    close(){
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)
    },

    //添加坐标
    addCoordinate(){
      this.addPop = true;
      if("" != this.addForm.grid){
         
      }
    },

    //确定经纬度
    subCoordinate(){
      if("" == this.mapX){
        this.popTitle="提示";
        this.popContent="请选择坐标";
        this.popVisible=true;
        close();
      }else{
        this.addForm.grid = this.mapX + "," + this.mapY;
        this.addPop = false;
      }
    }

  },
}