import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      currentPage: 1,
      popVisible: true,//是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [{usr:'好人1',state:true,img:'https://himg2.huanqiucdn.cn/attachment2010/2020/0514/20200514072926522.jpg',company:'上海市普陀区金沙江路 1518 弄',email:'123@qq.com',registTime:'2020.5.13',status:1},
      {usr:'好人2',state:false,img:'https://himg2.huanqiucdn.cn/attachment2010/2020/0514/20200514072926522.jpg',company:'上海市普陀区金沙江路 1518 弄',email:'123@qq.com',registTime:'2020.5.13',status:2}],
      tableLabel: [    
        { label: '物品名称', param: 'resRepair', align: 'center',isshow:true, sortable: true,width:'150' },
        { label: '报修人', param: 'personName', align: 'center',isshow:true, width:'120',sortable: true },
        { label: '联系方式', param: 'phone', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: '户室信息', param: 'houseAddress', align: 'center', sortable: true ,isshow:true,width:'150'},
        { label: '处理状态', param: 'dealStatus', align: 'center',isshow:true , sortable: true,width:'120', render: (row) => {
          if (row.dealStatus == 0) {
            return '未处理'
          }else if(row.dealStatus == 1){
            return '已处理'
          }
        }},
        { label: '处理意见', param: 'dealSuggestion', align: 'center', sortable: true ,isshow:true,width:'200' },
        { label: '报修时间', param: 'createTime', align: 'center', sortable: true ,isshow:true,width:'160'},
        { slot: 'operate',isshow:true }, // 操作列
      ],
      dealStatus: [{
        value: 0,
        label: '未处理'
      }, {
        value: 1,
        label: '已处理'
      }],
      dataForm:{
        appId:'',//
        dealStatus:'',//状态
        resRepair:'',//报修标题
        pageSize:10,
        pageNum:1,
      },
      loading:false,
      isShowSelect:true
    }
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
    appId(newFlag, oldFlag){
      this.appId=newFlag;
      this.dataForm={
        appId:newFlag,//
        dealStatus:'',//状态
        resRepair:'',//报修标题
        pageSize:10,
        pageNum:1,
      };
      this.getTableData()
    }
  },
  filters: {

  },
  created() {
    
  },
  components: {
    MsgBox,
    TableCmp
  },
  mounted() {
    if(this.appId){
      this.dataForm.appId=this.appId;
      this.getTableData()
    }
  },
  methods: {
    //go处理页
    goRepair(row) {
      this.utils.setStore('repairMsg',row)
      this.$router.push({
        path: '/repairs'
      })
    },

   //报修列表列表
   getTableData(){
    this.loading=true;
    this.utils.http({
      url: "/property/repair/findAll",
      method: "POST",
      data:this.dataForm
    }, res => {
      this.loading=false;
      if(res.code==200){
        this.total=res.data.total;
        this.tableData=res.data.records;
        this.currentPage=res.data.current;
      }     
    })
  },
  //重置
  resetBtn(){
    this.dataForm={
      appId:this.appId,
      dealStatus:'',//状态
      resRepair:'',//报修标题
      pageSize:10,
      pageNum:1,
    }
    this.getTableData()
  },
    //分页
    handleSizeChange(val) {
      this.dataForm.pageSize=val;
      this.getTableData();
    },
    handleCurrentChange(val) {
       this.dataForm.pageNum=val;
       this.getTableData();
    },
    //搜索的时间改变
    changeTime(e){},
  },
}