
import ligature from '../../../../utils/ligature.js';
export default {
  name: 'home',
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'));
        }else if(value.toString().length < 3 || value.toString().length > 128){
            callback(new Error('密码长度为3 - 128个字符'))
        } else {
          if (this.userInfo.checkPass !== '') {
            this.$refs.userInfo.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userInfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
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
        userInfo:{
            userName :'',         
            password:'L@01niceTabu',
            checkPass:'L@01niceTabu',
            mobile:'',
            email:'',
            isUpdatePassword:"",
            file:null,
            isDelete:0,
        },
        account:'',
        resetPass:'L@01niceTabu',
        loading:false,
        rules: {
            userName: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            password: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            mobile: [
                { validator: validatePhone, trigger: 'blur' }
            ],
          },
          imageUrl:'',
        //   isRequst:false,
          imgurl:''
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
      this.deviceForm.appId=newFlag;
      this.dataForm.appId=newFlag
      this.getDevice();
      this.getTableData()
    }
  },
  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
    this.getuserInfo();
    this.imageUrl=this.imgurl+ '/user/photo';
  },
  components: {
    
  },
  mounted() {
    
  },
  methods: {
    //获取用户信息
    getuserInfo(){
        this.utils.http({
          url: "/user/userInfo",
          method: "GET",
          params: {}
        },
        res => {
          if(res.code==200){
            this.account=res.data.userNo;
            this.userInfo.email=res.data.email;
            this.userInfo.mobile=res.data.mobile;
            this.userInfo.userName=res.data.userName;
          }       
        });  
      },

    selectChange(file){
        this.userInfo.isDelete=1;
        this.imageUrl=file.url
        this.userInfo.file = file.raw;
    },
    deleteImg(){
        this.userInfo.isDelete=1;
        this.imageUrl='';
        this.userInfo.file = null;
    },
      editUser(fromMsg){
        this.$refs[fromMsg].validate((valid) => {
            if(valid){
                if(this.userInfo.password==this.resetPass){
                    this.userInfo.isUpdatePassword='0';
                }else{
                    this.userInfo.isUpdatePassword='1';
                }
                var formData =new FormData()
                for(let i  in this.userInfo){
                    formData.append(i,this.userInfo[i])
                }
                // this.$refs.upload.submit();
                // this.isRequst=true;
                this.utils.http({
                    url: '/user/update',
                    method: "POST",
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
                    // data:this.utils.changeJson(this.userInfo)
                    data:formData
                  }, res => {
                    console.log(res)  
                    if(res.code==200){
                        ligature.$emit('headImg')
                        this.$router.go(-1);//返回上一层
                    }
                  })

            }
        })
      },
     //复位
     reset(){
      this.$router.go(0)
     },
  },
}