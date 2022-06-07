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
      dataForm:{
        appId:'',
        startDate:'',
        endDate:'',
        currentPage:1,
        pageSize:10,
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
        // { label: '统计日期', param: 'name', align: 'left', sortable: true, isshow: true},
        // { label: '大门进通道', param: 'region', align: 'left', sortable: true, isshow: true},
        // { label: '大门出通道', param: 'region', align: 'left', sortable: true, isshow: true},
        // { label: '贵宾区进通道', param: 'region', align: 'left', sortable: true, isshow: true},
        // { label: '贵宾区出通道', param: 'region', align: 'left', sortable: true, isshow: true},
        // // { label: '线上支付', param: 'payStatus', align: 'left', sortable: true, isshow: true,render(h) {
        // //   if(0 === h.payStatus){
        // //     return '待开通'
        // //   }else if(1 === h.payStatus){
        // //     return '待审核'
        // //   }else if(2 === h.payStatus){
        // //     return '已开通'
        // //   }else if(3 == h.payStatus){
        // //     return '拒绝审核'
        // //   }else{
        // //     return '禁用'
        // //   }
        // // },},
        // // { slot: 'operate', isshow: true,align: 'right'}, // 操作列
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
        url: "/manage/park/report/queryPassReport",
        method: "post",
        data: this.dataForm
      },
        res => {
          if (res.code == 200) {
             if(res.data.channelList && res.data.channelList.length){        
               this.tableLabel = [
                 {
                  label:'统计日期',
                  param:'pass_date',
                  align:'left',
                  sortable:true,
                  isshow:true,
                 }
               ];         
              res.data.channelList.forEach(element => {
                let json = {};
                json.label = element.name +" "+ "( 次数 )";
                json.param = element.id;
                json.align = 'left';
                json.sortable = true;
                json.isshow = true;
                this.tableLabel.push(json)
              });
             }
             if(res.data.dataList){
               this.total = res.data.dataList.total;
               this.currentPage = res.data.dataList.current;
               if(0 < res.data.dataList.records.length){
                this.listData = res.data.dataList.records;
               }else{
                this.listData = []
               }
             }
            // this.total = res.data.total;
            // this.currentPage = res.data.current;
            // if(res.data.records && 0 < res.data.records.length){
            //   $.each(res.data.records,(index,item)=>{
                
            //   })
            //   this.listData = res.data.records;
            // }else{
            //   this.listData = []
            // }
          }
        });
    },
    //重置
    resetBtn(){
        this.dataForm={
          appId:this.$store.state.project.projectId,
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
            url: "/manage/park/report/exportIncomeReport",
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