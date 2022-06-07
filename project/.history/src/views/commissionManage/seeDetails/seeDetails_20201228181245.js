import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      currentPage: 1,
      popVisible: true,//是否显示信息弹框
      popCommission:false,//是否显示查看信息弹框
      isLadder:true,//
      popTitle: '这个是标题',
      popContent: '这个是内容',
      commissionTitle:'',//返佣明细名称
      superiorName:'',//上级名称
      myName:'',//自己名称
      totalName:'',//合计名称
      superiorUrl:'',//上级地址
      total: 0,
      totalAmount:null,//返佣总金额
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [],

      dataForm:{
        billMonthId:'',//返佣数据对账ID
        organizationId:'',//组织ID
        pageSize:10,
        currentPage:1,
        reconMonth:'',//对账月份(例202010)
        rewardtype:null,//返佣类型 1、开户返佣 2、支付返佣 3、物料返佣
      },
      setCommission:{
        payStatus:true,
        paydataTime:"",
        channelId:"",
        payChannel:"",
        assessmentWeek:"",//考核周期
        calculation:'',//计算方式
        calculation_method:[
          {
            name:'阶梯一',
            monthDayNum:'',
            singleRebateAmount:''
          }
        ]
      },
      loading:false,
      isShowSelect:true
    }
  },
  computed: {
    // appId:{
    //   get(){
    //     return this.$store.state.project.projectId
    //   },
    //   set(v){
    //     this.$store.commit('changeProjectId', v)
    //   }
    // }
  },
  watch:{
    // appId(newFlag, oldFlag){
    //   this.appId=newFlag;
    //   this.dataForm={
    //     appId:newFlag,//
    //     dealStatus:'',//状态
    //     resRepair:'',//报修标题
    //     pageSize:10,
    //     currentPage:1,
    //   };
    // //   this.getTableData()
    // }
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
    // if(this.appId){
    //   this.dataForm.appId=this.appId;
    // //   this.getTableData()
    // }
    this.dataForm.billMonthId = JSON.parse(this.utils.getStore('seeDetailsData')).id;
    this.dataForm.organizationId = JSON.parse(this.utils.getStore('seeDetailsData')).organizationId;
    this.dataForm.reconMonth = JSON.parse(this.utils.getStore('seeDetailsData')).reconMonth.replace(/-/g,'');
    if(this.$route.query.type==1){//开户返佣明细
        this.commissionTitle = '开户返佣明细';
        this.superiorName = '开户返佣';
        this.myName = '开户返佣明细';
        console.log("列表信息-------->",JSON.parse(this.utils.getStore('seeDetailsData')))
        this.totalAmount = JSON.parse(this.utils.getStore('seeDetailsData')).rewardAmount/100;
        // this.totalName = '开户返佣合计金额(元)';
        this.superiorUrl = '/openReward';
        this.dataForm.rewardtype = 1;
        this.tableLabel=[    
            { label: '停车场', param: 'parkName', align: 'center',isshow:true, sortable: true,width:'150' },
            { label: '月日均笔数', param: 'avgMonthNum', align: 'center',isshow:true, sortable: true,width:'150' },
            { label: '计算阶梯', param: 'ladder', align: 'center',isshow:true, width:'120',sortable: true },
            { label: '返佣金额(元)', param: 'rewardAmount', align: 'center',isshow:true, width:'120',sortable: true,render(h) {
              if(0 != h.rewardAmount){
                  return h.rewardAmount/100
              }else{
                return 0
              }
            },},
            { label: '备注', param: 'remarks', align: 'center',isshow:true, width:'120',sortable: true },
            { label: '对账月份', param: 'reconMonth', align: 'center',isshow:true, width:'120',sortable: true },
          ];
          this.getTableData('/manage/reward/pageAccountDeail');
     }else if(this.$route.query.type==2){//支付返佣明细
         this.commissionTitle = '支付返佣明细';
         this.superiorName = '支付返佣';
         this.myName = '支付返佣明细';
        //  this.totalName = '支付返佣总金额（元)';
         this.superiorUrl = '/payReward';
         this.dataForm.rewardtype = 2;
         this.tableLabel=[    
            { label: '交易时间', param: 'tradeTime', align: 'center',isshow:true, sortable: true,width:'150' },
            { label: '停车场', param: 'parkName', align: 'center',isshow:true, sortable: true,width:'150' },
            { label: '商户ID', param: 'merchatId', align: 'center',isshow:true, width:'120',sortable: true },
            { label: '支付方式', param: 'payType', align: 'center',isshow:true, width:'120',sortable: true,render(h) {
              if('ALIPAY' == h.payType){
                return '支付宝'
              }else if('WECHAT' == h.payType){
                return '微信'
              }else{
                return '未知'
              }
            },},
            { label: '返佣标准', param: 'calculationMethod', align: 'center',isshow:true, width:'120',sortable: true,render(h) {
              if(1 === h.calculationMethod){
                 return '按金额';
              }else{
                return '按笔数';
              }
            },},
            { label: '交易金额(元)', param: 'transAmount', align: 'center',isshow:true, width:'120',sortable: true,render(h) {
              if(0 != h.transAmount){
                 return h.transAmount/100;
              }else{
                return 0;
              }
            },},
            { label: '返佣金额(元)', param: 'refundAmount', align: 'center',isshow:true, width:'120',sortable: true,render(h) {
              if(0 != h.refundAmount){
                  return h.refundAmount/100;
              }else{
                return 0;
              }
            },},
            { label: '结算月份', param: 'reconMonth', align: 'center',isshow:true, width:'120',sortable: true },
          ];
          this.getTableData('/manage/reward/pagePayDeail');  
     }else{
        this.superiorUrl = '/materialReward';
        this.commissionTitle = '物料返佣明细';
        this.superiorName = '物料返佣';
        this.myName = '物料返佣明细';
        this.dataForm.rewardtype = 3;
        // this.totalName = '物料返佣总金额（元)';
        this.tableLabel=[    
            { label: '停车场', param: 'parkName', align: 'center',isshow:true, sortable: true,width:'150' },
            { label: '考核通过时间', param: 'checkPassTime', align: 'center',isshow:true, sortable: true,width:'150' },
            { label: '返佣金额(元)', param: 'rewardAmount', align: 'center',isshow:true, width:'120',sortable: true,render(h) {
              if(0 != h.rewardAmount){
                return h.rewardAmount/100
              }else{
                return 0
              }
            },},
            { label: '结算月份', param: 'reconMonth', align: 'center',isshow:true, width:'120',sortable: true },
          ];
        // this.dataForm.rewardtype = 3;
        // this.dataForm.billMonthId = JSON.parse(this.utils.getStore('seeDetailsData')).id;
        // this.dataForm.organizationId = JSON.parse(this.utils.getStore('seeDetailsData')).organizationId;
        // this.dataForm.reconMonth = (JSON.parse(this.utils.getStore('seeDetailsData')).reconMonth).replace(/-/g,"");
        this.getTableData('/manage/reward/pageMaterialDeail');
     }
  },
  methods: {
    //查看详情
    goRepair(row) {
        this.popCommission = true;
    },

   //返佣明细
   getTableData(url){
    this.loading=true;
    this.utils.http({
      url: url,
      method: "get",
      params:this.dataForm
    }, res => {
      this.loading=false;
      if(res.code==200){
        this.total=res.data.total;
        // let money = 0
        // res.data.records.forEach((item,index) => {
        //    money += item.refundAmount/100
        // });
        // this.totalAmount = money;
        this.tableData=res.data.records;
        this.currentPage=res.data.current;
      }     
    })
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
    //搜索的时间改变
    changeTime(e){},


    //导出功能
    commissionExport(){
      if(0 === this.total){
        this.$message('当前没有数据可导出');
      }else{
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sendExport();
        }).catch(() => {
                  
        });
      }
    },

    sendExport(){
      this.utils.http({
        url: "/manage/export/reward/exportMaterialDeail",
        method: "get",
        params:this.dataForm
      },
      res => {
        if(res.code==200){
          this.$message({
            message: '导出成功！',
            type: 'success'
          });
          // this.popRewardApply = false;
          // this.getCheckList();
          // this.realTimeList=res.data;
          // if(0 < res.data.length){
          //    this.channel = res.data
          // }
        }
        
      });
    },

    //返回
    goBack(){
      this.$router.go(-1);//返回上一层
    }

  },  
}