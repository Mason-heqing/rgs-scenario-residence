import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import TableBmp from '../../../components/nice.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      currentPage1: 1,
      popVisible: false, //是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      timesTitle:'',
      headTitle:'',
      total: 0,
      multipleSelection: [], //表格选中
      tableData: [],
      tableLabel: [
        {
          label: '序号',
          param: 'img',
          align: 'center',
          sortable: true,
          isshow: true,
          index: true
        },
        {
          label: 'ID',
          param: 'personId',
          align: 'center',
          isshow: false,
          sortable: true,
          width: '120'
        },
        {
          label: '人脸',
          param: 'faceUrl',
          align: 'center',
          sortable: true,
          isimg: true,
          isshow: true,
          width: '120'
        },
        {
          label: '姓名',
          param: 'personName',
          align: 'center',
          sortable: true,
          isshow: true,
          width: '100'
        },
        {
          label: '联系方式',
          param: 'phone',
          align: 'center',
          isshow: true,
          sortable: true,
          width: '120'
        },
        {
          label: 'IC卡',
          param: 'icNum',
          align: 'center',
          isshow: true,
          sortable: true,
          width: '100'
        },
        {
          slot: 'operate1',
          isshow: true,
          label: '住户类型',
          sortable: true,
        },
        {
          slot: 'operate2',
          isshow: true,
          label: '住宅信息'
        },
        {
          slot: 'operate3',
          isshow: true,
          label: '授权状态'
        },
        {
          slot: 'operate5',
          isshow: true,
          label: '过期时间'
        },
        {
          slot: 'operate',
          isshow: true
        }, // 操作列
      ],

      tableOption: [],
      tableSelect: [],
      activeName: 'first',
      isShowSelect: true,
      personTypeList: [{
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
        appId: "",
        currentPage: 1,
        pageSize: 10,
        queryContent: '', //人名门牌号
        personType: '', //人员类型
        deviceGroupId: '', //选中房屋最后一级的ids
      },
      PersonListForm1: { //住户审核列表
        appId: "",
        pageNum: 1,
        pageSize: 10,
        personName: '', //姓名或手机号
        subtype: '', //人员类型
        time: '',
        bindStatus: '0', //审核状态
      },
      total2:1,
      tableData2:[],
      currentPage2:1,
      PersonListForm2:{
        appId: "",
        currentPage: 1,
        pageSize: 10,
        queryContent: '', //人名门牌号
        personType: '', //人员类型
        deviceGroupId: '', //选中房屋最后一级的ids
      },
      tableLabel2: [{
        label: 'ID',
        param: 'id',
        align: 'center',
        isshow: false,
        sortable: true,
        width: '120'
      },
      {
        label: '序号',
        param: 'img',
        align: 'center',
        sortable: true,
        isshow: true,
        index: true
      },
      {
        label: '人脸',
        param: 'faceUrl',
        align: 'center',
        sortable: true,
        isimg: true,
        isshow: true,
        width: '120'
      },
      {
        label: '姓名',
        param: 'personName',
        align: 'center',
        sortable: true,
        isshow: true,
        width: '100'
      },
      {
        label: '联系方式',
        param: 'phone',
        align: 'center',
        isshow: true,
        sortable: true,
        width: '120'
      },
      {
        label: 'IC卡',
        param: 'icNum',
        align: 'center',
        isshow: true,
        sortable: true,
        width: '100'
      },
      {
        slot: 'operate1',
        isshow: true,
        label: '住户类型'
      },
      {
        slot: 'operate2',
        isshow: true,
        label: '住宅信息'
      },
      {
        slot: 'operate3',
        isshow: true,
        label: '授权状态'
      },
      {
        slot: 'operate',
        isshow: true
      }, // 操作列
    ],
    isShowSelect2:true,
      total1: 1,
      tableData1: [],
      tableLabel1: [
        {label: 'ID',param: 'id',align: 'center',isshow: false,sortable: true,width: '120'},
        {label: '序号',param: 'img',align: 'center',sortable: true,isshow: true,index: true},
        {label: '人脸',param: 'faceUrl',align: 'center',sortable: true,isimg: true,isshow: true,width: '120'},
        {label: '姓名', param: 'personName',align: 'center',sortable: true,isshow: true,width: '100'},
        {label: '联系方式',param: 'phone',align: 'center',isshow: true,sortable: true,width: '120'},
        {label: '住户类型',param: 'personSubtype',align: 'center',isshow: true,width: '120',sortable: true,
          render: (row) => {
            if (row.personSubtype == 1) {
              return '户主'
            } else if (row.personSubtype == 2) {
              return '家庭成员'
            } else if (row.personSubtype == 3) {
              return '租客'
            } else if (row.personSubtype == 5) {
              return '其他'
            }
            // else if (row.personSubtype ==4) {
            //   return '物业员工'
            // } else if (row.personSubtype ==5) {
            //   return '访客'
            // }
          }
        },
        {label: '住宅信息',param: 'houseAddress',align: 'center',isshow: true,sortable: true,width: '150'},
        {label: '有效期限',param: 'effectiveTime',align: 'center',isshow: true,sortable: true,width: '180'},
        // { label: '附件', param: 'enclosureUrl', align: 'center',isshow:true, sortable: true  },
        {slot: 'operate1',isshow: true,label: '附件'},
        {label: '申请时间',param: 'applyTime',align: 'center',isshow: true,sortable: true,width: '180'},
        {label: '审核状态',param: 'bindStatus',align: 'center',isshow: true,width: '120',sortable: true,
          render: (row) => {
            if (row.bindStatus == 0 && !row.identityAudit) {
              return '待物业审核'
            } else if (row.bindStatus == 1) {
              return '户主审核通过'
            } else if (row.bindStatus == 2) {
              return '户主审核未通过'
            } else if (row.bindStatus == 3) {
              return '物业审核通过'
            } else if (row.bindStatus == 4) {
              return '物业审核未通过'
            } else if (row.bindStatus == 5) {
              return '待户主审核'
            } else if (row.bindStatus == 8) {
              return '已取消'
            } else if (row.bindStatus == 9) {
              return '已绑定'
            }else if (row.bindStatus == 0 && !!row.identityAudit) {
              return '待人证检验'
            }
          }
        },
        {slot: 'operate',isshow: true}, // 操作列
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
      }, ],
      popIndex: 1, //审核弹框
      checkPopVisible: false,
      checkPopTitle: '审核',
      checkForm: {
        bindStatus: '', //状态
        id: '',
        bindFailReseaon: '', //不通过原因
      },
      checkMsg: '', //审核的信息
      showCheckTip: false,
      outPop: false,
      outChecked: false,
      previewImg: [], //图片预览
      showViewer: false,
      imgurl: '',
      tabIndex: 0,
      importPop: false, //批量导入弹框
      fileList: [],
      uploadData: { //上传额外参数appid
        appId: ''
      },
      authPopVisible: false, //授权弹框
      authPopTitle: '',
      authId: '', //授权人员的id
      authName: '', //授权人员的name
      isExport: false,
      exportUrl: '',
      exportErrList: [], //导入失败的数据
      exporterrPop: false,
      timer: null,
      elcascaderkey: 1,
      dialogVisibleRenewalTime:false,
      effectiveTime:'',
      defaultStartData:'',
      pickerOptions: { // 限制收货时间不让选择今天以前的
        　　disabledDate(time) {
        　　　　return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        　　}
      },
      personDeviceBingId:'',
      renewalTimeFlag:null,
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
    console.log(this.imgurl, 'this.imgurl')

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
    appId(newFlag, oldFlag) {
      this.appId = newFlag;
      //重置
      ++this.elcascaderkey;
      this.PersonListForm = {
        appId: newFlag,
        currentPage: 1,
        pageSize: 10,
        personName: '', //人名门牌号
        subtype: '', //人员类型
        deviceGroupId: '', //选中房屋最后一级的ids
      };
      this.PersonListForm1 = { //住户审核列表
          appId: newFlag,
          pageNum: 1,
          pageSize: 10,
          personName: '', //姓名或手机号
          subtype: '', //人员类型
          time: '',
          bindStatus: '', //审核状态
        },
       this.PersonListForm2 = {
          appId: newFlag,
          currentPage: 1,
          pageSize: 10,
          personName: '', //人名门牌号
          subtype: '', //人员类型
          deviceGroupId: '', //选中房屋最后一级的ids
       } 
      this.uploadData.appId = newFlag;
      this.getPersonList();
      this.getCheckList();
      this.getLeftData();
      this.getRenewalList();
    }
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
    if (this.appId) {
      this.PersonListForm.appId = this.appId;
      this.PersonListForm1.appId = this.appId;
      this.PersonListForm2.appId = this.appId;
      this.uploadData.appId = this.appId;
      this.getPersonList();
      this.getCheckList();
      this.getLeftData();
      this.getRenewalList();
    }
    let d = new Date();
    this.defaultStartData = d.toLocaleDateString().replace(/\//g,"-"); 
  },
  methods: {
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
      console.log(e)
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
    //获取房屋下拉
    getLeftData() {
      this.cascaderData = [];
      this.utils.http({
          url: "/base/house/list",
          method: "GET",
          params: {
            appId: this.appId
          }
        },
        res => {
          if (res.code == 200 && res.data.groups) {
            this.cascaderData = res.data.groups;
          }
        });
    },

    //住户列表
    getPersonList() {
      this.loading = true;
      this.utils.http({
          url: "/person/resident/page",
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

    //审核列表
    getCheckList() {
      this.utils.http({
          url: "/person/queryHouseholderByPage",
          method: "POST",
          data: this.PersonListForm1
        },
        res => {
          console.log(res,'审核列表')
          if (res.code == 200) {
            this.total1 = res.data.total;
            this.tableData1 = res.data.records;
            this.currentPage1 = res.data.current;
          }

        });
    },

    //续约列表
    getRenewalList(){
      this.utils.http({
        url: "/person/resident/datedPersonPage",
        method: "POST",
        data: this.PersonListForm2
      },
      res => {
        console.log(res,'审核列表')
        if (res.code == 200) {
          this.total2 = res.data.total;
          this.tableData2 = res.data.records;
          this.currentPage2 = res.data.current;
        }

      });
    },
    batchRenewal(type){
       if(1 == type){
        let all = this.$refs.tableChild.selectData;
        if(0 == all.length){
            this.$message.error('请先选择续期的人员');
            return false;
        }
        this.timesTitle = '批量续期';
        this.headTitle = '续期时间';
        this.renewalTimeFlag = 1;
       }else{
        let all = this.$refs.tableChild2.selectData;
        if(0 == all.length){
            this.$message.error('请先选择续约的人员');
            return false;
        } 
        this.timesTitle = '批量续约';
        this.headTitle = '续期时约';
        this.renewalTimeFlag = 2;
       }
       this.effectiveTime ='';
       this.dialogVisibleRenewalTime = true;
    },

    //设置续约时间
    setRenewalTime(){
       if(1 == this.renewalTimeFlag){
        // let ids = [];
        let personIdS = [];
        let all = this.$refs.tableChild.selectData;
        all.forEach((item, index) => {
          // ids.push(item.id);
          personIdS.push(item.personId)
        })
        this.utils.http({
          url: "/person/resident/personSyncTimeBatch",
          method: "POST",
          data: {
            appId:this.appId,
            effectiveTime:this.effectiveTime,
            personIds:personIdS,
          }
        },
        res => {
          if (res.code == 200) {
            this.dialogVisibleRenewalTime = false;
            this.utils.tip('success', '批量续期成功');
            this.getPersonList();
          }
  
        });

       }else if(2 == this.renewalTimeFlag){
        let personIdS = [];
        let all = this.$refs.tableChild2.selectData;
        all.forEach((item, index) => {
          personIdS.push(item.personResidentHouseListVo.personDeviceBingId)
        })
        this.utils.http({
          url: "/person/resident/renewalBatch",
          method: "POST",
          data: {
            appId:this.appId,
            effectiveTime:this.effectiveTime,
            personDeviceBingIds:personIdS,
          }
        },
        res => {
          if (res.code == 200) {
            this.dialogVisibleRenewalTime = false;
            this.utils.tip('success', '批量续约成功');
            this.getRenewalList();
          }
  
        }); 

       }else{
        if('' != this.effectiveTime){
          this.utils.http({
            url: "/person/resident/renewal",
            method: "POST",
            data: {
              effectiveTime:this.effectiveTime,
              personDeviceBingId:this.personDeviceBingId,
            }
          },
          res => {
            if (res.code == 200) {
              this.dialogVisibleRenewalTime = false;
              this.utils.tip('success', '续约成功');
              this.getRenewalList();
            }
    
          });
        }else{
          this.$message.error('请选择续约时间');
        }
       }
        
    },

    //下拉改变
    cascaderChange(e) {
      if (e) {
        this.PersonListForm.deviceGroupId = e[e.length - 1]
      }

    },

    cascaderChange1(e){
      if (e) {
        this.PersonListForm2.deviceGroupId = e[e.length - 1]
      }
    },
  
    //重置
    resetBtn() {
      this.PersonListForm = {
        appId: this.appId,
        currentPage: 1,
        pageSize: 10,
        queryContent: '', //人名门牌号
        personType: '', //人员类型
        deviceGroupId: '', //选中房屋最后一级的ids
      }
      this.getPersonList()
    },
    resetBtn1() {
      this.PersonListForm1 = {
        appId: this.appId,
        pageNum: 1,
        pageSize: 10,
        personName: '', //姓名或手机号
        subtype: '', //人员类型
        time: '',
        bindStatus: '0', //审核状态
      }
      this.getCheckList()
    },
    resetBtn2(){
      this.PersonListForm2 = {
        appId: this.appId,
        currentPage: 1,
        pageSize: 10,
        queryContent: '', //人名门牌号
        personType: '', //人员类型
        deviceGroupId: '', //选中房屋最后一级的ids
      }
      this.getRenewalList()
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


    //审核编辑
    goExamine(row){
       console.log(row);
       this.utils.setStore('ownerMsg', row)
      this.$router.push({
        path: '/ownermanageadd',
        query: {
          type: '3',
        }
      })
    },

    //续约
    goRenewal(id){
      this.timesTitle = '续约时间',
      this.headTitle = '续约时间',
      this.renewalTimeFlag = 3;
      this.personDeviceBingId = id;
      this.effectiveTime ='';
      this.dialogVisibleRenewalTime = true;
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
              params: {
                appId: this.appId,
                personId: id
              }
            },
            res => {
              if (res.code == 200) {
                this.utils.tip('success', '删除操作已提交，请不要重复操作，稍后手动刷新列表！');
                this.getPersonList()
              }
            });
        })
        .catch(() => {

        });
    },


    //批量审核
    batchAudit(){
      let ids = [];
      let personIdS = [];
      let all = this.$refs.tableChild1.selectData;
      all.forEach((item, index) => {
        if((item.bindStatus==0 && !item.identityAudit) || item.bindStatus==1){
          ids.push(item.id);
          personIdS.push(item.personId)
        }
      })
      if (ids.length == 0) {
        this.popVisible = true; //是否显示信息弹框
        this.popTitle = '提示';
        this.popContent = '请先选择未审核的住户';
        this.open()
      } else {
        this.$confirm("您确信审核选中的住户?", "确认", {
            confirmButtonText: "通过审核",
            cancelButtonText: "拒绝审核",
            type: "warning"
          })
          .then(() => {
            this.utils.http({
                url: "/person/resident/personCheckBatch",
                method: "POST",
                data: {
                  bindStatus: 9,
                  personDeviceGroupIds: ids,
                  personId:personIdS
                }
              },
              res => {
                if (res.code == 200) {
                  this.utils.tip('success', '通过审核成功');
                  this.getCheckList()
                }
              });
          })
          .catch(() => {
            this.utils.http({
              url: "/person/resident/personCheckBatch",
              method: "POST",
              data: {
                bindStatus: 4,
                personDeviceGroupIds: ids,
                // personId:personIdS
              }
            },
            res => {
              if (res.code == 200) {
                this.utils.tip('success', '拒绝审核成功');
                this.getCheckList()
              }
            });
          });
      }
    },


    //点击审核
    goCheck(row) {
      this.checkMsg = row.personName + ',申请' + row.houseAddress;
      this.checkPopVisible = true;
      this.popIndex = 1;
      this.checkForm.id = row.id
    },
    //审核通过
    checkAgree() {
      this.checkForm.bindStatus = 9;
      this.checkRequest();
    },
    //点击拒绝
    clickRefuse() {
      this.popIndex = 2;
      this.checkPopTitle = '请输入拒绝原因';
    },
    //取消拒绝
    cancelRefuse() {
      this.popIndex = 1;
      this.checkPopTitle = '审核';
      this.checkForm.bindFailReseaon = '';
      this.showCheckTip = false;
    },
    //拒绝确认
    refuse() {
      this.checkForm.bindStatus = 4;
      if (this.checkForm.bindFailReseaon) {
        this.checkRequest();
      } else {
        this.showCheckTip = true;
      }

    },
    //审核接口
    checkRequest() {
      this.utils.http({
          url: "/person/updateBindStatus",
          method: "POST",
          data: this.checkForm
        },
        res => {
          if (res.code == 200) {
            this.checkPopVisible = false;
            this.showCheckTip = false;
            this.utils.tip('success', '审核成功');
            this.getCheckList()
          }

        });
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
    //批量删除
    batchDelete() {
      let ids = [];
      let all = this.$refs.tableChild.selectData;
      all.forEach((item, index) => {
        ids.push(item.personId)
      })
      if (ids.length == 0) {
        this.popVisible = true; //是否显示信息弹框
        this.popTitle = '提示';
        this.popContent = '请先选择要删除的住户';
        this.open()
      } else {
        this.$confirm("您确信删除选中的住户?", "确认", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.utils.http({
                url: "/person/batchDeleteHousehold",
                method: "POST",
                data: {
                  appId: this.appId,
                  personIdList: ids
                }
              },
              res => {
                if (res.code == 200) {
                  this.utils.tip('success', '删除操作已提交，请不要重复操作，稍后手动刷新列表！');
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
        let exportJson = {};
        exportJson.appId = this.PersonListForm.appId;
        exportJson.currentPage = this.PersonListForm.currentPage;
        exportJson.pageSize = this.PersonListForm.pageSize;
        exportJson.personName = this.PersonListForm.queryContent;
        exportJson.subtype = this.PersonListForm.personType;
        exportJson.groupId = this.PersonListForm.deviceGroupId;
        if (this.outChecked) {
          exportJson.withPic = 1;
        } else {
          exportJson.withPic = 0;
        }
        let ids = [];
        let all = this.$refs.tableChild.selectData;
        all.forEach((item, index) => {
          ids.push(item.personId)
        })
        exportJson.ids = ids;
        this.utils.http({
            url: "/person/personExport",
            method: "POST",
            data:exportJson
          },
          res => {
            this.isExport = false;
            this.outPop = false;
            // delete this.PersonListForm.ids; //删除ids属性  防止查询报错
            if (res.code == 200) {
              this.$alert('人员正在导出请稍后', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: 'success',
              }).then(() => {

              }).catch(() => {});
            } else {
              this.$alert('人员导出失败', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: 'error',
              }).then(() => {

              }).catch(() => {});
            }

          });
      } else if (this.tabIndex == 1) { //审核住户导出
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
            delete this.PersonListForm1.ids; //删除ids属性  防止查询报错
            if (res.code == 200) {
              this.$alert('人员正在导出请稍后', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: 'success',
              }).then(() => {

              }).catch(() => {});
            } else {
              this.$alert('人员导出失败', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: 'error',
              }).then(() => {

              }).catch(() => {});
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
      this.PersonListForm1.pageNum = val;
      this.getCheckList();
    },

    handleSizeChange2(val) {
      this.PersonListForm2.currentPage = val;
      this.getRenewalList();
    },
    handleCurrentChange2(val) {
      this.PersonListForm2.currentPage = val;
      this.getRenewalList();
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
      this.popVisible = true; //是否显示信息弹框
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

          }).catch(() => {});
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
  },
}
