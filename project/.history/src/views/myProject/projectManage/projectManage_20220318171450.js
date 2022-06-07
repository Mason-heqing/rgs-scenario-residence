import MsgBox from '../../../components/dialog.vue'
import FromDialog from '../../../components/fromDialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
  name: 'home',
  data() {
    return {
      msg: '来访记录',
      currentPage: 1,
      popVisible:false,//是否显示信息弹框
      popTitle:'这个是标题',
      popContent:'这个是内容',
      total: 0,
      timer:null,
      multipleSelection: [],//表格选中
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
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
        children: 'userTrees',
        label: 'userName'
      },
      tableLabel: [
        { label: '名称', param: 'name', align: 'center', sortable: true,isshow:true},      
        { label: '所在省份', param: 'prov', align: 'center', sortable: true ,isshow:true},
        { label: '所在城市', param: 'city', align: 'center', sortable: true ,isshow:true},
        { label: '所在区', param: 'area', align: 'center', sortable: true,isshow:true},
        { label: '详细地址', param: 'address', align: 'center', sortable: true ,isshow:true},
        // { label: '停车场', param: 'openName', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: 'ID', param: 'id', align: 'center' ,isshow:false, sortable: true},
        { label: '停车场密钥', param: 'openSecret', align: 'center' ,isshow:false, sortable: true},
        // { label: '秘钥', param: 'appSecret', align: 'center', sortable: true,isshow:false,width:'300'},
        { label: '回调地址', param: 'callbackUrl', align: 'center', sortable: true,isshow:true},
        // { label: '小程序二维码', param: 'state', align: 'center', sortable: true,isshow:true,width:'130'},
        { slot: 'operate',isshow:true }, // 操作列
      ],
      tableOption:[],
      tableSelect: [],

      leftData:[],//左边侧边栏数据
      listData:[],//表格数据
      listDataForm:{
        userId:'',
        name:'',//项目名称/回调地址
        page:"1",
        pageSize:'10',
      },
      isShowSelect:true,
      loading:false,
      imgurl:'',
    }
  },
  
  watch: {
    colOptions(valArr) {
      var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0); // 未选中
      this.colData.filter(i => {
        if (arr.indexOf(i.title) != -1) {
          i.istrue = false;
          this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
          });
        } else {
          i.istrue = true;
          this.$nextTick(() => {
            this.$refs.multipleTable.doLayout();
          });
        }
      });
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
  mounted() {
    this.getLeftData();
    this.getListData();
  },
  methods: {
    //数据
    getListData(){
      this.utils.http({
        url: "/app/user/page",
        method: "GET",
        params: this.listDataForm
      },
      res => {
        if(res.code==200){
          this.total=res.data.total;
          this.listData = res.data.records;
          this.currentPage=res.data.current;
        }
        
      });  
    },
    //左边侧边栏数据
    getLeftData(){
      this.loading=true;
      this.leftData=[];
      this.utils.http({
        url: "/app/user/userTree",
        method: "GET",
        params: {}
      },
      res => {
        this.loading=false
        if(res.code==200){
          this.leftData.push(res.data);
          console.log(this.leftData)
        }
        
      });  
    },
    
    //自定义表头
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
    open () {
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },2000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },

    handleNodeClick(data) {
     this.listDataForm.userId=data.id;
     this.getListData();
    },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      this.listDataForm.pageSize=val;
      this.getListData();
    },
    handleCurrentChange(val) {
       this.listDataForm.page=val;
       this.getListData();
    },
    //跳转到添加
    goAdd(){
      this.$router.push({
        path:'/projectmanageadd',
        query:{
          type:'1',
        }

      })
    },
    //跳转到编辑
    goEdit(data){
      this.utils.setStore('thisData',data)
      this.$router.push({
        path:'/projectmanageadd',
        query:{
          type:'2',
        }
      })
    },
    //批量删除
    allDeleteData(){
      let all= this.$refs.tableChild.selectData;
      console.log(all)
      let allArr=[];
      all.forEach((item,index)=>{
        allArr.push(item.id)
      })
      if(allArr.length==0){
        // this.utils.tip('warning', '请先选择要删除的记录');
        this.popVisible=true;//是否显示信息弹框
        this.popTitle='提示';
        this.popContent='请先选择要删除的记录';
        this.open()
      }else{
        this.$confirm("您确信删除选中的"+ allArr.length +"条记录?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.deleteRequst(allArr)
        })
        .catch(() => {
          
        });
      }
      
    },
    // 删除
    deleteData(id){
      var arr=[id];
      this.$confirm("您确信删除当前记录?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.deleteRequst(arr)
      })
      .catch(() => {
        
      });
    },
    //删除接口
    deleteRequst(arr){
      this.utils.http({
        url: "/app/user/delete",
        method: "POST",
        data: {appId:arr}
      },
      res => {
        if(res.code==200){
          this.utils.tip('success','删除成功');
          this.$router.go(0);
          // this.getListData();
        }
        
      });  
    },
   
    //获取二维码地址
    getErcodeUrl(){
      this.utils.http({
        url: "/app/user/qrCodeImgUrl",
        method: "GET",
        params: {}
      },
      res => {
        this.loading=false
        if(res.code==200){
          // var url='http://pre.qy-rgs.com:9007/image/xqgj.jpg'
          var url = res.data;
          var x = new XMLHttpRequest();
          x.open("GET", url, true);
          x.responseType = 'blob';
          x.onload=function(e) {
              var url = window.URL.createObjectURL(x.response)
              var a = document.createElement('a');
              a.href = url;
              a.download = 'qrcode';
              a.click()
          }
          x.send();
        }
        
      });  
    },

    //下载二维码
    downErcode(){
      this.getErcodeUrl();
      // window.open('http://pre.qy-rgs.com:9007/image/xqgj.jpg') 
      
    },
  },
}