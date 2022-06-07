import MsgBox from '../../../../../components/dialog.vue'
import ExportBox from '../../../../../components/exportDialog.vue'
import AuthBox from '../../../../../components/authDialog.vue'
import TableCmp from '../../../../../components/table.vue'
import Cookies from "js-cookie";
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      popVisible:false,//是否显示信息弹框
      popTitle:'这个是标题',
      popContent:'这个是内容',
      totalTransactions:0,//交易总额
      totalHandlingCharge:0,//手续费总额
      totaltransferAmount:0,//划账总额
      total: 0,
      tableData: [],
      currentPage1:1,
      total1: 0,
      multipleSelection: [],//表格选中
      multipleSelection1: [],//查看明细表格选中
      timers:[],
      value: '',
      value1:'',
      parkList:[],
      dataForm:{
        currentPage:1,
        pageSize:10,
        statDateStart:'',//开始时间
        statDateEnd:'',//结束时间
        parkId:'',//车场id
        scenarioId:''//场景值
      },
      dataFormminxi:{ //查看明细
        currentPage:1,
        pageSize:10,
        parkId:'',
        searchDay:''
      },
      visitorPassble:[{  
        value:1,
        label:'有效'
      },{  
        value:2,
        label:'无效'
      },{  
        value:3,
        label:'过期'
      },{  
        value:4,
        label:'取消'
      }],
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
        { label: '兑帐日期', param: 'createDay', align: 'left', sortable: true, isshow: true},
        { label: '停车场', param: 'parkName', align: 'left', sortable: true, isshow: true},
        { label: '交易笔数', param: 'tradeNum', align: 'left', sortable: true, isshow: true},
        { label: '交易金额(元)', param: 'totalAccout', align: 'left', isshow: true, sortable: true,render(h) {
          let num = (h.totalAccout/100).toString()
          let index = num.indexOf('.')
          if (index !== -1) {
              num = num.substring(0, 4 + index + 1)
          } else {
              num = num.substring(0)
          }
          return parseFloat(num).toFixed(4)
        },},
        { label: '手续费（元）', param: 'serviceFee', align: 'left', isshow: true, sortable: true},
        { label: '划账金额（元）', param: 'Transfer', align: 'left', isshow: true, sortable: true,render(h) {
          let num = ((h.totalAccout/100-(h.serviceFee))).toString()
          let index = num.indexOf('.')
          if (index !== -1) {
              num = num.substring(0, 4 + index + 1)
          } else {
              num = num.substring(0)
          }
          return parseFloat(num).toFixed(4)
        },},
        { slot: 'operate', isshow: true }, // 操作列
      ],
      tableLabel1: [
        { label: '交易时间', param: 'payTime', align: 'center', sortable: true, isshow: true},
        { label: '停车场', param: 'parkName', align: 'center', sortable: true, isshow: true},
        { label: '车牌号码', param: 'voucherNo', align: 'center', sortable: true, isshow: true},
        { label: '业务类型', param: 'bizType', align: 'center', sortable: true, isshow: true,render(h) {
          if(1 === h.bizType){
            return '临时车'
          }
        },},
        { label: '支付方式', param: 'payType', align: 'center', sortable: true,isshow:true,render(h) {
          if('ALIPAY' === h.payType){
            return '支付宝'
          }else if('WECHAT ' === h.payType){
            return '微信'
          }else{
            return '其他'
          }
        },},
        { label: '交易金额(元)', param: 'settlementAmount', align: 'center', isshow: true, sortable: true,render(h) {
          return h.settlementAmount/100
        },},
        { label: '手续费（元）', param: 'serviceFee', align: 'center', isshow: true, sortable: true},
        { label: '划账金额（元）', param: 'Transfer', align: 'center', isshow: true, sortable: true,render(h) {
          return h.settlementAmount/100 - h.serviceFee
        },},
        { label: '结算日期', param: 'createTime', align: 'center', sortable: true,isshow:true,render(h) {
          if(h.createTime){
            return h.createTime.substring(0,10)
          }
          
        },},
        //{ slot: 'operate', isshow: true }, // 操作列
      ],
      listData: [],//表格数据
      listData1:[],//查看明细表格数据
      tableOption: [],
      tableSelect: [],
      isShowSelect: true,
      isShowSelect1: false,
      loading:false,
      imgurl:'',
      outChecked:false,
      // outPop:false,//导出弹框
      isExport:false,//是否在请求导出
      // authPopVisible:false,//授权弹框
      authPopTitle:'',
      authId:'',//授权人员的id
      authName:'',//授权人员的name
      timer:null,
      dialogVisible:false //查看明细弹框
    }
  },
  filters: {

  },
  created() {
    for (let i = 0; i < this.tableLabel.length; i++) {
      if (this.tableLabel[i].label) {
        this.tableOption.push(this.tableLabel[i].label)
      }
      if (this.tableLabel[i].isshow) {
        this.tableSelect.push(this.tableLabel[i].label)
      }

    }
    this.dataForm.parkId = this.$store.state.project.projectId;
    this.imgurl = this.tools.global.API_URL;
    this.getTimeFn();
  },
  computed: {
    parkId:{
      get(){
        return this.$store.state.project.projectId
      },
      set(v){
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch:{
    parkId(value){
      this.dataForm.parkId = value;
      this.getTableData();
   }
  },
  components:{
    MsgBox,
    ExportBox,
    AuthBox,
    TableCmp
  },
  filters: {
    clTime: function(time) {
      return time.split(" ")[0];
    }
  },
  mounted() {
    let scenarioId = Cookies.get("scenarioId");
    this.dataForm.scenarioId = scenarioId;
    this.getTableData()
    // this.getListData()
  },
  methods: {
    
        // 设置默认时间
        getTimeFn() {
          const that = this;
          let end = new Date();
          let start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
          that.timers[0] = this.formatDate(start);
          that.timers[1] = this.formatDate(end);
          that.dataForm.statDateStart = this.formatDate(start).replace(/-/g,"");
          that.dataForm.statDateEnd = this.formatDate(end).replace(/-/g,"");
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
          return myyear + "-" + mymonth + "-" + myweekday;
      },

      //更改时间
      changeTime(e){
          if (this.timers !== null && this.timers.length > 0) {
              this.dataForm.statDateStart = this.timers[0].replace(/-/g,"");
              this.dataForm.statDateEnd = this.timers[1].replace(/-/g,"");
            } else {
              this.dataForm.statDateStart  = "";
              this.dataForm.statDateEnd  = "";
              this.timers = [];
            }
      },

       //查询
    querySearch(){
      this.dataForm.currentPage = 1;
      this.getTableData();
    },
    
      

    //获取表格数据
    getTableData(){
      if(0 == this.timers.length){
        this.$message.error('开始时间与结束时间不能为空！');
      }else{
        this.loading=true;
        this.utils.http({
          url: "/park/order/reconciliationPage",
          method: "GET",
          params:this.dataForm
        },
        res => {
          if(res.code==200){
            this.total=res.data.total
            if(0 < res.data.records.length){
              this.listData=res.data.records;
            }else{
              this.totalTransactions = 0;
              this.totalHandlingCharge = 0;
              this.totaltransferAmount = 0;
              this.listData = [];
            }
            this.currentPage=res.data.current;
          }      
          this.loading=false;
        });
        this.utils.http({
          url: "/park/order/totalAccount",
          method: "GET",
          params:this.dataForm
        },
        res => {
          if(res.code==200){

            if(null != res.data){
              this.totalTransactions = this.formatDecimal(res.data.totalAccout/100,4);
              this.totalHandlingCharge = this.formatDecimal(res.data.serviceFee,4);
              this.totaltransferAmount = this.formatDecimal((this.totalTransactions - this.totalHandlingCharge),4);
            }else{
              this.totalTransactions = 0;
              this.totalHandlingCharge = 0;
              this.totaltransferAmount = 0;
            }
          }      
        });
      }
    },
    
    //数字保留两位小数（不四舍五入）
    formatDecimal(num, decimal) {
      num = num.toString()
      let index = num.indexOf('.')
      if (index !== -1) {
          num = num.substring(0, decimal + index + 1)
      } else {
          num = num.substring(0)
      }
      return parseFloat(num).toFixed(decimal)
     },

    //重置
    resetBtn(){
      this.timers = [];
      this.dataForm={
        currentPage:1,
        pageSize:10,
        statDateStart:'',//开始时间
        statDateEnd:'',//结束时间
        parkId:this.$store.state.project.projectId,//车场id
        scenarioId:Cookies.get("scenarioId")
      }
      this.getTimeFn();
      this.getTableData();
    },

    //自定义表头
    checkboxChange(e) {
      console.log(this.tableSelect)
      for (let j = 0; j < this.tableLabel.length; j++) {
        if (this.tableSelect.indexOf(this.tableLabel[j].label) > -1) {
          this.tableLabel[j].isshow = true;
        } else {
          this.tableLabel[j].isshow = false;
        }

      }
      console.log(this.tableLabel)
    },
    open () {
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },


    handleNodeClick(data) {
      console.log(data);
    },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //分页
    handleSizeChange(val) {
      this.dataForm.pageSize=val;
      this.getTableData();
    },
    handleCurrentChange(val) {
       this.dataForm.currentPage=val;
       this.getTableData();
    },
    
    // //查询停车产
    // getListData() {
    //   this.utils.http({
    //     url: "/park/order/parkList",
    //     method: "GET",
    //     // params: this.dataForm
    //   },
    //     res => {
    //       if (res.code == 200) {
    //         this.parkList = res.data;
    //       }
    //     });
    // },


    //查看明细
    goEdit(data){
      this.dataFormminxi.currentPage = 1;
      this.dataFormminxi.pageSize = 10;
      this.dataFormminxi.parkId = data.parkId;
      this.dataFormminxi.searchDay = data.createDay;
      this.getTableData1();
      this.dialogVisible = true;
        // this.utils.setStore('seeApplyReconciliationDetails', datas)
        // this.$router.push({
        //     path:'/transactionDetails'
        //   })
    },

    //获取查看明细表格数据
    getTableData1(){
      this.loading=true;
      this.utils.http({
        url: "/park/order/detailedPage",
        method: "GET",
        params:this.dataFormminxi
      },
      res => {
        if(res.code==200){
          this.total1=res.data.total
          this.listData1=res.data.records;
          this.currentPage1=res.data.current;
        }      
        this.loading=false;
      });  
    },

    //表格的选择改变
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
    },

    //分页
    handleSizeChange1(val) {
      this.dataFormminxi.pageSize=val;
      this.getTableData1(this.dataFormminxi);
    },
    handleCurrentChange1(val) {
       this.dataFormminxi.currentPage=val;
       this.getTableData1(this.dataFormminxi);
    },

     //导出
     exportBtnminxi(){
      if(0 === this.total){
        this.$message('当前没有数据可导出');
      }else{
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
            url: "/park/order/detailedExport",
            method: "GET",
            params: this.dataFormminxi
          },
          res => {
            if(res.code==200){
              this.$message({
                message: '导出成功！',
                type: 'success'
              });
            }
            
          }); 
        }).catch(() => {
                
        });
      }
    },

    //对账查询导出
    exportBtn(){
      // this.outPop=true;
      if(0 === this.total){
        this.$message('当前没有数据可导出');
      }else{
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
            url: "/park/order/reconciliationExport",
            method: "GET",
            // params: {appId:this.appId}npm 
            params: this.dataForm
          },
          res => {
            if(res.code==200){
              this.$message({
                message: '导出成功！',
                type: 'success'
              });
            }
            
          }); 
        }).catch(() => {
                
        });
      }
    },

    // //查看授权状态
    // goView(id,name){
    //   this.authPopVisible=true;
    //   this.authId=id;
    //   this.authPopTitle=name;
    // },
  },
}