import MsgBox from '../../../components/dialog.vue'
import FromDialog from '../../../components/fromDialog.vue'
import TableCmp from '../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
    return {
      // msg: '来访记录',
      isScene:false,//场景权限
      paymentMode:[],//支付方式
      seeListCurrent:{},//查看当前列表数据
      currentPage: 1,
      popVisible: false,//是否显示信息弹框
      dialogPassExamine:false,//是否显示修改支付配置弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      timer: null,
      isdevelopment:"",//二维码下载前缀地址
      isName:'',
      isChannel:'',
      multipleSelection: [],//表格选中
      setVisible:false,//是否显示配置支付弹框
      dataForm:{
        // appId:'',
        name:'',//车场名称
        currentPage:1,
        pageSize:10,
        payStatus :'',//支付方式
        organizationId:'',//所属渠道
        // time:'',
      },
      rulesSetPaymentForm:{
        payStatus:[
          { required: true, message: '请选择线上支付', trigger: 'change' },
        ],
        paymentMode:[
          { required: true, message: '请选择支付方式', trigger: 'change' },
        ]
      },
      rulesFormExamine: {//审核表单校验
        name: [
          { required: true, message: '请输入支付渠道名称', trigger: 'blur' },
          {max: 48, message: '支付渠道名称长度不能超过48个字符', trigger: 'blur' }
        ],
        mchId: [
          { required: true, message: '请输入商户id', trigger: 'blur' },
        ],
        payChannelParkId: [
          { required: true, message: '请输入支付渠道车场Id', trigger: 'blur' },
        ],
      },
      rulesFormRefuse: {
        refuseCause: [
          { required: true, message: '请填写拒绝原因', trigger: 'blur' },
        ]
      },
      formExamine: { //修改支付配置信息
        mchId: '',//商户Id
        name: '',//支付渠道名称
        payChannelParkId: '',//
        id:''
      },
      setPaymentForm:{
        paymentMode:"",
        payStatus:"",
        paydataTime:"",
        mchId:"",
        id:"",
        payChannel:"",
      },
      payStatus:[{  
        id:0,
        name:'待开通'
      },{  
        id:1,
        name:'待审核'
      },{  
        id:2,
        name:'审核通过'
      },{
        id:3,
        name:'拒绝审核'
      },{
        id:4,
        name:'禁用'
      }],
      channel:[
        {  
            value:1,
            label:'渠道一'
          },{  
            value:2,
            label:'渠道二'
          }
      ],
      data: [],
      defaultProps: {
        children: 'userTrees',
        label: 'userName'
      },
      tableLabel: [
        { label: '车场名称', param: 'name', align: 'center', sortable: true, isshow: true},
        { label: '车场编号', param: 'id', align: 'center', sortable: true, isshow: true,width: '150' },
        { label: '地区', param: 'region', align: 'center', sortable: true, isshow: true},
        { label: '车场业态', param: 'parkType', align: 'center', sortable: true, isshow: true,render: (row) => {
          if ( 0 === row.parkType ) {
             return  '住宅' 
          } else if (1 === row.parkType) {
            return '办公'
          } else if (2 === row.parkType) {
            return '商业'
          } else if (3 === row.parkType){
            return '商住'
          }else if(5 === row.parkType){
            return '文体 '
          }else if(6 === row.parkType){
            return '专用'
          }else if(7 === row.parkType){
            return '货运 '
          }else if(8 === row.parkType){
            return '交通枢纽'
          }else if(9 === row.parkType){
            return '其它'
          }
      }},
        { label: '线上支付', param: 'payStatus', align: 'center', sortable: true, isshow: true,render(h) {
          if(0 === h.payStatus){
            return '待开通'
          }else if(1 === h.payStatus){
            return '待审核'
          }else if(2 === h.payStatus){
            return '已开通'
          }else if(3 == h.payStatus){
            return '拒绝审核'
          }else{
            return '禁用'
          }
        },},
        { slot: 'operate', isshow: true,align: 'right'}, // 操作列
      ],
      tableOption: [],
      tableSelect: [],

      leftData: [],//左边侧边栏数据
      listData: [],//表格数据
      listDataForm: {
        userId: '',
        name: '',//项目名称/回调地址
        currentPage: "1",
        pageSize: '10',
      },
      isShowSelect: true,
      loading: false,
      imgurl: '',
    }
  },

  watch: {
    colOptions(valArr) {
      var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0); // 未选中
      this.colData.filter(i => {
        if (arr.indexOf(i.title) != -1) {
          i.istrue = false;
          this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
          });
        } else {
          i.istrue = true;
          this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
          });
        }
      });
    }
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
    if (process.env.NODE_ENV == 'development') {
      this.isdevelopment = '/api' + '/park/qrCodeDownload?id=';
    } else {
      this.isdevelopment = process.env.API_HOST + '/park/qrCodeDownload?id=';//接口域名和网站域名不一致时
    }
    this.isName = "&name=";
    this.isChannel = "&channel";

    for (let i = 0; i < this.tableLabel.length; i++) {
      if (this.tableLabel[i].label) {
        this.tableOption.push(this.tableLabel[i].label)
      }
      if (this.tableLabel[i].isshow) {
        this.tableSelect.push(this.tableLabel[i].label)
      }

    }
    this.imgurl = this.tools.global.API_URL;
    this.getpayChannelListData()
  },
  components: {
    MsgBox,
    FromDialog,
    TableCmp
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
  mounted() {
    this.getListData();
  },
  methods: {
    //数据
    getListData() {
      this.utils.http({
        url: "/park/page",
        method: "GET",
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.currentPage = res.data.current;
            if(res.data.records && 0 < res.data.records.length){
              $.each(res.data.records,(index,item)=>{
                item.region = item.province + "/" + item.city
              })
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
          name:'',//车场名称
          currentPage:1,
          pageSize:10,
          payStatus :'',//支付方式
          organizationId:'',//所属渠道
        }
        this.getListData();
      },

    //自定义表头
    checkboxChange(e) {
      console.log(this.tableSelect)
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
    //跳转到添加
    goAdd() {
      this.$router.push({
        path: '/parkingmanageadd',
        query: {
          type: '1',
        }

      })
    },

    //开通支付
    goOpenPayment(data){
      this.utils.setStore('seeApply', data)
      this.$router.push({
        path: '/payment',
        query: {
          type: '1',
        }
      })
    },
    goAgainPayment(data){
      this.utils.setStore('seeApply', data)
      this.$router.push({
        path: '/payment',
        query: {
          type: '3',
        }
      })
    },
    //查看申请
    goApply(data){
        this.utils.setStore('seeApply', data)
        this.$router.push({
            path: '/payment',
            query: {
              type: '2',
            }
        })
    },
    //跳转到编辑
    goEdit(data) {
      this.utils.setStore('thisData', data)
      this.$router.push({
        path: '/parkingmanageadd',
        query: {
          type: '2',
        }
      })
    },
    //批量删除
    allDeleteData() {
      let all = this.$refs.tableChild.selectData;
      console.log(all)
      let allArr = [];
      all.forEach((item, index) => {
        allArr.push(item.id)
      })
      if (allArr.length == 0) {
        this.popVisible = true;//是否显示信息弹框
        this.popTitle = '提示';
        this.popContent = '请先选择要删除的记录';
        this.open()
      } else {
        this.$confirm("您确信删除选中的" + allArr.length + "条记录?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deleteRequst(allArr)
          })
          .catch(() => {

          });
      }

    },
    // 删除
    deleteData(id) {
      var arr = [id];
      this.$confirm("您确信删除当前记录?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequst(arr)
        })
        .catch(() => {

        });
    },
    //删除接口
    deleteRequst(arr) {
      this.utils.http({
        url: "/park/deletePark",
        method: "POST",
        data: arr
      },
        res => {
          if (res.code == 200) {
            this.utils.tip('success', '删除成功');
            // this.$router.go(0);
            this.getListData();
          }

        });
    },

    //待开通查看信息
    seeDataWaiting(data){
      this.utils.setStore('seeApply', data)
      this.$router.push({
          path: '/payment',
          query: {
            type: '1',
          }
      })
    },

    //查看信息
    seeData(data){
      this.utils.setStore('seeApply', data)
      this.$router.push({
          path: '/payment',
          query: {
            type: '2',
          }
      })
    },

    //配置支付
    setPayment(data){
      this.seeListCurrent = data;
      this.setVisible = true;
      this.getPaymentMode(data)

    },
    
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //查看申请信息
    seePlayApply(){
      this.utils.setStore('seeApply', this.seeListCurrent)
      this.$router.push({
          path: '/payment',
          query: {
            type: '2',
          }
      })
    },

    //获取支付渠道
    getpayChannelListData(){
      this.utils.http({
        url: "/park/organizationList",
        method: "GET",
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
    
    //获取支付方式
    getPaymentMode(datas){
      this.utils.http({
        url: "/park/parkPayChannelList",
        method: "GET",
        params: {parkId:datas.id}
      },
      res => {
        if(res.code==200){
          this.realTimeList=res.data;
          if(0 < res.data.length){
            $.each(res.data,function(index,item){
               item.ids = index;
            }) 
            this.paymentMode = res.data
            $.each(this.paymentMode,(index,item)=>{
              if(datas.currPayChannelId == item.id){
                this.setPaymentForm.paymentMode = item.name;
                this.setPaymentForm.payStatus = item.status.toString();
                this.setPaymentForm.paydataTime = item.checkPassDate;
                this.setPaymentForm.mchId = JSON.parse(item.content).mchId;
                this.setPaymentForm.payChannel = item.name;
                this.setPaymentForm.id = item.id;
              }
            })
          }
        }
        
      });  
    },
    //切换支付方式
    settlementTypeChange(e){
      console.log(e)
      this.setPaymentForm.paydataTime = this.paymentMode[e].checkPassDate;
      this.setPaymentForm.payChannel = this.paymentMode[e].name;
      this.setPaymentForm.id = this.paymentMode[e].id;
    },

    //配置支付方式
    setPayMode(fromMsg){
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.utils.http({
            url: "/park/changePayChannel",
            method: "POST",
            data:{parkPayChannelId:this.setPaymentForm.id,status:this.setPaymentForm.payStatus}
          },
          res => {
            if(res.code==200){
              this.$message({
                showClose: true,
                message: '设置成功！',
                type: 'success'
              });
              this.setVisible = false;
              this.getListData();
            };
            
          });  
        }
      })
    },

    //弹出支付修改配置弹框信息
    modifyConfiguration(row){
      this.parkCurrPayChannel(row.currPayChannelId)
      this.dialogPassExamine = true;
      
    },

    //获取当前支付渠道
    parkCurrPayChannel(parkIds){
      this.utils.http({
        url: "/parkPay/info",
        method: "GET",
        // params: {appId:this.appId}
        params: { id:parkIds}
      },
        res => {
          if (res.code == 200 && res.data) {
            let formInfo = JSON.parse(res.data.content)
            this.formExamine.name = formInfo.name;
            this.formExamine.mchId = formInfo.mchId;
            this.formExamine.payChannelParkId = formInfo.payChannelParkId;
            this.formExamine.id = parkIds
          }

        });
    },

    //修改配置支付
    passCheckPayData(fromMsg){
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.isRequst = true;
          this.utils.http({
            url: "/parkPay/updatePayInfo",
            method: "POST",
            data: this.formExamine
          },
            res => {
              this.isRequst = false;
              if (res.code == 200) {
                this.dialogPassExamine = false;
                this.$message({
                  message: '修改配置支付成功',
                  type: 'success'
                });
                this.getListData();
                // this.$router.push({
                //   path: '/parkManager',
                // })
              };

            });
        }
      })
    }
  },
}