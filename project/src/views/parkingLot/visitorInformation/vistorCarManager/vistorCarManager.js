import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
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
    return {
      currentPage: 1,
      popVisible: false,//是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      addTitle:'新增访客车辆',
      total: 0,
      setVisible:false,//是否显示访客新增车辆弹框
      timers:[],
      parkIds:'',
      dataForm:{
        appId:'',
        currentPage:1,
        pageSize:10,
        name:'',
        plateNo:'',
        phone:'',
        startTime:'',
        endTime:'',
        visitorStatus:'',
      },
      addTimers:[],
      setVisibleForm:{
        addTimers:[],
        parkId:'',
        name:'',
        plateNo:'',
        canTimes:'',
        phone:'',
        beginTime:'',
        endTime:'',
        remarks:'',
        permissionGroupId:'',
        delExpired:false,
      },
      rulesSetVisibleForm:{
        name:[
          { required: true, message: '请输入访客姓名', trigger: 'blur' },
        ],
        plateNo:[
          { required: true,validator:checkCarNum, trigger: 'blur' },
        ],
        canTimes:[
          { required: true, message: '请输入可进出次数', trigger: 'blur' },
        ],
        addTimers:[
          { required: true, message: '请选择时间', trigger: 'change'},
        ]
      },
      pickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
      },
      addPickerOptions:{
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
          }
      }, {
          text: '最近一个月',
          onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
          }
      }, {
          text: '最近三个月',
          onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
          }
      }]
      },
      visitorStatusList:[
        {
          name:'取消',
          id:2
        },
        {
          name:'正常',
          id:0
        },
        {
          name:'完成',
          id:1
        },
        {
          name:'过期',
          id:3
        }
      ],
      tableLabel: [
        // { label: '访客编号', param: 'name', align: 'left', sortable: true, isshow: true},
        { label: '访客姓名', param: 'name', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '车牌号码', param: 'plateNo', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '手机号码', param: 'phone', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '开始时间', param: 'beginTime', align: 'left', sortable: true, isshow: true,width:'160'},
        { label: '结束时间', param: 'endTime', align: 'left', sortable: true, isshow: true,width:'160'},
        { label: '可进出次数', param: 'canTimes', align: 'left', sortable: true, isshow: true,width:'130'},
        { label: '备注', param: 'remarks', align: 'left', sortable: true, isshow: true,width:'110'},
        { label: '状态', param: 'visitorStatus', align: 'left', sortable: true, isshow: true,width:'110',render(h) {
          if(0 == h.visitorStatus){
            return '正常'
          }else if(1 == h.visitorStatus){
            return '完成'
          }else if(2 == h.visitorStatus){
            return '取消'
          }else if(3 == h.visitorStatus){
            return '过期'
          }
        },},
        { label: '创建时间', param: 'createTime', align: 'left', sortable: true, isshow: true,width:'160'},
        { label: '同步状态', param: 'syncStatus', align: 'left', sortable: true, isshow: true,width:'110',render(h) {
          if(1 == h.syncStatus){
            return '成功'
          }else{
            return '未成功'
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
    this.setVisibleForm.parkId= this.$store.state.project.projectId;
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
    }
  },
  watch:{
    parkId(value){
      // alert(newFlag);
      this.dataForm.appId = value;
      this.setVisibleForm.parkId = value;
      this.parkIds = value;
      this.getListData();
    }
  },
  mounted() {
    let scenarioId = Cookies.get("scenarioId");
    this.dataForm.scenarioId = scenarioId;
    this.visitorVgsIdList();
    this.getListData();
    console.log('预判下个月',this.addmulMonth('2021-05-31',-1));
  },
  methods: {
    
    addmulMonth(date, monthNum){      
      let dateArr = date.split('-')
      let year = dateArr[0] //获取当前日期的年份
      let month = dateArr[1] //获取当前日期的月份
      let day = dateArr[2] //获取当前日期的日
      let days = new Date(year, month, 0)
      days = days.getDate() //获取当前日期中月的天数
      let year2 = year
      let month2 = parseInt(month) - monthNum
      if (month2 <= 0) {
        year2 =
          parseInt(year2) -
          parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
        month2 = 12 - (Math.abs(month2) % 12)
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
    
    
  





    addChangeTime(e){
      console.log(this.addTimers);
      if (this.setVisibleForm.addTimers !== null && this.setVisibleForm.addTimers.length > 0) {
        this.setVisibleForm.beginTime = this.setVisibleForm.addTimers[0];
        this.setVisibleForm.endTime = this.setVisibleForm.addTimers[1];
      } else {
        this.setVisibleForm.beginTime  = "";
        this.setVisibleForm.endTime  = "";
        this.setVisibleForm.addTimers = [];
      }
    },

    //更改时间
    changeTime(e){
      console.log(e);
      if (this.timers !== null && this.timers.length > 0) {
          this.dataForm.startTime = this.timers[0];
          this.dataForm.endTime = this.timers[1];
        } else {
          this.dataForm.startTime  = "";
          this.dataForm.endTime  = "";
          this.timers = [];
        }
    },

    //数据
    getListData() {
      this.utils.http({
        url: "/visitor/pageList",
        method: "post",
        data: this.dataForm
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
          appId:this.$store.state.project.projectId,//车场id
          currentPage:1,
          pageSize:10,
          name:'',
          plateNo:'',
          phone:'',
          startTime:'',
          endTime:'',
          visitorStatus:'',
        }
        this.timers = [];
        this.getListData();
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
        url: '/visitor/syncRetry',
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

      //关闭弹框清空数据
    closePop(){
      this.$nextTick(()=>{
        this.$refs.setVisibleForm.clearValidate()
      })
     this.addTimers = [];
     this.setVisibleForm = {
        parkId:this.$store.state.project.projectId,
        addTimers:[],
        name:'',
        plateNo:'',
        canTimes:'',
        phone:'',
        beginTime:'',
        endTime:'',
        remarks:'',
        setVisibleForm:'',
        delExpired:false,
      }
    },

    //自定义表头
    checkboxChange(e) {
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
      this.addTitle = '新增访客车辆';
      this.setVisible = true;
    },

    //跳转到编辑
    goEdit(row) {
      console.log(row);
      this.addTitle = '修改访客车辆';
      this.setVisibleForm = row;
      this.setVisibleForm.addTimers = [row.beginTime,row.endTime];
      this.setVisible=true;
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
        url: "/visitor/delete",
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

    open() {
      this.timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(this.timer)
      }, 2000)
    },
    clearSetTimeOut() {
      clearTimeout(this.timer)
    },


    //取消
    cancel(id){
      this.$confirm("您确信取消当前记录?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.utils.http({
            url: "/visitor/cancel",
            method: "get",
            params:{id:id}
          },
            res => {
              if (res.code == 200) {
                this.utils.tip('success', '取消成功');
                this.getListData();
              }
            });
        })
        .catch(() => {

        });
      
    },

    setVisibleMode(fromMsg){
      console.log(this.addTimers)
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          if(this.setVisibleForm.delExpired){
            this.setVisibleForm.delExpired = 1;
          }else{
            this.setVisibleForm.delExpired = 0;
          }
          this.utils.http({
            url: "/visitor/save",
            method: "POST",
            data: this.setVisibleForm
          },
            res => {
              this.isRequst = false;
              if (res.code == 200) {
                this.setVisible = false;
                let message = '';
                if('新增访客车辆' == this.addTitle){
                  message = '新增访客车辆成功';
                }else{
                  message = '修改访客车辆成功';
                }
                this.$message({
                  message: message,
                  type: 'success'
                });
                this.getListData();
              };

            });
        }
      })
    },

    //获取通道权限
    visitorVgsIdList(){
      this.utils.http({
        url: "/permission/group/list",
        method: "get",
        params: {parkId:this.parkIds}
      },
        res => {
          this.isRequst = false;
          if (res.code == 200) {
             if(0 < res.data.length){
               this.visitorVgsIdList = res.data;
             }else{
              this.visitorVgsIdList = [];
             }
          };

        });
    }
  },
}