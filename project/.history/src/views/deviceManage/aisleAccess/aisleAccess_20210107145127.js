import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      popVisible: false,//是否显示信息弹框
      popTitle: '这个是标题',
      dialogTitleName:"",
      popContent: '',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [ 
        { label: 'ID', param: 'id', align: 'center', sortable: true ,isshow:false,width:'120'},
        { label: '名称', param: 'name', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: 'S/N', param: 'serial', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: '进出方向', param: 'inoutFlag', align: 'center',width:'120', sortable: true,isshow:true, render: (row) => {
          if (row.inoutFlag == 0) {
            return '出口'
          } else if (row.inoutFlag == 1) {
            return '入口'
          } else if (row.inoutFlag == 2) {
            return '出入口'
          }
        }},
        { label: '所在位置', param: 'groupName', align: 'center', sortable: true,isshow:true ,width:'120'},
        { label: '型号', param: 'model', align: 'center', sortable: true,isshow:true,width:'100' },
        {label: '状态', slot: 'operate1',isshow:true }, //状态
        {label: '设备参数', slot: 'operate3',isshow:true }, //状态
        {label: '授权人员', slot: 'operate2',isshow:true }, //授权人员
        // {label: '控制', slot: 'operate4',isshow:true }, //授权人员
        { slot: 'operate',isshow:true }, // 操作列
      ],
      tableOption:[],
      tableSelect: [],
      inoutFlagOption: [{
        value: 0,
        label: '出口'
      }, {
        value: 1,
        label: '入口'
      }, {
        value: 2,
        label: '出入口'
      }],
      networkStatus: [{
        value: 0,
        label: '离线'
      }, {
        value: 1,
        label: '在线'
      }],
      value: '',
      addPopVisible:false,//添加弹框
      rules:{
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
        ],
        groupId: [
          { required: true, message: '请选择所在位置', trigger: 'change' },
        ],
        inoutFlag: [
          { required: true, message: '请选择进出标识', trigger: 'change' },
        ],
        serial: [
          { required: true, message: '请输入设备SN号', trigger: 'blur' },
        ],
      },
      projectName:'',//项目名称
      addForm:{
        appId:'',//
        groupId:'',//位置
        name:'',//名称
        inoutFlag:'',//设备进出标识 0:出口,1:入口,2:出入口
        serial:'',//
      },
      cascaderData:[],
      groupProps: {
        children:'groups',
        label:'name',
        value:'id',
        checkStrictly:true,
        expandTrigger: 'hover'
      },
      isShowSelect:true,
      dataForm:{
        appId:'',//
        name:'',//名称
        online:'',//网络状态
        pageSize:10,
        page:1,
        inoutFlag:'',//出入口
      },
      loading:false,
      monitorPopVisible:false,
      video:null,
      canvas:null,
      ctx:null,
      width:null,
      height:null,
      url:'',
      isRequst:false,
      paramsSet:[],
    paramsSetVisible:false,//参数设置弹框
    currentDeviceId:'',//当前设备的id
    activeName:'',//选中的tab
    setIndex:0,
    currentTab:{
      item:[]
    },//当前选中的内容
    allCurrentTab:[],
    isShowTip:false,
    dialogVisible:false,//人员授权列表弹框
    authTotal:0,
    authData:[],
    authForm:{
      appId:'',
      deviceId:'',
      page:1,
      pageSize:10,
      name:'',
    },
    isShowSaveBtn:false,//参数设置按钮是否显示
    isShowResetBtn:false,
    imgurl:'',
    cascaderKey:1,
    videoReader:new FileReader(),
    ws:{},
    playStreamWsAddress:'',
    playStreamWssAddress:'',
    playStreamId:'',//当前监控的id
    playStreamOnline:'1',//当前监控设备的状态
    countDown:60,
    countDownTimer:null,
    isshowIdCard:false,//设备参数通行模式为人证合一时控制
    isshowCard:false,//设备参数通行模式为人卡合一时控制
    updateVersionPop:false,//设备升级弹框显示控制
    timer:null,
    softData:[{
      name:'1',
      type: 2,
      version:'1.23.7',
      remark: "机构：深圳市芊熠智能硬件有限公司，用户：znxfire",
      createTime: 1598251045000,
      updateTime: 1598251045000
    },{
      name:'2',
      type: 2,
      version:'1.23.7',
      remark: "机构：深圳市芊熠智能硬件有限公司，用户：znxfire",
      createTime: 1598251045000,
      updateTime: 1598251045000
    }],
    deviceTotal:0,
    softForm:{
      appId:'',
      pageNum:1,
      pageSize:10,
      search:'',
    },
    softRadio:-1,
    upDeviceId:[],//选中升级的设备
    upSoftId:'',//选中软件的id
    upFailedPop:false,//升级失败提示弹框
    FailedList:[],//升级失败提示数据
    isUping:false,
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
    },
    appName:{
      get(){
        return this.$store.state.project.projectName
      },
      set(v){
        this.$store.commit('changeProjectName', v)
      }
    }
  },
  watch:{
    appId(newFlag, oldFlag){
      this.appId=newFlag;
      ++this.cascaderKey;
      this.dataForm={
        appId:newFlag,//
        name:'',//名称
        online:'',//网络状态
        pageSize:10,
        page:1,
        inoutFlag:'',//出入口
      };
      this.authForm={
        appId:newFlag,
        deviceId:'',
        page:1,
        pageSize:10,
        name:'',
      },
      this.softForm={
        appId:newFlag,
        pageNum:1,
        pageSize:10,
        softForm:'',
      }
      this.addForm.appId=newFlag;
      this.getLeftData();
      this.getDataTable();
    },
    appName(value){
      this.projectName = value;
    }
  },
  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
    for (let i = 0; i < this.tableLabel.length; i++) {
      if(this.tableLabel[i].label){
        this.tableOption.push(this.tableLabel[i].label)
      }
      if(this.tableLabel[i].isshow){
        this.tableSelect.push(this.tableLabel[i].label)
      }
    }
  },
  components: {
    MsgBox,
    TableCmp
  },
  mounted() {
    if(this.appId){
      this.projectName = this.$store.state.project.projectName;
      this.addForm.appId=this.appId;
      this.dataForm.appId=this.appId;
      this.authForm.appId=this.appId;
      this.softForm.appId=this.appId;
      this.getLeftData();
      this.getDataTable();
      // this.initWebSocket();
    }
  },
  methods: {
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
    //获取监控的地址
    getVideoWebsocket(id,online){  
      this.playStreamId=id;
      this.playStreamOnline=online;
      this.utils.http({
        url: '/device/getDeviceMediaStream',
        method: "GET",
        params:{
          appId:this.appId,
          deviceId:id
        }
      },
      res => {
        if(res.code==200){
        this.monitorPopVisible=true;
         this.playStreamWsAddress=res.data.playStreamWsAddress;
         this.playStreamWssAddress=res.data.playStreamWssAddress;
         this.initWebSocket();
        }        
      })     
    },
    // 初始化websoket
    initWebSocket() {
      var _this=this;
      if (!window.WebSocket) {
          window.WebSocket = window.MozWebSocket;
      }
      this.videoReader.onload = function (eve) {
        //判断是否读取完成
          if (eve.target.readyState == FileReader.DONE) {
              //修改为最新处视频帧
              _this.url =this.result;
          }
      };
      var protocol = window.location.protocol;
      if(window.WebSocket){
        if (protocol == "https:") {
          // ws = new WebSocket("wss://47.115.3.20:16829/2b6d612534014f36a08a618ba2ab9863");
          this.ws = new WebSocket(this.playStreamWssAddress);
        }else{
          // this.ws=new WebSocket("ws://47.115.3.20:27061/b85cef904f0e446094744619ac627ee0");
          this.ws = new WebSocket(this.playStreamWsAddress);
        }
        this.ws.onopen = this.sendData;
        this.ws.onmessage = this.webSocketMessage;
        this.ws.onclose = this.websocketClose;
        this.ws.onerror = this.websocketError;
      }else{
        console.log("你的浏览器不支持 WebSocket！");
      }
    },
    sendData(data) {
      console.log("监控建立时间:", new Date().toLocaleString("zh"));
      this.timerCount();
    },

    webSocketMessage(event) {
      try {
        this.videoReader.readAsDataURL(event.data);
      }catch (e) {
          console.log(e);
      }
    },
    websocketClose(wasClean) {
      // console.log("监控断开时间:", new Date().toLocaleString("zh"));
      // if(this.isReconcat){
      //   this.reconnect()
      // }
    },
    websocketError(err) {
       console.log("监控连接失败");
     
    },
    //监控弹框关闭
    monitorClose(){
      this.websocketClose();
      this.ws.close();//断开
      this.monitorPopVisible=false;
      this.url='';
      if(this.countDownTimer){
        clearInterval(this.countDownTimer);
      };
      this.countDown=60;
    },
    //监控弹框开门
    playStreamOpen(){
      this.openDoorRequst(this.playStreamId,this.playStreamOnline)
    },
     // 点击拍照
     CatchPictures(){
      var alink = document.createElement("a");
      alink.href = 'data:image/png;base64,'+this.url.split(',')[1];
      // console.log(alink.href)
      // console.log(this.url)
      alink.download = "photograph"; //图片名
      alink.click();
    },
    timerCount(){
      this.countDownTimer=setInterval(()=>{
        if(this.countDown==0){
          clearInterval(this.countDownTimer);
          this.countDown=60;
          this.monitorClose();//关闭弹框
        }else{
          this.countDown--;
        }    
      },1000)
    },

    //自定义表头
    checkboxChange(e){
      for (let j = 0; j < this.tableLabel.length; j++) {
        if(this.tableSelect.indexOf(this.tableLabel[j].label)>-1){
          this.tableLabel[j].isshow=true;
        }else{
          this.tableLabel[j].isshow=false;
        }           
      }
    },
    //弹框
    open(){
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },
    //列表
    getDataTable(){
      this.loading=true;
      this.utils.http({
        url: "/device/page",
        method: "POST",
        data: this.dataForm
      },
      res => {
        this.loading=false;
        if(res.code==200){
          this.total=res.data.total;
          this.tableData=res.data.records;
          this.currentPage=res.data.current;
        }
        
      });  
    },


    //添加
    addDevice(fromMsg){
      var url
      if(this.isAdd){
        url='/device/faceBinding';
      }else{
        url='/device/update';
      }
      // if(this.addForm.groupId){
      //   this.addForm.groupId=this.addForm.groupId[this.addForm.groupId.length-1]
      // }
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.isRequst=true;
          this.utils.http({
            url: url,
            method: "POST",
            isAdd:true,
            data: this.addForm
          },
          res => {
            this.isRequst=false;
            if(res.code==200){
              this.addPopVisible=false;
              this.getDataTable();
              this.addForm={
                appId:this.appId,//
                groupId:'',//位置
                name:'',//名称
                inoutFlag:'',//设备进出标识 0:出口,1:入口,2:出入口
                serial:'',//
              }
            }
            
          });  
        }
      })
      
    },
    cascaderChange(e){
      if(e){
        this.addForm.groupId=e[e.length-1]
      }
      
    },
    //关闭弹框清空数据
    closePop(){
      this.$nextTick(()=>{
        this.$refs.addForm.clearValidate()
      })
      this.addForm={
        appId:this.appId,//
        groupId:'',//位置
        name:'',//名称
        inoutFlag:'',//设备进出标识 0:出口,1:入口,2:出入口
        serial:'',//
      }
    },
    //
    clickAdd(){
      this.addPopVisible=true;
      this.isAdd=true;
      this.dialogTitleName="添加设备";
    },
    //编辑
    editDevice(id,online){
      this.isAdd=false;
      this.dialogTitleName="编辑设备"
      this.utils.http({
        url: '/device/updateInfo?id='+id,
        method: "GET",
        params:{}
      },
      res => {
        if(res.code==200){
          this.addForm=res.data;
          this.addForm.appId=this.appId;
          this.addPopVisible=true;
        }        
      })     
    },
    //获取下拉
    getLeftData(){   
      this.cascaderData=[];
      this.utils.http({
        url: "/base/house/list",
        method: "GET",
        params: {appId:this.appId}
      },
      res => {
        if(res.code==200&&res.data){
          this.cascaderData.push(res.data);
          this.cascaderData.forEach((item,i)=>{
            item.groups.forEach((item1,j)=>{
              item1.groups.forEach((item2,k)=>{
                // item2.groups.forEach((item3,h)=>{
                //   item3.groups=null;
                // })
                item2.groups=null;
              })
            })
          })
        }
        
      });  
    },
    //开门
    openDoorRequst(id,online){
      if(online==0){
        this.utils.tip('warning','设备不在线');
      }else{
        this.utils.http({
          url: "/device/openTheDoor",
          method: "POST",
          data:{id:id}
        },
        res => {
          if(res.code==200){
            this.utils.tip('success','开门指令发送成功');
          }
        })
      }
    },
    //重新授权
    reAuth(id,online){
      if(online==0){
        this.utils.tip('warning','设备不在线');
      }else{
        this.$confirm("您确信重新授权设备?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.utils.http({
            url: "/device/reload",
            method: "POST",
            data:{id:id}
          },
          res => {
            if(res.code==200){
              this.utils.tip('success','重新授权成功');
            }
          })
        })
        .catch(() => {
          
        });    
      }
    },
    

    //删除
    deleteDevice(id){
      this.$confirm("您确信删除选中的设备?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.utils.http({
          url: "/device/delete",
          method: "POST",
          headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
          data:this.utils.changeJson({deviceId:id})
        },
        res => {
          if(res.code==200){
            this.utils.tip('success','删除成功');
            this.getDataTable();
          }
          
        })
      })
      .catch(() => {
        
      });
      
    },
    
    //重置
    resetBtn(){
      this.dataForm={
        appId:this.appId,//
        name:'',//名称
        online:'',//网络状态
        pageSize:10,
        page:1,
        type:'',//出入口
      };
      this.getDataTable();
    },
    //分页
    handleSizeChange(val) {
      this.dataForm.pageSize=val;
      this.getDataTable();
    },
    handleCurrentChange(val) {
       this.dataForm.page=val;
       this.getDataTable();
    },

    //人员授权列表
    seeAuthPeople(id){
      if(id){
        this.authForm.deviceId=id;
      } 
      this.utils.http({
        url: "/device/personPage",
        method: "POST",
        data: this.authForm
      },
      res => {
        if(res.code==200){ 
          this.authTotal=res.data.total;
          this.authData=res.data.records;
          this.currentPage1=res.data.current;
          this.dialogVisible=true;
        }
        
      });
     
    },

    //人员授权弹框列表分页
    handleSizeChange1(val) {
      this.authForm.pageSize=val;
      this.seeAuthPeople();
    },
    handleCurrentChange1(val) {
       this.authForm.page=val;
       this.seeAuthPeople();
    },


    //获取设备参数
    getDeviceData(id){
      this.setIndex=0;
      this.currentDeviceId=id;
      this.utils.http({
        url: "/device/deviceConfigInit",
        method: "GET",
        params: {id:id}
      },
      res => {
        if(res.code==200){ 
         this.paramsSet=JSON.parse(res.data);
        //  this.paramsSet.forEach((item1,index)=>{
        //    if(item1.groupName=='通行模式设置'){
        //      item1.item=item1.item.concat([                 
        //       {
        //           readonly: 0,
        //           optionValue: [
        //               0,
        //               1,
        //               2
        //           ],
        //           name: "验证模式",
        //           type: "enum",
        //           optionName: [
        //               "不限制",
        //               "先脸后卡",
        //               "先卡后脸"
        //           ],
        //           value: 2,
        //           key: "CardVerify"
        //       },
        //       {
        //           readonly: 0,
        //           optionValue: [
        //               0,
        //               1,
        //               2
        //           ],
        //           name: "验证模式",
        //           type: "enum",
        //           optionName: [
        //               "不限制",
        //               "先脸后证",
        //               "先证后脸"
        //           ],
        //           value: 2,
        //           key: "IdCardVerify"
        //       },
        //       {
        //           readonly: 0,
        //           name: "关闭刷卡提示",
        //           type: "boolean",
        //           value: 0,
        //           key: "SwipeCardTip"
        //       },
        //       {
        //           readonly: 0,
        //           name: "关闭刷证提示",
        //           type: "boolean",
        //           value: 0,
        //           key: "SwipeIdCardTip"
        //       },
        //       {
        //           readonly: 0,
        //           name: "关闭刷脸提示",
        //           type: "boolean",
        //           value: 0,
        //           key: "SwipeFaceTip"
        //       }
        //   ])
          
        //    }
        //  })
         this.currentTab=JSON.parse(res.data)[0];
         this.paramsSetVisible=true;
         console.log(this.paramsSet)
        }
      });
    },
    //刷新设备参数
    updataDeviceData(){
      this.utils.http({
        url: "/device/getDeviceConfig",
        method: "POST",
        data: {id:this.currentDeviceId}
      },
      res => {
        if(res.code==200){ 
          this.setIndex=0;
          this.paramsSet=JSON.parse(res.data);
          this.currentTab=JSON.parse(res.data)[0];
        } 
      });
    },
    //恢复默认值
    resetData(){
      this.currentTab.item.forEach((item,index)=>{
        if(item.defaultValue){
          item.value=item.defaultValue;
        }
      })
    },
    //参数设置tab点击
    tabClick(index,tab) {
      this.isShowSaveBtn=false;
      this.isShowResetBtn=false;
      this.setIndex=index;
      this.currentTab=tab;
      // console.log(tab)
      //判断是否需要保存按钮
      tab.item.forEach((item,index)=>{
        if(item.key=="OpenDoor"&&item.value==1){
          tab.item.forEach((item,index)=>{
            if(item.key=='IdCardVerify'||item.key=='SwipeIdCardTip'){
              item.ishow=false;
            }else{
              item.ishow=true;
            }
          })
        }
        else if(item.key=="OpenDoor"&&item.value==3){
          tab.item.forEach((item,index)=>{
            if(item.key=='CardVerify'||item.key=='SwipeCardTip'){
              item.ishow=false;
            }else{
              item.ishow=true;
            }
          })
        }else if(item.key=="OpenDoor"){
          tab.item.forEach((item,index)=>{
            if(item.key=='CardVerify'||item.key=='SwipeCardTip'||item.key=='IdCardVerify'||item.key=='SwipeIdCardTip'||item.key=='SwipeFaceTip'){
              item.ishow=false;
            }else{
              item.ishow=true;
            }
          })
        }
        if(item.readonly==0){
          this.isShowSaveBtn=true;
        }
        //判断是否需要恢复默认值按钮
        if(item.defaultValue){
          this.isShowResetBtn=true;
        }
      })
      this.currentTab=tab;
    },
    //修改设备参数
    editDeviceData(){
      let currentTab=this.currentTab;
      let obj={};
      let key=currentTab.groupKey;
      let keyValue={};
      currentTab.item.forEach((i,index)=>{
        if((i.maxValue||i.minValue)&&(!i.value&&i.value!=0)){
          return
        }else{
          if(i.type=="boolean"){
            if(i.value=='1'){
              i.value=true
            }else if(i.value=='0'){
              i.value=false
            }
          }
          let key1=i.key;
          let value1=i.value;
          keyValue[key1] = value1;
        }
      })
      obj[key]=keyValue;
      this.utils.http({
        url: "/device/setDeviceConfig",
        method: "POST",
        data: {
          data:obj,
          id:this.currentDeviceId
        },
      },
      res => {
        if(res.code==200){ 
          this.utils.tip('success','修改成功');
        } 
      });
    },
    //通行模式修改
    openDoorChange(e){  
      if(e==1){
        var allCurrentTab=JSON.parse(JSON.stringify(this.currentTab));
        allCurrentTab.item.forEach((item,index)=>{
          if(item.key=='IdCardVerify'||item.key=='SwipeIdCardTip'){
            item.ishow=false;
          }else{
            item.ishow=true;
          }
        })
        this.currentTab=allCurrentTab;
      }
      else if(e==3){
        var allCurrentTab=JSON.parse(JSON.stringify(this.currentTab));
        allCurrentTab.item.forEach((item,index)=>{
          if(item.key=='CardVerify'||item.key=='SwipeCardTip'){
            item.ishow=false;
          }else{
            item.ishow=true;
          }
        })
        this.currentTab=allCurrentTab;
      }
      else{
        let allCurrentTab=JSON.parse(JSON.stringify(this.currentTab));
        allCurrentTab.item.forEach((item,index)=>{
          if(item.key=='CardVerify'||item.key=='SwipeCardTip'||item.key=='IdCardVerify'||item.key=='SwipeIdCardTip'||item.key=='SwipeFaceTip'){
            item.ishow=false;
          }else{
            item.ishow=true;
          }
        })
        this.currentTab=allCurrentTab;
      }
    },
    //设备升级按钮
    updateVer(){
      let ids=[];
      let all= this.$refs.tableChild.selectData;
      all.forEach((item,index)=>{
        ids.push(item.id)
      });
      this.upDeviceId=ids;
      if(ids.length==0){
        this.popVisible=true;//是否显示信息弹框
        this.popTitle='提示';
        this.popContent='请至少选择一个升级设备';
        this.open()
      }else{
        this.softForm.search='';
        this.softForm.pageNum=1;
        this.softForm.pageSize=10;
        this.getSoftData();
        
      }
    },
    getSoftData(){
      this.utils.http({
        url: "/device/serach",
        method: "POST",
        data:this.softForm,
      },
      res => {
        if(res.code==200){
          // this.utils.tip('success','重启成功');
          this.softData=res.data.records;
          this.deviceTotal=res.data.total;
          this.currentPage2=res.data.current;
          this.updateVersionPop=true;
        }
      })
    },
    handleSizeChange2(val) {
      this.softForm.pageSize=val;
      this.getSoftData();
    },
    handleCurrentChange2(val) {
       this.softForm.pageNum=val;
       this.getSoftData();
    },
    getCurrentRow(index,id) {
      this.upSoftId=id;
　　　this.softRadio = index;　　　
　　},
    //确认升级按钮
    saveVerson(){
      if(this.upSoftId){
        this.isUping=true;
        this.utils.http({
          url: "/device/upgrade",
          method: "POST",
          data:{
            deviceIds:this.upDeviceId,
            softId:this.upSoftId
          },
        },
        res => {
          this.isUping=false;
          if(res.code==200){
            if(res.data.isOpen==1){//弹错误框
              this.FailedList=res.data.list;
              this.upFailedPop=true;
            }else{
              this.utils.tip('success','设备升级指令全部下发成功');
            }
          }
        })
      }else{
        this.popVisible=true;//是否显示信息弹框
        this.popTitle='提示';
        this.popContent='请选择设备升级版本!';
        this.open()
      }
      
    },
    //重启
    restartDevice(id,online){
       if(online==0){
        this.utils.tip('warning','设备不在线');
      }else{
        this.$confirm("您确信重启设备?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.utils.http({
            url: "/device/restart",
            method: "POST",
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
            data:this.utils.changeJson({deviceId:id})
          },
          res => {
            if(res.code==200){
              this.utils.tip('success','重启成功');
            }
          })
        })
        .catch(() => {
          
        });    
      }
    },
    

  },
}