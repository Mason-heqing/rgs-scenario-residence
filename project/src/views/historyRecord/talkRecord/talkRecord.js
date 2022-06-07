import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import ExportBox from '../../../components/exportDialog.vue'
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
        { label: '抓拍照片', param: 'pictureUrl', align: 'center', sortable: true ,isimg:true,isshow:true,width:'120'},
        { label: '呼叫设备', param: 'deviceName', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: '呼叫户室', param: 'houseName', align: 'center',isshow:true,width:'120',sortable: true },
        { label: '发起时间', param: 'callStartTime', align: 'center', sortable: true ,isshow:true,width:'150'},
        { label: '接通状态', param: 'callType', align: 'center',isshow:true,width:'120',sortable: true ,render: (row) => {
          if (row.callType==1) {
            return 'app接通'
          } else if (row.callType==0) {
            return '未接通'
          }else if(row.callType==2){
            return '落地电话'
          } 
        }},
        { label: '开门状态', param: 'openStatus', align: 'center',isshow:true,width:'120',sortable: true ,render: (row) => {
          if (row.openStatus==0) {
            return '未开门'
          } else if (row.openStatus==1) {
            return '开门成功'
          }else if (row.openStatus==2) {
            return '开门失败'
          }  
        }},  
      ],
      throughStatusOption: [
        {
          value: 2,
          label: '落地电话'
        },
        {
        value: 1,
        label: 'app接通'
      },{
        value: 0,
        label: '未接通'
      }],
      openStatusOption: [{
        value: 0,
        label: '未开门'
      },{
        value: 1,
        label: '开门成功'
      },{
        value: 2,
        label: '开门失败'
      }],
      value: '',
      timeArr:[],
      isShowSelect:true,
      dataForm:{
        appId:'',
        throughStatus:'',//是否接通
        houseId:'',//呼叫户室
        deviceId:'',//呼叫设备
        openStatus:null,//是否开门
        startTime:'',//开始时间
        endTime:'',//结束时间
        pageNum:1,
        pageSize:10,
      },
      deviceForm:{
        appId:'',
        page:1,
        pageSize:1000,
      },
      deviceGroup:[],
      contentMsg:{},//查看记录详情信息
      recordContentPop:false,//记录详情弹框
      imgurl:'',
      outChecked:false,
      outPop:false,
      isExport:false,//是否在请求导出
      cascaderKey:1,
      cascaderData:[],
      groupProps: {
        children:'groups',
        label:'name',
        value:'id',
        checkStrictly:true,
        expandTrigger: 'hover'
      },
    }
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
        throughStatus:'',//是否接通
        houseId:'',//呼叫户室
        deviceId:'',//呼叫设备
        openStatus:null,//是否开门
        startTime:'',//开始时间
        endTime:'',//结束时间
        pageNum:1,
        pageSize:10,
      };
      ++this.cascaderKey;
      this.deviceForm.appId=newFlag;
      this.getDevice();
      this.getLeftData();
      this.getToDayTime();
    }
  },
  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
  },
  components: {
    MsgBox,
    TableCmp,
    ExportBox
  },
  mounted() {
    if(this.appId){
      this.deviceForm.appId=this.appId;
      this.dataForm.appId=this.appId;
      this.getDevice();
     
      this.getLeftData();
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
    cascaderChange(e){
      if(e){
        this.dataForm.houseId=e[e.length-1]
      }
    },
    //获取房屋下拉
    getLeftData(){        
      this.utils.http({
        url: "/base/house/list",
        method: "GET",
        params: {appId:this.appId}
      },
      res => {
        if(res.code==200&&res.data){
          this.cascaderData=res.data.groups;
        }      
      });  
    },
    //识别设备下拉
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
      // this.dataForm.appId='2e74ef743548421abb72acd4b82e649d'
      this.utils.http({
        url: "/record/intercom/pageAll",
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
        throughStatus:'',//是否接通
        houseId:'',//呼叫户室
        deviceId:'',//呼叫设备
        openStatus:null,//是否开门
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
          url: "/record/intercom/export",
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
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'success',
            }).then(() => {
             
            }).catch(() => {});
          }else{
            this.$alert('记录导出失败', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
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