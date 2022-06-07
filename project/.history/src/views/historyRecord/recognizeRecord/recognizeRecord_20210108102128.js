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
        { slot: 'operate1',isshow:true,label: '抓拍照片', }, 
        // { label: '抓拍照片', param: 'snapPic', align: 'center', sortable: true ,isimg:true,isshow:true,width:'120'},
        { slot: 'operate2',isshow:true,label: '对比照片', }, 
        // { label: '对比照片', param: 'comparePic', align: 'center', sortable: true ,isimg:true,isshow:true,width:'120'},
        { label: '姓名', param: 'personName', align: 'center', sortable: true ,isshow:true},
        { label: '人员类型', param: 'personType', align: 'center',isshow:true,width:'120',sortable: true ,render: (row) => {
            if (row.personType ==1) {//白名单    
              if(row.subType==1){
                return '住户人员'
              }else if(row.subType==2){
                return '物业员工'
              }else if(row.subType==3){
                return '物业员系统管理员工'
              }
            } else if (row.personType ==2) {
              return '黑名单'
            } else if (row.personType ==3) {
              return '访客'
            } else if (row.personType ==4){
              return '陌生人'
            }
        }},
        { label: '识别方式', param: 'passMode', align: 'center',  sortable: true,width:'120',isshow:true ,render: (row) => {
          if (row.passMode ==0) {
            return '刷脸开门'
          } else if (row.passMode ==2) {
            return '刷卡开门'
          } else if (row.passMode ==7) {
            return '密码开门'
          } else if (row.passMode ==8){
            return '扫码开门'
          }else if (row.passMode ==9){
            return '远程开门'
          }
        }},
        { label: '是否开门', param: 'matched', align: 'center',isshow:true,width:'120',sortable: true ,render: (row) => {
          if (row.matched) {
            return '是'
          } else if (!row.matched) {
            return '否'
          } 
        }},
        { label: '识别设备', param: 'deviceName', align: 'center',isshow:true,width:'120',sortable: true },
        { label: '日期', param: 'snapTime', align: 'center', sortable: true ,isshow:true,width:'150'},
        
      ],
      isOpenDoor: [{
        value: true,
        label: '是'
      }, {
        value: false,
        label: '否'
      }],
      recognizeWay:[{
        value: '0',
        label: '刷脸开门'
      },{
        value: '2',
        label: '刷卡开门'
      }, {
        value: '7',
        label: '密码开门'
      }, {
        value: '8',
        label: '扫码开门'
      }, {
        value: '9',
        label: '远程开门'
      }],
      deviceGroup:[],
      value: '',
      timeArr:[],
      isShowSelect:true,
      dataForm:{
        appId:'',
        identificationWay:'',//识别方式
        name:'',//姓名
        deviceId:'',//识别设备
        whetherToOpenTheDoor:null,//是否开门
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
      outChecked:false,
      outPop:false,
      loading:false,
      isExport:false,//是否在请求导出
      contentMsg:{},//查看记录详情信息
      recordContentPop:false,//记录详情弹框
      imgurl:'',
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
        identificationWay:'',//识别方式
        name:'',//姓名
        deviceId:'',//识别设备
        whetherToOpenTheDoor:null,//是否开门
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
        url: "/record/identification/page",
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
        identificationWay:'',//识别方式
        name:'',//姓名
        deviceId:'',//识别设备
        whetherToOpenTheDoor:null,//是否开门
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
          url: "/record/identification/export",
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