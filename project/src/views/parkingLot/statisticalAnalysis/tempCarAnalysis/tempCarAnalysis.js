import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
import Cookies from 'js-cookie';
import { rsort } from 'semver';
export default {
  name: 'home',
  data() {
    return {
      paymentChannels:null,
      payType:null,
      currentPage: 1,
      total: 0,
      timers:[],
      queryDays:[],
      queryDaysValue:[],
      avgAmout: 0,//平均金额
      payAmout: 0,//缴费金额
      payNums: 0,//缴费笔数
      channelList:[],//缴费数据获取
      payList:[],//支付方式获取
      isPaymentChannels:1,
      isPayType:1,
      dataForm:{
        appId:'',
        currentPage:1,
        chargeType:0,
        pageSize:10,
        startDate:'',
        endDate:'',
      },
      parkIncomeForm:{//汇报收入统计
        appId:'',
        chargeType:0,
        startDate:'',
        endDate:'',
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
        { label: '统计范围', param: 'range', align: 'left', sortable: true, isshow: true},
        { label: '缴费金额', param: 'payAmount', align: 'left', sortable: true, isshow: true},
        { label: '占比', param: 'proport', align: 'left', sortable: true, isshow: true},
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

      leftData: [],//左边侧边栏数据
      listData: [],//表格数据
      listDataForm: {
        userId: '',
        name: '',//项目名称/回调地址
        currentPage: "1",
        pageSize: '10',
      },
      isShowSelect: false,
      loading: false,
      imgurl: '',
    }
  },

  watch: {
    colOptions(valArr) {
      var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0); // 未选中
      this.colData.filter(i => {
        if (arr.indexOf(i.title) != -1) {
          i.istrue = false;
          this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
          });
        } else {
          i.istrue = true;
          this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
          });
        }
      });
    }
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
    this.getListData();
    this.getCharge();
    this.getTempChannel();
    this.getTempPayType();
    // this.paymentChannel();
    // this.payTypePie();
    // window.addEventListener('resize', () => {
    //   // this.paymentChannels.resize()();
    //   // this.payType.resize();
    // })
    // this.parkingRevenues();
    // window.addEventListener('resize', () => {
    //   this.parkingRevenue.resize();
    // })
  },
  methods: {
    // 设置默认时间
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
        } else {
          this.dataForm.startDate  = "";
          this.dataForm.endDate  = "";
          this.parkIncomeForm.startDate = "";
          this.parkIncomeForm.endDate = "";
          this.timers = [];
        }
    },

    //缴费渠道分布
    paymentChannel(){
      let data = [];
      if(0 < this.channelList.length){
        this.channelList.forEach(e =>{
          let json = {};
          json.name = e.payChannelName;
          json.value = e.payNums;
          data.push(json);
        })
      }else{
        data = [];
      }
      this.paymentChannels = this.$echarts.init(document.getElementById('paymentChannels'));
      let option = {
          legend: {
              top: 'bottom'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
         },
          toolbox: {
              show: true,
              feature: {
                  mark: {show: true},
                  dataView: {show: true, readOnly: false},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          series: [
              {
                  name: '缴费渠道',
                  type: 'pie',
                  radius: [80, 100],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  itemStyle: {
                      borderRadius: 8
                  },
                  data:data
              }
          ]
      };
      this.paymentChannels.setOption(option);
    },


    //支付方式分布
    payTypePie(){
      let data = [];
      if(0 < this.payList.length){
        this.payList.forEach(e=>{
          let json = {};
          json.name =  e.payTypeName;
          json.value = e.payNums;
          data.push(json);
        })
      }else{
        data = [];
      }
      this.payType = this.$echarts.init(document.getElementById('payType'));
      let option = {
          legend: {
              top: 'bottom'
          },
          toolbox: {
              show: true,
              feature: {
                  mark: {show: true},
                  dataView: {show: true, readOnly: false},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
         },
          series: [
              {
                  name: '支付方式',
                  type: 'pie',
                  radius: [80, 100],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  itemStyle: {
                      borderRadius: 8
                  },
                  data: data
              }
          ]
      };
      this.payType.setOption(option);
    },

    allDataQuery(){
      this.getListData();
      this.getCharge();
      this.getTempChannel();
      this.getTempPayType();
    },

    //数据
    getListData() {
      this.utils.http({
        url: "/manage/park/analy/getEveryAnalyCharge",
        method: "post",
        data: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.currentPage = res.data.current;
            if(res.data && 0 < res.data.length){
              this.queryDays = [];
              this.queryDaysValue = [];
              $.each(res.data,(index,item)=>{
                this.queryDays.push(item.payDay);
                this.queryDaysValue.push(item.payAmount);
              })
              this.listData = res.data;
              this.parkingRevenues();
            }else{
              this.listData = []
            }
          }
        });
    },

    //车类收入基本信息
    getCharge() {
      this.utils.http({
        url: "/manage/park/analy/getCharge",
        method: "post",
        data: this.parkIncomeForm
      },
        res => {
          if (res.code == 200) {
            if(res.data && null != res.data){
              this.avgAmout = res.data.avgAmout;
              this.payAmout = res.data.payAmout;
              this.payNums = res.data.payNums;
            }else{
              this.avgAmout = '';
              this.payAmout = '';
              this.payNums = '';
            }
          }
        });
    },

    //缴费渠道获取
    getTempChannel() {
      this.utils.http({
        url: "/manage/park/analy/getTempChannel",
        method: "post",
        data: this.parkIncomeForm
      },
        res => {
          if (res.code == 200) {
            if(res.data && 0 < res.data.length){
              this.isPaymentChannels = 1;
              res.data.forEach(element => {
                  if('1' == element.payChannelName){
                    element.payChannelName = '岗亭收费处';
                  }else if('2' == element.payChannelName){
                    element.payChannelName = '中央收费处';
                  }else if('3' == element.payChannelName){
                    element.payChannelName = '微信公众号';
                  }else if('4' == element.payChannelName){
                    element.payChannelName = '小程序';
                  }else if('5' == element.payChannelName){
                    element.payChannelName = 'APP';
                  }else if('6' == element.payChannelName){
                    element.payChannelName = '自助缴费机';
                  }
              });
              this.channelList = res.data;
            }else{
              this.isPaymentChannels = 0;
              this.channelList = [];
            }
            this.paymentChannel();
          }
        });
    },


    //支付方式获取
    getTempPayType() {
      this.utils.http({
        url: "/manage/park/analy/getTempPayType",
        method: "post",
        data: this.parkIncomeForm
      },
        res => {
          if (res.code == 200) {
            if(res.data && 0 < res.data.length){
              this.isPayType = 1;
              res.data.forEach(element => {
                  if('0' == element.payTypeName){
                    element.payTypeName = '现金 ';
                  }else if('1' == element.payTypeName){
                    element.payTypeName = '微信';
                  }else if('2' == element.payTypeName){
                    element.payTypeName = '支付宝';
                  }else if('3' == element.payTypeName){
                    element.payTypeName = '银联';
                  }else if('9' == element.payTypeName){
                    element.payTypeName = '其它';
                  }
              });
              this.payList = res.data;
            }else{
              this.isPayType = 0;
              this.payList = [];
            }
            this.payTypePie();
          }
        });
    },

    //重置
    resetBtn(){
        this.dataForm={
          appId:this.$store.state.project.projectId,
          chargeType:0,
          currentPage:1,
          pageSize:10,
        }
        this.parkIncomeForm={
          appId:this.$store.state.project.projectId,
          chargeType:0,
        }
        this.timers = [];
        this.channelList = [];
        this.payList = [];
        this.getTimeFn();
        this.getListData();
        this.getCharge();
        this.getTempChannel();
        this.getTempPayType();
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


    //临时停车收入统计
    parkingRevenues(){
      console.log("获取数据",this.queryDaysValue);
      this.parkingRevenue = this.$echarts.init(document.getElementById('parkingRevenue'));
      let option = {
        tooltip: {
					trigger: 'axis',
					backgroundColor: 'rgba(0,0,0,0.5)',
					axisPointer: {
						lineStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'red'
								}, {
									offset: 0.5,
									color: '#48b3FF',
								}, {
									offset: 1,
									color: '#d9efff'
								}],
								global: false
							}
						},
					},
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
            data: this.queryDays
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.queryDaysValue,
            type: 'line',
            smooth: true
        }]
    };
      this.parkingRevenue.setOption(option);
    },
  },
}