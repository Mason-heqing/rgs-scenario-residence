import HeaderDiv from '../../../components/header.vue';
import footerDiv from '../../../components/footer.vue';
import Sidebar from '../../../components/sidebar.vue';
import china from 'echarts/map/json/china.json';
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '首页',
      visible: false,
      resizeTimer: null,
      // chartTodayRecogRate: null,//进出人次图表
      // chartDeviceOnlineRate: null,//访客构成图表
      // chartPeopleTrend: null,//人员流量趋势
      // chartTodayVisitorHour: null,
      // todayData: null,//今日统计
      // openDoorChart: null,//开门次数统计
      parkDistribution: null,//车产分布
      getParkData:[],//获取车场数据
      parkStatistics: null,//车场统计
      parkAcount:0,//车场总数
      lineTotalAmount:0,//线上累计金额
      lineTotalIncome:0,//累计总收入
      lineTotalOutcome:0,//累计总支出
      countTime: '',//统计时间
      alipayAmount:0,//支付宝金额
      alipayNums:0,//支付宝笔数
      inAmount:0,//收入总金额
      outAmount:0,//支出总金额
      wechatAmount:0,//微信金额
      wechatNums:0,//微信笔数
      dayNum:null,//月份天数
      everyData:[],//每月数据
      typesIncomeRebate:[],//收入返佣类型
      sourceIncome:[],//收入来源
      incomeExpenditure:[],//收入支出
      inComeTotalAmount:0,//收入总金额
      expenditureTotalAmount:0,//支出总金额
      incomeAmount: null,//收入金额折线图
      incomeType: null,//收入类型
      incomeSource: null,//收入来源
      incomeDistribution: null,//收入分布
      expenditureAmount: null,//支出金额折线图
      expenditureType:null,//支出类型
      expenditureSource:null,//支出分布
      dialogSeeAllVisible:false,//收入分布展示弹框显示
      dialogSeeAllSourceVisible:false,//支出分布弹框显示
      tableLabel:[
        { label: '组织名称', param: 'orgName', align: 'center', sortable: true, isshow: true,width:180},
        { label: '收入金额', param: 'inComeAmount', align: 'center', sortable: true, isshow: true,width: '150',render(h) {
          return h.inComeAmount/100
        },},
        { label: '占比', param: 'Proportion', align: 'center', sortable: true, isshow: true},
      ],
      tableLabel1:[
        { label: '组织名称', param: 'orgName', align: 'center', sortable: true, isshow: true,width:180},
        { label: '支出金额', param: 'outComeAmount', align: 'center', sortable: true, isshow: true,width: '150',render(h) {
          return h.outComeAmount/100
        },},
        { label: '占比', param: 'Proportion', align: 'center', sortable: true, isshow: true},
      ],
      tableData:[],
      tableData1:[],
      isShowSelect: false,
      activeName: 'first',
      moneyImg: '../assets/img/logo_mini.png',//钱图标
      // value1: '',
      dataForm:{
        billMonth:'',//月份
        queryType:1,//查询数据类型（1.收入类型 2.支付类型）
      },
      // condition: {},
      // $tab_list: null,
      // openDoorForm: {//开门次数
      //   appId: '',
      //   startTime: '',
      // },

      timeout: 45000,
      timer: null,
      imgurl: '',
      realTimeList: [],
      currentToken: '',
      // recordContentPop: false,
      contentMsg: {},//识别记录详情
    }
  },
  components: {
    Sidebar,
    HeaderDiv,
    footerDiv,
    TableCmp
  },
  computed: {
    appId: {
      get() {
        return this.$store.state.project.projectId
      },
      set(v) {
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch: {

  },
  filters: {

  },
  created() {
    this.currentToken = this.utils.getUUID();
    this.imgurl = this.tools.global.API_URL;
    this.parkArea();
    //获取用户id
    // this.getUserId();
  },
  mounted() {
    // this.inOutRate();
    // this.visitorConstitute();
    // this.openDoorForm.appId = this.appId;


    //请求
    if (this.appId) {
      // this.TodayDataRequest();
      // this.timeRecord();
      // this.getCountResidenceHomeData(); 
      // this.getOpenDoorRequest();
    }
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let ri = date.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (ri < 10) {
      ri = '0' + ri
    }
    // this.openDoorForm.startTime = year + '-' + month + '-' + ri;

    // this.peopleTrend();
    // this.getTodayData();
    // this.getOpenDoor();
    // this.parkDis();
    this.rewardTotalInfo();
    // this.parkCount();
    this.getSameMonth();
    this.tradeStatis();
    this.incomeAndExtendStatis();
    // this.incomeAmountLine();
    this.everydayIncome();
    this.getDistribInfo();
    // this.incomeTypePieChart();
     this.incomeTypeApi();
     this.incomeAggregate();//收入分布
    this.incomeSourcePieChart();
    // this.incomeDistributionPieChart();
    this.expenditureAmountLine();
    this.expenditureTypePieChart();
    this.expenditureSourcePieChart();
    
    window.addEventListener('resize', () => {
      // if (this.resizeTimer) clearTimeout(this.resizeTimer);
      //   this.resizeTimer = setTimeout( ()=> {
      // this.chartTodayVisitorHour.resize();
      // if (this.chartPeopleTrend) {
      //   this.chartPeopleTrend.resize();
      // }
      // if (this.todayData) {
      //   this.todayData.resize();
      // }
      // if (this.openDoorChart) {
      //   this.openDoorChart.resize();
      // }

      // this.todayData.resize();
      // this.openDoorChart.resize();
      // }, 100)
      this.incomeAmount.resize();
      this.expenditureAmount.resize();
      this.expenditureType.resize();
      this.expenditureSource.resize();
    })

  },
  methods: {
 
     //默认选择当月时间
     getSameMonth(){
      let date = new Date();
      let Y = date.getFullYear();
      // let M = date.getMonth() + 1;
      let M = (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1);
      this.countTime = Y + "-" + M;
      this.dataForm.billMonth = Y.toString()+M.toString();
    },

    
    //车场分布接口调用
    parkArea(){
      this.utils.http({
        url: "/reward/index/parkArea",
        method: "GET",
        // params: { appId: this.appId }
        // params: {appId:nice}
      },
        res => {
          if (res.code == 200) {
            // this.realTimeList = res.data;
            if(0 < res.data.length){
               let num = 0;
               res.data.forEach((item,index)=>{
                num += item.value;  
               })
               this.parkAcount = num;
               this.getParkData =  res.data;
               this.parkDis();
               this.parkCount();
            }else{
              this.getParkData = [];
              this.parkDis();
              this.parkCount();
            }
            
          }

        });
    },
  
     //返佣总览
    rewardTotalInfo(){
      this.utils.http({
        url: "/reward/index/rewardTotalInfo",
        method: "GET",
        // params: { appId: this.appId }
        // params: {appId:nice}
      },
        res => {
          if (res.code == 200) {
            // this.realTimeList = res.data;
            if(0 != res.data.lineTotalAmount){
              this.lineTotalAmount = res.data.lineTotalAmount/100;
            }else{
              this.lineTotalAmount = 0;
            }
            if(0 != res.data.lineTotalIncome){
              this.lineTotalIncome = res.data.lineTotalIncome/100;
            }else{
              this.lineTotalIncome = 0;
            }
            if(0 != res.data.lineTotalOutcome){
              this.lineTotalOutcome = res.data.lineTotalOutcome/100;
            }else{
              this.lineTotalOutcome = 0;
            }
          }

        });
    },
    
    //交易统计
    tradeStatis(){
      // this.tradeStatis();
      this.incomeAndExtendStatis();
      this.utils.http({
        url: "/reward/index/tradeStatis",
        method: "GET",
        // params: { appId: this.appId }
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {

            // this.realTimeList = res.data;
            // this.wechatNums = res.data.wechatNums;
            // this.alipayNums = res.data.alipayAmount;
            if(0 != res.data.alipayAmount){
                this.alipayAmount = res.data.alipayAmount/100;
            }else{
              this.alipayAmount = 0;
            }
            if(0 != res.data.alipayNums){
               this.alipayNums = res.data.alipayNums;
            }else{
              this.alipayNums = 0;
            }
            if(0 != res.data.wechatNums){
              this.wechatNums = res.data.wechatNums;
            }else{
              this.wechatNums = 0;
            }
            if(0 != res.data.wechatAmount){
              this.wechatAmount = res.data.wechatAmount/100;
            }else{
              this.wechatAmount = 0;
            }
          }

        });
      if(1 == this.dataForm.queryType){
        this.dailyStatistics('1');
        this.getTradeParamType('1');
        this.getTradeDisTrib('1');
        this.getDistribInfo();
        // this.$nextTick(() => {
        //   this.incomeAmount.resize();
        // });
      }else{
        this.dailyStatistics('2');
        this.getTradeParamType('2');
        this.getTradeDisTrib('2');
        // this.$nextTick(() => {
        //   this.expenditureAmount.resize();
        // });
      }  
    },
    
    //每日收入
    everydayIncome(){
       this.dataForm.queryType =1;
       this.dailyStatistics('1');
    },
    
    //收入类型
    incomeTypeApi(){
      this.dataForm.queryType =1;
      this.getTradeParamType('1');
    },

    //每日统计
    dailyStatistics(type){
      this.utils.http({
        url: "/reward/index/getEveryTradeInfo",
        method: "GET",
        // params: { appId: this.appId }
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {
            // this.realTimeList = res.data;
            // console.log('获取月份----->',this.countTime);
            // let y = this.countTime.split('-')[0];
            // let m = this.countTime.split('-')[1];
            // this.dayNum = this.mGetDate(y,m);
            // this.mGetDate(y,m);
            // console.log('获取月份天数',this.mGetDate(y,m))
            if(0 != res.data.length){
              this.everyData = res.data;
            }else{
              // this.dayNum = this.mGetDate(y,m);
              this.everyData = [];
            }
            if('1' == type){
              this.incomeAmountLine();//收入折线图
              this.$nextTick(() => {
                this.incomeAmount.resize();
              });
            }else{
              this.expenditureAmountLine();//支出折线图
              this.$nextTick(() => {
                this.expenditureAmount.resize();
              });
              
            }
            
          }

      });
    },




    //收入或支出类型
    getTradeParamType(type){
      this.utils.http({
        url: "/reward/index/getTradeParamType",
        method: "GET",
        // params: { appId: this.appId }
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {
             if(0 < res.data.length){
               this.typesIncomeRebate = res.data;
             }else{
              this.typesIncomeRebate = [];
             }
             if('1' == type){
              this.incomeTypePieChart();//收入类型饼图
              this.$nextTick(() => {
                this.incomeType.resize();
              });
             }else{
              this.expenditureTypePieChart();//支出类型饼图
              this.$nextTick(() => {
                this.expenditureType.resize();
              });
             }
          }

        });
    },


    //收入来源
    getDistribInfo(){
      this.utils.http({
        url: "/reward/index/getDistribInfo",
        method: "GET",
        // params: { appId: this.appId }
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {
             if(0 < res.data.length){
               this.sourceIncome = res.data;
             }else{
              this.sourceIncome = [];
             }
             this.incomeSourcePieChart();//收入来源饼图
             this.$nextTick(() => {
               this.incomeSource.resize();
             });
          }

        });
    },

    //收入分布方法
    incomeAggregate(){
      this.dataForm.queryType =1;
      this.getTradeDisTrib('1');
    },

    //收入或支出分布接口调用
    getTradeDisTrib(type){      
      this.utils.http({
        url: "/reward/index/getTradeDisTrib",
        method: "GET",
        // params: { appId: this.appId }
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {
             let money = 0;
             if(0 < res.data.length){
              if('1' == type){
                this.incomeExpenditure = res.data;
                res.data.forEach((item,index)=>{
                  money += item.inComeAmount
                })
                res.data.forEach((item,index)=>{
                  if(0 < item.inComeAmount){
                    item.Proportion = (item.inComeAmount  /money  * 100).toFixed(2);
                  }else{
                    item.Proportion = 0;
                  }
                })
                this.tableData = res.data
                this.inComeTotalAmount = money/100;
                this.incomeDistributionPieChart();//收入分布饼图
                this.$nextTick(() => {
                  this.incomeDistribution.resize();
                });
               }else{
                this.incomeExpenditure = res.data;
                res.data.forEach((item,index)=>{
                  money += item.outComeAmount
                })
                res.data.forEach((item,index)=>{
                  if(0 < item.outComeAmount){
                    item.Proportion = (item.outComeAmount / money * 100).toFixed(2);
                  }else{
                    item.Proportion = 0;
                  }
                  
               })
               this.tableData1 = res.data
                this.inComeTotalAmount = money/100;
                this.expenditureSourcePieChart();//支出分布饼图
                this.$nextTick(() => {
                  this.expenditureSource.resize();
                });
               }
              
             }else{
               this.incomeExpenditure = [];
               if('1' == type){
                this.tableData = [];
                this.inComeTotalAmount =0;
                this.incomeDistributionPieChart();//收入分布饼图
                this.$nextTick(() => {
                  this.incomeDistribution.resize();
                });
               }else{
                this.tableData1 = [];
                this.inComeTotalAmount = 0;
                this.expenditureSourcePieChart();//支出分布饼图
                this.$nextTick(() => {
                  this.expenditureSource.resize();
                });
               }
             }
             
          }

        });
    },
    
    //获取月份天数
    mGetDate(year,month){
      var d = new Date(year, month, 0);
       return d.getDate();
    },


    //获取收支统计
    incomeAndExtendStatis(){
      this.utils.http({
        url: "/reward/index/incomeAndExtendStatis",
        method: "GET",
        // params: { appId: this.appId }
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {
            // this.realTimeList = res.data;
            if(0 != res.data.inAmount){
              this.inAmount = res.data.inAmount/100;
            }else{
              this.inAmount = 0;
            }
            if(0 != res.data.outAmount){
              this.outAmount = res.data.outAmount/100;
            }else{
              this.outAmount = 0;
            }
          }

        });
    },





    //车场分布
    parkDis() {
      // 基于准备好的dom(myEchartPillar)，初始化echarts实例
      // this.parkArea()
      let myChart = this.$echarts.init(this.$refs.map);
      this.$echarts.registerMap('china', china);
      let showData = [];
      let toolTipDataArray = [];
      let maxArr= [];
      let maxValue = 10;
      // console.log("返回数据----->",this.getParkData)
      if(0 < this.getParkData.length){
        this.getParkData.forEach((item,index)=>{
          let showJson = {};
          let toolTipJson = {};
          let value = [];
          let parkContentJson = {};
          showJson.name = item.name.replace("省",'');
          showJson.value = item.value;
          maxArr.push(item.value);
          showData.push(showJson);
          toolTipJson.name = item.name.replace("省",'');
          parkContentJson.name = "车场数量";
          parkContentJson.value = item.value;
          value.push(parkContentJson);
          toolTipJson.value = value;
          toolTipDataArray.push(toolTipJson);
        })
      }
      if(0 < maxArr.length){
        // maxValue< Math.max(...maxArr)?Math.max(...maxArr):maxValue

        if(maxValue < Math.max(...maxArr)){
          // maxValue = Math.max(...maxArr)
          maxValue = Math.ceil( Math.max(...maxArr)/maxValue)*10
        }
        // alert(Math.max(...maxArr))
      }
      var mapName = 'china'
      var data = showData;
      var geoCoordMap = {};
      var toolTipData = toolTipDataArray;
      /*获取地图数据*/
      myChart.showLoading();
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      myChart.hideLoading();
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

      });
      var max = 5,
        min = 1; // todo
      var maxSize4Pin = 10,
        minSize4Pin = 2;

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          console.log(geoCoord)
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };

      //指定图表的配置项和数据，绘制图表
      myChart.setOption({

        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var toolTiphtml = ''
            if (typeof (params.value)[2] == "undefined") {

              for (let i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ':<br>'
                  for (let j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                  }
                }
              }
              console.log(toolTiphtml)
              // console.log(convertData(data))
              return toolTiphtml;
            } else {
              for (let i = 0; i < toolTipData.length; i++) {
                if (params.name == toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ':<br>'
                  for (let j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                  }
                }
              }
              console.log(toolTiphtml)
              // console.log(convertData(data))
              return toolTiphtml;
            }
          }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
          show: true,
          min: 0,
          max: maxValue,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {

            color: ['#DCF3FF', '#0067E9'] // 蓝


          }
        },

        geo: {
          show: true,
          map: mapName,
          label: {
              normal: {
                  show: false
              },
              emphasis: {
                  show: false,
              }
          },
          roam: false,
          itemStyle: {
              normal: {
                  areaColor: '#DCF3FF',
                  borderColor: '#fff',
              },
              emphasis: {
                  areaColor: '#00B1FF',
              }
          }
      },
      series: [{
        name: '散点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: function(val) {
            return val[2]/val[2]*5;
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#333'
            }
        }
    },
    {
        type: 'map',
        map: mapName,
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
            normal: {
                show: true
            },
            emphasis: {
                show: false,
                textStyle: {
                    color: '#fff',
                }
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7'
            }
        },
        animation: false,
        data: data
    },
    {
        name: '点',
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 6,
    },
    {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data.sort(function(a, b) {
            return b.value - a.value;
        }).slice(0, 10)),
        symbolSize: function(val) {
            return val[2]/val[2]*5;
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                formatter: '{b}',
                position: 'left',
                show: false
            }
        },
        itemStyle: {
            normal: {
                color: 'yellow',
                shadowBlur:10,
                shadowColor: 'yellow'
            }
        },
        zlevel: 1
    },

]
      });



      //解决自适应
      setTimeout(function () {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }, 500);

    },

   

    //车场统计
    parkCount() {
      this.parkStatistics = this.$echarts.init(document.getElementById('parkStatistics'));
      let parkProvince = [];
      let parkNum = [];
      if(0 < this.getParkData.length){
        this.getParkData.forEach((item,index)=>{
          parkProvince.push(item.name.replace('省',''));
          parkNum.push(item.value);
        })
      }else{
        parkProvince = [];
        parkNum = [];
      }
      var option = {
        // title: {
        //     text: '世界人口总量',
        //     subtext: '数据来自网络'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //     data: ['2011年', '2012年']
        // },
        grid: {
          left: '3%',
          right: '4%',
          top: '3%',
          // botton:'0%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: parkProvince
        },
        series: [
          {
            name: '车场数量',
            type: 'bar',
            // barWidth: 10,
            barMaxWidth: 10,
            data: parkNum
          },
        ]
      };
      this.parkStatistics.setOption(option);
    },


    //收入金额
    incomeAmountLine() {
      let dayNameData = [];
      let dayNumData = [];
      let y = this.countTime.split('-')[0];
      let m = this.countTime.split('-')[1];
      // alert(y,m,this.mGetDate(y,m));
      this.dayNum = this.mGetDate(y,m);
      // let arr = new Array(this.dayNum);
      if(0 < this.everyData.length){
        this.everyData.forEach((item,index)=>{
          let month = parseInt(item.billMonthDay.toString().substr(4,2));
          let day = parseInt(item.billMonthDay.toString().substr(6,2));
          dayNameData.push(month + '/' + day);
          dayNumData.push(item.amount/100);
        })
      }else{
        for(var i =0;i<this.dayNum;i++){
          dayNameData.push(m + '/' + (i + 1));
          dayNumData.push(0);
        }
      }
      this.incomeAmount = this.$echarts.init(document.getElementById('incomeAmount'));
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '3%',
          left: '1%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dayNameData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: dayNumData,
          type: 'line'
        }]
      };
      this.incomeAmount.setOption(option);
    },

    //收入类型
    incomeTypePieChart() {
      let dataSource = [];
      let typeNum = [
        { value: 0, name: '开户返佣' },
        { value: 0, name: '支付返佣' },
        { value: 0, name: '物料返佣' },
      ];
      let typeNumData = [];
      if(0 < this.typesIncomeRebate.length){
        this.typesIncomeRebate.forEach((item,index)=>{
          let json = {};
          if(0 < item.rewardAmount){
            json.value = item.rewardAmount/100;
          }else{
            json.value = 0
          }
          json.name = item.rewardName;
          json.p = item.proportion;
          typeNumData.push(json);
        })
        dataSource = typeNumData;
        
      }else{
        dataSource = typeNum; 
      }
      this.incomeType = this.$echarts.init(document.getElementById('incomeType'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // grid: {
        //   top: '3%',
        //   // left: '1%',
        //   // right: '1%',
        //   // bottom: '3%',
        //   containLabel: true
        // },
        legend: {
          orient: 'vertical',
          bottom: 0,
          formatter:function(name){
            let data = option.series[0].data;
            let total = 0;
            let tarValue = 0;
            let p = 0;
            for (let i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
                if (data[i].name == name) {
                    tarValue = data[i].value;
                }
            }
            if(0 != tarValue && 0 != total){
              p = (tarValue / total * 100).toFixed(2);
            }else{
              p = 0;
            }
            return name + '------' + p + '%' + '------' + tarValue;
          },
            
          data: ['开户返佣', '支付返佣', '物料返佣']
        },
        color : [ '#C01103', '#52C41A', '#FF8C17'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '50%'],
            center: ["50%", "44%"],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data:dataSource
          }
        ]
      };
      this.incomeType.setOption(option);

    },

    //收入来源
    incomeSourcePieChart() {
      let dataSource = [];
      let typeNum = [
        { value: 0, name: '支付宝' },
        { value: 0, name: '微信' },
      ];
      let typeNumData = [];
      if(0 < this.sourceIncome.length){
        this.sourceIncome.forEach((item,index)=>{
          let json = {};
          json.value = item.rewardAmount/100;
          json.name = item.rewardName;
          json.p = item.proportion;
          typeNumData.push(json);
        })
        dataSource = typeNumData;
        
      }else{
        dataSource = typeNum; 
      }
      this.incomeSource = this.$echarts.init(document.getElementById('incomeSource'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: 0,
          formatter:function(name){
            let data = option.series[0].data;
            let total = 0;
            let tarValue = 0;
            let p = 0;
            for (let i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
                if (data[i].name == name) {
                    tarValue = data[i].value;
                }
            }
            if(0 != tarValue && 0 != total){
              p = (tarValue / total * 100).toFixed(2);
            }else{
              p = 0;
            }
            return name + '------' + p + '%' + '------' + tarValue;
            
         },
          data: ['支付宝', '微信']
        },
        color : ['#52C41A', '#354CFF'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '50%'],
            center: ["50%", "44%"],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: dataSource
          }
        ]
      };
      this.incomeSource.setOption(option);
    },

    //收入分布
    incomeDistributionPieChart() {
      let showName = [];
      let dataSource = [];
      let typeNum = [];
      let typeNumData = [];
      if(0 < this.incomeExpenditure.length && this.incomeExpenditure.length  < 5){
        this.incomeExpenditure.forEach((item,index)=>{
          let json = {};
          if(0 < item.inComeAmount){
            json.value = item.inComeAmount/100;
          }else{
            json.value = 0;
          }
          json.name = item.orgName;
          typeNumData.push(json);
          showName.push(item.orgName);
        })
        dataSource = typeNumData;
      }else if(5 <= this.incomeExpenditure.length){
        let num = 0;
        this.incomeExpenditure.forEach((item,index)=>{
          let json = {};
          if(index >= 4){
            if(0 < item.inComeAmount){
              num += item.inComeAmount/100;
            }else{
              num += item.inComeAmount
            }
          }else{
            if(0 < item.inComeAmount){
              json.value = item.inComeAmount/100;
            }else{
              json.value = item.inComeAmount
            }
            json.name = item.orgName;
            typeNumData.push(json);
            showName.push(item.orgName);
          }
        })
         typeNumData.push({
            value:num,
            name:'其他'
          })
          dataSource = typeNumData;
          showName.push('其他');
      }else{
        dataSource = [
          {
            value:0,
            name:'其他'
          }
        ]; 
        showName = ['其他'];
      }
      this.incomeDistribution = this.$echarts.init(document.getElementById('incomeDistribution'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // grid: {
        //   top: '3%',
        //   // left: '1%',
        //   // right: '1%',
        //   // bottom: '3%',
        //   containLabel: true
        // },
        legend: {
          orient: 'vertical',
          bottom:0,
          formatter:function(name){
            let data = option.series[0].data;
              let total = 0;
              let tarValue = 0;
              let p = 0;
              for (let i = 0, l = data.length; i < l; i++) {
                  total += data[i].value;
                  if (data[i].name == name) {
                      tarValue = data[i].value;
                  }
              }
              if(0 != tarValue && 0 != total){
                p = (tarValue / total * 100).toFixed(2);
              }else{
                p = 0
              }
              return name + '------' + p + '%' + '------' + tarValue;
          },
          data: showName
        },
        color : ['#C01103', '#52C41A','#354CFF','#FF8C17'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '50%'],
            center: ["50%", "44%"],
            emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data:dataSource
          }
        ]
      };
      this.incomeDistribution.setOption(option);
    },

    //支出金额
    expenditureAmountLine() {
      let dayNameData = [];
      let dayNumData = [];
      let y = this.countTime.split('-')[0];
      let m = this.countTime.split('-')[1];
      this.dayNum = this.mGetDate(y,m);
      // let arr = new Array(this.dayNum);
      if(0 < this.everyData.length){
        this.everyData.forEach((item,index)=>{
          let month = parseInt(item.billMonthDay.toString().substr(4,2));
          let day = parseInt(item.billMonthDay.toString().substr(6,2));
          dayNameData.push(month + '/' + day);
          dayNumData.push(item.amount/100);
        })
      }else{
        for(var i =0;i<this.dayNum;i++){
          dayNameData.push(m + '/' + (i + 1));
          dayNumData.push(0);
        }
      }
      this.expenditureAmount = this.$echarts.init(document.getElementById('expenditureAmount'));
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '3%',
          left: '1%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dayNameData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: dayNumData,
          type: 'line'
        }]
      };
      this.expenditureAmount.setOption(option);
    },

    //支出类型
    expenditureTypePieChart(){
      let dataSource = [];
      let typeNum = [
        { value: 0, name: '开户返佣' },
        { value: 0, name: '支付返佣' },
        { value: 0, name: '物料返佣' },
      ];
      let typeNumData = [];
      if(0 < this.typesIncomeRebate.length){
        this.typesIncomeRebate.forEach((item,index)=>{
          let json = {};
          if(0 < item.rewardAmount){
            json.value = item.rewardAmount/100;
          }else{
            json.value = 0
          }
          json.name = item.rewardName;
          json.p = item.proportion;
          typeNumData.push(json);
        })
        dataSource = typeNumData;
        
      }else{
        dataSource = typeNum; 
      }
      this.expenditureType = this.$echarts.init(document.getElementById('expenditureType'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        grid: {
          top: '3%',
          // left: '1%',
          // right: '1%',
          // bottom: '3%',
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          left:400,
          top: 40,
          bottom: 20,
          formatter:function(name){
            let data = option.series[0].data;
            let total = 0;
            let tarValue = 0;
            let p = 0;
            for (let i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
                if (data[i].name == name) {
                    tarValue = data[i].value;
                }
            }
            if(0 != tarValue && 0 != total){
              p = (tarValue / total * 100).toFixed(2);
            }else{
              p = 0;
            }
            return name + '------' + p + '%' + '------' + tarValue;
         },
          data:['开户返佣', '支付返佣', '物料返佣']
        },
        color : [ '#C01103', '#52C41A', '#FF8C17'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '70%'],
            center: ["30%", "54%"],
            emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data:dataSource
          }
        ]
      };
      this.expenditureType.setOption(option);
    },

    //支出分布
    expenditureSourcePieChart(){
      // alert("支出分布")
      let showName = [];
      let dataSource = [];
      let typeNum = [];
      let typeNumData = [];
      if(0 < this.incomeExpenditure.length && this.incomeExpenditure.length  < 5){
        this.incomeExpenditure.forEach((item,index)=>{
          let json = {};
          if(0 < item.outComeAmount){
            json.value = item.outComeAmount/100;
          }else{
            json.value = 0;
          }
          json.name = item.orgName;
          typeNumData.push(json);
          showName.push(item.orgName);
        })
        dataSource = typeNumData;
      }else if(5 <= this.incomeExpenditure.length){
        let num = 0;
        this.incomeExpenditure.forEach((item,index)=>{
          let json = {};
          if(index >= 4){
            if(0 < item.outComeAmount){
              num += item.outComeAmount/100;
            }else{
              num += item.outComeAmount
            }
          }else{
            if(0 < item.outComeAmount){
              json.value = item.outComeAmount/100;
            }else{
              json.value = item.outComeAmount
            }
            json.name = item.orgName;
            typeNumData.push(json);
            showName.push(item.orgName);
          }
        })
         typeNumData.push({
            value:num,
            name:'其他'
          })
          dataSource = typeNumData;
          showName.push('其他');
      }else{
        dataSource = [
          {
            value:0,
            name:'其他'
          }
        ]; 
        showName = ['其他'];
      }
      this.expenditureSource = this.$echarts.init(document.getElementById('expenditureSource'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left:340,
          top: 40,
          bottom: 20,
          formatter:function(name){
            let data = option.series[0].data;
              let total = 0;
              let tarValue = 0;
              let p = 0;
              for (let i = 0, l = data.length; i < l; i++) {
                  total += data[i].value;
                  if (data[i].name == name) {
                      tarValue = data[i].value;
                  }
              }
              if(0 != tarValue && 0 != total){
                p = (tarValue / total * 100).toFixed(2);
              }else{
                p = 0;
              }
              return name + '------' + p + '%' + '------' + tarValue;
          },
          data:showName
        },
        color : ['#C01103', '#52C41A','#354CFF','#FF8C17'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '70%'],
            center: ["22%", "54%"],
            emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: dataSource
          }
        ]
      };
      this.expenditureSource.setOption(option);
    },

    //切换tabs响应事件
    handleClick(tab, event) {
      if (this.activeName == 'first') {
        this.dataForm.queryType =1;
        this.dailyStatistics('1');
        this.getTradeParamType('1');
        this.getDistribInfo();
        this.getTradeDisTrib('1');
        this.$nextTick(() => {
          this.incomeAmount.resize();
        });
      }
      if (this.activeName == 'second') {
        this.dataForm.queryType =2;
        this.dailyStatistics('2');
        this.getTradeParamType('2');
        this.getTradeDisTrib('2');
        this.$nextTick(() => {
          this.expenditureAmount.resize();
          this.expenditureType.resize();
          this.expenditureSource.resize();
        });
      }
    },

    //查看全部
    seeAllInfo(data){
      if('1' === data){
        this.dialogSeeAllVisible = true;
      }else{
        this.dialogSeeAllSourceVisible = true;
      }
    },

    //调用查看全部接口

    
    //选择月份
    changeTime(e){
      if(null != e){
        this.dataForm.billMonth = this.countTime.replace(/-/g,"");
      }else{
        this.dataForm.billMonth = '';
      }
    } 
    
  },
}