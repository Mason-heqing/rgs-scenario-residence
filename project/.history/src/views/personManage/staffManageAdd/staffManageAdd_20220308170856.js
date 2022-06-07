import echarts from 'echarts'
import {mixin} from '../../../utils/mixin'
export default {
  name: 'home',
  mixins:[mixin],
  data() {
    return {
      msg: '项目管理',
      isRealName:false,//是否进行实名制校验(姓名,身份证号码,手机号,人脸)
      addPeople: {
        appId:'',
        personName: '',//名字
        deviceGroupList:[],//权限
        department:'',//部门
        idCard:'',//身份证号
        phone:'',//联系电话
        post:"",//岗位
        effectiveStatus:true,//有效状态,1为启用0为未启用
        faceUrl:'',//	string头像
        groupId:'',//	string所属部门
        icNum:'',//	stringIC卡号
        id:"",//	string员工id
        idNum:"",//	string证件号
        job:'',//	string岗位
        plateNumInfoList:[
        
        ]
      },
      carTitle:'添加车辆',
      carTypeList:[],  //车类
      carList:{         //车辆信息
        personCarType:'1',
        plateNo:'',
        carModelInfoId:'',
        carTypeInfoId:'',
        vehicleColor:'',
        id:'',
        permissionGroupId:''
      },
      centerStaffDialog:false,
      imgurl:'',
      rules: {
        // personName: [
        //   { required: true, message: '请输入员工姓名', trigger: 'blur' },
        // ],
        // groupId: [
        //   { required: true, message: '请选择所属部门', trigger: 'change' }
        // ],
        // phone: [
        //   { validator: validatePhone, trigger: 'blur' }
        // ],
        // idNum:[
        //   { required: true, message: '请输入身份证号', trigger: 'blur' },
        // ]
      },
      images:[],//存放图片
      uploadData:{
        appId:'',
      },
      groupData:[],//部门信息
      groupProps: {
        children:'groupList',
        label:'title',
        value:'id',
        checkStrictly:true,
        expandTrigger: 'hover'
      },
      groupType: [{ name: '第一个选项', id: '3' }, { name: '第二个选项', id: '1' }, { name: '第三个选项', id: '2' },],
      imageUrl: '',
      addPop:true,
      groupName:'',//添加设备分组
      startTime:null,
      options: [],
      value:true,//启用状态开关
      data: [],//通行权限的树
      defaultProps: {
        children: 'groupList',
        label: 'title',
        value:'id'
      },
      personId:'',//编辑时的人员id
      checkArr:[],//权限树选中的值
      editOrAdd:'添加',
      isRequst:false,
      timer:null,
      witnessDeviceList:[],
      timeout:45000,
      currentToken:'',
      witnessValue:'',
      tipsInfo:'',
      isInit:true,
      localStorageDeviceId:'',
      isshowDeviceList:false
    }
  },
  // watch: {
  //   handlerValue() {
  //     if (this.$refs.refHandle) {
  //       this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
  //     }
  //   }
  // },

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
      this.addPeople.appId=newFlag;
      this.uploadData.appId=newFlag;
      this.getGroup();
      this.getBuildingUnit();
    }
  },
  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
    this.addPeople.appId=this.appId;
    this.uploadData.appId=this.appId;
    // this.getUserCarInfo();
    // this.selectCarType();
    // this.selectEvt();
    // this.selectUserpermis();
  },
  mounted() {
    
    this.getGroup();
    this.realNameVerification();
    if(this.$route.query.type==2){//编辑
      this.carTitle = '编辑车辆'
      this.addPeople=JSON.parse(this.utils.getStore('staffMsg'));
      this.personId=this.addPeople.id;
      this.addPeople.deviceGroupList=this.addPeople.deviceGroupList;
      // if(this.addPeople.effectiveStatus==1){
      //   this.addPeople.effectiveStatus=true;
      // }else{
      //   this.addPeople.effectiveStatus=false;
      // }
      this.getBuildingUnit();
      this.editOrAdd='更新';
      if(this.addPeople.faceUrl){
        this.images=this.addPeople.faceUrl.split(',')
      } 
      
    }else{
      this.getBuildingUnit();
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
        that.addPeople.personName = res.body.personName;
        that.addPeople.idNum = res.body.personIdNum;
        // that.images = [res.body.snapPic];
        that.picClipping(res.body.snapPic);
        that.$refs.addPeople.clearValidate(['personName']);
        that.$refs.addPeople.clearValidate(['idNum']);
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
        that.addPeople.personName = '';
        that.addPeople.idNum = '';
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
      groupId: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
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

    elCascaderOnlick() {
      let that = this;
      setTimeout(function() {
        document.querySelectorAll(".el-cascader-node__label").forEach(el => {
          el.onclick = function() {
            this.previousElementSibling.click();
            that.$refs.elcascader.dropDownVisible = false;
          };
        });
        
        document.querySelectorAll(".el-cascader-panel .el-radio").forEach(el => {
          el.onclick = function() {
            that.$refs.elcascader.dropDownVisible = false;
          };
        });
          
      }, 100);
    },
    //person/group/queryResidenceBuildingUnit查询小区楼栋信息
    getBuildingUnit(){
      this.utils.http({
        url: "/person/group/queryResidenceBuildingUnit",
        method: "GET",
        params: {appId:this.appId,personId:this.personId}
      },
      res => {
        if(res.code==200){
          this.data=res.data;
          this.getCheckBuild(res.data)
        }
        
      });  
    },

    ascertainDlog() {
      this.addPeople.plateNumInfoList.push(this.carList)
      this.centerStaffDialog = false
      this.carList = {}
    },
    cancelDlog() {
      this.centerStaffDialog = false
      this.carList = {}
    },
    // 处理表格数据ToSrting
    formatter(row, column, cellValue, index) {
      switch(row && row.carTypeInfoId) {
        case 3: row = '储值车'
        return row;
        case 4: row = '固定车'
        return row;
        case 5: row = '贵宾车'
        return row;
        case 2: row = '月租车'
        return row;
        case 1: row = '临时车'
        return row;
      }
    },
    formatter2(row) {
      switch(row && row.carModelInfoId) {
        case 1: row = '小车'
        return row;
        case 2: row = '摩托车'
        return row;
        case 4: row = '超大车'
        return row;
        case 3: row = '大车'
        return row;
      }
    },
    // 添加员工车牌号
    addStaffCarMsg() {
      this.centerStaffDialog = true
    },
    //获取选中有权限的房屋
    getCheckBuild(data){
      for(var i=0;i<data.length;i++){
        if(data[i].checkStatus){
          this.checkArr.push(data[i].id)
        }
        if(data[i].groupList){     
          this.getTreeData(data[i].groupList);
        }
      }
      console.log(this.checkArr)
    },
    //选中节点改变
    checkChange(data,checked, deep){
      // console.log('获取选中节点数据',data);
      // console.log('获取节点状态',checked);
      // console.log('获取节点deep',deep);
      // console.log('获取选中节点数据',data);
      let res = this.$refs.tree.getCheckedNodes();
      let arr = [];
      res.forEach((item) => {
        // if('0' != item.parentId){
        //   arr.push(item.parentId);
        // }
      })
      // arr = arr.concat(this.$refs.tree.getCheckedKeys());
      this.addPeople.deviceGroupList=this.$refs.tree.getCheckedKeys();
      console.log("选中数据:",arr)     
    },

    // 递归判断列表，把最后的children设为undefined
    // selectTreeData(data){
    //   let arr = [];
 
    //   for(var i=0;i<data.length;i++){
    //     if(data[i].groupList.length<1){
    //       // children若为空数组，则将children设为undefined
    //       data[i].groupList=undefined;
    //     }else {
    //       // children若不为空数组，则继续 递归调用 本方法
    //       this.selectTreeData(data[i].groupList);
    //     }
    //   }
    //   return data;
    // },

    // 编辑车辆弹窗
    editDlog(row) {
      console.log(row,'//')
      this.carList.plateNo = row.plateNo
      this.carList.carModelInfoId = row.carModelInfoId
      this.carList.carTypeInfoId = row.carTypeInfoId
      this.carList.vehicleColor = row.vehicleColor
      this.carList.id = row.id
      this.carList.permissionGroupId = row.permissionGroupId
      this.centerStaffDialog = true
    },
    // 编辑保存
    editSubmit(){
      let arr = [] 
      arr.push(this.carList)
      this.addPeople.plateNumInfoList = arr
      this.centerStaffDialog = false
      this.carList = {}
      
    },
    //添加添加或更新员工信息
    addBtn(fromMsg){
      // if(this.$route.query.type==1){
      //   this.addPeople.groupId=this.addPeople.groupId[this.addPeople.groupId.length-1]
      // }
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          if(this.addPeople.effectiveStatus){
            this.addPeople.effectiveStatus='1';
          }else{
            this.addPeople.effectiveStatus='0';
          }
          this.isRequst=true;
          this.addPeople.faceUrl=this.images.join();
          if(this.isRealName){
            if('' == this.addPeople.faceUrl){
              this.isRequst=false;
              return this.$message.error('请先添加人脸头像')
            }
          }
          
          this.utils.http({
            url: "/person/group/addEmployee",
            method: "POST",
            data: this.addPeople
          },
          res => {
            console.log(res);
            this.isRequst=false;
            if(res.code=='200'){
               this.images = [];
               this.addPeople = {
                appId:this.appId, 
                personName: '',//名字
                idCard:'',//身份证号
                phone:'',//联系电话
                post:"",//岗位
                effectiveStatus:true,//有效状态,1为启用0为未启用
                faceUrl:'',//	string头像
                groupId:'',//	string所属部门
                icNum:'',//	stringIC卡号
                id:"",//	string员工id
                idNum:"",//	string证件号
                job:'',//	string岗位
                plateNumInfoList:[
                
                ]
               };
              // this.$router.push({
              //   path:'/staffmanage'
              // })
            }
          });  
        }
      })
    },
    //点击tree
    handleNodeClick(data,Node,e) {
      this.selectGroup=data.label;
      console.log(data);
      console.log(Node);
      console.log(e);
    },
    
  //获取部门/person/group/queryPersonGroupVoList
  getGroup(){
    this.utils.http({
      url: "/person/group/queryPersonGroupVoList",
      method: "GET",
      params: {appId:this.appId}
    },
    res => {
      if(res.code==200){
        console.log(res.data);
        this.groupData=this.getTreeData(res.data);
      }
      
      // this.loading=false
    });  
  },
  // 递归判断列表，把最后的children设为undefined
  getTreeData(data){
    for(var i=0;i<data.length;i++){
      if(data[i].groupList.length<1){
        // children若为空数组，则将children设为undefined
        data[i].groupList=undefined;
      }else {
        // children若不为空数组，则继续 递归调用 本方法
        this.getTreeData(data[i].groupList);
      }
    }
    return data;
  },

  handleChange(e){
    this.addPeople.groupId=e[e.length-1]
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
              // this.images.push({
              //     furl: response.data[0],
              // })
              response.data.forEach((item,index)=>{
                this.images.push(item)
              })
          } else {
              this.utils.tip("warning", '文件个数超出');
          }
      } else {
          this.$message.error(response.msg);
      }
  },
  uploadErr(err, file, fileList){
    this.$message.error('上传失败');
  },

  //实名制校验
  realNameVerification(){
    this.utils.http({
      url: "/jn/api/status",
      method: "GET",
      params:{appId:this.appId}
    }, res => {
      console.log("获取实名制校验权限:",res.data)
      if(res.data){
          this.isRealName = true;
          this.rules = {
            personName: [
              { required: true, message: '请输入员工姓名', trigger: 'blur' },
            ],
            groupId: [
              { required: true, message: '请选择所属部门', trigger: 'change' }
            ],
            phone: [
              {required: true,message: '请输入联系电话', trigger: 'blur' }
            ],
            idNum:[
              { required: true, message: '请输入身份证号', trigger: 'blur' },
            ]
          };
      }else{
        this.isRealName = false;
        this.rules = {
          personName: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
          ],
          groupId: [
            { required: true, message: '请选择所属部门', trigger: 'change' }
          ],
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
            this.tipsInfo =  "[" + hh + ":" + mf + ":" + ss + "]" +  '正在连接设备，请稍等...'
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
      path: '/staffmanage',
    })
  },
  //删除图片
  remove(index) {
      this.images.splice(index, 1);
  },
    changeType() {

    },
    changeTime(e){console.log(e)},
    handleCheckedCitiesChange(e) {
      console.log(e)
    }
  },
}