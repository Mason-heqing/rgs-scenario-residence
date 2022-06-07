import MsgBox from '../../../../components/dialog.vue'
import TableCmp from '../../../../components/table.vue'
export default {
  name: 'home',
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号'));
        }else{
          callback();
        }
      } else {
        callback(new Error('请输入手机号'));
      }
    };
    return {
      currentPage: 1,
      popVisible: false,//是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [    
        { label: '机构名称', param: 'section', align: 'center', sortable: true ,isshow:true},
        { label: '联系方式', param: 'phone', align: 'center',isshow:true ,sortable: true,},
        { slot: 'operate',isshow:true }, // 操作列
      ],
      addPopVisible:false,
      addForm:{
        appId:'',
        section:'',
        phone:'',
      },
      rules:{
        section: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号或电话号码', trigger: 'blur' },
          // { validator: validatePhone,trigger: 'blur' }
        ],
      },
      isShowSelect:true,//表格头部是否显示选择按钮
      tableForm:{
        appId:'',
        pageNum: 1,
        pageSize: 10,
        search: "",
      },
      loading:false,
      addType:'',
      timer:null,
      isRequest:false,
    }
  },
  watch: {

  },
  filters: {

  },
  created() {

  },
  components: {
    MsgBox,
    TableCmp
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
      this.tableForm={
        appId:newFlag,
        pageNum: 1,
        pageSize: 10,
        search: "",
      };
      this.addForm.appId=newFlag;
      this.getDataList();
    }
  },
  mounted() {
    if(this.appId){
      this.tableForm.appId=this.appId;
      this.addForm.appId=this.appId;
      this.getDataList();
    }
    
  },
  methods: {
    consoleSelect(){
      console.log(this.$refs.tableChild.selectData)
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
    //列表/property/contact/page
    getDataList(){
      this.loading=true;
      this.utils.http({
        url: "/property/contact/page",
        method: "POST",
        data: this.tableForm
      },
      res => {
        this.loading=false;
        // console.log(res);
        this.total=res.data.total;
        this.tableData=res.data.records
        this.currentPage=res.data.current;
      });
    },
    //增加手机号/property/contact/add
  addContact(fromMsg){
    this.$refs[fromMsg].validate((valid) => {
      if(valid){
        this.isRequest=true;
        if(this.addType==1){
          this.editRequest();
        }else{
          this.utils.http({
            url: "/property/contact/add",
            method: "POST",
            data: this.addForm
          },
          res => {
            this.isRequest=false;
            console.log(res);
            this.getDataList();
            this.addPopVisible=false;
            this.addForm.section='';
            this.addForm.phone='';
          });
        }
        
      }
    })
    
  },  
  //重置
  resetBtn(){
    this.tableForm={
      appId:this.appId,
      pageNum: 1,
      pageSize: 10,
      search: "",
    };
    this.getDataList();
  },
  //编辑
  editContact(row){
    this.addType=1;//编辑状态
    this.addPopVisible=true;
    this.addForm=JSON.parse(JSON.stringify(row));
    
  },
  closePop(){
    this.$nextTick(()=>{
      this.$refs.addForm.clearValidate()
    })
    this.addType='';
    this.addForm={
      appId:this.appId,
      section:'',
      phone:'',
    }
  },
  editRequest(){
    this.utils.http({
      url: "/property/contact/update",
      method: "POST",
      data: this.addForm
    },
    res => {
      this.isRequest=false;
      this.getDataList();
      this.addPopVisible=false;
      this.addType='';
      this.addForm={
        appId:this.appId,
        section:'',//
        phone:'',
      }
    });
  },
  
//删除联系方式接
  deleteContact(id){
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
      this.popContent='请先选择要删除的联系方式';
      this.open()
    }else{
      this.$confirm("您确信删除选中的员工?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.utils.http({
          url: "/property/contact/del",
          method: "POST",
          data: {ids:ids}
        },
        res => {
          this.utils.tip('success','删除成功');
          this.getDataList()
        });  
      })
      .catch(() => {
        
      });
    }
    
  },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      this.tableForm.pageSize=val;
      this.getDataList();
    },
    handleCurrentChange(val) {
       this.tableForm.pageNum=val;
       this.getDataList();
    },
  },
}