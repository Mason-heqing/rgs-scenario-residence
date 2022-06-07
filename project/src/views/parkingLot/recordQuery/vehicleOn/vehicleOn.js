import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
    return {
      // msg: '来访记录',
      currentPage: 1,
      total: 0,
      multipleSelection: [],//表格选中
      setVisible:false,//是否显示配置支付弹框
      timers:[],
      carModel:[],
      parkIds:'',
      dataForm:{
        appId:'',
        carType:'',//车类
        carModel:'',//车型
        areaName:'',//所在区域
        plateNo:'',//车牌号码
        startDate:'',//开始时间
        endDate:'',//结束时间
        currentPage:1,
        pageSize:10,
        
      },
      isShowSelect:false,
      vehicles:[],
      area:[],
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
        { label: '停车记录编号', param: 'vgsId', align: 'left', sortable: true, isshow: true},
        { label: '车牌号码', param: 'plateNo', align: 'left', sortable: true, isshow: true},
        { label: '车类', param: 'carTypeName', align: 'left', sortable: true, isshow: true},
        { label: '所在区域', param: 'areaName', align: 'left', sortable: true, isshow: true},
        { label: '进场时间', param: 'inTime', align: 'left', sortable: true, isshow: true},
        { label: '进场通道', param: 'inChannelName', align: 'left', sortable: true, isshow: true},
        { label: '进场值班人', param: 'inOperatorName', align: 'left', sortable: true, isshow: true},
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
    this.parkIds = this.$store.state.project.projectId;;
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
      this.parkIds = value
      this.getListData();
      this.getCarModelList();
      this.getCarTypeList();
      this.getAreaList();
    }
  },
  mounted() {
    let scenarioId = Cookies.get("scenarioId");
    // this.dataForm.scenarioId = scenarioId;
    this.getCarModelList();
    this.getCarTypeList();
    this.getAreaList();
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
            if (e !== null && e.length > 0) {
                this.dataForm.startDate = e[0].replace(/-/g,"");
                this.dataForm.endDate = e[1].replace(/-/g,"");
              } else {
                this.dataForm.startDate  = "";
                this.dataForm.endDate  = "";
                this.timers = [];
              }
        },

    //数据
    getListData() {
      this.utils.http({
        url: "/manage/park/record/queryParkInRecord",
        method: "post",
        data: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.currentPage = res.data.current;
            if(res.data.records && 0 < res.data.records.length){
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
          carType:'',//车类
          carModel:'',//车型
          areaName:'',//所在区域
          plateNo:'',//车牌号码
          startDate:'',//开始时间
          endDate:'',//结束时间
          currentPage:1,
          pageSize:10,
        }
        this.timers = []
        this.getTimeFn();
        this.getListData();
      },

    //自定义表头
    checkboxChange(e) {
      for (let j = 0; j < this.tableLabel.length; j++) {
        if (this.tableSelect.indexOf(this.tableLabel[j].label) > -1) {
          this.tableLabel[j].isshow = true;
        } else {
          this.tableLabel[j].isshow = false;
        }

      }
      console.log(this.tableLabel)
    },
    open() {
      this.timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(this.timer)
      }, 2000)
    },
    clearSetTimeOut() {
      clearTimeout(this.timer)
    },

    handleNodeClick(data) {
      this.listDataForm.userId = data.id;
      this.getListData();
    },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
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


   //获取车类数据
   getCarTypeList(){
    this.utils.http({
      url: "/monthly/car/charge/info/list",
      method: "get",
      params: {'parkId':this.parkIds}
    },
      res => {
        if (res.code == 200) {
  
          if(res.data && 0 < res.data.length){
            this.vehicles = res.data;
          }else{
            this.vehicles = []
          }
        }
      });
   },

   //获取车型数据
   getCarModelList(){
    this.utils.http({
      url: "/car/model/info/list",
      method: "get",
      params: {'parkId':this.parkIds}
    },
      res => {
        if (res.code == 200) {
  
          if(res.data && 0 < res.data.length){
            this.carModel = res.data;
          }else{
            this.carModel = []
          }
        }
      });
   },

   //获取区域数据
   getAreaList(){
    this.utils.http({
      url: "/park/area/list",
      method: "get",
      params: {'appId':this.parkIds}
    },
      res => {
        if (res.code == 200) {
  
          if(res.data && 0 < res.data.length){
            this.area = res.data
          }else{
            this.area = []
          }
        }
      });
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
            url: "/manage/park/export/exportInRecord",
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