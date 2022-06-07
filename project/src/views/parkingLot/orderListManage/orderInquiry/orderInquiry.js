import MsgBox from '../../../../components/dialog.vue'
import ExportBox from '../../../../components/exportDialog.vue'
import AuthBox from '../../../../components/authDialog.vue'
import TableCmp from '../../../../components/table.vue'
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
      total: 0,
      tableData: [],
      multipleSelection: [],//表格选中
      parkList:[],//车场集合
      value: '',
      value1:'',
      dataForm:{
        id:'',//订单号
        parkId:'',//车场id
        currentPage:1,
        pageSize:10,
        payType:'',//访问状态
        startTime:'',//支付开始时间
        endTime:'',//支付结束时间
        scenarioId:'',//场景值
      },
      payType:[{  
        value:"ALIPAY",
        label:'支付宝'
      },{  
        value:"WECHAT ",
        label:'微信'
      },{  
        value:"OTHER",
        label:'其他'
      }],
      tableLabel: [
        { label: '订单号', param: 'id', align: 'left', sortable: true, isshow: true,width:'100'},
        { label: '停车场', param: 'parkName', align: 'left', sortable: true, isshow: true,width:'100'},
        { label: '车牌号码', param: 'voucherNo', align: 'left', sortable: true, isshow: true,width:'80'},
        { label: '业务类型', param: 'bizType', align: 'left', sortable: true,isshow:true,width:'100',render(h) {
          if(0 == h.bizType){
            return '临时车'
          }else if(1 == h.bizType){
            return '月租车'
          }else if(2 == h.bizType){
            return '储值车'
          }
        },},
        { label: '支付方式', param: 'payType', align: 'left', sortable: true,isshow:true,width:'90',render(h) {
          if("ALIPAY" === h.payType){
            return '支付宝'
          }else if("WECHAT" === h.payType){
            return '微信'
          }else{
            return '其他'
          }
        },},
        { label: '支付状态', param: 'mchId', align: 'left', sortable: true, isshow: true,width:'90',render(h) {
          if(1 == h.payStatus){
             return '已支付'
          }else{
            return '待支付'
          }
        },},
        { label: '支付金额(元)', param: 'totalAmount', align: 'left', isshow: true,width:'90',sortable: true,render(h) {
          return h.totalAmount/100
        },},
        { label: '商户号', param: 'mchId', align: 'left', sortable: true, isshow: true,width:'90'},
        { label: '支付时间', param: 'payTime', align: 'left', sortable: true,isshow:true,width:'90'},
        { label: '支付流水号', param: 'id', align: 'left', sortable: true, isshow: true,width:'90'},
        { label: '停车记录ID', param: 'parkRecordId', align: 'left', sortable: true, isshow: true,width:'90'},
        { label: '支付渠道', param: 'parkPayChannelName', align: 'left', sortable: true, isshow: false},
        { label: '应结算金额(元)', param: 'settlementAmount', align: 'left', sortable: true,isshow:false},
        { label: '支付状态', param: 'payStatus', align: 'left', sortable: true,isshow:false},
        
        // { slot: 'operate', isshow: true }, // 操作列
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
      timer:null,
      timeArr:[],
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
    // let path = this.$route.path;
    let scenarioId = Cookies.get("scenarioId");
    this.dataForm.scenarioId = scenarioId;
    this.dataForm.parkId = this.$store.state.project.projectId;
    this.getToDayTime();
    this.getTableData();
    // this.getListData();
    
  },
  methods: {
    //默认选中当天时间段
    getToDayTime(){
      let date = new Date();
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let toDay=Y+M+D;
      this.timeArr=[toDay+'00:00:00',toDay+'23:59:59'];
      this.dataForm.startTime = this.timeArr[0];
      this.dataForm.endTime = this.timeArr[1];
      // this.getTableData();
    },

    //查询
    querySearch(){
      this.dataForm.currentPage = 1;
      this.getTableData();
    },

    //获取表格数据
    getTableData(){
      if('' == this.dataForm.startTime){
        this.$message.error('开始时间与结束时间不能为空！');
        return false;
      }
      this.loading=true;
      this.utils.http({
        url: "/park/order/queryPage",
        method: "post",
        data:this.dataForm
        // params:this.dataForm
      },
      res => {
        if(res.code==200){
          this.total=res.data.total
          this.listData=res.data.records;
          this.currentPage=res.data.current;
        }      
        this.loading=false;
      });  
    },
    //重置
    resetBtn(){
      this.dataForm={
        id:'',//订单号
        parkId:this.$store.state.project.projectId,//车场id
        currentPage:1,
        pageSize:10,
        payType:'',//访问状态
        startTime:'',//支付开始时间
        endTime:'',//支付结束时间
        scenarioId:Cookies.get("scenarioId")
      }
      this.getToDayTime();
      this.getTableData();
      
    },
    changeTime(e){
      // console.log(e)
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
    //删除
    clickDel(id){
      this.$confirm("您确信取消当前记录?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         this.deleteRequest(id)
        })
        .catch(() => {
          
        });
    },
    deleteRequest(id){
      this.utils.http({
        url: "/person/visitor/record/cancelVisitorAuth",
        method: "GET",
        params: {visitorId:id}
      },
      res => {
        if(res.code==200){
          this.utils.tip('success','取消成功');
          this.getTableData();
        }
      }); 
      
    },
    //查看授权状态
    goView(id,name){
      this.authPopVisible=true;
      this.authId=id;
      this.authPopTitle=name;
    },

    //查询停车产
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

    //搜索的时间改变
    changeTime(e){
      if (this.timeArr !== null && this.timeArr.length > 0) {
        this.dataForm.startTime = this.timeArr[0];
        this.dataForm.endTime = this.timeArr[1];
      } else {
        this.dataForm.startTime  = "";
        this.dataForm.endTime  = "";
      }
    },
  },
}
