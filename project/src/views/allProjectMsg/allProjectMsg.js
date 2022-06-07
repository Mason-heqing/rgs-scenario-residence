import echarts from 'echarts'
import { number } from 'echarts'
require('echarts/map/js/china')
import {mixin} from '../../utils/mixin'
export default {
    mixins:[mixin],
    data() {
        return {
            chargeMsgList:{},  //收费金额
            housingNumberList:{}, // 小区总数
            crewNumberList:{},   //人员总数
            facilityNumberList:{},  //设备总数
            nationwideList:[],    //全国数据展示
            allMsgList:[],
            dataListA:[],
            arr:0,
            parkMoneyData:[],   //停车场收费
            dataName:[],
            dataValue:[],
            totalMoney:[],
            dataListB:[],   //日期
            parkContent:[],  // 停车缴费明细
            parkPayFee:0,   //停车缴费金额
            vipContent:[],   //会员缴费明细
            vipPayFee:0,     //会员缴费金额
            monthNumber:[],
            carInContent:[], //车辆进入
            carOutContent:[],  // 
            dataListC:[],
            personInContent:[],
            personOutContent:[],
            carIn:0,           //车辆进入 
            carOut:0,           //车辆离开
            personIn:0,             //人员进入
            personOut:0 ,       //人员离开
            value1:''
        }
    },
    created() {
        this.getTime();
        this.getNationwideMsg();
        this.getHeaderMsh();
        this.getParkMoney();
        this.getMonthCharge();
        this.getTurnoverMsg();
        
    },
    mounted() {
    
        
    },
    methods: {

        showEcharts() {
                var myChart = this.$echarts.init(document.getElementById('main'));
                myChart.setOption({
                    title: {
                        text: `今日停车收费明细 ${this.getDady}`,
                        textStyle:{
                            fontWeight: 500
                        }
                        // subtext: '数据来自网络'
                    },
                    tooltip: {
                        trigger: 'item',
                        // formatter (params, ticket, callback) { 
                            
                        //     let dom = `
                        //     <p>来源：${params.data.name}</p></br>
                        //     <p>金额：${params.data.value}</p>
                        //     `
                        //     return dom
                        //     console.log(params.data)
                        // }
                    },
                    
                    color:['#ffb7d4',  '#4cd0dd','#f9d858','#5fbb5f','#df86f0'],
                    series: [
                        {
                            type: 'pie',
                            // selectedMode: 'single',
                            radius: [0, '20%'],
                            label: {
                                position: 'inner',
                                fontSize: 12,
                                    show: false 
                            },
                            data:this.totalMoney
                        },
                        {
                            name: '收费来源',
                            type: 'pie',
                            radius: ['30%', '40%'],
                            data:this.parkMoneyData
                        }
                    ]
                });
                     //解决自适应
            setTimeout(function () {
                window.addEventListener("resize", () => {
                myChart.resize();
                });
            }, 500);
        },
        showEcharts2() {
                var myChart = this.$echarts.init(document.getElementById('main_b'));
                myChart.setOption({
                    title: {
                        text: `各小区数量统计 ${this.getDady}`,
                        textStyle:{
                            fontWeight: 500
                        }
                        // subtext: '数据来自网络'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['2011年']
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    color: ['#6dd5ed'],
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: this.dataName,
                        axisLabel:{
                            // textStyle:{
                            //     color:'#ffffff'
                            // }
                        },
                        axisTick: {
                            show: false
                            },
                    
                    },
                    series: [
                        {
                            name: '小区数量',
                            type: 'bar',
                            data: this.dataValue
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
            // 地图数据展示
            showEcharts3() {
                var datas = this.dataListA
                let  myChart = this.$echarts.init(document.getElementById('china_map'))
            
            // 进行相关配置
            let _that = this
                myChart.setOption ({ 
                    tooltip: { // 鼠标移到图里面的浮动提示框
                    
                // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
                    formatter (params, ticket, callback) { 
                        let Mhousehold = params.data.details;
                                
                        let obj = Mhousehold.map(item => {
                            
                                return item.person.household
                        })
                        let obj2 =  Mhousehold.map(item => {
                                return item.person.employee
                        })
                        let obj3 =  Mhousehold.map(item => {
                                return item.person.tenant
                        })
                        let obj4 =  Mhousehold.map(item => {
                                return item.person.total
                        })
                        let arr = obj.reduce((a,b) => {
                            return a + b
                        })
                        let arr2 = obj2.reduce((a,b) => {
                                return a + b
                        })
                        let arr3 = obj3.reduce((a,b) => {
                            return a + b
                        })
                        let arr4 = obj4.reduce((a,b) => {
                            return a + b
                        })
                        // 报修、投诉等数据处理
                        let obj5 =   Mhousehold.map(item => {
                            return item.residence.complain
                        })
                        let obj6 =   Mhousehold.map(item => {
                            return item.residence.audit
                        })
                        let obj7 =   Mhousehold.map(item => {
                            return item.residence.repair
                        })
                        let obj8 =   Mhousehold.map(item => {
                            return item.residence.total
                        })
                        let arr5 = obj5.reduce((a,b) => {
                            return a + b
                        })
                        let arr6 = obj6.reduce((a,b) => {
                            return a + b
                        })
                        let arr7 = obj7.reduce((a,b) => {
                            return a + b
                        })
                        let arr8 = obj8.reduce((a,b) => {
                            return a + b
                        })

                    // params.data 就是series配置项中的data数据遍历
                        
                    let htmlStr = `
                        <div style='font-size:18px;'>${params.data.name}</div></br>
                        <div style='display: flex;align-items: center;'>
                        <p style='width:12px;height:12px;border-radius:50px; background:#03A356;'></p>
                        &nbsp;&nbsp;
                        <p>小区数量: ${params.data.value[2]}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p style='width:12px;height:12px;border-radius:50px; background:#E6A23C;'></p>
                        &nbsp;&nbsp;
                        <p>待审核: ${arr6}</p>
                        </div>
                        <div style='display: flex;align-items: center;'>
                        <p style='width:12px;height:12px;border-radius:50px; background:blue;'></p>
                        &nbsp;&nbsp;
                        <p>住户数量: ${arr}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p style='width:12px;height:12px;border-radius:50px; background:#E6A23C;'></p>
                        &nbsp;&nbsp;
                        <p>投诉: ${arr5}</p>
                        </div>
                        <div style='display: flex;align-items: center;'>
                        <p style='width:12px;height:12px;border-radius:50px; background:#5fbb5f;'></p>
                        &nbsp;&nbsp;
                        <p>租户数量: ${arr3}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p style='width:12px;height:12px;border-radius:50px; background:red;'></p>
                        &nbsp;&nbsp;
                        <p>报修: ${arr7}</p>
                        </div>
                        <div style='display: flex;align-items: center;'>
                        <p style='width:12px;height:12px;border-radius:50px; background:#4994e8;'></p>
                        &nbsp;&nbsp;
                        <p>员工数量: ${arr2}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p style='width:12px;height:12px;border-radius:50px; background:#409EFF;'></p>
                        &nbsp;&nbsp;
                        <p>小区总数: ${arr8}</p>
                        </div>
                        <div style='display: flex;align-items: center;'>
                        <p style='width:12px;height:12px;border-radius:50px; background:#67C23A;'>
                        &nbsp;&nbsp;
                        </p><p>人员总数: ${arr4}</p>
                        </div>
                    `
                    return htmlStr
                },
                // backgroundColor:"#ff7f50",//提示标签背景颜色
                // textStyle:{color:"#fff"} //提示标签字体颜色
                }, 
                // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
                visualMap: { // 左下角的颜色区域
                    show: true,
                    
                    min: 0,
                    max: 100,
                    left: '5%',
                    top: 'bottom',
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {
                        color: ['#3f74b9', '#04387b'] // 蓝绿
                    },
                    textStyle: {
                        color: '#fff'    // 值域控件的文本颜色
                    },
            
                // pieces: [ 
                    
                //     // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
                //     // {gt: 50, lte: 100, label: '非常好', color: '#6ad86e'}, // (900, 1000]
                //     // {gt:1, lte: 20, label: '正常', color: '#9adcfa'}, // (500, 900]
                //     // {gt: 20, lte: 50, label: '警告', color: '#ffeb3b'}, // (310, 500]
                
                //     {value: 1, label: '不好', color: 'red'}, // [0]
                //     {value: 2, label: '', color: '#6ad86e'}, // [0]
                //     {value: 31, label: 'add', color: '#9adcfa'}, 
                //     {value: 15, label: 'add', color: 'balck'},// [0]
                //     {value: 26, label: 'add', color: 'lawngreen'}
                // ]
                },
                // geo配置详解： https://echarts.baidu.com/option.html#geo
                geo: { // 地理坐标系组件用于地图的绘制
                    map: 'china', // 表示中国地图
                    roam: true, // 是否开启鼠标缩放和平移漫游
                    zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
                    show:true,
                    type:'scatter',
                    label: {
                        color: "rgb(0, 0, 0,255)",  //省份名字
                        show: true
                },
                // backgroundColor: '#404a59',
                itemStyle: { // 地图区域的多边形 图形样式。
                    areaColor:'#AAD5FF',//地图区域背景颜色
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    emphasis: { // 高亮状态下的多边形和标签样式
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                },
                series: [
                    {
                        name: '小区数量', // series名称
                        type: 'effectScatter', // series图表类型
                        coordinateSystem: 'geo' ,// series坐标系类型
                        symbolSize:12,   //标记大小
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                color: 'yellow',
                                shadowBlur: 10,
                                shadowColor: 'yellow'
                            }
                        },
                    
                        data:datas
                    },
            
                {
                    name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
                    type: 'map',
                    geoIndex: 0,
                    label: {
                    show: true
                    },
                
                    // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
                    data: this.dataListA
                
                },
                
                ]
            })
                 //解决自适应
        setTimeout(function () {
            window.addEventListener("resize", () => {
            myChart.resize();
            });
        }, 500);

        },
        // 月缴费统计
        showEcharts4() {
            var myChart = this.$echarts.init(document.getElementById('bottom_ech'));
            myChart.setOption({
                color: ['#80FFA5', '#00DDFF'],
                title: {
                    text: `月缴费统计`,
                    textStyle:{
                        fontWeight: 500
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                // legend: {
                //     data:['停车缴费','会员缴费']
                // },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.dataListB,
                        axisTick: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        }
                    }
                ],
                
                series: [
                
                    {
                        name: '停车缴费',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 221, 255)'
                            }, {
                                offset: 1,
                                color: 'rgba(77, 119, 255)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data:this.parkContent
                    },
                    {
                        name: '会员缴费',
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(55, 162, 255)'
                            }, {
                                offset: 1,
                                color: 'rgba(116, 21, 219)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data:this.vipContent
                    },
                    

                ]
            })
              //解决自适应
        setTimeout(function () {
            window.addEventListener("resize", () => {
            myChart.resize();
            });
        }, 500);
    
        },
        // 出入流量表
        showEcharts5() {
            var myChart = this.$echarts.init(document.getElementById('bottom_ech2'));
            myChart.setOption({
                title: {
                    text: `车辆出入统计`,
                    textStyle:{
                        fontWeight: 500
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
            
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '4%',
                    containLabel: true
                },
                legend: {
                    data: ['人员进入','人员离开','车辆进入','车辆离开']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.dataListC,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        axisTick: {
                            show: false
                        }
                    },
                    {
                        type: 'value',
                        
                    }
                ],
                series: [
                    {
                        name: '人员进入',
                        type: 'bar',
                        data: this.personInContent
                    },
                    {
                        name: '人员离开',
                        type: 'bar',
                        data:this.personOutContent
                    },
                    {
                        name: '车辆进入',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth:true,//设置折线图平滑
                        data: this.carInContent
                    },
                    {
                        name: '车辆离开',
                        type: 'line',
                        smooth:true,//设置折线图平滑
                        yAxisIndex: 1,
                        data: this.carOutContent
                    }
                ]
            })
                 //解决自适应
            setTimeout(function () {
                window.addEventListener("resize", () => {
                myChart.resize();
                });
            }, 500);
        },  
        // 获取头部展示数据
        getHeaderMsh() {
            this.utils.http({
                url:'/home/page/v2/head/content',
                method:'GET',

            },
                res => {
                    if(res.code == 200) {
                        this.chargeMsgList = res.data.parkCharge
                        this.housingNumberList = res.data.residence
                        this.crewNumberList = res.data.person
                        this.facilityNumberList = res.data.device
                    }
                    console.log(res,'头部数据')
                }
            )
        },
        // 获取当日停车收费金额
        getParkMoney() {
            this.utils.http({
                url:'/home/page/v2/today/park/charge',
                method:'GET'
            },
                res => {
                    if(res.code == 200) {
                        let monthAmount = {value:res.data.monthAmount, name:'月租车缴费' }
                        let storeAmount = {value:res.data.storeAmount, name:'储值车缴费' }
                        let storeRechage = {value:res.data.storeRechage, name:'储值车充值' }
                        let tempAmount = {value:res.data.tempAmount , name:'临时车缴费' }
                        this.parkMoneyData.push({...monthAmount},{...storeAmount},{...storeRechage},{...tempAmount})
                        this.totalMoney.push({value:(monthAmount.value+storeAmount.value+storeRechage.value+tempAmount.value).toFixed(2),name:'总金额'})
                        this.showEcharts();
                    }
                    console.log(res,'总金额')
                }
            )
        },
        // 全国小区汇总数据
        getNationwideMsg() {
            this.utils.http({
                url:'/home/page/v2/province/residence/statistics',
                method:'GET'
            },
                res => {
                    if(res.code == 200) {
                        this.nationwideList = res.data
                        this.dataListA.push(...this.nationwideList.map(item => {
                            return {name:item.provinceShortName,value:item.value,details:item.details}
                        }))
                        this.dataName.push(...this.nationwideList.map(item => {
                            return item.provinceShortName
                        }))
                        this.dataValue.push(...this.nationwideList.map(item => {
                            return item.value[2]
                        }))
                        console.log(this.nationwideList ,'全国数据')
                        this.showEcharts3();
                        this.showEcharts2();
                    }
                    // console.log(res,'全国数据')
                
                }
            )
        },
        // 获取月收费金额
        getMonthCharge() {
            console.log()
            this.utils.http({
                url:'/home/page/v2/month/pay/fee/statistics',
                method:'GET',
                params:{
                    dateTime:this.getDady
                }
            },
                res => {
                    if(res.code == 200) {
                        console.log(res,'月缴费')
                        this.dataListB = res.data.dataList
                        this.parkContent = res.data.parkContent
                        this.parkPayFee = res.data.parkPayFee
                        this.vipContent = res.data.vipContent
                        this.vipPayFee =  res.data.vipPayFee
                        this.showEcharts4();
                        console.log(this.monthNumber,'this.monthNumber')
                    }
                    
                }
            )
        },
        // 切换时间获取数据
        getTimeN(e) {
            this.getDady = this.value1
            if(this.getDady == '') {
                return
            }else {
                this.getMonthCharge();
            }
        
        },
        // 获取全国出入流量统计
        getTurnoverMsg() {
            this.utils.http({
                url:'/home/page/v2/inout/statistics',
                method:'GET',
                params:{
                    dateTime:this.getDady
                }
            },
                res => {
                    if(res.code == 200) {
                        this.carIn = res.data.carIn,
                        this.carInContent = res.data.carInContent,
                        this.carOut = res.data.carOut,
                        this.carOutContent = res.data.carOutContent,
                        this.dataListC = res.data.dataList,
                        this.personIn = res.data.personIn,
                        this.personInContent = res.data.personInContent,
                        this.personOut = res.data.personOut,
                        this.personOutContent = res.data.personOutContent,
                        this.showEcharts5();
                    }
                    console.log(res,'出入流量')
                }
            )
        }
    },
}