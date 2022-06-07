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
      total: 0,
      tableData: [],
      multipleSelection: [],//表格选中
      
      value: '',
      value1:'',
      dataForm:{
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
      tableOption: [],
      tableSelect: [],
      isShowSelect: true,
      loading:false,
      imgurl:'',
      outChecked:false,
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
    this.dataForm=JSON.parse(this.utils.getStore('seeApplyReconciliationDetails'));
    this.dataForm.parkId = JSON.parse(this.utils.getStore('seeApplyReconciliationDetails')).parkId;
    this.dataForm.searchDay = JSON.parse(this.utils.getStore('seeApplyReconciliationDetails')).searchDay;
    this.getTableData(this.dataForm);
  },
  methods: {
    //获取表格数据
    getTableData(data){
      this.loading=true;
      this.utils.http({
        url: "/park/order/detailedPage",
        method: "GET",
        params:data
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
            url: "/park/order/detailedExport",
            method: "GET",
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

  },
}