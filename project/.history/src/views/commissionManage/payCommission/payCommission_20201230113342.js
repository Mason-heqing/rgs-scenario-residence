import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import TableBmp from '../../../components/nice.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
export default {
  name: 'home',
  data() {
    let validateRewardProportion = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("请输入奖励百分比"));
      } else if (value < 0) {
        return callback(new Error(`百分比不能为负数`));
      } else {
        return callback();
      }
    };
    let validateRewardPark = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("请输入单笔奖励'"));
      } else if (value < 0) {
        return callback(new Error(`奖励金额不能为负数`));
      } else {
        return callback();
      }
    };
    return {
      msg: '通道规则',
      currentPage: 1,
      currentPage1: 1,
      popVisible: false,//是否显示信息弹框
      popReward: false,//是否显示奖励设置弹框
      materialRules: false,//返佣规则
      isAliPayment: false,//是否展示支付宝支付信息
      isWechatPayment: false,//是否展示微信支付信息
      isAliPaymentReconciliation: false,//是否在支付返佣对账列表展示支付宝信息
      isWeChatPaymentReconciliation: false,//是否在支付返佣对账列表展示微信信息
      isOpenAli: true,//是否开启支付宝开关设置按钮
      isLadder: false,
      aliStyle: "primary",//支付宝按钮
      wechatStyle: "default",//微信按钮
      isRewardType: true,
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      saveCurrentData: null,//保存当前数据
      multipleSelection: [],//表格选中
      reconciliationTime: [],//选择支付对账有效时间
      setRewardFormRules: {
        paydataTime: [
          { required: true, message: '请选择有效时间', trigger: 'change' },
        ],
        calculationMethod: [
          { required: true, message: '请选择奖励标准', trigger: 'change' },
        ],
        rewardProportion: [
          { validator: validateRewardProportion },
          { required: true, message: '请输入奖励百分比', trigger: 'blur' },
        ],
        rewardPark: [
          { validator: validateRewardPark },
          { required: true, message: '请输入单笔奖励', trigger: 'blur' },
        ],
      },
      setRewardForm: { //提交支付返佣设置
        paydataTime: [],//选择支付设置有效时间
        alipayEnabled: 0,
        calculationMethod: 0,
        endTime: "",
        organizationId: "",
        payType: "ALIPAY",
        rewardPark: 0,
        rewardProportion: 0,
        rewardtype: 2,
        startTime: "",
        wechatEnabled: 0
      },
      tableData: [],
      tableOption: [],
      tableSelect: [],
      activeName: 'first',
      openActiveName: 'first',
      isShowSelect: true,
      rewardstandard: [
        {
          value: 1,
          label: '按支付金额'
        },
        {
          value: 2,
          label: '按支付笔数'
        }
      ],
      PersonListForm: {
        currentPage: 1,
        pageSize: 10,
        rewardtype: 2,//返佣类型 1、开户返佣 2、支付返佣 3、物料返佣
        childChanName: '',
      },
      PersonListForm1: {//返佣对账
        currentPage: 1,
        pageSize: 10,
        reconTime: '',
        rewardtype: 2,
        reconTime: '',//查询时间
      },
      total1: 1,
      tableData1: [],
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
    this.getLastMonthAndDay();
    // this.getSameMonth();
    this.getPersonList();
    // this.getCheckList();
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
      this.reconciliationTime = year + "-" + month;
      this.PersonListForm1.reconTime = year.toString() + month.toString();
    },

    //支付返佣对账默认选择当月时间
    // getSameMonth() {
    //   let date = new Date();
    //   let Y = date.getFullYear();
    //   // let M = date.getMonth() + 1;
    //   let M = (date.getMonth() + 1 < 10
    //     ? "0" + (date.getMonth() + 1)
    //     : date.getMonth() + 1);
    //   this.reconciliationTime = Y + "-" + M;
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

    //奖励设置
    rewardSet(row) {
      this.popReward = true;
      this.saveCurrentData = row;
      this.openActiveName = 'first';
      if (row.organizationId && '' != row.organizationId) {
        this.setRewardForm.organizationId = row.organizationId;
      }
      if ((1 === row.alipayDisplay && 1 === row.wechatDisplay) || (1 === row.alipayDisplay && 2 === row.wechatDisplay)) {
        this.popReward = true;
        this.aliStyle = "primary";
        this.wechatStyle = "default";
        this.isOpenAli = true;
        this.payType = 'ALIPAY';
        if (null != row.alipay) {
          if (1 === row.alipay.enabled) {
            this.setRewardForm.alipayEnabled = true;
          } else {
            this.setRewardForm.alipayEnabled = false;
          }
          if (row.alipay.tempTime && '' != row.alipay.tempTime) {
            this.$set(this.setRewardForm.paydataTime, "tradedate", [row.alipay.tempTime.split('~')[0], row.alipay.tempTime.split('~')[1]]);
            this.setRewardForm.paydataTime = [row.alipay.tempTime.split('~')[0], row.alipay.tempTime.split('~')[1]];
            this.setRewardForm.startTime = row.alipay.tempTime.split('~')[0];
            this.setRewardForm.endTime = row.alipay.tempTime.split('~')[1];
          } else {
            this.setRewardForm.paydataTime = [];
            this.setRewardForm.startTime = '';
            this.setRewardForm.endTime = '';
          }

          this.setRewardForm.calculationMethod = row.alipay.calculationMethod;
          if (1 === row.alipay.calculationMethod) {
            this.isRewardType = true;
          } else {
            this.isRewardType = false;
          }
          this.setRewardForm.rewardProportion = row.alipay.rewardProportion * 100;
          // this.setRewardForm.rewardPark = row.alipay.rewardProportion;
          this.setRewardForm.rewardPark = row.alipay.rewardPark / 100
        } else {
          this.setRewardForm.alipayEnabled = false;
          this.setRewardForm.paydataTime = [];
          this.setRewardForm.startTime = '';
          this.setRewardForm.endTime = '';
          this.setRewardForm.calculationMethod = '';
          this.setRewardForm.rewardProportion = '';
          // this.setRewardForm.rewardPark = '';
          this.setRewardForm.rewardPark = '';

        }

      } else if (2 === row.alipayDisplay && 2 === row.wechatDisplay) {
        this.popReward = false;
        this.setRewardForm.alipayEnabled = false;
        this.setRewardForm.paydataTime = [];
        this.setRewardForm.startTime = '';
        this.setRewardForm.endTime = '';
        this.setRewardForm.calculationMethod = '';
        this.setRewardForm.rewardProportion = '';
        // this.setRewardForm.rewardPark = '';
        this.setRewardForm.rewardPark = ''
      } else if (2 === row.alipayDisplay && 1 === row.wechatDisplay) {
        this.popReward = true;
        this.aliStyle = "default";
        this.wechatStyle = "primary";
        this.isOpenAli = false;
        this.payType = 'WECHAT';
        if (null != row.wechat) {
          if (1 === row.alipay.enabled) {
            this.setRewardForm.wechatEnabled = true;
          } else {
            this.setRewardForm.wechatEnabled = false;
          }
          if (row.wechat.tempTime && '' != row.wechat.tempTime) {
            this.$set(this.setRewardForm.paydataTime, "tradedate", [row.wechat.tempTime.split('~')[0], row.wechat.tempTime.split('~')[1]]);
            this.setRewardForm.paydataTime = [row.wechat.tempTime.split('~')[0], row.wechat.tempTime.split('~')[1]];
            this.setRewardForm.startTime = row.wechat.tempTime.split('~')[0];
            this.setRewardForm.endTime = row.wechat.tempTime.split('~')[1];
          } else {
            this.setRewardForm.paydataTime = [];
            this.setRewardForm.startTime = '';
            this.setRewardForm.endTime = '';
          }

          this.setRewardForm.calculationMethod = row.wechat.calculationMethod;
          this.setRewardForm.rewardProportion = row.wechat.rewardProportion;
          // this.setRewardForm.rewardPark = row.wechat.rewardProportion;
          this.setRewardForm.rewardPark = row.wechat.rewardPark
        } else {
          this.setRewardForm.wechatEnabled = false;
          this.setRewardForm.paydataTime = [];
          this.setRewardForm.startTime = '';
          this.setRewardForm.endTime = '';
          this.setRewardForm.calculationMethod = '';
          this.setRewardForm.rewardProportion = '';
          // this.setRewardForm.rewardPark = '';
          this.setRewardForm.rewardPark = ''
        }
      }

    },

    //奖励修改记录
    reward(id) {
      this.utils.setStore('payCommission', id)
      this.$router.push({
        path: '/reviseRecord',
        query: {
          type: '2',
        }
      })
    },

    //选择奖励标准
    selectRewardstandard(e) {
      if (1 === e) {
        this.isRewardType = true;

      } else {
        this.isRewardType = false;
      }
    },

    //选择支付宝支付
    aliPay() {
      this.aliStyle = "primary";
      this.wechatStyle = "default";
      this.isOpenAli = true;
      this.setRewardForm.payType = 'ALIPAY';
      if (1 === this.saveCurrentData.wechatEnabled) {
        this.setRewardForm.alipayEnabled = true;
      } else {
        this.setRewardForm.alipayEnabled = false;
      }
      if (this.saveCurrentData.alipay.tempTime && '' != this.saveCurrentData.alipay.tempTime) {
        this.$set(this.setRewardForm.paydataTime, "tradedate", [this.saveCurrentData.alipay.tempTime.split('~')[0], this.saveCurrentData.alipay.tempTime.split('~')[1]]);
        this.setRewardForm.paydataTime = [this.saveCurrentData.alipay.tempTime.split('~')[0], this.saveCurrentData.alipay.tempTime.split('~')[1]];
        this.setRewardForm.startTime = this.saveCurrentData.alipay.tempTime.split('~')[0];
        this.setRewardForm.endTime = this.saveCurrentData.alipay.tempTime.split('~')[1];
      } else {
        this.setRewardForm.paydataTime = [];
        this.setRewardForm.startTime = '';
        this.setRewardForm.endTime = '';
      }

      if (2 === this.saveCurrentData.alipay.calculationMethod) {
        this.setRewardForm.calculationMethod = 2;
        this.isRewardType = false;
      } else {
        this.setRewardForm.calculationMethod = 1;
        this.isRewardType = true;
      }
      if (0 != this.saveCurrentData.alipay.rewardProportion) {
        this.setRewardForm.rewardProportion = this.saveCurrentData.alipay.rewardProportion * 100;
      } else {
        this.setRewardForm.rewardProportion = 0;
      }
      if (0 != this.saveCurrentData.alipay.rewardPark) {
        this.setRewardForm.rewardPark = this.saveCurrentData.alipay.rewardPark / 100
      } else {
        this.setRewardForm.rewardPark = 0;
      }

    },

    //选择微信支付
    wechatPay() {
      this.aliStyle = "default";
      this.wechatStyle = "primary";
      this.isOpenAli = false;
      this.setRewardForm.payType = 'WECHAT';
      if (1 === this.saveCurrentData.wechatEnabled) {
        this.setRewardForm.wechatEnabled = true;
      } else {
        this.setRewardForm.wechatEnabled = false;
      }
      if (this.saveCurrentData.wechat.tempTime && '' != this.saveCurrentData.wechat.tempTime) {
        this.$set(this.setRewardForm.paydataTime, "tradedate", [this.saveCurrentData.wechat.tempTime.split('~')[0], this.saveCurrentData.wechat.tempTime.split('~')[1]]);
        this.setRewardForm.paydataTime = [this.saveCurrentData.wechat.tempTime.split('~')[0], this.saveCurrentData.wechat.tempTime.split('~')[1]];
        this.setRewardForm.startTime = this.saveCurrentData.wechat.tempTime.split('~')[0];
        this.setRewardForm.endTime = this.saveCurrentData.wechat.tempTime.split('~')[1];
      } else {
        this.setRewardForm.paydataTime = [];
        this.setRewardForm.startTime = '';
        this.setRewardForm.endTime = '';
      }
      if (2 === this.saveCurrentData.wechat.calculationMethod) {
        this.setRewardForm.calculationMethod = 2;
        this.isRewardType = false;
      } else {
        this.setRewardForm.calculationMethod = 1;
        this.isRewardType = true;
      }
      if (0 != this.saveCurrentData.wechat.rewardProportion) {
        this.setRewardForm.rewardProportion = this.saveCurrentData.wechat.rewardProportion * 100;
      } else {
        this.setRewardForm.rewardProportion = 0;
      }
      if (0 != this.saveCurrentData.wechat.rewardPark) {
        this.setRewardForm.rewardPark = this.saveCurrentData.wechat.rewardPark / 100;
      } else {
        this.setRewardForm.rewardPark = 0;
      }
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

    //支付返佣设置
    getPersonList() {
      this.loading = true;
      this.utils.http({
        url: "/manage/organ/reward/pagePayRefund",
        method: "POST",
        data: this.PersonListForm
      },
        res => {
          this.loading = false;
          if (res.code == 200) {
            this.total = res.data.total;
            if (null != res.data.records && 0 < res.data.records.length) {
              res.data.records.forEach((item, index) => {
                if (1 === item.alipayDisplay) {
                  this.isAliPayment = true;
                } else {
                  this.isAliPayment = false;
                }
                if (1 === item.wechatDisplay) {
                  this.isWechatPayment = true;
                } else {
                  this.isWechatPayment = false;
                }
                if (null != item.alipay) {
                  if ('null~null' == item.alipay.tempTime) {
                    item.aliTempTime = '';
                  } else {
                    item.aliTempTime = item.alipay.tempTime;
                  }
                  if (1 === item.alipay.calculationMethod) {
                    item.aliCalculationMethod = '按支付金额'
                  } else if (2 === item.alipay.calculationMethod) {
                    item.aliCalculationMethod = '按支付笔数'
                  } else {
                    item.aliCalculationMethod = ''
                  }
                  if (0 === item.alipay.enabled) {
                    item.aliEnabled = '停用'
                  } else {
                    item.aliEnabled = '启用'
                  }

                }
                if (null != item.wechat) {

                  if ('null~null' == item.wechat.tempTime) {
                    item.wechatTempTime = '';
                  } else {
                    item.wechatTempTime = item.wechat.tempTime;
                  }
                  if (1 === item.wechat.calculationMethod) {
                    item.wechatCalculationMethod = '按支付金额'
                  } else if (2 === item.wechat.calculationMethod) {
                    item.wechatCalculationMethod = '按支付笔数'
                  } else {
                    item.wechatCalculationMethod = ''
                  }
                  if (0 === item.wechat.enabled) {
                    item.wechatEnabled = '停用'
                  } else {
                    item.wechatEnabled = '启用'
                  }

                }
              })
            }
            this.tableData = res.data.records;
            this.currentPage = res.data.current;
          }
        });
    },
    //支付返佣对账
    getCheckList() {
      this.utils.http({
        url: "/manage/reward/pagePayInfo",
        method: "get",
        params: this.PersonListForm1
      },
        res => {
          if (res.code == 200) {
            this.total1 = res.data.total;
            if (null != res.data.records && 0 < res.data.records.length) {
              res.data.records.forEach((item, index) => {
                item.reconciliationMonth = item.reconMonth;
                item.subChannelName = item.organizationName;
                if (1 === item.settlementStatus) {
                  item.status = '已结算';
                } else {
                  item.status = '未结算';
                }
                if (1 === item.alipayDisplay) {
                  this.isAliPaymentReconciliation = true;
                } else {
                  this.isAliPaymentReconciliation = false;
                }
                if (1 === item.wechatDisplay) {
                  this.isWeChatPaymentReconciliation = true;
                } else {
                  this.isWeChatPaymentReconciliation = false;
                }
                if (null != item.alipayCheck) {
                  item.aliAmountNum = item.alipayCheck.tradeNum;
                  if (0 != item.alipayCheck.tradeAccount) {
                    item.aliAmountmoney = item.alipayCheck.tradeAccount / 100;
                  } else {
                    item.aliAmountmoney = 0
                  }
                  if (0 != item.alipayCheck.rewardAccount) {
                    item.aliCommissionAmount = item.alipayCheck.rewardAccount / 100;
                  } else {
                    item.aliCommissionAmount = 0
                  }
                } else {
                  item.aliAmountNum = 0;
                  item.aliAmountmoney = 0;
                  item.aliCommissionAmount = 0;
                }
                if (null != item.wechatCheck) {
                  item.wechatAmountNum = item.wechatCheck.tradeNum;
                  if (0 != item.wechatCheck.tradeAccount) {
                    item.wechatAmountmoney = item.wechatCheck.tradeAccount / 100;
                  } else {
                    item.wechatAmountmoney = 0
                  }
                  if (0 != item.wechatCheck.rewardAccount) {
                    item.wechatCommissionAmount = item.wechatCheck.rewardAccount / 100;
                  } else {
                    item.wechatCommissionAmount = 0
                  }
                } else {
                  item.wechatAmountNum = 0;
                  item.wechatAmountmoney = 0;
                  item.wechatCommissionAmount = 0
                }
              })
            }
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
        rewardtype: 2,//返佣类型 1、开户返佣 2、支付返佣 3、物料返佣
        childChanName: '',
      }
      this.getPersonList()
    },

    //返佣对账重置
    resetBtn1() {
      this.PersonListForm1 = {
        currentPage: 1,
        pageSize: 10,
        reconTime: '',
        rewardtype: 2,
        reconTime: '',//查询时间
      }
      this.getLastMonthAndDay();
      // this.getCheckList();
      this.getCheckList();
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
    
    //查看明细
    goCheck(row) {
      this.utils.setStore('seeDetailsData', row);
      // console.log("查看详情------->",row);
      this.$router.push({
        path: '/seeDetails',
        query: {
          type: '2',
        }
      })
    },


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

    //支付返佣对账导出
    exportBtn() {
      // this.outPop = true;
      if (0 === this.total1) {
        this.$message('当前没有数据可导出');
      } else {
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
            url: "/manage/export/reward/exportPayInfo",
            method: "GET",
            // params: {appId:this.appId}
            params: { rewardtype: 2, reconTime: this.reconciliationTime.replace(/-/g, '') }
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

    openHandleClick(tab, event) {
      if (tab.index == 0) {
        this.isOpenAli = true;
        this.setRewardForm.payType = 'ALIPAY';
        if (null != this.saveCurrentData.alipay) {
          this.$set(this.setRewardForm.paydataTime, "tradedate", [this.saveCurrentData.alipay.tempTime.split('~')[0], this.saveCurrentData.alipay.tempTime.split('~')[1]]);
          this.setRewardForm.paydataTime = [this.saveCurrentData.alipay.tempTime.split('~')[0], this.saveCurrentData.alipay.tempTime.split('~')[1]];
          this.setRewardForm.startTime = this.saveCurrentData.alipay.tempTime.split('~')[0];
          this.setRewardForm.endTime = this.saveCurrentData.alipay.tempTime.split('~')[1];
          if (2 === this.saveCurrentData.alipay.calculationMethod) {
            this.setRewardForm.calculationMethod = 2;
            this.isRewardType = false;
          } else {
            this.setRewardForm.calculationMethod = 1;
            this.isRewardType = true;
          }
          if (0 != this.saveCurrentData.alipay.rewardProportion) {
            this.setRewardForm.rewardProportion = this.saveCurrentData.alipay.rewardProportion * 100;
          } else {
            this.setRewardForm.rewardProportion = 0;
          }
          if (0 != this.saveCurrentData.alipay.rewardPark) {
            this.setRewardForm.rewardPark = this.saveCurrentData.alipay.rewardPark / 100
          } else {
            this.setRewardForm.rewardPark = 0;
          }
        } else {
          this.setRewardForm.paydataTime = [];
          this.setRewardForm.startTime = '';
          this.setRewardForm.endTime = '';
          this.setRewardForm.calculationMethod = 1;
          this.isRewardType = true;
          this.setRewardForm.rewardProportion = '';
          this.setRewardForm.rewardPark = '';
        }
      } else {
        this.isOpenAli = false;
        this.setRewardForm.payType = 'WECHAT';
        if ('启用' === this.saveCurrentData.wechatEnabled) {
          this.setRewardForm.wechatEnabled = true;
        } else {
          this.setRewardForm.wechatEnabled = false;
        }
        if (null != this.saveCurrentData.wechat) {
          this.$set(this.setRewardForm.paydataTime, "tradedate", [this.saveCurrentData.wechat.tempTime.split('~')[0], this.saveCurrentData.wechat.tempTime.split('~')[1]]);
          this.setRewardForm.paydataTime = [this.saveCurrentData.wechat.tempTime.split('~')[0], this.saveCurrentData.wechat.tempTime.split('~')[1]];
          this.setRewardForm.startTime = this.saveCurrentData.wechat.tempTime.split('~')[0];
          this.setRewardForm.endTime = this.saveCurrentData.wechat.tempTime.split('~')[1];
          if (2 === this.saveCurrentData.wechat.calculationMethod) {
            this.setRewardForm.calculationMethod = 2;
            this.isRewardType = false;
          } else {
            this.setRewardForm.calculationMethod = 1;
            this.isRewardType = true;
          }
          if (0 != this.saveCurrentData.wechat.rewardProportion) {
            this.setRewardForm.rewardProportion = this.saveCurrentData.wechat.rewardProportion * 100;
          } else {
            this.setRewardForm.rewardProportion = 0;
          }
          if (0 != this.saveCurrentData.wechat.rewardPark) {
            this.setRewardForm.rewardPark = this.saveCurrentData.wechat.rewardPark / 100;
          } else {
            this.setRewardForm.rewardPark = 0;
          }
        } else {
          this.setRewardForm.paydataTime = [];
          this.setRewardForm.startTime = '';
          this.setRewardForm.endTime = '';
          this.setRewardForm.calculationMethod = 1;
          this.isRewardType = true;
          this.setRewardForm.rewardProportion = '';
          this.setRewardForm.rewardPark = '';
        }
        // if(this.saveCurrentData.wechat.tempTime && 'null~null' != this.saveCurrentData.wechat.tempTime){
        //   this.$set(this.setRewardForm.paydataTime, "tradedate", [this.saveCurrentData.wechat.tempTime.split('~')[0], this.saveCurrentData.wechat.tempTime.split('~')[1]]);
        //   this.setRewardForm.paydataTime = [this.saveCurrentData.wechat.tempTime.split('~')[0], this.saveCurrentData.wechat.tempTime.split('~')[1]];
        //   this.setRewardForm.startTime = this.saveCurrentData.wechat.tempTime.split('~')[0];
        //   this.setRewardForm.endTime = this.saveCurrentData.wechat.tempTime.split('~')[1];
        // }else{
        //   this.setRewardForm.paydataTime = [];
        //   this.setRewardForm.startTime = '';
        //   this.setRewardForm.endTime = '';
        // }

        // if (2 === this.saveCurrentData.wechat.calculationMethod) {
        //   this.setRewardForm.calculationMethod = 2;
        //   this.isRewardType = false;
        // } else {
        //   this.setRewardForm.calculationMethod = 1;
        //   this.isRewardType = true;
        // }
        // if(0 != this.saveCurrentData.wechat.rewardProportion){
        //   this.setRewardForm.rewardProportion = this.saveCurrentData.wechat.rewardProportion*100;
        // }else{
        //   this.setRewardForm.rewardProportion = 0;
        // }
        //  if(0 != this.saveCurrentData.wechat.rewardPark){
        //   this.setRewardForm.rewardPark = this.saveCurrentData.wechat.rewardPark/100;
        //  }else{
        //   this.setRewardForm.rewardPark = 0;
        //  }
      }
    },

    //返佣支付对账提交结算
    settlement(row) {
      console.log("返佣对账详情---->", row);
      this.$alert('确定要提交结算吗?', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          let json = {};
          json.billMonthId = row.id;
          json.organizationId = row.organizationId;
          json.reconMonth = row.reconMonth.replace(/-/g, '');
          json.rewardtype = 2;
          this.updateSettlementStatus(json);
        }
      });
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

    //保存支付设置
    paySaveSet(fromMsg) {
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.utils.http({
            url: "/manage/organ/reward/saveRefund",
            method: "POST",
            data: this.setRewardForm
          },
            res => {

              if (res.code == 200) {
                this.popReward = false;
                this.getPersonList();
                // this.$alert('人员正在导出请稍后', '提示', {
                //   confirmButtonText: '确定',
                //   dangerouslyUseHTMLString: true,
                //   closeOnClickModal:true,
                //   type:'success',
                // }).then(() => {

                // }).catch(() => {});
              } else {
                // this.$alert('人员导出失败', '提示', {
                //   confirmButtonText: '确定',
                //   dangerouslyUseHTMLString: true,
                //   closeOnClickModal:true,
                //   type:'error',
                // }).then(() => {

                // }).catch(() => {});
              }
            });
        }
      })
    },

    //设置支付返佣更改有效时间
    changeTime(e) {
      if (this.setRewardForm.paydataTime !== null && this.setRewardForm.paydataTime.length > 0) {
        this.setRewardForm.startTime = this.setRewardForm.paydataTime[0];
        this.setRewardForm.endTime = this.setRewardForm.paydataTime[1];
      } else {
        this.setRewardForm.startTime = "";
        this.setRewardForm.endTime = "";
      }
    },

    //支付返佣对账更新时间
    reconciliationChangeTime(e) {
      if (null != e) {
        this.PersonListForm1.reconTime = this.reconciliationTime.replace(/-/g, "");
      } else {
        this.PersonListForm1.reconTime = '';
      }
    }
  },
}