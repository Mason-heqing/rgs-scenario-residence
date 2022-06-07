import {mixin} from '../../../utils/mixin'
export default {
  mixins:[mixin],
  name: 'home',
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号'));
        }else{
          callback();
        }
      } else {
        callback(new Error('请输入手机号'));
      }
    };
    return {
      msg: '项目管理',
      statusType:null,
      isPast:'',
      isRealName:false,
      addPersonForm: {
        appId:'',//	string应用id
        faceUrl:'',//	string 头像
        houseList:[],//房屋住户列表
        icNum:'',//	stringIC卡号
        id:'',//	string员工id
        idNum:'',//	string证件号
        personName:'',//	string员工姓名
        phone:'',//	string手机号
        remark:'',//	string备注  
        plateNumInfoList:[]//车牌信息
      },
      carTypeList:[], //车类
      carList:{
        carModelInfoId:'',//车型
        carTypeInfoId:'',//车类
        personCarType:'0',//车辆用户
        plateNo:'',//车牌号
        vehicleColor:'',//车辆颜色，
        permissionGroupId:'',
        id:''
      },

      rules: {
        personName: [
          { required: true, message: '请输入住户姓名', trigger: 'blur' },
        ],
        phone: [
          { validator: validatePhone,trigger: 'blur' }
        ],
        idNum:[
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ]
    
      },
      imageUrl: '',
      addPop:true,
      showIn:1,
      groupName:'',//添加设备分组
      startTime:null,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: []
      }],
      value:true,//启用状态开关
      data: [],//权限树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      addPopVisible:false,//添加房屋
      uploadData:{
        appId:''
      },
      carTitle:'添加车辆',
      images:[],
      imgurl:'',
      cascaderData:[],//房屋树形结构
      groupProps: {
        children:'groups',
        label:'name',
        value:'id',
        expandTrigger: 'hover'
      },
      addHouseForm:{
        effectiveTime:'',//有效期
        liveStatus:1,//居住状态
        personSubtype:'',//住户身份
        houseId:'',//房号id
        personDeviceBingId:'',//绑定Id
        type:1,//类型;1添加2修改3删除
      },
      popRules: {
        effectiveTime: [
          { required: true, message: '请选择有效期', trigger: 'change' },
        ],
        personSubtype: [
          { required: true, message: '请选择住户身份', trigger: 'change' },
        ],
        deviceGroupId: [
          { required: true, message: '请选择房屋', trigger: 'change' },
        ],  
      },
      pickerOptions: {//时间快捷键
        disabledDate(time) {
          return time.getTime() <= (Date.now()-(24 * 60 * 60 * 1000));
        },
        shortcuts: [{
          text: '一个月',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24*30);
            picker.$emit('pick', date);
          }
        }, {
          text: '半年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24*183);
            picker.$emit('pick', date);
          }
        }, {
          text: '一年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
            picker.$emit('pick', date);
          }
        }, {
          text: '永久',
          onClick(picker) {
            const date = new Date();
            let month =date.getMonth()+1;
            let ri=date.getDate();
            if(month<10){
              month='0'+month
            }
            if(ri<10){
              ri='0'+ri
            }
            // date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
            picker.$emit('pick', '9999-'+month+'-'+ri+' '+'00:'+'00:'+'00');
          }
        }]
      },
      dialogVehicleInfo:false,
      personType:[{
        value: 1,
        label: '户主'
      },{
        value: 2,
        label: '家庭成员'
      },{
        value: 3,
        label: '租客'
      },{
        value: 5,
        label: '其他'
      }],
      isEdit:true,//添加还是修改
      currentIndex:0,//修改表格的index
      deleteArr:[],//删除人员的数组
      editOrAdd:'添加',
      isRequst:false,
      witnessDeviceList:[],
      timer:null,
      timeout:45000,
      currentToken:'',
      witnessValue:'',
      tipsInfo:'',
      isInit:true,
      localStorageDeviceId:'',
      isshowDeviceList:false
    }
  },
  computed: {
    appId:{
      get(){
        return this.$store.state.project.projectId
      },
      set(v){
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch:{
    appId(newFlag, oldFlag){
      this.appId=newFlag;
      this.addPersonForm.appId=newFlag;
      this.uploadData.appId=newFlag;
      this.getLeftData();
      // this.uploadData.appId=newFlag;
      // this.getGroup();
      // this.getBuildingUnit();

      //重新订阅
      // this.socketApi.websocketclose();
      // clearInterval(this.timer);
      // this.socketApi.initWebSocket();
      // this.websocketToLogin();
    }
  },
  filters: {
    clTime: function(time) {
      return time.split(" ")[0];
    }
  },
  created() {
    this.imgurl = this.tools.global.API_URL;
    // this.getUserCarInfo();
    // this.selectCarType();
    // this.selectEvt();
    // this.selectUserpermis();


  },
  mounted() {
    this.addPersonForm.appId=this.appId;
    this.uploadData.appId=this.appId;
    this.getLeftData();
    this.realNameVerification();
    if(this.$route.query.type==2){//编辑
      this.carTitle = '编辑车辆'
      this.addPersonForm=JSON.parse(this.utils.getStore('ownerMsg'));
      this.editOrAdd='住户编辑';
      if(this.addPersonForm.faceUrl){
        this.images=this.addPersonForm.faceUrl.split(',')
      }
      this.statusType = 2;
    }else if(this.$route.query.type==3){
      this.editOrAdd='住户审核编辑';
      let data = JSON.parse(this.utils.getStore('ownerMsg'));
      this.getCheckPersonInfo(data);
    }

    this.getDeviceIdList();
  },
  destroyed(){
    if('' != this.witnessValue){
      this.unsubscribeInfo();
    }
    if('' != this.witnessValue){
      clearInterval(this.timer);
      this.socketApi.websocketclose();
    }
  },
  methods: {
    //.....................websocket start ........................ 

    // 心跳检测 每隔一段时间主动推送 证明客户端活着
    heartCheckStart() {
      this.timer = setInterval(() => {
        let date=new Date();
        let HeartBeat={
          type:"WS_HEARTBEAT",
          requestId:this.utils.getUUID(),
          timestamp:this.utils.formatTimestamp(date),
          token:this.currentToken,
        }
        this.socketApi.sendSock(HeartBeat, this.getConfigResult)
      }, this.timeout)
      
    },

    //接受消息
    getConfigResult (res) {
      // 接收回调函数返回数据的方法
      // console.log(res)
      const that = this;
      if(res.type=='WS_REGISTER'){
        console.log('注册成功')
        if(this.isInit){
          that.websocketGetData();
          that.heartCheckStart();
          this.isInit = false;
        }
      }else if(res.type=='WS_PUBLISH_IDENTITY'){
        console.log("返回人证信息:",res.body);
        that.rultInit();
        that.addPersonForm.personName = res.body.personName;
        that.addPersonForm.idNum = res.body.personIdNum;
        // that.images = [res.body.snapPic];
        that.picClipping(res.body.snapPic);
        that.$refs.addPersonForm.clearValidate(['personName']);
        that.$refs.addPersonForm.clearValidate(['idNum']);
      
      }else if('SUCCESS' != res.code && res.type=='WS_SUBSCRIBE_IDENTITY'){
        that.$message.error(res.msg);
        that.unsubscribeInfo();
         clearInterval(this.timer);
         that.socketApi.websocketclose();
      }else if('SUCCESS' == res.code && res.type=='WS_SUBSCRIBE_IDENTITY'){
        let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        that.tipsInfo = "["+ hh + ":" + mf + ":" + ss + "]" + "请在设备上刷身份证"
        that.localStorageDeviceId = that.witnessValue
      }else if('SUCCESS' == res.code && res.type=='WS_UNSUBSCRIBE_IDENTITY'){
        that.addPersonForm.personName = '';
        that.addPersonForm.idNum = '';
        that.images = [];
        that.rultInit();
      }  
    },
    //注册
    websocketToLogin () {
      let date=new Date();
      let HeartBeat={
        type:"WS_REGISTER",
        requestId:this.utils.getUUID(),
        timestamp:this.utils.formatTimestamp(date),
        token:this.currentToken,
      }
    //  var cmd = JSON.stringify(HeartBeat);
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
      this.socketApi.sendSock(HeartBeat, this.getConfigResult)
    },
    //订阅实时记录
    websocketGetData(){
      var deviceId=this.witnessValue
      let date=new Date();
      let HeartBeat={
        type:"WS_SUBSCRIBE_IDENTITY",
        requestId:this.utils.getUUID(),
        timestamp:this.utils.formatTimestamp(date),
        token:this.currentToken,
        body: {
          deviceId: deviceId
        }
      }
    //  var cmd = JSON.stringify(HeartBeat);
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
      this.socketApi.sendSock(HeartBeat, this.getConfigResult)
    },  

    //取消订阅人证信息
    unsubscribeInfo(){
      var deviceId=this.localStorageDeviceId;
      let date=new Date();
      let HeartBeat={
        type:"WS_UNSUBSCRIBE_IDENTITY",
        requestId:this.utils.getUUID(),
        timestamp:this.utils.formatTimestamp(date),
        token:this.currentToken,
        body: {
          deviceId: deviceId
        }
      }
      //  var cmd = JSON.stringify(HeartBeat);
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
      this.socketApi.sendSock(HeartBeat, this.getConfigResult)
    },


  //.....................websocket end ........................  


    //读取人证信息
    readInfo(){
      if('' != this.witnessValue){
        this.currentToken=this.utils.getUUID();
        this.socketApi.initWebSocket();
        this.websocketToLogin();
        // this.getInstrumentMsg();
      }else{
        this.$message.error('请选择人证设备');
      } 
    },


    //校验初始化
    rultInit(){
      let validatePhone = (rule, value, callback) => {
        if (value) {
          if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
            callback(new Error('请输入正确的手机号'));
          }else{
            callback();
          }
        } else {
          callback(new Error('请输入手机号'));
        }
      };
      this.rules={
        personName: [
          { required: true, message: '请输入住户姓名', trigger: 'blur' },
        ],
        phone: [
          { validator: validatePhone,trigger: 'blur' }
        ],
        idNum:[
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ]
    
      };
    }, 


    //图片裁剪
    picClipping(img){
      this.utils.http({
        url: "/file/person/clipping?appId="+this.appId+"&fileUrl="+img,
        method: "POST",
      },
      res => {
        if(res.code==200){
          this.images = res.data
        }else{
          this.images = []
        }
      });  
    },

    


    //上传之前
    beforeAvatarUpload(file){
      let types = ['image/jpeg', 'image/jpg', 'image/png','image/bmp'];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 5;
      console.log(file.size)
      if (!isImage) {
        this.$message.error('格式不支持');
        return false
      }
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 5MB!');
        return false
      }
    },
    //上传成功
    successCheck(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
          if (this.images.length < 1) {
              response.data.forEach((item,index)=>{
                this.images.push(item)
              })
          } else {
              this.utils.tip("warning", '文件个数超出');
          }
      } else {
          this.utils.tip("warning", response.msg);
      }
  },
  uploadErr(err, file, fileList){
    this.$message.error('上传失败');
  },
  //删除图片
  remove(index) {
      this.images.splice(index, 1);
  },
  //添加
  addPersonBtn(fromMsg){
    this.$refs[fromMsg].validate((valid) => {
      if(valid){
          this.isRequst=true;
          this.addPersonForm.faceUrl=this.images.join();
          this.addPersonForm.houseList=this.addPersonForm.houseList.concat(this.deleteArr)
          if(this.isRealName){
            if('' == this.addPersonForm.faceUrl){
              this.isRequst=false;
              return this.$message.error('请先添加人脸头像')
            }
          }
          if(this.addPersonForm.houseList.length == 0) {
            this.isRequst=false;
            return this.$message.error('请先添加房屋信息')
          }
          this.utils.http({
            url: "/person/resident/addOrUpdate",
            method: "POST",
            data: this.addPersonForm
          },
          res => {
            this.isRequst=false;
            if(res.code=='200'){
               this. addPersonForm={
                appId:this.appId,//	string应用id
                faceUrl:'',//	string 头像
                houseList:[],//房屋住户列表
                icNum:'',//	stringIC卡号
                id:'',//	string员工id
                idNum:'',//	string证件号
                personName:'',//	string员工姓名
                phone:'',//	string手机号
                remark:'',//	string备注  
                plateNumInfoList:[]//车牌信息
              }
              this.images = [];
              // this.getDeviceIdList();
              // this.$router.push({
              //   path:'/ownermanage'
              // })
            }
          });  
      }
    })
  },


  //住户审核编辑信息查询
  getCheckPersonInfo(info){
    let bindStatus;
    if(info.bindStatus == 9){
      bindStatus = 9;
      this.isPast = 9
    }else{
      bindStatus = 4;
      this.isPast = 4
    }
    this.utils.http({
      url: "/person/resident/checkPersonInfo",
      method: "POST",
      data: {
        bindStatus:bindStatus,
        personDeviceGroupId:info.id,
        personId:info.personId,
      }
    },
    res => {
      if(res.code=='200'){
        this.addPersonForm=res.data;
        if(this.addPersonForm.faceUrl){
          this.images=this.addPersonForm.faceUrl.split(',')
        }
        if('' != this.addPersonForm.personName){
          this.$nextTick(()=>{
            this.$refs.addPersonForm.clearValidate('personName')
          })
        }
        if('' != this.addPersonForm.phone){
          this.$nextTick(()=>{
            this.$refs.addPersonForm.clearValidate('phone')
          })
        }
        if('' != this.addPersonForm.idNum){
          this.$nextTick(()=>{
            this.$refs.addPersonForm.clearValidate('idNum')
          })
        }
      }
    }); 
  },

  //审核用户并保存信息
  checkPerson(status){
    this.addPersonForm.checkStatus = status;
    this.utils.http({
      url: "/person/resident/checkPerson",
      method: "POST",
      data:this.addPersonForm
    },
    res => {
      if(res.code=='200'){
        if(0 == status){
          this.utils.tip('success', '审核通过成功');
        }else{
          this.utils.tip('success', '审核拒绝成功');
        }
        setTimeout(()=>{
          this.$router.push({
            path: '/ownermanage',
          })
        },2000)
        
      }
    }); 
  },


    
  // 添加住户车牌信息
  addVehicleInfo() {
    this.dialogVehicleInfo = true
    
  },
  closeCarDialog() {
    this.dialogVehicleInfo = false
    this.carList = {}
  },
  
  // 提交车辆信息
  submitCarMsg() {
    this.addPersonForm.plateNumInfoList.push(this.carList)
    this.carList = {}
    this.dialogVehicleInfo = false
  },
  submitRedact() {
    let arr = [] 
    arr.push(this.carList)
    this.addPersonForm.plateNumInfoList = arr
    this.dialogVehicleInfo = false
    this.carList = {}
  },
  // 编辑车辆信息
  redactDlog(row) {
    this.dialogVehicleInfo = true
    this.carList.personCarType = row.personCarType
    this.carList.plateNo = row.plateNo
    this.carList.carModelInfoId = row.carModelInfoId
    this.carList.carTypeInfoId = row.carTypeInfoId
    this.carList.vehicleColor = row.vehicleColor
    this.carList.id = row.id
    this.carList.permissionGroupId = row.permissionGroupId
  },
  //添加住户人
  addPopPerson(fromMsg){
    this.$refs[fromMsg].validate((valid) => {
      if(valid){
        if(this.isEdit){//编辑
          if(this.addHouseForm.id){
            this.addHouseForm.type=2;
          }
          this.addPersonForm.houseList[this.currentIndex]=this.addHouseForm;
          this.addPopVisible=false;
        }else{//添加
          if(this.addPersonForm.houseList){
            this.addPersonForm.houseList.push(this.addHouseForm)
          }else{
            this.addPersonForm.houseList=[];
            this.addPersonForm.houseList.push(this.addHouseForm)
          }
          this.addPopVisible=false;
        }
        this.addHouseForm={
            effectiveTime:'',//有效期
            liveStatus:1,//居住状态
            personSubtype:'',//住户身份
            houseId:'',//房号id
            personDeviceBingId:'',//绑定id
            type:1,//类型;1添加2修改3删除
          }        
      }
    })
  },
  closePop(){
    this.$nextTick(()=>{
      this.$refs.addHouseForm.clearValidate()
    })
    this.addHouseForm={
      effectiveTime:'',//有效期
      liveStatus:1,//居住状态
      personSubtype:'',//住户身份
      houseId:'',//房号id
      personDeviceBingId:'',//绑定id
      type:1,//类型;1添加2修改3删除
    }
  },
  //房屋下拉选择改变
  cascaderChange(e){
    this.addHouseForm.houseId=e[e.length-1];
    let labels=this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels;
    let labelsVal=''
    labels.forEach((item)=>{
      labelsVal+=item;
    })
    this.addHouseForm.houseAddress=labelsVal;
  },

  //获取房屋下拉
  getLeftData(){   
    this.cascaderData=[];  
    this.utils.http({
      url: "/base/house/list",
      method: "GET",
      params: {appId:this.appId}
    },
    res => {
      if(res.code==200&&res.data.groups){
        this.cascaderData=res.data.groups;
      }
    });  
  },
  //add表格
  addBtn(){
    this.isEdit=false;
    this.addPopVisible=true;
  },
  //编辑表格
  gotoEdit(index){
    this.isEdit=true;
    this.currentIndex=index;
    this.addHouseForm=JSON.parse(JSON.stringify(this.addPersonForm.houseList[index]));
    this.addHouseForm.deviceGroupId = this.addHouseForm.houseId;
    this.addPopVisible=true;
  },
  //删除表格
  clickDel(index,row){
    this.$confirm("您确信删除此房屋信息?", "确认", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(() => {
      if(row.id){
        row.type=3;
        this.deleteArr.push(row);
      }
      this.addPersonForm.houseList.splice(index,1)
    })
    .catch(() => {
      
    });
    
  },

  //实名制校验
  realNameVerification(){
    this.utils.http({
      url: "/jn/api/status",
      method: "GET",
      params:{appId:this.appId}
    }, res => {
      if(res.data){
          this.isRealName = true;
          var validatePhone = (rule, value, callback) => {
            if (value) {
              if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
                callback(new Error('请输入正确的手机号'));
              }else{
                callback();
              }
            } else {
              callback(new Error('请输入手机号'));
            }
          };
          this.rules = {
            personName: [
              { required: true, message: '请输入住户姓名', trigger: 'blur' },
            ],
            phone: [
              { validator: validatePhone,trigger: 'blur' }
            ],
            idNum:[
              { required: true, message: '请输入身份证号', trigger: 'blur' },
            ]
          };
      }else{
        this.isRealName = false;
        this.rules = {
          personName: [
            { required: true, message: '请输入住户姓名', trigger: 'blur' },
          ]
        };
      }
    })
  },

  //获取设备信息
  getDeviceIdList(){   
    this.utils.http({
      url: "/identity/device/list?appId="+this.appId,
      method: "POST",
    },
    res => {
      if(res.code==200){
        if(0 < res.data.length){
           res.data.forEach((item,index)=>{
              item.status = false
           })
           this.witnessDeviceList = res.data;
           this.isshowDeviceList = true;
        }else{
           this.witnessDeviceList = [];
           this.isshowDeviceList = false;
        }
      }
      
    });  
  },
  

  //选中设备读取信息
  selectDevice(index,value){
     console.log(index,value)
     let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
     let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
     let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
     this.witnessDeviceList.forEach((item,indx)=>{
       if(index == indx){
          item.status = true;
          if(1 == item.online){
            this.witnessValue = item.id;
            this.tipsInfo = "[" + hh + ":" + mf + ":" + ss + "]" +  '正在连接设备，请稍等...'
            if(this.isInit){
              this.currentToken=this.utils.getUUID();
              this.socketApi.initWebSocket();
              this.websocketToLogin();
            }else{
              this.unsubscribeInfo();
              this.websocketGetData();
            }
          }else{
            this.tipsInfo = "[" + hh + ":" + mf + ":" + ss + "]" + "设备离线";
            if('' != this.witnessValue){
              this.unsubscribeInfo();
            }
          }
       }else{
        item.status = false
       }
     })
  },

  //返回
  goBack() {
    this.$router.push({
      path: '/ownermanage',
    })
  },
    changeType() {

    },
    changeTime(e){console.log(e)},
    handleCheckedCitiesChange(e) {
      console.log(e)
    }
  },
}