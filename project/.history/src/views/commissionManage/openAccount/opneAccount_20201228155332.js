import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import TableBmp from '../../../components/nice.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
import utils from "../../../utils/tools.js";
export default {
  name: 'home',
  data() {
    let validateAmount = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("请输入月日均笔数"));
      } else if (value < 0) {
        return callback(new Error(`笔数不能为负数`));
      } else {
        return callback();
      }
    };
    let validateSingleRebateAmount = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("请输入当个开户返佣"));
      } else if (value < 0) {
        return callback(new Error(`金额不能为负数`));
      } else {
        return callback();
      }
    };
    return {
      msg: '',
      materialRules:false,//返佣规则
      currentPage: 1,
      currentPage1: 1,
      popVisible: false,//是否显示信息弹框
      popCommission:false,//是否显示返佣设置弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      channel:[],
      tableData: [],
      
      tableLabel: [
        { label: '子渠道名称', param: 'orgName', align: 'center', sortable: true ,isshow:true,width:'150'},    
        { label: '考核周期(月)', param: 'stage', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: '计算方式', param: 'calculationMethod', align: 'center', sortable: true ,isshow:true,width:'100'},
        { label: '返佣要求（月日均笔数）', param: 'rewardNums', align: 'center',isshow:true, sortable: true,width:'120' },
        { label: '单个开户返佣(元)', param: 'rewardAmount', align: 'center',isshow:true, sortable: true,width:'150'  },
        { label: '有效时间', param: 'tempTime', align: 'center',isshow:true, sortable: true ,width:'120' },
        { label: '状态', param: 'enabled', align: 'center',isshow:true, sortable: true,width:'120',render(h) {
          if(0 === h.enabled){
            return '停用'
          }else{
            return '启用'
          }
        },},
        { slot: 'operate',isshow:true }, // 操作列
      ],
      rules:{
        paydataTime: [
          { required: true, message: '请选择有效时间', trigger: 'change' },
        ],
        stage:[
          { required: true, message: '请选择考核周期', trigger: 'change' },

        ],
        calculationMethod:[
          { required: true, message: '请选择计算方式', trigger: 'change' },
        ],
        monthDayNum:[
          { validator: validateAmount },
          { required: true, message: '请输入月日均笔数', trigger: 'blur' },
        ],
        singleRebateAmount:[
          { validator: validateSingleRebateAmount },
          { required: true, message: '请输入当个开户返佣', trigger: 'blur' },
        ]
      },
      setCommission:{
        paydataTime:[],//有效时间
        rewardtype:"1",
        enabled:true,
        calculationMethod:"",//计算方式
        stage:"",//考核周期
        startTime:'',//开始时间
        endTime:'',//结束时间
        organizationId:'',//组织Id
        ladderFormList:[
          {
            name:'阶梯一',
            monthDayNum:'',
            singleRebateAmount:''
          }
        ]
      },
      isLadder:true,
      tableOption:[],
      tableSelect: [],
      activeName: 'first',
      isShowSelect:true,
      stage:[
        {
          value: 1,
          label: '一个月'
        },  
        {
          value: 2,
          label: '二个月'
        }, 
        {
          value: 3,
          label: '三个月'
        }, 
        {
          value: 4,
          label: '四个月'
        }, 
        {
          value: 5,
          label: '五个月'
        }, 
        {
          value: 6,
          label: '六个月'
        }
      ],
      calculation:[
        {
          value: 1,
          label: '标准'
        },
        {
          value: 2,
          label: '阶梯'
        }
      ],
      personType:[{
        value: '1',
        label: '户主'
      },{
        value: '2',
        label: '家庭成员'
      },{
        value: '3',
        label: '租客'
      },{
        value: '5',
        label: '其他'
      }],
      PersonListForm:{
        currentPage:1,
        pageSize:10,
        childChanName:'',//子渠道名称
        rewardtype:1
      },
      month:'',//选择月份
      PersonListForm1:{//开户返佣对账
        currentPage:1,
        pageSize:10,
        rewardtype:1,//返佣类型
        reconTime:'',//选择月份
      },
      total1:1,
      tableData1: [],
      tableLabel1: [  
        { label: '对账月份', param: 'reconMonth', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: '子渠道名称', param: 'organizationName', align: 'center', sortable: true ,isshow:true,width:'100'},
        { label: '达标开户数', param: 'reachNum', align: 'center',isshow:true, sortable: true,width:'150' },
        { label: '返佣金额(元)', param: 'rewardAmount', align: 'center',isshow:true, sortable: true,width:'150',render(h) {
          if(0 < h.rewardAmount){
             return h.rewardAmount/100
          }
        },},
        { label: '状态', param: 'settlementStatus', align: 'center',isshow:true, sortable: true,render(h) {
          if(1 === h.settlementStatus){
             return '已结算'
          }else{
            return '待结算'
          }
        },},
        { slot: 'operate',isshow:true }, // 操作列
      ],
      tableOption1:[],
      tableSelect1: [],
      loading:false,
      cascaderData:[],
      groupProps: {
        children:'groups',
        label:'name',
        value:'id',
        checkStrictly:true,
        expandTrigger: 'hover'
      },
      popIndex:1,//审核弹框
      checkPopVisible:false,
      checkPopTitle:'审核',
      checkForm:{
        bindStatus:'',//状态
        id:'',
        bindFailReseaon:'',//不通过原因
      },
      checkMsg:'',//审核的信息
      showCheckTip:false,
      outPop:false,
      outChecked:false,
      previewImg:[],//图片预览
      showViewer:false,
      imgurl:'',
      tabIndex:0,
      importPop:false,//批量导入弹框
      fileList:[],
      uploadData:{//上传额外参数appid
        appId:''
      },
      authPopVisible:false,//授权弹框
      authPopTitle:'',
      authId:'',//授权人员的id
      authName:'',//授权人员的name
      isExport:false,
      exportUrl:'',
      exportErrList:[],//导入失败的数据
      exporterrPop:false,
      timer:null,
      elcascaderkey:1,
    }
  },
 
  filters: {

  },
  created() {
    for (let i = 0; i < this.tableLabel.length; i++) {
      if(this.tableLabel[i].label){
        this.tableOption.push(this.tableLabel[i].label)
      }
      if(this.tableLabel[i].isshow){
        this.tableSelect.push(this.tableLabel[i].label)
      }
    }
    for (let i = 0; i < this.tableLabel1.length; i++) {
      if(this.tableLabel1[i].label){
        this.tableOption1.push(this.tableLabel1[i].label)
      }
      if(this.tableLabel1[i].isshow){
        this.tableSelect1.push(this.tableLabel1[i].label)
      }
    }

    this.imgurl = this.tools.global.API_URL;
    this.getPersonList();
    // this.getCheckList();
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
  components: {
    MsgBox,
    TableCmp,
    TableBmp,
    ElImageViewer,
    ExportBox,
    AuthBox
  },
  mounted() {
    if (process.env.NODE_ENV == 'development') {
      this.exportUrl = 'api/person/importPerson/';
    } else {
      this.exportUrl = this.imgurl+'/person/importPerson/';
    }
    this.getSameMonth();
    this.getpayChannelListData()
  },
  methods: {

    //默认选择当月时间
    getSameMonth(){
      let date = new Date();
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1);
      this.month = Y + "-" + M;
      this.PersonListForm1.reconTime = Y.toString()+M.toString();
    },

    elCascaderOnlick() {
      let that = this;
      setTimeout(function() {
        document.querySelectorAll(".el-cascader-node__label").forEach(el => {
          el.onclick = function() {
            this.previousElementSibling.click();
            that.$refs.elcascader.dropDownVisible = false;
          };        
        });
        
        document.querySelectorAll(".el-cascader-panel .el-radio").forEach(el => {
          el.onclick = function() {
            that.$refs.elcascader.dropDownVisible = false;
          };
        });
          
      }, 100);
    },
    //动态表头数据
    checkboxChange(e){
        for (let j = 0; j < this.tableLabel.length; j++) {
          if(this.tableSelect.indexOf(this.tableLabel[j].label)>-1){
            this.tableLabel[j].isshow=true;
          }else{
            this.tableLabel[j].isshow=false;
          }           
        }
    },
    checkboxChange1(e){
      for (let j = 0; j < this.tableLabel1.length; j++) {
        if(this.tableSelect1.indexOf(this.tableLabel1[j].label)>-1){
          this.tableLabel1[j].isshow=true;
        }else{
          this.tableLabel1[j].isshow=false;
        }           
      }
  },
  handleClose(done) {
    done();
  },


  
    //返佣设置
    goSet(data){
      if(1 === data.enabled){
        this.setCommission.enabled = true;
      }else{
        this.setCommission.enabled = false;
      }
      if(0 != data.stage){
        this.setCommission.stage = data.stage;
      }else{
        this.setCommission.stage = '';
      }
      if(null != data.startDate && null != data.endDate){
        this.$set(this.setCommission.paydataTime, "tradedate", [this.formatDate(new Date(data.startDate.slice(0,10))),this.formatDate(new Date(data.endDate.slice(0,10)))]);
        this.setCommission.paydataTime = [this.formatDate(new Date(data.startDate.slice(0,10))),this.formatDate(new Date(data.endDate.slice(0,10)))];
        this.setCommission.startTime = data.startDate;
        this.setCommission.endTime = data.endDate;
      }else{
        this.setCommission.paydataTime = [];
      }
      if(0 != data.calculationMethod){
        this.setCommission.calculationMethod = data.calculationMethod;
      }else{
        this.setCommission.calculationMethod = ''
      }
      if('' != data.formula){
        this.setCommission.ladderFormList = JSON.parse(data.formula)
      }else{
        this.setCommission.ladderFormList[0].monthDayNum = '';
        this.setCommission.ladderFormList[0].singleRebateAmount = '';
      }
      this.setCommission.organizationId = data.organizationId;
      this.popCommission = true;
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


    //计算方式修改
    changeCalculation(e){
      if(2 === e){
        this.isLadder = true
      }else{
        this.setCommission.ladderFormList = [
          {
            name:'阶梯一',
            monthDayNum:'',
            singleRebateAmount:''
          }
        ]
        this.isLadder = false
      }
      
    },
     
    //阶梯删减
    ladderMinus(){
      var LadderObj = this.setCommission.ladderFormList;
      if(1 >= LadderObj.length){
        this.setCommission.calculation = '1';
        this.isLadder = false;
      }else{
        this.setCommission.ladderFormList = LadderObj.slice(0,-1);
      }
    },

    //阶梯添加
    ladderPlus(){
      var LadderObj = this.setCommission.ladderFormList;
      var newLadderJson = {};
      newLadderJson.name = "阶梯" + utils.Arabia_To_SimplifiedChinese(LadderObj.length +1);
      newLadderJson.monthDayNum = '';
      newLadderJson.singleRebateAmount = '';
      LadderObj.push(newLadderJson)
    },


    //返佣修改记录
    reviseRrcord(data){
      this.utils.setStore('openAccountData',data)
      this.$router.push({
        path: '/reviseRecord',
        query: {
          type: '1',
        }
      })
    },

   
    //获取房屋下拉
    getLeftData(){   
      this.cascaderData=[];  
      this.utils.http({
        url: "/base/house/list",
        method: "GET",
        params: {appId:this.appId}
      },
      res => {
        if(res.code==200&&res.data.groups){
          this.cascaderData=res.data.groups;
        }      
      });  
    },
    //开户返佣列表
    getPersonList(){
      this.loading=true;   
      this.utils.http({
        url: "/manage/organ/reward/pageOpenAndManterRefund",
        method: "post",
        data: this.PersonListForm
      },
      res => {
        this.loading=false;
        if(res.code==200){
          this.total=res.data.total;
          this.tableData=res.data.records;
          this.currentPage=res.data.current;         
        }       
      });  
    },
    //开户返佣对账
    getCheckList(){
      this.utils.http({
        url: "/manage/reward/pageAccountInfo",
        method: "get",
        params:this.PersonListForm1
      },
      res => {
        if(res.code==200){
          this.total1=res.data.total;
          this.tableData1=res.data.records;
          this.currentPage1=res.data.current;     
        }
        
      });  
    },
   
    //开户返佣设置
    submitSet(fromMsg){
      if(this.setCommission.enabled){
        this.setCommission.enabled='1';
      }else{
        this.setCommission.enabled='0';
      }
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.utils.http({
            url: "/manage/organ/reward/saveRefund",
            method: "POST",
            data:this.setCommission
          },
          res => {
            if(res.code==200){ 
              this.popCommission = false;
              this.getPersonList();
            }
            
          });
        }
      })
        
    },

    //重置
    resetBtn(){
      this. PersonListForm={
        currentPage:1,
        pageSize:10,
        childChanName:'',//子渠道名称
        rewardtype:1
      }
      this.getPersonList()
    },
    resetBtn1(){
      this. PersonListForm1={
        currentPage:1,
        pageSize:10,
        childChanName:'',
        rewardtype:1
      }
      this.getCheckList()
    },
    //编辑
    goEdit(row){
      this.utils.setStore('ownerMsg',row)
      this.$router.push({  
        path: '/ownermanageadd',   
        query:{
          type:'2',
        }
      })
    },
    //删除员工
    deleteOwner(id){
      this.$confirm("您确信删除选中的住户?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.utils.http({
          url: "/person/deleteHousehold",
          method: "GET",
          params: {appId:this.appId,personId:id}
        },
        res => {
          if(res.code==200){
            this.utils.tip('success','删除成功');
            this.getPersonList()
          }
          
        });  
      })
      .catch(() => {
        
      });
    },
    //查看明细
    goCheck(row){
      this.utils.setStore('seeDetailsData',row);
      this.$router.push({
        path: '/seeDetails',
        query:{
          type:'1',
        }
      })
    },

    //提交结算
    submitSettlement(row){
      this.$confirm('确定提交结算?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
      }).catch(() => {
                 
      });
    },

    //审核接口
    checkRequest(){
      this.utils.http({
        url: "/person/updateBindStatus",
        method: "POST",
        data:this.checkForm
      },
      res => {
        if(res.code==200){
          this.checkPopVisible=false;
          this.showCheckTip=false;
          this.utils.tip('success','审核成功');
          this.getCheckList()
        }
        
      });  
    },
    closePop(){
      this.popIndex=1;
      this.checkPopTitle='审核';
      this.checkForm.bindFailReseaon='';
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
    //批量删除
    batchDelete(){
      let ids=[];
      let all= this.$refs.tableChild.selectData;
      all.forEach((item,index)=>{
        ids.push(item.id)
      })
      if(ids.length==0){
        this.popVisible=true;//是否显示信息弹框
        this.popTitle='提示';
        this.popContent='请先选择要删除的住户';
        this.open()
      }else{
        this.$confirm("您确信删除选中的住户?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.utils.http({
            url: "/person/batchDeleteHousehold",
            method: "POST",
            data: {appId:this.appId,personIdList:ids}
          },
          res => {
            if(res.code==200){
              this.utils.tip('success','删除成功');
              this.getPersonList()
            }        
          });  
        })
        .catch(() => {
          
        });
      }
    },
    //go增加页
    goAdd() {
      this.$router.push({
        path: '/ownermanageadd',
        query:{
          type:'1',
        }
      })
    },
    
    //开户返佣对账导出
    exportBtn(){
      if(0 === this.total1){
        this.$message('当前没有数据可导出');
      }else{
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
            url: "/manage/export/reward/exportAccountInfo",
            method: "GET",
            // params: {appId:this.appId}
            params: {rewardtype:1,reconTime:this.month.replace(/-/g,'')}
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
    // outBtn(){
    //   this.isExport=true;
    //   //所有住户导出
    //   if(this.tabIndex==0){
    //     this.outChecked=this.$refs.exportData.outChecked;
    //     if(this.outChecked){
    //       this.PersonListForm.withPic=1;
    //     }else{
    //       this.PersonListForm.withPic=0;
    //     }
    //     let ids=[];
    //     let all= this.$refs.tableChild.selectData;
    //     all.forEach((item,index)=>{
    //       ids.push(item.id)
    //     })
    //     this.PersonListForm.ids=ids;
    //     this.utils.http({
    //       url: "/person/personExport",
    //       method: "POST",
    //       data: this.PersonListForm
    //     },
    //     res => {
    //       this.isExport=false;
    //       this.outPop=false;
    //       delete this.PersonListForm.ids;//删除ids属性  防止查询报错
    //       if(res.code==200){
    //         this.$alert('人员正在导出请稍后', '提示', {
    //           confirmButtonText: '确定',
    //           dangerouslyUseHTMLString: true,
    //           closeOnClickModal:true,
    //           type:'success',
    //         }).then(() => {
             
    //         }).catch(() => {});
    //       }else{
    //         this.$alert('人员导出失败', '提示', {
    //           confirmButtonText: '确定',
    //           dangerouslyUseHTMLString: true,
    //           closeOnClickModal:true,
    //           type:'error',
    //         }).then(() => {
             
    //         }).catch(() => {});
    //       }
          
    //     });  
    //   }else if(this.tabIndex==1){//审核住户导出
    //     this.outChecked=this.$refs.exportData.outChecked;
    //     if(this.outChecked){
    //       this.PersonListForm1.withPic=1;
    //     }else{
    //       this.PersonListForm1.withPic=0;
    //     }
    //     let ids=[];
    //     let all= this.$refs.tableChild1.selectData;
    //     all.forEach((item,index)=>{
    //       ids.push(item.id)
    //     })
    //     this.PersonListForm1.ids=ids;
    //     this.utils.http({
    //       url: "/person/houseExport",
    //       method: "POST",
    //       data: this.PersonListForm1
    //     },
    //     res => {
    //       this.isExport=false;
    //       this.outPop=false;
    //       delete this.PersonListForm1.ids;//删除ids属性  防止查询报错
    //       if(res.code==200){
    //         this.$alert('人员正在导出请稍后', '提示', {
    //           confirmButtonText: '确定',
    //           dangerouslyUseHTMLString: true,
    //           closeOnClickModal:true,
    //           type:'success',
    //         }).then(() => {
             
    //         }).catch(() => {});
    //       }else{
    //         this.$alert('人员导出失败', '提示', {
    //           confirmButtonText: '确定',
    //           dangerouslyUseHTMLString: true,
    //           closeOnClickModal:true,
    //           type:'error',
    //         }).then(() => {
             
    //         }).catch(() => {});
    //       }
    //     });  
    //   }
      
    // },


    //查看附件
  onPreview(url){
    this.previewImg=[];
    let urlList=url.split(',')
    urlList.forEach((item,index)=>{
      let realUrl=this.imgurl+'/file/download?path='+item;
      this.previewImg.push(realUrl)
    })
    
    this.showViewer=true;
  },
  // 关闭查看器
  closeViewer() {
    this.showViewer = false
  },

    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      this.PersonListForm.pageSize=val;
      this.getPersonList();
    },
    handleCurrentChange(val) {
       this.PersonListForm.currentPage=val;
       this.getPersonList();
    },

    handleSizeChange1(val) {
      this.PersonListForm1.pageSize=val;
      this.getCheckList();
    },
    handleCurrentChange1(val) {
       this.PersonListForm1.currentPage=val;
       this.getCheckList();
    },
    handleClick(tab, event) {
      if(tab.index==0){
        this.tabIndex=0;
        this.getPersonList();
      }else if(tab.index==1){
        this.tabIndex=1;
        this.getCheckList();
        
      }
    },



    submitUpload() {
      if(this.fileList.length>0){
        this.$refs.upload.submit();
      }else{
        this.$message.error('请选择文件');
      }
    },
    //文件选择变化
    selectChange(file,fileList){    
      var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
      let types = ['zip'];
      const isZip = types.includes(fileType);
      if (!isZip) {
        this.$message.error('只支持.zip压缩文件');
        this.fileList=[];
        return false
      }
      this.fileList=fileList;
    },
   //上传之前
   beforeAvatarUpload(file,fileList){
    var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
    let types = ['zip'];
    const isZip = types.includes(fileType);
    const isLtSize = file.size / 1024 / 1024 < 128;
    if (!isZip) {
      this.$message.error('只支持.zip压缩文件');
      return false
    }
    if (!isLtSize) {
      this.$message.error('文件大小不能超过 128MB!');
      return false
    }
    //提示弹框
    this.importPop=false;
    this.popVisible=true;//是否显示信息弹框
    this.popTitle='提示';
    this.popContent='人员正在导入请稍后';
  },
  //上传成功
  successCheck(response, file, fileList) {
    console.log(response);
    this.$refs.upload.clearFiles()
    this.popVisible=false;
    if (response.code == 200) {
      if(response.data.isOpen==1){
        this.exportErrList=response.data.list;
        this.exporterrPop=true;
      }else if(response.data.isOpen==0){
        this.$alert('人员导入成功', '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          closeOnClickModal:true,
          type:'success',
        }).then(() => {
         
        }).catch(() => {});
      }else if(response.data.isOpen==2){
        this.$message.error('模板解析异常');
      }
         
    }else{
      this.$message.error(response.msg);
    }   
  },
  //删除
  removeFile(){
    this.fileList=[];
  },
  //上传失败
  uploadErr(err, file, fileList){
    this.$message.error('导入失败');
  },
    //删除图片
    remove(index) {
        this.images.splice(index, 1);
    },
    exceed(){
      this.$message.error('不支持多文件上传');
    },

    //查看授权状态
    goView(id,name){
      this.authPopVisible=true;
      this.authId=id;
      this.authPopTitle=name;
    },

    //获取支付渠道
    getpayChannelListData(){
      this.utils.http({
        url: "/park/organizationList",
        method: "GET",
        // params: {appId:this.appId}
        // params: {appId:nice}
      },
      res => {
        if(res.code==200){
          this.realTimeList=res.data;
          if(0 < res.data.length){
             this.channel = res.data
          }
        }
        
      });  
    },

    //有效时间监听
    paydataTimeChange(e){
      console.log(e);
      // console.log(this.paydataTime)
      if (this.setCommission.paydataTime !== null && this.setCommission.paydataTime.length > 0) {
        this.setCommission.startTime = this.setCommission.paydataTime[0];
        this.setCommission.endTime = this.setCommission.paydataTime[1];
      } else {
        this.setCommission.startTime  = "";
        this.setCommission.endTime  = "";
      }
    },

    // //校验数字
    // inputLimit(e) {
    //   let num = e.target.value || ''
    //   let code = e.which || e.keyCode
    //   let str = (e.key && e.key != 'Unidentified') ? e.key : num.substr(num.length - 1)
    //   console.log('|type:' + e.type + '|code:' + code + '|str:' + str + '|value:' + num)
    //   //无论任何情况，皆可执行
    //   if(code == '8') {
    //     return true
    //   }
    //   //没有满足任何一种情况，中断执行
    //   if(!(/[\d.]/.test(str) || code == '190')) {
    //     e.returnValue = false
    //     return false
    //   }
    //   if(num.length > 12 ||
    //     (num.indexOf('.') >= 0 && code == '190') ||
    //     ((num.indexOf('.') == num.length - 3) && num.length > 3) ||
    //     (num.length == 0 && code == '190')) {
    //     e.returnValue = false
    //     return false
    //   }
    //   return true
   
    // },
  
    changeTime(e){
      if(null != e){
        this.PersonListForm1.reconTime = this.month.replace(/-/g,"");
      }else{
        this.PersonListForm1.reconTime = '';
      }

    } 

  },
}