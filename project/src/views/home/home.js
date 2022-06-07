import HeaderDiv from '../../components/header.vue';
import footerDiv from '../../components/footer.vue';
import Sidebar from '../../components/sidebar.vue';
export default {
  name: 'home',
  data() {
    return {
      msg: '首页',
      visible: false,
      resizeTimer: null,
      chartTodayRecogRate: null,//进出人次图表
      chartDeviceOnlineRate: null,//访客构成图表
      chartPeopleTrend: null,//人员流量趋势
      chartTodayVisitorHour:null,
      todayData:null,//今日统计
      openDoorChart:null,//开门次数统计
      value1:'',
      repairCount:'',   //待报修
      auditCount:0,    //待审核
      tableData: [],
      buildingNumA:'',
      houseNumA:'',
      residentNumA:0,
      propertyNumA:0,
      onLineNumA:0,
      notLineNumA:0,
      repairNumA:0,
      auditNumA:0,
      complainNumA:0,
      nice: {
        "results": [
          {
            "text": "Group 1",
            "children": [
              {
                "id": 1,
                "text": "Option 1.1"
              },
              {
                "id": 2,
                "text": "Option 1.2"
              }
            ]
          },
          {
            "text": "Group 2",
            "children": [
              {
                "id": 3,
                "text": "Option 2.1"
              },
              {
                "id": 4,
                "text": "Option 2.2"
              }
            ]
          }
        ],
        "pagination": {
          "more": true
        }
      },
      condition: {},
      $tab_list: null,
      openDoorForm:{//开门次数
        appId:'',
        startTime:'',
      },
      timeArr:['07:00:00',"21:00:00"],
      toDayDataList:[],//今日统计数据
      openDoorList:[],//开门次数统计
      openDoorIndex:[],
      toDayTime:'',//2020-06-18
      houseNum:0,//房屋数
      householdNum:0,//住户数
      employeeNum:0,//员工数
      deviceNum:0,//设备数
      peopleTrendList:[],//住户类型

      timeout:45000,
      timer:null,
      imgurl:'',
      realTimeList:[],
      currentToken:'',
      recordContentPop:false,
      contentMsg:{},//识别记录详情
    }
  },
  components: {
    Sidebar,
    HeaderDiv,
    footerDiv
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
      if(newFlag){
        this.appId=newFlag;
        this.openDoorForm.appId=newFlag;
        this.getCountResidenceHomeData();
        this.TodayDataRequest()
        this.getOpenDoorRequest();
        this.timeRecord();
        this.getInstrumentMsg();
      }
      
      //重新订阅
      this.socketApi.websocketclose();
      clearInterval(this.timer);
      this.socketApi.initWebSocket();
      this.websocketToLogin();
    }
  },
  filters: {

  },
  created() {
    this.currentToken=this.utils.getUUID();
    this.imgurl = this.tools.global.API_URL;
    this.socketApi.initWebSocket();
    this.websocketToLogin();
    this.getInstrumentMsg();
    
    //获取用户id
    // this.getUserId();
  },
  mounted() {
    // this.inOutRate();
    // this.visitorConstitute();
    this.openDoorForm.appId=this.appId;
    //请求
    if(this.appId){
      this.TodayDataRequest();
      this.timeRecord();
      this.getCountResidenceHomeData(); 
      this.getOpenDoorRequest();
    }
    let date = new Date();
      let year =date.getFullYear();
      let month =date.getMonth()+1; 
      let ri=date.getDate()
      if(month<10){
        month='0'+month
      }
      if(ri<10){
        ri='0'+ri
      }
      this.openDoorForm.startTime=year+'-'+month+'-'+ri;

    // this.peopleTrend();
    // this.getTodayData();
    // this.getOpenDoor();
    window.addEventListener('resize', () => {
      // if (this.resizeTimer) clearTimeout(this.resizeTimer);
      //   this.resizeTimer = setTimeout( ()=> {
      // this.chartTodayVisitorHour.resize();
      if(this.chartPeopleTrend){
        this.chartPeopleTrend.resize();
      }
      if(this.todayData){
        this.todayData.resize();
      }
      if(this.openDoorChart){
        this.openDoorChart.resize();
      }
      
      // this.todayData.resize();
      // this.openDoorChart.resize();
      // }, 100)
    })

  },
  destroyed(){
    clearInterval(this.timer);
    this.socketApi.websocketclose();
  },
  methods: {
    //获取userId
    
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
      //  var cmd = JSON.stringify(HeartBeat);
      this.socketApi.sendSock(HeartBeat, this.getConfigResult)
        // console.log('心跳发送成功，发送时间：', new Date().toLocaleString('zh'))
      }, this.timeout)
      
    },
    getConfigResult (res) {
      // 接收回调函数返回数据的方法
      // console.log(res)
      if(res.type=='WS_REGISTER'){
        // console.log('注册成功')
        this.websocketGetData();
        this.heartCheckStart();
      }else if(res.type=='WS_PUBLISH_FACE'){
        this.realTimeList.unshift(res.body)
        console.log(this.realTimeList,'00++')
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
      var appids=this.appId.split(',')
      let date=new Date();
      let HeartBeat={
        type:"WS_SUBSCRIBE_FACE",
        requestId:this.utils.getUUID(),
        timestamp:this.utils.formatTimestamp(date),
        token:this.currentToken,
        body: {
          applist: appids
        }
      }
    //  var cmd = JSON.stringify(HeartBeat);
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
      this.socketApi.sendSock(HeartBeat, this.getConfigResult)
    },
    



    btnDeviceAll() {
      this.condition.type = null;
      var opt = {
        silent: true,
        query: this.condition
      };

      this.$tab_list.bootstrapTable('refresh', opt);
    },
    changeSocket() {
      this.$store.commit('changeData', '这个是改变之后的信息')
    },
    //实时记录
    timeRecord(){
      // var nice='2e74ef743548421abb72acd4b82e649d'
      this.utils.http({
        url: "/home/page/realTimeRecord",
        method: "GET",
        params: {appId:this.appId}
        // params: {appId:nice}
      },
      res => {
        if(res.code==200){
          this.realTimeList=res.data;
        }
        
      });  
    },
    //仪表板/home/page/countResidenceHomeData
    getCountResidenceHomeData(){
      this.peopleTrendList=[];
      this.utils.http({
        url: "/home/page/countResidenceHomeData",
        method: "GET",
        params: {appId:this.appId}
      },
      res => {
        console.log(res,'!!!!!!@@')
        if(res.code==200&&res.data){
          this.houseNum=res.data.houseNum;//房屋属
          this.householdNum=res.data.householdNum;//房屋属
          this.employeeNum=res.data.employeeNum;//房屋属
          this.deviceNum=res.data.deviceNum;//房屋属
          this.repairCount = res.data.repairCount;
          this.auditCount = res.data.auditCount
          if(res.data.countList){
            res.data.countList.forEach((item,index)=>{
              this.peopleTrendList.push(item.number)
            })
          }
          
          this.peopleTrend()
        }else{
          this.houseNum=0;
        }
        
        
      });  
    },
    getInstrumentMsg() {
      this.utils.http({
        url:`/home/page/v2/countResidenceHomeData?appId=${this.appId}`,
        method:'GET'
      },
      res => {
        console.log(res,'++++')
        if(res.code == 200) {
          this.buildingNumA = res.data.buildingNum,
          this.houseNumA = res.data.houseNum,
          this.residentNumA = res.data.residentNum,
          this.propertyNumA = res.data.propertyNum,
          this.onLineNumA = res.data.onLineNum,
          this.notLineNumA = res.data.notLineNum,
          this.repairNumA = res.data.repairNum,
          this.auditNumA = res.data.auditNum,
          this.complainNumA = res.data.complainNum
        }
      
      }
      )
    },
    
    //搜索的时间改变
    changeTime(e){
      this.openDoorForm.startTime =e;
      this.getOpenDoorRequest()
    },
    //今日统计接口
    TodayDataRequest(){
      this.utils.http({
        url: "/home/page/toDay",
        method: "POST",
        data: {appId:this.appId}
      },
      res => {
        if(res.code==200){
          this.toDayDataList=res.data;
          // this.toDayDataList=[{name:'nice',value:5},{name:'good',value:10},{name:'bad',value:15},{name:'dfda',value:20},{name:'dsad',value:25}]
          this.getTodayData();
        }
        
      });  
    },
    //开门次数统计接口
    getOpenDoorRequest(){
      // this.openDoorForm.appId='595ae22e23a14b3cb7cd6c242e35e7ee'
      // this.openDoorForm.startTime='2020-04-28 00:00:00'
      // this.openDoorForm.endTime='2020-05-28 23:59:59'
      this.utils.http({
        url: "/home/page/date",
        method: "POST",
        data: this.openDoorForm
      },
      res => {
        if(res.code==200){
          this.openDoorList=res.data.counts;
          this.openDoorIndex=res.data.index;
          this.getOpenDoor();
        }
        
      });  
    },


    getTodayData(){
      let titleArr=[];
      this.toDayDataList.forEach((item,index)=>{
        titleArr.push(item.name)
      })
      this.todayData= this.$echarts.init(document.getElementById('todayData'));
      var option={
        tooltip: {//提示框，可以在全局也可以在
          trigger: 'item',  //提示框的样式
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          color:'#fff', //提示框的背景色
          textStyle:{ //提示的字体样式
              color:"black",
          }
      },
      grid: {
        top:'10%',  
        left: '0%',  
        // right: '3%',  
        // bottom: '1%',  
        containLabel: true  
    },
    
  
      legend: {  //图例
        orient: 'vertical', // 布局方式，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
        // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
      //  x: 'right',
       // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
        y: 'center',
        right: 50,
       // 重写legend显示样式
      formatter: function(name) {
             // 获取legend显示内容
              let data = option.series[0].data;
              let total = 0;
              let tarValue = 0;
              for (let i = 0, l = data.length; i < l; i++) {
                  total += data[i].value;
                  if (data[i].name == name) {
                      tarValue = data[i].value;
                  }
              }
              if(total!=0){
                let p = (tarValue / total * 100).toFixed(2);
                return name + ' ' +tarValue + '　　' + p + '%';
              }else{
                return name + ' ' +tarValue + '　　' + 0 + '%';
              }
              
              
          },
        data: titleArr

      },
      series: [
          {
              name:'访问来源',
              type:'pie', //环形图的type和饼图相同
              center: ['30%', '50%'],
              radius: ['40%', '60%'],//饼图的半径，第一个为内半径，第二个为外半径
              avoidLabelOverlap: false,
              color:['#5fbb5f','#F9D858','#4CD0DD','#DF86F0','#F5A7C1'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '24',
                          fontWeight: 'bold'
                      }
                  }
              }, //提示文字
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:this.toDayDataList
          }
      ]
      }
      this.todayData.setOption(option)
    },

    //住户构成
    peopleTrend() {
      this.chartPeopleTrend = this.$echarts.init(document.getElementById('chartTodayRecogHour'));
      this.chartPeopleTrend.setOption({
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data: ['project', 'machine']
        // },
        grid: {
          top:'3%',  
          left: '1%',  
          right: '1%',  
          bottom: '1%',  
          containLabel: true  
      },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: ['户主', '家属', '租客', '其他']
            }
        ],
        yAxis: [
            {
                type: 'value',
                minInterval: 1,
                max: function(value) {
                  return value.max +1;
                }
            }
        ],
        series: [
            {
                // name: 'project',
                type: 'bar',
                barWidth : 30,
                data: this.peopleTrendList,
                itemStyle:{
                    normal:{color:'#3AA0FF'}
                }
            },
            // {
            //     name: 'machine',
            //     type: 'bar',
            //     data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            //     itemStyle:{
            //         normal:{color:'#4ECB73'}
            //     }
            // }
        ]
    })

    
    },
    //开门次数统计
    getOpenDoor() {
      this.openDoorChart = this.$echarts.init(document.getElementById('openDoorChart'));
      var option = {
        color:['#6cacde','rgb(200,200,169)'],
        tooltip: {
            trigger: 'axis',
            // trigger: 'item',
            formatter: '{b}时<br/>{a} : {c}'
        },
        grid: {
            top:'3%',
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            // feature: {
            //     saveAsImage: {}
            // }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:this.openDoorIndex.length>0? this.openDoorIndex:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]   
            // data:[1,1,1,1,12,2,2,2,2,2]
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
            max: function(value) {
              return value.max +2;
            }
        },
        series: [
            {
                name: '次数',
                type: 'line',
                // stack: '员工数',
                data: this.openDoorList
                // data:[33,33,34,44,55,66,77,88]
            },
        ]
      };
      this.openDoorChart.setOption(option);
    },
    //查看详情
    seeContent(row){
      this.contentMsg=row;
      this.recordContentPop=true
    },

    
  },
}
