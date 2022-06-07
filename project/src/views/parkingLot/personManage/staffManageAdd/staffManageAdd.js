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
        callback();
      }
    };
    return {
      msg: '项目管理',
      addPeople: {
        appId:'',
        personName: '',//名字
        deviceGroupList:[],//权限
        department:'',//部门
        idCard:'',//身份证号
        post:"",//岗位
        effectiveStatus:true,//有效状态,1为启用0为未启用
        faceUrl:'',//	string头像
        groupId:'',//	string所属部门
        icNum:'',//	stringIC卡号
        id:"",//	string员工id
        idNum:"",//	string证件号
        job:'',//	string岗位
        name:'',//	string员工姓名
        phone:"",//	string手机号
      },
      imgurl:'',
      rules: {
        personName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
        ],
        groupId: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
      },
      images:[],//存放图片
      uploadData:{
        appId:'',
      },
      groupData:[],//部门信息
      groupProps: {
        children:'groupList',
        label:'title',
        value:'id',
        checkStrictly:true,
        expandTrigger: 'hover'
      },
      groupType: [{ name: '第一个选项', id: '3' }, { name: '第二个选项', id: '1' }, { name: '第三个选项', id: '2' },],
      imageUrl: '',
      addPop:true,
      groupName:'',//添加设备分组
      startTime:null,
      options: [],
      value:true,//启用状态开关
      data: [],//通行权限的树
      defaultProps: {
        children: 'groupList',
        label: 'title',
        value:'id'
      },
      personId:'',//编辑时的人员id
      checkArr:[],//权限树选中的值
      editOrAdd:'添加',
      isRequst:false,
      
    }
  },
  // watch: {
  //   handlerValue() {
  //     if (this.$refs.refHandle) {
  //       this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
  //     }
  //   }
  // },

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
      this.addPeople.appId=newFlag;
      this.uploadData.appId=newFlag;
      this.getGroup();
      this.getBuildingUnit();
    }
  },
  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
    this.addPeople.appId=this.appId;
    this.uploadData.appId=this.appId;
  },
  mounted() {
    this.getGroup();
    
    if(this.$route.query.type==2){//编辑
      this.addPeople=JSON.parse(this.utils.getStore('staffMsg'));
      this.personId=this.addPeople.id;
      this.addPeople.deviceGroupList=this.addPeople.deviceGroupList;
      // if(this.addPeople.effectiveStatus==1){
      //   this.addPeople.effectiveStatus=true;
      // }else{
      //   this.addPeople.effectiveStatus=false;
      // }
      this.getBuildingUnit();
      this.editOrAdd='更新';
      if(this.addPeople.faceUrl){
        this.images=this.addPeople.faceUrl.split(',')
      } 
      
    }else{
      this.getBuildingUnit();
    }
  },
  methods: {
    elCascaderOnlick() {
      let that = this;
      setTimeout(function() {
        document.querySelectorAll(".el-cascader-node__label").forEach(el => {
          el.onclick = function() {
            this.previousElementSibling.click();
            that.$refs.elcascader.dropDownVisible = false;
          };
        });
        
        document.querySelectorAll(".el-cascader-panel .el-radio").forEach(el => {
          el.onclick = function() {
            that.$refs.elcascader.dropDownVisible = false;
          };
        });
          
      }, 100);
    },
    //person/group/queryResidenceBuildingUnit查询小区楼栋信息
    getBuildingUnit(){
      this.utils.http({
        url: "/person/group/queryResidenceBuildingUnit",
        method: "GET",
        params: {appId:this.appId,personId:this.personId}
      },
      res => {
        if(res.code==200){
          this.data=res.data;
          this.getCheckBuild(res.data)
        }
        
      });  
    },
    //获取选中有权限的房屋
    getCheckBuild(data){
      for(var i=0;i<data.length;i++){
        if(data[i].checkStatus){
          this.checkArr.push(data[i].id)
        }
        if(data[i].groupList){     
          this.getTreeData(data[i].groupList);
        }
      }
      console.log(this.checkArr)
    },
    //选中节点改变
    checkChange(){
      this.addPeople.deviceGroupList=this.$refs.tree.getCheckedKeys()
      console.log(this.addPeople.deviceGroupList)     
    },

    //添加添加或更新员工信息
    addBtn(fromMsg){
      // if(this.$route.query.type==1){
      //   this.addPeople.groupId=this.addPeople.groupId[this.addPeople.groupId.length-1]
      // }
      if(this.addPeople.effectiveStatus){
        this.addPeople.effectiveStatus='1';
      }else{
        this.addPeople.effectiveStatus='0';
      }
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.isRequst=true;
          this.addPeople.faceUrl=this.images.join();
          this.utils.http({
            url: "/person/group/addEmployee",
            method: "POST",
            data: this.addPeople
          },
          res => {
            console.log(res);
            this.isRequst=false;
            if(res.code=='200'){
              this.$router.push({
                path:'/staffmanage'
              })
            }
          });  
        }
      })
    },
    //点击tree
    handleNodeClick(data,Node,e) {
      this.selectGroup=data.label;
      console.log(data);
      console.log(Node);
      console.log(e);
    },
    
  //获取部门/person/group/queryPersonGroupVoList
  getGroup(){
    this.utils.http({
      url: "/person/group/queryPersonGroupVoList",
      method: "GET",
      params: {appId:this.appId}
    },
    res => {
      if(res.code==200){
        console.log(res.data);
        this.groupData=this.getTreeData(res.data);
      }
      
      // this.loading=false
    });  
  },
  // 递归判断列表，把最后的children设为undefined
  getTreeData(data){
    for(var i=0;i<data.length;i++){
      if(data[i].groupList.length<1){
        // children若为空数组，则将children设为undefined
        data[i].groupList=undefined;
      }else {
        // children若不为空数组，则继续 递归调用 本方法
        this.getTreeData(data[i].groupList);
      }
    }
    return data;
  },

  handleChange(e){
    this.addPeople.groupId=e[e.length-1]
  },
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
          this.$message.error(response.msg);
      }
  },
  uploadErr(err, file, fileList){
    this.$message.error('上传失败');
  },

  //返回
  goBack() {
    this.$router.push({
      path: '/staffmanage',
    })
  },
  //删除图片
  remove(index) {
      this.images.splice(index, 1);
  },
    changeType() {

    },
    changeTime(e){console.log(e)},
    handleCheckedCitiesChange(e) {
      console.log(e)
    }
  },
}