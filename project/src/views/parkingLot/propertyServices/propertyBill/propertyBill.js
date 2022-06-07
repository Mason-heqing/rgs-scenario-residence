import MsgBox from '../../../../components/dialog.vue'
import TableCmp from '../../../../components/table.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      popVisible: false,//是否显示信息弹框
      popTitle: '提示',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [    
        { label: '序号', param: 'img', align: 'center', sortable: true,isshow:true,index:true},
        { label: '账单名称', param: 'billName', align: 'center', sortable: true ,isshow:true,width:'150'},
        // { label: '账单附件', param: 'usr', align: 'center', sortable: true ,isshow:true},
        { slot: 'operate1',isshow:true,label:'附件'}, 
        { label: '发送房间', param: 'houseName', align: 'center',isshow:true , sortable: true,width:'150'},
        { label: '创建时间', param: 'createTime', align: 'center', sortable: true,isshow:true,width:'150' },
        { slot: 'operate',isshow:true }, // 操作列
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      timeArr:[],
      isShwoSelect:true,
      dataForm:{
        appId:'',
        pageSize:10,
        pageNum:1,
        billName:'',//账单名称
        houseId:'',//房屋id
      },
      loading:false,
      cascaderData:[],
      groupProps: {
        children:'groups',
        label:'name',
        value:'id',
        checkStrictly:true,
        expandTrigger: 'hover'
      },
      previewImg:[],
      showViewer:false,
      imgurl:'',
      timer:null,
      cascaderKey:1,
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
        pageSize:10,
        pageNum:1,
        billName:'',//账单名称
        houseId:'',//房屋id
      };
      ++this.cascaderKey;
      this.getTableData();
      this.getLeftData();
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
    ElImageViewer
  },
  mounted() {
    if(this.appId){
      this.dataForm.appId=this.appId;
      this.getTableData();
      this.getLeftData();
    }
  },
  methods: {
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
    consoleSelect(){
      console.log(this.$refs.tableChild.selectData)
    },
    gotoEdit(name){
      alert(name)
    },
    //弹框
    open () {
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },
    //列表
    getTableData(){
      
      this.loading=true;
      this.utils.http({
        url: "/property/bill/pageAll",
        method: "POST",
        data:this.dataForm
      }, res => {
        this.loading=false;
        if(res.code==200){
          this.total=res.data.total;
          this.tableData=res.data.records;
          this.currentPage=res.data.current;
        }     
      })
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
    //重置
    resetBtn(){
      this.dataForm={
        appId:this.appId,
        pageSize:10,
        pageNum:1,
        billName:'',//账单名称
        houseId:'',//房屋id
      }
      this.getTableData()
    },
    //删除
  deleteBill(id){
    var ids=[];
    if(id){
      ids.push(id)
    }else{
      // console.log(this.$refs.tableChild.selectData)
      let all= this.$refs.tableChild.selectData;
      all.forEach((item,index)=>{
        ids.push(item.id)
      })
      // console.log(ids.length)
    }
    if(ids.length==0){
      this.popVisible=true;//是否显示信息弹框
      this.popTitle='提示';
      this.popContent='请先选择要删除的账单';
      this.open()
    }else{
      this.$confirm("您确信删除选中的账单?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.utils.http({
          url: "/property/bill/batchDelete",
          method: "POST",
          data: {ids:ids}
        },
        res => {
          if(res.code==200){
            this.utils.tip('success','删除成功');
            this.getTableData()
          }          
        });  
      })
      .catch(() => {
        
      });
    }
    
  },
  //查看附件
  onPreview(url){
    this.previewImg=[];
    let urlList=url.split(',')
    urlList.forEach((item,index)=>{
      let realUrl=this.imgurl+'/file/download?path='+item;
      this.previewImg.push(realUrl)
    })
    
    this.showViewer=true;
  },
  // 关闭查看器
  closeViewer() {
    this.showViewer = false
  },
  cascaderChange(e){
    if(e){
      this.dataForm.houseId=e[e.length-1]
    }
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
    //跳转添加
    goAdd(){
      this.$router.push({
        path:'/addbill',
        query:{
          type:'1',
        }
      })
    },
  },
}