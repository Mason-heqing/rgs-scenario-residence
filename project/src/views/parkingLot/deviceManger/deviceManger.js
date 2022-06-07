import MsgBox from '../../../components/dialog.vue'
import FromDialog from '../../../components/fromDialog.vue'
import TableCmp from '../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
    return {
      currentPage: 1,
      total: 0,
      dataForm:{
        currentPage:1,
        pageSize:10,
        appId:'',
      },
      tableLabel: [
        { label: '区域名称', param: 'areaName', align: 'left', sortable: true, isshow: true},
        { label: '岗亭名称', param: 'workstationName', align: 'left', sortable: true, isshow: true},
        { label: '通道名称', param: 'channelName', align: 'left', sortable: true, isshow: true},
        { label: '设备类型', param: 'deviceCategoryName', align: 'left', sortable: true, isshow: true},
        { label: '设备型号', param: 'model', align: 'left', sortable: true, isshow: true},
        { label: '设备IP', param: 'ip', align: 'left', sortable: true, isshow: true},
        // { label: '设备状态', param: 'parkType', align: 'left', sortable: true, isshow: true}
      ],
      tableOption: [],
      tableSelect: [],
      listData: [],//表格数据
      isShowSelect: true,
      loading: false,
    }
  },

  watch: {
    
  },
  filters: {

  },
  created() {
    // console.log('获取token值',Cookies.get('TOKEN'));
    this.dataForm.appId = this.$store.state.project.projectId;
  },
  components: {
    MsgBox,
    FromDialog,
    TableCmp
  },
  computed: {
    parkId: {
      get() {
        return this.$store.state.project.projectId
      },
      set(v) {
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch:{
    parkId(value){
      // alert(newFlag);
      this.dataForm.appId = value;
      this.getListData();
    }
  },
  mounted() {
    // let scenarioId = Cookies.get("scenarioId");
    // this.dataForm.scenarioId = scenarioId;
    this.getListData();
  },
  methods: {
    //数据
    getListData() {
      this.utils.http({
        url: "/park/device/list",
        method: "GET",
        params: this.dataForm
      },
        res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.currentPage = res.data.current;
            if(res.data.records && 0 < res.data.records.length){
              // $.each(res.data.records,(index,item)=>{
              //   item.region = item.province + "/" + item.city
              // })
              this.listData = res.data.records;
            }else{
              this.listData = []
            }
          }
        });
    },

    handleNodeClick(data) {
      this.listDataForm.userId = data.id;
      this.getListData();
    },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      this.dataForm.pageSize = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.dataForm.currentPage = val;
      this.getListData();
    },

  },
}