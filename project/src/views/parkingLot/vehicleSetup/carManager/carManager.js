import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
    let checkInterNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入充值金额'))
      } else if (0 < value) {
        callback()
      } else {
        callback(new Error('充值金额不能为0'))
      }
    }
    let checkCarNum = (rule, value, callback) => {
          let xreg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
      
          let creg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
      
          if(value === ''){
            callback(new Error('车牌号不能为空'))
          } else if((value.length == 7 && creg.test(value)) || (value.length == 8 && xreg.test(value))){
            callback()
          } else{
              callback(new Error('请输入正确的车牌号'))
      
          }
      
     }
    let phone = (rule, value, callback) =>{
      let reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if(value === ''){
        callback(new Error('手机号码不能为空'))
      } else if(reg.test(value)){
        callback()
      } else{
          callback(new Error('请输入正确的手机号'))
  
      }
    } 
    return {
      currentPage: 1,
      total: 0,
      flag:0,//标记对车辆信息是新增还是修改 0:新增 1:修改
      parkIds:'',
      popTitle: '这个是标题',
      popContent: '这个是内容',
      popVisible: false,//是否显示信息弹框
      isAddCarModel:false,//是否显示新增车辆弹框
      rechargePopVisible:false,//是否显示储值充值弹框
      importCarPopVisible:false,//是否显示导入车辆弹框
      isSelectCar:false,
      beginDateReadonly:true,//是否可修改开始时间
      rulesSetCarModelForm:{
        carTypeInfoId:[
          { required: true, message: '请选择车类', trigger: 'change' },
        ],
        carModelInfoId:[
          { required: true, message: '请选择车型', trigger: 'change' },
        ],
        plateNo:[
          { required: true,validator:checkCarNum, trigger: 'blur' },
        ],
        phone:[
          { required: true,validator:phone, trigger: 'blur' },
        ]
      },
      rulesSetRechargeForm:{
        rechargeMoney:[
          { required: true,validator: checkInterNum,trigger: 'blur' },
        ]
      },
      setCarModelForm:{
        parkId:'',
        id:'',
        carTypeInfoId:"",
        carModelInfoId:"",
        plateNo:"",
        vehicleColor:"",
        staffName:"",
        phone:"",
        idNum:"",
        remark:"",
        permissionGroupId:'',
      },
      visitorVgsIdList:[],
      addCarTypeList:[],
      addCarModel:[],
      dataForm:{
        appId:'',
        currentPage:1,
        pageSize:10,
        name:'',
        plateNo:'',
        carPlaceName:'',
        carTypeInfoId:'',
        carModelInfoId:'',
        carStatus:'',
      },
      carTypeList:[],
      carModel:[],
      carStatusList:[
        {
          name:'停用',
          id:0
        },
        {
          name:'正常',
          id:1
        }
      ],
      tableLabel: [
        { label: '车牌号码', param: 'plateNo', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '车主姓名', param: 'staffName', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '车主电话', param: 'phone', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '地址', param: 'address', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '车类', param: 'carTypeInfoName', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '车型', param: 'carModelInfoName', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '车状态', param: 'carStatus', align: 'left', sortable: true, isshow: true,width:'110',render(h) {
          if(0 == h.carStatus){
             return '停用'
          }else{
            return '正常'
          }
        },},
        { label: '开始有效时间', param: 'beginDate', align: 'left', sortable: true, isshow: true,width:'130',render(h) {
          if(null != h.beginDate){
              return h.beginDate.substring(0,10);
          }
        },},
        { label: '结束有效时间', param: 'endDate', align: 'left', sortable: true, isshow: true,width:'130',render(h) {
          if(null != h.endDate){
            return h.endDate.substring(0,10);
        }
        },},
        { label: '车位组', param: 'carPlaceName', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '余额', param: 'balance', align: 'left', sortable: true, isshow: true},
        { label: '同步状态', param: 'syncStatus', align: 'left', sortable: true, isshow: true,width:'110',render(h) {
          if(0 == h.syncStatus){
            return '未成功'
          }else{
            return '已成功'
          }
        },},
        // { label: '线上支付', param: 'payStatus', align: 'left', sortable: true, isshow: true,render(h) {
        //   if(0 === h.payStatus){
        //     return '待开通'
        //   }else if(1 === h.payStatus){
        //     return '待审核'
        //   }else if(2 === h.payStatus){
        //     return '已开通'
        //   }else if(3 == h.payStatus){
        //     return '拒绝审核'
        //   }else{
        //     return '禁用'
        //   }
        // },},
        { slot: 'operate', isshow: true,align: 'right'}, // 操作列
      ],
      tableOption: [],
      tableSelect: [],
      listData: [],//表格数据
      isShowSelect: true,
      loading: false,
      imgurl:'',
      xlsxurl:'',
      selectData:[],
      setRechargeForm:{
        id:"",
        rechargePlateNo:'',//充值车牌号
        rechargeName:'',//充值人员
        rechargeBefore:0,//充值前金额
        rechargeMoney:0,//充值金额
        rechargeAfter:0,//充值后金额
      },
      rulesSetImportCarForm:{
        carTypeInfoId:[
          { required: true, message: '请选择车类', trigger: 'change' },
        ],
        carModelInfoId:[
          { required: true, message: '请选择车型', trigger: 'change' },
        ]
      },
      importCarTypeList:[],
      importCarModel:[],
      setImportCarForm:{
        appId:'',
        carTypeInfoId:'',
        carModelInfoId:'',
      },
      fileList:[],
      files:null,
      // uploadData:{//上传额外参数appid
      //   appId:''
      // },
      exportErrList:[],//导入失败的数据
      exporterrPop:false,
      exportUrl:'',
      renewPopVisible:false,
      carPlaceName:'',
      carPlaceNum:'',
      oldEffectiveTime:'',
      rulesSetsetRenewFormForm:{
        monthCount:[
          { required: true, message: '请选择续费月份', trigger: 'change' },
        ],
        beginDate:[
          { required: true, message: '请选择新有效开始时间', trigger: 'change' },
        ],
        endDate:[
          { required: true, message: '请选择新有效结束时间', trigger: 'change' },
        ],
        fee:[
          { required: true, message: '请输入续费总金额', trigger: 'change' },
        ]
      },
      setRenewForm:{
        monthCount:1,
        beginDate:'',
        endDate:'',
        fee:'',
        id:'',
      },
      RenewalMonthList:[
        {
          value:'一个月',
          id:1,
        },
        {
          value:'二个月',
          id:2,
        },
        {
          value:'三个月',
          id:3,
        },
        {
          value:'四个月',
          id:4,
        },
        {
          value:'五个月',
          id:5,
        },
        {
          value:'六个月',
          id:6,
        },
        {
          value:'七个月',
          id:7,
        },
        {
          value:'八个月',
          id:8,
        },
        {
          value:'九个月',
          id:9,
        },
        {
          value:'十个月',
          id:10,
        },
        {
          value:'十一个月',
          id:11,
        },
        {
          value:'十二个月',
          id:12,
        },
      ],
      unitRenewal:0,
      pickerOptionsEnd:{
        disabledDate:(time)=> {
          return time.getTime() < new Date().getTime()-24*60*60*1000;
        }
      },
      changeBeginDate:null,
      changeEndDate:null,
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
    this.dataForm.appId = this.$store.state.project.projectId;
    this.parkIds = this.$store.state.project.projectId;
    this.setCarModelForm.parkId = this.$store.state.project.projectId;
    this.imgurl = this.tools.global.API_URL.replace('7010', '7009');
    this.xlsxurl = this.tools.global.API_URL.replace('7009', '7010');
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
    },
    // rechargeAfter(){
    //   return parseInt(this.rechargeBefore) + parseInt(this.rechargeMoney);
    // }
  },
  watch:{
    parkId(value){
      // alert(newFlag);
      this.dataForm.appId = value;
      this.parkIds = value;
      this.setImportCarForm.appId=value;
      this.getCarTypeList();
      this.getCarModelList();
      this.getListData();
    },
    // isAddCarModel: function (val,oldVla) {
    //    console.log(this.$refs['setCarModelForm']);
    //   if (this.$refs['setCarModelForm'] != undefined) {
    //     this.$refs["setCarModelForm"].resetFields();
    //   }
    // }
  },
  mounted() {
    // let scenarioId = Cookies.get("scenarioId");
    // this.dataForm.scenarioId = scenarioId;
    if (process.env.NODE_ENV == 'development') {
      this.exportUrl = 'api/carInfo/importCar';
    } else {
      this.exportUrl = this.imgurl+'/carInfo/importCar';
    }
    this.setImportCarForm.appId=this.parkIds;
    this.getCarTypeList();
    this.getCarModelList();
    this.getListData();
    this.visitorVgsIdLists();
    // alert(this.addmulMonth('2021-07-31',9));
    // alert(Math.abs(17) % 12)
  },
  methods: {

    //获取前几个月的日期,负数为后几个月对应的日期
    addmulMonth(date, monthNum){      
      let dateArr = date.split('-')
      let year = dateArr[0] //获取当前日期的年份
      let month = dateArr[1] //获取当前日期的月份
      let day = dateArr[2] //获取当前日期的日
      let days = new Date(year, month, 0)
      days = days.getDate() //获取当前日期中月的天数
      let year2 = year
      let month2 = parseInt(month) + monthNum
      if (month2 > 12) {
        year2 =
          parseInt(year2) +
          parseInt(month2 / 12 >= 1 ? 1 :0)

        month2 = (Math.abs(month2) % 12)
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      let t2 = year2 + '-' + month2 + '-' + day2
      return t2

    },


    rechargeKeyup(){
      if(0 == this.setRechargeForm.rechargeMoney){
        this.setRechargeForm.rechargeAfter = 0;
      }else{
        this.setRechargeForm.rechargeAfter = parseInt(this.setRechargeForm.rechargeBefore) + parseInt(this.setRechargeForm.rechargeMoney);
      }
    },

     //获取车类数据
   getCarTypeList(){
    this.utils.http({
      url: "/monthly/car/charge/info/list",
      method: "get",
      params: {'parkId':this.parkIds}
    },
      res => {
        if (res.code == 200) {
          if(res.data && 0 < res.data.length){
            this.carTypeList = res.data;
            this.addCarTypeList = res.data;
            this.importCarTypeList = res.data;
          }else{
            this.carTypeList = [];
            this.addCarTypeList = [];
          }
        }
      });
   },

   //获取车型数据
   getCarModelList(){
    this.utils.http({
      url: "/car/model/info/list",
      method: "get",
      params: {'parkId':this.parkIds}
    },
      res => {
        if (res.code == 200) {
          if(res.data && 0 < res.data.length){
            this.carModel = res.data;
            this.addCarModel = res.data;
            this.importCarModel = res.data;
          }else{
            this.carModel = [];
            this.addCarModel = [];
          }
        }
      });
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

   //删除接口
   deleteRequst(arr) {
    this.utils.http({
      url: "/carInfo/delete",
      method: "POST",
      data: arr
    },
      res => {
        if (res.code == 200) {
          this.utils.tip('success', '删除成功');
          this.getListData();
        }

      });
  },

  //续费
  renew(row){
    console.log(row);
    if(0 == row.carStatus){
      this.$alert('车辆已停用，请启用后再操作！', '提示', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        closeOnClickModal:true,
        type:'info',
      }).then(() => {
       
      }).catch(() => {});
    }else{
      //  this.carPlaceName = row.carPlaceName;  
      if(1 == row.syncStatus){
        this.freeByCarType(row.id);
        this.setRenewForm.id = row.id
        this.renewPopVisible = true;
      }else{
        this.$message({
          message: '车辆信息未跟车场同步成功，暂不支持续费!',
          type: 'warning'
        });
      }
      
    }
  },


  //查询续费金额
  freeByCarType(id){
    this.utils.http({
      url: "/carInfo/info",
      method: "GET",
      params:{id:id}
    },
    res => {
      if(res.code==200){
        if(null != res.data){
           this.carPlaceName = res.data.carPlaceName;
           this.carPlaceNum = res.data.placeCount;
           if(null != res.data.endDate){
            this.oldEffectiveTime = res.data.endDate.substring(0,10);
            this.changeBeginDate = res.data.beginDate.substring(0,10);
            this.changeEndDate = res.data.endDate.substring(0,10);
           }else{
            this.changeBeginDate = null;
            this.changeEndDate = null;
           }
           let myDate = new Date();
           let currentData = '';
           let oldDataEnd = new Date(res.data.endDate).getTime();
           let currentDatas = myDate.toLocaleDateString().replace(/\//g, '-');
           let newData = new Date(currentDatas).getTime();
           if(null != res.data.endDate){
             if(oldDataEnd < newData){
              this.beginDateReadonly = false;
              this.setRenewForm.beginDate = res.data.endDate.substring(0,10);
              currentData = res.data.endDate.substring(0,10).replace(/-/g, '/');
              this.setRenewForm.monthCount =1
             }else{
              // this.$refs.setImportCarForm.clearValidate()
              this.beginDateReadonly = true; 
              this.setRenewForm.beginDate = res.data.beginDate.substring(0,10);
              currentData = res.data.beginDate.substring(0,10).replace(/-/g, '/');
              let beginDataArr = res.data.beginDate.split('-');
              let endDataArr = res.data.endDate.split('-');
              console.log(beginDataArr,endDataArr);
              // this.setRenewForm.monthCount = (parseInt(endDataArr[0])-parseInt(beginDataArr[0]))+(parseInt(endDataArr[1])-parseInt(beginDataArr[1]));
              this.setRenewForm.monthCount =  '';
             }
           }else{
            this.setRenewForm.beginDate = myDate.toLocaleDateString().replace(/\//g, '-');
            currentData = myDate.toLocaleDateString();
            this.setRenewForm.monthCount =1
            this.beginDateReadonly = false;
            this.oldEffectiveTime = '';
           }
           let year = parseInt(currentData.split('/')[0]);
           let month = parseInt(currentData.split('/')[1]);
           let day = parseInt(currentData.split('/')[2]);
           let afterMonth = null;
           if('' != this.setRenewForm.monthCount){
            afterMonth = parseInt(this.setRenewForm.monthCount) + month;
           }else{
            afterMonth = month
           }
           if(null != oldDataEnd){
              if(oldDataEnd < newData){
                if(12 < afterMonth){
                  this.setRenewForm.endDate = (year+1) + '-' + (afterMonth-12) + '-' + day;
                }else{
                  this.setRenewForm.endDate = year + '-' + afterMonth + '-' + day;
                }
            }else{
              this.setRenewForm.endDate = res.data.endDate.substring(0,10);
            }
           }else{
            this.setRenewForm.endDate = res.data.endDate.substring(0,10);
           }
           this.unitRenewal = res.data.fee;
           if('' != this.setRenewForm.monthCount){
            this.setRenewForm.fee = res.data.fee*parseInt(this.setRenewForm.monthCount);
           }else{
            this.setRenewForm.fee = 0
           }
           
        }
      };
      
    }); 
  },

  //充值
  recharge(row){
     console.log(row);
     this.setRechargeForm.id = row.id
     this.setRechargeForm.rechargePlateNo = row.plateNo;//充值车牌号
     this.setRechargeForm.rechargeName = row.staffName;//充值人员
     this.setRechargeForm.rechargeBefore = row.balance;//充值前金额
    //  this.rechargeMoney = 0,//充值金额
     this.setRechargeForm.rechargeAfter = row.balance;//充值后金额
     this.rechargePopVisible = true;
  },

  
  //缴费月份更改
  RenewalMonthChange(e){
    // let myDate = new Date();
    // // this.changeBeginDate = res.data.beginDate.substring(0,10);
    // //         this.changeEndDate = res.data.endDate.substring(0,10);
    // let oldDataEnd = null;
    // if(null != this.changeBeginDate){
    //   // oldDataEnd = new Date(this.setRenewForm.endDate).getTime();
    //   oldDataEnd = this.changeEndDate;
    // }else{
    //   oldDataEnd = myDate.toLocaleDateString().replace(/\//g, '-');
    // }
    // let currentDatas = myDate.toLocaleDateString().replace(/\//g, '-');
    // let newData = new Date(currentDatas).getTime();
    
    // if(oldDataEnd < newData){
    //   if(null != this.changeBeginDate){
    //     currentData = this.changeBeginDate;
    //   }else{
    //     currentData = myDate.toLocaleDateString().replace(/\//g, '-');
    //   }
    // }else{
    //   if(null != this.changeEndDate){
    //     currentData = this.changeEndDate;
    //   }else{
    //     currentData = myDate.toLocaleDateString().replace(/\//g, '-');
    //   }
    // }
    //  let year = parseInt(currentData.split('-')[0]);
    //  let month = parseInt(currentData.split('-')[1]);
    //  let day = parseInt(currentData.split('-')[2]);
    //  let afterMonth = month + parseInt(e);
    let currentData = this.setRenewForm.beginDate;
    if('' == this.oldEffectiveTime || null == this.oldEffectiveTime){
      if('' == currentData || null == currentData){
        this.$message({
          message: '请先选择新有效开始时间',
          type: 'warning'
        });
       }else{
         this.setRenewForm.endDate = this.addmulMonth(currentData,parseInt(e))
          // if(12 < afterMonth){
          //   this.setRenewForm.endDate = (year+1) + '-' + (afterMonth-12) + '-' + day;
          // }else{
          //     this.setRenewForm.endDate = year + '-' + afterMonth + '-' + day;
          // }
           
          
       }
    }else{
      this.setRenewForm.endDate = this.addmulMonth(this.oldEffectiveTime,parseInt(e))
      
    }
    if('' != e){
      this.setRenewForm.fee = parseInt(this.unitRenewal)*parseInt(e);
    }else{
      this.setRenewForm.fee = 0;
    } 
    
    // alert(currentData);
     
     
  },  
 

  beginDateChange(e){  
    //  let startData = this.setRenewForm.beginDate.split('-');
    //  let year =parseInt( startData[0]);
    //  let month = parseInt(startData[1]);
    //  let day = parseInt(startData[2]);
    //  let monthCount = parseInt(this.setRenewForm.monthCount);
    //  let afterMonth = month + monthCount;
    //  if(12 < afterMonth){
    //   this.setRenewForm.endDate = (year+1) + '-' + (afterMonth-12) + '-' + day;
    //  }else{
    //   this.setRenewForm.endDate = year + '-' + afterMonth + '-' + day;
    //  }
    this.setRenewForm.endDate = this.addmulMonth(e,parseInt(this.setRenewForm.monthCount))
  },


  closePopRecharge(){
    this.$nextTick(()=>{
      this.$refs.setRechargeForm.clearValidate()
    })
    this.setRechargeForm={
      id:'',
      rechargePlateNo:'',//充值车牌号
      rechargeName:'',//充值人员
      rechargeBefore:0,//充值前金额
      rechargeMoney:0,//充值金额
      rechargeAfter:0,//充值后金额
    }
  },

  setRecharge(fromMsg){
    this.$refs[fromMsg].validate((valid) => {
      if(valid){
        this.utils.http({
          url: "/carInfo/recharge",
          method: "POST",
          data:{id:this.setRechargeForm.id,balance:this.setRechargeForm.rechargeMoney}
        },
        res => {
          if(res.code==200){
            let title = '';
            this.$message({
              showClose: true,
              message: '充值成功',
              type: 'success'
            });
            this.rechargePopVisible = false;
            this.setRechargeForm={
              id:'',
              rechargePlateNo:'',//充值车牌号
              rechargeName:'',//充值人员
              rechargeBefore:0,//充值前金额
              rechargeMoney:0,//充值金额
              rechargeAfter:0,//充值后金额
            }
            this.getListData();
          };
          
        }); 
      }
    })
  },

  //同步重试
  goRetry(id){
    this.$alert('确定要同步重试吗', '提示', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      closeOnClickModal:true,
      type:'info',
    }).then(() => {
      this.utils.http({
        url: '/carInfo/syncRetry',
        method: "get",
        params:{parkId:this.parkIds,id:id}
      },
      res => {
        if(res.code==200){
          this.$message({
            message:'同步重试成功!',
            type: 'success'
          });
          this.getListData();
        }        
      })
    }).catch(() => {});
    
  },
  
  //启用
  enable(id){
    this.$alert('确定要启用吗', '提示', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      closeOnClickModal:true,
      type:'info',
    }).then(() => {
      this.utils.http({
      
        url: '/carInfo/save',
        method: "POST",
        data:{parkId:this.parkIds,id:id,carStatus:1}
      },
      res => {
        if(res.code==200){
          this.getListData();
        }        
      })
    }).catch(() => {});
    
  },
  
  //停用
  noEnable(id){
    this.$alert('确定要停用吗', '提示', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      closeOnClickModal:true,
      type:'info',
    }).then(() => {
      this.utils.http({
        url: '/carInfo/save',
        method: "POST",
        data:{parkId:this.parkIds,id:id,carStatus:0}
      },
      res => {
        if(res.code==200){
          this.getListData();
        }        
      })
    }).catch(() => {});
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

    //数据
    getListData() {
      this.utils.http({
        url: "/carInfo/pageList",
        method: "GET",
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.currentPage = res.data.current;
            if(res.data.records && 0 < res.data.records.length){
              // $.each(res.data.records,(index,item)=>{
              //   item.region = item.province + "/" + item.city
              // })
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
          appId:this.$store.state.project.projectId,//车场id
          currentPage:1,
          pageSize:10,
          name:'',
          plateNo:'',
          carPlaceName:'',
          carTypeInfoId:'',
          carModelInfoId:'',
          carStatus:'',
        }
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
    exportCar(){
      if(0 === this.total){
        this.$message('当前没有数据可导出');
      }else{
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
            url: "/carInfo/exportCar",
            method: "get",
            params: this.dataForm
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

    //导入
    importCar(){
      this.importCarPopVisible = true;
    },

    //新增车辆
    addCarM() {
      this.flag = 0;
      this.isSelectCar = false;
      this.isAddCarModel = true;
    },

    //修改车辆信息
  goEdit(e){
    this.flag = 1;
    this.isSelectCar = true;
    this.utils.http({
      url: '/carInfo/info?id='+e.id,
      method: "GET",
      params:{}
    },
    res => {
      if(res.code==200){
        this.setCarModelForm=res.data;
        this.setCarModelForm.parkId=this.parkIds;
        this.isAddCarModel=true;
      }        
    })
  },

    //关闭弹框清空数据
    closePop(){
      this.$nextTick(()=>{
        this.$refs.setCarModelForm.clearValidate()
      })
     this.setCarModelForm = {
        parkId:this.$store.state.project.projectId,
        id:"",
        carTypeInfoId:"",
        plateNo:"",
        vehicleColor:"",
        staffName:"",
        phone:"",
        idNum:"",
        remark:"",
      }
    },

    //关闭导入弹框
    closePopImport(){
      // this.$nextTick(()=>{
      //   this.$refs.setImportCarForm.clearValidate()
      // })
      // this.setImportCarForm = {
      //   appId:this.$store.state.project.projectId,
      //   carTypeInfoId:'',
      //   carModelInfoId:'',
      // }
      // this.fileList = [];
    },

    //提交车辆信息
    setCarModel(fromMsg){
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.utils.http({
            url: "/carInfo/save",
            method: "POST",
            data:this.setCarModelForm
          },
          res => {
            if(res.code==200){
              let title = '';
              if(0 == this.flag){
                title = '新增车辆成功！';
              }else{
                title = '修改车辆成功！';
              }
              this.$message({
                showClose: true,
                message: title,
                type: 'success'
              });
              this.isAddCarModel = false;
              this.setCarModelForm = {
                parkId:this.$store.state.project.projectId,
                id:'',
                carTypeInfoId:"",
                carModelInfoId:"",
                plateNo:"",
                vehicleColor:"",
                staffName:"",
                phone:"",
                idNum:"",
                remark:""
              }
              this.getListData();
            };
            
          }); 
        }
      })
    },

    //文件选择变化
    selectChange(file,fileList){  
      console.log(file);  
      var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
      let types = ['xlsx'];
      const isXlsx = types.includes(fileType);
      if (!isXlsx) {
        this.$message.error('只支持.xlsx压缩文件');
        this.fileList=[];
        return false
      }
      this.fileList=fileList;
    },

     //上传之前
     beforeAvatarUpload(file,fileList){
    var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
    let types = ['xlsx'];
    const isXlsx = types.includes(fileType);
    const isLtSize = file.size / 1024 / 1024 < 128;
    if (!isXlsx) {
      this.$message.error('只支持.xlsx压缩文件');
      return false
    }
    if (!isLtSize) {
      this.$message.error('文件大小不能超过 128MB!');
      return false
    }
    //提示弹框
    this.importCarPopVisible=false;
    this.popVisible=true;//是否显示信息弹框
    this.popTitle='提示';
    this.popContent='人员正在导入请稍后';
     },
    //上传成功
    successCheck(response, file, fileList) {
      console.log('上传成功');
      console.log(response);
      if (response.code == 200) {
        this.$refs.upload.clearFiles()
        this.popVisible=false;
        this.$alert('导入成功', '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          closeOnClickModal:true,
          type:'success',
        }).then(() => {
        
        }).catch(() => {});
          
      }else{
        this.$message.error(response.msg);
      }   
    },

    //上传文件
    setRechargeImport(fromMsg){
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          if(this.fileList.length>0){
            this.$refs.upload.submit();
          }else{
            this.$message.error('请选择文件');
          }
        }
      })
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

    //获取通道权限
    visitorVgsIdLists(){
      this.utils.http({
        url: "/permission/group/list",
        method: "get",
        params: {parkId:this.parkIds}
      },
        res => {
          if (res.code == 200) {
             if(0 < res.data.length){
               this.visitorVgsIdList = res.data;
             }else{
              this.visitorVgsIdList = [];
             }
          };

        });
    },

    //缴费金额设置
    setRechargeRenewal(fromMsg){
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.utils.http({
            url: "/carInfo/renewal",
            method: "post",
            data: this.setRenewForm
          },
            res => {
              if (res.code == 200) {
                this.renewPopVisible = false;
                this.getListData();
              };
    
            });
        }
      })
    },

    //关闭约租车续费弹框
    closePopRenew(){
       this.setRenewForm={
          monthCount:1,
          beginDate:'',
          endDate:'',
          fee:'',
          id:'',
      };
    }
    
  },
}
