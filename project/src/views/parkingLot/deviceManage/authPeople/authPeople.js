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
      tableData: [],
      tableLabel: [
        { label: '名称', param: 'name', align: 'center', sortable: true, isshow: true },
        { label: 'S/N', param: 'serial', align: 'center', sortable: true, isshow: true, width: '120' },
        {
          label: '进出方向', param: 'inoutFlag', align: 'center', width: '120', sortable: true, isshow: true, render: (row) => {
            if (row.inoutFlag == 0) {
              return '出口'
            } else if (row.inoutFlag == 1) {
              return '入口'
            } else if (row.inoutFlag == 2) {
              return '出入口'
            }
          }
        },
        { label: '所在位置', param: 'groupName', align: 'center', sortable: true, isshow: true, width: '120' },
        { label: '型号', param: 'model', align: 'center', sortable: true, isshow: true },
        { slot: 'operate1', isshow: true }, //状态
        { slot: 'operate2', isshow: true }, //授权人员
        { slot: 'operate', isshow: true }, // 操作列
      ],
      tableOption: [],
      tableSelect: [],

      loading: false,
      isShowSelect: true,
      url: '',
      isRequst: false,

    }
  },
  computed: {
    appId: {
      get() {
        return this.$store.state.project.projectId
      },
      set(v) {
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch: {
    appId(newFlag, oldFlag) {
      this.appId = newFlag;
      this.getDataTable();
    }
  },
  filters: {

  },
  created() {

  },
  components: {
    MsgBox,
    TableCmp
  },
  mounted() {
    if (this.appId) {
      this.getDataTable();
    }



  },
  methods: {

    //列表
    getDataTable() {
      this.loading = true;
      this.utils.http({
        url: "/device/page",
        method: "POST",
        data: this.dataForm
      },
        res => {
          this.loading = false;
          if (res.code == 200) {

            this.total = res.data.total;
            this.tableData = res.data.records;
          }

        });
    },
    //分页
    handleSizeChange(val) {
      this.dataList.pageSize = val;
      this.getDataTable();
    },
    handleCurrentChange(val) {
      this.dataList.page = val;
      this.getDataTable();
    },



  },
}