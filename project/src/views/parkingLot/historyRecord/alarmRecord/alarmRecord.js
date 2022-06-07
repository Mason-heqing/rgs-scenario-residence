import MsgBox from '../../../../components/dialog.vue'
import TableCmp from '../../../../components/table.vue'
import ExportBox from '../../../../components/exportDialog.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      popVisible: true,//是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [ 
        { label: '序号', param: 'img', align: 'center', sortable: true,isshow:true,index:true},  
        // { slot: 'operate1',isshow:true,label: '抓拍照片', }, 
        {label: '报警时间', param: 'createTime', align: 'center', sortable: true ,width:'120',isshow:true},
        {label: '报警类型', param: 'alarmType', align: 'center',isshow:true ,width:'120', sortable: true,render:(row)=>{
          if(row.alarmType==0){
            return '无报警'
          }else if(row.alarmType==1){
            return '门未关'
          }else if(row.alarmType==2){
            return '非法开门'
          }else if(row.alarmType==3){
            return '设备拆除'
          }
        }},
        { label: '抓拍照片', param: 'snapUrl', align: 'center', sortable: true ,isimg:true,isshow:true,width:'120'},
        { label: '报警设备', param: 'deviceName', align: 'center',isshow:true ,width:'120', sortable: true},
        { label: '所在位置', param: 'area', align: 'center',isshow:true ,width:'120', sortable: true},
        { slot: 'operate',isshow:true }, // 操作列
      ],
      statusOptions:[{ //报警类型
        value:0,
        label:'无报警'
      },{  
        value:1,
        label:'门未关'
      },{  
        value:2,
        label:'非法开门'
      },{  
        value:3,
        label:'设备拆除'
      }],
      value: '',
      timeArr:[],
      dataForm:{
        appId:'',
        alarmType:'',//报警类型
        deviceId:'',//报警设备
        startTime:'',//开始时间
        endTime:'',//结束时间
        pageNum:1,
        pageSize:10,
      },
      isShowSelect:true,
      deviceGroup:[],//报警设备的下拉
      deviceForm:{
        appId:'',
        page:1,
        pageSize:1000,
      },
      outChecked:false,
      outPop:false,
      loading:false,
      isExport:false,//是否在请求导出
      imgurl:'',
      recordContentPop:false,
      contentMsg:{},
    }
  },

  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
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
    appId(newFlag, oldFlag){
      this.appId=newFlag;
      this.dataForm={
        appId:newFlag,
        alarmType:'',//报警类型
        deviceId:'',//报警设备
        startTime:'',//开始时间
        endTime:'',//结束时间
        pageNum:1,
        pageSize:10,
      };
      this.deviceForm.appId=newFlag;
      this.getDevice();
      this.getToDayTime();
      
    }
  },
  components: {
    MsgBox,
    TableCmp,
    ExportBox
  },
  mounted() {
    if(this.appId){
      this.dataForm.appId=this.appId;
      this.deviceForm.appId=this.appId;
      this.getDevice();
      this.getToDayTime();
    }
    
  },
  methods: {
    //默认选中当天时间段
    getToDayTime(){
      let date = new Date();
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let toDay=Y+M+D;
      this.timeArr=[toDay+'00:00:00',toDay+'23:59:59'];
      this.dataForm.startTime = this.timeArr[0];
      this.dataForm.endTime = this.timeArr[1];
      this.getTableData();
    },
    consoleSelect(){
      console.log(this.$refs.tableChild.selectData)
    },
    
    open() {
      var timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(timer)
      }, 3000)

    },
    //报警设备下拉
    getDevice(){
      this.utils.http({
        url: "/device/page",
        method: "POST",
        data: this.deviceForm
      },
      res => {
        if(res.code==200){
          this.deviceGroup=res.data.records;
        }       
      });  
    },
    //列表
    getTableData(){
      this.loading=true;
      this.utils.http({
        url: "/record/alarm/page",
        method: "POST",
        data: this.dataForm
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
    //重置
    resetBtn(){
      this.dataForm={
        appId:this.appId,
        alarmType:'',//报警类型
        deviceId:'',//报警设备
        startTime:'',//开始时间
        endTime:'',//结束时间
        pageNum:1,
        pageSize:10,
      }
      this.getToDayTime();
    },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

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
    changeTime(e){
      if (this.timeArr !== null && this.timeArr.length > 0) {
        this.dataForm.startTime = this.timeArr[0];
        this.dataForm.endTime = this.timeArr[1];
      } else {
        this.dataForm.startTime  = "";
        this.dataForm.endTime  = "";
      }
    },

    //导出按钮
    exportBtn(){
      this.outPop=true;
    },
    outBtn(){
      this.isExport=true;
      this.outChecked=this.$refs.exportData.outChecked;
        if(this.outChecked){
          this.dataForm.withPic=1;
        }else{
          this.dataForm.withPic=0;
        }
        //勾选的数据
        let ids=[];
        let all= this.$refs.tableChild.selectData;
        all.forEach((item,index)=>{
          ids.push(item.id)
        });
          this.dataForm.ids=ids;
        this.utils.http({
          url: "/record/alarm/export",
          method: "POST",
          data: this.dataForm
        },
        res => {
          this.isExport=false;
          this.outPop=false;
          delete this.dataForm.ids;//删除ids属性  防止查询报错
          if(res.code==200){
            this.$alert('记录正在导出请稍后', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'success',
            }).then(() => {
             
            }).catch(() => {});
          }else{
            this.$alert('记录导出失败', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'error',
            }).then(() => {
             
            }).catch(() => {});
          }
        });  
    },   
    //查看详情
    seeContent(row){
      this.contentMsg=row;
      this.recordContentPop=true
    }, 
  },
}