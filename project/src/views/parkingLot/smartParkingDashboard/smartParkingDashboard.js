import HeaderDiv from '../../../components/header.vue';
import footerDiv from '../../../components/footer.vue';
import Sidebar from '../../../components/sidebar.vue';
import china from 'echarts/map/json/china.json';
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      // msg: '来访记录',
      parkDistribution: null,//车产分布
      getParkData:[],//获取车场数据
      payType:null,//今日支付方式分析
      chargeType:null,//今日支付类型分析
      getPayTypeList:[],//获取支付方式分析数据
      getChargeTypeList:[],//获取支付类型分析数据
      statistics:null,//月统计
      nearThrityOnlinePay:[],//月统计线上支付
      nearThrityAllPay:[],//月统计车场收入
      times:[],
      monthAmount:'',//月租车缴费
      onlineAmount:'',//今日线上订单金额
      onlineOrder:'',//今日线上订单数
      storeAmount:'',//储值车缴费
      storeRechage:'',//储值车充值
      tempAmount:'',//临时车缴费
      totalGroupNums:'',//总车位数
      totalParkNums:'',//总车场数
    }
  },

  watch: {

  },
  filters: {

  },
  created() {
    this.parkArea();
    // this.$nextTick(() => {
    //     this.statistics.resize();
    // });
  },
  components: {
    Sidebar,
    HeaderDiv,
    footerDiv,
    TableCmp
  },
  computed: {
    // parkId: {
    //   get() {
    //     return this.$store.state.project.projectId
    //   },
    //   set(v) {
    //     this.$store.commit('changeProjectId', v)
    //   }
    // }
  },
  watch:{
    // parkId(value){
    //   // alert(newFlag);
    //   this.dataForm.parkId = value;
    //   this.getListData();
    // }
  },
  mounted() {
     this.getPayType();
     this.getChargeType();
     this.getOnlinePay();
     this.getIndexInfo();
     window.addEventListener('resize', () => {
        this.payType.resize();
        this.chargeType.resize();
        // this.statistics.resize();
        // this.expenditureType.resize();
        // this.expenditureSource.resize();
    })
    
  },
  methods: {


    //车场分布接口调用
    parkArea(){
        this.utils.http({
          url: "/manage/park/index/getParkDistr",
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
                  num += item.counts;  
                 })
                 this.parkAcount = num;
                 this.getParkData =  res.data;
                 this.parkDis();
              }else{
                this.getParkData = [];
                this.parkDis();
              }
              
            }
  
          });
    },

    //车场分布
    parkDis() {
        // 基于准备好的dom(myEchartPillar)，初始化echarts实例
        // this.parkArea()
        let myChart = this.$echarts.init(this.$refs.map);
        console.log("mychart",myChart);
        console.log("返回数据----->",this.getParkData)
        this.$echarts.registerMap('china',china);
        let showData = [];
        let toolTipDataArray = [];
        let maxArr= [];
        let maxValue = 10;
        
        if(0 < this.getParkData.length){
          this.getParkData.forEach((item,index)=>{
            let showJson = {};
            let toolTipJson = {};
            let value = [];
            let parkContentJson = {};
            showJson.name = item.name.replace("省",'');
            showJson.value = item.counts;
            maxArr.push(item.value);
            showData.push(showJson);
            toolTipJson.name = item.name.replace("省",'');
            parkContentJson.name = "车场数量";
            parkContentJson.value = item.counts;
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

    //获取支付方式分析数据
    getPayType(){
        this.utils.http({
            url: "/manage/park/index/getPayType",
            method: "GET",
            // params: { appId: this.appId }
            // params: {appId:nice}
          },
            res => {
              if (res.code == 200) {
                // this.realTimeList = res.data;
                if(0 < res.data.length){
                    this.getPayTypeList = res.data;

                //    let num = 0;
                //    res.data.forEach((item,index)=>{
                //     num += item.value;  
                //    })
                //    this.parkAcount = num;
                //    this.getParkData =  res.data;
                //    this.parkDis();
                }else{
                //   this.getParkData = [];
                //   this.parkDis();
                     this.getPayTypeList = [];
                }
                this.payTypePieChart();
                
              }
    
        });
    },

    
    //绘制支付方式分析饼图
    payTypePieChart(){
        let dataSource = [];
        let typeNum = [];
        let typeNumData = [];
        let dataName = [];
          console.log("getPayTypeList:",this.getPayTypeList)
          if(0 < this.getPayTypeList.length){
            this.getPayTypeList.forEach((item,index)=>{
              let json = {};
              json.value = item.amount;
              json.name = item.name;
              json.p = item.proportion;
              typeNumData.push(json);
              dataName.push(item.name)
            })
            dataSource = typeNumData;
            
          }else{
            dataSource = typeNum; 
          }
          console.log('typeNum',typeNum);
          console.log('dataSource',dataSource);
        this.payType = this.$echarts.init(document.getElementById('payType'));
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left:420,
            top: 90,
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
            data: dataName
          },
          color : ['#4ECB73', '#5D75FF','#59D4D4'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '60%'],
              center: ["30%", "54%"],
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
        this.payType.setOption(option);
    },

    //获取支付类型分析数据
    getChargeType(){
        this.utils.http({
            url: "/manage/park/index/getChargeType",
            method: "GET",
            // params: { appId: this.appId }
            // params: {appId:nice}
          },
            res => {
              if (res.code == 200) {
                // this.realTimeList = res.data;
                if(0 < res.data.length){
                    this.getChargeTypeList = res.data;

                //    let num = 0;
                //    res.data.forEach((item,index)=>{
                //     num += item.value;  
                //    })
                //    this.parkAcount = num;
                //    this.getParkData =  res.data;
                //    this.parkDis();
                }else{
                //   this.getParkData = [];
                //   this.parkDis();
                     this.getChargeTypeList = [];
                }
                this.chargeTypePieChart();
                
              }
    
            });
    },


    //绘制支付类型分析饼图
    chargeTypePieChart(){
        let dataSource = [];
        let typeNum = [];
        let typeNumData = [];
        let dataName = [];
          if(0 < this.getChargeTypeList.length){
            this.getChargeTypeList.forEach((item,index)=>{
              let json = {};
              json.value = item.amount;
              json.name = item.name;
              json.p = item.proportion;
              typeNumData.push(json);
              dataName.push(item.name)
            })
            dataSource = typeNumData;
            
          }else{
            dataSource = typeNum; 
          }
        this.chargeType = this.$echarts.init(document.getElementById('chargeType'));
         var option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left:460,
            top: 90,
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
            data: dataName
          },
          color : ['#5DB1FF', '#36CBCB','#6DD48C','#FBD437'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '60%'],
              center: ["30%", "54%"],
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
        this.chargeType.setOption(option);
    },


    //近30日线上支付统计
    getOnlinePay(){
        this.utils.http({
            url: "/manage/park/index/getNearThrityOnlinePay",
            method: "GET",
            // params: { appId: this.appId }
            // params: {appId:nice}
          },
            res => {
              if (res.code == 200) {
                // this.realTimeList = res.data;
                if(0 < res.data.length){
                    let times = [];
                    let data = [];
                    res.data.forEach((item,index)=>{
                        data.push(item.amount);
                        times.push(item.payDay);
                    })
                    this.nearThrityOnlinePay = data;
                    console.log("在线支付数据查看:",this.nearThrityOnlinePay);
                    this.times = times;
                    this.getParkingIncome();
                }else{

                     
                }
                
                
              }
    
            });
    },


    //近30日车场收入统计
    getParkingIncome(){
        this.utils.http({
            url: "/manage/park/index/getNearThrityAllPay",
            method: "GET",
            // params: { appId: this.appId }
            // params: {appId:nice}
          },
            res => {
              if (res.code == 200) {
                // this.realTimeList = res.data;
                if(0 < res.data.length){
                    let data = [];
                    res.data.forEach((item,index)=>{
                        data.push(item.amount);
                    })
                    this.nearThrityAllPay = data;
                    this.graphLine();
                }else{

                     
                }
                
                
              }
    
            });
    },


    //绘制近30日折线统计图
    graphLine(){
        console.log("在线支付",this.nearThrityOnlinePay);
        console.log("车场收入",this.nearThrityAllPay);
        console.log("时间",this.times);
        this.statistics = this.$echarts.init(this.$refs.chart);
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                icon: 'rect',
                itemHeight: 12,
                itemWidth: 12,
                top: 10,
                right: 30,
                textStyle: {
                    fontSize: 12,
                    color: '#567'
                },
                data: ['在线支付', '车场收入']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:this.times
            },
            yAxis: [{
                type: 'value',
                min: 0,
                splitNumber: 4,
                splitLine: {
                    show: true,

                },
                axisLine: {
                    show: true,
                },
                axisLabel: {
                    show: true,
                    // margin: 20,
                    textStyle: {
                        color: '#737373',

                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(131,101,101,0.2)',
                        type: 'dashed',
                    }
                }
            }],
            series: [
                {
                    name: '在线支付',
                    type: 'line',
                    symbolSize: 10,
                    lineStyle: {
						normal: {
							color: "#48B3FF"
						},
					},
                    itemStyle: {
						color: "#48B3FF",
						borderColor: "#48B3FF",
						borderWidth: 2,
						
					},
                    data: this.nearThrityOnlinePay
                },
                {
                    name: '车场收入',
                    type: 'line',
                    symbolSize: 10,
                    lineStyle: {
						normal: {
							color: "#6DD48C"
						},
					},
                    itemStyle: {
						color: "#6DD48C",
						borderColor: "#6DD48C",
						borderWidth: 2,
						
					},
                    data: this.nearThrityAllPay
                }
            ]
        };
        this.statistics.setOption(option);
      },

      //获取车场基本的信息
      getIndexInfo(){
        this.utils.http({
            url: "/manage/park/index/getIndexInfo",
            method: "GET",
            // params: { appId: this.appId }
            // params: {appId:nice}
          },
            res => {
              if (res.code == 200) {
                // this.realTimeList = res.data;
                this.monthAmount = res.data.monthAmount;
                this.onlineAmount = res.data.onlineAmount;
                this.onlineOrder = res.data.onlineOrder;
                this.storeAmount = res.data.storeAmount;
                this.storeRechage = res.data.storeRechage;
                this.tempAmount = res.data.tempAmount;
                this.totalGroupNums = res.data.totalGroupNums;
                this.totalParkNums = res.data.totalParkNums;
              }
            });
      },


    // //数据
    // getListData() {
    //   this.utils.http({
    //     url: "/park/page",
    //     method: "GET",
    //     params: this.dataForm
    //   },
    //     res => {
    //       if (res.code == 200) {
    //         this.total = res.data.total;
    //         this.currentPage = res.data.current;
    //         if(res.data.records && 0 < res.data.records.length){
    //           $.each(res.data.records,(index,item)=>{
    //             item.region = item.province + "/" + item.city
    //           })
    //           this.listData = res.data.records;
    //         }else{
    //           this.listData = []
    //         }
    //       }
    //     });
    // },



  },
}