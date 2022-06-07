import MsgBox from '../../../components/dialog.vue'
import FromDialog from '../../../components/fromDialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      popVisible:false,//提示弹框是否显示信息弹框
      popTitle:'提示',
      popContent:'请填写批量增加的内容',
      fromPopVisible:false,//表单弹框是否显示
      fromPopTitle:'这个是标题',
      fromPopContent:'这个是内容',
      popValue:'',
      total: 0,
      timer:null,
      multipleSelection: [],//表格选中
      data: [],
      defaultProps: {
        children: 'groups',
        label: 'name',
        value:'id'
      },

      tableData: [],
      tableLabel: [    
        { label: '人脸', param: 'img', align: 'center', sortable: true ,isimg:true,isshow:true},
        { label: '姓名', param: 'personName', align: 'center', sortable: true ,isshow:true},
        { label: '联系方式', param: 'phone', align: 'center', sortable: true ,isshow:true},
        { label: '住户类型', param: 'personSubtype', align: 'center', sortable: true ,isshow:true,render: (row) =>{
            if (row.personSubtype == 1) {
              return '户主'
            } else if (row.personSubtype == 2) {
              return '家庭成员'
            } else if (row.personSubtype == 3) {
              return '租客'
            } else if (row.personSubtype == 4) {
              return '物业员工'
            }
        }},
        { label: 'IC卡', param: 'icNum', align: 'center', sortable: true ,isshow:true},
        // {
        //   label: '审核状态', param: 'status', align: 'center', sortable: true, render: (row) => {
        //     if (row.status === 0) {
        //       return '未审核'
        //     } else if (row.status === 1) {
        //       return '审核通过'
        //     } else if (row.status === 2) {
        //       return '审核不通过'
        //     } else {
        //       return '禁用'
        //     }
        //   }
        // },
        // { slot: 'operate',isshow:true }, // 操作列
      ],
      tableOption:[],
      tableSelect: [],
       
      activeName: 'first',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      addIndex:1,//批量增加第一步
      allAddPopVisible:false,//批量增加楼栋
      numArr:[],//1-99
      addNum:{
        num1:'',
        num2:'',
        num3:'',
        num4:'',
      },
      rules:{
        num1: [
          { required: true, message: '请输入员工姓名', trigger: 'change' },
        ],
        num2: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
      },
      hourseName:[],//楼栋名称
      cellNum:[],//单元数
      stepNum:[],//楼层数
      familyNum:[],//每层户数
      addType:1,//增加的类型
      groupVal:'',
      addForm:{
        appId:'',//
        deviceGroupId:'',//
        groups:[],
        userId:'',
      },
      subLength:0,
      level:1,
      houseInfo:[],//右侧房屋信息
      tiresList:[],//点击单元是返回的分页信息
      currentIndex:1,
      loading:true,
      personFrom:{
        deviceGroupId:'',//
        page:1,
        pageSize:10,
      },
      personId:'',//获取住户列表时的id
      total1:1,//住户列表的分页
      editForm:{//修改房屋名字的信息
        appId:'',
        id:'',
        name:'',
      },
      isShowSelect:false,//表哥隐藏select选择框
      isRequst:false,
      houseCount:0,//该小区房间数
      checkedList:[],//选中的树
      loading1:false
    }
  },
  filters: {

  },
  created() {
    for (let i = 0; i < this.tableLabel.length; i++) {
      if(this.tableLabel[i].label){
        this.tableOption.push(this.tableLabel[i].label)
      }
      if(this.tableLabel[i].isshow){
        this.tableSelect.push(this.tableLabel[i].label)
      }
    }

    //批量添加是1-99
    for(let i = 1; i <100;i++){
      this.numArr.push(i)
    }
  },
  components:{
    MsgBox,
    FromDialog,
    TableCmp
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
      this.addForm.appId=this.appId;
      this.editForm.appId=newFlag;
      this.getLeftData()
      // this.getGroup();
      // this.getTableData()
    }
  },
  mounted() {
    if(this.appId){
      this.addForm.appId=this.appId;
      this.editForm.appId=this.appId;
      this.getLeftData()
    }
  },
  methods: {
    checkboxChange(e){
      console.log(this.tableSelect)
        for (let j = 0; j < this.tableLabel.length; j++) {
          if(this.tableSelect.indexOf(this.tableLabel[j].label)>-1){
            this.tableLabel[j].isshow=true;
          }else{
            this.tableLabel[j].isshow=false;
          }
            
        }
      console.log(this.tableLabel)
    },
    //go增加页
    goAdd(){
      this.$router.push({
        path:'/staffmanageadd'
      })
    },

    // },
    open () {
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },

    handleNodeClick(data,Node,e) {
      this.selectGroup=data.label;
      console.log(data);
      console.log(Node);
      console.log(e);
    },

    deleteGroup(){},
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      console.log(val)
      // this.dataList.pageSize=val;
      // this.getData();
    },
    
    handleClick(tab, event) {
      console.log(tab, event);
    },

    fatherMethod(msg){
      alert(msg)
      this.fromPopVisible=false;
    },
    //根据添加查树
    getGroupByVal(){

    },


    //批量增加下一步
    addNext(){
      this.addNum.num1? this.addNum.num1=parseInt(this.addNum.num1):'';
      this.addNum.num2? this.addNum.num2=parseInt(this.addNum.num2):'';
      this.addNum.num3? this.addNum.num3=parseInt(this.addNum.num3):'';
      this.addNum.num4? this.addNum.num4=parseInt(this.addNum.num4):'';
      if((this.addNum.num1*this.addNum.num2*this.addNum.num3*this.addNum.num4+this.houseCount)<100000){
        if(this.addType==1){
          if(this.addNum.num1&&this.addNum.num2&&this.addNum.num3&&this.addNum.num4){
            this.addForm.groups=[];
            this.addIndex=2;
            //楼栋名称
            for(let i=1+this.subLength;i<this.addNum.num1+1+this.subLength;i++){
              var obj={};
              obj['buildingNum']=1;
              obj['name']=i+'栋';
              obj['unitNum']=this.addNum.num2;
              obj['tireNum']=this.addNum.num3;
              obj['houseNum']=this.addNum.num4;
              this.addForm.groups.push(obj)
            }
          }else{
            this.popVisible=true;
            this.open();
          }
        }else if(this.addType==2){
          if(this.addNum.num2&&this.addNum.num3&&this.addNum.num4){
            this.addForm.groups=[];
            this.addIndex=2;
            //楼栋名称
            for(let i=1+this.subLength;i<this.addNum.num2+1+this.subLength;i++){
              var obj={};
              obj['buildingNum']='';
              obj['name']=i+'单元';
              obj['unitNum']=1;
              obj['tireNum']=this.addNum.num3;
              obj['houseNum']=this.addNum.num4;
              this.addForm.groups.push(obj)
            }
          }else{
            this.popVisible=true;
            this.open();
          }
        }else if(this.addType==3){
          if(this.addNum.num3&&this.addNum.num4){
            this.addForm.groups=[];
            this.addIndex=2;
            //楼栋名称
            for(let i=1+this.subLength;i<this.addNum.num3+1+this.subLength;i++){
              var obj={};
              obj['buildingNum']='';
              obj['name']=i+'层';
              obj['unitNum']='';
              obj['tireNum']=1;
              obj['houseNum']=this.addNum.num4;
              this.addForm.groups.push(obj)
            }
          }else{
            this.popVisible=true;
            this.open();
          }
        }
      }else{
        this.utils.tip('warning','增加的房间总数不得超过10万');
      }
      
      
     
      
      
     
    },
    // 批量添加确认
    addSure(){     
        let isNull=true;
        this.addForm.groups.forEach((item,index)=>{
          if(!item.name){
            isNull=false;
          }
        })
        if(isNull){
          this.addRequest()
        }else{
          this.popVisible=true;
          this.open();
        }
    },
    //批量添加确认接口
    addRequest(){
      this.isRequst=true;
      this.utils.http({
        url: "/base/house/batchCreateHouse",
        method: "POST",
        isAdd:true,
        data: this.addForm
      },
      res => {
        this.isRequst=false;
        if(res.code==200){
          this.getLeftData();
          this.allAddPopVisible=false;
          this.addForm.groups=[];
          this.addIndex=1;
          this.addNum.num1='';
          this.addNum.num2='';
          this.addNum.num3='';
          this.addNum.num4='';
        }
        
      });  
    },
    //关闭弹框
    closePop(){
      this.addForm.groups=[];
      this.addIndex=1;
      this.addNum.num1='';
      this.addNum.num2='';
      this.addNum.num3='';
      this.addNum.num4='';
    },
    //获取左侧树
    getLeftData(){   
      this.loading1=true;
      this.data=[];  
      this.utils.http({
        url: "/base/house/list",
        method: "GET",
        params: {appId:this.appId}
      },
      res => {
        this.loading1=false;
        if(res.code==200){
          this.houseCount=res.data.houseCount;
          this.data.push(res.data);
          if(res.data.id){
            this.getSubList(res.data.id,1)
          }
        }     
      });  
    },

    //点击增加按钮
    addOne(id,aid,type,subLength){
      this.addType=type;
      this.addForm.deviceGroupId=aid
      this.allAddPopVisible=true;
      this.subLength=subLength;
    },
    //点击修改按钮
    editOne(e,id,type,name){
      this.fromPopTitle='修改名称';
      this.popValue=name;
      this.fromPopVisible=true;
      this.editForm.id=id;
    },
    //修改房屋信息名称
    dialogAdd(){
      this.editForm.name=this.$refs.addGialog.inputVal;
      this.utils.http({
        url: "/base/house/rename",
        method: "POST",
        params: this.editForm
      },
      res => {
        
        if(res.code='200'){
          this.$refs.addGialog.inputVal="";
         this.fromPopVisible=false;
          this.getLeftData();
          this.utils.tip('success','修改成功');
        }
      }); 
    },
    //点击删除按钮
    deleteOne(e,id){
      this.$confirm("您确信删除当前房屋信息?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         this.deleteRequest(id)
        })
        .catch(() => {
          
        });
    },
    //删除楼栋接口
    deleteRequest(id){
      this.utils.http({
        url: "/base/house/delete",
        method: "POST",
        headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
        data:this.utils.changeJson({deviceGroupId:id,appId:this.appId})
      },
      res => {
        if(res.code='200'){
          this.getLeftData();
          this.utils.tip('success','删除成功');
        }
      }); 
    },

    //获取房屋信息
    getSubList(id,level){
      this.$nextTick(()=>{
        this.$refs.tree.setCurrentKey(id);
      })
      this.loading=true;
      this.level=level;
      this.utils.http({
        url: "/base/house/info",
        method: "GET",
        params: {deviceGroupId:id}
      },
      res => {
        this.loading=false;
        if(res.code==200){
          this.houseInfo=res.data.houseInfos;
          if(level==3){
            this.total=res.data.tires.length;
            this.tiresList=res.data.tires;
          }
        }     
      });
    },
    //点击楼层
    clickLevel(idx,id){
      this.currentIndex=idx;
      this.value=id
      this.getSubList2(id)
    },
    //楼层改变
    LevelChange(id){
      this.getSubList2(id);
      if (id) {
        let obj = {}
        obj = this.tiresList.find(item => {
          //这里的operateOption就是上面遍历的数据源
          return item.id ==id //筛选出匹配数据
        })
        console.log(obj)
        this.currentIndex=obj.idx
      }
    },
    handleCurrentChange(e) {
      var id=this.tiresList[e-1].id
      this.value=id
      this.getSubList2(id)
    },
    getSubList2(id){
      this.loading=true;
      this.utils.http({
        url: "/base/house/houseInfo",
        method: "GET",
        params: {deviceGroupId:id}
      },
      res => {
        this.loading=false;
        if(res.code==200){
          this.houseInfo=res.data;
        }
        
      });
    },
    ///base/house/personPage分页房屋下住户信息
    getPersonData(id,level){
      this.$refs.tree.setCurrentKey(id)
      this.personId=id;
      this.level=level;
      this.loading=true;
      this.personFrom.deviceGroupId=id;
      this.utils.http({
        url: "/base/house/personPage",
        method: "GET",
        params: this.personFrom
      },
      res => {
        this.loading=false;
        if(res.code==200){
          this.total1=res.data.total;
          this.tableData=res.data.records;
        }
        
      });
    },
    handleSizeChange1(e){
      this.personFrom.pageSize=e;
      this.getPersonData(this.personId,5)
    },
    handleCurrentChange1(e){
      this.personFrom.page=e;
      this.getPersonData(this.personId,5)
    },
    
  },
}