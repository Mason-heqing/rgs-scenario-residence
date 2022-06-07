import MsgBox from '../../../components/dialog.vue'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      popVisible:false,//是否显示信息弹框
      popTitle:'这个是标题',
      popContent:'这个是内容',
      total: 0,
      tableData: [],
      multipleSelection: [],//表格选中
      
      value: '',
      value1:'',
      dataForm:{
        appId:'',
        personName:'',//姓名
        pageNum:1,
        pageSize:10,
        visitorPassble:'',//访问状态
        time:'',
      },
      visitorPassble:[{  
        value:1,
        label:'有效'
      },{  
        value:2,
        label:'无效'
      },{  
        value:3,
        label:'过期'
      },{  
        value:4,
        label:'取消'
      }],
      loading:false,
      imgurl:'',
      outChecked:false,
      outPop:false,//导出弹框
      isExport:false,//是否在请求导出
      authPopVisible:false,//授权弹框
      authPopTitle:'',
      authId:'',//授权人员的id
      authName:'',//授权人员的name
      timer:null
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
        personName:'',//姓名
        pageNum:1,
        pageSize:10,
        visitorPassble:'',//访问状态
        time:'',
      },
      this.getTableData()
    }
  },
  components:{
    MsgBox,
    ExportBox,
    AuthBox
  },
  filters: {
    clTime: function(time) {
      return time.split(" ")[0];
    }
  },
  mounted() {
    if(this.appId){
      this.dataForm.appId=this.appId;
      this.getTableData()
    }
    
  },
  methods: {
    //获取表格数据
    getTableData(){
      this.loading=true;
      this.utils.http({
        url: "/person/visitor/record/queryVisitorByPage",
        method: "GET",
        params: this.dataForm
      },
      res => {
        if(res.code==200){
          this.total=res.data.total
          this.tableData=res.data.records;
          this.currentPage=res.data.current;
        }      
        this.loading=false;
      });  
    },
    //重置
    resetBtn(){
      this.dataForm={
        appId:this.appId,
        personName:'',//姓名
        pageNum:1,
        pageSize:10,
        visitorPassble:'',//访问状态
        time:'',
      }
      this.getTableData();
    },
    changeTime(e){
      // console.log(e)
    },
    open () {
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },


    handleNodeClick(data) {
      console.log(data);
    },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    //删除
    clickDel(id){
      this.$confirm("您确信取消当前记录?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         this.deleteRequest(id)
        })
        .catch(() => {
          
        });
    },
    deleteRequest(id){
      this.utils.http({
        url: "/person/visitor/record/cancelVisitorAuth",
        method: "GET",
        params: {visitorId:id}
      },
      res => {
        if(res.code==200){
          this.utils.tip('success','取消成功');
          this.getTableData();
        }
      }); 
      
    },
    //批量取消
    batchDelete(){
      let ids=[];
      this.multipleSelection.forEach((item,index)=>{
        ids.push(item.id)
      })
      if(ids.length==0){
        this.popVisible=true;//是否显示信息弹框
        this.popTitle='提示';
        this.popContent='请先选择要取消的访客';
        this.open()
      }else{
        this.$confirm("您确信取消选中的访客?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.utils.http({
            url: "/person/visitor/record/batchCancelVisitorAuth",
            method: "POST",
            data: {visitIdList:ids}
          },
          res => {
            if(res.code==200){
              this.utils.tip('success','取消成功');
              this.getTableData()
            }        
          });  
        })
        .catch(() => {
          
        });
      }
    },
    //导出
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
        this.multipleSelection.forEach((item,index)=>{
          ids.push(item.id)
        })
        this.dataForm.ids=ids;
        this.utils.http({
          url: "/person/visitor/record/exportVisitor",
          method: "POST",
          data: this.dataForm
        },
        res => {
          this.isExport=false;
          this.outPop=false;
          delete this.dataForm.ids;//删除ids属性  防止查询报错
          if(res.code==200){
            this.$alert('人员正在导出请稍后', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'success',
            }).then(() => {
             
            }).catch(() => {});
          }else{
            this.$alert('人员导出失败', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'error',
            }).then(() => {
             
            }).catch(() => {});
          }
        });  
      
    },
    //查看授权状态
    goView(id,name){
      this.authPopVisible=true;
      this.authId=id;
      this.authPopTitle=name;
    },
  },
}