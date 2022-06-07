import MsgBox from '../../../../components/dialog.vue'
import TableCmp from '../../../../components/table.vue'
import TableBmp from '../../../../components/nice.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ExportBox from '../../../../components/exportDialog.vue'
import AuthBox from '../../../../components/authDialog.vue'
import utils from "../../../../utils/tools.js";
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
      // let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
      // if (value === '') {
      //   callback(new Error('请输入当个开户返佣'));
      // } else if (!reg.test(value)) {
      //   callback(new Error('请输入数字'));
      // }else if(value < 0){
      //   return callback(new Error(`金额不能为负数`));
      // } else {
      //   callback();
      // }
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
      materialRules: false,//返佣规则
      currentPage: 1,
      currentPage1: 1,
      popVisible: false,//是否显示信息弹框
      popCommission: false,//是否显示返佣设置弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      channel: [],
      tableData: [],

      tableLabel: [
        { label: '子渠道名称', param: 'orgName', align: 'left', sortable: true, isshow: true, width: '180' },
        { label: '考核周期(月)', param: 'stage', align: 'left', sortable: true, isshow: true, width: '100' },
        { label: '计算方式', param: 'calculationMethod', align: 'left', sortable: true, isshow: true, width: '80' },
        { label: '返佣要求（月日均笔数）', param: 'rewardNums', align: 'left', isshow: true, sortable: true, width: '150' },
        { label: '单个开户返佣(元)', param: 'rewardAmount', align: 'left', isshow: true, sortable: true, width: '110' },
        { label: '有效时间', param: 'tempTime', align: 'center', isshow: true, sortable: true, width: '150' },
        {
          label: '状态', param: 'enabled', align: 'center', isshow: true, sortable: true, width: '80', render(h) {
            if (0 === h.enabled) {
              return '停用'
            } else {
              return '启用'
            }
          },
        },
        { slot: 'operate', isshow: true }, // 操作列
      ],
      rules: {
        paydataTime: [
          { required: true, message: '请选择有效时间', trigger: 'change' },
        ],
        stage: [
          { required: true, message: '请选择考核周期', trigger: 'change' },

        ],
        calculationMethod: [
          { required: true, message: '请选择计算方式', trigger: 'change' },
        ],
        monthDayNum: [
          { validator: validateAmount },
          { required: true, message: '请输入月日均笔数', trigger: 'blur' },
        ],
        singleRebateAmount: [
          { validator: validateSingleRebateAmount },
          { required: true, message: '请输入当个开户返佣', trigger: 'blur' },
        ]
      },
      setCommission: {
        paydataTime: [],//有效时间
        rewardtype: "1",
        enabled: true,
        calculationMethod: "",//计算方式
        stage: "",//考核周期
        startTime: '',//开始时间
        endTime: '',//结束时间
        organizationId: '',//组织Id
        ladderFormList: [
          {
            name: '阶梯一',
            monthDayNum: '',
            singleRebateAmount: ''
          }
        ]
      },
      isLadder: true,
      tableOption: [],
      tableSelect: [],
      activeName: 'first',
      isShowSelect: true,
      stage: [
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
      calculation: [
        {
          value: 1,
          label: '标准'
        },
        {
          value: 2,
          label: '阶梯'
        }
      ],
      personType: [{
        value: '1',
        label: '户主'
      }, {
        value: '2',
        label: '家庭成员'
      }, {
        value: '3',
        label: '租客'
      }, {
        value: '5',
        label: '其他'
      }],
      PersonListForm: {
        currentPage: 1,
        pageSize: 10,
        childChanName: '',//子渠道名称
        rewardtype: 1
      },
      month: '',//选择月份
      PersonListForm1: {//开户返佣对账
        currentPage: 1,
        pageSize: 10,
        rewardtype: 1,//返佣类型
        reconTime: '',//选择月份
      },
      total1: 1,
      tableData1: [],
      tableLabel1: [
        { label: '对账月份', param: 'reconMonth', align: 'center', sortable: true, isshow: true, width: '120' },
        { label: '子渠道名称', param: 'organizationName', align: 'left', sortable: true, isshow: true, width: '150' },
        { label: '达标开户数', param: 'reachNum', align: 'left', isshow: true, sortable: true, width: '120' },
        {
          label: '返佣金额(元)', param: 'rewardAmount', align: 'left', isshow: true, sortable: true, width: '120', render(h) {
            if (0 < h.rewardAmount) {
              return h.rewardAmount / 100
            }
          },
        },
        {
          label: '状态', param: 'settlementStatus', align: 'center', isshow: true, sortable: true, render(h) {
            if (1 === h.settlementStatus) {
              return '已结算'
            } else {
              return '待结算'
            }
          },
        },
        { slot: 'operate', isshow: true }, // 操作列
      ],
      tableOption1: [],
      tableSelect1: [],
      loading: false,
      cascaderData: [],
      groupProps: {
        children: 'groups',
        label: 'name',
        value: 'id',
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      popIndex: 1,//审核弹框
      checkPopVisible: false,
      checkPopTitle: '审核',
      checkForm: {
        bindStatus: '',//状态
        id: '',
        bindFailReseaon: '',//不通过原因
      },
      checkMsg: '',//审核的信息
      showCheckTip: false,
      outPop: false,
      outChecked: false,
      previewImg: [],//图片预览
      showViewer: false,
      imgurl: '',
      tabIndex: 0,
      importPop: false,//批量导入弹框
      fileList: [],
      uploadData: {//上传额外参数appid
        appId: ''
      },
      authPopVisible: false,//授权弹框
      authPopTitle: '',
      authId: '',//授权人员的id
      authName: '',//授权人员的name
      isExport: false,
      exportUrl: '',
      exportErrList: [],//导入失败的数据
      exporterrPop: false,
      timer: null,
      elcascaderkey: 1,
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
    for (let i = 0; i < this.tableLabel1.length; i++) {
      if (this.tableLabel1[i].label) {
        this.tableOption1.push(this.tableLabel1[i].label)
      }
      if (this.tableLabel1[i].isshow) {
        this.tableSelect1.push(this.tableLabel1[i].label)
      }
    }

    this.imgurl = this.tools.global.API_URL;
    this.getPersonList();
    // this.getCheckList();
  },
  computed: {
    appId: {
      get() {
        return this.$store.state.project.projectId
      },
      set(v) {
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch: {
    
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
      this.exportUrl = this.imgurl + '/person/importPerson/';
    }
    this.getLastMonthAndDay();
    // this.getSameMonth();
    this.getpayChannelListData()

  },
  methods: {


    //默认选择上月时间
    getLastMonthAndDay() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth();
      if (month == 0) {
        month = 12;
        year = year - 1;
      }
      this.month = year + "-" + month;
      this.PersonListForm1.reconTime = year.toString() + month.toString();
    },


    //默认选择当月时间
    // getSameMonth() {
    //   let date = new Date();
    //   let Y = date.getFullYear();
    //   let M = (date.getMonth() + 1 < 10
    //     ? "0" + (date.getMonth() + 1)
    //     : date.getMonth() + 1);
    //   this.month = Y + "-" + M;
    //   this.PersonListForm1.reconTime = Y.toString() + M.toString();
    // },

    elCascaderOnlick() {
      let that = this;
      setTimeout(function () {
        document.querySelectorAll(".el-cascader-node__label").forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click();
            that.$refs.elcascader.dropDownVisible = false;
          };
        });

        document.querySelectorAll(".el-cascader-panel .el-radio").forEach(el => {
          el.onclick = function () {
            that.$refs.elcascader.dropDownVisible = false;
          };
        });

      }, 100);
    },
    //动态表头数据
    checkboxChange(e) {
      for (let j = 0; j < this.tableLabel.length; j++) {
        if (this.tableSelect.indexOf(this.tableLabel[j].label) > -1) {
          this.tableLabel[j].isshow = true;
        } else {
          this.tableLabel[j].isshow = false;
        }
      }
    },
    checkboxChange1(e) {
      for (let j = 0; j < this.tableLabel1.length; j++) {
        if (this.tableSelect1.indexOf(this.tableLabel1[j].label) > -1) {
          this.tableLabel1[j].isshow = true;
        } else {
          this.tableLabel1[j].isshow = false;
        }
      }
    },
    handleClose(done) {
      done();
    },



    //返佣设置
    goSet(data) {
      if (1 === data.enabled) {
        this.setCommission.enabled = true;
      } else {
        this.setCommission.enabled = false;
      }
      if (0 != data.stage) {
        this.setCommission.stage = data.stage;
      } else {
        this.setCommission.stage = '';
      }
      if (null != data.startDate && null != data.endDate) {
        this.$set(this.setCommission.paydataTime, "tradedate", [this.formatDate(new Date(data.startDate.slice(0, 10))), this.formatDate(new Date(data.endDate.slice(0, 10)))]);
        this.setCommission.paydataTime = [this.formatDate(new Date(data.startDate.slice(0, 10))), this.formatDate(new Date(data.endDate.slice(0, 10)))];
        this.setCommission.startTime = data.startDate;
        this.setCommission.endTime = data.endDate;
      } else {
        this.setCommission.paydataTime = [];
      }
      if (0 != data.calculationMethod) {
        if(2 === data.calculationMethod){
          this.isLadder = true;
        }else{
          this.isLadder = false;
        }
        this.setCommission.calculationMethod = data.calculationMethod;
      } else {
        this.setCommission.calculationMethod = ''
        this.isLadder = false;
      }
      if ('' != data.formula) {
        let ladderFormList = JSON.parse(data.formula);
        ladderFormList.forEach((item, index) => {
          item.singleRebateAmount = parseInt(item.singleRebateAmount) / 100;
          item.name = "阶梯" + utils.Arabia_To_SimplifiedChinese(index + 1);
        })
        this.setCommission.ladderFormList = ladderFormList;
      } else {
        // this.setCommission.ladderFormList[0].monthDayNum = '';
        // this.setCommission.ladderFormList[0].singleRebateAmount = '';
        this.setCommission.ladderFormList = [
          {
            name: '阶梯一',
            monthDayNum: '',
            singleRebateAmount: ''
          }
        ]
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
    changeCalculation(e) {
      if (2 === e) {
        this.isLadder = true
      } else {
        this.setCommission.ladderFormList = [
          {
            name: '阶梯一',
            monthDayNum: '',
            singleRebateAmount: ''
          }
        ]
        this.isLadder = false
      }

    },

    //阶梯删减
    ladderMinus() {
      var LadderObj = this.setCommission.ladderFormList;
      if (1 >= LadderObj.length) {
        this.setCommission.calculation = '1';
        this.isLadder = false;
      } else {
        this.setCommission.ladderFormList = LadderObj.slice(0, -1);
      }
    },

    //阶梯添加
    ladderPlus() {
      var LadderObj = this.setCommission.ladderFormList;
      var newLadderJson = {};
      newLadderJson.name = "阶梯" + utils.Arabia_To_SimplifiedChinese(LadderObj.length + 1);
      newLadderJson.monthDayNum = '';
      newLadderJson.singleRebateAmount = '';
      LadderObj.push(newLadderJson)
    },


    //返佣修改记录
    reviseRrcord(data) {
      this.utils.setStore('openAccountData', data)
      this.$router.push({
        path: '/reviseRecord',
        query: {
          type: '1',
        }
      })
    },


    //获取房屋下拉
    getLeftData() {
      this.cascaderData = [];
      this.utils.http({
        url: "/base/house/list",
        method: "GET",
        params: { appId: this.appId }
      },
        res => {
          if (res.code == 200 && res.data.groups) {
            this.cascaderData = res.data.groups;
          }
        });
    },

    //开户返佣设置查询
    querySearch(){
      this.PersonListForm.currentPage = 1;
      this.getPersonList();
    },

    //开户返佣对账查询
    querySearch1(){
      this.PersonListForm1.currentPage = 1;
      this.getCheckList(); 
    },

    //开户返佣列表
    getPersonList() {
      this.loading = true;
      this.utils.http({
        url: "/manage/organ/reward/pageOpenAndManterRefund",
        method: "post",
        data: this.PersonListForm
      },
        res => {
          this.loading = false;
          if (res.code == 200) {
            this.total = res.data.total;
            this.tableData = res.data.records;
            this.currentPage = res.data.current;
          }
        });
    },
    //开户返佣对账
    getCheckList() {
      this.utils.http({
        url: "/manage/reward/pageAccountInfo",
        method: "get",
        params: this.PersonListForm1
      },
        res => {
          if (res.code == 200) {
            this.total1 = res.data.total;
            this.tableData1 = res.data.records;
            this.currentPage1 = res.data.current;
          }

        });
    },

    //开户返佣设置
    submitSet(fromMsg) {
      let monthDayNumArr = [];
      let singleRebateAmountArr = [];
      this.setCommission.ladderFormList.forEach((item, index) => {
        monthDayNumArr.push(parseInt(item.monthDayNum));
        singleRebateAmountArr.push(parseInt(item.singleRebateAmount))
      })
      // console.log("笔数--->",this.in_asc_orderNum(monthDayNumArr))
      // console.log('金额--->',this.in_asc_orderMoney(singleRebateAmountArr))
      if(0 === this.in_asc_orderNum(monthDayNumArr) || 0 === this.in_asc_orderMoney(singleRebateAmountArr)){
        this.$message.error('设置阶梯时,上一个阶梯的笔数和金额要小于下一个阶梯的笔数和金额');
        return false;
      }
      if (this.setCommission.enabled) {
        this.setCommission.enabled = '1';
      } else {
        this.setCommission.enabled = '0';
      }
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.setCommission.ladderFormList.forEach((item, index) => {
            item.singleRebateAmount = item.singleRebateAmount * 100;
          })
          this.utils.http({
            url: "/manage/organ/reward/saveRefund",
            method: "POST",
            data: this.setCommission
          },
            res => {
              if (res.code == 200) {
                this.popCommission = false;
                this.getPersonList();
              }

            });
        }
      })
    },

    //重置
    resetBtn() {
      this.PersonListForm = {
        currentPage: 1,
        pageSize: 10,
        childChanName: '',//子渠道名称
        rewardtype: 1
      }
      this.getPersonList()
    },
    resetBtn1() {
      this.PersonListForm1 = {
        currentPage: 1,
        pageSize: 10,
        childChanName: '',
        rewardtype: 1
      }
      this.getCheckList()
    },
    //编辑
    goEdit(row) {
      this.utils.setStore('ownerMsg', row)
      this.$router.push({
        path: '/ownermanageadd',
        query: {
          type: '2',
        }
      })
    },
    //删除员工
    deleteOwner(id) {
      this.$confirm("您确信删除选中的住户?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.utils.http({
            url: "/person/deleteHousehold",
            method: "GET",
            params: { appId: this.appId, personId: id }
          },
            res => {
              if (res.code == 200) {
                this.utils.tip('success', '删除成功');
                this.getPersonList()
              }

            });
        })
        .catch(() => {

        });
    },
    //查看明细
    goCheck(row) {
      this.utils.setStore('seeDetailsData', row);
      this.$router.push({
        path: '/seeDetails',
        query: {
          type: '1',
        }
      })
    },

    //提交结算
    submitSettlement(row) {
      this.$confirm('确定要提交结算吗?', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let json = {};
        json.billMonthId = row.id;
        json.organizationId = row.organizationId;
        json.reconMonth = row.reconMonth.replace(/-/g, '');
        json.rewardtype = 1;
        this.updateSettlementStatus(json);
      }).catch(() => {

      });
      // console.log("返佣对账详情---->", row);
      // this.$alert('确定要提交结算吗?', '提示', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     let json = {};
      //     json.billMonthId = row.id;
      //     json.organizationId = row.organizationId;
      //     json.reconMonth = row.reconMonth.replace(/-/g, '');
      //     json.rewardtype = 1;
      //     this.updateSettlementStatus(json);
      //   }
      // });
    },

    //发送提交结算
    updateSettlementStatus(data) {
      this.utils.http({
        url: "/manage/reward/updateSettlementStatus",
        method: "POST",
        data: data
      },
        res => {
          if (res.code == 200) {
            // this.popReward = false;
            this.getCheckList();
          } else {
          }
        });
    },

    open() {
      this.timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(this.timer)
      }, 3000)
    },
    clearSetTimeOut() {
      clearTimeout(this.timer)
    },
    //go增加页
    goAdd() {
      this.$router.push({
        path: '/ownermanageadd',
        query: {
          type: '1',
        }
      })
    },

    //开户返佣对账导出
    exportBtn() {
      if (0 === this.total1) {
        this.$message('当前没有数据可导出');
      } else {
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
            url: "/manage/export/reward/exportAccountInfo",
            method: "GET",
            params: { rewardtype: 1, reconTime: this.month.replace(/-/g, '') }
          },
            res => {
              if (res.code == 200) {
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
      this.PersonListForm.pageSize = val;
      this.getPersonList();
    },
    handleCurrentChange(val) {
      this.PersonListForm.currentPage = val;
      this.getPersonList();
    },

    handleSizeChange1(val) {
      this.PersonListForm1.pageSize = val;
      this.getCheckList();
    },
    handleCurrentChange1(val) {
      this.PersonListForm1.currentPage = val;
      this.getCheckList();
    },
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.tabIndex = 0;
        this.getPersonList();
      } else if (tab.index == 1) {
        this.tabIndex = 1;
        this.getCheckList();

      }
    },



    //获取支付渠道
    getpayChannelListData() {
      this.utils.http({
        url: "/park/organizationList",
        method: "GET",
        // params: {appId:this.appId}
        // params: {appId:nice}
      },
        res => {
          if (res.code == 200) {
            this.realTimeList = res.data;
            if (0 < res.data.length) {
              this.channel = res.data
            }
          }

        });
    },

    //有效时间监听
    paydataTimeChange(e) {
      console.log(e);
      // console.log(this.paydataTime)
      if (this.setCommission.paydataTime !== null && this.setCommission.paydataTime.length > 0) {
        this.setCommission.startTime = this.setCommission.paydataTime[0];
        this.setCommission.endTime = this.setCommission.paydataTime[1];
      } else {
        this.setCommission.startTime = "";
        this.setCommission.endTime = "";
      }
    },

    changeTime(e) {
      if (null != e) {
        this.PersonListForm1.reconTime = this.month.replace(/-/g, "");
      } else {
        this.PersonListForm1.reconTime = '';
      }

    },

    sortNumber(a,b){
     return a - b
    },

     //判断数组是否是正序
    in_asc_orderNum($arr) {
      let $arr_length = $arr.length;
      if($arr_length==0){
          return 0;
      }
   
      for(let i=0;i<$arr_length;i++){
          if(i > 0  && $arr[i] <= $arr[i-1]){
              return 0;
          }
      }
      return 1;
    },

    in_asc_orderMoney($arr) {
      let $arr_length = $arr.length;
      if($arr_length==0){
          return 0;
      }
   
      for(let i=0;i<$arr_length;i++){
          if(i > 0  && $arr[i] <= $arr[i-1]){
              return 0;
          }
      }
      return 1;
    }
  },
}