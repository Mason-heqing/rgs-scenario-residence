import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      titleName:'',//头名称
      superiorName:'',//上级名称
      superiorUrl:'',//返回上一级路径
      currentPage: 1,
      popVisible: true,//是否显示信息弹框
      popCommission:false,//是否显示查看开户返佣信息弹框
      popReward:false,//是否显示查看奖励修改信息弹框
      // isShowAli:true,//是否展示支付宝按钮
      popCommissionMateriel:false,//是否显示查看物料返佣修改信息弹框
      isRewardType:false,//
      payTitle:'支付宝',//奖励标题
      // aliStyle:"primary",//支付宝按钮
      // wechatStyle:"default",//微信按钮
      isLadder:true,//是否显示奖励百分比
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [    
        { label: '修改时间', param: 'updateTime', align: 'center',isshow:true, sortable: true,width:'150' },
        { label: '修改人员', param: 'updateUser', align: 'center',isshow:true, width:'120',sortable: true },
        { slot: 'operate',isshow:true }, // 操作列
      ],
      dataForm:{
        // appId:'',//
        pageSize:10,
        currentPage:1,
        organizationRewardId:'',//返佣对象Id
        organizationId:'',//组织Id
        rewardtype:1
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
      setRewardForm:{//奖励记录查看
        payStatus:true,
        paydataTime:"",
        channelId:"",
        payChannel:"",
        rewardstandard:"",
        percentage:""
      },
      setCommissionMateriel:{//物料返佣设置
        payStatus:true,
        paydataTime:"",
        channelId:"",
        payChannel:"",
        rewardPark:"",
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
    //     pageNum:1,
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
    if(this.$route.query.type==1){//返佣修改记录
       this.titleName = '返佣修改记录';
       this.superiorName = '开户返佣'
       this.superiorUrl = '/openAccount';
       this.dataForm.rewardtype = 1;
       this.dataForm.organizationRewardId = JSON.parse(this.utils.getStore('openAccountData')).id;
      //  this.setCommission.paydataTime = JSON.parse(this.utils.getStore('openAccountData')).updateTime;
      //  this.setCommission.assessmentWeek = JSON.parse(this.utils.getStore('openAccountData')).stage + '个月';
      //  if(1 == JSON.parse(this.utils.getStore('openAccountData')).calculationMethod){
      //   this.setCommission.calculation = '标准'
      //  }else{
      //   this.setCommission.calculation = '阶梯'
      //  }
      //  if(0 < JSON.parse(this.utils.getStore('openAccountData')).formula.length){
      //    console.log(JSON.parse(this.utils.getStore('openAccountData')).formula)
      //    this.setCommission.calculation_method =JSON.parse(JSON.parse(this.utils.getStore('openAccountData')).formula) 
      //  }
      //  this.setCommission.calculation = JSON.parse(this.utils.getStore('openAccountData')).calculationMethod;


    }else if(this.$route.query.type==2){//奖励修改记录
        this.titleName = '奖励修改记录';
        this.superiorName = '支付返佣';
        this.superiorUrl = '/payCommission';
        this.dataForm.rewardtype = 2;
        this.dataForm.organizationId = this.utils.getStore('payCommission');
      //  this.dataForm.organizationRewardId = this.utils.getStore('payCommission');
      //  alert(this.dataForm.organizationRewardId)
    }else{
        this.titleName = '返佣修改记录';
        this.superiorName = '物料返佣';
        this.superiorUrl = '/materielCommission';
        this.dataForm.rewardtype = 3;
        this.dataForm.organizationRewardId = this.utils.getStore('materielCommission');
        
    }
    this.getTableData();
  },
  methods: {
    //查看详情
    goRepair(row) {
        if(this.$route.query.type==1){
            this.popCommission = true;
            console.log("查看详情数据---->",row);
            // this.setCommission = row;
            if(null != row.startDate && null != row.endDate){
              this.setCommission.paydataTime = this.formatDate(new Date(row.startDate.slice(0,10))) + "~" + this.formatDate(new Date(row.endDate.slice(0,10)));
            }else{
              this.setCommission.paydataTime = '';
            }
            if(1 === row.stage){
              this.setCommission.assessmentWeek = '一个月'
            }else if(2 === row.stage){
              this.setCommission.assessmentWeek = '二个月'
            }else if(3 === row.stage){
              this.setCommission.assessmentWeek = '三个月'
            }else if(4 === row.stage){
              this.setCommission.assessmentWeek = '四个月'
            }else if(5 === row.stage){
              this.setCommission.assessmentWeek = '五个月'
            }else if(6 === row.stage){
              this.setCommission.assessmentWeek = '个月'
            }
            if(1 === row.calculationMethod){
              this.setCommission.calculation = '标准'
            }else{
              this.setCommission.calculation = '阶梯'
            }
            this.setCommission.calculation_method = JSON.parse(row.formula);
        }else if(this.$route.query.type==2){
           if("ALIPAY" == row.payType){
              this.payTitle = '支付宝';
              if(1 === row.alipayEnabled){
                this.setRewardForm.payStatus = true;
              }else{
                this.setRewardForm.payStatus = false;
              }
              if(1=== row.calculationMethod){
                  this.setRewardForm.rewardstandard = '按支付金额'
                  this.isRewardType = true;
                  this.setRewardForm.percentage = parseInt(row.rewardProportion*100);
              }else{
                this.setRewardForm.rewardstandard = '按支付笔数';
                this.isRewardType = false;
                this.setRewardForm.percentage = row.rewardPark;
              }
              if('' != row.startDate && '' != row.endDate){
                this.setRewardForm.paydataTime = row.startDate.substr(0,10) + "~" +  row.endDate.substr(0,10)
              }else{
                this.setRewardForm.paydataTime = '';
              }
              // this.isShowAli = true;
              // this.aliStyle = "primary";
              // this.wechatStyle = "default";
           }else{
            this.payTitle = '微信';
            if(1 === row.wechatEnabled){
              this.setRewardForm.payStatus = true;
            }else{
              this.setRewardForm.payStatus = false;
            }
            if(1=== row.calculationMethod){
              this.setRewardForm.rewardstandard = '按支付金额'
              this.isRewardType = true;
              this.setRewardForm.percentage = parseInt(row.rewardProportion*100);
            }else{
              this.setRewardForm.rewardstandard = '按支付笔数';
              this.isRewardType = false;
              this.setRewardForm.percentage = row.rewardPark;
            }
            if('' != row.startDate && '' != row.endDate){
              this.setRewardForm.paydataTime = row.startDate.substr(0,10) + "~" +  row.endDate.substr(0,10)
            }else{
              this.setRewardForm.paydataTime = '';
            }
              // this.isShowAli = false;
              // this.aliStyle = "default";
              // this.wechatStyle = "primary";
           }
            this.popReward = true;
        }else{
           this.popCommissionMateriel = true;
           console.log("查看详情----->",row)
           if('' != row.startDate && '' != row.endDate){
              this.setCommission.paydataTime = row.startDate.substr(0,10) + '~' + row.endDate.substr(0,10)
           }
           if(1 === row.enabled){
                this.setCommissionMateriel.payStatus = true;
           }else{
            this.setCommissionMateriel.payStatus = false;
           }
           this.setCommissionMateriel.rewardPark = row.rewardPark/100
        }
       
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
    

    //返回上一级
  goBack(){
    this.$router.go(-1);//返回上一层
  },

   //查看返佣修改记录
   getTableData(){
    this.loading=true;
    this.utils.http({
      url: "/sys/organizationrewardupdatelog/getRefundLog",
      method: "get",
      params:this.dataForm
    }, res => {
      this.loading=false;
      if(res.code==200){
        this.total=res.data.total;
        this.tableData=res.data.records;
        this.currentPage=res.data.current;
      }     
    })
  },
//    //选择支付宝支付
//    aliPay(){
//     this.aliStyle = "primary";
//     this.wechatStyle = "default";
//  },

//  //选择微信支付
//  wechatPay(){
//    this.aliStyle = "default";
//    this.wechatStyle = "primary";
//  },

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