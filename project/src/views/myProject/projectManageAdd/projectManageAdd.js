import echarts from 'echarts'
import position from '../../../utils/position.js';
import ligature from '../../../utils/ligature.js';
import newPageSelect from '../../../components/newPageSelect.vue';
export default {
  name: 'home',
  data() {
    return {
      msg: '项目管理',
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        provId: [
          { required: true, message: '请选择省份', trigger: 'change' },
        ],
        cityId: [
          { required: true, message: '请选择城市', trigger: 'change' },
        ],
        areaId: [
          { required: true, message: '请选择区', trigger: 'change' },
        ],

      },
      imageUrl: '',
      title_name:'',
      addPop:true,
      groupName:'',//添加设备分组
      startTime:null,
      tagSta:false,
      addForm:{
        callbackType:[],
        appId:'',
        name: '',//项目名称
        callbackUrl: '',//回调
        properties: '',//属性
        country: '',//国家
        prov: '',//省份
        provId:'',
        city: '',//城市
        cityId:'',
        area:'',//区
        areaId:'',
        address: '',//详细地址
        faceRecogRetainDays: 30,//识别保留天数
        remark: '',//备注
        status: true,//是否启用
        usageScenario:'5',//小区
        openId:'',//车场Id
        openName:'',//车场名称
        isParkRef:'',//是否关联车场
        contacts:'',// 联系人
        tel:'',    //联系方式
        grid:'',
        openSecret:'',
        contacts:'',
        phone:'',
        user:'',
        id:'',
        jnUnitId:'',//单位id
        dwmc:'',//单位名称
        shtyxydm:'',//社会统一信用代码
        dwlxr:'',//单位联系人
        dwdh:'',//单位编号
        dwlb:'',//单位类别 济南字典CODE
        ssfj:'',//所属分局编码
        ssjwq:'',//所属警务区编码
        sspcs:'',//所属派出所编码
        dwdz:'',//单位地址
        isJnRef:0,//是否关联济南 0--不关联 1--关联
      },
      certification:false,//是否启用实名认证
      statusA:false,
      showCheck:false,
      countryOption: [{ name: '中国', id: '中国' }, { name: '海外', id: '海外' }],
      faceRecogRetainDaysOption:[{ name: '一个月', id: 30 }, { name: '三个月', id: 90 }, { name: '六个月', id: 180 }, { name: '一年', id: 365 }],
      howText:'',
      isChina:true,
      position:[],
      prov:[],//省市数据
      city:[],//城市
      area:[],//区
      isRequst:false,
      center: { lng: 113.944198, lat: 22.528774 },
      openBaiduMapDlog:false,  //选取坐标点弹窗
      pointObj:{},
      zoom:18,
    
      //父实例下拉框的数据
      entityPageInfo:{
        pageNum:1,
        pageSize:10,
        total:0,
      },
      //复制值
      copyValue:this.value,
      //父实例下拉框的数据
      entityDataTable:[],
      isShowSpecial:false,
      isShowCertification:false,
      dwlbList:[],//单位类别
      codeList:[],
      isCallbackCode:false,
    }
  },
  props:{
    value:String,
  },
  watch: {
    appId(newFlag){
      this.addForm.appId=newFlag;
    },
    statusA(vle) {
      console.log(vle)
      if(vle == true) {
        this.showCheck = true
        this.addForm.isParkRef = 1
      }else {
        this.showCheck = false
        this.addForm.isParkRef = 0
      }
    },
  },
  filters: {

  },
  created() {
    
  this.position=position;
  if(this.$route.query.type == 2) {
    this.title_name = '编辑'
    let thisData = this.utils.getStore('thisData')
    if(JSON.parse(thisData).openId != '') {
      this.statusA = true
      this.tagSta = true
    }
    console.log(JSON.parse(thisData),'///')
    
  } else if(this.$route.query.type == 1) {
    this.title_name = '新增'
  }
  this.getProv()
  },
  components:{
    appId:{
      get(){
        return this.$store.state.project.projectId
      },
      set(v){
        this.$store.commit('changeProjectId', v)
      }
    },
    newPageSelect
  },
  mounted() {
    if(this.$route.query.type==2){//编辑
      this.addForm=JSON.parse(this.utils.getStore('thisData'));
      this.utils.getStore('thisData')
      this.addForm.provId=JSON.parse(this.utils.getStore('thisData')).provId.toString();
      this.addForm.cityId=JSON.parse(this.utils.getStore('thisData')).cityId.toString();
      this.addForm.areaId=JSON.parse(this.utils.getStore('thisData')).areaId.toString();
      this.addForm.openId=JSON.parse(this.utils.getStore('thisData')).openId.toString();
      this.addForm.openName=JSON.parse(this.utils.getStore('thisData')).openName.toString();
      this.addForm.openSecret=JSON.parse(this.utils.getStore('thisData')).openSecret.toString();
      this.$store.commit("changeAppSecret", this.addForm.openSecret);
      this.$store.commit("changeParkingId", this.addForm.openId);
      this.$store.commit("changeParkingName", this.addForm.openName);
      this.copyValue = this.addForm.openName;
      this.howText='更新';
      if(this.addForm.status==2){
        this.addForm.status=true;
      }else{
        this.addForm.status=false;
      } 
      if(this.addForm.provId){
        this.getProv(this.addForm.provId,1)
      }
      if(this.addForm.cityId){
        this.getProv(this.addForm.cityId,2)
      }
      if('济南市' == this.addForm.city){
        this.isShowSpecial = true;
      }else{
        this.isShowSpecial = false;
      }
      this.addForm.appId = JSON.parse(this.utils.getStore('thisData')).id.toString();
      this.getCompanyInfo();
      // if(null != this.addForm.tbjnUnitEntity){
      //   this.isShowCertification = true;
      //   this.certification = true;
      // }else{
      //   this.isShowCertification = false;
      //   this.certification = false;
      // }
      console.log("初始值",this.addForm);
    }else{
      this.howText='添加';
    }
    //省市
    // this.entityPageSearch();
    // this.realNameVerification();
    this.getDict();
    this.getInterfaceInfo();
  },
  methods: {

    map_handler({ BMap, map }) {
      map.setMapStyleV2({
        styleId: "2d51c6da078eb301aabb3bf0df9ce1bb",
      });
      console.log(BMap, Map);
    },
    //父实例翻页
    parentEntityPageChange(val){
      this.selectPageInfo.pageNum=val;
      this.selectPageSearch();
    },
    openMapLog() {
      this.openBaiduMapDlog = true
    },
    // 选取坐标
    closeDlog() {
      if(this.pointObj != {}) {
        this.addForm.grid = this.pointObj.lat + ',' + this.pointObj.lng
      }
      
      this.openBaiduMapDlog = false
    },
    // 取消选择
    cancelDlog() {
      this.openBaiduMapDlog = false
    },
    // 获取地图上的坐标点
    getMapInfo(point) {
      this.pointObj = point.point;
      if (this.pointObj != {}) {
        this.$message.success("坐标点获取成功");
      }
      console.log(this.pointObj, "point!!");
    },
    //父实例查询
    entityPageSearch(e){
      if(e == undefined){
        e = 1;
      }
      this.utils.http({
        url: "/app/user/parkPage",
        method: "POST",
        data:{
          name:'',
          userId:'',
          page:e,
          pageSize:10
        }
      },
      res => {
        this.isRequst=false;    
        if(res.code==200){
          this.entityDataTable=res.data.records;
          this.entityPageInfo.total=parseInt(res.data.total);
        }else{
          this.$message.error(res.msg);
        }
      });  
    },


    //添加
    addBtn(fromMsg){
      let appSecret = this.$store.state.parking.appSecret;
      let parkingId = this.$store.state.parking.parkingId;
      let parkingName = this.$store.state.parking.parkingName;
      if(this.addForm.status){
        this.addForm.status='2';
      }else{
        this.addForm.status='1';
      }
      if(undefined == this.copyValue){
        appSecret = '';
        parkingId = '';
        parkingName = '';
      }
      this.addForm.openSecret = appSecret;
      this.addForm.openId = parkingId;
      this.addForm.openName = parkingName;
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.isRequst=true;   
          console.log("!!!!!!!<",this.addForm)
          if('' != this.addForm.dwmc){
            this.addForm.tbjnUnitEntity = {};
            this.addForm.tbjnUnitEntity.jnUnitId = this.addForm.jnUnitId;
            this.addForm.tbjnUnitEntity.dwmc = this.addForm.dwmc;
            this.addForm.tbjnUnitEntity.appId = this.addForm.appId;
            this.addForm.tbjnUnitEntity.dwbh = this.addForm.dwbh;
            this.addForm.tbjnUnitEntity.dwdh = this.addForm.dwdh;
            this.addForm.tbjnUnitEntity.shtyxydm = this.addForm.shtyxydm;
            this.addForm.tbjnUnitEntity.dwlxr = this.addForm.dwlxr;
            this.addForm.tbjnUnitEntity.dwlb = this.addForm.dwlb;
            this.addForm.tbjnUnitEntity.ssfj = this.addForm.ssfj;
            this.addForm.tbjnUnitEntity.ssjwq = this.addForm.ssjwq;
            this.addForm.tbjnUnitEntity.sspcs = this.addForm.sspcs;
            this.addForm.tbjnUnitEntity.dwdz = this.addForm.dwdz;
            // this.addForm.tbjnUnitEntity.isJnRef = this.addForm.isJnRef;
          }else{
            this.addForm.tbjnUnitEntity = {};
            this.addForm.tbjnUnitEntity.jnUnitId = '';
            this.addForm.tbjnUnitEntity.dwmc = '';
            this.addForm.tbjnUnitEntity.appId = '';
            this.addForm.tbjnUnitEntity.dwbh = '';
            this.addForm.tbjnUnitEntity.dwdh = '';
            this.addForm.tbjnUnitEntity.shtyxydm = '';
            this.addForm.tbjnUnitEntity.dwlxr = '';
            this.addForm.tbjnUnitEntity.dwlb = '';
            this.addForm.tbjnUnitEntity.ssfj = '';
            this.addForm.tbjnUnitEntity.ssjwq = '';
            this.addForm.tbjnUnitEntity.sspcs = '';
            this.addForm.tbjnUnitEntity.dwdz = '';
          }      
          // for(let i in this.addForm){
          //    if('jnUnitId' == i || 'dwmc' == i || 'appId' == i || 'dwbh' == i || 'dwdh' == i || 'shtyxydm' == i || 'dwlxr' == i || 'dwlb' == i || 'ssfj' == i || 'ssjwq' == i || 'sspcs' == i || 'dwdz' == i){
          //     delete this.addForm[i];
          //    }
          // }
          console.log("!!!!!!!<",this.addForm)
          this.utils.http({
            url: "/app/user/update",
            method: "POST",
            data:this.addForm
          },
          res => {
            this.isRequst=false;    
            if(res.code==200){
              ligature.$emit("addProject",true);
              this.$router.push({
                path:'/projectmanage'
              })
            }else{
              // this.addForm.appId = this.$store.state.project.projectId;
              // this.getCompanyInfo();
            }
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
        }else if(type==2){
          this.area=res.data;
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
      this.addForm.prov=obj.name;
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
      if('济南市' == obj.name){
        this.isShowSpecial = true;
      }else{
        this.isShowSpecial = false;
      }
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
    //获取单位类别 (备注:选择区域为济南时使用)
    getDict(){
      this.utils.http({
        url: "/jn/api/dict",
        method: "GET",
        // params:{id:areaId}
      }, res => {
        console.log("获取单位类别:",res.data)
        this.dwlbList=res.data;
      })
    },
    //监听是否开启实名认证
    certificationChange(e){
      console.log("监听变化:",e);
      if(e){
         this.isShowCertification = true;
         this.addForm.isJnRef = 1;
         this.rules = {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
          provId: [
            { required: true, message: '请选择省份', trigger: 'change' },
          ],
          cityId: [
            { required: true, message: '请选择城市', trigger: 'change' },
          ],
          areaId: [
            { required: true, message: '请选择区', trigger: 'change' },
          ],
          dwmc:[
            { required: true, message: '请输入单位名称', trigger: 'blur' },
          ],
          shtyxydm:[
            { required: true, message: '请输入社会统一信用代码', trigger: 'blur' },
          ],
          dwlxr:[
            { required: true, message: '请输入单位联系人', trigger: 'blur' },
          ],
          dwdh:[
            { required: true, message: '请输入单位电话', trigger: 'blur' },
          ],
          dwlb:[
            { required: true, message: '请选择单位类别', trigger: 'change' },
          ],
          ssfj:[
            { required: true, message: '请输入所属分局编码', trigger: 'blur' },
          ],
          ssjwq:[
            { required: true, message: '请输入所属警务区编码', trigger: 'blur' },
          ],
          ssjwq:[
            { required: true, message: '请输入所属派出所编码', trigger: 'blur' },
          ],
          dwdz:[
            { required: true, message: '请输入单位地址', trigger: 'blur' },
          ]
         }
      }else{
        this.isShowCertification = false;
        this.addForm.isJnRef = 0;
        this.addForm.dwmc = '';
        this.rules = {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
          provId: [
            { required: true, message: '请选择省份', trigger: 'change' },
          ],
          cityId: [
            { required: true, message: '请选择城市', trigger: 'change' },
          ],
          areaId: [
            { required: true, message: '请选择区', trigger: 'change' },
          ],
        }
      }
    },

    //获取单位信息
    getCompanyInfo(){
      // alert(this.addForm.appId)
      this.utils.http({
        url: "/jn/api/info",
        method: "GET",
        params:{appId:this.addForm.appId}
      }, res => {
        console.log("获取单位信息:",res.data)
       if(null != res.data){
          this.isShowCertification = true;
          this.certification = true;
          if('' != res.data.dwmc){
            this.isShowCertification = true;
            this.certification = true;
          }else{
            this.isShowCertification = false;
            this.certification = false;
          }
          this.$set(this.addForm,"jnUnitId", res.data.jnUnitId);
          this.$set(this.addForm,"dwmc", res.data.dwmc);
          this.$set(this.addForm,"dwbh", res.data.dwbh);
          this.$set(this.addForm,"dwdh", res.data.dwdh);
          this.$set(this.addForm,"dwdz", res.data.dwdz);
          this.$set(this.addForm,"dwlb", res.data.dwlb);
          this.$set(this.addForm,"dwlxr", res.data.dwlxr);
          this.$set(this.addForm,"shtyxydm", res.data.shtyxydm);
          this.$set(this.addForm,"ssfj", res.data.ssfj);
          this.$set(this.addForm,"ssjwq", res.data.ssjwq);
          this.$set(this.addForm,"sspcs", res.data.sspcs);
          this.$set(this.addForm,"isJnRef", 1);
          // this.addForm.dwmc = res.data.dwmc;
          // this.addForm.dwbh = res.data.dwbh;
          // this.addForm.dwdh = res.data.dwdh;
          // this.addForm.dwdz = res.data.dwdz;
          // this.addForm.dwlb = res.data.dwlb;
          // this.addForm.dwlxr = res.data.dwlxr;
          // this.addForm.shtyxydm = res.data.shtyxydm;
          // this.addForm.ssfj = res.data.ssfj;
          // this.addForm.ssjwq = res.data.ssjwq;
          // this.addForm.sspcs = res.data.sspcs;
          // this.addForm.isJnRef = 1;
       }else{
        this.isShowCertification = false;
        this.certification = false;
        this.$set(this.addForm,"jnUnitId", '');
        this.$set(this.addForm,"dwmc", '');
        this.$set(this.addForm,"dwbh", '');
        this.$set(this.addForm,"dwdh", '');
        this.$set(this.addForm,"dwdz", '');
        this.$set(this.addForm,"dwlb", '');
        this.$set(this.addForm,"dwlxr", '');
        this.$set(this.addForm,"shtyxydm", '');
        this.$set(this.addForm,"ssfj", '');
        this.$set(this.addForm,"ssjwq", '');
        this.$set(this.addForm,"sspcs", '');
        this.$set(this.addForm,"isJnRef", 0);
        // this.addForm.dwmc = '';
        // this.addForm.dwbh = '';
        // this.addForm.dwdh = '';
        // this.addForm.dwdz = '';
        // this.addForm.dwlb = '';
        // this.addForm.dwlxr = '';
        // this.addForm.shtyxydm = '';
        // this.addForm.ssfj = '';
        // this.addForm.ssjwq = '';
        // this.addForm.sspcs = '';
        // this.addForm.isJnRef = 0;
       }
      })
    },

    //获取回调接口参数
    getInterfaceInfo(){
      this.utils.http({
        url: "/app/user/getInterfaceInfo",
        method: "GET",
        // params:{id:areaId}
      }, res => {
        if(res.data && 0 < res.data.length){
          this.codeList = res.data
          this.isCallbackCode = true;
        }else{
          this.codeList = [];
          this.isCallbackCode = false;
        }
      })
    },

    handleChecked(e){
      console.log(e);
      this.addForm.callbackType = e
    },


    //返回
    goBack() {
      this.$router.push({
        path: '/projectmanage',
      })
    },
  },
}