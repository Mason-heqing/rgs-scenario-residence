import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      currentPage: 1,
      popVisible: false,//是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [
        { slot: 'operate1', isshow: true, label: '标题', },
        {
          label: '状态', param: 'noticeStatus', align: 'center', isshow: true, sortable: true, render: (row) => {
            if (row.noticeStatus == 0) {
              return '草稿'
            } else if (row.noticeStatus == 1) {
              return '已发布'
            }
          }
        },
        { label: '创建时间', param: 'createTime', align: 'center', width: '200', isshow: true, sortable: true },
        { label: '已读人数', param: 'visitPerson', align: 'center', width: '120', isshow: true, sortable: true },
        { slot: 'operate', isshow: true }, // 操作列
      ],
      dataForm: {
        appId: '',
        pageNum: 1,
        pageSize: 10,
        noticeTitle: '',//标题
        noticeStatus: '',//状态
      },
      noticeStatus: [{
        label: '草稿',
        value: 0,
      }, {
        label: '已发布',
        value: 1,
      }],
      isShowSelect: true,
      loading: false,
      timer: null
    }
  },
  filters: {

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
      this.dataForm = {
        appId: newFlag,
        pageNum: 1,
        pageSize: 10,
        noticeTitle: '',//标题
        noticeStatus: '',//状态
      };
      this.getTableData()
    }
  },
  created() {

  },
  components: {
    MsgBox,
    TableCmp
  },
  mounted() {
    if (this.appId) {
      this.dataForm.appId = this.appId;
      this.getTableData();
    }
  },
  methods: {
    open() {
      this.timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(this.timer)
      }, 3000)
    },
    clearSetTimeOut() {
      clearTimeout(this.timer)
    },
    //点击编辑
    editNotice(row) {
      this.utils.setStore('noticeMsg', row)
      this.$router.push({
        path: '/noticeadd',
        query: {
          type: '2',
        }
      })
    },
    //通知列表
    getTableData() {
      this.loading = true;
      this.utils.http({
        url: "/property/notice/pageAll",
        method: "POST",
        data: this.dataForm
      }, res => {
        this.loading = false;
        if (res.code == 200) {
          this.total = res.data.total;
          this.tableData = res.data.records;
          this.currentPage=res.data.current;
        }
      })
    },
    //撤回
    draw(id) {
      this.utils.http({
        url: "/property/notice/draw/" + id,
        method: "POST",
        data: {}
      }, res => {
        if (res.code == 200) {
          this.getTableData();
        }

      })
    },
    //重置
    resetBtn() {
      this.dataForm = {
        appId: this.appId,
        pageNum: 1,
        pageSize: 10,
        noticeTitle: '',//标题
        noticeStatus: '',//状态
      }
      this.getTableData()
    },
    //删除/property/notice/batchDelete
    deleteNotice(id) {
      var ids = [];
      if (id) {
        ids.push(id)
      } else {
        console.log(this.$refs.tableChild.selectData)
        let all = this.$refs.tableChild.selectData;
        all.forEach((item, index) => {
          ids.push(item.id)
        })
      }
      if (ids.length == 0) {
        this.popVisible = true;//是否显示信息弹框
        this.popTitle = '提示';
        this.popContent = '请先选择要删除的通知';
        this.open()
      } else {
        this.$confirm("您确信删除选中的通知?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.utils.http({
              url: "/property/notice/batchDelete",
              method: "POST",
              data: { ids: ids }
            },
              res => {
                if (res.code == 200) {
                  this.utils.tip('success', '删除成功');
                  this.getTableData()
                }
              });
          })
          .catch(() => {

          });
      }

    },



    //分页
    handleSizeChange(val) {
      this.dataForm.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.dataForm.pageNum = val;
      this.getTableData();
    },
    //跳转添加
    goAdd() {
      this.$router.push({
        path: '/noticeadd',
        query: {
          type: '1',
        }
      })
    },
  },
}