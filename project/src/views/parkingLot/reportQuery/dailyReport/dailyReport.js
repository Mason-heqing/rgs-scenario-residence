import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
    return {
      // msg: '来访记录',
      isScene:false,//场景权限
      paymentMode:[],//支付方式
      seeListCurrent:{},//查看当前列表数据
      currentPage: 1,
      popVisible: false,//是否显示信息弹框
      dialogPassExamine:false,//是否显示修改支付配置弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      timer: null,
      isdevelopment:"",//二维码下载前缀地址
      isName:'',
      isChannel:'',
      multipleSelection: [],//表格选中
      setVisible:false,//是否显示配置支付弹框
      timers:[],
      dataForm:{
        appId:'',
        type:1,
        currentPage:1,
        pageSize:10,
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
        { label: '统计日期', param: 'optTime', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '应收金额', param: 'receivablesAmount', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '实收金额', param: 'actualAmount', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '差异金额', param: 'diffAmount', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '线上缴费', param: 'onLineAmount', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '现金缴费', param: 'byCashPayAmount', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '优免抵扣', param: 'discountAmount', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '储值车扣款', param: 'storeCarAmount', align: 'left', sortable: true, isshow: true,width:'130'},
        { label: '临时车缴费', param: 'tempCarAmount', align: 'left', sortable: true, isshow: true,width:'130'},
        { label: '储值车缴费', param: 'storeCarPay', align: 'left', sortable: true, isshow: true,width:'130'},
        { label: '月租车续期（线上）', param: 'monthCarOnline', align: 'left', sortable: true, isshow: true,width:'180'},
        { label: '月租车续期（线下）', param: 'monthCarOffline', align: 'left', sortable: true, isshow: true,width:'180'},
        { label: '储值车充值（线上）', param: 'storeCarOnline', align: 'left', sortable: true, isshow: true,width:'180'},
        { label: '储值车充值（线下）', param: 'storeCarOffline', align: 'left', sortable: true, isshow: true,width:'180'},
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
      isShowSelect: true,
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
      this.getListData();
    }
  },
  mounted() {
    let scenarioId = Cookies.get("scenarioId");
    // this.dataForm.scenarioId = scenarioId;
    this.getListData();
  },
  methods: {
    // 设置默认时间
    getTimeFn() {
      const that = this;
      let end = new Date();
      let start = new Date();
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      that.timers[0] = this.formatDate(start);
      that.timers[1] = this.formatDate(end);
      that.dataForm.startDate = this.formatDate(start).replace(/-/g,"");
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
    //数据
    getListData() {
      this.utils.http({
        url: "/manage/park/report/queryTimeReport",
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
          appId:this.$store.state.project.projectId,
          type:1,
          currentPage:1,
          pageSize:10,
          // startDate:'',
          // endDate:'',
        }
        this.timers = [];
        this.getTimeFn();
        console.log(this.timers);
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
          url: "/manage/park/report/exportTimeReport",
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