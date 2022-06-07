import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import axios from 'axios'
export default {
  name: 'home',
  data() {
    let _self = this;
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      tableLabel: [
        { label: '楼栋名称', param: 'buildingName', align: 'center', sortable: true, isshow: true },
        { label: '楼栋呼叫编码', param: 'buildingId', align: 'center', sortable: true, isshow: true },
        { label: '单元名称', param: 'unitName', align: 'center', sortable: true, isshow: true },
        { label: '单元呼叫编码', param: 'unitId', align: 'center', isshow: true, sortable: true },
        { label: '房号名称', param: 'houseName', align: 'center', sortable: true, isshow: true },
        { label: '房号呼叫编码', param: 'houseId', align: 'center', sortable: true, isshow: true },
        { slot: 'operate', isshow: true }, // 操作列
      ],
      dataForm: {
        appId: '',
        search: '',//
        pageNum: 1,
        pageSize: 10,
      },
      isShowSelect: false,//表哥隐藏select选择框
      cascaderData: [],
      groupProps: {
        children: 'groups',
        label: 'name',
        value: 'id',
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      cascaderKey: 1,
      loading: false,
      prop: {//层级选择动态加载
        lazy: true,
        checkStrictly: true,
        lazyLoad(node, resolve) {
          setTimeout(() => {
            if (node.level == 0) {
              _self.utils.http({
                url: "/base/house/buildingsList",
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: _self.utils.changeJson({ appId: _self.appId })
              },
                res => {
                  if (res.code == 200 && res.data) {
                    const dataList = res.data.map((value, i) => ({
                      value: value.id,
                      label: value.name,
                      // leaf: node.level >= 2
                    }));
                    resolve(dataList);
                  }
                });
            }
            else {
              console.log(node)
              _self.utils.http({
                url: "/base/house/buildingsList",
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: _self.utils.changeJson({ appId: _self.appId, deviceGroupId: node.data.value })
              },
                res => {
                  if (res.code == 200 && res.data) {
                    const dataList = res.data.map((value, i) => ({
                      value: value.id,
                      label: value.name,
                      // leaf: node.level >= 2
                    }));
                    resolve(dataList);
                  }

                });
            }
          }, 1000);
        }
      }
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
      this.dataForm = {
        appId: newFlag,
        search: '',//
        pageNum: 1,
        pageSize: 10,
      };
      ++this.cascaderKey;
      this.getTableData()
      this.getLeftData();
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
      this.dataForm.appId = this.appId;
      this.getTableData();
      this.getLeftData();
    }

  },
  methods: {
    //三级联动
    elCascaderOnlick() {
      let that = this;
      setTimeout(function () {
        document.querySelectorAll(".el-cascader-node__label").forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click();
            that.$refs.elcascader.dropDownVisible = false;
          };
        });

        document.querySelectorAll(".el-cascader-panel .el-radio").forEach(el => {
          el.onclick = function () {
            that.$refs.elcascader.dropDownVisible = false;
          };
        });

      }, 100);
    },
    //获取列表
    getTableData() {
      this.loading = true;
      this.utils.http({
        url: "/base/call/record/page",
        method: "POST",
        data: this.dataForm
      },
        res => {
          this.loading = false;
          if (res.code == 200) {
            this.total = res.data.total;
            this.tableData = res.data.records;
            this.currentPage=res.data.current;
          }
        });
    },
    //重置
    resetBtn() {
      this.dataForm = {
        appId: this.appId,
        search: '',//
        pageNum: 1,
        pageSize: 10,
      };
      this.getTableData();
    },

    //获取下拉
    getLeftData() {
      this.cascaderData = [];
      this.utils.http({
        url: "/base/house/list",
        method: "GET",
        params: { appId: this.appId }
      },
        res => {
          if (res.code == 200 && res.data.groups) {
            this.cascaderData = res.data.groups;
          }

        });
    },
    //下拉改变
    cascaderChange(e) {
      if (e) {
        this.dataForm.search = e[e.length - 1]
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
  },
}