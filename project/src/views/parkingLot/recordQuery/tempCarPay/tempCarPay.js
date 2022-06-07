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
        chargeType:0,//缴费类型
        outDutyPersonName:'',//出场值班人
        inWorkstationName:'',//岗亭名称
        payType:'',//支付方式
        releaseType:'',//放行方式
        plateNo:'',//车牌号码
        parkTime:'',//停车时长
        startDate:'',//开始时间
        endDate:'',//结束时间
        currentPage:1,
        pageSize:10,
      },
      inWorkstationList:[],//岗亭数据
      payTypeList:[
        {
          name:'现金',
          id:0
        },
        {
          name:'微信',
          id:1
        },
        {
          name:'支付宝',
          id:2
        },
        {
          name:'ETC',
          id:3
        },
        {
          name:'其它',
          id:4
        },
      ],//支付方式数据
      outEntryTypeList:[
        {
          name:'全部',
          id:''
        },
        {
          name:'正常放行',
          id:1
        },
        // {
        //   name:'收费放行',
        //   id:2
        // },
        {
          name:'免费放行',
          id:2
        },
        {
          name:'异常放行',
          id:3
        },
        {
          name:'手动抬杠',
          id:5
        },
      ],//放行方式数据
      stayMinutesList:[
        {
          name:'全部',
          id:'',
        },
        {
          name:'<=15分钟',
          id:'1',
        },
        {
          name:'16~30分钟',
          id:'2',
        },
        {
          name:'31~60分钟',
          id:'3',
        },
        {
          name:'61~320分钟',
          id:'4',
        },
        {
          name:'321~640分钟',
          id:'5',
        },
        {
          name:'>=640分钟',
          id:'6',
        },
      ],//停车时长数据
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
        { label: '订单编号', param: 'vgsId', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '车牌号码', param: 'plateNo', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '应收金额(元)', param: 'receivableAmt', align: 'left', sortable: true, isshow: true,width:'130'},
        { label: '实收金额', param: 'receivedAmt', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '未收金额', param: 'uncollectedAmt', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '折扣金额', param: 'discountAmt', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '支付方式', param: 'payType', align: 'left', sortable: true, isshow: true,width:'110',render(h) {
          if(0 == h.payType){
            return '现金'
          }else if(1 == h.payType){
            return '微信'
          }else if(2 == h.payType){
            return '支付宝'
          }else if(3 == h.payType){
            return 'ETC'
          }else if(4 == h.payType){
            return '其它'
          }
        },},
        { label: '支付时间', param: 'payTime', align: 'left', sortable: true, isshow: true,width:'160'},
        { label: '所属岗亭', param: 'inWorkstationName', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '出场通道', param: 'outChannelInfoName', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '出场值班人', param: 'outDutyPersonName', align: 'left', sortable: true, isshow: true,width:'130'},
        { label: '进场时间', param: 'inTime', align: 'left', sortable: true, isshow: true,width:'160'},
        { label: '出场时间', param: 'outTime', align: 'left', sortable: true, isshow: true,width:'160'},
        { label: '停车时长(分)', param: 'parkTime', align: 'left', sortable: true, isshow: true,width:'130'},
        { label: '放行类型', param: 'releaseType', align: 'left', sortable: true, isshow: true,width:'110',render(h) {
          if(1 == h.releaseType){
            return '正常放行'
          }else if(2 == h.releaseType){
            return '免费放行'
          }else if(3 == h.releaseType){
            return '异常放行'
          }else if(5 == h.releaseType){
            return '手动抬杠'
          }
        },},
        { label: '备注', param: 'remarks', align: 'left', sortable: true, isshow: true,width:'110'},
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
            this.inWorkstationList = res.data;
          }else{
            this.inWorkstationList = []
          }
        }
      });
   },

    //数据
    getListData() {
      this.utils.http({
        url: "/manage/park/record/queryChargeRecord",
        method: "post",
        data: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.currentPage = res.data.current;
            if(res.data.records && 0 < res.data.records.length){
              // $.each(res.data.records,(index,item)=>{
              //   item.region = item.province + "/" + item.city
              // })
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
          appId:this.$store.state.project.projectId,
          chargeType:0,//缴费类型
          outDutyPersonName:'',//出场值班人
          inWorkstationName:'',//岗亭名称
          payType:'',//支付方式
          releaseType:'',//放行方式
          plateNo:'',//车牌号码
          parkTime:'',//停车时长
          startDate:'',//开始时间
          endDate:'',//结束时间
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
            url: "/manage/park/export/exprotChargeRecords",
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