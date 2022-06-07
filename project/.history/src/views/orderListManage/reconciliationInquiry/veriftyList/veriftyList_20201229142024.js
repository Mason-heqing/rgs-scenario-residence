import MsgBox from '../../../../components/dialog.vue'
import ExportBox from '../../../../components/exportDialog.vue'
import AuthBox from '../../../../components/authDialog.vue'
import TableCmp from '../../../../components/table.vue'
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
      multipleSelection: [],//表格选中
      timers:[],
      value: '',
      value1:'',
      parkList:[],
      dataForm:{
        currentPage:1,
        pageSize:10,
        statDateStart:'',//开始时间
        statDateEnd:'',//结束时间
        parkId:''//车场id
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
        { label: '兑帐日期', param: 'createDay', align: 'center', sortable: true, isshow: true},
        { label: '停车场', param: 'parkName', align: 'center', sortable: true, isshow: true},
        { label: '交易笔数', param: 'tradeNum', align: 'center', sortable: true, isshow: true},
        { label: '交易金额(元)', param: 'totalAccout', align: 'center', isshow: true, sortable: true,render(h) {
          let num = (h.totalAccout/100).toString()
          let index = num.indexOf('.')
          if (index !== -1) {
              num = num.substring(0, 4 + index + 1)
          } else {
              num = num.substring(0)
          }
          return parseFloat(num).toFixed(4)
        },},
        { label: '手续费（元）', param: 'serviceFee', align: 'center', isshow: true, sortable: true},
        { label: '划账金额（元）', param: 'Transfer', align: 'center', isshow: true, sortable: true,render(h) {
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
      listData: [],//表格数据
      tableOption: [],
      tableSelect: [],
      isShowSelect: true,
      loading:false,
      imgurl:'',
      outChecked:false,
      outPop:false,//导出弹框
      isExport:false,//是否在请求导出
      authPopVisible:false,//授权弹框
      authPopTitle:'',
      authId:'',//授权人员的id
      authName:'',//授权人员的name
      timer:null
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
    this.imgurl = this.tools.global.API_URL;
    this.getTimeFn();
  },
  computed: {
  },
  watch:{
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
      this.getTableData()
    this.getListData()
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
        parkId:''//车场id
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
    
    //查询停车产
    getListData() {
      this.utils.http({
        url: "/park/order/parkList",
        method: "GET",
        // params: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.parkList = res.data;
          }
        });
    },


    //查看明细
    goEdit(data){
      let datas = {};
      datas.currentPage = 1;
      datas.pageSize = 10;
      datas.parkId = data.parkId;
      datas.searchDay = data.createDay;
        this.utils.setStore('seeApplyReconciliationDetails', datas)
        this.$router.push({
            path:'/transactionDetails'
          })
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

    //查看授权状态
    goView(id,name){
      this.authPopVisible=true;
      this.authId=id;
      this.authPopTitle=name;
    },
  },
}