import MsgBox from '../../../components/dialog.vue'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
import TableCmp from '../../../components/table.vue'
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
        endTime:''//支付结束时间
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
        { label: '订单号', param: 'id', align: 'center', sortable: true, isshow: true,width:'100'},
        { label: '停车场', param: 'parkName', align: 'center', sortable: true, isshow: true},
        { label: '车牌号码', param: 'voucherNo', align: 'center', sortable: true, isshow: true,width:'60'},
        { label: '业务类型', param: 'bizType', align: 'center', sortable: true,isshow:true,width:'50',render(h) {
          if(1 === h.bizType){
            return '临时车'
          }
        },},
        { label: '支付方式', param: 'payType', align: 'center', sortable: true,isshow:true,width:'50',render(h) {
          if("ALIPAY" === h.payType){
            return '支付宝'
          }else if("WECHAT" === h.payType){
            return '微信'
          }else{
            return '其他'
          }
        },},
        { label: '支付金额(元)', param: 'totalAmount', align: 'center', isshow: true, sortable: true,render(h) {
          return h.totalAmount/100
        },},
        { label: '商户号', param: 'mchId', align: 'center', sortable: true, isshow: true},
        { label: '支付时间', param: 'payTime', align: 'center', sortable: true,isshow:true},
        { label: '支付流水号', param: 'id', align: 'center', sortable: true, isshow: true},
        { label: '停车记录ID', param: 'parkRecordId', align: 'center', sortable: true, isshow: true},
        { label: '支付渠道', param: 'parkPayChannelName', align: 'center', sortable: true, isshow: false},
        { label: '应结算金额(元)', param: 'settlementAmount', align: 'center', sortable: true,isshow:false},
        { label: '支付状态', param: 'payStatus', align: 'center', sortable: true,isshow:false},
        
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
    appId:{
      get(){
        return this.$store.state.project.projectId
      },
      set(v){
        this.$store.commit('changeProjectId', v)
      }
    }
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
    this.getToDayTime();
    this.getTableData();
    this.getListData();
    
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
        parkId:'',//车场id
        currentPage:1,
        pageSize:10,
        payType:'',//访问状态
        startTime:'',//支付开始时间
        endTime:''//支付结束时间
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
    //导出
    exportBtn(){
      this.outPop=true;
    },
    outBtn(){
      this.isExport=true;
      this.outChecked=this.$refs.exportData.outChecked;
        if(this.outChecked){
          this.dataForm.withPic=1;
        }else{
          this.dataForm.withPic=0;
        }
        //勾选的数据
        let ids=[];
        this.multipleSelection.forEach((item,index)=>{
          ids.push(item.id)
        })
        this.dataForm.ids=ids;
        this.utils.http({
          url: "/person/visitor/record/exportVisitor",
          method: "POST",
          data: this.dataForm
        },
        res => {
          this.isExport=false;
          this.outPop=false;
          delete this.dataForm.ids;//删除ids属性  防止查询报错
          if(res.code==200){
            this.$alert('人员正在导出请稍后', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'success',
            }).then(() => {
             
            }).catch(() => {});
          }else{
            this.$alert('人员导出失败', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'error',
            }).then(() => {
             
            }).catch(() => {});
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