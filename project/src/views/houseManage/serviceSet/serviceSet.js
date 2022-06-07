import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      value: true,
      textVal: '',
      isEdit: true,//编辑状态
      isFocus: false,//编辑时聚焦
      formData: {},//
      facial:'',
      editForm: {
        appId: '',
        modelName: '',//repairs、complaints、bill、audit、tips、ownerIdentityAudit 、visitorIdentityAudit
        remark: '',//提示信息
        status: '',//服务是否开启 1开启0未开启；物业审核1需要0不需要
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
      },
      {
        value: 6,
        label: '超过6人需要物业审核'
      },{
        value: 7,
        label: '超过7人需要物业审核'
      },{
        value: 8,
        label: '超过8人需要物业审核'
      },
      {
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
      isChangeTiping:false,
      checkList:[],
      validTimeTitle:'',
      validTimeTitlePop:false,
      times:1,
      timeList:[],
      householdDefaultTimes:'',//户主默认时间
      dependentsDefaultTimes:'',//家属默认时间
      visitorDefaultTimes:'',//租客默认时间
      otherPersonDefaultTimes:'',//其他人员默认时间
      getdDataAggregate:[],//获取各个人员类型的有效时间集合;
      timeFlag:null,
      isRequestTimes:false
    }
  },
  filters: {

  },
  created() {
    // this.facial = window.localStorage.getItem('Status')
    // console.log(window.localStorage.getItem('Status'),'9999')
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
      this.getDeadTimeWebInfo();
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
          console.log(res,'^^^^')
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
      console.log(e,'@@@')
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

    editCheckStatus1(value,type){
      this.validTimeTitle = value;
      this.validTimeTitlePop = true;
      // if(1 == type || 2 == type){
      //    this.times = 1;
      // }else if(3 == type){
      //   this.times = 6
      // }else if(4 == type){
      //   this.times = 9
      // } 
      if(0 < this.getdDataAggregate.length){
        this.getdDataAggregate.forEach((item,index)=>{
          if('1' == item.personSubtype && 1 == type){
            this.times = item.id;
            this.timeFlag = item.personSubtype;
          }else if('2' == item.personSubtype && 2 == type){
            this.times = item.id;
            this.timeFlag = item.personSubtype;
          }else if('3' == item.personSubtype && 3 == type){
            this.times = item.id;
            this.timeFlag = item.personSubtype;
          }else if('5' == item.personSubtype && 5 == type){
            this.times = item.id;
            this.timeFlag = item.personSubtype;
          }
        })
      }

    },

    //获取小区户主/家属/租客/其他 失效时间
    getDeadTimeWebInfo(){
      this.utils.http({
        url: "/base/model/setting/deadTimeWebInfo?appId="+this.appId,
        method: "GET",
        // data: this.editForm
      },
        res => {
          if (res.code == 200) {
             if(res.data.deadTimeDictEntityList && 0 < res.data.deadTimeDictEntityList.length){
                 this.timeList = res.data.deadTimeDictEntityList;
             }else{
                 this.timeList = [];
             }
             if(res.data.personDeadTimeVoList && res.data.personDeadTimeVoList.length){
               this.getdDataAggregate = res.data.personDeadTimeVoList;
              res.data.personDeadTimeVoList.forEach((item,index)=>{
                 if('1' == item.personSubtype){
                   this.householdDefaultTimes=item.name;
                 }else if('2' == item.personSubtype){
                   this.dependentsDefaultTimes=item.name;
                 }else if('3' == item.personSubtype){
                   this.visitorDefaultTimes=item.name;
                 }else if('5' == item.personSubtype){
                   this.otherPersonDefaultTimes=item.name;
                 }
              })
             }else{
                this.getdDataAggregate = [];
                this.householdDefaultTimes='';
                this.dependentsDefaultTimes='';
                this.visitorDefaultTimes='';
                this.otherPersonDefaultTimes='';
             }
          }
        });
    },
 
    //修改小区户主/家属/租客/其他 失效时间
    sendEffectiveTime(){
      this.isRequestTimes=true;
       this.getdDataAggregate.forEach((item,index)=>{
          if(this.timeFlag == item.personSubtype){
              item.id = this.times;
          }
       })
       let arr = [];
       this.getdDataAggregate.forEach((item,index)=>{
          let json = {};
          json.appId = this.appId;
          json.id = item.id;
          json.personSubtype = item.personSubtype;
          arr.push(json);
       })
       let timesForm = {};
       timesForm.list = arr;
       this.utils.http({
        url: "/base/model/setting/addPersonDeadTime",
        method: "POST",
        data: JSON.stringify(timesForm)
      },
        res => {
          this.isRequestTimes=false;
          this.validTimeTitlePop=false;
          if (res.code == 200) {
            this.getDeadTimeWebInfo();
          }
        });
    }

  },
}