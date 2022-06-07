import echarts from 'echarts'
import position from '../../../utils/position.js';
import ligature from '../../../utils/ligature.js';
import newPageSelect from '../../../components/newPageSelect.vue';
export default {
  name: 'home',
  data() {
    return {
      msg: '项目管理',
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        provId: [
          { required: true, message: '请选择省份', trigger: 'change' },
        ],
        cityId: [
          { required: true, message: '请选择城市', trigger: 'change' },
        ],
        areaId: [
          { required: true, message: '请选择区', trigger: 'change' },
        ],
      },
      
      imageUrl: '',
      addPop:true,
      groupName:'',//添加设备分组
      startTime:null,

      addForm:{
        name: '',//项目名称
        callbackUrl: '',//回调
        properties: '',//属性
        country: '',//国家
        prov: '',//省份
        provId:'',
        city: '',//城市
        cityId:'',
        area:'',//区
        areaId:'',
        address: '',//详细地址
        faceRecogRetainDays: 30,//识别保留天数
        remark: '',//备注
        status: true,//是否启用
        usageScenario:'5',//小区
        openId:'',//车场Id
        openName:'',//车场名称
        openSecret:'',

      },
      countryOption: [{ name: '中国', id: '中国' }, { name: '海外', id: '海外' }],
      faceRecogRetainDaysOption:[{ name: '一个月', id: 30 }, { name: '三个月', id: 90 }, { name: '六个月', id: 180 }, { name: '一年', id: 365 }],
      howText:'',
      isChina:true,
      position:[],
      prov:[],//省市数据
      city:[],//城市
      area:[],//区
      isRequst:false,

      //父实例下拉框的数据
      entityPageInfo:{
        pageNum:1,
        pageSize:10,
        total:0,
        param:{
          classId: '',
          classVersionId: ''
        },
      },
      //复制值
      copyValue:this.value,
      //父实例下拉框的数据
      entityDataTable:[]
    }
  },
  props:{
    value:String,
    classId:String,
    classVersionId:String
  },
  watch: {
    appId(newFlag){
      this.appId=newFlag;
    },
    copyValue:{
      handler (newV, oldV) {
        this.$emit('update:value',this.copyValue);
      },
      deep:true
    }
  },
  filters: {

  },
  created() {
    
    this.position=position;
   this.getProv()
  },
  components:{
    appId:{
      get(){
        return this.$store.state.project.projectId
      },
      set(v){
        this.$store.commit('changeProjectId', v)
      }
    },
    newPageSelect
  },
  mounted() {
    if(this.$route.query.type==2){//编辑
      this.addForm=JSON.parse(this.utils.getStore('thisData'));
      this.addForm.provId=JSON.parse(this.utils.getStore('thisData')).provId.toString();
      this.addForm.cityId=JSON.parse(this.utils.getStore('thisData')).cityId.toString();
      this.addForm.areaId=JSON.parse(this.utils.getStore('thisData')).areaId.toString();
      this.howText='更新';
      if(this.addForm.status==2){
        this.addForm.status=true;
      }else{
        this.addForm.status=false;
      } 
      if(this.addForm.provId){
        this.getProv(this.addForm.provId,1)
      }
      if(this.addForm.cityId){
        this.getProv(this.addForm.cityId,2)
      }

      
    }else{
      this.howText='添加';
    }
    //省市

    this.entityPageSearch();
    
   },
  methods: {

    //父实例翻页
    parentEntityPageChange(val){
      this.selectPageInfo.pageNum=val;
      this.selectPageSearch();
    },
    //父实例查询
    entityPageSearch(e){
      if(e == undefined){
        e = 1;
      }
      if (this.classId){
        this.entityPageInfo.param.classId=this.classId;
      }
      if (this.classVersionId){
        this.entityPageInfo.param.classVersionId=this.classVersionId;
      }
      this.utils.http({
        url: "/app/user/parkPage",
        method: "POST",
        data:{
          name:'',
          userId:'',
          page:e,
          pageSize:10
        }
      },
      res => {
        this.isRequst=false;    
        if(res.code==200){
          this.entityDataTable=res.data.records;
          this.entityPageInfo.total=parseInt(res.data.total);
        }else{
          this.$message.error(res.msg);
        }
      });  
      // this.$post('/app/user/parkPage',this.entityPageInfo).then(res=>{
      //   if (res.code==200) {
      //     this.entityDataTable=res.data.result;
      //     this.entityPageInfo.param.total=parseInt(res.data.totalRecord);
      //   }else {
      //     this.$message.error(res.msg);
      //   }
      // });
    },


    //添加
    addBtn(fromMsg){
      let appSecret = this.$store.state.parking.appSecret;
      let parkingId = this.$store.state.parking.parkingId;
      let parkingName = this.$store.state.parking.parkingName;
      if(this.addForm.status){
        this.addForm.status='2';
      }else{
        this.addForm.status='1';
      }
      if(appSecret == this.copyValue){
        appSecret = '';
        parkingId = '';
        parkingName = '';
      }
      this.addForm.openSecret = appSecret;
      this.addForm.openId = parkingId;
      this.addForm.openName = parkingName;
      this.$refs[fromMsg].validate((valid) => {
        if(valid){
          this.isRequst=true;
          this.utils.http({
            url: "/app/user/update",
            method: "POST",
            data:this.addForm
          },
          res => {
            this.isRequst=false;    
            if(res.code==200){
              ligature.$emit("addProject",true);
              this.$router.push({
                path:'/projectmanage'
              })
            };
            
          });  
        }
      })
    },
    //获取省份/area/areas
    getProv(id,type){
      var areaId
      id? areaId=id:'';
      this.utils.http({
        url: "/area/areas",
        method: "GET",
        params:{id:areaId}
      }, res => {
        if(type==1){
          this.city=res.data;
        }else if(type==2){
          this.area=res.data;
        }else{
          this.prov=res.data;
        }
        
      })
    },

    //省份改变
    changeProv(e){
      let obj = {};
      obj = this.prov.find((item)=>{
        return item.id == e;
      });
      this.addForm.prov=obj.name;
      this.getProv(e,1);
      this.addForm.cityId='';
      this.addForm.areaId='';
    },
    //城市改变
    changeCity(e){
      let obj = {};
      obj = this.city.find((item)=>{
        return item.id == e;
      });
      this.addForm.city=obj.name;
      this.getProv(e,2)
      this.addForm.areaId='';
    },
    //区改变
    changeArea(e){
      let obj = {};
      obj = this.area.find((item)=>{
        return item.id === e;
      });
      this.addForm.area=obj.name;
    },
    //返回
    goBack() {
      this.$router.push({
        path: '/projectmanage',
      })
    },
  },
}