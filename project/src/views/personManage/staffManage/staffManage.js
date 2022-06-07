import MsgBox from '../../../components/dialog.vue'
import FromDialog from '../../../components/fromDialog.vue'
import TableCmp from '../../../components/table.vue'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '通道规则',
      currentPage: 1,
      popVisible:false,//提示弹框是否显示信息弹框
      popTitle:'这个是标题',
      popContent:'这个是内容',
      fromPopVisible:false,//表单弹框是否显示
      fromPopTitle:'这个是标题',
      fromPopContent:'这个是内容',
      popValue:'',
      total: 0,
      groupName:'',
      
      addPop:false,
      timer:null,
      
      multipleSelection: [],//表格选中
      data: [{
        label: '一级 1',
        id:'1',
        children: []
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children:'groupList',
        label:'title'
      },

      tableData: [],
      tableLabel: [     
        { label: 'ID', param: 'id', align: 'center', sortable: true ,isshow:false,width:'100'},
        { label: '人脸', param: 'faceUrl', align: 'center', sortable: true ,isimg:true,isshow:true,width:'120'},
        { label: '姓名', param: 'personName', align: 'center', sortable: true ,isshow:true,width:'100'},
        { label: '联系方式', param: 'phone', align: 'center', sortable: true ,isshow:true,width:'150'},
        { label: '部门', param: 'departmentName', align: 'center', sortable: true ,isshow:true,width:'100'},
        { label: '岗位', param: 'job', align: 'center' ,isshow:true,width:'120'},
        { label: 'IC卡', param: 'icNum', align: 'center',isshow:true, sortable: true ,width:'100'},
        // { label: '启用状态', param: 'effectiveStatus', align: 'center', sortable: true ,isswitch:true,isshow:true},
        
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
        { slot: 'operate1',isshow:true,label: '授权状态' },
        { slot: 'operate2',isshow:true,label: '启用状态' },
        { slot: 'operate',isshow:true }, // 操作列
      ],
      tableOption:[],
      tableSelect: [],
       
      
      activeName: 'first',
      options: [],
      value: '',
      addGroupForm:{
        appId:'',
        id:'',//分组数据Id
        parentId:'',
        title:'',
      },
      dataForm:{
        appId:'',
        groupId:'',//部门分组id
        personName:'',//手机姓名岗位
        pageNum:1,
        pageSize:10,
      },
      leftData:[],//部门左侧栏
      selectGroup:'',//选中部门的id
      selectTitle:'',//选中部门名称
      groupVal:'',//根据条件查询部门的值
      checkedTree:['0'],
      isShowSelect:true,
      loading:false,
      outPop:false,
      outChecked:false,
      authPopVisible:false,//授权弹框
      authPopTitle:'',
      authId:'',//授权人员的id
      authName:'',//授权人员的name
      isExport:false,
      importPop:false,//批量导入弹框
      fileList:[],
      uploadData:{//上传额外参数appid
        appId:''
      },
      exportUrl:'',
      exportErrList:[],//导入失败的数据
      exporterrPop:false,
      imgurl:''
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
    this.imgurl = this.tools.global.API_URL;
  },
  components:{
    MsgBox,
    FromDialog,
    TableCmp,
    ExportBox,
    AuthBox
  },
  mounted() {
    if (process.env.NODE_ENV == 'development') {
      this.exportUrl = 'api/person/group/importEmployee/';
    } else {
      this.exportUrl = this.imgurl+'/person/group/importEmployee/';
    }
    if(this.appId){
      this.addGroupForm.appId=this.appId;
      this.dataForm.appId=this.appId;
      this.uploadData.appId=this.appId;
      this.getGroup();
      this.getTableData()
    }
    
    // this.utils.tip('error', '这是信息')
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
      this.dataForm={
        appId:newFlag,
        groupId:'',//部门分组id
        personName:'',//手机姓名岗位
        pageNum:1,
        pageSize:10,
      };
      this.addGroupForm.appId=newFlag;
      this.uploadData.appId=newFlag;
      this.getGroup();
      this.getTableData()
    }
  },
  methods: {
    //点击所有部门按钮
    clickAllGroup(){
      this.dataForm.groupId='';
      this.getTableData();
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
          res.data.unshift({
            groupList:[],
            id:"",
            parentId:'0',
            title:'所有部门'
          })
          this.leftData=res.data;
        }
      });  
    },
    //根据名称查询部门person/group/queryParentPersonGroup
    getGroupByVal(){
      if(this.groupVal){
        this.utils.http({
          url: "/person/group/queryParentPersonGroup",
          method: "GET",
          params: {appId:this.appId,title:this.groupVal}
        },
        res => {
          if(res.code==200){
            this.leftData=res.data;
          }
        });  
      }else{
        this.getGroup()
      }
      
    },

    //添加部门

    dialogAdd(){
      this.addGroupForm.title=this.$refs.addGialog.inputVal;
      if(this.addGroupForm.title){
        this.utils.http({
          url: "/person/group/savePersonGroup",
          method: "POST",
          data: this.addGroupForm
        },
        res => {
          if(res.code==200){
            this.getGroup();
            this.$refs.addGialog.inputVal="";
            this.fromPopVisible=false;
          }
        });
      }else{
        this.popTitle="提示";
        this.popContent="部门名称不能为空";
        this.popVisible=true;
        this.open();
      }    
    },
    //获取表格数据
    getTableData(){
      this.loading=true;
      this.utils.http({
        url: "/person/group/queryEmployeeByPage",
        method: "GET",
        params: this.dataForm
      },
      res => {
        console.log(res,'长城外古道边荒草碧连天')
        if(res.code==200){
          this.total=res.data.total;
          // res.data.records.forEach((item,index)=>{
          //   if(item.effectiveStatus==1){
          //     item.effectiveStatus=true;
          //   }else{
          //     item.effectiveStatus=false;
          //   }
          // })
          this.tableData=res.data.records;
          this.currentPage=res.data.current;
        }       
        this.loading=false;
      });  
    },
    //删除部门
    deleteGroup(){
      if(this.selectGroup){
        this.$confirm("您确信删除选中的部门?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.deleteRequest()
        })
        .catch(() => {
          
        });
      }else{
        
        this.popTitle="提示";
        this.popContent="请先选择需要删除的部门";
        this.popVisible=true;
        this.open();
      }    
    },
    //删除员工
    deleteStaff(id){
        this.$confirm("您确信删除选中的员工?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.utils.http({
            url: "/person/group/deleteEmployee",
            method: "GET",
            params: {appId:this.appId,personId:id}
          },
          res => {
            if(res.code==200){
              this.utils.tip('success','删除成功');
              this.getTableData()
            }
            
          });  
        })
        .catch(() => {
          
        });
    },

    deleteRequest(){
      this.utils.http({
        url: "/person/group/deletePersonGroup",
        method: "GET",
        params: {appId:this.appId,personGroupId:this.selectGroup}
      },
      res => {
        if(res.code==200){
          this.utils.tip('success','删除成功');
          this.selectGroup="";
          this.getGroup();
        }
        
      });  
    },
    //选择部门
    handleNodeClick(data,Node,e) {
      // this.addGroupForm.parentId=data.id;
      this.selectGroup=data.id;
      this.selectTitle=data.title;
      this.dataForm.groupId=data.id;
      this.getTableData();
    },

    //点击编辑
    editPerson(row){
      this.utils.setStore('staffMsg',row)
      this.$router.push({  
        path: '/staffmanageadd',   
        query:{
          type:'2',
        }
      })
    },

    resetBtn(){
      this.dataForm={
        appId:this.appId,
        groupId:'',//部门分组id
        personName:'',//手机姓名岗位
        pageNum:1,
        pageSize:10,
      }
      this.getTableData();
    },
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
        path:'/staffmanageadd',
        query:{
          type:'1',
        }
      })
    },

    //弹框
    open () {
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },
    //批量删除
    batchDelete(){
      let ids=[];
      let all= this.$refs.tableChild.selectData;
      all.forEach((item,index)=>{
        ids.push(item.id)
      })
      if(ids.length==0){
        this.popVisible=true;//是否显示信息弹框
        this.popTitle='提示';
        this.popContent='请先选择要删除的员工';
        this.open()
      }else{
        this.$confirm("您确信删除选中的员工?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.utils.http({
            url: "/person/batchDeleteHousehold",
            method: "POST",
            data: {appId:this.appId,personIdList:ids}
          },
          res => {
            if(res.code==200){
              this.utils.tip('success','删除成功');
              this.getTableData()
            }        
          });  
        })
        .catch(() => {
          
        });
      }
    },

    
    //编辑分组
    editGroup(){
      if(this.selectGroup){
        this.addGroupForm.parentId="";
        this.addGroupForm.id=this.selectGroup;
        this.fromPopTitle='请输入新的部门名称';
        this.fromPopVisible=true;
        this.popValue=this.selectTitle;
      }else{
        this.popTitle='提示'
        this.popContent='请选择要修改的区域';
        this.popVisible=true;
        this.open();
      }
    },
    //新增分组
    addGroup(){
      this.addGroupForm.id='';
      this.addGroupForm.parentId=this.selectGroup;
      this.fromPopTitle='请输入部门名称';
      this.fromPopVisible=true;
      this.popValue='';
    },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      this.dataForm.pageSize=val;
      this.getTableData();
    },
    handleCurrentChange(val) {
       this.dataForm.pageNum=val;
       this.getTableData();
    },
    //导出
    exportBtn(){
      this.outPop=true;
    },
    outBtn(){
     this.isExport=true;
      this.outChecked=this.$refs.exportData.outChecked;
        if(this.outChecked){
          this.dataForm.withPic=1;
        }else{
          this.dataForm.withPic=0;
        }
        let ids=[];
        let all= this.$refs.tableChild.selectData;
        all.forEach((item,index)=>{
          ids.push(item.id)
        });
        this.dataForm.ids=ids;
        this.utils.http({
          url: "/person/group/exportEmployee",
          method: "POST",
          data: this.dataForm
        },
        res => {
          this.isExport=false;
          this.outPop=false;
          //删除ids属性  防止查询报错
          delete this.dataForm.ids;
          if(res.code==200){
            this.$alert('人员正在导出请稍后', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'success',
            }).then(() => {
             
            }).catch(() => {});
          }else{
            this.$alert('人员导出失败', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'error',
            }).then(() => {
             
            }).catch(() => {});
          }
        });  
      
    },

    //查看授权状态
    goView(id,name){
      this.authPopVisible=true;
      this.authId=id;
      this.authPopTitle=name;
    },

    //导入
    submitUpload() {
      if(this.fileList.length>0){
        this.$refs.upload.submit();
      }else{
        this.$message.error('请选择文件');
      }
    },
    //文件选择变化
    selectChange(file,fileList){
      var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
      let types = ['zip'];
      const isZip = types.includes(fileType);
      if (!isZip) {
        this.$message.error('只支持.zip压缩文件');
        this.fileList=[];
        return false
      }
      this.fileList=fileList;
    },
   //上传之前
   beforeAvatarUpload(file,fileList){
    var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
    let types = ['zip'];
    const isZip = types.includes(fileType);
    const isLtSize = file.size / 1024 / 1024 < 128;
    if (!isZip) {
      this.$message.error('只支持.zip压缩文件');
      return false
    }
    if (!isLtSize) {
      this.$message.error('文件大小不能超过 128MB!');
      return false
    }
     //提示弹框
     this.importPop=false;
     this.popVisible=true;//是否显示信息弹框
     this.popTitle='提示';
     this.popContent='人员正在导入请稍后';
  },
  //上传成功
  successCheck(response, file, fileList) {
    console.log(response);
    this.$refs.upload.clearFiles()
    this.popVisible=false;
    if (response.code == 200) {
      if(response.data.isOpen==1){
        this.exportErrList=response.data.list;
        this.exporterrPop=true;
      }else if(response.data.isOpen==0){
        this.$alert('人员导入成功', '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          closeOnClickModal:true,
          type:'success',
        }).then(() => {
         
        }).catch(() => {});
      }else if(response.data.isOpen==2){
        this.$message.error('模板解析异常');
      }
    }else{
      this.$message.error(response.msg);
    }     
  },
  //删除
  removeFile(){
    this.fileList=[];
  },
  //上传失败
  uploadErr(err, file, fileList){
    this.$message.error('导入失败');
  },
  exceed(){
    this.$message.error('不支持多文件上传');
  },

  //员工启用状态
  changeStatus(e,row){
    this.utils.http({
      url: "/person/group/addEmployee",
      method: "POST",
      data: row
    },
    res => {
      if(res.code=='200'){
        this.getTableData()
        this.utils.tip('success','修改成功');
      }
    });  
  },
    
  },
}