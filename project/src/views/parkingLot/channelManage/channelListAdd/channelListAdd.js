import ligature from '../../../../utils/ligature.js';
export default {
  name: 'home',
  data() {
    return {
      msg: '渠道添加',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
        id:''
      },

      addPop:true,
      startTime:null,

      addForm:{
        name: '',//名称
        content: '',//内容
        id:''
      },
      payChannelListData:[],
      howText:'',
      isRequst:false
    }
  },
  watch: {

  },
  filters: {

  },
  created() {
  },
  mounted() {
    if(this.$route.query.type==2){//编辑
      this.addForm=JSON.parse(this.utils.getStore('channelData'));
      this.addForm.name=JSON.parse(this.utils.getStore('channelData')).name.toString();
      this.addForm.content=JSON.parse(this.utils.getStore('channelData')).content.toString();
      this.addForm.id=JSON.parse(this.utils.getStore('channelData')).id.toString();
      this.howText='更新';
    }else{                                                                                       
      this.howText='添加';                                                                                        
    }
    //省市
    
   },
  methods: {
    //添加
    addBtn(fromMsg){
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.isRequst=true;
          this.utils.http({
            url: "/manage/pay/channel/config/update",
            method: "POST",
            data:this.addForm
          },
          res => {
            this.isRequst=false;    
            if(res.code==200){
              this.$router.push({
                path:'/channelList'
              })
            };
            
          });  
        }
      })
    },


    //返回
    goBack() {
      this.$router.push({
        path: '/channelList',
      })
    },
  },
}