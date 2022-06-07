import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      rules: {
        dealSuggestion: [
          { required: true, message: '请输入处理意见', trigger: 'blur' },
        ],
      },
      complaintForm:{
        dealSuggestion:"",//处理意见   
      },
      dataForm:{},
      isRequst:false,
      imgurl:'',
      imgurlList:[],
    }
  },
  watch: {

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
    this.dataForm=JSON.parse(this.utils.getStore('complaintMsg'));
    if(this.dataForm.complainImageUrl){
      this.dataForm.complainImageUrl=this.dataForm.complainImageUrl.split(',')
      this.dataForm.complainImageUrl.forEach((item,index)=>{
        this.imgurlList.push(this.imgurl+'/file/download?path='+item);
      })
    }else{
      this.dataForm.complainImageUrl=[];
    }
  },
  methods: {
    addComplaint(fromMsg) {
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.isRequst=true;
          this.utils.http({
            url: "/property/complaint/handleOption/"+this.dataForm.id,
            method: "POST",
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
            data:this.utils.changeJson(this.complaintForm)
          }, res => {
            this.isRequst=false;
            if(res.code==200){
              this.$router.push({
                path:'/complaint'
              })
            }
            
          })         
        }
      })
    },
    //取消
    cancel(){
      this.$router.push({
        path:'/complaint'
      })
    },
  },
}