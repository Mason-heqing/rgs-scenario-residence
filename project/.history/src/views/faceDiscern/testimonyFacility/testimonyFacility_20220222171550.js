import {mixin} from '../../../utils/mixin'
export default {
  mixins:[mixin],
  data() {
    return {
      page:1,
      pageSize:10,
      userInfoList:false,
      facilityList:{
        name:'',
        online:'',
        type:''
      },
      tag:0,
      projName:'',
      name:'',
      serial:'',
      id:'',
      appId:'',
      total:0,
      tableData:[],
      equipmentParameterTitle:''
    }
  },
  
computed: {
    appNum() {
        return this.$store.state.project.projectId
    },
    appName() {
      return this.$store.state.project.projectName
    }

  },
  watch:{
    appNum(newFlag, oldFlag){
      this.appId = newFlag
      this.getFacilityList()
      console.log(newFlag)
    },
    appName(newName) {
      this.projName = newName
    }
  },
  created() {
    this.appId = this.$store.state.project.projectId
    this.projName = this.$store.state.project.projectName
    this.getFacilityList();
  },
mounted() {
    
},
  methods: {
    
    // 设备列表页
    getFacilityList() {
      let dataMsg = {
        appId:this.appId,
        page:this.page,
        pageSize:this.pageSize,
        name:this.facilityList.name,
        online:this.facilityList.noline,
        type:this.facilityList.type
      }
      this.utils.http({
        url:'/identity/device/page',
        method:'POST',
        data:{...dataMsg}
      },
        res => {
          if(res.code == 200) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
          console.log(res,'人证设备')
        }
      )
    },
    addList() {
      this.userInfoList = true
      this.tag = 2 
      this.equipmentParameterTitle = '添加设备'
    },
    closeUserInfoList() {
      this.userInfoList = false
      this.name = ''
      this.serial = ''
    },
    // 顶部搜索
    searchTmsg() {
      this.getFacilityList();
    },
    // 重置
    replacement() {
      this.facilityList.name ='',
      this.facilityList.noline = '',
      this.facilityList.type = ''
      this.getFacilityList();
    },
    // 添加设备
    addFacilityMsg() {
      this.utils.http({
        url:'/identity/device/add',
        method:'POST',
        data:{
          appId:this.appId,
          name:this.name,
          serial:this.serial,
          id:this.id
        }
      },
        res => {
          if(res.code == 200) {
            this.$message.success('添加设备成功')
            this.getFacilityList();
            this.userInfoList = false
          }else {
            // this.$message.error('添加设备失败')
          }
          // console.log(res,'添加设备')
        }
      )
    },
    // 编辑设备弹框
    redactDlogBx(row) {
      console.log(row,'row')
      this.equipmentParameterTitle = '编辑设备'
      this.tag = 1
      this.userInfoList = true
      this.name = row.name
      this.id = row.id
      this.serial = row.serial
    },
    // 编辑设备提交
    amendSubmitDialogMsg() {
      let seMsg = {
        appId:window.localStorage.getItem('appid'),
        name:this.name,
        serial:this.serial,
        id:this.id
      }
      this.utils.http({
        url:'/identity/device/update',
        method:'POST',
        data:{...seMsg}
      },
        res => {
          if(res.code == 200) {
            this.$message.success('编辑设备成功')
            this.getFacilityList();
            this.userInfoList = false
          }else {
            this.$message.error('编辑设备失败')
          }
          console.log(res,'编辑')
        }
      )
    },
    // 删除设备
    deleteSbMsg(row) {
        this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.utils.http({
              url:`/identity/device/delete?deviceId=${row.id}`,
              method:'POST',
            },
              res => {
                if(res.code == 200) {
                  this.$message.success('已删除设备')
                  this.getFacilityList();
                }else {
                  this.$message.error('删除设备失败')
                }
                console.log(res,'删除设备')
              }
            )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    
    },
    // 分页切换
    handleSizeChange(e) {
      this.pageSize = e
      this.getFacilityList();
      console.log(e,'size')
    },
    handleCurrentChange(e) {
      this.page = e
      this.getFacilityList();
      console.log(e,'page')
    }
  },
}