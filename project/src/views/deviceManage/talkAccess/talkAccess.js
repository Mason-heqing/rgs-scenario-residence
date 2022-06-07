import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
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
        { label: '名称', param: 'img', align: 'center', sortable: true ,isimg:true,isshow:true},
        { label: 'S/N', param: 'usr', align: 'center', sortable: true ,isshow:true},
        { label: '类型', param: 'company', align: 'center', sortable: true,isshow:true },
        { label: '型号', param: 'email', align: 'center', sortable: true,isshow:true },
        { label: '所在位置', param: 'email', align: 'center', sortable: true,isshow:true },
        { label: '状态', param: 'state', align: 'center', sortable: true ,isshow:true},
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
      tableOption:[],
      tableSelect: [],


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
      addPopVisible:false,//添加弹框
      radio:'1',
    }
  },
  watch: {
   
  },
  filters: {

  },
  created() {

    for (let i = 0; i < this.tableLabel.length; i++) {
      if(this.tableLabel[i].label){
        this.tableOption.push(this.tableLabel[i].label)
      }
      if(this.tableLabel[i].isshow){
        this.tableSelect.push(this.tableLabel[i].label)
      }

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
    checkboxChange(e){
      console.log(this.tableSelect)
        for (let j = 0; j < this.tableLabel.length; j++) {
          if(this.tableSelect.indexOf(this.tableLabel[j].label)>-1){
            this.tableLabel[j].isshow=true;
          }else{
            this.tableLabel[j].isshow=false;
          }
            
        }
      console.log(this.tableLabel)
    },
    consoleSelect(){
      console.log(this.$refs.tableChild.selectData)
    },
    gotoEdit(name){
      alert(name)
    },
    //提示弹框
    open() {
      var timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(timer)
      }, 3000)

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
    }
  },
}