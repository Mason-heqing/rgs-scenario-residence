import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
import Cookies from 'js-cookie';
import { timers } from 'jquery';
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
      popTitle: '这个是标题',
      popContent: '这个是内容',
      popVisible:false,
      isAddBlackModel:false,
      importBlackPopVisible:false,
      currentPage: 1,
      total: 0,
      dataForm:{
        appId:'',
        currentPage:1,
        pageSize:10,
        plateNo:'',
      },
      timers:[],
      setBlackModelForm:{
        parkId:'',
        plateNo:'',
        astrictMode:'',
        validityMode:'',
        startDate:'',
        endDate:'',
        remark:'',
      },
      rulesSetBlackModelForm:{
        plateNo:[
          { required: true,validator:checkCarNum, trigger: 'blur' },
        ],
        astrictMode:[
          { required: true, message: '请选择限制方式', trigger: 'change'},
        ],
        validityMode:[
          { required: true, message: '请选择有效时间', trigger: 'change'},
        ],
        timers:[
          { required: true, message: '请选择自定义时间', trigger: 'change'},
        ]
      },
      astrictModeList:[
        {
          name:'禁止进出',
          id:2
        },
        {
          name:'可进不可出',
          id:1
        },
        {
          name:'可进可出',
          id:0
        },
      ],
      validityModeList:[
        {
          name:'长期有效',
          id:0
        },
        {
          name:'自定义日期',
          id:1
        },
      ],
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
      tableLabel: [
        { label: '车牌号码', param: 'plateNo', align: 'left', sortable: true, isshow: true,width:'50' },
        { label: '限制方式', param: 'astrictMode', align: 'left', sortable: true, isshow: true,width:'50',render(h) {
          if(0 == h.astrictMode){
             return '可进可出'
          }else if(1 == h.astrictMode){
            return '可进不可出'
          }else{
            return '禁止进出'
          }
        },},
        { label: '有效日期', param: 'updateTime', align: 'left', sortable: true, isshow: true,render(h) {
          if(0 == h.validityMode){
            return '长期有效'
          }else if(1 == h.validityMode){
            return h.startDate.slice(0,10) + ' ' + '至' + ' ' + h.endDate.slice(0,10)
          }
        },},
        { label: '限制原因', param: 'remark', align: 'left', sortable: true, isshow: true},
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
        { label: '同步状态', param: 'syncStatus', align: 'left', sortable: true, isshow: true,width:'30',render(h) {
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
      listData: [],//表格数据
      isShowSelect: true,
      loading: false,
      imgurl:'',
      xlsxurl:'',
      fileList:[],
      exportUrl:'',
      setImportBlackForm:{
        appId:'',
      }
    }
  },

  watch: {
    
  },
  filters: {

  },
  created() {
    // console.log('获取token值',Cookies.get('TOKEN'));
    this.dataForm.appId = this.$store.state.project.projectId;
    this.setBlackModelForm.parkId = this.$store.state.project.projectId;
    this.setImportBlackForm.appId = this.$store.state.project.projectId;
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
    }
  },
  watch:{
    parkId(value){
      // alert(newFlag);
      this.dataForm.appId = value;
      this.setBlackModelForm.parkId = value;
      this.getListData();
    }
  },
  mounted() {
    // let scenarioId = Cookies.get("scenarioId");
    // this.dataForm.scenarioId = scenarioId;
    if (process.env.NODE_ENV == 'development') {
      this.exportUrl = 'api/blacklist/importBlacklist';
    } else {
      this.exportUrl = this.imgurl+'/blacklist/importBlacklist';
    }
    this.getListData();
  },
  methods: {

    //更改时间
    changeTime(e){
      console.log(e);
      if (this.timers !== null && this.timers.length > 0) {
          this.setBlackModelForm.startDate = this.timers[0].replace(/-/g,"");
          this.setBlackModelForm.endDate = this.timers[1].replace(/-/g,"");
        } else {
          this.setBlackModelForm.startDate  = "";
          this.setBlackModelForm.endDate  = "";
          this.timers = [];
        }
    },

    //数据
    getListData() {
      this.utils.http({
        url: "/blacklist/pageList",
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
          appId:this.$store.state.project.projectId,
          currentPage:1,
          pageSize:10,
          plateNo:'',
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

    //添加
    goAdd() {
      this.isAddBlackModel =true;
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
        url: '/blacklist/syncRetry',
        method: "get",
        params:{id:id}
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

    //编辑
    goEdit(row) {
      this.utils.http({
        url: '/blacklist/info?id='+row.id,
        method: "GET",
        params:{}
      },
      res => {
        if(res.code==200){
          console.log(res.data)
          this.setBlackModelForm=res.data;
          if(null != res.data.startDate){
            this.timers[0] = res.data.startDate.substring(0,10);
            this.timers[1] = res.data.endDate.substring(0,10);
          }else{
            this.timers = [];
          }
         
          // if (this.timers !== null && this.timers.length > 0) {
          //   this.setBlackModelForm.startDate = this.timers[0].replace(/-/g,"");
          //   this.setBlackModelForm.endDate = this.timers[1].replace(/-/g,"");
          // } else {
          //   this.setBlackModelForm.startDate  = "";
          //   this.setBlackModelForm.endDate  = "";
          //   this.timers = [];
          // }
          this.setBlackModelForm.parkId=this.$store.state.project.projectId;
          this.isAddBlackModel=true;
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
        url: "/blacklist/delete",
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

    //关闭弹框清空数据
    closePop(){
      this.$nextTick(()=>{
        this.$refs.setBlackModelForm.clearValidate()
      })
     this.timers = [];
     this.setBlackModelForm = {
        parkId:this.$store.state.project.projectId,
        currentPage:1,
        pageSize:10,
        plateNo:'',
        startDate:'',
        endDate:'',
        remark:'',
      }
    },
   
    //新增黑名单
    setBlackModel(fromMsg){
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.utils.http({
            url: "/blacklist/save",
            method: "POST",
            data: this.setBlackModelForm
          },
            res => {
              if (res.code == 200) {
                this.isAddBlackModel =false;
                this.getListData();
              }
            });
        }
      })
      
    },

    //导出
    exportBlack(){
      if(0 === this.total){
        this.$message('当前没有数据可导出');
      }else{
        this.$confirm('确定要导出吗？', '导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
            url: "/blacklist/exportBlacklist",
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
    importBlack(){
      this.importBlackPopVisible = true;
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
    this.importBlackPopVisible=false;
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
    setRecharge(fromMsg){
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

    //上传文件
    setRecharge(){
      if(this.fileList.length>0){
        this.$refs.upload.submit();
      }else{
        this.$message.error('请选择文件');
      }
    },

  },
}