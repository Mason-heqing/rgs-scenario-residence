import MsgBox from '../../../../components/dialog.vue'
import TableCmp from '../../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      currentPage: 1,
      popVisible: false,//是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [
        { label: '软件名称', param: 'name', align: 'center', sortable: true, isshow: true, width: '220' },      
        {
          label: '软件类型', param: 'type', align: 'center', width: '120', sortable: true, isshow: true, render: (row) => {
            if (row.type == 1) {
              return '未知'
            } else if (row.type == 2) {
              return '人脸门禁终端'
            } else if (row.type == 3) {
              return '人证核验终端'
            } else if (row.type == 5) {
              return '安卓'
            } 
          }
        },   
        { label: '软件版本', param: 'version', align: 'center', sortable: true, isshow: true, width: '120' },
        { label: '软件大小', param: 'fileSize', align: 'center', sortable: true, isshow: true, width: '120', render: (row) => {
          return (row.fileSize/1024/1024).toFixed(2)+'MB'
          } 
        },
        { label: '发布时间', param: 'createTime', align: 'center', sortable: true, isshow: true, width: '160' },
        { label: '上传时间', param: 'updateTime', align: 'center', sortable: true, isshow: true, width: '160' },
        { label: '类型', param: 'type', align: 'center', sortable: true, isshow: false, width: '100' },
        { label: '备注信息', param: 'remark', align: 'center', sortable: true, isshow: true, width: '200' },
        { label: '渠道名称', param: 'channel', align: 'center', sortable: true, isshow: true, width: '120' },
        { slot: 'operate', isshow: true }, // 操作列
      ],
      tableOption:[],
      tableSelect: [],

      loading: false,
      isShowSelect: true,
      url: '',
      isRequst: false,
      imgurl:'',
      softForm:{
        appId:'',
        pageSize:10,
        pageNum:1,
        search:'',
      },
      softData:[],
      fileList:[],
      uploadData:{//上传额外参数appid
        appId:''
      },
      uploadSoftPop:false,
      timer:null,
      exportUrl:'',
      isUpload:false,
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
  watch: {
    appId(newFlag, oldFlag) {
      this.appId = newFlag;
      this.softForm={
        appId:newFlag,
        pageSize:10,
        pageNum:1,
        search:'',
      },
      this.uploadData.appId=newFlag;
      this.getDataTable();
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
  components: {
    MsgBox,
    TableCmp
  },
  mounted() {
    if (process.env.NODE_ENV == 'development') {
      this.exportUrl = 'api/device/firmware/upload/';
    } else {
      this.exportUrl = this.imgurl+'/device/firmware/upload/';
    }
    if (this.appId) {
      this.softForm.appId=this.appId;
      this.uploadData.appId=this.appId;
      this.getDataTable();
    }



  },
  methods: {
    //自定义表头
    checkboxChange(e){
        for (let j = 0; j < this.tableLabel.length; j++) {
          if(this.tableSelect.indexOf(this.tableLabel[j].label)>-1){
            this.tableLabel[j].isshow=true;
          }else{
            this.tableLabel[j].isshow=false;
          }
            
        }
    },

    //列表
    getDataTable() {
      this.loading = true;
      this.utils.http({
        url: "/device/firmware/searchDeviceFirmByPage",
        method: "POST",
        data: this.softForm
      },
        res => {
          this.loading = false;
          if (res.code == 200) {
            this.total = res.data.total;
            this.tableData = res.data.records;
            this.currentPage=res.data.current;
          }

        });
    },
    //删除
    deleteSoft(id){
      let ids=[id];
      this.$confirm("您确信删除当前软件?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.utils.http({
          url: "/device/firmware/delete",
          method: "POST",
          // headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
          // data:this.utils.changeJson({ids:JSON.stringify(ids)})
          data:{ids:ids}
        },
        res => {
          if(res.code==200){
            this.utils.tip('success','删除成功');
            this.getDataTable();
          }
          
        })
      })
      .catch(() => {
        
      });
      
    },
    //分页
    handleSizeChange(val) {
      this.softForm.pageSize = val;
      this.getDataTable();
    },
    handleCurrentChange(val) {
      this.softForm.pageNum = val;
      this.getDataTable();
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


    submitUpload() {
      if(this.fileList.length>0){
        this.$refs.upload.submit();
        this.isUpload=true;
      }else{
        this.$message.error('请选择文件');
      }
    },
    //取消上次
    abortUpLoad(){
      this.$refs.upload.abort();
      this.isUpload=false;
      this.fileList=[];
      this.$refs.upload.clearFiles()
    },
    //文件选择变化
    selectChange(file,fileList){    
      // var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
      // let types = ['zip'];
      // const isZip = types.includes(fileType);
      // if (!isZip) {
      //   this.$message.error('只支持.zip压缩文件');
      //   this.fileList=[];
      //   return false
      // }
      this.fileList=fileList;
    },
   //上传之前
   beforeAvatarUpload(file,fileList){
    // var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
    // let types = ['zip'];
    // const isZip = types.includes(fileType);
    // const isLtSize = file.size / 1024 / 1024 < 128;
    // if (!isZip) {
    //   this.$message.error('只支持.zip压缩文件');
    //   return false
    // }
    // if (!isLtSize) {
    //   this.$message.error('文件大小不能超过 128MB!');
    //   return false
    // }
    // //提示弹框
    // this.importPop=false;
    // this.popVisible=true;//是否显示信息弹框
    // this.popTitle='提示';
    // this.popContent='人员正在导入请稍后';
  },
  //上传成功
  successCheck(response, file, fileList) {
    this.isUpload=false;
    this.$refs.upload.clearFiles()
    if (response.code == 200) {
      this.uploadSoftPop=false;
      this.$alert('上传成功', '提示', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        closeOnClickModal:true,
        type:'success',
      }).then(() => {
       
      }).catch(() => {});
      this.getDataTable();  
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



  },
}