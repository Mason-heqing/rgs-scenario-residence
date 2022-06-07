import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
    return {
      allCarBtnC:'primary',
      temporaryCarBtnC:'',
      storedVehicleBtnC:'',
      monthlyCcarRentalBtnC:'',
      vipCarBtnC:'',
      parkingRevenue:null,//临停车收入统计
      currentPage: 1,
      total: 0,
      timer: null,
      queryDays:[],
      queryDaysValue1:[],
      queryDaysValue2:[],
      totalParkOutNum:[],
      totalParkInNum:[],
      timers:[],
      dataForm:{
        appId:'',
        carType:'',
        currentPage:1,
        pageSize:10,
        startDate:'',
        endDate:'',
      },
      parkIncomeForm:{
        appId:'',
        currentPage:1,
        pageSize:10,
        carType:'',
      },
      pickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
      },
      tableLabel: [
        { label: '日期', param: 'payDate', align: 'left', sortable: true, isshow: true},
        { label: '范围', param: 'range', align: 'left', sortable: true, isshow: true},
        { label: '入场次数', param: 'parkInNum', align: 'left', sortable: true, isshow: true},
        { label: '出场次数', param: 'parkOutNum', align: 'left', sortable: true, isshow: true},
        // { label: '线上支付', param: 'payStatus', align: 'left', sortable: true, isshow: true,render(h) {
        //   if(0 === h.payStatus){
        //     return '待开通'
        //   }else if(1 === h.payStatus){
        //     return '待审核'
        //   }else if(2 === h.payStatus){
        //     return '已开通'
        //   }else if(3 == h.payStatus){
        //     return '拒绝审核'
        //   }else{
        //     return '禁用'
        //   }
        // },},
        // { slot: 'operate', isshow: true,align: 'right'}, // 操作列
      ],
      tableOption: [],
      tableSelect: [],
      listData: [],//表格数据
      isShowSelect: false,
      loading: false,
    }
  },

  watch: {

  },
  filters: {

  },
  created() {
    // console.log('获取token值',Cookies.get('TOKEN'));
    let scenarioId = Cookies.get('scenarioId')
    if('742482ddc92849d89bdb5a3ae1784ef3' == scenarioId){
         this.isScene = false;
    }else{
      this.isScene = true;
    }
    this.dataForm.appId = this.$store.state.project.projectId;
    this.parkIncomeForm.appId = this.$store.state.project.projectId;
    this.getTimeFn();
  },
  components: {
    MsgBox,
    FromDialog,
    TableCmp
  },
  computed: {
    parkId: {
      get() {
        return this.$store.state.project.projectId
      },
      set(v) {
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch:{
    parkId(value){
      // alert(newFlag);
      this.dataForm.parkId = value;
      this.getListData();
    }
  },
  mounted() {
    // let scenarioId = Cookies.get("scenarioId");
    // this.dataForm.scenarioId = scenarioId;
    this.getTrafficInfo();
    this.getListData();
    // this.parkingRevenues();
    // window.addEventListener('resize', () => {
    //   this.parkingRevenue.resize();
    // })
  },
  methods: {
     //设置默认时间
     getTimeFn() {
        const that = this;
        // let end = new Date();
        // let start = new Date();
        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        var nowDate = new Date();
        var cloneNowDate = new Date();
        var fullYear = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
        var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
        var endDate = this.getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
        var starDate = this.getFullDate(cloneNowDate.setDate(1));//当月第一天
        that.timers[0] = starDate;
        that.timers[1] = endDate;
        that.dataForm.startDate = starDate;
        that.dataForm.endDate = endDate;
        that.parkIncomeForm.startDate = starDate;
        that.parkIncomeForm.endDate = endDate;
      },
  
      getFullDate(targetDate) {
        var D, y, m, d;
        if (targetDate) {
            D = new Date(targetDate);
            y = D.getFullYear();
            m = D.getMonth() + 1;
            d = D.getDate();
        } else {
            y = fullYear;
            m = month;
            d = date;
        }
        m = m > 9 ? m : '0' + m;
        d = d > 9 ? d : '0' + d;
        return y + '-' + m + '-' + d;
    },
  
        /**
         * 格式化时间
        */
        formatDate(date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();
  
            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return myyear + "-" + mymonth;
        },
      //更改时间
      changeTime(e){
        console.log(e);
        if (this.timers !== null && this.timers.length > 0) {
            this.dataForm.startDate = this.timers[0];
            this.dataForm.endDate = this.timers[1];
            this.parkIncomeForm.startDate = this.timers[0];
            this.parkIncomeForm.endDate = this.timers[1];
            this.parkIncomeForm.startDate = this.timers[0];
            this.parkIncomeForm.endDate = this.timers[1];
          } else {
            this.dataForm.startDate  = "";
            this.dataForm.endDate  = "";
            this.parkIncomeForm.startDate = "";
            this.parkIncomeForm.endDate = "";
            this.timers = [];
          }
       },
    
       allDataQuery(){
        this.getTrafficInfo();
        this.getListData();
      },  
      
      
      selectCarType(type){
        // this.dataForm={
        //     appId:this.$store.state.project.projectId,
        //     currentPage:1,
        //     pageSize:10,
        //   }
        //   this.parkIncomeForm={
        //       appId:this.$store.state.project.projectId,
        //       currentPage:1,
        //       pageSize:10,
        //   }
          // this.timers = [];
          // this.getTimeFn();
        if('' == type){
            this.allCarBtnC='primary';
            this.temporaryCarBtnC='';
            this.storedVehicleBtnC='';
            this.monthlyCcarRentalBtnC='';
            this.vipCarBtnC='';
            this.dataForm.carType='';
            this.parkIncomeForm.carType='';
        }else if('0' == type){
            this.allCarBtnC='';
            this.temporaryCarBtnC='primary';
            this.storedVehicleBtnC='';
            this.monthlyCcarRentalBtnC='';
            this.vipCarBtnC='';
            this.dataForm.carType=0;
            this.parkIncomeForm.carType=0;
        }else if('2' == type){
            this.allCarBtnC='';
            this.temporaryCarBtnC='';
            this.storedVehicleBtnC='primary';
            this.monthlyCcarRentalBtnC='';
            this.vipCarBtnC='';
            this.dataForm.carType=2;
            this.parkIncomeForm.carType=2;
        }else if('1' == type){
            this.allCarBtnC='';
            this.temporaryCarBtnC='';
            this.storedVehicleBtnC='';
            this.monthlyCcarRentalBtnC='primary';
            this.vipCarBtnC='';
            this.dataForm.carType=1;
            this.parkIncomeForm.carType=1;
        }else if('4' == type){
            this.allCarBtnC='';
            this.temporaryCarBtnC='';
            this.storedVehicleBtnC='';
            this.monthlyCcarRentalBtnC='';
            this.vipCarBtnC='primary';
            this.dataForm.carType=4;
            this.parkIncomeForm.carType=4;
        }
        this.getTrafficInfo();
        this.getListData(); 
      },   



    //数据
    getListData() {
      this.utils.http({
        url: "/manage/park/analy/getEveryTraffic",
        method: "post",
        data: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.currentPage = res.data.current;
            if(res.data && 0 < res.data.length){
                this.queryDays = [];
                this.queryDaysValue1 = [];
                this.queryDaysValue2 = [];
                $.each(res.data,(index,item)=>{
                  this.queryDays.push(item.payDay);
                  this.queryDaysValue1.push(item.parkOutNum);
                  this.queryDaysValue2.push(item.parkInNum);
                })
                this.listData = res.data;
                this.parkingRevenues();
              }else{
                this.listData = []
              }
          }
        });
    },

    //车流基本信息 
    getTrafficInfo() {
        this.utils.http({
          url: "/manage/park/analy/getTrafficInfo",
          method: "post",
          data: this.parkIncomeForm
        },
          res => {
            if (res.code == 200) {
                if(res.data && null != res.data){
                    this.totalParkInNum = res.data.totalParkInNum;
                    this.totalParkOutNum = res.data.totalParkOutNum;
                  }else{
                    this.totalParkInNum = '';
                    this.totalParkOutNum = '';
                  }
            }
          });
      },

    //重置
    resetBtn(){
        this.dataForm={
          appId:this.$store.state.project.projectId,
          carType:'',
          currentPage:1,
          pageSize:10,
        }
        this.parkIncomeForm={
            appId:this.$store.state.project.projectId,
            currentPage:1,
            pageSize:10,
        }
        this.allCarBtnC='primary';
        this.temporaryCarBtnC='';
        this.storedVehicleBtnC='';
        this.monthlyCcarRentalBtnC='';
        this.vipCarBtnC='';
        this.dataForm.carType='';
        this.timers = [];
        this.getTimeFn();
        this.getTrafficInfo();
        this.getListData();
      },

    //分页
    handleSizeChange(val) {
      this.dataForm.pageSize = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.dataForm.currentPage = val;
      this.getListData();
    },
    //跳转到添加
    goAdd() {

    },

    //临时停车收入统计
    parkingRevenues(){
      this.parkingRevenue = this.$echarts.init(document.getElementById('parkingRevenue'));
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
                data: ['出场', '入场']
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
                data:this.queryDays
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
                    name: '出场',
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
                    data: this.queryDaysValue1
                },
                {
                    name: '入场',
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
                    data: this.queryDaysValue2
                }
            ]
        };
      this.parkingRevenue.setOption(option);
    },
  },
}