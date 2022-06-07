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
      total: '',
      addPersonForm:{
        page:1,
        pegeSize:10,
        appId:window.localStorage.getItem('appid')
      },    //列表查询参数
      tableDataList:[], //table表格数据
      multipleSelection: [],//表格选中
      tableOption: {
        label: '操作',
        width: '200',
        options: [
          { label: '预览', type: 'primary', icon: 'el-icon-view', methods: 'preview' },
          { label: '审核', type: 'primary', icon: 'el-icon-upload2', methods: 'audit' },
        ]
      },
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
      
      value: '',
      
    }
  },
  watch: {
    // colOptions(valArr) {
    //   var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0); // 未选中
    //   this.colData.filter(i => {
    //     if (arr.indexOf(i.title) != -1) {
    //       i.istrue = false;
    //       this.$nextTick(() => {
    //         this.$refs.multipleTable.doLayout();
    //       });
    //     } else {
    //       i.istrue = true;
    //       this.$nextTick(() => {
    //         this.$refs.multipleTable.doLayout();
    //       });
    //     }
    //   });
    // }
  },
  filters: {

  },
  created() {
    this.getBlacklist();
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
    // 获取黑名单列表
    getBlacklist() {
      this.utils.http({
        url: "/person/blacklist/page",
        method: "POST",
        data: this.addPersonForm
      },
      res => {
        if(res.code == 200) {
          this.tableDataList = res.data.records
          this.total = res.data.total
        }
        console.log(this.tableDataList,'黑名单');
      
      });  
    },
    // 处理table格数据
    formatterArr(row, column, cellValue) {
			if(row.createTime && row.effectiveTime) {
				let newRow = row.createTime + ' ' + row.effectiveTime
				return newRow;
			}
			console.log(row,'row')
        
		},


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