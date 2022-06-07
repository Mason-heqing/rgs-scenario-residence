import MsgBox from '../../../../components/dialog.vue'
import TableCmp from '../../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      value: true,
      textVal: '',
      isEdit: true,//编辑状态
      isFocus: false,//编辑时聚焦
      formData: {},//
      editForm: {
        appId: '',
        modelName: '',//repairs、complaints、bill、audit、tips
        remark: '',//提示信息
        status: '',//服务是否开启1开启0未开启；物业审核1需要0不需要
      },
      loading: false,
      checkStatusOption:[{
        value: 0,
        label: '不需要物业审核'
      },{
        value: 1,
        label: '需要物业审核'
      },{
        value: 2,
        label: '超过5人需要物业审核'
      },{
        value: 3,
        label: '超过10人需要物业审核'
      },{
        value: 4,
        label: '超过15人需要物业审核'
      },{
        value: 5,
        label: '超过20人需要物业审核'
      }],
      checkStatus:0,
      chenkStatusPop:false,
      nice:0,
      isRequest:false,//是否在提交
      isChangeTiping:false
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
      this.editForm.appId = newFlag;
      this.getService();
    }
  },
  mounted() {
    if (this.appId) {
      this.editForm.appId = this.appId;
      this.getService();
    }
  },
  methods: {
    //编辑初始化
    getService() {
      this.loading = true;
      this.utils.http({
        url: "/base/model/setting/find/" + this.appId,
        method: "GET",
        params: {}
      },
        res => {
          this.loading = false;
          if (res.code == 200) {           
            if(!res.data.tips){
              res.data.tips='为保障本小区的住户都能享受高品质的服务，请务必填写正确信息，以便快速审核；物业可自行编辑修改提示内容，最大支持100字';
            }
            this.formData = res.data;
          }
        });
    },
    //点击提示时的编辑
    edit() {
      this.isEdit = false;
      this.$nextTick(()=>{ //聚焦
        this.$refs.textData.focus()
     })
    },
    finish() {
      this.isChangeTiping=true;
      this.editForm.modelName = 'tips';
      this.editForm.status = '';
      this.editForm.remark = this.formData.tips;
      
      this.editStatus('tips')

    },
    //开关变化
    changeStatus(e, modelName) {
      e ? this.editForm.status = 1 : this.editForm.status = 0;
      this.editForm.modelName = modelName;
      delete this.editForm.remark;
      this.editStatus();
    },
    //修改状态
    editStatus(type) {
      this.utils.http({
        url: "/base/model/setting/operation",
        method: "POST",
        data: this.editForm
      },
        res => {
          this.isChangeTiping=false;
          this.isRequest=false;
          if (res.code == 200) {
            this.getService();
            if (type == 'tips') {
              this.isEdit = true;
            };
            if(type == 'audit'){
              this.chenkStatusPop=false;
            }
          }
        });
    },
    editCheckStatus(){
      this.checkStatus=this.formData.audit
      this.chenkStatusPop=true;
    },
    sendCheckStatus(){
      this.isRequest=true;
      this.editForm.status=this.checkStatus;
      this.editForm.modelName = 'audit';
      delete this.editForm.remark;
      this.editStatus('audit');
    },
  },
}