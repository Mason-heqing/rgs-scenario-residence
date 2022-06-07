import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
    return {
      currentPage: 1,
      total: 0,
      timers:[],
      parkIds:'',
      dataForm:{
        appId:'',
        parkId:'',//车场id
        userName:'',//值班人员名称
        workstationName:'',//岗亭名称
        startDate:'',
        endDate:'',
        currentPage:1,
        pageSize:10,
      },
      workstationList:[],//岗亭数据
      tableLabel: [
        { label: '值班人', param: 'userName', align: 'left', sortable: true, isshow: true,width:'90'},
        { label: '岗亭名称', param: 'workstationName', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '上班时间', param: 'workTime', align: 'left', sortable: true, isshow: true,width:'180'},
        { label: '下班时间', param: 'offWorkTime', align: 'left', sortable: true, isshow: true,width:'180'},
        { label: '应收金额', param: 'receivablesAmount', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '实收金额', param: 'actualAmount', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '差异金额', param: 'unCollectedAmt', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '现金收费', param: 'cashPay', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '现金次数', param: 'cashNumber', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '临停收费', param: 'tempPay', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '临停现金收费', param: 'tempCashPay', align: 'left', sortable: true, isshow: true,width:'140'},
        { label: '临停线上收费', param: 'tempOnlinePay', align: 'left', sortable: true, isshow: true,width:'140'},
        { label: '储值卡扣费', param: 'storedCardPay', align: 'left', sortable: true, isshow: true,width:'120'},
        { label: '储值车现金收费', param: 'storedCashPay', align: 'left', sortable: true, isshow: true,width:'150'},
        { label: '储值车线上收费', param: 'storedOnlinePay', align: 'left', sortable: true, isshow: true,width:'150'},
        { label: '优免抵扣金额', param: 'discountAmount', align: 'left', sortable: true, isshow: true,width:'140'},
        { label: '优免抵扣次数', param: 'discountNumber', align: 'left', sortable: true, isshow: true,width:'140'},
        { label: '正常放行', param: 'normalOpen', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '收费放行', param: 'chargeOpen', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '免费放行', param: 'freeOpen', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '异常放行', param: 'exceptionOpen', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '进场车次', param: 'totalInNum', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '出场车次', param: 'totalOutNum', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '贵宾车进场', param: 'vipInNum', align: 'left', sortable: true, isshow: true,width:'120'},
        { label: '月租车进场', param: 'monthInNum', align: 'left', sortable: true, isshow: true,width:'120'},
        { label: '储值车进场', param: 'storedInNum', align: 'left', sortable: true, isshow: true,width:'120'},
        { label: '临时车进场', param: 'tempInNum', align: 'left', sortable: true, isshow: true,width:'120'},
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
      tableOption: [],
      tableSelect: [],
      listData: [],//表格数据
      isShowSelect: true,
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
    this.parkIds = this.$store.state.project.projectId;
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
      this.dataForm.appId = value;
      this.parkIds = value;
      this.getWorkstationList();
      this.getListData();
    }
  },
  mounted() {
    // let scenarioId = Cookies.get("scenarioId");
    // this.dataForm.scenarioId = scenarioId;
    this.getWorkstationList();
    this.getListData();
  },
  methods: {
   // 设置默认时间
   getTimeFn() {
    const that = this;
    let end = new Date();
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    that.timers[0] = this.formatDate(end);
    that.timers[1] = this.formatDate(end);
    that.dataForm.startDate = this.formatDate(end).replace(/-/g,"");
    that.dataForm.endDate = this.formatDate(end).replace(/-/g,"");
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
      console.log(e);
      if (this.timers !== null && this.timers.length > 0) {
          this.dataForm.startDate = this.timers[0].replace(/-/g,"");
          this.dataForm.endDate = this.timers[1].replace(/-/g,"");
        } else {
          this.dataForm.startDate  = "";
          this.dataForm.endDate  = "";
          this.timers = [];
        }
    },
  
    //获取岗亭名称
  getWorkstationList(){
    this.utils.http({
      url: "/workstation/list",
      method: "get",
      params: {'appId':this.parkIds}
    },
      res => {
        if (res.code == 200) {
  
          if(res.data && 0 < res.data.length){
            this.workstationList = res.data;
          }else{
            this.workstationList = []
          }
        }
      });
   },

    //数据
    getListData() {
      this.utils.http({
        url: "/manage/park/report/queryParkInRecord",
        method: "post",
        data: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.currentPage = res.data.current;
            if(res.data.records && 0 < res.data.records.length){
              $.each(res.data.records,(index,item)=>{
                item.region = item.province + "/" + item.city
              })
              this.listData = res.data.records;
            }else{
              this.listData = []
            }
          }
        });
    },
    //重置
    resetBtn(){
        this.dataForm={
          appId:this.$store.state.project.projectId,//车场id
          userName:'',//值班人员名称
          workstationName:'',//岗亭名称
          startDate:'',
          endDate:'',
          currentPage:1,
          pageSize:10,
        }
        this.timers = [];
        this.getTimeFn();
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
    
    //导出
    exportBtn(){
      if(0 === this.total){
        this.$message('当前没有数据可导出');
      }else{
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
            url: "/manage/park/report/exportDutyReport",
            method: "post",
            data: this.dataForm
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

  },
}