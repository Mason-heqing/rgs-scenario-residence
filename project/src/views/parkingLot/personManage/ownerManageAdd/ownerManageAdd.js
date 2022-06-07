import echarts from 'echarts'
export default {
  name: 'home',
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号'));
        }else{
          callback();
        }
      } else {
        callback(new Error('请输入手机号'));
      }
    };
    return {
      msg: '项目管理',
      addPersonForm: {
        appId:'',//	string应用id
        faceUrl:'',//	string 头像
        houseList:[],//房屋住户列表
        icNum:'',//	stringIC卡号
        id:'',//	string员工id
        idNum:'',//	string证件号
        personName:'',//	string员工姓名
        phone:'',//	string手机号
        remark:'',//	string备注  
      },
      rules: {
        personName: [
          { required: true, message: '请输入住户姓名', trigger: 'blur' },
        ],
        phone: [
          { validator: validatePhone,trigger: 'blur' }
        ],
     
      },
      imageUrl: '',
      addPop:true,
      groupName:'',//添加设备分组
      startTime:null,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: []
      }],
      value:true,//启用状态开关
      data: [],//权限树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      addPopVisible:false,//添加房屋
      uploadData:{
        appId:''
      },
      images:[],
      imgurl:'',
      cascaderData:[],//房屋树形结构
      groupProps: {
        children:'groups',
        label:'name',
        value:'id',
        expandTrigger: 'hover'
      },
      addHouseForm:{
        effectiveTimeStr:'',//有效期
        liveStatus:1,//居住状态
        personSubtype:'',//住户身份
        deviceGroupId:'',//房号id
        type:1,//类型;1添加2修改3删除
       
      },
      popRules: {
        effectiveTimeStr: [
          { required: true, message: '请选择有效期', trigger: 'change' },
        ],
        personSubtype: [
          { required: true, message: '请选择住户身份', trigger: 'change' },
        ],
        deviceGroupId: [
          { required: true, message: '请选择房屋', trigger: 'change' },
        ],  
      },
      pickerOptions: {//时间快捷键
        disabledDate(time) {
          return time.getTime() <= (Date.now()-(24 * 60 * 60 * 1000));
        },
        shortcuts: [{
          text: '一个月',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24*30);
            picker.$emit('pick', date);
          }
        }, {
          text: '半年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24*183);
            picker.$emit('pick', date);
          }
        }, {
          text: '一年',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
            picker.$emit('pick', date);
          }
        }, {
          text: '永久',
          onClick(picker) {
            const date = new Date();
            let month =date.getMonth()+1;
            let ri=date.getDate();
            if(month<10){
              month='0'+month
            }
            if(ri<10){
              ri='0'+ri
            }
            // date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
            picker.$emit('pick', '9999-'+month+'-'+ri+' '+'00:'+'00:'+'00');
          }
        }]
      },
      personType:[{
        value: 1,
        label: '户主'
      },{
        value: 2,
        label: '家庭成员'
      },{
        value: 3,
        label: '租客'
      },{
        value: 5,
        label: '其他'
      }],
      isEdit:true,//添加还是修改
      currentIndex:0,//修改表格的index
      deleteArr:[],//删除人员的数组
      editOrAdd:'添加',
      isRequst:false,
      
    }
  },
  computed: {
    appId:{
      get(){
        return this.$store.state.project.projectId
      },
      set(v){
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch:{
    appId(newFlag, oldFlag){
      this.appId=newFlag;
      this.addPersonForm.appId=newFlag;
      this.uploadData.appId=newFlag;
      this.getLeftData();
      // this.uploadData.appId=newFlag;
      // this.getGroup();
      // this.getBuildingUnit();
    }
  },
  filters: {
    clTime: function(time) {
      return time.split(" ")[0];
    }
  },
  created() {
    this.imgurl = this.tools.global.API_URL;
  },
  mounted() {
    this.addPersonForm.appId=this.appId;
    this.uploadData.appId=this.appId;
    this.getLeftData();
    if(this.$route.query.type==2){//编辑
      this.addPersonForm=JSON.parse(this.utils.getStore('ownerMsg'));
      this.editOrAdd='更新';
      if(this.addPersonForm.faceUrl){
        this.images=this.addPersonForm.faceUrl.split(',')
      }
     
    }
  },
  methods: {
    //上传之前
    beforeAvatarUpload(file){
      let types = ['image/jpeg', 'image/jpg', 'image/png','image/bmp'];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 5;
      console.log(file.size)
      if (!isImage) {
        this.$message.error('格式不支持');
        return false
      }
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 5MB!');
        return false
      }
    },
    //上传成功
    successCheck(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        
          if (this.images.length < 1) {
              // this.images.push({
              //     furl: response.data[0],
              // })
              response.data.forEach((item,index)=>{
                this.images.push(item)
              })
          } else {
              this.utils.tip("warning", '文件个数超出');
          }
      } else {
          this.utils.tip("warning", response.msg);
      }
  },
  uploadErr(err, file, fileList){
    this.$message.error('上传失败');
  },
  //删除图片
  remove(index) {
      this.images.splice(index, 1);
  },
  //添加
  addPersonBtn(fromMsg){
    console.log(this.addPersonForm)
    this.$refs[fromMsg].validate((valid) => {
      if(valid){
        this.isRequst=true;
        this.addPersonForm.faceUrl=this.images.join();
        this.addPersonForm.houseList=this.addPersonForm.houseList.concat(this.deleteArr)
        this.utils.http({
          url: "/person/saveHousehold",
          method: "POST",
          data: this.addPersonForm
        },
        res => {
          this.isRequst=false;
          console.log(res);
          if(res.code=='200'){
            this.$router.push({
              path:'/ownermanage'
            })
          }
        });  
      }
    })
  },
  //添加住户人
  addPopPerson(fromMsg){
    this.$refs[fromMsg].validate((valid) => {
      if(valid){
        if(this.isEdit){//编辑
          if(this.addHouseForm.id){
            this.addHouseForm.type=2;
          }
          this.addPersonForm.houseList[this.currentIndex]=this.addHouseForm;
          this.addPopVisible=false;
        }else{//添加
          if(this.addPersonForm.houseList){
            this.addPersonForm.houseList.push(this.addHouseForm)
          }else{
            this.addPersonForm.houseList=[];
            this.addPersonForm.houseList.push(this.addHouseForm)
          }
          
          this.addPopVisible=false;
          
        }
        this.addHouseForm={
            effectiveTimeStr:'',//有效期
            liveStatus:1,//居住状态
            personSubtype:'',//住户身份
            deviceGroupId:'',//房号id
            type:1,//类型;1添加2修改3删除
          }        
      }
    })
  },
  closePop(){
    this.$nextTick(()=>{
      this.$refs.addHouseForm.clearValidate()
    })
    this.addHouseForm={
      effectiveTimeStr:'',//有效期
      liveStatus:1,//居住状态
      personSubtype:'',//住户身份
      deviceGroupId:'',//房号id
      type:1,//类型;1添加2修改3删除
    }
  },
  //房屋下拉选择改变
  cascaderChange(e){
    this.addHouseForm.deviceGroupId=e[e.length-1];
    let labels=this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels;
    let labelsVal=''
    labels.forEach((item)=>{
      labelsVal+=item;
    })
    this.addHouseForm.houseAddress=labelsVal;
  },

  //获取房屋下拉
  getLeftData(){   
    this.cascaderData=[];  
    this.utils.http({
      url: "/base/house/list",
      method: "GET",
      params: {appId:this.appId}
    },
    res => {
      if(res.code==200&&res.data.groups){
        this.cascaderData=res.data.groups;
      }
      
    });  
  },
  //add表格
  addBtn(){
    this.isEdit=false;
    this.addPopVisible=true;
  },
  //编辑表格
  gotoEdit(index){
    this.isEdit=true;
    this.currentIndex=index;
    this.addHouseForm=JSON.parse(JSON.stringify(this.addPersonForm.houseList[index]));
    // if(!this.addHouseForm.deviceGroupIdAll){
    //   this.addHouseForm.deviceGroupIdAll=[this.addHouseForm.buildingId,this.addHouseForm.unitId,this.addHouseForm.deviceGroupId]
    // }
    // this.addHouseForm.deviceGroupIdAll=this.addHouseForm.deviceGroupId
    console.log(this.addHouseForm);
    this.addPopVisible=true;
  },
  //删除表格
  clickDel(index,row){
    this.$confirm("您确信删除此房屋信息?", "确认", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(() => {
      if(row.id){
        row.type=3;
        this.deleteArr.push(row);
      }
      this.addPersonForm.houseList.splice(index,1)
    })
    .catch(() => {
      
    });
    
  },
  //返回
  goBack() {
    this.$router.push({
      path: '/ownermanage',
    })
  },
    changeType() {

    },
    changeTime(e){console.log(e)},
    handleCheckedCitiesChange(e) {
      console.log(e)
    }
  },
}