import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import TableBmp from '../../../components/nice.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
export default {
  name: 'home',
  data() {
    let validateRewardPark = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("请输入单个车场返佣金额"));
      } else if (value < 0) {
        return callback(new Error(`金额不能为负数`));
      } else {
        return callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!value) {
        return callback(new Error('请填写手机号码！'))
      } else if (!reg.test(value)) {
        return callback(new Error('请填写正确的手机号码！'))
      } else {
        callback()
      }
    };
    return {
      msg: '通道规则',
      rejectTitle: '',//拒绝标题
      dialogRejectVisible: false,//拒绝提示弹框
      materialRules:false,
      currentPage: 1,
      currentPage1: 1,
      popVisible: false,//是否显示信息弹框
      popCommission: false,//是否显示返佣设置弹框
      popRewardApply: false,//是否显示物料奖励申请弹框
      materielSteps: false,//是否显示步骤
      isExamine: false,//是否显示物料审核权限
      isAssessment: false,//是否显示物料考核权限
      isReject: false,//是否显示物料申请拒绝信息
      isPass: false,//是否显示已通过信息
      isSumb:false,//是否显示物料申请提交按钮
      active: 0,//步骤
      isEditInfo: false,//是否显示编辑物料申请信息
      isEditInfoAfter: false,//是否显示编辑之后的信息
      isShowExamine: false,//是否显示物料审核后的信息
      isRejectCause: false,//是否显示物料审核拒绝原因
      examineResult: false,//审核结果
      examineTimes: false,//审核时间
      assessmentTimes: false,//考核时间
      assessmentResult: false,//考核结果
      currentStatus: null,
      month: '',//选择月份
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      total2: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableData1: [],
      rules: {
        paydataTime: [
          { required: true, message: '请选择有效时间', trigger: 'change' },
        ],
        rewardPark: [
          // { validator: validateRewardPark },
          { required: true, message: '请输入单个车场返佣金额', trigger: 'blur' },
        ],
      },
      setRewardApplyFormRules: {
        contacts: [
          { required: true, message: '请输入车场联系人', trigger: 'blur' },
        ],
        tel: [
          { validator: validatePhone },
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        layingStage: [
          { required: true, message: '请选择物料铺设时间', trigger: 'change' },
        ],
        address: [
          { required: true, message: '请输入详情地址', trigger: 'blur' },
        ]
      },
      tableLabel: [
        { label: '子渠道名称', param: 'orgName', align: 'center', sortable: true, isshow: true },
        {
          label: '单个车场返佣(元)', param: 'rewardPark', align: 'center', sortable: true, isshow: true, render(h) {
            if (0 != h.rewardPark) {
              return h.rewardPark / 100
            } else {
              return 0
            }
          },
        },
        { label: '有效时间', param: 'tempTime', align: 'center', sortable: true, isshow: true, width: '100' },
        {
          label: '状态', param: 'enabled', align: 'center', isshow: true, sortable: true, width: '120', render(h) {
            if (1 === h.enabled) {
              return '启用'
            } else {
              return '停用'
            }
          },
        },
        { slot: 'operate', isshow: true }, // 操作列
      ],
      tableLabel1: [
        { label: '车场名称', param: 'parkName', align: 'center', sortable: true, isshow: true },
        { label: '所属渠道', param: 'organizationName', align: 'center', sortable: true, isshow: true },
        { label: '地区', param: 'area', align: 'center', sortable: true, isshow: true, width: '100' },
        {
          label: '车场业态', param: 'parkType', align: 'center', isshow: true, sortable: true, width: '120', render(h) {
            if (0 === h.parkType) {
              return '住宅'
            } else if (1 === h.parkType) {
              return '办公'
            } else if (2 === h.parkType) {
              return '商业'
            } else if (3 === h.parkType) {
              return '商住'
            } else if (5 === h.parkType) {
              return '文体'
            } else if (6 === h.parkType) {
              return '专用'
            } else if (7 === h.parkType) {
              return '货运'
            } else if (8 === h.parkType) {
              return '交通枢纽'
            } else if (9 === h.parkType) {
              return '其它'
            }
          },
        },
        {
          label: '状态', param: 'status', align: 'center', isshow: true, sortable: true, width: '120', render(h) {
            if (0 === h.status) {
              return '待申请'
            } else if (1 === h.status) {
              return '待审核'
            } else if (2 === h.status) {
              return '待考核'
            } else if (3 === h.status) {
              return '已通过'
            } else if (4 === h.status) {
              return '已拒绝'
            }
          },
        },
        { slot: 'operate', isshow: true }, // 操作列
      ],
      tableOption: [],
      tableSelect: [],
      activeName: 'first',
      isShowSelect: true,
      materialApplicationForm: {
        organizationId: '',
        personName: '',
        status: '',
        currentPage: 1,
        pageSize: 10,
      },
      setCommission: {//物料返佣设置
        paydataTime: [],//返佣物料设置时间
        enabled: false,
        rewardPark: "",//单个车场返佣金额
        startTime: '',//开始时间
        endTime: '',//结束时间
        rewardtype: 3,//返佣类型
        organizationId: '',//组织Id
      },
      accountForm: {
        times: ''
      },
      setRewardApplyForm: {
        applyNo: '',//申请编号
        parkId: '',
        parkName: '',
        contacts: '',
        tel: '',
        layingStage: '',
        address: '',
        applyTimes: '',
        rejectCause: '',
        examineResult: '',
        examineTimes: '',
        assessmentTimes: '',
        assessmentResult: ''
      },
      auditOperation: {//审核操作
        id: '',//物料申请ID
        refuseReason: '',//拒绝原因
        status: '',//审核的状态 1.已通过 2.已拒绝
        verityType: ''//审核的类型（1.申请审核 2.考核审核）
      },
      rejectRules: {
        refuseReason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
        ],
      },
      layingStage: [
        {
          id: 1,
          name: '随时'
        },
        {
          id: 2,
          name: '一周内'
        },
        {
          id: 3,
          name: '一月内'
        }
      ],
      status: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '待申请'
        },
        {
          value: 1,
          label: '待审核'
        },
        {
          value: 2,
          label: '待考核'
        },
        {
          value: 3,
          label: '已通过'
        },
        {
          value: 4,
          label: '已拒绝'
        }
      ],
      channel: [
        {
          value: 1,
          label: '渠道1'
        },
        {
          value: 2,
          label: '渠道2'
        },
        {
          value: 3,
          label: '渠道3'
        },
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
        rewardtype: 3,
        childChanName: ''//子渠道名称
      },
      PersonListForm1: {//住户审核列表
        currentPage: 1,
        pageSize: 10,
        applyStatus: '',
        organizationId: '',
        parkName: ''
      },
      PersonListForm2: {
        currentPage: 1,
        pageSize: 10,
        rewardtype: 3,
        reconTime: ''
        // personName:'',//人名门牌号
        // subtype:'',//人员类型
        // groupId:'',//选中房屋最后一级的ids
      },
      total1: 1,
      tableData2: [],
      tableLabel2: [
        { label: '对账月份', param: 'reconMonth', align: 'center', sortable: true, isshow: true },
        { label: '子渠道名称', param: 'organizationName', align: 'center', sortable: true, isshow: true },
        { label: '考核通过总数', param: 'reachNum', align: 'center', isshow: true, sortable: true },
        {
          label: '返佣总金额（元）', param: 'rewardAmount', align: 'center', isshow: true, sortable: true, render(h) {
            if (0 != h.rewardAmount) {
              return h.rewardAmount / 100
            } else {
              return 0
            }
          },
        },
        {
          label: '状态', param: 'settlementStatus', align: 'center', isshow: true, sortable: true, render(h) {
            if (0 === h.settlementStatus) {
              return '未结算'
            } else {
              return '已结算'
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
      bindStatus: [{
        value: '0',
        label: '待物业审核'
      }, {
        value: '1',
        label: '户主审核通过'
      }, {
        value: '2',
        label: '户主审核未通过'
      }, {
        value: '3',
        label: '物业审核通过'
      }, {
        value: '4',
        label: '物业审核未通过'
      }, {
        value: '5',
        label: '待户主审核'
      }, {
        value: '8',
        label: '已取消'
      }, {
        value: '9',
        label: '已绑定'
      },],
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
  },
  computed: {

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
    this.getSameMonth();
    this.getpayChannelListData();
    this.getPersonList();
    this.getCheckList();
    this.getLeftData();
    // }

  },
  methods: {
    //默认选择当月时间
    getSameMonth() {
      let date = new Date();
      let Y = date.getFullYear();
      // let M = date.getMonth() + 1;
      let M = (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1);
      this.month = Y + "-" + M;
      this.PersonListForm2.reconTime = Y.toString() + M.toString();
    },

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
    //物料返佣对账
    getLeftData() {
      this.loading = true;
      this.utils.http({
        url: "/manage/reward/pageMaterialInfo",
        method: "get",
        params: this.PersonListForm2
      },
        res => {
          this.loading = false;
          if (res.code == 200) {
            this.total2 = res.data.total;
            this.tableData2 = res.data.records;
            this.currentPage2 = res.data.current;
          }
        });
    },

    //物料返佣设置
    getPersonList() {
      this.loading = true;
      this.utils.http({
        url: "/manage/organ/reward/pageOpenAndManterRefund",
        method: "POST",
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
    //物料申请列表
    getCheckList() {
      this.utils.http({
        url: "/manage/material/apply/pageApplyInfo",
        method: "post",
        data: this.PersonListForm1
      },
        res => {
          if (res.code == 200) {
            this.total1 = res.data.total;
            this.tableData1 = res.data.records;
            this.currentPage1 = res.data.current;
          }

        });
    },
    //下拉改变
    cascaderChange(e) {
      if (e) {
        this.PersonListForm.groupId = e[e.length - 1]
      }

    },
    //重置
    resetBtn() {
      this.PersonListForm = {
        currentPage: 1,
        pageSize: 10,
        rewardtype: 3,
        childChanName: '',
      }
      this.getPersonList()
    },
    resetBtn1() {
      this.PersonListForm1 = {
        currentPage: 1,
        pageSize: 10,
        childChanName: '',
      }
      this.getCheckList()
    },
    //返佣设置
    goSet(row) {
      // this.utils.setStore('ownerMsg',row)
      // this.$router.push({  
      //   path: '/ownermanageadd',   
      //   query:{
      //     type:'2',
      //   }
      // })
      if (1 === row.enabled) {
        this.setCommission.enabled = true;
      } else {
        this.setCommission.enabled = false;
      }
      if (null != row.startDate && null != row.endDate) {
        this.$set(this.setCommission.paydataTime, "tradedate", [this.formatDate(new Date(row.startDate.slice(0, 10))), this.formatDate(new Date(row.endDate.slice(0, 10)))]);
        this.setCommission.paydataTime = [this.formatDate(new Date(row.startDate.slice(0, 10))), this.formatDate(new Date(row.endDate.slice(0, 10)))]
        this.setCommission.startTime = this.formatDate(new Date(row.startDate.slice(0, 10)));
        this.setCommission.endTime = this.formatDate(new Date(row.endDate.slice(0, 10)));


      } else {
        this.setCommission.paydataTime = [];
        this.setCommission.startTime = '';
        this.setCommission.endTime = '';
        this.setCommission.startDate = '';
        this.setCommission.endDate = '';

      }
      if (0 != row.rewardPark) {
        this.setCommission.rewardPark = row.rewardPark / 100;
      } else {
        this.setCommission.rewardPark = '';
      }
      this.setCommission.organizationId = row.organizationId;
      if (this.$refs.setCommission && '' == this.setCommission.startTime) {
        this.$refs.setCommission.resetFields();
        this.setCommission.paydataTime = [];
        this.setCommission.startTime = '';
        this.setCommission.endTime = '';
        this.setCommission.startDate = '';
        this.setCommission.endDate = '';
        this.setCommission.rewardPark = '';
      }
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

    //返佣修改记录
    reviseRrcord(id) {
      this.utils.setStore('materielCommission', id)
      this.$router.push({
        path: '/reviseRecord',
        query: {
          type: '3',
        }
      })
    },

    //物料返佣对账-查看明细
    rewardSet(row) {
      this.utils.setStore('seeDetailsData', row)
      this.$router.push({
        path: '/seeDetails',
        query: {
          type: '3',
        }
      })
    },

    //物料返佣对账-提交结算
    submitSettlement(row) {
      this.$confirm('确定提交结算？', '提交结算', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendSubmit(row);
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    },

    //提交结算
    sendSubmit(data) {
      let json = {};
      json.billMonthId = data.id;
      json.organizationId = data.organizationId;
      json.reconMonth = data.reconMonth.replace(/-/g, "");
      json.rewardtype = 3;
      this.utils.http({
        url: "/manage/reward/updateSettlementStatus",
        method: "POST",
        data: json
      },
        res => {
          if (res.code == 200) {
            // this.popCommission = false;
            this.getLeftData();
          }

        });
    },

    //物料奖励申请 materielSteps--是否显示步骤  isExamine--是否显示审核权限  isEditInfo--是否显示审核信息
    goEdit(row) {
      console.log("物料申请---->", row);
      this.currentStatus = row.status;
      if (0 === row.status) {//待申请
        this.isSumb = true;
        this.setRewardApplyForm = {
          contacts: '',
          tel: '',
          layingStage: '',
          address: '',
        };
        this.parkId = row.parkId;
        this.materielSteps = true;
        this.isExamine = false;
        this.isReject = false;
        this.isRejectCause = false;
        this.isEditInfoAfter = false;
        this.isEditInfo = true;
        this.isAssessment = false;
        this.isPass = false;
        // this.getMaterilById(row.id);
      } else if (1 === row.status) {//待审核
        this.isSumb = false;
        this.auditOperation.id = row.id;
        this.materielSteps = false;
        this.isExamine = true;
        this.isEditInfo = false;
        this.isReject = false;
        this.isRejectCause = false;
        this.isEditInfoAfter = true;
        this.examineResult = false;
        this.examineTimes = false;
        this.isAssessment = false;
        this.isPass = false;
        this.assessmentTimes = false;
        this.assessmentResult = false;
        this.setRewardApplyForm = {
          applyNo: row.applyNo,
          contacts: row.parkName,
          tel: row.tel,
          layingStage: row.layingStage,
          address: row.address,
          applyTimes: row.applyTime,
          parkName: row.parkName,
          rejectCause: '',
          examineResult: '',
          examineTimes: '',
          assessmentTimes: '',
          assessmentResult: ''
        };
        this.getMaterilById(row.id);
      } else if (4 === row.status) {//已拒绝
        this.isSumb = false;
        this.materielSteps = false;
        this.isExamine = false;
        this.isEditInfo = false;
        this.isReject = true;
        this.isRejectCause = true;
        this.isEditInfoAfter = true;
        this.examineResult = true;
        this.examineTimes = true;
        this.isAssessment = false;
        this.isPass = false;
        this.assessmentTimes = false;
        this.assessmentResult = false;
        this.auditOperation.id = row.id;
        this.getMaterilById(row.id);
        //   this.setRewardApplyForm={
        //     contacts:row.contacts,
        //     tel:row.tel,
        //     layingStage:row.layingStage,
        //     address:row.address,
        //     applyTimes:row.applyTime,
        //     examineResult:row.checkStatus,
        //     examineTimes:'',
        //     rejectCause:'',
        //     assessmentTimes:'',
        //     assessmentResult:''
        //  };
      } else if (3 === row.status) {//已通过
        this.isSumb = false;
        this.materielSteps = false;
        this.isExamine = false;
        this.isEditInfo = false;
        this.isReject = false;
        this.isRejectCause = false;
        this.isEditInfoAfter = true;
        this.examineResult = true;
        this.examineTimes = true;
        this.isAssessment = false;
        this.isPass = true;
        this.assessmentTimes = true;
        this.assessmentResult = true;
        this.getMaterilById(row.id);
        //   this.setRewardApplyForm={
        //     contacts:'',
        //     tel:'',
        //     layingStage:'',
        //     address:'',
        //     applyTimes:'',
        //     examineResult:'',
        //     examineTimes:'',
        //     rejectCause:'',
        //     assessmentTimes:'',
        //     assessmentResult:''
        //  };
      } else if (2 === row.status) {//待考核
        this.isSumb = false;
        this.auditOperation.id = row.id;
        this.materielSteps = false;
        this.isExamine = false;
        this.isEditInfo = false;
        this.isReject = false;
        this.isAssessment = true;
        this.isPass = false;
        this.isRejectCause = false;
        this.isEditInfoAfter = true;
        this.examineResult = true;
        this.examineTimes = true;
        this.assessmentTimes = true;
        this.assessmentResult = true;
        //   this.setRewardApplyForm={
        //     contacts:'',
        //     tel:'',
        //     layingStage:'',
        //     address:'',
        //     applyTimes:'',
        //     examineResult:'',
        //     examineTimes:'',
        //     assessmentTimes:'',
        //     assessmentResult:''
        //  };
        this.getMaterilById(row.id);
      }
      this.setRewardApplyForm.parkId = row.parkId
      this.popRewardApply = true;

    },
    
    //再次申请
    againApply(row){
      this.currentStatus = row.status;
      this.isSumb = true;
      this.setRewardApplyForm = {
        contacts: '',
        tel: '',
        layingStage: '',
        address: '',
      };
      this.parkId = row.parkId;
      this.materielSteps = true;
      this.isExamine = false;
      this.isReject = false;
      this.isRejectCause = false;
      this.isEditInfoAfter = false;
      this.isEditInfo = true;
      this.isAssessment = false;
      this.isPass = false;
      this.setRewardApplyForm.parkId = row.parkId
      this.popRewardApply = true;
    },

    // //删除员工
    // deleteOwner(id){
    //   this.$confirm("您确信删除选中的住户?", "确认", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //   .then(() => {
    //     this.utils.http({
    //       url: "/person/deleteHousehold",
    //       method: "GET",
    //       params: {appId:this.appId,personId:id}
    //     },
    //     res => {
    //       if(res.code==200){
    //         this.utils.tip('success','删除成功');
    //         this.getPersonList()
    //       }

    //     });  
    //   })
    //   .catch(() => {

    //   });
    // },
    // //点击审核
    // goCheck(row){
    //   this.checkMsg=row.personName+',申请'+row.houseAddress;
    //   this.checkPopVisible=true;
    //   this.popIndex=1;
    //   this.checkForm.id=row.id
    // },
    // //审核通过
    // checkAgree(){
    //   this.checkForm.bindStatus=9;
    //   this.checkRequest();
    // },
    // //点击拒绝
    // clickRefuse(){
    //   this.popIndex=2;
    //   this.checkPopTitle='请输入拒绝原因';
    // },
    // //取消拒绝
    // cancelRefuse(){
    //   this.popIndex=1;
    //   this.checkPopTitle='审核';
    //   this.checkForm.bindFailReseaon='';
    //   this.showCheckTip=false;
    // },
    // //拒绝确认
    // refuse(){  
    //   this.checkForm.bindStatus=4;
    //   if(this.checkForm.bindFailReseaon){
    //     this.checkRequest();
    //   }else{
    //     this.showCheckTip=true;
    //   }

    // },
    // //审核接口
    // checkRequest(){
    //   this.utils.http({
    //     url: "/person/updateBindStatus",
    //     method: "POST",
    //     data:this.checkForm
    //   },
    //   res => {
    //     if(res.code==200){
    //       this.checkPopVisible=false;
    //       this.showCheckTip=false;
    //       this.utils.tip('success','审核成功');
    //       this.getCheckList()
    //     }

    //   });  
    // },
    closePop() {
      this.popIndex = 1;
      this.checkPopTitle = '审核';
      this.checkForm.bindFailReseaon = '';
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
    //全部住户导出
    exportBtn() {
      this.outPop = true;
    },
    outBtn() {
      this.isExport = true;
      //所有住户导出
      if (this.tabIndex == 0) {
        this.outChecked = this.$refs.exportData.outChecked;
        if (this.outChecked) {
          this.PersonListForm.withPic = 1;
        } else {
          this.PersonListForm.withPic = 0;
        }
        let ids = [];
        let all = this.$refs.tableChild.selectData;
        all.forEach((item, index) => {
          ids.push(item.id)
        })
        this.PersonListForm.ids = ids;
        this.utils.http({
          url: "/person/personExport",
          method: "POST",
          data: this.PersonListForm
        },
          res => {
            this.isExport = false;
            this.outPop = false;
            delete this.PersonListForm.ids;//删除ids属性  防止查询报错
            if (res.code == 200) {
              this.$alert('人员正在导出请稍后', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: 'success',
              }).then(() => {

              }).catch(() => { });
            } else {
              this.$alert('人员导出失败', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: 'error',
              }).then(() => {

              }).catch(() => { });
            }

          });
      } else if (this.tabIndex == 1) {//审核住户导出
        this.outChecked = this.$refs.exportData.outChecked;
        if (this.outChecked) {
          this.PersonListForm1.withPic = 1;
        } else {
          this.PersonListForm1.withPic = 0;
        }
        let ids = [];
        let all = this.$refs.tableChild1.selectData;
        all.forEach((item, index) => {
          ids.push(item.id)
        })
        this.PersonListForm1.ids = ids;
        this.utils.http({
          url: "/person/houseExport",
          method: "POST",
          data: this.PersonListForm1
        },
          res => {
            this.isExport = false;
            this.outPop = false;
            delete this.PersonListForm1.ids;//删除ids属性  防止查询报错
            if (res.code == 200) {
              this.$alert('人员正在导出请稍后', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: 'success',
              }).then(() => {

              }).catch(() => { });
            } else {
              this.$alert('人员导出失败', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: 'error',
              }).then(() => {

              }).catch(() => { });
            }
          });
      }

    },


    //查看附件
    onPreview(url) {
      this.previewImg = [];
      let urlList = url.split(',')
      urlList.forEach((item, index) => {
        let realUrl = this.imgurl + '/file/download?path=' + item;
        this.previewImg.push(realUrl)
      })

      this.showViewer = true;
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
      } else if (tab.index == 1) {
        this.tabIndex = 1;
      }
    },



    submitUpload() {
      if (this.fileList.length > 0) {
        this.$refs.upload.submit();
      } else {
        this.$message.error('请选择文件');
      }
    },
    //文件选择变化
    selectChange(file, fileList) {
      var fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      let types = ['zip'];
      const isZip = types.includes(fileType);
      if (!isZip) {
        this.$message.error('只支持.zip压缩文件');
        this.fileList = [];
        return false
      }
      this.fileList = fileList;
    },
    //上传之前
    beforeAvatarUpload(file, fileList) {
      var fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
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
      this.importPop = false;
      this.popVisible = true;//是否显示信息弹框
      this.popTitle = '提示';
      this.popContent = '人员正在导入请稍后';
    },
    //上传成功
    successCheck(response, file, fileList) {
      console.log(response);
      this.$refs.upload.clearFiles()
      this.popVisible = false;
      if (response.code == 200) {
        if (response.data.isOpen == 1) {
          this.exportErrList = response.data.list;
          this.exporterrPop = true;
        } else if (response.data.isOpen == 0) {
          this.$alert('人员导入成功', '提示', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true,
            type: 'success',
          }).then(() => {

          }).catch(() => { });
        } else if (response.data.isOpen == 2) {
          this.$message.error('模板解析异常');
        }

      } else {
        this.$message.error(response.msg);
      }
    },
    //删除
    removeFile() {
      this.fileList = [];
    },
    //上传失败
    uploadErr(err, file, fileList) {
      this.$message.error('导入失败');
    },
    //删除图片
    remove(index) {
      this.images.splice(index, 1);
    },
    exceed() {
      this.$message.error('不支持多文件上传');
    },

    //查看授权状态
    goView(id, name) {
      this.authPopVisible = true;
      this.authId = id;
      this.authPopTitle = name;
    },

    //物料返佣设置保存
    materielSetSave(fromMsg) {
      if (this.setCommission.enabled) {
        this.setCommission.enabled = '1';
      } else {
        this.setCommission.enabled = '0';
      }
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.utils.http({
            url: "/manage/organ/reward/saveRefund",
            method: "POST",
            data: this.setCommission
          },
            res => {
              if (res.code == 200) {
                // this.total1=res.data.total;
                // this.tableData1=res.data.records;
                // this.currentPage1=res.data.current;     
                this.popCommission = false;
                this.getPersonList();
              }

            });
        }
      })

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

    //更改渠道
    channelChange(e) {
      if (null != e) {
        this.materialApplicationForm.organizationId = e;
      } else {
        this.materialApplicationForm.organizationId = '';
      }
    },

    //物料奖励申请设置
    materielApply(fromMsg) {
      // this.setRewardApplyForm.parkId = this.parkId;
      if (0 === this.currentStatus) {
        this.$refs[fromMsg].validate((valid) => {
          if (valid) {
            this.utils.http({
              url: "/manage/material/apply/saveApply",
              method: "POST",
              // params: {appId:this.appId}
              data: this.setRewardApplyForm
            },
              res => {
                if (res.code == 200) {
                  this.popRewardApply = false;
                  this.getCheckList();
                  // this.realTimeList=res.data;
                  // if(0 < res.data.length){
                  //    this.channel = res.data
                  // }
                }

              });
          }
        })

      }
    },

    //审核操作
    passAudit() {//通过审核
      this.auditOperation.status = 1;
      this.auditOperation.verityType = 1;
      this.utils.http({
        url: "/manage/material/apply/verity",
        method: "POST",
        // params: {appId:this.appId}
        data: this.auditOperation
      },
        res => {
          if (res.code == 200) {
            this.popRewardApply = false;
            this.getCheckList();
            // this.realTimeList=res.data;
            // if(0 < res.data.length){
            //    this.channel = res.data
            // }
          }
        });
    },

    //审核操作
    rejectAudit() {//拒绝审核
      this.dialogRejectVisible = true;
      this.auditOperation.status = 2;
      this.auditOperation.verityType = 1;
    },

    //拒绝审核
    rejectCause(fromMsg) {
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.isRequst = true;
          this.utils.http({
            url: "/manage/material/apply/verity",
            method: "POST",
            data: this.auditOperation
          },
            res => {
              if (res.code == 200) {
                this.dialogRejectVisible = false;
                this.popRewardApply = false;
                this.getCheckList();
                // this.realTimeList=res.data;
                // if(0 < res.data.length){
                //    this.channel = res.data
                // }
              }
            });
        }
      })
    },

    //拒绝考核
    rejectAssessment() {
      this.dialogRejectVisible = true;
      this.auditOperation.status = 2;
      this.auditOperation.verityType = 2;
    },

    //审核操作
    passAssessment() { //通过考核
      this.auditOperation.status = 1;
      this.auditOperation.verityType = 2;
      this.utils.http({
        url: "/manage/material/apply/verity",
        method: "POST",
        // params: {appId:this.appId}
        data: this.auditOperation
      },
        res => {
          if (res.code == 200) {
            this.popRewardApply = false;
            this.getCheckList();
            // this.realTimeList=res.data;
            // if(0 < res.data.length){
            //    this.channel = res.data
            // }
          }

        });

    },

    //查询物料申请的详情信息
    getMaterilById(id) {
      //   this.setRewardApplyForm={
      //     contacts:row.contacts,
      //     tel:row.tel,
      //     layingStage:row.layingStage,
      //     address:row.address,
      //     applyTimes:row.applyTime,
      //     examineResult:row.checkStatus,
      //     examineTimes:'',
      //     rejectCause:'',
      //     assessmentTimes:'',
      //     assessmentResult:''
      //  };
      this.utils.http({
        url: "/manage/material/apply/getMaterilById?id=" + id,
        method: "get",
        // params: {appId:this.appId}
        // data: this.auditOperation
      },
        res => {
          if (res.code == 200) {
            //申请状态 0,待申请 1,待审核 2、审核通过 3、审核拒绝   考核状态 0,待考核 1、考核通过 2、考核拒绝
            if (0 === res.data.applyStatus) {
              res.data.applyStatus = '待申请';
            } else if (1 === res.data.applyStatus) {
              res.data.applyStatus = '待审核';
              this.assessmentTimes = false;
              this.assessmentResult = false;
            } else if (2 === res.data.applyStatus) {
              res.data.applyStatus = '审核通过';
              this.assessmentTimes = false;
              this.assessmentResult = false;
            } else if (3 === res.data.applyStatus) {
              res.data.applyStatus = '审核拒绝';
              this.assessmentTimes = false;
              this.assessmentResult = false;
            }
            if (0 === res.data.checkStatus) {
              this.assessmentTimes = false;
              this.assessmentResult = false;
              res.data.checkStatus = '待考核';
            } else if (1 === res.data.checkStatus) {
              res.data.checkStatus = '考核通过';
              this.assessmentTimes = true;
              this.assessmentResult = true;
            } else if (2 === res.data.checkStatus) {
              res.data.checkStatus = '考核拒绝';
              this.assessmentTimes = true;
              this.assessmentResult = true;
            }
            if (1 === res.data.layingStage) {
              res.data.layingStage = '随时'
            } else if (2 === res.data.layingStage) {
              res.data.layingStage = '一周内'
            } else {
              res.data.layingStage = '一月内'
            }
            this.setRewardApplyForm = {
              applyNo: res.data.applyNo,
              parkName: res.data.parkName,
              contacts: res.data.contacts,
              tel: res.data.tel,
              layingStage: res.data.layingStage,
              address: res.data.address,
              applyTimes: res.data.applyTime,
              checkStatus: res.data.applyStatus,
              examineTimes: res.data.verityTime,
              rejectCause: res.data.refuseReason,
              assessmentTimes: res.data.checkTime,
              assessmentResult: res.data.checkStatus
            };
            // this.setRewardApplyForm.layingStage =  res.data.layingStage;
          }
        });
    },

    //修改月份
    changeTime(e) {
      if (null != e) {
        this.PersonListForm2.reconTime = this.month.replace(/-/g, "");
      } else {
        this.PersonListForm2.reconTime = '';
      }

    }
  },
}