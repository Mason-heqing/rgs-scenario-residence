import MsgBox from '../../../components/dialog.vue'
import FromDialog from '../../../components/fromDialog.vue'
import TableCmp from '../../../components/table.vue'
import { set } from 'js-cookie'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      popVisible:false,//提示弹框是否显示信息弹框
      popTitle:'提示',
      popContent:'请填写内容',
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
        value:'id',
        isLeaf:'leaf'
      },

      tableData: [],
      tableLabel: [    
        { label: '人脸', param: 'personUrl', align: 'center', sortable: true ,isimg:true,isshow:true},
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
      ],
      tableOption:[],
      tableSelect: [],
      value: '',//楼层分页
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
      loading1:false,
      builddingMsg:[],
      node_had:null,
      resolve_had:null,
      oneResolve:null,
      oneNode:null,
      isreload:true,
      currentTiresId:'',//给楼层添加房间的楼层id
      addTiresName:'',
      addTiresHousePop:false,//弹框
      isAddTiresHouse:false,//是否在单独添加房屋
      editPop:false,
      editValue:'',
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
    //获取小区
    // this.getBuilding();
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
      // this.getLeftData()
      // this.getBuilding();
      this.isreload=false;
      setTimeout(()=>{
        this.isreload=true;
      },100)
      // this.getGroup();
      // this.getTableData()
    },
    
  },
  mounted() {
    if(this.appId){
      this.addForm.appId=this.appId;
      this.editForm.appId=this.appId;
      // this.getBuilding();
    }
     
    
    
  },
  methods: {
    //后去小区信息
    getBuilding(resolve){
      this.utils.http({
        url: "/base/house/buildingsTree",
        method: "POST",
        headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
        data:this.utils.changeJson({appId:this.appId})
      },
      res => {
        if(res.code==200&&res.data){
          this.houseCount=res.data[0].houseCount;
          this.builddingMsg=res.data;
          if(res.data.length>0){
            this.getSubList(res.data[0].id,1)
          }
          setTimeout(()=>{
            if(this.oneNode){
              let nodedata = this.oneNode.childNodes[0];
              nodedata.expanded = true;
              nodedata.loadData();
            } 
          })
          return resolve(this.builddingMsg); 
        }      
      });  
    },
    getBuildingKid(resolve,id){
      this.utils.http({
        url: "/base/house/buildingsTree",
        method: "POST",
        headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
        data:this.utils.changeJson({appId:this.appId,deviceGroupId:id})
      },
      res => {
        if(res.code==200&&res.data){
          if(res.data.length>0&&res.data[0].level==5){
            res.data.forEach((item,index)=>{
              item.leaf=true;
            })
          } 
          resolve(res.data); 
        }      
      });  
    },
    loadNode(node, resolve) {  
      if (node.level === 0) {
        this.oneNode=node;
        this.oneResolve = resolve;    
        this.getBuilding(resolve)    
      }else{
        this.getBuildingKid(resolve,node.data.id)
      }
    },





    checkboxChange(e){
      // console.log(this.tableSelect)
        for (let j = 0; j < this.tableLabel.length; j++) {
          if(this.tableSelect.indexOf(this.tableLabel[j].label)>-1){
            this.tableLabel[j].isshow=true;
          }else{
            this.tableLabel[j].isshow=false;
          }
            
        }
      // console.log(this.tableLabel)
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
      // console.log(data);
      // console.log(Node);
      // console.log(e);
    },

    deleteGroup(){},
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      // console.log(val)
      // this.dataList.pageSize=val;
      // this.getData();
    },
    
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    fatherMethod(msg){
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
          // this.getLeftData();
          this.isreload=false;
          setTimeout(()=>{
            this.isreload=true;
          },100)
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
    //单独为某一层增加房屋
    addLevelHouse(){
      let obj={
        appId:this.appId,
        deviceGroupId:this.currentTiresId,
        groups:{
          buildingNum: 0,
          houseNum:1,
          name:this.addTiresName,
          tireNum: 0,
          unitNum: 0
        }
      };
      if(this.addTiresName){
        this.isAddTiresHouse=true;
        this.utils.http({
          url: "/base/house/batchCreateHouse",
          method: "POST",
          data:obj
        },res => {
          this.isAddTiresHouse=false;
          if(res.code==200){
            this.addTiresHousePop=false;
            this.addTiresName='';
            this.isreload=false;
            setTimeout(()=>{
              this.isreload=true;
            },100)
          }
        })
      }else{
        this.popVisible=true;
        this.open();
      }
      
    
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
      this.editForm.name=name;
      this.editForm.id=id;
      this.editPop=true;
    },
    //修改房屋信息名称
    dialogAdd(){
      if(this.editForm.name){
        this.utils.http({
          url: "/base/house/rename",
          method: "POST",
          params: this.editForm
        },
        res => {  
          if(res.code==200){
           this.editPop=false;
            this.isreload=false;
            setTimeout(()=>{
              this.isreload=true;
            },100)
            this.utils.tip('success','修改成功');
          }
        }); 
      }else{
        this.popVisible=true;
        this.open();
      }
      
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
        if(res.code==200){
          this.isreload=false;
          setTimeout(()=>{
            this.isreload=true;
          },100)
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
          if(level==3){//有分页楼层
            this.currentIndex=1;
            this.value='';
            this.total=res.data.tires.length;
            this.tiresList=res.data.tires;
            this.currentTiresId=res.data.tires[0].id
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
      this.currentTiresId=id;
      if (id) {
        let obj = {}
        obj = this.tiresList.find(item => {
          //这里的operateOption就是上面遍历的数据源
          return item.id ==id //筛选出匹配数据
        })
        this.currentIndex=obj.idx
      }
    },
    handleCurrentChange(e) {
      var id=this.tiresList[e-1].id;
      this.value=id;
      this.currentTiresId=this.tiresList[e-1].id;
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
      this.$nextTick(()=>{
        this.$refs.tree.setCurrentKey(id);
      })
      // this.$refs.tree.setCurrentKey(id)
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