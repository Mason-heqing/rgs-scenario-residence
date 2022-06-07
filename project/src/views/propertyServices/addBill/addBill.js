import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      rules: {
        billName: [
          { required: true, message: '请输入账单名称', trigger: 'blur' },
        ],
        houseId: [
          { required: true, message: '请选择户室', trigger: 'change' },
        ],
      },
      addForm:{
        appId:'',//
        houseName:'',//名称
        houseId:'',//发送户室
        billImage:'',//图片
        billName:'',//账单名称
      },
      cascaderData:[],
      groupProps: {
        children:'groups',
        label:'name',
        value:'id',
        expandTrigger: 'hover'
      },
      images:[],
      imgurl:'',//
      uploadData:{
        appId:'',//
      },
      billTip:false,
      isRequst:false,
      fileList:[],
      // imageList:[{name:'a.jpeg',url:'blob:http://192.168.1.122:8080/0b1ea1e4-7409-4c62-a42e-b9969dac4806'}],//上传的列表
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
      this.uploadData.appId=newFlag;
      this.addForm.appId=newFlag;
      this.getLeftData();
    }
  },
  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
  },
  components: {
    MsgBox,
    TableCmp
  },
  mounted() {
    this.addForm.appId=this.appId;
    this.uploadData.appId=this.appId;
    this.getLeftData();

  },
  methods: {
    open() {
      var timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(timer)
      }, 3000)
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },
    //保存
    addBill1(fromMsg){
      if(this.images.length!=0){
        this.addForm.billImage=this.images.join(',');
      }else{
        this.addForm.billImage=''
      }
      this.billTip=false;
      this.$refs[fromMsg].validate((valid) => {
        if(valid&&this.images.length!=0){
          this.isRequst=true;
          this.utils.http({
            url: '/property/bill/insert',
            method: "POST",
            data:this.addForm
          }, res => {
            this.isRequst=false;
            if(res.code==200){
              this.$router.push({
                path:'/propertybill'
              })
            }        
          })
        }else if(!this.addForm.billImage){
          this.billTip=true;
          return
        }
      })   
    },

    //获取房屋下拉
    getLeftData(){        
      this.utils.http({
        url: "/base/house/list",
        method: "GET",
        params: {appId:this.appId}
      },
      res => {
        if(res.code==200&&res.data){
          this.cascaderData=res.data.groups;
        }      
      });  
    },
    cascaderChange(e){
      if(e){
        this.addForm.houseId=e[e.length-1]
      }
    },
    //上传之前
    beforeAvatarUpload(file){
      let types = ['image/jpeg', 'image/jpg', 'image/png','image/bmp'];//,'application/pdf'
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 5;
      // console.log(file.size)
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
      console.log(fileList);
      if (response.code == 200) {
          if (this.images.length < 5) {
            response.data.forEach((item,index)=>{
              this.images.push(item)
            })
          } else {
              this.utils.tip("warning", '文件个数超出');
          }
      } else {
          this.utils.tip("warning", response.msg);
      }
      console.log(this.addForm.billImage)
  },
  exceed(){
    this.$message.error('附件个数不能超过5个');
  },
    //删除图片
    handleRemove(file, fileList) {
      let deleteimg=file.response.data[0];
      let deleteIndex=this.images.indexOf(deleteimg);
      this.images.splice(deleteIndex,1)
    },
    remove(index) {
        this.images.splice(index, 1);
    },
    goBack() {
      this.$router.push({
        path: '/propertybill',
      })
    },
  },
}