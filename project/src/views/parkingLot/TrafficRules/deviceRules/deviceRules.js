import MsgBox from '../../../../components/dialog.vue'
import FromDialog from '../../../../components/fromDialog.vue'
import TableCmp from '../../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      popVisible:false,//是否显示信息弹框
      popTitle:'这个是标题',
      popContent:'这个是内容',
      fromPopVisible:false,//表单弹框是否显示
      fromPopTitle:'这个是标题',
      fromPopContent:'这个是内容',
      setPopVisible:false,//设置通行时段弹框
      total: 0,
      selectGroup:'',
      timer:null,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        age: '12',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        age: '12',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        age: '12',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        age: '12',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        age: '12',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        age: '12',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        age: '12',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],//表格选中
      data: [{
        label: '一级 1',
        id:'1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      colData: [{ title: "日期", istrue: true },
      { title: "年龄", istrue: true },
      { title: "姓名", istrue: true },
      { title: "地点", istrue: true }],
      colOptions: [],
      colSelect: [],
      activeName: 'first',
      options: [{
        value: '1',
        label: '全天通行'
      }, {
        value: '2',
        label: '禁行通行'
      }, {
        value: '3',
        label: '分时通行'
      }],
      value: '1',//设置通行时段
      timeArr: null,
      stepArr:[],
      timerNum:2,
    }
  },
  watch: {

  },
  filters: {

  },
  created() {

  },
  components:{
    MsgBox,
    FromDialog
  },
  mounted() {
    this.nice();
    // this.utils.tip('error', '这是信息')
  },
  methods: {
    editGroup(){
      if(this.selectGroup){
        this.fromPopTitle='请输入新的区域名称';
        this.fromPopVisible=true;
      }else{
        this.popTitle='提示'
        this.popContent='请选择要修改的区域';
        this.popVisible=true;
        this.open();
      }
    },
     //新增分组
     addGroup(){
      this.fromPopTitle='请输入区域名称';
      this.fromPopVisible=true;
    },
    fatherMethod(msg){
      alert(msg)
      this.fromPopVisible=false;
    },
    deleteGroup(){},
    //清除弹框消失定时器
    open () {
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },
//选择左侧下拉
  handleNodeClick(data,Node,e) {
    this.selectGroup=data.label;
    console.log(data);
    console.log(Node);
    console.log(e);
  },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      // this.dataList.pageSize=val;
      // this.getData();
    },
    handleCurrentChange(val) {
      //  this.dataList.page=val;
      //  this.getData();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },

    //设置通行时段弹框确定按钮
    setTimer(){
      this.setPopVisible=false;
    },
    //通行方式改变
    trafficKind(e){
      console.log(e)
    },
    changeTime(e,index) {
      console.log(e);
      console.log(this.stepArr)
    },
    // 删除时间段
    deleteTime(){
      this.timerNum=this.timerNum-1;
      console.log(this.timerNum);
      this.stepArr=[];
      this.nice()
    },
    // 增加时间段
    addTime(){
      this.timerNum=this.timerNum+1;
      console.log(this.timerNum);
      this.stepArr=[];
      this.nice()
    },
    nice(){
      for(let i=0;i<this.timerNum;i++){
        var obj={};
        var index=i+1;
        obj['name']='时段'+index;
        obj['timeArr']=null;
        this.stepArr.push(obj)
      }
      console.log(this.stepArr)
    },
    //点击设置
    clickSet(){
      this.setPopVisible=true;
    },
  },
}