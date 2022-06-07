import MsgBox from '../../../../components/dialog.vue'
import TableCmp from '../../../../components/table.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ligature from '../../../../utils/ligature.js';
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
        { label: 'id', param: 'id', align: 'center', sortable: true,isshow:false,width:'150'},
        { slot: 'operate2',isshow:true,label:'图标'},
        // { label: '账单附件', param: 'usr', align: 'center', sortable: true ,isshow:true},
        
        { label: '创建时间', param: 'createTime', align: 'center',isshow:true , sortable: true,width:'160'},
        // { label: '标题', param: 'title', align: 'center', sortable: true,isshow:true,width:'250' },
         { slot: 'operate1',isshow:true,label:'标题'},
        { label: '用户', param: 'userId', align: 'center', sortable: true,isshow:true,width:'150' },
        { label: '读取标志', param: 'readFlag', align: 'center',isshow:true , sortable: true,width:'120',render: (row) =>{
          if (row.readFlag == 'Y') {
            return '已读'
          } else if (row.readFlag == 'N') {
            return '未读'
          } 
      }},
        { label: '读取时间', param: 'readTime', align: 'center',isshow:true , sortable: true,width:'160'},
        { slot: 'operate',isshow:true }, // 操作列
      ],
      tableOption:[],
      tableSelect: [],
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
        pageSize:10,
        pageNum:1,
      },
      loading:false,
      imgurl:'',
      msgPopVisible:false,
      msgDataList:[],
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
    }
  },
  filters: {
    formatTime: function (time) {
      let date=new Date(time);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
      var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
      
      let strDate = Y+M+D+h+m+s;
      return strDate;
    }
  },
  created() {
    this.imgurl = this.tools.global.API_URL;

    for (let i = 0; i < this.tableLabel.length; i++) {
      if(this.tableLabel[i].label){
        this.tableOption.push(this.tableLabel[i].label)
      }
      if(this.tableLabel[i].isshow){
        this.tableSelect.push(this.tableLabel[i].label)
      }
    }
    //监听点击头部导出失败
    ligature.$on('showMsgPop',(id)=>{
      this.getMagData(id);
    });
  },
  components: {
    MsgBox,
    TableCmp,
    ElImageViewer
  },
  mounted() {
    this.getTableData();
    ligature.$on('msgPageList',()=>{
      if(this.$route.path=='/usermsg'){
        this.getTableData('1');//1要loading
      }   
    });
  },
  methods: {

    //动态表头数据
    checkboxChange(e){
      for (let j = 0; j < this.tableLabel.length; j++) {
        if(this.tableSelect.indexOf(this.tableLabel[j].label)>-1){
          this.tableLabel[j].isshow=true;
        }else{
          this.tableLabel[j].isshow=false;
        }           
      }
  },
    consoleSelect(){
      console.log(this.$refs.tableChild.selectData)
    },
    gotoEdit(name){
      alert(name)
    },
    //弹框
    open() {
      var timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(timer)
      }, 3000)
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },
    //列表
    getTableData(isLoading){ 
      if(!isLoading){
        this.loading=true;
      }   
      this.utils.http({
        url: "/public/msg/search",
        method: "POST",
        data:this.dataForm
      }, res => {
        this.loading=false;
        if(res.code==200){
          this.total=res.data.total;
          this.tableData=res.data.records;
        }
        
      })
    },
    //全部标志为已读
    allRead(){
      this.utils.http({
        url: "/public/msg/read/all",
        method: "POST",
        data:{}
      }, res => {
        if(res.code==200){
          this.getTableData();       
          ligature.$emit("noReadMsg");
        }
      })
    },


    //删除
    deleteMsg(id){
    var ids=[];
    if(id){
      ids.push(id)
    }else{
      console.log(this.$refs.tableChild.selectData)
      let all= this.$refs.tableChild.selectData;
      all.forEach((item,index)=>{
        ids.push(item.id)
      })
      console.log(ids.length)
    }
    if(ids.length==0){
      this.popVisible=true;//是否显示信息弹框
      this.popTitle='提示';
      this.popContent='请先选择要删除的消息';
      this.open()
    }else{
      this.$confirm("您确信删除选中的消息?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        console.log(ids)
        this.utils.http({
          url: "/public/msg/batchDelete",
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
  //获取详情
  // getMagData(id){
  //   this.utils.http({
  //     url: "/public/msg/read/"+id,
  //     method: "POST",
  //     data:{}
  //   }, res => {
  //     if(res.code==200){
  //       ligature.$emit("msgContentPop",id);
  //       this.getTableData();
  //       // this.msgPopVisible=true;
  //       // this.msgDataList=JSON.parse(res.data.message);
  //     }
      
  //   })
  // },
  getMagData(id){
    ligature.$emit("msgContentPop",id);
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