import MsgBox from '../../../../components/dialog.vue'
import TableCmp from '../../../../components/table.vue'
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
      tableData: [{usr:'好人1',state:true,img:'https://himg2.huanqiucdn.cn/attachment2010/2020/0514/20200514072926522.jpg',company:'上海市普陀区金沙江路 1518 弄',email:'123@qq.com',registTime:'2020.5.13',status:1},
      {usr:'好人2',state:false,img:'https://himg2.huanqiucdn.cn/attachment2010/2020/0514/20200514072926522.jpg',company:'上海市普陀区金沙江路 1518 弄',email:'123@qq.com',registTime:'2020.5.13',status:2}],
      tableLabel: [ 
        { label: '序号', param: 'usr', align: 'center', width: '60', sortable: true ,isshow:true},   
        { label: '抓拍照片', param: 'img', align: 'center', sortable: true ,isimg:true,isshow:true},
        { label: '姓名', param: 'usr', align: 'center', sortable: true ,isshow:true},
        { label: '报警类型', param: 'company', align: 'center',isshow:true , sortable: true},
        { label: '报警等级', param: 'email', align: 'center', sortable: true,isshow:true },
        { label: '抓拍设备', param: 'usr', align: 'center', sortable: true ,isshow:true},
        { label: '日期', param: 'usr', align: 'center', sortable: true ,isshow:true},
        { label: '时间', param: 'usr', align: 'center', sortable: true ,isshow:true},
        // { label: '启用状态', param: 'state', align: 'center', sortable: true ,isswitch:true,isshow:true},
        // {
        //   label: '审核状态', param: 'status', align: 'center', sortable: true, render: (row) => {
        //     if (row.status === 0) {
        //       return '未审核'
        //     } else if (row.status === 1) {
        //       return '审核通过'
        //     } else if (row.status === 2) {
        //       return '审核不通过'
        //     } else {
        //       return '禁用'
        //     }
        //   }
        // },
        { slot: 'operate',isshow:true }, // 操作列
      ],


      colData: [{ title: "日期", istrue: true },
      { title: "年龄", istrue: true },
      { title: "姓名", istrue: true },
      { title: "地点", istrue: true }],
      colOptions: [],
      colSelect: [],
      activeName: 'first',
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
    }
  },
  watch: {

  },
  filters: {

  },
  created() {
    for (let i = 0; i < this.colData.length; i++) {
      this.colSelect.push(this.colData[i].title);
      if (this.colData[i].title == '年龄') { //初始化不想展示的列可以放在这个条件里
        continue;
      }
      this.colOptions.push(this.colData[i].title);

    }
  },
  components: {
    MsgBox,
    TableCmp
  },
  mounted() {
    this.open();
    // this.utils.tip('error', '这是信息')
  },
  methods: {
    consoleSelect(){
      console.log(this.$refs.tableChild.selectData)
    },
    gotoEdit(name){
      alert(name)
    },
    open() {
      var timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(timer)
      }, 3000)

    },
    //go增加页
    goAdd() {
      this.$router.push({
        path: '/ownermanageadd'
      })
    },

    handleNodeClick(data) {
      console.log(data);
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
    //搜索的时间改变
    changeTime(e){},
  },
}